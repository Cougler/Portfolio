"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Tag = {
  label: string;
};

export type ProjectCardProps = {
  date: string;
  company: string;
  headline: string;
  title: string;
  tags: Tag[];
  description: string;
  accentColor: "purple" | "blue" | "green" | "none";
  href?: string;
  comingSoon?: boolean;
  imagePlaceholder?: string;
  videoSrc?: string;
  imageSrc?: string;
  timelinePt?: string;
  index?: number;
};

const accentClasses = {
  purple: "bg-[#dbc4ff]",
  blue: "bg-[#c5d8f6]",
  green: "bg-[#c5f0d6]",
  none: "bg-gray-100",
};

function TimelineDashes({ className }: { className?: string }) {
  return (
    <div
      className={`w-[2px] rounded-sm ${className ?? ""}`}
      style={{
        backgroundImage:
          "repeating-linear-gradient(to bottom, #c0c5cc 0px, #c0c5cc 8px, transparent 8px, transparent 18px)",
      }}
    />
  );
}

function LazyVideo({ src, className }: { src: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {visible && (
        <video
          src={src}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
}

function highlightMetrics(text: string) {
  const parts = text.split(/(\+[\d.]+%|\d+%)/g);
  return parts.map((part, i) =>
    /^\+?[\d.]+%$/.test(part) ? (
      <span key={i} className="text-accent font-bold">
        {part}
      </span>
    ) : (
      part
    )
  );
}

export default function ProjectCard({
  date,
  company,
  headline,
  title,
  tags,
  description,
  accentColor,
  href,
  comingSoon = false,
  imagePlaceholder,
  videoSrc,
  imageSrc,
  timelinePt,
  index,
}: ProjectCardProps) {
  const inner = (
    <div
      className="-mx-4 px-4 pt-1"
      style={{ borderRadius: "var(--theme-card-radius, 12px)" }}
    >
      <div className="flex flex-col md:flex-row pt-3 pb-6 px-0 md:px-4 md:min-h-[1100px] gap-0 md:gap-6">
        {/* Left column: date/company + timeline */}
        <div className="md:w-[140px] shrink-0 md:mr-12 flex flex-col">
          {index !== undefined && (
            <p className="md:hidden text-[11px] font-mono text-muted/50 mb-2 tracking-widest">
              {String(index).padStart(2, "0")}
            </p>
          )}
          <div className="hidden md:block mb-2 md:mb-0">
            <p className="text-[13px] font-medium text-foreground leading-snug font-mono">
              {date}
            </p>
            <p className="text-[12px] text-muted leading-snug md:mb-4 font-mono">
              {company}
            </p>
          </div>

          <div className={`hidden md:flex justify-center pr-[55px] flex-1 ${timelinePt ?? "pt-[40px]"}`}>
            <TimelineDashes className="h-full" />
          </div>
        </div>

        {/* Right column */}
        <div className="flex-1 min-w-0 pb-2">
          <h2 className="text-[1.1rem] md:text-[1.75rem] font-bold leading-[1.2] tracking-[-0.01em] mb-4 md:mb-6 font-[family-name:var(--font-inter)]">
            {highlightMetrics(headline)}
          </h2>

          <div
            className={`relative ${accentClasses[accentColor]} w-full aspect-[4/3] flex items-center justify-center overflow-hidden mb-4 md:mb-6`}
            style={{ borderRadius: "var(--theme-media-radius, 16px)" }}
          >
            {videoSrc ? (
              <LazyVideo src={videoSrc} className="w-full h-full" />
            ) : imageSrc ? (
              <img
                src={imageSrc}
                alt={imagePlaceholder || title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-48 h-[320px] md:w-56 md:h-[380px] bg-white rounded-[2rem] shadow-lg border border-black/5 flex items-center justify-center">
                <span className="text-xs text-muted font-[family-name:var(--font-inter)]">
                  {imagePlaceholder || "Device mockup"}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between gap-4 md:gap-6 mb-1 md:mb-3 mt-2">
            <h3 className="text-[16px] md:text-[16px] font-bold text-foreground tracking-[-0.02em] font-[family-name:var(--font-inter)]">
              {title}
            </h3>
            {comingSoon ? (
              <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-muted whitespace-nowrap font-[family-name:var(--font-inter)]">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <rect x="0" y="7" width="3" height="6" rx="0.5" fill="currentColor" opacity="0.4">
                    <animate attributeName="height" values="6;10;6" dur="1.2s" repeatCount="indefinite" begin="0s" />
                    <animate attributeName="y" values="7;3;7" dur="1.2s" repeatCount="indefinite" begin="0s" />
                  </rect>
                  <rect x="5" y="4" width="3" height="9" rx="0.5" fill="currentColor" opacity="0.65">
                    <animate attributeName="height" values="9;5;9" dur="1.2s" repeatCount="indefinite" begin="0.4s" />
                    <animate attributeName="y" values="4;8;4" dur="1.2s" repeatCount="indefinite" begin="0.4s" />
                  </rect>
                  <rect x="10" y="2" width="3" height="11" rx="0.5" fill="currentColor" opacity="0.9">
                    <animate attributeName="height" values="11;7;11" dur="1.2s" repeatCount="indefinite" begin="0.8s" />
                    <animate attributeName="y" values="2;6;2" dur="1.2s" repeatCount="indefinite" begin="0.8s" />
                  </rect>
                </svg>
                Experiment running
              </span>
            ) : href ? (
              <span className="view-project-link inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-accent/25 bg-accent/5 text-[11px] font-semibold text-accent whitespace-nowrap font-[family-name:var(--font-inter)] transition-all duration-200 hover:bg-accent/10 hover:border-accent/40">
                View project
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  className="view-project-arrow transition-transform duration-200"
                >
                  <path d="M2 8L8 2M8 2H3.5M8 2V6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            ) : null}
          </div>

          <div className="flex items-center gap-2 md:hidden mb-3 mt-3">
            <span className="text-[11px] font-mono text-muted">{date}</span>
            <span className="text-[11px] font-mono text-muted/40">·</span>
            <span className="text-[11px] font-mono text-muted">{company}</span>
          </div>

          <div className="hidden md:flex flex-wrap items-center gap-x-2 gap-y-1 mb-3 md:mb-4">
            {tags.map((tag, i) => (
              <span key={tag.label} className="inline-flex items-center gap-2">
                {i > 0 && <span className="text-[11px] text-muted/50 font-mono">·</span>}
                <span className="text-[11px] font-mono text-muted uppercase tracking-wide">
                  {tag.label}
                </span>
              </span>
            ))}
          </div>

          <p className="text-[13.5px] text-[#4b5563] leading-relaxed max-w-[520px] font-[family-name:var(--font-inter)]">
            {description}
          </p>
        </div>
      </div>

    </div>
  );

  if (href && !comingSoon) {
    return (
      <Link href={href} className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent rounded-xl">
        {inner}
      </Link>
    );
  }

  return inner;
}

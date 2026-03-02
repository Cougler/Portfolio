"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { ThemeProvider } from "@/components/ThemeContext";
import Footer from "@/components/Footer";
import MetricChart from "@/components/MetricChart";
import type {
  TimeSeriesPoint,
  LineSeries,
} from "@/components/MetricChart";

export type MetricItem = {
  value: string;
  label: string;
};

export type MetricGroupChart = {
  data: TimeSeriesPoint[];
  series: LineSeries[];
  leftAxisLabel?: string;
  rightAxisLabel?: string;
  leftAxisUnit?: string;
  rightAxisUnit?: string;
};

export type MetricGroup = {
  title: string;
  description?: string;
  metrics: MetricItem[];
  chart?: MetricGroupChart;
};

export type ContentBlock =
  | { type: "section"; title: string; content: React.ReactNode }
  | { type: "metrics"; groups: MetricGroup[] }
  | { type: "image"; src: string; alt: string; caption?: string }
  | { type: "video"; src: string; caption?: string }
  | { type: "imageRow"; images: { src: string; alt: string }[]; caption?: string };

export type CaseStudyProps = {
  title: string;
  subtitle: string;
  role: string[];
  team: string[];
  tools: string[];
  heroVideoSrc?: string;
  heroImageSrc?: string;
  blocks: ContentBlock[];
};

function BackButton() {
  return (
    <Link
      href="/"
      aria-label="Back to home"
      className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-border/60 text-muted hover:text-foreground hover:border-foreground/30 transition-all duration-150"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="M10 13l-5-5 5-5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}

function ScrollReveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.animationDelay = `${delay}ms`;
          el.classList.add("animate-fade-in-up");
          observer.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`opacity-0 ${className ?? ""}`}>
      {children}
    </div>
  );
}

function MetaColumn({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted mb-2 font-[family-name:var(--font-inter)]">
        {label}
      </p>
      <ul className="space-y-1">
        {items.map((item) => (
          <li
            key={item}
            className="text-[13.5px] text-foreground font-[family-name:var(--font-inter)]"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function MetricCard({ value, label }: MetricItem) {
  const isPositive = value.startsWith("+");
  return (
    <div className="flex flex-col gap-0.5 md:gap-1 p-3.5 md:p-5 bg-[#f8f9fa] border border-border/50" style={{ borderRadius: "var(--theme-card-radius, 12px)" }}>
      <span
        className={`text-[1.25rem] md:text-[1.75rem] font-bold tracking-tight font-[family-name:var(--font-inter)] ${
          isPositive ? "text-accent" : "text-foreground"
        }`}
      >
        {value}
      </span>
      <span className="text-[12px] md:text-[13px] text-muted leading-snug font-[family-name:var(--font-inter)]">
        {label}
      </span>
    </div>
  );
}

function renderNarrowBlock(block: ContentBlock, i: number) {
  if (block.type === "section") {
    return (
      <ScrollReveal key={block.title}>
        <h2 className="text-[1.125rem] md:text-[1.4rem] font-bold tracking-[-0.01em] mb-3 md:mb-4 font-[family-name:var(--font-inter)]">
          {block.title}
        </h2>
        <div className="text-[15px] md:text-[14.5px] text-[#4b5563] leading-[1.7] md:leading-[1.75] font-[family-name:var(--font-inter)]">
          {block.content}
        </div>
      </ScrollReveal>
    );
  }

  if (block.type === "metrics") {
    return (
      <ScrollReveal key={`metrics-${i}`} className="flex flex-col gap-10 md:gap-[72px]">
        {block.groups.map((group) => (
          <div key={group.title}>
            <h3 className="text-[1rem] md:text-[1.1rem] font-bold tracking-[-0.01em] mb-2 font-[family-name:var(--font-inter)]">
              {group.title}
            </h3>
            {group.description && (
              <p className="text-[13.5px] md:text-[14px] text-muted mb-3 md:mb-4 font-[family-name:var(--font-inter)]">
                {group.description}
              </p>
            )}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
              {group.metrics.map((metric) => (
                <MetricCard key={metric.label} {...metric} />
              ))}
            </div>
            {group.chart && (
              <MetricChart
                data={group.chart.data}
                series={group.chart.series}
                leftAxisLabel={group.chart.leftAxisLabel}
                rightAxisLabel={group.chart.rightAxisLabel}
                leftAxisUnit={group.chart.leftAxisUnit}
                rightAxisUnit={group.chart.rightAxisUnit}
              />
            )}
          </div>
        ))}
      </ScrollReveal>
    );
  }

  return null;
}

function renderContentBlocks(blocks: ContentBlock[]) {
  const elements: React.ReactNode[] = [];
  let narrowGroup: { block: ContentBlock; index: number }[] = [];

  function flushNarrow() {
    if (narrowGroup.length === 0) return;
    elements.push(
      <article
        key={`narrow-${narrowGroup[0].index}`}
        className="max-w-[900px] mx-auto px-5 md:px-10 flex flex-col gap-10 md:gap-[72px]"
      >
        {narrowGroup.map(({ block, index }) => renderNarrowBlock(block, index))}
      </article>
    );
    narrowGroup = [];
  }

  blocks.forEach((block, i) => {
    if (block.type === "image") {
      flushNarrow();
      elements.push(
        <ScrollReveal key={`image-${i}`} className="max-w-[960px] mx-auto w-full">
          <div
            className="w-full overflow-hidden bg-[#f5f6f8] rounded-none md:rounded-2xl"
          >
            <img
              src={block.src}
              alt={block.alt}
              className="w-full h-auto object-cover"
            />
          </div>
          {block.caption && (
            <p className="text-[12.5px] md:text-[13px] text-muted mt-2.5 md:mt-3 text-center px-5 md:px-0 font-[family-name:var(--font-inter)]">
              {block.caption}
            </p>
          )}
        </ScrollReveal>
      );
    } else if (block.type === "video") {
      flushNarrow();
      elements.push(
        <ScrollReveal key={`video-${i}`} className="max-w-[960px] mx-auto w-full">
          <div className="w-full overflow-hidden bg-[#f5f6f8] rounded-none md:rounded-2xl">
            <video
              src={block.src}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto object-cover"
            />
          </div>
          {block.caption && (
            <p className="text-[12.5px] md:text-[13px] text-muted mt-2.5 md:mt-3 text-center px-5 md:px-0 font-[family-name:var(--font-inter)]">
              {block.caption}
            </p>
          )}
        </ScrollReveal>
      );
    } else if (block.type === "imageRow") {
      flushNarrow();
      elements.push(
        <ScrollReveal key={`imageRow-${i}`} className="max-w-[960px] mx-auto w-full">
          <div className="flex flex-col md:grid md:grid-cols-2 gap-3 md:gap-4">
            {block.images.map((img, j) => (
              <div
                key={j}
                className="w-full overflow-hidden bg-[#f5f6f8] rounded-none md:rounded-2xl"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>
          {block.caption && (
            <p className="text-[12.5px] md:text-[13px] text-muted mt-2.5 md:mt-3 text-center px-5 md:px-0 font-[family-name:var(--font-inter)]">
              {block.caption}
            </p>
          )}
        </ScrollReveal>
      );
    } else {
      narrowGroup.push({ block, index: i });
    }
  });

  flushNarrow();
  return elements;
}

export default function CaseStudyLayout({
  title,
  subtitle,
  role,
  team,
  tools,
  heroVideoSrc,
  heroImageSrc,
  blocks,
}: CaseStudyProps) {
  return (
    <ThemeProvider>
      <div
        className="min-h-screen flex flex-col gap-12 md:gap-[90px]"
        style={{
          background: "var(--color-background)",
          color: "var(--color-foreground)",
        }}
      >
        <div className="max-w-[900px] mx-auto px-5 md:px-10 flex flex-col gap-8 md:gap-[72px]">
          {/* Back button */}
          <div className="pt-[max(1.5rem,env(safe-area-inset-top))] animate-fade-in-up">
            <BackButton />
          </div>

          {/* Hero title */}
          <section className="animate-fade-in-up">
            <h1 className="text-[1.625rem] md:text-[2.5rem] font-bold leading-[1.15] tracking-tight mb-2 md:mb-3">
              {title}
            </h1>
            <p className="text-[13px] md:text-[14px] text-muted font-[family-name:var(--font-inter)]">
              {subtitle}
            </p>
          </section>

          {/* Meta + first content: stacked on mobile, side-by-side on desktop */}
          <ScrollReveal delay={60}>
            <div className="flex flex-col md:flex-row gap-8 md:gap-16">
              <div className="flex flex-row md:flex-col flex-wrap gap-x-8 gap-y-4 md:gap-y-6 md:w-[200px] md:shrink-0 pt-0 md:pt-1">
                <MetaColumn label="My Role" items={role} />
                <MetaColumn label="Team" items={team} />
                <MetaColumn label="Tools" items={tools} />
              </div>
              <div className="flex-1 min-w-0">
                {blocks.length > 0 && blocks[0].type === "section" && (
                  <>
                    <h2 className="text-[1.125rem] md:text-[1.4rem] font-bold tracking-[-0.01em] mb-3 md:mb-4 font-[family-name:var(--font-inter)]">
                      {blocks[0].title}
                    </h2>
                    <div className="text-[15px] md:text-[14.5px] text-[#4b5563] leading-[1.7] md:leading-[1.75] font-[family-name:var(--font-inter)]">
                      {blocks[0].content}
                    </div>
                  </>
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Hero media — full-bleed on mobile, wider container on desktop */}
        {(heroVideoSrc || heroImageSrc) && (
          <ScrollReveal className="max-w-[960px] mx-auto w-full" delay={120}>
            <div
              className="w-full overflow-hidden bg-[#f5f6f8] rounded-none md:rounded-2xl"
            >
              {heroVideoSrc ? (
                <video
                  src={heroVideoSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : heroImageSrc ? (
                <img
                  src={heroImageSrc}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              ) : null}
            </div>
          </ScrollReveal>
        )}

        {/* Content blocks (skip first — rendered in side-by-side layout above) */}
        {renderContentBlocks(blocks.slice(1))}

        <Footer />
      </div>
    </ThemeProvider>
  );
}

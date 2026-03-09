"use client";

import Link from "next/link";
import { createContext, useContext, useEffect, useRef, useState, useCallback } from "react";
import Footer from "@/components/Footer";
import MetricChart from "@/components/MetricChart";
import ComparisonBarChart from "@/components/ComparisonBarChart";
import type {
  TimeSeriesPoint,
  LineSeries,
} from "@/components/MetricChart";

// ─── Theme tokens ──────────────────────────────────────────────────────────────
const darkVars: React.CSSProperties = {
  "--v2-bg":              "#08090A",
  "--v2-surf":            "rgba(255,255,255,0.04)",
  "--v2-surf-hv":         "rgba(255,255,255,0.07)",
  "--v2-border":          "rgba(255,255,255,0.08)",
  "--v2-border-hv":       "rgba(255,255,255,0.15)",
  "--v2-text":            "#F0F0F0",
  "--v2-text-secondary":  "#B8BBC0",
  "--v2-text-tertiary":   "#8B8F96",
  "--v2-muted":           "#92969C",
  "--v2-text-faint":      "#494D54",
  "--v2-card-shadow":     "inset 0 1px 0 rgba(255,255,255,0.06), 0 4px 24px rgba(0,0,0,0.4)",
  "--color-background":   "#08090A",
  "--color-foreground":   "#F0F0F0",
  "--color-muted":        "#92969C",
  "--color-border":       "rgba(255,255,255,0.08)",
  "--color-accent":       "#8B96E9",
  background:             "#08090A",
  color:                  "#F0F0F0",
} as React.CSSProperties;

const lightVars: React.CSSProperties = {
  "--v2-bg":              "#F8F8FA",
  "--v2-surf":            "rgba(0,0,0,0.03)",
  "--v2-surf-hv":         "rgba(0,0,0,0.06)",
  "--v2-border":          "rgba(0,0,0,0.08)",
  "--v2-border-hv":       "rgba(0,0,0,0.14)",
  "--v2-text":            "#0f1a2a",
  "--v2-text-secondary":  "#2d3748",
  "--v2-text-tertiary":   "#4a5568",
  "--v2-muted":           "#595959",
  "--v2-text-faint":      "#9ca3af",
  "--v2-card-shadow":     "0 2px 16px rgba(0,0,0,0.07)",
  "--color-background":   "#F8F8FA",
  "--color-foreground":   "#0f1a2a",
  "--color-muted":        "#595959",
  "--color-border":       "rgba(0,0,0,0.08)",
  "--color-accent":       "#4f46e5",
  background:             "#F8F8FA",
  color:                  "#0f1a2a",
} as React.CSSProperties;

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
  experimentDate?: string;
  chartType?: "line" | "bar";
  showValues?: boolean;
};

export type MetricGroup = {
  title: string;
  description?: string;
  metrics: MetricItem[];
  chart?: MetricGroupChart;
};

export type ContentBlock =
  | { type: "section"; title?: string; content: React.ReactNode }
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

// ─── Lightbox context ─────────────────────────────────────────────────────────
type LightboxCtx = {
  register: (src: string, alt: string) => number;
  open: (index: number) => void;
};
const LightboxContext = createContext<LightboxCtx | null>(null);

function LightboxProvider({ children }: { children: React.ReactNode }) {
  const images = useRef<{ src: string; alt: string }[]>([]);
  const [current, setCurrent] = useState(-1);
  const isOpen = current >= 0;

  const register = useCallback((src: string, alt: string) => {
    const existing = images.current.findIndex((img) => img.src === src);
    if (existing >= 0) return existing;
    return images.current.push({ src, alt }) - 1;
  }, []);

  const openAt = useCallback((index: number) => setCurrent(index), []);
  const close = useCallback(() => setCurrent(-1), []);
  const prev = useCallback(() => setCurrent((c) => (c <= 0 ? images.current.length - 1 : c - 1)), []);
  const next = useCallback(() => setCurrent((c) => (c >= images.current.length - 1 ? 0 : c + 1)), []);

  useEffect(() => {
    if (!isOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close, prev, next]);

  const img = isOpen ? images.current[current] : null;
  const total = images.current.length;

  return (
    <LightboxContext.Provider value={{ register, open: openAt }}>
      {children}
      {isOpen && img && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.9)", backdropFilter: "blur(12px)" }}
          onClick={close}
        >
          {/* Close button */}
          <button
            onClick={close}
            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full transition-colors"
            style={{ background: "rgba(255,255,255,0.1)" }}
            aria-label="Close lightbox"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 5l10 10M15 5L5 15" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>

          {/* Counter */}
          {total > 1 && (
            <div
              className="absolute top-5 left-1/2 -translate-x-1/2 text-[13px] font-medium tabular-nums"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              {current + 1} / {total}
            </div>
          )}

          {/* Prev arrow */}
          {total > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full transition-colors"
              style={{ background: "rgba(255,255,255,0.1)" }}
              aria-label="Previous image"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M12 5l-5 5 5 5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}

          {/* Image */}
          <img
            src={img.src}
            alt={img.alt}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg select-none"
            style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.5)" }}
            onClick={(e) => e.stopPropagation()}
            draggable={false}
          />

          {/* Next arrow */}
          {total > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full transition-colors"
              style={{ background: "rgba(255,255,255,0.1)" }}
              aria-label="Next image"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M8 5l5 5-5 5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
        </div>
      )}
    </LightboxContext.Provider>
  );
}

function ExpandableImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const ctx = useContext(LightboxContext);
  const indexRef = useRef(-1);

  useEffect(() => {
    if (ctx) indexRef.current = ctx.register(src, alt);
  }, [ctx, src, alt]);

  return (
    <img
      src={src}
      alt={alt}
      className={`${className ?? ""} cursor-zoom-in`}
      onClick={() => ctx?.open(indexRef.current)}
    />
  );
}

function BackButton() {
  return (
    <Link
      href="/"
      aria-label="Back to home"
      className="inline-flex items-center justify-center w-10 h-10 rounded-full transition-all duration-150"
      style={{
        border: "1px solid var(--v2-border)",
        color: "var(--v2-muted)",
      }}
    >
      <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
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

function ThemeToggle({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="w-9 h-9 flex items-center justify-center transition-opacity duration-200 hover:opacity-70"
      style={{
        border: "1px solid var(--v2-border)",
        borderRadius: 8,
        color: "var(--v2-text)",
      }}
    >
      {isDark ? (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
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
      <p className="text-[11px] font-semibold uppercase tracking-wider mb-2 font-[family-name:var(--font-inter)]" style={{ color: "var(--v2-muted)" }}>
        {label}
      </p>
      <ul className="space-y-1">
        {items.map((item) => (
          <li
            key={item}
            className="text-[13.5px] font-[family-name:var(--font-inter)]"
            style={{ color: "var(--v2-text)" }}
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
    <div
      className="flex flex-col gap-0.5 md:gap-1 p-3.5 md:p-5"
      style={{
        background: "var(--v2-surf)",
        border: "1px solid var(--v2-border)",
        backdropFilter: "blur(12px)",
        borderRadius: 12,
      }}
    >
      <span
        className="text-[1.5rem] md:text-[2rem] font-bold tracking-tight font-[family-name:var(--font-inter)]"
        style={{ color: isPositive ? "var(--color-accent)" : "var(--v2-text)" }}
      >
        {value}
      </span>
      <span className="text-[12px] md:text-[13px] leading-snug font-[family-name:var(--font-inter)]" style={{ color: "var(--v2-muted)" }}>
        {label}
      </span>
    </div>
  );
}

function renderNarrowBlock(block: ContentBlock, i: number) {
  if (block.type === "section") {
    return (
      <ScrollReveal key={block.title ?? `section-${i}`}>
        {block.title && (
          <h2 className="text-[1.125rem] md:text-[1.4rem] font-bold tracking-[-0.01em] mb-3 md:mb-4 font-[family-name:var(--font-inter)]">
            {block.title}
          </h2>
        )}
        <div className="text-[15px] md:text-[14.5px] leading-[1.7] md:leading-[1.75] font-[family-name:var(--font-inter)]" style={{ color: "var(--v2-muted)" }}>
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
              <p className="text-[13.5px] md:text-[14px] mb-3 md:mb-4 font-[family-name:var(--font-inter)]" style={{ color: "var(--v2-muted)" }}>
                {group.description}
              </p>
            )}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
              {group.metrics.map((metric) => (
                <MetricCard key={metric.label} {...metric} />
              ))}
            </div>
            {group.chart &&
              (group.chart.chartType === "bar" ? (
                <ComparisonBarChart
                  data={group.chart.data}
                  series={group.chart.series}
                  leftAxisLabel={group.chart.leftAxisLabel}
                  rightAxisLabel={group.chart.rightAxisLabel}
                  leftAxisUnit={group.chart.leftAxisUnit}
                  rightAxisUnit={group.chart.rightAxisUnit}
                  showValues={group.chart.showValues}
                />
              ) : (
                <MetricChart
                  data={group.chart.data}
                  series={group.chart.series}
                  leftAxisLabel={group.chart.leftAxisLabel}
                  rightAxisLabel={group.chart.rightAxisLabel}
                  leftAxisUnit={group.chart.leftAxisUnit}
                  rightAxisUnit={group.chart.rightAxisUnit}
                  experimentDate={group.chart.experimentDate}
                />
              ))}
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
            className="w-full overflow-hidden rounded-none md:rounded-2xl"
            style={{ background: "var(--v2-surf)" }}
          >
            <ExpandableImage
              src={block.src}
              alt={block.alt}
              className="w-full h-auto object-cover"
            />
          </div>
          {block.caption && (
            <p className="text-[12.5px] md:text-[13px] mt-2.5 md:mt-3 text-center px-5 md:px-0 font-[family-name:var(--font-inter)]" style={{ color: "var(--v2-muted)" }}>
              {block.caption}
            </p>
          )}
        </ScrollReveal>
      );
    } else if (block.type === "video") {
      flushNarrow();
      elements.push(
        <ScrollReveal key={`video-${i}`} className="max-w-[960px] mx-auto w-full">
          <div
            className="w-full overflow-hidden rounded-none md:rounded-2xl"
            style={{ background: "var(--v2-surf)" }}
          >
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
            <p className="text-[12.5px] md:text-[13px] mt-2.5 md:mt-3 text-center px-5 md:px-0 font-[family-name:var(--font-inter)]" style={{ color: "var(--v2-muted)" }}>
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
                className="w-full overflow-hidden rounded-none md:rounded-2xl"
                style={{ background: "var(--v2-surf)" }}
              >
                <ExpandableImage
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-auto object-cover"
                />
              </div>
            ))}
          </div>
          {block.caption && (
            <p className="text-[12.5px] md:text-[13px] mt-2.5 md:mt-3 text-center px-5 md:px-0 font-[family-name:var(--font-inter)]" style={{ color: "var(--v2-muted)" }}>
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
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-theme");
    if (saved !== null) setIsDark(saved === "dark");
  }, []);

  function toggleTheme() {
    setIsDark(d => {
      const next = !d;
      localStorage.setItem("portfolio-theme", next ? "dark" : "light");
      return next;
    });
  }

  return (
    <LightboxProvider>
    <div
      className="min-h-screen flex flex-col gap-12 md:gap-[90px]"
      style={{
        ...(isDark ? darkVars : lightVars),
        transition: "background 0.4s, color 0.4s",
      }}
    >
      <div className="max-w-[900px] mx-auto px-5 md:px-10 flex flex-col gap-8 md:gap-[72px]">
        {/* Back button + theme toggle */}
        <div className="pt-[max(1.5rem,env(safe-area-inset-top))] animate-fade-in-up flex items-center justify-between">
          <BackButton />
          <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
        </div>

        {/* Hero title */}
        <section className="animate-fade-in-up">
          <h1 className="text-[1.625rem] md:text-[2.5rem] font-bold leading-[1.15] tracking-tight mb-2 md:mb-3">
            {title}
          </h1>
          <p className="text-[13px] md:text-[14px] font-[family-name:var(--font-inter)]" style={{ color: "var(--v2-muted)" }}>
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
                  <div className="text-[15px] md:text-[14.5px] leading-[1.7] md:leading-[1.75] font-[family-name:var(--font-inter)]" style={{ color: "var(--v2-muted)" }}>
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
            className="w-full overflow-hidden rounded-none md:rounded-2xl"
            style={{
              background: "var(--v2-surf)",
              border: "1px solid var(--v2-border)",
            }}
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
    </LightboxProvider>
  );
}

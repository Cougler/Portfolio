"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ProductionPrototypingAnimation from "@/components/ProductionPrototypingAnimation";
import DataFlowAnimation from "@/components/DataFlowAnimation";
import DesignIterationAnimation from "@/components/DesignIterationAnimation";
import OrganizationAnimation from "@/components/OrganizationAnimation";

// ─── Tokens (CSS variable refs — values set on root div based on isDark) ──────
const BG        = "var(--v2-bg)";
const SURF      = "var(--v2-surf)";
const SURF_HV   = "var(--v2-surf-hv)";
const BORDER    = "var(--v2-border)";
const BORDER_HV = "var(--v2-border-hv)";
const TEXT      = "var(--v2-text)";
const MUTED     = "var(--v2-muted)";
const ACCENT    = "#5E6AD2";

const darkVars: React.CSSProperties = {
  "--v2-bg":          "#08090A",
  "--v2-nav-bg":      "rgba(8,9,10,0.85)",
  "--v2-surf":        "rgba(255,255,255,0.03)",
  "--v2-surf-hv":     "rgba(255,255,255,0.055)",
  "--v2-border":      "rgba(255,255,255,0.07)",
  "--v2-border-hv":   "rgba(255,255,255,0.14)",
  "--v2-text":        "#F0F0F0",
  "--v2-muted":       "#6B6F76",
  "--v2-dash":        "rgba(255,255,255,0.15)",
  "--v2-card-shadow": "inset 0 1px 0 rgba(255,255,255,0.06), 0 4px 24px rgba(0,0,0,0.4)",
} as React.CSSProperties;

const lightVars: React.CSSProperties = {
  "--v2-bg":          "#F8F8FA",
  "--v2-nav-bg":      "rgba(248,248,250,0.9)",
  "--v2-surf":        "rgba(0,0,0,0.03)",
  "--v2-surf-hv":     "rgba(0,0,0,0.055)",
  "--v2-border":      "rgba(0,0,0,0.08)",
  "--v2-border-hv":   "rgba(0,0,0,0.14)",
  "--v2-text":        "#0f1a2a",
  "--v2-muted":       "#6b7280",
  "--v2-dash":        "rgba(0,0,0,0.15)",
  "--v2-card-shadow": "0 2px 16px rgba(0,0,0,0.07)",
} as React.CSSProperties;

const accentBg: Record<string, string> = {
  purple: "rgba(94,106,210,0.15)",
  blue:   "rgba(38,181,206,0.15)",
  green:  "rgba(76,175,125,0.15)",
  none:   "rgba(255,255,255,0.04)",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function glassCard(hover = false): React.CSSProperties {
  return {
    background: hover ? SURF_HV : SURF,
    border: `1px solid ${hover ? BORDER_HV : BORDER}`,
    borderRadius: 16,
    backdropFilter: "blur(16px)",
    transition: "background 0.2s, border-color 0.2s",
  };
}

function useHover() {
  const [hovered, setHovered] = useState(false);
  return { hovered, onMouseEnter: () => setHovered(true), onMouseLeave: () => setHovered(false) };
}

function highlightMetrics(text: string) {
  return text.split(/(\+[\d.]+%|\d+x|\d+%)/g).map((part, i) =>
    /^\+?[\d.]+(%|x)$/.test(part)
      ? <span key={i} style={{ color: "#8B96E9", fontWeight: 700 }}>{part}</span>
      : part
  );
}

function LazyVideo({ src, className }: { src: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { rootMargin: "200px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className}>
      {visible && <video src={src} autoPlay loop muted playsInline className="w-full h-full object-cover" />}
    </div>
  );
}

function TimelineDashes({ className }: { className?: string }) {
  return (
    <div
      className={`w-[2px] rounded-sm ${className ?? ""}`}
      style={{
        backgroundImage:
          "repeating-linear-gradient(to bottom, var(--v2-dash) 0px, var(--v2-dash) 8px, transparent 8px, transparent 18px)",
      }}
    />
  );
}

// ─── Logo ─────────────────────────────────────────────────────────────────────
function Logo() {
  return (
    <svg width="32" height="24" viewBox="0 0 247 185" fill="none">
      <path d="M123.299 0C129.935 0 136.158 3.20873 140.015 8.60897L242.761 152.453C247.235 158.717 247.848 166.961 244.326 173.805C240.803 180.647 233.741 184.942 226.045 184.942H143.848C137.605 184.942 131.694 182.111 127.794 177.236L123.299 171.617L118.804 177.236C114.904 182.111 108.992 184.942 102.75 184.942H20.553C12.8567 184.942 5.79424 180.647 2.27153 173.805C-1.25068 166.961 -0.637256 158.717 3.8368 152.453L106.583 8.60897L108.128 6.68249C111.995 2.45113 117.492 0 123.299 0ZM20.553 164.393H102.75L123.299 138.707L143.848 164.393H226.045L123.299 20.5491L20.553 164.393Z" fill={TEXT} />
    </svg>
  );
}

// ─── Sun/Moon Toggle ──────────────────────────────────────────────────────────
function SunMoonToggle({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="w-9 h-9 flex items-center justify-center transition-opacity duration-200 hover:opacity-70"
      style={{ border: `1px solid ${BORDER}`, borderRadius: 8, color: TEXT }}
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

// ─── Nav ──────────────────────────────────────────────────────────────────────
function Nav({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) {
  return (
    <header
      className="relative h-14"
      style={{ background: "transparent" }}
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 h-full flex items-center justify-between">
        <Link href="/"><Logo /></Link>
        <SunMoonToggle isDark={isDark} onToggle={onToggle} />
      </div>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const { hovered, onMouseEnter, onMouseLeave } = useHover();
  return (
    <section className="max-w-[1200px] mx-auto px-5 md:px-10 pt-12 md:pt-20 pb-16 md:pb-[120px]">
      <h1
        className="text-[34px] md:text-[46px] lg:text-[52px] font-semibold leading-[1.05] tracking-[-0.03em] mb-4 md:mb-5"
        style={{ color: TEXT }}
      >
        Hey, I&rsquo;m{" "}
        <Link
          href="/about"
          className="relative inline-flex items-center"
          style={{
            color: TEXT,
            background: hovered ? SURF_HV : SURF,
            border: `1px solid ${hovered ? BORDER_HV : BORDER}`,
            borderRadius: 12,
            paddingLeft: 10,
            paddingRight: 26,
            paddingTop: 2,
            paddingBottom: 2,
            transition: "background 0.2s, border-color 0.2s",
            backdropFilter: "blur(16px)",
          }}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          Aaron
          <span
            className="absolute top-1 right-1 flex items-center justify-center"
            style={{ width: 16, height: 16, border: `1px solid ${BORDER}`, borderRadius: 5 }}
          >
            <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
              <path d="M2 8L8 2M8 2H4.5M8 2V5.5" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </Link>
      </h1>
      <p
        className="text-[15px] md:text-[17px] leading-relaxed w-full max-w-[520px]"
        style={{ color: MUTED }}
      >
        I'm a designer leading activation growth experiments at Constant Contact. Here are some noteworthy projects.
      </p>
    </section>
  );
}

// ─── Project Card ─────────────────────────────────────────────────────────────
type ProjectData = {
  date: string; company: string; headline: string; title: string;
  tags: { label: string }[]; description: string;
  accentColor: "purple" | "blue" | "green" | "none";
  href?: string; comingSoon?: boolean;
  videoSrc?: string; imageSrc?: string;
  timelinePt?: string; index?: number;
};

function ProjectCard({ p }: { p: ProjectData }) {
  const { hovered, onMouseEnter, onMouseLeave } = useHover();

  const inner = (
    <div className="flex flex-col md:flex-row mb-12 gap-0 md:gap-6 md:min-h-[1100px]">
      {/* Left column */}
      <div className="md:w-[140px] shrink-0 md:mr-12 flex flex-col px-4 md:px-0 pt-4 md:pt-3">
        {p.index !== undefined && (
          <p className="md:hidden text-[11px] font-mono mb-2 tracking-widest" style={{ color: `rgba(107,111,118,0.5)` }}>
            {String(p.index).padStart(2, "0")}
          </p>
        )}
        <div className="hidden md:block mb-2 md:mb-0">
          <p className="text-[13px] font-medium leading-snug font-mono" style={{ color: TEXT }}>{p.date}</p>
          <p className="text-[12px] leading-snug md:mb-4 font-mono" style={{ color: MUTED }}>{p.company}</p>
        </div>
        <div className={`hidden md:flex justify-center pr-[55px] flex-1 ${p.timelinePt ?? "pt-[40px]"}`}>
          <TimelineDashes className="h-full" />
        </div>
      </div>

      {/* Right column — glass card */}
      <div
        className="flex-1 min-w-0 pb-12 px-4 md:px-6 pt-4 md:pt-5 md:self-start"
        style={glassCard(hovered)}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {/* Title row */}
        <div className="flex items-center justify-between gap-4 md:gap-6 mb-3 md:mb-4">
          <h3 className="text-[16px] font-bold tracking-[-0.02em]" style={{ color: MUTED }}>{p.title}</h3>
          {p.comingSoon ? (
            <span className="inline-flex items-center gap-1.5 text-[12px] font-medium whitespace-nowrap" style={{ color: MUTED }}>
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
          ) : p.href ? (
            <div
              className="w-9 h-9 flex items-center justify-center shrink-0"
              style={{
                background: "transparent",
                border: `1px solid ${BORDER}`,
                borderRadius: 10,
                opacity: hovered ? 1 : 0,
                transform: hovered ? "translateX(0)" : "translateX(10px)",
                transition: "opacity 0.25s ease, transform 0.25s ease",
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3 11L11 3M11 3H5.5M11 3V8.5" stroke={MUTED} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          ) : null}
        </div>

        <h2
          className="text-[1.1rem] md:text-[1.75rem] font-bold leading-[1.2] tracking-[-0.01em] mb-4 md:mb-6"
          style={{ color: TEXT }}
        >
          {highlightMetrics(p.headline)}
        </h2>

        {/* Media */}
        <div
          className="relative w-full aspect-[4/3] flex items-center justify-center overflow-hidden mb-4 md:mb-6"
          style={{ borderRadius: 12, background: accentBg[p.accentColor], border: `1px solid ${BORDER}` }}
        >
          {p.videoSrc
            ? <LazyVideo src={p.videoSrc} className="w-full h-full" />
            : p.imageSrc
              ? <img src={p.imageSrc} alt={p.title} className="w-full h-full object-cover" />
              : (
                <div className="w-48 h-[320px] md:w-56 md:h-[380px] rounded-[2rem] flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${BORDER}` }}>
                  <span className="text-xs" style={{ color: MUTED }}>{p.title}</span>
                </div>
              )
          }
        </div>

        {/* Mobile date */}
        <div className="flex items-center gap-2 md:hidden mb-3 mt-3">
          <span className="text-[11px] font-mono" style={{ color: MUTED }}>{p.date}</span>
          <span className="text-[11px] font-mono" style={{ color: `rgba(107,111,118,0.4)` }}>·</span>
          <span className="text-[11px] font-mono" style={{ color: MUTED }}>{p.company}</span>
        </div>

        {/* Tags */}
        <div className="hidden md:flex flex-wrap items-center gap-x-2 gap-y-1 mb-3 md:mb-4">
          {p.tags.map((tag, i) => (
            <span key={tag.label} className="inline-flex items-center gap-2">
              {i > 0 && <span className="text-[11px] font-mono" style={{ color: `rgba(107,111,118,0.4)` }}>·</span>}
              <span className="text-[11px] font-mono uppercase tracking-wide" style={{ color: MUTED }}>{tag.label}</span>
            </span>
          ))}
        </div>

        <p className="text-[13.5px] leading-relaxed max-w-[520px]" style={{ color: MUTED }}>{p.description}</p>
      </div>
    </div>
  );

  return p.href && !p.comingSoon
    ? <Link href={p.href} className="block">{inner}</Link>
    : inner;
}

const projects: ProjectData[] = [
  { date: "Jan 9, 2026", company: "Constant Contact", headline: "Initial results show 24% lift in send completion, improving activation", title: "Schedule Page", tags: [{ label: "Growth Experiment" }, { label: "Design lead" }], description: "By lowering cognitive overhead and improving send flow, early results from this experiment are showing an improvement in trial user sends, improving heavy drop off rate.", accentColor: "purple", comingSoon: true, imageSrc: "/animations/schedulepage.jpg", index: 1 },
  { date: "Dec 15, 2025", company: "Constant Contact", headline: "+69% increase in first email sends by streamlining mobile web activation flows", title: "Mobile Web Experience", tags: [{ label: "Growth Experiment" }, { label: "Design lead" }, { label: "6-day turnaround" }, { label: "Figma Make" }], description: "Reduced cognitive overhead across creation, sending, and required setup steps to accelerate activation without impacting monetization.", accentColor: "purple", href: "/mobilewebexperience", videoSrc: "/animations/mweb-experience.mp4", index: 2 },
  { date: "Nov 3, 2025", company: "Constant Contact", headline: "2x creator-to-sender conversion and +125% lift in second email sends", title: "Mobile Email Editor", tags: [{ label: "Growth Experiment" }, { label: "Patent Pending" }, { label: "Design lead" }], description: "Adapted a previously validated native editor into a robust mobile web system to strengthen the send–refine–send behavior tied directly to activation and revenue.", accentColor: "blue", href: "/mobileeditor", videoSrc: "/animations/mobile-editor.mp4", index: 3 },
  { date: "Nov 19, 2025", company: "Constant Contact", headline: "+11.9% lift in file upload adoption by reducing friction in high intent workflow", title: "Contacts Upload Experience", tags: [{ label: "Lead growth designer" }, { label: "~24,000 monthly users" }, { label: "Statsig in 1.5 weeks" }, { label: "Growth Experiment" }], description: "Simplified upload, mapping, and consent flows to eliminate false completion signals and increase list growth in a high-intent moment.", accentColor: "blue", href: "/contacts", videoSrc: "/animations/contacts-upload.mp4", index: 4 },
  { date: "May 12, 2025", company: "Constant Contact", headline: "+140% increase in post completion and +81% increase in feature adoption", title: "Social Management", tags: [{ label: "New Feature" }], description: "Reduced friction in cross-posting by unifying account selection, clarifying posting states, and guiding users on what to publish.", accentColor: "green", href: "/social", videoSrc: "/animations/social.mp4", index: 5 },
  { date: "Nov 24, 2021", company: "Constant Contact", headline: "21% lift in trial user activation + conversions", title: "Brand Kit", tags: [{ label: "Feature" }, { label: "400,000+ users" }], description: "Replaced manual brand configuration with a guided, automated system that maps logos and colors intelligently, reducing setup friction.", accentColor: "green", href: "/brandkit", videoSrc: "/animations/brandkit.mp4", timelinePt: "pt-[52px]", index: 6 },
];

// ─── Section label ────────────────────────────────────────────────────────────
function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-2" style={{ paddingTop: 32 }}>
      <span className="text-[11px] font-mono uppercase tracking-widest shrink-0" style={{ color: MUTED }}>{label}</span>
      <div className="flex-1 h-px" style={{ background: BORDER }} />
    </div>
  );
}

// ─── AI Workflow ──────────────────────────────────────────────────────────────
type AICardData = {
  title: string; description: string; tags: string[];
  preview?: React.ComponentType<{ isActive: boolean }>;
};

const aiCards: AICardData[] = [
  { title: "Prototyping in production", description: "I clone the live production repo, use asset override URLs to point the running app at local files, then use Claude Code to make design changes directly in the codebase. The output is a branch developers can review and ship with no design translation layer.", tags: ["Claude Code", "React", "GitHub"], preview: ProductionPrototypingAnimation },
  { title: "Data analysis", description: "I connect Cursor to Snowflake through an API to explore, query, and understand user behavior data, making design decisions based on raw usage patterns.", tags: ["Cursor", "Snowflake"], preview: DataFlowAnimation },
  { title: "Design ideation", description: "I use AI to rapidly ideate and iterate on design concepts, from early exploration through high-fidelity refinement, across Cursor and Figma Make.", tags: ["Cursor", "Figma Make"], preview: DesignIterationAnimation },
  { title: "Organization", description: "I connect to Jira and build personal dashboards that surface real-time project data, helping me create tasks, track progress, and stay organized across workstreams.", tags: ["Cursor", "Jira"], preview: OrganizationAnimation },
];

function AIFeaturedCard({ card, isActive }: { card: AICardData; isActive: boolean }) {
  const { hovered, onMouseEnter, onMouseLeave } = useHover();
  const Preview = card.preview;
  return (
    <div className="flex flex-col md:flex-row overflow-hidden" style={glassCard(hovered)}
      onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="flex flex-col p-6 md:p-8 md:w-[42%] shrink-0">
        <h3 className="text-[18px] font-semibold mb-2" style={{ color: TEXT, letterSpacing: "-0.02em" }}>{card.title}</h3>
        <p className="text-[13px] leading-relaxed mb-5 flex-1" style={{ color: MUTED }}>{card.description}</p>
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {card.tags.map(tag => (
            <span key={tag} className="text-[10px] px-2.5 py-1 rounded-full font-medium"
              style={{ background: "rgba(255,255,255,0.05)", border: `1px solid ${BORDER}`, color: MUTED }}>{tag}</span>
          ))}
        </div>
      </div>
      <div className="flex-1 min-h-[220px] md:min-h-[360px] flex items-center justify-center overflow-hidden"
        style={{ borderLeft: `1px solid ${BORDER}` }}>
        {Preview && <Preview isActive={isActive} />}
      </div>
    </div>
  );
}

function AICard({ card, isActive }: { card: AICardData; isActive: boolean }) {
  const { hovered, onMouseEnter, onMouseLeave } = useHover();
  const Preview = card.preview;
  return (
    <div className="flex flex-col overflow-hidden" style={glassCard(hovered)}
      onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="p-5 pb-4">
        <h3 className="text-[15px] font-semibold mb-1.5" style={{ color: TEXT, letterSpacing: "-0.02em" }}>{card.title}</h3>
        <p className="text-[12px] leading-relaxed mb-4" style={{ color: MUTED }}>{card.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {card.tags.map(tag => (
            <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full"
              style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${BORDER}`, color: MUTED }}>{tag}</span>
          ))}
        </div>
      </div>
      <div className="flex-1 min-h-[180px] flex items-center justify-center overflow-hidden"
        style={{ borderTop: `1px solid ${BORDER}` }}>
        {Preview && <Preview isActive={isActive} />}
      </div>
    </div>
  );
}

function AIWorkflow() {
  const [isActive, setIsActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setIsActive(e.isIntersecting), { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const [featured, ...rest] = aiCards;
  return (
    <section ref={ref} className="max-w-[1200px] mx-auto px-5 md:px-10 pb-24 mb-[72px]">
      <SectionLabel label="AI Workflow" />
      <div className="mb-8">
        <h2 className="text-[28px] md:text-[36px] font-semibold mb-2" style={{ color: TEXT, letterSpacing: "-0.03em" }}>
          How I use AI in my work.
        </h2>
        <p className="text-[13px]" style={{ color: MUTED }}>Data analysis, design ideation, organization, and building. AI is part of every phase.</p>
      </div>
      <div className="flex flex-col gap-4">
        <AIFeaturedCard card={featured} isActive={isActive} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {rest.map(card => <AICard key={card.title} card={card} isActive={isActive} />)}
        </div>
      </div>
    </section>
  );
}

// ─── Personal Projects ────────────────────────────────────────────────────────
type PersonalProjectData = {
  title: string; description: string; tags: string[];
  status?: string; href?: string; accentColor: string;
};

const personalProjects: PersonalProjectData[] = [
  { title: "Mission Control", description: "A live ops dashboard that aggregates Claude Code session history, installed skills, and connected MCP servers into a single view. Built entirely with Claude Code to track everything I build with Claude Code.", tags: ["Claude Code", "Next.js"], href: "https://mission-control-acportfolio.vercel.app", accentColor: ACCENT },
  { title: "Flowki", description: "A focused, lightweight task system designed to help individuals plan clearly, execute consistently, and ship daily without complexity.", tags: ["Figma Make", "Supabase"], href: "#", accentColor: "#26B5CE" },
  { title: "Pro UX Kit", description: "A practical toolkit of high-leverage UX frameworks, templates, and prompts designed to help product designers think sharper and move faster.", tags: ["Figma Make"], href: "#", accentColor: "#E8A838" },
  { title: "DeskFit", description: "A simple, desk-friendly fitness app that builds daily mobility, strength, and hydration habits for people who sit most of the day.", tags: ["Cursor", "Xcode"], status: "In Development", accentColor: "#4CAF7D" },
];

function PersonalProjectCard({ project }: { project: PersonalProjectData }) {
  const { hovered, onMouseEnter, onMouseLeave } = useHover();
  const inner = (
    <div className="flex flex-col h-full p-5" style={glassCard(hovered)}
      onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="flex items-start justify-between mb-4">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: project.accentColor + "20", border: `1px solid ${project.accentColor}30` }}>
          <div className="w-2.5 h-2.5 rounded-sm" style={{ background: project.accentColor }} />
        </div>
        <div className="flex items-center gap-2">
          {project.status && <span className="text-[10px]" style={{ color: MUTED }}>{project.status}</span>}
          {project.href && (
            <div className="w-8 h-8 flex items-center justify-center rounded-lg"
              style={{ border: `1px solid ${BORDER}`, color: MUTED }}>
              <svg width="12" height="12" viewBox="0 0 10 10" fill="none">
                <path d="M2 8L8 2M8 2H3.5M8 2V6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          )}
        </div>
      </div>
      <h3 className="text-[15px] font-semibold mb-1.5" style={{ color: TEXT, letterSpacing: "-0.02em" }}>{project.title}</h3>
      <p className="text-[12px] leading-relaxed mb-4 flex-1" style={{ color: MUTED }}>{project.description}</p>
      <div className="flex flex-wrap gap-1.5">
        {project.tags.map(tag => (
          <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full"
            style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${BORDER}`, color: MUTED }}>{tag}</span>
        ))}
      </div>
    </div>
  );
  return project.href
    ? <a href={project.href} className="block h-full" target={project.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">{inner}</a>
    : inner;
}

function PersonalProjects() {
  const [mc, flowki, proUX, deskFit] = personalProjects;
  return (
    <section className="max-w-[1200px] mx-auto px-5 md:px-10 pb-32">
      <SectionLabel label="Personal Projects" />
      <div className="mb-8">
        <h2 className="text-[28px] md:text-[36px] font-semibold mb-2" style={{ color: TEXT, letterSpacing: "-0.03em" }}>Things I build for myself.</h2>
        <p className="text-[13px]" style={{ color: MUTED }}>AI-powered tools I made to streamline my own daily work.</p>
      </div>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4">
          <PersonalProjectCard project={mc} />
          <PersonalProjectCard project={proUX} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4">
          <PersonalProjectCard project={deskFit} />
          <PersonalProjectCard project={flowki} />
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="px-5 md:px-[240px] py-16 md:py-[247px]" style={{ background: BG, borderTop: `1px solid ${BORDER}` }}>
      <div className="max-w-[750px] mx-auto text-center">
        <h2
          className="text-[1.5rem] md:text-4xl lg:text-[2.75rem] font-bold leading-tight tracking-tight mb-3 md:mb-4"
          style={{ color: TEXT }}
        >
          I design for teams that care about doing it right.
        </h2>
        <p className="text-[14px] md:text-[15px] mb-8 md:mb-10 font-[family-name:var(--font-inter)]" style={{ color: MUTED }}>
          If that&rsquo;s your team, let&rsquo;s talk &ndash; or send me a cat video
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <a
            href="mailto:hello@aaroncougle.com"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 md:py-3 text-sm font-semibold transition-colors duration-200 font-[family-name:var(--font-inter)]"
            style={{ background: TEXT, color: BG, borderRadius: 8 }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2L11 13" /><path d="M22 2L15 22L11 13L2 9L22 2Z" />
            </svg>
            Email
          </a>
          <a
            href="https://linkedin.com/in/aaroncougle"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-10 py-3.5 md:py-3 text-sm font-semibold transition-colors duration-200 font-[family-name:var(--font-inter)]"
            style={{ border: `2px solid ${TEXT}`, color: TEXT, borderRadius: 8 }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Home() {
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
    <div style={{ ...(isDark ? darkVars : lightVars), background: BG, color: TEXT, minHeight: "100vh", transition: "background 0.4s, color 0.4s" }}>
      <Nav isDark={isDark} onToggle={toggleTheme} />
      <Hero />

      <section className="max-w-[1200px] mx-auto px-5 md:px-10 pb-6 flex flex-col gap-12 md:gap-0">
        <p className="hidden md:block text-[11px] font-mono uppercase tracking-widest mb-2 pt-4" style={{ color: MUTED }}>
          Recent Projects
        </p>
        {projects.slice(0, 2).map(p => (
          <ProjectCard key={p.title} p={p} />
        ))}
      </section>

      <AIWorkflow />

      <section className="max-w-[1200px] mx-auto px-5 md:px-10 pb-6 flex flex-col gap-12 md:gap-0">
        {projects.slice(2).map(p => (
          <ProjectCard key={p.title} p={p} />
        ))}
      </section>

      <PersonalProjects />
      <Footer />
    </div>
  );
}

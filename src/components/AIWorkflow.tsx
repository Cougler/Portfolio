"use client";

import { useState, useEffect, useRef } from "react";
import DataFlowAnimation from "./DataFlowAnimation";
import DesignIterationAnimation from "./DesignIterationAnimation";
import OrganizationAnimation from "./OrganizationAnimation";
import SiteControls from "./SiteControls";
import ProductionPrototypingAnimation from "./ProductionPrototypingAnimation";

type AICard = {
  id?: string;
  title: string;
  description: string;
  tags: { label: string; icon: React.ReactNode }[];
  icon: React.ReactNode;
  preview?: React.ComponentType<{ isActive: boolean }>;
  blobColors?: [string, string, string];
  bg: string;
};

const IconImg = ({ src, alt, size = 12 }: { src: string; alt: string; size?: number }) => (
  <img src={src} alt={alt} width={size} height={size} className="shrink-0" />
);

const CursorIcon = () => <IconImg src="/icons/cursor.svg" alt="Cursor" />;
const ClaudeIcon = () => <IconImg src="/icons/claude.png" alt="Claude" />;
const SnowflakeIcon = () => <IconImg src="/icons/snowflake-logo.svg" alt="Snowflake" />;
const FigmaMakeIcon = () => <IconImg src="/icons/FigmaMakeIcon.svg" alt="Figma Make" />;
const JiraIcon = () => <IconImg src="/icons/jira.svg" alt="Jira" />;
const ReactIcon = () => <IconImg src="/icons/react.svg" alt="React" />;
const GitHubIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-foreground shrink-0">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const BarChartIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted">
    <rect x="3" y="12" width="4" height="9" rx="1" />
    <rect x="10" y="7" width="4" height="14" rx="1" />
    <rect x="17" y="3" width="4" height="18" rx="1" />
  </svg>
);

const PenToolIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted">
    <path d="M12 19l7-7 3 3-7 7-3-3z" />
    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
    <path d="M2 2l7.586 7.586" />
    <circle cx="11" cy="11" r="2" />
  </svg>
);

const LayoutIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18" />
    <path d="M9 21V9" />
  </svg>
);

const CodeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted">
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const cards: AICard[] = [
  {
    title: "Prototyping in production",
    description:
      "I clone the live production repo, use asset override URLs to point the running app at local files, then use Claude Code to make design changes directly in the codebase. The output is a branch developers can review and ship with no design translation layer.",
    tags: [
      { label: "Claude Code", icon: <ClaudeIcon /> },
      { label: "React", icon: <ReactIcon /> },
      { label: "GitHub", icon: <GitHubIcon /> },
    ],
    icon: <CodeIcon />,
    preview: ProductionPrototypingAnimation,
    bg: "#e8edff",
  },
  {
    id: "ai-data",
    title: "Data analysis",
    description:
      "I connect Cursor to Snowflake through an API to explore, query, and understand user behavior data, making design decisions based on raw usage patterns.",
    tags: [
      { label: "Cursor", icon: <CursorIcon /> },
      { label: "Snowflake", icon: <SnowflakeIcon /> },
    ],
    icon: <BarChartIcon />,
    preview: DataFlowAnimation,
    blobColors: ["#29B5E8", "#6366f1", "#a78bfa"],
    bg: "#dff0ff",
  },
  {
    id: "ai-design",
    title: "Design ideation",
    description:
      "I use AI to rapidly ideate and iterate on design concepts, from early exploration through high-fidelity refinement, across Cursor and Figma Make.",
    tags: [
      { label: "Cursor", icon: <CursorIcon /> },
      { label: "Figma Make", icon: <FigmaMakeIcon /> },
    ],
    icon: <PenToolIcon />,
    preview: DesignIterationAnimation,
    blobColors: ["#a259ff", "#ff7262", "#6366f1"],
    bg: "#f2ebff",
  },
  {
    id: "ai-organization",
    title: "Organization",
    description:
      "I connect to Jira and build personal dashboards that surface real-time project data, helping me create tasks, track progress, and stay organized across workstreams.",
    tags: [
      { label: "Cursor", icon: <CursorIcon /> },
      { label: "Jira", icon: <JiraIcon /> },
    ],
    icon: <LayoutIcon />,
    preview: OrganizationAnimation,
    blobColors: ["#0052CC", "#2684FF", "#6366f1"],
    bg: "#e8f0e8",
  },
];

function FeaturedAICard({ card, isActive }: { card: AICard; isActive: boolean }) {
  const Preview = card.preview;
  return (
    <div
      id={card.id}
      className="flex flex-col md:flex-row overflow-hidden"
      style={{ borderRadius: "var(--theme-card-radius, 16px)", background: card.bg }}
    >
      {/* Copy — left on desktop, top on mobile */}
      <div className="flex flex-col p-6 md:p-8 md:w-[42%] shrink-0">
        <div className="mb-3">{card.icon}</div>
        <h3 className="text-xl font-bold mb-2">{card.title}</h3>
        <p className="text-[13px] text-muted leading-relaxed mb-5 font-[family-name:var(--font-inter)]">
          {card.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {card.tags.map((tag) => (
            <span
              key={tag.label}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium border border-border bg-white text-foreground font-[family-name:var(--font-inter)]"
              style={{ borderRadius: "var(--theme-tag-radius, 9999px)" }}
            >
              {tag.icon}
              {tag.label}
            </span>
          ))}
        </div>
      </div>

      {/* Animation — right on desktop, bottom on mobile */}
      <div className="flex-1 min-h-[240px] flex items-center justify-center overflow-hidden relative">
        {Preview ? (
          <Preview isActive={isActive} />
        ) : (
          <span className="text-[11px] text-muted font-[family-name:var(--font-inter)]">
            {card.title} preview
          </span>
        )}
      </div>
    </div>
  );
}

function AICard({ card, isActive }: { card: AICard; isActive: boolean }) {
  const Preview = card.preview;
  return (
    <div id={card.id} className="border border-transparent p-5 flex flex-col h-full" style={{ borderRadius: "var(--theme-card-radius, 16px)", background: card.bg }}>
      <div className="mb-3">{card.icon}</div>

      <h3 className="text-lg font-bold mb-1.5">{card.title}</h3>
      <p className="text-[13px] text-muted leading-relaxed mb-4 font-[family-name:var(--font-inter)]">
        {card.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {card.tags.map((tag) => (
          <span
            key={tag.label}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium border border-border bg-white text-foreground font-[family-name:var(--font-inter)]"
            style={{ borderRadius: "var(--theme-tag-radius, 9999px)" }}
          >
            {tag.icon}
            {tag.label}
          </span>
        ))}
      </div>

      <div
        className="mt-auto w-full flex-1 min-h-[180px] flex items-center justify-center overflow-hidden relative"
        style={{ borderRadius: "var(--theme-card-radius, 12px)" }}
      >
        {Preview ? (
          <Preview isActive={isActive} />
        ) : (
          <span className="text-[11px] text-muted font-[family-name:var(--font-inter)]">
            {card.title} preview
          </span>
        )}
      </div>
    </div>
  );
}


export default function AIWorkflow() {
  const [isActive, setIsActive] = useState(false);
  const [featured, ...rest] = cards;
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsActive(entry.isIntersecting),
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="ai-workflow-bg">
      <section className="max-w-[1300px] mx-auto px-5 md:px-10 pt-10 md:pt-12 pb-10 md:pb-12 mb-16 md:mb-[150px] flex flex-col gap-5">
        <div className="mb-6 md:mb-10">
          <span className="ai-section-eyebrow">AI Workflow</span>
          <h2 className="ai-section-title">How I use AI in my work.</h2>
          <p className="ai-section-sub">Data analysis, design ideation, organization, and building. AI is part of every phase.</p>
        </div>

        <FeaturedAICard card={featured} isActive={isActive} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-5">
          {rest.map((card, i) => (
            <AICard key={i} card={card} isActive={isActive} />
          ))}
        </div>
      </section>
    </div>
  );
}

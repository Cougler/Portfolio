"use client";

import { useState } from "react";
import DataFlowAnimation from "./DataFlowAnimation";
import DesignIterationAnimation from "./DesignIterationAnimation";
import OrganizationAnimation from "./OrganizationAnimation";
import SiteControls from "./SiteControls";

type AICard = {
  id?: string;
  title: string;
  description: string;
  tags: { label: string; icon: React.ReactNode }[];
  icon: React.ReactNode;
  preview?: React.ComponentType<{ isActive: boolean }>;
  blobColors?: [string, string, string];
};

const IconImg = ({ src, alt, size = 12 }: { src: string; alt: string; size?: number }) => (
  <img src={src} alt={alt} width={size} height={size} className="shrink-0" />
);

const CursorIcon = () => <IconImg src="/icons/cursor.svg" alt="Cursor" />;
const SnowflakeIcon = () => <IconImg src="/icons/snowflake-logo.svg" alt="Snowflake" />;
const FigmaMakeIcon = () => <IconImg src="/icons/FigmaMakeIcon.svg" alt="Figma Make" />;
const JiraIcon = () => <IconImg src="/icons/jira.svg" alt="Jira" />;
const ReactIcon = () => <IconImg src="/icons/react.svg" alt="React" />;

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
  },
  {
    title: "Building this site",
    description:
      "I built this portfolio as a React app in Cursor, from layout and components to interactions and deployment, using AI as a development partner throughout.",
    tags: [
      { label: "Cursor", icon: <CursorIcon /> },
      { label: "React", icon: <ReactIcon /> },
    ],
    icon: <CodeIcon />,
    preview: SiteControls,
  },
];

function AICard({ card, isActive }: { card: AICard; isActive: boolean }) {
  const Preview = card.preview;
  return (
    <div id={card.id} className="border border-transparent p-5 flex flex-col h-full bg-[#fafafa]" style={{ borderRadius: "var(--theme-card-radius, 16px)" }}>
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
        className={`mt-auto w-full flex-1 min-h-[200px] flex items-center justify-center overflow-hidden relative ${
          Preview && card.blobColors ? "ai-preview-bg" : ""
        }`}
        style={{
          borderRadius: "var(--theme-card-radius, 12px)",
          background: Preview && !card.blobColors ? "var(--theme-card-bg, #f5f5f7)" : !Preview ? "var(--theme-card-bg, #f5f5f7)" : undefined,
        }}
      >
        {Preview ? (
          <>
            {card.blobColors && (
              <>
                <div
                  className="ai-blob ai-blob-1"
                  style={{ background: card.blobColors[0] }}
                />
                <div
                  className="ai-blob ai-blob-2"
                  style={{ background: card.blobColors[1] }}
                />
                <div
                  className="ai-blob ai-blob-3"
                  style={{ background: card.blobColors[2] }}
                />
              </>
            )}
            <Preview isActive={isActive} />
          </>
        ) : (
          <span className="text-[11px] text-muted font-[family-name:var(--font-inter)]">
            {card.title} preview
          </span>
        )}
      </div>
    </div>
  );
}

const PulsingDot = () => (
  <span className="relative flex h-2.5 w-2.5 mt-[9px]">
    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
  </span>
);

export default function AIWorkflow() {
  const [isActive, setIsActive] = useState(false);

  return (
    <div
      className="ai-workflow-bg"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      <section className="max-w-[1300px] mx-auto px-5 md:px-10 pt-10 md:pt-12 pb-10 md:pb-12 mb-16 md:mb-[150px] flex flex-col gap-5">
        <div className="ai-section-badge mb-6 md:mb-10">
          <PulsingDot />
          <div className="ai-section-badge-text">
            <span className="ai-section-badge-title">Accelerating Insight and Execution with AI</span>
            <span className="ai-section-badge-sub">I use AI to search and understand data, ideate and iterate design, stay organized, and build.</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
          {cards.map((card, i) => (
            <AICard key={i} card={card} isActive={isActive} />
          ))}
        </div>
      </section>
    </div>
  );
}

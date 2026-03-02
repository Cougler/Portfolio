type PersonalProject = {
  title: string;
  description: string;
  tags: { label: string; icon: React.ReactNode }[];
  status?: string;
  icon: React.ReactNode;
  href?: string;
};

const IconImg = ({ src, alt, size = 12 }: { src: string; alt: string; size?: number }) => (
  <img src={src} alt={alt} width={size} height={size} className="shrink-0" />
);

const FigmaIcon = () => <IconImg src="/icons/FigmaMakeIcon.svg" alt="Figma Make" />;
const SupabaseIcon = () => <IconImg src="/icons/SupabaseIcon.svg" alt="Supabase" />;
const CursorIcon = () => <IconImg src="/icons/cursor.svg" alt="Cursor" />;
const XCodeIcon = () => <IconImg src="/icons/xcode.svg" alt="Xcode" />;

const FlowkiLogo = () => (
  <img src="/icons/FlowkiIcon.svg" alt="Flowki" width={40} height={40} className="rounded-lg shrink-0" />
);

const DeskFitLogo = () => (
  <img src="/icons/DeskfiIcon.svg" alt="DeskFit" width={40} height={40} className="rounded-lg shrink-0" />
);

const ProUXLogo = () => (
  <img src="/icons/prouxkit.svg" alt="Pro UX Kit" width={40} height={40} className="rounded-lg shrink-0" />
);

const ExternalLinkIcon = () => (
  <div className="w-9 h-9 border border-border flex items-center justify-center text-muted hover:text-foreground transition-colors duration-200" style={{ borderRadius: "var(--theme-button-radius, 8px)" }}>
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  </div>
);

const projects: PersonalProject[] = [
  {
    title: "Flowki",
    description:
      "A focused, lightweight task system designed to help individuals plan clearly, execute consistently, and ship daily without complexity.",
    tags: [
      { label: "Figma Make", icon: <FigmaIcon /> },
      { label: "Supabase", icon: <SupabaseIcon /> },
    ],
    icon: <FlowkiLogo />,
    href: "#",
  },
  {
    title: "DeskFit",
    description:
      "A simple, desk-friendly fitness app that builds daily mobility, strength, and hydration habits for people who sit most of the day.",
    tags: [
      { label: "Cursor", icon: <CursorIcon /> },
      { label: "XCode", icon: <XCodeIcon /> },
    ],
    status: "In Development",
    icon: <DeskFitLogo />,
  },
  {
    title: "Pro UX Kit",
    description:
      "A practical toolkit of high-leverage UX frameworks, templates, and prompts designed to help product designers think sharper, move faster, and communicate at a higher level.",
    tags: [{ label: "Figma Make", icon: <FigmaIcon /> }],
    icon: <ProUXLogo />,
    href: "#",
  },
];

function PersonalProjectCard({ project, compact = false }: { project: PersonalProject; compact?: boolean }) {
  return (
    <div
      className={`border border-border p-5 flex flex-col h-full shadow-none ${compact ? "md:max-h-[380px]" : ""}`}
      style={{ borderRadius: "var(--theme-card-radius, 16px)" }}
    >
      <div className="flex items-start justify-between mb-4">
        {project.icon}
        <div className="flex items-center gap-3">
          {project.status && (
            <span className="text-[11px] font-medium text-muted italic whitespace-nowrap font-[family-name:var(--font-inter)]">
              {project.status}
            </span>
          )}
          {project.href && <ExternalLinkIcon />}
        </div>
      </div>

      <h3 className="text-lg font-bold mb-1.5">{project.title}</h3>
      <p className="text-[13px] text-muted leading-relaxed mb-4 font-[family-name:var(--font-inter)]">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.tags.map((tag) => (
          <span
            key={tag.label}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium border border-border text-foreground font-[family-name:var(--font-inter)]"
            style={{ borderRadius: "var(--theme-tag-radius, 9999px)" }}
          >
            {tag.icon}
            {tag.label}
          </span>
        ))}
      </div>

      <div
        className="mt-auto w-full flex-1 min-h-0 flex items-center justify-center overflow-hidden"
        style={{ borderRadius: "var(--theme-card-radius, 12px)", background: "var(--theme-card-bg, #f5f5f7)" }}
      >
        <span className="text-[11px] text-muted font-[family-name:var(--font-inter)]">
          {project.title} preview
        </span>
      </div>
    </div>
  );
}

export default function PersonalProjects() {
  return (
    <section
      id="ai-section"
      className="max-w-[1300px] mx-auto px-5 md:px-10 pt-0 pb-16 md:pb-24"
    >
      <h2 className="section-heading">
        Personal Projects
      </h2>
      <p className="text-[14px] md:text-[15px] text-muted mb-6 md:mb-10 font-[family-name:var(--font-inter)]">
        I create AI-powered tools to streamline my daily tasks.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-5">
        <PersonalProjectCard project={projects[0]} />

        <div className="flex flex-col gap-5 md:h-[780px]">
          <PersonalProjectCard project={projects[2]} compact />
          <PersonalProjectCard project={projects[1]} compact />
        </div>
      </div>
    </section>
  );
}

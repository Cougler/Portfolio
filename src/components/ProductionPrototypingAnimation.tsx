"use client";

const CYCLE = 9;

const styles = `
@keyframes cliScroll {
  from { transform: translateY(0); }
  to   { transform: translateY(-50%); }
}

@keyframes heroBg {
  0%, 8%    { background: #f0f2f5; }
  18%, 42%  { background: #dde8ff; }
  52%, 100% { background: #f0f2f5; }
}

@keyframes textLineWidth {
  0%, 40%  { width: 45%; }
  52%, 72% { width: 72%; }
  82%, 100%{ width: 45%; }
}

@keyframes ctaColor {
  0%, 58%  { background: rgba(79,70,229,0.10); }
  70%, 88% { background: rgba(79,70,229,0.40); }
  96%, 100%{ background: rgba(79,70,229,0.10); }
}

@keyframes cardBorder {
  0%, 58%  { border-color: transparent; }
  68%, 88% { border-color: rgba(79,70,229,0.35); }
  96%, 100%{ border-color: transparent; }
}

@keyframes particleFade {
  0%   { opacity: 0.9; }
  50%  { opacity: 0.4; }
  100% { opacity: 0.9; }
}
`;

function CliLines() {
  const lines = [
    ["$", "claude edit Hero.tsx", "#6366f1"],
    ["✓", "background updated", "#28c840"],
    ["✓", "padding: 2rem", "#28c840"],
    ["$", "claude edit Button.tsx", "#6366f1"],
    ["✓", "color → accent", "#28c840"],
    ["$", "claude edit Card.tsx", "#6366f1"],
    ["✓", "border added", "#28c840"],
    ["$", "git push origin", "#6366f1"],
    ["✓", "branch pushed", "#28c840"],
  ];

  return (
    <>
      {lines.map((line, i) => (
        <div key={i} className="flex items-center gap-[3px]">
          <span
            className="font-mono shrink-0"
            style={{ fontSize: "5.5px", color: line[2] as string, minWidth: 7 }}
          >
            {line[0]}
          </span>
          <div
            className="h-[2.5px] rounded-sm"
            style={{
              width: `${28 + (i % 4) * 7}px`,
              background: line[2] === "#28c840"
                ? "rgba(40,200,64,0.45)"
                : "rgba(99,102,241,0.45)",
            }}
          />
        </div>
      ))}
    </>
  );
}

function CliPanel({ isActive }: { isActive: boolean }) {
  return (
    <div className="flex flex-col rounded-md border border-[#222226] bg-[#0d0d0f] shadow-sm overflow-hidden w-[100px] md:w-[115px] shrink-0 self-center">
      {/* Minimal title */}
      <div className="flex items-center gap-1 px-1.5 py-1 bg-[#111113] border-b border-[#222226]">
        <span className="w-[4px] h-[4px] rounded-full bg-[#ff5f57]" />
        <span className="w-[4px] h-[4px] rounded-full bg-[#febc2e]" />
        <span className="w-[4px] h-[4px] rounded-full bg-[#28c840]" />
        <span className="ml-auto font-mono text-[5.5px] text-[#6366f1] tracking-wide">claude</span>
      </div>

      {/* Scrolling output */}
      <div style={{ overflow: "hidden", height: 72 }}>
        <div
          style={{
            animation: `cliScroll ${CYCLE * 1.3}s linear infinite`,
            animationPlayState: isActive ? "running" : "paused",
          }}
        >
          <div className="flex flex-col gap-[5px] px-1.5 py-1.5">
            <CliLines />
          </div>
          <div className="flex flex-col gap-[5px] px-1.5 py-1.5">
            <CliLines />
          </div>
        </div>
      </div>
    </div>
  );
}

function GitHubPanel() {
  return (
    <div className="flex flex-col rounded-md border border-[#30363d] bg-[#161b22] shadow-sm overflow-hidden w-[100px] md:w-[115px] shrink-0">
      {/* Header */}
      <div className="flex items-center gap-1 px-1.5 py-1 border-b border-[#30363d]">
        <svg width="8" height="8" viewBox="0 0 24 24" fill="#8b949e">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
        </svg>
        <span className="text-[5.5px] text-[#8b949e] font-mono tracking-wide">GitHub</span>
      </div>

      {/* Branch row */}
      <div className="flex items-center gap-1 px-1.5 py-[4px] border-b border-[#30363d]/60">
        <svg width="7" height="7" viewBox="0 0 16 16" fill="#3fb950">
          <path d="M11.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5zm-2.25.75a2.25 2.25 0 1 1 3 2.122V6A2.5 2.5 0 0 1 10 8.5H6a1 1 0 0 0-1 1v1.128a2.251 2.251 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.5 0v1.836A2.493 2.493 0 0 1 6 7h4a1 1 0 0 0 1-1v-.628A2.25 2.25 0 0 1 9.5 3.25z" />
        </svg>
        <div className="h-[2.5px] w-[28px] rounded-sm bg-[#3fb950]/50" />
      </div>

      {/* Commits */}
      <div className="flex flex-col gap-[4px] px-1.5 py-1.5">
        {[
          { w: "32px", dot: "#3fb950" },
          { w: "26px", dot: "#3fb950" },
          { w: "36px", dot: "#8b949e" },
        ].map((row, i) => (
          <div key={i} className="flex items-center gap-1">
            <div className="w-[4px] h-[4px] rounded-full shrink-0" style={{ background: row.dot }} />
            <div className="h-[2px] rounded-sm bg-[#30363d]" style={{ width: row.w }} />
          </div>
        ))}
      </div>

      {/* PR badge */}
      <div className="flex items-center gap-1 px-1.5 py-[3px] border-t border-[#30363d]/60">
        <div className="flex items-center gap-[3px] px-1 py-[1px] rounded-full bg-[#238636]/20 border border-[#238636]/40">
          <div className="w-[3px] h-[3px] rounded-full bg-[#3fb950]" />
          <div className="h-[2px] w-[14px] rounded-sm bg-[#3fb950]/50" />
        </div>
      </div>
    </div>
  );
}

function BrowserPanel({ isActive }: { isActive: boolean }) {
  const play = isActive ? "running" : "paused";
  return (
    <div className="relative z-10 flex flex-col rounded-lg border border-[#e2e8f0] bg-white shadow-sm overflow-hidden w-[160px] md:w-[180px] shrink-0">
      {/* Chrome */}
      <div className="flex items-center gap-1 px-2 py-1.5 bg-[#f8fafc] border-b border-[#e2e8f0]">
        <span className="w-[5px] h-[5px] rounded-full bg-[#ff5f57]" />
        <span className="w-[5px] h-[5px] rounded-full bg-[#febc2e]" />
        <span className="w-[5px] h-[5px] rounded-full bg-[#28c840]" />
        <div className="flex-1 mx-1.5 flex items-center gap-1 px-1 py-[2px] bg-white rounded border border-[#e2e8f0]">
          <div className="h-[2px] w-[4px] rounded-sm bg-[#28c840]/60" />
          <div className="h-[2px] flex-1 rounded-sm bg-[#c0c5cc]" />
        </div>
      </div>

      {/* Page */}
      <div className="flex flex-col gap-[6px] px-2.5 py-2.5">
        {/* Nav */}
        <div className="flex items-center gap-1 pb-1.5 border-b border-[#f0f2f5]">
          <div className="h-[4px] w-[12px] rounded-sm bg-[#0f1a2a]" />
          <div className="ml-auto flex gap-1.5">
            <div className="h-[2.5px] w-[10px] rounded-sm bg-[#c0c5cc]" />
            <div className="h-[2.5px] w-[10px] rounded-sm bg-[#c0c5cc]" />
          </div>
        </div>

        {/* Hero — bg color changes */}
        <div
          className="h-[24px] rounded-md transition-colors"
          style={{
            animation: `heroBg ${CYCLE}s ease-in-out infinite`,
            animationPlayState: play,
          }}
        />

        {/* Text line — width changes like content is being typed */}
        <div className="flex flex-col gap-[4px]">
          <div className="h-[3px] rounded-sm bg-[#d0d5dd]" style={{ width: "80%" }} />
          <div
            className="h-[3px] rounded-sm bg-[#e2e8f0]"
            style={{
              animation: `textLineWidth ${CYCLE}s ease-in-out infinite`,
              animationPlayState: play,
            }}
          />
          <div className="h-[3px] rounded-sm bg-[#e2e8f0]" style={{ width: "60%" }} />
        </div>

        {/* Two cards — right one gets border on cue */}
        <div className="flex gap-1.5">
          <div className="flex-1 h-[26px] rounded-md bg-[#f4f7ff]" />
          <div
            className="flex-1 h-[26px] rounded-md bg-[#f0f2f5] border"
            style={{
              animation: `cardBorder ${CYCLE}s ease-in-out infinite`,
              animationPlayState: play,
            }}
          />
        </div>

        {/* CTA — color shifts */}
        <div
          className="h-[10px] rounded-md self-start"
          style={{
            width: "44%",
            animation: `ctaColor ${CYCLE}s ease-in-out infinite`,
            animationPlayState: play,
          }}
        />
      </div>
    </div>
  );
}

function Connection({ isActive }: { isActive: boolean }) {
  // Each arm: short horizontal stub from card → turn toward center → shared vertical → trunk to browser
  const jx = 164; // x of shared vertical
  const jy = 100; // y of junction (midpoint between two cards)
  const bx = 318; // x of browser left edge
  const gy = 62;  // y center of GitHub panel
  const cy = 138; // y center of CLI panel

  const githubFull = `M 144 ${gy} L ${jx} ${gy} L ${jx} ${jy} L ${bx} ${jy}`;
  const cliFull    = `M 144 ${cy} L ${jx} ${cy} L ${jx} ${jy} L ${bx} ${jy}`;

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 400 200"
      preserveAspectRatio="none"
      fill="none"
    >
      <defs>
        <linearGradient id="pp-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#818cf8" stopOpacity="0.25" />
        </linearGradient>
      </defs>

      {/* GitHub arm: right → down to junction */}
      <path d={`M 144 ${gy} L ${jx} ${gy} L ${jx} ${jy}`} stroke="url(#pp-grad)" strokeWidth="1.5" strokeDasharray="4 5" className="animate-dash" />
      {/* CLI arm: right → up to junction */}
      <path d={`M 144 ${cy} L ${jx} ${cy} L ${jx} ${jy}`} stroke="url(#pp-grad)" strokeWidth="1.5" strokeDasharray="4 5" className="animate-dash-slow" />
      {/* Shared trunk to browser */}
      <path d={`M ${jx} ${jy} L ${bx} ${jy}`} stroke="url(#pp-grad)" strokeWidth="1.5" strokeDasharray="4 5" className="animate-dash" />

      {/* Static port dots at card exit points */}
      <circle cx="144" cy={gy} r="3.5" fill="#6366f1" opacity="0.75" />
      <circle cx="144" cy={cy} r="3.5" fill="#6366f1" opacity="0.75" />

      {isActive && (
        <>
          <circle r="2.5" fill="#6366f1" opacity="0.9">
            <animateMotion dur="2s" repeatCount="indefinite" path={githubFull} />
          </circle>
          <circle r="1.8" fill="#818cf8" opacity="0.65">
            <animateMotion dur="2s" repeatCount="indefinite" begin="1s" path={githubFull} />
          </circle>
          <circle r="2.5" fill="#6366f1" opacity="0.9">
            <animateMotion dur="2.4s" repeatCount="indefinite" begin="0.4s" path={cliFull} />
          </circle>
          <circle r="1.8" fill="#818cf8" opacity="0.65">
            <animateMotion dur="2.4s" repeatCount="indefinite" begin="1.6s" path={cliFull} />
          </circle>
        </>
      )}
    </svg>
  );
}

export default function ProductionPrototypingAnimation({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center px-3 py-5">
      <style>{styles}</style>
      <div className="relative flex items-center justify-between w-full max-w-[320px] md:scale-[1.5]">
        <div className="flex flex-col gap-2 shrink-0">
          <GitHubPanel />
          <CliPanel isActive={isActive} />
        </div>
        <Connection isActive={isActive} />
        <BrowserPanel isActive={isActive} />
      </div>
    </div>
  );
}

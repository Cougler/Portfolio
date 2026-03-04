"use client";

const JIRA_BLUE = "#0052CC";
const JIRA_LIGHT = "#2684FF";
const CURSOR_INDIGO = "#6366f1";

function MiniJiraWindow() {
  return (
    <div className="flex flex-col rounded-lg border border-[#e2e8f0] bg-white shadow-sm overflow-hidden w-[100px] md:w-[110px]">
      <div className="flex items-center gap-1 px-2 py-1.5 bg-[#f8fafc] border-b border-[#e2e8f0]">
        <span className="w-[5px] h-[5px] rounded-full bg-[#ff5f57]" />
        <span className="w-[5px] h-[5px] rounded-full bg-[#febc2e]" />
        <span className="w-[5px] h-[5px] rounded-full bg-[#28c840]" />
        <span className="ml-auto flex items-center gap-1">
          <img src="/icons/jira.svg" alt="" width={9} height={9} />
          <span className="text-[6px] text-[#94a3b8] font-medium">Jira</span>
        </span>
      </div>
      <div className="flex flex-col gap-[4px] p-2">
        <div className="flex items-center gap-1">
          <div className="w-[5px] h-[5px] rounded-sm bg-[#0052CC]/30" />
          <div className="h-[2.5px] flex-1 rounded-sm bg-[#e2e8f0]" />
        </div>
        <div className="flex items-center gap-1">
          <div className="w-[5px] h-[5px] rounded-sm bg-[#2684FF]/30" />
          <div className="h-[2.5px] flex-1 rounded-sm bg-[#e2e8f0]" />
        </div>
        <div className="flex items-center gap-1">
          <div className="w-[5px] h-[5px] rounded-sm bg-[#0052CC]/30" />
          <div className="h-[2.5px] w-[70%] rounded-sm bg-[#e2e8f0]" />
        </div>
        <div className="flex items-center gap-1">
          <div className="w-[5px] h-[5px] rounded-sm bg-[#2684FF]/30" />
          <div className="h-[2.5px] w-[85%] rounded-sm bg-[#e2e8f0]" />
        </div>
      </div>
    </div>
  );
}

function MiniCursorWindow() {
  return (
    <div className="flex flex-col rounded-lg border border-[#2a2a2e] bg-[#1e1e1e] shadow-sm overflow-hidden w-[100px] md:w-[110px]">
      <div className="flex items-center gap-1 px-2 py-1.5 bg-[#252526] border-b border-[#3c3c3c]">
        <span className="w-[5px] h-[5px] rounded-full bg-[#ff5f57]" />
        <span className="w-[5px] h-[5px] rounded-full bg-[#febc2e]" />
        <span className="w-[5px] h-[5px] rounded-full bg-[#28c840]" />
        <span className="ml-auto flex items-center gap-1">
          <img src="/icons/cursor.svg" alt="" width={9} height={9} className="brightness-200" />
          <span className="text-[6px] text-[#808080] font-medium">Cursor</span>
        </span>
      </div>
      <div className="flex flex-col gap-[4px] p-2">
        <div className="flex items-center gap-[3px]">
          <span className="text-[5px] text-[#555] w-[8px] text-right shrink-0">1</span>
          <div className="h-[2.5px] w-[16px] rounded-sm bg-[#c586c0]/50" />
          <div className="h-[2.5px] w-[20px] rounded-sm bg-[#9cdcfe]/40" />
        </div>
        <div className="flex items-center gap-[3px]">
          <span className="text-[5px] text-[#555] w-[8px] text-right shrink-0">2</span>
          <div className="h-[2.5px] w-[12px] rounded-sm bg-[#569cd6]/50" />
          <div className="h-[2.5px] w-[22px] rounded-sm bg-[#dcdcaa]/50" />
        </div>
        <div className="flex items-center gap-[3px]">
          <span className="text-[5px] text-[#555] w-[8px] text-right shrink-0">3</span>
          <div className="w-[6px] shrink-0" />
          <div className="h-[2.5px] w-[18px] rounded-sm bg-[#9cdcfe]/40" />
        </div>
        <div className="flex items-center gap-[3px]">
          <span className="text-[5px] text-[#555] w-[8px] text-right shrink-0">4</span>
          <div className="w-[6px] shrink-0" />
          <div className="h-[2.5px] w-[14px] rounded-sm bg-[#ce9178]/40" />
          <div className="h-[2.5px] w-[10px] rounded-sm bg-[#b5cea8]/40" />
        </div>
      </div>
      <div className="flex items-center gap-1 px-2 py-[3px] bg-[#007acc]">
        <div className="h-[2px] w-[12px] rounded-sm bg-white/40" />
      </div>
    </div>
  );
}

function FlowLines({ isActive }: { isActive: boolean }) {
  const jiraPath = "M 0 30 C 25 30, 35 60, 50 60";
  const cursorPath = "M 0 90 C 25 90, 35 60, 50 60";
  const outPath = "M 50 60 C 65 60, 80 60, 100 60";

  return (
    <svg
      className="w-full h-full"
      viewBox="0 0 100 120"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="org-g1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={JIRA_BLUE} stopOpacity="0.35" />
          <stop offset="100%" stopColor={CURSOR_INDIGO} stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id="org-g2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={CURSOR_INDIGO} stopOpacity="0.35" />
          <stop offset="100%" stopColor={JIRA_LIGHT} stopOpacity="0.35" />
        </linearGradient>
      </defs>

      <path d={jiraPath} stroke="url(#org-g1)" strokeWidth="1" strokeDasharray="3 3" className="animate-dash" />
      <path d={cursorPath} stroke="url(#org-g1)" strokeWidth="1" strokeDasharray="3 3" className="animate-dash" />
      <path d={outPath} stroke="url(#org-g2)" strokeWidth="1.5" strokeDasharray="4 4" className="animate-dash" />

      {isActive && (
        <>
          <circle r="1.8" fill={JIRA_BLUE} opacity="0.8">
            <animateMotion dur="2.5s" repeatCount="indefinite" path={jiraPath} />
          </circle>
          <circle r="1.2" fill={JIRA_LIGHT} opacity="0.5">
            <animateMotion dur="3s" repeatCount="indefinite" begin="1.2s" path={jiraPath} />
          </circle>

          <circle r="1.8" fill={CURSOR_INDIGO} opacity="0.8">
            <animateMotion dur="2.5s" repeatCount="indefinite" begin="0.6s" path={cursorPath} />
          </circle>
          <circle r="1.2" fill={CURSOR_INDIGO} opacity="0.5">
            <animateMotion dur="3.2s" repeatCount="indefinite" begin="1.8s" path={cursorPath} />
          </circle>

          <circle r="2" fill={JIRA_BLUE} opacity="0.7">
            <animateMotion dur="2s" repeatCount="indefinite" begin="0.8s" path={outPath} />
          </circle>
          <circle r="1.5" fill={CURSOR_INDIGO} opacity="0.6">
            <animateMotion dur="2.5s" repeatCount="indefinite" begin="0.3s" path={outPath} />
          </circle>
        </>
      )}
    </svg>
  );
}

function DashboardPanel() {
  const w = 160;
  const h = 140;
  const r = 8;

  return (
    <div className="relative w-full h-full">
      {/* SVG border that draws in */}
      <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${w} ${h}`} fill="none" preserveAspectRatio="none">
        <rect
          x="0.5"
          y="0.5"
          width={w - 1}
          height={h - 1}
          rx={r}
          stroke="#d0d5dd"
          strokeWidth="1"
          strokeDasharray="586"
          className="db-border-path"
        />
      </svg>

      {/* White fill */}
      <div className="db-fill absolute inset-[1px] rounded-lg bg-white" />

      {/* Dashboard content */}
      <div className="db-content relative overflow-hidden rounded-lg h-full flex flex-col p-2.5">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="h-[3px] w-[40px] rounded-sm bg-[#374151]" />
          <div className="h-[3px] w-[16px] rounded-sm bg-[#d0d5dd]" />
        </div>

        {/* Stat cards */}
        <div className="flex gap-1 mb-2">
          <div className="flex-1 rounded bg-[#0052CC]/8 p-1">
            <div className="h-[2px] w-[60%] rounded-sm bg-[#0052CC]/25 mb-[2px]" />
            <div className="h-[5px] w-[40%] rounded-sm bg-[#0052CC]/35" />
          </div>
          <div className="flex-1 rounded bg-[#2684FF]/8 p-1">
            <div className="h-[2px] w-[50%] rounded-sm bg-[#2684FF]/25 mb-[2px]" />
            <div className="h-[5px] w-[55%] rounded-sm bg-[#2684FF]/35" />
          </div>
          <div className="flex-1 rounded bg-[#6366f1]/8 p-1">
            <div className="h-[2px] w-[70%] rounded-sm bg-[#6366f1]/25 mb-[2px]" />
            <div className="h-[5px] w-[35%] rounded-sm bg-[#6366f1]/35" />
          </div>
        </div>

        {/* Bar chart */}
        <div className="flex items-end gap-[3px] h-[28px] mb-2">
          <div className="flex-1 rounded-t-sm bg-[#0052CC]/20" style={{ height: "60%" }} />
          <div className="flex-1 rounded-t-sm bg-[#0052CC]/30" style={{ height: "85%" }} />
          <div className="flex-1 rounded-t-sm bg-[#2684FF]/25" style={{ height: "45%" }} />
          <div className="flex-1 rounded-t-sm bg-[#2684FF]/35" style={{ height: "100%" }} />
          <div className="flex-1 rounded-t-sm bg-[#6366f1]/20" style={{ height: "70%" }} />
          <div className="flex-1 rounded-t-sm bg-[#6366f1]/30" style={{ height: "55%" }} />
          <div className="flex-1 rounded-t-sm bg-[#0052CC]/25" style={{ height: "80%" }} />
        </div>

        {/* Task cards appearing in succession */}
        <div className="flex flex-col gap-[3px]">
          {[
            { color: "bg-[#28c840]", w1: "flex-1", w2: "w-[12px]", delay: 0 },
            { color: "bg-[#2684FF]", w1: "flex-1", w2: "w-[8px]", delay: 1 },
            { color: "bg-[#febc2e]", w1: "flex-1", w2: "w-[14px]", delay: 2 },
            { color: "bg-[#0052CC]", w1: "flex-1", w2: "w-[10px]", delay: 3 },
          ].map((card, i) => (
            <div
              key={i}
              className="db-task-card flex items-center gap-1 rounded bg-[#f8fafc] border border-[#e2e8f0]/60 px-1 py-[2px]"
              style={{ ["--task-delay" as string]: `${card.delay}` }}
            >
              <div className={`w-[4px] h-[4px] rounded-full ${card.color} shrink-0`} />
              <div className={`h-[2px] ${card.w1} rounded-sm bg-[#e2e8f0]`} />
              <div className={`h-[2px] ${card.w2} rounded-sm bg-[#d0d5dd]`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function OrganizationAnimation({ isActive }: { isActive: boolean }) {
  return (
    <div
      className={`relative w-full h-full flex items-center justify-center px-2 py-3 ${
        isActive ? "org-visible" : ""
      }`}
    >
      <div className="grid grid-cols-[auto_minmax(20px,50px)_auto] items-center gap-0">
        {/* Left: Jira + Cursor stacked */}
        <div className="flex flex-col gap-1.5 w-[100px] md:w-[110px] z-10">
          <MiniJiraWindow />
          <MiniCursorWindow />
        </div>

        {/* Middle: flow lines */}
        <div className="h-[140px]">
          <FlowLines isActive={isActive} />
        </div>

        {/* Right: dashboard draws in */}
        <div className="h-[140px] w-[110px] md:w-[130px] z-10">
          <DashboardPanel />
        </div>
      </div>
    </div>
  );
}

"use client";

const PARTICLE_COLOR_1 = "#29B5E8";
const PARTICLE_COLOR_2 = "#6366f1";
const PARTICLE_COLOR_3 = "#818cf8";

function CodeLine({ num, children }: { num: number; children?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-[4px]">
      <span className="text-[5px] text-[#555] w-[10px] text-right shrink-0 select-none">{num}</span>
      {children}
    </div>
  );
}

function CodeLines({ startLine }: { startLine: number }) {
  let n = startLine;
  return (
    <>
      <CodeLine num={n++}>
        <div className="h-[3px] w-[16px] rounded-sm bg-[#c586c0]/50" />
        <div className="h-[3px] w-[22px] rounded-sm bg-[#9cdcfe]/40" />
      </CodeLine>
      <CodeLine num={n++} />
      <CodeLine num={n++}>
        <div className="h-[3px] w-[14px] rounded-sm bg-[#569cd6]/50" />
        <div className="h-[3px] w-[26px] rounded-sm bg-[#dcdcaa]/50" />
        <div className="h-[3px] w-[6px] rounded-sm bg-[#808080]/30" />
      </CodeLine>
      <CodeLine num={n++}>
        <div className="w-[8px] shrink-0" />
        <div className="h-[3px] w-[12px] rounded-sm bg-[#569cd6]/50" />
        <div className="h-[3px] w-[20px] rounded-sm bg-[#9cdcfe]/40" />
        <div className="h-[3px] w-[8px] rounded-sm bg-[#ce9178]/40" />
      </CodeLine>
      <CodeLine num={n++}>
        <div className="w-[8px] shrink-0" />
        <div className="h-[3px] w-[18px] rounded-sm bg-[#9cdcfe]/40" />
        <div className="h-[3px] w-[10px] rounded-sm bg-[#b5cea8]/40" />
      </CodeLine>
      <CodeLine num={n++}>
        <div className="w-[8px] shrink-0" />
        <div className="h-[3px] w-[14px] rounded-sm bg-[#c586c0]/50" />
        <div className="h-[3px] w-[24px] rounded-sm bg-[#6366f1]/40" />
      </CodeLine>
      <CodeLine num={n++}>
        <div className="h-[3px] w-[6px] rounded-sm bg-[#808080]/30" />
      </CodeLine>
      <CodeLine num={n++} />
      <CodeLine num={n++}>
        <div className="h-[3px] w-[20px] rounded-sm bg-[#dcdcaa]/50" />
        <div className="h-[3px] w-[14px] rounded-sm bg-[#ce9178]/40" />
      </CodeLine>
      <CodeLine num={n++}>
        <div className="h-[3px] w-[16px] rounded-sm bg-[#569cd6]/50" />
        <div className="h-[3px] w-[18px] rounded-sm bg-[#9cdcfe]/40" />
      </CodeLine>
      <CodeLine num={n++}>
        <div className="w-[8px] shrink-0" />
        <div className="h-[3px] w-[22px] rounded-sm bg-[#dcdcaa]/50" />
        <div className="h-[3px] w-[10px] rounded-sm bg-[#808080]/30" />
      </CodeLine>
      <CodeLine num={n++}>
        <div className="w-[8px] shrink-0" />
        <div className="h-[3px] w-[16px] rounded-sm bg-[#c586c0]/50" />
        <div className="h-[3px] w-[12px] rounded-sm bg-[#b5cea8]/40" />
      </CodeLine>
    </>
  );
}

function TableRow({ widths, highlighted }: { widths: string[]; highlighted?: boolean }) {
  return (
    <div className="flex gap-[3px]">
      {widths.map((w, i) => (
        <div
          key={i}
          className={`h-[4px] rounded-sm ${highlighted ? "bg-[#29B5E8]/25" : "bg-[#e8ecf0]"}`}
          style={{ width: w, minWidth: w }}
        />
      ))}
    </div>
  );
}

function SnowflakeWindow() {
  return (
    <div className="relative flex flex-col rounded-lg border border-[#e2e8f0] bg-white shadow-sm overflow-hidden w-[140px] shrink-0">
      {/* Title bar */}
      <div className="flex items-center gap-1 px-2 py-1.5 bg-[#f8fafc] border-b border-[#e2e8f0]">
        <span className="w-[6px] h-[6px] rounded-full bg-[#ff5f57]" />
        <span className="w-[6px] h-[6px] rounded-full bg-[#febc2e]" />
        <span className="w-[6px] h-[6px] rounded-full bg-[#28c840]" />
        <span className="ml-auto flex items-center gap-1">
          <img src="/icons/snowflake-logo.svg" alt="" width={10} height={10} />
          <span className="text-[7px] text-[#94a3b8] font-medium tracking-wide">Snowflake</span>
        </span>
      </div>

      {/* Toolbar hint */}
      <div className="flex items-center gap-1.5 px-2.5 py-1.5 border-b border-[#f0f2f5]">
        <div className="h-[3px] w-[20px] rounded-sm bg-[#d0d5dd]" />
        <div className="h-[3px] w-[16px] rounded-sm bg-[#d0d5dd]" />
        <div className="h-[3px] w-[24px] rounded-sm bg-[#d0d5dd]" />
        <div className="ml-auto h-[5px] w-[5px] rounded-sm bg-[#29B5E8]/30" />
      </div>

      {/* Column headers */}
      <div className="flex gap-[3px] px-2.5 pt-2 pb-1">
        <div className="h-[3px] w-[28px] rounded-sm bg-[#c0c5cc]" />
        <div className="h-[3px] w-[22px] rounded-sm bg-[#c0c5cc]" />
        <div className="h-[3px] w-[18px] rounded-sm bg-[#c0c5cc]" />
        <div className="h-[3px] w-[24px] rounded-sm bg-[#c0c5cc]" />
      </div>
      <div className="h-px bg-[#e8ecf0] mx-2" />

      {/* Data rows */}
      <div className="flex flex-col gap-[5px] px-2.5 py-2">
        <TableRow widths={["28px", "22px", "18px", "24px"]} />
        <TableRow widths={["24px", "22px", "20px", "18px"]} highlighted />
        <TableRow widths={["28px", "16px", "22px", "24px"]} />
        <TableRow widths={["20px", "22px", "18px", "28px"]} highlighted />
        <TableRow widths={["28px", "20px", "24px", "16px"]} />
        <TableRow widths={["24px", "18px", "22px", "20px"]} />
        <TableRow widths={["28px", "22px", "16px", "24px"]} highlighted />
        <TableRow widths={["20px", "24px", "18px", "22px"]} />
      </div>

      {/* Bottom bar */}
      <div className="mt-auto flex items-center gap-1 px-2.5 py-1.5 border-t border-[#f0f2f5]">
        <div className="h-[3px] w-[14px] rounded-sm bg-[#29B5E8]/20" />
        <div className="h-[3px] w-[10px] rounded-sm bg-[#d0d5dd]" />
        <div className="ml-auto h-[3px] w-[18px] rounded-sm bg-[#d0d5dd]" />
      </div>
    </div>
  );
}

function CursorWindow({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative flex flex-col rounded-lg border border-[#2a2a2e] bg-[#1e1e1e] shadow-sm overflow-hidden w-[140px] shrink-0">
      {/* Title bar */}
      <div className="flex items-center gap-1 px-2 py-1.5 bg-[#252526] border-b border-[#3c3c3c]">
        <span className="w-[6px] h-[6px] rounded-full bg-[#ff5f57]" />
        <span className="w-[6px] h-[6px] rounded-full bg-[#febc2e]" />
        <span className="w-[6px] h-[6px] rounded-full bg-[#28c840]" />
        <span className="ml-auto flex items-center gap-1">
          <img src="/icons/cursor.svg" alt="" width={10} height={10} className="brightness-200" />
          <span className="text-[7px] text-[#808080] font-medium tracking-wide">Cursor</span>
        </span>
      </div>

      {/* Tab bar */}
      <div className="flex items-center border-b border-[#3c3c3c]">
        <div className="flex items-center gap-1 px-2.5 py-1 bg-[#1e1e1e] border-r border-[#3c3c3c]">
          <div className="h-[3px] w-[24px] rounded-sm bg-[#808080]/40" />
        </div>
        <div className="flex items-center gap-1 px-2.5 py-1 bg-[#2d2d30]">
          <div className="h-[3px] w-[18px] rounded-sm bg-[#555]/40" />
        </div>
      </div>

      {/* Editor body — scrolling code */}
      <style>{`
        @keyframes codeUp {
          from { transform: translateY(0); }
          to { transform: translateY(-50%); }
        }
      `}</style>
      <div style={{ overflow: "hidden", height: 76 }}>
        <div style={{
          animation: "codeUp 12s linear infinite",
          animationPlayState: isActive ? "running" : "paused",
        }}>
          <div className="flex flex-col gap-[5px] px-1.5 py-2">
            <CodeLines startLine={1} />
          </div>
          <div className="flex flex-col gap-[5px] px-1.5 py-2">
            <CodeLines startLine={13} />
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="mt-auto flex items-center gap-1 px-2 py-1 bg-[#007acc] border-t border-[#007acc]">
        <div className="h-[2px] w-[12px] rounded-sm bg-white/40" />
        <div className="h-[2px] w-[8px] rounded-sm bg-white/30" />
        <div className="ml-auto h-[2px] w-[16px] rounded-sm bg-white/30" />
      </div>
    </div>
  );
}

function ConnectionLines({ isActive }: { isActive: boolean }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 400 200"
      preserveAspectRatio="none"
      fill="none"
      style={{ animationPlayState: isActive ? "running" : "paused" }}
    >
      <defs>
        <linearGradient id="line-grad-1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={PARTICLE_COLOR_1} stopOpacity="0.4" />
          <stop offset="50%" stopColor={PARTICLE_COLOR_2} stopOpacity="0.3" />
          <stop offset="100%" stopColor={PARTICLE_COLOR_3} stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="line-grad-2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={PARTICLE_COLOR_1} stopOpacity="0.25" />
          <stop offset="100%" stopColor={PARTICLE_COLOR_3} stopOpacity="0.25" />
        </linearGradient>
      </defs>

      {/* Connection paths */}
      <path
        d="M 100 70 C 160 70, 240 70, 300 70"
        stroke="url(#line-grad-1)"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        className="animate-dash"
      />
      <path
        d="M 100 100 C 150 100, 180 130, 200 130 C 220 130, 250 100, 300 100"
        stroke="url(#line-grad-2)"
        strokeWidth="1"
        strokeDasharray="4 4"
        className="animate-dash-slow"
      />
      <path
        d="M 100 130 C 160 130, 240 130, 300 130"
        stroke="url(#line-grad-1)"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        className="animate-dash"
      />

      {isActive && (
        <>
          {/* Animated particles on path 1 */}
          <circle r="3" fill={PARTICLE_COLOR_1} opacity="0.9">
            <animateMotion
              dur="3s"
              repeatCount="indefinite"
              path="M 100 70 C 160 70, 240 70, 300 70"
            />
          </circle>
          <circle r="2" fill={PARTICLE_COLOR_2} opacity="0.7">
            <animateMotion
              dur="3s"
              repeatCount="indefinite"
              begin="1s"
              path="M 100 70 C 160 70, 240 70, 300 70"
            />
          </circle>

          {/* Animated particles on path 2 (curved) */}
          <circle r="2.5" fill={PARTICLE_COLOR_3} opacity="0.8">
            <animateMotion
              dur="4s"
              repeatCount="indefinite"
              path="M 100 100 C 150 100, 180 130, 200 130 C 220 130, 250 100, 300 100"
            />
          </circle>
          <circle r="2" fill={PARTICLE_COLOR_1} opacity="0.6">
            <animateMotion
              dur="4s"
              repeatCount="indefinite"
              begin="2s"
              path="M 100 100 C 150 100, 180 130, 200 130 C 220 130, 250 100, 300 100"
            />
          </circle>

          {/* Animated particles on path 3 */}
          <circle r="3" fill={PARTICLE_COLOR_2} opacity="0.9">
            <animateMotion
              dur="3.5s"
              repeatCount="indefinite"
              begin="0.5s"
              path="M 100 130 C 160 130, 240 130, 300 130"
            />
          </circle>
          <circle r="2" fill={PARTICLE_COLOR_1} opacity="0.7">
            <animateMotion
              dur="3.5s"
              repeatCount="indefinite"
              begin="2.5s"
              path="M 100 130 C 160 130, 240 130, 300 130"
            />
          </circle>

          {/* Reverse particles (data flowing back) */}
          <circle r="2" fill={PARTICLE_COLOR_3} opacity="0.5">
            <animateMotion
              dur="4s"
              repeatCount="indefinite"
              begin="1.5s"
              path="M 300 70 C 240 70, 160 70, 100 70"
            />
          </circle>
          <circle r="1.5" fill={PARTICLE_COLOR_2} opacity="0.4">
            <animateMotion
              dur="5s"
              repeatCount="indefinite"
              begin="0.8s"
              path="M 300 130 C 240 130, 160 130, 100 130"
            />
          </circle>
        </>
      )}
    </svg>
  );
}

export default function DataFlowAnimation({ isActive }: { isActive: boolean }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative" style={{ width: 200, height: 170 }}>
        {/* Snowflake — bottom layer */}
        <div className="absolute top-0 left-0" style={{ zIndex: 1 }}>
          <SnowflakeWindow />
        </div>
        {/* Cursor — top layer, offset right and down */}
        <div className="absolute bottom-0 right-0" style={{ zIndex: 2 }}>
          <CursorWindow isActive={isActive} />
        </div>
      </div>
    </div>
  );
}

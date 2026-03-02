"use client";

const TOTAL_CYCLE = 8000;
const STAGGER = 1500;

function ScreenContent({ variant }: { variant: number }) {
  const layouts: Record<number, React.ReactNode> = {
    0: (
      // List view
      <>
        <div className="w-[60%] h-[4px] rounded-sm bg-[#d0d5dd] mx-auto mb-2" />
        <div className="flex flex-col gap-[5px] px-1.5 flex-1">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-1">
              <div className="w-[10px] h-[10px] rounded bg-[#e2e8f0] shrink-0" />
              <div className="flex-1 h-[3px] rounded-sm bg-[#e2e8f0]" />
            </div>
          ))}
          <div className="h-[14px] rounded bg-[#e2e8f0] mt-auto" />
        </div>
      </>
    ),
    1: (
      // Hero + cards
      <>
        <div className="h-[24px] rounded bg-[#e2e8f0] mx-1.5 mb-1.5" />
        <div className="w-[50%] h-[3px] rounded-sm bg-[#d0d5dd] mx-auto mb-2" />
        <div className="grid grid-cols-2 gap-1 px-1.5 flex-1">
          <div className="rounded bg-[#e2e8f0]" />
          <div className="rounded bg-[#e2e8f0]" />
        </div>
        <div className="h-[6px] rounded-full bg-[#d0d5dd] w-[40%] mx-auto mt-2" />
      </>
    ),
    2: (
      // Profile / detail
      <>
        <div className="flex items-center gap-1.5 px-1.5 mb-2">
          <div className="w-[14px] h-[14px] rounded-full bg-[#e2e8f0] shrink-0" />
          <div className="flex flex-col gap-[2px] flex-1">
            <div className="h-[3px] w-[70%] rounded-sm bg-[#d0d5dd]" />
            <div className="h-[2px] w-[50%] rounded-sm bg-[#e2e8f0]" />
          </div>
        </div>
        <div className="h-[28px] rounded bg-[#e2e8f0] mx-1.5 mb-1.5" />
        <div className="flex flex-col gap-[3px] px-1.5">
          <div className="h-[3px] rounded-sm bg-[#e2e8f0] w-full" />
          <div className="h-[3px] rounded-sm bg-[#e2e8f0] w-[85%]" />
          <div className="h-[3px] rounded-sm bg-[#e2e8f0] w-[60%]" />
          <div className="h-[3px] rounded-sm bg-[#e2e8f0] w-[75%] mt-1" />
          <div className="h-[3px] rounded-sm bg-[#e2e8f0] w-[90%]" />
        </div>
        <div className="h-[10px] rounded bg-[#d0d5dd] mx-1.5 mt-auto" />
      </>
    ),
    3: (
      // Form / input
      <>
        <div className="w-[55%] h-[3px] rounded-sm bg-[#d0d5dd] mx-auto mb-2" />
        <div className="flex flex-col gap-[6px] px-1.5 flex-1">
          <div>
            <div className="h-[2px] w-[30%] rounded-sm bg-[#c0c5cc] mb-[3px]" />
            <div className="h-[10px] rounded border border-[#e2e8f0]" />
          </div>
          <div>
            <div className="h-[2px] w-[40%] rounded-sm bg-[#c0c5cc] mb-[3px]" />
            <div className="h-[10px] rounded border border-[#e2e8f0]" />
          </div>
          <div>
            <div className="h-[2px] w-[35%] rounded-sm bg-[#c0c5cc] mb-[3px]" />
            <div className="h-[10px] rounded border border-[#e2e8f0]" />
          </div>
          <div className="h-[10px] rounded bg-[#d0d5dd] mt-auto" />
        </div>
      </>
    ),
  };

  return (
    <div className="flex flex-col py-1.5 h-full">
      {/* Status bar */}
      <div className="flex items-center justify-between px-1.5 py-[3px]">
        <div className="h-[2px] w-[10px] rounded-sm bg-[#c0c5cc]" />
        <div className="h-[2px] w-[6px] rounded-sm bg-[#c0c5cc]" />
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 py-1">
        {layouts[variant]}
      </div>

      {/* Bottom nav */}
      <div className="flex items-center justify-around px-1 py-[4px] border-t border-[#f0f2f5]">
        <div className="w-[6px] h-[2px] rounded-sm bg-[#d0d5dd]" />
        <div className="w-[6px] h-[2px] rounded-sm bg-[#d0d5dd]" />
        <div className="w-[6px] h-[2px] rounded-sm bg-[#d0d5dd]" />
      </div>
    </div>
  );
}

function WireframeScreen({ variant, delay }: { variant: number; delay: number }) {
  const w = 68;
  const h = 148;
  const r = 8;
  const perim = 2 * (w + h - 4 * r) + 2 * Math.PI * r;

  return (
    <div
      className="wf-screen relative w-[60px] md:w-[68px] h-[130px] md:h-[148px] shrink-0"
      style={{
        ["--wf-delay" as string]: `${delay}ms`,
        ["--perim" as string]: perim,
      }}
    >
      {/* SVG border that draws in */}
      <svg
        className="wf-border absolute inset-0 w-full h-full"
        viewBox={`0 0 ${w} ${h}`}
        fill="none"
      >
        <rect
          x="0.5"
          y="0.5"
          width={w - 1}
          height={h - 1}
          rx={r}
          stroke="#d0d5dd"
          strokeWidth="1"
          strokeDasharray={perim}
          className="wf-border-path"
        />
      </svg>

      {/* White fill that appears after border draws */}
      <div className="wf-fill absolute inset-[1px] rounded-lg bg-white" />

      {/* Content that fades in last */}
      <div className="wf-content relative overflow-hidden rounded-lg h-full flex flex-col">
        <ScreenContent variant={variant} />
      </div>
    </div>
  );
}

export default function DesignIterationAnimation({ isActive }: { isActive: boolean }) {
  return (
    <div
      className={`relative w-full h-full flex items-center justify-center px-3 py-6 ${
        isActive ? "wireframes-visible" : ""
      }`}
      style={{
        ["--total-cycle" as string]: `${TOTAL_CYCLE}ms`,
        ["--stagger" as string]: `${STAGGER}ms`,
      }}
    >
      {/* Figma-style dot grid */}
      <div className="absolute inset-0 figma-grid rounded-xl" />

      <div className="relative flex items-center gap-2 md:gap-3">
        <WireframeScreen variant={0} delay={0} />
        <WireframeScreen variant={1} delay={STAGGER} />
        <WireframeScreen variant={2} delay={STAGGER * 2} />
        <WireframeScreen variant={3} delay={STAGGER * 3} />
      </div>
    </div>
  );
}

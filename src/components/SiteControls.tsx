"use client";

import { useTheme } from "./ThemeContext";

function SunMoonToggle({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="relative w-[72px] h-9 rounded-full cursor-pointer transition-colors duration-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent flex justify-center items-start"
      style={{
        background: isDark
          ? "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)"
          : "linear-gradient(135deg, #93c5fd 0%, #60a5fa 100%)",
        border: isDark ? "1.5px solid #334155" : "1.5px solid #93c5fd",
      }}
    >
      {/* Stars (visible in dark mode) */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{ opacity: isDark ? 1 : 0 }}
      >
        <div className="absolute w-[3px] h-[3px] rounded-full bg-white/60" style={{ top: 8, left: 14 }} />
        <div className="absolute w-[2px] h-[2px] rounded-full bg-white/40" style={{ top: 18, left: 10 }} />
        <div className="absolute w-[2px] h-[2px] rounded-full bg-white/50" style={{ top: 6, left: 24 }} />
        <div className="absolute w-[3px] h-[3px] rounded-full bg-white/30" style={{ top: 22, left: 20 }} />
      </div>

      {/* Clouds (visible in light mode) */}
      <div
        className="absolute inset-0 transition-opacity duration-500 flex justify-center"
        style={{ opacity: isDark ? 0 : 1 }}
      >
        <div className="absolute w-3 h-[5px] rounded-full bg-white/50" style={{ top: 20, left: 10 }} />
        <div className="absolute w-[14px] h-[5px] rounded-full bg-white/40" style={{ top: 12, left: 16 }} />
      </div>

      {/* Orb (sun/moon) */}
      <div
        className="absolute top-[4px] w-[28px] h-[28px] rounded-full transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] flex items-center justify-center"
        style={{
          left: isDark ? 38 : 4,
          background: isDark
            ? "linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)"
            : "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
          boxShadow: isDark
            ? "0 0 8px rgba(226,232,240,0.3)"
            : "0 0 12px rgba(251,191,36,0.5)",
        }}
      >
        {/* Sun rays (visible in light mode) */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          className="absolute transition-all duration-500"
          style={{
            opacity: isDark ? 0 : 1,
            transform: isDark ? "rotate(-90deg) scale(0.5)" : "rotate(0deg) scale(1)",
          }}
        >
          <circle cx="12" cy="12" r="4" fill="#92400e" fillOpacity="0.15" />
        </svg>

        {/* Moon craters (visible in dark mode) */}
        <div
          className="absolute transition-all duration-500"
          style={{
            opacity: isDark ? 1 : 0,
            transform: isDark ? "scale(1)" : "scale(0.5)",
          }}
        >
          <div className="absolute w-[5px] h-[5px] rounded-full bg-[#94a3b8]/30" style={{ top: -4, left: 2 }} />
          <div className="absolute w-[3px] h-[3px] rounded-full bg-[#94a3b8]/25" style={{ top: 3, left: -5 }} />
          <div className="absolute w-[4px] h-[4px] rounded-full bg-[#94a3b8]/20" style={{ top: 1, left: 5 }} />
        </div>
      </div>
    </button>
  );
}

function RadialSlider({
  value,
  min,
  max,
  onChange,
}: {
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  const size = 100;
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const cx = size / 2;
  const cy = size / 2;

  const startAngle = 135;
  const endAngle = 405;
  const totalAngle = endAngle - startAngle;

  const fraction = (value - min) / (max - min);
  const currentAngle = startAngle + fraction * totalAngle;

  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const pointOnArc = (angle: number) => ({
    x: cx + radius * Math.cos(toRad(angle)),
    y: cy + radius * Math.sin(toRad(angle)),
  });

  const start = pointOnArc(startAngle);
  const end = pointOnArc(endAngle);
  const current = pointOnArc(currentAngle);

  const describeArc = (startPt: { x: number; y: number }, endPt: { x: number; y: number }, angleDelta: number) => {
    const largeArc = angleDelta > 180 ? 1 : 0;
    return `M ${startPt.x} ${startPt.y} A ${radius} ${radius} 0 ${largeArc} 1 ${endPt.x} ${endPt.y}`;
  };

  const trackPath = describeArc(start, end, totalAngle);
  const fillAngle = currentAngle - startAngle;
  const fillPath = fillAngle > 0.5 ? describeArc(start, current, fillAngle) : "";

  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    e.preventDefault();
    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();

    const update = (clientX: number, clientY: number) => {
      const x = clientX - rect.left - cx * (rect.width / size);
      const y = clientY - rect.top - cy * (rect.height / size);
      let angle = (Math.atan2(y, x) * 180) / Math.PI;
      if (angle < 0) angle += 360;

      let clamped = angle;
      if (angle < startAngle && angle < endAngle - 360) {
        clamped = angle + 360;
      }
      clamped = Math.max(startAngle, Math.min(endAngle, clamped < startAngle ? clamped + 360 : clamped));

      const newFraction = (clamped - startAngle) / totalAngle;
      const newValue = Math.round(min + newFraction * (max - min));
      onChange(Math.max(min, Math.min(max, newValue)));
    };

    update(e.clientX, e.clientY);

    const onMove = (ev: PointerEvent) => update(ev.clientX, ev.clientY);
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  return (
    <div className="relative flex flex-col items-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="cursor-pointer"
        onPointerDown={handlePointerDown}
        style={{ touchAction: "none" }}
      >
        {/* Track */}
        <path
          d={trackPath}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Fill */}
        {fillPath && (
          <path
            d={fillPath}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            className="transition-[d] duration-100"
          />
        )}
        {/* Thumb */}
        <circle
          cx={current.x}
          cy={current.y}
          r={9}
          fill="var(--color-accent)"
          stroke="var(--color-background)"
          strokeWidth={2.5}
          className="drop-shadow-sm"
        />
      </svg>

      {/* Preview shape + value */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none" style={{ paddingTop: 4 }}>
        <div
          className="border-2 transition-all duration-200 mb-1"
          style={{
            width: 24,
            height: 24,
            borderRadius: value * 0.6,
            borderColor: "var(--color-accent)",
            background: "var(--color-border)",
          }}
        />
        <span className="text-[10px] font-mono font-semibold" style={{ color: "var(--color-muted)" }}>
          {value}px
        </span>
      </div>
    </div>
  );
}

export default function SiteControls(_props: { isActive: boolean }) {
  const { scheme, setScheme, borderRadius, setBorderRadius } = useTheme();
  const isDark = scheme.id === "midnight";

  return (
    <div className="relative z-10 w-full h-full flex items-center justify-center gap-6 px-5 py-4">
      {/* Left: Light/Dark toggle */}
      <div className="flex flex-col items-center gap-2.5">
        <label
          className="text-[10px] font-semibold uppercase tracking-wider font-[family-name:var(--font-inter)]"
          style={{ color: "var(--color-muted)" }}
        >
          Mode
        </label>
        <SunMoonToggle
          isDark={isDark}
          onToggle={() => setScheme(isDark ? "default" : "midnight")}
        />
        <span
          className="text-[10px] font-medium font-[family-name:var(--font-inter)] transition-all duration-300"
          style={{ color: "var(--color-muted)" }}
        >
          {isDark ? "Dark" : "Light"}
        </span>
      </div>

      {/* Divider */}
      <div className="w-px h-20 transition-colors duration-300" style={{ background: "var(--color-border)" }} />

      {/* Right: Radial roundness slider */}
      <div className="flex flex-col items-center gap-1">
        <label
          className="text-[10px] font-semibold uppercase tracking-wider font-[family-name:var(--font-inter)]"
          style={{ color: "var(--color-muted)" }}
        >
          Roundness
        </label>
        <RadialSlider
          value={borderRadius}
          min={0}
          max={24}
          onChange={setBorderRadius}
        />
      </div>
    </div>
  );
}

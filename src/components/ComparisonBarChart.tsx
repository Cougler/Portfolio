"use client";

import { useRef, useState, useCallback } from "react";

type BarSeries = {
  key: string;
  label: string;
  color: string;
  yAxis?: "left" | "right";
};

type BarDataPoint = {
  date: string;
  values: Record<string, number>;
};

export type ComparisonBarChartProps = {
  data: BarDataPoint[];
  series: BarSeries[];
  leftAxisUnit?: string;
  rightAxisUnit?: string;
  leftAxisLabel?: string;
  rightAxisLabel?: string;
  showValues?: boolean;
};

const PADDING = { top: 28, right: 56, bottom: 72, left: 52 };
const CHART_HEIGHT = 220;
const BAR_RADIUS = 4;

function niceMax(v: number) {
  if (v <= 0) return 1;
  const mag = Math.pow(10, Math.floor(Math.log10(v)));
  const norm = v / mag;
  if (norm <= 1) return mag;
  if (norm <= 2) return 2 * mag;
  if (norm <= 5) return 5 * mag;
  return 10 * mag;
}

function barPath(x: number, y: number, w: number, h: number, r: number): string {
  if (h <= 0) return "";
  const cr = Math.min(r, w / 2, h);
  return [
    `M${x},${y + h}`,
    `V${y + cr}`,
    `Q${x},${y} ${x + cr},${y}`,
    `H${x + w - cr}`,
    `Q${x + w},${y} ${x + w},${y + cr}`,
    `V${y + h}`,
    `Z`,
  ].join(" ");
}

function wrapLabel(text: string, maxPx: number): string[] {
  if (text.length * 5.8 <= maxPx) return [text];
  const mid = Math.ceil(text.length / 2);
  const before = text.lastIndexOf(" ", mid);
  const after = text.indexOf(" ", mid);
  if (before === -1 && after === -1) return [text];
  const split =
    before === -1
      ? after
      : after === -1
      ? before
      : mid - before <= after - mid
      ? before
      : after;
  return [text.slice(0, split), text.slice(split + 1)];
}

function formatVal(v: number, unit: string): string {
  if (unit === "%") return `${v % 1 === 0 ? v : v.toFixed(1)}%`;
  if (v >= 1000) return `$${(v / 1000).toFixed(1)}k`;
  return `$${v % 1 === 0 ? v : v.toFixed(0)}`;
}

export default function ComparisonBarChart({
  data,
  series,
  leftAxisUnit = "%",
  rightAxisUnit = "",
  leftAxisLabel,
  rightAxisLabel,
  showValues = false,
}: ComparisonBarChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredGroup, setHoveredGroup] = useState<number | null>(null);

  const svgWidth = 680;
  const plotW = svgWidth - PADDING.left - PADDING.right;
  const plotH = CHART_HEIGHT;

  const control = data[0];
  const test = data[1];

  const leftSeries = series.filter((s) => (s.yAxis ?? "left") === "left");
  const rightSeries = series.filter((s) => s.yAxis === "right");

  const leftMax = niceMax(
    Math.max(
      ...leftSeries.flatMap((s) => [
        control.values[s.key] ?? 0,
        test.values[s.key] ?? 0,
      ]),
      0.1
    )
  );

  const rightMax = rightSeries.length
    ? niceMax(
        Math.max(
          ...rightSeries.flatMap((s) => [
            control.values[s.key] ?? 0,
            test.values[s.key] ?? 0,
          ]),
          0.1
        )
      )
    : 1;

  const yScaleLeft = (v: number) => PADDING.top + plotH - (v / leftMax) * plotH;
  const yScaleRight = (v: number) =>
    PADDING.top + plotH - (v / rightMax) * plotH;

  const numMetrics = series.length;
  const groupWidth = plotW / numMetrics;
  const barWidth = Math.min(groupWidth * 0.22, 40);
  const barGap = barWidth * 0.25;

  const barGroups = series.map((s, i) => {
    const isRight = s.yAxis === "right";
    const max = isRight ? rightMax : leftMax;
    const unit = isRight ? rightAxisUnit : leftAxisUnit;
    const cx = PADDING.left + groupWidth * i + groupWidth / 2;
    const cv = control.values[s.key] ?? 0;
    const tv = test.values[s.key] ?? 0;
    const cH = (cv / max) * plotH;
    const tH = (tv / max) * plotH;
    return {
      label: s.label,
      controlVal: cv,
      testVal: tv,
      controlX: cx - barWidth - barGap / 2,
      testX: cx + barGap / 2,
      controlH: cH,
      testH: tH,
      controlY: PADDING.top + plotH - cH,
      testY: PADDING.top + plotH - tH,
      unit,
    };
  });

  const gridLines = 5;
  const gridStep = leftMax / gridLines;

  const gridLinesR = rightSeries.length ? 5 : 0;
  const gridStepR = rightSeries.length ? rightMax / gridLinesR : 0;

  const svgH = PADDING.top + plotH + PADDING.bottom;

  const handlePointer = useCallback(
    (clientX: number) => {
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const mouseX = ((clientX - rect.left) / rect.width) * svgWidth;
      const relX = mouseX - PADDING.left;
      if (relX < 0 || relX > plotW) {
        setHoveredGroup(null);
        return;
      }
      setHoveredGroup(Math.min(Math.floor(relX / groupWidth), numMetrics - 1));
    },
    [numMetrics, groupWidth, plotW]
  );

  return (
    <div className="mt-4 md:mt-5 mb-2 w-full">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${svgWidth} ${svgH}`}
        className="w-full select-none"
        style={{ backgroundColor: "var(--v2-bg)", borderRadius: 16 }}
        onMouseMove={(e) => handlePointer(e.clientX)}
        onMouseLeave={() => setHoveredGroup(null)}
        onTouchStart={(e) => handlePointer(e.touches[0].clientX)}
        onTouchMove={(e) => handlePointer(e.touches[0].clientX)}
        onTouchEnd={() => setHoveredGroup(null)}
      >
        {/* Left-axis grid */}
        {Array.from({ length: gridLines + 1 }, (_, i) => {
          const val = i * gridStep;
          const y = yScaleLeft(val);
          return (
            <g key={`gl-${i}`}>
              <line
                x1={PADDING.left}
                x2={svgWidth - PADDING.right}
                y1={y}
                y2={y}
                style={{ stroke: "var(--v2-border)" }}
                strokeWidth={1}
              />
              <text
                x={PADDING.left - 8}
                y={y + 4}
                textAnchor="end"
                fontSize={10}
                style={{ fill: "var(--v2-text-faint)" }}
                fontFamily="var(--font-inter), system-ui, sans-serif"
              >
                {val % 1 === 0 ? val : val.toFixed(1)}
                {leftAxisUnit}
              </text>
            </g>
          );
        })}

        {/* Right-axis labels */}
        {gridLinesR > 0 &&
          Array.from({ length: gridLinesR + 1 }, (_, i) => {
            const val = i * gridStepR;
            const y = yScaleRight(val);
            return (
              <text
                key={`gr-${i}`}
                x={svgWidth - PADDING.right + 8}
                y={y + 4}
                textAnchor="start"
                fontSize={10}
                style={{ fill: "var(--v2-text-faint)" }}
                fontFamily="var(--font-inter), system-ui, sans-serif"
              >
                {val >= 1000
                  ? `$${(val / 1000).toFixed(1)}k`
                  : val % 1 === 0
                  ? val
                  : val.toFixed(1)}
                {rightAxisUnit}
              </text>
            );
          })}

        {/* Bars */}
        {barGroups.map((g, i) => {
          const isHovered = hoveredGroup === i;
          return (
            <g key={`bar-${i}`}>
              {isHovered && (
                <rect
                  x={PADDING.left + groupWidth * i}
                  y={PADDING.top}
                  width={groupWidth}
                  height={plotH}
                  style={{ fill: "var(--v2-surf-hv)" }}
                  rx={4}
                />
              )}
              <path
                d={barPath(
                  g.controlX,
                  g.controlY,
                  barWidth,
                  g.controlH,
                  BAR_RADIUS
                )}
                style={{ fill: "var(--v2-muted)" }}
                opacity={isHovered ? 0.7 : 0.35}
              />
              <path
                d={barPath(g.testX, g.testY, barWidth, g.testH, BAR_RADIUS)}
                style={{ fill: "var(--color-accent)" }}
                opacity={isHovered ? 1 : 0.75}
              />
              {(showValues || isHovered) && (
                <>
                  <text
                    x={g.controlX + barWidth / 2}
                    y={g.controlY - 6}
                    textAnchor="middle"
                    fontSize={10}
                    fontWeight={600}
                    style={{ fill: "var(--v2-muted)" }}
                    fontFamily="var(--font-inter), system-ui, sans-serif"
                  >
                    {formatVal(g.controlVal, g.unit)}
                  </text>
                  <text
                    x={g.testX + barWidth / 2}
                    y={g.testY - 6}
                    textAnchor="middle"
                    fontSize={10}
                    fontWeight={600}
                    style={{ fill: "var(--color-accent)" }}
                    fontFamily="var(--font-inter), system-ui, sans-serif"
                  >
                    {formatVal(g.testVal, g.unit)}
                  </text>
                </>
              )}
            </g>
          );
        })}

        {/* X-axis labels */}
        {barGroups.map((g, i) => {
          const cx =
            PADDING.left + groupWidth * i + groupWidth / 2;
          const lines = wrapLabel(g.label, groupWidth - 12);
          return (
            <text
              key={`xl-${i}`}
              x={cx}
              y={PADDING.top + plotH + 16}
              textAnchor="middle"
              fontSize={9.5}
              style={{ fill: "var(--v2-muted)" }}
              fontFamily="var(--font-inter), system-ui, sans-serif"
            >
              {lines.map((line, li) => (
                <tspan key={li} x={cx} dy={li === 0 ? 0 : 13}>
                  {line}
                </tspan>
              ))}
            </text>
          );
        })}

        {/* Axis labels */}
        {leftAxisLabel && (
          <text
            x={PADDING.left - 40}
            y={PADDING.top + plotH / 2}
            textAnchor="middle"
            fontSize={10}
            style={{ fill: "var(--v2-text-faint)" }}
            fontFamily="var(--font-inter), system-ui, sans-serif"
            transform={`rotate(-90, ${PADDING.left - 40}, ${
              PADDING.top + plotH / 2
            })`}
          >
            {leftAxisLabel}
          </text>
        )}
        {rightAxisLabel && (
          <text
            x={svgWidth - PADDING.right + 44}
            y={PADDING.top + plotH / 2}
            textAnchor="middle"
            fontSize={10}
            style={{ fill: "var(--v2-text-faint)" }}
            fontFamily="var(--font-inter), system-ui, sans-serif"
            transform={`rotate(90, ${svgWidth - PADDING.right + 44}, ${
              PADDING.top + plotH / 2
            })`}
          >
            {rightAxisLabel}
          </text>
        )}

        {/* Legend */}
        {(() => {
          const legendY = PADDING.top + plotH + 46;
          return (
            <g
              transform={`translate(${svgWidth / 2 - 60}, ${legendY})`}
            >
              <rect
                x={0}
                y={0}
                width={10}
                height={10}
                rx={2}
                style={{ fill: "var(--v2-muted)" }}
                opacity={0.45}
              />
              <text
                x={14}
                y={9}
                fontSize={10}
                style={{ fill: "var(--v2-muted)" }}
                fontFamily="var(--font-inter), system-ui, sans-serif"
              >
                Control
              </text>
              <rect
                x={72}
                y={0}
                width={10}
                height={10}
                rx={2}
                style={{ fill: "var(--color-accent)" }}
                opacity={0.85}
              />
              <text
                x={86}
                y={9}
                fontSize={10}
                style={{ fill: "var(--v2-muted)" }}
                fontFamily="var(--font-inter), system-ui, sans-serif"
              >
                Test
              </text>
            </g>
          );
        })()}
      </svg>
    </div>
  );
}

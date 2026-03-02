"use client";

import { useRef, useState, useCallback } from "react";

export type TimeSeriesPoint = {
  date: string;
  values: Record<string, number>;
};

export type LineSeries = {
  key: string;
  label: string;
  color: string;
  yAxis?: "left" | "right";
  style?: "solid" | "dashed";
  areaFill?: boolean;
};

export type TimeSeriesChartProps = {
  data: TimeSeriesPoint[];
  series: LineSeries[];
  leftAxisLabel?: string;
  rightAxisLabel?: string;
  leftAxisUnit?: string;
  rightAxisUnit?: string;
};

const PADDING = { top: 24, right: 56, bottom: 72, left: 52 };
const CHART_HEIGHT = 220;

function formatDate(d: string) {
  const date = new Date(d + "T00:00:00");
  if (isNaN(date.getTime())) return d;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function niceMax(v: number) {
  if (v <= 0) return 1;
  const mag = Math.pow(10, Math.floor(Math.log10(v)));
  const norm = v / mag;
  if (norm <= 1) return mag;
  if (norm <= 2) return 2 * mag;
  if (norm <= 5) return 5 * mag;
  return 10 * mag;
}

function buildPath(
  points: { x: number; y: number }[],
  smooth: boolean
): string {
  if (points.length === 0) return "";
  let d = `M${points[0].x},${points[0].y}`;
  if (!smooth || points.length < 3) {
    for (let i = 1; i < points.length; i++) {
      d += ` L${points[i].x},${points[i].y}`;
    }
    return d;
  }
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cpx = (prev.x + curr.x) / 2;
    d += ` C${cpx},${prev.y} ${cpx},${curr.y} ${curr.x},${curr.y}`;
  }
  return d;
}

function getPointerIndex(
  e: React.MouseEvent<SVGSVGElement> | React.TouchEvent<SVGSVGElement>,
  svg: SVGSVGElement,
  svgWidth: number,
  plotW: number,
  dataLength: number
): number {
  const rect = svg.getBoundingClientRect();
  const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
  const mouseX = ((clientX - rect.left) / rect.width) * svgWidth;
  const idx = Math.round(
    ((mouseX - PADDING.left) / plotW) * (dataLength - 1)
  );
  return Math.max(0, Math.min(dataLength - 1, idx));
}

export default function MetricChart({
  data,
  series,
  leftAxisLabel,
  rightAxisLabel,
  leftAxisUnit = "%",
  rightAxisUnit = "",
}: TimeSeriesChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const svgWidth = 680;
  const plotW = svgWidth - PADDING.left - PADDING.right;
  const plotH = CHART_HEIGHT;
  const svgH = CHART_HEIGHT + PADDING.top + PADDING.bottom;

  const leftSeries = series.filter((s) => (s.yAxis ?? "left") === "left");
  const rightSeries = series.filter((s) => s.yAxis === "right");

  const leftMax = niceMax(
    Math.max(
      ...data.flatMap((d) => leftSeries.map((s) => d.values[s.key] ?? 0)),
      0.1
    )
  );
  const rightMax = rightSeries.length
    ? niceMax(
        Math.max(
          ...data.flatMap((d) =>
            rightSeries.map((s) => d.values[s.key] ?? 0)
          ),
          1
        )
      )
    : 1;

  const xScale = (i: number) =>
    PADDING.left + (i / Math.max(data.length - 1, 1)) * plotW;
  const yScaleLeft = (v: number) =>
    PADDING.top + plotH - (v / leftMax) * plotH;
  const yScaleRight = (v: number) =>
    PADDING.top + plotH - (v / rightMax) * plotH;

  const yScale = (s: LineSeries, v: number) =>
    (s.yAxis ?? "left") === "right" ? yScaleRight(v) : yScaleLeft(v);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      const svg = svgRef.current;
      if (!svg) return;
      setHoveredIdx(getPointerIndex(e, svg, svgWidth, plotW, data.length));
    },
    [data.length, plotW]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<SVGSVGElement>) => {
      const svg = svgRef.current;
      if (!svg) return;
      setHoveredIdx(getPointerIndex(e, svg, svgWidth, plotW, data.length));
    },
    [data.length, plotW]
  );

  const gridLinesLeft = 5;
  const gridStepLeft = leftMax / gridLinesLeft;

  const gridLinesRight = rightSeries.length ? 5 : 0;
  const gridStepRight = rightSeries.length ? rightMax / gridLinesRight : 0;

  const xLabelInterval = Math.max(1, Math.ceil(data.length / 7));

  const legendTotalWidth = series.reduce(
    (acc, s) => acc + s.label.length * 6.5 + 30,
    0
  );
  const legendStartX = Math.max(
    PADDING.left,
    PADDING.left + (plotW - legendTotalWidth) / 2
  );

  return (
    <div className="mt-4 md:mt-5 mb-2 w-full touch-pan-y">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${svgWidth} ${svgH}`}
        className="w-full select-none"
        style={{ backgroundColor: "rgba(248, 249, 250, 1)", borderRadius: 16 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setHoveredIdx(null)}
        onTouchStart={handleTouchMove}
        onTouchMove={handleTouchMove}
        onTouchEnd={() => setHoveredIdx(null)}
      >
        {/* Grid lines */}
        {Array.from({ length: gridLinesLeft + 1 }, (_, i) => {
          const val = i * gridStepLeft;
          const y = yScaleLeft(val);
          return (
            <g key={`gl-${i}`}>
              <line
                x1={PADDING.left}
                x2={svgWidth - PADDING.right}
                y1={y}
                y2={y}
                stroke="#f0f0f0"
                strokeWidth={1}
              />
              <text
                x={PADDING.left - 8}
                y={y + 4}
                textAnchor="end"
                fontSize={10}
                className="fill-[#9ca3af]"
                fontFamily="var(--font-inter), system-ui, sans-serif"
              >
                {val % 1 === 0 ? val : val.toFixed(1)}
                {leftAxisUnit}
              </text>
            </g>
          );
        })}

        {/* Right axis labels */}
        {rightSeries.length > 0 &&
          Array.from({ length: gridLinesRight + 1 }, (_, i) => {
            const val = i * gridStepRight;
            const y = yScaleRight(val);
            return (
              <text
                key={`gr-${i}`}
                x={svgWidth - PADDING.right + 8}
                y={y + 4}
                textAnchor="start"
                fontSize={10}
                className="fill-[#9ca3af]"
                fontFamily="var(--font-inter), system-ui, sans-serif"
              >
                {val >= 1000
                  ? `${(val / 1000).toFixed(1)}k`
                  : val % 1 === 0
                  ? val
                  : val.toFixed(1)}
                {rightAxisUnit}
              </text>
            );
          })}

        {/* X-axis labels */}
        {data.map((d, i) => {
          if (i % xLabelInterval !== 0 && i !== data.length - 1) return null;
          return (
            <text
              key={d.date}
              x={xScale(i)}
              y={PADDING.top + plotH + 20}
              textAnchor="middle"
              fontSize={10}
              className="fill-[#9ca3af]"
              fontFamily="var(--font-inter), system-ui, sans-serif"
            >
              {formatDate(d.date)}
            </text>
          );
        })}

        {/* Area fills */}
        {series
          .filter((s) => s.areaFill)
          .map((s) => {
            const points = data.map((d, i) => ({
              x: xScale(i),
              y: yScale(s, d.values[s.key] ?? 0),
            }));
            const linePath = buildPath(points, true);
            const areaPath = `${linePath} L${points[points.length - 1].x},${
              PADDING.top + plotH
            } L${points[0].x},${PADDING.top + plotH} Z`;
            return (
              <path
                key={`area-${s.key}`}
                d={areaPath}
                fill={s.color}
                opacity={0.1}
              />
            );
          })}

        {/* Lines */}
        {series.map((s) => {
          const points = data.map((d, i) => ({
            x: xScale(i),
            y: yScale(s, d.values[s.key] ?? 0),
          }));
          return (
            <path
              key={s.key}
              d={buildPath(points, true)}
              fill="none"
              stroke={s.color}
              strokeWidth={2}
              strokeDasharray={s.style === "dashed" ? "6 4" : undefined}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          );
        })}

        {/* Dots on lines */}
        {series.map((s) =>
          data.map((d, i) => (
            <circle
              key={`${s.key}-${i}`}
              cx={xScale(i)}
              cy={yScale(s, d.values[s.key] ?? 0)}
              r={hoveredIdx === i ? 4 : 0}
              fill={s.color}
              stroke="white"
              strokeWidth={2}
            />
          ))
        )}

        {/* Hover vertical line */}
        {hoveredIdx !== null && (
          <line
            x1={xScale(hoveredIdx)}
            x2={xScale(hoveredIdx)}
            y1={PADDING.top}
            y2={PADDING.top + plotH}
            stroke="#d1d5db"
            strokeWidth={1}
            strokeDasharray="4 3"
            pointerEvents="none"
          />
        )}

        {/* Hover tooltip */}
        {hoveredIdx !== null && (() => {
          const point = data[hoveredIdx];
          const tooltipX = xScale(hoveredIdx);
          const lineH = 18;
          const maxLabelLen = Math.max(...series.map((s) => s.label.length));
          const tooltipW = Math.max(200, maxLabelLen * 7 + 90);
          const tooltipH = 22 + series.length * lineH + 10;
          const flipped = tooltipX + tooltipW + 12 > svgWidth;
          const tx = flipped ? tooltipX - tooltipW - 12 : tooltipX + 12;
          const ty = PADDING.top + 4;

          return (
            <g pointerEvents="none">
              <rect
                x={tx}
                y={ty}
                width={tooltipW}
                height={tooltipH}
                rx={6}
                fill="#1f2937"
                opacity={0.95}
              />
              <text
                x={tx + 10}
                y={ty + 16}
                fontSize={11}
                fontWeight={600}
                fill="white"
                fontFamily="var(--font-inter), system-ui, sans-serif"
              >
                {formatDate(point.date)}
              </text>
              {series.map((s, si) => {
                const val = point.values[s.key] ?? 0;
                const unit = (s.yAxis ?? "left") === "right" ? rightAxisUnit : leftAxisUnit;
                const displayVal =
                  val >= 1000
                    ? `${(val / 1000).toFixed(1)}k`
                    : val % 1 === 0
                    ? `${val}`
                    : val.toFixed(1);
                const valueStr = `${displayVal}${unit}`;
                return (
                  <g key={s.key}>
                    <circle
                      cx={tx + 14}
                      cy={ty + 32 + si * lineH}
                      r={4}
                      fill={s.color}
                    />
                    <text
                      x={tx + 24}
                      y={ty + 36 + si * lineH}
                      fontSize={10}
                      fill="#d1d5db"
                      fontFamily="var(--font-inter), system-ui, sans-serif"
                    >
                      {s.label}
                    </text>
                    <text
                      x={tx + tooltipW - 10}
                      y={ty + 36 + si * lineH}
                      textAnchor="end"
                      fontSize={10}
                      fontWeight={600}
                      fill="white"
                      fontFamily="var(--font-inter), system-ui, sans-serif"
                    >
                      {valueStr}
                    </text>
                  </g>
                );
              })}
            </g>
          );
        })()}

        {/* Axis labels */}
        {leftAxisLabel && (
          <text
            x={PADDING.left - 40}
            y={PADDING.top + plotH / 2}
            textAnchor="middle"
            fontSize={10}
            className="fill-[#9ca3af]"
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
            className="fill-[#9ca3af]"
            fontFamily="var(--font-inter), system-ui, sans-serif"
            transform={`rotate(90, ${svgWidth - PADDING.right + 44}, ${
              PADDING.top + plotH / 2
            })`}
          >
            {rightAxisLabel}
          </text>
        )}

        {/* Legend — centered within plot area */}
        <g transform={`translate(${legendStartX}, ${PADDING.top + plotH + 38})`}>
          {series.map((s, i) => {
            const offset = series
              .slice(0, i)
              .reduce((acc, prev) => acc + prev.label.length * 6.5 + 30, 0);
            return (
              <g key={s.key} transform={`translate(${offset}, 0)`}>
                <line
                  x1={0}
                  x2={14}
                  y1={5}
                  y2={5}
                  stroke={s.color}
                  strokeWidth={2}
                  strokeDasharray={s.style === "dashed" ? "4 3" : undefined}
                />
                <circle cx={7} cy={5} r={3} fill={s.color} />
                <text
                  x={18}
                  y={9}
                  fontSize={10}
                  className="fill-[#6b7280]"
                  fontFamily="var(--font-inter), system-ui, sans-serif"
                >
                  {s.label}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}

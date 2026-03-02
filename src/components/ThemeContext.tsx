"use client";

import { createContext, useContext, useState, useMemo, type ReactNode } from "react";

export type ColorScheme = {
  id: string;
  label: string;
  background: string;
  foreground: string;
  muted: string;
  border: string;
  accent: string;
  tagBg: string;
  tagText: string;
  cardBg: string;
  hoverBg: string;
  tooltipBg: string;
};

export const schemes: ColorScheme[] = [
  {
    id: "default",
    label: "Light",
    background: "#ffffff",
    foreground: "#0f1a2a",
    muted: "#6b7280",
    border: "#e5e7eb",
    accent: "#4f46e5",
    tagBg: "#f3f4f6",
    tagText: "#374151",
    cardBg: "#f5f5f7",
    hoverBg: "rgba(249,250,251,0.6)",
    tooltipBg: "#ffffff",
  },
  {
    id: "midnight",
    label: "Dark",
    background: "#0f172a",
    foreground: "#f1f5f9",
    muted: "#94a3b8",
    border: "#1e293b",
    accent: "#38bdf8",
    tagBg: "#1e293b",
    tagText: "#cbd5e1",
    cardBg: "#1e293b",
    hoverBg: "rgba(30,41,59,0.6)",
    tooltipBg: "#1e293b",
  },
];

type ThemeState = {
  scheme: ColorScheme;
  setScheme: (id: string) => void;
  borderRadius: number;
  setBorderRadius: (v: number) => void;
  cssVars: Record<string, string>;
};

const ThemeContext = createContext<ThemeState | null>(null);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [schemeId, setSchemeId] = useState("default");
  const [borderRadius, setBorderRadius] = useState(16);

  const scheme = schemes.find((s) => s.id === schemeId) ?? schemes[0];

  const cssVars = useMemo<Record<string, string>>(
    () => ({
      "--color-background": scheme.background,
      "--color-foreground": scheme.foreground,
      "--color-muted": scheme.muted,
      "--color-border": scheme.border,
      "--color-accent": scheme.accent,
      "--color-tag-bg": scheme.tagBg,
      "--color-tag-text": scheme.tagText,
      "--theme-card-bg": scheme.cardBg,
      "--theme-hover-bg": scheme.hoverBg,
      "--theme-tooltip-bg": scheme.tooltipBg,
      "--theme-card-radius": `${borderRadius}px`,
      "--theme-tag-radius": `${Math.max(borderRadius * 1.5, 20)}px`,
      "--theme-button-radius": `${Math.round(borderRadius * 0.5)}px`,
      "--theme-media-radius": `${borderRadius}px`,
    }),
    [scheme, borderRadius],
  );

  const value = useMemo<ThemeState>(
    () => ({
      scheme,
      setScheme: setSchemeId,
      borderRadius,
      setBorderRadius,
      cssVars,
    }),
    [scheme, borderRadius, cssVars],
  );

  return (
    <ThemeContext.Provider value={value}>
      <div style={cssVars as React.CSSProperties}>{children}</div>
    </ThemeContext.Provider>
  );
}

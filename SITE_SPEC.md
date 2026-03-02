# Aaron Cougle — Portfolio Site Specification

> A complete specification for rebuilding this portfolio site from scratch. Follow every section precisely to reproduce the site in one pass.

---

## Tech Stack

| Layer | Tool | Version |
|-------|------|---------|
| Framework | Next.js (App Router) | 16.1.6 |
| Language | TypeScript | ^5 |
| Styling | Tailwind CSS v4 (PostCSS plugin) | ^4 |
| React | React + React DOM | 19.2.3 |
| Fonts | Google Fonts via `next/font/google` | — |
| Linting | ESLint + eslint-config-next | ^9 |

### Fonts

- **Body:** Inter (variable `--font-inter`)
- **Headings (h1 only):** Playfair Display (variable `--font-heading`, weights 400–700)

---

## Project Structure

```
portfolio/
├── public/
│   ├── animations/
│   │   ├── brandkit.mp4
│   │   ├── contacts-upload.mp4
│   │   ├── mobile-editor.mp4
│   │   ├── mweb-experience.mov
│   │   ├── mweb-experience.mp4
│   │   ├── prompt2email.mp4
│   │   ├── schedulepage.jpg
│   │   ├── schedulepage.mp4
│   │   ├── social.mov
│   │   └── social.mp4
│   ├── icons/
│   │   ├── cursor.svg
│   │   ├── DeskfiIcon.svg
│   │   ├── FigmaMakeIcon.svg
│   │   ├── FlowkiIcon.svg
│   │   ├── jira.svg
│   │   ├── prouxkit.svg
│   │   ├── react.svg
│   │   ├── snowflake-logo.svg
│   │   ├── snowflake.svg
│   │   ├── SupabaseIcon.svg
│   │   └── xcode.svg
│   └── images/
│       ├── logo.svg
│       ├── mweb/
│       │   ├── ContactsPage.jpg
│       │   ├── ContactsUpdate.jpg
│       │   ├── Emailpage.jpg
│       │   ├── LevelFlow.jpg
│       │   ├── Levels.jpg
│       │   └── socialpage.jpg
│       └── mweb-editor/
│           ├── expandingfordexterity.jpg
│           ├── savingdraft.jpg
│           ├── schedulingcalendar.jpg
│           └── Textediting.jpg
├── src/
│   ├── app/
│   │   ├── about/page.tsx
│   │   ├── brandkit/page.tsx
│   │   ├── contacts/page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── mobileeditor/page.tsx
│   │   ├── mobilewebexperience/page.tsx
│   │   ├── page.tsx
│   │   └── social/page.tsx
│   └── components/
│       ├── AIWorkflow.tsx
│       ├── CaseStudyLayout.tsx
│       ├── DataFlowAnimation.tsx
│       ├── DesignIterationAnimation.tsx
│       ├── Footer.tsx
│       ├── Header.tsx
│       ├── Hero.tsx
│       ├── MetricChart.tsx
│       ├── OrganizationAnimation.tsx
│       ├── PersonalProjects.tsx
│       ├── ProjectCard.tsx
│       ├── SiteControls.tsx
│       └── ThemeContext.tsx
├── Experiment data/
│   ├── 24to25data.md
│   ├── 25to26data.md
│   └── experiment_data.md
├── package.json
├── tsconfig.json
├── next.config.ts
├── postcss.config.mjs
└── eslint.config.mjs
```

---

## Design System

### Color Tokens (defined in `globals.css` via `@theme inline`)

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-background` | `#ffffff` | Page background |
| `--color-foreground` | `#0f1a2a` | Primary text, dark buttons |
| `--color-muted` | `#6b7280` | Secondary text, descriptions |
| `--color-border` | `#e5e7eb` | Card borders, dividers |
| `--color-accent` | `#4f46e5` | Links, highlighted metrics, CTA |
| `--color-accent-purple` | `#d8ccf8` | Purple project card backgrounds |
| `--color-accent-blue` | `#c5d8f6` | Blue project card backgrounds |
| `--color-accent-green` | `#c5f0d6` | Green project card backgrounds |
| `--color-accent-purple-bg` | `#ece6fc` | Purple background variant |
| `--color-accent-blue-bg` | `#e0ecfb` | Blue background variant |
| `--color-accent-green-bg` | `#ddf5e6` | Green background variant |
| `--color-tag-bg` | `#f3f4f6` | Tag pill backgrounds |
| `--color-tag-text` | `#374151` | Tag pill text |

### Typography Scale

- **h1 (Hero):** `text-4xl md:text-5xl lg:text-[3.25rem]`, font-bold, leading-[1.15], tracking-tight, Playfair Display
- **Section headings:** `.section-heading` class — `font-size: 1.2rem`, `font-weight: 700`, `letter-spacing: -0.01em`, `margin-bottom: 0.5rem`
- **Project headlines:** `text-[1.5rem] md:text-[1.75rem]`, font-bold, leading-[1.2], tracking-[-0.01em], Inter
- **Body text:** `text-[15px]` or `text-[13px]`, text-muted, leading-relaxed, Inter
- **Tags:** `text-[11px]`, font-medium, uppercase, tracking-wide
- **Footer heading:** `text-[1.75rem] md:text-4xl lg:text-[2.75rem]`, font-bold, leading-tight

### Spacing Rules

- Page max-width: `max-w-[1200px]` for project sections, `max-w-[1300px]` for AI Workflow and Personal Projects
- Horizontal padding: `px-6 md:px-10`
- Section gaps: controlled by individual padding, no outer gaps between project cards (`gap-0`)
- Footer padding: `px-6 md:px-[240px] py-[247px]`

### Animation

```css
@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up { animation: fade-in-up 0.5s ease-out both; }
```

Applied to Hero section and project cards with staggered `animationDelay` (80ms increments).

---

## Page Layout (top to bottom)

The home page (`page.tsx`) renders in this order:

1. **Header** — logo + "How I use AI" button
2. **Hero** — name + tagline
3. **"Recent Projects" heading** — standalone section
4. **First 2 project cards** — Schedule Page, Mobile Web Experience
5. **AI Workflow section** — "How I use AI in my workflow"
6. **Remaining 4 project cards** — Mobile Email Editor, Contacts Upload, Social Management, Brand Kit
7. **Personal Projects** — 3-card grid
8. **Footer** — CTA with email + LinkedIn

---

## Component Specifications

### Header (`Header.tsx`)

- **Client component** (`"use client"`)
- Max-width `1200px`, centered, flex row with `justify-between`
- Left: logo image (`/images/logo.svg`, 40×30px) linked to `/`
- Right: nav with "AI-integrated" label + pulsing dot indicator (accent color, `animate-ping`)
  - On mobile: "AI-integrated" links to `#ai-data`
  - On desktop (`md:`): shows pipe separator + inline links to each AI card section (Data analysis, Design ideation, Organization)
  - Links use smooth scroll via `scrollIntoView({ behavior: "smooth" })`
  - Text: 13px, font-semibold for label, text-muted with hover:text-accent for links

### Hero (`Hero.tsx`)

- Max-width `1200px`, `pt-10 pb-20`
- h1: "Hey, I'm Aaron." with underline on "Aaron."
  - Underline: `underline underline-offset-4 decoration-2`
- Subtitle: "I'm leading activation growth design at Constant Contact. Here've been up to."
  - `text-base md:text-lg`, text-muted, `max-w-md`

### ProjectCard (`ProjectCard.tsx`)

- **Client component** for video hover behavior
- Props: `date`, `company`, `headline`, `title`, `tags[]`, `description`, `accentColor` (purple|blue|green|none), `href?`, `comingSoon?`, `imagePlaceholder?`, `videoSrc?`, `imageSrc?`, `timelinePt?`
- Layout: two-column flex
  - **Left column** (120px md:140px, `mr-8 md:mr-12`):
    - Date (13px, font-medium)
    - Company (12px, text-muted)
    - Timeline dashes (repeating linear gradient: `#c0c5cc` 8px solid, 10px transparent)
    - Default timeline padding: `pt-[40px]`, overridable via `timelinePt` prop
  - **Right column** (flex-1):
    - Headline with metric highlighting (regex `/(\+[\d.]+%|\d+%)/g` → accent color + bold)
    - Media area: `aspect-[4/3]`, rounded-2xl, accent-colored background
      - Video: plays on hover, pauses + resets on leave. "Playing" badge (top-right, `bg-black/60`, fades in on hover)
      - Image: `object-cover`
      - Fallback: white rounded device mockup placeholder
    - Title + "View project" / "Coming soon" row
    - Tags: pill-shaped, `bg-tag-bg text-tag-text`, uppercase
    - Description: 13px, text-muted, `max-w-[520px]`
- Card wrapper: `rounded-xl`, hover `bg-gray-50/60`, `-mx-4 px-4 pt-1`
- Inner flex: `py-6 px-4 min-h-[1100px] gap-6`
- If `href` and not `comingSoon`: wrapped in `<Link>`

### AIWorkflow (`AIWorkflow.tsx`)

- Max-width `1300px`, `pt-10 pb-10 mb-16 md:mb-[150px]`
- Section badge: pulsing dot + "Accelerating Insight and Execution with AI" title + subtitle
- 2×2 grid (`grid-cols-1 md:grid-cols-2 gap-5 md:gap-8`)
- Hover state: `onMouseEnter`/`onMouseLeave` toggles `isActive` for all card animations
- Card background: `bg-[#fafafa]` with `border border-transparent`
- Card radius: `var(--theme-card-radius, 16px)`
- Each card has:
  - Icon (SVG), title (text-lg font-bold), description (13px text-muted Inter)
  - Tech tags: pill-shaped with icon + label, border, bg-white, `var(--theme-tag-radius, 9999px)`
  - Preview area with animated blob backgrounds (`ai-blob` classes) and interactive component
- **Four cards:**
  1. **Data analysis** (`#ai-data`): Cursor + Snowflake tags, `DataFlowAnimation` preview, blob colors: `#29B5E8, #6366f1, #a78bfa`
  2. **Design ideation** (`#ai-design`): Cursor + Figma Make tags, `DesignIterationAnimation` preview, blob colors: `#a259ff, #ff7262, #6366f1`
  3. **Organization** (`#ai-organization`): Cursor + Jira tags, `OrganizationAnimation` preview, blob colors: `#0052CC, #2684FF, #6366f1`
  4. **Building this site** (no id): Cursor + React tags, `SiteControls` preview (interactive theme controls), no blob colors

### PersonalProjects (`PersonalProjects.tsx`)

- `id="ai-section"` (scroll target from header button)
- Max-width `1300px`, `pt-0 pb-24`
- Section heading: "Personal Projects"
- Subtitle: "I create AI-powered tools to streamline my daily tasks."
- Grid: `grid-cols-1 md:grid-cols-[2fr_1fr] gap-5`
  - Left (2fr): Flowki card (full height)
  - Right (1fr): stacked column (`h-[780px]`), Pro UX Kit then DeskFit (both `compact`)
- Card layout: border, rounded-2xl, p-5, hover lift
  - Icon (40×40 rounded-lg), title, description, tech tags with icons
  - Status badge ("In Development") if applicable
  - External link icon if `href` exists
  - Preview placeholder area (`bg-[#f5f5f7]`)

#### Project Data

| Project | Description | Tags | Status | Has Link |
|---------|-------------|------|--------|----------|
| Flowki | Lightweight task system for planning and shipping daily | Figma Make, Supabase | — | Yes |
| DeskFit | Desk-friendly fitness app for mobility and hydration habits | Cursor, XCode | In Development | No |
| Pro UX Kit | UX frameworks, templates, and prompts toolkit | Figma Make | — | Yes |

### CaseStudyLayout (`CaseStudyLayout.tsx`)

- **Client component** — shared layout for all case study pages
- Wraps content in `ThemeProvider`
- Props: `title`, `subtitle`, `role[]`, `team[]`, `tools[]`, `heroVideoSrc?`, `heroImageSrc?`, `blocks: ContentBlock[]`
- Layout structure:
  1. Back button (circular, links to `/`)
  2. Hero title + subtitle
  3. Meta columns (My Role, Team, Tools) side-by-side with first content block on desktop
  4. Hero media (full-bleed on mobile, `max-w-[960px]` rounded on desktop)
  5. Content blocks (remaining)
- Narrow content max-width: `max-w-[900px]`
- Wide content (images, videos, image rows): `max-w-[960px]`
- `ScrollReveal` wrapper: IntersectionObserver-based fade-in-up animation with configurable delay

#### ContentBlock Types

| Type | Description |
|------|-------------|
| `section` | Title (h2) + React content node |
| `metrics` | Groups of metric cards with optional interactive charts |
| `image` | Full-width image with optional caption |
| `video` | Full-width autoplay/loop/muted video with optional caption |
| `imageRow` | Side-by-side image grid (2-col on desktop) with optional caption |

#### MetricCard

- `bg-[#f8f9fa]`, border, `var(--theme-card-radius, 12px)`
- Value: 1.25rem mobile / 1.75rem desktop, bold, accent color if positive (`+` prefix)
- Label: 12-13px, text-muted

### MetricChart (`MetricChart.tsx`)

- **Client component** — interactive SVG time-series chart
- Props: `data: TimeSeriesPoint[]`, `series: LineSeries[]`, axis labels/units
- Dual Y-axis support (left for rates, right for volume)
- Features:
  - Smooth cubic bezier line paths
  - Dashed line style for prior-year baselines
  - Area fill for volume series (10% opacity)
  - Hover interaction: vertical guide line, dots on data points, dark tooltip with all series values
  - Touch support for mobile
  - Centered legend below chart
- Chart dimensions: 680px SVG width, 220px plot height
- Background: `rgba(248, 249, 250, 1)`, border-radius 16px
- Grid: 5 horizontal lines, ~7 x-axis labels

### Footer (`Footer.tsx`)

- `px-6 md:px-[240px] py-[247px]`, white background
- Inner: `max-w-[1200px]`, centered text
- Heading: "I design for teams that care about doing it right."
- Subtitle: "If that's your team, let's talk – or send me a cat video"
- Two buttons, centered, `gap-3`:
  - **Email** (`mailto:hello@aaroncougle.com`): dark bg, white text, send icon SVG, `rounded-lg`, `px-7 py-3`
  - **LinkedIn** (`https://linkedin.com/in/aaroncougle`): outlined, border-2, `rounded-lg`, `px-10 py-3`, hover fills dark

---

## Project Data (for `page.tsx`)

Listed in render order:

| # | Date | Company | Headline | Title | Tags | Accent | Media | Link |
|---|------|---------|----------|-------|------|--------|-------|------|
| 1 | Jan 9, 2026 | Constant Contact | Initial results show 24% lift in send completion, improving activation | Schedule Page | Growth Experiment, Design lead | purple | `/animations/schedulepage.jpg` (image) | Coming soon |
| 2 | Dec 15, 2025 | Constant Contact | +69% increase in first email sends by streamlining mobile web activation flows | Mobile Web Experience | Growth Experiment, Design lead, 6-day turnaround, Figma Make | purple | `/animations/mweb-experience.mov` (video) | `/mobilewebexperience` |
| 3 | Nov 3, 2025 | Constant Contact | 2x creator-to-sender conversion and +125% lift in second email sends | Mobile Email Editor | Growth Experiment, Patent Pending, Design lead | blue | `/animations/mobile-editor.mp4` (video) | `/mobileeditor` |
| 4 | Nov 19, 2025 | Constant Contact | +11.9% lift in file upload adoption by reducing friction in high intent workflow | Contacts Upload Experience | Lead growth designer, ~ 24,000 monthly users, Statsig in 1.5 weeks, Growth Experiment | blue | `/animations/contacts-upload.mp4` (video) | `/contacts` |
| 5 | May 12, 2025 | Constant Contact | +140% increase in post completion and +81% increase in feature adoption | Social Management | New Feature | green | `/animations/social.mov` (video) | `/social` |
| 6 | Nov 24, 2021 | Constant Contact | 21% lift in trial user activation + conversions | Brand Kit | Feature, 400,000+ users | green | `/animations/brandkit.mp4` (video) | `/brandkit` |

- Projects 1–2 render before the AI Workflow section; projects 3–6 render after
- Project 6 (Brand Kit) has `timelinePt: "pt-[52px]"` to override default timeline padding

---

## Global CSS (`globals.css`)

```css
@import "tailwindcss";

@theme inline {
  --color-background: #ffffff;
  --color-foreground: #0f1a2a;
  --color-muted: #6b7280;
  --color-border: #e5e7eb;
  --color-accent: #4f46e5;
  --color-accent-purple: #d8ccf8;
  --color-accent-blue: #c5d8f6;
  --color-accent-green: #c5f0d6;
  --color-accent-purple-bg: #ece6fc;
  --color-accent-blue-bg: #e0ecfb;
  --color-accent-green-bg: #ddf5e6;
  --color-tag-bg: #f3f4f6;
  --color-tag-text: #374151;
  --font-sans: var(--font-inter);
}

body {
  background: var(--color-background);
  color: var(--color-foreground);
  font-family: var(--font-inter), system-ui, sans-serif;
}

h1 {
  font-family: var(--font-heading), Georgia, serif;
}

@keyframes fade-in-up {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in-up {
  animation: fade-in-up 0.5s ease-out both;
}

.section-heading {
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: -0.01em;
  margin-bottom: 0.5rem;
}
```

---

## Configuration Files

### `next.config.ts`

```typescript
import type { NextConfig } from "next";
const nextConfig: NextConfig = {};
export default nextConfig;
```

### `postcss.config.mjs`

```javascript
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
export default config;
```

### `tsconfig.json` — Path alias

```json
{
  "compilerOptions": {
    "paths": { "@/*": ["./src/*"] }
  }
}
```

---

## Key Implementation Details

### Video Hover Behavior (ProjectCard)

Videos use a `useRef<HTMLVideoElement>` with `onMouseEnter` → `play()` and `onMouseLeave` → `pause()` + `currentTime = 0`. The video element has `loop muted playsInline preload="auto"`. A "Playing" badge appears on hover via `opacity-0 group-hover:opacity-100`.

### Metric Highlighting (ProjectCard)

Headlines are parsed with regex `/(\+[\d.]+%|\d+%)/g` to wrap percentage values in `<span className="text-accent font-bold">`.

### Timeline Dashes (ProjectCard)

A 2px-wide div with repeating linear gradient: `#c0c5cc` for 8px, transparent for 10px. Runs the full height of the left column via `flex-1`. Default top padding `pt-[40px]`, overridable per card.

### Staggered Animations

Project cards use `animationDelay` based on index: `${i * 80}ms` for the first group, `${(i + 2) * 80}ms` for the second group (offset by 2 since they continue after the AI section).

### Responsive Breakpoints

- Mobile: single column, `px-6`
- `md:` (768px+): multi-column grids, `px-10`, larger text sizes
- `lg:` (1024px+): largest heading sizes

---

## Content & Writing Rules

### Voice & Tone

- Write as a principal designer: confident, direct, specific
- Describe what the user sees and what design decisions were made, not abstract strategy
- Embed the designer's role in the narrative rather than listing it separately
- Name the actual risk, the bet, and why the data shows it worked

### Patterns to Avoid

- **No em dashes** — Use commas, periods, colons, or parentheses instead. No `&mdash;`, `—`, or `\u2014` anywhere in case study content.
- **No "It wasn't X, it was Y" constructions** — State the point directly instead of negating then correcting.
- **No generic bullet lists for "My Role"** — Weave contributions into the narrative.
- **No vague language** — Avoid "robust," "streamlined," "leveraged." Be specific about what was built and why.

### Activation Flow (Constant Contact)

When describing activation, use this precise sequence:
1. **Become send-ready:** verify email address + add physical address (required by email regulation)
2. **Add contacts**
3. **Create and send an email**

All three steps must be completed for a user to activate. Reference this flow consistently across case studies.

### Case Study Structure

Follow this narrative arc (adapted per project):
1. **Overview** — What the situation was, stated directly
2. **The Problem** — What was broken and why it mattered for the business
3. **Approach sections** — Specific design decisions, what the user sees, why it was designed that way
4. **Images** — Placed directly after the section they illustrate
5. **Results** — Data with interactive charts where applicable, year-over-year comparisons
6. **Reflection** — Honest assessment of trade-offs, what worked, what didn't
7. **What's Next** — Forward-looking without being speculative

### Experiment Data

- Source files live in `Experiment data/` folder (markdown)
- `24to25data.md` — Prior year baseline (Jul 2024 – Feb 2025)
- `25to26data.md` — Experiment period (Aug 2025 – Feb 2026)
- `experiment_data.md` — Detailed daily data with analysis
- Charts use weekly cohort data with Oct W1–Feb W2 labels for year-over-year overlay
- Dashed lines = prior year baseline, solid lines = experiment period
- Trial volume shown as gray area fill on right Y-axis

---

## Known Gaps / TODOs

1. **Case study pages** — Routes `/contacts`, `/social`, `/brandkit` still need content
2. **Schedule page** — Route linked as "Coming soon," not yet built
3. **Hero subtitle** — Contains a typo: "Here've been up to" (should likely be "Here's what I've been up to")
4. **Personal project previews** — All show text placeholders; need actual preview images/content
5. **Favicon** — Default Next.js favicon exists but may need a custom one

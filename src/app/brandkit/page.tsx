import type { Metadata } from "next";
import CaseStudyLayout from "@/components/CaseStudyLayout";
import type { ContentBlock } from "@/components/CaseStudyLayout";

export const metadata: Metadata = {
  title: "BrandKit – Aaron Cougle",
  description:
    "21% lift in trial user activation + conversions by bringing small business brands to life.",
};

const role = ["Product Design", "UX Strategy", "Interaction Design"];
const team = ["Authoring team", "Product manager", "UXR lead"];
const tools = ["Figma", "Notion", "Jira", "User Testing"];

const blocks: ContentBlock[] = [
  {
    type: "section",
    title: "Overview",
    content: (
      <>
        <p>
          Small businesses want professional marketing, but setting up logos,
          fonts, and colors from scratch is friction most don&rsquo;t have time
          for. BrandKit removes that barrier. Users enter a website URL or
          upload a logo, and the system extracts their brand elements and applies
          them across email templates and landing pages automatically.
        </p>
        <p className="mt-4">
          The project started as a quick-turn utility scoped to logo and color
          import. Early usability sessions revealed users expected full brand
          consistency across everything they created — fonts, imagery, tone. That
          finding shifted BrandKit from a simple utility to something more
          foundational in the product.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-2">
          {[
            { value: "+21%", label: "Trial-to-paid conversion" },
            { value: "400K+", label: "Users" },
          ].map((m) => (
            <div
              key={m.label}
              className="flex flex-col gap-0.5 p-3"
              style={{
                background: "var(--v2-surf)",
                border: "1px solid var(--v2-border)",
                backdropFilter: "blur(12px)",
                borderRadius: 12,
                boxShadow: "var(--v2-card-shadow)",
              }}
            >
              <span className="text-[1rem] md:text-[1.1rem] font-bold tracking-tight font-[family-name:var(--font-inter)]" style={{ color: "var(--color-accent)" }}>
                {m.value}
              </span>
              <span className="text-[11px] md:text-[12px] leading-snug font-[family-name:var(--font-inter)]" style={{ color: "var(--v2-muted)" }}>
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    type: "section",
    title: "The Problem",
    content: (
      <>
        <p>
          Most small business owners are not designers. They can describe their
          brand — the colors they use, the feel they want — but translating that
          into a consistent visual system across every email and landing page
          they create is a different skill. The result was campaigns that looked
          generic, or users spending time on manual customization that should
          have been automatic.
        </p>
        <p className="mt-4">
          The existing product had no mechanism for capturing and applying brand
          identity at scale. Every new template started from zero. BrandKit was
          built to solve that: scan once, apply everywhere.
        </p>
      </>
    ),
  },
  {
    type: "section",
    title: "Scope Under Pressure",
    content: (
      <>
        <p>
          PM pushed for speed — get something in front of users early to capture
          engagement before they dropped off during onboarding. Design saw a
          different opportunity: if we built this right, BrandKit could become
          the foundation every other feature in the product builds on top of.
        </p>
        <p className="mt-4">
          The compromise was to narrow scope without lowering execution quality.
          Font scraping was cut from v1 — it added engineering complexity and
          edge cases that would have slowed the release. What shipped instead was
          a focused, high-quality experience: logo extraction, color import, and
          intelligent application across templates. Doing fewer things well was
          the right call.
        </p>
      </>
    ),
  },
  {
    type: "section",
    title: "The Color Mapping Challenge",
    content: (
      <>
        <p>
          Scanning the website was straightforward. What came after was the real
          design problem. Once colors were extracted, they had to be mapped
          intelligently to different areas of a template — backgrounds, accents,
          text. Done wrong, users would feel trapped in a mismatched design and
          lose confidence in the whole feature.
        </p>
        <p className="mt-4">
          We tested multiple auto-mapping approaches. Some overfit to brand
          palettes and failed when colors lacked sufficient contrast. Others were
          technically correct but looked bad in real content — valid mappings
          that produced ugly results. Neither extreme worked.
        </p>
        <p className="mt-4">
          The solution was a hybrid model. The system auto-maps the most reliable
          colors to high-confidence template areas — backgrounds and primary
          accents — where the logic holds across a wide range of brand palettes.
          For ambiguous mappings, users get a simple adjustment interface they
          can use after the initial import. This gives users a strong, usable
          starting point without locking them in. The automation creates momentum;
          the adjustment layer preserves control.
        </p>
      </>
    ),
  },
  {
    type: "section",
    title: "Results",
    content: (
      <>
        <p>
          Impact was measured against a control cohort during a staged rollout.
          The primary metric was trial-to-paid conversion rate, tracked over a
          60-day window. BrandKit was the only material change introduced during
          the test period, which gave us confidence in attribution.
        </p>
        <p className="mt-4 font-semibold">
          BrandKit drove a 21% lift in trial-to-paid conversion and is now
          active across 400,000+ users.
        </p>
      </>
    ),
  },
  {
    type: "metrics",
    groups: [
      {
        title: "Results",
        description:
          "Measured against a control cohort over a 60-day window. BrandKit was the only material product change during the test period.",
        metrics: [
          { value: "+21%", label: "Trial-to-paid conversion" },
          { value: "400K+", label: "Users on the feature" },
        ],
      },
    ],
  },
  {
    type: "section",
    title: "Reflection",
    content: (
      <>
        <p>
          Cutting font scraping from v1 was the right decision, but it was a
          real tradeoff. Users who expected full brand consistency — the thing
          usability sessions told us they wanted — got most of it, not all of it.
          Fonts are still manual. That gap is visible, and it matters.
        </p>
        <p className="mt-4">
          The color mapping system works well on typical brand palettes, but it
          has limits. Brands with low-contrast colors, or palettes built around
          neutrals, still produce mappings that need adjustment. The hybrid
          approach absorbs most of that friction, but it doesn&rsquo;t eliminate
          it. Shipping something that works for 90% of users while knowing the
          other 10% will need to fix things manually is a calculated risk — one
          the conversion data suggests was worth taking, but a risk nonetheless.
        </p>
      </>
    ),
  },
  {
    type: "section",
    title: "What's Next",
    content: (
      <>
        <p>
          Engineering is building an SVG-to-image converter to address the most
          common logo import failure. Currently, when the scanner encounters an
          SVG logo it cannot process, it falls back to the first detected image
          on the page — which is often wrong. The converter will eliminate that
          fallback path entirely.
        </p>
        <p className="mt-4">
          Font scraping is the logical next addition to the v1 scope that was
          cut. The infrastructure for brand storage is already in place; pulling
          in detected typefaces and applying them across templates is a contained
          problem now that the core system is stable. Beyond that, BrandKit has
          a real opportunity to become the system-of-record for brand identity
          across the entire product — applied automatically whenever a user
          creates something new.
        </p>
      </>
    ),
  },
];

export default function BrandKitPage() {
  return (
    <CaseStudyLayout
      title="BrandKit"
      subtitle="Bringing small business brands to life"
      role={role}
      team={team}
      tools={tools}
      heroVideoSrc="/animations/brandkit.mp4"
      blocks={blocks}
    />
  );
}

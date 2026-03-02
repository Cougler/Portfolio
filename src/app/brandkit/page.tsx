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
    title: "Making Branding Feel Effortless",
    content: (
      <>
        <p>
          Small businesses want their marketing to look professional, but most
          don&rsquo;t have the time or tools to set up logos, fonts, and colors
          from scratch. BrandKit was built to change that &mdash; turning what
          used to feel like a design chore into a one-click confidence boost.
        </p>
        <p className="mt-4">
          Users can upload a logo or simply enter their website. From there,
          BrandKit extracts key brand elements and applies them across email
          templates and landing pages &mdash; so users start with a system that
          already feels like them.
        </p>
        <div className="mt-6 grid grid-cols-1 gap-2" style={{ maxWidth: "200px" }}>
          <div
            className="flex flex-col gap-0.5 p-3 bg-[#f8f9fa] border border-border/50"
            style={{ borderRadius: "var(--theme-card-radius, 12px)" }}
          >
            <span className="text-[1rem] md:text-[1.1rem] font-bold tracking-tight text-accent font-[family-name:var(--font-inter)]">
              +21%
            </span>
            <span className="text-[11px] md:text-[12px] text-muted leading-snug font-[family-name:var(--font-inter)]">
              Trial-to-paid conversion
            </span>
          </div>
        </div>
      </>
    ),
  },
  {
    type: "section",
    title: "Starting Simple",
    content: (
      <>
        <p>
          BrandKit began as a quick-turn project intended to let users add a
          logo and a few brand colors to their emails and landing pages. The
          initial scope was small and meant to fill a clear gap &mdash; users
          wanted their content to &ldquo;look like them&rdquo; without having to
          customize every template.
        </p>
        <p className="mt-4">
          But early usability sessions quickly changed the conversation. Users
          didn&rsquo;t just want logos and colors. They wanted the whole brand
          &mdash; fonts, imagery, and even tone &mdash; to be consistent across
          everything they made. That feedback shifted BrandKit from a simple
          utility into a potential cornerstone of the Constant Contact
          experience.
        </p>
      </>
    ),
  },
  {
    type: "section",
    title: "The Tension Between 'Fast' and 'Right'",
    content: (
      <>
        <p>
          Product management pushed for speed to capture early engagement, while
          design saw an opportunity to build something foundational and sticky.
          The compromise was to narrow scope but raise execution quality.
        </p>
        <p className="mt-4">
          We removed the font-scraping functionality from the first release to
          simplify development and reduce risk. But we kept the focus on what
          mattered most: automatically pulling logos, colors, and imagery from a
          user&rsquo;s website to help them build consistent, professional
          campaigns with minimal effort.
        </p>
      </>
    ),
  },
  {
    type: "section",
    title: "The Core Challenge: Mapping Colors Without Losing Users",
    content: (
      <>
        <p>
          The hardest part of the project wasn&rsquo;t scanning the website
          &mdash; it was what came after. Once the system extracted colors, we
          needed to map them intelligently to different areas of templates. Done
          wrong, it could make users feel trapped in a mismatched design, forcing
          them to fix colors manually and breaking flow.
        </p>
        <p className="mt-4">
          We tested multiple approaches to automatic color assignment. Early
          language models and mapping systems showed promise, but it was too
          early to train a model, and our current mapping structure was
          cumbersome for a light flow. Some overfit to brand palettes and failed
          when colors lacked contrast. Others worked technically but
          didn&rsquo;t look good in real content.
        </p>
        <p className="mt-4">Ultimately, we developed a hybrid approach:</p>
        <ul className="list-disc pl-5 mt-3 space-y-1">
          <li>
            The system automatically mapped the most reliable colors to key
            template areas like backgrounds and accents.
          </li>
          <li>
            For ambiguous mappings, users received a simple interface they could
            use to adjust their palette manually afterwards.
          </li>
        </ul>
        <p className="mt-4">
          This balance gave users a strong starting point without removing
          control, and it prevented the feature from feeling unpredictable.
        </p>
      </>
    ),
  },
  {
    type: "metrics",
    groups: [
      {
        title: "Impact Was Measurable",
        description:
          "BrandKit shipped as a focused but flexible experience. Users could scan their website, import logos and imagery, and see their branding applied instantly across email and page templates.",
        metrics: [
          { value: "21%", label: "Lift in trial-to-paid conversions" },
        ],
      },
    ],
  },
  {
    type: "section",
    title: "User Feedback",
    content: (
      <div className="space-y-3">
        <blockquote className="border-l-2 border-accent/40 pl-4 italic text-foreground">
          &ldquo;It pulled most of my colors perfectly.&rdquo;
        </blockquote>
        <blockquote className="border-l-2 border-accent/40 pl-4 italic text-foreground">
          &ldquo;It felt like I had a designer helping me.&rdquo;
        </blockquote>
        <blockquote className="border-l-2 border-accent/40 pl-4 italic text-foreground">
          &ldquo;I actually feel like my emails represent my business.&rdquo;
        </blockquote>
        <p className="mt-4">
          The lesson: automation is most successful when it feels personal.
        </p>
      </div>
    ),
  },
  {
    type: "section",
    title: "What I Learned",
    content: (
      <>
        <p>
          This project taught me that speed and quality don&rsquo;t have to
          compete &mdash; but they do have to be negotiated. Building BrandKit
          was an exercise in balancing immediate product goals with long-term
          design value.
        </p>
        <p className="mt-4">
          We shipped on time, delivered real impact, and set the foundation for a
          feature that can keep growing. More importantly, it proved that
          automation succeeds when it gives users momentum without taking away
          control.
        </p>
      </>
    ),
  },
  {
    type: "section",
    title: "What Still Needs Work",
    content: (
      <>
        <p>
          There are still a few edge cases where the brand scanner doesn&rsquo;t
          perform as expected. These are being tracked and prioritized based on
          frequency as support requests come in. One consistent issue involves
          SVG logos, which the scanner currently can&rsquo;t process. When that
          happens, the system defaults to using the first image it successfully
          detects as the logo.
        </p>
        <p className="mt-4">
          Engineering is developing a converter that automatically generates
          image files from SVGs to prevent users from having to update assets
          manually.
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

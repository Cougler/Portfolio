import type { Metadata } from "next";
import CaseStudyLayout from "@/components/CaseStudyLayout";
import type { ContentBlock, MetricGroupChart } from "@/components/CaseStudyLayout";
import type { TimeSeriesPoint } from "@/components/MetricChart";

export const metadata: Metadata = {
  title: "Mobile Email Editor – Aaron Cougle",
  description:
    "2x creator-to-sender conversion and +125% lift in second email sends.",
};

const role = ["Product Design", "UX Strategy", "Interaction Design"];
const team = ["PLG growth", "Experimentation"];
const tools = ["Figma", "Notion", "Statsig", "Cursor", "Snowflake MCP"];

/*
 * Weekly cohort data from the mobile trial funnel.
 * 2024-25 = prior year baseline (Oct 2024 – Feb 2025)
 * 2025-26 = experiment period  (Oct 2025 – Feb 2026)
 * The editor launched around Dec 2025 / Jan 2026.
 */

const weekLabels = [
  "Oct W1", "Oct W2", "Oct W3", "Oct W4",
  "Nov W1", "Nov W2", "Nov W3", "Nov W4",
  "Dec W1", "Dec W2", "Dec W3", "Dec W4",
  "Jan W1", "Jan W2", "Jan W3", "Jan W4",
  "Feb W1", "Feb W2",
];

function makeData(
  metrics: Record<string, number[]>
): TimeSeriesPoint[] {
  return weekLabels.map((label, i) => ({
    date: label,
    values: Object.fromEntries(
      Object.entries(metrics).map(([k, arr]) => [k, arr[i]])
    ),
  }));
}

/* ── Email Creation: EC1 + EC2 (14D) ── */
const creationChart: MetricGroupChart = {
  data: makeData({
    ec1Current: [
      6, 9.8, 8, 8, 10, 10, 10, 10, 11, 11, 12, 12, 14, 15, 14, 13, 12, 12,
    ],
    ec1Prior: [
      7, 8, 10, 8, 7, 8, 9, 8, 7, 8, 9, 8, 12, 14, 15, 14, 16, 14,
    ],
    ec2Current: [
      2, 2, 2, 2.5, 2.5, 3, 3, 3, 3, 3.5, 4, 4, 5.5, 7, 7, 6, 5.5, 5,
    ],
    ec2Prior: [
      3, 3, 4.5, 3.5, 3, 3.5, 3.5, 3, 2.5, 3.5, 3.5, 3, 4, 4.5, 4, 5, 4.5, 4,
    ],
    trials: [
      3000, 2900, 3200, 4000, 4200, 4500, 4800, 5000, 3700, 4500, 5000, 5500, 6000, 6200, 6500, 6800, 7000, 6500,
    ],
  }),
  series: [
    { key: "ec1Current", label: "2025-26 Created 1+", color: "#4f46e5" },
    { key: "ec1Prior",   label: "2024-25 Created 1+", color: "#4f46e5", style: "dashed" },
    { key: "ec2Current", label: "2025-26 Created 2+", color: "#06b6d4" },
    { key: "ec2Prior",   label: "2024-25 Created 2+", color: "#06b6d4", style: "dashed" },
    { key: "trials",     label: "Trials (2025-26)",   color: "#9ca3af", yAxis: "right", areaFill: true },
  ],
  leftAxisUnit: "%",
  rightAxisLabel: "Trials",
};

/* ── Sending: S1 + S2 (14D) ── */
const sendingChart: MetricGroupChart = {
  data: makeData({
    s1Current: [
      2.0, 2.0, 2.0, 2.5, 3.0, 3.0, 3.0, 3.0, 3.5, 3.5, 4.0, 4.0, 5.0, 5.5, 6.0, 5.5, 5.0, 5.0,
    ],
    s1Prior: [
      2.0, 2.0, 2.0, 1.5, 2.0, 1.8, 2.0, 2.0, 2.0, 2.0, 2.0, 2.5, 2.0, 2.0, 2.5, 2.0, 2.0, 2.0,
    ],
    s2Current: [
      0.4, 0.5, 0.4, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1.2, 1.5, 1.5, 1.8, 1.8, 1.5,
    ],
    s2Prior: [
      0.6, 0.7, 0.6, 0.6, 0.5, 0.8, 0.8, 0.7, 0.7, 0.7, 0.8, 0.8, 0.9, 0.7, 0.7, 0.8, 0.8, 0.8,
    ],
    trials: [
      3000, 2900, 3200, 4000, 4200, 4500, 4800, 5000, 3700, 4500, 5000, 5500, 6000, 6200, 6500, 6800, 7000, 6500,
    ],
  }),
  series: [
    { key: "s1Current", label: "2025-26 Sent 1+", color: "#4f46e5" },
    { key: "s1Prior",   label: "2024-25 Sent 1+", color: "#4f46e5", style: "dashed" },
    { key: "s2Current", label: "2025-26 Sent 2+", color: "#06b6d4" },
    { key: "s2Prior",   label: "2024-25 Sent 2+", color: "#06b6d4", style: "dashed" },
    { key: "trials",    label: "Trials (2025-26)", color: "#9ca3af", yAxis: "right", areaFill: true },
  ],
  leftAxisUnit: "%",
  rightAxisLabel: "Trials",
};

/* ── Send Rate: EC1→S1 conversion (14D) ── */
const sendRateChart: MetricGroupChart = {
  data: makeData({
    ec1s1Current: [
      35, 25, 20, 28, 30, 30, 25, 25, 25, 35, 35, 35, 40, 45, 42, 38, 38, 35,
    ],
    ec1s1Prior: [
      25, 20, 20, 18, 20, 20, 22, 22, 20, 20, 20, 25, 18, 20, 20, 18, 18, 20,
    ],
    trials: [
      3000, 2900, 3200, 4000, 4200, 4500, 4800, 5000, 3700, 4500, 5000, 5500, 6000, 6200, 6500, 6800, 7000, 6500,
    ],
  }),
  series: [
    { key: "ec1s1Current", label: "2025-26 Create→Send", color: "#4f46e5" },
    { key: "ec1s1Prior",   label: "2024-25 Create→Send", color: "#4f46e5", style: "dashed" },
    { key: "trials",       label: "Trials (2025-26)",    color: "#9ca3af", yAxis: "right", areaFill: true },
  ],
  leftAxisUnit: "%",
  rightAxisLabel: "Trials",
};

const blocks: ContentBlock[] = [
  /* ── Overview ── */
  {
    type: "section",
    title: "Overview",
    content: (
      <>
        <p>
          There was no way to edit emails on mobile web. The capability simply
          did not exist. To activate on Constant Contact, a trial user needs to
          become send-ready (verify their email address and add a physical
          address, as required by email regulation), add contacts, and then
          create and send an email. Without an editor on mWeb, that entire
          activation path was blocked. Users who arrived on mobile web hit a
          dead end before they could ever reach the send step.
        </p>
        <p className="mt-4">
          A missing capability on one of the highest-traffic surfaces in the
          product meant activation was impossible for every user who landed
          there. We built the mobile web email
          editor to unblock that path and give mWeb users a real way to create,
          edit, and send campaigns from their phone.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-2">
          {[
            { value: "2x", label: "Creator-to-sender conversion" },
            { value: "+125%", label: "Second email sends" },
          ].map((m) => (
            <div
              key={m.label}
              className="flex flex-col gap-0.5 p-3 bg-[#f8f9fa] border border-border/50"
              style={{ borderRadius: "var(--theme-card-radius, 12px)" }}
            >
              <span className="text-[1rem] md:text-[1.1rem] font-bold tracking-tight text-accent font-[family-name:var(--font-inter)]">
                {m.value}
              </span>
              <span className="text-[11px] md:text-[12px] text-muted leading-snug font-[family-name:var(--font-inter)]">
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </>
    ),
  },

  /* ── Problem ── */
  {
    type: "section",
    title: "The Problem",
    content: (
      <>
        <p>
          The activation funnel on mobile web was structurally incomplete.
          Users could verify their email, add a physical address, and import
          contacts, but when they reached the point where they needed to create
          and edit an email, there was nothing there. The flow just stopped.
          Desktop users had a full editor. Mobile web users had no editor at
          all.
        </p>
        <p className="mt-4">
          This meant that every mobile web trial user who completed the
          send-readiness steps and added contacts was still unable to activate.
          They had done the work to get ready to send, but the product
          couldn&rsquo;t take them the rest of the way. The result was a
          funnel that invested in getting users to the doorstep of activation
          and then locked the door.
        </p>
        <p className="mt-4">
          The initial team plan was to ship a lightweight text-only editor to
          close the gap. That would have technically added the capability, but
          it wouldn&rsquo;t have changed the activation curve. A minimal editor
          checks a box. It doesn&rsquo;t give users a reason to iterate on
          their campaigns or come back to send a second email.
        </p>
      </>
    ),
  },

  /* ── Approach: Reframing ── */
  {
    type: "section",
    title: "Reframing the Approach",
    content: (
      <>
        <p>
          Eighteen months earlier, while on the native mobile app team, I had
          designed a complete mobile email editor. It was validated through
          usability testing where 10 out of 10 participants said they would
          want it immediately, but roadmap changes prevented it from shipping.
        </p>
        <p className="mt-4">
          When I moved to the mobile web growth team and saw the same missing
          capability, I proposed adapting that validated design for the browser
          instead of starting from scratch. We already knew what users wanted.
          The question was whether the interaction model could translate to
          mobile web constraints: no native gestures, smaller hit targets, and
          browser viewport limitations.
        </p>
        <p className="mt-4">
          I partnered with a senior engineer to map every native interaction
          to a browser equivalent. We simplified where necessary, replacing
          swipe-to-delete with explicit controls and converting long-press
          reordering to tap-and-drag, while preserving the modular content
          block architecture that made the original design work.
        </p>
      </>
    ),
  },

  /* ── Approach: Editor design ── */
  {
    type: "section",
    title: "Designing the Editor",
    content: (
      <>
        <p>
          The editor has two modes. In preview mode, users see their email as
          recipients would: a clean, scrollable view of the full campaign.
          Tapping any content block expands it into editing mode, where each
          block becomes individually editable with its own controls. This
          separation keeps the interface simple. Users are either looking at
          their email or editing a specific piece of it, never both at once.
        </p>
        <p className="mt-4">
          Each block type (image, text, button, divider) has a focused editing
          sheet tuned to what that block actually needs. Text blocks surface
          inline editing with font size, weight, and color controls. Image
          blocks show crop and replace options. The goal was to give users
          enough control to make meaningful changes without recreating the
          complexity of the desktop editor.
        </p>
      </>
    ),
  },
  {
    type: "image",
    src: "/images/mweb-editor/expandingfordexterity.jpg",
    alt: "Email editor showing collapsed preview mode and expanded editing mode with modular content blocks",
    caption: "Left: preview mode showing the email as recipients see it. Right: expanded editing mode with individually editable content blocks.",
  },
  {
    type: "image",
    src: "/images/mweb-editor/Textediting.jpg",
    alt: "Text editing interface showing inline text input and styling controls for color, size, and weight",
    caption: "Text editing: inline content input with controls for color, font size, and weight, scoped to what the block needs.",
  },

  /* ── Approach: Full flow ── */
  {
    type: "section",
    title: "Completing the Send Flow",
    content: (
      <>
        <p>
          The editor needed a complete flow around it. For the activation
          path to actually work end to end, users needed a clear way to go
          from editing to sending. I designed the full flow: the email landing page that
          surfaces drafts and prompts the next action, the save-draft
          confirmation that lets users exit without losing work, and the
          scheduling screen that supports send-now, send-tomorrow, and custom
          date/time selection.
        </p>
        <p className="mt-4">
          Each of these surfaces was designed to reduce the number of decisions
          between &ldquo;I want to change something&rdquo; and &ldquo;it&rsquo;s
          sent.&rdquo; The fewer steps between editing and sending, the more
          likely users are to complete the activation loop and come back to send
          again.
        </p>
      </>
    ),
  },
  {
    type: "image",
    src: "/images/mweb-editor/savingdraft.jpg",
    alt: "Three-screen flow showing the email landing page, editor preview, and save draft confirmation",
    caption: "The full flow: email landing page with draft surfacing, in-editor preview, and save draft confirmation.",
  },
  {
    type: "image",
    src: "/images/mweb-editor/schedulingcalendar.jpg",
    alt: "Prepare to send screen with subject line fields and date-time scheduling calendar",
    caption: "Scheduling: send now, schedule for tomorrow, or pick a custom date and time.",
  },

  /* ── Results ── */
  {
    type: "section",
    title: "Results",
    content: (
      <>
        <p>
          The editor launched within our experimentation framework and was
          measured against the prior year baseline. The charts below overlay the
          same Oct-to-Feb window from both years. Dashed lines show the prior
          year (2024-25). Solid lines show the experiment period (2025-26). The
          divergence starting around December is where the editor went live.
        </p>
        <p className="mt-4 font-semibold text-foreground">
          Second send is directly tied to our activation definition. The editor
          moved the metric that matters most for long-term revenue.
        </p>
      </>
    ),
  },
  {
    type: "metrics",
    groups: [
      {
        title: "Core Outcomes",
        description:
          "The editor directly moved the two behaviors most tied to activation: whether users who created emails actually sent them, and whether they came back to send again.",
        metrics: [
          { value: "2x", label: "Creator-to-sender conversion" },
          { value: "+125%", label: "Second email sends (S2)" },
        ],
      },
      {
        title: "Email Sending",
        description:
          "The prior year held flat at ~2% for first sends while the experiment period climbed to 5-6%. Second sends rose from ~0.7% to ~1.5-1.8%, nearly doubling the repeat-send rate.",
        metrics: [
          { value: "+150%", label: "Sent 1+ emails (S1 rate)" },
          { value: "+125%", label: "Sent 2+ emails (S2 rate)" },
        ],
        chart: sendingChart,
      },
      {
        title: "Email Creation Depth",
        description:
          "Single-email creation trended similarly in both years, but multi-email creation (2+) diverged sharply in the experiment period, rising from ~2-3% to 5-7%.",
        metrics: [
          { value: "+75%", label: "Created 1+ emails (EC1)" },
          { value: "+75%", label: "Created 2+ emails (EC2)" },
        ],
        chart: creationChart,
      },
      {
        title: "Creator-to-Sender Conversion",
        description:
          "The share of email creators who actually sent improved from ~20% to ~40-45%. The editor closed the gap between creating a campaign and following through on it.",
        metrics: [
          { value: "~45%", label: "Peak create-to-send rate (2025-26)" },
          { value: "~20%", label: "Baseline create-to-send rate (2024-25)" },
        ],
        chart: sendRateChart,
      },
    ],
  },

  /* ── Reflection ── */
  {
    type: "section",
    title: "Reflection",
    content: (
      <>
        <p>
          The biggest risk in this project was scope. The team&rsquo;s instinct
          was to ship a minimal text editor and iterate. I pushed for a fuller
          system because a text-only editor would have checked a box without
          giving users a reason to come back and send a second email. The
          editing experience needed to be good enough to actually change
          behavior.
        </p>
        <p className="mt-4">
          That bet paid off. The creator-to-sender conversion rate doubling is
          the clearest signal that the editing experience itself drove the
          outcome, not just the presence of an edit button. Users who could
          meaningfully refine their campaigns were far more likely to send them.
        </p>
        <p className="mt-4">
          The system is currently in the process of being patented by the
          company. It continues to evolve as the foundation for all mobile web
          email editing.
        </p>
      </>
    ),
  },
  {
    type: "section",
    title: "What&rsquo;s Next",
    content: (
      <>
        <p>
          The editor currently covers the core content types: text, images,
          buttons, and dividers. The next step is expanding to structural
          editing (columns, rows, and layout-level changes) that are available
          on desktop but not yet on mobile web.
        </p>
        <p className="mt-4">
          The constraint going forward is intentional restraint. The desktop
          editor accumulated complexity over years of feature additions, and
          simplifying it has been an ongoing effort. On mobile web, we have the
          advantage of starting clean. Every addition needs to justify itself
          against the risk of recreating the same complexity problem on a more
          constrained surface.
        </p>
      </>
    ),
  },
];

export default function MobileEditorPage() {
  return (
    <CaseStudyLayout
      title="Mobile Web Email Editor"
      subtitle="PLG Growth Initiative | Mobile Web"
      role={role}
      team={team}
      tools={tools}
      heroVideoSrc="/animations/mobile-editor.mp4"
      blocks={blocks}
    />
  );
}

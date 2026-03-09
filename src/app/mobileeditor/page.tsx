import type { Metadata } from "next";
import CaseStudyLayout from "@/components/CaseStudyLayout";
import type { ContentBlock, MetricGroupChart } from "@/components/CaseStudyLayout";

export const metadata: Metadata = {
  title: "Mobile Email Editor – Aaron Cougle",
  description:
    "+2.1% trial-to-paid conversion with a more efficient path from editor to payment.",
};

const role = ["Product Design", "UX Strategy", "Interaction Design"];
const team = ["PLG growth", "Experimentation"];
const tools = ["Figma", "Notion", "Statsig", "Cursor", "Snowflake MCP"];

/*
 * A/B test: mweb_email_editor (Statsig)
 * Experiment dates: Dec 19, 2025 – Feb 4, 2026
 * Control: 7,278 users | Test: 7,245 users
 */

const sendingChart: MetricGroupChart = {
  data: [
    { date: "Control", values: { sentMEQ1: 7.78, sentMEQ2: 1.96, sentMEQ3: 1.79 } },
    { date: "Test", values: { sentMEQ1: 5.92, sentMEQ2: 1.79, sentMEQ3: 1.60 } },
  ],
  series: [
    { key: "sentMEQ1", label: "Sent exactly 1",  color: "#06b6d4" },
    { key: "sentMEQ2", label: "Sent exactly 2",  color: "#8b5cf6" },
    { key: "sentMEQ3", label: "Sent 3+",         color: "#f59e0b" },
  ],
  leftAxisUnit: "%",
  chartType: "bar",
};

const conversionChart: MetricGroupChart = {
  data: [
    { date: "Control", values: { t2p: 11.91 } },
    { date: "Test", values: { t2p: 12.16 } },
  ],
  series: [
    { key: "t2p", label: "T2P conversion", color: "#4f46e5" },
  ],
  leftAxisUnit: "%",
  chartType: "bar",
  showValues: true,
};

const creationChart: MetricGroupChart = {
  data: [
    { date: "Control", values: { meq1: 11.94, meq2: 4.23, meq3: 6.93 } },
    { date: "Test", values: { meq1: 11.12, meq2: 4.97, meq3: 6.71 } },
  ],
  series: [
    { key: "meq1", label: "Created exactly 1", color: "#06b6d4" },
    { key: "meq2", label: "Created exactly 2", color: "#8b5cf6" },
    { key: "meq3", label: "Created 3+",        color: "#f59e0b" },
  ],
  leftAxisUnit: "%",
  chartType: "bar",
  showValues: true,
};

const blocks: ContentBlock[] = [
  /* ── Overview ── */
  {
    type: "section",
    title: "Overview",
    content: (
      <>
        <p>
          Mobile web had no email editor, which meant activation was structurally
          impossible for every trial user who landed there. I designed a full
          mobile web email editor, adapted from a validated native design I had
          built eighteen months earlier on the mobile app team. We A/B tested it
          across 14,523 users. Email sends dropped 19.2%, but trial-to-paid
          conversion improved 2.1%, indicating the editor replaced
          confusion-driven sends with intentional ones and created a more
          efficient path to payment.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-2">
          {[
            { value: "-19.2%", label: "Email sends" },
            { value: "+2.1%", label: "Trial-to-paid conversion" },
          ].map((m) => (
            <div
              key={m.label}
              className="flex flex-col gap-0.5 p-3"
              style={{
                background: "var(--v2-surf)",
                border: "1px solid var(--v2-border)",
                backdropFilter: "blur(12px)",
                borderRadius: 12,
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
          couldn't take them the rest of the way. The result was a
          funnel that invested in getting users to the doorstep of activation
          and then locked the door.
        </p>
        <p className="mt-4">
          The initial team plan was to ship a lightweight text-only editor to
          close the gap. That would have technically added the capability, but
          it wouldn't have changed the activation curve. A minimal editor
          checks a box. It doesn't give users a reason to iterate on
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
          between "I want to change something" and "it's
          sent." The fewer steps between editing and sending, the more
          likely users are to complete the activation loop and come back to send
          again.
        </p>
      </>
    ),
  },
  {
    type: "section",
    content: (
      <p>
        In the previous experience, opening the editor automatically created an
        email behind the scenes. Every tap into the editor counted as a creation,
        whether the user did anything or not. We changed that. Now, if a user
        opens the editor and backs out without making any changes, nothing is
        saved and no creation is counted. If they edit anything at all, they're
        prompted to save their draft on exit, and only then does it count as a
        creation. This distinction is what makes the flat creation rate in the
        results meaningful: every creation in the test group represents a real
        decision to start a campaign.
      </p>
    ),
  },
  {
    type: "image",
    src: "/images/mweb-editor/savingdraft.jpg",
    alt: "Three-screen flow showing the email landing page, editor preview, and save draft confirmation",
    caption: "Left: email landing page with draft surfacing. Center: in-editor preview. Right: save draft confirmation, only triggered when the user has made a change.",
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
          The editor ran as an A/B test through Statsig from December 19, 2025
          to February 4, 2026. The control group (7,278 users) had no mobile
          editor. The test group (7,245 users) had the full editing experience.
        </p>
        <p className="mt-4">
          The headline finding was counterintuitive: the test group sent fewer
          emails but converted to paid at a slightly higher rate. Email sends
          dropped 17.2% across the board, yet trial-to-paid conversion ticked
          up by about 1%. Users with the editor needed fewer sends to reach the
          point where they were ready to pay.
        </p>
        <p className="mt-4">
          This points to a quality-over-quantity effect. The editor gave users
          a higher degree of confidence in the emails they were creating. Rather
          than sending multiple low-effort campaigns (a pattern the old express
          send flow may have encouraged through confusion or perceived
          simplicity), users with the editor invested more in each send and
          arrived at a purchase decision faster.
        </p>
      </>
    ),
  },
  {
    type: "metrics",
    groups: [
      {
        title: "Trial-to-Paid Conversion",
        description:
          "Users with the editor converted at a higher rate despite sending fewer emails, indicating a more efficient path to payment. Physical address completion also improved (+2.0%), suggesting the editor experience increased overall engagement with setup steps.",
        metrics: [
          { value: "+2.1%", label: "T2P conversion (11.9% → 12.2%)" },
          { value: "+2.0%", label: "Physical address (73.6% → 75.1%)" },
        ],
        chart: conversionChart,
      },
      {
        title: "Email Sending",
        description:
          "Send volume dropped across all depth levels. This is the clearest evidence that the old flow was inflating send counts. The express send path in the control likely drove sends that were rooted in confusion or low commitment rather than genuine intent.",
        metrics: [
          { value: "-23.9%", label: "Sent exactly 1 (7.8% → 5.9%)" },
          { value: "-8.7%", label: "Sent exactly 2 (2.0% → 1.8%)" },
          { value: "-10.6%", label: "Sent 3+ (1.8% → 1.6%)" },
        ],
        chart: sendingChart,
      },
      {
        title: "Email Creation",
        description:
          "In the previous experience, tapping the button that opened the editor automatically created an email behind the scenes. Just opening it counted as a creation. The new editor removed that behavior entirely. Overall creation rate stayed flat (-1.3%), but the MEQ breakdown reveals something more interesting: MEQ-1 dropped 6.9% while MEQ-2 jumped 17.5%. Users who previously created a single throwaway email were now creating a second one on purpose. The shift from shallow to deeper creation depth is a strong signal that the editor was driving intentional engagement rather than inflated counts.",
        metrics: [
          { value: "-6.9%", label: "Created exactly 1 (11.9% → 11.1%)" },
          { value: "+17.5%", label: "Created exactly 2 (4.2% → 5.0%)" },
          { value: "-3.2%", label: "Created 3+ (6.9% → 6.7%)" },
        ],
        chart: creationChart,
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
          The biggest risk in this project was scope. The team's instinct
          was to ship a minimal text editor and iterate. I pushed for a fuller
          system because a text-only editor would have checked a box without
          giving users a real reason to invest in their campaigns. The editing
          experience needed to be good enough to build confidence, not just
          check a capability box.
        </p>
        <p className="mt-4">
          The A/B results validated that instinct in an unexpected way. Sends
          went down, but conversion held steady and even ticked up. The editor
          didn't make users send more; it made each send more intentional. The
          drop in send volume is likely a signal that the old express send flow
          was generating sends driven by confusion or low commitment rather
          than genuine intent. Users with a real editor invested more in
          fewer emails and arrived at a purchase decision faster.
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
    title: "What's Next",
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
      subtitle="PLG Growth Experiment | A/B Test | Dec 19, 2025 – Feb 4, 2026"
      role={role}
      team={team}
      tools={tools}
      heroVideoSrc="/animations/mobile-editor.mp4"
      blocks={blocks}
    />
  );
}

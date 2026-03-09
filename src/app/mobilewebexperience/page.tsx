import type { Metadata } from "next";
import CaseStudyLayout from "@/components/CaseStudyLayout";
import type { ContentBlock, MetricGroupChart } from "@/components/CaseStudyLayout";

export const metadata: Metadata = {
  title: "Mobile Web Experience – Aaron Cougle",
  description:
    "+10.6% lift in email sends and +$861K estimated annual revenue impact.",
};

const role = ["Product Design", "UX Strategy", "Interaction Design"];
const team = ["PLG growth", "Experimentation"];
const tools = ["Figma", "Notion", "Statsig", "Cursor", "Snowflake MCP"];

/*
 * A/B test: simplified_mweb_experience (Statsig)
 * Experiment dates: Dec 22, 2025 – Jan 27, 2026
 * Control: 12,670 users | Test: 12,799 users
 */

const sendingChart: MetricGroupChart = {
  data: [
    { date: "Control", values: { sentAny: 13.91, sentMEQ1: 8.35, sentMEQ2: 2.84, sentMEQ3: 2.72 } },
    { date: "Test", values: { sentAny: 15.39, sentMEQ1: 9.41, sentMEQ2: 2.80, sentMEQ3: 3.18 } },
  ],
  series: [
    { key: "sentAny",  label: "Sent any",       color: "#4f46e5" },
    { key: "sentMEQ1", label: "Sent exactly 1",  color: "#06b6d4" },
    { key: "sentMEQ2", label: "Sent exactly 2",  color: "#8b5cf6" },
    { key: "sentMEQ3", label: "Sent 3+",         color: "#f59e0b" },
  ],
  leftAxisUnit: "%",
  chartType: "bar",
};

const funnelChart: MetricGroupChart = {
  data: [
    { date: "Control", values: { emailVerified: 66.45, physicalAddress: 66.39, secondLogin: 45.51 } },
    { date: "Test", values: { emailVerified: 69.66, physicalAddress: 68.22, secondLogin: 46.32 } },
  ],
  series: [
    { key: "emailVerified",   label: "Email verified",     color: "#4f46e5" },
    { key: "physicalAddress",  label: "Physical address",   color: "#06b6d4" },
    { key: "secondLogin",     label: "Second login",        color: "#8b5cf6" },
  ],
  leftAxisUnit: "%",
  chartType: "bar",
};

const revenueChart: MetricGroupChart = {
  data: [
    { date: "Control", values: { t2p: 18.36, eltvPerUser: 104.82 } },
    { date: "Test", values: { t2p: 18.30, eltvPerUser: 111.46 } },
  ],
  series: [
    { key: "t2p",         label: "T2P conversion",       color: "#4f46e5" },
    { key: "eltvPerUser", label: "ELTV per exposed user", color: "#06b6d4", yAxis: "right" },
  ],
  leftAxisUnit: "%",
  rightAxisUnit: "",
  rightAxisLabel: "ELTV ($)",
  chartType: "bar",
};

const blocks: ContentBlock[] = [
  /* ── Overview ── */
  {
    type: "section",
    title: "Overview",
    content: (
      <>
        <p>
          Mobile web had significant ad-driven trial traffic but no way for users
          to activate. I designed and built a gamified activation experience from
          scratch, guiding users step-by-step through email verification, address
          entry, contact import, and email creation and sending. We shipped it as
          an A/B test across 25,469 users. Email sends lifted 10.6%, email
          verification surged 4.8%, and test converters chose higher-value plans
          (+6.7% ELTV). The net revenue impact was an estimated +$861K annually.
        </p>
        <div className="mt-6 grid grid-cols-3 gap-2">
          {[
            { value: "+10.6%", label: "Email send rate" },
            { value: "+6.7%", label: "Higher ELTV per converter" },
            { value: "+$861K", label: "Est. annual revenue" },
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

  /* ── The Problem ── */
  {
    type: "section",
    title: "The Problem",
    content: (
      <>
        <p>
          Activation at Constant Contact means a trial user becomes
          "send-ready." They've verified their email,
          added a physical address, imported at least two contacts, and created
          and sent two or more email campaigns. Users who hit that bar convert
          to paid at dramatically higher rates. It's the single most
          important behavioral milestone in the trial funnel.
        </p>
        <p className="mt-4">
          On desktop, each of those steps had a dedicated flow. On mobile web,
          most of them didn't exist at all. Users would land from an ad,
          poke around, hit a dead end, and leave. Pages redirected users into
          parts of the app that weren't mobile-friendly. Flows that
          technically worked would trap users if they tried to do anything
          before activating. There was no sequencing, no guidance, and no
          way to complete the path.
        </p>
        <p className="mt-4">
          When I joined the PLG Growth Team in November 2024, our mandate was
          to move Activation and Trial-to-Paid conversion. MWeb was the obvious
          place to start: significant ad-driven traffic with zero activation
          infrastructure.
        </p>
      </>
    ),
  },

  /* ── Hypothesis ── */
  {
    type: "section",
    title: "The Hypothesis",
    content: (
      <>
        <p>
          We hypothesized that if we built a clear, step-by-step path guiding
          mobile web users through every activation prerequisite, we'd
          improve both the activation rate and downstream conversion. Our growth
          team (three PMs, five engineers, and myself as the designer)
          aligned on the approach, scoped feasibility, and instrumented
          metrics so we could call the experiment within two to three weeks of
          traffic.
        </p>
        <p className="mt-4">
          But giving users a checklist wasn't enough. These are small
          business owners. They're thinking about their next sale, not
          about configuring an email platform. I hypothesized that
          gamifying the setup process (rewarding each completed step,
          making the next action obvious, and showing users how close they were
          to being done) would push completion rates higher than a
          standard onboarding flow.
        </p>
      </>
    ),
  },

  /* ── Execution: Audit ── */
  {
    type: "section",
    title: "Clearing the Path",
    content: (
      <>
        <p>
          I started by auditing the entire mWeb experience. Every page that
          didn't contribute to activation for trial users got cut or
          reworked. Redirect traps that sent users into desktop-oriented dead
          ends were removed. Pages that technically loaded but weren't
          usable on a phone were pulled. The goal was to strip away anything
          that could distract or stall a new user before they reached a
          send-ready state.
        </p>
        <p className="mt-4">
          There was one hard blocker: mWeb had no email editor. You can't
          ask users to create and send emails if there's no way to compose
          one. We built and shipped the{" "}
          <a href="/mobileeditor" className="underline" style={{ color: "var(--color-accent)" }}>
            mobile email editor
          </a>{" "}
          as a prerequisite, validating it as a standalone experiment before
          moving on to the broader activation experience.
        </p>
      </>
    ),
  },

  /* ── Execution: Progression system ── */
  {
    type: "section",
    title: "Designing the Progression System",
    content: (
      <>
        <p>
          With the editor in place, I designed a dashboard that stepped users
          through activation as a series of levels. Each completed prerequisite
          (verify email, add address, import contacts, create an email,
          send it) triggered a bottom sheet congratulating the user and
          presenting the next step. Not a progress bar. A progression system,
          where each level was its own moment.
        </p>
        <p className="mt-4">
          We designed per-step progression intentionally. Individual levels
          could later become multi-step sequences with their own experience
          bars, gaining XP before leveling up. For the initial
          experiment, each level was a single action, but the architecture
          supported the future depth we were planning for.
        </p>
        <p className="mt-4">
          Design and engineering partnered closely here, particularly on how
          progression state would persist across sessions, how the level-up
          moments would animate without blocking the flow, and how the system
          would scale when we expanded it.
        </p>
      </>
    ),
  },
  {
    type: "image",
    src: "/images/mweb/LevelFlow.jpg",
    alt: "Level flow diagram mapping prerequisite completion to user progression tiers",
    caption: "Each activation prerequisite maps to a progression tier, from Getting Started through Audience Builder",
  },
  {
    type: "image",
    src: "/images/mweb/Levels.jpg",
    alt: "Mobile UI showing the four-stage level-up progression system",
    caption: "The progression system as users experience it, with level-up moments after each completed step",
  },

  /* ── Execution: Email surface ── */
  {
    type: "section",
    title: "Simplifying the Email Surface",
    content: (
      <>
        <p>
          The email page was the most important surface in the experiment. The
          previous version showed a generic marketing overview with no entry
          point. I redesigned it to adapt based on where the user was in their
          journey.
        </p>
        <p className="mt-4">
          A new user sees a single clear action: create an email. After
          drafting, the page shifts to show their in-progress work with a
          prominent send button. Once they've sent, it becomes a
          performance view. The page always reflects what the user should do
          next, not everything the product can do.
        </p>
      </>
    ),
  },
  {
    type: "image",
    src: "/images/mweb/Emailpage.jpg",
    alt: "Email page showing three states: first-time visitor, after creating an email, and performance view",
    caption: "The email page adapts as users progress, from first visit through creation to performance tracking",
  },

  /* ── Execution: Contacts ── */
  {
    type: "section",
    title: "Rethinking Contacts",
    content: (
      <>
        <p>
          Adding contacts is a prerequisite for sending, but the existing flow
          treated it as a standalone feature. Users landed on a full contact
          management screen before they had any contacts to manage.
        </p>
        <p className="mt-4">
          I simplified it into a focused add-contacts flow that surfaced at the
          right moment in the progression. Users could quickly add a contact
          manually, paste a list, or pull from Google Contacts. The goal was to
          get them past the gate without it feeling like a separate task.
        </p>
      </>
    ),
  },
  {
    type: "image",
    src: "/images/mweb/ContactsPage.jpg",
    alt: "Contacts management showing list view, quick add flow, and Google import integration",
    caption: "The contacts experience: list view, quick add, and third-party import options",
  },

  /* ── Execution: Social ── */
  {
    type: "section",
    title: "Extending the Framework",
    content: (
      <>
        <p>
          We applied the same activation-first approach to other channel
          surfaces, including social. At the time of this experiment, social
          posting wasn't available on mobile web because the platform
          didn't support it yet. So the scope was intentionally limited:
          users could connect accounts and see follower counts, but
          couldn't create posts.
        </p>
        <p className="mt-4">
          Even with that constraint, the design followed the same pattern as
          email: clear primary action, relevant data, and nothing extraneous.
          The goal was to establish the surface and collect signal on engagement,
          so we could make informed decisions about what to build next.
        </p>
      </>
    ),
  },
  {
    type: "image",
    src: "/images/mweb/socialpage.jpg",
    alt: "Social media management page with follower analytics and platform breakdown",
    caption: "The social surface at launch: account connection and follower analytics, scoped to what the platform supported",
  },

  /* ── Purpose ── */
  {
    type: "section",
    title: "What This Was Really About",
    content: (
      <>
        <p>
          This project served two purposes beyond the metrics. The first was
          getting users to value faster: reaching a send-ready state
          where they experience the core product before their trial runs out.
        </p>
        <p className="mt-4">
          The second was establishing trust. Our users rely on us to handle
          the hard parts of marketing for them. This activation path was a
          first step in building that relationship: showing them we'll
          tell them exactly what to do next, celebrate their progress, and
          make sure they don't get lost along the way.
        </p>
      </>
    ),
  },

  /* ── Results ── */
  {
    type: "section",
    title: "Results",
    content: (
      <>
        <p>
          The experiment ran as an A/B test through Statsig from December 22,
          2025 to January 27, 2026. The control group (12,670 users) saw the
          original mWeb experience. The test group (12,799 users) saw the
          simplified, gamified activation path.
        </p>
        <p className="mt-4">
          Sending improved across every MEQ bucket, with the biggest gain in
          first-time senders. Second login also ticked up, suggesting users
          were coming back to continue where they left off. The experience
          didn't just push more users through the funnel; it gave them a reason
          to return.
        </p>
      </>
    ),
  },
  {
    type: "metrics",
    groups: [
      {
        title: "Email Sending",
        description:
          "The core activation behavior. The simplified experience drove a +10.6% lift in email sends, with the strongest gains in first-time senders (+12.7%) and power senders (+16.9%). Second email sends were roughly flat, suggesting the lift came from getting more users to their first send and encouraging repeat behavior.",
        metrics: [
          { value: "+10.6%", label: "Sent any email (13.9% → 15.4%)" },
          { value: "+12.7%", label: "Sent first email (8.4% → 9.4%)" },
          { value: "-1.4%", label: "Sent second email (2.8% → 2.8%)" },
          { value: "+16.9%", label: "Sent 3+ emails (2.7% → 3.2%)" },
        ],
        chart: sendingChart,
      },
      {
        title: "Funnel and Engagement",
        description:
          "Email verification saw the single largest metric improvement across all three experiments (+4.8%), and physical address completion rose +2.8%. The simplified flow reduced the steps between landing and completing these critical setup milestones. Second login also improved, a signal that users are returning to continue their progression.",
        metrics: [
          { value: "+4.8%", label: "Email verified (66.5% → 69.7%)" },
          { value: "+2.8%", label: "Physical address (66.4% → 68.2%)" },
          { value: "+1.8%", label: "Second login (45.5% → 46.3%)" },
          { value: "+0.2%", label: "Email created (30.6% → 30.6%)" },
        ],
        chart: funnelChart,
      },
      {
        title: "Revenue Impact",
        description:
          "Conversion was essentially flat (-0.3%), but test converters chose higher-tier plans, resulting in +6.7% higher ELTV ($609 vs $571). The net effect: +$6.64 in lifetime value per exposed user, translating to an estimated +$861K in annual revenue at scale.",
        metrics: [
          { value: "-0.3%", label: "T2P conversion (18.4% → 18.3%)" },
          { value: "+6.7%", label: "ELTV per converter ($571 → $609)" },
          { value: "+$861K", label: "Est. annual revenue impact" },
        ],
        chart: revenueChart,
      },
    ],
  },

  /* ── Trade-offs ── */
  {
    type: "section",
    title: "Trade-offs and Iterations",
    content: (
      <>
        <p>
          Conversion was essentially flat (-0.3%), which initially seemed
          underwhelming. But the ELTV data told a different story: test
          converters were choosing higher-tier plans at a 6.7% higher rate
          ($609 vs $571). The net revenue per exposed user was +$6.64, which
          at scale translates to the largest estimated revenue impact of all
          three experiments.
        </p>
        <p className="mt-4">
          Contact addition depth was mixed. MEQ-2 contacts improved (+7.9%),
          but MEQ-3 (3+ contacts) dropped 5.3%. The initial design surfaced a
          single "add contact" sheet that made it easy to add one or two
          contacts but didn't encourage bulk importing. We addressed this in a
          follow-up iteration with a multi-paste flow where users can copy and
          paste emails directly, and the system parses and adds them
          automatically.
        </p>
      </>
    ),
  },
  {
    type: "image",
    src: "/images/mweb/ContactsUpdate.jpg",
    alt: "Comparison of single contact add sheet versus the multi-contact paste iteration",
    caption: "Left: the initial single-contact sheet. Right: the follow-up iteration with multi-contact paste support.",
  },

  /* ── Reflection ── */
  {
    type: "section",
    title: "Reflection",
    content: (
      <>
        <p>
          Before this project, mWeb was treated as a limited version of desktop
          where most things didn't work. After it, we had evidence that
          a purpose-built mobile experience with its own sequencing and
          priorities could move activation metrics that the desktop-derived
          version never touched.
        </p>
        <p className="mt-4">
          The experiment was called a success and recommended for continued
          iteration. We used the data to prioritize the contacts multi-paste
          fix, then moved on to identifying other friction points in the
          activation flow, each one scoped as its own hypothesis and
          shipped incrementally.
        </p>
        <p className="mt-4">
          The bigger takeaway was about the framework itself. The gamified
          progression system gave us a structure we could extend: new activation
          steps, deeper multi-step levels, and eventually a foundation for how
          we onboard users across other surfaces. The architecture was designed
          for that from the start, and the results justified continuing to
          invest in it.
        </p>
        <p className="mt-4">
          If I were to keep pushing on this, the next priorities would be:
        </p>
        <ol className="list-decimal pl-5 mt-3 space-y-2">
          <li>
            Measuring long-term retention and send frequency for users who
            activated through the mWeb path, to understand whether faster
            activation translates to sustained engagement and not just
            front-loaded behavior.
          </li>
          <li>
            Expanding what users can do on mobile web (social posting,
            deeper campaign management, event creation) using the
            activation framework as the onboarding layer for each new surface.
          </li>
          <li>
            Isolating the gamification signal. The experiment proved the full
            package works, but we don't yet know how much of the lift
            comes from the progression system itself versus the structural
            simplification. Teasing those apart would tell us how much to
            invest in gamification going forward.
          </li>
          <li>
            Solving the physical address problem. The fact that physical
            address completion stayed flat despite every other prerequisite
            improving points to a deeper issue: many small businesses
            simply don't have a mailing address ready when they sign
            up. No amount of clearer UX can fix that if the information
            doesn't exist yet. A future experiment could explore
            alternatives like delayed collection, progressive
            disclosure, or letting users proceed without it and prompting
            them closer to their first send.
          </li>
        </ol>
      </>
    ),
  },
];

export default function MobileWebExperiencePage() {
  return (
    <CaseStudyLayout
      title="Mobile Web Activation Experience"
      subtitle="PLG Growth Experiment | A/B Test | Dec 22, 2025 – Jan 27, 2026"
      role={role}
      team={team}
      tools={tools}
      heroVideoSrc="/animations/mweb-experience.mp4"
      blocks={blocks}
    />
  );
}

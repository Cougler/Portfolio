import type { Metadata } from "next";
import CaseStudyLayout from "@/components/CaseStudyLayout";
import type { ContentBlock, MetricGroupChart } from "@/components/CaseStudyLayout";
import type { TimeSeriesPoint } from "@/components/MetricChart";

export const metadata: Metadata = {
  title: "Mobile Web Experience – Aaron Cougle",
  description:
    "+69% increase in first email sends by streamlining mobile web activation flows.",
};

const role = ["Product Design", "UX Strategy", "Interaction Design"];
const team = ["PLG growth", "Experimentation"];
const tools = ["Figma", "Notion", "Statsig", "Cursor", "Snowflake MCP"];

/*
 * Real weekly cohort data from the mobile trial funnel.
 * 2024-25 = prior year baseline (Oct 2024 – Feb 2025)
 * 2025-26 = experiment period  (Oct 2025 – Feb 2026)
 * X-axis labels use relative week numbers so both years overlay cleanly.
 * The experiment launched around week of Dec 1, 2025 (week index ~8).
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

/* ── Sending: S1 (sent 1+ emails, 14D) ── */
const sendingChart: MetricGroupChart = {
  data: makeData({
    s1Current: [
      //Oct 6  Oct 13  Oct 20  Oct 27  Nov 3  Nov 10  Nov 17  Nov 24  Dec 1  Dec 8  Dec 15  Dec 22  Jan 5  Jan 12  Jan 19  Jan 26  Feb 2  Feb 9
        2.0,    2.0,    2.0,    2.5,    3.0,   3.0,    3.0,    3.0,   3.0,   3.5,    3.5,    4.0,   5.0,   5.5,    6.0,    5.5,   5.0,   5.0,
    ],
    s1Prior: [
      //Oct 7  Oct 14  Oct 21  Oct 28  Nov 4  Nov 11  Nov 18  Nov 25  Dec 2  Dec 9  Dec 16  Dec 23  Jan 6  Jan 13  Jan 20  Jan 27  Feb 3  Feb 10
        2.0,    2.0,    2.0,    1.5,    2.0,   1.8,    2.0,    2.0,   2.0,   2.0,    2.0,    2.5,   2.0,   2.0,    2.5,    2.0,   2.0,   2.0,
    ],
    trials: [
      3000, 2900, 3200, 4000, 4200, 4500, 4800, 5000, 3700, 4500, 5000, 5500, 6000, 6200, 6500, 6800, 7000, 6500,
    ],
  }),
  series: [
    { key: "s1Current", label: "2025-26 Sent 1+", color: "#4f46e5" },
    { key: "s1Prior",   label: "2024-25 Sent 1+", color: "#4f46e5", style: "dashed" },
    { key: "trials",    label: "Trials (2025-26)", color: "#9ca3af", yAxis: "right", areaFill: true },
  ],
  leftAxisUnit: "%",
  rightAxisLabel: "Trials",
};

/* ── Prerequisites: Email Verified + Physical Address (14D) ── */
const prerequisitesChart: MetricGroupChart = {
  data: makeData({
    evCurrent: [
      //Oct 6  Oct 13  Oct 20  Oct 27  Nov 3  Nov 10  Nov 17  Nov 24  Dec 1  Dec 8  Dec 15  Dec 22  Jan 5  Jan 12  Jan 19  Jan 26  Feb 2  Feb 9
        28,     28,     28,     30,     32,    35,     35,     38,     32,    32,     35,     35,     37,    38,     40,     40,     42,    40,
    ],
    evPrior: [
      //Oct 7  Oct 14  Oct 21  Oct 28  Nov 4  Nov 11  Nov 18  Nov 25  Dec 2  Dec 9  Dec 16  Dec 23  Jan 6  Jan 13  Jan 20  Jan 27  Feb 3  Feb 10
        28,     28,     28,     30,     30,    30,     30,     28,     28,    30,     30,     28,     30,    30,     32,     32,     30,    32,
    ],
    paCurrent: [
      12, 10, 15, 25, 35, 50, 55, 60, 55, 55, 55, 55, 52, 50, 48, 48, 45, 45,
    ],
    paPrior: [
      4.0, 4.0, 4.0, 5.0, 5.0, 5.5, 5.5, 6.0, 6.0, 6.5, 6.5, 7.0, 7.0, 7.0, 7.5, 7.0, 6.5, 6.5,
    ],
    trials: [
      3000, 2900, 3200, 4000, 4200, 4500, 4800, 5000, 3700, 4500, 5000, 5500, 6000, 6200, 6500, 6800, 7000, 6500,
    ],
  }),
  series: [
    { key: "evCurrent", label: "2025-26 Email Verified",     color: "#4f46e5" },
    { key: "evPrior",   label: "2024-25 Email Verified",     color: "#4f46e5", style: "dashed" },
    { key: "paCurrent", label: "2025-26 Physical Address",   color: "#06b6d4" },
    { key: "paPrior",   label: "2024-25 Physical Address",   color: "#06b6d4", style: "dashed" },
    { key: "trials",    label: "Trials (2025-26)",           color: "#9ca3af", yAxis: "right", areaFill: true },
  ],
  leftAxisUnit: "%",
  rightAxisLabel: "Trials",
};

/* ── Email Creation: EC1 + EC2 (14D) ── */
const creationChart: MetricGroupChart = {
  data: makeData({
    ec1Current: [
      //Oct 6  Oct 13  Oct 20  Oct 27  Nov 3  Nov 10  Nov 17  Nov 24  Dec 1  Dec 8  Dec 15  Dec 22  Jan 5  Jan 12  Jan 19  Jan 26  Feb 2  Feb 9
        6,      9.8,    8,      8,      10,    10,     10,     10,     10,    11,     11,     12,     14,    15,     14,     13,     12,    12,
    ],
    ec1Prior: [
      //Oct 7  Oct 14  Oct 21  Oct 28  Nov 4  Nov 11  Nov 18  Nov 25  Dec 2  Dec 9  Dec 16  Dec 23  Jan 6  Jan 13  Jan 20  Jan 27  Feb 3  Feb 10
        7,      8,      10,     8,      7,     8,      9,      8,      7,     8,      9,      8,      12,    14,     15,     14,     16,    14,
    ],
    ec2Current: [
      2, 2, 2, 2.5, 2.5, 3, 3, 3, 3, 3.5, 3.5, 4, 5.5, 6, 7, 6, 5.5, 5,
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

const blocks: ContentBlock[] = [
  /* ── Situation ── */
  {
    type: "section",
    title: "Overview",
    content: (
      <>
        <p>
          A large share of trial users first interact with Constant Contact on
          mobile web. But the existing mWeb experience wasn&rsquo;t designed for
          activation. Many core workflows either didn&rsquo;t exist on mobile web
          or were buried behind desktop-oriented interfaces that weren&rsquo;t
          usable on a small screen. Users couldn&rsquo;t complete key actions
          like creating an email, managing contacts, or connecting social
          accounts without hitting dead ends or being redirected to desktop.
        </p>
        <p className="mt-4">
          This was a zero-to-one effort. We weren&rsquo;t optimizing an existing
          mobile flow. We were designing and building a complete activation
          experience for mobile web from scratch, then running it as an
          experiment to measure how users interacted with it.
        </p>
        <div className="mt-6 grid grid-cols-3 gap-2">
          {[
            { value: "+69%", label: "First email sends" },
            { value: "+77%", label: "Second email sends" },
            { value: "+83%", label: "Third email sends" },
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

  /* ── Tension ── */
  {
    type: "section",
    title: "The Problem",
    content: (
      <>
        <p>
          On desktop, sending an email requires completing email verification,
          adding a physical address, creating a campaign, adding contacts, and
          navigating to the send flow. On mobile web, several of these steps
          simply weren&rsquo;t possible. Users would start the activation path
          and hit a wall where the functionality didn&rsquo;t exist yet.
        </p>
        <p className="mt-4">
          For the steps that were technically available, there was no clear
          sequencing. Users didn&rsquo;t know what was required, what order to
          do it in, or how close they were to being able to send. The core issue
          was that mobile web had no structured activation path at all.
        </p>
        <p className="mt-4">
          This work was sponsored by the Chief Growth Officer and sat within our
          PLG growth pod focused on trial-to-activation conversion.
        </p>
      </>
    ),
  },

  /* ── Approach: Progression system ── */
  {
    type: "section",
    title: "Designing the Activation Path",
    content: (
      <>
        <p>
          The first design decision was to give users a visible model of
          progress. I mapped every prerequisite (email verification, physical
          address, contacts, email creation) to a tiered progression system. Each
          completed step moved the user to a new level, and each level unlocked
          the next meaningful action.
        </p>
        <p className="mt-4">
          This did two things. It gave users a reason to complete setup steps
          they would otherwise skip, and it gave us a framework to sequence the
          experience around activation rather than feature discovery.
        </p>
      </>
    ),
  },
  {
    type: "image",
    src: "/images/mweb/LevelFlow.jpg",
    alt: "Level flow diagram mapping prerequisite completion to user progression tiers",
    caption: "How each prerequisite maps to a progression tier, from Getting Started through Audience Builder",
  },
  {
    type: "image",
    src: "/images/mweb/Levels.jpg",
    alt: "Mobile UI showing the four-stage level-up progression system",
    caption: "The progression system as users experience it on mobile, with level-up moments reinforcing each completed step",
  },

  /* ── Approach: Email surface ── */
  {
    type: "section",
    title: "Simplifying the Email Surface",
    content: (
      <>
        <p>
          The email page was the most important surface in the experiment. For
          first-time visitors, the previous version showed a generic marketing
          overview with no clear entry point. I redesigned it to adapt based on
          where the user was in their activation journey.
        </p>
        <p className="mt-4">
          A first-time visitor sees a single clear action: send an email. After
          creating a draft, the page shifts to show their in-progress work with
          a prominent send button. Once they&rsquo;ve sent, it becomes a
          performance dashboard. The page always reflects what the user should do
          next rather than everything the product can do.
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

  /* ── Approach: Contacts ── */
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
          I simplified this into a focused add-contacts flow that surfaced at the
          right moment in the progression. Users could quickly add contacts
          manually, paste a list, or connect a third-party source like Google
          Contacts. The goal was to get users past this gate without making it
          feel like a separate task.
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

  /* ── Approach: Social ── */
  {
    type: "section",
    title: "Extending the Framework",
    content: (
      <>
        <p>
          We applied the same activation-first approach to other channel
          surfaces, including social. At the time of this experiment, social
          posting wasn&rsquo;t available on mobile web. The platform
          didn&rsquo;t support it yet. So the scope for this surface was
          intentionally limited: users could connect their social accounts and
          see follower counts by platform, but they couldn&rsquo;t create or
          publish posts.
        </p>
        <p className="mt-4">
          Even with that constraint, the design followed the same pattern as
          email: clear primary action, relevant data, and no feature clutter.
          The goal was to establish the surface and start collecting signal on
          how users engaged with it, so we could make informed decisions about
          what to build next.
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

  /* ── Evidence ── */
  {
    type: "section",
    title: "Results",
    content: (
      <>
        <p>
          The experiment ran for three weeks across 10,610 mobile web accounts
          (direct traffic only, 14-day activity window, holiday period excluded).
          Statistical analysis included two-proportion z-tests, t-tests, and
          Bayesian methods. All primary metrics reached strong statistical
          significance.
        </p>
        <p className="mt-4">
          The charts below overlay the same Oct-to-Feb window from both years.
          Dashed lines show the prior year baseline (2024-25). Solid lines show
          the experiment period (2025-26). The divergence starting around
          December is where the redesigned experience went live.
        </p>
        <p className="mt-4 font-semibold text-foreground">
          The results validated the hypothesis that reducing cognitive overhead
          on mobile web would directly improve activation.
        </p>
      </>
    ),
  },
  {
    type: "metrics",
    groups: [
      {
        title: "Email Sending Participation",
        description:
          "Sending is the core activation behavior. The prior year held flat at ~2% while the experiment period climbed to 5-6%, a sustained lift that appeared immediately after launch.",
        metrics: [
          { value: "+69.3%", label: "Accounts sending 1+ emails" },
          { value: "+76.5%", label: "Accounts sending 2+ emails" },
          { value: "+83.4%", label: "Accounts sending 3+ emails" },
        ],
        chart: sendingChart,
      },
      {
        title: "Activation Prerequisites",
        description:
          "Both are required before sending. Physical address completion jumped from ~7% (prior year) to ~45-55%, and email verification rose from ~30% to ~40%. These gains directly enabled the send lifts.",
        metrics: [
          { value: "+11.7%", label: "Email verification" },
          { value: "+5.4%", label: "Physical address completion" },
        ],
        chart: prerequisitesChart,
      },
      {
        title: "Email Creation Depth",
        description:
          "Both years show a similar upward trend in single-email creation, but multi-email creation (2+) diverged sharply in the experiment period, rising from ~2-3% to 5-7%.",
        metrics: [
          { value: "+8.9%", label: "1+ emails created" },
          { value: "+25.3%", label: "2+ emails created" },
          { value: "+35.7%", label: "3+ emails created" },
        ],
        chart: creationChart,
      },
    ],
  },

  /* ── Reflection ── */
  {
    type: "section",
    title: "Trade-offs and Iterations",
    content: (
      <>
        <p>
          Trial-to-paid conversion remained neutral, which confirmed there was no
          monetization risk.
        </p>
        <p className="mt-4">
          The one metric that moved in the wrong direction was contact addition
          depth at 3+ contacts. The initial design surfaced a single-contact add
          sheet, which made it easy to add one contact but harder to add several
          at once. The previous bulk-add pattern let users reach 3+ contacts in a
          single action.
        </p>
        <p className="mt-4">
          We addressed this in a follow-up iteration by introducing a
          multi-contact paste flow alongside the single-add option. This
          preserved the simplicity of the initial experience while recovering the
          depth that bulk-add had provided.
        </p>
      </>
    ),
  },
  {
    type: "image",
    src: "/images/mweb/ContactsUpdate.jpg",
    alt: "Comparison of single contact add sheet versus the multi-contact iteration",
    caption: "Left: the initial single-contact sheet. Right: the follow-up iteration with multi-contact paste support.",
  },
  {
    type: "section",
    title: "Reflection",
    content: (
      <>
        <p>
          This experiment changed how the team thought about mobile web. Before
          this work, mWeb was treated as a limited version of desktop where most
          things didn&rsquo;t work. After it, we had evidence that a
          purpose-built mobile experience with its own sequencing and priorities
          could outperform the desktop-derived version on every activation
          metric.
        </p>
        <p className="mt-4">
          The experiment was recommended for full rollout and influenced broader
          product strategy toward lower cognitive overhead experiences across
          other constrained surfaces.
        </p>
        <p className="mt-4">
          The natural next step is expanding what users can actually do on mobile
          web. This experiment proved the activation framework works. Now the
          opportunity is to make the feature set more robust so that mWeb becomes
          a surface where users can complete more of their core workflows: social
          posting, event creation, and deeper campaign management. The data from
          this experiment gives us a baseline to measure each of those additions
          against.
        </p>
        <p className="mt-4">
          Beyond feature expansion, I would focus on:
        </p>
        <ol className="list-decimal pl-5 mt-3 space-y-2">
          <li>
            Measuring long-term retention and send frequency for users who
            activated through the simplified mWeb path, to understand whether
            faster activation translates to sustained engagement.
          </li>
          <li>
            Applying the progression framework to other constrained surfaces like
            the native app onboarding, where similar sequencing problems exist.
          </li>
          <li>
            Testing whether the level-up system itself drives behavior or whether
            the structural simplification alone accounts for the lift. Isolating
            that signal would inform how we invest in gamification going forward.
          </li>
        </ol>
      </>
    ),
  },
];

export default function MobileWebExperiencePage() {
  return (
    <CaseStudyLayout
      title="Simplified Mobile Web Experience"
      subtitle="PLG Growth Experiment | Dec 2025 – Jan 2026"
      role={role}
      team={team}
      tools={tools}
      heroVideoSrc="/animations/mweb-experience.mp4"
      blocks={blocks}
    />
  );
}

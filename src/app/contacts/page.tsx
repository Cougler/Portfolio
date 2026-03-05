import type { Metadata } from "next";
import CaseStudyLayout from "@/components/CaseStudyLayout";
import type { ContentBlock, MetricGroupChart } from "@/components/CaseStudyLayout";
import type { TimeSeriesPoint } from "@/components/MetricChart";

export const metadata: Metadata = {
  title: "Contacts Upload Experience – Aaron Cougle",
  description:
    "+11.9% lift in file upload adoption by reducing friction in high intent workflow.",
};

/*
 * Weekly cohort data from the contacts upload funnel.
 * 2024-25 = prior year baseline (Oct 2024 – Feb 2025)
 * 2025-26 = experiment period  (Oct 2025 – Feb 2026)
 * Experiment launched Nov 19, 2025 (Nov W3). Divergence begins there.
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

/* ── File Upload Adoption Rate (%) ── */
const uploadAdoptionChart: MetricGroupChart = {
  data: makeData({
    uploadCurrent: [
      //Oct W1  W2    W3    W4    Nov W1  W2    W3    W4    Dec W1  W2    W3    W4    Jan W1  W2    W3    W4    Feb W1  W2
        26.2, 27.0, 26.5, 27.2, 27.3, 27.8, 29.2, 30.5, 30.8, 31.2, 31.0, 30.5, 31.1, 30.8, 30.5, 30.2, 30.0, 29.8,
    ],
    uploadPrior: [
      //Oct W1  W2    W3    W4    Nov W1  W2    W3    W4    Dec W1  W2    W3    W4    Jan W1  W2    W3    W4    Feb W1  W2
        26.2, 27.0, 26.5, 27.1, 27.3, 28.1, 27.2, 27.5, 26.8, 27.2, 28.0, 26.5, 27.8, 27.2, 28.1, 27.8, 27.2, 27.4,
    ],
    accounts: [
      800, 780, 820, 900, 950, 1000, 1050, 1100, 850, 1000, 1100, 1200, 1300, 1350, 1400, 1450, 1500, 1400,
    ],
  }),
  series: [
    { key: "uploadCurrent", label: "2025-26 Upload Adoption", color: "#4f46e5" },
    { key: "uploadPrior",   label: "2024-25 Upload Adoption", color: "#4f46e5", style: "dashed" },
    { key: "accounts",      label: "Accounts in Flow",        color: "#9ca3af", yAxis: "right", areaFill: true },
  ],
  leftAxisUnit: "%",
  rightAxisLabel: "Accounts",
};

/* ── Contacts Per Account ── */
const contactsDepthChart: MetricGroupChart = {
  data: makeData({
    contactsCurrent: [
      //Oct W1  W2   W3   W4   Nov W1  W2   W3   W4   Dec W1  W2   W3   W4   Jan W1  W2   W3   W4   Feb W1  W2
        140, 142, 141, 143, 142, 144, 148, 152, 153, 155, 154, 152, 155, 154, 153, 152, 151, 150,
    ],
    contactsPrior: [
      //Oct W1  W2   W3   W4   Nov W1  W2   W3   W4   Dec W1  W2   W3   W4   Jan W1  W2   W3   W4   Feb W1  W2
        140, 142, 141, 143, 142, 144, 141, 143, 140, 143, 144, 141, 143, 143, 145, 142, 141, 143,
    ],
    accounts: [
      800, 780, 820, 900, 950, 1000, 1050, 1100, 850, 1000, 1100, 1200, 1300, 1350, 1400, 1450, 1500, 1400,
    ],
  }),
  series: [
    { key: "contactsCurrent", label: "2025-26 Contacts / Account", color: "#06b6d4" },
    { key: "contactsPrior",   label: "2024-25 Contacts / Account", color: "#06b6d4", style: "dashed" },
    { key: "accounts",        label: "Accounts in Flow",           color: "#9ca3af", yAxis: "right", areaFill: true },
  ],
  rightAxisLabel: "Accounts",
};

const role = ["Product Design", "UX Strategy", "Interaction Design"];
const team = ["PLG growth", "Experimentation"];
const tools = ["Figma", "Notion", "Statsig", "Cursor", "Snowflake MCP"];

const blocks: ContentBlock[] = [
  {
    type: "section",
    title: "Overview",
    content: (
      <>
        <p>
          File upload is a high-intent moment. When someone uploads a CSV,
          they&rsquo;re actively trying to grow their list — not exploring the
          product, not evaluating a feature. They&rsquo;ve already decided.
          About 24,000 accounts per month reach this flow, and the drop-off at
          every stage was significant enough that fixing it was worth treating
          as a standalone experiment.
        </p>
        <p className="mt-4">
          I led the redesign as the design lead embedded in a PLG growth pod,
          working directly with two PMs and four engineers. The goal wasn&rsquo;t
          to rebuild the upload flow — it was to remove the friction that was
          stopping people from finishing it.
        </p>
        <div className="mt-6 grid grid-cols-3 gap-2">
          {[
            { value: "+11.9%", label: "File upload adoption" },
            { value: "+8.6%", label: "Contacts uploaded" },
            { value: "+7.9%", label: "Contacts per account" },
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
          Analytics showed drop-off at every stage of the flow, but the most
          damaging issue wasn&rsquo;t a broken step — it was a false signal. After
          selecting a file, a green checkmark appeared on screen. To users, that
          looked like confirmation that the upload was complete. Many closed the
          browser and moved on, never knowing they still had mapping and consent
          steps ahead of them. The flow had an invisible exit built into it.
        </p>
        <p className="mt-4">
          Beyond the false completion signal, the mapping interface was visually
          noisy and hard to parse. Help content was scattered across the UI
          rather than surfaced where it was needed. The consent step appeared as
          a blocking interruption that broke the forward momentum users had
          built. And when uploads failed, the error states were silent — no
          explanation, no recovery path. Each issue was individually minor. Together,
          they made completing the flow feel like work.
        </p>
      </>
    ),
  },
  {
    type: "section",
    title: "Redesigning the Upload Flow",
    content: (
      <>
        <p>
          The redesign didn&rsquo;t touch the underlying architecture. Every change
          was aimed at reducing friction within the existing system. I removed
          the false completion signal and replaced it with progressive disclosure
          language that made the next step explicit. Primary actions after file
          selection were made more visually prominent so there was no ambiguity
          about where to go. The field mapping interface was simplified — less
          visual noise, clearer column relationships. Scattered help documentation
          was pulled out and replaced with contextual inline guidance at the
          moments users actually needed it. Consent was converted from a blocking
          step to an inline modal so it didn&rsquo;t interrupt the flow. And error
          states were rewritten to explain what went wrong and give users a
          clear path to recover.
        </p>
        <p className="mt-4">
          None of these were large surface changes. The bet was that the
          cumulative effect of removing small friction at every step would
          meaningfully improve completion — and that the false completion signal
          alone was doing enough damage to move the primary metric on its own.
        </p>
      </>
    ),
  },
  {
    type: "imageRow",
    images: [
      {
        src: "/images/contactsupload/Original%20screen%20-%20before%20upload.jpg",
        alt: "Original upload screen showing the false completion signal after file selection",
      },
      {
        src: "/images/contactsupload/New%20screen%20-%20before%20upload.jpg",
        alt: "Redesigned upload screen with clear next step and prominent primary action",
      },
    ],
    caption: "Before and after: the upload initiation step. The original green checkmark signaled completion; the redesign makes the next step explicit.",
  },
  {
    type: "imageRow",
    images: [
      {
        src: "/images/contactsupload/Original%20screen%20-%20mapping%20page.jpg",
        alt: "Original field mapping interface with visual noise and scattered help content",
      },
      {
        src: "/images/contactsupload/new%20screen%20-%20mapping%20page.jpg",
        alt: "Redesigned field mapping interface with simplified layout and inline contextual guidance",
      },
    ],
    caption: "Before and after: the field mapping step. Reduced visual noise and inline guidance replace the original scattered help content.",
  },
  {
    type: "imageRow",
    images: [
      {
        src: "/images/contactsupload/Original%20screen%20-%20after%20upload.jpg",
        alt: "Original post-upload confirmation screen",
      },
      {
        src: "/images/contactsupload/New%20screen%20-%20after%20upload.jpg",
        alt: "Redesigned post-upload confirmation screen with clear success state and next steps",
      },
    ],
    caption: "Before and after: post-upload confirmation. The redesign gives users a clear success state and a forward path.",
  },
  {
    type: "section",
    title: "Results",
    content: (
      <>
        <p>
          The experiment ran on direct traffic only, with spam and
          reporting-excluded accounts filtered out, leaving 3,565 accounts in
          the analysis. It ran for 2.5 weeks and reached statistical significance
          at week two. We rolled out to 100%.
        </p>
        <p className="mt-4">
          The charts below overlay the same Oct-to-Feb window from both years.
          Dashed lines show the prior year baseline (2024-25). Solid lines show
          the experiment period (2025-26). The divergence starting around
          Nov W3 is where the redesigned flow went live.
        </p>
        <p className="mt-4 font-semibold" style={{ color: "var(--v2-text)" }}>
          Every primary metric moved in the right direction.
        </p>
      </>
    ),
  },
  {
    type: "metrics",
    groups: [
      {
        title: "File Upload Adoption",
        description:
          "The prior year held flat at ~27% throughout Oct–Feb. The experiment period tracked identically through Nov W2, then diverged immediately at launch — reaching 30-31% and sustaining it across the full measurement window.",
        metrics: [
          { value: "+11.9%", label: "Accounts using file upload" },
          { value: "+8.6%",  label: "Total contacts uploaded" },
        ],
        chart: uploadAdoptionChart,
      },
      {
        title: "Upload Depth",
        description:
          "Accounts that completed the redesigned flow uploaded more contacts. The prior year held steady at ~142 contacts per account. Post-experiment, the average climbed to ~152–155 — a consistent lift that held across the full period.",
        metrics: [
          { value: "+7.9%", label: "Average contacts per account" },
        ],
        chart: contactsDepthChart,
      },
    ],
  },
  {
    type: "section",
    title: "Reflection",
    content: (
      <>
        <p>
          False completion signals are a specific category of UX problem worth
          naming. They don&rsquo;t generate support tickets. Users don&rsquo;t
          report them as bugs. They just leave — convinced they finished
          something they didn&rsquo;t. That invisibility is what makes them
          damaging. You can&rsquo;t see the exit in the data because it looks
          like a successful session.
        </p>
        <p className="mt-4">
          After this experiment, the team started applying a friction-reduction
          lens more deliberately across other complex workflows in the product.
          The upload flow was a clear enough case that it became a useful
          reference point — not because the changes were novel, but because the
          results made the underlying principle legible to the broader
          organization.
        </p>
      </>
    ),
  },
];

export default function ContactsPage() {
  return (
    <CaseStudyLayout
      title="Contacts Upload Experience"
      subtitle="Improving the contacts upload experience for trial users"
      role={role}
      team={team}
      tools={tools}
      heroVideoSrc="/animations/contacts-upload.mp4"
      blocks={blocks}
    />
  );
}

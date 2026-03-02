import type { Metadata } from "next";
import CaseStudyLayout from "@/components/CaseStudyLayout";
import type { ContentBlock } from "@/components/CaseStudyLayout";

export const metadata: Metadata = {
  title: "Contacts Upload Experience – Aaron Cougle",
  description:
    "+11.9% lift in file upload adoption by reducing friction in high intent workflow.",
};

const role = ["Product Design", "UX Strategy", "Interaction Design"];
const team = ["PLG growth", "Experimentation"];
const tools = ["Figma", "Notion", "Statsig", "Cursor", "Snowflake MCP"];

const blocks: ContentBlock[] = [
  {
    type: "section",
    title: "Context",
    content: (
      <>
        <p>
          Within our PLG growth initiative, the team was tasked with identifying
          choke points across the product and systematically improving them
          through experimentation. One of those choke points was file-based
          contact upload.
        </p>
        <p className="mt-4">
          File upload was not tied directly to activation, but it was a core
          behavior for active users attempting to grow their lists. Uploading a
          CSV is a common real-world workflow. However, users were dropping off
          at every stage of the flow.
        </p>
        <p className="mt-4">
          The opportunity was clear: reduce friction in a high-intent moment to
          improve completion and list growth.
        </p>
        <div className="mt-6 grid grid-cols-3 gap-2">
          {[
            { value: "+11.9%", label: "File upload adoption" },
            { value: "+8.6%", label: "Contacts uploaded" },
            { value: "+7.9%", label: "Contacts per account" },
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
  {
    type: "section",
    title: "What We Changed and Why It Mattered",
    content: (
      <>
        <p>
          I led a friction-reduction redesign of the file upload flow, focusing
          on clarity, continuity, and forward movement. The goal was not to add
          features, but to remove cognitive overhead in a high-intent workflow.
        </p>
        <p className="mt-4">
          We eliminated misleading completion signals, simplified the mapping
          interface, consolidated help content into contextual guidance, improved
          error states, and converted consent into an inline interaction to
          preserve momentum. Each change was designed to make the system state
          obvious and the next action unmistakable.
        </p>
        <p className="mt-4">
          The result was a statistically significant +11.9% lift in file upload
          adoption, +8.6% increase in total contacts uploaded, and +7.9%
          increase in contacts per account. The experiment reached significance
          in two weeks and was rolled out to 100%.
        </p>
      </>
    ),
  },
  {
    type: "section",
    title: "Framing the Problem",
    content: (
      <>
        <p>
          Through in-app analytics and coordinated user testing, we observed:
        </p>
        <ul className="list-disc pl-5 mt-3 space-y-1">
          <li>Significant drop-off across all upload steps</li>
          <li>Confusion in the mapping interface</li>
          <li>Misleading completion signals</li>
          <li>Interruptive consent patterns</li>
          <li>Weak forward-movement cues</li>
        </ul>
        <p className="mt-4">
          The most damaging issue was a false completion signal. A green
          checkmark appeared after file selection, leading users to believe the
          task was complete. Many exited prematurely.
        </p>
        <p className="mt-4">
          The flow lacked clarity, continuity, and strong next-step signaling.
          Users were forced to interpret system state instead of being guided
          through it. This was not a single broken step. It was cumulative
          cognitive overhead.
        </p>
      </>
    ),
  },
  {
    type: "section",
    title: "Hypothesis",
    content: (
      <>
        <p>
          If we simplified the workflow, reduced cognitive load, and strengthened
          forward movement cues, we would:
        </p>
        <ul className="list-disc pl-5 mt-3 space-y-1">
          <li>Increase file upload completion</li>
          <li>Increase contact volume per account</li>
          <li>Improve downstream send behavior</li>
        </ul>
        <p className="mt-4">
          The growth team formed the original hypothesis. I contributed to
          shaping the UX direction and validating that our metric definitions
          accurately reflected user behavior.
        </p>
      </>
    ),
  },
  {
    type: "section",
    title: "My Role",
    content: (
      <ul className="list-disc pl-5 space-y-1">
        <li>Design lead embedded within a dedicated growth pod</li>
        <li>Partnered directly with 2 PMs and 4 engineers</li>
        <li>Contributed to hypothesis refinement</li>
        <li>Pressed on metric validation and statistical confidence</li>
        <li>Led UX strategy and execution within the RISE design system</li>
      </ul>
    ),
  },
  {
    type: "section",
    title: "Design Strategy",
    content: (
      <>
        <p>
          Rather than redesigning the entire architecture, we focused on
          friction reduction within the existing system.
        </p>
        <ul className="list-disc pl-5 mt-4 space-y-3">
          <li>
            <strong>Removed False Completion Signals</strong> &mdash; Replaced
            the misleading checkmark with progressive disclosure language that
            clearly indicated the next step.
          </li>
          <li>
            <strong>Strengthened Forward Movement</strong> &mdash; Improved
            visibility of primary actions after file upload to eliminate
            ambiguity about what to do next.
          </li>
          <li>
            <strong>Simplified Field Mapping</strong> &mdash; Reduced visual
            noise and improved clarity of column mapping to lower cognitive
            overhead.
          </li>
          <li>
            <strong>Consolidated Help Resources</strong> &mdash; Removed
            scattered documentation and embedded contextual guidance inline.
          </li>
          <li>
            <strong>Converted Consent to Inline Modal</strong> &mdash; Reduced
            flow interruption by handling consent within context rather than as a
            blocking step.
          </li>
        </ul>
        <p className="mt-4">
          We also improved error states to clearly explain failed uploads and
          prevent silent friction.
        </p>
      </>
    ),
  },
  {
    type: "section",
    title: "Experiment Design",
    content: (
      <>
        <ul className="list-disc pl-5 space-y-1">
          <li>Direct traffic only</li>
          <li>Excluded spam and reporting-excluded accounts</li>
          <li>3,565 accounts analyzed</li>
          <li>Experiment ran 2.5 weeks</li>
          <li>Statistical significance reached around week 2</li>
        </ul>
        <p className="mt-4">Primary KPIs:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>% Accounts Using File Upload</li>
          <li>Total Contacts Uploaded via File</li>
          <li>Avg Contacts per Account</li>
        </ul>
        <p className="mt-3 text-[13px] text-muted">
          All measured at the account level and attributed post-exposure.
        </p>
      </>
    ),
  },
  {
    type: "metrics",
    groups: [
      {
        title: "Results",
        metrics: [
          { value: "+11.9%", label: "Accounts using file upload" },
          { value: "+8.6%", label: "Total contacts uploaded" },
          { value: "+7.9%", label: "Average contacts per account" },
        ],
      },
    ],
  },
  {
    type: "section",
    title: "Organizational Impact",
    content: (
      <>
        <p>
          This experiment reinforced a broader principle that lower cognitive
          overhead improves completion in complex workflows. Historically, our
          product tolerated heavier, more fragmented flows.
        </p>
        <p className="mt-4">
          Following this experiment&rsquo;s success, we began adopting a more
          intentional, friction-reduction lens across other areas of the product.
          The roadmap adjusted accordingly once signal was confirmed.
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

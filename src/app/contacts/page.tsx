import type { Metadata } from "next";
import CaseStudyLayout from "@/components/CaseStudyLayout";
import type { ContentBlock, MetricGroupChart } from "@/components/CaseStudyLayout";

export const metadata: Metadata = {
  title: "Contacts Upload Experience – Aaron Cougle",
  description:
    "+3.0% lift in deep contact uploads and +3.0% T2P conversion by reducing friction in the file upload flow.",
};

/*
 * A/B test: add_contacts_from_file_updated_experience (Statsig)
 * Experiment dates: Dec 16, 2025 – Jan 27, 2026
 * Control: 2,201 users | Test: 2,261 users
 * Note: exposed population is users who reached the contact file upload step
 */

const role = ["Product Design", "UX Strategy", "Interaction Design"];
const team = ["PLG growth", "Experimentation"];
const tools = ["Figma", "Notion", "Statsig", "Cursor", "Snowflake MCP"];

const contactDepthChart: MetricGroupChart = {
  data: [
    { date: "Control", values: { contactsMEQ3: 82.60, contactsMEQ1: 4.77, contactsMEQ2: 1.41 } },
    { date: "Test", values: { contactsMEQ3: 85.05, contactsMEQ1: 4.20, contactsMEQ2: 0.80 } },
  ],
  series: [
    { key: "contactsMEQ3", label: "Contacts 3+",         color: "#4f46e5" },
    { key: "contactsMEQ1", label: "Contacts exactly 1",  color: "#06b6d4" },
    { key: "contactsMEQ2", label: "Contacts exactly 2",  color: "#8b5cf6" },
  ],
  leftAxisUnit: "%",
  chartType: "bar",
};

const downstreamChart: MetricGroupChart = {
  data: [
    { date: "Control", values: { sentAny: 56.61, sentMEQ3: 17.36, emailCreated: 77.60, secondLogin: 82.78 } },
    { date: "Test", values: { sentAny: 57.98, sentMEQ3: 17.74, emailCreated: 77.62, secondLogin: 83.24 } },
  ],
  series: [
    { key: "secondLogin",  label: "Second login",   color: "#4f46e5" },
    { key: "emailCreated", label: "Email created",  color: "#06b6d4" },
    { key: "sentAny",      label: "Sent any email",  color: "#8b5cf6" },
    { key: "sentMEQ3",     label: "Sent 3+",         color: "#f59e0b" },
  ],
  leftAxisUnit: "%",
  chartType: "bar",
};

const conversionChart: MetricGroupChart = {
  data: [
    { date: "Control", values: { t2p: 48.80, eltvPerConverter: 785 } },
    { date: "Test", values: { t2p: 50.24, eltvPerConverter: 759 } },
  ],
  series: [
    { key: "t2p",              label: "T2P conversion",       color: "#4f46e5" },
    { key: "eltvPerConverter", label: "ELTV 12-mo per converter", color: "#06b6d4", yAxis: "right" },
  ],
  leftAxisUnit: "%",
  rightAxisUnit: "",
  rightAxisLabel: "ELTV ($)",
  chartType: "bar",
};

const blocks: ContentBlock[] = [
  {
    type: "section",
    title: "Overview",
    content: (
      <>
        <p>
          The contact file upload flow had significant drop-off at every stage,
          driven by a false completion signal, noisy mapping UI, and a blocking
          consent step. I redesigned the flow to eliminate those friction points
          without touching the underlying architecture. We A/B tested it across
          4,462 users. The results showed the clearest cause-and-effect chain of
          all three experiments: better contact upload (+3.0% deep contacts) led
          to more sends (+2.4%) and more conversions (+3.0% T2P), translating to
          an estimated +$215K in annual revenue.
        </p>
        <div className="mt-6 grid grid-cols-3 gap-2">
          {[
            { value: "+3.0%", label: "Deep contacts (3+)" },
            { value: "+3.0%", label: "Trial-to-paid conversion" },
            { value: "+$215K", label: "Est. annual revenue" },
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
  {
    type: "section",
    title: "The Problem",
    content: (
      <>
        <p>
          Analytics showed drop-off at every stage of the flow, but the most
          damaging issue wasn't a broken step — it was a false signal. After
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
          The redesign didn't touch the underlying architecture. Every change
          was aimed at reducing friction within the existing system. I removed
          the false completion signal and replaced it with progressive disclosure
          language that made the next step explicit. Primary actions after file
          selection were made more visually prominent so there was no ambiguity
          about where to go. The field mapping interface was simplified — less
          visual noise, clearer column relationships. Scattered help documentation
          was pulled out and replaced with contextual inline guidance at the
          moments users actually needed it. Consent was converted from a blocking
          step to an inline modal so it didn't interrupt the flow. And error
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
          The experiment ran as an A/B test through Statsig from December 16,
          2025 to January 27, 2026. The control group (2,201 users) and test
          group (2,261 users) were both users who reached the contact file
          upload step, so baseline rates are much higher than the general mWeb
          trialer population.
        </p>
        <p className="mt-4">
          The redesigned flow shifted users toward deeper contact uploads.
          MEQ-3 (3+ contacts) improved +3.0%, and the downstream email sending
          metric for power senders (3+ emails) also improved +2.2%. Most
          importantly, these upstream gains cascaded into a +3.0% lift in
          trial-to-paid conversion, the clearest cause-and-effect chain of all
          three experiments: better contact upload led to more sends, which led
          to more conversions.
        </p>
      </>
    ),
  },
  {
    type: "metrics",
    groups: [
      {
        title: "Contact Upload Depth",
        description:
          "The redesigned flow successfully pushed users toward uploading more contacts. MEQ-3 (3+) improved +3.0% while the shallower buckets decreased, indicating users who previously stopped at 1-2 contacts now continued through the full flow.",
        metrics: [
          { value: "+3.0%", label: "Contacts 3+ (82.6% → 85.1%)" },
          { value: "-11.9%", label: "Contacts exactly 1 (4.8% → 4.2%)" },
          { value: "-43.3%", label: "Contacts exactly 2 (1.4% → 0.8%)" },
        ],
        chart: contactDepthChart,
      },
      {
        title: "Downstream Behavior",
        description:
          "Email sending improved across all depth levels, suggesting the deeper contact lists gave users more to work with and more reason to send. Overall send rate rose +2.4%, with improvement in every MEQ bucket.",
        metrics: [
          { value: "+2.4%", label: "Email sent any (56.6% → 58.0%)" },
          { value: "+2.2%", label: "Email sent 3+ (17.4% → 17.7%)" },
          { value: "+0.0%", label: "Email created (77.6% → 77.6%)" },
          { value: "+0.6%", label: "Second login (82.8% → 83.2%)" },
        ],
        chart: downstreamChart,
      },
      {
        title: "Conversion",
        description:
          "Trial-to-paid conversion rose +3.0%, the strongest balanced result of all three experiments. The causal chain is clear: better contact upload led to more sends, which led to more conversions. ELTV per converter was slightly lower in the test group ($759 vs $785), but the conversion lift more than compensates.",
        metrics: [
          { value: "+3.0%", label: "T2P conversion (48.8% → 50.2%)" },
          { value: "+$215K", label: "Est. annual revenue impact" },
        ],
        chart: conversionChart,
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
          naming. They don't generate support tickets. Users don't
          report them as bugs. They just leave, convinced they finished
          something they didn't. That invisibility is what makes them
          damaging. You can't see the exit in the data because it looks
          like a successful session.
        </p>
        <p className="mt-4">
          This experiment produced the most balanced improvement of all three.
          The causal chain was visible in the data: users who went through the
          redesigned flow uploaded more contacts (+3.0% deep uploads), which
          gave them more reason to send (+2.4% email sends), which drove more
          conversions (+3.0% T2P). Each step in the funnel improved because the
          step before it did. That kind of cascading effect is rare in
          growth experiments and validates the principle that reducing friction
          at a high-intent moment can unlock downstream behavior.
        </p>
        <p className="mt-4">
          The friction-reduction approach itself proved sound, and the team
          continues to apply it across other complex workflows in the product.
        </p>
      </>
    ),
  },
];

export default function ContactsPage() {
  return (
    <CaseStudyLayout
      title="Contacts Upload Experience"
      subtitle="PLG Growth Experiment | A/B Test | Dec 16, 2025 – Jan 27, 2026"
      role={role}
      team={team}
      tools={tools}
      heroVideoSrc="/animations/contacts-upload.mp4"
      blocks={blocks}
    />
  );
}

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
        <p className="mt-4 font-semibold">
          Every primary metric moved in the right direction.
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
          "3,565 accounts, 2.5-week experiment, significance reached at week 2. Rolled out to 100%.",
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

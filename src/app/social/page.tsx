import type { Metadata } from "next";
import CaseStudyLayout from "@/components/CaseStudyLayout";
import type { ContentBlock } from "@/components/CaseStudyLayout";

export const metadata: Metadata = {
  title: "Social Management – Aaron Cougle",
  description:
    "+140% increase in post completion and +81% increase in feature adoption.",
};

const role = ["Lead Product Designer", "UX Strategy", "Systems Thinking"];
const team = ["Social Platform", "Mobile and Web PMs", "Mobile Engineering", "UXR"];
const tools = ["Figma", "Notion", "Jira", "User Testing"];

const blocks: ContentBlock[] = [
  {
    type: "section",
    title: "Overview",
    content: (
      <>
        <p>
          Mobile social posting had an activation problem masked as a retention
          problem. Users tried it once and never came back because the workflow
          was too costly to repeat. I redesigned the experience around three
          structural fixes: moving account management into the creation flow,
          adding intelligent cross-platform content adaptation, and introducing
          contextual prompts to get users past the blank-composer drop-off. We
          rolled out to 20% of users, saw consistent positive signal, and moved
          to 100% within two weeks. Post completion rate increased 144% and
          feature adoption grew 81% in the first three months.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-2">
          {[
            { value: "+144%", label: "Post completion rate" },
            { value: "+81%", label: "Feature adoption" },
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
          Usage data showed that while many users tried mobile social posting,
          very few returned after the first session. Retention, not activation,
          was the gap. The friction was structural: cross-posting required
          repetitive setup for each platform, account management lived in
          settings rather than inside the creation flow, and platform nuances
          like character limits, tone expectations, and formatting differences
          were handled entirely by the user. What should have felt lightweight
          felt procedural.
        </p>
        <p className="mt-4">
          Before redesigning anything, I audited native posting on Facebook,
          Instagram, and LinkedIn. Each platform optimized for immediacy and
          clarity — minimal steps between intent and publish. Our experience
          tried to consolidate cross-posting but introduced complexity instead.
          That gap pointed to three specific areas: how accounts were managed,
          how content was adapted across platforms, and how users handled not
          knowing what to say.
        </p>
      </>
    ),
  },
  {
    type: "section",
    title: "Rethinking Account Management",
    content: (
      <>
        <p>
          If a user realized mid-composition that they needed to adjust a
          connected account, they had to abandon their draft and navigate into
          settings to make the change. On mobile, that interruption reliably
          ended the session. The interaction model treated account management as
          a configuration concern rather than a workflow concern — which was
          accurate architecturally but wrong for how people actually used the
          product.
        </p>
        <p className="mt-4">
          I repositioned account controls directly within the publishing
          workflow. Users can now add, remove, or switch accounts without
          leaving the post experience. The draft stays intact, the context
          stays intact, and the decision to adjust an account becomes a
          low-cost action rather than a flow-breaking one.
        </p>
      </>
    ),
  },
  {
    type: "section",
    title: "Reducing Cross-Platform Friction",
    content: (
      <>
        <p>
          Early sessions with small business owners made clear that the struggle
          wasn't WHERE to post — it was the time required to adapt content
          for each platform. Users were either posting the same copy everywhere
          and accepting it felt off-brand, or manually rewriting posts per
          platform and giving up partway through.
        </p>
        <p className="mt-4">
          I shifted the design goal from distribution coverage to adaptation
          efficiency. The system now allows a base message to adjust
          intelligently per platform — tone, formatting, and structure adapted
          automatically, with manual refinement still available. Cross-posting
          became faster without removing user control over the result.
        </p>
      </>
    ),
  },
  {
    type: "section",
    title: "Guiding Content Creation",
    content: (
      <>
        <p>
          A recurring pattern from usability sessions was users stalling not
          because the interface was confusing, but because they didn't
          know what to say. Blank composer, cursor blinking, session abandoned.
          This wasn't an edge case — it was a consistent drop-off point
          visible in both session recordings and qualitative feedback.
        </p>
        <p className="mt-4">
          I introduced contextual prompts tailored to each selected platform
          and business category. These evolved into lightweight AI-assisted
          recommendations that generate starting points without replacing the
          user's voice. The goal was to reduce the cost of beginning, not
          to automate the post. Getting users past the blank state meant
          significantly more sessions ended in a publish.
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
          After multiple UXR testing rounds, we launched to 20% of users.
          Two weeks in, no incidents and consistent positive signal across
          completion rates and qualitative feedback. We moved to 100% rollout
          within that window.
        </p>
        <p className="mt-4 font-semibold" style={{ color: "var(--v2-text)" }}>
          Post completion rate increased 144%. Feature adoption increased 81%
          in the first three months.
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
          "Measured post-launch across UXR-validated rollout from 20% to 100% of users within two weeks.",
        metrics: [
          { value: "+144%", label: "Post completion rate" },
          { value: "+81%", label: "Feature adoption (first 3 months)" },
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
          The numbers came from fixing structural friction, not from adding
          features. Repositioning account management, building adaptation into
          the system, and reducing the cost of beginning all targeted moments
          where the workflow was working against users rather than with them.
          None of it was conceptually novel — it was the kind of work that only
          shows up clearly after you spend enough time watching where people
          actually stop.
        </p>
        <p className="mt-4">
          The AI content layer opened up something worth continuing. Helping
          users past the blank state without scripting their voice is a narrow
          but meaningful target, and there's more to build there —
          especially as posting behavior diversifies across video, short-form,
          and platform-specific formats.
        </p>
      </>
    ),
  },
];

export default function SocialPage() {
  return (
    <CaseStudyLayout
      title="Social Management"
      subtitle="Constant Contact · Mobile"
      role={role}
      team={team}
      tools={tools}
      heroVideoSrc="/animations/social.mp4"
      blocks={blocks}
    />
  );
}

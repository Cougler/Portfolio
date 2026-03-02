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
    title: "The Problem: High Intent, Low Return",
    content: (
      <>
        <p>
          Social posting on desktop was established and functional. On mobile,
          however, the experience was fragmented, inconsistent, and slow. Usage
          data showed that while many users tried the feature once, very few
          returned. Activation was not the issue. Retention was.
        </p>
        <p className="mt-4">
          The friction was structural. Cross-posting required repetitive setup.
          Account management lived outside the creation flow. Platform nuances
          were not respected. What should have felt lightweight and flexible
          instead felt procedural and heavy.
        </p>
        <p className="mt-4">
          This wasn&rsquo;t as much a feature gap as it was a workflow problem.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-2">
          {[
            { value: "+144%", label: "Post completion rate" },
            { value: "+81%", label: "Feature adoption" },
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
    title: "Analyzing the Landscape Before Redesigning It",
    content: (
      <>
        <p>
          Before redesigning, I audited native posting experiences across
          Facebook, Instagram, and LinkedIn to understand how platform-specific
          behaviors shaped user expectations. Each platform optimized for
          immediacy and clarity.
        </p>
        <p className="mt-4">
          Our experience attempted to consolidate cross-posting but introduced
          complexity in the process. The opportunity was not to replicate native
          flows, but to unify them intelligently. The goal was to reduce effort
          while preserving platform integrity and brand consistency.
        </p>
      </>
    ),
  },
  {
    type: "section",
    title: "Multi-Account Posting: Simplicity vs. Control",
    content: (
      <>
        <p>
          Many small business owners operate across multiple social accounts.
          While the system supported this structurally, the interaction model
          made it costly. Managing accounts required exiting the post flow and
          navigating through settings on a separate surface. Every context switch
          introduced friction, increased cognitive load, and lowered the
          likelihood of completion.
        </p>
        <p className="mt-4">
          Account management was disconnected from the moment it mattered most
          &mdash; during creation. If a user realized they needed to adjust an
          account mid-composition, they were forced to abandon their draft and
          move through multiple layers of the app. On mobile, that interruption
          was especially disruptive.
        </p>
        <p className="mt-4">
          We repositioned account controls directly within the publishing
          workflow. Users could add, remove, or switch accounts without leaving
          the post experience, preserving intent and momentum. This transformed
          account management from a back-office configuration task into an
          integrated workflow capability.
        </p>
      </>
    ),
  },
  {
    type: "section",
    title: "Shifting the Focus from Distribution to Efficiency",
    content: (
      <>
        <p>
          Early conversations with small business owners revealed a pattern.
          They were not struggling with where to post. They were struggling with
          the time required to adapt content for each platform.
        </p>
        <p className="mt-4">
          The redesign shifted the goal from distribution coverage to adaptation
          efficiency. Instead of forcing users to manually rework posts for
          every network, we introduced a system that allowed a base message to
          intelligently adjust per platform. Tone, formatting, and structure
          were adapted automatically, while still allowing manual refinement.
        </p>
        <p className="mt-4">
          Cross-posting became faster and more intentional, without sacrificing
          authenticity.
        </p>
      </>
    ),
  },
  {
    type: "section",
    title: "Helping Users Know What to Post",
    content: (
      <>
        <p>
          A recurring barrier surfaced in usability sessions: uncertainty. Many
          users hesitated not because the interface was confusing, but because
          they were unsure what to say.
        </p>
        <p className="mt-4">
          We introduced contextual prompts tailored to each selected platform.
          Rather than generic suggestions, the system surfaced guidance aligned
          to platform norms and business category. Over time, this layer evolved
          into lightweight AI-assisted recommendations, helping users generate
          starting points without replacing their voice.
        </p>
        <p className="mt-4">
          This shifted the experience from mechanical publishing to guided
          creation.
        </p>
      </>
    ),
  },
  {
    type: "section",
    title: "Expanding the Experience Through Iteration",
    content: (
      <>
        <p>
          The initial release focused on simplifying the core flow, embedding
          account management into context, and improving cross-platform
          adaptation. From there, we expanded the system to support video
          uploads, hashtag lookup, improved media handling, and clearer previews.
        </p>
        <p className="mt-4">
          Each iteration was driven by usability sessions, analytics, and
          session recordings that revealed where users hesitated or dropped off.
          Improvements were incremental but compounding.
        </p>
      </>
    ),
  },
  {
    type: "section",
    title: "Validation and Rollout",
    content: (
      <p>
        Following multiple successful test rounds with UXR, we launched a
        partial rollout to 20% of our user base. Within two weeks, after no
        incidents and consistent positive feedback, the feature was rolled out
        to 100% of users.
      </p>
    ),
  },
  {
    type: "metrics",
    groups: [
      {
        title: "Results",
        metrics: [
          { value: "+81%", label: "Feature adoption (first 3 months)" },
          { value: "+144%", label: "Post completion rate" },
        ],
      },
    ],
  },
  {
    type: "section",
    title: "The Takeaway",
    content: (
      <>
        <p>
          This redesign wasn&rsquo;t about adding new features &mdash; it was
          about eliminating friction and matching how small business owners
          actually work.
        </p>
        <p className="mt-4">
          By grounding the experience in real behavior, unifying mobile and web
          patterns, and using AI to reduce effort rather than add novelty, we
          transformed social posting from an underused utility into a core
          engagement feature.
        </p>
        <p className="mt-4 font-semibold text-foreground">
          The lesson was clear: when speed and clarity align with user
          motivation, adoption follows naturally.
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

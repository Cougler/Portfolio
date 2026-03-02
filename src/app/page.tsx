"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProjectCard from "@/components/ProjectCard";
import AIWorkflow from "@/components/AIWorkflow";
import PersonalProjects from "@/components/PersonalProjects";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/ThemeContext";

const projects = [
  {
    date: "Jan 9, 2026",
    company: "Constant Contact",
    headline:
      "Initial results show 24% lift in send completion, improving activation",
    title: "Schedule Page",
    tags: [
      { label: "Growth Experiment" },
      { label: "Design lead" },
    ],
    description:
      "By lowering cognitive overhead and improving send flow, early results from this experiment are showing an improvement in trial user sends, improving heavy drop off rate.",
    accentColor: "purple" as const,
    comingSoon: true,
    imagePlaceholder: "Schedule page mockup",
    imageSrc: "/animations/schedulepage.jpg",
  },
  {
    date: "Dec 15, 2025",
    company: "Constant Contact",
    headline:
      "+69% increase in first email sends by streamlining mobile web activation flows",
    title: "Mobile Web Experience",
    tags: [
      { label: "Growth Experiment" },
      { label: "Design lead" },
      { label: "6-day turnaround" },
      { label: "Figma Make" },
    ],
    description:
      "Reduced cognitive overhead across creation, sending, and required setup steps to accelerate activation without impacting monetization.",
    accentColor: "purple" as const,
    href: "/mobilewebexperience",
    imagePlaceholder: "Mobile web mockup",
    videoSrc: "/animations/mweb-experience.mp4",
  },
  {
    date: "Nov 3, 2025",
    company: "Constant Contact",
    headline:
      "2x creator-to-sender conversion and +125% lift in second email sends",
    title: "Mobile Email Editor",
    tags: [
      { label: "Growth Experiment" },
      { label: "Patent Pending" },
      { label: "Design lead" },
    ],
    description:
      "Adapted a previously validated native editor into a robust mobile web system to strengthen the send–refine–send behavior tied directly to activation and revenue.",
    accentColor: "blue" as const,
    href: "/mobileeditor",
    imagePlaceholder: "Mobile editor mockup",
    videoSrc: "/animations/mobile-editor.mp4",
  },
  {
    date: "Nov 19, 2025",
    company: "Constant Contact",
    headline:
      "+11.9% lift in file upload adoption by reducing friction in high intent workflow",
    title: "Contacts Upload Experience",
    tags: [
      { label: "Lead growth designer" },
      { label: "~ 24,000 monthly users" },
      { label: "Statsig in 1.5 weeks" },
      { label: "Growth Experiment" },
    ],
    description:
      "Simplified upload, mapping, and consent flows to eliminate false completion signals and increase list growth in a high-intent moment.",
    accentColor: "blue" as const,
    href: "/contacts",
    imagePlaceholder: "Contacts upload mockup",
    videoSrc: "/animations/contacts-upload.mp4",
  },
  {
    date: "May 12, 2025",
    company: "Constant Contact",
    headline:
      "+140% increase in post completion and +81% increase in feature adoption",
    title: "Social Management",
    tags: [{ label: "New Feature" }],
    description:
      "Reduced friction in cross-posting by unifying account selection, clarifying posting states, and guiding users on what to publish, improving speed, confidence, and daily usage.",
    accentColor: "green" as const,
    href: "/social",
    imagePlaceholder: "Social management mockup",
    videoSrc: "/animations/social.mp4",
  },
  {
    date: "Nov 24, 2021",
    company: "Constant Contact",
    headline: "21% lift in trial user activation + conversions",
    title: "Brand Kit",
    tags: [
      { label: "Feature" },
      { label: "400,000+ users" },
    ],
    description:
      "Replaced manual brand configuration with a guided, automated system that maps logos and colors intelligently, reducing setup friction while preserving user control.",
    accentColor: "green" as const,
    href: "/brandkit",
    imagePlaceholder: "Brand kit mockup",
    videoSrc: "/animations/brandkit.mp4",
    timelinePt: "pt-[52px]",
  },
];

function HomeContent() {
  return (
    <div className="min-h-screen" style={{ background: "var(--color-background)", color: "var(--color-foreground)" }}>
      <Header />
      <Hero />

      <section className="max-w-[1200px] mx-auto px-5 md:px-10 pb-6 flex flex-col gap-0">
        {projects.slice(0, 2).map((project, i) => (
          <div
            key={project.title}
            className="animate-fade-in-up"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            {i === 0 && (
              <h2 className="section-heading px-0 md:px-4">
                Recent Projects
              </h2>
            )}
            <ProjectCard {...project} />
          </div>
        ))}
      </section>

      <AIWorkflow />

      <section className="max-w-[1200px] mx-auto px-5 md:px-10 pb-6 flex flex-col gap-0">
        {projects.slice(2).map((project, i) => (
          <div
            key={project.title}
            className="animate-fade-in-up"
            style={{ animationDelay: `${(i + 2) * 80}ms` }}
          >
            <ProjectCard {...project} />
          </div>
        ))}
      </section>

      <PersonalProjects />
      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <HomeContent />
    </ThemeProvider>
  );
}

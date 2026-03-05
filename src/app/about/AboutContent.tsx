"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Footer from "@/components/Footer";

const darkVars: React.CSSProperties = {
  "--v2-bg":            "#08090A",
  "--v2-surf":          "rgba(255,255,255,0.04)",
  "--v2-border":        "rgba(255,255,255,0.08)",
  "--v2-text":          "#F0F0F0",
  "--v2-muted":         "#6B6F76",
  "--v2-card-shadow":   "inset 0 1px 0 rgba(255,255,255,0.06), 0 4px 24px rgba(0,0,0,0.4)",
  "--color-background": "#08090A",
  "--color-foreground": "#F0F0F0",
  "--color-muted":      "#6B6F76",
  "--color-border":     "rgba(255,255,255,0.08)",
  background:           "#08090A",
  color:                "#F0F0F0",
} as React.CSSProperties;

const lightVars: React.CSSProperties = {
  "--v2-bg":            "#F8F8FA",
  "--v2-surf":          "rgba(0,0,0,0.03)",
  "--v2-border":        "rgba(0,0,0,0.08)",
  "--v2-text":          "#0f1a2a",
  "--v2-muted":         "#6b7280",
  "--v2-card-shadow":   "0 2px 16px rgba(0,0,0,0.07)",
  "--color-background": "#F8F8FA",
  "--color-foreground": "#0f1a2a",
  "--color-muted":      "#6b7280",
  "--color-border":     "rgba(0,0,0,0.08)",
  background:           "#F8F8FA",
  color:                "#0f1a2a",
} as React.CSSProperties;

const testimonials = [
  {
    name: "Russ Morton",
    title: "Technology Executive | Chief Product Officer | Strategic Advisor",
    quote:
      "I got to know Aaron as he was a critical team member on our Design Team at Constant Contact. I was consistently impressed with Aaron's creativity when solving new problems, user workflows. He consistently found his way into tackling our most innovative areas, and 2 areas stand out in terms of how he made an impact: his early concepts for AI workflows shaped a key part of our user journey, and his rethink of our Mobile App first time user experience to include more social media elements expanded our ICP. Aaron is talented at distilling complexity and working well with ambiguity — all with a focus on delivering the customer outcome. Plus, he's a great person to collaborate with!",
  },
  {
    name: "Gaurav Mehta",
    title: "Vice President, Product",
    quote:
      "I have had the pleasure of working closely with Aaron Cougle at Constant Contact, where he was a Senior Product Designer on my team. Aaron led the design efforts for our iOS and Android mobile apps, which are used by hundreds of thousands of small businesses to manage and grow their marketing efforts. Aaron played a key role in shaping the mobile experience end-to-end. He brought a strong user focus, clear communication, and a deep understanding of both product and design goals. His work directly contributed to major business outcomes as we expanded our mobile presence. I would gladly work with Aaron again and highly recommend him to any team looking for a skilled, versatile, and user-focused design leader.",
  },
  {
    name: "Dru Martin",
    title: "Director of Product Design",
    quote:
      "I've had the pleasure of working with Aaron for several years, including through the acquisition of our former company. Throughout times of uncertainty and change, Aaron has been a trusted colleague and a steady presence for the team. He quickly established himself within a larger organization, bringing a unique ability to synthesize product requirements in innovative and compelling ways. Aaron's cheerful and proactive approach makes him an invaluable asset to any team. Any company would be fortunate to have Aaron on board.",
  },
  {
    name: "Savannah Chase",
    title: "Senior Product Designer",
    quote:
      "I thoroughly enjoyed my time working alongside of Aaron. He is kind and considerate, yet direct and efficient, a true team player in every sense. His passion for UX extends beyond his day job, making him an enthusiastic student of the craft even in his off time. As a fellow team member, there is always something to learn from Aaron.",
  },
  {
    name: "Shirin Salehe",
    title: "Product Designer, Microsoft",
    quote:
      "Working with Aaron was an absolute pleasure. He designed high-quality products and always had a fresh eyes approach to solving problems. He's a highly collaborative teammate and talented designer with skills beyond just design, as he's always looking for ways to push the boundaries of how we can improve our product. Aaron would be a solid asset to any team.",
  },
  {
    name: "Devin DePoint",
    title: "Product Management Leader",
    quote:
      "I worked directly with Aaron on many projects at Constant Contact for over a year. These projects ranged from being strategic and high awareness projects, to very critical micro-moment updates within the product experience. In all cases, Aaron was great to work with and always produced high quality designs/prototypes. He took each user need to heart and was hyper-focused on creating something that users found benefit in.",
  },
  {
    name: "Britt Garcia",
    title: "Senior Product Designer",
    quote:
      "Aaron is a highly skilled designer from UX and UI perspective. He can envision the larger user flow and at the same time zoom into fine details. This makes him a valuable stakeholder in UX discussions. He also has impressive presentation skills and iterates on feedback with quick turn-around.",
  },
];

function ThemeToggle({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="w-9 h-9 flex items-center justify-center transition-opacity duration-200 hover:opacity-70"
      style={{
        border: "1px solid var(--v2-border)",
        borderRadius: 8,
        color: "var(--v2-text)",
      }}
    >
      {isDark ? (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}

function TestimonialCard({ name, title, quote }: { name: string; title: string; quote: string }) {
  return (
    <div
      className="p-6"
      style={{
        background: "var(--v2-surf)",
        border: "1px solid var(--v2-border)",
        backdropFilter: "blur(12px)",
        borderRadius: 12,
        boxShadow: "var(--v2-card-shadow)",
      }}
    >
      <blockquote className="text-[14px] leading-[1.75] mb-4 font-[family-name:var(--font-inter)]" style={{ color: "var(--v2-muted)" }}>
        &ldquo;{quote}&rdquo;
      </blockquote>
      <div>
        <p className="text-[14px] font-semibold font-[family-name:var(--font-inter)]" style={{ color: "var(--v2-text)" }}>
          {name}
        </p>
        <p className="text-[12px] font-[family-name:var(--font-inter)]" style={{ color: "var(--v2-muted)" }}>
          {title}
        </p>
      </div>
    </div>
  );
}

export default function AboutContent() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-theme");
    if (saved !== null) setIsDark(saved === "dark");
  }, []);

  function toggleTheme() {
    setIsDark(d => {
      const next = !d;
      localStorage.setItem("portfolio-theme", next ? "dark" : "light");
      return next;
    });
  }

  return (
    <div
      className="min-h-screen"
      style={{
        ...(isDark ? darkVars : lightVars),
        transition: "background 0.4s, color 0.4s",
      }}
    >
      {/* Header */}
      <div className="max-w-[760px] mx-auto px-6 md:px-10 pt-[max(1.5rem,env(safe-area-inset-top))] animate-fade-in-up flex items-center justify-between">
        <Link
          href="/"
          aria-label="Back to home"
          className="inline-flex items-center justify-center w-10 h-10 rounded-full transition-all duration-150"
          style={{ border: "1px solid var(--v2-border)", color: "var(--v2-muted)" }}
        >
          <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
            <path d="M10 13l-5-5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
        <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
      </div>

      {/* Hero */}
      <section className="max-w-[760px] mx-auto px-6 md:px-10 pt-8 pb-6 animate-fade-in-up">
        <h1 className="text-[2rem] md:text-[2.5rem] font-bold leading-[1.15] tracking-tight mb-2">
          Aaron Cougle
        </h1>
        <p className="text-[15px] font-[family-name:var(--font-inter)]" style={{ color: "var(--v2-muted)" }}>
          Senior Designer &middot; AI Explorer &middot; IC Leader
        </p>
      </section>

      {/* Bio */}
      <article className="max-w-[760px] mx-auto px-6 md:px-10 pb-8">
        <section className="mb-10 animate-fade-in-up" style={{ animationDelay: "60ms" }}>
          <h2 className="text-[1.25rem] md:text-[1.4rem] font-bold tracking-[-0.01em] mb-4 font-[family-name:var(--font-inter)]">
            Design Philosophy and Life
          </h2>
          <div className="text-[14.5px] leading-[1.75] font-[family-name:var(--font-inter)] space-y-4" style={{ color: "var(--v2-muted)" }}>
            <p>
              I simplify complex systems into clear, scalable experiences that
              teams can build on. Over the past decade, I&rsquo;ve led work
              across onboarding, email editors, design systems, and mobile
              apps, helping products move faster without losing clarity or
              intent. My focus is where usability meets execution, because both
              matter equally.
            </p>
            <p>
              I design from a belief that most friction is unnecessary. My work
              is about removing it, bringing structure to ambiguity, ensuring
              what matters is always within reach, and scaling systems that
              stay maintainable as products grow.
            </p>
            <p>
              Data drives my decisions. In PLG environments, I&rsquo;ve
              executed against key growth metrics like trial to paid (T:P) and
              visitor to trial (V:T), using both quantitative and qualitative
              insights to refine the experience. Whether identifying drop-off
              points or optimizing onboarding speed, I use numbers to validate
              direction and sharpen intuition.
            </p>
            <p>
              I move quickly when momentum matters and slow down when decisions
              have long-term impact. Collaboration, to me, is shared ownership
              not just clean handoffs, but open communication, honest
              feedback, and accountability when something feels off.
            </p>
            <p>
              AI is part of how I think and work. It&rsquo;s not about
              automation for its own sake. It&rsquo;s about clearing
              space for better decisions, faster prototyping, and new
              possibilities that strengthen design outcomes without draining
              the team.
            </p>
            <p>
              Outside of work, I&rsquo;m newly married and usually found with
              my Blue Heeler, Poppy, turning every walk into a frisbee
              tournament. I like things simple, balanced, and purposeful.
            </p>
          </div>
        </section>

        {/* Testimonials */}
        <section className="animate-fade-in-up" style={{ animationDelay: "120ms" }}>
          <h2 className="text-[1.25rem] md:text-[1.4rem] font-bold tracking-[-0.01em] mb-6 font-[family-name:var(--font-inter)]">
            What People Say
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {testimonials.map((t) => (
              <TestimonialCard key={t.name} {...t} />
            ))}
          </div>
        </section>
      </article>

      <Footer />
    </div>
  );
}

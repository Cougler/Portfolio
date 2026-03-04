"use client";

import Image from "next/image";
const aiLinks = [
  { label: "Data analysis", id: "ai-data" },
  { label: "Design ideation", id: "ai-design" },
  { label: "Organization", id: "ai-organization" },
];

function smoothScroll(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Header() {
  return (
    <header className="max-w-[1200px] mx-auto flex items-center justify-between px-5 md:px-10 py-6 md:py-8">
      <a href="/" aria-label="Home">
        <Image
          src="/images/logo.svg"
          alt="Aaron Cougle logo"
          width={40}
          height={30}
          priority
        />
      </a>

      <nav className="flex items-center gap-3 font-[family-name:var(--font-inter)]">
        <a
          href="#ai-data"
          onClick={(e) => smoothScroll(e, "ai-data")}
          className="inline-flex items-center gap-2 text-[13px] font-semibold text-accent md:pointer-events-none"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          AI-integrated
        </a>
        <span className="hidden md:inline text-border">|</span>
        {aiLinks.map((link, i) => (
          <span key={link.id} className="hidden md:flex items-center gap-3">
            <a
              href={`#${link.id}`}
              onClick={(e) => smoothScroll(e, link.id)}
              className="text-[13px] text-muted hover:text-accent transition-colors duration-150"
            >
              {link.label}
            </a>
            {i < aiLinks.length - 1 && (
              <span className="text-border text-[13px]">/</span>
            )}
          </span>
        ))}
      </nav>
    </header>
  );
}

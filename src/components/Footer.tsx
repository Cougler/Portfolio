export default function Footer() {
  return (
    <footer className="px-5 md:px-[240px] py-16 md:py-[247px]" style={{ background: "var(--color-background)" }}>
      <div className="max-w-[750px] mx-auto text-center">
        <h2 className="text-[1.5rem] md:text-4xl lg:text-[2.75rem] font-bold leading-tight tracking-tight mb-3 md:mb-4 text-foreground">
          I design for teams that care about doing it right.
        </h2>
        <p className="text-[14px] md:text-[15px] text-muted mb-8 md:mb-10 font-[family-name:var(--font-inter)]">
          If that&rsquo;s your team, let&rsquo;s talk &ndash; or send me a cat video
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <a
            href="mailto:hello@aaroncougle.com"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 md:py-3 bg-foreground text-white text-sm font-semibold transition-colors duration-200 hover:bg-foreground/85 active:bg-foreground/75 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent font-[family-name:var(--font-inter)]"
            style={{ borderRadius: "var(--theme-button-radius, 8px)" }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2L11 13" />
              <path d="M22 2L15 22L11 13L2 9L22 2Z" />
            </svg>
            Email
          </a>
          <a
            href="https://linkedin.com/in/aaroncougle"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-10 py-3.5 md:py-3 border-2 border-foreground text-foreground text-sm font-semibold transition-colors duration-200 hover:bg-foreground hover:text-white active:bg-foreground/90 active:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent font-[family-name:var(--font-inter)]"
            style={{ borderRadius: "var(--theme-button-radius, 8px)" }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}

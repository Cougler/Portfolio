import Link from "next/link";

const workLinks = [
  { label: "Mobile Web Experience", href: "/mobilewebexperience" },
  { label: "Mobile Email Editor", href: "/mobileeditor" },
  { label: "Contacts Upload", href: "/contacts" },
  { label: "Social Management", href: "/social" },
  { label: "Brand Kit", href: "/brandkit" },
];

const appLinks = [
  { label: "Mission Control", href: "https://mission-control-acportfolio.vercel.app", external: true },
  { label: "DeskFit", href: "#" },
  { label: "Flowki", href: "#" },
  { label: "Pro UX Kit", href: "#" },
];

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--v2-border)", background: "var(--color-background)" }}>
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 py-10 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest mb-3" style={{ color: "var(--color-muted)" }}>Work</p>
            <ul className="flex flex-col gap-2">
              {workLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[12px] transition-colors duration-150 font-[family-name:var(--font-inter)] hover:text-foreground" style={{ color: "var(--color-muted)" }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest mb-3" style={{ color: "var(--color-muted)" }}>Apps</p>
            <ul className="flex flex-col gap-2">
              {appLinks.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="text-[12px] transition-colors duration-150 font-[family-name:var(--font-inter)] hover:text-foreground"
                    style={{ color: "var(--color-muted)" }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest mb-3" style={{ color: "var(--color-muted)" }}>Pages</p>
            <ul className="flex flex-col gap-2">
              {[{ label: "Home", href: "/" }, { label: "About", href: "/about" }].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[12px] transition-colors duration-150 font-[family-name:var(--font-inter)] hover:text-foreground" style={{ color: "var(--color-muted)" }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest mb-3" style={{ color: "var(--color-muted)" }}>Connect</p>
            <ul className="flex flex-col gap-2">
              <li>
                <a href="mailto:hello@aaroncougle.com" className="text-[12px] transition-colors duration-150 font-[family-name:var(--font-inter)] hover:text-foreground" style={{ color: "var(--color-muted)" }}>
                  Email
                </a>
              </li>
              <li>
                <a href="https://linkedin.com/in/aaroncougle" target="_blank" rel="noopener noreferrer" className="text-[12px] transition-colors duration-150 font-[family-name:var(--font-inter)] hover:text-foreground" style={{ color: "var(--color-muted)" }}>
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 flex items-center justify-between" style={{ borderTop: "1px solid var(--v2-border)" }}>
          <p className="text-[11px] font-[family-name:var(--font-inter)]" style={{ color: "var(--color-muted)" }}>
            © {new Date().getFullYear()} Aaron Cougle
          </p>
          <a
            href="https://deck.aaroncougle.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] select-none"
            style={{ color: "var(--color-background)" }}
            aria-hidden="true"
            tabIndex={-1}
          >
            ·
          </a>
        </div>
      </div>
    </footer>
  );
}

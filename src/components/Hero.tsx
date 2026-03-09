import Link from "next/link";

export default function Hero() {
  return (
    <section className="max-w-[1200px] mx-auto px-5 md:px-10 pt-12 md:pt-20 pb-16 md:pb-[120px] animate-fade-in-up">
      <h1 className="text-[34px] md:text-[46px] lg:text-[52px] font-semibold leading-[1.05] tracking-[-0.03em] mb-4 md:mb-5">
        Hey, I'm{" "}
        <Link
          href="/about"
          className="underline underline-offset-4 decoration-[3px] hover:text-accent transition-colors duration-150"
        >
          Aaron
        </Link>
      </h1>
      <p className="text-[15px] md:text-[17px] leading-relaxed w-full max-w-[520px] text-muted font-[family-name:var(--font-inter)]">
        Senior designer running activation growth experiments at Constant Contact. Here's what's shipped.
      </p>
    </section>
  );
}

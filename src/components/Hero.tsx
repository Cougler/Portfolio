import Link from "next/link";

export default function Hero() {
  return (
    <section className="max-w-[1200px] mx-auto px-5 md:px-10 pt-12 md:pt-20 pb-16 md:pb-[120px] animate-fade-in-up">
      <h1 className="text-[28px] md:text-[40px] font-bold leading-[1.15] tracking-tight mb-3 md:mb-4">
        Hey, I&rsquo;m{" "}
        <Link
          href="/about"
          className="underline underline-offset-4 decoration-2 hover:text-accent transition-colors duration-150"
        >
          Aaron.
        </Link>
      </h1>
      <p className="text-[15px] md:text-lg leading-relaxed w-full max-w-[550px]" style={{ fontFamily: "Georgia, serif", color: "rgba(89, 94, 105, 1)" }}>
        I&rsquo;m a designer leading activation growth design at Constant Contact.
        Here&rsquo;s what I&rsquo;ve been up to.
      </p>
    </section>
  );
}

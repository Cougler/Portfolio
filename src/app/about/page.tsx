import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About – Aaron Cougle",
  description:
    "Senior Designer, AI Explorer, IC leader. I simplify complex systems into clear, scalable experiences.",
};

export default function AboutPage() {
  return <AboutContent />;
}

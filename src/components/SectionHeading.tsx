import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "../lib/gsap";
import { prefersReducedMotion } from "../utils/motion";

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: string;
}

export default function SectionHeading({ index, eyebrow, title }: SectionHeadingProps) {
  const rootRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !titleRef.current) return;

      const split = new SplitText(titleRef.current, { type: "lines", mask: "lines" });
      gsap.from(split.lines, {
        yPercent: 110,
        duration: 1.1,
        stagger: 0.09,
        ease: "power4.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 82%", once: true },
      });
      gsap.from(".heading-eyebrow", {
        opacity: 0,
        y: 16,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 82%", once: true },
      });
    },
    { scope: rootRef },
  );

  return (
    <header ref={rootRef} className="mb-14 md:mb-20">
      <p className="heading-eyebrow mb-5 font-mono text-[11px] uppercase tracking-[0.35em] text-accent">
        {index} / {eyebrow}
      </p>
      <h2
        ref={titleRef}
        className="max-w-5xl font-display text-4xl font-bold uppercase leading-[1.02] tracking-tight md:text-6xl lg:text-7xl"
      >
        {title}
      </h2>
    </header>
  );
}

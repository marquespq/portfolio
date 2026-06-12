import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "../../lib/gsap";
import { prefersReducedMotion } from "../../utils/motion";
import { useLanguage } from "../../i18n";
import SectionHeading from "../SectionHeading";

export default function About() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      // Lines light up from fog to full opacity as the user scrolls through.
      if (paragraphRef.current) {
        const split = new SplitText(paragraphRef.current, { type: "lines" });
        gsap.fromTo(
          split.lines,
          { opacity: 0.12 },
          {
            opacity: 1,
            stagger: 0.2,
            ease: "none",
            scrollTrigger: {
              trigger: paragraphRef.current,
              start: "top 78%",
              end: "bottom 50%",
              scrub: true,
            },
          },
        );
      }

      gsap.from(".pillar", {
        y: 48,
        opacity: 0,
        stagger: 0.1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".pillar-grid", start: "top 80%", once: true },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="about" className="relative px-6 py-32 md:px-10 md:py-48">
      <SectionHeading index="01" eyebrow={t.about.eyebrow} title={t.about.title} />

      <p
        ref={paragraphRef}
        className="max-w-4xl text-xl font-medium leading-snug text-paper md:text-3xl md:leading-snug"
      >
        {t.about.paragraph}
      </p>

      <div className="pillar-grid mt-24 grid gap-px border-t border-line sm:grid-cols-2 lg:grid-cols-4">
        {t.about.pillars.map((pillar) => (
          <article key={pillar.index} className="pillar border-b border-line py-8 pr-8 sm:border-b-0 sm:pt-10">
            <span className="font-mono text-[11px] tracking-[0.3em] text-accent">{pillar.index}</span>
            <h3 className="mt-4 font-display text-xl font-bold uppercase tracking-tight md:text-2xl">{pillar.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-fog">{pillar.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

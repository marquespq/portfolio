import { useRef } from "react";
import { gsap, useGSAP } from "../../lib/gsap";
import { prefersReducedMotion } from "../../utils/motion";
import { useLanguage } from "../../i18n";
import SectionHeading from "../SectionHeading";

export default function Experience() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      // Accent line draws itself as the timeline scrolls through.
      gsap.fromTo(
        progressRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".timeline",
            start: "top 75%",
            end: "bottom 45%",
            scrub: true,
          },
        },
      );

      gsap.utils.toArray<HTMLElement>(".timeline-entry").forEach((entry) => {
        gsap.from(entry, {
          x: -32,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: entry, start: "top 82%", once: true },
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="experience" className="relative border-t border-line px-6 py-32 md:px-10 md:py-48">
      <SectionHeading index="05" eyebrow={t.experience.eyebrow} title={t.experience.title} />

      <div className="timeline relative ml-1">
        <span className="absolute left-0 top-0 h-full w-px bg-line" aria-hidden />
        <span
          ref={progressRef}
          className="absolute left-0 top-0 h-full w-px origin-top scale-y-0 bg-accent"
          aria-hidden
        />

        <ol className="flex flex-col gap-16 md:gap-20">
          {t.experience.entries.map((entry) => (
            <li key={entry.period} className="timeline-entry pl-8 md:grid md:grid-cols-[220px_1fr] md:gap-10 md:pl-12">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">{entry.period}</p>
              <div className="mt-3 md:mt-0">
                <h3 className="font-display text-2xl font-bold uppercase leading-tight tracking-tight md:text-3xl">
                  {entry.role}
                </h3>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.25em] text-fog">{entry.org}</p>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-fog md:text-base">{entry.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

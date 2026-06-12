import { useRef } from "react";
import { gsap, useGSAP } from "../../lib/gsap";
import { prefersReducedMotion } from "../../utils/motion";
import { useLanguage } from "../../i18n";
import SectionHeading from "../SectionHeading";

export default function Work() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.utils.toArray<HTMLElement>(".work-item").forEach((item) => {
        const visual = item.querySelector(".work-visual");

        gsap.from(item, {
          y: 64,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 85%", once: true },
        });

        // Vertical parallax inside the visual frame.
        if (visual) {
          gsap.fromTo(
            visual,
            { yPercent: -8 },
            {
              yPercent: 8,
              ease: "none",
              scrollTrigger: { trigger: item, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
        }
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="work" className="relative px-6 py-32 md:px-10 md:py-48">
      <SectionHeading index="03" eyebrow={t.work.eyebrow} title={t.work.title} />

      <div className="flex flex-col gap-24 md:gap-36">
        {t.work.projects.map((project, i) => (
          <article key={project.codename} className="work-item group">
            <div className={`grid items-start gap-8 lg:grid-cols-2 lg:gap-14 ${i % 2 ? "lg:[direction:rtl]" : ""}`}>
              <div className="lg:[direction:ltr]">
                <div
                  data-cursor="view"
                  data-cursor-text={t.work.view}
                  className="relative aspect-[16/11] overflow-hidden rounded-sm bg-surface"
                >
                  <div
                    className={`work-visual absolute inset-x-0 -inset-y-[12%] bg-gradient-to-br ${project.gradient} transition-transform duration-700 ease-out group-hover:scale-[1.04]`}
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(255,255,255,0.16),transparent_55%)]" />
                  <span className="absolute bottom-2 right-5 select-none font-display text-[28vw] font-extrabold leading-none text-ink/25 lg:text-[13vw]">
                    {project.index}
                  </span>
                  <span className="absolute left-5 top-5 font-mono text-[10px] uppercase tracking-[0.3em] text-paper/70">
                    {project.codename} — {project.year}
                  </span>
                </div>
              </div>

              <div className="lg:[direction:ltr] lg:pt-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">
                  {project.category} — {project.year}
                </p>
                <h3 className="mt-4 font-display text-3xl font-bold uppercase leading-tight tracking-tight md:text-5xl">
                  {project.title}
                </h3>
                <p className="mt-6 max-w-xl text-sm leading-relaxed text-fog md:text-base">{project.description}</p>
                <p className="mt-4 max-w-xl border-l-2 border-accent pl-4 text-sm leading-relaxed text-paper/85">
                  {project.impact}
                </p>
                <ul className="mt-8 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-line px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-fog"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
                <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.25em] text-fog/60">{t.work.nda}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

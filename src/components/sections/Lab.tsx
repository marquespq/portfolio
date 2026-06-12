import { useRef } from "react";
import { gsap, useGSAP } from "../../lib/gsap";
import { prefersReducedMotion } from "../../utils/motion";
import { useLanguage } from "../../i18n";
import SectionHeading from "../SectionHeading";

export default function Lab() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      gsap.from(".lab-card", {
        y: 48,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".lab-grid", start: "top 85%", once: true },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="lab" className="relative border-t border-line px-6 py-32 md:px-10 md:py-48">
      <SectionHeading index="04" eyebrow={t.lab.eyebrow} title={t.lab.title} />

      <div className="lab-grid grid gap-6 lg:grid-cols-2">
        {t.lab.projects.map((project) => (
          <article
            key={project.title}
            className="lab-card group relative flex flex-col overflow-hidden rounded-sm border border-line bg-surface p-8 transition-colors duration-500 hover:border-accent/50 md:p-10"
          >
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(233,138,60,0.09),transparent_60%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              aria-hidden
            />
            <span className="pointer-events-none absolute -bottom-8 right-2 select-none font-display text-[8rem] font-extrabold leading-none text-paper/5 md:text-[10rem]">
              {project.index}
            </span>

            <div className="relative flex flex-1 flex-col">
              <div className="flex items-baseline justify-between gap-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-accent">{project.category}</p>
                <p className="shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-fog/70">{project.meta}</p>
              </div>
              <h3 className="mt-6 font-display text-3xl font-bold uppercase leading-tight tracking-tight md:text-4xl">
                {project.title}
              </h3>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-fog md:text-base">{project.description}</p>
              <ul className="mt-7 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-line px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-fog"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap gap-6 pt-9">
                {project.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="view"
                    className="font-mono text-[11px] uppercase tracking-[0.25em] text-paper transition-colors duration-300 hover:text-accent"
                  >
                    {link.label} ↗
                  </a>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

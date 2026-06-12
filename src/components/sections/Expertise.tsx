import { useRef } from "react";
import { gsap, useGSAP } from "../../lib/gsap";
import { useLanguage } from "../../i18n";

export default function Expertise() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop: pin the section and scroll the track horizontally.
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const track = trackRef.current;
        if (!track) return;
        gsap.to(track, {
          x: () => -(track.scrollWidth - window.innerWidth),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${track.scrollWidth - window.innerWidth}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      });

      // Mobile / reduced motion: simple staggered reveal, no pinning.
      mm.add("(max-width: 1023px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".expertise-card").forEach((card) => {
          gsap.from(card, {
            y: 56,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 85%", once: true },
          });
        });
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="expertise" className="relative overflow-hidden border-t border-line">
      <div ref={trackRef} className="flex w-full flex-col lg:h-svh lg:w-max lg:flex-row lg:items-stretch">
        <div className="flex shrink-0 flex-col justify-center px-6 py-24 md:px-10 lg:h-svh lg:w-[44vw] lg:py-0">
          <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.35em] text-accent">{t.expertise.eyebrow}</p>
          <h2 className="font-display text-4xl font-bold uppercase leading-[1.02] tracking-tight md:text-6xl lg:text-7xl">
            {t.expertise.title}
          </h2>
          <p className="mt-8 hidden max-w-sm text-sm leading-relaxed text-fog lg:block" aria-hidden>
            {t.expertise.keepScrolling}
          </p>
        </div>

        {t.expertise.items.map((item) => (
          <article
            key={item.index}
            className="expertise-card flex shrink-0 flex-col justify-between border-t border-line px-6 py-12 md:px-10 lg:h-svh lg:w-[36vw] lg:border-l lg:border-t-0 lg:py-24"
          >
            <span className="font-mono text-sm tracking-[0.3em] text-accent">{item.index}</span>
            <div>
              <h3 className="font-display text-3xl font-bold uppercase leading-tight tracking-tight lg:text-4xl">
                {item.title}
              </h3>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-fog md:text-base">{item.description}</p>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.2em] text-fog">
              {item.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

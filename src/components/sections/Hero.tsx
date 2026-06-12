import { lazy, Suspense, useRef } from "react";
import { gsap, SplitText, useGSAP } from "../../lib/gsap";
import { prefersReducedMotion } from "../../utils/motion";
import { useLanguage } from "../../i18n";

// Three.js is the heaviest dependency — load it in its own chunk while the preloader runs.
const Background3D = lazy(() => import("../three/Background3D"));

export default function Hero({ ready }: { ready: boolean }) {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Intro: runs once the preloader hands off.
  useGSAP(
    () => {
      if (!ready || !contentRef.current) return;

      if (prefersReducedMotion()) {
        gsap.set([contentRef.current, ".hero-meta"], { opacity: 1, y: 0 });
        return;
      }

      const split = new SplitText(".hero-title", { type: "chars", mask: "chars" });
      gsap
        .timeline()
        .set(contentRef.current, { opacity: 1 })
        .from(split.chars, { yPercent: 120, stagger: 0.028, duration: 1.1, ease: "power4.out" })
        .to(".hero-meta", { y: 0, opacity: 1, stagger: 0.12, duration: 0.9, ease: "power3.out" }, "-=0.6");
    },
    { dependencies: [ready], scope: sectionRef },
  );

  // Parallax out on scroll. Start values are explicit: the content mounts with
  // opacity 0 (revealed by the intro), so letting GSAP capture them would make
  // the scrub interpolate 0 -> 0.1 and the title could never come back.
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.fromTo(
        contentRef.current,
        { yPercent: 0, opacity: 1 },
        {
          yPercent: -22,
          opacity: 0.1,
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative flex min-h-svh flex-col justify-between overflow-hidden px-6 pb-8 pt-28 md:px-10"
    >
      <Suspense fallback={null}>
        <Background3D />
      </Suspense>

      <div ref={contentRef} className="relative z-10 flex flex-1 flex-col justify-center opacity-0">
        <p className="hero-meta translate-y-6 font-mono text-[11px] uppercase tracking-[0.35em] text-fog opacity-0 md:text-xs">
          {t.hero.role}
        </p>
        <h1 className="hero-title mt-6 font-display text-[clamp(3.4rem,13vw,12rem)] font-extrabold uppercase leading-[0.9] tracking-tight">
          Gabriel
          <br />
          <span className="text-outline">Marques</span>
        </h1>
        <p className="hero-meta mt-10 max-w-md translate-y-6 text-sm leading-relaxed text-fog opacity-0 md:text-base">
          {t.hero.tagline}
        </p>
      </div>

      <div className="relative z-10 flex items-end justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-fog md:text-[11px]">
        <span className="hero-meta translate-y-6 opacity-0">{t.hero.location}</span>
        <span className="hero-meta translate-y-6 opacity-0" aria-hidden>
          {t.hero.scroll}
        </span>
      </div>
    </section>
  );
}

import { useRef } from "react";
import { gsap, useGSAP } from "../lib/gsap";
import { prefersReducedMotion } from "../utils/motion";
import { useLanguage } from "../i18n";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const { t } = useLanguage();
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set(rootRef.current, { display: "none" });
        onComplete();
        return;
      }

      const counter = { value: 0 };
      const tl = gsap.timeline();

      tl.to(".preloader-label", { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" })
        .to(
          counter,
          {
            value: 100,
            duration: 2.1,
            ease: "power2.inOut",
            onUpdate: () => {
              if (counterRef.current) {
                counterRef.current.textContent = String(Math.round(counter.value)).padStart(3, "0");
              }
            },
          },
          "<",
        )
        .to([".preloader-label", ".preloader-counter"], {
          yPercent: -120,
          opacity: 0,
          duration: 0.5,
          ease: "power3.in",
          stagger: 0.05,
        })
        .add(() => onComplete())
        .to(rootRef.current, { yPercent: -100, duration: 1, ease: "power4.inOut" }, "-=0.1")
        .set(rootRef.current, { display: "none" });
    },
    { scope: rootRef },
  );

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="fixed inset-0 z-[100] flex items-end justify-between bg-ink px-6 pb-6 md:px-10 md:pb-10"
    >
      <div className="overflow-hidden">
        <p className="preloader-label translate-y-6 font-mono text-[11px] uppercase tracking-[0.3em] text-fog opacity-0">
          {t.preloader}
        </p>
      </div>
      <div className="overflow-hidden">
        <span className="preloader-counter block font-display text-7xl font-extrabold leading-none text-paper md:text-9xl">
          <span ref={counterRef}>000</span>
        </span>
      </div>
    </div>
  );
}

import { useRef } from "react";
import { gsap, useGSAP } from "../../lib/gsap";
import { prefersReducedMotion } from "../../utils/motion";
import { useLanguage } from "../../i18n";

function MarqueeRow({ items, reverse }: { items: string[]; reverse: boolean }) {
  return (
    <div className="marquee-row flex overflow-hidden border-t border-line py-5 md:py-7">
      <div className={`flex w-max animate-marquee ${reverse ? "[animation-direction:reverse]" : ""}`}>
        {[0, 1].map((half) => (
          <div key={half} className="flex items-center gap-8 px-4 md:gap-14 md:px-7" aria-hidden={half === 1}>
            {items.map((item, i) => (
              <span key={item} className="flex items-center gap-8 whitespace-nowrap md:gap-14">
                <span
                  className={`font-display text-5xl font-bold uppercase tracking-tight md:text-7xl ${
                    i % 2 ? "text-outline" : ""
                  }`}
                >
                  {item}
                </span>
                <span className="text-xl text-accent md:text-2xl">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TechStack() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      // Subtle skew driven by scroll velocity, for a kinetic feel.
      const proxy = { skew: 0 };
      const skewSetter = gsap.quickSetter(".marquee-group", "skewY", "deg");

      const st = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const skew = gsap.utils.clamp(-4, 4, self.getVelocity() / -400);
            if (Math.abs(skew) > Math.abs(proxy.skew)) {
              proxy.skew = skew;
              gsap.to(proxy, {
                skew: 0,
                duration: 0.8,
                ease: "power3",
                overwrite: true,
                onUpdate: () => skewSetter(proxy.skew),
              });
            }
          },
        },
      });
      return () => {
        st.kill();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} id="stack" className="relative py-32 md:py-48">
      <div className="mb-14 px-6 md:mb-20 md:px-10">
        <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.35em] text-accent">{t.stack.eyebrow}</p>
        <h2 className="font-display text-4xl font-bold uppercase leading-[1.02] tracking-tight md:text-6xl">
          {t.stack.title}
        </h2>
      </div>

      <div className="marquee-group border-b border-line">
        {t.stack.rows.map((row, i) => (
          <MarqueeRow key={i} items={row} reverse={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}

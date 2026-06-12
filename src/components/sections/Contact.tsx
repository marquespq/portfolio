import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "../../lib/gsap";
import { prefersReducedMotion } from "../../utils/motion";
import { EMAIL, SOCIALS } from "../../data/content";
import { scrollToSection } from "../../lib/lenis";
import { useLanguage } from "../../i18n";
import Magnetic from "../Magnetic";

export default function Contact() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      const split = new SplitText(".contact-title", { type: "lines", mask: "lines" });
      gsap.from(split.lines, {
        yPercent: 110,
        duration: 1.1,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
      });

      gsap.from(".contact-reveal", {
        y: 32,
        opacity: 0,
        stagger: 0.1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 55%", once: true },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative flex min-h-svh flex-col justify-between border-t border-line px-6 pb-8 pt-32 md:px-10 md:pt-44"
    >
      <div>
        <p className="mb-5 font-mono text-[11px] uppercase tracking-[0.35em] text-accent">{t.contact.eyebrow}</p>
        <h2 className="contact-title font-display text-[clamp(2.6rem,9vw,9rem)] font-extrabold uppercase leading-[0.95] tracking-tight">
          {t.contact.title1}
          <br />
          <span className="text-outline">{t.contact.titleOutline}</span> {t.contact.title2}
        </h2>

        <div className="contact-reveal mt-14 md:mt-20">
          <Magnetic strength={0.4} className="inline-block">
            <a
              href={`mailto:${EMAIL}`}
              data-cursor="hover"
              className="flex h-36 w-36 items-center justify-center rounded-full border border-line bg-surface text-center font-mono text-[11px] uppercase leading-relaxed tracking-[0.2em] transition-colors duration-500 hover:bg-accent hover:text-ink md:h-44 md:w-44"
            >
              {t.contact.cta}
              <br />→
            </a>
          </Magnetic>
          <p className="mt-8 font-mono text-xs uppercase tracking-[0.25em] text-fog">{EMAIL}</p>
        </div>
      </div>

      <footer className="contact-reveal mt-24 border-t border-line pt-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <ul className="flex gap-7">
            {SOCIALS.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="hover"
                  className="font-mono text-[11px] uppercase tracking-[0.25em] text-fog transition-colors duration-300 hover:text-accent"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fog/60">{t.contact.copyright}</p>
          <button
            onClick={() => scrollToSection("#home")}
            data-cursor="hover"
            className="self-start font-mono text-[11px] uppercase tracking-[0.25em] text-fog transition-colors duration-300 hover:text-accent md:self-auto"
          >
            {t.contact.backToTop}
          </button>
        </div>
      </footer>
    </section>
  );
}

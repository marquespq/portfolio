import { useRef, useState } from "react";
import { gsap, useGSAP } from "../lib/gsap";
import { getLenis, scrollToSection } from "../lib/lenis";
import { useLanguage, type Locale } from "../i18n";

export default function Navbar({ ready }: { ready: boolean }) {
  const { lang, setLang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ready) return;
      gsap.to(headerRef.current, { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 });
    },
    { dependencies: [ready] },
  );

  useGSAP(
    () => {
      const overlay = overlayRef.current;
      if (!overlay) return;
      if (open) {
        getLenis()?.stop();
        gsap
          .timeline()
          .set(overlay, { pointerEvents: "auto" })
          .to(overlay, { clipPath: "inset(0% 0 0% 0)", duration: 0.8, ease: "power4.inOut" })
          .fromTo(
            ".menu-link",
            { yPercent: 120 },
            { yPercent: 0, stagger: 0.06, duration: 0.7, ease: "power3.out" },
            "-=0.35",
          );
      } else {
        getLenis()?.start();
        gsap
          .timeline()
          .to(overlay, { clipPath: "inset(0 0 100% 0)", duration: 0.7, ease: "power4.inOut" })
          .set(overlay, { pointerEvents: "none" });
      }
    },
    { dependencies: [open] },
  );

  const handleNav = (href: string) => {
    setOpen(false);
    getLenis()?.start();
    scrollToSection(href);
  };

  const changeLang = (next: Locale) => {
    setOpen(false);
    getLenis()?.start();
    setLang(next);
  };

  const langToggle = (
    <div className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em]" aria-label="Language">
      {(["en", "pt"] as const).map((locale, i) => (
        <span key={locale} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-paper/30">/</span>}
          <button
            onClick={() => changeLang(locale)}
            data-cursor="hover"
            aria-pressed={lang === locale}
            className={`transition-colors duration-300 ${
              lang === locale ? "text-accent" : "text-paper/50 hover:text-paper"
            }`}
          >
            {locale.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );

  return (
    <>
      <header ref={headerRef} className="fixed inset-x-0 top-0 z-[60] -translate-y-6 opacity-0 mix-blend-difference">
        <nav className="flex items-center justify-between px-6 py-5 md:px-10" aria-label="Main navigation">
          <button
            onClick={() => handleNav("#home")}
            data-cursor="hover"
            className="font-display text-lg font-bold tracking-tight text-paper"
            aria-label={t.nav.logoAria}
          >
            GBM<span className="text-accent">©</span>
          </button>

          <div className="flex items-center gap-8">
            <ul className="hidden items-center gap-8 lg:flex">
              {t.nav.links.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNav(link.href)}
                    data-cursor="hover"
                    className="font-mono text-[11px] uppercase tracking-[0.25em] text-paper transition-colors duration-300 hover:text-accent"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>

            {langToggle}

            <button
              onClick={() => setOpen((v) => !v)}
              data-cursor="hover"
              className="font-mono text-[11px] uppercase tracking-[0.25em] text-paper lg:hidden"
              aria-expanded={open}
              aria-controls="menu-overlay"
            >
              {open ? t.nav.close : t.nav.menu}
            </button>
          </div>
        </nav>
      </header>

      <div
        id="menu-overlay"
        ref={overlayRef}
        className="pointer-events-none fixed inset-0 z-[55] bg-surface"
        style={{ clipPath: "inset(0 0 100% 0)" }}
      >
        <nav className="flex h-full flex-col justify-center gap-3 px-8" aria-label="Menu">
          {t.nav.links.map((link, i) => (
            <div key={link.href} className="overflow-hidden py-1">
              <button
                onClick={() => handleNav(link.href)}
                className="menu-link flex items-baseline gap-4 font-display text-5xl font-bold uppercase leading-none text-paper"
              >
                <span className="font-mono text-sm font-normal text-accent">0{i + 1}</span>
                {link.label}
              </button>
            </div>
          ))}
        </nav>
      </div>
    </>
  );
}

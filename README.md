# Gabriel Borba Marques — Portfolio

Awwwards-style dark portfolio built with React, TypeScript, Tailwind CSS, GSAP (ScrollTrigger + SplitText), Lenis and React Three Fiber.

## Getting started

```bash
npm install
npm run dev      # local dev server
npm run build    # typecheck + production build
npm run preview  # serve the production build
```

## Structure

```
src/
├── App.tsx                  # Lenis smooth scroll + section composition
├── i18n/
│   ├── index.tsx            # LanguageProvider + useLanguage (EN / PT-BR, persisted)
│   └── locales/             # en.ts and pt.ts — all translatable copy
├── data/content.ts          # Language-independent data: e-mail and social links
├── lib/
│   ├── gsap.ts              # GSAP plugin registration (ScrollTrigger, SplitText, useGSAP)
│   └── lenis.ts             # Lenis singleton + scrollToSection helper
├── hooks/useMagnetic.ts     # Magnetic hover effect
├── utils/motion.ts          # Reduced-motion / touch detection
└── components/
    ├── Preloader.tsx        # Counter preloader with curtain exit
    ├── CustomCursor.tsx     # Dot + trailing ring cursor (data-cursor states)
    ├── Navbar.tsx           # Fixed nav + fullscreen mobile menu
    ├── Magnetic.tsx         # Magnetic wrapper component
    ├── SectionHeading.tsx   # Reusable masked-line heading reveal
    ├── three/Background3D.tsx  # Interactive GPU particle field (R3F + custom shader)
    └── sections/            # Hero, About, Expertise, Work, Experience, TechStack, Contact
```

## Customizing

- **Copy & projects**: edit both [src/i18n/locales/en.ts](src/i18n/locales/en.ts) and [src/i18n/locales/pt.ts](src/i18n/locales/pt.ts) (same shape, enforced by TypeScript). E-mail and social links live in [src/data/content.ts](src/data/content.ts).
- **Language**: detected from the browser on first visit, persisted in `localStorage`, toggleable via the EN/PT switch in the navbar.
- **Colors & fonts**: design tokens in the `@theme` block of [src/index.css](src/index.css). Accent color is also used in [CustomCursor.tsx](src/components/CustomCursor.tsx) and [Background3D.tsx](src/components/three/Background3D.tsx) (hardcoded for GSAP/shader use).
- **Motion**: every animation respects `prefers-reduced-motion`; heavy effects (cursor, magnetic, pinning) are disabled on touch devices automatically.

## Performance notes

- Particle count adapts to viewport (3200 desktop / 1400 mobile), DPR capped at 1.75, additive-blend shader with no per-frame allocations.
- Lenis is driven by GSAP's ticker so ScrollTrigger and smooth scroll never fight.
- All scroll reveals use `once: true` where possible to free triggers after they fire.

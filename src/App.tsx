import { useEffect, useState } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./lib/gsap";
import { setLenis, getLenis } from "./lib/lenis";
import { useLanguage } from "./i18n";
import Preloader from "./components/Preloader";
import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Expertise from "./components/sections/Expertise";
import Work from "./components/sections/Work";
import Experience from "./components/sections/Experience";
import TechStack from "./components/sections/TechStack";
import Contact from "./components/sections/Contact";

export default function App() {
  const [ready, setReady] = useState(false);
  const { lang } = useLanguage();

  // Smooth scroll driven by GSAP's ticker so ScrollTrigger stays in sync.
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    setLenis(lenis);
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    document.fonts.ready.then(() => ScrollTrigger.refresh());

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  // Keep the page locked while the preloader is running.
  useEffect(() => {
    const lenis = getLenis();
    if (!lenis) return;
    if (ready) lenis.start();
    else lenis.stop();
  }, [ready]);

  // Recompute trigger positions after a language switch changes the layout.
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [lang]);

  return (
    <>
      <Preloader onComplete={() => setReady(true)} />
      <CustomCursor />
      <div className="grain" aria-hidden />
      {/* SplitText mutates text nodes, so a language switch remounts the tree
          to re-split and rebuild every ScrollTrigger cleanly. */}
      <div key={lang}>
        <Navbar ready={ready} />
        <main>
          <Hero ready={ready} />
          <About />
          <Expertise />
          <Work />
          <Experience />
          <TechStack />
          <Contact />
        </main>
      </div>
    </>
  );
}

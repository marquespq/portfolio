import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { isTouchDevice } from "../utils/motion";

/**
 * Custom cursor: a small dot that tracks the pointer tightly and a ring that
 * trails it. Elements opt into states via `data-cursor="hover"` (ring grows)
 * or `data-cursor="view"` (ring becomes an accent badge with a label,
 * customizable via `data-cursor-text`).
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label || isTouchDevice()) return;

    document.body.classList.add("has-custom-cursor");
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

    const dotX = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power2.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power2.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    let visible = false;
    const onMove = (e: MouseEvent) => {
      if (!visible) {
        visible = true;
        gsap.set([dot, ring], { x: e.clientX, y: e.clientY });
        gsap.to([dot, ring], { autoAlpha: 1, duration: 0.3 });
      }
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const onLeaveWindow = () => {
      visible = false;
      gsap.to([dot, ring], { autoAlpha: 0, duration: 0.3 });
    };

    const reset = () => {
      gsap.to(ring, { scale: 1, backgroundColor: "rgba(0,0,0,0)", duration: 0.35, ease: "power3.out" });
      gsap.to(label, { autoAlpha: 0, duration: 0.2 });
      gsap.to(dot, { autoAlpha: 1, scale: 1, duration: 0.2 });
    };

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest?.("[data-cursor]") as HTMLElement | null;
      if (!target) return;
      if (target.dataset.cursor === "view") {
        label.textContent = target.dataset.cursorText ?? "View";
        gsap.to(ring, { scale: 3.4, backgroundColor: "rgba(233,138,60,0.95)", duration: 0.4, ease: "power3.out" });
        gsap.to(label, { autoAlpha: 1, duration: 0.3 });
        gsap.to(dot, { autoAlpha: 0, duration: 0.2 });
      } else {
        gsap.to(ring, { scale: 1.8, duration: 0.35, ease: "power3.out" });
        gsap.to(dot, { scale: 0.5, duration: 0.25 });
      }
    };

    const onOut = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest?.("[data-cursor]") as HTMLElement | null;
      if (!target) return;
      if (e.relatedTarget && target.contains(e.relatedTarget as Node)) return;
      reset();
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeaveWindow);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeaveWindow);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[95] h-1.5 w-1.5 rounded-full bg-paper opacity-0"
      />
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[95] flex h-10 w-10 items-center justify-center rounded-full border border-paper/40 opacity-0"
      >
        <span ref={labelRef} className="font-mono text-[9px] uppercase tracking-widest text-ink opacity-0">
          View
        </span>
      </div>
    </>
  );
}

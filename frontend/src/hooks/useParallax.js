import { useEffect, useRef } from "react";

/**
 * useParallax — binds a scroll listener and applies a translateY
 * proportional to how far the element is from the viewport centre.
 *
 * @param {number} speed   — 0 = locked, 0.2 = subtle, 0.5 = strong, negative = opposite direction
 * @param {string} axis    — "y" | "x"
 */
export function useParallax(speed = 0.2, axis = "y") {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    let ticking = false;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const viewH = window.innerHeight;
      // offset from viewport centre
      const offset = rect.top + rect.height / 2 - viewH / 2;
      const move = offset * speed;
      el.style.transform =
        axis === "x" ? `translateX(${move}px)` : `translateY(${move}px)`;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    el.style.willChange = "transform";
    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => window.removeEventListener("scroll", onScroll);
  }, [speed, axis]);

  return ref;
}

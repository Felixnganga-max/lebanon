import { useEffect, useRef, useState } from "react";

/**
 * useScrollProgress — returns a `progress` value 0→1 as the element
 * travels through the viewport. Useful for scroll-driven CSS/JS animations.
 *
 * progress = 0 when element bottom touches viewport bottom
 * progress = 1 when element top touches viewport top
 */
export function useScrollProgress() {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      setProgress(1);
      return;
    }

    let ticking = false;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const viewH = window.innerHeight;
      // 0 when element enters from bottom, 1 when it leaves from top
      const raw = 1 - rect.bottom / (viewH + rect.height);
      setProgress(Math.min(1, Math.max(0, raw)));
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return [ref, progress];
}

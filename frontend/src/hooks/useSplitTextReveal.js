import { useEffect, useRef } from "react";

/**
 * useSplitTextReveal — splits element's text into word-spans
 * and reveals them with a staggered clip-path + translateY animation
 * when the element enters the viewport.
 *
 * @param {{ delay?: number, staggerMs?: number, threshold?: number }} options
 */
export function useSplitTextReveal({
  delay = 0,
  staggerMs = 40,
  threshold = 0.2,
} = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const original = el.innerHTML;
    const words = el.innerText.trim().split(/\s+/);

    // Wrap each word in an overflow-hidden span to clip the rising child
    el.innerHTML = words
      .map(
        (w) =>
          `<span style="display:inline-block;overflow:hidden;vertical-align:bottom;"><span class="word-inner" style="display:inline-block;transform:translateY(110%);opacity:0;will-change:transform,opacity;">${w}</span></span>`,
      )
      .join(" ");

    const inners = el.querySelectorAll(".word-inner");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          inners.forEach((inner, i) => {
            const d = delay + i * staggerMs;
            inner.style.transition = `transform 0.75s cubic-bezier(0.16,1,0.3,1) ${d}ms, opacity 0.6s ease ${d}ms`;
            requestAnimationFrame(() => {
              inner.style.transform = "translateY(0)";
              inner.style.opacity = "1";
            });
          });
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -30px 0px" },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      el.innerHTML = original;
    };
  }, [delay, staggerMs, threshold]);

  return ref;
}

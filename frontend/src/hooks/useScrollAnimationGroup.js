import { useEffect, useRef } from "react";

export function useScrollAnimationGroup({
  staggerMs = 90,
  threshold = 0.1,
  animVars,
} = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const children = [...container.children];

    if (prefersReduced) {
      children.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      return;
    }

    children.forEach((el) => {
      const v = animVars || {};
      el.style.opacity = v.op || "0";
      el.style.transform = `translateX(${v.tx || "0px"}) translateY(${v.ty || "40px"}) rotate(${v.ro || "0deg"}) scale(${v.sc || "1"})`;
      el.style.willChange = "opacity, transform";
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          children.forEach((el, i) => {
            const d = i * staggerMs;
            el.style.transition = `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${d}ms, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${d}ms`;
            setTimeout(() => {
              el.style.opacity = "1";
              el.style.transform =
                "translateX(0) translateY(0) rotate(0deg) scale(1)";
            }, d);
          });
          observer.unobserve(container);
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [staggerMs, threshold]);

  return ref;
}

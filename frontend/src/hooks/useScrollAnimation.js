import { useEffect, useRef } from "react";

export function useScrollAnimation({ delay = 0, threshold = 0.12 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) {
      el.style.opacity = "1";
      el.style.transform = "none";
      return;
    }

    const computed = getComputedStyle(el);
    const tx = computed.getPropertyValue("--anim-tx").trim() || "0px";
    const ty = computed.getPropertyValue("--anim-ty").trim() || "0px";
    const op = computed.getPropertyValue("--anim-op").trim() || "0";
    const sc = computed.getPropertyValue("--anim-sc").trim() || "1";
    const ro = computed.getPropertyValue("--anim-ro").trim() || "0deg";

    el.style.opacity = op;
    el.style.transform = `translateX(${tx}) translateY(${ty}) rotate(${ro}) scale(${sc})`;
    el.style.transition = `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`;
    el.style.willChange = "opacity, transform";

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform =
            "translateX(0) translateY(0) rotate(0deg) scale(1)";
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay, threshold]);

  return ref;
}

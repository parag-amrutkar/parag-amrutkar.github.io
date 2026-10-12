import { useLayoutEffect } from "react";

/**
 * Marks [data-reveal] elements as they enter the viewport.
 *
 * The resting state in CSS is visible. This hook only opts into motion when
 * the visitor has not asked for reduced motion, and it marks anything already
 * on screen before the browser paints. A hidden default would blank the first
 * paint, and it would stay blank with JavaScript off.
 */
const applyDelay = (node) => {
  const delay = node.getAttribute("data-reveal-delay");
  if (!delay) return;
  node.style.transitionDelay = `${Number(delay)}ms`;
};

const reveal = (node) => {
  node.classList.add("is-revealed");
  if (!node.style.transitionDelay) return;
  const clearDelay = (event) => {
    if (event.target !== node) return;
    node.style.transitionDelay = "";
    node.removeEventListener("transitionend", clearDelay);
  };
  node.addEventListener("transitionend", clearDelay);
};

const inFirstPaint = (node) => {
  const rect = node.getBoundingClientRect();
  return rect.bottom > 0 && rect.top < window.innerHeight;
};

const useReveal = (deps = []) => {
  useLayoutEffect(() => {
    const nodes = [...document.querySelectorAll("[data-reveal]:not(.is-revealed)")];
    if (!nodes.length) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof IntersectionObserver === "undefined") {
      nodes.forEach(reveal);
      return undefined;
    }

    const pending = new Set();
    nodes.forEach((node) => {
      if (inFirstPaint(node)) {
        reveal(node);
        return;
      }
      applyDelay(node);
      pending.add(node);
    });

    if (!pending.size) return undefined;

    document.documentElement.classList.add("reveal-pending");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          pending.delete(entry.target);
          reveal(entry.target);
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 }
    );

    pending.forEach((node) => observer.observe(node));

    let sweepFrame = 0;
    const revealIfAbove = () => {
      pending.forEach((node) => {
        if (node.getBoundingClientRect().bottom < 0) {
          observer.unobserve(node);
          pending.delete(node);
          reveal(node);
        }
      });
    };

    const sweep = () => {
      sweepFrame = 0;
      revealIfAbove();
      if (!pending.size) stop();
    };

    const onScroll = () => {
      if (!sweepFrame) sweepFrame = requestAnimationFrame(sweep);
    };

    const stop = () => {
      window.removeEventListener("scroll", onScroll);
      if (sweepFrame) cancelAnimationFrame(sweepFrame);
      observer.disconnect();
      document.documentElement.classList.remove("reveal-pending");
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    revealIfAbove();
    if (!pending.size) {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
      document.documentElement.classList.remove("reveal-pending");
      return undefined;
    }
    return stop;
  }, deps);
};

export default useReveal;

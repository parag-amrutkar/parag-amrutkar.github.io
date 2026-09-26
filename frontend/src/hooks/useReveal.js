import { useEffect } from "react";

/**
 * Adds `is-revealed` to every [data-reveal] element as it scrolls into view.
 *
 * An IntersectionObserver rather than a motion library: the brief (§13) asks
 * that dependencies not be added for behaviour the current stack handles.
 *
 * The reduced-motion branch marks everything revealed immediately rather than
 * skipping setup, because the resting state is opacity 0 -- bailing out early
 * would leave the page blank for exactly the users least able to tolerate it.
 */
const applyDelay = (node, reduced) => {
  const delay = node.getAttribute("data-reveal-delay");
  if (!delay || reduced) return;
  node.style.transitionDelay = `${Number(delay)}ms`;
};

/**
 * The delay has to be on the element while the reveal transition runs, and
 * gone afterwards. Leaving it inline would also postpone hover transitions
 * on the same node (a card with a 240ms cascade would hesitate before it lifts).
 */
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

const useReveal = (deps = []) => {
  useEffect(() => {
    const pending = new Set(
      document.querySelectorAll("[data-reveal]:not(.is-revealed)")
    );
    if (!pending.size) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    pending.forEach((node) => applyDelay(node, reduced));

    if (reduced || typeof IntersectionObserver === "undefined") {
      pending.forEach(reveal);
      return undefined;
    }

    // Above-the-fold hero copy never reliably intersects: the root is shrunk
    // by the bottom margin, and a mount-time reveal is what the entrance
    // needs anyway. Drive those from the next frames so the hidden state
    // paints before `.is-revealed` starts the transition.
    const mounted = [];
    pending.forEach((node) => {
      if (!node.hasAttribute("data-reveal-on-mount")) return;
      mounted.push(node);
      pending.delete(node);
    });

    let frame = 0;
    let second = 0;
    if (mounted.length) {
      frame = requestAnimationFrame(() => {
        second = requestAnimationFrame(() => {
          mounted.forEach(reveal);
        });
      });
    }

    if (!pending.size) {
      return () => {
        if (frame) cancelAnimationFrame(frame);
        if (second) cancelAnimationFrame(second);
      };
    }

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

    /**
     * Safety net for instant scroll jumps -- an in-page anchor, browser scroll
     * restoration on back-navigation, or the End key. Those move an element
     * from below the viewport to above it inside a single frame, so
     * `isIntersecting` never becomes true and the observer never fires. The
     * element would then stay at opacity 0 permanently, which is a far worse
     * outcome than a missed animation.
     */
    let sweepFrame = 0;
    const sweep = () => {
      sweepFrame = 0;
      pending.forEach((node) => {
        if (node.getBoundingClientRect().bottom < 0) {
          observer.unobserve(node);
          pending.delete(node);
          reveal(node);
        }
      });
      if (!pending.size) stop();
    };

    const onScroll = () => {
      if (!sweepFrame) sweepFrame = requestAnimationFrame(sweep);
    };

    const stop = () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
      if (second) cancelAnimationFrame(second);
      if (sweepFrame) cancelAnimationFrame(sweepFrame);
      observer.disconnect();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return stop;
  }, deps);
};

export default useReveal;

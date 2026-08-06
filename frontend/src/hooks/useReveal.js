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
const useReveal = (deps = []) => {
  useEffect(() => {
    const pending = new Set(
      document.querySelectorAll("[data-reveal]:not(.is-revealed)")
    );
    if (!pending.size) return undefined;

    const reveal = (node) => {
      node.classList.add("is-revealed");
      pending.delete(node);
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced || typeof IntersectionObserver === "undefined") {
      pending.forEach(reveal);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
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
    let frame = 0;
    const sweep = () => {
      frame = 0;
      pending.forEach((node) => {
        if (node.getBoundingClientRect().bottom < 0) {
          observer.unobserve(node);
          reveal(node);
        }
      });
      if (!pending.size) stop();
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(sweep);
    };

    const stop = () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return stop;
  }, deps);
};

export default useReveal;

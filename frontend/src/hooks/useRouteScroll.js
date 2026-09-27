import { useLayoutEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

/**
 * Scroll position for client-side navigations.
 *
 * A new page opens at the top. A repeat click on the page already open
 * returns to the top. A hash lands on that element. Browser back/forward
 * restores the position saved for that history entry.
 *
 * `scroll-behavior: smooth` on `html` would animate a normal `scrollTo`
 * from the previous page's offset. Assigning `scrollTop` jumps immediately.
 */
const scrollToY = (top) => {
  const root = document.documentElement;
  const previous = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  root.scrollTop = top;
  document.body.scrollTop = top;
  root.style.scrollBehavior = previous;
};

const scrollToTop = () => {
  scrollToY(0);
};

const hashId = (hash) => {
  const raw = hash.slice(1);
  if (!raw) return "";
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
};

const scrollToHash = (hash) => {
  const id = hashId(hash);
  const target = id ? document.getElementById(id) : null;
  if (!target) {
    scrollToTop();
    return;
  }
  const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
  const top = window.scrollY + target.getBoundingClientRect().top - margin;
  scrollToY(Math.max(0, top));
};

const isPlainLeftClick = (event) => (
  event.button === 0
  && !event.metaKey
  && !event.altKey
  && !event.ctrlKey
  && !event.shiftKey
);

const inAppUrl = (event) => {
  if (!isPlainLeftClick(event)) return null;
  const anchor = event.target instanceof Element
    ? event.target.closest("a[href]")
    : null;
  if (!anchor || anchor.hasAttribute("download")) return null;
  const target = anchor.getAttribute("target");
  if (target && target !== "_self") return null;
  const href = anchor.getAttribute("href");
  if (!href || href.startsWith("mailto:") || href.startsWith("tel:")) return null;

  let url;
  try {
    url = new URL(anchor.href, window.location.href);
  } catch {
    return null;
  }
  if (url.origin !== window.location.origin) return null;
  return url;
};

const useRouteScroll = () => {
  const location = useLocation();
  const navigationType = useNavigationType();
  const positions = useRef(new Map());
  const locationKey = useRef(location.key);
  const latestScroll = useRef(0);
  const scrollListener = useRef(null);

  locationKey.current = location.key;

  useLayoutEffect(() => {
    if (!("scrollRestoration" in window.history)) return undefined;
    window.history.scrollRestoration = "manual";
    return () => {
      window.history.scrollRestoration = "auto";
    };
  }, []);

  useLayoutEffect(() => {
    const rememberScroll = () => {
      latestScroll.current = window.scrollY;
      positions.current.set(locationKey.current, latestScroll.current);
      // Drop the listener before React commits the next page. A shorter
      // document clamps scrollY during that commit, and the clamp event
      // would otherwise overwrite the position we need for Back.
      if (!scrollListener.current) return;
      window.removeEventListener("scroll", scrollListener.current);
      scrollListener.current = null;
    };

    const onClick = (event) => {
      const url = inAppUrl(event);
      if (!url) return;

      const samePath = url.pathname === window.location.pathname;
      if (!samePath) {
        rememberScroll();
        return;
      }

      // Same document: React Router will not change location, so the
      // effect below will not run.
      event.preventDefault();
      if (url.hash) scrollToHash(url.hash);
      else scrollToTop();
    };

    const onPopState = () => {
      rememberScroll();
    };

    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", onPopState, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onPopState, true);
    };
  }, []);

  useLayoutEffect(() => {
    const key = location.key;

    if (navigationType === "POP") {
      const top = positions.current.get(key) ?? 0;
      scrollToY(top);
      latestScroll.current = top;
    } else if (location.hash) {
      scrollToHash(location.hash);
      latestScroll.current = window.scrollY;
    } else {
      scrollToTop();
      latestScroll.current = 0;
    }
    positions.current.set(key, latestScroll.current);

    const onScroll = () => {
      latestScroll.current = window.scrollY;
      positions.current.set(key, latestScroll.current);
    };
    scrollListener.current = onScroll;
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollListener.current === onScroll) scrollListener.current = null;
      positions.current.set(key, latestScroll.current);
    };
  }, [location.hash, location.key, navigationType]);
};

const RouteScroll = () => {
  useRouteScroll();
  return null;
};

export default RouteScroll;

import React from "react";
import "./Marginalia.css";

/**
 * A margin annotation on a curved leader line.
 *
 * Deliberately NOT aria-hidden. These carry real authorial voice ("kept, not
 * hidden"), so hiding them would withhold content from screen-reader users
 * for no reason. Only the leader stroke is decorative.
 *
 * `side` says which edge the leader hangs off, i.e. which way it points at
 * the thing being annotated.
 */
const Marginalia = ({ children, side = "left", className = "" }) => (
  <aside className={`marginalia marginalia-${side} ${className}`.trim()}>
    <svg
      className="marginalia-leader"
      viewBox="0 0 52 38"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      {/* Two overlapping arcs with slightly different curvature read as a
          drawn line rather than a geometric one. */}
      <path
        d="M4 35.5 C 3.2 20, 11 9.5, 30.5 5.2 C 38 3.6, 44 3.1, 49 3"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path
        d="M44.6 0.9 L 49.4 3 L 44.8 5.6"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
    <span className="marginalia-text">{children}</span>
  </aside>
);

export default Marginalia;

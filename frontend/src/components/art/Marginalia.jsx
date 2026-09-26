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
 * the thing being annotated. `aim="across"` swaps the rising arc for a level
 * leader when the note sits beside its subject rather than above it.
 */
const ArcLeader = () => (
  <svg
    className="marginalia-leader marginalia-leader-arc"
    viewBox="0 0 52 38"
    fill="none"
    aria-hidden="true"
    focusable="false"
  >
    {/* Two overlapping arcs with slightly different curvature read as a
        drawn line rather than a geometric one. Arrowhead sits at the
        upper right; left-side notes mirror the svg so it still lands
        on the thing being annotated. */}
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
);

const AcrossLeader = () => (
  <svg
    className="marginalia-leader marginalia-leader-across"
    viewBox="0 0 52 38"
    fill="none"
    aria-hidden="true"
    focusable="false"
  >
    {/* Same convention as the arc: the head points right, and a left-side
        note mirrors it so the arrow meets the neighboring card. */}
    <path
      d="M4 19 C 16 17.2, 30 20.6, 44 19"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
    />
    <path
      d="M39.2 15.1 L 45.2 19 L 39.2 22.9"
      stroke="currentColor"
      strokeWidth="1.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Marginalia = ({ children, side = "left", aim = "up", className = "", ...rest }) => (
  <aside
    className={`marginalia marginalia-${side} ${aim === "across" ? "marginalia-aim-across" : ""} ${className}`.trim()}
    {...rest}
  >
    <ArcLeader />
    {aim === "across" && <AcrossLeader />}
    <span className="marginalia-text">{children}</span>
  </aside>
);

export default Marginalia;

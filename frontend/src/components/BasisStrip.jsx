import React from "react";

/**
 * A three-segment key showing what an entry's claims rest on.
 *
 * Brief §6.4 requires distinguishing sourced fact from interpretation, and
 * today that distinction lives only in prose ("Limitation: ... does not
 * retain a source list"). This surfaces it as structure.
 *
 * IMPORTANT: nothing here is asserted. `sourceCount` is read straight from
 * the entry's `sources` array, so "sourced" is marked present only when
 * sources actually exist. The other two segments are described, never
 * measured -- deciding which specific claims in an entry are inference
 * versus opinion is an owner judgement (brief §17), not something to infer
 * from the shape of the data.
 */
const LEVELS = [
  {
    id: "sourced",
    label: "Sourced",
    hint: "Traceable to a cited source"
  },
  {
    id: "inferred",
    label: "Inferred",
    hint: "Reasoned from the above"
  },
  {
    id: "opinion",
    label: "Opinion",
    hint: "Parag's own judgement"
  }
];

const BasisStrip = ({ sourceCount = 0 }) => (
  <div className="basis-strip">
    <span className="basis-title">Basis</span>
    <ul className="basis-levels">
      {LEVELS.map((level) => {
        const absent = level.id === "sourced" && sourceCount === 0;
        return (
          <li
            key={level.id}
            className={`basis-level basis-${level.id}${absent ? " basis-absent" : ""}`}
          >
            <span className="basis-mark" aria-hidden="true" />
            <span className="basis-label">{level.label}</span>
            <span className="basis-hint">{level.hint}</span>
          </li>
        );
      })}
    </ul>
    <p className="basis-note">
      {sourceCount === 0
        ? "No source list is retained for this entry, so nothing here is presented as sourced fact."
        : `${sourceCount} source${sourceCount === 1 ? "" : "s"} cited below.`}
    </p>
  </div>
);

export default BasisStrip;

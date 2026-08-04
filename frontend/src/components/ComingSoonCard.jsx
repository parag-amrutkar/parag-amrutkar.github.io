import React from "react";

const ComingSoonCard = ({ kind, compact = false }) => (
  <div className={`work-card work-card-ghost ${compact ? "work-card-compact" : ""}`} aria-hidden="true">
    <div className="work-card-topline">
      <span className="work-kind">More {kind}</span>
    </div>
    <div className="work-card-body">
      <h3>More {kind} in progress.</h3>
      <p>Additional entries will appear here once they&apos;re ready to share.</p>
    </div>
  </div>
);

export default ComingSoonCard;

import React from "react";
import WorkRow from "../components/WorkRow";
import { analyses, products } from "../data/portfolio";
import "../components/Work.css";
import "./WorkIndex.css";

const Work = () => {
  const items = [...products, ...analyses];

  return (
    <div className="work-page page-shell">
      <div className="container">
        <header className="page-intro work-intro stagger">
          <h2>Work Highlights</h2>
        </header>

        {items.length > 0 ? (
          <div className="work-list">
            {items.map((item, index) => (
              <WorkRow
                item={item}
                key={item.slug}
                to={`/work/project/${item.slug}`}
                showKind
                revealDelay={index ? index * 120 : 0}
              />
            ))}
          </div>
        ) : (
          <p className="empty-state">No public entries are available yet.</p>
        )}
      </div>
    </div>
  );
};

export default Work;

import React from "react";
import { Link } from "react-router-dom";
import Figure from "./art/Figure";

const WorkRow = ({ item, revealDelay = 0, to, showKind = false }) => {
  const isProduct = item.type === "product";
  const title = isProduct ? item.name : item.title;
  const path = to || (isProduct
    ? `/work/products/${item.slug}`
    : `/work/analysis/${item.slug}`);

  return (
    <article
      className="work-row"
      data-reveal
      data-reveal-delay={revealDelay || undefined}
    >
      <div className="work-row-copy">
        {showKind && (
          <p className={`work-kind work-kind-${item.type}`}>
            {isProduct ? "Product" : "Analysis"}
          </p>
        )}
        <h3><Link to={path}>{title}</Link></h3>
        <p>{item.summary}</p>
        <Link to={path} className="btn btn-secondary">
          View project
        </Link>
      </div>
      <Figure
        className="work-row-plate"
        name={item.plate || (isProduct ? "plate-product" : "plate-analysis")}
        ratio={item.plateRatio || "1 / 1"}
        width={1600}
        height={1600}
        alt={item.plateAlt || ""}
      />
    </article>
  );
};

export default WorkRow;

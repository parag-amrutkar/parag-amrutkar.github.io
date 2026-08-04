import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import StatusBadge from "./StatusBadge";

export const formatPortfolioDate = (value, precision) => {
  if (!value) return null;
  if (precision === "year" || /^\d{4}$/.test(value)) return `${value} (year only)`;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(new Date(`${value}T00:00:00`));
};

const WorkCard = ({ item, compact = false }) => {
  const isProduct = item.type === "product";
  const title = isProduct ? item.name : item.title;
  const path = isProduct
    ? `/work/products/${item.slug}`
    : `/work/analysis/${item.slug}`;

  return (
    <article className={`work-card work-card-${item.type} ${compact ? "work-card-compact" : ""}`}>
      <div className="work-card-topline">
        <span className="work-kind">{isProduct ? "Product" : "Analysis"}</span>
        <span className="work-card-index" aria-hidden="true">
          {isProduct ? "P" : "A"}
        </span>
      </div>
      <div className="work-card-body">
        <h3><Link to={path}>{title}</Link></h3>
        <p>{item.summary}</p>
      </div>
      <div className="work-card-meta">
        {isProduct ? (
          <StatusBadge status={item.status} />
        ) : (
          <span className="publication-date">
            Published {formatPortfolioDate(item.publishedAt, item.publishedPrecision)}
          </span>
        )}
      </div>
      {!compact && item.tags?.length > 0 && (
        <ul className="tag-list" aria-label={`${title} topics`}>
          {item.tags.map((tag) => <li key={tag}>{tag}</li>)}
        </ul>
      )}
      <Link className="card-link" to={path} aria-label={`View ${title}`}>
        View {isProduct ? "product" : "analysis"} <ArrowUpRight size={17} />
      </Link>
    </article>
  );
};

export default WorkCard;

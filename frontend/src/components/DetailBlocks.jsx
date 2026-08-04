import React from "react";
import { ExternalLink, FileText } from "lucide-react";

export const ContentSection = ({ title, children, className = "" }) => {
  if (!children) return null;
  return (
    <section className={`detail-section ${className}`.trim()}>
      <h2>{title}</h2>
      {children}
    </section>
  );
};

const CAVEAT_PREFIX = "Limitation:";

export const Paragraphs = ({ items }) => {
  if (!items?.length) return null;
  return items.map((item, index) => {
    const isCaveat = item.startsWith(CAVEAT_PREFIX);
    return (
      <p key={`${item.slice(0, 24)}-${index}`} className={isCaveat ? "caveat" : undefined}>
        {isCaveat ? (
          <><strong>{CAVEAT_PREFIX}</strong>{item.slice(CAVEAT_PREFIX.length)}</>
        ) : item}
      </p>
    );
  });
};

export const BulletList = ({ items }) => {
  if (!items?.length) return null;
  return (
    <ul className="detail-list">
      {items.map((item, index) => <li key={`${item.slice(0, 24)}-${index}`}>{item}</li>)}
    </ul>
  );
};

export const EvidenceBlocks = ({ items }) => {
  if (!items?.length) return null;
  return (
    <div className="evidence-list">
      {items.map((item, index) => (
        <div className="evidence-item" key={`${item.label}-${index}`}>
          {item.type === "image" && item.url ? (
            <img src={item.url} alt={item.alt || ""} />
          ) : (
            <FileText size={22} aria-hidden="true" />
          )}
          <div>
            <h3>{item.label}</h3>
            {item.description && <p>{item.description}</p>}
          </div>
        </div>
      ))}
    </div>
  );
};

export const SourceList = ({ sources }) => {
  if (!sources?.length) return null;
  return (
    <ol className="source-list">
      {sources.map((source) => (
        <li key={source.url}>
          <a href={source.url} target="_blank" rel="noreferrer">
            {source.title} <ExternalLink size={14} aria-hidden="true" />
          </a>
          <span>{source.publisher}{source.accessedAt ? ` · accessed ${source.accessedAt}` : ""}</span>
        </li>
      ))}
    </ol>
  );
};

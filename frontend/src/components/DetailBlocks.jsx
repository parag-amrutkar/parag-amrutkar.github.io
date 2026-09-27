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

const listItemKey = (item, index) => {
  const text = typeof item === "string" ? item : `${item.label} ${item.text}`;
  return `${text.slice(0, 24)}-${index}`;
};

export const BulletList = ({ items }) => {
  if (!items?.length) return null;
  return (
    <ul className="detail-list">
      {items.map((item, index) => (
        <li key={listItemKey(item, index)}>
          {typeof item === "string" ? item : (
            <><strong>{item.label}:</strong> {item.text}</>
          )}
        </li>
      ))}
    </ul>
  );
};

export const EvidenceBlocks = ({ items }) => {
  if (!items?.length) return null;
  return (
    <div className="evidence-list">
      {items.map((item, index) => {
        const isImage = item.type === "image" && item.url;
        const isLink = Boolean(item.url) && !isImage;
        return (
          <div className="evidence-item" key={`${item.label}-${index}`}>
            {isImage ? (
              <img src={item.url} alt={item.alt || ""} />
            ) : (
              <FileText size={22} aria-hidden="true" />
            )}
            <div>
              {isLink ? (
                <h3>
                  <a href={item.url} target="_blank" rel="noreferrer">
                    {item.label} <ExternalLink size={14} aria-hidden="true" />
                  </a>
                </h3>
              ) : (
                <h3>{item.label}</h3>
              )}
              {item.description && <p>{item.description}</p>}
            </div>
          </div>
        );
      })}
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

const sectionHasContent = (section) => {
  switch (section?.type) {
    case "paragraphs":
      return Boolean(section.items?.length || section.sources?.length);
    case "steps":
      return Boolean(section.steps?.length || section.body);
    case "quote":
      return Boolean(section.text);
    case "list":
      return Boolean(section.items?.length);
    case "sources":
      return Boolean(section.sources?.length);
    default:
      return false;
  }
};

const SectionBlock = ({ section }) => {
  if (!sectionHasContent(section)) return null;

  if (section.type === "paragraphs") {
    return (
      <ContentSection title={section.title}>
        <Paragraphs items={section.items} />
        <SourceList sources={section.sources} />
      </ContentSection>
    );
  }

  if (section.type === "steps") {
    return (
      <ContentSection title={section.title}>
        {section.steps?.length > 0 && (
          <ol className="how-steps">
            {section.steps.map((step, index) => (
              <li key={`${step}-${index}`}>
                <span>{step}</span>
                {index < section.steps.length - 1 && (
                  <span className="how-step-arrow" aria-hidden="true">→</span>
                )}
              </li>
            ))}
          </ol>
        )}
        {section.body && <p>{section.body}</p>}
      </ContentSection>
    );
  }

  if (section.type === "quote") {
    return (
      <ContentSection title={section.title} className="vision-section">
        <blockquote className="vision-quote">
          <p>{`“${section.text}”`}</p>
        </blockquote>
        {section.body && <p>{section.body}</p>}
      </ContentSection>
    );
  }

  if (section.type === "list") {
    return (
      <ContentSection title={section.title} className={section.className || ""}>
        {section.label && <p className="section-label">{section.label}</p>}
        <BulletList items={section.items} />
      </ContentSection>
    );
  }

  return (
    <ContentSection title={section.title}>
      <SourceList sources={section.sources} />
    </ContentSection>
  );
};

export const DetailSections = ({ sections }) => {
  if (!sections?.length) return null;
  return sections.map((section, index) => (
    <SectionBlock section={section} key={`${section.type}-${section.title || index}`} />
  ));
};

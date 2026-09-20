import React from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import {
  BulletList,
  ContentSection,
  EvidenceBlocks,
  Paragraphs
} from "../components/DetailBlocks";
import Figure from "../components/art/Figure";
import StatusBadge from "../components/StatusBadge";
import { getProductBySlug } from "../data/portfolio";
import "../components/Work.css";
import "./WorkDetail.css";

const ProductDetail = () => {
  const { slug } = useParams();
  const product = getProductBySlug(slug);

  if (!product) {
    return <WorkNotFound kind="product" />;
  }

  return (
    <article className="detail-page detail-product page-shell">
      <div className="container detail-container">
        <Link to="/work" className="back-link"><ArrowLeft size={17} /> Back to work</Link>
        <header className="detail-header">
          <div className="detail-kicker-row">
            <span className="eyebrow">Product</span>
            <StatusBadge status={product.status} />
          </div>
          <h1>{product.name}</h1>
          <p className="detail-summary">{product.summary}</p>
          {product.affiliationNote && (
            <p className="affiliation-note">{product.affiliationNote}</p>
          )}
        </header>

        <div className="detail-layout">
          <aside className="detail-aside" aria-label="Product summary">
            <dl>
              <div><dt>Status</dt><dd><StatusBadge status={product.status} /></dd></div>
              {product.year && <div><dt>Year</dt><dd>{product.year}</dd></div>}
              {product.tags?.length > 0 && <div><dt>Focus</dt><dd>{product.tags.join(" · ")}</dd></div>}
            </dl>
          </aside>

          <div className="detail-content">
            <ContentSection title="Problem"><Paragraphs items={product.problem} /></ContentSection>
            <ContentSection title="Solution"><Paragraphs items={product.solution} /></ContentSection>
            <ContentSection title="My role"><BulletList items={product.role} /></ContentSection>
            {product.decisions?.length > 0 && (
              <ContentSection title="Key decisions and tradeoffs">
                <div className="decision-list">
                  {product.decisions.map((item, index) => (
                    <div className="decision-item" key={`${item.decision}-${index}`}>
                      <h3>{item.decision}</h3>
                      {/* Rendered as a two-column figure rather than three
                          stacked paragraphs: a decision IS a trade, and the
                          shape should show what was taken against what was
                          given up. */}
                      <div className="decision-trade">
                        {item.rationale && (
                          <div className="decision-side decision-chose">
                            <span className="decision-side-label">Chose</span>
                            <p>{item.rationale}</p>
                          </div>
                        )}
                        {item.tradeoff && (
                          <div className="decision-side decision-gave-up">
                            <span className="decision-side-label">Gave up</span>
                            <p>{item.tradeoff}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ContentSection>
            )}
            <ContentSection title="Evidence"><EvidenceBlocks items={product.evidence} /></ContentSection>
            <ContentSection title="Outcome"><BulletList items={product.outcomes} /></ContentSection>
            {product.links?.length > 0 && (
              <ContentSection title="Relevant links">
                <ul className="relevant-links">
                  {product.links.map((link) => (
                    <li key={link.url}><a href={link.url} target="_blank" rel="noreferrer">{link.label} <ArrowUpRight size={15} /></a></li>
                  ))}
                </ul>
              </ContentSection>
            )}
          </div>
        </div>
        <DetailFooter />
      </div>
    </article>
  );
};

export const WorkNotFound = ({ kind = "work" }) => (
  <div className="not-found page-shell">
    <div className="container narrow-container">
      <Figure name="not-found" ratio="1 / 1" className="not-found-plate" />
      <p className="eyebrow">404</p>
      <h1>{kind[0].toUpperCase() + kind.slice(1)} not found.</h1>
      <p>The entry may have moved, or the address may be incorrect.</p>
      <Link to="/work" className="btn btn-primary"><ArrowLeft size={16} /> Browse work</Link>
    </div>
  </div>
);

export const DetailFooter = () => (
  <footer className="detail-footer">
    <p>Want to discuss the thinking behind this work?</p>
    <Link to="/contact" className="text-link">Get in touch <ArrowUpRight size={17} /></Link>
  </footer>
);

export default ProductDetail;

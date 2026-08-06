import React from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import {
  BulletList,
  ContentSection,
  Paragraphs,
  SourceList
} from "../components/DetailBlocks";
import { formatPortfolioDate } from "../components/WorkCard";
import { getAnalysisBySlug } from "../data/portfolio";
import { DetailFooter, WorkNotFound } from "./ProductDetail";
import "./WorkDetail.css";

const AnalysisDetail = () => {
  const { slug } = useParams();
  const analysis = getAnalysisBySlug(slug);

  if (!analysis) {
    return <WorkNotFound kind="analysis" />;
  }

  return (
    <article className="detail-page detail-analysis page-shell">
      <div className="container detail-container">
        <Link to="/work" className="back-link"><ArrowLeft size={17} /> Back to work</Link>
        <header className="detail-header">
          <div className="detail-kicker-row">
            <span className="eyebrow">Analysis · {analysis.topic}</span>
          </div>
          <h1>{analysis.title}</h1>
          <p className="detail-summary">{analysis.summary}</p>
          <p className="affiliation-note">{analysis.affiliationNote}</p>
        </header>

        <div className="detail-layout">
          <aside className="detail-aside" aria-label="Publication details">
            <dl>
              <div>
                <dt>Published</dt>
                <dd>{formatPortfolioDate(analysis.publishedAt, analysis.publishedPrecision)}</dd>
              </div>
              {analysis.updatedAt && <div><dt>Last updated</dt><dd>{formatPortfolioDate(analysis.updatedAt)}</dd></div>}
              {analysis.tags?.length > 0 && <div><dt>Focus</dt><dd>{analysis.tags.join(" · ")}</dd></div>}
            </dl>
            <div className="interpretation-key">
              <span>Interpretation</span>
              <p>Recommendations and implications are Parag's analysis, not company statements.</p>
            </div>
          </aside>

          <div className="detail-content analysis-copy">
            <ContentSection title="Question or thesis"><p>{analysis.summary}</p></ContentSection>
            <ContentSection title="Why it matters"><Paragraphs items={analysis.whyItMatters} /></ContentSection>
            <ContentSection title="Method and sources">
              <Paragraphs items={analysis.method} />
              <SourceList sources={analysis.sources} />
            </ContentSection>
            <ContentSection title="Analysis"><Paragraphs items={analysis.analysis} /></ContentSection>
            <ContentSection title="Key findings"><BulletList items={analysis.findings} /></ContentSection>
            <ContentSection title="Recommendation or implications" className="interpretation-section">
              <p className="section-label">Parag's interpretation</p>
              <BulletList items={analysis.recommendations} />
            </ContentSection>
          </div>
        </div>
        <DetailFooter />
      </div>
    </article>
  );
};

export default AnalysisDetail;

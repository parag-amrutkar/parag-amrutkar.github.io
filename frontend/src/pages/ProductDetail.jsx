import React from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { DetailSections } from "../components/DetailBlocks";
import Figure from "../components/art/Figure";
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
        <header className="detail-header">
          <div className="detail-header-copy">
            <div className="detail-kicker-row">
              <span className="eyebrow">{product.name}</span>
            </div>
            <h1>{product.headline}</h1>
            {product.subheadline && <p className="detail-summary">{product.subheadline}</p>}
          </div>
          <Figure
            className="detail-header-plate"
            name={product.plate || "plate-product"}
            ratio={product.plateRatio || "1 / 1"}
            width={1600}
            height={1600}
            alt={product.plateAlt || ""}
            priority
          />
        </header>

        <div className="detail-layout">
          <div className="detail-content">
            <DetailSections sections={product.sections} />
          </div>
        </div>
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

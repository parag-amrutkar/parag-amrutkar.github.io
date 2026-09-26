import React, { useState } from "react";
import WorkCard from "../components/WorkCard";
import useReveal from "../hooks/useReveal";
import { analyses, products } from "../data/portfolio";
import "../components/Work.css";
import "./WorkIndex.css";

const Work = () => {
  const [activeCollection, setActiveCollection] = useState("products");
  const collections = [
    {
      id: "products",
      items: products,
      eyebrow: "What I make",
      title: "Products",
      description: "Concepts, prototypes, and implemented work—each labeled with its current status."
    },
    {
      id: "analysis",
      items: analyses,
      eyebrow: "How I think",
      title: "Analysis",
      description: "Independent case studies with assumptions and evidence limitations stated directly."
    }
  ];

  // Cards in the inactive tabpanel are `hidden`, so they never intersect and
  // would stay at their un-revealed opacity. Re-running on tab change picks
  // up whatever just became visible.
  useReveal([activeCollection]);

  return (
    <div className="work-page page-shell">
      <div className="container">
        <header className="page-intro work-intro stagger">
          <p className="eyebrow">Selected work</p>
          <h1>Built things and<br />structured thinking.</h1>
          <p className="page-lede">
            Products show what I have designed or built. Analysis shows how I frame a question,
            examine tradeoffs, and reach a recommendation.
          </p>
        </header>

        <div className="collection-switcher" role="tablist" aria-label="Work collections">
          <button
            id="products-tab"
            type="button"
            role="tab"
            aria-selected={activeCollection === "products"}
            aria-controls="products-panel"
            tabIndex={activeCollection === "products" ? 0 : -1}
            onClick={() => setActiveCollection("products")}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                event.preventDefault();
                setActiveCollection("analysis");
                document.getElementById("analysis-tab")?.focus();
              }
            }}
          >
            <span>Products</span>
            <small>{products.length}</small>
          </button>
          <button
            id="analysis-tab"
            type="button"
            role="tab"
            aria-selected={activeCollection === "analysis"}
            aria-controls="analysis-panel"
            tabIndex={activeCollection === "analysis" ? 0 : -1}
            onClick={() => setActiveCollection("analysis")}
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                event.preventDefault();
                setActiveCollection("products");
                document.getElementById("products-tab")?.focus();
              }
            }}
          >
            <span>Analysis</span>
            <small>{analyses.length}</small>
          </button>
        </div>

        {collections.map((collection) => (
          <section
            id={`${collection.id}-panel`}
            role="tabpanel"
            aria-labelledby={`${collection.id}-tab`}
            className="collection-panel"
            hidden={activeCollection !== collection.id}
            key={collection.id}
          >
            <div className="collection-heading">
              <p className="eyebrow">{collection.eyebrow}</p>
              <h2>{collection.title}</h2>
              <p>{collection.description}</p>
            </div>

            {collection.items.length > 0 ? (
              <div className="work-grid">
                {collection.items.map((item, index) => (
                <WorkCard
                  item={item}
                  key={item.slug}
                  revealDelay={item.type === "product" ? index * 120 : 0}
                />
              ))}
              </div>
            ) : (
              <p className="empty-state">No public entries are available in this collection yet.</p>
            )}
          </section>
        ))}
      </div>
    </div>
  );
};

export default Work;

import React from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Figure from "../components/art/Figure";
import WorkCard from "../components/WorkCard";
import { analyses, products, profile } from "../data/portfolio";
import "../components/Work.css";
import "./Home.css";

const Home = () => {
  const featuredProducts = products.filter((item) => item.featured).slice(0, 3);
  const featuredAnalyses = analyses.filter((item) => item.featured).slice(0, 5);

  return (
    <div className="home">
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-content">
            <h1 data-reveal data-reveal-on-mount data-reveal-delay="90">{profile.name}</h1>
            <p className="hero-role" data-reveal data-reveal-on-mount data-reveal-delay="90">{profile.title}</p>
            <p className="hero-tagline" data-reveal data-reveal-on-mount data-reveal-delay="180">{profile.positioning}</p>
            <div className="hero-actions" data-reveal data-reveal-on-mount data-reveal-delay="270">
              <Link to="/work" className="btn btn-primary">View my work <ArrowRight size={17} /></Link>
              <Link to="/about" className="btn btn-secondary">About me</Link>
            </div>
            <div className="hero-clients" data-reveal data-reveal-on-mount data-reveal-delay="360">
              <p className="eyebrow">Worked with</p>
              <ul className="hero-client-list" aria-label="Companies I have worked with">
                <li><img src="/logos/pwron.webp" alt="PwrOn" width="1000" height="461" /></li>
                <li><img src="/logos/mardamed.webp" alt="Mardamed" width="312" height="116" /></li>
                <li><img src="/logos/deloitte-digital.webp" alt="Deloitte Digital" width="1138" height="390" /></li>
              </ul>
            </div>
          </div>
          <div className="hero-aside">
            <img
              src="/dotted-portrait.webp"
              width="1086"
              height="1448"
              className="hero-portrait"
              alt="Halftone portrait of Parag Amrutkar in a suit and tie"
              data-reveal="hero-art"
              data-reveal-on-mount
            />
          </div>
        </div>
      </section>

      {featuredProducts.length > 0 && (
        <section className="home-section selected-products band-ruled">
          <div className="container">
            <div className="section-heading">
              <div data-reveal>
                <h2>Recent work</h2>
              </div>
              <Link to="/work" className="text-link">All work <ArrowUpRight size={17} /></Link>
            </div>
            <div className="work-list">
              {featuredProducts.map((item, index) => (
                <article
                  key={item.slug}
                  className="work-row"
                  data-reveal
                  data-reveal-delay={index ? index * 120 : undefined}
                >
                  <div className="work-row-copy">
                    <h3><Link to={`/work/products/${item.slug}`}>{item.name}</Link></h3>
                    <p>{item.summary}</p>
                    <Link to={`/work/products/${item.slug}`} className="btn btn-secondary">
                      View project
                    </Link>
                  </div>
                  <Figure
                    className="work-row-plate"
                    name={item.plate || "plate-product"}
                    ratio="1 / 1"
                    width={1600}
                    height={1600}
                    alt={item.plateAlt || ""}
                  />
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {featuredAnalyses.length > 0 && (
        <section className="home-section selected-analysis">
          <div className="container">
            <div className="section-heading">
              <div data-reveal><p className="eyebrow">How I think</p><h2>Selected analysis</h2></div>
              <Link to="/work" className="text-link">Explore analysis <ArrowUpRight size={17} /></Link>
            </div>
            <div className="work-grid">
              {featuredAnalyses.map((item) => <WorkCard key={item.slug} item={item} compact />)}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;

import React from "react";
import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
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
            <p className="eyebrow">Product · Strategy · Technology</p>
            <h1>{profile.name}</h1>
            <p className="hero-tagline">{profile.positioning}</p>
            <div className="hero-actions">
              <Link to="/work" className="btn btn-primary">View my work <ArrowRight size={17} /></Link>
              <Link to="/about" className="btn btn-secondary">About me</Link>
            </div>
          </div>
          <div className="hero-mark" aria-hidden="true">
            <span>Products</span>
            <ArrowDownRight size={32} />
            <span>Analysis</span>
          </div>
        </div>
      </section>

      {featuredProducts.length > 0 && (
        <section className="home-section selected-products">
          <div className="container">
            <div className="section-heading">
              <div><p className="eyebrow">What I make</p><h2>Selected products</h2></div>
              <Link to="/work" className="text-link">All work <ArrowUpRight size={17} /></Link>
            </div>
            <div className="work-grid">
              {featuredProducts.map((item) => <WorkCard key={item.slug} item={item} />)}
            </div>
          </div>
        </section>
      )}

      {featuredAnalyses.length > 0 && (
        <section className="home-section selected-analysis">
          <div className="container">
            <div className="section-heading">
              <div><p className="eyebrow">How I think</p><h2>Selected analysis</h2></div>
              <Link to="/work" className="text-link">Explore analysis <ArrowUpRight size={17} /></Link>
            </div>
            <div className="work-grid">
              {featuredAnalyses.map((item) => <WorkCard key={item.slug} item={item} compact />)}
            </div>
          </div>
        </section>
      )}

      <section className="home-section home-introduction">
        <div className="container intro-grid">
          <p className="eyebrow">A little context</p>
          <div>
            <h2>Clear thinking, made inspectable.</h2>
            <p>{profile.introduction}</p>
            <Link to="/about" className="text-link">More about me <ArrowUpRight size={17} /></Link>
          </div>
        </div>
      </section>

      <section className="contact-cta">
        <div className="container contact-cta-inner">
          <p className="eyebrow">Start a conversation</p>
          <h2>Have a problem worth<br />thinking through?</h2>
          <Link to="/contact" className="btn btn-light">Get in touch <ArrowRight size={17} /></Link>
        </div>
      </section>
    </div>
  );
};

export default Home;

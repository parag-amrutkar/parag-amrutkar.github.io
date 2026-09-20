import React from "react";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import Figure from "../components/art/Figure";
import Marginalia from "../components/art/Marginalia";
import { marginalia } from "../data/marginalia";
import { profile } from "../data/portfolio";
import "./About.css";

const capabilities = [
  {
    number: "01",
    title: "Product framing",
    description: "Turning an open-ended problem into a defined user, proposed workflow, validation plan, and honest product status."
  },
  {
    number: "02",
    title: "Structured analysis",
    description: "Separating facts, assumptions, tradeoffs, and recommendations so the reasoning can be inspected."
  },
  {
    number: "03",
    title: "Technical judgment",
    description: "Connecting product decisions to data, experimentation, and implementation constraints without overstating what exists."
  }
];

const About = () => (
  <div className="about page-shell">
    <div className="container">
      <header className="about-hero">
        <div>
          <p className="eyebrow">About</p>
          <h1>Curious about the system behind the surface.</h1>
        </div>
        <div className="about-narrative">
          <p>{profile.positioning}</p>
          <p>
            I enjoy work where the problem is still taking shape: clarifying who it is for,
            what evidence matters, which tradeoffs are real, and what should happen next.
            This portfolio separates product work from analysis so each can be evaluated on its own terms.
          </p>
        </div>
      </header>

      <section className="about-context" aria-labelledby="about-context-heading">
        <p className="eyebrow" id="about-context-heading">Professional context</p>
        <div className="about-context-grid">
          <div className="about-context-identity">
            <p className="about-context-title">{profile.title}</p>
            <div className="location"><MapPin size={16} aria-hidden="true" /> {profile.location}</div>
          </div>
          <p className="about-context-focus">
            The work on this site is product framing, structured analysis, and technical builds:
            defining who a problem is for, making the reasoning inspectable, and showing what
            actually exists in a public repository.
          </p>
          <nav className="about-context-links" aria-label="Professional profile">
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn <span className="about-link-hint">professional profile</span>
              <ArrowUpRight size={14} aria-hidden="true" />
            </a>
            <Link to="/work">Work</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </div>
      </section>

      <Figure
        name="about-practice"
        ratio="3 / 2"
        className="about-plate"
        fig={1}
      />

      <section className="capabilities-section">
        <div className="section-heading-simple">
          <p className="eyebrow">How I work</p>
          <h2>Capabilities shown through the work.</h2>
          <Marginalia side="right" className="capabilities-note">
            {marginalia.capabilitiesEvidence.text}
          </Marginalia>
        </div>
        <div className="capabilities-list">
          {capabilities.map((capability) => (
            <article key={capability.number} className="capability-row">
              <span>{capability.number}</span>
              <h3>{capability.title}</h3>
              <p>{capability.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-next">
        <div><p className="eyebrow">Next</p><h2>See the reasoning in context.</h2></div>
        <div className="about-actions">
          <Link to="/work" className="btn btn-primary">View my work <ArrowRight size={17} /></Link>
          <Link to="/contact" className="btn btn-secondary">Contact me</Link>
        </div>
      </section>
    </div>
  </div>
);

export default About;

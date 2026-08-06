import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { profile } from "../data/portfolio";
import "./Footer.css";

const Footer = () => (
  <footer className="footer">
    <div className="container">
      <div className="footer-content">
        <div className="footer-statement">
          <Link to="/" className="footer-name">{profile.name}</Link>
          <p>Products, analysis, and the evidence behind both.</p>
        </div>
        <nav className="footer-nav" aria-label="Footer navigation">
          <Link to="/work">Work</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/terminal">Terminal</Link>
        </nav>
        <div className="social-links" aria-label="External profiles">
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={19} /></a>
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={19} /></a>
          <a href={`mailto:${profile.email}`} aria-label={`Email ${profile.name}`}><Mail size={19} /></a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <p>Built with clarity in mind.</p>
      </div>
    </div>
  </footer>
);

export default Footer;

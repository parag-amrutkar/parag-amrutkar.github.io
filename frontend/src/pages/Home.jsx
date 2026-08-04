import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code2, Brain, TrendingUp, Building2, Sparkles, ChevronDown } from 'lucide-react';
import './Home.css';
import { profile, projects } from '../data/mock';

const Home = () => {
  const [isVisible, setIsVisible] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const sectionRefs = useRef({});
  const heroRef = useRef(null);

  useEffect(() => {
    const observers = [];
    
    Object.keys(sectionRefs.current).forEach(key => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [key]: true }));
          }
        },
        { threshold: 0.1 }
      );
      
      if (sectionRefs.current[key]) {
        observer.observe(sectionRefs.current[key]);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const expertiseCards = [
    {
      title: 'Startups',
      description: 'Early-stage product strategy and rapid iteration',
      icon: Sparkles,
      link: '/projects',
      color: 'var(--accent)'
    },
    {
      title: 'B2B SaaS',
      description: 'Enterprise product management and growth',
      icon: Building2,
      link: '/projects',
      color: 'var(--primary)'
    },
    {
      title: 'AI/ML Products',
      description: 'Machine learning integration and strategy',
      icon: Brain,
      link: '/projects?filter=ai',
      color: 'var(--secondary)'
    },
    {
      title: 'Product Strategy',
      description: 'Data-driven product decisions and roadmaps',
      icon: TrendingUp,
      link: '/projects',
      color: 'var(--accent)'
    }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero" ref={heroRef}>
        <div className="hero-background">
          <div 
            className="hero-photo-container"
            style={{
              transform: `translateY(-50%) rotateY(${typeof window !== 'undefined' ? (mousePosition.x / window.innerWidth - 0.5) * 10 : 0}deg) rotateX(${typeof window !== 'undefined' ? -(mousePosition.y / window.innerHeight - 0.5) * 10 : 0}deg) translateZ(${scrollY * 0.1}px)`
            }}
          >
            <img 
              src="/images/hero_photo.jpeg" 
              alt={profile.name}
              className="hero-photo"
            />
          </div>
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-text-overlay">
              <p className="hero-label">{profile.title}</p>
              <h1 className="hero-title">
                <span className="hero-name">{profile.name}</span>
              </h1>
              <p className="hero-tagline">{profile.tagline}</p>
            </div>
            <div className="hero-actions">
              <Link to="/projects" className="btn btn-primary hero-cta">
                View Projects <ArrowRight size={18} />
              </Link>
              <Link to="/contact" className="btn btn-secondary">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
        <div 
          className="scroll-indicator"
          onClick={() => {
            window.scrollTo({
              top: window.innerHeight,
              behavior: 'smooth'
            });
          }}
        >
          <ChevronDown size={24} />
        </div>
      </section>

      {/* I Often Work With Section */}
      <section 
        className={`expertise-section ${isVisible.expertise ? 'visible' : ''}`}
        ref={el => sectionRefs.current.expertise = el}
      >
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">I often work with</h2>
            <p className="section-subtitle">Specialized expertise across industries and technologies</p>
          </div>
          <div className="expertise-grid">
            {expertiseCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <Link
                  key={index}
                  to={card.link}
                  className={`expertise-card ${isVisible[`expertise-${index}`] ? 'visible' : ''}`}
                  ref={el => sectionRefs.current[`expertise-${index}`] = el}
                >
                  <div className="expertise-card-icon" style={{ '--card-color': card.color }}>
                    <Icon size={32} />
                  </div>
                  <h3 className="expertise-card-title">{card.title}</h3>
                  <p className="expertise-card-description">{card.description}</p>
                  <div className="expertise-card-arrow">
                    <ArrowRight size={20} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Latest Work Section */}
      <section 
        className={`latest-work-section ${isVisible.projects ? 'visible' : ''}`}
        ref={el => sectionRefs.current.projects = el}
      >
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Latest Work</h2>
            <Link to="/projects" className="view-all-link">
              View All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="projects-grid">
            {projects.slice(0, 3).map((project, index) => (
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                className={`project-card ${isVisible[`project-${index}`] ? 'visible' : ''}`}
                ref={el => sectionRefs.current[`project-${index}`] = el}
              >
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                  <div className="project-overlay">
                    <span className="project-category">{project.category}</span>
                  </div>
                  <div className="project-hover-overlay">
                    <span className="project-hover-text">View Case Study</span>
                  </div>
                </div>
                <div className="project-content">
                  <h3>{project.title}</h3>
                  <p className="text-muted">{project.subtitle}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

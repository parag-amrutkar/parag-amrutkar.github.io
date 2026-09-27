import React, { useState } from 'react';
import { Mail, Linkedin, Github, Send } from 'lucide-react';
import './Contact.css';
import { profile } from '../data/portfolio';
import { useToast } from '../hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit to FormKeep as multipart/form-data using the form element
      const form = e.currentTarget;
      const data = new FormData(form);

      const response = await fetch('https://formkeep.com/f/7651f02be67e', {
        method: 'POST',
        headers: {
          Accept: 'application/json'
        },
        body: data
      });

      if (response.ok) {
        toast({
          title: "Message sent!",
          description: "Thanks for reaching out. I'll get back to you soon.",
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again or email directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page page-shell">
      <div className="container">
        <div className="page-header">
          <h1>Send me a note</h1>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-card">
              <h2>Socials</h2>
              <div className="contact-links">
                <a href={`mailto:${profile.email}`} className="contact-link">
                  <Mail size={20} />
                  <span>{profile.email}</span>
                </a>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="contact-link">
                  <Linkedin size={20} />
                  <span>LinkedIn Profile</span>
                </a>
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="contact-link">
                  <Github size={20} />
                  <span>GitHub Profile</span>
                </a>
              </div>
            </div>
          </div>

          <div className="contact-form-wrapper">
            <form
              onSubmit={handleSubmit}
              action="https://formkeep.com/f/7651f02be67e"
              method="POST"
              encType="multipart/form-data"
              acceptCharset="UTF-8"
              className="contact-form"
            >
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="What's this about?"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Tell me more..."
                />
              </div>

              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : (
                  <>
                    Send Message <Send size={16} />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

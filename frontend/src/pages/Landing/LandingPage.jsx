import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, Volume2, Award, Sparkles, Shield, ChevronRight } from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import './LandingPage.css';

export const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
        </div>

        <div className="hero-container">
          <div className="hero-badge animate-fade-in">
            <Sparkles size={14} className="hero-badge-icon" />
            <span>Next-Generation AI Interview Training</span>
          </div>
          
          <h1 className="hero-title animate-fade-in">
            Master Your Next Tech Interview with <span className="gradient-text">Real-Time AI Feedback</span>
          </h1>
          
          <p className="hero-subtitle animate-fade-in">
            Simulate realistic voice-to-text mock interviews. Get immediate scores, vocabulary corrections, custom model answers, and deep analytical reports tailored for engineering and product roles.
          </p>

          <div className="hero-actions animate-fade-in">
            <Link to="/signup">
              <Button size="lg" variant="primary" icon={ArrowRight}>
                Get Started Free
              </Button>
            </Link>
            <a href="#features">
              <Button size="lg" variant="secondary">
                Explore Features
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container glass-panel">
          <div className="stat-item">
            <h3 className="stat-number gradient-text">25,000+</h3>
            <p className="stat-label">Interviews Conducted</p>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <h3 className="stat-number gradient-text">94.8%</h3>
            <p className="stat-label">Candidate Satisfaction</p>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <h3 className="stat-number gradient-text">15+</h3>
            <p className="stat-label">Engineering Domains</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="section-header">
          <h2 className="section-title">Built to Prepare You for <span className="gradient-text-cyan">FAANG & Beyond</span></h2>
          <p className="section-subtitle">Ditch simple reading lists. Practice answering live questions with a platform that evaluates what you say and how you say it.</p>
        </div>

        <div className="features-grid">
          <Card className="feature-card" hoverEffect={true}>
            <div className="feature-icon-wrapper p-primary">
              <Volume2 className="feature-icon" size={24} />
            </div>
            <h3 className="feature-title">Speech-to-Text Recognition</h3>
            <p className="feature-description">Answer questions with your voice. Our integrated browser-native transcription translates your spoken responses into texts instantly.</p>
          </Card>

          <Card className="feature-card" hoverEffect={true}>
            <div className="feature-icon-wrapper p-secondary">
              <Brain className="feature-icon" size={24} />
            </div>
            <h3 className="feature-title">Detailed AI Breakdown</h3>
            <p className="feature-description">Get immediate feedback scoring clarity, relevance, technical depth, and communication delivery. Know your weak spots instantly.</p>
          </Card>

          <Card className="feature-card" hoverEffect={true}>
            <div className="feature-icon-wrapper p-cyan">
              <Award className="feature-icon" size={24} />
            </div>
            <h3 className="feature-title">Tailored Model Answers</h3>
            <p className="feature-description">Review perfect developer answers written by senior engineers for every question, and compare them with your submissions.</p>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="process" className="process-section">
        <div className="section-header">
          <h2 className="section-title">How Interv<span className="logo-accent">AI</span> Works</h2>
          <p className="section-subtitle">Get interview-ready in three simple, structured steps.</p>
        </div>

        <div className="process-timeline">
          <div className="process-step">
            <div className="step-number-node">1</div>
            <div className="step-content">
              <h3 className="step-heading">Customize Your Setup</h3>
              <p className="step-text">Select your target engineering profile (Frontend, Backend, PM, etc.), set complexity difficulty, and define the length of the mock interview.</p>
            </div>
          </div>

          <div className="process-step-connector"></div>

          <div className="process-step">
            <div className="step-number-node">2</div>
            <div className="step-content">
              <h3 className="step-heading">Perform the Live Room Simulation</h3>
              <p className="step-text">Meet the virtual avatar. Listen to questions, record your spoken responses, watch audio wave visualizations, and structure your responses.</p>
            </div>
          </div>

          <div className="process-step-connector"></div>

          <div className="process-step">
            <div className="step-number-node">3</div>
            <div className="step-content">
              <h3 className="step-heading">Analyze the Scorecard</h3>
              <p className="step-text">Receive deep analysis scores, granular suggestions for each question, vocabulary improvement tips, and comprehensive model guides.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer Wrapper */}
      <section className="cta-section">
        <div className="cta-panel glass-panel">
          <h2 className="cta-title">Ready to Ace Your Next Tech Interview?</h2>
          <p className="cta-text">Join thousands of software engineers and product managers practicing daily. Get instant evaluation analytics now.</p>
          <Link to="/signup">
            <Button size="lg" variant="primary" icon={ChevronRight}>
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} IntervAI. All rights reserved. Designed for elite developers.</p>
      </footer>
    </div>
  );
};

export default LandingPage;

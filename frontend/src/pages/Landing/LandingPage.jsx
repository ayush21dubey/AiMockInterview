import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Brain, Volume2, Award, Sparkles, 
  ChevronRight, Play, CheckCircle, RefreshCw, 
  MessageSquare, Mic, User, Terminal, ArrowUpRight, Activity
} from 'lucide-react';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import './LandingPage.css';

const SIMULATION_DATA = [
  {
    title: "1. AI Interviewer",
    role: "System Architecture Interview",
    question: "Design a rate limiter for a public API gateway. What algorithms would you consider and how would you handle distributed state?",
    status: "AI is speaking...",
    type: "interviewer"
  },
  {
    title: "2. Live Transcription",
    role: "Candidate Response",
    question: "Design a rate limiter for a public API gateway...",
    transcript: "For a distributed rate limiter, I would consider the Token Bucket or Leaky Bucket algorithm. To handle the distributed state, we should store the bucket counters in a fast in-memory store like Redis. We can use Redis Lua scripts to execute the checks atomically, avoiding race conditions.",
    status: "Listening & transcribing voice...",
    fillerCount: 1,
    wpm: 125,
    type: "transcription"
  },
  {
    title: "3. Granular Scorecard",
    role: "AI Feedback Report",
    overallScore: "9.2/10",
    grades: [
      { label: "Technical Accuracy", score: 95, color: "var(--primary-color)" },
      { label: "Clarity & Structure", score: 90, color: "var(--accent-cyan)" },
      { label: "Delivery & Pace", score: 92, color: "var(--secondary-color)" }
    ],
    improvements: [
      "Excellent choice of Redis and Lua scripts for atomic operations.",
      "Consider mentioning sliding window logs to prevent bursty traffic issues.",
      "Pacing is perfect (125 WPM), minimal use of filler words."
    ],
    type: "scorecard"
  }
];

export const LandingPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [typedText, setTypedText] = useState("");
  const textTimerRef = useRef(null);

  // Typewriter effect for step 2 (Transcription)
  useEffect(() => {
    if (currentStep === 1) {
      let index = 0;
      const fullText = SIMULATION_DATA[1].transcript;
      setTypedText("");
      if (textTimerRef.current) clearInterval(textTimerRef.current);
      
      textTimerRef.current = setInterval(() => {
        if (index < fullText.length) {
          setTypedText((prev) => prev + fullText.charAt(index));
          index++;
        } else {
          clearInterval(textTimerRef.current);
        }
      }, 25);
    } else {
      setTypedText("");
      if (textTimerRef.current) clearInterval(textTimerRef.current);
    }

    return () => {
      if (textTimerRef.current) clearInterval(textTimerRef.current);
    };
  }, [currentStep]);

  // Autoplay loop
  useEffect(() => {
    if (!isAutoPlay) return;
    const intervalTime = currentStep === 1 ? 9500 : 5500;
    const timer = setTimeout(() => {
      setCurrentStep((prev) => (prev + 1) % 3);
    }, intervalTime);
    
    return () => clearTimeout(timer);
  }, [currentStep, isAutoPlay]);

  const handleStepSelect = (idx) => {
    setIsAutoPlay(false);
    setCurrentStep(idx);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay);
  };

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-grid-background"></div>
        <div className="hero-glow-1"></div>
        <div className="hero-glow-2"></div>

        <div className="hero-container">
          <div className="hero-badge animate-fade-in">
            <Sparkles size={13} className="hero-badge-icon" />
            <span>High-Contrast Elite Tech Interview Simulator</span>
          </div>
          
          <h1 className="hero-title animate-fade-in">
            Master the Tech Interview <br />
            with <span className="gradient-text-cyan">Interactive AI Feedback</span>
          </h1>
          
          <p className="hero-subtitle animate-fade-in">
            Ditch boilerplate prep templates. Practice verbal, technical questions with a system that evaluates exactly what you say, pacing speed, vocabulary structures, and technical depth.
          </p>

          <div className="hero-actions animate-fade-in">
            <Link to="/signup">
              <Button size="lg" variant="primary" icon={ArrowRight}>
                Try IntervAI Free
              </Button>
            </Link>
            <a href="#features">
              <Button size="lg" variant="secondary">
                See How It Works
              </Button>
            </a>
          </div>

          {/* Interactive Simulator Demo Widget */}
          <div className="demo-widget-container animate-scale-up">
            <div className="demo-widget-header">
              <div className="widget-controls">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
              </div>
              <div className="widget-title">
                <Terminal size={14} />
                <span>Mock Interview Sandbox: Session_Demo_Active</span>
              </div>
              <button className="widget-play-toggle" onClick={toggleAutoPlay} title={isAutoPlay ? "Pause Auto Play" : "Resume Auto Play"}>
                <RefreshCw size={14} className={isAutoPlay ? "spinning" : ""} />
                <span>{isAutoPlay ? "Live Syncing" : "Paused"}</span>
              </button>
            </div>

            <div className="demo-tabs">
              {SIMULATION_DATA.map((step, idx) => (
                <button
                  key={idx}
                  className={`demo-tab ${currentStep === idx ? 'active' : ''}`}
                  onClick={() => handleStepSelect(idx)}
                >
                  {step.title}
                </button>
              ))}
            </div>

            <div className="demo-content-panel">
              {currentStep === 0 && (
                <div className="interviewer-simulation animate-fade-in">
                  <div className="demo-avatar-container">
                    <div className="avatar-circle pulse-primary">
                      <Brain size={32} />
                    </div>
                    <div className="avatar-role">
                      <h4>IntervAI Architect Bot</h4>
                      <span className="badge badge-primary">{SIMULATION_DATA[0].role}</span>
                    </div>
                  </div>

                  <div className="speech-bubble">
                    <p className="question-text">{SIMULATION_DATA[0].question}</p>
                  </div>

                  <div className="waveform-box">
                    <div className="waveform-line active"></div>
                    <div className="waveform-line active"></div>
                    <div className="waveform-line active"></div>
                    <div className="waveform-line active"></div>
                    <div className="waveform-line active"></div>
                    <div className="waveform-line active"></div>
                  </div>
                  
                  <div className="demo-status">
                    <Activity size={12} className="spin-slow" />
                    <span>{SIMULATION_DATA[0].status}</span>
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="transcription-simulation animate-fade-in">
                  <div className="demo-avatar-container">
                    <div className="avatar-circle pulse-secondary">
                      <Mic size={24} />
                    </div>
                    <div className="avatar-role">
                      <h4>Candidate (You)</h4>
                      <span className="badge badge-secondary">{SIMULATION_DATA[1].role}</span>
                    </div>
                  </div>

                  <div className="speech-bubble candidate">
                    <p className="transcript-text">
                      {typedText}
                      <span className="cursor-blink">|</span>
                    </p>
                  </div>

                  <div className="waveform-box voice">
                    <div className="waveform-line voice-active"></div>
                    <div className="waveform-line voice-active"></div>
                    <div className="waveform-line voice-active"></div>
                    <div className="waveform-line voice-active"></div>
                  </div>

                  <div className="metrics-pill-container">
                    <span className="metric-pill">WPM: <strong>{SIMULATION_DATA[1].wpm}</strong></span>
                    <span className="metric-pill warning">Filler Words: <strong>{SIMULATION_DATA[1].fillerCount}</strong></span>
                  </div>

                  <div className="demo-status text-secondary">
                    <div className="recording-dot"></div>
                    <span>{SIMULATION_DATA[1].status}</span>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="scorecard-simulation animate-fade-in">
                  <div className="scorecard-grid">
                    <div className="score-summary-card">
                      <span className="score-label">Overall Evaluation</span>
                      <div className="score-number-big gradient-text">{SIMULATION_DATA[2].overallScore}</div>
                      <span className="badge badge-success">Passed Technical Standard</span>
                    </div>

                    <div className="grades-bars">
                      {SIMULATION_DATA[2].grades.map((grade, idx) => (
                        <div key={idx} className="grade-bar-item">
                          <div className="grade-bar-labels">
                            <span className="grade-lbl">{grade.label}</span>
                            <span className="grade-pct">{grade.score}%</span>
                          </div>
                          <div className="grade-track">
                            <div 
                              className="grade-fill" 
                              style={{ width: `${grade.score}%`, backgroundColor: grade.color }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="improvements-list">
                    <h5>Key Observations & Feedback</h5>
                    <ul>
                      {SIMULATION_DATA[2].improvements.map((imp, idx) => (
                        <li key={idx}>
                          <CheckCircle size={14} className="list-icon" />
                          <span>{imp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Features Section */}
      <section id="features" className="features-section">
        <div className="section-header">
          <div className="accent-tag">Platform Capability</div>
          <h2 className="section-title">Built for engineers, not template readers</h2>
          <p className="section-subtitle">Real coding and architecture feedback based on modern industry standards, designed to optimize your core software delivery discussions.</p>
        </div>

        <div className="bento-grid">
          {/* Card 1: Wide */}
          <div className="bento-card span-2 glass-panel">
            <div className="bento-content">
              <div className="bento-icon p-primary">
                <Volume2 size={20} />
              </div>
              <h3 className="bento-title">Real-time Speech Recognition</h3>
              <p className="bento-description">Speak naturally in our environment. Browser-native speech-to-text turns your spoken architecture answers into code structure logs instantly. Track pace (WPM), voice jitter, and structural cohesion.</p>
            </div>
            <div className="bento-preview speech-preview">
              <div className="mini-transcript">
                <div className="chat-bubble left">
                  <span>To scale this, we'd add database replicas...</span>
                </div>
                <div className="chat-bubble right alert">
                  <span>like... (Filler word flagged)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Narrow */}
          <div className="bento-card glass-panel">
            <div className="bento-content">
              <div className="bento-icon p-cyan">
                <Activity size={20} />
              </div>
              <h3 className="bento-title">Signal Processing</h3>
              <p className="bento-description">Calculates silence gaps and voice pacing. Understands exactly when you hesitate or loop, ensuring your speech feels fluid and structured.</p>
            </div>
            <div className="bento-preview signal-preview">
              <div className="pulsing-radar">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>

          {/* Card 3: Narrow */}
          <div className="bento-card glass-panel">
            <div className="bento-content">
              <div className="bento-icon p-secondary">
                <Brain size={20} />
              </div>
              <h3 className="bento-title">Technical Evaluation</h3>
              <p className="bento-description">Checks against active algorithms, system trade-offs (CAP, ACID), architectural layers, and performance optimizations. Provides a granular rubric breakdown.</p>
            </div>
            <div className="bento-preview rubric-preview">
              <div className="mini-rubric-card">
                <div className="rubric-line"><span>SQL vs NoSQL trade-offs</span><span className="pill green">Correct</span></div>
                <div className="rubric-line"><span>Data Partitioning (Sharding)</span><span className="pill green">Strong</span></div>
                <div className="rubric-line"><span>Cache Invalidation strategies</span><span className="pill orange">Partial</span></div>
              </div>
            </div>
          </div>

          {/* Card 4: Wide */}
          <div className="bento-card span-2 glass-panel">
            <div className="bento-content">
              <div className="bento-icon p-green">
                <Award size={20} />
              </div>
              <h3 className="bento-title">Model Answer Diff Engine</h3>
              <p className="bento-description">Instantly compare your spoken response against elite model solutions structured by senior staff engineers. Learn standard industry design choices side by side.</p>
            </div>
            <div className="bento-preview code-diff-preview">
              <div className="code-split">
                <div className="code-pane red-pane">
                  <span className="pane-title">Your Transcription</span>
                  <pre>We can store it in database and write code to block users...</pre>
                </div>
                <div className="code-pane green-pane">
                  <span className="pane-title">Model Answer</span>
                  <pre>Implement a sliding window counter using Redis ZSET with atomic Lua...</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="process" className="process-section">
        <div className="section-header">
          <div className="accent-tag">The Timeline</div>
          <h2 className="section-title">How IntervAI Works</h2>
          <p className="section-subtitle">Get interview-ready in three simple, high-fidelity steps.</p>
        </div>

        <div className="process-timeline">
          <div className="process-step">
            <div className="step-number-node">1</div>
            <div className="step-content">
              <h3 className="step-heading">Configure Setup Variables</h3>
              <p className="step-text">Choose your exact target engineering profile (Frontend, Backend, System Design, PM), complexity tier, and mock session duration parameters.</p>
            </div>
          </div>

          <div className="process-step-connector"></div>

          <div className="process-step">
            <div className="step-number-node">2</div>
            <div className="step-content">
              <h3 className="step-heading">Simulate Live Room Session</h3>
              <p className="step-text">Listen to AI interviewer prompts. Respond verbally via your microphone, viewing live soundwave feeds and speech transcription outputs.</p>
            </div>
          </div>

          <div className="process-step-connector"></div>

          <div className="process-step">
            <div className="step-number-node">3</div>
            <div className="step-content">
              <h3 className="step-heading">Review Granular Scorecard</h3>
              <p className="step-text">Examine structured evaluation grades, filler word analytics, vocabulary optimizations, and side-by-side model architecture code references.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="cta-section">
        <div className="cta-panel glass-panel">
          <h2 className="cta-title">Ready to Ace Your Next Tech Interview?</h2>
          <p className="cta-text">Join thousands of software engineers and developers practicing daily. Get instant, high-contrast visual evaluations now.</p>
          <Link to="/signup">
            <Button size="lg" variant="primary" icon={ChevronRight}>
              Create Free Account
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} IntervAI. All rights reserved. Designed for elite developers and builders.</p>
      </footer>
    </div>
  );
};

export default LandingPage;

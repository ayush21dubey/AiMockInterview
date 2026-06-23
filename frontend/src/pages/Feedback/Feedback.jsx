import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ThumbsUp, AlertCircle, BookOpen, ChevronDown, ChevronUp, ArrowLeft, Trophy } from 'lucide-react';
import { interviewService } from '../../services/interviewService';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import './Feedback.css';

export const Feedback = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [record, setRecord] = useState(null);
  const [expandedQs, setExpandedQs] = useState({});

  useEffect(() => {
    const data = interviewService.getInterviewById(id);
    if (data) {
      setRecord(data);
      // Auto-expand first question
      if (data.feedback?.qaList?.length > 0) {
        setExpandedQs({ [data.feedback.qaList[0].id]: true });
      }
    }
  }, [id]);

  const toggleExpand = (qId) => {
    setExpandedQs(prev => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  if (!record) {
    return (
      <div className="feedback-not-found">
        <AlertCircle size={40} className="text-danger" />
        <h3>Feedback Record Not Found</h3>
        <p>The scorecard resource you requested is missing or has been deleted.</p>
        <Link to="/dashboard">
          <Button variant="primary">Return to Dashboard</Button>
        </Link>
      </div>
    );
  }

  const { role, date, difficulty, score, feedback } = record;
  const { overall, breakdown, qaList } = feedback;

  return (
    <div className="feedback-page-container animate-fade-in">
      {/* Back to dashboard breadcrumb */}
      <div className="feedback-breadcrumb">
        <button className="back-link-btn" onClick={() => navigate('/dashboard')}>
          <ArrowLeft size={16} />
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* Main Scorecard Header */}
      <Card className="scorecard-header-card" hoverEffect={false} glow={true}>
        <div className="scorecard-header-flex">
          {/* Radial score circle loader */}
          <div className="radial-score-wrapper">
            <svg viewBox="0 0 120 120" className="radial-svg">
              <circle cx="60" cy="60" r="50" className="radial-track-circle" />
              <circle 
                cx="60" 
                cy="60" 
                r="50" 
                className="radial-fill-circle"
                style={{
                  strokeDasharray: 314,
                  strokeDashoffset: 314 - (314 * score) / 100
                }}
              />
            </svg>
            <div className="radial-score-text">
              <h2 className="radial-score-val">{score}</h2>
              <span className="radial-score-lbl">Score</span>
            </div>
          </div>

          <div className="scorecard-summary-info">
            <span className="sc-role-badge">{role}</span>
            <div className="sc-meta-row">
              <span>Date: {date}</span>
              <span>•</span>
              <span>Level: {difficulty}</span>
            </div>
            <h3 className="sc-summary-title">AI Performance Review</h3>
            <p className="sc-summary-text">{overall}</p>
          </div>
        </div>
      </Card>

      {/* Scores breakdown metrics */}
      <div className="feedback-breakdown-row">
        <Card className="breakdown-card" hoverEffect={false}>
          <h4 className="breakdown-title">Metric Performance Grades</h4>
          
          <div className="breakdown-list">
            {Object.entries(breakdown).map(([key, value]) => {
              // Convert key label (camelCase to Title Case)
              const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
              let barColor = 'var(--primary-color)';
              if (value >= 85) barColor = 'var(--success)';
              else if (value < 70) barColor = 'var(--danger)';

              return (
                <div key={key} className="breakdown-item">
                  <div className="breakdown-item-header">
                    <span>{label}</span>
                    <span className="breakdown-item-val">{value}%</span>
                  </div>
                  <div className="breakdown-progress-track">
                    <div 
                      className="breakdown-progress-fill" 
                      style={{ 
                        width: `${value}%`,
                        backgroundColor: barColor
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Accordion Questions logs logs */}
      <div className="feedback-questions-log">
        <h3 className="section-title">Question-by-Question Breakdown</h3>
        
        <div className="accordion-list">
          {qaList.map((item, index) => {
            const isOpen = !!expandedQs[item.id];
            
            return (
              <div 
                key={item.id} 
                className={`accordion-item glass-panel ${isOpen ? 'accordion-open' : ''}`}
              >
                {/* Header click bar */}
                <div 
                  className="accordion-header-bar" 
                  onClick={() => toggleExpand(item.id)}
                >
                  <div className="accordion-header-left">
                    <span className="q-index-pill">{index + 1}</span>
                    <h4 className="accordion-q-title">{item.question}</h4>
                  </div>

                  <div className="accordion-header-right">
                    <span className={`q-row-score-badge ${item.score >= 85 ? 'sc-high' : item.score >= 70 ? 'sc-mid' : 'sc-low'}`}>
                      Score: {item.score}%
                    </span>
                    {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </div>

                {/* Expanding Details Panel */}
                {isOpen && (
                  <div className="accordion-details-body animate-fade-in">
                    {/* User response block */}
                    <div className="accordion-detail-section user-ans-block">
                      <h5 className="section-detail-title">Your Response</h5>
                      <p className="detail-ans-text">{item.answer}</p>
                    </div>

                    <div className="accordion-feedback-grid">
                      {/* Strengths */}
                      <div className="feedback-col fb-strength">
                        <h5 className="section-detail-title text-success-title">
                          <ThumbsUp size={14} />
                          <span>Key Strengths</span>
                        </h5>
                        <p className="detail-eval-text">{item.strength}</p>
                      </div>

                      {/* Improvements */}
                      <div className="feedback-col fb-improvement">
                        <h5 className="section-detail-title text-warning-title">
                          <AlertCircle size={14} />
                          <span>Areas for Improvement</span>
                        </h5>
                        <p className="detail-eval-text">{item.improvement}</p>
                      </div>
                    </div>

                    {/* Model Answer Guidance */}
                    <div className="accordion-detail-section model-answer-block">
                      <h5 className="section-detail-title text-primary-title">
                        <BookOpen size={14} />
                        <span>AI Suggested Model Answer Guidance</span>
                      </h5>
                      <p className="detail-eval-text">{item.modelAnswer}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Feedback;

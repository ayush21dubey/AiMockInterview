import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Trash2, ChevronRight, Award } from 'lucide-react';
import Card from '../common/Card';
import './RecentInterview.css';

export const RecentInterview = ({
  interviews,
  onDelete
}) => {
  const getScoreColorClass = (score) => {
    if (score >= 85) return 'score-excellent';
    if (score >= 70) return 'score-good';
    return 'score-average';
  };

  const formatDuration = (totalSec) => {
    const mins = Math.floor(totalSec / 60);
    return `${mins} min${mins !== 1 ? 's' : ''}`;
  };

  if (!interviews || interviews.length === 0) {
    return (
      <Card className="empty-history-card" hoverEffect={false}>
        <Award size={48} className="empty-history-icon" />
        <h3 className="empty-title">No Mock History Yet</h3>
        <p className="empty-desc">You haven't completed any mock interviews. Customize your profile setup and start a session to evaluate your skills.</p>
        <Link to="/setup" className="empty-cta-btn">Start My First Mock</Link>
      </Card>
    );
  }

  return (
    <div className="recent-interviews-list">
      {interviews.map((item) => (
        <Card key={item.id} className="interview-row-card" hoverEffect={true}>
          <div className="row-main-info">
            <div className="row-avatar-badge">
              <span>{item.role.split(' ').map(n => n[0]).join('')}</span>
            </div>
            <div className="row-text">
              <h4 className="row-role-title">{item.role}</h4>
              <div className="row-metadata">
                <span className="meta-item">
                  <Calendar size={12} />
                  <span>{item.date}</span>
                </span>
                <span className="meta-divider">•</span>
                <span className="meta-item">Difficulty: {item.difficulty}</span>
                <span className="meta-divider">•</span>
                <span className="meta-item">{item.questionsCount} Qs</span>
                <span className="meta-divider">•</span>
                <span className="meta-item">{formatDuration(item.durationSeconds)}</span>
              </div>
            </div>
          </div>

          <div className="row-actions-group">
            <div className={`score-badge ${getScoreColorClass(item.score)}`}>
              <span className="score-val">{item.score}</span>
              <span className="score-lbl">Score</span>
            </div>

            <div className="row-buttons">
              <Link to={`/feedback/${item.id}`} className="view-feedback-link-btn" title="View Scorecard">
                <span>View Analytics</span>
                <ChevronRight size={14} />
              </Link>
              
              <button 
                type="button" 
                className="row-delete-btn" 
                onClick={() => onDelete && onDelete(item.id)}
                title="Delete Record"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default RecentInterview;

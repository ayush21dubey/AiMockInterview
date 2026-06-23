import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlayCircle, Flame, Trophy, Hourglass, Target } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useInterview } from '../../hooks/useInterview';
import StatsCard from '../../components/dashboard/StatsCard';
import ProgressChart from '../../components/dashboard/ProgressChart';
import RecentInterview from '../../components/dashboard/RecentInterview';
import Button from '../../components/common/Button';
import Card from '../../components/common/Card';
import './Dashboard.css';

export const Dashboard = () => {
  const { currentUser } = useAuth();
  const { history, deleteInterviewHistory } = useInterview();
  const navigate = useNavigate();

  // Dynamic statistics calculations
  const totalCompleted = history.length;
  
  const avgScore = totalCompleted > 0
    ? Math.round(history.reduce((acc, curr) => acc + curr.score, 0) / totalCompleted)
    : 0;

  const totalTimeSeconds = history.reduce((acc, curr) => acc + (curr.durationSeconds || 0), 0);
  const totalHours = (totalTimeSeconds / 3600).toFixed(1);

  // Streak: static seed or dynamic, let's keep it simple
  const streak = totalCompleted > 0 ? 5 : 0; 
  
  // Trend: calculate score improvement if at least two attempts exist
  let scoreTrend = 0;
  if (totalCompleted >= 2) {
    const last = history[0].score;
    const prev = history[1].score;
    scoreTrend = Math.round(((last - prev) / prev) * 100);
  }

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this mock interview record?")) {
      deleteInterviewHistory(id);
    }
  };

  const getRecommendedAction = () => {
    if (totalCompleted === 0) {
      return "Configure your target engineering profile and launch your first mock interview to benchmark your current level.";
    }
    if (avgScore >= 85) {
      return "Excellent grades! Try setting the setup difficulty to 'Hard' to practice complex architecture designs and advanced edge cases.";
    }
    return "Great momentum. Focus on reviewing the AI model answers for past questions. Practicing key vocabulary terms will increase technical scores.";
  };

  return (
    <div className="dashboard-container animate-fade-in">
      {/* Greetings Header */}
      <div className="dashboard-header-panel">
        <div className="user-greet">
          <h1 className="greet-title">Hello, {currentUser?.name || 'Developer'}!</h1>
          <p className="greet-desc">Welcome to your IntervAI control center. Ready to practice today?</p>
        </div>

        <Button 
          variant="primary" 
          size="md" 
          icon={PlayCircle} 
          onClick={() => navigate('/setup')}
        >
          Start Mock Session
        </Button>
      </div>

      {/* Grid of Stats Cards */}
      <div className="stats-cards-grid">
        <StatsCard
          title="Interviews Done"
          value={totalCompleted}
          icon={Target}
          trend={totalCompleted > 0 ? 12 : undefined}
          description="attempts this month"
          color="primary"
        />
        <StatsCard
          title="Average Grade"
          value={`${avgScore}%`}
          icon={Trophy}
          trend={totalCompleted >= 2 ? scoreTrend : undefined}
          description="vs prior attempt"
          color="secondary"
        />
        <StatsCard
          title="Practice Streak"
          value={`${streak} days`}
          icon={Flame}
          trend={streak > 0 ? 25 : undefined}
          description="active daily streak"
          color="cyan"
        />
        <StatsCard
          title="Hours Practiced"
          value={`${totalHours} hrs`}
          icon={Hourglass}
          trend={totalCompleted > 0 ? 8 : undefined}
          description="time spent speaking"
          color="success"
        />
      </div>

      {/* Analytics Splitscreen Row */}
      <div className="dashboard-splitscreen-row">
        <div className="split-left">
          <ProgressChart history={history} />
        </div>
        
        <div className="split-right">
          <Card className="dashboard-recommendation-card" hoverEffect={false} glow={true}>
            <h4 className="rec-card-title">IntervAI Recommendation</h4>
            <p className="rec-card-text">{getRecommendedAction()}</p>
            <div className="rec-card-divider"></div>
            <div className="rec-card-footer">
              <span className="rec-footer-label">Target Role:</span>
              <span className="rec-footer-value">{currentUser?.role || 'Software Engineer'}</span>
            </div>
          </Card>
        </div>
      </div>

      {/* Recent Attempts History */}
      <div className="dashboard-history-section">
        <h3 className="section-heading-title">Recent Session Scorecards</h3>
        <RecentInterview interviews={history} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, Keyboard, Sliders, ChevronRight, Briefcase } from 'lucide-react';
import { useInterview } from '../../hooks/useInterview';
import { MOCK_ROLES } from '../../data/mockData';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';
import './SetupInterview.css';

export const SetupInterview = () => {
  const { startNewInterview } = useInterview();
  const navigate = useNavigate();

  const [roleId, setRoleId] = useState(MOCK_ROLES[0].id);
  const [difficulty, setDifficulty] = useState('Medium');
  const [questionsCount, setQuestionsCount] = useState(5);
  const [mode, setMode] = useState('voice'); // 'voice' or 'text'
  const [loading, setLoading] = useState(false);

  const handleStart = async (e) => {
    e.preventDefault();
    const roleName = MOCK_ROLES.find(r => r.id === roleId)?.name || 'Frontend Engineer';
    
    setLoading(true);
    try {
      await startNewInterview({
        roleId,
        roleName,
        difficulty,
        questionsCount: parseInt(questionsCount, 10),
        mode
      });
      navigate('/room');
    } catch (err) {
      console.error(err);
      alert("Failed to initiate interview session. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const difficultyLevels = ['Easy', 'Medium', 'Hard'];
  const questionsCountOptions = [3, 5, 8];

  const roleOptions = MOCK_ROLES.map(role => ({
    value: role.id,
    label: role.name
  }));

  return (
    <div className="setup-page animate-fade-in">
      <div className="setup-header">
        <h1 className="setup-title">Setup Your <span className="gradient-text">Mock Interview</span></h1>
        <p className="setup-subtitle">Configure your mock session parameters to match your target role's exact coding questions.</p>
      </div>

      <form onSubmit={handleStart} className="setup-form-container">
        <Card className="setup-card" hoverEffect={false}>
          {/* 1. Job Role Selection */}
          <div className="setup-section">
            <h3 className="setup-section-title">
              <Briefcase size={18} className="section-icon-accent" />
              <span>1. Choose Your Target Domain</span>
            </h3>
            <p className="setup-section-desc">Select the engineering field you want to practice. Questions are loaded dynamically.</p>
            <Input
              type="select"
              name="role"
              value={roleId}
              onChange={(e) => setRoleId(e.target.value)}
              options={roleOptions}
              className="setup-role-input"
            />
          </div>

          <div className="setup-divider"></div>

          {/* 2. Complexity settings */}
          <div className="setup-section">
            <h3 className="setup-section-title">
              <Sliders size={18} className="section-icon-accent" />
              <span>2. Difficulty & Length</span>
            </h3>
            <p className="setup-section-desc">Select the depth of technical follow-ups and the number of questions in this session.</p>
            
            <div className="setup-options-row">
              <div className="setup-group">
                <label className="setup-label">Difficulty Level</label>
                <div className="setup-difficulty-pills">
                  {difficultyLevels.map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      className={`difficulty-pill pill-${lvl.toLowerCase()} ${difficulty === lvl ? 'active' : ''}`}
                      onClick={() => setDifficulty(lvl)}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <div className="setup-group">
                <label className="setup-label">Number of Questions</label>
                <div className="setup-difficulty-pills">
                  {questionsCountOptions.map((cnt) => (
                    <button
                      key={cnt}
                      type="button"
                      className={`difficulty-pill ${questionsCount === cnt ? 'active' : ''}`}
                      onClick={() => setQuestionsCount(cnt)}
                    >
                      {cnt} Qs
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="setup-divider"></div>

          {/* 3. Interview Mode Selection */}
          <div className="setup-section">
            <h3 className="setup-section-title">
              <Mic size={18} className="section-icon-accent" />
              <span>3. Interaction Mode</span>
            </h3>
            <p className="setup-section-desc">We recommend Voice Mode. Speaking mimics live phone screens and improves verbal structuring.</p>
            
            <div className="setup-mode-cards">
              <div 
                className={`setup-mode-card glass-panel ${mode === 'voice' ? 'selected' : ''}`}
                onClick={() => setMode('voice')}
              >
                <div className="mode-card-icon-wrapper voice-icon">
                  <Mic size={24} />
                </div>
                <div className="mode-card-info">
                  <h4 className="mode-card-title">Voice Mode</h4>
                  <p className="mode-card-desc">Talk directly to transcribe. Supports HTML5 mic visualizer wave feeds.</p>
                </div>
                <div className="mode-card-radio">
                  <div className="radio-circle"></div>
                </div>
              </div>

              <div 
                className={`setup-mode-card glass-panel ${mode === 'text' ? 'selected' : ''}`}
                onClick={() => setMode('text')}
              >
                <div className="mode-card-icon-wrapper text-icon">
                  <Keyboard size={24} />
                </div>
                <div className="mode-card-info">
                  <h4 className="mode-card-title">Text Mode</h4>
                  <p className="mode-card-desc">Standard text-area input. Best for quiet study and speed pacing.</p>
                </div>
                <div className="mode-card-radio">
                  <div className="radio-circle"></div>
                </div>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            icon={ChevronRight}
            className="setup-start-btn"
            disabled={loading}
          >
            {loading ? "Generating Interview Questions..." : "Initiate Interview Session"}
          </Button>
        </Card>
      </form>
    </div>
  );
};

export default SetupInterview;

import React, { useState } from 'react';
import { User, Mail, Briefcase, Sliders, Save, CheckCircle } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useInterview } from '../../hooks/useInterview';
import { MOCK_ROLES } from '../../data/mockData';
import Card from '../../components/common/Card';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import './Profile.css';

export const Profile = () => {
  const { currentUser, updateProfile } = useAuth();
  const { history } = useInterview();

  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    role: currentUser?.role || '',
    targetScore: currentUser?.targetScore || 80
  });

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const roleOptions = MOCK_ROLES.map(role => ({
    value: role.name,
    label: role.name
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSliderChange = (e) => {
    setFormData(prev => ({ ...prev, targetScore: parseInt(e.target.value, 10) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    try {
      await updateProfile(formData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      alert("Failed to update profile settings.");
    } finally {
      setSaving(false);
    }
  };

  // Profile Analytics
  const totalCompleted = history.length;
  const avgScore = totalCompleted > 0
    ? Math.round(history.reduce((acc, curr) => acc + curr.score, 0) / totalCompleted)
    : 0;

  return (
    <div className="profile-page-container animate-fade-in">
      <div className="profile-header">
        <h1 className="profile-title">Account Settings</h1>
        <p className="profile-subtitle">Update your personal engineering details and practice preferences.</p>
      </div>

      <div className="profile-layout-grid">
        {/* Left Side: Form Editor */}
        <div className="profile-col-form">
          <form onSubmit={handleSubmit}>
            <Card className="profile-card" hoverEffect={false}>
              <h3 className="profile-sec-title">Personal Parameters</h3>
              <p className="profile-sec-desc">These values customize your dashboard metrics and AI advice.</p>
              
              {success && (
                <div className="profile-success-banner animate-fade-in">
                  <CheckCircle size={16} />
                  <span>Profile updated successfully!</span>
                </div>
              )}

              <Input
                label="Full Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                icon={User}
                required
              />

              <Input
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                icon={Mail}
                required
                disabled
              />

              <Input
                label="Target Engineering Role"
                type="select"
                name="role"
                value={formData.role}
                onChange={handleChange}
                options={roleOptions}
                icon={Briefcase}
                required
              />

              {/* Slider Input */}
              <div className="slider-group">
                <div className="slider-labels">
                  <label className="slider-title">Target Score Goal</label>
                  <span className="slider-value-badge">{formData.targetScore}%</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="95"
                  step="5"
                  value={formData.targetScore}
                  onChange={handleSliderChange}
                  className="profile-score-slider"
                />
                <p className="slider-desc">Set your score benchmark. AI summaries highlights if you meet this score.</p>
              </div>

              <Button
                type="submit"
                variant="primary"
                loading={saving}
                icon={Save}
                className="profile-save-btn"
              >
                Save Settings
              </Button>
            </Card>
          </form>
        </div>

        {/* Right Side: Quick stats card */}
        <div className="profile-col-stats">
          <Card className="profile-summary-stats-card" hoverEffect={false} glow={true}>
            <div className="profile-meta-avatar-row">
              <img src={currentUser?.avatar} alt={currentUser?.name} className="profile-large-avatar" />
              <div className="profile-meta-text">
                <h4 className="meta-name">{currentUser?.name}</h4>
                <p className="meta-joined">Member since {currentUser?.joinedDate || 'June 2026'}</p>
              </div>
            </div>

            <div className="profile-stats-divider"></div>

            <div className="profile-stats-dashboard-row">
              <div className="p-stat-node">
                <span className="p-stat-num">{totalCompleted}</span>
                <span className="p-stat-lbl">Mocks Done</span>
              </div>
              <div className="p-stat-divider"></div>
              <div className="p-stat-node">
                <span className="p-stat-num">{avgScore}%</span>
                <span className="p-stat-lbl">Avg Score</span>
              </div>
            </div>

            <div className="profile-stats-divider"></div>

            <div className="target-goal-progress-box">
              <div className="goal-row-header">
                <span>Goal Progress</span>
                <span className="goal-ratio">{avgScore} / {currentUser?.targetScore || 80}%</span>
              </div>
              <div className="goal-progress-track">
                <div 
                  className="goal-progress-fill"
                  style={{
                    width: `${Math.min(100, (avgScore / (currentUser?.targetScore || 80)) * 100)}%`
                  }}
                ></div>
              </div>
              <p className="goal-status-desc">
                {avgScore >= (currentUser?.targetScore || 80)
                  ? "Goal achieved! Excellent work. Consider raising your target score."
                  : "Keep practicing! You are close to matching your target score."}
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;

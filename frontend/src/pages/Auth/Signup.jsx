import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Briefcase, UserPlus, Cpu } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { MOCK_ROLES } from '../../data/mockData';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Card from '../../components/common/Card';
import './Auth.css';

export const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const roleOptions = MOCK_ROLES.map(role => ({
    value: role.name,
    label: role.name
  }));

  const validate = () => {
    const tempErrors = {};
    if (!formData.name) {
      tempErrors.name = 'Full Name is required';
    }
    if (!formData.email) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Invalid email address';
    }
    if (!formData.role) {
      tempErrors.role = 'Please select your target role';
    }
    if (!formData.password) {
      tempErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setApiError(null);
    try {
      await signup(formData.name, formData.email, formData.password, formData.role);
      navigate('/dashboard');
    } catch (err) {
      setApiError(err.message || 'Registration failed. Email might already be taken.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-background-shapes">
        <div className="auth-shape auth-shape-1"></div>
        <div className="auth-shape auth-shape-2"></div>
      </div>

      <Card className="auth-card" hoverEffect={false}>
        <div className="auth-header">
          <div className="auth-logo">
            <Cpu size={28} className="logo-icon" />
            <span className="logo-text">Interv<span className="logo-accent">AI</span></span>
          </div>
          <h2 className="auth-title">Create Account</h2>
          <p className="auth-subtitle">Start practicing with our interactive voice mock rooms.</p>
        </div>

        {apiError && (
          <div className="auth-error-banner animate-fade-in">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <Input
            label="Full Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            error={errors.name}
            icon={User}
            required
          />

          <Input
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            error={errors.email}
            icon={Mail}
            required
          />

          <Input
            label="Target Engineering Role"
            type="select"
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Select your target career path"
            error={errors.role}
            options={roleOptions}
            icon={Briefcase}
            required
          />

          <Input
            label="Password (min 6 characters)"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            error={errors.password}
            icon={Lock}
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            icon={UserPlus}
            className="auth-submit-btn"
          >
            Create Free Account
          </Button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login" className="auth-link">Sign In</Link>
        </p>
      </Card>
    </div>
  );
};

export default Signup;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Sun, Moon, LogOut, User, LayoutDashboard, Menu, X, Cpu } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import './Navbar.css';

export const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    setMobileMenuOpen(false);
    navigate('/');
  };

  const isDashboardPath = location.pathname.startsWith('/dashboard') || 
                          location.pathname.startsWith('/setup') || 
                          location.pathname.startsWith('/room') || 
                          location.pathname.startsWith('/feedback') || 
                          location.pathname.startsWith('/profile');

  return (
    <nav className="navbar glass-panel">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={() => setMobileMenuOpen(false)}>
          <Cpu className="logo-icon" size={24} />
          <span>Interv<span className="logo-accent">AI</span></span>
        </Link>

        {/* Desktop Menu */}
        <div className="navbar-menu-desktop">
          {!isDashboardPath && (
            <div className="navbar-links">
              <a href="#features" className="nav-link">Features</a>
              <a href="#process" className="nav-link">How It Works</a>
              {currentUser ? (
                <Link to="/dashboard" className="nav-link nav-link-dash">Dashboard</Link>
              ) : null}
            </div>
          )}

          <div className="navbar-actions">
            <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {currentUser ? (
              <div className="user-profile-menu">
                <button 
                  className="user-profile-trigger" 
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <img src={currentUser.avatar} alt={currentUser.name} className="nav-avatar" />
                  <span className="nav-username">{currentUser.name.split(' ')[0]}</span>
                </button>
                {dropdownOpen && (
                  <>
                    <div className="dropdown-overlay" onClick={() => setDropdownOpen(false)}></div>
                    <div className="profile-dropdown glass-panel">
                      <div className="dropdown-user-info">
                        <p className="user-info-name">{currentUser.name}</p>
                        <p className="user-info-email">{currentUser.email}</p>
                      </div>
                      <div className="dropdown-divider"></div>
                      <Link to="/dashboard" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                        <LayoutDashboard size={16} />
                        <span>Dashboard</span>
                      </Link>
                      <Link to="/profile" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                        <User size={16} />
                        <span>My Profile</span>
                      </Link>
                      <div className="dropdown-divider"></div>
                      <button className="dropdown-item text-danger" onClick={handleLogout}>
                        <LogOut size={16} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="btn-login-link">Sign In</Link>
                <Link to="/signup" className="btn-signup-nav">Get Started</Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu trigger */}
        <button 
          className="navbar-mobile-trigger" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="navbar-mobile-panel glass-panel animate-fade-in">
          {!isDashboardPath && (
            <div className="mobile-links">
              <a href="#features" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>Features</a>
              <a href="#process" className="mobile-link" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
            </div>
          )}

          <div className="mobile-actions">
            <div className="mobile-action-row">
              <span>Theme Mode</span>
              <button className="theme-toggle-btn" onClick={toggleTheme}>
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
            
            <div className="dropdown-divider"></div>

            {currentUser ? (
              <div className="mobile-user-actions">
                <div className="mobile-user-card">
                  <img src={currentUser.avatar} alt={currentUser.name} className="mobile-nav-avatar" />
                  <div>
                    <p className="user-info-name">{currentUser.name}</p>
                    <p className="user-info-email">{currentUser.email}</p>
                  </div>
                </div>
                <Link to="/dashboard" className="mobile-action-btn" onClick={() => setMobileMenuOpen(false)}>
                  <LayoutDashboard size={18} />
                  <span>Dashboard</span>
                </Link>
                <Link to="/profile" className="mobile-action-btn" onClick={() => setMobileMenuOpen(false)}>
                  <User size={18} />
                  <span>Profile</span>
                </Link>
                <button className="mobile-action-btn text-danger" onClick={handleLogout}>
                  <LogOut size={18} />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="mobile-auth-buttons">
                <Link to="/login" className="mobile-auth-btn-secondary" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
                <Link to="/signup" className="mobile-auth-btn-primary" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

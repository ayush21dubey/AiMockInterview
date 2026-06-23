import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, PlayCircle, History, User, LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import './Sidebar.css';

export const Sidebar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    {
      name: 'Overview',
      path: '/dashboard',
      icon: LayoutDashboard,
      end: true
    },
    {
      name: 'Start Mock',
      path: '/setup',
      icon: PlayCircle
    },
    {
      name: 'Profile',
      path: '/profile',
      icon: User
    }
  ];

  return (
    <aside className="sidebar glass-panel">
      <div className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.end}
              className={({ isActive }) => `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`}
            >
              <Icon size={20} />
              <span className="sidebar-link-text">{item.name}</span>
            </NavLink>
          );
        })}
      </div>

      {currentUser && (
        <div className="sidebar-footer">
          <div className="sidebar-user-info">
            <img src={currentUser.avatar} alt={currentUser.name} className="sidebar-avatar" />
            <div className="sidebar-user-text">
              <p className="sidebar-username">{currentUser.name.split(' ')[0]}</p>
              <p className="sidebar-role">{currentUser.role.split(' ')[0]}...</p>
            </div>
          </div>
          <button className="sidebar-logout-btn" onClick={handleLogout} title="Sign Out">
            <LogOut size={18} />
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;

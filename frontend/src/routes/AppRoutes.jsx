import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from '../layouts/MainLayout';
import DashboardLayout from '../layouts/DashboardLayout';

// Pages
import LandingPage from '../pages/Landing/LandingPage';
import Login from '../pages/Auth/Login';
import Signup from '../pages/Auth/Signup';
import Dashboard from '../pages/Dashboard/Dashboard';
import SetupInterview from '../pages/SetupInterview/SetupInterview';
import InterviewRoom from '../pages/InterviewRoom/InterviewRoom';
import Feedback from '../pages/Feedback/Feedback';
import Profile from '../pages/Profile/Profile';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* Private Dashboard Pages */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/setup" element={<SetupInterview />} />
        <Route path="/room" element={<InterviewRoom />} />
        <Route path="/feedback/:id" element={<Feedback />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* Wildcard Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;

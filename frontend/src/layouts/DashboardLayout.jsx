import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Navbar from '../components/navbar/Navbar';
import Sidebar from '../components/sidebar/Sidebar';
import Loader from '../components/common/Loader';
import './DashboardLayout.css';

export const DashboardLayout = () => {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="layout-loader-wrapper">
        <Loader size="lg" message="Loading your dashboard profile..." />
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="dashboard-layout">
      <Navbar />
      <div className="dashboard-body">
        <Sidebar />
        <main className="dashboard-content">
          <div className="dashboard-inner-container">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

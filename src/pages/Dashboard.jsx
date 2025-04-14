// pages/Dashboard.js
import React from 'react';
import DashboardCard from '../components/DashboardCard';

const Dashboard = () => {
  return (
    <div className="main-content">
      <section className="section">
        <div className="section-header">
          <h1>Dashboard</h1>
        </div>
        <div className="row">
          <DashboardCard icon="far fa-user" bg="bg-primary" title="Total News Categories" value="12" />
          <DashboardCard icon="fas fa-book-open" bg="bg-danger" title="Total News" value="122" />
          <DashboardCard icon="fas fa-bullhorn" bg="bg-warning" title="Total Users" value="45" />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;

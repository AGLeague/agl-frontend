import React from 'react';
import StatsTable from '../components/StatsTable';

const Stats: React.FC = () => {
  return (
    <div className="stats-page">
      <div className="stats-header">
        <h1 className="stats-title">Player Statistics</h1>
        <p className="stats-subtitle">Track performance metrics across all players</p>
      </div>
      <div className="stats-content">
        <StatsTable />
      </div>
    </div>
  );
};

export default Stats; 
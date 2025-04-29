import React from 'react';
import StatsTable from '../components/StatsTable';

const Stats: React.FC = () => {
  return (
    <div className="page-container">
      <h1>Player Statistics</h1>
      <StatsTable />
    </div>
  );
};

export default Stats; 
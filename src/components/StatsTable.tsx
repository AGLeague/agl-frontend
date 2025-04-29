import React from 'react';
import dummyData from '../sample_data/dummy.json';

const StatsTable: React.FC = () => {
  return (
    <div className="stats-table-container">
      <table className="stats-table">
        <thead>
          <tr>
            <th>Player</th>
            <th>League Count</th>
            <th>Win Rate</th>
            <th>Top 8s</th>
          </tr>
        </thead>
        <tbody>
          {dummyData.data.map((player, index) => (
            <tr key={index}>
              <td>{player.name}</td>
              <td>{player.stats.leagueCount}</td>
              <td>{player.stats.winRate}%</td>
              <td>{player.stats.top8s}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StatsTable; 
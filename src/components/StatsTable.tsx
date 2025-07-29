import React, { useState, useMemo } from 'react';
import { usePlayers } from '../hooks/usePlayers';
import SortableHeader from './SortableHeader';

const StatsTable: React.FC = () => {
  const { data: playersResponse, isLoading, error } = usePlayers();
  const [sort, setSort] = useState<{ key: string; direction: 'asc' | 'desc' }>({
    key: 'name',
    direction: 'asc'
  });

  const handleSort = (key: string) => {
    setSort(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const sortedPlayers = useMemo(() => {
    if (!playersResponse?.data) return [];
    
    return [...playersResponse.data].sort((a, b) => {
      const aValue = sort.key === 'name' ? a.name : a.stats[sort.key as keyof typeof a.stats];
      const bValue = sort.key === 'name' ? b.name : b.stats[sort.key as keyof typeof b.stats];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sort.direction === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      return sort.direction === 'asc'
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    });
  }, [playersResponse?.data, sort]);

  if (isLoading) {
    return <div className="loading">Loading player statistics...</div>;
  }

  if (error) {
    return <div className="error">Error loading player statistics. Please try again later.</div>;
  }

  return (
    <div className="stats-table-container">
      <table className="stats-table">
        <thead>
          <tr>
            <SortableHeader
              label="Player"
              sortKey="name"
              currentSort={sort}
              onSort={handleSort}
            />
            <SortableHeader
              label="League Count"
              sortKey="leagueCount"
              currentSort={sort}
              onSort={handleSort}
            />
            <SortableHeader
              label="Win Rate"
              sortKey="winRate"
              currentSort={sort}
              onSort={handleSort}
            />
            <SortableHeader
              label="Top 8s"
              sortKey="top8s"
              currentSort={sort}
              onSort={handleSort}
            />
          </tr>
        </thead>
        <tbody>
          {sortedPlayers.map((player, index) => (
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

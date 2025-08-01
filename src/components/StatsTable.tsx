import React, { useState, useMemo } from 'react';
import { usePaginatedPlayers } from '../hooks/usePlayers';
import SortableHeader from './SortableHeader';

const StatsTable: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: playersResponse, isLoading, error } = usePaginatedPlayers(currentPage);
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



  const handleNextPage = () => {
    if (playersResponse?.links?.next) {
      setCurrentPage(current => current + 1);
    }
  };

  const handlePrevPage = () => {
    if (playersResponse?.links?.prev) {
      setCurrentPage(current => current - 1);
    }
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    if (playersResponse?.links?.last) {
      // Extract page number from last URL
      const url = new URL(playersResponse.links.last);
      const pageParam = url.searchParams.get('page');
      if (pageParam) {
        setCurrentPage(parseInt(pageParam));
      }
    }
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

  if (error) {
    return <div className="error">Error loading player statistics. Please try again later.</div>;
  }

  // Calculate total pages from the last URL
  const getTotalPages = () => {
    if (playersResponse?.links?.last) {
      const url = new URL(playersResponse.links.last);
      const pageParam = url.searchParams.get('page');
      return pageParam ? parseInt(pageParam) : 1;
    }
    return 1;
  };

  const totalPages = getTotalPages();

  return (
    <div className="stats-table-container">
      {isLoading && (
        <div className="table-loading-overlay">
          <div className="loading-spinner"></div>
          <div className="loading-text">Loading...</div>
        </div>
      )}
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
              <td>{(player.stats.winRate * 100).toFixed(2)}%</td>
              <td>{player.stats.top8s}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Pagination Controls */}
      <div className="stats-pagination">
        <button 
          className="pagination-btn"
          onClick={handleFirstPage}
          disabled={currentPage === 1}
        >
          First
        </button>
        <button 
          className="pagination-btn"
          onClick={handlePrevPage}
          disabled={!playersResponse?.links?.prev}
        >
          Previous
        </button>
        <span className="pagination-info">
          Page {currentPage} of {totalPages}
        </span>
        <button 
          className="pagination-btn"
          onClick={handleNextPage}
          disabled={!playersResponse?.links?.next}
        >
          Next
        </button>
        <button 
          className="pagination-btn"
          onClick={handleLastPage}
          disabled={currentPage === totalPages}
        >
          Last
        </button>
      </div>
    </div>
  );
};

export default StatsTable; 

import React, { useState, useMemo } from 'react';
import { 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Button, 
  Box, 
  Typography, 
  CircularProgress,
  Alert
} from '@mui/material';
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
    return (
      <Alert severity="error" sx={{ maxWidth: 1000, width: '100%' }}>
        Error loading player statistics. Please try again later.
      </Alert>
    );
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
    <Paper 
      sx={{ 
        maxWidth: 1000, 
        width: '100%', 
        borderRadius: 3, 
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        position: 'relative',
        minHeight: 400
      }}
    >
      {isLoading && (
        <Box 
          sx={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(255, 255, 255, 0.9)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 100,
            borderRadius: 3
          }}
        >
          <CircularProgress sx={{ mb: 2, color: 'primary.main' }} />
          <Typography color="primary.main" fontWeight={600}>
            Loading...
          </Typography>
        </Box>
      )}
      
      <TableContainer sx={{ maxHeight: '70vh' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedPlayers.map((player, index) => (
              <TableRow 
                key={index}
                sx={{ 
                  '&:hover': {
                    background: 'linear-gradient(135deg, #f8f9ff 0%, #f0f2ff 100%)',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 2px 8px rgba(102, 126, 234, 0.1)',
                  },
                  '&:nth-of-type(even)': {
                    backgroundColor: '#fafbfc',
                  }
                }}
              >
                <TableCell sx={{ fontWeight: 500, color: '#333' }}>{player.name}</TableCell>
                <TableCell sx={{ fontWeight: 500, color: '#333' }}>{player.stats.leagueCount}</TableCell>
                <TableCell sx={{ fontWeight: 500, color: '#333' }}>{(player.stats.winRate * 100).toFixed(2)}%</TableCell>
                <TableCell sx={{ fontWeight: 500, color: '#333' }}>{player.stats.top8s}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      {/* Pagination Controls */}
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          gap: 2, 
          p: 3, 
          borderTop: '1px solid #f0f0f0',
          flexWrap: 'wrap'
        }}
      >
        <Button 
          variant="contained"
          onClick={handleFirstPage}
          disabled={currentPage === 1}
          sx={{ 
            background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #1a252f 0%, #2c3e50 100%)',
            },
            '&:disabled': {
              background: '#ccc',
            }
          }}
        >
          First
        </Button>
        <Button 
          variant="contained"
          onClick={handlePrevPage}
          disabled={!playersResponse?.links?.prev}
          sx={{ 
            background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #1a252f 0%, #2c3e50 100%)',
            },
            '&:disabled': {
              background: '#ccc',
            }
          }}
        >
          Previous
        </Button>
        <Typography 
          sx={{ 
            fontWeight: 600, 
            color: '#333', 
            minWidth: 120, 
            textAlign: 'center' 
          }}
        >
          Page {currentPage} of {totalPages}
        </Typography>
        <Button 
          variant="contained"
          onClick={handleNextPage}
          disabled={!playersResponse?.links?.next}
          sx={{ 
            background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #1a252f 0%, #2c3e50 100%)',
            },
            '&:disabled': {
              background: '#ccc',
            }
          }}
        >
          Next
        </Button>
        <Button 
          variant="contained"
          onClick={handleLastPage}
          disabled={currentPage === totalPages}
          sx={{ 
            background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #1a252f 0%, #2c3e50 100%)',
            },
            '&:disabled': {
              background: '#ccc',
            }
          }}
        >
          Last
        </Button>
      </Box>
    </Paper>
  );
};

export default StatsTable; 

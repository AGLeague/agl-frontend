import React from 'react';
import { TableCell, TableSortLabel } from '@mui/material';

interface SortableHeaderProps {
  label: string;
  sortKey: string;
  currentSort: {
    key: string;
    direction: 'asc' | 'desc';
  };
  onSort: (key: string) => void;
}

const SortableHeader: React.FC<SortableHeaderProps> = ({ label, sortKey, currentSort, onSort }) => {
  const isActive = currentSort.key === sortKey;
  const direction = isActive ? currentSort.direction : undefined;

  return (
    <TableCell 
      onClick={() => onSort(sortKey)}
      sx={{ 
        cursor: 'pointer',
        userSelect: 'none',
        background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
        color: 'white',
        fontWeight: 600,
        textShadow: '0 1px 2px rgba(0, 0, 0, 0.3)',
        '&:hover': {
          backgroundColor: '#e9ecef',
        },
        '&.Mui-active': {
          backgroundColor: '#e9ecef',
        }
      }}
    >
      <TableSortLabel
        active={isActive}
        direction={direction}
        onClick={(e) => {
          e.stopPropagation();
          onSort(sortKey);
        }}
        sx={{ 
          color: 'white',
          '&.Mui-active': {
            color: 'white',
          },
          '&:hover': {
            color: 'white',
          }
        }}
      >
        {label}
      </TableSortLabel>
    </TableCell>
  );
};

export default SortableHeader; 
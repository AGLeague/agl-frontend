import React from 'react';

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
  const direction = isActive ? currentSort.direction : null;

  return (
    <th 
      onClick={() => onSort(sortKey)}
      className={`sortable ${isActive ? 'active' : ''}`}
    >
      {label}
      {direction && (
        <span className="sort-indicator">
          {direction === 'asc' ? ' ↑' : ' ↓'}
        </span>
      )}
    </th>
  );
};

export default SortableHeader; 
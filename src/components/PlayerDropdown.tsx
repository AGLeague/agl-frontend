import React, { useState, useRef, useEffect } from 'react';
import { usePlayerNames } from '../hooks/usePlayers';

interface PlayerDropdownProps {
  selectedPlayer: string;
  onPlayerSelect: (playerName: string) => void;
}

const PlayerDropdown: React.FC<PlayerDropdownProps> = ({ selectedPlayer, onPlayerSelect }) => {
  const { data: playerNames, isLoading, error } = usePlayerNames();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter players based on search term
  const filteredPlayers = (playerNames?.data || []).filter(name =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePlayerSelect = (playerName: string) => {
    onPlayerSelect(playerName);
    setIsOpen(false);
    setSearchTerm('');
  };

  if (isLoading) {
    return <div className="loading">Loading players...</div>;
  }

  if (error) {
    return <div className="error">Error loading players</div>;
  }

  return (
    <div className="player-dropdown" ref={dropdownRef}>
      <div className="dropdown-header">
        <input
          type="text"
          placeholder="Search for a player..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="dropdown-input"
        />
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="dropdown-toggle"
        >
          ▼
        </button>
      </div>
      
      {isOpen && (
        <div className="dropdown-menu">
          {filteredPlayers.length === 0 ? (
            <div className="dropdown-item no-results">No players found</div>
          ) : (
            filteredPlayers.map((playerName) => (
              <div
                key={playerName}
                className={`dropdown-item ${selectedPlayer === playerName ? 'selected' : ''}`}
                onClick={() => handlePlayerSelect(playerName)}
              >
                {playerName}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default PlayerDropdown; 
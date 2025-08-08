import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert,
  Paper
} from '@mui/material';
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
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <CircularProgress size={20} />
        <span>Loading players...</span>
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">Error loading players</Alert>;
  }

  return (
    <Box
      sx={{
        position: 'relative',
        width: { xs: '100%', sm: 320, md: 360 },
      }}
      ref={dropdownRef}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          border: '2px solid #ddd',
          borderRadius: 1,
          overflow: 'hidden',
          width: '100%',
          backgroundColor: 'white',
        }}
      >
        <TextField
          placeholder="Search for a player..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsOpen(true)}
          variant="standard"
          sx={{
            flex: 1,
            '& .MuiInput-root': {
              border: 'none',
              '&:before': { borderBottom: 'none' },
              '&:after': { borderBottom: 'none' },
              '&:hover:before': { borderBottom: 'none' },
            }
          }}
          InputProps={{
            style: { padding: '12px' }
          }}
          onKeyDown={(e) => {
            // Open dropdown when typing
            if (!isOpen) setIsOpen(true);
          }}
          onClick={() => {
            // Toggle open on click to ensure visibility on desktop
            if (!isOpen) setIsOpen(true);
          }}
        />
        <Button
          onClick={() => setIsOpen((prev) => !prev)}
          sx={{
            px: 2,
            py: 1,
            backgroundColor: '#f8f9fa',
            borderLeft: '1px solid #ddd',
            borderRadius: 0,
            minWidth: 'auto',
            maxWidth: { xs: 48, sm: 56 },
            flexShrink: 0,
            '&:hover': {
              backgroundColor: '#e9ecef',
            }
          }}
        >
          ▼
        </Button>
      </Box>

      {isOpen && filteredPlayers && (
        <Paper
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 1000,
            maxHeight: 300,
            overflow: 'auto',
            border: '2px solid #ddd',
            borderTop: 'none',
            borderRadius: '0 0 4px 4px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
        >
          <List sx={{ p: 0 }}>
            {filteredPlayers.length === 0 ? (
              <ListItem>
                <ListItemText
                  primary="No players found"
                  sx={{
                    color: '#999',
                    fontStyle: 'italic',
                    textAlign: 'center'
                  }}
                />
              </ListItem>
            ) : (
              filteredPlayers.map((playerName) => (
                <ListItem
                  key={playerName}
                  onClick={() => handlePlayerSelect(playerName)}
                  sx={{
                    cursor: 'pointer',
                    backgroundColor: selectedPlayer === playerName ? '#e3f2fd' : 'transparent',
                    color: selectedPlayer === playerName ? '#1976d2' : 'inherit',
                    fontWeight: selectedPlayer === playerName ? 500 : 400,
                    '&:hover': {
                      backgroundColor: selectedPlayer === playerName ? '#e3f2fd' : '#f8f9fa',
                    }
                  }}
                >
                  <ListItemText primary={playerName} />
                </ListItem>
              ))
            )}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default PlayerDropdown; 
import React from 'react';
import { Box, Typography } from '@mui/material';
import StatsTable from '../components/StatsTable';

const Stats: React.FC = () => {
  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
        py: 2,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box sx={{ textAlign: 'center', mb: 4, px: 4 }}>
        <Typography 
          variant="h1" 
          component="h1" 
          sx={{ 
            mb: 2, 
            color: 'white',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
            fontWeight: 700
          }}
        >
          Player Statistics
        </Typography>
        <Typography 
          variant="h5" 
          component="p" 
          sx={{ 
            color: 'rgba(255, 255, 255, 0.9)',
            fontWeight: 300
          }}
        >
          Track performance metrics across all players
        </Typography>
      </Box>
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', px: 4 }}>
        <StatsTable />
      </Box>
    </Box>
  );
};

export default Stats; 
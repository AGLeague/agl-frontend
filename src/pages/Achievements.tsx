import React from 'react';
import { Box } from '@mui/material';
import AchievementsTable from '../components/AchievementsTable';

const Achievements: React.FC = () => {
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AchievementsTable />
    </Box>
  );
};

export default Achievements; 
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Button, 
  Box
} from '@mui/material';

const Navigation: React.FC = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#333' }}>
      <Toolbar sx={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
        <Box 
          component="img" 
          src="/agl-frontend/AGL_FF_2.png" 
          alt="Arena Gauntlet League" 
          sx={{ 
            height: 40, 
            width: 'auto',
            marginRight: 3
          }} 
        />
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button 
            component={Link} 
            to="/" 
            color="inherit"
            sx={{ 
              '&:hover': { 
                backgroundColor: 'rgba(255, 255, 255, 0.1)' 
              } 
            }}
          >
            Home
          </Button>
          <Button 
            component={Link} 
            to="/achievements" 
            color="inherit"
            sx={{ 
              '&:hover': { 
                backgroundColor: 'rgba(255, 255, 255, 0.1)' 
              } 
            }}
          >
            Achievements
          </Button>
          <Button 
            component={Link} 
            to="/stats" 
            color="inherit"
            sx={{ 
              '&:hover': { 
                backgroundColor: 'rgba(255, 255, 255, 0.1)' 
              } 
            }}
          >
            Stats
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation; 
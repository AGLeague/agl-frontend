import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Card, 
  CardContent, 
  Button, 
  Box
} from '@mui/material';

const Home: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h1" component="h1" sx={{ mb: 2, color: 'text.primary' }}>
          Welcome to the Arena Gauntlet League
        </Typography>
        <Typography variant="h5" component="p" sx={{ color: 'text.secondary', maxWidth: 600, mx: 'auto', lineHeight: 1.6 }}>
          The AGL personal achievement gallery and stats website! Check your achievements here. Made with love by Bob P, John D, Stephen H, and Caleb K.
        </Typography>
      </Box>
      
      <Box sx={{ display: 'flex', gap: 4, mb: 6, flexWrap: 'wrap' }}>
        <Box sx={{ flex: '1 1 400px', minWidth: 0 }}>
          <Card 
            sx={{ 
              height: '100%',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
              }
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h3" component="h3" sx={{ mb: 2, color: 'text.primary' }}>
                📊 Player Statistics
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary', lineHeight: 1.6 }}>
                Track performance metrics, rankings, and detailed analytics for all AGL competitors.
              </Typography>
              <Button 
                component={Link} 
                to="/stats" 
                variant="contained" 
                color="primary"
                sx={{ 
                  background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #1a252f 0%, #2c3e50 100%)',
                  }
                }}
              >
                View Stats →
              </Button>
            </CardContent>
          </Card>
        </Box>
        
        <Box sx={{ flex: '1 1 400px', minWidth: 0 }}>
          <Card 
            sx={{ 
              height: '100%',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
              }
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h3" component="h3" sx={{ mb: 2, color: 'text.primary' }}>
                🏆 Achievements
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary', lineHeight: 1.6 }}>
                Explore the complete collection of achievements earned by players across all seasons.
              </Typography>
              <Button 
                component={Link} 
                to="/achievements" 
                variant="contained" 
                color="primary"
                sx={{ 
                  background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #1a252f 0%, #2c3e50 100%)',
                  }
                }}
              >
                Browse Achievements →
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Container>
  );
};

export default Home; 
import React, { useEffect } from 'react';
import { 
  Modal, 
  Box, 
  IconButton, 
  Typography, 
  Chip 
} from '@mui/material';
import { Close } from '@mui/icons-material';

interface ImagePreviewModalProps {
  imageUrl: string;
  achievementName: string;
  achievementRarity?: string;
  achievementNumber?: number;
  onClose: () => void;
}

const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({ 
  imageUrl, 
  achievementName, 
  achievementRarity,
  achievementNumber,
  onClose 
}) => {
  // Debug: Log the rarity value
  console.log('Modal rarity:', achievementRarity);
  
  // Function to convert abbreviated rarity to full name
  const getRarityDisplayName = (rarity: string) => {
    switch (rarity) {
      case 'C': return 'Common';
      case 'U': return 'Uncommon';
      case 'R': return 'Rare';
      case 'M': return 'Mythic';
      case 'L': return 'Legendary';
      case 'SPG': return 'SPG';
      case 'Expert': return 'Expert';
      default: return rarity || 'Common';
    }
  };

  // Function to get rarity-specific styles
  const getRarityStyles = (rarity: string) => {
    switch (rarity) {
      case 'C':
      case 'Common':
        return { 
          background: 'linear-gradient(135deg, #000000 0%, #333333 100%)', 
          color: 'white' 
        };
      case 'U':
      case 'Uncommon':
        return { 
          background: 'linear-gradient(135deg, #c0c0c0 0%, #a0a0a0 100%)', 
          color: 'black' 
        };
      case 'R':
      case 'Rare':
        return { 
          background: 'linear-gradient(135deg, #ffd700 0%, #ffed4e 100%)', 
          color: 'black' 
        };
      case 'M':
      case 'Mythic':
        return { 
          background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)', 
          color: 'black' 
        };
      case 'L':
      case 'Legendary':
        return { 
          background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)', 
          color: 'black' 
        };
      case 'SPG':
        return { 
          background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)', 
          color: 'black' 
        };
      case 'Expert':
        return { 
          background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)', 
          color: 'black' 
        };
      default:
        return { 
          background: 'linear-gradient(135deg, #000000 0%, #333333 100%)', 
          color: 'white' 
        };
    }
  };

  // Close modal when pressing Escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <Modal
      open={true}
      onClose={onClose}
      keepMounted
      BackdropProps={{
        sx: { backgroundColor: 'rgba(0, 0, 0, 0.75)' }
      }}
      sx={{
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        m: 0,
        width: '100vw',
        height: '100vh',
      }}
    >
      <Box 
        sx={{
          position: 'relative',
          background: 'white',
          borderRadius: 2,
          width: { xs: '100%', sm: 'auto' },
          maxWidth: { xs: 'calc(100vw - 32px)', sm: '540px' },
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 2,
          outline: 'none',
          boxShadow: '0 12px 24px rgba(0,0,0,0.4)',
          boxSizing: 'border-box',
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
            }
          }}
        >
          <Close />
        </IconButton>
        
        <Box 
          component="img"
          src={imageUrl} 
          alt={achievementName} 
          sx={{
            width: '100%',
            height: 'auto',
            maxHeight: { xs: '60vh', sm: '70vh' },
            objectFit: 'contain',
            borderRadius: 1
          }}
        />
        
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="h6" component="div" sx={{ mb: 1, fontWeight: 600 }}>
            {achievementName}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Chip
              label={getRarityDisplayName(achievementRarity || 'Common')}
              sx={{
                ...getRarityStyles(achievementRarity || 'Common'),
                fontWeight: 600,
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            />
            <Typography 
              variant="body2" 
              sx={{ 
                fontWeight: 600, 
                color: '#666', 
                fontFamily: 'Courier New, monospace',
                fontSize: '1rem'
              }}
            >
              #{achievementNumber}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default ImagePreviewModal; 
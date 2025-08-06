import React, { useEffect, useState, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  Alert,
  CircularProgress
} from '@mui/material';
import { usePlayers } from '../hooks/usePlayers';
import { usePlayerAchievements } from '../hooks/usePlayers';
import type { Achievement } from '../types/player';
import { getAchievementImage, preloadAchievementImages } from '../utils/achievementImages';
import ImagePreviewModal from './ImagePreviewModal';
import PlayerDropdown from './PlayerDropdown';
import HTMLFlipBook from 'react-pageflip';

const AchievementsTable: React.FC = () => {
  const { data: playersResponse, isLoading: isLoadingPlayers, error: playersError } = usePlayers();
  const [selectedPlayer, setSelectedPlayer] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<{ url: string; name: string; rarity: string; number: number } | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const flipBookRef = useRef<{ pageFlip: () => { flipNext: (corner?: 'top' | 'bottom') => void; flipPrev: (corner?: 'top' | 'bottom') => void; flip: (page: number, corner?: 'top' | 'bottom') => void; getCurrentPageIndex: () => number; turnToNextPage: () => void; turnToPrevPage: () => void; turnToPage: (page: number) => void } }>(null);
  
  const CARDS_PER_PAGE = 9; // 3x3 grid
  
  // Set initial selected player when players data is loaded
  useEffect(() => {
    if (playersResponse?.data && playersResponse.data.length > 0 && !selectedPlayer) {
      setSelectedPlayer(playersResponse.data[0].name);
    }
  }, [playersResponse, selectedPlayer]);

  const { 
    data: achievementsResponse, 
    isLoading: isLoadingAchievements, 
    error: achievementsError 
  } = usePlayerAchievements(selectedPlayer);

  // Preload images when achievements data is available
  useEffect(() => {
    if (achievementsResponse?.data?.achievementData) {
      preloadAchievementImages(achievementsResponse.data.achievementData);
    }
  }, [achievementsResponse]);

  const handlePlayerSelect = (playerName: string) => {
    setSelectedPlayer(playerName);
    setCurrentPage(0); // Reset to first page when changing players
  };

  const handleNextPage = () => {
    if (flipBookRef.current) {
      const currentPageIndex = flipBookRef.current.pageFlip().getCurrentPageIndex();
      console.log('Current page index:', currentPageIndex);
      if (currentPageIndex < totalPages - 1) {
        flipBookRef.current.pageFlip().turnToNextPage();
      }
    }
  };

  const handlePrevPage = () => {
    if (flipBookRef.current) {
      const currentPageIndex = flipBookRef.current.pageFlip().getCurrentPageIndex();
      console.log('Current page index:', currentPageIndex);
      if (currentPageIndex > 0) {
        flipBookRef.current.pageFlip().turnToPrevPage();
      }
    }
  };

  // Create a map of player's achievements by collector number for quick lookup
  const playerAchievementsMap = new Map<number, Achievement>();
  if (achievementsResponse?.data?.achievementData) {
    achievementsResponse.data.achievementData.forEach(achievement => {
      playerAchievementsMap.set(achievement.collectorNumber, achievement);
    });
  }

  // Define all possible achievement numbers based on the image files
  // This includes all achievements that exist, whether the player has them or not
  const allPossibleAchievements = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 200, 201, 202, 203, 204, 205, 206, 207
  ];
  const TOTAL_ACHIEVEMENTS = allPossibleAchievements.length;

  // Generate all pages for the flip book (each page is a full 3x3 grid)
  const generatePages = () => {
    const pages = [];
    const totalPages = Math.ceil(TOTAL_ACHIEVEMENTS / CARDS_PER_PAGE);
    for (let pageIndex = 0; pageIndex < totalPages; pageIndex++) {
      const startIndex = pageIndex * CARDS_PER_PAGE;
      const endIndex = Math.min(startIndex + CARDS_PER_PAGE, TOTAL_ACHIEVEMENTS);
      const pageSlots = [];
      for (let i = startIndex; i < endIndex; i++) {
        const achievementNumber = allPossibleAchievements[i];
        const achievement = playerAchievementsMap.get(achievementNumber);
        pageSlots.push({
          number: achievementNumber,
          achievement: achievement || null
        });
      }
      // Fill empty slots to always have 9 per page
      while (pageSlots.length < CARDS_PER_PAGE) {
        pageSlots.push({ number: null, achievement: null });
      }
      pages.push(
        <div key={pageIndex} className="binder-page">
          <div className="achievement-grid">
            {pageSlots.map((slot, idx) => (
              <div key={slot.number ?? `empty-${idx}`} className={`achievement-card ${slot.achievement ? 'has-achievement' : 'missing-achievement'}`}>
                <div className="card-image-container">
                  {slot.achievement ? (
                    <img 
                      src={getAchievementImage(slot.achievement)} 
                      alt={slot.achievement.name}
                      className="achievement-card-image"
                      onClick={() => setSelectedImage({
                        url: getAchievementImage(slot.achievement!),
                        name: slot.achievement!.name,
                        rarity: slot.achievement!.rarity || 'Common',
                        number: slot.achievement!.collectorNumber
                      })}
                    />
                  ) : slot.number ? (
                    <div className="missing-achievement-placeholder">
                      <div className="achievement-number">#{slot.number}</div>
                      <div className="missing-text">Not Earned</div>
                    </div>
                  ) : (
                    <div className="missing-achievement-placeholder"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return pages;
  };

  const totalPages = Math.ceil(TOTAL_ACHIEVEMENTS / CARDS_PER_PAGE);

  if (isLoadingPlayers) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading players...</Typography>
      </Box>
    );
  }

  if (playersError) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        Error loading players. Please try again later.
      </Alert>
    );
  }

  if (!selectedPlayer) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box 
      sx={{ 
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)'
      }}
    >
      <Paper 
        sx={{ 
          m: 2, 
          display: 'flex', 
          alignItems: 'center', 
          gap: 4, 
          p: 2, 
          borderRadius: 2, 
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          flexWrap: 'wrap'
        }}
      >
        <Typography variant="body1" sx={{ fontWeight: 600, color: '#333', whiteSpace: 'nowrap' }}>
          Select Player:
        </Typography>
        <PlayerDropdown 
          selectedPlayer={selectedPlayer}
          onPlayerSelect={handlePlayerSelect}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h5" component="h2" sx={{ color: '#333' }}>
            {selectedPlayer}
          </Typography>
          <Button 
            variant="contained"
            onClick={() => {
              const link = document.createElement('a');
              link.href = '/agl-frontend/full_achievement.pdf';
              link.download = 'full_achievement.pdf';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            sx={{
              background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #20c997 0%, #17a2b8 100%)',
              }
            }}
          >
            Full Achievement List
          </Button>
        </Box>
        
        {/* Page Navigation */}
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, ml: 'auto' }}>
          <Button 
            variant="contained"
            onClick={handlePrevPage}
            disabled={currentPage === 0}
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
            ← Previous
          </Button>
          <Typography sx={{ fontWeight: 600, color: '#333', minWidth: 120, textAlign: 'center' }}>
            Page {currentPage + 1} of {totalPages}
          </Typography>
          <Button 
            variant="contained"
            onClick={handleNextPage}
            disabled={currentPage === totalPages - 1}
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
            Next →
          </Button>
        </Box>
      </Paper>

      {isLoadingAchievements ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>
            Loading achievements for {selectedPlayer}...
          </Typography>
        </Box>
      ) : achievementsError ? (
        <Alert severity="error" sx={{ m: 2 }}>
          Error loading achievements for {selectedPlayer}. Please try again later.
        </Alert>
      ) : (
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
          <div className="binder-container">
            <HTMLFlipBook
              ref={flipBookRef}
              width={650}
              height={650}
              size="fixed"
              minWidth={400}
              maxWidth={800}
              minHeight={400}
              maxHeight={800}
              showCover={false}
              flippingTime={600}
              usePortrait={true}
              startPage={0}
              drawShadow={true}
              className="achievement-flipbook"
              onFlip={(e: { data: number }) => setCurrentPage(e.data)}
              style={{}}
              startZIndex={0}
              autoSize={true}
              maxShadowOpacity={0.5}
              useMouseEvents={false}
              swipeDistance={0}
              clickEventForward={false}
              showPageCorners={true}
              disableFlipByClick={true}
              mobileScrollSupport={false}
            >
              {generatePages()}
            </HTMLFlipBook>
          </div>
        </Box>
      )}

      {selectedImage && (
        <ImagePreviewModal
          imageUrl={selectedImage.url}
          achievementName={selectedImage.name}
          achievementRarity={selectedImage.rarity}
          achievementNumber={selectedImage.number}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </Box>
  );
};

export default AchievementsTable; 
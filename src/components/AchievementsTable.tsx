import React, { useEffect, useState, useRef } from 'react';
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
    return <div className="loading">Loading players...</div>;
  }

  if (playersError) {
    return <div className="error">Error loading players. Please try again later.</div>;
  }

  if (!selectedPlayer) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="achievements-container">
      <div className="player-selection">
        <label htmlFor="player-dropdown">Select Player:</label>
        <PlayerDropdown 
          selectedPlayer={selectedPlayer}
          onPlayerSelect={handlePlayerSelect}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <h2>{selectedPlayer}</h2>
          <button 
            onClick={() => {
              const link = document.createElement('a');
              link.href = '/agl-frontend/full_achievement.pdf';
              link.download = 'full_achievement.pdf';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            style={{
              background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '0.9rem',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #20c997 0%, #17a2b8 100%)';
              e.currentTarget.style.transform = 'translateY(-1px)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(40, 167, 69, 0.3)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Full Achievement List
          </button>
        </div>
        
        {/* Page Navigation */}
        <div className="page-navigation">
          <button 
            className="page-btn prev-btn"
            onClick={handlePrevPage}
            disabled={currentPage === 0}
          >
            ← Previous
          </button>
          <div className="page-indicator">
            Page {currentPage + 1} of {totalPages}
          </div>
          <button 
            className="page-btn next-btn"
            onClick={handleNextPage}
            disabled={currentPage === totalPages - 1}
          >
            Next →
          </button>
        </div>
      </div>

      {isLoadingAchievements ? (
        <div className="loading">Loading achievements for {selectedPlayer}...</div>
      ) : achievementsError ? (
        <div className="error">Error loading achievements for {selectedPlayer}. Please try again later.</div>
      ) : (
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
    </div>
  );
};

export default AchievementsTable; 
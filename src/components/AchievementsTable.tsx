import React, { useEffect, useState } from 'react';
import { usePlayers } from '../hooks/usePlayers';
import { usePlayerAchievements } from '../hooks/usePlayers';
import type { Achievement } from '../types/player';
import { getAchievementImage, preloadAchievementImages } from '../utils/achievementImages';
import ImagePreviewModal from './ImagePreviewModal';
import PlayerDropdown from './PlayerDropdown';

const AchievementsTable: React.FC = () => {
  const { data: playersResponse, isLoading: isLoadingPlayers, error: playersError } = usePlayers();
  const [selectedPlayer, setSelectedPlayer] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<{ url: string; name: string; rarity: string; number: number } | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  
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

  const handlePageChange = (newPage: number) => {
    if (isFlipping) return; // Prevent rapid clicking
    
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentPage(newPage);
      setTimeout(() => setIsFlipping(false), 150);
    }, 150);
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

  // Generate achievement slots for current page
  const startIndex = currentPage * CARDS_PER_PAGE;
  const endIndex = Math.min(startIndex + CARDS_PER_PAGE, TOTAL_ACHIEVEMENTS);
  
  const currentPageSlots = [];
  for (let i = startIndex; i < endIndex; i++) {
    const achievementNumber = allPossibleAchievements[i];
    const achievement = playerAchievementsMap.get(achievementNumber);
    currentPageSlots.push({
      number: achievementNumber,
      achievement: achievement || null
    });
  }

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
        <h2>Achievements for {selectedPlayer}</h2>
        
        {/* Page Navigation */}
        <div className="page-navigation">
          <button 
            className="page-btn prev-btn"
            onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0 || isFlipping}
          >
            ← Previous
          </button>
          <div className="page-indicator">
            Page {currentPage + 1} of {totalPages} (Achievements {startIndex + 1}-{endIndex})
          </div>
          <button 
            className="page-btn next-btn"
            onClick={() => handlePageChange(Math.min(totalPages - 1, currentPage + 1))}
            disabled={currentPage === totalPages - 1 || isFlipping}
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
        <>
          <div className="binder-container">
            <div className={`binder-page ${isFlipping ? 'flipping' : ''}`}>
              <div className="achievement-grid">
                {currentPageSlots.map((slot) => (
                  <div key={slot.number} className={`achievement-card ${slot.achievement ? 'has-achievement' : 'missing-achievement'}`}>
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
                      ) : (
                        <div className="missing-achievement-placeholder">
                          <div className="achievement-number">#{slot.number}</div>
                          <div className="missing-text">Not Earned</div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
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
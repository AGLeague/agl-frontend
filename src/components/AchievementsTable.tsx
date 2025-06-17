import React, { useEffect, useState } from 'react';
import { usePlayers } from '../hooks/usePlayers';
import { usePlayerAchievements } from '../hooks/usePlayers';
import type { Achievement } from '../types/player';
import { getAchievementImage, preloadAchievementImages } from '../utils/achievementImages';
import ImagePreviewModal from './ImagePreviewModal';

const AchievementsTable: React.FC = () => {
  const { data: playersResponse, isLoading: isLoadingPlayers, error: playersError } = usePlayers();
  const firstPlayer = playersResponse?.data[0];
  const [selectedImage, setSelectedImage] = useState<{ url: string; name: string } | null>(null);
  
  const { 
    data: achievementsResponse, 
    isLoading: isLoadingAchievements, 
    error: achievementsError 
  } = usePlayerAchievements(firstPlayer?.name || '');

  // Preload images when achievements data is available
  useEffect(() => {
    if (achievementsResponse?.data?.achievementData) {
      preloadAchievementImages(achievementsResponse.data.achievementData);
    }
  }, [achievementsResponse]);

  if (isLoadingPlayers || isLoadingAchievements) {
    return <div className="loading">Loading achievements...</div>;
  }

  if (playersError || achievementsError) {
    return <div className="error">Error loading achievements. Please try again later.</div>;
  }

  if (!firstPlayer) {
    return <div className="error">No players found.</div>;
  }

  return (
    <div className="achievements-container">
      <h2>Achievements for {firstPlayer.name}</h2>
      <div className="achievements-table-container">
        <table className="achievements-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Rarity</th>
              <th>Collector Number</th>
            </tr>
          </thead>
          <tbody>
            {achievementsResponse?.data?.achievementData?.map((achievement: Achievement, index: number) => (
              <tr key={index}>
                <td className="achievement-image-cell">
                  <img 
                    src={getAchievementImage(achievement)} 
                    alt={achievement.name}
                    className="achievement-image"
                    onClick={() => setSelectedImage({
                      url: getAchievementImage(achievement),
                      name: achievement.name
                    })}
                  />
                </td>
                <td>{achievement.name}</td>
                <td>{achievement.rarity}</td>
                <td>{achievement.collectorNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedImage && (
        <ImagePreviewModal
          imageUrl={selectedImage.url}
          achievementName={selectedImage.name}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
};

export default AchievementsTable; 
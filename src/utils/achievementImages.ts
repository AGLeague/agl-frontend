import { Achievement } from '../types/player';

// Map rarity codes to their full names
const rarityMap: Record<string, string> = {
  'C': 'Common',
  'U': 'Uncommon',
  'R': 'Rare',
  'M': 'Mythic',
  'S': 'SPG'
};

// Function to get the image path for an achievement
export const getAchievementImage = (achievement: Achievement): string => {
  const rarity = rarityMap[achievement.rarity] || 'Common';
  const imageName = `${achievement.collectorNumber} - ${achievement.name} (${rarity}).png`;
  
  // Use the public directory approach for static assets
  // This ensures the images are available in both development and production
  return `/agl-frontend/images/${imageName}`;
};

// Function to preload all achievement images
export const preloadAchievementImages = (achievements: Achievement[]): void => {
  achievements.forEach(achievement => {
    const img = new Image();
    img.src = getAchievementImage(achievement);
  });
}; 
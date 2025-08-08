import { Achievement } from '../types/player';

// Map rarity codes to their display/file labels.
// Note: 'S' is special; we will try multiple candidates for it.
export const rarityMap: Record<string, string> = {
  C: 'Common',
  U: 'Uncommon',
  R: 'Rare',
  M: 'Mythic',
  // Primary label for 'S' will be 'SPG', with a fallback to 'Expert'.
  S: 'SPG',
};

// Build a path for a specific explicit rarity label
const buildImagePath = (
  collectorNumber: number,
  name: string,
  rarityLabel: string
): string => `/agl-frontend/images/${collectorNumber} - ${name} (${rarityLabel}).png`;

// Get primary and fallback image paths for an achievement.
// For rarity 'S', return [SPG, Expert]. For all others, return single path.
export const getAchievementImagePaths = (achievement: Achievement): string[] => {
  if (achievement.rarity === 'S') {
    return [
      buildImagePath(achievement.collectorNumber, achievement.name, 'SPG'),
      buildImagePath(achievement.collectorNumber, achievement.name, 'Expert'),
    ];
  }

  const label = rarityMap[achievement.rarity] || 'Common';
  return [buildImagePath(achievement.collectorNumber, achievement.name, label)];
};

// Backward-compatible single-path helper (returns the primary candidate)
export const getAchievementImage = (achievement: Achievement): string => {
  return getAchievementImagePaths(achievement)[0];
};

// Function to preload all achievement images
export const preloadAchievementImages = (achievements: Achievement[]): void => {
  achievements.forEach(achievement => {
    const paths = getAchievementImagePaths(achievement);
    paths.forEach(path => {
      const img = new Image();
      img.src = path;
    });
  });
};
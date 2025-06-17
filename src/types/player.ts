export interface PlayerStats {
  leagueCount: number;
  winRate: number;
  top8s: number;
}

export interface Player {
  name: string;
  stats: PlayerStats;
}

export interface Achievement {
  name: string;
  rarity: string;
  collectorNumber: number;
}

export interface PlayerAchievements {
  data: {
    achievementData: Achievement[];
  };
}

export interface PlayersResponse {
  links: {
    next: string;
    last: string;
    first: string;
    prev: string;
  };
  data: Player[];
} 
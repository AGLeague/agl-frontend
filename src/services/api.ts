import { Player, PlayerAchievements, PlayersResponse } from '../types/player';

const API_BASE_URL = 'https://agl.calebkoch.com/api';

export const playerApi = {
  // Get all players
  getPlayers: async (): Promise<PlayersResponse> => {
    const response = await fetch(`${API_BASE_URL}/players`);
    if (!response.ok) {
      throw new Error('Failed to fetch players');
    }
    return response.json();
  },

  // Get a single player
  getPlayer: async (playerName: string): Promise<Player> => {
    const response = await fetch(`${API_BASE_URL}/players/${encodeURIComponent(playerName)}`);
    if (!response.ok) {
      throw new Error('Failed to fetch player');
    }
    return response.json();
  },

  // Get player achievements
  getPlayerAchievements: async (playerName: string): Promise<PlayerAchievements> => {
    const response = await fetch(`${API_BASE_URL}/players/${encodeURIComponent(playerName)}/achievements`);
    if (!response.ok) {
      throw new Error('Failed to fetch player achievements');
    }
    return response.json();
  },

  // Create a new player
  createPlayer: async (player: Omit<Player, 'id'>): Promise<Player> => {
    const response = await fetch(`${API_BASE_URL}/players`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(player),
    });
    if (!response.ok) {
      throw new Error('Failed to create player');
    }
    return response.json();
  },

  // Update a player
  updatePlayer: async (playerName: string, player: Partial<Player>): Promise<Player> => {
    const response = await fetch(`${API_BASE_URL}/players/${encodeURIComponent(playerName)}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(player),
    });
    if (!response.ok) {
      throw new Error('Failed to update player');
    }
    return response.json();
  },

  // Delete a player
  deletePlayer: async (playerName: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/players/${encodeURIComponent(playerName)}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete player');
    }
  },
}; 
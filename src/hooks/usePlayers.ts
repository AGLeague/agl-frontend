import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { playerApi } from '../services/api';
import type { Player } from '../types/player';

// Query key factory
export const playerKeys = {
  all: ['players'] as const,
  lists: () => [...playerKeys.all, 'list'] as const,
  list: (filters: string) => [...playerKeys.lists(), { filters }] as const,
  details: () => [...playerKeys.all, 'detail'] as const,
  detail: (id: string) => [...playerKeys.details(), id] as const,
  achievements: (id: string) => [...playerKeys.detail(id), 'achievements'] as const,
  names: () => [...playerKeys.all, 'names'] as const,
};

// Hook for fetching all players
export const usePlayers = () => {
  return useQuery({
    queryKey: playerKeys.lists(),
    queryFn: async () => {
      return playerApi.getPlayers();
    },
  });
};

// Hook for fetching paginated players
export const usePaginatedPlayers = (page: number = 1) => {
  return useQuery({
    queryKey: [...playerKeys.lists(), page],
    queryFn: async () => {
      return playerApi.getPlayers(page);
    },
  });
};

// Hook for fetching player names
export const usePlayerNames = () => {
  return useQuery({
    queryKey: playerKeys.names(),
    queryFn: playerApi.getPlayerNames,
  });
};

// Hook for fetching a single player
export const usePlayer = (playerName: string) => {
  return useQuery({
    queryKey: playerKeys.detail(playerName),
    queryFn: () => playerApi.getPlayer(playerName),
    enabled: !!playerName,
  });
};

// Hook for fetching player achievements
export const usePlayerAchievements = (playerName: string) => {
  return useQuery({
    queryKey: playerKeys.achievements(playerName),
    queryFn: () => playerApi.getPlayerAchievements(playerName),
    enabled: !!playerName,
  });
};

// Hook for creating a player
export const useCreatePlayer = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: playerApi.createPlayer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: playerKeys.lists() });
    },
  });
};

// Hook for updating a player
export const useUpdatePlayer = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ playerName, player }: { playerName: string; player: Partial<Player> }) =>
      playerApi.updatePlayer(playerName, player),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: playerKeys.detail(variables.playerName) });
      queryClient.invalidateQueries({ queryKey: playerKeys.lists() });
    },
  });
};

// Hook for deleting a player
export const useDeletePlayer = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: playerApi.deletePlayer,
    onSuccess: (_, playerName) => {
      queryClient.invalidateQueries({ queryKey: playerKeys.detail(playerName) });
      queryClient.invalidateQueries({ queryKey: playerKeys.lists() });
    },
  });
}; 

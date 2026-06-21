// Local Storage System for Tournament Data
export interface TeamHistoryEntry {
  team: string;
  startDate: string;
  endDate?: string;
  achievements?: string[];
}

export interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video';
  uploadDate: string;
}

export interface Player {
  id: string;
  name: string;
  currentTeam: string;
  image?: string;
  stats: {
    matchesPlayed: number;
    wins: number;
    draws: number;
    losses: number;
    goalsFor: number;
    goalsAgainst: number;
    goalDifference: number;
    points: number;
    cupsWon: number;
  };
  teamHistory: TeamHistoryEntry[];
  media: MediaFile[];
  groupStage?: {
    group: string;
    groupPoints: number;
    groupPosition: number;
    groupMatchesPlayed: number;
  };
}

export interface Match {
  id: string;
  player1Id: string;
  player2Id: string;
  player1Team: string;
  player2Team: string;
  player1Score: number;
  player2Score: number;
  date: string;
  time: string;
  matchType: 'regular' | 'quarter-final' | 'semi-final' | 'final';
  status: 'scheduled' | 'completed' | 'live';
  round: string;
  week: number;
  winner?: string | null;
  notes?: string;
  matchEvents?: string[];
  completedAt?: string;
}

export interface Tournament {
  id: string;
  name: string;
  season: string;
  currentWeek: number;
  currentRound: string;
  startDate: string;
  settings: {
    pointsPerWin: number;
    pointsPerDraw: number;
    regularMatchDay: string; // 'saturday'
    knockoutMatchDay: string; // 'sunday'
  };
}

export interface Cup {
  id: string;
  name: string;
  winnerId: string;
  season: string;
  finalDate: string;
  participants: string[];
}

// Storage Keys
const STORAGE_KEYS = {
  PLAYERS: 'kawerify_players',
  MATCHES: 'kawerify_matches',
  TOURNAMENT: 'kawerify_tournament',
  CUPS: 'kawerify_cups',
  SETTINGS: 'kawerify_settings'
};

// Generic storage functions
export const saveToStorage = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to storage:', error);
  }
};

export const loadFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (error) {
    console.error('Error loading from storage:', error);
    return defaultValue;
  }
};

// Player management
export const savePlayers = (players: Player[]): void => {
  saveToStorage(STORAGE_KEYS.PLAYERS, players);
};

export const loadPlayers = (): Player[] => {
  return loadFromStorage<Player[]>(STORAGE_KEYS.PLAYERS, []);
};

export const addPlayer = (player: Omit<Player, 'id'>): Player => {
  const players = loadPlayers();
  const newPlayer: Player = {
    ...player,
    id: `player_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  };
  players.push(newPlayer);
  savePlayers(players);
  return newPlayer;
};

export const updatePlayer = (playerId: string, updates: Partial<Player>): void => {
  const players = loadPlayers();
  const index = players.findIndex(p => p.id === playerId);
  if (index !== -1) {
    players[index] = { ...players[index], ...updates };
    savePlayers(players);
  }
};

// Match management
export const saveMatches = (matches: Match[]): void => {
  saveToStorage(STORAGE_KEYS.MATCHES, matches);
};

export const loadMatches = (): Match[] => {
  return loadFromStorage<Match[]>(STORAGE_KEYS.MATCHES, []);
};

export const addMatch = (match: Omit<Match, 'id'>): Match => {
  const matches = loadMatches();
  const newMatch: Match = {
    ...match,
    id: `match_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  };
  matches.push(newMatch);
  saveMatches(matches);
  return newMatch;
};

export const updateMatch = (matchId: string, updates: Partial<Match>): void => {
  const matches = loadMatches();
  const index = matches.findIndex(m => m.id === matchId);
  if (index !== -1) {
    matches[index] = { ...matches[index], ...updates };
    saveMatches(matches);
    
    // Update player stats if match is completed
    if (updates.status === 'completed' && matches[index].player1Score !== undefined && matches[index].player2Score !== undefined) {
      updatePlayerStatsFromMatch(matches[index]);
    }
  }
};

// Update player statistics after match completion
const updatePlayerStatsFromMatch = (match: Match): void => {
  const players = loadPlayers();
  const player1 = players.find(p => p.id === match.player1Id);
  const player2 = players.find(p => p.id === match.player2Id);
  
  if (player1 && player2) {
    // Update matches played
    player1.stats.matchesPlayed++;
    player2.stats.matchesPlayed++;
    
    // Update goals
    player1.stats.goalsFor += match.player1Score;
    player1.stats.goalsAgainst += match.player2Score;
    player2.stats.goalsFor += match.player2Score;
    player2.stats.goalsAgainst += match.player1Score;
    
    // Update goal difference
    player1.stats.goalDifference = player1.stats.goalsFor - player1.stats.goalsAgainst;
    player2.stats.goalDifference = player2.stats.goalsFor - player2.stats.goalsAgainst;
    
    // Update wins/losses/draws and points
    if (match.player1Score > match.player2Score) {
      player1.stats.wins++;
      player1.stats.points += 3;
      player2.stats.losses++;
    } else if (match.player2Score > match.player1Score) {
      player2.stats.wins++;
      player2.stats.points += 3;
      player1.stats.losses++;
    } else {
      player1.stats.draws++;
      player2.stats.draws++;
      player1.stats.points += 1;
      player2.stats.points += 1;
    }
    
    savePlayers(players);
  }
};

// Tournament management
export const saveTournament = (tournament: Tournament): void => {
  saveToStorage(STORAGE_KEYS.TOURNAMENT, tournament);
};

export const loadTournament = (): Tournament => {
  return loadFromStorage<Tournament>(STORAGE_KEYS.TOURNAMENT, {
    id: 'tournament_2024',
    name: 'Kawerify Tech World Cup 2024/25',
    season: '2024/25',
    currentWeek: 1,
    currentRound: 'Group Stage',
    startDate: new Date().toISOString(),
    settings: {
      pointsPerWin: 3,
      pointsPerDraw: 1,
      regularMatchDay: 'saturday',
      knockoutMatchDay: 'sunday'
    }
  });
};

// Cup management
export const saveCups = (cups: Cup[]): void => {
  saveToStorage(STORAGE_KEYS.CUPS, cups);
};

export const loadCups = (): Cup[] => {
  return loadFromStorage<Cup[]>(STORAGE_KEYS.CUPS, []);
};

export const addCup = (cup: Omit<Cup, 'id'>): Cup => {
  const cups = loadCups();
  const newCup: Cup = {
    ...cup,
    id: `cup_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  };
  cups.push(newCup);
  saveCups(cups);
  return newCup;
};

// Initialize empty data - start from 0
export const initializeDefaultData = (): void => {
  // Start with completely empty data - admin controls everything
  console.log('Initializing with empty data - admin will add everything');
};

// Delete functions
export const deletePlayer = (playerId: string): void => {
  const players = loadPlayers();
  const filteredPlayers = players.filter(p => p.id !== playerId);
  savePlayers(filteredPlayers);
};

export const deleteMatch = (matchId: string): void => {
  const matches = loadMatches();
  const filteredMatches = matches.filter(m => m.id !== matchId);
  saveMatches(filteredMatches);
};

export const deleteCup = (cupId: string): void => {
  const cups = loadCups();
  const filteredCups = cups.filter(c => c.id !== cupId);
  saveCups(filteredCups);
};

// Clear all data functions
export const clearAllPlayers = (): void => {
  saveToStorage(STORAGE_KEYS.PLAYERS, []);
};

export const clearAllMatches = (): void => {
  saveToStorage(STORAGE_KEYS.MATCHES, []);
};

export const clearAllCups = (): void => {
  saveToStorage(STORAGE_KEYS.CUPS, []);
};

export const clearAllData = (): void => {
  clearAllPlayers();
  clearAllMatches();
  clearAllCups();
  // Reset tournament to default
  saveTournament({
    id: 'tournament_2024',
    name: 'Kawerify Tech World Cup 2024/25',
    season: '2024/25',
    currentWeek: 1,
    currentRound: 'Group Stage',
    startDate: new Date().toISOString(),
    settings: {
      pointsPerWin: 3,
      pointsPerDraw: 1,
      regularMatchDay: 'saturday',
      knockoutMatchDay: 'sunday'
    }
  });
};

// Update tournament settings
export const updateTournamentSettings = (updates: Partial<Tournament>): void => {
  const tournament = loadTournament();
  const updatedTournament = { ...tournament, ...updates };
  saveTournament(updatedTournament);
};

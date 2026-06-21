import { useState, useEffect, useCallback } from 'react';
import { cloudStorage } from '@/lib/cloudStorage';
import { Player, Match, Tournament, Cup } from '@/lib/storage';

interface CloudSyncState {
  players: Player[];
  matches: Match[];
  tournament: Tournament | null;
  cups: Cup[];
  isLoading: boolean;
  isOnline: boolean;
  lastSync: Date | null;
  error: string | null;
}

interface CloudSyncActions {
  // Players
  addPlayer: (player: Player) => Promise<void>;
  updatePlayer: (id: string, updates: Partial<Player>) => Promise<void>;
  deletePlayer: (id: string) => Promise<void>;
  
  // Matches
  addMatch: (match: Match) => Promise<void>;
  updateMatch: (id: string, updates: Partial<Match>) => Promise<void>;
  deleteMatch: (id: string) => Promise<void>;
  
  // Tournament
  updateTournament: (tournament: Tournament) => Promise<void>;
  
  // Cups
  addCup: (cup: Cup) => Promise<void>;
  
  // Bulk operations
  clearAllData: () => Promise<void>;
  clearPlayers: () => Promise<void>;
  clearMatches: () => Promise<void>;
  clearCups: () => Promise<void>;
  
  // Migration
  migrateFromLocalStorage: () => Promise<void>;
  
  // Manual sync
  forceSync: () => Promise<void>;
}

export function useCloudSync(): CloudSyncState & CloudSyncActions {
  const [state, setState] = useState<CloudSyncState>({
    players: [],
    matches: [],
    tournament: null,
    cups: [],
    isLoading: true,
    isOnline: navigator.onLine,
    lastSync: null,
    error: null
  });

  // Check if this is the first time using cloud storage
  const [hasMigrated, setHasMigrated] = useState(() => {
    return localStorage.getItem('cloud-migration-completed') === 'true';
  });

  // Update online status
  useEffect(() => {
    const handleOnline = () => setState(prev => ({ ...prev, isOnline: true }));
    const handleOffline = () => setState(prev => ({ ...prev, isOnline: false }));

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Initialize cloud storage and set up real-time listeners
  useEffect(() => {
    let mounted = true;

    const initializeCloudStorage = async () => {
      try {
        setState(prev => ({ ...prev, isLoading: true, error: null }));

        // Initialize default tournament
        await cloudStorage.initializeDefaultTournament();

        // Migrate from local storage if needed
        if (!hasMigrated) {
          console.log('🔄 Migrating data from local storage to cloud...');
          await cloudStorage.migrateFromLocalStorage();
          localStorage.setItem('cloud-migration-completed', 'true');
          setHasMigrated(true);
          console.log('✅ Migration completed');
        }

        // Set up real-time listeners
        const unsubscribePlayers = cloudStorage.subscribeToPlayers((players) => {
          if (mounted) {
            setState(prev => ({ ...prev, players, lastSync: new Date() }));
          }
        });

        const unsubscribeMatches = cloudStorage.subscribeToMatches((matches) => {
          if (mounted) {
            setState(prev => ({ ...prev, matches, lastSync: new Date() }));
          }
        });

        const unsubscribeTournament = cloudStorage.subscribeToTournament((tournament) => {
          if (mounted) {
            setState(prev => ({ ...prev, tournament, lastSync: new Date() }));
          }
        });

        const unsubscribeCups = cloudStorage.subscribeToCups((cups) => {
          if (mounted) {
            setState(prev => ({ ...prev, cups, lastSync: new Date() }));
          }
        });

        if (mounted) {
          setState(prev => ({ ...prev, isLoading: false }));
        }

        // Cleanup function
        return () => {
          unsubscribePlayers();
          unsubscribeMatches();
          unsubscribeTournament();
          unsubscribeCups();
        };

      } catch (error) {
        console.error('❌ Cloud storage initialization failed:', error);
        if (mounted) {
          setState(prev => ({ 
            ...prev, 
            isLoading: false, 
            error: 'Failed to connect to cloud storage. Check your internet connection.' 
          }));
        }
      }
    };

    const cleanup = initializeCloudStorage();

    return () => {
      mounted = false;
      cleanup.then(cleanupFn => cleanupFn?.());
      cloudStorage.unsubscribeAll();
    };
  }, [hasMigrated]);

  // Actions
  const addPlayer = useCallback(async (player: Player) => {
    try {
      await cloudStorage.addPlayer(player);
    } catch (error) {
      console.error('❌ Failed to add player:', error);
      setState(prev => ({ ...prev, error: 'Failed to add player' }));
    }
  }, []);

  const updatePlayer = useCallback(async (id: string, updates: Partial<Player>) => {
    try {
      await cloudStorage.updatePlayer(id, updates);
    } catch (error) {
      console.error('❌ Failed to update player:', error);
      setState(prev => ({ ...prev, error: 'Failed to update player' }));
    }
  }, []);

  const deletePlayer = useCallback(async (id: string) => {
    try {
      await cloudStorage.deletePlayer(id);
    } catch (error) {
      console.error('❌ Failed to delete player:', error);
      setState(prev => ({ ...prev, error: 'Failed to delete player' }));
    }
  }, []);

  const addMatch = useCallback(async (match: Match) => {
    try {
      await cloudStorage.addMatch(match);
    } catch (error) {
      console.error('❌ Failed to add match:', error);
      setState(prev => ({ ...prev, error: 'Failed to add match' }));
    }
  }, []);

  const updateMatch = useCallback(async (id: string, updates: Partial<Match>) => {
    try {
      await cloudStorage.updateMatch(id, updates);
    } catch (error) {
      console.error('❌ Failed to update match:', error);
      setState(prev => ({ ...prev, error: 'Failed to update match' }));
    }
  }, []);

  const deleteMatch = useCallback(async (id: string) => {
    try {
      await cloudStorage.deleteMatch(id);
    } catch (error) {
      console.error('❌ Failed to delete match:', error);
      setState(prev => ({ ...prev, error: 'Failed to delete match' }));
    }
  }, []);

  const updateTournament = useCallback(async (tournament: Tournament) => {
    try {
      await cloudStorage.updateTournament(tournament);
    } catch (error) {
      console.error('❌ Failed to update tournament:', error);
      setState(prev => ({ ...prev, error: 'Failed to update tournament' }));
    }
  }, []);

  const addCup = useCallback(async (cup: Cup) => {
    try {
      await cloudStorage.addCup(cup);
    } catch (error) {
      console.error('❌ Failed to add cup:', error);
      setState(prev => ({ ...prev, error: 'Failed to add cup' }));
    }
  }, []);

  const clearAllData = useCallback(async () => {
    try {
      await cloudStorage.clearAllData();
    } catch (error) {
      console.error('❌ Failed to clear all data:', error);
      setState(prev => ({ ...prev, error: 'Failed to clear all data' }));
    }
  }, []);

  const clearPlayers = useCallback(async () => {
    try {
      await cloudStorage.clearPlayers();
    } catch (error) {
      console.error('❌ Failed to clear players:', error);
      setState(prev => ({ ...prev, error: 'Failed to clear players' }));
    }
  }, []);

  const clearMatches = useCallback(async () => {
    try {
      await cloudStorage.clearMatches();
    } catch (error) {
      console.error('❌ Failed to clear matches:', error);
      setState(prev => ({ ...prev, error: 'Failed to clear matches' }));
    }
  }, []);

  const clearCups = useCallback(async () => {
    try {
      await cloudStorage.clearCups();
    } catch (error) {
      console.error('❌ Failed to clear cups:', error);
      setState(prev => ({ ...prev, error: 'Failed to clear cups' }));
    }
  }, []);

  const migrateFromLocalStorage = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      await cloudStorage.migrateFromLocalStorage();
      localStorage.setItem('cloud-migration-completed', 'true');
      setHasMigrated(true);
      setState(prev => ({ ...prev, isLoading: false }));
    } catch (error) {
      console.error('❌ Migration failed:', error);
      setState(prev => ({ ...prev, error: 'Migration failed', isLoading: false }));
    }
  }, []);

  const forceSync = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      // Force refresh by getting fresh data
      const [players, matches, tournament, cups] = await Promise.all([
        cloudStorage.getPlayers(),
        cloudStorage.getMatches(),
        cloudStorage.getTournament(),
        cloudStorage.getCups()
      ]);
      
      setState(prev => ({
        ...prev,
        players,
        matches,
        tournament,
        cups,
        isLoading: false,
        lastSync: new Date()
      }));
    } catch (error) {
      console.error('❌ Force sync failed:', error);
      setState(prev => ({ ...prev, error: 'Sync failed', isLoading: false }));
    }
  }, []);

  return {
    ...state,
    addPlayer,
    updatePlayer,
    deletePlayer,
    addMatch,
    updateMatch,
    deleteMatch,
    updateTournament,
    addCup,
    clearAllData,
    clearPlayers,
    clearMatches,
    clearCups,
    migrateFromLocalStorage,
    forceSync
  };
}

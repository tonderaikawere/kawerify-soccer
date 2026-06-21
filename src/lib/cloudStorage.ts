import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs, 
  onSnapshot, 
  query, 
  orderBy,
  Timestamp,
  writeBatch
} from 'firebase/firestore';
import { db } from './firebase';
import { Player, Match, Tournament, Cup } from './storage';

// Collection names
const COLLECTIONS = {
  PLAYERS: 'players',
  MATCHES: 'matches',
  TOURNAMENTS: 'tournaments',
  CUPS: 'cups',
  SETTINGS: 'settings'
};

// Real-time listeners
type DataCallback<T> = (data: T[]) => void;
type SingleDataCallback<T> = (data: T | null) => void;

class CloudStorage {
  private unsubscribers: (() => void)[] = [];

  // Players
  async addPlayer(player: Player): Promise<void> {
    await setDoc(doc(db, COLLECTIONS.PLAYERS, player.id), {
      ...player,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
  }

  async updatePlayer(id: string, updates: Partial<Player>): Promise<void> {
    await updateDoc(doc(db, COLLECTIONS.PLAYERS, id), {
      ...updates,
      updatedAt: Timestamp.now()
    });
  }

  async deletePlayer(id: string): Promise<void> {
    await deleteDoc(doc(db, COLLECTIONS.PLAYERS, id));
  }

  async getPlayers(): Promise<Player[]> {
    const snapshot = await getDocs(collection(db, COLLECTIONS.PLAYERS));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Player));
  }

  subscribeToPlayers(callback: DataCallback<Player>): () => void {
    const q = query(collection(db, COLLECTIONS.PLAYERS), orderBy('createdAt', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const players = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Player));
      callback(players);
    });
    this.unsubscribers.push(unsubscribe);
    return unsubscribe;
  }

  // Matches
  async addMatch(match: Match): Promise<void> {
    await setDoc(doc(db, COLLECTIONS.MATCHES, match.id), {
      ...match,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
  }

  async updateMatch(id: string, updates: Partial<Match>): Promise<void> {
    await updateDoc(doc(db, COLLECTIONS.MATCHES, id), {
      ...updates,
      updatedAt: Timestamp.now()
    });
  }

  async deleteMatch(id: string): Promise<void> {
    await deleteDoc(doc(db, COLLECTIONS.MATCHES, id));
  }

  async getMatches(): Promise<Match[]> {
    const snapshot = await getDocs(collection(db, COLLECTIONS.MATCHES));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Match));
  }

  subscribeToMatches(callback: DataCallback<Match>): () => void {
    const q = query(collection(db, COLLECTIONS.MATCHES), orderBy('createdAt', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const matches = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Match));
      callback(matches);
    });
    this.unsubscribers.push(unsubscribe);
    return unsubscribe;
  }

  // Tournament
  async updateTournament(tournament: Tournament): Promise<void> {
    await setDoc(doc(db, COLLECTIONS.TOURNAMENTS, 'current'), {
      ...tournament,
      updatedAt: Timestamp.now()
    });
  }

  async getTournament(): Promise<Tournament | null> {
    const docSnap = await getDoc(doc(db, COLLECTIONS.TOURNAMENTS, 'current'));
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Tournament;
    }
    return null;
  }

  subscribeToTournament(callback: SingleDataCallback<Tournament>): () => void {
    const unsubscribe = onSnapshot(doc(db, COLLECTIONS.TOURNAMENTS, 'current'), (doc) => {
      if (doc.exists()) {
        callback({ id: doc.id, ...doc.data() } as Tournament);
      } else {
        callback(null);
      }
    });
    this.unsubscribers.push(unsubscribe);
    return unsubscribe;
  }

  // Cups
  async addCup(cup: Cup): Promise<void> {
    await setDoc(doc(db, COLLECTIONS.CUPS, cup.id), {
      ...cup,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });
  }

  async getCups(): Promise<Cup[]> {
    const snapshot = await getDocs(collection(db, COLLECTIONS.CUPS));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Cup));
  }

  subscribeToCups(callback: DataCallback<Cup>): () => void {
    const q = query(collection(db, COLLECTIONS.CUPS), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const cups = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Cup));
      callback(cups);
    });
    this.unsubscribers.push(unsubscribe);
    return unsubscribe;
  }

  // Bulk operations
  async clearAllData(): Promise<void> {
    const batch = writeBatch(db);
    
    // Get all documents from all collections
    const collections = [COLLECTIONS.PLAYERS, COLLECTIONS.MATCHES, COLLECTIONS.CUPS];
    
    for (const collectionName of collections) {
      const snapshot = await getDocs(collection(db, collectionName));
      snapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
      });
    }
    
    await batch.commit();
  }

  async clearPlayers(): Promise<void> {
    const snapshot = await getDocs(collection(db, COLLECTIONS.PLAYERS));
    const batch = writeBatch(db);
    snapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });
    await batch.commit();
  }

  async clearMatches(): Promise<void> {
    const snapshot = await getDocs(collection(db, COLLECTIONS.MATCHES));
    const batch = writeBatch(db);
    snapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });
    await batch.commit();
  }

  async clearCups(): Promise<void> {
    const snapshot = await getDocs(collection(db, COLLECTIONS.CUPS));
    const batch = writeBatch(db);
    snapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });
    await batch.commit();
  }

  // Migration from local storage
  async migrateFromLocalStorage(): Promise<void> {
    try {
      // Get data from local storage
      const playersData = localStorage.getItem('tournament-players');
      const matchesData = localStorage.getItem('tournament-matches');
      const tournamentData = localStorage.getItem('tournament-settings');
      const cupsData = localStorage.getItem('tournament-cups');

      if (playersData) {
        const players = JSON.parse(playersData);
        for (const player of players) {
          await this.addPlayer(player);
        }
      }

      if (matchesData) {
        const matches = JSON.parse(matchesData);
        for (const match of matches) {
          await this.addMatch(match);
        }
      }

      if (tournamentData) {
        const tournament = JSON.parse(tournamentData);
        await this.updateTournament(tournament);
      }

      if (cupsData) {
        const cups = JSON.parse(cupsData);
        for (const cup of cups) {
          await this.addCup(cup);
        }
      }

      console.log('✅ Migration from local storage completed');
    } catch (error) {
      console.error('❌ Migration failed:', error);
    }
  }

  // Initialize default tournament if none exists
  async initializeDefaultTournament(): Promise<void> {
    const tournament = await this.getTournament();
    if (!tournament) {
      const defaultTournament: Tournament = {
        id: 'current',
        name: 'Kawerify Tech Tournament',
        season: '2024/25',
        currentWeek: 1,
        currentRound: 'Regular Season',
        startDate: new Date().toISOString(),
        settings: {
          pointsPerWin: 3,
          pointsPerDraw: 1,
          regularMatchDay: 'saturday',
          knockoutMatchDay: 'sunday',
          maxPlayersPerGroup: 4,
          minMatchesForKnockout: 4
        }
      };
      await this.updateTournament(defaultTournament);
    }
  }

  // Cleanup all listeners
  unsubscribeAll(): void {
    this.unsubscribers.forEach(unsubscribe => unsubscribe());
    this.unsubscribers = [];
  }
}

// Export singleton instance
export const cloudStorage = new CloudStorage();

// Export types for convenience
export type { DataCallback, SingleDataCallback };

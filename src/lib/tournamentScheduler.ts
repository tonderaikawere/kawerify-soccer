import { 
  Player, 
  Match, 
  Tournament, 
  loadPlayers, 
  loadMatches, 
  loadTournament, 
  savePlayers, 
  saveMatches, 
  saveTournament,
  addMatch 
} from './storage';

export interface TournamentGroup {
  id: string;
  name: string;
  players: Player[];
  matches: Match[];
  standings: GroupStanding[];
}

export interface GroupStanding {
  playerId: string;
  playerName: string;
  matchesPlayed: number;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  position: number;
}

export interface TournamentPhase {
  phase: 'group' | 'round-of-16' | 'quarter-final' | 'semi-final' | 'final';
  groups?: TournamentGroup[];
  matches?: Match[];
  qualifiedPlayers?: Player[];
}

export class TournamentScheduler {
  private players: Player[] = [];
  private matches: Match[] = [];
  private tournament: Tournament;

  constructor() {
    this.players = loadPlayers();
    this.matches = loadMatches();
    this.tournament = loadTournament();
  }

  // Main scheduling function
  public autoScheduleTournament(): void {
    const activePlayers = this.getActivePlayers();
    
    if (activePlayers.length < 4) {
      console.log('Need at least 4 players for tournament');
      return;
    }

    const currentPhase = this.determineCurrentPhase();
    
    switch (currentPhase) {
      case 'group':
        this.scheduleGroupStage();
        break;
      case 'round-of-16':
        this.scheduleKnockoutRound('round-of-16', 16);
        break;
      case 'quarter-final':
        this.scheduleKnockoutRound('quarter-final', 8);
        break;
      case 'semi-final':
        this.scheduleKnockoutRound('semi-final', 4);
        break;
      case 'final':
        this.scheduleKnockoutRound('final', 2);
        break;
    }
  }

  // Determine what phase the tournament should be in
  private determineCurrentPhase(): string {
    const activePlayers = this.getActivePlayers();
    const playerCount = activePlayers.length;

    // Check if we need group stage (8+ players)
    if (playerCount >= 8) {
      const groupMatches = this.getGroupStageMatches();
      const completedGroupMatches = groupMatches.filter(m => m.status === 'completed');
      const totalGroupMatches = this.calculateTotalGroupMatches(playerCount);
      
      if (completedGroupMatches.length < totalGroupMatches) {
        return 'group';
      }
      
      // Group stage complete, move to knockouts
      const qualifiedPlayers = this.getQualifiedPlayersFromGroups();
      if (qualifiedPlayers.length >= 16) return 'round-of-16';
      if (qualifiedPlayers.length >= 8) return 'quarter-final';
      if (qualifiedPlayers.length >= 4) return 'semi-final';
      if (qualifiedPlayers.length >= 2) return 'final';
    } else {
      // Direct knockout for fewer than 8 players
      const playersWithEnoughMatches = activePlayers.filter(p => p.stats.matchesPlayed >= 4);
      
      if (playersWithEnoughMatches.length < playerCount) {
        return 'group'; // Still need more matches
      }
      
      // Determine knockout phase based on player count
      if (playerCount >= 8) return 'quarter-final';
      if (playerCount >= 4) return 'semi-final';
      if (playerCount >= 2) return 'final';
    }
    
    return 'group';
  }

  // Schedule group stage matches
  private scheduleGroupStage(): void {
    const activePlayers = this.getActivePlayers();
    const playerCount = activePlayers.length;

    if (playerCount >= 8) {
      // FA Cup style groups
      this.scheduleGroupStageWithGroups();
    } else {
      // Round-robin for smaller tournaments
      this.scheduleRoundRobin();
    }
  }

  // Schedule FA Cup style group stage
  private scheduleGroupStageWithGroups(): void {
    const activePlayers = this.getActivePlayers();
    const groups = this.createGroups(activePlayers);
    
    groups.forEach((group, groupIndex) => {
      const groupLetter = String.fromCharCode(65 + groupIndex); // A, B, C, D...
      
      // Schedule matches within each group
      for (let i = 0; i < group.length; i++) {
        for (let j = i + 1; j < group.length; j++) {
          const player1 = group[i];
          const player2 = group[j];
          
          // Check if match already exists
          const existingMatch = this.matches.find(m => 
            (m.player1Id === player1.id && m.player2Id === player2.id) ||
            (m.player1Id === player2.id && m.player2Id === player1.id)
          );
          
          if (!existingMatch) {
            const matchDate = this.getNextMatchDate();
            const newMatch = addMatch({
              player1Id: player1.id,
              player2Id: player2.id,
              player1Team: player1.currentTeam,
              player2Team: player2.currentTeam,
              player1Score: 0,
              player2Score: 0,
              date: matchDate.toISOString().split('T')[0],
              time: this.getMatchTime(),
              matchType: 'regular',
              status: 'scheduled',
              round: `Group ${groupLetter}`,
              week: this.tournament.currentWeek
            });
            
            this.matches.push(newMatch);
          }
        }
      }
      
      // Update player group information
      group.forEach((player, index) => {
        player.groupStage = {
          group: groupLetter,
          groupPoints: 0,
          groupPosition: index + 1,
          groupMatchesPlayed: 0
        };
      });
    });
    
    savePlayers(this.players);
    saveMatches(this.matches);
  }

  // Create groups for FA Cup style tournament
  private createGroups(players: Player[]): Player[][] {
    const playerCount = players.length;
    let groupSize = 4;
    let groupCount = Math.ceil(playerCount / groupSize);
    
    // Adjust group size for better distribution
    if (playerCount % 4 === 0) {
      groupSize = 4;
      groupCount = playerCount / 4;
    } else if (playerCount % 3 === 0 && playerCount >= 9) {
      groupSize = 3;
      groupCount = playerCount / 3;
    } else {
      // Mixed group sizes
      groupSize = Math.floor(playerCount / Math.ceil(playerCount / 4));
    }
    
    // Sort players by current points for balanced groups
    const sortedPlayers = [...players].sort((a, b) => b.stats.points - a.stats.points);
    const groups: Player[][] = [];
    
    // Snake draft distribution for balanced groups
    for (let i = 0; i < groupCount; i++) {
      groups.push([]);
    }
    
    sortedPlayers.forEach((player, index) => {
      const groupIndex = Math.floor(index / groupCount) % 2 === 0 
        ? index % groupCount 
        : groupCount - 1 - (index % groupCount);
      groups[groupIndex].push(player);
    });
    
    return groups.filter(group => group.length > 0);
  }

  // Schedule round-robin for smaller tournaments
  private scheduleRoundRobin(): void {
    const activePlayers = this.getActivePlayers();
    
    for (let i = 0; i < activePlayers.length; i++) {
      for (let j = i + 1; j < activePlayers.length; j++) {
        const player1 = activePlayers[i];
        const player2 = activePlayers[j];
        
        // Check how many times they've played
        const existingMatches = this.matches.filter(m => 
          (m.player1Id === player1.id && m.player2Id === player2.id) ||
          (m.player1Id === player2.id && m.player2Id === player1.id)
        );
        
        // Schedule up to 2 matches between each pair
        if (existingMatches.length < 2) {
          const matchDate = this.getNextMatchDate();
          const newMatch = addMatch({
            player1Id: player1.id,
            player2Id: player2.id,
            player1Team: player1.currentTeam,
            player2Team: player2.currentTeam,
            player1Score: 0,
            player2Score: 0,
            date: matchDate.toISOString().split('T')[0],
            time: this.getMatchTime(),
            matchType: 'regular',
            status: 'scheduled',
            round: 'Round Robin',
            week: this.tournament.currentWeek
          });
          
          this.matches.push(newMatch);
        }
      }
    }
    
    saveMatches(this.matches);
  }

  // Schedule knockout rounds
  private scheduleKnockoutRound(roundType: string, playerCount: number): void {
    const qualifiedPlayers = this.getQualifiedPlayers(playerCount);
    
    if (qualifiedPlayers.length < playerCount) {
      console.log(`Not enough qualified players for ${roundType}`);
      return;
    }
    
    // Pair players for knockout matches
    const pairs = this.createKnockoutPairs(qualifiedPlayers);
    
    pairs.forEach(pair => {
      const matchDate = this.getNextKnockoutDate();
      const newMatch = addMatch({
        player1Id: pair[0].id,
        player2Id: pair[1].id,
        player1Team: pair[0].currentTeam,
        player2Team: pair[1].currentTeam,
        player1Score: 0,
        player2Score: 0,
        date: matchDate.toISOString().split('T')[0],
        time: this.getMatchTime(),
        matchType: roundType as any,
        status: 'scheduled',
        round: this.capitalizeFirst(roundType),
        week: this.tournament.currentWeek
      });
      
      this.matches.push(newMatch);
    });
    
    saveMatches(this.matches);
  }

  // Get qualified players from groups
  private getQualifiedPlayersFromGroups(): Player[] {
    const groups = this.getGroupStandings();
    const qualified: Player[] = [];
    
    groups.forEach(group => {
      // Take top 2 from each group
      const topPlayers = group.standings
        .sort((a, b) => b.points - a.points || b.goalDifference - a.goalDifference)
        .slice(0, 2);
      
      topPlayers.forEach(standing => {
        const player = this.players.find(p => p.id === standing.playerId);
        if (player) qualified.push(player);
      });
    });
    
    return qualified;
  }

  // Get qualified players based on overall performance
  private getQualifiedPlayers(count: number): Player[] {
    const activePlayers = this.getActivePlayers();
    
    // Sort by points, then goal difference, then goals scored
    return activePlayers
      .filter(p => p.stats.matchesPlayed >= 4) // Must have played at least 4 matches
      .sort((a, b) => {
        if (b.stats.points !== a.stats.points) return b.stats.points - a.stats.points;
        if (b.stats.goalDifference !== a.stats.goalDifference) return b.stats.goalDifference - a.stats.goalDifference;
        return b.stats.goalsFor - a.stats.goalsFor;
      })
      .slice(0, count);
  }

  // Create knockout pairs
  private createKnockoutPairs(players: Player[]): Player[][] {
    const pairs: Player[][] = [];
    
    // Sort players by ranking
    const sortedPlayers = [...players].sort((a, b) => {
      if (b.stats.points !== a.stats.points) return b.stats.points - a.stats.points;
      if (b.stats.goalDifference !== a.stats.goalDifference) return b.stats.goalDifference - a.stats.goalDifference;
      return b.stats.goalsFor - a.stats.goalsFor;
    });
    
    // Pair 1st vs last, 2nd vs 2nd last, etc.
    for (let i = 0; i < sortedPlayers.length / 2; i++) {
      pairs.push([sortedPlayers[i], sortedPlayers[sortedPlayers.length - 1 - i]]);
    }
    
    return pairs;
  }

  // Get group standings
  private getGroupStandings(): TournamentGroup[] {
    const groups: { [key: string]: TournamentGroup } = {};
    
    this.players.forEach(player => {
      if (player.groupStage) {
        const groupId = player.groupStage.group;
        if (!groups[groupId]) {
          groups[groupId] = {
            id: groupId,
            name: `Group ${groupId}`,
            players: [],
            matches: [],
            standings: []
          };
        }
        groups[groupId].players.push(player);
      }
    });
    
    // Calculate standings for each group
    Object.values(groups).forEach(group => {
      group.standings = this.calculateGroupStandings(group.players);
    });
    
    return Object.values(groups);
  }

  // Calculate standings for a group
  private calculateGroupStandings(players: Player[]): GroupStanding[] {
    const standings: GroupStanding[] = players.map(player => {
      const groupMatches = this.matches.filter(m => 
        (m.player1Id === player.id || m.player2Id === player.id) && 
        m.round.startsWith('Group') &&
        m.status === 'completed'
      );
      
      let wins = 0, draws = 0, losses = 0, goalsFor = 0, goalsAgainst = 0, points = 0;
      
      groupMatches.forEach(match => {
        if (match.player1Id === player.id) {
          goalsFor += match.player1Score;
          goalsAgainst += match.player2Score;
          if (match.player1Score > match.player2Score) {
            wins++;
            points += 3;
          } else if (match.player1Score === match.player2Score) {
            draws++;
            points += 1;
          } else {
            losses++;
          }
        } else {
          goalsFor += match.player2Score;
          goalsAgainst += match.player1Score;
          if (match.player2Score > match.player1Score) {
            wins++;
            points += 3;
          } else if (match.player2Score === match.player1Score) {
            draws++;
            points += 1;
          } else {
            losses++;
          }
        }
      });
      
      return {
        playerId: player.id,
        playerName: player.name,
        matchesPlayed: groupMatches.length,
        wins,
        draws,
        losses,
        goalsFor,
        goalsAgainst,
        goalDifference: goalsFor - goalsAgainst,
        points,
        position: 0
      };
    });
    
    // Sort and assign positions
    standings.sort((a, b) => {
      if (b.points !== a.points) return b.points - a.points;
      if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
      return b.goalsFor - a.goalsFor;
    });
    
    standings.forEach((standing, index) => {
      standing.position = index + 1;
    });
    
    return standings;
  }

  // Helper functions
  private getActivePlayers(): Player[] {
    return this.players.filter(player => player.name && player.currentTeam);
  }

  private getGroupStageMatches(): Match[] {
    return this.matches.filter(m => m.round.startsWith('Group') || m.round === 'Round Robin');
  }

  private calculateTotalGroupMatches(playerCount: number): number {
    if (playerCount >= 8) {
      const groupCount = Math.ceil(playerCount / 4);
      const avgGroupSize = playerCount / groupCount;
      return Math.floor(groupCount * (avgGroupSize * (avgGroupSize - 1)) / 2);
    } else {
      // Round robin: n * (n-1) / 2 * 2 (each pair plays twice)
      return playerCount * (playerCount - 1);
    }
  }

  private getNextMatchDate(): Date {
    const today = new Date();
    const nextSaturday = new Date(today);
    nextSaturday.setDate(today.getDate() + (6 - today.getDay()) % 7);
    return nextSaturday;
  }

  private getNextKnockoutDate(): Date {
    const today = new Date();
    const nextSunday = new Date(today);
    nextSunday.setDate(today.getDate() + (7 - today.getDay()) % 7);
    return nextSunday;
  }

  private getMatchTime(): string {
    const times = ['14:00', '16:00', '18:00', '20:00'];
    return times[Math.floor(Math.random() * times.length)];
  }

  private capitalizeFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).replace('-', ' ');
  }

  // Public method to check if auto-scheduling should trigger
  public shouldAutoSchedule(): boolean {
    const activePlayers = this.getActivePlayers();
    if (activePlayers.length < 4) return false;
    
    // Check if all current round matches are completed
    const currentRoundMatches = this.matches.filter(m => 
      m.status === 'scheduled' || m.status === 'live'
    );
    
    return currentRoundMatches.length === 0;
  }

  // Get current tournament status
  public getTournamentStatus(): {
    phase: string;
    totalPlayers: number;
    completedMatches: number;
    scheduledMatches: number;
    qualifiedPlayers: number;
  } {
    const activePlayers = this.getActivePlayers();
    const completedMatches = this.matches.filter(m => m.status === 'completed').length;
    const scheduledMatches = this.matches.filter(m => m.status === 'scheduled').length;
    const currentPhase = this.determineCurrentPhase();
    
    let qualifiedPlayers = 0;
    if (currentPhase === 'group') {
      qualifiedPlayers = activePlayers.filter(p => p.stats.matchesPlayed >= 4).length;
    } else {
      qualifiedPlayers = this.getQualifiedPlayersFromGroups().length;
    }
    
    return {
      phase: currentPhase,
      totalPlayers: activePlayers.length,
      completedMatches,
      scheduledMatches,
      qualifiedPlayers
    };
  }
}

// Export singleton instance
export const tournamentScheduler = new TournamentScheduler();

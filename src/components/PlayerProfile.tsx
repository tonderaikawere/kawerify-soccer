import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { loadPlayers, loadMatches, type Player, type Match } from "@/lib/storage";

interface PlayerProfileProps {
  playerId?: string;
  showAll?: boolean;
}

const PlayerProfile = ({ playerId, showAll = true }: PlayerProfileProps) => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    setPlayers(loadPlayers());
    setMatches(loadMatches());
  }, []);

  const getPlayerMatches = (pId: string) => {
    return matches.filter(match => 
      (match.player1Id === pId || match.player2Id === pId) && match.status === 'completed'
    );
  };

  const getWinRate = (player: Player) => {
    const total = player.stats.matchesPlayed;
    return total > 0 ? Math.round((player.stats.wins / total) * 100) : 0;
  };

  const getGoalDifference = (player: Player) => {
    return player.stats.goalsFor - player.stats.goalsAgainst;
  };

  const getPlayerRank = (player: Player) => {
    const sortedPlayers = [...players].sort((a, b) => {
      if (b.stats.points !== a.stats.points) return b.stats.points - a.stats.points;
      return (b.stats.goalsFor - b.stats.goalsAgainst) - (a.stats.goalsFor - a.stats.goalsAgainst);
    });
    return sortedPlayers.findIndex(p => p.id === player.id) + 1;
  };

  const getRecentForm = (pId: string) => {
    const playerMatches = getPlayerMatches(pId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
    
    return playerMatches.map(match => {
      const isPlayer1 = match.player1Id === pId;
      const playerScore = isPlayer1 ? match.player1Score : match.player2Score;
      const opponentScore = isPlayer1 ? match.player2Score : match.player1Score;
      
      if (playerScore > opponentScore) return 'W';
      if (playerScore < opponentScore) return 'L';
      return 'D';
    });
  };

  const getFormColor = (result: string) => {
    switch (result) {
      case 'W': return 'bg-emerald-500 text-white';
      case 'L': return 'bg-rose-500 text-white';
      case 'D': return 'bg-amber-500 text-slate-950';
      default: return 'bg-slate-500 text-white';
    }
  };

  const displayPlayers = showAll ? players : players.filter(p => p.id === playerId);

  if (displayPlayers.length === 0) {
    return (
      <div className="text-center py-16 px-4 glass-panel rounded-2xl max-w-md mx-auto">
        <h3 className="text-lg font-black text-slate-800 dark:text-slate-200">No Players Registered</h3>
        <p className="text-slate-500 text-sm mt-1">Players will appear here once registered in the Admin Dashboard.</p>
      </div>
    );
  }

  // Get FUT card gradient theme based on rank
  const getFUTTheme = (rank: number) => {
    if (rank === 1) return "from-amber-400/90 to-yellow-600/90 border-amber-400 shadow-amber-500/10";
    if (rank === 2) return "from-slate-300 to-slate-500 border-slate-300 shadow-slate-400/10";
    if (rank === 3) return "from-amber-600 to-amber-800 border-amber-700 shadow-amber-800/10";
    return "from-slate-900 to-slate-950 border-slate-800 shadow-black/40";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {displayPlayers.map((player) => {
        const winRate = getWinRate(player);
        const goalDiff = getGoalDifference(player);
        const rank = getPlayerRank(player);
        const recentForm = getRecentForm(player.id);
        const futTheme = getFUTTheme(rank);
        const isPodium = rank <= 3;

        return (
          <Card 
            key={player.id} 
            className="overflow-hidden glass-card rounded-2xl border border-white/20 dark:border-white/5 transition-all duration-300 hover:-translate-y-2 group"
          >
            {/* FUT-style header with background gradient */}
            <CardHeader className={`relative overflow-hidden p-6 text-white bg-gradient-to-br ${
              isPodium ? futTheme : "from-slate-900 via-slate-950 to-slate-900 border-b border-slate-800"
            }`}>
              {/* Overlay pattern */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 to-transparent opacity-60" />
              
              <div className="relative z-10 flex items-center space-x-4">
                <div className="relative">
                  <Avatar className={`h-20 w-20 border-4 shadow-xl ${
                    rank === 1 ? 'border-amber-400' :
                    rank === 2 ? 'border-slate-300' :
                    rank === 3 ? 'border-amber-700' : 'border-slate-800'
                  }`}>
                    <AvatarImage src={player.image} alt={player.name} />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-emerald-600 text-white text-2xl font-black">
                      {player.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  {/* Rank bubble */}
                  <div className={`absolute -top-2.5 -right-2.5 rounded-full h-8 w-8 flex items-center justify-center text-xs font-black shadow-lg border ${
                    rank === 1 ? 'bg-amber-400 text-amber-950 border-amber-500' :
                    rank === 2 ? 'bg-slate-300 text-slate-950 border-slate-400' :
                    rank === 3 ? 'bg-amber-800 text-white border-amber-900' : 'bg-slate-900 text-slate-200 border-slate-800'
                  }`}>
                    #{rank}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg font-black truncate">{player.name}</CardTitle>
                  <CardDescription className={`text-sm font-bold mt-0.5 truncate ${
                    isPodium ? 'text-white/90' : 'text-primary'
                  }`}>
                    {player.currentTeam}
                  </CardDescription>
                  <div className="flex items-center space-x-2 mt-2 flex-wrap gap-y-1">
                    <Badge variant="secondary" className="text-[10px] font-bold bg-white/20 border-0 text-white">
                      Joined {new Date(player.joinDate).getFullYear()}
                    </Badge>
                    {player.stats.cupsWon > 0 && (
                      <Badge className="bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 text-[10px] font-black border-0 shadow-sm">
                        🏆 {player.stats.cupsWon} Cup{player.stats.cupsWon > 1 ? 's' : ''}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              <Tabs defaultValue="stats" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-muted/60 p-1 rounded-xl">
                  <TabsTrigger value="stats" className="rounded-lg text-xs font-bold">Stats</TabsTrigger>
                  <TabsTrigger value="form" className="rounded-lg text-xs font-bold">Form</TabsTrigger>
                  <TabsTrigger value="history" className="rounded-lg text-xs font-bold">Career</TabsTrigger>
                </TabsList>

                {/* Statistics Tab */}
                <TabsContent value="stats" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/10 rounded-xl">
                      <p className="text-xl font-black text-emerald-600 dark:text-emerald-400">{player.stats.wins}</p>
                      <p className="text-[10px] text-emerald-600/80 font-bold uppercase tracking-wider">Wins</p>
                    </div>
                    
                    <div className="text-center p-3 bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/10 rounded-xl">
                      <p className="text-xl font-black text-blue-600 dark:text-blue-400">{player.stats.points}</p>
                      <p className="text-[10px] text-blue-600/80 font-bold uppercase tracking-wider">Points</p>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-muted-foreground">Win Rate</span>
                      <span className="text-primary font-black">{winRate}%</span>
                    </div>
                    <Progress value={winRate} className="h-1.5 bg-muted" />
                  </div>

                  <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs border-t border-border/40 pt-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Matches:</span>
                      <span className="font-extrabold text-slate-800 dark:text-slate-200">{player.stats.matchesPlayed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Losses:</span>
                      <span className="font-extrabold text-slate-800 dark:text-slate-200">{player.stats.losses}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Goals For:</span>
                      <span className="font-extrabold text-emerald-500">{player.stats.goalsFor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Goals Against:</span>
                      <span className="font-extrabold text-rose-500">{player.stats.goalsAgainst}</span>
                    </div>
                    <div className="flex justify-between col-span-2 pt-2 border-t border-border/40 mt-1">
                      <span className="font-extrabold text-slate-700 dark:text-slate-300">Goal Diff:</span>
                      <span className={`font-black ${goalDiff >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {goalDiff >= 0 ? `+${goalDiff}` : goalDiff}
                      </span>
                    </div>
                  </div>
                </TabsContent>

                {/* Form Tab */}
                <TabsContent value="form" className="space-y-4 mt-4">
                  <div className="text-center bg-muted/20 p-4 rounded-xl border border-border/30">
                    <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Recent Matches</h4>
                    <div className="flex justify-center space-x-1.5">
                      {recentForm.length > 0 ? recentForm.map((result, index) => (
                        <div
                          key={index}
                          className={`h-7 w-7 rounded-lg ${getFormColor(result)} flex items-center justify-center font-extrabold text-xs shadow-sm`}
                          title={result === 'W' ? 'Win' : result === 'L' ? 'Loss' : 'Draw'}
                        >
                          {result}
                        </div>
                      )) : (
                        <p className="text-muted-foreground text-xs py-2">No matches logged yet</p>
                      )}
                    </div>
                    {recentForm.length > 0 && (
                      <p className="text-[10px] text-muted-foreground mt-2.5">
                        Latest games on the right
                      </p>
                    )}
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between py-1 border-b border-border/30">
                      <span className="flex items-center text-muted-foreground">
                        Avg Goals / Match
                      </span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">
                        {player.stats.matchesPlayed > 0 ? 
                          (player.stats.goalsFor / player.stats.matchesPlayed).toFixed(1) : '0.0'}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between py-1">
                      <span className="flex items-center text-muted-foreground">
                        Avg Points / Match
                      </span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">
                        {player.stats.matchesPlayed > 0 ? 
                          (player.stats.points / player.stats.matchesPlayed).toFixed(1) : '0.0'}
                      </span>
                    </div>
                  </div>
                </TabsContent>

                {/* Career history & Achievements Tab */}
                <TabsContent value="history" className="space-y-4 mt-4">
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2">
                        Clubs
                      </h4>
                      <div className="space-y-1.5">
                        {player.teamHistory.slice(0, 2).map((team, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-muted/40 rounded-xl text-xs">
                            <span className="font-bold truncate text-slate-800 dark:text-slate-200">{team}</span>
                            {index === 0 && (
                              <Badge className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/10 border-0 text-[10px] font-bold px-1.5 py-0">
                                Current
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2">
                        Badges
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {player.stats.cupsWon > 0 && (
                          <Badge className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/10 border-0 text-[9px] font-black uppercase">
                            🏆 Champ
                          </Badge>
                        )}
                        {winRate >= 65 && (
                          <Badge className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/10 border-0 text-[9px] font-black uppercase">
                            🔥 Elite
                          </Badge>
                        )}
                        {goalDiff >= 15 && (
                          <Badge className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/10 border-0 text-[9px] font-black uppercase">
                            🎯 Striker
                          </Badge>
                        )}
                        {player.stats.matchesPlayed >= 20 && (
                          <Badge className="bg-purple-500/10 text-purple-500 hover:bg-purple-500/10 border-0 text-[9px] font-black uppercase">
                            🛡️ Vet
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border/40">
                    <Link to={`/player/${player.id}`} className="block">
                      <Button className="w-full rounded-xl bg-gradient-to-r from-primary to-emerald-600 hover:opacity-95 text-white font-extrabold text-xs">
                        Open Gamer Profile
                      </Button>
                    </Link>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default PlayerProfile;

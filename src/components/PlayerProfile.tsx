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
        <p className="text-slate-500 text-xs font-semibold mt-1">Players will appear here once registered in the Admin Dashboard.</p>
      </div>
    );
  }

  // Get FUT card gradient theme based on rank
  const getFUTThemeClass = (rank: number) => {
    if (rank === 1) return "fut-gold-card";
    if (rank === 2) return "fut-silver-card";
    if (rank === 3) return "fut-bronze-card";
    return "";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {displayPlayers.map((player) => {
        const winRate = getWinRate(player);
        const goalDiff = getGoalDifference(player);
        const rank = getPlayerRank(player);
        const recentForm = getRecentForm(player.id);
        const futClass = getFUTThemeClass(rank);
        
        // Calculate dynamic FUT Attributes based on real tournament performance
        const maxPoints = Math.max(...players.map(p => p.stats.points || 1), 1);
        const maxGoals = Math.max(...players.map(p => p.stats.goalsFor || 1), 1);
        const maxGoalsAgainst = Math.max(...players.map(p => p.stats.goalsAgainst || 1), 1);
        
        const ovr = Math.min(Math.max(75 + Math.round((player.stats.points / maxPoints) * 24), 75), 99);
        const pac = Math.min(Math.max(70 + Math.round(winRate / 4), 60), 99);
        const sho = Math.min(Math.max(68 + Math.round((player.stats.goalsFor / maxGoals) * 31), 60), 99);
        const pas = Math.min(Math.max(65 + Math.round(winRate / 3), 60), 99);
        const dri = Math.min(Math.max(70 + Math.round(winRate / 3.5), 60), 99);
        const def = Math.min(Math.max(60 - Math.round((player.stats.goalsAgainst / maxGoalsAgainst) * 15) + Math.round(winRate / 5), 50), 99);
        const phy = Math.min(Math.max(75 + Math.round(player.stats.matchesPlayed * 0.7), 60), 99);

        return (
          <Card 
            key={player.id} 
            className="overflow-hidden bg-slate-900/60 dark:bg-slate-950/45 backdrop-blur-md rounded-2xl border border-white/10 dark:border-white/5 transition-all duration-300 hover:-translate-y-2 group shadow-2xl"
          >
            {/* FUT-style Card Render */}
            <div className="p-4 bg-slate-950/40 border-b border-white/5 flex justify-center">
              <div className="fut-card-wrapper max-w-[200px]">
                <div className={`fut-card-body ${futClass} flex flex-col justify-between p-3 relative`}>
                  <div className="fut-shine-overlay" />
                  
                  {/* Card Upper Info: OVR + POS + Team Logo initials */}
                  <div className="flex justify-between items-start pt-1 z-10">
                    <div className="flex flex-col items-center">
                      <span className="text-2xl font-black text-amber-400 leading-none">{ovr}</span>
                      <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-0.5">GMR</span>
                      <span className={`text-[9px] font-black rounded px-1 mt-1 ${
                        rank === 1 ? 'bg-amber-400/20 text-amber-300' :
                        rank === 2 ? 'bg-slate-400/20 text-slate-300' :
                        rank === 3 ? 'bg-amber-700/20 text-amber-400' : 'bg-slate-800/40 text-slate-400'
                      }`}>
                        #{rank}
                      </span>
                    </div>
                    
                    <Avatar className="h-16 w-16 border-2 border-white/10 shadow-lg">
                      <AvatarImage src={player.image} alt={player.name} />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-emerald-600 text-white text-lg font-black">
                        {player.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  
                  {/* Player Name */}
                  <div className="text-center z-10 my-1 border-t border-b border-white/5 py-1">
                    <h4 className="text-xs font-black tracking-wider text-white uppercase truncate">
                      {player.name.split(' ')[0]}
                    </h4>
                    <p className="text-[8px] text-emerald-450 font-bold uppercase tracking-widest leading-none mt-0.5 truncate">
                      {player.currentTeam}
                    </p>
                  </div>
                  
                  {/* FUT Grid Attributes */}
                  <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 text-[9px] font-black text-slate-300 z-10 border-t border-white/5 pt-1.5 pb-0.5">
                    <div className="flex justify-between px-1">
                      <span className="text-slate-500">PAC</span>
                      <span className="text-white">{pac}</span>
                    </div>
                    <div className="flex justify-between px-1">
                      <span className="text-slate-500">DRI</span>
                      <span className="text-white">{dri}</span>
                    </div>
                    <div className="flex justify-between px-1">
                      <span className="text-slate-500">SHO</span>
                      <span className="text-white">{sho}</span>
                    </div>
                    <div className="flex justify-between px-1">
                      <span className="text-slate-500">DEF</span>
                      <span className="text-white">{def}</span>
                    </div>
                    <div className="flex justify-between px-1">
                      <span className="text-slate-500">PAS</span>
                      <span className="text-white">{pas}</span>
                    </div>
                    <div className="flex justify-between px-1">
                      <span className="text-slate-500">PHY</span>
                      <span className="text-white">{phy}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Tabs Details */}
            <CardContent className="p-6">
              <Tabs defaultValue="stats" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-slate-950/60 p-1 rounded-xl">
                  <TabsTrigger value="stats" className="rounded-lg text-[10px] font-black uppercase tracking-wider text-slate-400 data-[state=active]:bg-primary/20 data-[state=active]:text-primary">Stats</TabsTrigger>
                  <TabsTrigger value="form" className="rounded-lg text-[10px] font-black uppercase tracking-wider text-slate-400 data-[state=active]:bg-primary/20 data-[state=active]:text-primary">Form</TabsTrigger>
                  <TabsTrigger value="history" className="rounded-lg text-[10px] font-black uppercase tracking-wider text-slate-400 data-[state=active]:bg-primary/20 data-[state=active]:text-primary">Career</TabsTrigger>
                </TabsList>

                {/* Statistics Tab */}
                <TabsContent value="stats" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
                      <p className="text-lg font-black text-emerald-400">{player.stats.wins}</p>
                      <p className="text-[8px] text-emerald-400/80 font-black uppercase tracking-wider">Wins</p>
                    </div>
                    
                    <div className="text-center p-3 bg-blue-500/5 border border-blue-500/10 rounded-xl">
                      <p className="text-lg font-black text-blue-400">{player.stats.points}</p>
                      <p className="text-[8px] text-blue-400/80 font-black uppercase tracking-wider">Points</p>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                      <span className="text-slate-550">Win Ratio</span>
                      <span className="text-primary font-black">{winRate}%</span>
                    </div>
                    <Progress value={winRate} className="h-1.5 bg-slate-950" />
                  </div>

                  <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs border-t border-white/5 pt-3 font-semibold text-slate-400">
                    <div className="flex justify-between">
                      <span>Matches:</span>
                      <span className="font-extrabold text-slate-200">{player.stats.matchesPlayed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Losses:</span>
                      <span className="font-extrabold text-slate-200">{player.stats.losses}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Goals For:</span>
                      <span className="font-extrabold text-emerald-400">{player.stats.goalsFor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Goals Against:</span>
                      <span className="font-extrabold text-rose-455">{player.stats.goalsAgainst}</span>
                    </div>
                    <div className="flex justify-between col-span-2 pt-2 border-t border-white/5 mt-1 font-black text-[10px] uppercase tracking-widest text-slate-400">
                      <span>Goal Difference:</span>
                      <span className={`font-black ${goalDiff >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {goalDiff >= 0 ? `+${goalDiff}` : goalDiff}
                      </span>
                    </div>
                  </div>
                </TabsContent>

                {/* Form Tab */}
                <TabsContent value="form" className="space-y-4 mt-4">
                  <div className="text-center bg-slate-950/40 p-4 rounded-xl border border-white/5">
                    <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-3">Recent Matches</h4>
                    <div className="flex justify-center space-x-1.5">
                      {recentForm.length > 0 ? recentForm.map((result, index) => (
                        <div
                          key={index}
                          className={`h-7 w-7 rounded-lg ${getFormColor(result)} flex items-center justify-center font-black text-xs shadow-sm`}
                          title={result === 'W' ? 'Win' : result === 'L' ? 'Loss' : 'Draw'}
                        >
                          {result}
                        </div>
                      )) : (
                        <p className="text-slate-500 text-xs py-2 uppercase font-black tracking-widest">No matches logged yet</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 text-xs font-semibold text-slate-400">
                    <div className="flex items-center justify-between py-1 border-b border-white/5">
                      <span>Avg Goals / Match</span>
                      <span className="font-bold text-white">
                        {player.stats.matchesPlayed > 0 ? 
                          (player.stats.goalsFor / player.stats.matchesPlayed).toFixed(1) : '0.0'}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between py-1">
                      <span>Avg Points / Match</span>
                      <span className="font-bold text-white">
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
                      <h4 className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-2">Clubs</h4>
                      <div className="space-y-1.5">
                        {player.teamHistory.slice(0, 2).map((historyEntry, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-slate-950/30 rounded-xl text-xs font-bold text-slate-400">
                            <span className="truncate text-white">{historyEntry.team}</span>
                            {index === 0 && (
                              <Badge className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/10 border-0 text-[8px] font-black uppercase">
                                Current
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-2">Badges</h4>
                      <div className="flex flex-wrap gap-1.5">
                        {player.stats.cupsWon > 0 && (
                          <Badge className="bg-amber-500/10 text-amber-400 hover:bg-amber-500/10 border-0 text-[8px] font-black uppercase">
                            🏆 Champ
                          </Badge>
                        )}
                        {winRate >= 65 && (
                          <Badge className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/10 border-0 text-[8px] font-black uppercase">
                            🔥 Elite
                          </Badge>
                        )}
                        {goalDiff >= 15 && (
                          <Badge className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/10 border-0 text-[8px] font-black uppercase">
                            🎯 Striker
                          </Badge>
                        )}
                        {player.stats.matchesPlayed >= 20 && (
                          <Badge className="bg-purple-500/10 text-purple-400 hover:bg-purple-500/10 border-0 text-[8px] font-black uppercase">
                            🛡️ Vet
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5">
                    <Link to={`/player/${player.id}`} className="block">
                      <Button className="w-full rounded-xl bg-gradient-to-r from-primary to-emerald-600 hover:opacity-95 text-white font-black text-xs uppercase tracking-wider py-3.5 shadow-md shadow-primary/10">
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

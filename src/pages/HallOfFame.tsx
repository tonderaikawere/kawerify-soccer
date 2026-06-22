import { useState, useEffect } from "react";
import { Trophy, Medal, Award, Star, Crown, Calendar, Users, Target, Shield, Flame, Activity } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { loadCups, loadPlayers, type Cup, type Player } from "@/lib/storage";

const HallOfFame = () => {
  const [cups, setCups] = useState<Cup[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    setCups(loadCups());
    setPlayers(loadPlayers());
  }, []);

  const getPlayerById = (id: string) => players.find(p => p.id === id);

  const championPlayers = players
    .filter(p => p.stats.cupsWon > 0)
    .sort((a, b) => b.stats.cupsWon - a.stats.cupsWon);

  const topScorers = players
    .sort((a, b) => b.stats.goalsFor - a.stats.goalsFor)
    .slice(0, 10);

  const mostWins = players
    .sort((a, b) => b.stats.wins - a.stats.wins)
    .slice(0, 10);

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="h-8 w-8 text-amber-400 animate-float" />;
    if (rank === 2) return <Trophy className="h-8 w-8 text-slate-300" />;
    if (rank === 3) return <Medal className="h-8 w-8 text-amber-700" />;
    return <Award className="h-6 w-6 text-blue-500" />;
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#070b13] transition-colors duration-300">
      <Navbar />
      <main className="flex-1 pb-16">
        <div className="container mx-auto px-6 py-12 max-w-6xl">
          
          {/* Page Hero Header */}
          <div className="mb-12 text-center max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center justify-center p-3 bg-amber-500/10 rounded-2xl mb-2 animate-float">
              <Crown className="h-8 w-8 text-amber-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
              Hall of <span className="bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 bg-clip-text text-transparent">Fame</span>
            </h1>
            <p className="text-base md:text-lg text-slate-500 font-medium">
              Celebrating the legends, cup winners, and tournament record-holders of Kawerify Tech World Cup.
            </p>
            
            {/* Golden divider */}
            <div className="flex justify-center items-center space-x-2 pt-2">
              <div className="h-0.5 w-10 bg-amber-500/20" />
              <Trophy className="h-4 w-4 text-amber-400 opacity-60" />
              <div className="h-0.5 w-10 bg-amber-500/20" />
            </div>
          </div>

          <Tabs defaultValue="champions" className="space-y-8">
            <TabsList className="flex flex-wrap md:grid w-full grid-cols-4 bg-muted/60 p-1 rounded-2xl h-auto gap-1">
              <TabsTrigger value="champions" className="rounded-xl text-xs font-black flex-1 py-2.5 data-[state=active]:bg-amber-500 data-[state=active]:text-slate-950">
                <Crown className="h-3.5 w-3.5 mr-1.5" />
                Champions
              </TabsTrigger>
              <TabsTrigger value="cups" className="rounded-xl text-xs font-black flex-1 py-2.5 data-[state=active]:bg-amber-500 data-[state=active]:text-slate-950">
                <Trophy className="h-3.5 w-3.5 mr-1.5" />
                Cup History
              </TabsTrigger>
              <TabsTrigger value="records" className="rounded-xl text-xs font-black flex-1 py-2.5 data-[state=active]:bg-amber-500 data-[state=active]:text-slate-950">
                <Target className="h-3.5 w-3.5 mr-1.5" />
                Records
              </TabsTrigger>
              <TabsTrigger value="legends" className="rounded-xl text-xs font-black flex-1 py-2.5 data-[state=active]:bg-amber-500 data-[state=active]:text-slate-950">
                <Star className="h-3.5 w-3.5 mr-1.5" />
                Legends
              </TabsTrigger>
            </TabsList>

            {/* Champions Tab */}
            <TabsContent value="champions" className="space-y-8">
              <Card className="glass-panel border-white/20 dark:border-white/5 overflow-hidden shadow-2xl rounded-2xl">
                <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 text-slate-950">
                  <CardTitle className="text-2xl font-black flex items-center">
                    <Crown className="h-6 w-6 mr-2" />
                    World Cup Winners
                  </CardTitle>
                  <CardDescription className="text-amber-950/80 text-sm font-semibold">
                    Players who have lifted the ultimate Kawerify Tech World Cup trophy
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  {championPlayers.length > 0 ? (
                    <div className="divide-y divide-border/60">
                      {championPlayers.map((player, index) => {
                        const rank = index + 1;
                        return (
                          <div
                            key={player.id}
                            className={`flex items-center justify-between p-6 px-8 transition-colors duration-200 hover:bg-slate-500/5 dark:hover:bg-slate-100/5 ${
                              rank === 1 ? "bg-amber-500/5 dark:bg-amber-500/10" : ""
                            }`}
                          >
                            <div className="flex items-center space-x-6">
                              <div className="w-10 flex justify-center">
                                {getRankIcon(rank)}
                              </div>
                              
                              <div className="flex items-center space-x-4">
                                <Avatar className="h-16 w-16 border-2 border-amber-400 shadow-md">
                                  <AvatarImage src={player.image} alt={player.name} />
                                  <AvatarFallback className="bg-gradient-to-br from-yellow-500 to-amber-600 text-slate-950 text-xl font-bold">
                                    {player.name.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                
                                <div>
                                  <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">{player.name}</h3>
                                  <p className="text-xs text-primary font-bold">{player.currentTeam}</p>
                                  <div className="flex items-center space-x-2 mt-2">
                                    <Badge className="bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 text-[10px] font-black border-0">
                                      <Trophy className="h-3 w-3 mr-1" />
                                      {player.stats.cupsWon} Cup{player.stats.cupsWon > 1 ? 's' : ''}
                                    </Badge>
                                    <Badge variant="outline" className="text-[10px] font-bold border-border/80 text-muted-foreground bg-background/50">
                                      {player.stats.wins} Wins
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <div className="text-3xl font-black text-amber-500">
                                {player.stats.cupsWon}
                              </div>
                              <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Titles</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-16 space-y-4">
                      <Crown className="h-16 w-16 mx-auto text-slate-400 dark:text-slate-600 animate-float" />
                      <h3 className="text-lg font-black text-slate-800 dark:text-slate-200">No Champions Crowned</h3>
                      <p className="text-slate-500 text-sm max-w-xs mx-auto">
                        The first tournament champions will be celebrated here once logged.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Cup History Tab */}
            <TabsContent value="cups" className="space-y-6">
              <Card className="glass-panel border-white/20 dark:border-white/5 shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center">
                    <Trophy className="h-5 w-5 mr-2 text-amber-500" />
                    Tournament Cup History
                  </CardTitle>
                  <CardDescription>Complete archive of all completed Kawerify Tech tournaments</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {cups.length > 0 ? (
                    <div className="space-y-4">
                      {cups
                        .sort((a, b) => new Date(b.finalDate).getTime() - new Date(a.finalDate).getTime())
                        .map((cup) => {
                          const winner = getPlayerById(cup.winnerId);
                          return (
                            <div key={cup.id} className="flex items-center justify-between p-4 bg-muted/40 rounded-xl border border-border/40 text-sm">
                              <div className="flex items-center space-x-4">
                                <div className="h-11 w-11 bg-gradient-to-br from-yellow-400 to-amber-500 text-slate-950 rounded-xl flex items-center justify-center shadow-sm">
                                  <Trophy className="h-5 w-5" />
                                </div>
                                <div>
                                  <h3 className="font-extrabold text-slate-900 dark:text-white text-base">{cup.name}</h3>
                                  <p className="text-xs text-muted-foreground font-semibold">
                                    Season {cup.season} • {cup.participants.length} Active competitors
                                  </p>
                                </div>
                              </div>
                              
                              <div className="text-right">
                                <p className="font-black text-slate-800 dark:text-slate-200">{winner?.name || 'TBD Winner'}</p>
                                <p className="text-xs text-muted-foreground flex items-center justify-end mt-0.5 font-medium">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  {new Date(cup.finalDate).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  ) : (
                    <div className="text-center py-12 space-y-3">
                      <Trophy className="h-12 w-12 mx-auto text-slate-400 dark:text-slate-600 animate-float" />
                      <h3 className="text-base font-black text-slate-800 dark:text-slate-200">No Tournaments Logged</h3>
                      <p className="text-slate-500 text-xs">
                        Tournament history will appear here once competitions are finalized.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Records Tab */}
            <TabsContent value="records" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Top Scorers */}
                <Card className="glass-panel border-white/20 dark:border-white/5 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center">
                      <Target className="h-5 w-5 mr-2 text-emerald-500" />
                      Top Goal Scorers
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {topScorers.slice(0, 5).map((player, index) => (
                        <div key={player.id} className="flex items-center justify-between pb-3 border-b border-border/30 last:border-0 last:pb-0 text-sm">
                          <div className="flex items-center space-x-3">
                            <div className={`h-7 w-7 rounded-full flex items-center justify-center font-black text-xs text-white ${
                              index === 0 ? 'bg-amber-500' : index === 1 ? 'bg-slate-400' : index === 2 ? 'bg-amber-700' : 'bg-slate-700'
                            }`}>
                              {index + 1}
                            </div>
                            <div>
                              <p className="font-extrabold text-slate-800 dark:text-slate-200">{player.name}</p>
                              <p className="text-[10px] text-muted-foreground font-semibold uppercase">{player.currentTeam}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-black text-lg text-emerald-500">{player.stats.goalsFor}</p>
                            <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider">goals</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Most Wins */}
                <Card className="glass-panel border-white/20 dark:border-white/5 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center">
                      <Trophy className="h-5 w-5 mr-2 text-blue-500" />
                      Most Wins
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {mostWins.slice(0, 5).map((player, index) => (
                        <div key={player.id} className="flex items-center justify-between pb-3 border-b border-border/30 last:border-0 last:pb-0 text-sm">
                          <div className="flex items-center space-x-3">
                            <div className={`h-7 w-7 rounded-full flex items-center justify-center font-black text-xs text-white ${
                              index === 0 ? 'bg-amber-500' : index === 1 ? 'bg-slate-400' : index === 2 ? 'bg-amber-700' : 'bg-slate-700'
                            }`}>
                              {index + 1}
                            </div>
                            <div>
                              <p className="font-extrabold text-slate-800 dark:text-slate-200">{player.name}</p>
                              <p className="text-[10px] text-muted-foreground font-semibold uppercase">{player.currentTeam}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-black text-lg text-blue-500">{player.stats.wins}</p>
                            <p className="text-[9px] text-muted-foreground uppercase font-bold tracking-wider">wins</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Season Records Indicators */}
              <Card className="glass-panel border-white/20 dark:border-white/5 shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center">
                    <Activity className="h-5 w-5 mr-2 text-purple-500" />
                    All‑Time Season Records
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/10">
                      <Target className="h-10 w-10 mx-auto mb-2 text-emerald-500" />
                      <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
                        {Math.max(...players.map(p => p.stats.goalsFor), 0)}
                      </p>
                      <p className="text-xs text-slate-500 font-extrabold uppercase mt-1">Most goals in single season</p>
                    </div>
                    
                    <div className="text-center p-4 bg-blue-500/5 rounded-xl border border-blue-500/10">
                      <Trophy className="h-10 w-10 mx-auto mb-2 text-blue-500" />
                      <p className="text-3xl font-black text-blue-600 dark:text-blue-400">
                        {Math.max(...players.map(p => p.stats.wins), 0)}
                      </p>
                      <p className="text-xs text-slate-500 font-extrabold uppercase mt-1">Most wins in single season</p>
                    </div>
                    
                    <div className="text-center p-4 bg-purple-500/5 rounded-xl border border-purple-500/10">
                      <Star className="h-10 w-10 mx-auto mb-2 text-purple-500" />
                      <p className="text-3xl font-black text-purple-600 dark:text-purple-400">
                        {Math.max(...players.map(p => p.stats.points), 0)}
                      </p>
                      <p className="text-xs text-slate-500 font-extrabold uppercase mt-1">Most points in single season</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Legends Tab */}
            <TabsContent value="legends" className="space-y-6">
              <Card className="glass-panel border-white/20 dark:border-white/5 shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center">
                    <Star className="h-5 w-5 mr-2 text-amber-500 animate-float" />
                    Tournament Legends Catalogue
                  </CardTitle>
                  <CardDescription>
                    Veteran players with exceptional matches history or cup victories
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {players
                      .filter(p => p.stats.matchesPlayed >= 10 || p.stats.cupsWon > 0 || p.stats.wins >= 10)
                      .sort((a, b) => (b.stats.cupsWon * 100 + b.stats.wins) - (a.stats.cupsWon * 100 + a.stats.wins))
                      .map((player) => {
                        const winRate = player.stats.matchesPlayed > 0 ? Math.round((player.stats.wins / player.stats.matchesPlayed) * 100) : 0;
                        const hasCups = player.stats.cupsWon > 0;
                        
                        return (
                          <Card key={player.id} className={`overflow-hidden glass-card rounded-xl border border-border/50 hover:-translate-y-1 hover:border-amber-500/30 transition-all duration-300 ${
                            hasCups ? 'ring-1 ring-amber-500/10' : ''
                          }`}>
                            <CardHeader className={`bg-gradient-to-br ${
                              hasCups 
                                ? 'from-amber-500/10 to-orange-500/5 border-b border-amber-500/10' 
                                : 'from-slate-900/40 to-slate-950/40 border-b'
                            } p-4`}>
                              <div className="flex items-center space-x-4">
                                <Avatar className={`h-14 w-14 border-2 ${hasCups ? 'border-amber-400' : 'border-slate-800'}`}>
                                  <AvatarImage src={player.image} alt={player.name} />
                                  <AvatarFallback className="bg-gradient-to-br from-yellow-500 to-amber-600 text-slate-950 font-bold">
                                    {player.name.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <CardTitle className="text-base font-extrabold">{player.name}</CardTitle>
                                  <CardDescription className="text-xs font-semibold text-primary">{player.currentTeam}</CardDescription>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="p-4 text-xs space-y-2">
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Tournament Cups:</span>
                                <span className="font-extrabold text-amber-500">{player.stats.cupsWon}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Total Wins:</span>
                                <span className="font-extrabold text-emerald-500">{player.stats.wins}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Win Rate:</span>
                                <span className="font-extrabold text-slate-800 dark:text-slate-200">{winRate}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-muted-foreground">Goals For:</span>
                                <span className="font-extrabold text-slate-800 dark:text-slate-200">{player.stats.goalsFor}</span>
                              </div>
                              
                              <div className="mt-3.5 flex flex-wrap gap-1.5 pt-2.5 border-t border-border/40">
                                {player.stats.cupsWon > 0 && (
                                  <Badge className="bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 text-[9px] font-black border-0">
                                    Champion
                                  </Badge>
                                )}
                                {winRate >= 70 && (
                                  <Badge className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/10 border-0 text-[9px] font-black">
                                    Elite
                                  </Badge>
                                )}
                                {player.stats.goalsFor >= 30 && (
                                  <Badge className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/10 border-0 text-[9px] font-black">
                                    Machine
                                  </Badge>
                                )}
                                {player.stats.matchesPlayed >= 50 && (
                                  <Badge className="bg-purple-500/10 text-purple-500 hover:bg-purple-500/10 border-0 text-[9px] font-black">
                                    Veteran
                                  </Badge>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                  </div>
                  
                  {players.filter(p => p.stats.matchesPlayed >= 10 || p.stats.cupsWon > 0 || p.stats.wins >= 10).length === 0 && (
                    <div className="text-center py-12 space-y-2">
                      <Star className="h-12 w-12 mx-auto text-slate-400 dark:text-slate-600 animate-float" />
                      <h3 className="text-base font-black text-slate-800 dark:text-slate-200">No Legends Catalogued</h3>
                      <p className="text-slate-500 text-xs">Competitors will earn legends status through consistent performances.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HallOfFame;

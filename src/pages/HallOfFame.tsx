import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { loadCups, loadPlayers, type Cup, type Player } from "@/lib/storage";
import PageHeader from "@/components/PageHeader";
import { 
  Trophy, 
  Award, 
  History, 
  Flame, 
  Activity, 
  ShieldAlert, 
  Calendar, 
  Zap 
} from "lucide-react";

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
    if (rank === 1) return <span className="text-2xl animate-float inline-block">🥇</span>;
    if (rank === 2) return <span className="text-2xl inline-block">🥈</span>;
    if (rank === 3) return <span className="text-2xl inline-block">🥉</span>;
    return <span className="text-xs font-black text-slate-450">#{rank}</span>;
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#070b13] bg-stadium-grid text-white relative overflow-hidden transition-all duration-300">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-radial-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none animate-radial-pulse" />

      <Navbar />
      <main className="flex-1 pb-16 relative z-10">
        <div className="container mx-auto px-6 py-12 max-w-5xl">
          
          {/* Page Hero Header */}
          <PageHeader
            title="Hall of"
            highlightedTitle="Fame"
            subtitle="Celebrating the legends, cup winners, and tournament record-holders of Kawerify Tech World Cup."
          />

          <Tabs defaultValue="champions" className="space-y-8">
            <TabsList className="flex flex-wrap md:grid w-full grid-cols-4 bg-slate-950/60 p-1.5 rounded-2xl h-auto gap-1 border border-white/5 backdrop-blur-md">
              <TabsTrigger value="champions" className="rounded-xl text-[10px] font-black uppercase tracking-wider flex-1 py-3 text-slate-400 data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-400 data-[state=active]:to-amber-500 data-[state=active]:text-slate-950 data-[state=active]:shadow-lg transition-all duration-300">
                Champions
              </TabsTrigger>
              <TabsTrigger value="cups" className="rounded-xl text-[10px] font-black uppercase tracking-wider flex-1 py-3 text-slate-400 data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-400 data-[state=active]:to-amber-500 data-[state=active]:text-slate-950 data-[state=active]:shadow-lg transition-all duration-300">
                Cup History
              </TabsTrigger>
              <TabsTrigger value="records" className="rounded-xl text-[10px] font-black uppercase tracking-wider flex-1 py-3 text-slate-400 data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-400 data-[state=active]:to-amber-500 data-[state=active]:text-slate-950 data-[state=active]:shadow-lg transition-all duration-300">
                Records
              </TabsTrigger>
              <TabsTrigger value="legends" className="rounded-xl text-[10px] font-black uppercase tracking-wider flex-1 py-3 text-slate-400 data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-400 data-[state=active]:to-amber-500 data-[state=active]:text-slate-950 data-[state=active]:shadow-lg transition-all duration-300">
                Legends
              </TabsTrigger>
            </TabsList>

            {/* Champions Tab */}
            <TabsContent value="champions" className="space-y-8 outline-none">
              <Card className="bg-slate-900/60 dark:bg-slate-950/45 backdrop-blur-md border border-white/10 dark:border-white/5 rounded-2xl shadow-xl overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 text-center sm:text-left relative overflow-hidden">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 to-transparent opacity-50" />
                  <CardTitle className="text-xl font-black uppercase tracking-wider text-slate-950 flex items-center justify-center sm:justify-start gap-2 relative z-10">
                    <Trophy className="h-5 w-5 animate-float text-slate-950" /> World Cup Winners
                  </CardTitle>
                  <CardDescription className="text-amber-950 text-xs font-black uppercase tracking-wider mt-1 relative z-10">
                    Players who have lifted the ultimate Kawerify Tech World Cup trophy
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  {championPlayers.length > 0 ? (
                    <div className="divide-y divide-white/5 bg-slate-950/30">
                      {championPlayers.map((player, index) => {
                        const rank = index + 1;
                        return (
                          <div
                            key={player.id}
                            className={`flex flex-col sm:flex-row items-center justify-between p-6 px-8 gap-6 transition-all duration-300 hover:bg-white/5 ${
                              rank === 1 ? "bg-amber-500/5 border-l-4 border-amber-500" : ""
                            }`}
                          >
                            <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
                              <div className="w-10 flex justify-center">
                                {getRankIcon(rank)}
                              </div>
                              
                              <div className="flex flex-col sm:flex-row items-center gap-5">
                                <div className="relative group">
                                  <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-300" />
                                  <Avatar className="h-16 w-16 border-2 border-amber-400 shadow-lg relative z-10">
                                    <AvatarImage src={player.image} alt={player.name} />
                                    <AvatarFallback className="bg-gradient-to-br from-yellow-500 to-amber-600 text-slate-950 text-xl font-extrabold">
                                      {player.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                </div>
                                
                                <div className="space-y-1">
                                  <h3 className="font-extrabold text-lg text-white uppercase tracking-wide">{player.name}</h3>
                                  <p className="text-xs text-primary font-bold">{player.currentTeam}</p>
                                  <div className="flex items-center justify-center sm:justify-start space-x-2 mt-2">
                                    <Badge className="bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 text-[10px] font-black border-0 uppercase py-0.5 px-2">
                                      🏆 {player.stats.cupsWon} Cup{player.stats.cupsWon > 1 ? 's' : ''}
                                    </Badge>
                                    <Badge className="text-[10px] font-bold border-white/10 text-slate-300 bg-slate-900 px-2 py-0.5">
                                      {player.stats.wins} Wins
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="text-center sm:text-right bg-slate-950/40 px-5 py-2.5 rounded-xl border border-white/5 min-w-[90px]">
                              <div className="text-3xl font-black text-amber-400 animate-pulse">
                                {player.stats.cupsWon}
                              </div>
                              <p className="text-[9px] text-slate-400 uppercase font-black tracking-widest">Titles</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-20 space-y-4 bg-slate-950/20">
                      <div className="text-4xl animate-float">⏳</div>
                      <h3 className="text-base font-black uppercase tracking-wider text-slate-455">No Champions Crowned</h3>
                      <p className="text-slate-500 text-xs font-semibold max-w-xs mx-auto">
                        The first tournament champions will be celebrated here once logged.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Cup History Tab */}
            <TabsContent value="cups" className="space-y-6 outline-none">
              <Card className="bg-slate-900/60 dark:bg-slate-950/45 backdrop-blur-md border border-white/10 dark:border-white/5 rounded-2xl shadow-xl overflow-hidden">
                <CardHeader className="border-b border-white/5 bg-slate-950/45">
                  <CardTitle className="text-lg font-black uppercase tracking-wider text-white flex items-center gap-2">
                    <History className="h-5 w-5 text-amber-550" /> Tournament Cup History
                  </CardTitle>
                  <CardDescription className="text-slate-400 text-xs">Complete archive of all completed Kawerify Tech tournaments</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  {cups.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                      {cups
                        .sort((a, b) => new Date(b.finalDate).getTime() - new Date(a.finalDate).getTime())
                        .map((cup) => {
                          const winner = getPlayerById(cup.winnerId);
                          return (
                            <div key={cup.id} className="flex flex-col sm:flex-row items-center justify-between p-5 bg-slate-955/40 rounded-xl border border-white/5 hover:border-amber-500/20 transition-all duration-300 gap-4">
                              <div className="flex items-center space-x-4">
                                <div className="h-12 w-12 bg-gradient-to-br from-yellow-400 via-amber-500 to-amber-600 text-slate-955 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/10 font-bold text-xl">
                                  🏆
                                </div>
                                <div>
                                  <h3 className="font-extrabold text-white text-base uppercase tracking-wider">{cup.name}</h3>
                                  <p className="text-xs text-slate-400 font-semibold">
                                    Season {cup.season} • {cup.participants.length} Active competitors
                                  </p>
                                </div>
                              </div>
                              
                              <div className="text-center sm:text-right bg-slate-900/50 px-4 py-2 rounded-lg border border-white/5">
                                <p className="font-black text-amber-400 uppercase tracking-wide text-sm">{winner?.name || 'TBD Winner'}</p>
                                <p className="text-[10px] text-slate-400 font-semibold mt-0.5 flex items-center gap-1 justify-center sm:justify-end">
                                  <Calendar className="h-3 w-3 text-slate-500" /> {new Date(cup.finalDate).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  ) : (
                    <div className="text-center py-20 space-y-3 bg-slate-950/20 rounded-xl">
                      <div className="text-4xl animate-float">⏳</div>
                      <h3 className="text-base font-black uppercase tracking-wider text-slate-400">No Tournaments Logged</h3>
                      <p className="text-slate-500 text-xs font-semibold">
                        Tournament history will appear here once competitions are finalized.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Records Tab */}
            <TabsContent value="records" className="space-y-6 outline-none">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Top Scorers */}
                <Card className="bg-slate-900/60 dark:bg-slate-950/45 backdrop-blur-md border border-white/10 dark:border-white/5 rounded-2xl shadow-xl overflow-hidden">
                  <CardHeader className="border-b border-white/5 bg-slate-950/45">
                    <CardTitle className="text-base font-black uppercase tracking-wider text-white flex items-center gap-2">
                      <Activity className="h-4.5 w-4.5 text-emerald-500 animate-pulse" /> Top Goal Scorers
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {topScorers.slice(0, 5).map((player, index) => (
                        <div key={player.id} className="flex items-center justify-between pb-3.5 border-b border-white/5 last:border-0 last:pb-0 text-sm">
                          <div className="flex items-center space-x-3.5">
                            <div className={`h-7 w-7 rounded-lg flex items-center justify-center font-black text-xs text-slate-950 ${
                              index === 0 ? 'bg-gradient-to-br from-yellow-300 to-amber-500 shadow-inner' : index === 1 ? 'bg-slate-300' : index === 2 ? 'bg-amber-700 text-white' : 'bg-slate-800 text-slate-350'
                            }`}>
                              {index + 1}
                            </div>
                            <div>
                              <p className="font-extrabold text-white uppercase tracking-wide text-xs">{player.name}</p>
                              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">{player.currentTeam}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-black text-lg text-emerald-400">{player.stats.goalsFor}</p>
                            <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest">goals</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Most Wins */}
                <Card className="bg-slate-900/60 dark:bg-slate-950/45 backdrop-blur-md border border-white/10 dark:border-white/5 rounded-2xl shadow-xl overflow-hidden">
                  <CardHeader className="border-b border-white/5 bg-slate-950/45">
                    <CardTitle className="text-base font-black uppercase tracking-wider text-white flex items-center gap-2">
                      <Zap className="h-4.5 w-4.5 text-blue-400 animate-float" /> Most Wins
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {mostWins.slice(0, 5).map((player, index) => (
                        <div key={player.id} className="flex items-center justify-between pb-3.5 border-b border-white/5 last:border-0 last:pb-0 text-sm">
                          <div className="flex items-center space-x-3.5">
                            <div className={`h-7 w-7 rounded-lg flex items-center justify-center font-black text-xs text-slate-950 ${
                              index === 0 ? 'bg-gradient-to-br from-yellow-300 to-amber-500' : index === 1 ? 'bg-slate-300' : index === 2 ? 'bg-amber-700 text-white' : 'bg-slate-800 text-slate-350'
                            }`}>
                              {index + 1}
                            </div>
                            <div>
                              <p className="font-extrabold text-white uppercase tracking-wide text-xs">{player.name}</p>
                              <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">{player.currentTeam}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-black text-lg text-blue-400">{player.stats.wins}</p>
                            <p className="text-[9px] text-slate-500 uppercase font-black tracking-widest">wins</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Season Records Indicators */}
              <Card className="bg-slate-900/60 dark:bg-slate-950/45 backdrop-blur-md border border-white/10 dark:border-white/5 rounded-2xl shadow-xl overflow-hidden">
                <CardHeader className="border-b border-white/5 bg-slate-950/45">
                  <CardTitle className="text-base font-black uppercase tracking-wider text-white flex items-center gap-1.5">
                    <Flame className="h-4.5 w-4.5 text-amber-500" /> All‑Time Season Records
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-5 bg-emerald-500/5 rounded-xl border border-emerald-500/10 hover:border-emerald-500/25 transition-colors">
                      <p className="text-3xl font-black text-emerald-400">
                        {Math.max(...players.map(p => p.stats.goalsFor), 0)}
                      </p>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1.5">Most goals in single season</p>
                    </div>
                    
                    <div className="text-center p-5 bg-blue-500/5 rounded-xl border border-blue-500/10 hover:border-blue-500/25 transition-colors">
                      <p className="text-3xl font-black text-blue-400">
                        {Math.max(...players.map(p => p.stats.wins), 0)}
                      </p>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1.5">Most wins in single season</p>
                    </div>
                    
                    <div className="text-center p-5 bg-purple-500/5 rounded-xl border border-purple-500/10 hover:border-purple-500/25 transition-colors">
                      <p className="text-3xl font-black text-purple-400">
                        {Math.max(...players.map(p => p.stats.points), 0)}
                      </p>
                      <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1.5">Most points in single season</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Legends Tab */}
            <TabsContent value="legends" className="space-y-6 outline-none">
              <Card className="bg-slate-900/60 dark:bg-slate-950/45 backdrop-blur-md border border-white/10 dark:border-white/5 rounded-2xl shadow-xl overflow-hidden">
                <CardHeader className="border-b border-white/5 bg-slate-950/45">
                  <CardTitle className="text-lg font-black uppercase tracking-wider text-white flex items-center gap-2">
                    <Award className="h-5 w-5 text-amber-400 animate-float" /> Tournament Legends
                  </CardTitle>
                  <CardDescription className="text-slate-400 text-xs">
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
                          <Card key={player.id} className={`overflow-hidden bg-slate-955/40 border border-white/5 hover:-translate-y-1.5 hover:border-amber-500/35 transition-all duration-300 ${
                            hasCups ? 'ring-1 ring-amber-500/20' : ''
                          } rounded-xl`}>
                            <CardHeader className={`bg-gradient-to-br ${
                              hasCups 
                                ? 'from-amber-500/10 to-orange-500/5 border-b border-white/5' 
                                : 'from-slate-900/40 to-slate-955/40 border-b border-white/5'
                            } p-4`}>
                              <div className="flex items-center space-x-4">
                                <div className="relative group">
                                  {hasCups && <div className="absolute -inset-0.5 bg-amber-400 rounded-full blur opacity-25" />}
                                  <Avatar className={`h-14 w-14 border-2 ${hasCups ? 'border-amber-400' : 'border-slate-800'} relative z-10`}>
                                    <AvatarImage src={player.image} alt={player.name} />
                                    <AvatarFallback className="bg-gradient-to-br from-yellow-500 to-amber-600 text-slate-955 font-bold">
                                      {player.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                </div>
                                <div>
                                  <CardTitle className="text-sm font-black uppercase tracking-wider text-white">{player.name}</CardTitle>
                                  <CardDescription className="text-xs font-bold text-primary">{player.currentTeam}</CardDescription>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="p-4 text-xs font-semibold text-slate-400 space-y-2.5">
                              <div className="flex justify-between">
                                <span>Tournament Cups:</span>
                                <span className="font-black text-amber-400">{player.stats.cupsWon}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Total Wins:</span>
                                <span className="font-black text-emerald-400">{player.stats.wins}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Win Rate:</span>
                                <span className="font-black text-white">{winRate}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Goals For:</span>
                                <span className="font-black text-white">{player.stats.goalsFor}</span>
                              </div>
                              
                              <div className="mt-3.5 flex flex-wrap gap-1.5 pt-3 border-t border-white/5">
                                {player.stats.cupsWon > 0 && (
                                  <Badge className="bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-955 text-[9px] font-black border-0 uppercase rounded">
                                    Champion
                                  </Badge>
                                )}
                                {winRate >= 70 && (
                                  <Badge className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/10 border-0 text-[9px] font-black uppercase rounded">
                                    Elite
                                  </Badge>
                                )}
                                {player.stats.goalsFor >= 30 && (
                                  <Badge className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/10 border-0 text-[9px] font-black uppercase rounded">
                                    Machine
                                  </Badge>
                                )}
                                {player.stats.matchesPlayed >= 50 && (
                                  <Badge className="bg-purple-500/10 text-purple-400 hover:bg-purple-500/10 border-0 text-[9px] font-black uppercase rounded">
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
                    <div className="text-center py-20 space-y-2 bg-slate-950/20 rounded-xl">
                      <div className="text-4xl animate-float">⏳</div>
                      <h3 className="text-base font-black uppercase tracking-wider text-slate-400">No Legends Catalogued</h3>
                      <p className="text-slate-500 text-xs font-semibold">Competitors will earn legends status through consistent performances.</p>
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

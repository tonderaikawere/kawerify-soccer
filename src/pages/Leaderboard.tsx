import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { loadPlayers, loadTournament, initializeDefaultData, type Player } from "@/lib/storage";
import { Link } from "react-router-dom";

const Leaderboard = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [tournament, setTournament] = useState(loadTournament());

  useEffect(() => {
    initializeDefaultData();
    setPlayers(loadPlayers());
    setTournament(loadTournament());
  }, []);

  const sortedPlayers = [...players].sort((a, b) => {
    if (b.stats.points !== a.stats.points) return b.stats.points - a.stats.points;
    const gdA = a.stats.goalsFor - a.stats.goalsAgainst;
    const gdB = b.stats.goalsFor - b.stats.goalsAgainst;
    if (gdB !== gdA) return gdB - gdA;
    return b.stats.goalsFor - a.stats.goalsFor;
  });

  const getRankBadge = (rank: number) => {
    if (rank === 1) return <Badge className="bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 font-black shadow-md border-0 uppercase px-2 py-0.5 text-[9px] tracking-wider">🥇 Champion</Badge>;
    if (rank === 2) return <Badge className="bg-gradient-to-r from-slate-300 to-slate-400 text-slate-950 font-black shadow-md border-0 uppercase px-2 py-0.5 text-[9px] tracking-wider">🥈 Contender</Badge>;
    if (rank === 3) return <Badge className="bg-gradient-to-r from-amber-600 to-amber-700 text-white font-black shadow-md border-0 uppercase px-2 py-0.5 text-[9px] tracking-wider">🥉 Challenger</Badge>;
    return <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">Rank #{rank}</span>;
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <span className="text-xl font-black text-amber-500">1</span>;
    if (rank === 2) return <span className="text-xl font-black text-slate-400">2</span>;
    if (rank === 3) return <span className="text-xl font-black text-amber-700">3</span>;
    return <span className="text-xs font-bold text-slate-400 dark:text-slate-600">{rank}</span>;
  };

  const getWinRate = (player: Player) => {
    return player.stats.matchesPlayed > 0 ? Math.round((player.stats.wins / player.stats.matchesPlayed) * 100) : 0;
  };

  // Top 3 for the podium
  const topThree = sortedPlayers.slice(0, 3);
  const remainingPlayers = sortedPlayers.slice(3);

  return (
    <div className="min-h-screen bg-[#070b13] bg-stadium-grid pb-16 transition-colors duration-300">
      
      {/* Immersive Sports Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#04070e] to-[#070b13] border-b border-white/5 py-20 px-6 mb-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/15 via-transparent to-transparent opacity-90 pointer-events-none" />
        <div className="absolute top-12 left-10 w-96 h-96 bg-primary/5 rounded-full blur-[120px] animate-radial-pulse pointer-events-none" />
        <div className="absolute bottom-6 right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-[140px] pointer-events-none animate-radial-pulse" style={{ animationDelay: '2.5s' }} />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center space-x-2 bg-slate-950/80 border border-primary/20 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-emerald-400 shadow-xl shadow-primary/5">
            <span>⚽ Season Active</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
          </div>
          
          <h1 className="text-4xl sm:text-7xl font-black tracking-widest text-white uppercase leading-none">
            KAWERIFY <span className="bg-gradient-to-r from-primary via-emerald-400 to-teal-400 bg-clip-text text-transparent">TECH CUP</span>
          </h1>
          
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto font-black uppercase tracking-widest leading-relaxed">
            Welcome to the home of ultimate competitive soccer. Live standings, game analytics, match schedules, and player registries.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <div className="bg-slate-900/80 border border-white/10 px-6 py-3 rounded-xl text-center min-w-[120px] shadow-2xl backdrop-blur-md">
              <span className="block text-[8px] text-slate-500 font-black uppercase tracking-widest">Season</span>
              <span className="text-sm font-black text-white">{tournament.season}</span>
            </div>
            <div className="bg-slate-900/80 border border-white/10 px-6 py-3 rounded-xl text-center min-w-[120px] shadow-2xl backdrop-blur-md">
              <span className="block text-[8px] text-slate-500 font-black uppercase tracking-widest">Current Week</span>
              <span className="text-sm font-black text-amber-400">Week {tournament.currentWeek}</span>
            </div>
            <div className="bg-slate-900/80 border border-white/10 px-6 py-3 rounded-xl text-center min-w-[120px] shadow-2xl backdrop-blur-md">
              <span className="block text-[8px] text-slate-500 font-black uppercase tracking-widest">League Stage</span>
              <span className="text-sm font-black text-emerald-400">{tournament.currentRound}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="container mx-auto px-4 relative z-20 max-w-5xl">
        
        {/* Visual 3D Podium for Top 3 */}
        {topThree.length > 0 && (
          <div className="mb-14">
            <h2 className="text-center text-xs font-black uppercase tracking-widest text-slate-500 mb-8">
              Championship Podium Standings
            </h2>
            <div className="flex flex-col md:flex-row items-stretch md:items-end justify-center gap-6 max-w-4xl mx-auto">
              
              {/* 2nd Place (Silver) */}
              {topThree[1] && (
                <div className="w-full md:w-1/3 order-2 md:order-1 flex flex-col">
                  <div className="relative group flex-1 rounded-2xl bg-gradient-to-b from-slate-800/10 via-slate-900/5 to-transparent border-2 border-slate-400/30 p-6 text-center hover:border-slate-350 shadow-2xl hover:shadow-[0_0_30px_rgba(148,163,184,0.15)] transition-all duration-350 hover:-translate-y-2 flex flex-col justify-between min-h-[300px]">
                    <div className="absolute top-4 right-4 text-slate-400 font-black text-lg">{getRankIcon(2)}</div>
                    <div>
                      <Avatar className="h-16 w-16 mx-auto mb-3 border-2 border-slate-450 shadow-md">
                        <AvatarImage src={topThree[1].image} />
                        <AvatarFallback className="bg-slate-500 text-white font-bold">{topThree[1].name[0]}</AvatarFallback>
                      </Avatar>
                      <h3 className="font-black text-sm text-white truncate uppercase tracking-wider">{topThree[1].name}</h3>
                      <p className="text-xs text-primary font-bold truncate mt-0.5 uppercase tracking-widest">{topThree[1].currentTeam}</p>
                    </div>
                    <div className="mt-4">
                      {getRankBadge(2)}
                      <div className="mt-4 pt-3.5 border-t border-white/5 flex justify-around text-xs">
                        <div>
                          <span className="block font-black text-slate-100">{topThree[1].stats.points}</span>
                          <span className="text-[8px] text-slate-500 font-black uppercase tracking-widest">PTS</span>
                        </div>
                        <div>
                          <span className="block font-black text-emerald-500">{getWinRate(topThree[1])}%</span>
                          <span className="text-[8px] text-slate-500 font-black uppercase tracking-widest">WR</span>
                        </div>
                        <div>
                          <span className="block font-black text-blue-500">{topThree[1].stats.goalsFor}</span>
                          <span className="text-[8px] text-slate-500 font-black uppercase tracking-widest">GF</span>
                        </div>
                      </div>
                    </div>
                    <Link to={`/player/${topThree[1].id}`} className="absolute inset-0 rounded-2xl" />
                  </div>
                </div>
              )}

              {/* 1st Place (Gold) */}
              {topThree[0] && (
                <div className="w-full md:w-1/3 order-1 md:order-2 flex flex-col md:mb-4">
                  <div className="relative group flex-1 rounded-2xl bg-gradient-to-b from-amber-500/25 via-amber-600/5 to-transparent border-2 border-amber-500/40 p-7 text-center shadow-2xl hover:shadow-[0_0_35px_rgba(245,158,11,0.2)] hover:border-amber-400 transition-all duration-350 hover:-translate-y-3 flex flex-col justify-between min-h-[340px]">
                    <div className="absolute top-4 right-4 text-amber-500 font-black text-xl">{getRankIcon(1)}</div>
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-2xl animate-float">👑</div>
                    <div className="pt-2">
                      <Avatar className="h-20 w-20 mx-auto mb-4 border-4 border-amber-400 shadow-xl">
                        <AvatarImage src={topThree[0].image} />
                        <AvatarFallback className="bg-amber-500 text-slate-950 font-bold">{topThree[0].name[0]}</AvatarFallback>
                      </Avatar>
                      <h3 className="font-black text-base text-white truncate uppercase tracking-wider">{topThree[0].name}</h3>
                      <p className="text-xs text-primary font-black truncate mt-0.5 uppercase tracking-widest">{topThree[0].currentTeam}</p>
                    </div>
                    <div className="mt-4">
                      {getRankBadge(1)}
                      <div className="mt-5 pt-3.5 border-t border-amber-500/25 flex justify-around text-xs">
                        <div>
                          <span className="block font-black text-slate-100">{topThree[0].stats.points}</span>
                          <span className="text-[8px] text-slate-500 font-black uppercase tracking-widest">PTS</span>
                        </div>
                        <div>
                          <span className="block font-black text-emerald-500">{getWinRate(topThree[0])}%</span>
                          <span className="text-[8px] text-slate-500 font-black uppercase tracking-widest">WR</span>
                        </div>
                        <div>
                          <span className="block font-black text-amber-500">{topThree[0].stats.goalsFor}</span>
                          <span className="text-[8px] text-slate-500 font-black uppercase tracking-widest">GF</span>
                        </div>
                      </div>
                    </div>
                    <Link to={`/player/${topThree[0].id}`} className="absolute inset-0 rounded-2xl" />
                  </div>
                </div>
              )}

              {/* 3rd Place (Bronze) */}
              {topThree[2] && (
                <div className="w-full md:w-1/3 order-3 md:order-3 flex flex-col">
                  <div className="relative group flex-1 rounded-2xl bg-gradient-to-b from-amber-900/10 via-amber-955/5 to-transparent border-2 border-amber-800/30 p-6 text-center hover:border-amber-700 shadow-2xl hover:shadow-[0_0_30px_rgba(146,64,14,0.15)] transition-all duration-350 hover:-translate-y-2 flex flex-col justify-between min-h-[280px]">
                    <div className="absolute top-4 right-4 text-amber-750 font-black text-sm">{getRankIcon(3)}</div>
                    <div>
                      <Avatar className="h-16 w-16 mx-auto mb-3 border-2 border-amber-750 shadow-md">
                        <AvatarImage src={topThree[2].image} />
                        <AvatarFallback className="bg-amber-700 text-white font-bold">{topThree[2].name[0]}</AvatarFallback>
                      </Avatar>
                      <h3 className="font-black text-sm text-white truncate uppercase tracking-wider">{topThree[2].name}</h3>
                      <p className="text-xs text-primary font-bold truncate mt-0.5 uppercase tracking-widest">{topThree[2].currentTeam}</p>
                    </div>
                    <div className="mt-4">
                      {getRankBadge(3)}
                      <div className="mt-4 pt-3.5 border-t border-white/5 flex justify-around text-xs">
                        <div>
                          <span className="block font-black text-slate-100">{topThree[2].stats.points}</span>
                          <span className="text-[8px] text-slate-500 font-black uppercase tracking-widest">PTS</span>
                        </div>
                        <div>
                          <span className="block font-black text-emerald-500">{getWinRate(topThree[2])}%</span>
                          <span className="text-[8px] text-slate-500 font-black uppercase tracking-widest">WR</span>
                        </div>
                        <div>
                          <span className="block font-black text-amber-700">{topThree[2].stats.goalsFor}</span>
                          <span className="text-[8px] text-slate-500 font-black uppercase tracking-widest">GF</span>
                        </div>
                      </div>
                    </div>
                    <Link to={`/player/${topThree[2].id}`} className="absolute inset-0 rounded-2xl" />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Leaderboard Table List */}
        <Card className="bg-slate-900/60 dark:bg-slate-950/40 backdrop-blur-md border border-white/10 dark:border-white/5 shadow-2xl overflow-hidden rounded-2xl">
          <CardHeader className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-6 md:p-8 text-white border-b border-white/5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="text-xl font-black uppercase tracking-wider">
                  Standings Rankings
                </CardTitle>
                <CardDescription className="text-slate-400 mt-1 text-xs font-semibold uppercase tracking-wider">
                  Live standings based on official scores • {sortedPlayers.length} elite gamers
                </CardDescription>
              </div>
              <div className="flex items-center space-x-6">
                <div className="bg-slate-900 border border-white/5 px-4 py-2 rounded-xl text-center">
                  <span className="block text-[8px] text-slate-400 font-bold uppercase tracking-widest">League Stage</span>
                  <span className="text-sm font-black text-emerald-400">{tournament.currentRound}</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {/* Headers row (desktop) */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-8 py-4 border-b border-white/5 bg-slate-950/20 text-[9px] font-black text-slate-400 uppercase tracking-widest text-center items-center">
              <div className="col-span-1">Rank</div>
              <div className="col-span-4 text-left">Player / Team</div>
              <div className="col-span-1">Played</div>
              <div className="col-span-1">Wins</div>
              <div className="col-span-1">Losses</div>
              <div className="col-span-1">GF - GA</div>
              <div className="col-span-1">GD</div>
              <div className="col-span-1">Win Rate</div>
              <div className="col-span-1 text-right pr-2">Points</div>
            </div>

            <div className="divide-y divide-white/5">
              {sortedPlayers.map((player, index) => {
                const rank = index + 1;
                const winRate = getWinRate(player);
                const gd = player.stats.goalsFor - player.stats.goalsAgainst;
                const isKnockoutZone = rank <= 4;

                return (
                  <div
                    key={player.id}
                    className={`relative group grid grid-cols-1 md:grid-cols-12 gap-4 px-6 md:px-8 py-5 items-center text-center transition-all duration-300 hover:bg-white/5 border-l-4 ${
                      isKnockoutZone 
                        ? 'border-l-emerald-500 bg-emerald-500/5 hover:bg-emerald-500/10' 
                        : 'border-l-transparent'
                    }`}
                  >
                    {/* Rank */}
                    <div className="col-span-1 flex items-center justify-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-slate-950/40 flex items-center justify-center font-black text-xs border border-white/5">
                        {getRankIcon(rank)}
                      </div>
                    </div>

                    {/* Player Info */}
                    <div className="col-span-4 text-left flex items-center space-x-4">
                      <Avatar className="h-11 w-11 border border-white/10 shadow-sm group-hover:scale-105 transition-transform duration-200">
                        <AvatarImage src={player.image} />
                        <AvatarFallback className="bg-gradient-to-br from-primary to-emerald-600 text-white font-black text-sm">
                          {player.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="truncate">
                        <h4 className="font-black text-white group-hover:text-primary transition-colors text-sm truncate uppercase tracking-wider">
                          {player.name}
                        </h4>
                        <p className="text-[10px] text-slate-400 font-bold mt-0.5 truncate uppercase tracking-widest">
                          {player.currentTeam}
                        </p>
                      </div>
                    </div>

                    {/* Stats Fields */}
                    <div className="grid grid-cols-5 md:contents gap-2 mt-4 md:mt-0 text-slate-300">
                      <div className="flex flex-col md:block col-span-1">
                        <span className="md:hidden text-[8px] text-slate-500 uppercase font-black tracking-widest">Played</span>
                        <span className="font-bold text-sm">{player.stats.matchesPlayed}</span>
                      </div>
                      <div className="flex flex-col md:block col-span-1">
                        <span className="md:hidden text-[8px] text-emerald-500 uppercase font-black tracking-widest">Wins</span>
                        <span className="font-bold text-emerald-500 text-sm">{player.stats.wins}</span>
                      </div>
                      <div className="flex flex-col md:block col-span-1">
                        <span className="md:hidden text-[8px] text-rose-500 uppercase font-black tracking-widest">Losses</span>
                        <span className="font-bold text-rose-500 text-sm">{player.stats.losses}</span>
                      </div>
                      <div className="flex flex-col md:block col-span-1">
                        <span className="md:hidden text-[8px] text-slate-500 uppercase font-black tracking-widest">GF-GA</span>
                        <span className="text-slate-400 font-bold text-xs">{player.stats.goalsFor}:{player.stats.goalsAgainst}</span>
                      </div>
                      <div className="flex flex-col md:block col-span-1">
                        <span className="md:hidden text-[8px] text-slate-500 uppercase font-black tracking-widest">GD</span>
                        <span className={`font-black text-sm ${gd >= 0 ? "text-emerald-500" : "text-rose-500"}`}>
                          {gd >= 0 ? `+${gd}` : gd}
                        </span>
                      </div>
                    </div>

                    {/* Win Rate */}
                    <div className="col-span-1 flex flex-col items-center justify-center mt-3 md:mt-0">
                      <span className="md:hidden text-[8px] text-slate-500 uppercase font-black tracking-widest mb-1">Win Rate</span>
                      <div className="w-full max-w-[80px] text-center">
                        <span className="text-[10px] font-black text-slate-350">{winRate}%</span>
                        <Progress value={winRate} className="h-1 mt-1 bg-slate-800" />
                      </div>
                    </div>

                    {/* Points */}
                    <div className="col-span-1 text-center md:text-right pr-2 mt-3 md:mt-0 flex flex-col md:block">
                      <span className="md:hidden text-[8px] text-slate-500 uppercase font-black tracking-widest">Points</span>
                      <span className="text-base font-black bg-gradient-to-r from-primary to-emerald-600 dark:from-emerald-400 dark:to-teal-500 bg-clip-text text-transparent">
                        {player.stats.points} pts
                      </span>
                    </div>

                    <Link to={`/player/${player.id}`} className="absolute inset-0 rounded-sm" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Tournament Dashboard Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-10">
          <Card className="bg-slate-900/60 dark:bg-slate-950/40 backdrop-blur-md border border-white/10 dark:border-white/5 overflow-hidden relative group rounded-2xl">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500" />
            <CardContent className="p-6">
              <span className="text-[8px] text-slate-500 font-black uppercase tracking-widest">Tournament Leader</span>
              <h3 className="text-lg font-black text-white mt-1 uppercase">
                {sortedPlayers.length > 0 ? sortedPlayers[0]?.name : "TBD"}
              </h3>
              <p className="text-xs text-primary font-bold mt-0.5 uppercase tracking-wider">{sortedPlayers[0]?.currentTeam}</p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-900/60 dark:bg-slate-950/40 backdrop-blur-md border border-white/10 dark:border-white/5 overflow-hidden relative group rounded-2xl">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500" />
            <CardContent className="p-6">
              <span className="text-[8px] text-slate-500 font-black uppercase tracking-widest">Golden Boot Leader</span>
              <h3 className="text-lg font-black text-white mt-1">
                {Math.max(...sortedPlayers.map(p => p.stats.goalsFor), 0)} goals
              </h3>
              <p className="text-xs text-slate-400 mt-0.5 font-bold uppercase tracking-wider text-[9px]">Highest scoring stats</p>
            </CardContent>
          </Card>
          
          <Card className="bg-slate-900/60 dark:bg-slate-950/40 backdrop-blur-md border border-white/10 dark:border-white/5 overflow-hidden relative group rounded-2xl">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500" />
            <CardContent className="p-6">
              <span className="text-[8px] text-slate-500 font-black uppercase tracking-widest">Matches Logged</span>
              <h3 className="text-lg font-black text-white mt-1">
                {sortedPlayers.reduce((sum, p) => sum + p.stats.matchesPlayed, 0) / 2} matches
              </h3>
              <p className="text-xs text-slate-400 mt-0.5 font-bold uppercase tracking-wider text-[9px]">Across all rounds</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { loadPlayers, loadTournament, initializeDefaultData, type Player } from "@/lib/storage";
import { Link } from "react-router-dom";
import PageHeader from "@/components/PageHeader";

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
    if (rank === 1) return <Badge className="bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 font-black shadow-md border-0 uppercase px-2 py-0.5 text-[10px]">🥇 Champion</Badge>;
    if (rank === 2) return <Badge className="bg-gradient-to-r from-slate-300 to-slate-400 text-slate-950 font-black shadow-md border-0 uppercase px-2 py-0.5 text-[10px]">🥈 Contender</Badge>;
    if (rank === 3) return <Badge className="bg-gradient-to-r from-amber-600 to-amber-700 text-white font-black shadow-md border-0 uppercase px-2 py-0.5 text-[10px]">🥉 Challenger</Badge>;
    return <span className="text-sm font-semibold text-muted-foreground">Rank #{rank}</span>;
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <span className="text-lg font-black text-amber-500">1</span>;
    if (rank === 2) return <span className="text-lg font-black text-slate-400">2</span>;
    if (rank === 3) return <span className="text-lg font-black text-amber-700">3</span>;
    return <span className="text-sm font-bold text-slate-400 dark:text-slate-600">{rank}</span>;
  };

  const getWinRate = (player: Player) => {
    return player.stats.matchesPlayed > 0 ? Math.round((player.stats.wins / player.stats.matchesPlayed) * 100) : 0;
  };

  // Top 3 for the podium
  const topThree = sortedPlayers.slice(0, 3);
  const remainingPlayers = sortedPlayers.slice(3);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070b13] pb-16">
      {/* Page Header */}
      <div className="container mx-auto px-4 pt-8">
        <PageHeader
          title="Kawerify Tech"
          highlightedTitle="World Cup"
          subtitle="Real‑time rankings, match fixture results, and elite gaming stats for our professional FIFA tournament."
          season={tournament.season}
          week={tournament.currentWeek}
          round={tournament.currentRound}
        />
      </div>

      {/* Main Container */}
      <div className="container mx-auto px-4 relative z-20">
        
        {/* Visual Podium for Top 3 */}
        {topThree.length > 0 && (
          <div className="mb-12">
            <h2 className="text-center text-xs font-black uppercase tracking-widest text-muted-foreground mb-6">
              Championship Podium
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto items-stretch pt-2">
              
              {/* 2nd Place */}
              {topThree[1] && (
                <div className="flex flex-col">
                  <div className="relative group flex-1 rounded-2xl glass-card border border-slate-300/40 dark:border-white/5 p-6 text-center transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
                    <div className="absolute top-4 right-4">{getRankIcon(2)}</div>
                    <div>
                      <Avatar className="h-16 w-16 mx-auto mb-3 border-2 border-slate-400 shadow-md">
                        <AvatarImage src={topThree[1].image} />
                        <AvatarFallback className="bg-slate-500 text-white font-bold">{topThree[1].name[0]}</AvatarFallback>
                      </Avatar>
                      <h3 className="font-extrabold text-slate-900 dark:text-white truncate">{topThree[1].name}</h3>
                      <p className="text-xs text-primary font-semibold truncate mb-3">{topThree[1].currentTeam}</p>
                    </div>
                    <div>
                      {getRankBadge(2)}
                      <div className="mt-4 pt-3 border-t border-border flex justify-around text-xs">
                        <div>
                          <span className="block font-black text-slate-800 dark:text-slate-200">{topThree[1].stats.points}</span>
                          <span className="text-[10px] text-muted-foreground uppercase font-bold">PTS</span>
                        </div>
                        <div>
                          <span className="block font-black text-emerald-500">{getWinRate(topThree[1])}%</span>
                          <span className="text-[10px] text-muted-foreground uppercase font-bold">WIN</span>
                        </div>
                      </div>
                    </div>
                    <Link to={`/player/${topThree[1].id}`} className="absolute inset-0 rounded-2xl" />
                  </div>
                </div>
              )}

              {/* 1st Place */}
              {topThree[0] && (
                <div className="flex flex-col">
                  <div className="relative group flex-1 rounded-2xl bg-gradient-to-b from-amber-500/20 to-amber-600/5 dark:from-amber-500/10 dark:to-amber-900/10 border-2 border-amber-500/40 p-6 text-center shadow-xl shadow-amber-500/5 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
                    <div className="absolute top-4 right-4">{getRankIcon(1)}</div>
                    <div>
                      <Avatar className="h-20 w-20 mx-auto mb-4 border-4 border-amber-400 shadow-lg">
                        <AvatarImage src={topThree[0].image} />
                        <AvatarFallback className="bg-amber-500 text-slate-950 font-bold">{topThree[0].name[0]}</AvatarFallback>
                      </Avatar>
                      <h3 className="font-black text-lg text-slate-950 dark:text-white truncate">{topThree[0].name}</h3>
                      <p className="text-xs text-primary font-bold truncate mb-3">{topThree[0].currentTeam}</p>
                    </div>
                    <div>
                      {getRankBadge(1)}
                      <div className="mt-4 pt-3 border-t border-amber-500/20 flex justify-around text-xs">
                        <div>
                          <span className="block font-black text-slate-950 dark:text-slate-100">{topThree[0].stats.points}</span>
                          <span className="text-[10px] text-muted-foreground uppercase font-bold">PTS</span>
                        </div>
                        <div>
                          <span className="block font-black text-emerald-500">{getWinRate(topThree[0])}%</span>
                          <span className="text-[10px] text-muted-foreground uppercase font-bold">WIN</span>
                        </div>
                        <div>
                          <span className="block font-black text-amber-500">{topThree[0].stats.goalsFor}</span>
                          <span className="text-[10px] text-muted-foreground uppercase font-bold">G</span>
                        </div>
                      </div>
                    </div>
                    <Link to={`/player/${topThree[0].id}`} className="absolute inset-0 rounded-2xl" />
                  </div>
                </div>
              )}

              {/* 3rd Place */}
              {topThree[2] && (
                <div className="flex flex-col">
                  <div className="relative group flex-1 rounded-2xl glass-card border border-amber-700/30 dark:border-white/5 p-6 text-center transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between">
                    <div className="absolute top-4 right-4">{getRankIcon(3)}</div>
                    <div>
                      <Avatar className="h-16 w-16 mx-auto mb-3 border-2 border-amber-700 shadow-md">
                        <AvatarImage src={topThree[2].image} />
                        <AvatarFallback className="bg-amber-700 text-white font-bold">{topThree[2].name[0]}</AvatarFallback>
                      </Avatar>
                      <h3 className="font-extrabold text-slate-900 dark:text-white truncate">{topThree[2].name}</h3>
                      <p className="text-xs text-primary font-semibold truncate mb-3">{topThree[2].currentTeam}</p>
                    </div>
                    <div>
                      {getRankBadge(3)}
                      <div className="mt-4 pt-3 border-t border-border flex justify-around text-xs">
                        <div>
                          <span className="block font-black text-slate-800 dark:text-slate-200">{topThree[2].stats.points}</span>
                          <span className="text-[10px] text-muted-foreground uppercase font-bold">PTS</span>
                        </div>
                        <div>
                          <span className="block font-black text-emerald-500">{getWinRate(topThree[2])}%</span>
                          <span className="text-[10px] text-muted-foreground uppercase font-bold">WIN</span>
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
        <Card className="glass-panel border-white/20 dark:border-white/5 shadow-2xl overflow-hidden rounded-2xl max-w-5xl mx-auto">
          <CardHeader className="bg-gradient-to-r from-slate-900 to-slate-950 p-6 md:p-8 text-white border-b border-slate-800/80">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="text-2xl font-black">
                  Leaderboard Rankings
                </CardTitle>
                <CardDescription className="text-slate-400 mt-1">
                  Live scores and game points updated dynamically • {sortedPlayers.length} elite gamers
                </CardDescription>
              </div>
              <div className="flex items-center space-x-6">
                <div className="bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl text-center">
                  <span className="block text-[10px] text-slate-400 font-bold uppercase tracking-wider">Tournament Round</span>
                  <span className="text-lg font-black text-emerald-400">{tournament.currentRound}</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {/* Headers row (desktop) */}
            <div className="hidden md:grid grid-cols-12 gap-4 px-8 py-4 border-b border-border/60 bg-muted/20 text-xs font-bold text-muted-foreground uppercase tracking-wider text-center items-center">
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

            <div className="divide-y divide-border/60">
              {sortedPlayers.map((player, index) => {
                const rank = index + 1;
                const winRate = getWinRate(player);
                const gd = player.stats.goalsFor - player.stats.goalsAgainst;

                return (
                  <div
                    key={player.id}
                    className="relative group grid grid-cols-1 md:grid-cols-12 gap-4 px-6 md:px-8 py-5 items-center text-center transition-all duration-300 hover:bg-slate-500/5 dark:hover:bg-slate-100/5"
                  >
                    {/* Rank */}
                    <div className="col-span-1 flex items-center justify-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-muted/40 flex items-center justify-center font-extrabold text-sm dark:bg-slate-900 border border-border/40">
                        {getRankIcon(rank)}
                      </div>
                    </div>

                    {/* Player Info */}
                    <div className="col-span-4 text-left flex items-center space-x-4">
                      <Avatar className="h-12 w-12 border border-border/80 shadow-sm group-hover:scale-105 transition-transform duration-200">
                        <AvatarImage src={player.image} />
                        <AvatarFallback className="bg-gradient-to-br from-primary to-emerald-600 text-white font-bold">
                          {player.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="truncate">
                        <h4 className="font-extrabold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors text-base truncate">
                          {player.name}
                        </h4>
                        <p className="text-xs text-muted-foreground font-semibold mt-0.5 truncate">
                          {player.currentTeam}
                        </p>
                      </div>
                    </div>

                    {/* Stats Fields */}
                    <div className="grid grid-cols-5 md:contents gap-2 mt-4 md:mt-0 text-slate-800 dark:text-slate-200">
                      <div className="flex flex-col md:block col-span-1">
                        <span className="md:hidden text-[10px] text-muted-foreground uppercase font-bold">Played</span>
                        <span className="font-semibold text-sm md:text-base">{player.stats.matchesPlayed}</span>
                      </div>
                      <div className="flex flex-col md:block col-span-1">
                        <span className="md:hidden text-[10px] text-muted-foreground uppercase font-bold text-green-600">Wins</span>
                        <span className="font-bold text-emerald-500 text-sm md:text-base">{player.stats.wins}</span>
                      </div>
                      <div className="flex flex-col md:block col-span-1">
                        <span className="md:hidden text-[10px] text-muted-foreground uppercase font-bold text-red-500">Losses</span>
                        <span className="font-bold text-red-500 text-sm md:text-base">{player.stats.losses}</span>
                      </div>
                      <div className="flex flex-col md:block col-span-1">
                        <span className="md:hidden text-[10px] text-muted-foreground uppercase font-bold">GF-GA</span>
                        <span className="text-slate-500 font-medium text-xs md:text-sm">{player.stats.goalsFor}:{player.stats.goalsAgainst}</span>
                      </div>
                      <div className="flex flex-col md:block col-span-1">
                        <span className="md:hidden text-[10px] text-muted-foreground uppercase font-bold">GD</span>
                        <span className={`font-black text-sm md:text-base ${gd >= 0 ? "text-emerald-500" : "text-rose-500"}`}>
                          {gd >= 0 ? `+${gd}` : gd}
                        </span>
                      </div>
                    </div>

                    {/* Win Rate */}
                    <div className="col-span-1 flex flex-col items-center justify-center mt-3 md:mt-0">
                      <span className="md:hidden text-[10px] text-muted-foreground uppercase font-bold mb-1">Win Rate</span>
                      <div className="w-full max-w-[80px] text-center">
                        <span className="text-xs font-black text-slate-700 dark:text-slate-300">{winRate}%</span>
                        <Progress value={winRate} className="h-1.5 mt-1 bg-muted/60" />
                      </div>
                    </div>

                    {/* Points */}
                    <div className="col-span-1 text-center md:text-right pr-2 mt-3 md:mt-0 flex flex-col md:block">
                      <span className="md:hidden text-[10px] text-muted-foreground uppercase font-bold">Points</span>
                      <span className="text-lg md:text-xl font-black bg-gradient-to-r from-primary to-emerald-600 dark:from-emerald-400 dark:to-teal-500 bg-clip-text text-transparent">
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
          <Card className="glass-card overflow-hidden relative group">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500" />
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <span className="text-xs text-muted-foreground font-black uppercase tracking-wider">Tournament Leader</span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                  {sortedPlayers.length > 0 ? sortedPlayers[0]?.name : "TBD"}
                </h3>
                <p className="text-xs text-primary font-bold mt-0.5">{sortedPlayers[0]?.currentTeam}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card overflow-hidden relative group">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500" />
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <span className="text-xs text-muted-foreground font-black uppercase tracking-wider">Golden Boot Leader</span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                  {Math.max(...sortedPlayers.map(p => p.stats.goalsFor), 0)} goals
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">Highest individual score</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card overflow-hidden relative group">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500" />
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <span className="text-xs text-muted-foreground font-black uppercase tracking-wider">Matches Logged</span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                  {sortedPlayers.reduce((sum, p) => sum + p.stats.matchesPlayed, 0) / 2} matches
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">Across all tournament rounds</p>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default Leaderboard;

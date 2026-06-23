import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { loadMatches, loadPlayers, loadTournament, type Match, type Player } from "@/lib/storage";
import PageHeader from "@/components/PageHeader";

const FifaFixtures = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [tournament, setTournament] = useState(loadTournament());
  const [selectedWeek, setSelectedWeek] = useState(1);

  useEffect(() => {
    setMatches(loadMatches());
    setPlayers(loadPlayers());
    setTournament(loadTournament());
  }, []);

  const getPlayerById = (id: string) => players.find(p => p.id === id);

  const getMatchesByWeek = (week: number) => {
    return matches.filter(match => match.week === week);
  };

  const getMatchTypeColor = (matchType: string) => {
    switch (matchType) {
      case 'final': return 'bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600';
      case 'semi-final': return 'bg-gradient-to-r from-orange-500 to-red-600';
      case 'quarter-final': return 'bg-gradient-to-r from-blue-500 to-indigo-600';
      default: return 'bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border-b border-white/5';
    }
  };

  const getMatchDay = (matchType: string) => {
    return ['quarter-final', 'semi-final', 'final'].includes(matchType) ? 'Sunday' : 'Saturday';
  };

  // Helper to generate a initials badge for teams
  const getTeamBadge = (teamName: string) => {
    const initials = teamName.split(' ').map(n => n[0]).join('').slice(0, 3).toUpperCase();
    
    // Select color seed based on team name
    const colors = [
      'from-blue-600 to-cyan-500 shadow-blue-500/20',
      'from-red-600 to-orange-500 shadow-red-500/20',
      'from-emerald-600 to-teal-500 shadow-emerald-500/20',
      'from-indigo-600 to-violet-500 shadow-indigo-500/20',
      'from-amber-500 to-yellow-400 shadow-amber-500/20',
      'from-purple-600 to-pink-500 shadow-purple-500/20'
    ];
    let sum = 0;
    for (let i = 0; i < teamName.length; i++) sum += teamName.charCodeAt(i);
    const color = colors[sum % colors.length];

    return (
      <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white font-black text-sm shadow-md border border-white/10 transform group-hover:scale-105 transition-transform duration-300`}>
        {initials}
      </div>
    );
  };

  const weeklyMatches = getMatchesByWeek(selectedWeek);

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Page Header */}
      <PageHeader
        title="Match"
        highlightedTitle="Fixtures"
        subtitle="Complete tournament fixture timetables, round details, and live scoreboard logs."
        season={tournament.season}
        week={tournament.currentWeek}
        round={tournament.currentRound}
      />

      {/* Week Selector */}
      <div className="flex justify-start sm:justify-center space-x-1.5 overflow-x-auto pb-3 pt-1 px-2 border-b border-white/5">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((week) => {
          const isCurrent = tournament.currentWeek === week;
          const isSelected = selectedWeek === week;
          return (
            <Button
              key={week}
              variant={isSelected ? "default" : "outline"}
              onClick={() => setSelectedWeek(week)}
              className={`min-w-[90px] rounded-xl text-[10px] font-black uppercase tracking-wider transition-all duration-300 relative ${
                isSelected 
                  ? 'bg-gradient-to-r from-primary to-emerald-600 text-white hover:opacity-95 shadow-lg shadow-primary/20 border-0' 
                  : 'hover:bg-muted border-white/10 dark:border-white/5 text-muted-foreground hover:text-foreground'
              }`}
            >
              Week {week}
              {isCurrent && (
                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              )}
            </Button>
          );
        })}
      </div>

      {/* Match Schedule */}
      <div className="grid gap-6">
        {weeklyMatches.length === 0 ? (
          <Card className="text-center p-12 bg-slate-900/60 dark:bg-slate-950/40 backdrop-blur-md border-dashed border-2 border-white/10 rounded-2xl">
            <CardContent className="space-y-4">
              <div className="text-4xl animate-float">⏳</div>
              <h3 className="text-lg font-black uppercase tracking-wider text-white">No Matches Scheduled</h3>
              <p className="text-slate-450 text-xs font-semibold max-w-sm mx-auto uppercase tracking-wider">
                Week {selectedWeek} fixtures have not been loaded or scheduled yet. Check back soon!
              </p>
            </CardContent>
          </Card>
        ) : (
          weeklyMatches.map((match) => {
            const player1 = getPlayerById(match.player1Id);
            const player2 = getPlayerById(match.player2Id);
            const isLive = match.status === 'live';
            const isCompleted = match.status === 'completed';
            
            return (
              <Card 
                key={match.id} 
                className={`overflow-hidden bg-slate-900/80 dark:bg-slate-950/60 backdrop-blur-md border border-white/5 border-l-4 transition-all duration-300 ${
                  isLive ? 'border-l-rose-500 shadow-2xl shadow-rose-550/10 hover:shadow-rose-500/20' : 
                  isCompleted ? 'border-l-emerald-500' : 'border-l-slate-700'
                }`}
              >
                {/* Card Top bar with match details */}
                <CardHeader className={`${getMatchTypeColor(match.matchType)} text-white py-3.5 px-6 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-3 text-[9px] font-black uppercase tracking-widest">
                      <span className="text-amber-400">
                        {match.round}
                      </span>
                      <span className="text-white/40">•</span>
                      <span className="text-white/95">
                        {new Date(match.date).toLocaleDateString()} ({getMatchDay(match.matchType)})
                      </span>
                      <span className="text-white/40">•</span>
                      <span className="text-white/95">
                        {match.time}
                      </span>
                    </div>

                    <div className="flex items-center self-start sm:self-auto">
                      <Badge 
                        variant={isCompleted ? 'default' : isLive ? 'destructive' : 'secondary'}
                        className={`font-black text-[8px] tracking-widest uppercase border-0 rounded px-2.5 py-0.5 ${
                          isLive ? 'bg-rose-600 text-white animate-pulse' :
                          isCompleted ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-355'
                        }`}
                      >
                        {isLive && <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-white animate-ping inline-block" />}
                        {match.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                {/* Scoreboard display */}
                <CardContent className="p-6 md:p-8">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-4">
                    
                    {/* Player 1 */}
                    <div className="flex-1 w-full sm:w-auto text-center sm:text-right flex flex-row-reverse sm:flex-row items-center justify-end gap-4 group">
                      <div className="flex-1 sm:flex-initial text-right">
                        <h3 className="text-base font-black text-white uppercase tracking-wider truncate">
                          {player1?.name || 'TBD'}
                        </h3>
                        <p className="text-xs text-primary font-bold truncate mt-0.5 uppercase tracking-widest">
                          {match.player1Team}
                        </p>
                      </div>
                      {getTeamBadge(match.player1Team)}
                    </div>
                    
                    {/* Versus / Live Scoreboard */}
                    <div className="px-6 py-3.5 rounded-2xl bg-slate-950/80 border border-white/5 text-center min-w-[130px] shadow-2xl backdrop-blur-md">
                      {isCompleted ? (
                        <div className="flex flex-col items-center">
                          <span className="text-2xl font-black tracking-widest text-white">
                            {match.player1Score} - {match.player2Score}
                          </span>
                          <span className="text-[8px] text-slate-500 uppercase font-black tracking-widest mt-1.5 border-t border-white/5 pt-1.5 w-full">FINAL TIME</span>
                        </div>
                      ) : isLive ? (
                        <div className="flex flex-col items-center">
                          <span className="text-2xl font-black text-rose-500 animate-pulse tracking-widest">
                            {match.player1Score} - {match.player2Score}
                          </span>
                          <span className="text-[8px] text-rose-500 uppercase font-black tracking-widest mt-1.5 flex items-center justify-center border-t border-white/5 pt-1.5 w-full">
                            <span className="mr-1 h-1.5 w-1.5 rounded-full bg-rose-500 animate-ping inline-block" />
                            LIVE SCORE
                          </span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center py-0.5">
                          <span className="text-sm font-black text-slate-500 uppercase tracking-widest">VS</span>
                          <span className="text-[8px] text-slate-500 uppercase font-black tracking-widest mt-1">SCHEDULED</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Player 2 */}
                    <div className="flex-1 w-full sm:w-auto text-center sm:text-left flex flex-row items-center justify-start gap-4 group">
                      {getTeamBadge(match.player2Team)}
                      <div className="flex-1 sm:flex-initial text-left">
                        <h3 className="text-base font-black text-white uppercase tracking-wider truncate">
                          {player2?.name || 'TBD'}
                        </h3>
                        <p className="text-xs text-primary font-bold truncate mt-0.5 uppercase tracking-widest">
                          {match.player2Team}
                        </p>
                      </div>
                    </div>

                  </div>
                  
                  {/* Match Result Winner Overlay */}
                  {isCompleted && (
                    <div className="mt-6 pt-4 border-t border-white/5 flex justify-center">
                      <div className="flex items-center space-x-2 text-[9px] font-black uppercase tracking-widest text-slate-400">
                        <span>Winner:</span>
                        <span className="text-primary font-black uppercase">
                          {match.player1Score > match.player2Score ? player1?.name :
                           match.player2Score > match.player1Score ? player2?.name : 'Draw Game'}
                        </span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
      
      {/* Tournament Info */}
      <Card className="glass-panel border-white/10 shadow-xl max-w-4xl mx-auto rounded-2xl">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest">
              Schedule Overview
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-muted/20 rounded-xl border border-white/5 text-slate-400 font-semibold">
                <p className="font-black text-slate-800 dark:text-white uppercase tracking-wider mb-1">Saturdays</p>
                <span>Regular Season Fixtures & League Stages</span>
              </div>
              <div className="p-4 bg-muted/20 rounded-xl border border-white/5 text-slate-400 font-semibold">
                <p className="font-black text-slate-800 dark:text-white uppercase tracking-wider mb-1">Sundays</p>
                <span>Knockout Rounds (Quarter-finals, Semis, Grand Final)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FifaFixtures;

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Clock, MapPin, Trophy, Play, CheckCircle, AlertCircle, Shield, Award, Flame } from "lucide-react";
import { loadMatches, loadPlayers, loadTournament, type Match, type Player } from "@/lib/storage";

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
      default: return 'bg-gradient-to-r from-slate-800 to-slate-900 dark:from-slate-900 dark:to-slate-950';
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
      'from-blue-600 to-cyan-500',
      'from-red-600 to-orange-500',
      'from-emerald-600 to-teal-500',
      'from-indigo-600 to-violet-500',
      'from-amber-500 to-yellow-400',
      'from-purple-600 to-pink-500'
    ];
    let sum = 0;
    for (let i = 0; i < teamName.length; i++) sum += teamName.charCodeAt(i);
    const color = colors[sum % colors.length];

    return (
      <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white font-black text-lg shadow-md border border-white/20 transform group-hover:scale-105 transition-transform duration-300`}>
        {initials}
      </div>
    );
  };

  const weeklyMatches = getMatchesByWeek(selectedWeek);

  return (
    <div className="space-y-8">
      {/* FIFA World Cup Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-8 text-white border border-white/10 shadow-xl">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-60" />
        <div className="relative z-10 text-center">
          <div className="mb-4 flex justify-center">
            <Trophy className="h-10 w-10 text-amber-400 animate-float" />
          </div>
          <h1 className="mb-2 text-3xl md:text-4xl font-black tracking-tight uppercase">Kawerify Fixtures Schedule</h1>
          <p className="text-sm md:text-base text-slate-400 font-medium">Tournament Season {tournament.season} Matchdays</p>
          <div className="mt-4 flex justify-center space-x-3">
            <Badge className="bg-gradient-to-r from-primary to-emerald-600 text-white font-extrabold px-4 py-1.5 shadow-md border-0">
              Week {tournament.currentWeek}
            </Badge>
            <Badge className="bg-slate-900 text-amber-400 font-extrabold px-4 py-1.5 border border-amber-500/20 shadow-md">
              {tournament.currentRound}
            </Badge>
          </div>
        </div>
      </div>

      {/* Week Selector */}
      <div className="flex justify-center space-x-1.5 overflow-x-auto pb-3 pt-1 px-2 border-b border-border/40">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((week) => {
          const isCurrent = tournament.currentWeek === week;
          const isSelected = selectedWeek === week;
          return (
            <Button
              key={week}
              variant={isSelected ? "default" : "outline"}
              onClick={() => setSelectedWeek(week)}
              className={`min-w-[90px] rounded-full text-xs font-black transition-all duration-300 relative ${
                isSelected 
                  ? 'bg-gradient-to-r from-primary to-emerald-600 text-white hover:opacity-95 shadow-md shadow-primary/20 border-0' 
                  : 'hover:bg-muted border-border/80 text-muted-foreground hover:text-foreground'
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
      <div className="grid gap-6 max-w-4xl mx-auto">
        {weeklyMatches.length === 0 ? (
          <Card className="text-center p-12 glass-panel border-dashed border-2">
            <CardContent className="space-y-4">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto animate-float" />
              <h3 className="text-xl font-extrabold text-slate-800 dark:text-slate-200">No Matches Scheduled</h3>
              <p className="text-slate-500 text-sm max-w-sm mx-auto">
                Week {selectedWeek} fixtures have not been loaded or scheduled yet. Check back soon!
              </p>
            </CardContent>
          </Card>
        ) : (
          weeklyMatches.map((match) => {
            const player1 = getPlayerById(match.player1Id);
            const player2 = getPlayerById(match.player2Id);
            
            return (
              <Card 
                key={match.id} 
                className={`overflow-hidden glass-card border-l-4 transition-all duration-300 ${
                  match.status === 'live' ? 'border-l-rose-500 shadow-md ring-1 ring-rose-500/20' : 
                  match.status === 'completed' ? 'border-l-emerald-500' : 'border-l-slate-400 dark:border-l-slate-600'
                }`}
              >
                {/* Card Top bar with match details */}
                <CardHeader className={`${getMatchTypeColor(match.matchType)} text-white py-3.5 px-6 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-3 text-xs">
                      <span className="font-extrabold uppercase tracking-widest text-yellow-400">
                        {match.round}
                      </span>
                      <span className="text-white/60">•</span>
                      <span className="flex items-center text-white/90 font-medium">
                        <CalendarIcon className="mr-1.5 h-3.5 w-3.5 opacity-80" />
                        {new Date(match.date).toLocaleDateString()} ({getMatchDay(match.matchType)})
                      </span>
                      <span className="text-white/60">•</span>
                      <span className="flex items-center text-white/90 font-medium">
                        <Clock className="mr-1.5 h-3.5 w-3.5 opacity-80" />
                        {match.time}
                      </span>
                    </div>

                    <div className="flex items-center self-start sm:self-auto">
                      <Badge 
                        variant={match.status === 'completed' ? 'default' : match.status === 'live' ? 'destructive' : 'secondary'}
                        className={`font-black text-[10px] tracking-wider uppercase border-0 ${
                          match.status === 'live' ? 'bg-rose-600 text-white animate-pulse' :
                          match.status === 'completed' ? 'bg-emerald-600 text-white' : 'bg-slate-700 text-slate-200'
                        }`}
                      >
                        {match.status === 'live' && <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-white animate-ping inline-block" />}
                        {match.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                {/* Scoreboard display */}
                <CardContent className="p-6 md:p-8">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-2">
                    
                    {/* Player 1 */}
                    <div className="flex-1 w-full sm:w-auto text-center sm:text-right flex flex-row-reverse sm:flex-row items-center justify-end gap-4">
                      <div className="flex-1 sm:flex-initial text-right">
                        <h3 className="text-lg md:text-xl font-black text-slate-900 dark:text-white truncate">
                          {player1?.name || 'TBD'}
                        </h3>
                        <p className="text-sm text-primary font-bold flex items-center justify-end truncate mt-0.5">
                          <Shield className="h-3.5 w-3.5 text-slate-400 mr-1" />
                          {match.player1Team}
                        </p>
                      </div>
                      {getTeamBadge(match.player1Team)}
                    </div>
                    
                    {/* Versus / Live Scoreboard */}
                    <div className="px-6 py-2 rounded-2xl bg-muted/30 border border-border/40 text-center min-w-[120px]">
                      {match.status === 'completed' ? (
                        <div className="flex flex-col items-center">
                          <span className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                            {match.player1Score} - {match.player2Score}
                          </span>
                          <span className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mt-1">FT SCORE</span>
                        </div>
                      ) : match.status === 'live' ? (
                        <div className="flex flex-col items-center">
                          <span className="text-2xl font-black text-rose-500 animate-pulse">
                            {match.player1Score} - {match.player2Score}
                          </span>
                          <span className="text-[10px] text-rose-500 uppercase font-black tracking-widest mt-1 flex items-center">
                            <span className="mr-1 h-1.5 w-1.5 rounded-full bg-rose-500 animate-ping" />
                            IN PLAY
                          </span>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center">
                          <span className="text-xl font-extrabold text-muted-foreground">VS</span>
                          <span className="text-[9px] text-muted-foreground uppercase font-bold tracking-widest mt-1">SCHEDULED</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Player 2 */}
                    <div className="flex-1 w-full sm:w-auto text-center sm:text-left flex flex-row items-center justify-start gap-4">
                      {getTeamBadge(match.player2Team)}
                      <div className="flex-1 sm:flex-initial text-left">
                        <h3 className="text-lg md:text-xl font-black text-slate-900 dark:text-white truncate">
                          {player2?.name || 'TBD'}
                        </h3>
                        <p className="text-sm text-primary font-bold flex items-center justify-start truncate mt-0.5">
                          <Shield className="h-3.5 w-3.5 text-slate-400 mr-1" />
                          {match.player2Team}
                        </p>
                      </div>
                    </div>

                  </div>
                  
                  {/* Match Result Winner Overlay */}
                  {match.status === 'completed' && (
                    <div className="mt-6 pt-4 border-t border-border/50 flex justify-center">
                      <div className="flex items-center space-x-2 text-xs font-bold text-slate-500">
                        <Award className="h-4 w-4 text-amber-500" />
                        <span>Winner:</span>
                        <span className="text-primary font-extrabold">
                          {match.player1Score > match.player2Score ? player1?.name :
                           match.player2Score > match.player1Score ? player2?.name : 'Draw Match'}
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
      <Card className="glass-panel border-white/20 dark:border-white/5 shadow-xl max-w-4xl mx-auto rounded-2xl">
        <CardContent className="p-6">
          <div className="text-center space-y-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center justify-center">
              <MapPin className="mr-1.5 h-4 w-4 text-emerald-400" />
              Tournament Schedule Rules
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-slate-500">
              <div className="p-3 bg-muted/20 rounded-xl border border-border/40">
                <p className="font-bold text-slate-800 dark:text-slate-300 mb-0.5">Saturdays</p>
                <span>Regular Season Matches • League Stages</span>
              </div>
              <div className="p-3 bg-muted/20 rounded-xl border border-border/40">
                <p className="font-bold text-slate-800 dark:text-slate-300 mb-0.5">Sundays</p>
                <span>Knockout Stage Matches (QF, SF, Grand Final)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FifaFixtures;

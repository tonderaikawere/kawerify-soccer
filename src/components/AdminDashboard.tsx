import { useState } from "react";
import { Settings, UserPlus, Calendar, BarChart, Trophy, Users, Edit, Trash2, Plus, Save, Upload, Download, LogOut, Shield, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { type Player, type Match, type Tournament } from "@/lib/storage";

interface AdminDashboardProps {
  players: Player[];
  matches: Match[];
  tournament: Tournament;
  newPlayer: { name: string; currentTeam: string; image: string };
  setNewPlayer: (player: { name: string; currentTeam: string; image: string }) => void;
  newMatch: any;
  setNewMatch: (match: any) => void;
  editingPlayer: Player | null;
  setEditingPlayer: (player: Player | null) => void;
  editingMatch: Match | null;
  setEditingMatch: (match: Match | null) => void;
  onAddPlayer: (e: React.FormEvent) => void;
  onUpdatePlayer: (e: React.FormEvent) => void;
  onAddMatch: (e: React.FormEvent) => void;
  onUpdateMatch: (e: React.FormEvent) => void;
  onCompleteMatch: (matchId: string, player1Score: number, player2Score: number) => void;
  onAutoSchedule: () => void;
  onExportData: () => void;
  onLogout: () => void;
}

const AdminDashboard = ({
  players,
  matches,
  tournament,
  newPlayer,
  setNewPlayer,
  newMatch,
  setNewMatch,
  editingPlayer,
  setEditingPlayer,
  editingMatch,
  setEditingMatch,
  onAddPlayer,
  onUpdatePlayer,
  onAddMatch,
  onUpdateMatch,
  onCompleteMatch,
  onAutoSchedule,
  onExportData,
  onLogout
}: AdminDashboardProps) => {
  const [matchScores, setMatchScores] = useState<{[key: string]: {p1: number, p2: number}}>({});
  const { toast } = useToast();

  const completedMatches = matches.filter(m => m.status === 'completed').length;
  const upcomingMatches = matches.filter(m => m.status === 'scheduled').length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070b13] pb-16 transition-colors duration-300">
      <main className="container mx-auto px-6 py-10 max-w-6xl">
        
        {/* FIFA-style Control Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-8 text-white border border-white/10 shadow-xl mb-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent opacity-60" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-black uppercase tracking-tight flex items-center">
                <Shield className="h-6.5 w-6.5 mr-2 text-emerald-400" />
                Tournament Control Room
              </h1>
              <p className="text-slate-400 font-medium text-sm">Kawerify Tech Cup Live Operations & Statistics Editor</p>
              <div className="flex space-x-2 pt-1">
                <Badge className="bg-gradient-to-r from-primary to-emerald-600 border-0 text-white font-extrabold">
                  Season {tournament.season}
                </Badge>
                <Badge className="bg-slate-900 text-amber-400 border border-amber-500/20 font-extrabold">
                  Week {tournament.currentWeek}
                </Badge>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button onClick={onAutoSchedule} className="rounded-xl bg-gradient-to-r from-primary to-emerald-600 hover:opacity-95 text-white font-black text-xs shadow-md shadow-primary/20">
                <Calendar className="h-4 w-4 mr-1.5" />
                Auto-Schedule
              </Button>
              <Button onClick={onExportData} variant="outline" className="rounded-xl border-white/10 bg-slate-900/60 hover:bg-slate-800 text-slate-200 font-bold text-xs">
                <Download className="h-4 w-4 mr-1.5" />
                Export Data
              </Button>
              <Button onClick={onLogout} variant="destructive" className="rounded-xl font-bold text-xs">
                <LogOut className="h-4 w-4 mr-1.5" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Tab Selection */}
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="flex flex-wrap md:grid w-full grid-cols-5 bg-muted/60 p-1 rounded-2xl h-auto gap-1">
            <TabsTrigger value="overview" className="rounded-xl text-xs font-black flex-1 py-2.5">
              <BarChart className="h-3.5 w-3.5 mr-1.5" />Overview
            </TabsTrigger>
            <TabsTrigger value="players" className="rounded-xl text-xs font-black flex-1 py-2.5">
              <Users className="h-3.5 w-3.5 mr-1.5" />Players
            </TabsTrigger>
            <TabsTrigger value="fixtures" className="rounded-xl text-xs font-black flex-1 py-2.5">
              <Calendar className="h-3.5 w-3.5 mr-1.5" />Schedule
            </TabsTrigger>
            <TabsTrigger value="results" className="rounded-xl text-xs font-black flex-1 py-2.5">
              <Trophy className="h-3.5 w-3.5 mr-1.5" />Scoring
            </TabsTrigger>
            <TabsTrigger value="settings" className="rounded-xl text-xs font-black flex-1 py-2.5">
              <Settings className="h-3.5 w-3.5 mr-1.5" />Config
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab Content */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="glass-card text-center">
                <CardContent className="p-5 space-y-1">
                  <Users className="h-8 w-8 text-primary mx-auto" />
                  <p className="text-3xl font-black text-slate-900 dark:text-white">{players.length}</p>
                  <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Players</p>
                </CardContent>
              </Card>
              
              <Card className="glass-card text-center">
                <CardContent className="p-5 space-y-1">
                  <Trophy className="h-8 w-8 text-emerald-500 mx-auto animate-float" />
                  <p className="text-3xl font-black text-slate-900 dark:text-white">{completedMatches}</p>
                  <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Completed</p>
                </CardContent>
              </Card>
              
              <Card className="glass-card text-center">
                <CardContent className="p-5 space-y-1">
                  <Calendar className="h-8 w-8 text-blue-500 mx-auto" />
                  <p className="text-3xl font-black text-slate-900 dark:text-white">{upcomingMatches}</p>
                  <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Upcoming</p>
                </CardContent>
              </Card>
              
              <Card className="glass-card text-center">
                <CardContent className="p-5 space-y-1">
                  <Zap className="h-8 w-8 text-indigo-500 mx-auto" />
                  <p className="text-xl font-black text-slate-900 dark:text-white truncate pt-1">{tournament.currentRound}</p>
                  <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Current Round</p>
                </CardContent>
              </Card>
            </div>

            {/* Top Performers Table */}
            <Card className="glass-panel border-white/10 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center">
                  <Trophy className="h-5 w-5 text-amber-500 mr-2" />
                  Top Performers
                </CardTitle>
                <CardDescription>Live standings overview based on points</CardDescription>
              </CardHeader>
              <CardContent className="p-0 border-t border-border/40 divide-y divide-border/60">
                {players
                  .sort((a, b) => b.stats.points - a.stats.points)
                  .slice(0, 5)
                  .map((player, index) => (
                    <div key={player.id} className="flex items-center justify-between p-4 px-6 hover:bg-slate-500/5 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className={`h-6 w-6 rounded-full flex items-center justify-center font-bold text-xs text-white ${
                          index === 0 ? 'bg-amber-500' : index === 1 ? 'bg-slate-400' : index === 2 ? 'bg-amber-700' : 'bg-slate-600'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-extrabold text-slate-900 dark:text-white">{player.name}</p>
                          <p className="text-xs text-muted-foreground">{player.currentTeam}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-sm text-primary">{player.stats.points} pts</p>
                        <p className="text-[10px] text-muted-foreground font-semibold">{player.stats.wins}W - {player.stats.losses}L</p>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Players Management Tab Content */}
          <TabsContent value="players" className="space-y-6">
            <Card className="glass-panel border-white/10 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center">
                  <UserPlus className="h-5 w-5 mr-2 text-primary" />
                  Register Gamer
                </CardTitle>
                <CardDescription>Add a new competitor into the Kawerify Tech tournament registry.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={onAddPlayer} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="reg-name">Player Name *</Label>
                      <Input
                        id="reg-name"
                        value={newPlayer.name}
                        onChange={(e) => setNewPlayer({...newPlayer, name: e.target.value})}
                        placeholder="e.g. John Doe"
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="reg-team">Represented FIFA Team *</Label>
                      <Input
                        id="reg-team"
                        value={newPlayer.currentTeam}
                        onChange={(e) => setNewPlayer({...newPlayer, currentTeam: e.target.value})}
                        placeholder="e.g. Real Madrid"
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="reg-img">Profile Image URL</Label>
                      <Input
                        id="reg-img"
                        value={newPlayer.image}
                        onChange={(e) => setNewPlayer({...newPlayer, image: e.target.value})}
                        placeholder="Optional URL link"
                        className="rounded-xl"
                      />
                    </div>
                  </div>
                  <Button type="submit" className="rounded-xl font-bold bg-gradient-to-r from-primary to-emerald-600">
                    <Plus className="h-4 w-4 mr-1.5" />
                    Register Gamer
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Registered Players list cards */}
            <Card className="glass-panel border-white/10 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-black uppercase tracking-wider text-slate-900 dark:text-white">Registered Competitors ({players.length})</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {players.map((player) => (
                    <Card key={player.id} className="glass-card relative overflow-hidden border border-border/60 rounded-xl hover:-translate-y-1 transition-all duration-300">
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="font-extrabold text-slate-900 dark:text-white truncate pr-2">{player.name}</h3>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setEditingPlayer(player)}
                            className="h-8 w-8 p-0 rounded-full hover:bg-muted"
                          >
                            <Edit className="h-3.5 w-3.5 text-slate-600" />
                          </Button>
                        </div>
                        <p className="text-xs text-primary font-bold">{player.currentTeam}</p>
                        <div className="flex justify-between items-center text-[10px] uppercase font-bold text-muted-foreground pt-2.5 border-t border-border/40">
                          <span>Points: {player.stats.points}</span>
                          <span>{player.stats.wins}W - {player.stats.losses}L</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Fixtures Scheduling Tab Content */}
          <TabsContent value="fixtures" className="space-y-6">
            <Card className="glass-panel border-white/10 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center">
                  <Plus className="h-5 w-5 mr-2 text-primary" />
                  Schedule Custom Match
                </CardTitle>
                <CardDescription>Manually configure and add a matchday fixture to the calendar.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={onAddMatch} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label>Competitor 1 (Player 1)</Label>
                      <Select value={newMatch.player1Id} onValueChange={(value) => {
                        const player = players.find(p => p.id === value);
                        setNewMatch({...newMatch, player1Id: value, player1Team: player?.currentTeam || ""});
                      }}>
                        <SelectTrigger className="rounded-xl">
                          <SelectValue placeholder="Select Competitor 1" />
                        </SelectTrigger>
                        <SelectContent>
                          {players.map((player) => (
                            <SelectItem key={player.id} value={player.id}>
                              {player.name} ({player.currentTeam})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <Label>Competitor 2 (Player 2)</Label>
                      <Select value={newMatch.player2Id} onValueChange={(value) => {
                        const player = players.find(p => p.id === value);
                        setNewMatch({...newMatch, player2Id: value, player2Team: player?.currentTeam || ""});
                      }}>
                        <SelectTrigger className="rounded-xl">
                          <SelectValue placeholder="Select Competitor 2" />
                        </SelectTrigger>
                        <SelectContent>
                          {players.map((player) => (
                            <SelectItem key={player.id} value={player.id}>
                              {player.name} ({player.currentTeam})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="match-date">Match Date</Label>
                      <Input
                        id="match-date"
                        type="date"
                        value={newMatch.date}
                        onChange={(e) => setNewMatch({...newMatch, date: e.target.value})}
                        className="rounded-xl"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="match-time">Kick-Off Time</Label>
                      <Input
                        id="match-time"
                        type="time"
                        value={newMatch.time}
                        onChange={(e) => setNewMatch({...newMatch, time: e.target.value})}
                        className="rounded-xl"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label>Stage / Match Type</Label>
                      <Select value={newMatch.matchType} onValueChange={(value: any) => setNewMatch({...newMatch, matchType: value})}>
                        <SelectTrigger className="rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="regular">Regular Season</SelectItem>
                          <SelectItem value="quarter-final">Quarter Final</SelectItem>
                          <SelectItem value="semi-final">Semi Final</SelectItem>
                          <SelectItem value="final">Final Match</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="match-week">Week Number</Label>
                      <Input
                        id="match-week"
                        type="number"
                        min="1"
                        max="20"
                        value={newMatch.week}
                        onChange={(e) => setNewMatch({...newMatch, week: parseInt(e.target.value)})}
                        className="rounded-xl"
                      />
                    </div>
                  </div>

                  <Button type="submit" className="rounded-xl font-bold bg-gradient-to-r from-primary to-emerald-600">
                    <Calendar className="h-4 w-4 mr-1.5" />
                    Publish Fixture
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* scoring Results Tab Content */}
          <TabsContent value="results" className="space-y-6">
            <Card className="glass-panel border-white/10 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-primary animate-float" />
                  Scoreboard Scorer Manager
                </CardTitle>
                <CardDescription>Input and finalize matchday scores for scheduled games.</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {matches.filter(match => match.status === 'scheduled').length === 0 ? (
                    <div className="text-center py-10 text-slate-500 text-sm font-semibold">No scheduled matches pending scoring inputs.</div>
                  ) : (
                    matches
                      .filter(match => match.status === 'scheduled')
                      .map((match) => {
                        const player1 = players.find(p => p.id === match.player1Id);
                        const player2 = players.find(p => p.id === match.player2Id);
                        const scores = matchScores[match.id] || { p1: 0, p2: 0 };
                        
                        return (
                          <div key={match.id} className="p-5 bg-muted/30 rounded-2xl border border-border/40 space-y-4">
                            <div className="flex items-center justify-between text-xs font-bold text-slate-500 border-b border-border/40 pb-2.5">
                              <span>
                                {match.round} • {new Date(match.date).toLocaleDateString()} at {match.time}
                              </span>
                              <Badge variant="outline" className="border-border/80 text-muted-foreground uppercase text-[9px] font-black">{match.matchType}</Badge>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                              <div className="flex-1 text-center space-y-1.5">
                                <p className="font-extrabold text-slate-900 dark:text-white text-base">{player1?.name}</p>
                                <p className="text-xs text-primary font-semibold">{match.player1Team}</p>
                                <Input
                                  type="number"
                                  min="0"
                                  className="w-20 mx-auto text-center rounded-xl font-bold"
                                  value={scores.p1}
                                  onChange={(e) => setMatchScores({
                                    ...matchScores,
                                    [match.id]: { ...scores, p1: parseInt(e.target.value) || 0 }
                                  })}
                                />
                              </div>
                              
                              <div className="text-lg font-black text-slate-400">VS</div>
                              
                              <div className="flex-1 text-center space-y-1.5">
                                <p className="font-extrabold text-slate-900 dark:text-white text-base">{player2?.name}</p>
                                <p className="text-xs text-primary font-semibold">{match.player2Team}</p>
                                <Input
                                  type="number"
                                  min="0"
                                  className="w-20 mx-auto text-center rounded-xl font-bold"
                                  value={scores.p2}
                                  onChange={(e) => setMatchScores({
                                    ...matchScores,
                                    [match.id]: { ...scores, p2: parseInt(e.target.value) || 0 }
                                  })}
                                />
                              </div>
                            </div>
                            
                            <div className="pt-3 border-t border-border/40 text-center">
                              <Button
                                onClick={() => onCompleteMatch(match.id, scores.p1, scores.p2)}
                                className="rounded-xl font-black text-xs bg-gradient-to-r from-primary to-emerald-600 text-white hover:opacity-95"
                              >
                                <Save className="h-4 w-4 mr-1.5" />
                                Save Score & Complete Match
                              </Button>
                            </div>
                          </div>
                        );
                      })
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Config / settings Tab Content */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="glass-panel border-white/10 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center">
                  <Settings className="h-5 w-5 mr-2 text-primary" />
                  Tournament Configurations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground font-bold">Tournament Title</Label>
                    <Input value={tournament.name} readOnly className="rounded-xl bg-muted/30" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground font-bold">Season Number</Label>
                    <Input value={tournament.season} readOnly className="rounded-xl bg-muted/30" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground font-bold">Current Game Week</Label>
                    <Input value={tournament.currentWeek} readOnly className="rounded-xl bg-muted/30" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground font-bold">Current Stage Name</Label>
                    <Input value={tournament.currentRound} readOnly className="rounded-xl bg-muted/30" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground font-bold">Win Points Value</Label>
                    <Input value={tournament.settings.pointsPerWin} readOnly className="rounded-xl bg-muted/30" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground font-bold">Draw Points Value</Label>
                    <Input value={tournament.settings.pointsPerDraw} readOnly className="rounded-xl bg-muted/30" />
                  </div>
                </div>
                
                <div className="pt-6 border-t border-border/40">
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white uppercase tracking-wider mb-4">Operations Backup</h3>
                  <div className="flex flex-wrap gap-3">
                    <Button onClick={onExportData} variant="outline" className="rounded-xl text-xs font-bold">
                      <Download className="h-4 w-4 mr-1.5" />
                      Backup Database (Export JSON)
                    </Button>
                    <Button variant="outline" className="rounded-xl text-xs font-bold border-dashed hover:bg-muted">
                      <Upload className="h-4 w-4 mr-1.5" />
                      Restore Database (Import JSON)
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;

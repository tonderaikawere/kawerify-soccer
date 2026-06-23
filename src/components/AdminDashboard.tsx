import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { type Player, type Match, type Tournament } from "@/lib/storage";
import { 
  Users, 
  CheckCircle2, 
  Calendar, 
  Trophy, 
  Lock, 
  ShieldAlert, 
  LogOut, 
  Download, 
  Sparkles, 
  PlusCircle, 
  Activity, 
  Award, 
  Settings, 
  Clock, 
  Edit3, 
  Database, 
  Upload 
} from "lucide-react";

interface AdminDashboardProps {
  players: Player[];
  matches: Match[];
  tournament: Tournament;
  newPlayer: { name: string; currentTeam: string; image: string; playstyle: string; excuse: string };
  setNewPlayer: (player: { name: string; currentTeam: string; image: string; playstyle: string; excuse: string }) => void;
  newMatch: {
    player1Id: string;
    player2Id: string;
    date: string;
    time: string;
    matchType: Match['matchType'];
    round: string;
    week: number;
  };
  setNewMatch: React.Dispatch<React.SetStateAction<{
    player1Id: string;
    player2Id: string;
    date: string;
    time: string;
    matchType: Match['matchType'];
    round: string;
    week: number;
  }>>;
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
    <div className="min-h-screen bg-slate-50 dark:bg-[#070b13] bg-stadium-grid text-slate-900 dark:text-white pb-16 relative overflow-hidden transition-all duration-300">
      {/* Decorative ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-radial-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      <main className="container mx-auto px-6 py-10 max-w-6xl relative z-10">
        
        {/* Control Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gradient-to-r dark:from-slate-955 dark:via-slate-900/90 dark:to-slate-955 p-8 text-slate-900 dark:text-white border border-slate-200 dark:border-white/5 shadow-lg dark:shadow-2xl mb-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-70" />
          <div className="absolute -top-10 -right-10 p-4 opacity-5 pointer-events-none">
            <Settings className="w-48 h-48 animate-spin-slow" />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <h1 className="text-3xl font-black uppercase tracking-wider bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
                  Control Room
                </h1>
              </div>
              <p className="text-slate-500 dark:text-slate-400 font-medium text-sm flex items-center gap-1.5">
                <Activity className="h-4 w-4 text-primary" /> Kawerify Tech Cup Live Operations & Statistics Editor
              </p>
              <div className="flex space-x-2 pt-1">
                <Badge className="bg-gradient-to-r from-primary to-emerald-600 border-0 text-white font-extrabold px-3 py-1">
                  Season {tournament.season}
                </Badge>
                <Badge className="bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-amber-500/30 text-amber-600 dark:text-amber-400 font-extrabold px-3 py-1">
                  Week {tournament.currentWeek}
                </Badge>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Button onClick={onAutoSchedule} className="rounded-xl bg-gradient-to-r from-primary to-emerald-600 hover:opacity-95 text-white font-black text-xs shadow-lg shadow-primary/20 transition-all hover:scale-105 duration-200 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5" /> Auto-Schedule
              </Button>
              <Button onClick={onExportData} variant="outline" className="rounded-xl border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center gap-1.5 shadow-sm dark:shadow-none">
                <Download className="h-3.5 w-3.5" /> Export Data
              </Button>
              <Button onClick={onLogout} className="rounded-xl font-bold text-xs bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-900/30 hover:scale-105 transition-all duration-200 flex items-center gap-1.5">
                <LogOut className="h-3.5 w-3.5" /> Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Tab Selection */}
        <Tabs defaultValue="overview" className="space-y-8 text-slate-900 dark:text-white">
          <TabsList className="flex flex-wrap md:grid w-full grid-cols-5 bg-slate-100 dark:bg-slate-950/60 p-1 rounded-2xl h-auto gap-1 border border-slate-200 dark:border-white/5 backdrop-blur-md">
            <TabsTrigger value="overview" className="rounded-xl text-xs font-black flex-1 py-3 text-slate-500 dark:text-slate-400 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300">
              Overview
            </TabsTrigger>
            <TabsTrigger value="players" className="rounded-xl text-xs font-black flex-1 py-3 text-slate-500 dark:text-slate-400 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300">
              Players
            </TabsTrigger>
            <TabsTrigger value="fixtures" className="rounded-xl text-xs font-black flex-1 py-3 text-slate-500 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300">
              Schedule
            </TabsTrigger>
            <TabsTrigger value="results" className="rounded-xl text-xs font-black flex-1 py-3 text-slate-500 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300">
              Scoring
            </TabsTrigger>
            <TabsTrigger value="settings" className="rounded-xl text-xs font-black flex-1 py-3 text-slate-500 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300">
              Config
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab Content */}
          <TabsContent value="overview" className="space-y-6 outline-none">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-slate-900 dark:text-white">
              <Card className="bg-white dark:bg-slate-955/45 backdrop-blur-md border border-slate-200 dark:border-white/5 rounded-2xl p-5 hover:border-primary/30 transition-all hover:scale-[1.02] duration-300 shadow-sm dark:shadow-none">
                <CardContent className="p-0 flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-3xl font-black text-slate-900 dark:text-white">{players.length}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">Players Registered</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-955/50 text-primary border border-slate-200 dark:border-white/5">
                    <Users className="h-5 w-5" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white dark:bg-slate-955/45 backdrop-blur-md border border-slate-200 dark:border-white/5 rounded-2xl p-5 hover:border-primary/30 transition-all hover:scale-[1.02] duration-300 shadow-sm dark:shadow-none">
                <CardContent className="p-0 flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-3xl font-black text-slate-900 dark:text-white">{completedMatches}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">Completed Matches</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-955/50 text-emerald-600 dark:text-emerald-400 border border-slate-200 dark:border-white/5">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white dark:bg-slate-955/45 backdrop-blur-md border border-slate-200 dark:border-white/5 rounded-2xl p-5 hover:border-primary/30 transition-all hover:scale-[1.02] duration-300 shadow-sm dark:shadow-none">
                <CardContent className="p-0 flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-3xl font-black text-slate-900 dark:text-white">{upcomingMatches}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">Upcoming Fixtures</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-955/50 text-secondary border border-slate-200 dark:border-white/5">
                    <Calendar className="h-5 w-5" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white dark:bg-slate-955/45 backdrop-blur-md border border-slate-200 dark:border-white/5 rounded-2xl p-5 hover:border-primary/30 transition-all hover:scale-[1.02] duration-300 shadow-sm dark:shadow-none">
                <CardContent className="p-0 flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-xl font-black text-slate-900 dark:text-white truncate pt-1">{tournament.currentRound}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">Current Stage</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-955/50 text-amber-500 dark:text-amber-400 border border-slate-200 dark:border-white/5">
                    <Trophy className="h-5 w-5" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top Performers Table */}
            <Card className="bg-white dark:bg-slate-950/45 backdrop-blur-md border border-slate-200 dark:border-white/5 rounded-2xl shadow-xl overflow-hidden">
              <CardHeader className="border-b border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-slate-955/45">
                <CardTitle className="text-lg font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                  <Award className="h-5 w-5 text-amber-400" /> Top Performers
                </CardTitle>
                <CardDescription className="text-slate-500 dark:text-slate-400">Live standings overview based on points</CardDescription>
              </CardHeader>
              <CardContent className="p-0 divide-y divide-slate-100 dark:divide-white/5">
                {players
                  .sort((a, b) => b.stats.points - a.stats.points)
                  .slice(0, 5)
                  .map((player, index) => (
                    <div key={player.id} className="flex items-center justify-between p-4 px-6 hover:bg-slate-50 dark:hover:bg-white/5 transition-all duration-200">
                      <div className="flex items-center space-x-4">
                        <div className={`h-7 w-7 rounded-lg flex items-center justify-center font-bold text-xs text-slate-900 dark:text-slate-955 shadow-inner ${
                          index === 0 
                            ? 'bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 text-slate-900 dark:text-slate-955 shadow-amber-400/50' 
                            : index === 1 
                            ? 'bg-gradient-to-br from-slate-200 to-slate-400 text-slate-900 dark:text-slate-955 shadow-slate-300/40' 
                            : index === 2 
                            ? 'bg-gradient-to-br from-amber-700 to-amber-900 text-white shadow-amber-800/40' 
                            : 'bg-slate-250 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base">{player.name}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{player.currentTeam}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-sm text-primary">{player.stats.points} pts</p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">{player.stats.wins}W - {player.stats.losses}L</p>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Players Management Tab Content */}
          <TabsContent value="players" className="space-y-6 outline-none">
            <Card className="bg-white dark:bg-slate-950/45 backdrop-blur-md border border-slate-200 dark:border-white/5 rounded-2xl shadow-xl overflow-hidden">
              <CardHeader className="border-b border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-slate-950/45">
                <CardTitle className="text-lg font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                  <PlusCircle className="h-5 w-5 text-primary" /> Register Gamer
                </CardTitle>
                <CardDescription className="text-slate-500 dark:text-slate-400">Add a new competitor into the Kawerify Tech tournament registry.</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={onAddPlayer} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div className="space-y-1.5">
                      <Label htmlFor="reg-name" className="text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider">Player Name *</Label>
                      <Input
                        id="reg-name"
                        value={newPlayer.name}
                        onChange={(e) => setNewPlayer({...newPlayer, name: e.target.value})}
                        placeholder="e.g. Tonde 'T-Rex' Kawere"
                        className="rounded-xl border-slate-250 dark:border-white/10 bg-slate-50 dark:bg-slate-955/40 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus-visible:ring-primary focus-visible:border-primary"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="reg-team" className="text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider">Represented FIFA Team *</Label>
                      <Input
                        id="reg-team"
                        value={newPlayer.currentTeam}
                        onChange={(e) => setNewPlayer({...newPlayer, currentTeam: e.target.value})}
                        placeholder="e.g. Real Madrid"
                        className="rounded-xl border-slate-250 dark:border-white/10 bg-slate-50 dark:bg-slate-950/40 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus-visible:ring-primary focus-visible:border-primary"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="reg-img" className="text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider">Profile Image URL</Label>
                      <Input
                        id="reg-img"
                        value={newPlayer.image}
                        onChange={(e) => setNewPlayer({...newPlayer, image: e.target.value})}
                        placeholder="Optional URL link"
                        className="rounded-xl border-slate-250 dark:border-white/10 bg-slate-50 dark:bg-slate-955/40 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus-visible:ring-primary focus-visible:border-primary"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider">Playstyle</Label>
                      <Select value={newPlayer.playstyle} onValueChange={(value) => setNewPlayer({...newPlayer, playstyle: value})}>
                        <SelectTrigger className="rounded-xl border-slate-250 dark:border-white/10 bg-slate-50 dark:bg-slate-950/40 text-slate-900 dark:text-slate-205">
                          <SelectValue placeholder="Select Playstyle" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 text-slate-900 dark:text-slate-200">
                          <SelectItem value="Tiki-Taka Master" className="focus:bg-slate-100 focus:text-slate-900 dark:focus:bg-slate-800 dark:focus:text-white">Tiki-Taka Master</SelectItem>
                          <SelectItem value="Counter-Attack Speedster" className="focus:bg-slate-100 focus:text-slate-900 dark:focus:bg-slate-800 dark:focus:text-white">Counter-Attack Speedster</SelectItem>
                          <SelectItem value="Park-The-Bus Defender" className="focus:bg-slate-100 focus:text-slate-900 dark:focus:bg-slate-800 dark:focus:text-white">Park-The-Bus Defender</SelectItem>
                          <SelectItem value="Skill-Move Spammer" className="focus:bg-slate-100 focus:text-slate-900 dark:focus:bg-slate-800 dark:focus:text-white">Skill-Move Spammer</SelectItem>
                          <SelectItem value="Cross-and-Header Specialist" className="focus:bg-slate-100 focus:text-slate-900 dark:focus:bg-slate-800 dark:focus:text-white">Cross-and-Header Specialist</SelectItem>
                          <SelectItem value="Standard Controller Masher" className="focus:bg-slate-100 focus:text-slate-900 dark:focus:bg-slate-800 dark:focus:text-white">Standard Controller Masher</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5 md:col-span-2">
                      <Label htmlFor="reg-excuse" className="text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider">Excuse of Choice</Label>
                      <Input
                        id="reg-excuse"
                        value={newPlayer.excuse}
                        onChange={(e) => setNewPlayer({...newPlayer, excuse: e.target.value})}
                        placeholder="e.g. 'Drifting stick' or 'My buttons got stuck'"
                        className="rounded-xl border-slate-250 dark:border-white/10 bg-slate-50 dark:bg-slate-950/40 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus-visible:ring-primary focus-visible:border-primary"
                      />
                    </div>
                  </div>
                  <Button type="submit" className="rounded-xl font-bold bg-gradient-to-r from-primary to-emerald-600 text-white hover:opacity-95 shadow-md shadow-primary/20 transition-all hover:scale-105 duration-200">
                    Register Gamer
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Registered Players list cards */}
            <Card className="bg-white dark:bg-slate-955/45 backdrop-blur-md border border-slate-200 dark:border-white/5 rounded-2xl shadow-xl overflow-hidden">
              <CardHeader className="border-b border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-slate-950/45">
                <CardTitle className="text-lg font-black uppercase tracking-wider text-slate-900 dark:text-white">Registered Competitors ({players.length})</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {players.map((player) => (
                    <Card key={player.id} className="bg-slate-50 dark:bg-slate-955/40 border border-slate-200 dark:border-white/5 rounded-xl hover:-translate-y-1 hover:border-primary/30 transition-all duration-300 relative overflow-hidden shadow-sm dark:shadow-none">
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="font-extrabold text-slate-900 dark:text-white truncate pr-2">{player.name}</h3>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingPlayer(player)}
                            className="rounded-xl font-bold text-xs border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/5 text-slate-550 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-transparent"
                          >
                            <Edit3 className="h-3 w-3 mr-1" /> Edit
                          </Button>
                        </div>
                        <p className="text-xs text-primary font-bold">{player.currentTeam}</p>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 space-y-0.5 mt-1 border-t border-slate-200 dark:border-white/5 pt-1">
                          <p>Style: <span className="text-slate-800 dark:text-slate-200">{player.playstyle || "Standard Controller Masher"}</span></p>
                          <p>Excuse: <span className="text-slate-700 dark:text-slate-300 italic">"{player.excuse || "Drifting stick"}"</span></p>
                        </div>
                        <div className="flex justify-between items-center text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 pt-2.5 border-t border-slate-200 dark:border-white/5">
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
          <TabsContent value="fixtures" className="space-y-6 outline-none">
            <Card className="bg-white dark:bg-slate-950/45 backdrop-blur-md border border-slate-200 dark:border-white/5 rounded-2xl shadow-xl overflow-hidden">
              <CardHeader className="border-b border-slate-100 dark:border-white/10 bg-slate-50 dark:bg-slate-955/45">
                <CardTitle className="text-lg font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" /> Schedule Custom Match
                </CardTitle>
                <CardDescription className="text-slate-500 dark:text-slate-400">Manually configure and add a matchday fixture to the calendar.</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={onAddMatch} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <Label className="text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider">Competitor 1 (Player 1)</Label>
                      <Select value={newMatch.player1Id} onValueChange={(value) => {
                        setNewMatch({...newMatch, player1Id: value});
                      }}>
                        <SelectTrigger className="rounded-xl border-slate-250 dark:border-white/10 bg-slate-50 dark:bg-slate-950/40 text-slate-900 dark:text-slate-200">
                          <SelectValue placeholder="Select Competitor 1" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 text-slate-900 dark:text-slate-200">
                          {players.map((player) => (
                            <SelectItem key={player.id} value={player.id} className="focus:bg-slate-100 focus:text-slate-900 dark:focus:bg-slate-800 dark:focus:text-white">
                              {player.name} ({player.currentTeam})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider">Competitor 2 (Player 2)</Label>
                      <Select value={newMatch.player2Id} onValueChange={(value) => {
                        setNewMatch({...newMatch, player2Id: value});
                      }}>
                        <SelectTrigger className="rounded-xl border-slate-250 dark:border-white/10 bg-slate-50 dark:bg-slate-950/40 text-slate-900 dark:text-slate-200">
                          <SelectValue placeholder="Select Competitor 2" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 text-slate-900 dark:text-slate-200">
                          {players.map((player) => (
                            <SelectItem key={player.id} value={player.id} className="focus:bg-slate-100 focus:text-slate-900 dark:focus:bg-slate-800 dark:focus:text-white">
                              {player.name} ({player.currentTeam})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="match-date" className="text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider">Match Date</Label>
                      <Input
                        id="match-date"
                        type="date"
                        value={newMatch.date}
                        onChange={(e) => setNewMatch({...newMatch, date: e.target.value})}
                        className="rounded-xl border-slate-250 dark:border-white/10 bg-slate-50 dark:bg-slate-950/40 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus-visible:ring-primary focus-visible:border-primary"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="match-time" className="text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider">Kick-Off Time</Label>
                      <Input
                        id="match-time"
                        type="time"
                        value={newMatch.time}
                        onChange={(e) => setNewMatch({...newMatch, time: e.target.value})}
                        className="rounded-xl border-slate-250 dark:border-white/10 bg-slate-50 dark:bg-slate-950/40 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus-visible:ring-primary focus-visible:border-primary"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider">Stage / Match Type</Label>
                      <Select value={newMatch.matchType} onValueChange={(value: Match['matchType']) => setNewMatch({...newMatch, matchType: value})}>
                        <SelectTrigger className="rounded-xl border-slate-250 dark:border-white/10 bg-slate-50 dark:bg-slate-950/40 text-slate-900 dark:text-slate-200">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10 text-slate-900 dark:text-slate-200">
                          <SelectItem value="regular" className="focus:bg-slate-100 focus:text-slate-900 dark:focus:bg-slate-800 dark:focus:text-white">Regular Season</SelectItem>
                          <SelectItem value="quarter-final" className="focus:bg-slate-100 focus:text-slate-900 dark:focus:bg-slate-800 dark:focus:text-white">Quarter Final</SelectItem>
                          <SelectItem value="semi-final" className="focus:bg-slate-100 focus:text-slate-900 dark:focus:bg-slate-800 dark:focus:text-white">Semi Final</SelectItem>
                          <SelectItem value="final" className="focus:bg-slate-100 focus:text-slate-900 dark:focus:bg-slate-800 dark:focus:text-white">Final Match</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="match-week" className="text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider">Week Number</Label>
                      <Input
                        id="match-week"
                        type="number"
                        min="1"
                        max="20"
                        value={newMatch.week}
                        onChange={(e) => setNewMatch({...newMatch, week: parseInt(e.target.value)})}
                        className="rounded-xl border-slate-250 dark:border-white/10 bg-slate-50 dark:bg-slate-955/40 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus-visible:ring-primary focus-visible:border-primary"
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="rounded-xl font-bold bg-gradient-to-r from-primary to-emerald-600 text-white hover:opacity-95 shadow-md shadow-primary/20 transition-all hover:scale-105 duration-200">
                    Publish Fixture
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* scoring Results Tab Content */}
          <TabsContent value="results" className="space-y-6 outline-none">
            <Card className="bg-slate-900/60 dark:bg-slate-950/45 backdrop-blur-md border border-white/10 dark:border-white/5 rounded-2xl shadow-xl overflow-hidden">
              <CardHeader className="border-b border-white/10 bg-slate-950/45">
                <CardTitle className="text-lg font-black uppercase tracking-wider text-white flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" /> Scoreboard Scorer Manager
                </CardTitle>
                <CardDescription className="text-slate-400">Input and finalize matchday scores for scheduled games.</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {matches.filter(match => match.status === 'scheduled').length === 0 ? (
                    <div className="text-center py-12 text-slate-500 text-sm font-semibold flex flex-col items-center justify-center gap-2">
                      <ShieldAlert className="h-8 w-8 text-slate-600" />
                      No scheduled matches pending scoring inputs.
                    </div>
                  ) : (
                    matches
                      .filter(match => match.status === 'scheduled')
                      .map((match) => {
                        const player1 = players.find(p => p.id === match.player1Id);
                        const player2 = players.find(p => p.id === match.player2Id);
                        const scores = matchScores[match.id] || { p1: 0, p2: 0 };
                        
                        return (
                          <div key={match.id} className="p-6 bg-slate-950/45 rounded-2xl border border-white/5 space-y-4 hover:border-white/10 transition-all duration-300">
                            <div className="flex items-center justify-between text-xs font-bold text-slate-400 border-b border-white/5 pb-3">
                              <span className="flex items-center gap-1.5">
                                <Clock className="h-3.5 w-3.5 text-primary" />
                                {match.round} • {new Date(match.date).toLocaleDateString()} at {match.time}
                              </span>
                              <Badge className="bg-slate-900 border border-white/10 text-slate-300 uppercase text-[9px] font-black">{match.matchType}</Badge>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-7 items-center justify-between gap-4 py-2">
                              {/* Player 1 */}
                              <div className="md:col-span-3 text-center md:text-right space-y-2">
                                <p className="font-black text-white text-base sm:text-lg">{player1?.name}</p>
                                <p className="text-xs text-primary font-bold uppercase tracking-wider">{match.player1Team}</p>
                              </div>
                              
                              {/* Input Player 1 */}
                              <div className="md:col-span-1 flex justify-center">
                                <Input
                                  type="number"
                                  min="0"
                                  className="w-20 text-center rounded-xl font-black text-xl border-white/10 bg-slate-900 text-emerald-400 focus-visible:ring-primary focus-visible:border-primary h-12"
                                  value={scores.p1}
                                  onChange={(e) => setMatchScores({
                                    ...matchScores,
                                    [match.id]: { ...scores, p1: parseInt(e.target.value) || 0 }
                                  })}
                                />
                              </div>
                              
                              {/* VS badge */}
                              <div className="md:col-span-1 text-center font-black text-slate-500 text-xs tracking-widest uppercase">
                                VS
                              </div>
                              
                              {/* Input Player 2 */}
                              <div className="md:col-span-1 flex justify-center">
                                <Input
                                  type="number"
                                  min="0"
                                  className="w-20 text-center rounded-xl font-black text-xl border-white/10 bg-slate-900 text-emerald-400 focus-visible:ring-primary focus-visible:border-primary h-12"
                                  value={scores.p2}
                                  onChange={(e) => setMatchScores({
                                    ...matchScores,
                                    [match.id]: { ...scores, p2: parseInt(e.target.value) || 0 }
                                  })}
                                />
                              </div>
                              
                              {/* Player 2 */}
                              <div className="md:col-span-3 text-center md:text-left space-y-2">
                                <p className="font-black text-white text-base sm:text-lg">{player2?.name}</p>
                                <p className="text-xs text-primary font-bold uppercase tracking-wider">{match.player2Team}</p>
                              </div>
                            </div>
                            
                            <div className="pt-3 border-t border-white/5 text-center">
                              <Button
                                onClick={() => onCompleteMatch(match.id, scores.p1, scores.p2)}
                                className="rounded-xl font-black text-xs bg-gradient-to-r from-primary to-emerald-600 text-white hover:opacity-95 shadow-md shadow-primary/20 hover:scale-105 transition-all duration-200"
                              >
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
          <TabsContent value="settings" className="space-y-6 outline-none">
            <Card className="bg-slate-900/60 dark:bg-slate-950/45 backdrop-blur-md border border-white/10 dark:border-white/5 rounded-2xl shadow-xl overflow-hidden">
              <CardHeader className="border-b border-white/10 bg-slate-950/45">
                <CardTitle className="text-lg font-black uppercase tracking-wider text-white flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" /> Tournament Configurations
                </CardTitle>
                <CardDescription className="text-slate-400">View diagnostic settings and operational parameters for this season.</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-sm">
                  <div className="space-y-1.5">
                    <Label className="text-xs text-slate-400 font-bold uppercase tracking-wider">Tournament Title</Label>
                    <Input value={tournament.name} readOnly className="rounded-xl bg-slate-950/40 border-white/5 text-slate-300 focus-visible:ring-0" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-slate-400 font-bold uppercase tracking-wider">Season Number</Label>
                    <Input value={tournament.season} readOnly className="rounded-xl bg-slate-950/40 border-white/5 text-slate-300 focus-visible:ring-0" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-slate-400 font-bold uppercase tracking-wider">Current Game Week</Label>
                    <Input value={tournament.currentWeek} readOnly className="rounded-xl bg-slate-950/40 border-white/5 text-slate-300 focus-visible:ring-0" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-slate-400 font-bold uppercase tracking-wider">Current Stage Name</Label>
                    <Input value={tournament.currentRound} readOnly className="rounded-xl bg-slate-950/40 border-white/5 text-slate-300 focus-visible:ring-0" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-slate-400 font-bold uppercase tracking-wider">Win Points Value</Label>
                    <Input value={tournament.settings.pointsPerWin} readOnly className="rounded-xl bg-slate-950/40 border-white/5 text-slate-300 focus-visible:ring-0" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-slate-400 font-bold uppercase tracking-wider">Draw Points Value</Label>
                    <Input value={tournament.settings.pointsPerDraw} readOnly className="rounded-xl bg-slate-950/40 border-white/5 text-slate-300 focus-visible:ring-0" />
                  </div>
                </div>
                
                <div className="pt-6 border-t border-white/5">
                  <h3 className="font-black text-sm text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
                    <Database className="h-4.5 w-4.5 text-primary" /> Operations Backup
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <Button onClick={onExportData} variant="outline" className="rounded-xl text-xs font-bold border-white/10 bg-slate-950/40 text-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-1.5 animate-pulse-glow">
                      <Download className="h-3.5 w-3.5" /> Backup Database (Export JSON)
                    </Button>
                    <Button variant="outline" className="rounded-xl text-xs font-bold border-white/10 bg-slate-950/40 text-slate-400 border-dashed hover:bg-slate-800 hover:text-white flex items-center gap-1.5 cursor-not-allowed" disabled>
                      <Upload className="h-3.5 w-3.5" /> Restore Database (Import JSON)
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

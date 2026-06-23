import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminDashboard from "@/components/AdminDashboard";
import { TournamentScheduler } from "@/lib/tournamentScheduler";
import { Lock } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  loadPlayers, 
  loadMatches, 
  loadTournament, 
  loadCups,
  addPlayer, 
  updatePlayer, 
  addMatch, 
  updateMatch, 
  Player,
  Match,
  Tournament,
  Cup
} from "@/lib/storage";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [players, setPlayers] = useState<Player[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [tournament, setTournament] = useState<Tournament>(loadTournament());
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);
  const [editingMatch, setEditingMatch] = useState<Match | null>(null);
  const { toast } = useToast();

  // New player form state
  const [newPlayer, setNewPlayer] = useState({
    name: "",
    currentTeam: "",
    image: "",
    playstyle: "",
    excuse: ""
  });

  // New match form state
  const [newMatch, setNewMatch] = useState({
    player1Id: "",
    player2Id: "",
    date: "",
    time: "",
    matchType: "regular" as const,
    round: "",
    week: 1
  });

  // Helper functions
  const refreshData = () => {
    setPlayers(loadPlayers());
    setMatches(loadMatches());
    setTournament(loadTournament());
  };

  useEffect(() => {
    if (isAuthenticated) {
      refreshData();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "kawerifytech" && password === "mrsoccer") {
      setIsAuthenticated(true);
      toast({
        title: "Login Successful",
        description: "Welcome to the admin control room",
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials",
        variant: "destructive",
      });
    }
  };

  const handleAddPlayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlayer.name || !newPlayer.currentTeam) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const player = addPlayer({
      name: newPlayer.name,
      currentTeam: newPlayer.currentTeam,
      teamHistory: [
        { 
          team: newPlayer.currentTeam, 
          startDate: new Date().toISOString(),
          achievements: []
        }
      ],
      media: [],
      image: newPlayer.image,
      playstyle: newPlayer.playstyle || "Standard Controller Masher",
      excuse: newPlayer.excuse || "Drifting analog stick",
      stats: {
        matchesPlayed: 0,
        wins: 0,
        losses: 0,
        draws: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDifference: 0,
        points: 0,
        cupsWon: 0
      }
    });

    setNewPlayer({ name: "", currentTeam: "", image: "", playstyle: "", excuse: "" });
    refreshData();
    
    toast({
      title: "Player Added",
      description: `${player.name} has been added to the tournament`,
    });
  };

  const handleUpdatePlayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPlayer) return;

    updatePlayer(editingPlayer.id, editingPlayer);
    setEditingPlayer(null);
    refreshData();
    
    toast({
      title: "Player Updated",
      description: "Player information has been updated",
    });
  };

  const handleAddMatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMatch.player1Id || !newMatch.player2Id || !newMatch.date) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (newMatch.player1Id === newMatch.player2Id) {
      toast({
        title: "Error",
        description: "A player cannot play against themselves",
        variant: "destructive",
      });
      return;
    }

    const player1 = players.find(p => p.id === newMatch.player1Id);
    const player2 = players.find(p => p.id === newMatch.player2Id);

    addMatch({
      player1Id: newMatch.player1Id,
      player2Id: newMatch.player2Id,
      player1Team: player1?.currentTeam || "",
      player2Team: player2?.currentTeam || "",
      player1Score: 0,
      player2Score: 0,
      date: newMatch.date,
      time: newMatch.time,
      status: "scheduled",
      matchType: newMatch.matchType,
      round: newMatch.round || tournament.currentRound,
      week: newMatch.week || tournament.currentWeek
    });

    setNewMatch({
      player1Id: "",
      player2Id: "",
      date: "",
      time: "",
      matchType: "regular",
      round: "",
      week: 1
    });
    
    refreshData();
    
    toast({
      title: "Match Scheduled",
      description: `Match between ${player1?.name} and ${player2?.name} has been scheduled`,
    });
  };

  const handleUpdateMatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMatch) return;
    updateMatch(editingMatch.id, editingMatch);
    setEditingMatch(null);
    refreshData();
    toast({
      title: "Match Updated",
      description: "Match details have been updated",
    });
  };

  const handleCompleteMatch = (matchId: string, p1: number, p2: number) => {
    updateMatch(matchId, { status: 'completed', player1Score: p1, player2Score: p2 });
    refreshData();
    toast({
      title: "Match Completed",
      description: "Match result saved and standing points updated",
    });
  };

  const handleAutoSchedule = () => {
    try {
      const scheduler = new TournamentScheduler();
      scheduler.autoScheduleTournament();
      refreshData();
      toast({
        title: "Auto-Scheduled",
        description: "Tournament matchups auto-generated successfully",
      });
    } catch (error) {
      toast({
        title: "Scheduling Failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive"
      });
    }
  };

  const handleExportData = () => {
    const data = {
      players: loadPlayers(),
      matches: loadMatches(),
      tournament: loadTournament(),
      cups: loadCups()
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `kawerify_soccer_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    toast({
      title: "Backup Complete",
      description: "Database export JSON downloaded successfully",
    });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
    toast({
      title: "Logged Out",
      description: "You have been logged out of the control room",
    });
  };

  if (!isAuthenticated) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#070b13] bg-stadium-grid px-4 relative overflow-hidden transition-colors duration-300 text-slate-900 dark:text-white">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
          
          <Card className="w-full max-w-md bg-white dark:bg-slate-950/45 backdrop-blur-md border border-slate-200 dark:border-white/5 shadow-2xl relative z-10 rounded-2xl text-slate-900 dark:text-white">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center justify-center gap-2">
                <Lock className="h-5 w-5 text-primary animate-pulse" /> Control Room
              </CardTitle>
              <CardDescription className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mt-1">
                Kawerify Tech Cup Live Admin Panel
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="username" className="text-slate-700 dark:text-slate-300">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    placeholder="Enter admin username"
                    className="rounded-xl border-slate-250 dark:border-white/10 bg-slate-50 dark:bg-slate-955/40 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="password" className="text-slate-700 dark:text-slate-300">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="rounded-xl border-slate-250 dark:border-white/10 bg-slate-50 dark:bg-slate-955/40 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
                  />
                </div>
                <Button type="submit" className="w-full rounded-xl font-bold bg-gradient-to-r from-primary to-emerald-600 hover:opacity-95 text-white shadow-lg shadow-primary/20">
                  Authenticate
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <AdminDashboard
        players={players}
        matches={matches}
        tournament={tournament}
        newPlayer={newPlayer}
        setNewPlayer={setNewPlayer}
        newMatch={newMatch}
        setNewMatch={setNewMatch}
        editingPlayer={editingPlayer}
        setEditingPlayer={setEditingPlayer}
        editingMatch={editingMatch}
        setEditingMatch={setEditingMatch}
        onAddPlayer={handleAddPlayer}
        onUpdatePlayer={handleUpdatePlayer}
        onAddMatch={handleAddMatch}
        onUpdateMatch={handleUpdateMatch}
        onCompleteMatch={handleCompleteMatch}
        onAutoSchedule={handleAutoSchedule}
        onExportData={handleExportData}
        onLogout={handleLogout}
      />
      
      {/* Edit Player Modal */}
      {editingPlayer && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-md flex items-center justify-center z-50">
          <Card className="w-full max-w-md bg-white dark:bg-slate-950/90 backdrop-blur-md border border-slate-200 dark:border-white/5 shadow-2xl relative z-10 rounded-2xl mx-4 text-slate-900 dark:text-white">
            <CardHeader className="border-b border-slate-100 dark:border-white/5 pb-4">
              <CardTitle className="text-lg font-black uppercase tracking-wider text-slate-900 dark:text-white">
                Edit Player Information
              </CardTitle>
              <CardDescription className="text-slate-500 dark:text-slate-400 text-xs">Modify name or team assignment.</CardDescription>
            </CardHeader>
            <CardContent className="pt-5">
              <form onSubmit={handleUpdatePlayer} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="editName" className="text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider">Player Name</Label>
                  <Input
                    id="editName"
                    value={editingPlayer.name}
                    onChange={(e) => setEditingPlayer({...editingPlayer, name: e.target.value})}
                    required
                    className="rounded-xl border-slate-250 dark:border-white/10 bg-slate-50 dark:bg-slate-950/40 text-slate-900 dark:text-slate-100 focus-visible:ring-primary focus-visible:border-primary"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="editTeam" className="text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider">Current Team</Label>
                  <Input
                    id="editTeam"
                    value={editingPlayer.currentTeam}
                    onChange={(e) => setEditingPlayer({...editingPlayer, currentTeam: e.target.value})}
                    required
                    className="rounded-xl border-slate-250 dark:border-white/10 bg-slate-50 dark:bg-slate-955/40 text-slate-900 dark:text-slate-100 focus-visible:ring-primary focus-visible:border-primary"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="editPlaystyle" className="text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider">Playstyle</Label>
                  <Select value={editingPlayer.playstyle || ""} onValueChange={(value) => setEditingPlayer({...editingPlayer, playstyle: value})}>
                    <SelectTrigger className="rounded-xl border-slate-250 dark:border-white/10 bg-slate-50 dark:bg-slate-955/40 text-slate-900 dark:text-slate-200">
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
                <div className="space-y-1.5">
                  <Label htmlFor="editExcuse" className="text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider">Excuse of Choice</Label>
                  <Input
                    id="editExcuse"
                    value={editingPlayer.excuse || ""}
                    onChange={(e) => setEditingPlayer({...editingPlayer, excuse: e.target.value})}
                    placeholder="e.g. Drifting analog stick"
                    className="rounded-xl border-slate-250 dark:border-white/10 bg-slate-50 dark:bg-slate-955/40 text-slate-900 dark:text-slate-100 focus-visible:ring-primary focus-visible:border-primary"
                  />
                </div>
                <div className="flex space-x-3 pt-3 border-t border-slate-100 dark:border-white/5">
                  <Button type="submit" className="flex-1 rounded-xl font-bold bg-gradient-to-r from-primary to-emerald-600 text-white hover:opacity-95 shadow-md shadow-primary/20 transition-all hover:scale-[1.02] duration-200">
                    Save Changes
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setEditingPlayer(null)}
                    className="flex-1 rounded-xl font-bold border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-955/30 text-slate-650 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Admin;

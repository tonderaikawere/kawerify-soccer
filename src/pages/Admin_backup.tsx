import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  loadPlayers, 
  loadMatches, 
  loadTournament, 
  loadCups,
  addPlayer, 
  updatePlayer, 
  deletePlayer,
  addMatch, 
  updateMatch, 
  deleteMatch,
  updateTournamentSettings,
  clearAllData,
  clearAllPlayers,
  clearAllMatches,
  clearAllCups,
  Player,
  Match,
  Tournament
} from "@/lib/storage";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [players, setPlayers] = useState([]);
  const [matches, setMatches] = useState<Match[]>([]);
  const [tournament, setTournament] = useState<Tournament>(loadTournament());
  const [cups, setCups] = useState<any[]>([]);
  const [editingPlayer, setEditingPlayer] = useState(null);
  const { toast } = useToast();

  // New player form state
  const [newPlayer, setNewPlayer] = useState({
    name: "",
    currentTeam: "",
    image: ""
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
    setCups(loadCups());
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
        description: "Welcome to the admin dashboard",
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

    setNewPlayer({ name: "", currentTeam: "", image: "" });
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

    const match = addMatch({
      player1Id: newMatch.player1Id,
      player2Id: newMatch.player2Id,
      player1Team: player1?.currentTeam || "",
      player2Team: player2?.currentTeam || "",
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

  if (!isAuthenticated) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center">
                
                Admin Login
              </CardTitle>
              <CardDescription>
                Enter your credentials to access the admin dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Login
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
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg shadow-lg mb-8">
            <h1 className="text-3xl font-bold mb-2 flex items-center">
              
              🔥 Admin Control Center
            </h1>
            <p className="text-blue-100">Complete tournament management system</p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
              <h3 className="font-semibold text-gray-700">Players</h3>
              <p className="text-3xl font-bold text-blue-600">{players.length}</p>
              <Button 
                onClick={() => {
                  if (confirm('Delete all players?')) {
                    clearAllPlayers();
                    refreshData();
                    toast({ title: "Players Cleared", description: "All players deleted" });
                  }
                }}
                size="sm" 
                variant="outline" 
                className="mt-2 text-red-600 border-red-600"
              >
                Clear All
              </Button>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
              <h3 className="font-semibold text-gray-700">Matches</h3>
              <p className="text-3xl font-bold text-green-600">{matches.length}</p>
              <Button 
                onClick={() => {
                  if (confirm('Delete all matches?')) {
                    clearAllMatches();
                    refreshData();
                    toast({ title: "Matches Cleared", description: "All matches deleted" });
                  }
                }}
                size="sm" 
                variant="outline" 
                className="mt-2 text-red-600 border-red-600"
              >
                Clear All
              </Button>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border-l-4 border-purple-500">
              <h3 className="font-semibold text-gray-700">Tournament</h3>
              <p className="text-lg font-bold text-purple-600">{tournament.name}</p>
              <p className="text-sm text-gray-500">Week {tournament.currentWeek}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow border-l-4 border-yellow-500">
              <h3 className="font-semibold text-gray-700">Cups</h3>
              <p className="text-3xl font-bold text-yellow-600">{cups.length}</p>
              <Button 
                onClick={() => {
                  if (confirm('Delete all cups?')) {
                    clearAllCups();
                    refreshData();
                    toast({ title: "Cups Cleared", description: "All cups deleted" });
                  }
                }}
                size="sm" 
                variant="outline" 
                className="mt-2 text-red-600 border-red-600"
              >
                Clear All
              </Button>
            </div>
          </div>

          {/* Tabs for different sections */}
          <Tabs defaultValue="players" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="players">👥 Players</TabsTrigger>
              <TabsTrigger value="matches">⚽ Matches</TabsTrigger>
              <TabsTrigger value="tournament">🏆 Tournament</TabsTrigger>
              <TabsTrigger value="settings">⚙️ Settings</TabsTrigger>
            </TabsList>

            {/* Players Management */}
            <TabsContent value="players" className="space-y-6">
              {/* Add Player Form */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  
                  Add New Player
                </h2>
                <form onSubmit={handleAddPlayer} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="playerName">Player Name</Label>
                    <Input
                      id="playerName"
                      value={newPlayer.name}
                      onChange={(e) => setNewPlayer({...newPlayer, name: e.target.value})}
                      placeholder="Enter player name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="playerTeam">Current Team</Label>
                    <Input
                      id="playerTeam"
                      value={newPlayer.currentTeam}
                      onChange={(e) => setNewPlayer({...newPlayer, currentTeam: e.target.value})}
                      placeholder="Enter team name"
                      required
                    />
                  </div>
                  <div className="flex items-end">
                    <Button type="submit" className="w-full">
                      Add Player
                    </Button>
                  </div>
                </form>
              </div>

              {/* Players List */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">All Players ({players.length})</h2>
                {players.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    
                    <p>No players yet. Add your first player above!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {players.map((player) => (
                      <div key={player.id} className="flex justify-between items-center p-4 border rounded-lg">
                        <div className="flex-1">
                          <h3 className="font-semibold">{player.name}</h3>
                          <p className="text-sm text-gray-600">{player.currentTeam}</p>
                          <div className="text-xs text-gray-500 mt-1">
                            {player.stats.matchesPlayed} matches • {player.stats.wins}W {player.stats.losses}L {player.stats.draws}D • {player.stats.points} pts
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingPlayer(player)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 border-red-600 hover:bg-red-50"
                            onClick={() => {
                              if (confirm(`Delete ${player.name}?`)) {
                                deletePlayer(player.id);
                                refreshData();
                                toast({ title: "Player Deleted", description: `${player.name} removed` });
                              }
                            }}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Matches Management */}
            <TabsContent value="matches" className="space-y-6">
              {/* Add Match Form */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  
                  Schedule New Match
                </h2>
                <form onSubmit={handleAddMatch} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="player1">Player 1</Label>
                    <Select value={newMatch.player1Id} onValueChange={(value) => setNewMatch({...newMatch, player1Id: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select player 1" />
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
                  <div>
                    <Label htmlFor="player2">Player 2</Label>
                    <Select value={newMatch.player2Id} onValueChange={(value) => setNewMatch({...newMatch, player2Id: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select player 2" />
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
                  <div>
                    <Label htmlFor="matchDate">Date</Label>
                    <Input
                      id="matchDate"
                      type="date"
                      value={newMatch.date}
                      onChange={(e) => setNewMatch({...newMatch, date: e.target.value})}
                      required
                    />
                  </div>
                  <div className="flex items-end">
                    <Button type="submit" className="w-full">
                      Schedule Match
                    </Button>
                  </div>
                </form>
              </div>

              {/* Matches List */}
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4">All Matches ({matches.length})</h2>
                {matches.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    
                    <p>No matches scheduled. Add your first match above!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {matches.map((match) => {
                      const player1 = players.find(p => p.id === match.player1Id);
                      const player2 = players.find(p => p.id === match.player2Id);
                      return (
                        <div key={match.id} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-center">
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-semibold">
                                  {player1?.name || 'Unknown'} vs {player2?.name || 'Unknown'}
                                </span>
                                <Badge variant={match.status === 'completed' ? 'default' : 'secondary'}>
                                  {match.status}
                                </Badge>
                              </div>
                              <div className="text-sm text-gray-600">
                                {match.date} • {match.round} • {match.matchType}
                              </div>
                              {match.status === 'completed' && (
                                <div className="text-lg font-bold mt-2">
                                  {match.player1Score} - {match.player2Score}
                                </div>
                              )}
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 border-red-600 hover:bg-red-50"
                              onClick={() => {
                                if (confirm('Delete this match?')) {
                                  deleteMatch(match.id);
                                  refreshData();
                                  toast({ title: "Match Deleted", description: "Match removed" });
                                }
                              }}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Tournament Management */}
            <TabsContent value="tournament" className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  
                  Tournament Settings
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Tournament Name</Label>
                    <Input 
                      value={tournament.name} 
                      onChange={(e) => updateTournamentSettings({ name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Season</Label>
                    <Input 
                      value={tournament.season} 
                      onChange={(e) => updateTournamentSettings({ season: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Current Week</Label>
                    <Input 
                      type="number" 
                      value={tournament.currentWeek} 
                      onChange={(e) => updateTournamentSettings({ currentWeek: parseInt(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label>Current Round</Label>
                    <Input 
                      value={tournament.currentRound} 
                      onChange={(e) => updateTournamentSettings({ currentRound: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Settings */}
            <TabsContent value="settings" className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  
                  Danger Zone
                </h2>
                <div className="space-y-4">
                  <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                    <h3 className="font-semibold text-red-800 mb-2">⚠️ Reset Everything</h3>
                    <p className="text-red-700 mb-4">This will permanently delete all players, matches, and cups. This action cannot be undone.</p>
                    <Button 
                      onClick={() => {
                        if (confirm('⚠️ FINAL WARNING: Delete ALL data permanently?')) {
                          clearAllData();
                          refreshData();
                          toast({ 
                            title: "🔥 EVERYTHING DELETED", 
                            description: "All data cleared. Starting fresh from 0!",
                            variant: "destructive"
                          });
                        }
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      🗑️ DELETE EVERYTHING
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Edit Player Modal */}
      {editingPlayer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Edit Player</h3>
            <form onSubmit={handleUpdatePlayer} className="space-y-4">
              <div>
                <Label htmlFor="editName">Player Name</Label>
                <Input
                  id="editName"
                  value={editingPlayer.name}
                  onChange={(e) => setEditingPlayer({...editingPlayer, name: e.target.value})}
                  required
                />
              </div>
              <div>
                <Label htmlFor="editTeam">Current Team</Label>
                <Input
                  id="editTeam"
                  value={editingPlayer.currentTeam}
                  onChange={(e) => setEditingPlayer({...editingPlayer, currentTeam: e.target.value})}
                  required
                />
              </div>
              <div className="flex space-x-2">
                <Button type="submit" className="flex-1">
                  Save Changes
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setEditingPlayer(null)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Admin;

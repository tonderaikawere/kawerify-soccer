import { useState } from "react";
import { Settings, UserPlus, Calendar, BarChart, Trophy, Users, Edit, Trash2, Plus, Save, Upload, Download } from "lucide-react";
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

  // Debug logging
  console.log('AdminDashboard rendering with:', { 
    playersCount: players.length, 
    matchesCount: matches.length, 
    tournament: tournament.name 
  });

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* FIFA-style Header */}
          <div className="mb-8 relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 p-8 text-white">
            <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-10"></div>
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold mb-2">FIFA Tournament Control Center</h1>
                <p className="text-xl opacity-90">Kawerify Tech World Cup Management</p>
                <Badge className="mt-2 bg-yellow-500 text-black font-bold">
                  Season {tournament.season} • Week {tournament.currentWeek}
                </Badge>
              </div>
              <div className="flex items-center space-x-4">
                <Button onClick={onAutoSchedule} className="bg-green-500 hover:bg-green-600 text-white font-bold animate-pulse">
                  <Calendar className="h-4 w-4 mr-2" />
                  Auto Schedule
                </Button>
                <Button onClick={onExportData} variant="secondary" className="bg-white/20 hover:bg-white/30">
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
                <Button onClick={onLogout} variant="outline" className="bg-white/20 hover:bg-white/30 border-white/30">
                  Logout
                </Button>
              </div>
            </div>
            <div className="absolute top-4 right-4 animate-spin">
              <div className="h-12 w-12 rounded-full bg-white border-4 border-black relative">
                <div className="absolute inset-2 rounded-full border-2 border-black"></div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 h-14 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
              <TabsTrigger value="overview" className="text-sm font-semibold">
                <BarChart className="h-4 w-4 mr-2" />Overview
              </TabsTrigger>
              <TabsTrigger value="players" className="text-sm font-semibold">
                <Users className="h-4 w-4 mr-2" />Players
              </TabsTrigger>
              <TabsTrigger value="fixtures" className="text-sm font-semibold">
                <Calendar className="h-4 w-4 mr-2" />Fixtures
              </TabsTrigger>
              <TabsTrigger value="results" className="text-sm font-semibold">
                <Trophy className="h-4 w-4 mr-2" />Results
              </TabsTrigger>
              <TabsTrigger value="settings" className="text-sm font-semibold">
                <Settings className="h-4 w-4 mr-2" />Settings
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100">Total Players</p>
                        <p className="text-3xl font-bold">{players.length}</p>
                      </div>
                      <Users className="h-12 w-12 text-blue-200" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100">Completed Matches</p>
                        <p className="text-3xl font-bold">{completedMatches}</p>
                      </div>
                      <Trophy className="h-12 w-12 text-green-200" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-yellow-100">Upcoming Matches</p>
                        <p className="text-3xl font-bold">{upcomingMatches}</p>
                      </div>
                      <Calendar className="h-12 w-12 text-yellow-200" />
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100">Current Round</p>
                        <p className="text-xl font-bold">{tournament.currentRound}</p>
                      </div>
                      <Settings className="h-12 w-12 text-purple-200" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Top Players */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
                    Top Performers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {players
                      .sort((a, b) => b.stats.points - a.stats.points)
                      .slice(0, 5)
                      .map((player, index) => (
                        <div key={player.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-white font-bold ${
                              index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-amber-600' : 'bg-blue-500'
                            }`}>
                              {index + 1}
                            </div>
                            <div>
                              <p className="font-semibold">{player.name}</p>
                              <p className="text-sm text-muted-foreground">{player.currentTeam}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg">{player.stats.points} pts</p>
                            <p className="text-sm text-muted-foreground">{player.stats.wins}W-{player.stats.losses}L</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Players Tab */}
            <TabsContent value="players" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <UserPlus className="h-5 w-5 mr-2" />
                    Add New Player
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={onAddPlayer} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="player-name">Player Name *</Label>
                        <Input
                          id="player-name"
                          value={newPlayer.name}
                          onChange={(e) => setNewPlayer({...newPlayer, name: e.target.value})}
                          placeholder="Enter player name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="player-team">Current Team *</Label>
                        <Input
                          id="player-team"
                          value={newPlayer.currentTeam}
                          onChange={(e) => setNewPlayer({...newPlayer, currentTeam: e.target.value})}
                          placeholder="Enter team name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="player-image">Profile Image URL</Label>
                        <Input
                          id="player-image"
                          value={newPlayer.image}
                          onChange={(e) => setNewPlayer({...newPlayer, image: e.target.value})}
                          placeholder="Image URL (optional)"
                        />
                      </div>
                    </div>
                    <Button type="submit" className="bg-gradient-to-r from-green-500 to-green-600">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Player
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Players List */}
              <Card>
                <CardHeader>
                  <CardTitle>Current Players ({players.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {players.map((player) => (
                      <div key={player.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{player.name}</h3>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingPlayer(player)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{player.currentTeam}</p>
                        <div className="flex justify-between text-xs">
                          <span>Points: {player.stats.points}</span>
                          <span>W: {player.stats.wins} L: {player.stats.losses}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Fixtures Tab */}
            <TabsContent value="fixtures" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Plus className="h-5 w-5 mr-2" />
                    Schedule New Match
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={onAddMatch} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Player 1</Label>
                        <Select value={newMatch.player1Id} onValueChange={(value) => {
                          const player = players.find(p => p.id === value);
                          setNewMatch({...newMatch, player1Id: value, player1Team: player?.currentTeam || ""});
                        }}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Player 1" />
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
                        <Label>Player 2</Label>
                        <Select value={newMatch.player2Id} onValueChange={(value) => {
                          const player = players.find(p => p.id === value);
                          setNewMatch({...newMatch, player2Id: value, player2Team: player?.currentTeam || ""});
                        }}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Player 2" />
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
                        <Label>Date</Label>
                        <Input
                          type="date"
                          value={newMatch.date}
                          onChange={(e) => setNewMatch({...newMatch, date: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label>Time</Label>
                        <Input
                          type="time"
                          value={newMatch.time}
                          onChange={(e) => setNewMatch({...newMatch, time: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label>Match Type</Label>
                        <Select value={newMatch.matchType} onValueChange={(value: any) => setNewMatch({...newMatch, matchType: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="regular">Regular Season</SelectItem>
                            <SelectItem value="quarter-final">Quarter Final</SelectItem>
                            <SelectItem value="semi-final">Semi Final</SelectItem>
                            <SelectItem value="final">Final</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Week</Label>
                        <Input
                          type="number"
                          min="1"
                          max="20"
                          value={newMatch.week}
                          onChange={(e) => setNewMatch({...newMatch, week: parseInt(e.target.value)})}
                        />
                      </div>
                    </div>
                    <Button type="submit" className="bg-gradient-to-r from-blue-500 to-blue-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Match
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Results Tab */}
            <TabsContent value="results" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Trophy className="h-5 w-5 mr-2" />
                    Match Results Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {matches
                      .filter(match => match.status === 'scheduled')
                      .map((match) => {
                        const player1 = players.find(p => p.id === match.player1Id);
                        const player2 = players.find(p => p.id === match.player2Id);
                        const scores = matchScores[match.id] || { p1: 0, p2: 0 };
                        
                        return (
                          <div key={match.id} className="p-4 border rounded-lg">
                            <div className="flex items-center justify-between mb-4">
                              <div className="text-sm text-muted-foreground">
                                {match.round} • {new Date(match.date).toLocaleDateString()} {match.time}
                              </div>
                              <Badge variant="outline">{match.matchType}</Badge>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex-1 text-center">
                                <p className="font-semibold">{player1?.name}</p>
                                <p className="text-sm text-muted-foreground">{match.player1Team}</p>
                                <Input
                                  type="number"
                                  min="0"
                                  className="w-20 mx-auto mt-2"
                                  value={scores.p1}
                                  onChange={(e) => setMatchScores({
                                    ...matchScores,
                                    [match.id]: { ...scores, p1: parseInt(e.target.value) || 0 }
                                  })}
                                />
                              </div>
                              
                              <div className="mx-4 text-2xl font-bold">VS</div>
                              
                              <div className="flex-1 text-center">
                                <p className="font-semibold">{player2?.name}</p>
                                <p className="text-sm text-muted-foreground">{match.player2Team}</p>
                                <Input
                                  type="number"
                                  min="0"
                                  className="w-20 mx-auto mt-2"
                                  value={scores.p2}
                                  onChange={(e) => setMatchScores({
                                    ...matchScores,
                                    [match.id]: { ...scores, p2: parseInt(e.target.value) || 0 }
                                  })}
                                />
                              </div>
                            </div>
                            
                            <div className="mt-4 text-center">
                              <Button
                                onClick={() => onCompleteMatch(match.id, scores.p1, scores.p2)}
                                className="bg-gradient-to-r from-green-500 to-green-600"
                              >
                                <Save className="h-4 w-4 mr-2" />
                                Complete Match
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="h-5 w-5 mr-2" />
                    Tournament Settings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Tournament Name</Label>
                        <Input value={tournament.name} readOnly />
                      </div>
                      <div>
                        <Label>Season</Label>
                        <Input value={tournament.season} readOnly />
                      </div>
                      <div>
                        <Label>Current Week</Label>
                        <Input value={tournament.currentWeek} readOnly />
                      </div>
                      <div>
                        <Label>Current Round</Label>
                        <Input value={tournament.currentRound} readOnly />
                      </div>
                      <div>
                        <Label>Points Per Win</Label>
                        <Input value={tournament.settings.pointsPerWin} readOnly />
                      </div>
                      <div>
                        <Label>Points Per Draw</Label>
                        <Input value={tournament.settings.pointsPerDraw} readOnly />
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h3 className="font-semibold mb-4">Data Management</h3>
                      <div className="flex space-x-4">
                        <Button onClick={onExportData} variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Export Tournament Data
                        </Button>
                        <Button variant="outline">
                          <Upload className="h-4 w-4 mr-2" />
                          Import Data
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

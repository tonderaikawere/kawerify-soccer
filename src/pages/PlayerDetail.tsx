import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { loadPlayers, loadMatches, updatePlayer, type Player, type Match } from "@/lib/storage";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const PlayerDetail = () => {
  const { playerId } = useParams<{ playerId: string }>();
  const [player, setPlayer] = useState<Player | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [allPlayers, setAllPlayers] = useState<Player[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Partial<Player>>({});
  const [mediaFiles, setMediaFiles] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const players = loadPlayers();
    const foundPlayer = players.find(p => p.id === playerId);
    if (foundPlayer) {
      setPlayer(foundPlayer);
      setEditForm(foundPlayer);
      const playerMedia = localStorage.getItem(`player_media_${playerId}`);
      if (playerMedia) {
        setMediaFiles(JSON.parse(playerMedia));
      }
    }
    setAllPlayers(players);
    setMatches(loadMatches());
  }, [playerId]);

  if (!player) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#070b13]">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-20 px-4">
          <div className="text-center space-y-4 max-w-md bg-white dark:bg-slate-900 p-8 rounded-2xl border shadow-lg">
            <div className="text-4xl animate-float">🏆</div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">Player Profile Not Found</h1>
            <p className="text-slate-500 text-sm">The gamer profile you are trying to view does not exist or has been removed.</p>
            <Link to="/players" className="block pt-2">
              <Button className="rounded-xl w-full">Back to Catalog</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const playerMatches = matches.filter(match => 
    (match.player1Id === player.id || match.player2Id === player.id) && match.status === 'completed'
  );

  const getWinRate = () => {
    return player.stats.matchesPlayed > 0 ? Math.round((player.stats.wins / player.stats.matchesPlayed) * 100) : 0;
  };

  const getGoalDifference = () => {
    return player.stats.goalsFor - player.stats.goalsAgainst;
  };

  const getRecentForm = () => {
    return playerMatches
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 10)
      .map(match => {
        const isPlayer1 = match.player1Id === player.id;
        const playerScore = isPlayer1 ? match.player1Score : match.player2Score;
        const opponentScore = isPlayer1 ? match.player2Score : match.player1Score;
        
        if (playerScore > opponentScore) return 'W';
        if (playerScore < opponentScore) return 'L';
        return 'D';
      });
  };

  const getFormColor = (result: string) => {
    switch (result) {
      case 'W': return 'bg-emerald-500 text-white';
      case 'L': return 'bg-rose-500 text-white';
      case 'D': return 'bg-amber-500 text-slate-950';
      default: return 'bg-slate-500 text-white';
    }
  };

  const handleSaveProfile = () => {
    if (editForm.name && editForm.currentTeam) {
      updatePlayer(player.id, editForm);
      setPlayer({ ...player, ...editForm });
      setIsEditing(false);
      toast({
        title: "Profile Saved",
        description: "Gamer profile details have been saved successfully.",
      });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          const newMediaFiles = [...mediaFiles, result];
          setMediaFiles(newMediaFiles);
          localStorage.setItem(`player_media_${playerId}`, JSON.stringify(newMediaFiles));
          toast({
            title: "File Uploaded",
            description: `${file.name} successfully added to gamer gallery.`,
          });
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const recentForm = getRecentForm();
  const winRate = getWinRate();
  const goalDiff = getGoalDifference();
  const rank = allPlayers.sort((a, b) => b.stats.points - a.stats.points).findIndex(p => p.id === player.id) + 1;

  // FUT stats attributes calculation
  const maxPoints = Math.max(...allPlayers.map(p => p.stats.points || 1), 1);
  const maxGoals = Math.max(...allPlayers.map(p => p.stats.goalsFor || 1), 1);
  const maxGoalsAgainst = Math.max(...allPlayers.map(p => p.stats.goalsAgainst || 1), 1);
  
  const ovr = Math.min(Math.max(75 + Math.round((player.stats.points / maxPoints) * 24), 75), 99);
  const pac = Math.min(Math.max(70 + Math.round(winRate / 4), 60), 99);
  const sho = Math.min(Math.max(68 + Math.round((player.stats.goalsFor / maxGoals) * 31), 60), 99);
  const pas = Math.min(Math.max(65 + Math.round(winRate / 3), 60), 99);
  const dri = Math.min(Math.max(70 + Math.round(winRate / 3.5), 60), 99);
  const phy = Math.min(Math.max(75 + Math.round(player.stats.matchesPlayed * 0.7), 60), 99);

  return (
    <div className="flex flex-col min-h-screen bg-[#070b13] bg-stadium-grid transition-colors duration-300">
      <Navbar />
      <main className="flex-1 pb-16">
        <div className="container mx-auto px-6 py-8 max-w-5xl">
          
          {/* Back Action */}
          <div className="mb-6">
            <Link to="/players">
              <Button variant="ghost" className="rounded-xl text-xs font-black uppercase tracking-wider pl-3 pr-4 border border-white/10 bg-slate-900/60 hover:bg-slate-800 text-slate-200 transition-colors">
                ← Back to Players
              </Button>
            </Link>
          </div>

          {/* Gamer Header Banner */}
          <Card className="mb-8 overflow-hidden bg-slate-900/60 dark:bg-slate-950/45 backdrop-blur-md border border-white/10 dark:border-white/5 shadow-2xl rounded-2xl relative">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 h-40 w-40 rounded-full bg-secondary/10 blur-3xl pointer-events-none" />
            
            <div className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
              <div className="flex flex-col md:flex-row items-center text-center md:text-left space-y-4 md:space-y-0 md:space-x-6">
                <div className="relative">
                  <Avatar className="h-28 w-28 border-4 border-slate-900 dark:border-slate-850 shadow-2xl">
                    <AvatarImage src={player.image} alt={player.name} />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-emerald-600 text-white text-3xl font-black">
                      {player.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 font-black rounded-full h-10 w-10 flex items-center justify-center text-sm shadow-md border border-white/30">
                    #{rank}
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <h1 className="text-3xl font-black text-white tracking-tight uppercase">{player.name}</h1>
                  <p className="text-lg text-primary font-black uppercase tracking-wide">
                    {player.currentTeam}
                  </p>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1.5">
                    <Badge variant="outline" className="text-xs bg-slate-950/40 border-white/10 text-slate-300 uppercase font-black tracking-wider">
                      Joined {player.teamHistory && player.teamHistory[0] ? new Date(player.teamHistory[0].startDate).getFullYear() : 2024}
                    </Badge>
                    {player.stats.cupsWon > 0 && (
                      <Badge className="bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 text-xs font-black border-0 uppercase">
                        🏆 {player.stats.cupsWon} Cup{player.stats.cupsWon > 1 ? 's' : ''}
                      </Badge>
                    )}
                    <Badge className="bg-slate-950/40 border border-white/10 text-slate-300 text-xs font-black uppercase">
                      🎮 Style: {player.playstyle || "Standard Controller Masher"}
                    </Badge>
                    <Badge className="bg-slate-950/40 border border-white/10 text-slate-300 text-xs font-black italic">
                      💬 Excuse: "{player.excuse || "Drifting stick"}"
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant="outline"
                  className="rounded-xl font-black text-xs uppercase tracking-wider border-white/15 bg-slate-900/60 hover:bg-slate-800 text-white"
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </Button>
              </div>
            </div>
          </Card>

          {/* Edit Form Card */}
          {isEditing && (
            <Card className="mb-8 rounded-2xl bg-slate-900/60 dark:bg-slate-950/45 border border-white/10 dark:border-white/5 shadow-2xl">
              <CardHeader>
                <CardTitle className="text-lg font-black uppercase tracking-wider text-white">Modify Gamer Info</CardTitle>
                <CardDescription className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Update your displayed name, current FIFA team, and avatar image details.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="player-name" className="text-slate-300">Player Name</Label>
                    <Input
                      id="player-name"
                      value={editForm.name || ''}
                      onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                      className="rounded-xl border-white/10 bg-slate-950/40 text-slate-100"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="player-team" className="text-slate-300">Current FIFA Team</Label>
                    <Input
                      id="player-team"
                      value={editForm.currentTeam || ''}
                      onChange={(e) => setEditForm({...editForm, currentTeam: e.target.value})}
                      className="rounded-xl border-white/10 bg-slate-950/40 text-slate-100"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="player-img" className="text-slate-300">Profile Image URL</Label>
                    <Input
                      id="player-img"
                      value={editForm.image || ''}
                      onChange={(e) => setEditForm({...editForm, image: e.target.value})}
                      placeholder="Optional URL link"
                      className="rounded-xl border-white/10 bg-slate-950/40 text-slate-100"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-slate-300">Playstyle</Label>
                    <Select value={editForm.playstyle || ""} onValueChange={(value) => setEditForm({...editForm, playstyle: value})}>
                      <SelectTrigger className="rounded-xl border-white/10 bg-slate-950/40 text-slate-200">
                        <SelectValue placeholder="Select Playstyle" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-white/10 text-slate-200">
                        <SelectItem value="Tiki-Taka Master" className="focus:bg-slate-800 focus:text-white">Tiki-Taka Master</SelectItem>
                        <SelectItem value="Counter-Attack Speedster" className="focus:bg-slate-800 focus:text-white">Counter-Attack Speedster</SelectItem>
                        <SelectItem value="Park-The-Bus Defender" className="focus:bg-slate-800 focus:text-white">Park-The-Bus Defender</SelectItem>
                        <SelectItem value="Skill-Move Spammer" className="focus:bg-slate-800 focus:text-white">Skill-Move Spammer</SelectItem>
                        <SelectItem value="Cross-and-Header Specialist" className="focus:bg-slate-800 focus:text-white">Cross-and-Header Specialist</SelectItem>
                        <SelectItem value="Standard Controller Masher" className="focus:bg-slate-800 focus:text-white">Standard Controller Masher</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5 md:col-span-2">
                    <Label htmlFor="player-excuse" className="text-slate-300">Excuse of Choice</Label>
                    <Input
                      id="player-excuse"
                      value={editForm.excuse || ''}
                      onChange={(e) => setEditForm({...editForm, excuse: e.target.value})}
                      placeholder="e.g. Drifting analog stick"
                      className="rounded-xl border-white/10 bg-slate-950/40 text-slate-100"
                    />
                  </div>
                </div>
                <div className="flex space-x-2 pt-2">
                  <Button onClick={handleSaveProfile} className="rounded-xl font-black text-xs uppercase tracking-wider bg-gradient-to-r from-primary to-emerald-600">
                    Save Settings
                  </Button>
                  <Button variant="ghost" onClick={() => setIsEditing(false)} className="rounded-xl font-black text-xs uppercase tracking-wider hover:bg-white/5">
                    Discard
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Core Gamer Stats dashboard grids */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-slate-900/60 dark:bg-slate-950/45 border border-white/10 dark:border-white/5 text-center shadow-xl">
              <CardContent className="p-5 space-y-1">
                <p className="text-3xl font-black text-white">{player.stats.wins}</p>
                <p className="text-[9px] text-slate-500 uppercase font-black tracking-wider">Wins</p>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-900/60 dark:bg-slate-950/45 border border-white/10 dark:border-white/5 text-center shadow-xl">
              <CardContent className="p-5 space-y-1">
                <p className="text-3xl font-black text-white">{player.stats.points}</p>
                <p className="text-[9px] text-slate-500 uppercase font-black tracking-wider">Points</p>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-900/60 dark:bg-slate-950/45 border border-white/10 dark:border-white/5 text-center shadow-xl">
              <CardContent className="p-5 space-y-1">
                <p className="text-3xl font-black text-white">{winRate}%</p>
                <p className="text-[9px] text-slate-500 uppercase font-black tracking-wider">Win Rate</p>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-900/60 dark:bg-slate-950/45 border border-white/10 dark:border-white/5 text-center shadow-xl">
              <CardContent className="p-5 space-y-1">
                <p className={`text-3xl font-black ${goalDiff >= 0 ? 'text-emerald-450' : 'text-rose-450'}`}>
                  {goalDiff >= 0 ? `+${goalDiff}` : goalDiff}
                </p>
                <p className="text-[9px] text-slate-500 uppercase font-black tracking-wider">Goal Diff</p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Statistics Tabs */}
          <Tabs defaultValue="stats" className="space-y-6">
            <TabsList className="flex flex-wrap md:grid w-full grid-cols-5 bg-slate-950/60 p-1 rounded-2xl h-auto gap-1">
              <TabsTrigger value="stats" className="rounded-xl text-[10px] font-black uppercase tracking-wider flex-1 py-2.5 text-slate-400 data-[state=active]:bg-primary/20 data-[state=active]:text-primary">Dashboard</TabsTrigger>
              <TabsTrigger value="matches" className="rounded-xl text-[10px] font-black uppercase tracking-wider flex-1 py-2.5 text-slate-400 data-[state=active]:bg-primary/20 data-[state=active]:text-primary">Matches</TabsTrigger>
              <TabsTrigger value="form" className="rounded-xl text-[10px] font-black uppercase tracking-wider flex-1 py-2.5 text-slate-400 data-[state=active]:bg-primary/20 data-[state=active]:text-primary">Form</TabsTrigger>
              <TabsTrigger value="history" className="rounded-xl text-[10px] font-black uppercase tracking-wider flex-1 py-2.5 text-slate-400 data-[state=active]:bg-primary/20 data-[state=active]:text-primary">History</TabsTrigger>
              <TabsTrigger value="media" className="rounded-xl text-[10px] font-black uppercase tracking-wider flex-1 py-2.5 text-slate-400 data-[state=active]:bg-primary/20 data-[state=active]:text-primary">Media</TabsTrigger>
            </TabsList>

            {/* Stats Dashboard Content */}
            <TabsContent value="stats" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Left Card: Tournament Record */}
                <Card className="bg-slate-900/60 dark:bg-slate-955/45 border border-white/10 dark:border-white/5 shadow-2xl rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-sm font-black uppercase tracking-widest text-white">Tournament Record</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-xs font-semibold text-slate-400">
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span>Matches Played</span>
                      <span className="font-black text-base text-white">{player.stats.matchesPlayed}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span>Matches Won</span>
                      <span className="font-black text-base text-emerald-400">{player.stats.wins}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span>Matches Lost</span>
                      <span className="font-black text-base text-rose-455">{player.stats.losses}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-white/5">
                      <span>Matches Drawn</span>
                      <span className="font-black text-base text-amber-400">{player.stats.draws}</span>
                    </div>
                    <div className="pt-4">
                      <div className="flex justify-between items-center mb-2 text-[8px] font-black uppercase tracking-widest">
                        <span>Win Percentage</span>
                        <span className="text-primary font-black text-sm">{winRate}%</span>
                      </div>
                      <Progress value={winRate} className="h-2 bg-slate-955" />
                    </div>
                  </CardContent>
                </Card>

                {/* Right Card: FUT attributes display */}
                <Card className="bg-slate-900/60 dark:bg-slate-955/45 border border-white/10 dark:border-white/5 shadow-2xl rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-sm font-black uppercase tracking-widest text-white">FUT Gamer Attributes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-xs font-semibold text-slate-400">
                    <div className="flex justify-between items-center py-1.5">
                      <span>Pace (PAC)</span>
                      <div className="flex items-center space-x-3 w-1/2">
                        <Progress value={pac} className="h-2 bg-slate-955 flex-1" />
                        <span className="font-black text-white w-6 text-right">{pac}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-1.5">
                      <span>Shooting (SHO)</span>
                      <div className="flex items-center space-x-3 w-1/2">
                        <Progress value={sho} className="h-2 bg-slate-955 flex-1" />
                        <span className="font-black text-white w-6 text-right">{sho}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-1.5">
                      <span>Passing (PAS)</span>
                      <div className="flex items-center space-x-3 w-1/2">
                        <Progress value={pas} className="h-2 bg-slate-955 flex-1" />
                        <span className="font-black text-white w-6 text-right">{pas}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-1.5">
                      <span>Dribbling (DRI)</span>
                      <div className="flex items-center space-x-3 w-1/2">
                        <Progress value={dri} className="h-2 bg-slate-955 flex-1" />
                        <span className="font-black text-white w-6 text-right">{dri}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-1.5">
                      <span>Defending (DEF)</span>
                      <div className="flex items-center space-x-3 w-1/2">
                        <Progress value={def} className="h-2 bg-slate-955 flex-1" />
                        <span className="font-black text-white w-6 text-right">{def}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-1.5">
                      <span>Physicality (PHY)</span>
                      <div className="flex items-center space-x-3 w-1/2">
                        <Progress value={phy} className="h-2 bg-slate-955 flex-1" />
                        <span className="font-black text-white w-6 text-right">{phy}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Matches List Content */}
            <TabsContent value="matches" className="space-y-4">
              <Card className="bg-slate-900/60 dark:bg-slate-955/45 border border-white/10 dark:border-white/5 shadow-2xl rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-sm font-black uppercase tracking-widest text-white">Match History ({playerMatches.length} games)</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-white/5">
                    {playerMatches.length === 0 ? (
                      <div className="text-center py-10 text-slate-500 text-xs font-semibold uppercase tracking-wider">No matches logged yet for this player.</div>
                    ) : (
                      playerMatches
                        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                        .map((match) => {
                          const isPlayer1 = match.player1Id === player.id;
                          const opponent = allPlayers.find(p => p.id === (isPlayer1 ? match.player2Id : match.player1Id));
                          const playerScore = isPlayer1 ? match.player1Score : match.player2Score;
                          const opponentScore = isPlayer1 ? match.player2Score : match.player1Score;
                          const result = playerScore > opponentScore ? 'W' : playerScore < opponentScore ? 'L' : 'D';
                          
                          return (
                            <div key={match.id} className="flex items-center justify-between p-4 px-6 transition-colors duration-200 hover:bg-white/5">
                              <div className="flex items-center space-x-4">
                                <div className={`h-8 w-8 rounded-lg ${getFormColor(result)} flex items-center justify-center font-black text-xs shadow-sm`}>
                                  {result}
                                </div>
                                <div>
                                  <p className="font-black text-xs text-white uppercase tracking-wider">vs {opponent?.name || 'Unknown Opponent'}</p>
                                  <p className="text-[10px] text-slate-500 font-semibold">
                                    {new Date(match.date).toLocaleDateString()} • {match.round}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-black text-base text-white">{playerScore} - {opponentScore}</p>
                                <Badge variant="outline" className="text-[8px] uppercase font-black border-white/10 text-slate-400 mt-0.5 tracking-widest">
                                  {match.matchType}
                                </Badge>
                              </div>
                            </div>
                          );
                        })
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Form Tracker Content */}
            <TabsContent value="form" className="space-y-6">
              <Card className="bg-slate-900/60 dark:bg-slate-955/45 border border-white/10 dark:border-white/5 shadow-2xl rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-sm font-black uppercase tracking-widest text-white">Form Tracker (Last 10 Matches)</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {recentForm.length > 0 ? recentForm.map((result, index) => (
                      <div
                        key={index}
                        className={`h-11 w-11 rounded-xl ${getFormColor(result)} flex items-center justify-center font-black text-sm shadow-md`}
                      >
                        {result}
                      </div>
                    )) : (
                      <p className="text-slate-550 text-xs py-4 font-black uppercase tracking-wider">No match forms logged recently</p>
                    )}
                  </div>
                  {recentForm.length > 0 && (
                    <p className="text-center text-[9px] text-slate-500 font-black uppercase tracking-widest">
                      Latest logged match is on the right • W = Win, L = Loss, D = Draw
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Club History Content */}
            <TabsContent value="history" className="space-y-6">
              <Card className="bg-slate-900/60 dark:bg-slate-955/45 border border-white/10 dark:border-white/5 shadow-2xl rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-sm font-black uppercase tracking-widest text-white">
                    FIFA Club History
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {player.teamHistory.map((historyEntry, index) => (
                      <div key={index} className="flex items-center justify-between p-3.5 bg-slate-950/30 rounded-xl border border-white/5 text-xs font-bold text-slate-400">
                        <span className="truncate text-white">{historyEntry.team}</span>
                        <div className="flex items-center space-x-2">
                          {index === 0 && (
                            <Badge className="bg-emerald-500/10 text-emerald-450 font-black border-0 text-[8px] uppercase tracking-wider rounded">
                              Active Team
                            </Badge>
                          )}
                          {index === player.teamHistory.length - 1 && index > 0 && (
                            <Badge variant="outline" className="text-[8px] uppercase font-black text-slate-450 border-white/10 tracking-wider rounded">
                              First Club
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Media Gallery Content */}
            <TabsContent value="media" className="space-y-6">
              <Card className="bg-slate-900/60 dark:bg-slate-955/45 border border-white/10 dark:border-white/5 shadow-2xl rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-sm font-black uppercase tracking-widest text-white">
                    Gamer Media Showcase
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  {/* File Upload zone */}
                  <div className="p-6 border-2 border-dashed border-white/10 rounded-2xl bg-slate-950/40 text-center hover:bg-slate-950/60 transition-colors">
                    <Label htmlFor="media-upload" className="cursor-pointer space-y-2">
                      <div className="h-10 w-10 bg-slate-900 rounded-full flex items-center justify-center mx-auto text-slate-400 text-lg">
                        📷
                      </div>
                      <span className="block font-black text-xs text-white uppercase tracking-wider">Upload Image / Video clips</span>
                      <span className="block text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Add highlight screenshots or goal replays here</span>
                    </Label>
                    <Input
                      id="media-upload"
                      type="file"
                      multiple
                      accept="image/*,video/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                  
                  {/* Grid Showcase */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {mediaFiles.map((file, index) => (
                      <div key={index} className="relative group overflow-hidden rounded-xl border border-white/5 bg-slate-950/80 shadow-md aspect-video flex items-center justify-center">
                        {file.startsWith('data:video') ? (
                          <video
                              src={file}
                              controls
                              className="w-full h-full object-cover"
                          />
                        ) : (
                          <img
                              src={file}
                              alt={`Media highlight #${index + 1}`}
                              className="w-full h-full object-cover"
                          />
                        )}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => {
                              const newFiles = mediaFiles.filter((_, i) => i !== index);
                              setMediaFiles(newFiles);
                              localStorage.setItem(`player_media_${playerId}`, JSON.stringify(newFiles));
                              toast({
                                title: "Item Removed",
                                description: "The media file was removed from the gallery.",
                              });
                            }}
                            className="rounded-xl font-black text-xs uppercase tracking-wider"
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {mediaFiles.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-slate-550 text-xs font-semibold uppercase tracking-wider">No highlights uploaded for this gamer yet.</p>
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

export default PlayerDetail;

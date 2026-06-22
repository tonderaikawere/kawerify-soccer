import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Trophy, Target, Calendar, TrendingUp, Award, Star, History, Camera, Eye, Trash2, Edit2, Shield, Flame, Check } from "lucide-react";
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
            <Trophy className="h-12 w-12 text-rose-500 mx-auto animate-float" />
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

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#070b13] transition-colors duration-300">
      <Navbar />
      <main className="flex-1 pb-16">
        <div className="container mx-auto px-6 py-8 max-w-6xl">
          
          {/* Back Action */}
          <div className="mb-6">
            <Link to="/players">
              <Button variant="ghost" className="rounded-full text-xs font-bold pl-2.5 pr-4 border border-border bg-background hover:bg-muted transition-colors">
                <ArrowLeft className="h-4 w-4 mr-1.5" />
                Back to Players
              </Button>
            </Link>
          </div>

          {/* Gamer Header Banner */}
          <Card className="mb-8 overflow-hidden glass-panel border-white/20 dark:border-white/5 shadow-xl rounded-2xl relative">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 h-40 w-40 rounded-full bg-secondary/10 blur-3xl" />
            
            <div className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
              <div className="flex flex-col md:flex-row items-center text-center md:text-left space-y-4 md:space-y-0 md:space-x-6">
                <div className="relative">
                  <Avatar className="h-28 w-28 border-4 border-slate-900 dark:border-slate-800 shadow-2xl">
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
                  <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{player.name}</h1>
                  <p className="text-lg text-primary font-bold flex items-center justify-center md:justify-start">
                    <Shield className="h-4 w-4 text-emerald-500 mr-1.5" />
                    {player.currentTeam}
                  </p>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1.5">
                    <Badge variant="outline" className="text-xs bg-background/50 border-border text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      Joined {new Date(player.joinDate).getFullYear()}
                    </Badge>
                    {player.stats.cupsWon > 0 && (
                      <Badge className="bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 text-xs font-black border-0">
                        <Trophy className="h-3.5 w-3.5 mr-1" />
                        {player.stats.cupsWon} Cup{player.stats.cupsWon > 1 ? 's' : ''}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant="outline"
                  className="rounded-xl font-bold text-xs"
                >
                  <Edit2 className="h-3.5 w-3.5 mr-1.5" />
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </Button>
              </div>
            </div>
          </Card>

          {/* Edit Form Card */}
          {isEditing && (
            <Card className="mb-8 rounded-2xl glass-card">
              <CardHeader>
                <CardTitle className="text-lg font-black uppercase tracking-wider">Modify Gamer Info</CardTitle>
                <CardDescription>Update your displayed name, current FIFA team, and avatar image details.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="player-name">Player Name</Label>
                    <Input
                      id="player-name"
                      value={editForm.name || ''}
                      onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="player-team">Current FIFA Team</Label>
                    <Input
                      id="player-team"
                      value={editForm.currentTeam || ''}
                      onChange={(e) => setEditForm({...editForm, currentTeam: e.target.value})}
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="player-img">Profile Image URL</Label>
                    <Input
                      id="player-img"
                      value={editForm.image || ''}
                      onChange={(e) => setEditForm({...editForm, image: e.target.value})}
                      placeholder="Optional URL link"
                      className="rounded-xl"
                    />
                  </div>
                </div>
                <div className="flex space-x-2 pt-2">
                  <Button onClick={handleSaveProfile} className="rounded-xl font-bold bg-gradient-to-r from-primary to-emerald-600">
                    <Check className="h-4 w-4 mr-1.5" />
                    Save Settings
                  </Button>
                  <Button variant="ghost" onClick={() => setIsEditing(false)} className="rounded-xl font-bold">
                    Discard
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Core Gamer Stats dashboard grids */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="glass-card border-slate-200/50 dark:border-slate-800 text-center">
              <CardContent className="p-5 space-y-1">
                <Trophy className="h-8 w-8 text-emerald-500 mx-auto" />
                <p className="text-3xl font-black text-slate-900 dark:text-white">{player.stats.wins}</p>
                <p className="text-xs text-muted-foreground uppercase font-black tracking-wider">Wins</p>
              </CardContent>
            </Card>
            
            <Card className="glass-card border-slate-200/50 dark:border-slate-800 text-center">
              <CardContent className="p-5 space-y-1">
                <Target className="h-8 w-8 text-blue-500 mx-auto" />
                <p className="text-3xl font-black text-slate-900 dark:text-white">{player.stats.points}</p>
                <p className="text-xs text-muted-foreground uppercase font-black tracking-wider">Points</p>
              </CardContent>
            </Card>
            
            <Card className="glass-card border-slate-200/50 dark:border-slate-800 text-center">
              <CardContent className="p-5 space-y-1">
                <TrendingUp className="h-8 w-8 text-indigo-500 mx-auto" />
                <p className="text-3xl font-black text-slate-900 dark:text-white">{winRate}%</p>
                <p className="text-xs text-muted-foreground uppercase font-black tracking-wider">Win Rate</p>
              </CardContent>
            </Card>
            
            <Card className="glass-card border-slate-200/50 dark:border-slate-800 text-center">
              <CardContent className="p-5 space-y-1">
                <Award className="h-8 w-8 text-amber-500 mx-auto" />
                <p className={`text-3xl font-black ${goalDiff >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {goalDiff >= 0 ? `+${goalDiff}` : goalDiff}
                </p>
                <p className="text-xs text-muted-foreground uppercase font-black tracking-wider">Goal Diff</p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Statistics Tabs */}
          <Tabs defaultValue="stats" className="space-y-6">
            <TabsList className="flex flex-wrap md:grid w-full grid-cols-5 bg-muted/60 p-1 rounded-2xl h-auto gap-1">
              <TabsTrigger value="stats" className="rounded-xl text-xs font-black flex-1 py-2.5">Stats Dashboard</TabsTrigger>
              <TabsTrigger value="matches" className="rounded-xl text-xs font-black flex-1 py-2.5">Matches History</TabsTrigger>
              <TabsTrigger value="form" className="rounded-xl text-xs font-black flex-1 py-2.5">Form Tracker</TabsTrigger>
              <TabsTrigger value="history" className="rounded-xl text-xs font-black flex-1 py-2.5">Club History</TabsTrigger>
              <TabsTrigger value="media" className="rounded-xl text-xs font-black flex-1 py-2.5">Media Gallery</TabsTrigger>
            </TabsList>

            {/* Stats Dashboard Content */}
            <TabsContent value="stats" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glass-panel border-white/10 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg font-black uppercase tracking-wider text-slate-900 dark:text-white">Tournament Record</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm">
                    <div className="flex justify-between items-center py-2 border-b border-border/40">
                      <span className="text-muted-foreground font-medium">Matches Played</span>
                      <span className="font-extrabold text-lg text-slate-800 dark:text-slate-100">{player.stats.matchesPlayed}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border/40">
                      <span className="text-muted-foreground font-medium">Matches Won</span>
                      <span className="font-extrabold text-lg text-emerald-500">{player.stats.wins}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border/40">
                      <span className="text-muted-foreground font-medium">Matches Lost</span>
                      <span className="font-extrabold text-lg text-rose-500">{player.stats.losses}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border/40">
                      <span className="text-muted-foreground font-medium">Matches Drawn</span>
                      <span className="font-extrabold text-lg text-amber-500">{player.stats.draws}</span>
                    </div>
                    <div className="pt-4">
                      <div className="flex justify-between items-center mb-2 text-xs font-bold">
                        <span className="text-slate-600 dark:text-slate-400 uppercase tracking-wider">Win Rate Percentage</span>
                        <span className="text-primary font-black text-base">{winRate}%</span>
                      </div>
                      <Progress value={winRate} className="h-2.5 bg-muted" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-panel border-white/10 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-lg font-black uppercase tracking-wider text-slate-900 dark:text-white">Goal Statistics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-sm">
                    <div className="flex justify-between items-center py-2 border-b border-border/40">
                      <span className="text-muted-foreground font-medium">Goals Scored (GF)</span>
                      <span className="font-extrabold text-lg text-emerald-500">{player.stats.goalsFor}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border/40">
                      <span className="text-muted-foreground font-medium">Goals Conceded (GA)</span>
                      <span className="font-extrabold text-lg text-rose-500">{player.stats.goalsAgainst}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border/40">
                      <span className="text-muted-foreground font-medium">Goal Difference (GD)</span>
                      <span className={`font-black text-lg ${goalDiff >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                        {goalDiff >= 0 ? `+${goalDiff}` : goalDiff}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-muted-foreground font-medium">Avg Goals scored / match</span>
                      <span className="font-extrabold text-lg text-slate-800 dark:text-slate-100">
                        {player.stats.matchesPlayed > 0 ? (player.stats.goalsFor / player.stats.matchesPlayed).toFixed(1) : '0.0'}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Matches List Content */}
            <TabsContent value="matches" className="space-y-4">
              <Card className="glass-panel border-white/10 shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg font-black uppercase tracking-wider text-slate-900 dark:text-white">Match History ({playerMatches.length} games)</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-border/60">
                    {playerMatches.length === 0 ? (
                      <div className="text-center py-8 text-slate-500 text-sm">No matches logged yet for this player.</div>
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
                            <div key={match.id} className="flex items-center justify-between p-4 px-6 transition-colors duration-200 hover:bg-slate-500/5 dark:hover:bg-slate-100/5">
                              <div className="flex items-center space-x-4">
                                <div className={`h-8 w-8 rounded-lg ${getFormColor(result)} flex items-center justify-center font-extrabold text-xs shadow-sm`}>
                                  {result}
                                </div>
                                <div>
                                  <p className="font-extrabold text-slate-900 dark:text-white">vs {opponent?.name || 'Unknown Opponent'}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {new Date(match.date).toLocaleDateString()} • {match.round}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-black text-lg text-slate-900 dark:text-white">{playerScore} - {opponentScore}</p>
                                <Badge variant="outline" className="text-[10px] uppercase font-bold border-border/80 text-muted-foreground mt-0.5">
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
              <Card className="glass-panel border-white/10 shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg font-black uppercase tracking-wider text-slate-900 dark:text-white">Form Tracker (Last 10 Matches)</CardTitle>
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
                      <p className="text-slate-500 text-sm py-4">No match forms logged recently</p>
                    )}
                  </div>
                  {recentForm.length > 0 && (
                    <p className="text-center text-xs text-muted-foreground font-semibold">
                      Latest logged match is on the right • W = Win, L = Loss, D = Draw
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Club History Content */}
            <TabsContent value="history" className="space-y-6">
              <Card className="glass-panel border-white/10 shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center">
                    <History className="h-5 w-5 mr-2 text-indigo-400" />
                    FIFA Club History
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {player.teamHistory.map((team, index) => (
                      <div key={index} className="flex items-center justify-between p-3.5 bg-muted/40 rounded-xl border border-border/40 text-sm">
                        <span className="font-extrabold text-slate-800 dark:text-slate-200">{team}</span>
                        <div className="flex items-center space-x-2">
                          {index === 0 && (
                            <Badge className="bg-emerald-500 text-white font-bold border-0 text-[10px] uppercase">
                              Active Team
                            </Badge>
                          )}
                          {index === player.teamHistory.length - 1 && index > 0 && (
                            <Badge variant="outline" className="text-[10px] uppercase font-semibold text-muted-foreground border-border/80">
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
              <Card className="glass-panel border-white/10 shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center">
                    <Camera className="h-5 w-5 mr-2 text-indigo-400" />
                    Gamer Media Showcase
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  {/* File Upload zone */}
                  <div className="p-6 border-2 border-dashed border-border/80 rounded-2xl bg-muted/10 text-center hover:bg-muted/20 transition-colors">
                    <Label htmlFor="media-upload" className="cursor-pointer space-y-2">
                      <div className="h-10 w-10 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto text-muted-foreground">
                        📷
                      </div>
                      <span className="block font-black text-sm text-slate-700 dark:text-slate-300">Upload Image / Video clips</span>
                      <span className="block text-xs text-slate-500">Add highlight screenshots or goal replays here</span>
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
                      <div key={index} className="relative group overflow-hidden rounded-xl border bg-slate-950/80 shadow-md aspect-video flex items-center justify-center">
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
                            className="rounded-xl font-bold text-xs"
                          >
                            <Trash2 className="h-3.5 w-3.5 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {mediaFiles.length === 0 && (
                    <div className="text-center py-12">
                      <Camera className="h-12 w-12 mx-auto mb-3 text-muted-foreground animate-float" />
                      <p className="text-slate-500 text-sm">No highlights uploaded for this gamer yet.</p>
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

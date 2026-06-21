import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Trophy, Target, Calendar, TrendingUp, Award, Star, History, Camera, Video, Upload, Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
      // Load player's media files from localStorage
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
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Player Not Found</h1>
            <Link to="/players">
              <Button>Back to Players</Button>
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
      case 'W': return 'bg-green-500';
      case 'L': return 'bg-red-500';
      case 'D': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const handleSaveProfile = () => {
    if (editForm.name && editForm.currentTeam) {
      updatePlayer(player.id, editForm);
      setPlayer({ ...player, ...editForm });
      setIsEditing(false);
      toast({
        title: "Profile Updated",
        description: "Player profile has been updated successfully",
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
            title: "Media Uploaded",
            description: `${file.name} has been uploaded successfully`,
          });
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const recentForm = getRecentForm();
  const winRate = getWinRate();
  const goalDiff = getGoalDifference();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <div className="mb-6">
            <Link to="/players">
              <Button variant="outline" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Players
              </Button>
            </Link>
          </div>

          {/* Player Header */}
          <Card className="mb-8 overflow-hidden border-2 border-primary/20 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white relative">
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    <Avatar className="h-32 w-32 border-4 border-white shadow-2xl">
                      <AvatarImage src={player.image} alt={player.name} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-4xl font-bold">
                        {player.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black rounded-full h-12 w-12 flex items-center justify-center text-lg font-bold shadow-lg">
                      #{allPlayers.sort((a, b) => b.stats.points - a.stats.points).findIndex(p => p.id === player.id) + 1}
                    </div>
                  </div>
                  
                  <div>
                    <h1 className="text-4xl font-bold mb-2">{player.name}</h1>
                    <p className="text-2xl text-blue-100 font-semibold mb-2">{player.currentTeam}</p>
                    <div className="flex items-center space-x-4">
                      <Badge className="bg-white/20 text-white border-white/30">
                        <Calendar className="h-4 w-4 mr-1" />
                        Joined {new Date(player.joinDate).getFullYear()}
                      </Badge>
                      {player.stats.cupsWon > 0 && (
                        <Badge className="bg-yellow-500 text-black">
                          <Trophy className="h-4 w-4 mr-1" />
                          {player.stats.cupsWon} Cup{player.stats.cupsWon > 1 ? 's' : ''}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <Button
                    onClick={() => setIsEditing(!isEditing)}
                    variant="secondary"
                    className="bg-white/20 hover:bg-white/30"
                  >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </Button>
                </div>
              </div>
              
              {/* Animated background */}
              <div className="absolute top-4 right-4 animate-spin">
                <div className="h-16 w-16 rounded-full bg-white border-4 border-black relative opacity-20">
                  <div className="absolute inset-2 rounded-full border-2 border-black"></div>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Edit Form */}
          {isEditing && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Player Name</Label>
                    <Input
                      value={editForm.name || ''}
                      onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>Current Team</Label>
                    <Input
                      value={editForm.currentTeam || ''}
                      onChange={(e) => setEditForm({...editForm, currentTeam: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label>Profile Image URL</Label>
                    <Input
                      value={editForm.image || ''}
                      onChange={(e) => setEditForm({...editForm, image: e.target.value})}
                      placeholder="Enter image URL or upload below"
                    />
                  </div>
                  <div>
                    <Label>Upload Profile Image</Label>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            setEditForm({...editForm, image: event.target?.result as string});
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="mt-4 flex space-x-2">
                  <Button onClick={handleSaveProfile}>Save Changes</Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
              <CardContent className="p-6 text-center">
                <Trophy className="h-12 w-12 mx-auto mb-3 text-green-200" />
                <p className="text-3xl font-bold">{player.stats.wins}</p>
                <p className="text-green-100">Wins</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <CardContent className="p-6 text-center">
                <Target className="h-12 w-12 mx-auto mb-3 text-blue-200" />
                <p className="text-3xl font-bold">{player.stats.points}</p>
                <p className="text-blue-100">Points</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-12 w-12 mx-auto mb-3 text-purple-200" />
                <p className="text-3xl font-bold">{winRate}%</p>
                <p className="text-purple-100">Win Rate</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
              <CardContent className="p-6 text-center">
                <Award className="h-12 w-12 mx-auto mb-3 text-yellow-200" />
                <p className={`text-3xl font-bold ${goalDiff >= 0 ? 'text-white' : 'text-yellow-200'}`}>
                  {goalDiff >= 0 ? '+' : ''}{goalDiff}
                </p>
                <p className="text-yellow-100">Goal Diff</p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Tabs */}
          <Tabs defaultValue="stats" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="stats">Statistics</TabsTrigger>
              <TabsTrigger value="matches">Match History</TabsTrigger>
              <TabsTrigger value="form">Recent Form</TabsTrigger>
              <TabsTrigger value="history">Team History</TabsTrigger>
              <TabsTrigger value="media">Media Gallery</TabsTrigger>
            </TabsList>

            <TabsContent value="stats" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Matches Played</span>
                      <span className="font-bold text-2xl">{player.stats.matchesPlayed}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Wins</span>
                      <span className="font-bold text-2xl text-green-600">{player.stats.wins}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Losses</span>
                      <span className="font-bold text-2xl text-red-600">{player.stats.losses}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Draws</span>
                      <span className="font-bold text-2xl text-yellow-600">{player.stats.draws}</span>
                    </div>
                    <div className="pt-4 border-t">
                      <div className="flex justify-between items-center mb-2">
                        <span>Win Rate</span>
                        <span className="font-bold text-primary">{winRate}%</span>
                      </div>
                      <Progress value={winRate} className="h-3" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Goal Statistics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Goals For</span>
                      <span className="font-bold text-2xl text-green-600">{player.stats.goalsFor}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Goals Against</span>
                      <span className="font-bold text-2xl text-red-600">{player.stats.goalsAgainst}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Goal Difference</span>
                      <span className={`font-bold text-2xl ${goalDiff >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {goalDiff >= 0 ? '+' : ''}{goalDiff}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Avg Goals/Match</span>
                      <span className="font-bold text-2xl">
                        {player.stats.matchesPlayed > 0 ? (player.stats.goalsFor / player.stats.matchesPlayed).toFixed(1) : '0.0'}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="matches" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Match History ({playerMatches.length} matches)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {playerMatches
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .map((match) => {
                        const isPlayer1 = match.player1Id === player.id;
                        const opponent = allPlayers.find(p => p.id === (isPlayer1 ? match.player2Id : match.player1Id));
                        const playerScore = isPlayer1 ? match.player1Score : match.player2Score;
                        const opponentScore = isPlayer1 ? match.player2Score : match.player1Score;
                        const result = playerScore > opponentScore ? 'W' : playerScore < opponentScore ? 'L' : 'D';
                        
                        return (
                          <div key={match.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                            <div className="flex items-center space-x-4">
                              <div className={`h-8 w-8 rounded-full ${getFormColor(result)} flex items-center justify-center text-white font-bold`}>
                                {result}
                              </div>
                              <div>
                                <p className="font-semibold">vs {opponent?.name || 'Unknown'}</p>
                                <p className="text-sm text-muted-foreground">
                                  {new Date(match.date).toLocaleDateString()} • {match.round}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-lg">{playerScore} - {opponentScore}</p>
                              <Badge variant="outline" className="text-xs">
                                {match.matchType}
                              </Badge>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="form" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Form (Last 10 matches)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-center space-x-2 mb-6">
                    {recentForm.length > 0 ? recentForm.map((result, index) => (
                      <div
                        key={index}
                        className={`h-12 w-12 rounded-full ${getFormColor(result)} flex items-center justify-center text-white font-bold text-lg`}
                      >
                        {result}
                      </div>
                    )) : (
                      <p className="text-muted-foreground">No recent matches</p>
                    )}
                  </div>
                  {recentForm.length > 0 && (
                    <p className="text-center text-sm text-muted-foreground">
                      Most recent on the right • W = Win, L = Loss, D = Draw
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <History className="h-5 w-5 mr-2" />
                    Team History
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {player.teamHistory.map((team, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <span className="font-medium">{team}</span>
                        <div className="flex items-center space-x-2">
                          {index === 0 && (
                            <Badge className="bg-green-500 text-white">
                              Current Team
                            </Badge>
                          )}
                          {index === player.teamHistory.length - 1 && index > 0 && (
                            <Badge variant="outline">
                              First Team
                            </Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="media" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Camera className="h-5 w-5 mr-2" />
                    Media Gallery
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <Label htmlFor="media-upload" className="block mb-2">Upload Images/Videos</Label>
                    <Input
                      id="media-upload"
                      type="file"
                      multiple
                      accept="image/*,video/*"
                      onChange={handleFileUpload}
                      className="mb-2"
                    />
                    <p className="text-sm text-muted-foreground">
                      Supports: JPG, PNG, GIF, MP4, WebM, and more
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {mediaFiles.map((file, index) => (
                      <div key={index} className="relative group">
                        {file.startsWith('data:video') ? (
                          <video
                            src={file}
                            controls
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        ) : (
                          <img
                            src={file}
                            alt={`Media ${index + 1}`}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                        )}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => {
                              const newFiles = mediaFiles.filter((_, i) => i !== index);
                              setMediaFiles(newFiles);
                              localStorage.setItem(`player_media_${playerId}`, JSON.stringify(newFiles));
                            }}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {mediaFiles.length === 0 && (
                    <div className="text-center py-12">
                      <Camera className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">No media files uploaded yet</p>
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

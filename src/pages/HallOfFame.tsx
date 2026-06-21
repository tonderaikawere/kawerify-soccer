import { useState, useEffect } from "react";
import { Trophy, Medal, Award, Star, Crown, Calendar, Users, Target } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { loadCups, loadPlayers, type Cup, type Player } from "@/lib/storage";

const HallOfFame = () => {
  const [cups, setCups] = useState<Cup[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    setCups(loadCups());
    setPlayers(loadPlayers());
  }, []);

  const getPlayerById = (id: string) => players.find(p => p.id === id);

  const championPlayers = players
    .filter(p => p.stats.cupsWon > 0)
    .sort((a, b) => b.stats.cupsWon - a.stats.cupsWon);

  const topScorers = players
    .sort((a, b) => b.stats.goalsFor - a.stats.goalsFor)
    .slice(0, 10);

  const mostWins = players
    .sort((a, b) => b.stats.wins - a.stats.wins)
    .slice(0, 10);

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="h-8 w-8 text-yellow-500 animate-pulse" />;
    if (rank === 2) return <Trophy className="h-8 w-8 text-gray-400" />;
    if (rank === 3) return <Medal className="h-8 w-8 text-amber-700" />;
    return <Award className="h-6 w-6 text-blue-500" />;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-yellow-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center justify-center mb-6">
              <div className="animate-bounce mr-4">
                <Crown className="h-16 w-16 text-yellow-500" />
              </div>
              <h1 className="text-6xl font-bold bg-gradient-to-r from-yellow-600 to-purple-600 bg-clip-text text-transparent">
                Hall of Fame
              </h1>
              <div className="animate-bounce ml-4">
                <Crown className="h-16 w-16 text-yellow-500" />
              </div>
            </div>
            <p className="text-2xl text-muted-foreground max-w-3xl mx-auto">
              Celebrating the legends and champions of Kawerify Tech World Cup
            </p>
            
            {/* Animated trophies */}
            <div className="flex justify-center space-x-8 mt-8">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}>
                  <Trophy className={`h-8 w-8 ${i <= 3 ? 'text-yellow-500' : 'text-gray-400'}`} />
                </div>
              ))}
            </div>
          </div>

          <Tabs defaultValue="champions" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4 h-16 bg-gradient-to-r from-yellow-100 to-purple-100 dark:from-yellow-900 dark:to-purple-900">
              <TabsTrigger value="champions" className="text-sm font-semibold">
                <Crown className="h-4 w-4 mr-2" />
                Champions
              </TabsTrigger>
              <TabsTrigger value="cups" className="text-sm font-semibold">
                <Trophy className="h-4 w-4 mr-2" />
                Cup History
              </TabsTrigger>
              <TabsTrigger value="records" className="text-sm font-semibold">
                <Target className="h-4 w-4 mr-2" />
                Records
              </TabsTrigger>
              <TabsTrigger value="legends" className="text-sm font-semibold">
                <Star className="h-4 w-4 mr-2" />
                Legends
              </TabsTrigger>
            </TabsList>

            {/* Champions Tab */}
            <TabsContent value="champions" className="space-y-8">
              <Card className="overflow-hidden border-2 border-yellow-200 shadow-2xl">
                <CardHeader className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
                  <CardTitle className="text-3xl font-bold flex items-center">
                    <Crown className="h-8 w-8 mr-3" />
                    Tournament Champions
                  </CardTitle>
                  <CardDescription className="text-yellow-100 text-lg">
                    Players who have lifted the Kawerify Tech World Cup
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  {championPlayers.length > 0 ? (
                    <div className="space-y-0">
                      {championPlayers.map((player, index) => (
                        <div
                          key={player.id}
                          className={`flex items-center justify-between p-6 border-b border-border transition-all duration-300 hover:bg-muted/50 ${
                            index === 0 ? "bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900" : ""
                          }`}
                        >
                          <div className="flex items-center space-x-6">
                            <div className="w-16 flex justify-center">
                              {getRankIcon(index + 1)}
                            </div>
                            
                            <div className="flex items-center space-x-4">
                              <Avatar className="h-20 w-20 border-4 border-yellow-400 shadow-lg">
                                <AvatarImage src={player.image} alt={player.name} />
                                <AvatarFallback className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white text-2xl font-bold">
                                  {player.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              
                              <div>
                                <h3 className="font-bold text-2xl text-foreground">{player.name}</h3>
                                <p className="text-lg text-primary font-semibold">{player.currentTeam}</p>
                                <div className="flex items-center space-x-4 mt-2">
                                  <Badge className="bg-yellow-500 text-black font-bold">
                                    <Trophy className="h-4 w-4 mr-1" />
                                    {player.stats.cupsWon} Cup{player.stats.cupsWon > 1 ? 's' : ''}
                                  </Badge>
                                  <Badge variant="outline">
                                    {player.stats.wins} Wins
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-4xl font-bold text-yellow-600 mb-2">
                              {player.stats.cupsWon}
                            </div>
                            <p className="text-sm text-muted-foreground">Championships</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <Crown className="h-24 w-24 mx-auto mb-6 text-muted-foreground" />
                      <h3 className="text-2xl font-semibold mb-2">No Champions Yet</h3>
                      <p className="text-muted-foreground">
                        The first tournament champions will be crowned here
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Cup History Tab */}
            <TabsContent value="cups" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Trophy className="h-6 w-6 mr-2 text-yellow-500" />
                    Tournament History
                  </CardTitle>
                  <CardDescription>
                    Complete history of all Kawerify Tech World Cup tournaments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {cups.length > 0 ? (
                    <div className="space-y-4">
                      {cups
                        .sort((a, b) => new Date(b.finalDate).getTime() - new Date(a.finalDate).getTime())
                        .map((cup, index) => {
                          const winner = getPlayerById(cup.winnerId);
                          return (
                            <div key={cup.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                              <div className="flex items-center space-x-4">
                                <div className="h-12 w-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center">
                                  <Trophy className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                  <h3 className="font-semibold text-lg">{cup.name}</h3>
                                  <p className="text-sm text-muted-foreground">
                                    Season {cup.season} • {cup.participants.length} participants
                                  </p>
                                </div>
                              </div>
                              
                              <div className="text-right">
                                <p className="font-bold text-lg">{winner?.name || 'Unknown'}</p>
                                <p className="text-sm text-muted-foreground">
                                  <Calendar className="h-3 w-3 inline mr-1" />
                                  {new Date(cup.finalDate).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Trophy className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-xl font-semibold mb-2">No Tournaments Completed</h3>
                      <p className="text-muted-foreground">
                        Tournament history will appear here once competitions are completed
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Records Tab */}
            <TabsContent value="records" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Top Scorers */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="h-5 w-5 mr-2 text-green-500" />
                      Top Goal Scorers
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {topScorers.slice(0, 5).map((player, index) => (
                        <div key={player.id} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-white font-bold ${
                              index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-amber-600' : 'bg-blue-500'
                            }`}>
                              {index + 1}
                            </div>
                            <div>
                              <p className="font-semibold">{player.name}</p>
                              <p className="text-xs text-muted-foreground">{player.currentTeam}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg text-green-600">{player.stats.goalsFor}</p>
                            <p className="text-xs text-muted-foreground">goals</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Most Wins */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Trophy className="h-5 w-5 mr-2 text-blue-500" />
                      Most Wins
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mostWins.slice(0, 5).map((player, index) => (
                        <div key={player.id} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-white font-bold ${
                              index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-amber-600' : 'bg-blue-500'
                            }`}>
                              {index + 1}
                            </div>
                            <div>
                              <p className="font-semibold">{player.name}</p>
                              <p className="text-xs text-muted-foreground">{player.currentTeam}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg text-blue-600">{player.stats.wins}</p>
                            <p className="text-xs text-muted-foreground">wins</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Tournament Records */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="h-5 w-5 mr-2 text-purple-500" />
                    Tournament Records
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-lg">
                      <Target className="h-12 w-12 mx-auto mb-2 text-green-600" />
                      <p className="text-2xl font-bold text-green-700 dark:text-green-400">
                        {Math.max(...players.map(p => p.stats.goalsFor), 0)}
                      </p>
                      <p className="text-sm text-green-600 dark:text-green-500">Most Goals in Season</p>
                    </div>
                    
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-lg">
                      <Trophy className="h-12 w-12 mx-auto mb-2 text-blue-600" />
                      <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                        {Math.max(...players.map(p => p.stats.wins), 0)}
                      </p>
                      <p className="text-sm text-blue-600 dark:text-blue-500">Most Wins in Season</p>
                    </div>
                    
                    <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 rounded-lg">
                      <Star className="h-12 w-12 mx-auto mb-2 text-purple-600" />
                      <p className="text-2xl font-bold text-purple-700 dark:text-purple-400">
                        {Math.max(...players.map(p => p.stats.points), 0)}
                      </p>
                      <p className="text-sm text-purple-600 dark:text-purple-500">Most Points in Season</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Legends Tab */}
            <TabsContent value="legends" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="h-6 w-6 mr-2 text-yellow-500" />
                    Tournament Legends
                  </CardTitle>
                  <CardDescription>
                    Players who have made their mark in Kawerify Tech World Cup history
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {players
                      .filter(p => p.stats.matchesPlayed >= 10 || p.stats.cupsWon > 0 || p.stats.wins >= 10)
                      .sort((a, b) => (b.stats.cupsWon * 100 + b.stats.wins) - (a.stats.cupsWon * 100 + a.stats.wins))
                      .map((player) => {
                        const winRate = player.stats.matchesPlayed > 0 ? Math.round((player.stats.wins / player.stats.matchesPlayed) * 100) : 0;
                        
                        return (
                          <Card key={player.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                            <CardHeader className="bg-gradient-to-br from-yellow-50 to-purple-50 dark:from-yellow-950 dark:to-purple-950">
                              <div className="flex items-center space-x-4">
                                <Avatar className="h-16 w-16 border-4 border-yellow-400">
                                  <AvatarImage src={player.image} alt={player.name} />
                                  <AvatarFallback className="bg-gradient-to-br from-yellow-500 to-purple-600 text-white text-xl font-bold">
                                    {player.name.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <CardTitle className="text-lg">{player.name}</CardTitle>
                                  <CardDescription>{player.currentTeam}</CardDescription>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="p-4">
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-sm">Cups Won:</span>
                                  <span className="font-bold text-yellow-600">{player.stats.cupsWon}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm">Total Wins:</span>
                                  <span className="font-bold text-green-600">{player.stats.wins}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm">Win Rate:</span>
                                  <span className="font-bold text-blue-600">{winRate}%</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-sm">Goals:</span>
                                  <span className="font-bold text-purple-600">{player.stats.goalsFor}</span>
                                </div>
                              </div>
                              
                              <div className="mt-4 flex flex-wrap gap-1">
                                {player.stats.cupsWon > 0 && (
                                  <Badge className="bg-yellow-500 text-black text-xs">
                                    <Crown className="h-3 w-3 mr-1" />
                                    Champion
                                  </Badge>
                                )}
                                {winRate >= 70 && (
                                  <Badge className="bg-green-500 text-white text-xs">
                                    High Win Rate
                                  </Badge>
                                )}
                                {player.stats.goalsFor >= 30 && (
                                  <Badge className="bg-blue-500 text-white text-xs">
                                    Goal Machine
                                  </Badge>
                                )}
                                {player.stats.matchesPlayed >= 50 && (
                                  <Badge className="bg-purple-500 text-white text-xs">
                                    Veteran
                                  </Badge>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                  </div>
                  
                  {players.filter(p => p.stats.matchesPlayed >= 10 || p.stats.cupsWon > 0 || p.stats.wins >= 10).length === 0 && (
                    <div className="text-center py-12">
                      <Star className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-xl font-semibold mb-2">No Legends Yet</h3>
                      <p className="text-muted-foreground">
                        Players will earn legendary status through exceptional performances
                      </p>
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

export default HallOfFame;

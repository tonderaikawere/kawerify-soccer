import { useState, useEffect } from "react";
import { Trophy, Medal, Award, Star, TrendingUp, Target } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { loadPlayers, loadTournament, initializeDefaultData, type Player } from "@/lib/storage";
import heroImage from "@/assets/soccer-hero.jpg";

const Leaderboard = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [tournament, setTournament] = useState(loadTournament());

  useEffect(() => {
    initializeDefaultData();
    setPlayers(loadPlayers());
    setTournament(loadTournament());
  }, []);

  const sortedPlayers = [...players].sort((a, b) => {
    if (b.stats.points !== a.stats.points) return b.stats.points - a.stats.points;
    return (b.stats.goalsFor - b.stats.goalsAgainst) - (a.stats.goalsFor - a.stats.goalsAgainst);
  });

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Trophy className="h-8 w-8 text-yellow-500 animate-pulse" />;
    if (rank === 2) return <Medal className="h-8 w-8 text-gray-400" />;
    if (rank === 3) return <Award className="h-8 w-8 text-amber-700" />;
    return <span className="text-2xl font-bold text-muted-foreground">{rank}</span>;
  };

  const getWinRate = (player: Player) => {
    return player.stats.matchesPlayed > 0 ? Math.round((player.stats.wins / player.stats.matchesPlayed) * 100) : 0;
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div 
        className="relative h-[400px] bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 to-background" />
          <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
            <div className="animate-bounce mb-4">
              <Trophy className="h-24 w-24 text-yellow-500" />
            </div>
            <h1 className="text-6xl font-bold text-foreground mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Kawerify Tech World Cup
            </h1>
            <p className="text-2xl text-muted-foreground max-w-3xl">
              Track the elite soccer gamers competing in our professional FIFA-style tournament
            </p>
            <div className="flex items-center space-x-4 mt-6">
              <Badge className="text-xl px-8 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold">
                Season {tournament.season}
              </Badge>
              <Badge className="text-xl px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold">
                Week {tournament.currentWeek}
              </Badge>
            </div>
            
            {/* Animated soccer balls */}
            <div className="flex justify-center space-x-12 mt-8">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="animate-bounce" style={{ animationDelay: `${i * 0.3}s` }}>
                  <div className="h-8 w-8 rounded-full bg-white border-2 border-black relative">
                    <div className="absolute inset-1 rounded-full border border-black"></div>
                    <div className="absolute top-1 left-1 h-1.5 w-1.5 bg-black rounded-full"></div>
                    <div className="absolute bottom-1 right-1 h-1.5 w-1.5 bg-black rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Leaderboard */}
        <div className="container mx-auto px-4 py-12">
          <Card className="overflow-hidden border-2 border-primary/20 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-3xl font-bold flex items-center">
                    <Trophy className="h-8 w-8 mr-3 text-yellow-400" />
                    World Cup Leaderboard
                  </CardTitle>
                  <CardDescription className="text-blue-100 text-lg mt-2">
                    Live rankings updated after every match • {sortedPlayers.length} players competing
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-sm text-blue-200">Current Round</div>
                  <div className="text-2xl font-bold text-yellow-400">{tournament.currentRound}</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0">
                {sortedPlayers.map((player, index) => {
                  const winRate = getWinRate(player);
                  const goalDiff = player.stats.goalsFor - player.stats.goalsAgainst;
                  
                  return (
                    <div
                      key={player.id}
                      className={`flex items-center justify-between p-6 border-b border-border transition-all duration-300 hover:bg-muted/50 ${
                        index === 0 ? "bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900" : 
                        index === 1 ? "bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800" :
                        index === 2 ? "bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900" : ""
                      }`}
                    >
                      <div className="flex items-center space-x-6 flex-1">
                        <div className="w-16 flex justify-center">
                          {getRankIcon(index + 1)}
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-16 w-16 border-4 border-white shadow-lg">
                            <AvatarImage src={player.image} alt={player.name} />
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xl font-bold">
                              {player.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div>
                            <h3 className="font-bold text-2xl text-foreground">{player.name}</h3>
                            <p className="text-lg text-primary font-semibold">{player.currentTeam}</p>
                            <div className="flex items-center space-x-4 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {player.stats.matchesPlayed} matches
                              </Badge>
                              {player.stats.cupsWon > 0 && (
                                <Badge className="bg-yellow-500 text-black text-xs">
                                  <Trophy className="h-3 w-3 mr-1" />
                                  {player.stats.cupsWon} Cup{player.stats.cupsWon > 1 ? 's' : ''}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-5 gap-8 text-center">
                        <div>
                          <p className="text-3xl font-bold text-green-600">{player.stats.wins}</p>
                          <p className="text-sm text-muted-foreground font-medium">Wins</p>
                        </div>
                        <div>
                          <p className="text-3xl font-bold text-red-600">{player.stats.losses}</p>
                          <p className="text-sm text-muted-foreground font-medium">Losses</p>
                        </div>
                        <div>
                          <p className="text-3xl font-bold text-blue-600">{player.stats.points}</p>
                          <p className="text-sm text-muted-foreground font-medium">Points</p>
                        </div>
                        <div>
                          <p className={`text-2xl font-bold ${goalDiff >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {goalDiff >= 0 ? '+' : ''}{goalDiff}
                          </p>
                          <p className="text-sm text-muted-foreground font-medium">Goal Diff</p>
                        </div>
                        <div>
                          <div className="flex flex-col items-center">
                            <p className="text-2xl font-bold text-purple-600">{winRate}%</p>
                            <p className="text-sm text-muted-foreground font-medium mb-1">Win Rate</p>
                            <Progress value={winRate} className="w-16 h-2" />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
          
          {/* Tournament Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
              <CardContent className="p-6 text-center">
                <Star className="h-12 w-12 mx-auto mb-3 text-blue-600" />
                <h3 className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                  {sortedPlayers.length > 0 ? sortedPlayers[0]?.name : 'TBD'}
                </h3>
                <p className="text-blue-600 dark:text-blue-500 font-medium">Current Leader</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
              <CardContent className="p-6 text-center">
                <Target className="h-12 w-12 mx-auto mb-3 text-green-600" />
                <h3 className="text-2xl font-bold text-green-700 dark:text-green-400">
                  {Math.max(...sortedPlayers.map(p => p.stats.goalsFor), 0)}
                </h3>
                <p className="text-green-600 dark:text-green-500 font-medium">Most Goals</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900">
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-12 w-12 mx-auto mb-3 text-purple-600" />
                <h3 className="text-2xl font-bold text-purple-700 dark:text-purple-400">
                  {sortedPlayers.reduce((sum, p) => sum + p.stats.matchesPlayed, 0)}
                </h3>
                <p className="text-purple-600 dark:text-purple-500 font-medium">Total Matches</p>
              </CardContent>
            </Card>
          </div>
        </div>
    </div>
  );
};

export default Leaderboard;

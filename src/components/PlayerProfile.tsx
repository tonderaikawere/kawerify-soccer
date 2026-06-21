import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { loadPlayers, loadMatches, type Player, type Match } from "@/lib/storage";

interface PlayerProfileProps {
  playerId?: string;
  showAll?: boolean;
}

const PlayerProfile = ({ playerId, showAll = true }: PlayerProfileProps) => {
  const [players, setPlayers] = useState([]);
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    setPlayers(loadPlayers());
    setMatches(loadMatches());
  }, []);

  const getPlayerMatches = (pId: string) => {
    return matches.filter(match => 
      (match.player1Id === pId || match.player2Id === pId) && match.status === 'completed'
    );
  };

  const getWinRate = (player: Player) => {
    const total = player.stats.matchesPlayed;
    return total > 0 ? Math.round((player.stats.wins / total) * 100) : 0;
  };

  const getGoalDifference = (player: Player) => {
    return player.stats.goalsFor - player.stats.goalsAgainst;
  };

  const getPlayerRank = (player: Player) => {
    const sortedPlayers = [...players].sort((a, b) => b.stats.points - a.stats.points);
    return sortedPlayers.findIndex(p => p.id === player.id) + 1;
  };

  const getRecentForm = (pId: string) => {
    const playerMatches = getPlayerMatches(pId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
    
    return playerMatches.map(match => {
      const isPlayer1 = match.player1Id === pId;
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

  const displayPlayers = showAll ? players : players.filter(p => p.id === playerId);

  if (displayPlayers.length === 0) {
    return (
      <div className="text-center p-8">
        
        <h3 className="text-xl font-semibold mb-2">No Players Found</h3>
        <p className="text-muted-foreground">Players will appear here once they're added to the tournament.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {displayPlayers.map((player) => {
        const winRate = getWinRate(player);
        const goalDiff = getGoalDifference(player);
        const rank = getPlayerRank(player);
        const recentForm = getRecentForm(player.id);

        return (
          <Card key={player.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-2 hover:border-primary/50">
            <CardHeader className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 relative overflow-hidden">
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
              
              <div className="relative z-10 flex items-center space-x-4">
                <div className="relative">
                  <Avatar className="h-20 w-20 border-4 border-white shadow-lg">
                    <AvatarImage src={player.image} alt={player.name} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-2xl font-bold">
                      {player.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  {/* Rank badge */}
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black rounded-full h-8 w-8 flex items-center justify-center text-sm font-bold shadow-lg">
                    #{rank}
                  </div>
                  
                  {/* Animated soccer ball */}
                  <div className="absolute -bottom-1 -left-1 animate-bounce">
                    <div className="h-4 w-4 rounded-full bg-white border border-black">
                      <div className="absolute inset-0.5 rounded-full border border-black"></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex-1">
                  <CardTitle className="text-xl font-bold text-foreground">{player.name}</CardTitle>
                  <CardDescription className="text-lg font-medium text-primary">
                    {player.currentTeam}
                  </CardDescription>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="secondary" className="text-xs">
                      
                      Joined {new Date(player.joinDate).getFullYear()}
                    </Badge>
                    {player.stats.cupsWon > 0 && (
                      <Badge className="bg-yellow-500 text-black text-xs">
                        
                        {player.stats.cupsWon} Cup{player.stats.cupsWon > 1 ? 's' : ''}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              <Tabs defaultValue="stats" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="stats">Stats</TabsTrigger>
                  <TabsTrigger value="form">Form</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                </TabsList>

                <TabsContent value="stats" className="space-y-4 mt-4">
                  {/* Key Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 rounded-lg">
                      
                      <p className="text-2xl font-bold text-green-700 dark:text-green-400">{player.stats.wins}</p>
                      <p className="text-xs text-green-600 dark:text-green-500">Wins</p>
                    </div>
                    
                    <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 rounded-lg">
                      
                      <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">{player.stats.points}</p>
                      <p className="text-xs text-blue-600 dark:text-blue-500">Points</p>
                    </div>
                  </div>

                  {/* Win Rate Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">Win Rate</span>
                      <span className="font-bold text-primary">{winRate}%</span>
                    </div>
                    <Progress value={winRate} className="h-2" />
                  </div>

                  {/* Detailed Stats */}
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Matches:</span>
                      <span className="font-medium">{player.stats.matchesPlayed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Losses:</span>
                      <span className="font-medium">{player.stats.losses}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Goals For:</span>
                      <span className="font-medium text-green-600">{player.stats.goalsFor}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Goals Against:</span>
                      <span className="font-medium text-red-600">{player.stats.goalsAgainst}</span>
                    </div>
                    <div className="flex justify-between col-span-2 pt-2 border-t">
                      <span className="font-medium">Goal Difference:</span>
                      <span className={`font-bold ${goalDiff >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {goalDiff >= 0 ? '+' : ''}{goalDiff}
                      </span>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="form" className="space-y-4 mt-4">
                  <div className="text-center">
                    <h4 className="font-semibold mb-3">Recent Form (Last 5 matches)</h4>
                    <div className="flex justify-center space-x-1">
                      {recentForm.length > 0 ? recentForm.map((result, index) => (
                        <div
                          key={index}
                          className={`h-8 w-8 rounded-full ${getFormColor(result)} flex items-center justify-center text-white font-bold text-sm`}
                        >
                          {result}
                        </div>
                      )) : (
                        <p className="text-muted-foreground text-sm">No recent matches</p>
                      )}
                    </div>
                    {recentForm.length > 0 && (
                      <p className="text-xs text-muted-foreground mt-2">
                        Most recent on the right
                      </p>
                    )}
                  </div>

                  {/* Performance Metrics */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm flex items-center">
                        
                        Average Goals/Match
                      </span>
                      <span className="font-bold">
                        {player.stats.matchesPlayed > 0 ? 
                          (player.stats.goalsFor / player.stats.matchesPlayed).toFixed(1) : '0.0'}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm flex items-center">
                        
                        Points/Match
                      </span>
                      <span className="font-bold">
                        {player.stats.matchesPlayed > 0 ? 
                          (player.stats.points / player.stats.matchesPlayed).toFixed(1) : '0.0'}
                      </span>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="history" className="space-y-4 mt-4">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center">
                      
                      Team History
                    </h4>
                    <div className="space-y-2">
                      {player.teamHistory.map((team, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                          <span className="text-sm font-medium">{team}</span>
                          <div className="flex items-center">
                            {index === 0 && (
                              <Badge variant="default" className="text-xs">
                                Current
                              </Badge>
                            )}
                            {index === player.teamHistory.length - 1 && index > 0 && (
                              <Badge variant="outline" className="text-xs">
                                First Team
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center">
                      
                      Achievements
                    </h4>
                    <div className="space-y-2">
                      {player.stats.cupsWon > 0 && (
                        <Badge className="bg-yellow-500 text-black mr-2 mb-2">
                          
                          {player.stats.cupsWon} Tournament Winner{player.stats.cupsWon > 1 ? 's' : ''}
                        </Badge>
                      )}
                      {winRate >= 70 && (
                        <Badge className="bg-green-500 text-white mr-2 mb-2">
                          
                          High Win Rate ({winRate}%)
                        </Badge>
                      )}
                      {goalDiff >= 20 && (
                        <Badge className="bg-blue-500 text-white mr-2 mb-2">
                          
                          Goal Machine (+{goalDiff})
                        </Badge>
                      )}
                      {player.stats.matchesPlayed >= 50 && (
                        <Badge className="bg-purple-500 text-white mr-2 mb-2">
                          
                          Veteran Player
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* View Profile Button */}
                  <div className="mt-6 pt-4 border-t border-border">
                    <Link to={`/player/${player.id}`}>
                      <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                        
                        View Full Profile
                      </Button>
                    </Link>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default PlayerProfile;

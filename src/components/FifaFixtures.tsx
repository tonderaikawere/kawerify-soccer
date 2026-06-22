import { useState, useEffect } from "react";
import { Calendar, Clock, MapPin, Trophy, Play, Pause } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { loadMatches, loadPlayers, loadTournament, type Match, type Player } from "@/lib/storage";

const FifaFixtures = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [tournament, setTournament] = useState(loadTournament());
  const [selectedWeek, setSelectedWeek] = useState(1);

  useEffect(() => {
    setMatches(loadMatches());
    setPlayers(loadPlayers());
  }, []);

  const getPlayerById = (id: string) => players.find(p => p.id === id);

  const getMatchesByWeek = (week: number) => {
    return matches.filter(match => match.week === week);
  };

  const getMatchTypeColor = (matchType: string) => {
    switch (matchType) {
      case 'final': return 'bg-gradient-to-r from-yellow-400 to-yellow-600';
      case 'semi-final': return 'bg-gradient-to-r from-orange-400 to-orange-600';
      case 'quarter-final': return 'bg-gradient-to-r from-blue-400 to-blue-600';
      default: return 'bg-gradient-to-r from-green-400 to-green-600';
    }
  };

  const getMatchDay = (matchType: string) => {
    return ['quarter-final', 'semi-final', 'final'].includes(matchType) ? 'Sunday' : 'Saturday';
  };

  const weeklyMatches = getMatchesByWeek(selectedWeek);

  return (
    <div className="space-y-6">
      {/* FIFA World Cup Header */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 p-8 text-white">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-10"></div>
        <div className="relative z-10 text-center">
          <div className="mb-4 flex justify-center">
            <div className="animate-bounce">
              <Trophy className="h-16 w-16 text-yellow-400" />
            </div>
          </div>
          <h1 className="mb-2 text-4xl font-bold">Kawerify Tech World Cup</h1>
          <p className="text-xl opacity-90">Season {tournament.season}</p>
          <div className="mt-4 flex justify-center space-x-4">
            <Badge className="bg-yellow-500 text-black font-bold px-4 py-2">
              Week {tournament.currentWeek}
            </Badge>
            <Badge className="bg-white text-blue-900 font-bold px-4 py-2">
              {tournament.currentRound}
            </Badge>
          </div>
        </div>
        
        {/* Animated Soccer Ball */}
        <div className="absolute top-4 right-4 animate-spin">
          <div className="h-12 w-12 rounded-full bg-white border-4 border-black relative">
            <div className="absolute inset-2 rounded-full border-2 border-black"></div>
            <div className="absolute top-1 left-1 h-2 w-2 bg-black rounded-full"></div>
            <div className="absolute bottom-1 right-1 h-2 w-2 bg-black rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Week Selector */}
      <div className="flex justify-center space-x-2 overflow-x-auto pb-2">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((week) => (
          <Button
            key={week}
            variant={selectedWeek === week ? "default" : "outline"}
            onClick={() => setSelectedWeek(week)}
            className={`min-w-[80px] ${selectedWeek === week ? 'bg-gradient-to-r from-blue-500 to-purple-600' : ''}`}
          >
            Week {week}
          </Button>
        ))}
      </div>

      {/* Match Schedule */}
      <div className="grid gap-6">
        {weeklyMatches.length === 0 ? (
          <Card className="text-center p-8">
            <CardContent>
              <Trophy className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No Matches Scheduled</h3>
              <p className="text-muted-foreground">
                Week {selectedWeek} fixtures will be available soon
              </p>
            </CardContent>
          </Card>
        ) : (
          weeklyMatches.map((match) => {
            const player1 = getPlayerById(match.player1Id);
            const player2 = getPlayerById(match.player2Id);
            
            return (
              <Card 
                key={match.id} 
                className={`overflow-hidden border-2 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${
                  match.status === 'live' ? 'border-red-500 animate-pulse' : 
                  match.status === 'completed' ? 'border-green-500' : 'border-border'
                }`}
              >
                <CardHeader className={`${getMatchTypeColor(match.matchType)} text-white relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="relative z-10 flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg font-bold uppercase tracking-wide">
                        {match.round}
                      </CardTitle>
                      <CardDescription className="text-white/90 flex items-center gap-4 mt-2">
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(match.date).toLocaleDateString()} ({getMatchDay(match.matchType)})
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {match.time}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          Kawerify Arena
                        </span>
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant={match.status === 'completed' ? 'default' : match.status === 'live' ? 'destructive' : 'secondary'}
                        className="font-bold"
                      >
                        {match.status === 'live' && <Play className="h-3 w-3 mr-1" />}
                        {match.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Animated background pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    {/* Player 1 */}
                    <div className="flex-1 text-right pr-4">
                      <div className="flex items-center justify-end space-x-3">
                        <div>
                          <h3 className="text-2xl font-bold text-foreground">{player1?.name || 'TBD'}</h3>
                          <p className="text-lg text-muted-foreground font-medium">{match.player1Team}</p>
                          {match.status === 'completed' && (
                            <div className="flex justify-end items-center mt-2 space-x-2">
                              <Badge variant="outline" className="text-sm">
                                Goals: {match.player1Score}
                              </Badge>
                            </div>
                          )}
                        </div>
                        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                          {player1?.name?.charAt(0) || '?'}
                        </div>
                      </div>
                    </div>
                    
                    {/* VS Section */}
                    <div className="px-6 text-center">
                      <div className="relative">
                        {match.status === 'completed' ? (
                          <div className="text-4xl font-bold text-primary">
                            {match.player1Score} - {match.player2Score}
                          </div>
                        ) : match.status === 'live' ? (
                          <div className="text-3xl font-bold text-red-500 animate-pulse">
                            LIVE
                          </div>
                        ) : (
                          <div className="text-3xl font-bold text-muted-foreground">
                            VS
                          </div>
                        )}
                        
                        {/* Animated soccer ball for live matches */}
                        {match.status === 'live' && (
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                            <div className="h-6 w-6 rounded-full bg-white border-2 border-black">
                              <div className="absolute inset-1 rounded-full border border-black"></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Player 2 */}
                    <div className="flex-1 text-left pl-4">
                      <div className="flex items-center space-x-3">
                        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center text-white font-bold text-xl">
                          {player2?.name?.charAt(0) || '?'}
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-foreground">{player2?.name || 'TBD'}</h3>
                          <p className="text-lg text-muted-foreground font-medium">{match.player2Team}</p>
                          {match.status === 'completed' && (
                            <div className="flex items-center mt-2 space-x-2">
                              <Badge variant="outline" className="text-sm">
                                Goals: {match.player2Score}
                              </Badge>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Match Stats for completed matches */}
                  {match.status === 'completed' && (
                    <div className="mt-6 pt-4 border-t border-border">
                      <div className="flex justify-center">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground mb-1">Match Result</p>
                          <Badge 
                            className={`${
                              match.player1Score > match.player2Score ? 'bg-blue-500' :
                              match.player2Score > match.player1Score ? 'bg-green-500' : 'bg-gray-500'
                            } text-white font-bold px-4 py-2`}
                          >
                            {match.player1Score > match.player2Score ? `${player1?.name} Wins` :
                             match.player2Score > match.player1Score ? `${player2?.name} Wins` : 'Draw'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
      
      {/* Tournament Info */}
      <Card className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Tournament Schedule</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center justify-center space-x-2">
                <Calendar className="h-4 w-4 text-green-500" />
                <span><strong>Saturdays:</strong> Regular Season Matches</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <Trophy className="h-4 w-4 text-yellow-500" />
                <span><strong>Sundays:</strong> Knockout Stage (QF, SF, Final)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FifaFixtures;

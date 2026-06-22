import { useState, useEffect } from "react";
import { Trophy, Zap, Target, Star } from "lucide-react";

const GameLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [currentTip, setCurrentTip] = useState(0);
  const [showLogo, setShowLogo] = useState(true);

  const loadingTips = [
    "🏆 Welcome to the FIFA World Cup Experience!",
    "⚽ Loading player statistics and match data...",
    "🎮 Initializing tournament management system...",
    "🌟 Preparing your gaming arena...",
    "🚀 Almost ready for kickoff!"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 200);

    const tipInterval = setInterval(() => {
      setCurrentTip(prev => (prev + 1) % loadingTips.length);
    }, 1000);

    const logoInterval = setInterval(() => {
      setShowLogo(prev => !prev);
    }, 1500);

    return () => {
      clearInterval(interval);
      clearInterval(tipInterval);
      clearInterval(logoInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900 flex items-center justify-center z-50">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-bounce opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          >
            <div className="h-4 w-4 rounded-full bg-white border border-black relative">
              <div className="absolute inset-0.5 rounded-full border border-black"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        {/* Logo Animation */}
        <div className={`mb-8 transition-all duration-500 ${showLogo ? 'scale-110 rotate-12' : 'scale-100 rotate-0'}`}>
          <div className="relative inline-block">
            <Trophy className="h-24 w-24 text-yellow-400 animate-pulse mx-auto" />
            <div className="absolute -top-2 -right-2 animate-spin">
              <Star className="h-8 w-8 text-yellow-300" />
            </div>
            <div className="absolute -bottom-2 -left-2 animate-bounce">
              <Zap className="h-6 w-6 text-blue-300" />
            </div>
            <div className="absolute top-1/2 -right-4 animate-pulse">
              <Target className="h-6 w-6 text-green-300" />
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-white mb-2 animate-pulse">
          Kawerify Tech
        </h1>
        <p className="text-xl text-blue-200 mb-8 animate-fade-in">
          FIFA World Cup Tournaments
        </p>

        {/* Progress Bar */}
        <div className="relative mb-6">
          <div className="h-4 bg-black/30 rounded-full overflow-hidden backdrop-blur-sm">
            <div 
              className="h-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 rounded-full transition-all duration-300 ease-out relative"
              style={{ width: `${Math.min(progress, 100)}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              <div className="absolute right-0 top-0 h-full w-2 bg-white/50 animate-ping"></div>
            </div>
          </div>
          <div className="flex justify-between text-xs text-blue-200 mt-2">
            <span>Loading...</span>
            <span>{Math.round(Math.min(progress, 100))}%</span>
          </div>
        </div>

        {/* Loading Tips */}
        <div className="h-16 flex items-center justify-center">
          <p className="text-lg text-white animate-fade-in font-medium">
            {loadingTips[currentTip]}
          </p>
        </div>

        {/* Spinning Soccer Balls */}
        <div className="flex justify-center space-x-4 mt-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="animate-spin"
              style={{ 
                animationDelay: `${i * 0.2}s`,
                animationDuration: '2s'
              }}
            >
              <div className="h-6 w-6 rounded-full bg-white border-2 border-black relative">
                <div className="absolute inset-1 rounded-full border border-black"></div>
                <div className="absolute top-1 left-1 h-1 w-1 bg-black rounded-full"></div>
                <div className="absolute bottom-1 right-1 h-1 w-1 bg-black rounded-full"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Power Level Indicator */}
        <div className="mt-6 flex items-center justify-center space-x-2">
          <Zap className="h-4 w-4 text-yellow-400 animate-pulse" />
          <span className="text-sm text-yellow-300 font-bold animate-pulse">
            POWER LEVEL: {Math.round(progress)}%
          </span>
          <Zap className="h-4 w-4 text-yellow-400 animate-pulse" />
        </div>
      </div>

      {/* Corner Effects */}
      <div className="absolute top-4 left-4 animate-bounce">
        <div className="h-3 w-3 bg-green-400 rounded-full animate-ping"></div>
      </div>
      <div className="absolute top-4 right-4 animate-bounce" style={{ animationDelay: '0.5s' }}>
        <div className="h-3 w-3 bg-blue-400 rounded-full animate-ping"></div>
      </div>
      <div className="absolute bottom-4 left-4 animate-bounce" style={{ animationDelay: '1s' }}>
        <div className="h-3 w-3 bg-purple-400 rounded-full animate-ping"></div>
      </div>
      <div className="absolute bottom-4 right-4 animate-bounce" style={{ animationDelay: '1.5s' }}>
        <div className="h-3 w-3 bg-yellow-400 rounded-full animate-ping"></div>
      </div>
    </div>
  );
};

export default GameLoader;

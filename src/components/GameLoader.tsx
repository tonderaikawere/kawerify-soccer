import { useState, useEffect } from "react";
import { Trophy, Shield, Zap, Sparkles, Activity } from "lucide-react";

const GameLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [currentTip, setCurrentTip] = useState(0);

  const loadingTips = [
    "⚽ LOADING PLAYER CARD REGISTRIES AND LIFETIME STATS...",
    "🏆 COMPUTING CHAMPIONSHIP STANDINGS AND POINTS...",
    "🎮 PREPARING ESPORTS ARENA FOR KICKOFF...",
    "⚡ SYNCING TO KAWERIFY TECH DATA SERVICES...",
    "🔥 SHAPING GOLDEN BOOT WINNERS LEAGUE FOR THE CUP..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + Math.random() * 12 + 3;
      });
    }, 120);

    const tipInterval = setInterval(() => {
      setCurrentTip(prev => (prev + 1) % loadingTips.length);
    }, 1200);

    return () => {
      clearInterval(interval);
      clearInterval(tipInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-[#04070d] bg-stadium-grid flex flex-col items-center justify-center z-50 overflow-hidden">
      {/* Decorative Blur Spots */}
      <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-primary/20 rounded-full blur-[120px] animate-radial-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-secondary/15 rounded-full blur-[120px] animate-radial-pulse pointer-events-none" style={{ animationDelay: '2.5s' }} />

      {/* Cyber Stadium Spotlight glow */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-primary/10 via-transparent to-transparent opacity-60 pointer-events-none" />

      <div className="relative z-10 text-center max-w-lg mx-auto px-6 w-full flex flex-col items-center">
        
        {/* Floating Ring & Trophy Container */}
        <div className="relative mb-10 group">
          {/* Glowing Background Rings */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary to-secondary blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500 animate-pulse-glow" />
          
          <div className="relative h-32 w-32 rounded-full bg-slate-900/90 border-2 border-white/10 dark:border-white/5 flex items-center justify-center p-1.5 shadow-2xl backdrop-blur-md">
            
            {/* Circular Progress Border SVG */}
            <svg className="absolute inset-0 w-full h-full transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r="60"
                className="stroke-slate-800"
                strokeWidth="4"
                fill="transparent"
              />
              <circle
                cx="64"
                cy="64"
                r="60"
                className="stroke-primary"
                strokeWidth="4"
                fill="transparent"
                strokeDasharray={377}
                strokeDashoffset={377 - (377 * Math.min(progress, 100)) / 100}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 0.15s ease-out' }}
              />
            </svg>

            {/* Inner Trophy */}
            <div className="relative h-24 w-24 rounded-full bg-[#080d1a] border border-white/10 flex items-center justify-center">
              <Trophy className="h-11 w-11 text-amber-400 animate-float" />
              {/* Star details around */}
              <Sparkles className="absolute -top-1 -right-1 h-5 w-5 text-amber-300 animate-pulse" />
              <Activity className="absolute bottom-2 h-4 w-4 text-emerald-400 opacity-60 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Title & Brand */}
        <div className="space-y-2 mb-8">
          <h1 className="text-4xl md:text-5xl font-black tracking-widest text-white uppercase leading-none">
            KAWERIFY <span className="bg-gradient-to-r from-primary via-emerald-400 to-teal-400 bg-clip-text text-transparent">SOCCER</span>
          </h1>
          <p className="text-xs text-slate-400 font-black uppercase tracking-widest leading-none">
            Tech World Cup Championship
          </p>
        </div>

        {/* Progress Display Card */}
        <div className="w-full bg-slate-950/80 border border-white/5 rounded-2xl p-6 shadow-2xl backdrop-blur-md">
          {/* Progress Bar */}
          <div className="relative mb-5">
            <div className="h-2 bg-slate-900 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-emerald-500 rounded-full transition-all duration-150 ease-out relative"
                style={{ width: `${Math.min(progress, 100)}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>
            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500 mt-2">
              <span className="flex items-center gap-1.5">
                <Zap className="h-3 w-3 text-primary animate-pulse" />
                SYSTEM STARTUP...
              </span>
              <span className="text-primary font-black text-xs">{Math.round(Math.min(progress, 100))}%</span>
            </div>
          </div>

          {/* Loading Tip */}
          <div className="h-10 flex items-center justify-center border-t border-white/5 pt-4">
            <p className="text-[10px] sm:text-xs text-slate-300 font-black tracking-widest animate-pulse text-center">
              {loadingTips[currentTip]}
            </p>
          </div>
        </div>

        {/* Console Details footer */}
        <div className="mt-8 flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-600">
          <Shield className="h-3.5 w-3.5" />
          <span>SECURING SYSTEM CONNECTION ... PORT 8080 READY</span>
        </div>

      </div>
    </div>
  );
};

export default GameLoader;

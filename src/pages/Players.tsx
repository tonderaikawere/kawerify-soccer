import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlayerProfile from "@/components/PlayerProfile";
import { initializeDefaultData } from "@/lib/storage";
import { Trophy, Users } from "lucide-react";

const Players = () => {
  useEffect(() => {
    initializeDefaultData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#070b13] transition-colors duration-300">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-6 py-12 max-w-7xl">
          
          {/* FIFA-style Header Banner */}
          <div className="mb-12 text-center max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-2 animate-float">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
              Gamer <span className="bg-gradient-to-r from-primary via-emerald-500 to-teal-500 bg-clip-text text-transparent">Profiles</span>
            </h1>
            <p className="text-base md:text-lg text-slate-500 font-medium">
              Meet the elite esports soccer competitors battling for championship glory in the Kawerify Tech Cup.
            </p>
            
            {/* Soft decorative divider */}
            <div className="flex justify-center items-center space-x-2 pt-2">
              <div className="h-1 w-8 bg-primary/30 rounded-full" />
              <Trophy className="h-4 w-4 text-amber-500 opacity-60" />
              <div className="h-1 w-8 bg-primary/30 rounded-full" />
            </div>
          </div>

          {/* FUT Grid */}
          <div className="mt-8">
            <PlayerProfile showAll={true} />
          </div>

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Players;

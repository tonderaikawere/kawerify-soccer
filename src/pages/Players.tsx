import { useEffect } from "react";
import { Trophy } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlayerProfile from "@/components/PlayerProfile";
import { initializeDefaultData } from "@/lib/storage";

const Players = () => {
  useEffect(() => {
    initializeDefaultData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          {/* FIFA-style header */}
          <div className="mb-8 text-center">
            <div className="inline-flex items-center justify-center mb-4">
              <div className="animate-pulse">
                <Trophy className="h-12 w-12 text-yellow-500 mr-3" />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Player Profiles
              </h1>
              <div className="animate-pulse">
                <Trophy className="h-12 w-12 text-yellow-500 ml-3" />
              </div>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Meet the elite soccer gamers competing in Kawerify Tech World Cup
            </p>
            
            {/* Animated soccer balls */}
            <div className="flex justify-center space-x-8 mt-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}>
                  <div className="h-6 w-6 rounded-full bg-white border-2 border-black relative">
                    <div className="absolute inset-1 rounded-full border border-black"></div>
                    <div className="absolute top-0.5 left-0.5 h-1 w-1 bg-black rounded-full"></div>
                    <div className="absolute bottom-0.5 right-0.5 h-1 w-1 bg-black rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <PlayerProfile showAll={true} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Players;

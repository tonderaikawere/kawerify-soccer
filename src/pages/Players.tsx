import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlayerProfile from "@/components/PlayerProfile";
import { initializeDefaultData } from "@/lib/storage";
import PageHeader from "@/components/PageHeader";

const Players = () => {
  useEffect(() => {
    initializeDefaultData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#070b13] transition-colors duration-300">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-6 py-12 max-w-7xl">
          
          <PageHeader
            title="Gamer"
            highlightedTitle="Profiles"
            subtitle="Meet the elite esports soccer competitors battling for championship glory in the Kawerify Tech Cup."
          />

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

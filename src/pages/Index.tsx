import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Leaderboard from "./Leaderboard";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#070b13] transition-colors duration-300">
      <Navbar />
      <main className="flex-1">
        <Leaderboard />
      </main>
      <Footer />
    </div>
  );
};

export default Index;


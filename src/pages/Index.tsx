import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Leaderboard from "./Leaderboard";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Leaderboard />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

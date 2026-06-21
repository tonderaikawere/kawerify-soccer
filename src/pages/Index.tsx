import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Leaderboard from "./Leaderboard";
import heroImg from "../assets/hero.png"; // hero illustration

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/20 to-secondary/20 text-foreground py-20" style={{ backgroundImage: `url(${heroImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">Welcome to Kawerify Soccer Tournaments</h1>
          <p className="text-lg md:text-xl mb-6 animate-fade-in">Experience real‑time leaderboards, dynamic fixtures, and a vibrant community.</p>
          <a href="/fixtures" className="inline-block bg-primary text-primary-foreground font-semibold py-3 px-6 rounded-md hover:bg-primary/90 transition-colors gradient">Explore Fixtures</a>
        </div>
      </section>
      <Navbar />
      <main className="flex-1">
        <Leaderboard />
      </main>
      <Footer />
    </div>
  );
};

export default Index;


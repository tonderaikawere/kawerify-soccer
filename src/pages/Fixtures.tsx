import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FifaFixtures from "@/components/FifaFixtures";
import { initializeDefaultData } from "@/lib/storage";

const Fixtures = () => {
  useEffect(() => {
    initializeDefaultData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#070b13] transition-colors duration-300">
      <Navbar />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          <FifaFixtures />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Fixtures;

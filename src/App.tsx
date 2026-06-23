import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import GameLoader from "@/components/GameLoader";
import ScrollToTop from "@/components/ScrollToTop";
import FloatingParticles from "@/components/FloatingParticles";
import Index from "./pages/Index";
import Fixtures from "./pages/Fixtures";
import Players from "./pages/Players";
import PlayerDetail from "./pages/PlayerDetail";
import Admin from "./pages/Admin";
import HallOfFame from "./pages/HallOfFame";
import About from "./pages/About";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import CookiePolicy from "./pages/CookiePolicy";
import Disclaimer from "./pages/Disclaimer";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Scroll to top of window on page/route transition
const ScrollToTopOnNavigation = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize app data and check for existing data
    const initializeApp = async () => {
      try {
        // Simulate initialization time for game-like experience
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Initialize default data if needed
        const hasExistingData = localStorage.getItem('tournament_initialized');
        if (!hasExistingData) {
          // Initialize with default data
          localStorage.setItem('tournament_initialized', 'true');
        }
        
        setIsInitialized(true);
      } catch (error) {
        console.error('App initialization error:', error);
        setIsInitialized(true);
      }
    };

    initializeApp();
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (!isInitialized || isLoading) {
    return <GameLoader onComplete={handleLoadingComplete} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTopOnNavigation />
          <div className="relative min-h-screen overflow-hidden">
            {/* Floating Particles Background */}
            <FloatingParticles />
            
            {/* Main Content */}
            <div className="relative z-10">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/fixtures" element={<Fixtures />} />
                <Route path="/players" element={<Players />} />
                <Route path="/player/:playerId" element={<PlayerDetail />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/hall-of-fame" element={<HallOfFame />} />
                <Route path="/about" element={<About />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-conditions" element={<TermsConditions />} />
                <Route path="/cookie-policy" element={<CookiePolicy />} />
                <Route path="/disclaimer" element={<Disclaimer />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            
            {/* Scroll to Top Button */}
            <ScrollToTop />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

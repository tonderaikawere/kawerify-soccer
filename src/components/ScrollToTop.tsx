import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrolled = document.documentElement.scrollTop;
      const maxHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (scrolled / maxHeight) * 100;
      
      setScrollProgress(progress);
      setIsVisible(scrolled > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    // Try multiple methods to ensure scroll to top works
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    
    // Force scroll to absolute top
    setTimeout(() => {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 100);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50 group">
      {/* Progress Ring */}
      <div className="relative">
        <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
          <circle
            cx="32"
            cy="32"
            r="28"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            className="text-gray-300 dark:text-gray-600"
          />
          <circle
            cx="32"
            cy="32"
            r="28"
            stroke="currentColor"
            strokeWidth="4"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 28}`}
            strokeDashoffset={`${2 * Math.PI * 28 * (1 - scrollProgress / 100)}`}
            className="text-blue-500 transition-all duration-300"
          />
        </svg>
        
        {/* Button */}
        <Button
          onClick={scrollToTop}
          className="absolute inset-2 w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-110"
          size="sm"
        >
          
        </Button>
        
        {/* Pulse Effect */}
        <div className="absolute inset-0 rounded-full bg-blue-500 opacity-20 animate-ping group-hover:animate-pulse"></div>
        
        {/* Lightning Effect */}
        <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          
        </div>
      </div>
      
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-black text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        Back to Top ({Math.round(scrollProgress)}%)
        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
      </div>
    </div>
  );
};

export default ScrollToTop;

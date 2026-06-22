import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-[#070b13] px-4 transition-colors duration-300 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      
      <Card className="w-full max-w-md glass-panel border-white/10 shadow-2xl relative z-10 text-center">
        <CardContent className="pt-10 pb-8 space-y-6">
          <div className="text-6xl animate-float">🧭</div>
          
          <div className="space-y-2">
            <h1 className="text-5xl font-black bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent uppercase tracking-wider">
              404
            </h1>
            <p className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-widest">
              Fixture Offside (Page Not Found)
            </p>
            <p className="text-xs text-slate-500 font-semibold leading-relaxed max-w-xs mx-auto">
              The page you are looking for does not exist or has been shifted.
            </p>
          </div>
          
          <div className="pt-2">
            <Button asChild className="rounded-xl font-bold uppercase text-xs tracking-wider bg-gradient-to-r from-primary to-emerald-600 hover:opacity-95 text-white px-6 py-4 shadow-lg shadow-primary/20">
              <a href="/">Return to Stadium</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;

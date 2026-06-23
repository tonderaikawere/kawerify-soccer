import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import { useTheme } from "@/components/ui/ThemeProvider";
import { Menu, X, Sun, Moon, ShieldAlert } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  const { dark, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    { path: "/", label: "Leaderboard" },
    { path: "/fixtures", label: "Fixtures" },
    { path: "/players", label: "Players" },
    { path: "/hall-of-fame", label: "Hall of Fame" },
    { path: "/about", label: "About" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full px-4 py-4 md:px-8">
      <nav className="mx-auto max-w-7xl bg-slate-900/75 dark:bg-slate-950/50 backdrop-blur-md rounded-2xl px-6 py-3.5 shadow-2xl border border-white/10 dark:border-white/5 transition-all duration-300 hover:border-primary/20">
        <div className="flex items-center justify-between">
          {/* Logo & Brand Info */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative overflow-hidden rounded-full p-0.5 bg-gradient-to-tr from-primary to-secondary group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] transition-all duration-300">
              <img src={logo} alt="Kawerify Logo" className="h-9 w-9 rounded-full bg-slate-950" />
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-black tracking-wider text-white group-hover:text-primary transition-colors duration-200 uppercase">
                Kawerify
              </h1>
              <p className="text-[8px] sm:text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mt-0.5">
                Soccer Hub
              </p>
            </div>
          </Link>
          
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Button
                  key={item.path}
                  variant="ghost"
                  size="sm"
                  asChild
                  className={`relative rounded-xl px-4 py-2 text-xs font-black uppercase tracking-wider transition-all duration-200 ${
                    active 
                      ? "text-primary bg-primary/10 dark:bg-primary/20" 
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Link to={item.path}>
                    <span>{item.label}</span>
                    {active && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[2px] rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]" />
                    )}
                  </Link>
                </Button>
              );
            })}
          </div>

          {/* Right Side Options (Theme Toggle + Admin + Mobile Trigger) */}
          <div className="flex items-center space-x-3">
            <Button
              variant={isActive("/admin") ? "default" : "outline"}
              size="sm"
              asChild
              className={`rounded-xl px-5 py-2.5 text-xs font-black uppercase tracking-wider border-white/10 dark:border-white/5 transition-all duration-300 ${
                isActive("/admin")
                  ? "bg-gradient-to-r from-primary to-emerald-600 text-white hover:opacity-95 shadow-lg shadow-primary/20"
                  : "bg-slate-900/40 hover:bg-slate-800 text-slate-200"
              }`}
            >
              <Link to="/admin">
                <span className="flex items-center gap-1.5">
                  <ShieldAlert className="h-3.5 w-3.5" />
                  Admin
                </span>
              </Link>
            </Button>

            {/* Premium Theme Switcher */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="relative p-2.5 rounded-xl border border-white/10 dark:border-white/5 bg-slate-900/40 hover:bg-slate-800 text-slate-200 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <span className="block transform transition-transform duration-500 hover:rotate-45 text-sm">
                {dark ? <Moon className="h-4 w-4 text-slate-350" /> : <Sun className="h-4 w-4 text-amber-400" />}
              </span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl border border-white/10 dark:border-white/5 bg-slate-900/40 hover:bg-slate-800 text-slate-200 transition-all duration-200"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="h-4 w-4 text-white" /> : <Menu className="h-4 w-4 text-white" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/5 mt-3.5 pt-3.5 flex flex-col space-y-2 animate-fade-in-up">
            {navItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-xs font-black uppercase tracking-widest px-4 py-2.5 rounded-xl transition-all duration-200 ${
                    active 
                      ? "text-primary bg-primary/10" 
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;

import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import { useTheme } from "@/components/ui/ThemeProvider";

const Navbar = () => {
  const location = useLocation();
  const { dark, toggleTheme } = useTheme();
  
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
      <nav className="mx-auto max-w-7xl glass-panel rounded-2xl px-6 py-3.5 shadow-xl border border-white/20 dark:border-white/5 transition-all duration-300 hover:border-primary/20">
        <div className="flex items-center justify-between">
          {/* Logo & Brand Info */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative overflow-hidden rounded-full p-0.5 bg-gradient-to-tr from-primary to-secondary group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] transition-all duration-300">
              <img src={logo} alt="Kawerify Logo" className="h-9 w-9 rounded-full bg-background" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-base font-black tracking-wider text-slate-900 dark:text-white group-hover:text-primary transition-colors duration-200 uppercase">
                Kawerify
              </h1>
              <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest leading-none mt-0.5">
                Soccer Hub
              </p>
            </div>
          </Link>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Button
                  key={item.path}
                  variant="ghost"
                  size="sm"
                  asChild
                  className={`relative rounded-xl px-4 py-2 text-xs font-black uppercase tracking-wider transition-all duration-355 ${
                    active 
                      ? "text-primary bg-primary/10 dark:bg-primary/20 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]" 
                      : "text-muted-foreground hover:text-slate-900 dark:hover:text-white hover:bg-muted/50"
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

          {/* Right Side Options (Theme Toggle + Admin) */}
          <div className="flex items-center space-x-3">
            <Button
              variant={isActive("/admin") ? "default" : "outline"}
              size="sm"
              asChild
              className={`rounded-xl px-5 py-2.5 text-xs font-black uppercase tracking-wider border-white/10 dark:border-white/5 transition-all duration-300 ${
                isActive("/admin")
                  ? "bg-gradient-to-r from-primary to-emerald-600 text-white hover:opacity-95 shadow-lg shadow-primary/20"
                  : "hover:bg-muted"
              }`}
            >
              <Link to="/admin">
                <span>Admin</span>
              </Link>
            </Button>

            {/* Premium Theme Switcher */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="relative p-2.5 rounded-xl border border-white/10 dark:border-white/5 bg-background/50 hover:bg-muted hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <span className="block transform transition-transform duration-500 hover:rotate-45 text-sm">
                {dark ? "🌙" : "☀️"}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation (shows compact text buttons) */}
        <div className="flex md:hidden justify-around border-t border-border/40 mt-3.5 pt-3">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg transition-all duration-200 ${
                  active ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

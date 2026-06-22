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
    <header className="sticky top-0 z-50 w-full px-4 py-3 md:px-8">
      <nav className="mx-auto max-w-7xl glass-panel rounded-full px-6 py-2.5 shadow-lg border border-white/20 dark:border-white/5 transition-all duration-300">
        <div className="flex items-center justify-between">
          {/* Logo & Brand Info */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative overflow-hidden rounded-full p-0.5 bg-gradient-to-tr from-primary to-secondary group-hover:scale-105 transition-transform duration-300">
              <img src={logo} alt="Kawerify Logo" className="h-9 w-9 rounded-full bg-background" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-base font-extrabold tracking-tight text-foreground group-hover:text-primary transition-colors duration-200">
                Kawerify Tournaments
              </h1>
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest leading-none mt-0.5">
                Championships
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
                  className={`relative rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                    active 
                      ? "text-primary bg-primary/10 dark:bg-primary/20 hover:bg-primary/20" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/70"
                  }`}
                >
                  <Link to={item.path}>
                    <span>{item.label}</span>
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
              className={`rounded-full px-4 border-white/20 dark:border-white/5 transition-all duration-300 ${
                isActive("/admin")
                  ? "bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/95 hover:to-emerald-600/95 shadow-md shadow-primary/25"
                  : "hover:bg-muted"
              }`}
            >
              <Link to="/admin">
                <span className="hidden xs:inline">Admin</span>
              </Link>
            </Button>

            {/* Premium Theme Switcher */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="relative p-2.5 rounded-full border border-white/20 dark:border-white/5 bg-background/50 hover:bg-muted hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <span className="block transform transition-transform duration-500 hover:rotate-45">
                {dark ? "🌙" : "☀️"}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation (shows compact text buttons) */}
        <div className="flex md:hidden justify-around border-t border-border/40 mt-2.5 pt-2">
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`text-[11px] font-bold px-2.5 py-1.5 rounded-full transition-all duration-200 ${
                  active ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
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

import { Trophy, Users, Calendar, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl border-b border-border sticky top-0 z-50" style={{ backdropFilter: 'blur(12px)' }}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Kawerify Logo" className="h-8 w-8" />
            <div>
              <h1 className="text-xl font-bold text-foreground">Kawerify Tech Tournaments</h1>
              <p className="text-xs text-muted-foreground">Professional Gaming Platform</p>
            </div>
          </Link>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={isActive("/") ? "default" : "ghost"}
              size="sm"
              asChild
            >
              <Link to="/">
                <Trophy className="h-4 w-4 mr-2" />
                Leaderboard
              </Link>
            </Button>
            
            <Button
              variant={isActive("/fixtures") ? "default" : "ghost"}
              size="sm"
              asChild
            >
              <Link to="/fixtures">
                <Calendar className="h-4 w-4 mr-2" />
                Fixtures
              </Link>
            </Button>
            
            <Button
              variant={isActive("/players") ? "default" : "ghost"}
              size="sm"
              asChild
            >
              <Link to="/players">
                <Users className="h-4 w-4 mr-2" />
                Players
              </Link>
            </Button>
            
            <Button
              variant={isActive("/admin") ? "secondary" : "ghost"}
              size="sm"
              asChild
            >
              <Link to="/admin">
                <Settings className="h-4 w-4 mr-2" />
                Admin
              </Link>
            </Button>
          </div>
          {/* Theme toggle button */}
          <button onClick={useTheme().toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            {useTheme().dark ? "🌙" : "☀️"}
          </button>
        </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

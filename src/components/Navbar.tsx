import { Trophy, Users, Calendar, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Trophy className="h-8 w-8 text-primary" />
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

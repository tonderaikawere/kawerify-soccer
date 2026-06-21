import { Mail, MapPin, Phone, Shield, FileText, Trophy, Users, Calendar, Award } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-blue-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Trophy className="h-6 w-6 mr-2 text-yellow-400" />
              Kawerify Tech Tournaments
            </h3>
            <p className="text-gray-300 mb-4">
              Professional FIFA-style gaming tournament platform for soccer enthusiasts worldwide. 
              Experience the thrill of competitive gaming with our advanced tournament management system.
            </p>
            <div className="flex space-x-4">
              <div className="animate-bounce">
                <div className="h-6 w-6 rounded-full bg-white border border-black relative">
                  <div className="absolute inset-1 rounded-full border border-black"></div>
                </div>
              </div>
              <div className="animate-bounce" style={{ animationDelay: '0.2s' }}>
                <div className="h-6 w-6 rounded-full bg-white border border-black relative">
                  <div className="absolute inset-1 rounded-full border border-black"></div>
                </div>
              </div>
              <div className="animate-bounce" style={{ animationDelay: '0.4s' }}>
                <div className="h-6 w-6 rounded-full bg-white border border-black relative">
                  <div className="absolute inset-1 rounded-full border border-black"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <Phone className="h-5 w-5 mr-2 text-green-400" />
              Contact Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-start text-sm text-gray-300">
                <MapPin className="h-4 w-4 mr-2 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p>KoMthombeni, Plot 2 Grampsway</p>
                  <p>Rangemore, Bulawayo</p>
                  <p>Zimbabwe</p>
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Phone className="h-4 w-4 mr-2 text-green-400" />
                <a href="tel:+263716264988" className="hover:text-white transition-colors">
                  +263 71 626 4988
                </a>
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Mail className="h-4 w-4 mr-2 text-red-400" />
                <a href="mailto:info@kawerifytech.com" className="hover:text-white transition-colors">
                  info@kawerifytech.com
                </a>
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <Users className="h-5 w-5 mr-2 text-purple-400" />
              Quick Links
            </h3>
            <div className="space-y-2">
              <Link to="/" className="block text-sm text-gray-300 hover:text-white transition-colors">
                <Trophy className="h-3 w-3 mr-2 inline" />
                Leaderboard
              </Link>
              <Link to="/fixtures" className="block text-sm text-gray-300 hover:text-white transition-colors">
                <Calendar className="h-3 w-3 mr-2 inline" />
                Fixtures
              </Link>
              <Link to="/players" className="block text-sm text-gray-300 hover:text-white transition-colors">
                <Users className="h-3 w-3 mr-2 inline" />
                Players
              </Link>
              <Link to="/hall-of-fame" className="block text-sm text-gray-300 hover:text-white transition-colors">
                <Award className="h-3 w-3 mr-2 inline" />
                Hall of Fame
              </Link>
              <Link to="/about" className="block text-sm text-gray-300 hover:text-white transition-colors">
                <FileText className="h-3 w-3 mr-2 inline" />
                About Us
              </Link>
            </div>
          </div>
          
          {/* Legal & Policies */}
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <Shield className="h-5 w-5 mr-2 text-yellow-400" />
              Legal & Policies
            </h3>
            <div className="space-y-2">
              <Link to="/privacy-policy" className="block text-sm text-gray-300 hover:text-white transition-colors">
                <Shield className="h-3 w-3 mr-2 inline" />
                Privacy Policy
              </Link>
              <Link to="/terms-conditions" className="block text-sm text-gray-300 hover:text-white transition-colors">
                <FileText className="h-3 w-3 mr-2 inline" />
                Terms & Conditions
              </Link>
              <Link to="/cookie-policy" className="block text-sm text-gray-300 hover:text-white transition-colors">
                <FileText className="h-3 w-3 mr-2 inline" />
                Cookie Policy
              </Link>
              <Link to="/disclaimer" className="block text-sm text-gray-300 hover:text-white transition-colors">
                <FileText className="h-3 w-3 mr-2 inline" />
                Disclaimer
              </Link>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-sm text-gray-400">
                &copy; {new Date().getFullYear()} Kawerify Tech Tournaments. All rights reserved.
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Professional FIFA-style tournament management platform • Powered by Kawerify Tech
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-xs text-gray-500">
                Made with ❤️ in Zimbabwe
              </div>
              <div className="flex space-x-2">
                <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
                <div className="h-2 w-2 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <div className="h-2 w-2 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

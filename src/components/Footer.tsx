import { Mail, MapPin, Phone, Shield, FileText, Trophy, Users, Calendar, Award } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative mt-auto overflow-hidden bg-slate-950 border-t border-slate-900 text-slate-200">
      {/* Decorative backdrop glow */}
      <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-primary/10 blur-[120px]" />
      <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-secondary/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 md:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="flex items-center text-xl font-black tracking-tight text-white">
              <Trophy className="mr-2 h-6 w-6 text-amber-400 animate-float" />
              <span>Kawerify Tournaments</span>
            </h3>
            <p className="text-sm leading-relaxed text-slate-400">
              An elite gaming hub hosting premier, real-time FIFA & soccer tournaments. Join the community, follow match fixtures, and track the elite leaderboard.
            </p>
            <div className="flex space-x-3 pt-2">
              <div className="h-6 w-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center hover:border-primary transition-all duration-300">
                <span className="text-[10px] font-bold text-slate-300 hover:text-white">🎮</span>
              </div>
              <div className="h-6 w-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center hover:border-primary transition-all duration-300">
                <span className="text-[10px] font-bold text-slate-300 hover:text-white">⚽</span>
              </div>
              <div className="h-6 w-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center hover:border-primary transition-all duration-300">
                <span className="text-[10px] font-bold text-slate-300 hover:text-white">✨</span>
              </div>
            </div>
          </div>
          
          {/* Contact Column */}
          <div className="space-y-4">
            <h3 className="flex items-center text-base font-bold text-white uppercase tracking-wider">
              <Phone className="mr-2 h-4 w-4 text-emerald-400" />
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start">
                <MapPin className="mr-2.5 h-4 w-4 text-slate-500 mt-0.5 flex-shrink-0" />
                <span>
                  KoMthombeni, Plot 2 Grampsway<br />
                  Rangemore, Bulawayo<br />
                  Zimbabwe
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="mr-2.5 h-4 w-4 text-slate-500" />
                <a href="tel:+263716264988" className="hover:text-white transition-colors duration-200">
                  +263 71 626 4988
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2.5 h-4 w-4 text-slate-500" />
                <a href="mailto:info@kawerifytech.com" className="hover:text-white transition-colors duration-200">
                  info@kawerifytech.com
                </a>
              </li>
            </ul>
          </div>
          
          {/* Quick Links Column */}
          <div className="space-y-4">
            <h3 className="flex items-center text-base font-bold text-white uppercase tracking-wider">
              <Users className="mr-2 h-4 w-4 text-blue-400" />
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/" className="group flex items-center hover:text-white transition-colors duration-200">
                  <Trophy className="mr-2 h-3.5 w-3.5 text-slate-600 group-hover:text-amber-400 transition-colors" />
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link to="/fixtures" className="group flex items-center hover:text-white transition-colors duration-200">
                  <Calendar className="mr-2 h-3.5 w-3.5 text-slate-600 group-hover:text-blue-400 transition-colors" />
                  Fixtures
                </Link>
              </li>
              <li>
                <Link to="/players" className="group flex items-center hover:text-white transition-colors duration-200">
                  <Users className="mr-2 h-3.5 w-3.5 text-slate-600 group-hover:text-emerald-400 transition-colors" />
                  Players
                </Link>
              </li>
              <li>
                <Link to="/hall-of-fame" className="group flex items-center hover:text-white transition-colors duration-200">
                  <Award className="mr-2 h-3.5 w-3.5 text-slate-600 group-hover:text-amber-400 transition-colors" />
                  Hall of Fame
                </Link>
              </li>
              <li>
                <Link to="/about" className="group flex items-center hover:text-white transition-colors duration-200">
                  <FileText className="mr-2 h-3.5 w-3.5 text-slate-600 group-hover:text-indigo-400 transition-colors" />
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal Column */}
          <div className="space-y-4">
            <h3 className="flex items-center text-base font-bold text-white uppercase tracking-wider">
              <Shield className="mr-2 h-4 w-4 text-indigo-400" />
              Legal Policies
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/privacy-policy" className="group flex items-center hover:text-white transition-colors duration-200">
                  <Shield className="mr-2 h-3.5 w-3.5 text-slate-600 group-hover:text-indigo-400 transition-colors" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="group flex items-center hover:text-white transition-colors duration-200">
                  <FileText className="mr-2 h-3.5 w-3.5 text-slate-600 group-hover:text-indigo-400 transition-colors" />
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/cookie-policy" className="group flex items-center hover:text-white transition-colors duration-200">
                  <FileText className="mr-2 h-3.5 w-3.5 text-slate-600 group-hover:text-indigo-400 transition-colors" />
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="group flex items-center hover:text-white transition-colors duration-200">
                  <FileText className="mr-2 h-3.5 w-3.5 text-slate-600 group-hover:text-indigo-400 transition-colors" />
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-12 border-t border-slate-900 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <div className="text-center sm:text-left space-y-1">
            <p>&copy; {new Date().getFullYear()} Kawerify Tournaments. All rights reserved.</p>
            <p>Made with passion for competitive soccer gaming.</p>
          </div>
          
          <div className="mt-4 sm:mt-0 flex items-center space-x-3">
            <span>Made with ❤️ in Zimbabwe</span>
            <div className="flex space-x-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse-glow" />
              <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse-glow" style={{ animationDelay: '0.4s' }} />
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse-glow" style={{ animationDelay: '0.8s' }} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

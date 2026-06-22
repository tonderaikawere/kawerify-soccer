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
            <h3 className="text-lg font-black tracking-tight text-white uppercase">
              Kawerify Tournaments
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
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="leading-relaxed">
                KoMthombeni, Plot 2 Grampsway<br />
                Rangemore, Bulawayo<br />
                Zimbabwe
              </li>
              <li>
                <a href="tel:+263716264988" className="hover:text-white transition-colors duration-200">
                  +263 71 626 4988
                </a>
              </li>
              <li>
                <a href="mailto:info@kawerifytech.com" className="hover:text-white transition-colors duration-200">
                  info@kawerifytech.com
                </a>
              </li>
            </ul>
          </div>
          
          {/* Quick Links Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/" className="hover:text-white transition-colors duration-200">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link to="/fixtures" className="hover:text-white transition-colors duration-200">
                  Fixtures
                </Link>
              </li>
              <li>
                <Link to="/players" className="hover:text-white transition-colors duration-200">
                  Players
                </Link>
              </li>
              <li>
                <Link to="/hall-of-fame" className="hover:text-white transition-colors duration-200">
                  Hall of Fame
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors duration-200">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal Column */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Legal Policies
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/privacy-policy" className="hover:text-white transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="hover:text-white transition-colors duration-200">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/cookie-policy" className="hover:text-white transition-colors duration-200">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="hover:text-white transition-colors duration-200">
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
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" style={{ animationDelay: '0.4s' }} />
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" style={{ animationDelay: '0.8s' }} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative mt-auto overflow-hidden bg-slate-100 dark:bg-[#05080e] border-t border-slate-200 dark:border-white/5 text-slate-500 dark:text-slate-400">
      {/* Decorative backdrop glow */}
      <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16 md:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="text-base font-black tracking-widest text-slate-900 dark:text-white uppercase">
              Kawerify Tech Cup
            </h3>
            <p className="text-xs leading-relaxed text-slate-650 dark:text-slate-400 font-medium">
              An elite competitive gaming hub hosting premier, real-time FIFA & soccer tournaments. Join our active community, follow match fixtures, and track the live leaderboard.
            </p>
            <div className="flex space-x-3 pt-2">
              <div className="h-8 w-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 flex items-center justify-center hover:border-primary/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 cursor-pointer shadow-sm dark:shadow-none">
                <span className="text-xs">🎮</span>
              </div>
              <div className="h-8 w-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 flex items-center justify-center hover:border-primary/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 cursor-pointer shadow-sm dark:shadow-none">
                <span className="text-xs">⚽</span>
              </div>
              <div className="h-8 w-8 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 flex items-center justify-center hover:border-primary/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 cursor-pointer shadow-sm dark:shadow-none">
                <span className="text-xs">🏆</span>
              </div>
            </div>
          </div>
          
          {/* Contact Column */}
          <div className="space-y-4">
            <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest">
              Contact HQ
            </h3>
            <ul className="space-y-3 text-xs text-slate-650 dark:text-slate-400 font-semibold">
              <li className="leading-relaxed">
                KoMthombeni, Plot 2 Grampsway<br />
                Rangemore, Bulawayo<br />
                Zimbabwe
              </li>
              <li>
                <a href="tel:+263716264988" className="hover:text-slate-900 dark:hover:text-white transition-colors duration-200">
                  +263 71 626 4988
                </a>
              </li>
              <li>
                <a href="mailto:info@kawerifytech.com" className="hover:text-slate-900 dark:hover:text-white transition-colors duration-200">
                  info@kawerifytech.com
                </a>
              </li>
            </ul>
          </div>
          
          {/* Quick Links Column */}
          <div className="space-y-4">
            <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-650 dark:text-slate-400 font-semibold">
              <li>
                <Link to="/" className="hover:text-slate-900 dark:hover:text-white transition-colors duration-200">
                  Rankings Leaderboard
                </Link>
              </li>
              <li>
                <Link to="/fixtures" className="hover:text-slate-900 dark:hover:text-white transition-colors duration-200">
                  Match Fixtures
                </Link>
              </li>
              <li>
                <Link to="/players" className="hover:text-slate-900 dark:hover:text-white transition-colors duration-200">
                  Competitors Catalog
                </Link>
              </li>
              <li>
                <Link to="/hall-of-fame" className="hover:text-slate-900 dark:hover:text-white transition-colors duration-200">
                  Trophy Cabinet
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-slate-900 dark:hover:text-white transition-colors duration-200">
                  About Tournament
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Legal Column */}
          <div className="space-y-4">
            <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest">
              Legal Info
            </h3>
            <ul className="space-y-2.5 text-xs text-slate-650 dark:text-slate-400 font-semibold">
              <li>
                <Link to="/privacy-policy" className="hover:text-slate-900 dark:hover:text-white transition-colors duration-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="hover:text-slate-900 dark:hover:text-white transition-colors duration-200">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/cookie-policy" className="hover:text-slate-900 dark:hover:text-white transition-colors duration-200">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="hover:text-slate-900 dark:hover:text-white transition-colors duration-200">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-16 border-t border-slate-200 dark:border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-semibold text-slate-500">
          <div className="text-center sm:text-left space-y-1">
            <p>&copy; {new Date().getFullYear()} Kawerify Tournaments. All rights reserved.</p>
            <p className="text-slate-500 dark:text-slate-600">Built for authentic competitive console soccer gaming championships.</p>
          </div>
          
          <div className="mt-4 sm:mt-0 flex items-center space-x-3 bg-slate-200/50 dark:bg-slate-950/60 border border-slate-300 dark:border-white/5 px-4 py-2 rounded-full text-slate-600 dark:text-slate-400">
            <span>Server Active</span>
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

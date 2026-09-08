import React, { useState, useEffect } from 'react';

export default function Navbar({ onOpenBooking }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    const updateClock = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services', icon: 'ri-radar-line' },
    { name: 'Packages', href: '#packages', icon: 'ri-price-tag-3-line' },
    { name: 'Reels', href: '#videos', icon: 'ri-movie-2-line' },
    { name: 'Gallery', href: '#photography', icon: 'ri-camera-lens-line' },
    { name: 'Fleet Gear', href: '#equipment', icon: 'ri-flight-takeoff-line' },
    { name: 'CAA Specs', href: '#safety', icon: 'ri-shield-check-line' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'py-3 bg-obsidian-950/80 backdrop-blur-2xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.8)]' 
        : 'py-5 bg-gradient-to-b from-obsidian-950/90 to-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand & Telemetry Badge */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-xl overflow-hidden border border-blue-500/40 p-0.5 bg-obsidian-900 group-hover:border-blue-400 transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              <img 
                src="/logo.jpeg" 
                alt="UK Drone Pilot Logo" 
                className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<div class="w-full h-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-extrabold text-xs">AERO</div>';
                }}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-xl text-white tracking-wider group-hover:text-blue-400 transition-colors">
                  AEROVIEW<span className="text-blue-500 text-glow-blue">.UK</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-blue-500/10 text-blue-400 border border-blue-500/30 tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-ping mr-1.5"></span>
                  CAA GVC LICENSED
                </span>
              </div>
              <p className="text-[10px] font-mono text-slate-400 tracking-wider flex items-center gap-1.5">
                <span className="text-cyan-400">NE3 BASE</span>
                <span>•</span>
                <span>{currentTime || '00:00:00'} UTC</span>
              </p>
            </div>
          </a>

          {/* Desktop Floating Navigation Dock */}
          <nav className="hidden lg:flex items-center gap-1 bg-obsidian-900/90 px-4 py-1.5 rounded-full border border-white/15 backdrop-blur-xl shadow-inner">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-200 hover:text-white hover:bg-blue-600/30 rounded-full transition-all duration-300"
              >
                <i className={`${link.icon} text-blue-400 text-sm`}></i>
                <span>{link.name}</span>
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="https://wa.me/447432266867?text=Hi!%20I'd%20like%20to%20inquire%20about%20drone/videography%20booking%20in%20Newcastle/NE3."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold text-slate-200 bg-obsidian-850 hover:bg-obsidian-800 border border-white/15 hover:border-blue-500/50 hover:text-blue-300 transition-all duration-300 shadow-lg"
            >
              <i className="ri-whatsapp-line text-emerald-400 text-base"></i>
              <span>WhatsApp</span>
            </a>

            <button
              onClick={() => onOpenBooking()}
              className="btn-shimmer flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-[0_0_25px_rgba(37,99,235,0.45)] hover:shadow-[0_0_35px_rgba(37,99,235,0.65)] transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              <i className="ri-calendar-event-line text-sm"></i>
              <span>Book Flight</span>
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => onOpenBooking()}
              className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-bold text-xs shadow-md"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-300 hover:text-white bg-obsidian-850 border border-white/15"
              aria-label="Toggle Navigation"
            >
              <i className={`${mobileMenuOpen ? 'ri-close-line' : 'ri-menu-4-line'} text-xl`}></i>
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="sm:hidden glass-panel-cinematic border-b border-blue-500/20 mt-3 px-4 py-5 mx-4 rounded-2xl shadow-2xl animate-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-semibold">
              <span className="flex items-center gap-2">
                <i className="ri-shield-check-line text-base text-blue-400"></i>
                CAA GVC CERTIFIED OPERATOR
              </span>
              <span className="text-[10px] bg-blue-500/20 px-2 py-0.5 rounded text-blue-300">ACTIVE</span>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-100 hover:text-blue-400 hover:bg-white/5 rounded-xl transition-all"
              >
                <i className={`${link.icon} text-blue-400 text-lg`}></i>
                <span>{link.name}</span>
              </a>
            ))}

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
              <a
                href="https://wa.me/447432266867?text=Hi!%20I'd%20like%20to%20inquire%20about%20drone/videography%20booking%20in%20Newcastle/NE3."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-mono font-bold text-slate-100 bg-obsidian-850 border border-white/15"
              >
                <i className="ri-whatsapp-line text-base text-emerald-400"></i>
                WhatsApp Direct (+44 7432266867)
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="btn-shimmer w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg shadow-blue-600/40"
              >
                <i className="ri-calendar-event-line text-base"></i>
                Book Flight Mission
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}


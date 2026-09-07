import React, { useState, useEffect } from 'react';
import { ShieldCheck, Phone, Menu, X, Camera, Send, Calendar } from 'lucide-react';

export default function Navbar({ onOpenBooking }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'What We Offer', href: '#services' },
    { name: 'Videography Packages', href: '#packages' },
    { name: 'Photography', href: '#photography' },
    { name: 'Video Showcase', href: '#videos' },
    { name: 'Drone Specs', href: '#equipment' },
    { name: 'CAA Safety', href: '#safety' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'glass-panel shadow-2xl py-3 border-b border-slate-800/80' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo & Name */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-11 h-11 rounded-xl overflow-hidden border-2 border-gold-500/40 p-0.5 bg-obsidian-900 group-hover:border-gold-400 transition-all shadow-lg shadow-gold-500/10">
              <img 
                src="/logo.jpeg" 
                alt="UK Drone Pilot Logo" 
                className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<div class="w-full h-full bg-gold-500/20 flex items-center justify-center text-gold-400 font-bold">DV</div>';
                }}
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-extrabold text-xl text-white tracking-tight group-hover:text-gold-400 transition-colors">
                  AEROVIEW<span className="text-gold-500">.UK</span>
                </span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping mr-1"></span>
                  CAA REGISTERED
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Newcastle • Sunderland • Durham</p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-obsidian-900/80 px-4 py-1.5 rounded-full border border-slate-800/80 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-gold-400 hover:bg-white/5 rounded-full transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="https://wa.me/447432266867?text=Hi!%20I'd%20like%20to%20inquire%20about%20drone/videography%20booking%20in%20Newcastle/NE3."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-200 bg-obsidian-850 hover:bg-obsidian-800 border border-slate-700/60 hover:border-gold-500/40 transition-all"
            >
              <Send className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={() => onOpenBooking()}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-obsidian-950 bg-gold-gradient hover:opacity-95 shadow-md shadow-gold-500/20 transition-all hover:scale-105 active:scale-95"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => onOpenBooking()}
              className="p-2 rounded-lg bg-gold-500 text-obsidian-950 font-bold text-xs"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white bg-obsidian-850 border border-slate-800"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden glass-panel border-b border-slate-800 mt-2 px-4 py-5 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                CAA Registered Pilot (Flyer ID & Operator ID)
              </span>
            </div>

            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-200 hover:text-gold-400 hover:bg-slate-800/40 rounded-lg transition-colors"
              >
                {link.name}
              </a>
            ))}

            <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
              <a
                href="https://wa.me/447432266867?text=Hi!%20I'd%20like%20to%20inquire%20about%20drone/videography%20booking%20in%20Newcastle/NE3."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-100 bg-obsidian-800 border border-slate-700"
              >
                <Send className="w-4 h-4 text-emerald-400" />
                Chat on WhatsApp (+44 7432266867)
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-obsidian-950 bg-gold-gradient shadow-lg shadow-gold-500/20"
              >
                <Calendar className="w-4 h-4" />
                Book Session (Min. 1 Week Notice)
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

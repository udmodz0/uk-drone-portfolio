import React, { useState, useEffect } from 'react';

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
    { name: 'Services', href: '#services' },
    { name: 'Packages', href: '#packages' },
    { name: 'Estimator', href: '#quote-calculator' },
    { name: 'Compare', href: '#comparison' },
    { name: 'Reels', href: '#videos' },
    { name: 'Gallery', href: '#photography' },
    { name: 'Fleet', href: '#equipment' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-3 bg-[#0B0D11]/90 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_8px_30px_rgba(0,0,0,0.5)]' 
          : 'py-4 sm:py-5 bg-gradient-to-b from-[#0B0D11]/90 via-[#0B0D11]/40 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Left: Brand Identity */}
          <a href="#" className="flex items-center gap-2.5 sm:gap-3 group">
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-white/20 p-0.5 bg-black/40 group-hover:border-white/40 transition-colors shadow-sm">
              <img 
                src="/logo.jpeg" 
                alt="AirVibe UK" 
                className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<div class="w-full h-full bg-zinc-900 flex items-center justify-center text-white font-bold text-[10px] tracking-wider">AV</div>';
                }}
              />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display font-bold text-base sm:text-lg text-white tracking-tight group-hover:text-white/90 transition-colors">
                AIRVIBE<span className="text-zinc-400 font-light">.UK</span>
              </span>
              <span className="hidden md:inline-block text-[10px] uppercase tracking-widest text-zinc-400 font-mono pl-2 border-l border-white/10">
                UK CAA PILOT
              </span>
            </div>
          </a>

          {/* Center: Understated Creative Studio Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs tracking-wider uppercase font-medium text-zinc-300 hover:text-white nav-link-understated transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right: Actions with Exact Liquid Pill Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="https://wa.me/447432266867?text=Hi!%20I'd%20like%20to%20inquire%20about%20drone/videography%20booking%20in%20Newcastle/NE3."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-liquid px-4 py-2 text-xs font-medium text-zinc-200 hover:text-white flex items-center gap-1.5"
            >
              <i className="ri-whatsapp-line text-sm text-emerald-400"></i>
              <span>WhatsApp</span>
            </a>

            <button
              onClick={() => onOpenBooking()}
              className="btn-liquid-primary px-5 py-2.5 text-xs font-semibold tracking-wide flex items-center gap-2"
            >
              <span>Book a Flight</span>
              <i className="ri-arrow-right-line text-xs"></i>
            </button>
          </div>

          {/* Mobile Menu Trigger & Fast Book */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => onOpenBooking()}
              className="btn-liquid-primary px-3.5 py-1.5 text-xs font-semibold"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="btn-liquid w-9 h-9 p-0 flex items-center justify-center text-zinc-200"
              aria-label="Toggle Navigation"
            >
              <i className={`${mobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'} text-base`}></i>
            </button>
          </div>

        </div>
      </div>

      {/* Refined Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#0F1217]/95 backdrop-blur-2xl border-b border-white/10 px-5 py-6 mt-3 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-3">
            <div className="text-[10px] uppercase tracking-widest text-zinc-400 font-mono pb-2 border-b border-white/10">
              CAA REGISTERED OPERATOR • NEWCASTLE • NE3
            </div>

            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-zinc-200 hover:text-white py-2 flex items-center justify-between border-b border-white/5"
              >
                <span>{link.name}</span>
                <i className="ri-arrow-right-s-line text-zinc-400"></i>
              </a>
            ))}

            <div className="pt-4 flex flex-col gap-3">
              <a
                href="https://wa.me/447432266867?text=Hi!%20I'd%20like%20to%20inquire%20about%20drone/videography%20booking%20in%20Newcastle/NE3."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-liquid-emerald w-full py-3 text-xs font-medium flex items-center justify-center gap-2"
              >
                <i className="ri-whatsapp-line text-emerald-300 text-sm"></i>
                <span>Direct WhatsApp Inquiries</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="btn-liquid-primary w-full py-3 text-xs font-semibold flex items-center justify-center gap-2"
              >
                <span>Book a Flight</span>
                <i className="ri-arrow-right-line text-xs"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

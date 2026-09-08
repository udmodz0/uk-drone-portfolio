import React, { useState, useEffect } from 'react';

export default function FloatingActionDock({ onOpenBooking, whatsappNumber }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-lg animate-in slide-in-from-bottom-6 duration-500">
      <div className="glass-panel-cinematic p-2.5 rounded-2xl border border-white/20 shadow-[0_15px_40px_rgba(0,0,0,0.8)] flex items-center justify-between gap-2 backdrop-blur-2xl">
        
        {/* CAA Status Pill */}
        <div className="hidden xs:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-obsidian-950/90 border border-blue-500/30 text-blue-400 font-mono text-[10px] font-bold">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
          <span>CAA ACTIVE</span>
        </div>

        {/* WhatsApp Action */}
        <a
          href={`https://wa.me/447432266867?text=Hi!%20I'd%20like%20to%20inquire%20about%20a%20drone%20booking.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold text-slate-100 bg-obsidian-900 hover:bg-obsidian-850 border border-white/15 hover:border-emerald-400/50 transition-all shadow-md"
        >
          <i className="ri-whatsapp-line text-base text-emerald-400"></i>
          <span className="hidden sm:inline">WhatsApp</span>
          <span className="sm:hidden">Chat</span>
        </a>

        {/* Primary Book Mission Button */}
        <button
          onClick={onOpenBooking}
          className="btn-shimmer flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-[0_0_20px_rgba(37,99,235,0.45)] hover:shadow-[0_0_30px_rgba(37,99,235,0.65)] transition-all transform hover:scale-105 active:scale-95 border border-blue-400/30"
        >
          <i className="ri-calendar-event-line text-sm"></i>
          <span>Book Flight</span>
        </button>

        {/* Scroll Top Button */}
        <button
          onClick={scrollToTop}
          className="w-10 h-10 rounded-xl bg-obsidian-900 border border-white/15 text-slate-300 hover:text-white hover:border-blue-400 flex items-center justify-center transition-all flex-shrink-0 shadow-md"
          aria-label="Scroll to top"
        >
          <i className="ri-arrow-up-line text-lg text-blue-400"></i>
        </button>

      </div>
    </div>
  );
}


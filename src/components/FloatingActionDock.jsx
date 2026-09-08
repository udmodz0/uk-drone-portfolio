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
      <div className="glass-panel-cinematic p-2.5 rounded-2xl border border-slate-200/80 shadow-lg flex items-center justify-between gap-2 backdrop-blur-2xl bg-white/85">
        
        {/* CAA Status Pill */}
        <div className="hidden xs:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 font-mono text-[10px] font-bold">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping"></span>
          <span>CAA ACTIVE</span>
        </div>

        {/* WhatsApp Action */}
        <a
          href={`https://wa.me/447432266867?text=Hi!%20I'd%20like%20to%20inquire%20about%20a%20drone%20booking.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 hover:border-emerald-500 transition-all shadow-sm"
        >
          <i className="ri-whatsapp-line text-base text-emerald-600"></i>
          <span className="hidden sm:inline">WhatsApp</span>
          <span className="sm:hidden">Chat</span>
        </a>

        {/* Primary Book Mission Button */}
        <button
          onClick={onOpenBooking}
          className="btn-shimmer flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 border border-blue-500/30"
        >
          <i className="ri-calendar-event-line text-sm"></i>
          <span>Book Flight</span>
        </button>

        {/* Scroll Top Button */}
        <button
          onClick={scrollToTop}
          className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-400 flex items-center justify-center transition-all flex-shrink-0 shadow-sm"
          aria-label="Scroll to top"
        >
          <i className="ri-arrow-up-line text-lg text-blue-600"></i>
        </button>

      </div>
    </div>
  );
}


import React, { useState, useEffect } from 'react';

export default function FloatingActionDock({ onOpenBooking, whatsappNumber }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.85);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-sm animate-in slide-in-from-bottom-4 duration-300">
      <div className="p-1.5 rounded-full border border-white/20 shadow-[0_12px_36px_rgba(0,0,0,0.6)] flex items-center justify-between gap-2 backdrop-blur-2xl bg-[#0F1217]/85">
        
        {/* WhatsApp Action */}
        <a
          href={`https://wa.me/${whatsappNumber || '447432266867'}?text=Hi!%20I'd%20like%20to%20inquire%20about%20a%20drone%20booking.`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-liquid flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3.5 text-xs font-medium text-white"
        >
          <i className="ri-whatsapp-line text-sm text-emerald-400"></i>
          <span>WhatsApp</span>
        </a>

        {/* Primary Book Mission Button */}
        <button
          onClick={onOpenBooking}
          className="btn-liquid-primary flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 text-xs font-semibold"
        >
          <span>Book Flight</span>
          <i className="ri-arrow-right-line text-xs"></i>
        </button>

        {/* Scroll Top Button */}
        <button
          onClick={scrollToTop}
          className="btn-liquid w-9 h-9 rounded-full flex items-center justify-center text-zinc-300 hover:text-white flex-shrink-0"
          aria-label="Scroll to top"
        >
          <i className="ri-arrow-up-line text-sm"></i>
        </button>

      </div>
    </div>
  );
}

import React from 'react';

export default function MarqueeTicker() {
  const tickerItems = [
    'UK CAA Registered & Certified Operator',
    'DJI Air 3S 50MP Dual-Camera Aerial Stills',
    'Cinematic 4K 60fps 10-Bit D-Log Video',
    'Newcastle (NE3 Base) • Sunderland • Durham Coverage',
    'Advance 1-Week Booking for Airspace Clearance',
    'Full Commercial Public Liability Assurance',
    'Professional Post-Production & Color Grading',
  ];

  return (
    <div className="w-full bg-[#0E1117] border-y border-white/[0.08] overflow-hidden py-3.5 relative z-20">
      <div className="animate-editorial-marquee flex items-center gap-8 text-xs tracking-wider uppercase font-medium text-zinc-300 whitespace-nowrap select-none font-mono">
        
        {/* First Loop */}
        <div className="flex items-center gap-8">
          {tickerItems.map((item, idx) => (
            <div key={`loop1-${idx}`} className="flex items-center gap-8">
              <span className="hover:text-white transition-colors">{item}</span>
              <span className="text-zinc-600">/</span>
            </div>
          ))}
        </div>

        {/* Duplicate Loop */}
        <div className="flex items-center gap-8">
          {tickerItems.map((item, idx) => (
            <div key={`loop2-${idx}`} className="flex items-center gap-8">
              <span className="hover:text-white transition-colors">{item}</span>
              <span className="text-zinc-600">/</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}



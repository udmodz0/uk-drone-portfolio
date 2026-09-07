import React from 'react';

export default function MarqueeTicker() {
  const tickerItems = [
    { text: 'UK CAA GVC & A2 COFC LICENSED OPERATOR', icon: 'ri-shield-check-fill', color: 'text-emerald-400' },
    { text: '50MP DUAL-CAMERA AERIAL STILLS (DJI AIR 3S)', icon: 'ri-camera-3-fill', color: 'text-gold-400' },
    { text: 'CINEMATIC 4K 60FPS 10-BIT D-LOG HIGHLIGHT REELS', icon: 'ri-movie-2-fill', color: 'text-cyber-400' },
    { text: 'REGIONAL BASE: NEWCASTLE (NE3) • SUNDERLAND • DURHAM', icon: 'ri-map-pin-2-fill', color: 'text-gold-400' },
    { text: 'PLEASE BOOK 1 WEEK IN ADVANCE FOR CAA PERMIT CLEARANCE', icon: 'ri-time-fill', color: 'text-amber-400' },
    { text: '$5M COMMERCIAL PUBLIC LIABILITY INDEMNITY', icon: 'ri-lock-2-fill', color: 'text-emerald-400' },
  ];

  return (
    <div className="w-full bg-obsidian-950 border-y border-white/10 overflow-hidden py-3 relative z-20 shadow-lg">
      <div className="animate-marquee flex items-center gap-8 font-mono text-xs font-bold whitespace-nowrap select-none">
        
        {/* First Loop */}
        <div className="flex items-center gap-8">
          {tickerItems.map((item, idx) => (
            <div key={`loop1-${idx}`} className="flex items-center gap-3 bg-obsidian-900 px-4 py-1.5 rounded-full border border-white/10 shadow-sm">
              <i className={`${item.icon} ${item.color} text-sm`}></i>
              <span className="text-slate-200 tracking-wider">{item.text}</span>
              <span className="text-white/20 mx-1">•</span>
            </div>
          ))}
        </div>

        {/* Duplicate Second Loop for Seamless Animation */}
        <div className="flex items-center gap-8">
          {tickerItems.map((item, idx) => (
            <div key={`loop2-${idx}`} className="flex items-center gap-3 bg-obsidian-900 px-4 py-1.5 rounded-full border border-white/10 shadow-sm">
              <i className={`${item.icon} ${item.color} text-sm`}></i>
              <span className="text-slate-200 tracking-wider">{item.text}</span>
              <span className="text-white/20 mx-1">•</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

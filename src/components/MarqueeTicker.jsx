import React from 'react';

export default function MarqueeTicker() {
  const tickerItems = [
    { text: 'UK CAA GVC & A2 COFC LICENSED OPERATOR', icon: 'ri-shield-check-fill', color: 'text-blue-400' },
    { text: '50MP DUAL-CAMERA AERIAL STILLS (DJI AIR 3S)', icon: 'ri-camera-3-fill', color: 'text-white' },
    { text: 'CINEMATIC 4K 60FPS 10-BIT D-LOG HIGHLIGHT REELS', icon: 'ri-movie-2-fill', color: 'text-cyan-400' },
    { text: 'REGIONAL BASE: NEWCASTLE (NE3) • SUNDERLAND • DURHAM', icon: 'ri-map-pin-2-fill', color: 'text-blue-400' },
    { text: 'PLEASE BOOK 1 WEEK IN ADVANCE FOR CAA PERMIT CLEARANCE', icon: 'ri-time-fill', color: 'text-cyan-300' },
    { text: 'FULL COMMERCIAL PUBLIC LIABILITY INDEMNITY', icon: 'ri-lock-2-fill', color: 'text-emerald-400' },
  ];

  return (
    <div className="w-full bg-obsidian-950 border-y border-blue-500/20 overflow-hidden py-3 relative z-20 shadow-lg">
      <div className="animate-marquee flex items-center gap-8 font-mono text-xs font-bold whitespace-nowrap select-none">
        
        {/* First Loop */}
        <div className="flex items-center gap-8">
          {tickerItems.map((item, idx) => (
            <div key={`loop1-${idx}`} className="flex items-center gap-3 bg-obsidian-900 px-4 py-1.5 rounded-full border border-white/15 shadow-sm hover:border-blue-500/50 transition-colors">
              <i className={`${item.icon} ${item.color} text-sm`}></i>
              <span className="text-slate-100 tracking-wider">{item.text}</span>
              <span className="text-blue-500/40 mx-1">•</span>
            </div>
          ))}
        </div>

        {/* Duplicate Second Loop for Seamless Animation */}
        <div className="flex items-center gap-8">
          {tickerItems.map((item, idx) => (
            <div key={`loop2-${idx}`} className="flex items-center gap-3 bg-obsidian-900 px-4 py-1.5 rounded-full border border-white/15 shadow-sm hover:border-blue-500/50 transition-colors">
              <i className={`${item.icon} ${item.color} text-sm`}></i>
              <span className="text-slate-100 tracking-wider">{item.text}</span>
              <span className="text-blue-500/40 mx-1">•</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}


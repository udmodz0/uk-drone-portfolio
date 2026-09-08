import React from 'react';

export default function MarqueeTicker() {
  const tickerItems = [
    { text: 'UK CAA GVC & A2 COFC LICENSED OPERATOR', icon: 'ri-shield-check-fill', color: 'text-blue-600' },
    { text: '50MP DUAL-CAMERA AERIAL STILLS (DJI AIR 3S)', icon: 'ri-camera-3-fill', color: 'text-slate-900' },
    { text: 'CINEMATIC 4K 60FPS 10-BIT D-LOG HIGHLIGHT REELS', icon: 'ri-movie-2-fill', color: 'text-sky-600' },
    { text: 'REGIONAL BASE: NEWCASTLE (NE3) • SUNDERLAND • DURHAM', icon: 'ri-map-pin-2-fill', color: 'text-blue-600' },
    { text: 'PLEASE BOOK 1 WEEK IN ADVANCE FOR CAA PERMIT CLEARANCE', icon: 'ri-time-fill', color: 'text-sky-700' },
    { text: 'FULL COMMERCIAL PUBLIC LIABILITY INDEMNITY', icon: 'ri-lock-2-fill', color: 'text-emerald-600' },
  ];

  return (
    <div className="w-full bg-slate-100/80 backdrop-blur-md border-y border-slate-200/80 overflow-hidden py-3 relative z-20 shadow-sm">
      <div className="animate-marquee flex items-center gap-8 font-mono text-xs font-bold whitespace-nowrap select-none">
        
        {/* First Loop */}
        <div className="flex items-center gap-8">
          {tickerItems.map((item, idx) => (
            <div key={`loop1-${idx}`} className="flex items-center gap-3 bg-white/90 px-4 py-1.5 rounded-full border border-slate-200 shadow-sm hover:border-blue-400 transition-colors">
              <i className={`${item.icon} ${item.color} text-sm`}></i>
              <span className="text-slate-800 tracking-wider">{item.text}</span>
              <span className="text-blue-300 mx-1">•</span>
            </div>
          ))}
        </div>

        {/* Duplicate Second Loop for Seamless Animation */}
        <div className="flex items-center gap-8">
          {tickerItems.map((item, idx) => (
            <div key={`loop2-${idx}`} className="flex items-center gap-3 bg-white/90 px-4 py-1.5 rounded-full border border-slate-200 shadow-sm hover:border-blue-400 transition-colors">
              <i className={`${item.icon} ${item.color} text-sm`}></i>
              <span className="text-slate-800 tracking-wider">{item.text}</span>
              <span className="text-blue-300 mx-1">•</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}



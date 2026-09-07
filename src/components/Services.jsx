import React from 'react';

export default function Services() {
  const servicesList = [
    {
      icon: 'ri-movie-2-line',
      title: 'Cinematic 4K Aerial Videography',
      desc: 'High-speed 4K 60fps aerial sequences captured using the flagship DJI Air 3S dual-camera payload with 10-bit D-Log color profiles.',
      tag: '4K 60FPS D-LOG',
      color: 'gold'
    },
    {
      icon: 'ri-camera-lens-line',
      title: 'Ultra-HD 50MP Aerial Photography',
      desc: 'Crystal-clear 50-megapixel aerial stills delivering fine detail, high dynamic range HDR, and professional color grading.',
      tag: '50MP RAW SENSOR',
      color: 'cyber'
    },
    {
      icon: 'ri-scissors-2-line',
      title: 'Post-Production & Sound Design',
      desc: 'Complete post-processing: color grading, licensed cinematic soundtrack integration, and polished final video assembly.',
      tag: 'FULL POST-PROD',
      color: 'gold'
    },
    {
      icon: 'ri-smartphone-line',
      title: 'Social Media Vertical Reels',
      desc: 'Custom 9:16 vertical video sequences tailored specifically for viral Instagram Reels, TikTok, and YouTube Shorts.',
      tag: 'VERTICAL 9:16',
      color: 'emerald'
    },
    {
      icon: 'ri-goblet-line',
      title: 'Birthdays & Milestone Parties',
      desc: 'Unforgettable aerial group portraits, reveal shots, and event highlights for outdoor birthday celebrations.',
      tag: 'EVENT HIGHLIGHTS',
      color: 'gold'
    },
    {
      icon: 'ri-group-line',
      title: 'Private Estates & Outdoor Venues',
      desc: 'Discreet, high-precision flight capture for outdoor garden parties, estate venues, and private celebrations.',
      tag: 'PRIVATE VENUES',
      color: 'cyber'
    }
  ];

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-obsidian-950 via-obsidian-900 to-obsidian-950 relative overflow-hidden">
      {/* Ambient background glow spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gold-500/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-gold-500/30 text-gold-400 text-xs font-mono font-bold uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            <i className="ri-radar-line text-sm text-gold-400 animate-spin" style={{ animationDuration: '6s' }}></i>
            FLIGHT CAPABILITY & SERVICES
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            Comprehensive Aerial & <span className="bg-gradient-to-r from-gold-400 to-amber-500 bg-clip-text text-transparent text-glow-gold">Media Solutions</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base leading-relaxed">
            From high-speed 4K drone cinematography to 50MP still photography and polished social media reels across Newcastle, Sunderland, Durham, and NE3.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((srv, idx) => (
            <div 
              key={idx} 
              className="glass-panel-cinematic p-8 rounded-3xl border border-white/10 glass-panel-hover group relative overflow-hidden shadow-2xl"
            >
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-gold-500/5 rounded-full blur-2xl group-hover:bg-gold-500/15 transition-all duration-500"></div>
              
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-obsidian-900 border border-white/15 flex items-center justify-center text-gold-400 group-hover:border-gold-400 group-hover:scale-110 transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
                  <i className={`${srv.icon} text-3xl text-gold-400`}></i>
                </div>
                <span className="px-3 py-1 rounded-md text-[10px] font-mono font-bold bg-obsidian-950 text-slate-300 border border-white/10 tracking-wider">
                  {srv.tag}
                </span>
              </div>

              <h3 className="font-display font-bold text-xl text-white group-hover:text-gold-400 transition-colors duration-300">
                {srv.title}
              </h3>
              
              <p className="mt-3 text-slate-300 text-sm leading-relaxed">
                {srv.desc}
              </p>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono font-semibold text-gold-400">
                <span className="flex items-center gap-1.5">
                  <i className="ri-checkbox-circle-fill text-gold-400 text-base"></i>
                  <span>Digital 4K Delivery</span>
                </span>
                <i className="ri-arrow-right-up-line text-lg text-slate-500 group-hover:text-gold-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"></i>
              </div>
            </div>
          ))}
        </div>

        {/* Regional Coverage Banner */}
        <div className="mt-16 p-6 rounded-3xl glass-panel-cinematic border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-cyber-500/10 border border-cyber-500/30 text-cyber-400 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(56,189,248,0.2)]">
              <i className="ri-map-pin-2-fill text-2xl"></i>
            </div>
            <div>
              <div className="text-white font-bold text-base font-display">Regional Base: Newcastle Upon Tyne (NE3)</div>
              <div className="text-slate-400 text-xs font-mono">Operating across Newcastle, Sunderland, Durham & NE3 Postcodes</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {['Newcastle Upon Tyne', 'Sunderland', 'Durham', 'NE3 Postcodes', 'Tyne & Wear'].map((loc, i) => (
              <span key={i} className="px-3.5 py-1.5 rounded-xl bg-obsidian-900 border border-white/10 text-slate-300 text-xs font-mono font-medium flex items-center gap-1.5">
                <i className="ri-flight-takeoff-line text-gold-400"></i>
                {loc}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

import React from 'react';

export default function Equipment() {
  return (
    <section id="equipment" className="py-24 bg-gradient-to-b from-obsidian-950 via-obsidian-900 to-obsidian-950 relative overflow-hidden">
      {/* Background Radar Grid */}
      <div className="absolute inset-0 radar-grid opacity-15 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-gold-500/30 text-gold-400 text-xs font-mono font-bold uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            <i className="ri-cpu-line text-sm text-gold-400"></i>
            FLEET HANGAR & TECHNICAL SPECS
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            Powered By Dual-Camera <span className="bg-gradient-to-r from-gold-400 to-amber-500 bg-clip-text text-transparent text-glow-gold">DJI Air 3S</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base leading-relaxed">
            We deploy flagship aviation hardware to guarantee crisp 50MP imagery, ultra-smooth 4K 60fps video, and reliable ground capture.
          </p>
        </div>

        {/* Dual Gear Hangar Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* DJI Air 3S Card */}
          <div className="glass-panel-cinematic p-8 rounded-3xl border border-white/10 relative hover:border-gold-400/50 transition-all duration-500 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 font-bold text-2xl shadow-[0_0_20px_rgba(245,158,11,0.2)]">
                  <i className="ri-flight-takeoff-line"></i>
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-gold-400 uppercase tracking-widest">FLAGSHIP AERIAL PLATFORM</span>
                  <h3 className="font-display font-black text-2xl text-white">DJI Air 3S Dual-Camera Payload</h3>
                </div>
              </div>
              <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-gold-500/20 text-gold-300 border border-gold-500/40">
                50MP • 4K HDR
              </span>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Equipped with a primary 1-inch CMOS sensor and a 70mm telephoto lens, the DJI Air 3S captures incredible dynamic range, vivid color fidelity, and exceptional low-light event footage.
            </p>

            <div className="grid grid-cols-2 gap-4 font-mono">
              <div className="p-4 rounded-2xl bg-obsidian-900/90 border border-white/10">
                <div className="text-gold-400 font-bold text-base flex items-center gap-1.5">
                  <i className="ri-camera-3-line"></i>
                  <span>50MP Resolution</span>
                </div>
                <div className="text-xs text-slate-400 mt-1">Dual CMOS Sensor Stills</div>
              </div>

              <div className="p-4 rounded-2xl bg-obsidian-900/90 border border-white/10">
                <div className="text-cyber-400 font-bold text-base flex items-center gap-1.5">
                  <i className="ri-film-line"></i>
                  <span>4K 60fps HDR</span>
                </div>
                <div className="text-xs text-slate-400 mt-1">10-Bit D-Log M Color</div>
              </div>

              <div className="p-4 rounded-2xl bg-obsidian-900/90 border border-white/10">
                <div className="text-emerald-400 font-bold text-base flex items-center gap-1.5">
                  <i className="ri-radar-line"></i>
                  <span>Nightscape Sense</span>
                </div>
                <div className="text-xs text-slate-400 mt-1">LiDAR Obstacle Avoidance</div>
              </div>

              <div className="p-4 rounded-2xl bg-obsidian-900/90 border border-white/10">
                <div className="text-purple-400 font-bold text-base flex items-center gap-1.5">
                  <i className="ri-speed-line"></i>
                  <span>45 Min Flight</span>
                </div>
                <div className="text-xs text-slate-400 mt-1">High Wind Resistance</div>
              </div>
            </div>
          </div>

          {/* iPhone 17 Pro Card */}
          <div className="glass-panel-cinematic p-8 rounded-3xl border border-white/10 relative hover:border-cyber-400/50 transition-all duration-500 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-cyber-500/10 border border-cyber-500/30 flex items-center justify-center text-cyber-400 font-bold text-2xl shadow-[0_0_20px_rgba(56,189,248,0.2)]">
                  <i className="ri-smartphone-line"></i>
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-cyber-400 uppercase tracking-widest">GROUND PHOTOGRAPHY RIG</span>
                  <h3 className="font-display font-black text-2xl text-white">iPhone 17 Pro Ground Array</h3>
                </div>
              </div>
              <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-cyber-500/20 text-cyber-300 border border-cyber-500/40">
                48MP ProRAW
              </span>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              For close-up ground moments, candid party portraits, and social media reels, we deploy the iPhone 17 Pro camera array capturing 48MP ProRAW photos and 4K ProRes video.
            </p>

            <div className="grid grid-cols-2 gap-4 font-mono">
              <div className="p-4 rounded-2xl bg-obsidian-900/90 border border-white/10">
                <div className="text-cyber-400 font-bold text-base flex items-center gap-1.5">
                  <i className="ri-camera-lens-line"></i>
                  <span>48MP ProRAW</span>
                </div>
                <div className="text-xs text-slate-400 mt-1">Lossless Detail Capture</div>
              </div>

              <div className="p-4 rounded-2xl bg-obsidian-900/90 border border-white/10">
                <div className="text-gold-400 font-bold text-base flex items-center gap-1.5">
                  <i className="ri-vidicon-line"></i>
                  <span>4K ProRes</span>
                </div>
                <div className="text-xs text-slate-400 mt-1">Broadcast Grade Reels</div>
              </div>

              <div className="p-4 rounded-2xl bg-obsidian-900/90 border border-white/10">
                <div className="text-emerald-400 font-bold text-base flex items-center gap-1.5">
                  <i className="ri-user-smile-line"></i>
                  <span>Pro Portrait</span>
                </div>
                <div className="text-xs text-slate-400 mt-1">Natural Depth Bokeh</div>
              </div>

              <div className="p-4 rounded-2xl bg-obsidian-900/90 border border-white/10">
                <div className="text-purple-400 font-bold text-base flex items-center gap-1.5">
                  <i className="ri-share-forward-line"></i>
                  <span>Instant Sync</span>
                </div>
                <div className="text-xs text-slate-400 mt-1">Social Media Delivery</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

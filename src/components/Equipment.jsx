import React from 'react';

export default function Equipment() {
  return (
    <section id="equipment" className="py-24 bg-gradient-to-b from-white via-slate-50 to-white relative overflow-hidden">
      {/* Background Radar Grid */}
      <div className="absolute inset-0 radar-grid opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-blue-200 text-blue-700 bg-white/90 text-xs font-mono font-bold uppercase tracking-widest mb-4 shadow-sm">
            <i className="ri-cpu-line text-sm text-blue-600"></i>
            FLEET HANGAR & TECHNICAL SPECS
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-slate-950 tracking-tight">
            Powered By Dual-Camera <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600 bg-clip-text text-transparent">DJI Air 3S</span>
          </h2>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            We deploy flagship aviation hardware to guarantee crisp 50MP imagery, ultra-smooth 4K 60fps video, and reliable ground capture.
          </p>
        </div>

        {/* Dual Gear Hangar Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* DJI Air 3S Card */}
          <div className="glass-panel-cinematic p-8 rounded-3xl border border-slate-200 relative hover:border-blue-400 transition-all duration-500 shadow-sm bg-white/80">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-bold text-2xl shadow-sm">
                  <i className="ri-flight-takeoff-line"></i>
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-blue-700 uppercase tracking-widest">FLAGSHIP AERIAL PLATFORM</span>
                  <h3 className="font-display font-black text-2xl text-slate-950">DJI Air 3S Dual-Camera Payload</h3>
                </div>
              </div>
              <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200">
                50MP • 4K HDR
              </span>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              Equipped with a primary 1-inch CMOS sensor and a 70mm telephoto lens, the DJI Air 3S captures incredible dynamic range, vivid color fidelity, and exceptional low-light event footage.
            </p>

            <div className="grid grid-cols-2 gap-4 font-mono">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="text-blue-700 font-bold text-base flex items-center gap-1.5">
                  <i className="ri-camera-3-line"></i>
                  <span>50MP Resolution</span>
                </div>
                <div className="text-xs text-slate-500 mt-1">Dual CMOS Sensor Stills</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="text-sky-700 font-bold text-base flex items-center gap-1.5">
                  <i className="ri-film-line"></i>
                  <span>4K 60fps HDR</span>
                </div>
                <div className="text-xs text-slate-500 mt-1">10-Bit D-Log M Color</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="text-emerald-700 font-bold text-base flex items-center gap-1.5">
                  <i className="ri-radar-line"></i>
                  <span>Nightscape Sense</span>
                </div>
                <div className="text-xs text-slate-500 mt-1">LiDAR Obstacle Avoidance</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="text-indigo-700 font-bold text-base flex items-center gap-1.5">
                  <i className="ri-speed-line"></i>
                  <span>45 Min Flight</span>
                </div>
                <div className="text-xs text-slate-500 mt-1">High Wind Resistance</div>
              </div>
            </div>
          </div>

          {/* iPhone 17 Pro Card */}
          <div className="glass-panel-cinematic p-8 rounded-3xl border border-slate-200 relative hover:border-blue-400 transition-all duration-500 shadow-sm bg-white/80">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-bold text-2xl shadow-sm">
                  <i className="ri-smartphone-line"></i>
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-blue-700 uppercase tracking-widest">GROUND PHOTOGRAPHY RIG</span>
                  <h3 className="font-display font-black text-2xl text-slate-950">iPhone 17 Pro Ground Array</h3>
                </div>
              </div>
              <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200">
                48MP ProRAW
              </span>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              For close-up ground moments, candid party portraits, and social media reels, we deploy the iPhone 17 Pro camera array capturing 48MP ProRAW photos and 4K ProRes video.
            </p>

            <div className="grid grid-cols-2 gap-4 font-mono">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="text-blue-700 font-bold text-base flex items-center gap-1.5">
                  <i className="ri-camera-lens-line"></i>
                  <span>48MP ProRAW</span>
                </div>
                <div className="text-xs text-slate-500 mt-1">Lossless Detail Capture</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="text-sky-700 font-bold text-base flex items-center gap-1.5">
                  <i className="ri-vidicon-line"></i>
                  <span>4K ProRes</span>
                </div>
                <div className="text-xs text-slate-500 mt-1">Broadcast Grade Reels</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="text-emerald-700 font-bold text-base flex items-center gap-1.5">
                  <i className="ri-user-smile-line"></i>
                  <span>Pro Portrait</span>
                </div>
                <div className="text-xs text-slate-500 mt-1">Natural Depth Bokeh</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="text-indigo-700 font-bold text-base flex items-center gap-1.5">
                  <i className="ri-share-forward-line"></i>
                  <span>Instant Sync</span>
                </div>
                <div className="text-xs text-slate-500 mt-1">Social Media Delivery</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}


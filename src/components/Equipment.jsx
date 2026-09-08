import React from 'react';

export default function Equipment() {
  return (
    <section id="equipment" className="py-16 sm:py-24 md:py-32 bg-[#0E1117] border-t border-white/[0.08] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-zinc-300 mb-2 sm:mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-aviation-500"></span>
            <span>Aviation Hardware</span>
          </div>
          <h2 className="font-display font-semibold text-2xl sm:text-4xl lg:text-5xl text-[#FAF9F6] tracking-tight">
            Fleet & Technology
          </h2>
          <p className="mt-3 sm:mt-4 text-zinc-300 text-xs sm:text-base leading-relaxed font-normal max-w-xl">
            We deploy precision aviation hardware and high-fidelity cinema sensors to capture balanced dynamic range in any North East environment.
          </p>
        </div>

        {/* Dual Gear Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          
          {/* DJI Air 3S Platform */}
          <div className="studio-card bg-[#12151B] p-6 sm:p-8 md:p-10 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 sm:pb-6 border-b border-white/[0.08] gap-3 sm:gap-0">
                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-aviation-400">
                    Flagship Aerial Platform
                  </span>
                  <h3 className="font-display font-semibold text-xl sm:text-2xl text-[#FAF9F6] mt-0.5 sm:mt-1">
                    DJI Air 3S Dual-Camera
                  </h3>
                </div>
                <span className="btn-liquid px-3 py-1 text-xs font-mono text-zinc-200 self-start sm:self-auto">
                  50MP • 4K HDR
                </span>
              </div>

              <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mt-5 sm:mt-6 mb-6 sm:mb-8 font-normal">
                Equipped with a primary 1-inch CMOS wide sensor and a dedicated 70mm telephoto lens, the DJI Air 3S produces expansive vistas and compressed cinematic portraits with exceptional low-light clarity.
              </p>

              {/* Animated Flight Avionics Status Strip */}
              <div className="mb-6 p-3 sm:p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
                <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
                  {/* 4 Mini Spinning Rotors */}
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4].map((r) => (
                      <div key={r} className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center bg-black/40">
                        <div className={`w-3.5 h-0.5 bg-white/80 rounded-full ${r % 2 === 0 ? 'animate-rotor' : 'animate-rotor-reverse'}`}></div>
                      </div>
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-zinc-300">ROTORS READY</span>
                </div>

                <div className="flex items-center gap-3 text-[11px] font-mono text-zinc-400 flex-shrink-0">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-emerald-300">LiDAR ACTIVE</span>
                  </span>
                  <span className="hidden sm:inline text-zinc-500">•</span>
                  <span className="hidden sm:inline text-sky-400">O4 20KM LINK</span>
                </div>
              </div>

              {/* Technical Matrix */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="text-[10px] sm:text-xs uppercase font-mono tracking-wider text-zinc-400">Sensor Output</div>
                  <div className="text-[#FAF9F6] font-display font-semibold text-base sm:text-lg mt-1">50MP RAW</div>
                  <div className="text-[10px] sm:text-[11px] text-zinc-400 font-mono mt-0.5">Dual CMOS Stills</div>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="text-[10px] sm:text-xs uppercase font-mono tracking-wider text-zinc-400">Video Capture</div>
                  <div className="text-[#FAF9F6] font-display font-semibold text-base sm:text-lg mt-1">4K / 60FPS</div>
                  <div className="text-[10px] sm:text-[11px] text-zinc-400 font-mono mt-0.5">10-Bit D-Log Profiles</div>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="text-[10px] sm:text-xs uppercase font-mono tracking-wider text-zinc-400">Air Safety</div>
                  <div className="text-[#FAF9F6] font-display font-semibold text-base sm:text-lg mt-1">Omnidirectional</div>
                  <div className="text-[10px] sm:text-[11px] text-zinc-400 font-mono mt-0.5">Nightscape LiDAR Sense</div>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="text-[10px] sm:text-xs uppercase font-mono tracking-wider text-zinc-400">Flight Endurance</div>
                  <div className="text-[#FAF9F6] font-display font-semibold text-base sm:text-lg mt-1">Up to 45 Mins</div>
                  <div className="text-[10px] sm:text-[11px] text-zinc-400 font-mono mt-0.5">Level 6 Wind Resistance</div>
                </div>
              </div>
            </div>

            <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-zinc-400 font-mono gap-1 sm:gap-0">
              <span>UK CAA Registered Flight Fleet</span>
              <span>Class C1 Airspace Ready</span>
            </div>
          </div>

          {/* iPhone 17 Pro Ground Array */}
          <div className="studio-card bg-[#12151B] p-6 sm:p-8 md:p-10 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 sm:pb-6 border-b border-white/[0.08] gap-3 sm:gap-0">
                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-aviation-400">
                    Ground Production Setup
                  </span>
                  <h3 className="font-display font-semibold text-xl sm:text-2xl text-[#FAF9F6] mt-0.5 sm:mt-1">
                    iPhone 17 Pro Camera Rig
                  </h3>
                </div>
                <span className="btn-liquid px-3 py-1 text-xs font-mono text-zinc-200 self-start sm:self-auto">
                  48MP ProRAW
                </span>
              </div>

              <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mt-5 sm:mt-6 mb-6 sm:mb-8 font-normal">
                For ground portraits, candid guest reactions, and instant social media reels, we deploy the iPhone 17 Pro camera array to produce ultra-detailed 48MP portraits and silky 4K footage.
              </p>

              {/* Ground Rig Status Strip */}
              <div className="mb-6 p-3 sm:p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse"></div>
                  <span className="text-[11px] font-mono text-zinc-300">GROUND RIG SYNCHRONIZED</span>
                </div>
                <div className="text-[11px] font-mono text-zinc-400 flex-shrink-0">
                  <span>LOG ENCODED • 4K 60</span>
                </div>
              </div>

              {/* Technical Matrix */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="text-[10px] sm:text-xs uppercase font-mono tracking-wider text-zinc-400">Still Sensor</div>
                  <div className="text-[#FAF9F6] font-display font-semibold text-base sm:text-lg mt-1">48MP ProRAW</div>
                  <div className="text-[10px] sm:text-[11px] text-zinc-400 font-mono mt-0.5">Uncompressed Master</div>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="text-[10px] sm:text-xs uppercase font-mono tracking-wider text-zinc-400">Video Quality</div>
                  <div className="text-[#FAF9F6] font-display font-semibold text-base sm:text-lg mt-1">4K ProRes</div>
                  <div className="text-[10px] sm:text-[11px] text-zinc-400 font-mono mt-0.5">Log Encoding Ready</div>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="text-[10px] sm:text-xs uppercase font-mono tracking-wider text-zinc-400">Portrait Optics</div>
                  <div className="text-[#FAF9F6] font-display font-semibold text-base sm:text-lg mt-1">Optical 5x</div>
                  <div className="text-[10px] sm:text-[11px] text-zinc-400 font-mono mt-0.5">Natural Bokeh Separation</div>
                </div>

                <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div className="text-[10px] sm:text-xs uppercase font-mono tracking-wider text-zinc-400">Social Delivery</div>
                  <div className="text-[#FAF9F6] font-display font-semibold text-base sm:text-lg mt-1">Vertical 9:16</div>
                  <div className="text-[10px] sm:text-[11px] text-zinc-400 font-mono mt-0.5">Optimized Reels Output</div>
                </div>
              </div>
            </div>

            <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-zinc-400 font-mono gap-1 sm:gap-0">
              <span>Ground Level Coverage</span>
              <span>Synchronized Color Profile</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

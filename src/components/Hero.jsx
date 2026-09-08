import React, { useState, useEffect } from 'react';

export default function Hero({ onOpenBooking }) {
  const [hoursFlown, setHoursFlown] = useState(0);
  const [footageGb, setFootageGb] = useState(0);
  const [safetyScore, setSafetyScore] = useState(0);

  useEffect(() => {
    // Animated telemetry counter effect
    const duration = 1500;
    const steps = 30;
    const stepTime = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      setHoursFlown(Math.floor(progress * 480));
      setFootageGb(Math.floor(progress * 1250));
      setSafetyScore(Math.floor(progress * 100));

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative pt-36 pb-24 md:pt-48 md:pb-36 overflow-hidden bg-gradient-to-b from-obsidian-950 via-obsidian-900 to-obsidian-950">
      {/* Background Radial Spotlights & Radar Grid */}
      <div className="absolute inset-0 radar-grid opacity-25 pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Futuristic Scanline Overlay */}
      <div className="absolute inset-0 scanline-overlay opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Telemetry HUD Status Badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-blue-500/40 text-blue-400 text-xs font-mono font-bold shadow-[0_0_15px_rgba(59,130,246,0.25)]">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
            <span>UK CAA GVC & A2 COFC LICENSED</span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold shadow-[0_0_15px_rgba(56,189,248,0.15)]">
            <i className="ri-map-pin-4-line text-cyan-400"></i>
            <span>NEWCASTLE • SUNDERLAND • DURHAM (NE3 BASE)</span>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold">
            <i className="ri-radar-line text-emerald-400 animate-spin" style={{ animationDuration: '8s' }}></i>
            <span>FLIGHT CLEARANCE: READY FOR MISSION</span>
          </div>
        </div>

        {/* Main Headline & Intro */}
        <div className="text-center max-w-5xl mx-auto">
          <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.1]">
            ELEVATE YOUR VISION WITH <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-white via-blue-300 to-blue-500 bg-clip-text text-transparent text-glow-blue">
              CINEMATIC AERIAL PERSPECTIVES
            </span>
          </h1>

          <p className="mt-8 text-base sm:text-xl text-slate-200 font-normal leading-relaxed max-w-3xl mx-auto">
            High-precision CAA registered drone pilot capturing 50MP aerial imagery, 4K 60fps cinematic video, and 10-bit D-Log footage across the North East & NE3 region.
          </p>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenBooking}
              className="btn-shimmer w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-[0_0_30px_rgba(37,99,235,0.45)] hover:shadow-[0_0_45px_rgba(37,99,235,0.7)] transition-all duration-300 transform hover:scale-105 active:scale-95 group border border-blue-400/30"
            >
              <i className="ri-rocket-2-line text-xl"></i>
              <span>Book Flight Mission</span>
              <i className="ri-arrow-right-line text-xl group-hover:translate-x-1 transition-transform"></i>
            </button>

            <a
              href="#videos"
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-7 py-4 rounded-2xl text-base font-semibold text-slate-100 bg-obsidian-850 hover:bg-obsidian-800 border border-white/15 hover:border-blue-400/50 hover:text-blue-300 transition-all duration-300 shadow-xl group"
            >
              <i className="ri-play-circle-line text-2xl text-blue-400 group-hover:scale-110 transition-transform"></i>
              <span>Watch 4K Showreel</span>
            </a>
          </div>
        </div>

        {/* Live Telemetry Stats Counter Grid */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          
          <div className="glass-panel-cinematic p-5 rounded-2xl text-center glass-panel-hover group relative overflow-hidden">
            <div className="absolute top-0 right-0 px-2 py-0.5 bg-blue-500/10 text-blue-400 font-mono text-[9px] font-bold border-l border-b border-blue-500/30 rounded-bl">
              SENSOR 4K
            </div>
            <div className="w-12 h-12 mx-auto rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-3 group-hover:scale-110 transition-transform">
              <i className="ri-camera-3-line text-2xl"></i>
            </div>
            <div className="text-3xl font-black text-white font-display tracking-tight text-glow-blue">{hoursFlown}+</div>
            <div className="text-xs font-mono text-slate-300 mt-1 uppercase tracking-wider">Flight Hours</div>
          </div>

          <div className="glass-panel-cinematic p-5 rounded-2xl text-center glass-panel-hover group relative overflow-hidden">
            <div className="absolute top-0 right-0 px-2 py-0.5 bg-cyan-500/10 text-cyan-400 font-mono text-[9px] font-bold border-l border-b border-cyan-500/30 rounded-bl">
              D-LOG 10-BIT
            </div>
            <div className="w-12 h-12 mx-auto rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3 group-hover:scale-110 transition-transform">
              <i className="ri-film-line text-2xl"></i>
            </div>
            <div className="text-3xl font-black text-white font-display tracking-tight text-glow-cyan">{footageGb}+ GB</div>
            <div className="text-xs font-mono text-slate-300 mt-1 uppercase tracking-wider">4K Raw Footage</div>
          </div>

          <div className="glass-panel-cinematic p-5 rounded-2xl text-center glass-panel-hover group relative overflow-hidden">
            <div className="absolute top-0 right-0 px-2 py-0.5 bg-emerald-500/10 text-emerald-400 font-mono text-[9px] font-bold border-l border-b border-emerald-500/30 rounded-bl">
              CIVIL AVIATION
            </div>
            <div className="w-12 h-12 mx-auto rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3 group-hover:scale-110 transition-transform">
              <i className="ri-shield-check-line text-2xl"></i>
            </div>
            <div className="text-3xl font-black text-white font-display tracking-tight text-glow-green">{safetyScore}%</div>
            <div className="text-xs font-mono text-slate-300 mt-1 uppercase tracking-wider">Safety Record</div>
          </div>

          <div className="glass-panel-cinematic p-5 rounded-2xl text-center glass-panel-hover group relative overflow-hidden">
            <div className="absolute top-0 right-0 px-2 py-0.5 bg-indigo-500/10 text-indigo-400 font-mono text-[9px] font-bold border-l border-b border-indigo-500/30 rounded-bl">
              PRO EDITING
            </div>
            <div className="w-12 h-12 mx-auto rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-3 group-hover:scale-110 transition-transform">
              <i className="ri-magic-line text-2xl"></i>
            </div>
            <div className="text-3xl font-black text-white font-display tracking-tight">4K 60FPS</div>
            <div className="text-xs font-mono text-slate-300 mt-1 uppercase tracking-wider">Ready Delivery</div>
          </div>

        </div>

        {/* Dynamic Flight Pre-Check Notice Card */}
        <div className="mt-12 max-w-4xl mx-auto glass-card-blue p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-2xl relative overflow-hidden">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 flex-shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              <i className="ri-time-line text-2xl"></i>
            </div>
            <div>
              <p className="text-xs font-mono font-bold text-blue-300 uppercase tracking-widest flex items-center gap-2 justify-center sm:justify-start">
                <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
                FLIGHT PLANNING NOTICE
              </p>
              <p className="text-sm text-slate-100 font-medium mt-0.5">
                Minimum <span className="text-white font-bold underline decoration-blue-500">1 week advance booking</span> required for CAA airspace clearance & Risk Assessment checks.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenBooking}
            className="btn-shimmer px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-colors flex-shrink-0 shadow-lg border border-blue-400/30"
          >
            Check Available Dates
          </button>
        </div>

      </div>
    </section>
  );
}


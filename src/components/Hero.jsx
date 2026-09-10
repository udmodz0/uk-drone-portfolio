import React, { useState, useEffect, useRef } from 'react';
import ThreeDroneScene from './ThreeDroneScene';

export default function Hero({ onOpenBooking }) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [introReady, setIntroReady] = useState(false);
  const [showDroneDetails, setShowDroneDetails] = useState(false);
  const [activeSpecTab, setActiveSpecTab] = useState(0);
  const heroTrackRef = useRef(null);

  const stats = [
    { label: 'CAA REGISTERED', detail: 'UK Certified Operator' },
    { label: '50MP RESOLUTION', detail: 'Ultra-HD Aerial Stills' },
    { label: '4K CINEMA', detail: '60fps 10-bit D-Log Video' },
    { label: 'NORTH EAST BASE', detail: 'Newcastle • Sunderland • Durham' },
  ];

  const djiSpecs = [
    {
      id: 'optics',
      title: 'Dual 50MP & 48MP Cameras',
      tag: 'CINEMA OPTICS',
      icon: 'ri-camera-lens-line',
      highlight: '1" CMOS Main + 70mm Telephoto',
      description: 'Dual focal lengths for dramatic compression and architectural clarity. 4K/60fps HDR, 10-bit D-Log M color profile with 14 EV dynamic range.',
      metrics: [
        { label: 'Primary Sensor', val: '1" CMOS 50MP' },
        { label: 'Telephoto', val: '70mm 48MP' },
        { label: 'Color Depth', val: '10-Bit D-Log M' },
      ],
    },
    {
      id: 'lidar',
      title: 'Omnidirectional LiDAR',
      tag: 'NIGHTSCAPE SENSE',
      icon: 'ri-radar-line',
      highlight: 'Forward LiDAR + APAS 5.0 Vision',
      description: 'Millimeter-precise night and twilight obstacle detection. Enables safe close-proximity tracking around historic cathedrals, trees, and UK event venues.',
      metrics: [
        { label: 'Front Sensor', val: 'LiDAR Laser' },
        { label: 'Avoidance', val: 'Omnidirectional' },
        { label: 'Night Safe', val: 'Full APAS 5.0' },
      ],
    },
    {
      id: 'transmission',
      title: 'Next-Gen O4 Transmission',
      tag: 'FLIGHT DYNAMICS',
      icon: 'ri-broadcast-line',
      highlight: '20km HD Range • 45-Min Endurance',
      description: 'Lag-free 1080p/60fps real-time director monitor feed with Level 6 wind resistance (12 m/s), engineered for rugged North East coastlines.',
      metrics: [
        { label: 'Max Range', val: '20 km' },
        { label: 'Max Flight Time', val: '45 Minutes' },
        { label: 'Wind Tolerance', val: 'Level 6 (12 m/s)' },
      ],
    },
  ];

  // Scroll listener for hero flight transition (seamless, natural scroll without empty gap)
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const flightDistance = Math.min(window.innerHeight * 0.75, 600);
      const progress = Math.min(Math.max(scrolled / flightDistance, 0), 1);
      setScrollProgress(progress);

      // Automatically dismiss detail card when user scrolls into flight
      if (progress > 0.15) {
        setShowDroneDetails(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Gracefully trigger showcase reveal once intro completes or after 1.8s
  useEffect(() => {
    const timer = setTimeout(() => {
      setIntroReady(true);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  const handleIntroComplete = () => {
    setIntroReady(true);
  };

  const handleDroneClick = () => {
    setShowDroneDetails((prev) => !prev);
  };

  const handleHotspotClick = (specTabIdx) => {
    setActiveSpecTab(specTabIdx);
    setShowDroneDetails(true);
  };

  // Scroll-driven visibility: visible at top, fades out smoothly as user scrolls down, reappears when scrolling back up
  const showcaseOpacity = introReady ? Math.max(0, 1 - scrollProgress * 3.4) : 0;
  const showcaseTranslateY = -(scrollProgress * 28);
  const isShowcaseVisible = showcaseOpacity > 0.02;

  return (
    <div 
      ref={heroTrackRef}
      className="relative w-full bg-[#0B0D11]"
    >
      {/* Seamless Hero Frame (Drone departs smoothly on scroll into next section) */}
      <section className="relative min-h-screen w-full flex flex-col justify-between pt-24 sm:pt-28 pb-6 sm:pb-10 overflow-hidden bg-[#0B0D11] z-20">
        
        {/* Full-Width Cinematic Background Image with Dark Gradient Vignette */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img
            src="https://i.ibb.co/hRWZ8R6Y/IMG-0025.jpg"
            alt="Aerial drone perspective of event and landscape"
            onError={(e) => {
              e.currentTarget.src = "https://i.ibb.co/99TVY9DZ/IMG-0025.jpg";
            }}
            className="w-full h-full object-cover object-center opacity-30 scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D11] via-[#0B0D11]/80 to-[#0B0D11]/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0D11]/95 via-[#0B0D11]/45 to-[#0B0D11]/85" />
        </div>

        {/* REAL 3D THREE.JS DRONE FLIGHT SCENE (Cinematic Intro + 360° Drag Orbit + 3D Hotspots) */}
        <ThreeDroneScene 
          scrollProgress={scrollProgress} 
          onIntroComplete={handleIntroComplete}
          onDroneClick={handleDroneClick}
          onHotspotClick={handleHotspotClick}
        />

        {/* Main Content Split Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full my-auto py-2 sm:py-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Editorial Copy & CTAs */}
            <div className="lg:col-span-7">
              {/* Liquid Capsule Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 bg-white/[0.08] backdrop-blur-md mb-4 sm:mb-6 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-zinc-200">
                  Professional Drone Photography & Videography
                </span>
              </div>

              {/* Heading */}
              <h1 className="font-display font-semibold text-3xl sm:text-5xl lg:text-6xl xl:text-7xl text-[#FAF9F6] tracking-tight leading-[1.1] sm:leading-[1.08]">
                Capture your <br className="hidden sm:inline" />
                moments from <br />
                <span className="text-zinc-300 font-light italic">a new perspective.</span>
              </h1>

              {/* Supporting Copy */}
              <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-zinc-300 font-normal leading-relaxed max-w-xl">
                Professional aerial photography, videography, and event coverage across Newcastle, Sunderland, Durham, and surrounding areas.
              </p>

              {/* Exact Liquid Pill CTAs */}
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4">
                <button
                  onClick={onOpenBooking}
                  className="btn-liquid-primary px-7 py-3.5 sm:py-4 text-sm font-semibold tracking-wide flex items-center justify-center gap-2 group w-full sm:w-auto"
                >
                  <span>Book Your Event</span>
                  <i className="ri-arrow-right-line text-sm group-hover:translate-x-0.5 transition-transform"></i>
                </button>

                <a
                  href="#videos"
                  className="btn-liquid px-7 py-3.5 sm:py-4 text-sm font-medium tracking-wide flex items-center justify-center gap-2.5 w-full sm:w-auto"
                >
                  <i className="ri-play-line text-sm text-zinc-200"></i>
                  <span>View Our Work</span>
                </a>
              </div>

              {/* Mobile DJI Specs Strip (Toggle button on mobile) */}
              <div 
                className="mt-6 lg:hidden transition-all duration-300 ease-out"
                style={{
                  opacity: showcaseOpacity,
                  transform: `translateY(${showcaseTranslateY}px)`,
                  pointerEvents: isShowcaseVisible ? 'auto' : 'none',
                  visibility: isShowcaseVisible ? 'visible' : 'hidden',
                }}
              >
                <div className="flex flex-col gap-2.5">
                  <button
                    onClick={() => setShowDroneDetails(!showDroneDetails)}
                    className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-mono tracking-wider bg-white/[0.08] hover:bg-white/[0.14] border border-white/20 text-zinc-200 backdrop-blur-md self-start transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>{showDroneDetails ? 'Close Drone Specs' : 'DJI Air 3S • Tap for Specs'}</span>
                    <i className={`ri-${showDroneDetails ? 'close-line text-emerald-400' : 'arrow-right-up-line text-zinc-400'} text-xs`}></i>
                  </button>

                  {/* Mobile Expandable Details Sheet */}
                  {showDroneDetails && (
                    <div className="p-4 rounded-xl bg-[#11151E]/95 border border-white/20 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2">
                      <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
                        <span className="text-[11px] font-mono font-bold text-[#FAF9F6]">DJI AIR 3S // FLEET SPECS</span>
                        <button 
                          onClick={() => setShowDroneDetails(false)}
                          className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-zinc-300"
                        >
                          <i className="ri-close-line text-sm"></i>
                        </button>
                      </div>

                      {/* Tab selector */}
                      <div className="grid grid-cols-3 gap-1 mt-2.5 p-1 bg-black/30 rounded-lg border border-white/5">
                        {djiSpecs.map((tab, idx) => (
                          <button
                            key={tab.id}
                            onClick={() => setActiveSpecTab(idx)}
                            className={`py-1 text-[9px] font-mono rounded ${
                              activeSpecTab === idx ? 'bg-white/20 text-white font-semibold' : 'text-zinc-400'
                            }`}
                          >
                            {tab.tag.split(' ')[0]}
                          </button>
                        ))}
                      </div>

                      <div className="mt-2.5 text-xs font-semibold text-[#FAF9F6]">
                        {djiSpecs[activeSpecTab].title}
                      </div>
                      <p className="text-[10px] text-zinc-300 mt-1 leading-relaxed">
                        {djiSpecs[activeSpecTab].description}
                      </p>

                      <div className="grid grid-cols-3 gap-1.5 mt-2.5 pt-2 border-t border-white/10">
                        {djiSpecs[activeSpecTab].metrics.map((m, mIdx) => (
                          <div key={mIdx} className="bg-white/[0.04] p-1.5 rounded text-center">
                            <div className="text-[8px] font-mono text-zinc-400 uppercase">{m.label}</div>
                            <div className="text-[10px] font-semibold text-white mt-0.5">{m.val}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Desktop DJI Drone Details (Hidden by default; opens when clicking drone or inspect badge) */}
            <div className="lg:col-span-5 hidden lg:block pt-16 xl:pt-20">
              <div 
                className="transition-all duration-500 ease-out transform max-w-md ml-auto"
                style={{
                  opacity: showcaseOpacity,
                  transform: `translateY(${showcaseTranslateY}px)`,
                  pointerEvents: isShowcaseVisible ? 'auto' : 'none',
                  visibility: isShowcaseVisible ? 'visible' : 'hidden',
                }}
              >
                {/* Minimal Interactive Trigger Button (Shown when card is closed or open) */}
                <div className="flex justify-end mb-2">
                  <button
                    onClick={() => setShowDroneDetails(!showDroneDetails)}
                    aria-label="Inspect Drone Specifications"
                    className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#11151E]/80 hover:bg-[#181E2B] border border-white/20 hover:border-emerald-400/50 text-[#FAF9F6] shadow-xl backdrop-blur-md transition-all duration-300 group cursor-pointer"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-[11px] font-mono tracking-wider">
                      {showDroneDetails ? 'HIDE SPECS' : 'DJI AIR 3S • DRAG 360° // TAP HOTSPOTS'}
                    </span>
                    <i className={`ri-${showDroneDetails ? 'close-line text-emerald-400' : 'cursor-line text-zinc-400 group-hover:text-emerald-400'} text-xs transition-colors`}></i>
                  </button>
                </div>

                {/* The Details Card: Only displayed when user clicks drone or button */}
                {showDroneDetails && (
                  <div className="relative rounded-2xl bg-[#11151E]/90 border border-white/20 p-5 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-300">
                    {/* Drone Header Card with Close Button */}
                    <div className="flex items-center justify-between pb-3.5 border-b border-white/10">
                      <div className="flex items-center gap-2.5">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                        <div>
                          <div className="text-[11px] font-mono font-bold tracking-wider text-[#FAF9F6]">
                            DJI AIR 3S // AERIAL FLEET
                          </div>
                          <div className="text-[10px] text-zinc-400 font-mono">
                            STATUS: CALIBRATED & FLIGHT READY
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-mono tracking-widest uppercase bg-emerald-950/60 border border-emerald-500/30 text-emerald-300">
                          LIVE 3D
                        </span>
                        <button
                          onClick={() => setShowDroneDetails(false)}
                          className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
                          aria-label="Close specifications"
                        >
                          <i className="ri-close-line text-sm"></i>
                        </button>
                      </div>
                    </div>

                    {/* Feature Tabs */}
                    <div className="grid grid-cols-3 gap-1.5 mt-3.5 p-1 bg-black/30 rounded-xl border border-white/5">
                      {djiSpecs.map((tab, idx) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveSpecTab(idx)}
                          className={`py-1.5 px-2 text-[10px] font-mono tracking-wider rounded-lg transition-all text-center flex items-center justify-center gap-1.5 ${
                            activeSpecTab === idx
                              ? 'bg-white/15 text-white shadow-sm border border-white/20 font-semibold'
                              : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                          }`}
                        >
                          <i className={`${tab.icon} text-xs`}></i>
                          <span>{tab.tag.split(' ')[0]}</span>
                        </button>
                      ))}
                    </div>

                    {/* Active Spec Details */}
                    <div className="mt-3.5 space-y-3">
                      <div>
                        <div className="text-xs font-semibold text-[#FAF9F6] flex items-center gap-2">
                          <span>{djiSpecs[activeSpecTab].title}</span>
                        </div>
                        <p className="text-[11px] text-zinc-300 leading-relaxed mt-1 font-normal">
                          {djiSpecs[activeSpecTab].description}
                        </p>
                      </div>

                      {/* Technical Metric Pills */}
                      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/10">
                        {djiSpecs[activeSpecTab].metrics.map((m, mIdx) => (
                          <div key={mIdx} className="bg-white/[0.04] rounded-lg p-2 border border-white/5 text-center">
                            <div className="text-[9px] font-mono uppercase text-zinc-400">
                              {m.label}
                            </div>
                            <div className="text-[11px] font-semibold text-[#FAF9F6] mt-0.5">
                              {m.val}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Scroll Hint */}
                      <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-zinc-400">
                        <span className="flex items-center gap-1.5">
                          <i className="ri-flight-takeoff-line text-xs text-sky-400"></i>
                          Scroll down to initiate flight
                        </span>
                        <span className="text-zinc-400 text-[9px]">
                          3-AXIS GIMBAL
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Repositioned Trust / Credentials Strip */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full pt-2 sm:pt-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 py-4 sm:py-5 border-t border-white/10">
            {stats.map((item, idx) => (
              <div key={idx} className="space-y-0.5 sm:space-y-1">
                <div className="font-display font-bold text-xs sm:text-sm tracking-wider text-[#FAF9F6]">
                  {item.label}
                </div>
                <div className="text-[11px] sm:text-xs text-zinc-300 font-normal">
                  {item.detail}
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>
    </div>
  );
}

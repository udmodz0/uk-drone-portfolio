import React, { useState, useRef, useEffect } from 'react';

export default function AerialComparisonSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [activePreset, setActivePreset] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef(null);

  // Track container width accurately for seamless 1:1 image alignment
  useEffect(() => {
    if (!containerRef.current) return;
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    const ro = new ResizeObserver(updateWidth);
    ro.observe(containerRef.current);
    window.addEventListener('resize', updateWidth);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  // Real client photos taken by AirVibe UK across Newcastle, Durham & Sunderland
  const presets = [
    {
      title: 'Trophy Presentation & Pavilion Gathering',
      subtitle: 'Newcastle Community Sports Event',
      badge: 'Real Client Event',
      groundImg: 'https://files.catbox.moe/d1p878.jpg',
      groundFallback: 'https://i.ibb.co/XkMJ9y5x/IMG-0020.jpg',
      groundFallback2: 'https://i.ibb.co/TqdhZK0M/IMG-0020.jpg',
      groundLabel: 'Real Ground Photo (iPhone 17 Pro)',
      groundDesc: 'Real ground-level capture of the trophy presentation under the pavilion marquee. Shows intimate emotion but completely misses the scale of the gathering, marquee footprint, and event atmosphere.',
      aerialImg: 'https://files.catbox.moe/hknyw6.JPEG',
      aerialFallback: 'https://i.ibb.co/hRWZ8R6Y/IMG-0025.jpg',
      aerialFallback2: 'https://i.ibb.co/99TVY9DZ/IMG-0025.jpg',
      aerialLabel: 'Real Drone Aerial (DJI Air 3S 50MP)',
      aerialDesc: 'Real 50MP aerial drone photo captured at 58m altitude revealing the full pavilion complex, festival tents, surrounding pitches, and complete crowd context in ultra-sharp detail.',
      telemetry: 'ALT: 58M // 50MP DUAL-LENS // 24MM WIDE // CAA CERTIFIED',
      location: 'Newcastle NE3 Sports Pavilion',
    },
    {
      title: 'Tournament Winners & Ground Scale',
      subtitle: 'Durham Sports Park Complex',
      badge: 'Real Client Shoot',
      groundImg: 'https://files.catbox.moe/9mz2ri.JPEG',
      groundFallback: 'https://i.ibb.co/Kc42r24L/IMG-0021.jpg',
      groundFallback2: 'https://i.ibb.co/hxQBmBQZ/IMG-0021.jpg',
      groundLabel: 'Real Ground Team Portrait',
      groundDesc: 'Real team portrait taken at pitch level. Sharp foreground subject focus, but reveals none of the wider grounds, event layout, or pitch boundaries.',
      aerialImg: 'https://files.catbox.moe/dddnw8.JPG',
      aerialFallback: 'https://i.ibb.co/LX8Kdssf/IMG-0018.jpg',
      aerialFallback2: 'https://i.ibb.co/8L0kgQQV/IMG-0018.jpg',
      aerialLabel: 'Real Drone Aerial (DJI Air 3S 50MP)',
      aerialDesc: 'Real bird’s-eye elevation photo at 75m altitude displaying the complete multi-pitch setup, perimeter grounds, and event infrastructure with architectural symmetry.',
      telemetry: 'ALT: 75M // 1" CMOS 50MP // LEVEL 6 WIND RESIST // CAA OP',
      location: 'Durham Event Park Grounds',
    },
    {
      title: 'Action Dynamics & 70mm Telephoto Depth',
      subtitle: 'Sunderland Pitch Competition',
      badge: 'Real Client Action',
      groundImg: 'https://files.catbox.moe/9mz2ri.JPEG',
      groundFallback: 'https://i.ibb.co/Kc42r24L/IMG-0021.jpg',
      groundFallback2: 'https://i.ibb.co/hxQBmBQZ/IMG-0021.jpg',
      groundLabel: 'Real Pitch-Level Angle',
      groundDesc: 'Standard wide eye-level photo without optical subject isolation or cinematic depth of field across the playing field.',
      aerialImg: 'https://files.catbox.moe/5amzzh.JPEG',
      aerialFallback: 'https://i.ibb.co/v4cxrywr/IMG-0019.jpg',
      aerialFallback2: 'https://i.ibb.co/B2fV7Wz7/IMG-0019.jpg',
      aerialLabel: 'Real Drone 70mm Telephoto (Air 3S)',
      aerialDesc: 'Real 70mm medium telephoto aerial shot compressing foreground action against lush turf with creamy optical bokeh and professional dynamic range.',
      telemetry: 'ALT: 42M // 70MM TELEPHOTO // 48MP HIGH RES // 10-BIT D-LOG',
      location: 'Sunderland Sports Complex',
    },
  ];

  const current = presets[activePreset];

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const positionPercent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(positionPercent);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <section id="comparison" className="py-20 sm:py-28 relative bg-[#0B0D11] border-t border-white/[0.08] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/40 text-emerald-300 text-[11px] font-mono tracking-widest uppercase mb-4 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>100% Real AirVibe Client Photography</span>
          </div>
          <h2 className="font-display font-semibold text-3xl sm:text-5xl text-[#FAF9F6] tracking-tight">
            Ground Camera vs. AirVibe Aerial Cinema
          </h2>
          <p className="mt-3.5 text-zinc-400 text-sm sm:text-base leading-relaxed">
            Drag the interactive slider below to directly compare <strong className="text-white font-medium">real client photos</strong> taken on the ground versus our <strong className="text-emerald-400 font-medium">50MP DJI Air 3S</strong> elevated perspectives at actual North East UK events.
          </p>

          {/* Preset Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-7">
            {presets.map((p, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setActivePreset(idx);
                  setSliderPosition(50);
                }}
                className={`group px-4 py-2.5 rounded-full text-xs font-mono tracking-wider transition-all flex items-center gap-2 ${
                  activePreset === idx
                    ? 'bg-emerald-500/20 text-emerald-200 border border-emerald-500/50 shadow-lg shadow-emerald-500/10 font-semibold'
                    : 'bg-white/[0.04] text-zinc-400 border border-white/10 hover:text-white hover:bg-white/[0.08]'
                }`}
              >
                <i className={`text-xs ${activePreset === idx ? 'ri-radio-button-fill text-emerald-400' : 'ri-image-line text-zinc-500'}`}></i>
                <span>{p.title.split('&')[0].trim()}</span>
                <span className="hidden sm:inline-block text-[9px] px-1.5 py-0.5 rounded bg-white/10 text-zinc-300">
                  {p.badge}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Location & Title Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4 px-2">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
            <i className="ri-map-pin-2-fill text-emerald-400"></i>
            <span className="text-white font-medium">{current.title}</span>
            <span className="text-zinc-500">•</span>
            <span className="text-zinc-400">{current.location}</span>
          </div>
          <div className="text-[11px] font-mono text-zinc-400 flex items-center gap-1.5">
            <i className="ri-drag-move-fill text-emerald-400"></i>
            <span>Drag slider handle left &amp; right to compare</span>
          </div>
        </div>

        {/* Interactive Comparison Container */}
        <div
          ref={containerRef}
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          onTouchMove={handleTouchMove}
          className="relative w-full h-[390px] sm:h-[540px] lg:h-[620px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/20 select-none cursor-ew-resize group bg-[#11141B]"
        >
          {/* Background Image: Real Aerial Drone Photo (Right side revealed) */}
          <img
            src={current.aerialImg}
            alt={current.aerialLabel}
            onError={(e) => {
              if (e.currentTarget.src !== current.aerialFallback) {
                e.currentTarget.src = current.aerialFallback;
              } else if (e.currentTarget.src !== current.aerialFallback2) {
                e.currentTarget.src = current.aerialFallback2;
              }
            }}
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
            loading="eager"
          />

          {/* Foreground Image: Real Ground Photo (Clipped to sliderPosition) */}
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{ width: `${sliderPosition}%` }}
          >
            <img
              src={current.groundImg}
              alt={current.groundLabel}
              onError={(e) => {
                if (e.currentTarget.src !== current.groundFallback) {
                  e.currentTarget.src = current.groundFallback;
                } else if (e.currentTarget.src !== current.groundFallback2) {
                  e.currentTarget.src = current.groundFallback2;
                }
              }}
              className="absolute inset-0 h-full pointer-events-none max-w-none"
              style={{
                width: containerWidth > 0 ? `${containerWidth}px` : '100%',
                objectFit: 'cover',
                objectPosition: 'center',
              }}
              loading="eager"
            />
            
            {/* Ground label overlay (Left side) */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20">
              <span className="px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-mono tracking-wider uppercase bg-black/85 border border-white/25 text-zinc-200 backdrop-blur-md shadow-xl flex items-center gap-1.5">
                <i className="ri-camera-3-line text-amber-400"></i>
                <span className="font-semibold">{current.groundLabel}</span>
              </span>
            </div>
          </div>

          {/* Aerial label overlay (Right side) */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
            <span className="px-3.5 py-1.5 rounded-full text-[10px] sm:text-xs font-mono tracking-wider uppercase bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 backdrop-blur-md shadow-xl flex items-center gap-1.5">
              <i className="ri-flight-takeoff-line text-emerald-400"></i>
              <span className="font-semibold">{current.aerialLabel}</span>
            </span>
          </div>

          {/* Telemetry HUD (Bottom Right) */}
          <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 hidden sm:block">
            <div className="px-3.5 py-2.5 rounded-xl bg-black/85 border border-white/20 backdrop-blur-md text-[10px] font-mono text-zinc-300 shadow-2xl">
              <div className="text-emerald-400 font-bold tracking-widest text-[9px] mb-0.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span>AUTHENTIC FLIGHT TELEMETRY</span>
              </div>
              <div className="text-zinc-200">{current.telemetry}</div>
            </div>
          </div>

          {/* Drag Divider Line */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_20px_rgba(255,255,255,0.9)] pointer-events-none z-30"
            style={{ left: `${sliderPosition}%` }}
          >
            {/* Liquid Center Handle */}
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-[#0B0D11]/95 border-2 border-white shadow-2xl flex items-center justify-center text-white backdrop-blur-xl group-hover:scale-110 transition-transform">
              <i className="ri-drag-move-fill text-lg sm:text-xl text-emerald-400"></i>
            </div>
          </div>

        </div>

        {/* Comparison Analysis Footer Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div className="p-4 sm:p-5 rounded-2xl bg-white/[0.03] border border-white/10 text-xs">
            <div className="flex items-center gap-2 mb-1.5">
              <i className="ri-eye-close-line text-amber-400"></i>
              <span className="font-mono text-amber-300 uppercase text-[10px] font-semibold tracking-wider">
                Ground View Reality
              </span>
            </div>
            <p className="text-zinc-300 leading-relaxed">
              {current.groundDesc}
            </p>
          </div>
          <div className="p-4 sm:p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-xs">
            <div className="flex items-center gap-2 mb-1.5">
              <i className="ri-flight-takeoff-line text-emerald-400"></i>
              <span className="font-mono text-emerald-300 uppercase text-[10px] font-semibold tracking-wider">
                AirVibe Aerial Transformation
              </span>
            </div>
            <p className="text-zinc-200 leading-relaxed">
              {current.aerialDesc}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

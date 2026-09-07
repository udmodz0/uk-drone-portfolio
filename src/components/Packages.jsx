import React, { useState } from 'react';

export default function Packages({ onSelectPackage }) {
  const [activeTab, setActiveTab] = useState('videography');

  const videographyPackages = [
    {
      id: 'essential',
      name: 'Essential',
      price: '£100',
      tagline: 'Perfect for smaller celebrations & special highlights.',
      duration: '2 Hours Coverage',
      icon: 'ri-zap-fill',
      badge: 'Starter Package',
      featured: false,
      features: [
        'Up to 2 hours on-site filming',
        'DJI Air 3S 4K aerial drone footage',
        '2 fully edited video highlights',
        '50 high-resolution edited photos',
        'Social-media-ready 9:16 vertical clips',
        'Secure 4K cloud digital delivery',
        'CAA Safety & Airspace Compliant'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '£250',
      tagline: 'Ideal for full parties & milestone events.',
      duration: '4 Hours Coverage',
      icon: 'ri-star-fill',
      badge: 'Most Popular',
      featured: true,
      features: [
        'Up to 4 hours on-site filming',
        'DJI Air 3S 4K aerial drone footage',
        '3 fully edited video highlights',
        '100 high-resolution edited photos',
        'Cinematic 4K color-graded showcase',
        'Social-media-ready reels included',
        'Priority 48-hour edit turnaround',
        'Full raw footage access on request'
      ]
    },
    {
      id: 'fullevent',
      name: 'Full Event VIP',
      price: '£400',
      tagline: 'Complete VIP coverage from arrival to departure.',
      duration: 'Up to 6 Hours Coverage',
      icon: 'ri-vip-crown-fill',
      badge: 'Complete VIP',
      featured: false,
      features: [
        'Up to 6 hours full event filming',
        'DJI Air 3S 4K aerial drone footage',
        '5 fully edited video highlights',
        '200 high-resolution edited photos',
        'Extended 4K cinematic film reel',
        'Multi-angle ground & aerial shots',
        'Priority 24-hour delivery window',
        'Full raw video archive included'
      ]
    }
  ];

  const photographyPackages = [
    {
      id: 'drone-photo',
      name: 'Drone Photography',
      price: '£30',
      tagline: 'Stunning 50MP aerial drone photography',
      count: '10 Edited Photos',
      icon: 'ri-camera-lens-fill',
      badge: '50MP Aerial RAW',
      features: [
        'Professional aerial drone photography',
        '10 high-resolution edited drone photos',
        '50MP Dual Camera resolution',
        'Professional Lightroom color grading',
        'Digital delivery via secure cloud link',
        'Newcastle • Sunderland • Durham'
      ]
    },
    {
      id: 'iphone-photo',
      name: 'iPhone Ground Photography',
      price: '£25',
      tagline: 'High-quality ground event photography',
      count: '10 Edited Photos',
      icon: 'ri-smartphone-fill',
      badge: 'iPhone 17 Pro',
      features: [
        'Professional photography via iPhone 17 Pro',
        '10 high-quality edited ground photos',
        'Ground-level portraits & candid moments',
        'Professional retouching & color adjustment',
        'Instant digital delivery',
        'Newcastle • Sunderland • Durham'
      ]
    }
  ];

  return (
    <section id="packages" className="py-24 bg-obsidian-950 relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-gold-500/5 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-gold-500/30 text-gold-400 text-xs font-mono font-bold uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            <i className="ri-price-tag-3-line text-sm text-gold-400"></i>
            TRANSPARENT PRICING
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            Event Videography & <span className="bg-gradient-to-r from-gold-400 to-amber-500 bg-clip-text text-transparent text-glow-gold">Photography Packages</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base leading-relaxed">
            Transparent pricing with zero hidden charges. Every package includes professional 4K editing and instant cloud delivery.
          </p>

          {/* High-Tech Tab Selector Switch */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl glass-panel-cinematic border border-white/10 shadow-2xl">
            <button
              onClick={() => setActiveTab('videography')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-mono font-bold text-xs transition-all duration-300 ${
                activeTab === 'videography'
                  ? 'bg-gold-gradient text-obsidian-950 shadow-[0_0_20px_rgba(245,158,11,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <i className="ri-movie-2-line text-base"></i>
              <span>Videography & Aerial Packages</span>
            </button>
            <button
              onClick={() => setActiveTab('photography')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-mono font-bold text-xs transition-all duration-300 ${
                activeTab === 'photography'
                  ? 'bg-gold-gradient text-obsidian-950 shadow-[0_0_20px_rgba(245,158,11,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <i className="ri-camera-lens-line text-base"></i>
              <span>Photography Packages</span>
            </button>
          </div>
        </div>

        {/* VIDEOGRAPHY PACKAGES GRID */}
        {activeTab === 'videography' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {videographyPackages.map((pkg) => (
              <div
                key={pkg.id}
                className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-500 relative ${
                  pkg.featured
                    ? 'glass-card-gold border-2 border-gold-400 shadow-[0_0_40px_rgba(245,158,11,0.3)] md:-translate-y-4'
                    : 'glass-panel-cinematic border border-white/10 hover:border-gold-500/40'
                }`}
              >
                {pkg.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gold-gradient text-obsidian-950 font-mono font-extrabold text-[11px] tracking-widest uppercase shadow-xl flex items-center gap-1.5">
                    <i className="ri-star-fill text-obsidian-950"></i>
                    {pkg.badge}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-obsidian-900 border border-white/15 flex items-center justify-center text-gold-400 shadow-inner">
                      <i className={`${pkg.icon} text-2xl text-gold-400`}></i>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-obsidian-900 text-slate-300 border border-white/10 flex items-center gap-1.5">
                      <i className="ri-time-line text-gold-400"></i>
                      {pkg.duration}
                    </span>
                  </div>

                  <h3 className="font-display font-black text-2xl text-white mt-6">{pkg.name}</h3>
                  <p className="text-slate-400 text-xs mt-1 min-h-[36px]">{pkg.tagline}</p>

                  <div className="mt-6 flex items-baseline gap-1.5">
                    <span className="font-display font-black text-5xl text-gold-400 text-glow-gold">{pkg.price}</span>
                    <span className="text-slate-400 text-xs font-mono">/ complete flight</span>
                  </div>

                  {/* Features List */}
                  <ul className="mt-8 space-y-3 pt-6 border-t border-white/10">
                    {pkg.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs text-slate-200">
                        <div className="w-4 h-4 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center flex-shrink-0 mt-0.5 border border-gold-500/40">
                          <i className="ri-check-line text-xs"></i>
                        </div>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4">
                  <button
                    onClick={() => onSelectPackage(pkg.name, pkg.price)}
                    className={`btn-shimmer w-full py-4 rounded-2xl font-mono font-bold text-xs transition-all duration-300 flex items-center justify-center gap-2 ${
                      pkg.featured
                        ? 'bg-gold-gradient text-obsidian-950 shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:shadow-[0_0_35px_rgba(245,158,11,0.6)]'
                        : 'bg-obsidian-850 hover:bg-slate-800 text-white border border-white/15 hover:border-gold-400/50'
                    }`}
                  >
                    <i className="ri-send-plane-fill text-sm"></i>
                    <span>Select {pkg.name} ({pkg.price})</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PHOTOGRAPHY PACKAGES GRID */}
        {activeTab === 'photography' && (
          <div id="photography" className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {photographyPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="glass-panel-cinematic p-8 rounded-3xl border border-white/10 hover:border-gold-500/40 transition-all flex flex-col justify-between shadow-2xl"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-obsidian-900 border border-white/15 flex items-center justify-center text-gold-400">
                      <i className={`${pkg.icon} text-2xl text-gold-400`}></i>
                    </div>
                    <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-gold-500/10 text-gold-400 border border-gold-500/30">
                      {pkg.badge}
                    </span>
                  </div>

                  <h3 className="font-display font-black text-2xl text-white mt-6">{pkg.name}</h3>
                  <p className="text-slate-400 text-xs mt-1">{pkg.tagline}</p>

                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="font-display font-black text-5xl text-gold-400 text-glow-gold">{pkg.price}</span>
                    <span className="text-slate-300 text-xs font-mono">({pkg.count})</span>
                  </div>

                  <ul className="mt-8 space-y-3 pt-6 border-t border-white/10">
                    {pkg.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs text-slate-200">
                        <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5 border border-emerald-500/40">
                          <i className="ri-check-line text-xs"></i>
                        </div>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4">
                  <button
                    onClick={() => onSelectPackage(pkg.name, pkg.price)}
                    className="btn-shimmer w-full py-4 rounded-2xl font-mono font-bold text-xs bg-gold-gradient text-obsidian-950 shadow-[0_0_25px_rgba(245,158,11,0.3)] hover:shadow-[0_0_35px_rgba(245,158,11,0.5)] transition-all flex items-center justify-center gap-2"
                  >
                    <i className="ri-send-plane-fill text-sm"></i>
                    <span>Select {pkg.name} ({pkg.price})</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tailored Custom Quote Banner */}
        <div className="mt-14 max-w-4xl mx-auto glass-card-gold p-6 rounded-3xl border border-gold-500/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div>
            <div className="flex items-center gap-2 text-gold-300 font-bold text-sm font-display">
              <i className="ri-sparkling-fill text-gold-400 text-base"></i>
              <span>Custom Flight Missions & Bespoke Packages</span>
            </div>
            <p className="text-slate-300 text-xs mt-1 leading-relaxed">
              Require specific flight durations, thermal photogrammetry, or multi-day event coverage? We craft tailored quotes for any project.
            </p>
          </div>
          
          <a
            href="https://wa.me/447432266867?text=Hi!%20I'd%20like%20a%20bespoke%20quote%20for%20a%20custom%20drone/photography%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shimmer px-6 py-3.5 rounded-xl bg-obsidian-900 hover:bg-obsidian-850 text-slate-100 border border-white/20 hover:border-gold-400 text-xs font-mono font-bold transition-all flex-shrink-0 shadow-lg"
          >
            Request Custom Flight Quote
          </a>
        </div>

      </div>
    </section>
  );
}

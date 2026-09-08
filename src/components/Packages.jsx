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
    <section id="packages" className="py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-blue-500/5 rounded-full blur-[160px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-blue-200 text-blue-700 bg-white/90 text-xs font-mono font-bold uppercase tracking-widest mb-4 shadow-sm">
            <i className="ri-price-tag-3-line text-sm text-blue-600"></i>
            TRANSPARENT PRICING
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-slate-950 tracking-tight">
            Event Videography & <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600 bg-clip-text text-transparent">Photography Packages</span>
          </h2>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Transparent pricing with zero hidden charges. Every package includes professional 4K editing and instant cloud delivery.
          </p>

          {/* High-Tech Tab Selector Switch */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl glass-panel-cinematic border border-slate-200 shadow-sm bg-white/90">
            <button
              onClick={() => setActiveTab('videography')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-mono font-bold text-xs transition-all duration-300 ${
                activeTab === 'videography'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <i className="ri-movie-2-line text-base"></i>
              <span>Videography & Aerial Packages</span>
            </button>
            <button
              onClick={() => setActiveTab('photography')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-mono font-bold text-xs transition-all duration-300 ${
                activeTab === 'photography'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900'
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
                    ? 'glass-card-blue border-2 border-blue-500 shadow-lg md:-translate-y-4 bg-gradient-to-b from-blue-50/90 to-sky-50/90'
                    : 'glass-panel-cinematic border border-slate-200 hover:border-blue-400 bg-white/80 shadow-sm'
                }`}
              >
                {pkg.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-mono font-extrabold text-[11px] tracking-widest uppercase shadow-md flex items-center gap-1.5 border border-blue-400/40">
                    <i className="ri-star-fill text-white"></i>
                    {pkg.badge}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-sm">
                      <i className={`${pkg.icon} text-2xl text-blue-600`}></i>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-slate-100 text-slate-700 border border-slate-200 flex items-center gap-1.5">
                      <i className="ri-time-line text-blue-600"></i>
                      {pkg.duration}
                    </span>
                  </div>

                  <h3 className="font-display font-black text-2xl text-slate-950 mt-6">{pkg.name}</h3>
                  <p className="text-slate-600 text-xs mt-1 min-h-[36px]">{pkg.tagline}</p>

                  <div className="mt-6 flex items-baseline gap-1.5">
                    <span className="font-display font-black text-5xl text-slate-950">{pkg.price}</span>
                    <span className="text-slate-500 text-xs font-mono">/ complete flight</span>
                  </div>

                  {/* Features List */}
                  <ul className="mt-8 space-y-3 pt-6 border-t border-slate-200">
                    {pkg.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs text-slate-700">
                        <div className="w-4 h-4 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5 border border-blue-200">
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
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md hover:shadow-lg border border-blue-500/30'
                        : 'bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 hover:border-blue-400 shadow-sm'
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
                className="glass-panel-cinematic p-8 rounded-3xl border border-slate-200 hover:border-blue-400 transition-all flex flex-col justify-between shadow-sm bg-white/80"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                      <i className={`${pkg.icon} text-2xl text-blue-600`}></i>
                    </div>
                    <span className="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200">
                      {pkg.badge}
                    </span>
                  </div>

                  <h3 className="font-display font-black text-2xl text-slate-950 mt-6">{pkg.name}</h3>
                  <p className="text-slate-600 text-xs mt-1">{pkg.tagline}</p>

                  <div className="mt-6 flex items-baseline gap-2">
                    <span className="font-display font-black text-5xl text-slate-950">{pkg.price}</span>
                    <span className="text-slate-500 text-xs font-mono">({pkg.count})</span>
                  </div>

                  <ul className="mt-8 space-y-3 pt-6 border-t border-slate-200">
                    {pkg.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-3 text-xs text-slate-700">
                        <div className="w-4 h-4 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5 border border-blue-200">
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
                    className="btn-shimmer w-full py-4 rounded-2xl font-mono font-bold text-xs bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 border border-blue-500/30"
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
        <div className="mt-14 max-w-4xl mx-auto glass-card-blue p-6 rounded-3xl border border-blue-200 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md bg-gradient-to-r from-blue-50/90 to-sky-50/90">
          <div>
            <div className="flex items-center gap-2 text-blue-800 font-bold text-sm font-display">
              <i className="ri-sparkling-fill text-blue-600 text-base"></i>
              <span>Custom Flight Missions & Bespoke Packages</span>
            </div>
            <p className="text-slate-700 text-xs mt-1 leading-relaxed">
              Require specific flight durations, thermal photogrammetry, or multi-day event coverage? We craft tailored quotes for any project.
            </p>
          </div>
          
          <a
            href="https://wa.me/447432266867?text=Hi!%20I'd%20like%20a%20bespoke%20quote%20for%20a%20custom%20drone/photography%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-shimmer px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white border border-blue-500/30 hover:border-blue-400 text-xs font-mono font-bold transition-all flex-shrink-0 shadow-md"
          >
            Request Custom Flight Quote
          </a>
        </div>

      </div>
    </section>
  );
}


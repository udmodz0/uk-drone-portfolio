import React, { useState } from 'react';

export default function Packages({ onSelectPackage, siteData }) {
  const [activeTab, setActiveTab] = useState('videography');

  const defaultVideoPackages = [
    {
      id: 'essential',
      name: 'Essential',
      price: '£100',
      duration: '2 Hours Coverage',
      tagline: 'Perfect for smaller celebrations and special highlights.',
      featured: false,
      features: [
        'Up to 2 hours filming',
        'Drone aerial footage (DJI Air 3S)',
        '2 edited videos',
        '50 edited photos',
        'Social-media-ready videos',
        'High-quality digital delivery'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '£250',
      duration: '4 Hours Coverage',
      tagline: 'Ideal for full parties and milestone event coverage.',
      featured: true,
      features: [
        'Up to 4 hours filming',
        'Drone aerial footage (DJI Air 3S)',
        '3 edited videos',
        '100 edited photos',
        'Longer highlight video',
        'Social-media-ready content',
        'High-quality digital delivery'
      ]
    },
    {
      id: 'fullevent',
      name: 'Full Event',
      price: '£400',
      duration: 'Up to 6 Hours Coverage',
      tagline: 'Complete package from guest arrival to conclusion.',
      featured: false,
      features: [
        'Up to 6 hours filming',
        'Drone aerial footage (DJI Air 3S)',
        '5 edited videos',
        '200 edited photos',
        'Cinematic highlight video',
        'Social-media-ready content',
        'High-quality digital delivery'
      ]
    }
  ];

  const defaultPhotoPackages = [
    {
      id: 'drone-photo',
      name: 'Drone Photography',
      price: '£30',
      count: '10 Edited Photos',
      tagline: 'Stunning 50MP aerial drone photography.',
      features: [
        'Professional aerial drone photography',
        '10 high-resolution edited drone photos',
        '50MP Dual Camera resolution',
        'Professional color grading',
        'Digital delivery via secure cloud link'
      ]
    },
    {
      id: 'iphone-photo',
      name: 'iPhone Photography',
      price: '£25',
      count: '10 Edited Photos',
      tagline: 'High-quality ground event photography.',
      features: [
        'Professional photography via iPhone 17 Pro',
        '10 high-quality edited ground photos',
        'Ground-level portraits & candid moments',
        'Professional retouching & color adjustment',
        'Instant digital delivery'
      ]
    }
  ];

  const videoPackages = siteData?.videographyPackages || defaultVideoPackages;
  const photoPackages = siteData?.photographyPackages || defaultPhotoPackages;

  return (
    <section id="packages" className="py-16 sm:py-24 md:py-32 bg-[#0E1117] border-y border-white/[0.08] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14">
          <div className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-zinc-300 mb-3 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-aviation-500"></span>
            <span>Investment</span>
          </div>
          <h2 className="font-display font-semibold text-2xl sm:text-4xl lg:text-5xl text-[#FAF9F6] tracking-tight">
            Event Packages
          </h2>
          <p className="mt-3 sm:mt-4 text-zinc-300 text-xs sm:text-base leading-relaxed font-normal">
            Flexible coverage designed around your event. Transparent rates with no hidden costs.
          </p>

          {/* Liquid Capsule Tab Switcher */}
          <div className="mt-6 sm:mt-8 inline-flex p-1.5 rounded-full bg-white/[0.04] border border-white/15 backdrop-blur-md max-w-full overflow-x-auto">
            <button
              onClick={() => setActiveTab('videography')}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'videography'
                  ? 'btn-liquid-primary shadow-sm'
                  : 'text-zinc-300 hover:text-white'
              }`}
            >
              Videography Packages
            </button>
            <button
              onClick={() => setActiveTab('photography')}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'photography'
                  ? 'btn-liquid-primary shadow-sm'
                  : 'text-zinc-300 hover:text-white'
              }`}
            >
              Photography Stills
            </button>
          </div>
        </div>

        {/* Videography Cards */}
        {activeTab === 'videography' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {videoPackages.map((pkg) => (
              <div
                key={pkg.id}
                className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  pkg.featured
                    ? 'studio-card border-white/20 bg-[#161B23] shadow-2xl relative lg:-translate-y-2'
                    : 'studio-card bg-[#12151B]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] sm:text-xs uppercase tracking-widest font-mono text-zinc-300">
                      {pkg.duration}
                    </span>
                    {pkg.featured && (
                      <span className="btn-liquid px-3 py-0.5 text-[10px] uppercase font-mono tracking-wider text-zinc-200">
                        Curated
                      </span>
                    )}
                  </div>

                  <h3 className="font-display font-semibold text-xl sm:text-2xl text-[#FAF9F6] mt-4">
                    {pkg.name}
                  </h3>
                  <p className="text-zinc-300 text-xs mt-1.5 min-h-[32px]">
                    {pkg.tagline}
                  </p>

                  <div className="mt-5 sm:mt-6 flex items-baseline gap-1.5 pb-5 sm:pb-6 border-b border-white/[0.08]">
                    <span className="font-display font-bold text-3xl sm:text-4xl text-[#FAF9F6]">{pkg.price}</span>
                    <span className="text-zinc-400 text-xs font-mono">/ complete flight</span>
                  </div>

                  {/* Features */}
                  <ul className="mt-5 sm:mt-6 space-y-2.5 sm:space-y-3">
                    {pkg.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-zinc-300">
                        <i className="ri-check-line text-sm text-emerald-400 flex-shrink-0 mt-[-1px]"></i>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4">
                  <button
                    onClick={() => onSelectPackage(pkg.name, pkg.price)}
                    className={`w-full py-3.5 text-xs font-semibold tracking-wide transition-all ${
                      pkg.featured
                        ? 'btn-liquid-primary'
                        : 'btn-liquid'
                    }`}
                  >
                    Book This Package
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Photography Cards */}
        {activeTab === 'photography' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            {photoPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="studio-card bg-[#12151B] rounded-2xl p-6 sm:p-8 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] sm:text-xs uppercase tracking-widest font-mono text-zinc-300">
                      {pkg.count || '10 Photos'}
                    </span>
                  </div>

                  <h3 className="font-display font-semibold text-xl sm:text-2xl text-[#FAF9F6] mt-4">
                    {pkg.name}
                  </h3>
                  <p className="text-zinc-300 text-xs mt-1.5">
                    {pkg.tagline}
                  </p>

                  <div className="mt-5 sm:mt-6 flex items-baseline gap-1.5 pb-5 sm:pb-6 border-b border-white/[0.08]">
                    <span className="font-display font-bold text-3xl sm:text-4xl text-[#FAF9F6]">{pkg.price}</span>
                    <span className="text-zinc-400 text-xs font-mono">/ set</span>
                  </div>

                  <ul className="mt-5 sm:mt-6 space-y-2.5 sm:space-y-3">
                    {pkg.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-zinc-300">
                        <i className="ri-check-line text-sm text-emerald-400 flex-shrink-0 mt-[-1px]"></i>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4">
                  <button
                    onClick={() => onSelectPackage(pkg.name, pkg.price)}
                    className="btn-liquid w-full py-3.5 text-xs font-semibold tracking-wide"
                  >
                    Book This Package
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Editorial Optional Extras Section */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-2xl bg-[#12151B] border border-white/[0.08] max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                Tailored Adjustments
              </span>
              <h4 className="font-display font-semibold text-lg sm:text-xl text-[#FAF9F6] mt-1">
                Optional Extras
              </h4>
              <p className="text-xs text-zinc-300 mt-2 max-w-xl leading-relaxed">
                Additional filming time • Extra edited videos • Additional photographs • Bespoke editing packages
              </p>
              <p className="text-xs text-zinc-400 mt-1">
                Contact us for a tailored quote suited to your custom event schedule.
              </p>
            </div>

            <a
              href="https://wa.me/447432266867?text=Hi!%20I'd%20like%20a%20bespoke%20quote%20for%20a%20custom%20drone/photography%20project."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-liquid px-6 py-3 text-xs font-semibold whitespace-nowrap flex items-center justify-center gap-2 self-stretch sm:self-center"
            >
              <span>Inquire For Custom Quote</span>
              <i className="ri-arrow-right-line text-xs"></i>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

import React, { useState } from 'react';
import { Check, Star, Crown, Zap, Send, Clock, Video, Camera, Sparkles, Smartphone } from 'lucide-react';

export default function Packages({ onSelectPackage }) {
  const [activeTab, setActiveTab] = useState('videography');

  const videographyPackages = [
    {
      id: 'essential',
      name: 'Essential',
      price: '£100',
      tagline: 'Perfect for smaller events and special moments.',
      duration: '2 Hours Coverage',
      icon: Zap,
      badge: 'Starter',
      featured: false,
      features: [
        'Up to 2 hours filming',
        'Drone aerial footage (DJI Air 3S)',
        '2 edited videos',
        '50 edited photos',
        'Social-media-ready videos',
        'High-quality digital delivery',
        'CAA Safety Compliant'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '£250',
      tagline: 'Ideal for larger celebrations & full party coverage.',
      duration: '4 Hours Coverage',
      icon: Star,
      badge: 'Most Popular',
      featured: true,
      features: [
        'Up to 4 hours filming',
        'Drone aerial footage (DJI Air 3S)',
        '3 edited videos',
        '100 edited photos',
        'Longer highlight video',
        'Social-media-ready content',
        'High-quality digital delivery',
        'Priority editing turnaround'
      ]
    },
    {
      id: 'fullevent',
      name: 'Full Event',
      price: '£400',
      tagline: 'Complete package from start to finish.',
      duration: 'Up to 6 Hours Coverage',
      icon: Crown,
      badge: 'Complete VIP',
      featured: false,
      features: [
        'Up to 6 hours filming',
        'Drone aerial footage (DJI Air 3S)',
        '5 edited videos',
        '200 edited photos',
        'Cinematic highlight video',
        'Social-media-ready content',
        'High-quality digital delivery',
        'Full raw footage access on request'
      ]
    }
  ];

  const photographyPackages = [
    {
      id: 'drone-photo',
      name: 'Drone Photography',
      price: '£30',
      tagline: 'Stunning 50MP aerial drone photos',
      count: '10 Edited Photos',
      icon: Camera,
      badge: '50MP Aerial',
      features: [
        'Professional aerial drone photography',
        '10 high-quality edited drone photos',
        '50MP Dual Camera resolution',
        'Professional photo color grading',
        'Digital delivery via secure link',
        'Newcastle • Sunderland • Durham'
      ]
    },
    {
      id: 'iphone-photo',
      name: 'iPhone Photography',
      price: '£25',
      tagline: 'High-quality ground event photography',
      count: '10 Edited Photos',
      icon: Smartphone,
      badge: 'iPhone 17 Pro',
      features: [
        'Professional photography using iPhone 17 Pro',
        '10 high-quality edited photos',
        'Ground-level portraits & candid moments',
        'Professional photo editing & retouching',
        'Digital delivery',
        'Newcastle • Sunderland • Durham'
      ]
    }
  ];

  return (
    <section id="packages" className="py-24 bg-obsidian-900 relative">
      {/* Background Subtle Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold-500/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            Transparent Pricing
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            Event Videography & <span className="text-gold-400">Photography Packages</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base">
            No hidden costs. Every package includes professional editing and high-res digital delivery.
          </p>

          {/* Tab Selector */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-obsidian-950 border border-slate-800 backdrop-blur-md">
            <button
              onClick={() => setActiveTab('videography')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs transition-all ${
                activeTab === 'videography'
                  ? 'bg-gold-gradient text-obsidian-950 shadow-lg shadow-gold-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>Event Videography & Drone</span>
            </button>
            <button
              onClick={() => setActiveTab('photography')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs transition-all ${
                activeTab === 'photography'
                  ? 'bg-gold-gradient text-obsidian-950 shadow-lg shadow-gold-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>Photography Packages</span>
            </button>
          </div>
        </div>

        {/* VIDEOGRAPHY PACKAGES */}
        {activeTab === 'videography' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {videographyPackages.map((pkg) => {
              const Icon = pkg.icon;
              return (
                <div
                  key={pkg.id}
                  className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                    pkg.featured
                      ? 'glass-card-gold border-2 border-gold-400/70 shadow-2xl shadow-gold-500/15 md:-translate-y-3'
                      : 'glass-panel border border-slate-800 hover:border-gold-500/30'
                  }`}
                >
                  {pkg.featured && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gold-gradient text-obsidian-950 font-extrabold text-[11px] tracking-wider uppercase shadow-md flex items-center gap-1">
                      <Star className="w-3 h-3 fill-obsidian-950" />
                      {pkg.badge}
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-obsidian-950 border border-slate-700/60 flex items-center justify-center text-gold-400">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-900 text-slate-300 border border-slate-800 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-gold-400" />
                        {pkg.duration}
                      </span>
                    </div>

                    <h3 className="font-display font-black text-2xl text-white mt-6">{pkg.name}</h3>
                    <p className="text-slate-400 text-xs mt-1 min-h-[32px]">{pkg.tagline}</p>

                    <div className="mt-6 flex items-baseline gap-1">
                      <span className="font-display font-black text-4xl text-gold-400">{pkg.price}</span>
                      <span className="text-slate-400 text-xs font-medium">/ package</span>
                    </div>

                    {/* Features list */}
                    <ul className="mt-8 space-y-3 pt-6 border-t border-slate-800/80">
                      {pkg.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-3 text-xs text-slate-200">
                          <div className="w-4 h-4 rounded-full bg-gold-500/20 text-gold-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3" />
                          </div>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-4">
                    <button
                      onClick={() => onSelectPackage(pkg.name, pkg.price)}
                      className={`w-full py-3.5 rounded-2xl font-bold text-xs transition-all flex items-center justify-center gap-2 ${
                        pkg.featured
                          ? 'bg-gold-gradient text-obsidian-950 shadow-lg shadow-gold-500/20 hover:opacity-95'
                          : 'bg-obsidian-850 hover:bg-slate-800 text-white border border-slate-700'
                      }`}
                    >
                      <Send className="w-4 h-4" />
                      <span>Book {pkg.name} ({pkg.price})</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* PHOTOGRAPHY PACKAGES */}
        {activeTab === 'photography' && (
          <div id="photography" className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {photographyPackages.map((pkg) => {
              const Icon = pkg.icon;
              return (
                <div
                  key={pkg.id}
                  className="glass-panel p-8 rounded-3xl border border-slate-800 hover:border-gold-500/30 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-2xl bg-obsidian-950 border border-slate-700 flex items-center justify-center text-gold-400">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-gold-500/10 text-gold-400 border border-gold-500/30">
                        {pkg.badge}
                      </span>
                    </div>

                    <h3 className="font-display font-black text-2xl text-white mt-6">{pkg.name}</h3>
                    <p className="text-slate-400 text-xs mt-1">{pkg.tagline}</p>

                    <div className="mt-6 flex items-baseline gap-2">
                      <span className="font-display font-black text-4xl text-gold-400">{pkg.price}</span>
                      <span className="text-slate-300 text-xs font-semibold">({pkg.count})</span>
                    </div>

                    <ul className="mt-8 space-y-3 pt-6 border-t border-slate-800/80">
                      {pkg.features.map((feat, i) => (
                        <li key={i} className="flex items-start gap-3 text-xs text-slate-200">
                          <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3" />
                          </div>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-4">
                    <button
                      onClick={() => onSelectPackage(pkg.name, pkg.price)}
                      className="w-full py-3.5 rounded-2xl font-bold text-xs bg-gold-gradient text-obsidian-950 shadow-md hover:opacity-95 transition-all flex items-center justify-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Book {pkg.name} ({pkg.price})</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Optional Extras Box */}
        <div className="mt-12 max-w-4xl mx-auto glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-gold-400 font-bold text-sm">
              <Sparkles className="w-4 h-4" />
              <span>➕ Optional Extras & Bespoke Packages</span>
            </div>
            <p className="text-slate-300 text-xs mt-1">
              Need additional filming hours, extra edited photographs, or custom video edits? We cater tailored packages for any event length.
            </p>
          </div>
          
          <a
            href="https://wa.me/447432266867?text=Hi!%20I'd%20like%20a%20bespoke%20quote%20for%20extra%20drone/photography%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-obsidian-850 hover:bg-obsidian-800 text-slate-100 border border-slate-700 text-xs font-bold transition-all flex-shrink-0"
          >
            Request Custom Quote
          </a>
        </div>

      </div>
    </section>
  );
}

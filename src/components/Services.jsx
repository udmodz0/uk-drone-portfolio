import React from 'react';
import { Camera, Film, Sparkles, Smartphone, PartyPopper, Users, Heart, MapPin, Check, Video } from 'lucide-react';

export default function Services() {
  const servicesList = [
    {
      icon: Video,
      title: 'Professional Drone Videography',
      desc: 'Stunning 4K aerial footage filmed with DJI Air 3S dual-camera system, capturing sweeping views and cinematic highlight sequences.',
      tag: 'Aerial 4K'
    },
    {
      icon: Camera,
      title: 'High-Quality 50MP Photography',
      desc: 'Crystal-clear 50-megapixel aerial photos delivering ultra-fine detail, vibrant contrast, and professional color grading.',
      tag: '50MP Sensor'
    },
    {
      icon: Film,
      title: 'Professional Video Editing',
      desc: 'We don’t just hand over raw footage — we edit, color grade, add sound design, and craft polished ready-to-share videos.',
      tag: 'Post-Production'
    },
    {
      icon: Smartphone,
      title: 'Social Media Short-Form Videos',
      desc: 'Custom vertical and high-energy video clips designed specifically for Instagram Reels, TikTok, and YouTube Shorts.',
      tag: 'Vertical Reels'
    },
    {
      icon: PartyPopper,
      title: 'Birthdays & Celebrations',
      desc: 'Make birthdays and milestone celebrations unforgettable with memorable aerial group shots and event highlights.',
      tag: 'Event Coverage'
    },
    {
      icon: Users,
      title: 'Outdoor Parties & Private Events',
      desc: 'Discreet and professional filming for garden parties, family gatherings, BBQs, and private outdoor celebrations.',
      tag: 'Private Events'
    }
  ];

  return (
    <section id="services" className="py-24 bg-obsidian-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            What We Offer
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            Comprehensive Drone & Ground <span className="text-gold-400">Media Services</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base leading-relaxed">
            Whether you’re celebrating a birthday, hosting an outdoor party, or organising a special event in Newcastle, Sunderland, or Durham, we capture every angle.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div 
                key={idx} 
                className="glass-panel p-8 rounded-3xl border border-slate-800/80 glass-panel-hover group relative overflow-hidden"
              >
                {/* Accent glow on hover */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 rounded-full blur-2xl group-hover:bg-gold-500/15 transition-all"></div>
                
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-obsidian-900 border border-slate-700/60 flex items-center justify-center text-gold-400 group-hover:border-gold-500/50 group-hover:scale-110 transition-all shadow-lg">
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-slate-900 text-slate-300 border border-slate-800">
                    {srv.tag}
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl text-white group-hover:text-gold-400 transition-colors">
                  {srv.title}
                </h3>
                
                <p className="mt-3 text-slate-400 text-sm leading-relaxed">
                  {srv.desc}
                </p>

                <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center gap-2 text-xs font-semibold text-gold-400">
                  <Check className="w-4 h-4 text-gold-500" />
                  <span>Fully Edited & Digital Delivery</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Regional Badge Strip */}
        <div className="mt-16 p-6 rounded-2xl bg-obsidian-900 border border-slate-800 text-center flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-skyline-500/10 text-skyline-400 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-white font-bold text-sm">Regional Coverage Base: Newcastle (NE3)</div>
              <div className="text-slate-400 text-xs">Serving Newcastle, Sunderland, Durham & surrounding North East areas</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {['Newcastle upon Tyne', 'Sunderland', 'Durham', 'NE3 & Surrounding'].map((loc, i) => (
              <span key={i} className="px-3 py-1 rounded-lg bg-obsidian-850 border border-slate-700/60 text-slate-300 text-xs font-medium">
                📍 {loc}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

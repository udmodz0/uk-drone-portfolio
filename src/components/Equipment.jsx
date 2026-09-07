import React from 'react';
import { Cpu, ShieldCheck, Zap, Camera, Smartphone, Eye, CheckCircle2, Award } from 'lucide-react';

export default function Equipment() {
  return (
    <section id="equipment" className="py-24 bg-obsidian-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Cpu className="w-3.5 h-3.5" />
            Professional Gear & Tech
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            Powered By Dual-Camera <span className="text-gold-400">DJI Air 3S</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base">
            We operate industry-leading equipment to guarantee crisp 50MP imagery, ultra-smooth 4K video, and reliable ground capture.
          </p>
        </div>

        {/* Dual Gear Breakdown Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* DJI Air 3S Card */}
          <div className="glass-panel p-8 rounded-3xl border border-slate-800 relative hover:border-gold-500/40 transition-all">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 font-bold">
                  🚁
                </div>
                <div>
                  <span className="text-[11px] font-bold text-gold-400 uppercase tracking-widest">Primary Drone Setup</span>
                  <h3 className="font-display font-bold text-2xl text-white">DJI Air 3S Dual-Camera System</h3>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-gold-500/20 text-gold-300 border border-gold-500/40">
                50MP 4K HDR
              </span>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              Equipped with a primary 1-inch CMOS sensor and a 70mm telephoto lens, the DJI Air 3S captures unbelievable detail, vivid dynamic range, and exceptional low-light event footage.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-obsidian-900 border border-slate-800">
                <div className="text-gold-400 font-bold text-base">50MP Resolution</div>
                <div className="text-xs text-slate-400">Ultra High-Definition Stills</div>
              </div>

              <div className="p-3.5 rounded-xl bg-obsidian-900 border border-slate-800">
                <div className="text-skyline-400 font-bold text-base">4K 60fps HDR</div>
                <div className="text-xs text-slate-400">Cinematic Slow Motion</div>
              </div>

              <div className="p-3.5 rounded-xl bg-obsidian-900 border border-slate-800">
                <div className="text-emerald-400 font-bold text-base">Nightscape Sensing</div>
                <div className="text-xs text-slate-400">Omnidirectional Safety</div>
              </div>

              <div className="p-3.5 rounded-xl bg-obsidian-900 border border-slate-800">
                <div className="text-purple-400 font-bold text-base">10-Bit D-Log M</div>
                <div className="text-xs text-slate-400">Pro Color Spectrum</div>
              </div>
            </div>
          </div>

          {/* iPhone 17 Pro Card */}
          <div className="glass-panel p-8 rounded-3xl border border-slate-800 relative hover:border-skyline-500/40 transition-all">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-skyline-500/10 border border-skyline-500/30 flex items-center justify-center text-skyline-400 font-bold">
                  📱
                </div>
                <div>
                  <span className="text-[11px] font-bold text-skyline-400 uppercase tracking-widest">Ground Photography</span>
                  <h3 className="font-display font-bold text-2xl text-white">iPhone 17 Pro Ground Camera</h3>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-skyline-500/20 text-skyline-300 border border-skyline-500/40">
                ProRAW 48MP
              </span>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed mb-6">
              For close-up ground shots, candid event moments, and social media reels, we use the iPhone 17 Pro camera array to capture crisp 48MP photos and smooth ground video.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-obsidian-900 border border-slate-800">
                <div className="text-skyline-400 font-bold text-base">48MP ProRAW</div>
                <div className="text-xs text-slate-400">Lossless Ground Detail</div>
              </div>

              <div className="p-3.5 rounded-xl bg-obsidian-900 border border-slate-800">
                <div className="text-gold-400 font-bold text-base">4K ProRes Video</div>
                <div className="text-xs text-slate-400">Broadcast Grade Reels</div>
              </div>

              <div className="p-3.5 rounded-xl bg-obsidian-900 border border-slate-800">
                <div className="text-emerald-400 font-bold text-base">Cinematic Portrait</div>
                <div className="text-xs text-slate-400">Natural Bokeh Blur</div>
              </div>

              <div className="p-3.5 rounded-xl bg-obsidian-900 border border-slate-800">
                <div className="text-purple-400 font-bold text-base">Instant Delivery</div>
                <div className="text-xs text-slate-400">Social Media Formats</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

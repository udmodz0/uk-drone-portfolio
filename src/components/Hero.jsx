import React from 'react';
import { Camera, Video, ShieldCheck, MapPin, Calendar, ArrowRight, Zap, CheckCircle2, Award, Sparkles } from 'lucide-react';

export default function Hero({ onOpenBooking }) {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-drone-radial">
      {/* Background Radar / Grid Overlay */}
      <div className="absolute inset-0 radar-grid opacity-30 pointer-events-none"></div>
      
      {/* Dynamic Glowing Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow"></div>
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-skyline-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* CAA Registration Banner & Booking Rule Alert */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-gold-500/30 text-gold-400 text-xs font-semibold shadow-lg backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-gold-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>UK CAA Registered Pilot & Operator</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-skyline-500/30 text-skyline-400 text-xs font-semibold backdrop-blur-md">
            <MapPin className="w-3.5 h-3.5 text-skyline-400" />
            <span>Newcastle • Sunderland • Durham (NE3 Base)</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-medium backdrop-blur-md">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            <span>Book Appointment 1 Week in Advance</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-white tracking-tight leading-[1.1]">
            Capture Your Moments From A <span className="bg-gradient-to-r from-gold-400 via-amber-300 to-gold-500 bg-clip-text text-transparent drop-shadow-sm">Whole New Perspective</span>
          </h1>

          <p className="mt-6 text-base sm:text-xl text-slate-300 font-normal leading-relaxed max-w-3xl mx-auto">
            Professional drone photography & videography service across Newcastle, Sunderland, Durham and surrounding areas. Delivering stunning 50MP aerial imagery, cinematic 4K video, and expertly edited event media.
          </p>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl text-base font-bold text-obsidian-950 bg-gold-gradient hover:opacity-95 shadow-xl shadow-gold-500/25 transition-all hover:scale-105 active:scale-95 group"
            >
              <Calendar className="w-5 h-5 text-obsidian-950" />
              <span>Book Your Event Package</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="https://wa.me/447432266867?text=Hi!%20I'd%20like%20to%20book%20a%20drone/videography%20session%20in%20Newcastle/NE3."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-7 py-4 rounded-2xl text-base font-semibold text-slate-100 bg-obsidian-850 hover:bg-obsidian-800 border border-slate-700/80 hover:border-gold-500/40 transition-all shadow-lg"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>WhatsApp Direct (+44 7432266867)</span>
            </a>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          
          <div className="glass-panel p-4 rounded-2xl border border-slate-800/80 text-center hover:border-gold-500/30 transition-all">
            <div className="w-10 h-10 mx-auto rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 mb-2">
              <Camera className="w-5 h-5" />
            </div>
            <div className="text-xl font-bold text-white font-display">50MP Camera</div>
            <div className="text-xs text-slate-400 mt-0.5">DJI Air 3S Dual Camera</div>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-slate-800/80 text-center hover:border-gold-500/30 transition-all">
            <div className="w-10 h-10 mx-auto rounded-xl bg-skyline-500/10 border border-skyline-500/20 flex items-center justify-center text-skyline-400 mb-2">
              <Video className="w-5 h-5" />
            </div>
            <div className="text-xl font-bold text-white font-display">4K Video Filming</div>
            <div className="text-xs text-slate-400 mt-0.5">Aerial & Ground Filming</div>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-slate-800/80 text-center hover:border-gold-500/30 transition-all">
            <div className="w-10 h-10 mx-auto rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-2">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-xl font-bold text-white font-display">CAA Registered</div>
            <div className="text-xs text-slate-400 mt-0.5">Flyer & Operator Certified</div>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-slate-800/80 text-center hover:border-gold-500/30 transition-all">
            <div className="w-10 h-10 mx-auto rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-2">
              <Award className="w-5 h-5" />
            </div>
            <div className="text-xl font-bold text-white font-display">Edited Media</div>
            <div className="text-xs text-slate-400 mt-0.5">Polished Ready-to-Share</div>
          </div>

        </div>

        {/* Notice Banner */}
        <div className="mt-10 max-w-3xl mx-auto glass-card-gold p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 flex-shrink-0">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-amber-300 uppercase tracking-wider">Booking Notice</p>
              <p className="text-sm text-slate-200 font-medium">
                Please book your session at least <span className="text-white font-bold underline decoration-amber-500">1 week in advance</span> to allow for flight safety pre-checks.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenBooking}
            className="px-4 py-2 rounded-xl text-xs font-bold text-obsidian-950 bg-gold-400 hover:bg-gold-300 transition-colors flex-shrink-0"
          >
            Check Available Dates
          </button>
        </div>

      </div>
    </section>
  );
}

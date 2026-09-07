import React from 'react';
import { ShieldCheck, MapPin, Phone, Lock, Heart, ArrowUp } from 'lucide-react';

export default function Footer({ onOpenAdmin, contactData }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-obsidian-950 border-t border-slate-800 text-slate-400 py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Column 1: Brand & Logo */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-gold-500/40 p-0.5 bg-obsidian-900">
                <img src="/logo.jpeg" alt="AeroView Logo" className="w-full h-full object-cover rounded-lg" />
              </div>
              <span className="font-display font-black text-2xl text-white tracking-tight">
                AEROVIEW<span className="text-gold-500">.UK</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              Professional aerial drone photography & videography service across Newcastle, Sunderland, Durham & surrounding North East areas. Operating DJI Air 3S 50MP drone systems under strict UK CAA regulations.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>CAA Registered Drone Operator • Valid Flyer ID & Operator ID</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-display font-bold text-white text-sm mb-4">Navigation</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><a href="#services" className="hover:text-gold-400 transition-colors">What We Offer</a></li>
              <li><a href="#packages" className="hover:text-gold-400 transition-colors">Videography Packages</a></li>
              <li><a href="#photography" className="hover:text-gold-400 transition-colors">Photography Options</a></li>
              <li><a href="#videos" className="hover:text-gold-400 transition-colors">Video Showcase</a></li>
              <li><a href="#equipment" className="hover:text-gold-400 transition-colors">DJI Air 3S Tech Specs</a></li>
              <li><a href="#safety" className="hover:text-gold-400 transition-colors">CAA Safety Standards</a></li>
            </ul>
          </div>

          {/* Column 3: Contact & Base */}
          <div>
            <h4 className="font-display font-bold text-white text-sm mb-4">Location & Contact</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-skyline-400" />
                <span>Base: {contactData.location}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400" />
                <a href={`https://wa.me/${contactData.cleanNumber}`} target="_blank" rel="noreferrer" className="hover:underline">
                  WhatsApp: {contactData.whatsapp}
                </a>
              </li>
              <li className="text-[11px] text-amber-300 bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20">
                ⚠️ Book appointments 1 week in advance for flight safety pre-checks.
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div>
            © {new Date().getFullYear()} AeroView UK. All rights reserved. CAA Registered Operator.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 text-slate-400 hover:text-gold-400 transition-colors font-medium"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Pilot Admin Portal</span>
            </button>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-obsidian-850 border border-slate-800 text-slate-300 hover:text-white hover:border-gold-500/40 transition-all"
              aria-label="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}

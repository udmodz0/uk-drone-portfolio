import React from 'react';

export default function Footer({ onOpenAdmin, contactData }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-obsidian-950 border-t border-white/10 text-slate-300 py-16 relative overflow-hidden">
      {/* Background Grid Lines */}
      <div className="absolute inset-0 radar-grid opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Column 1: Brand & CAA Badge */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-blue-500/40 p-0.5 bg-obsidian-900 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                <img src="/logo.jpeg" alt="AeroView Logo" className="w-full h-full object-cover rounded-lg" />
              </div>
              <span className="font-display font-black text-2xl text-white tracking-wider">
                AEROVIEW<span className="text-blue-500 text-glow-blue">.UK</span>
              </span>
            </div>

            <p className="text-xs text-slate-200 leading-relaxed max-w-md">
              Professional CAA registered drone operator & videography service based in Newcastle upon Tyne (NE3), serving Sunderland, Durham, and the North East. Operating DJI Air 3S 50MP dual-camera platforms.
            </p>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-bold">
              <i className="ri-shield-check-fill text-base"></i>
              <span>CAA GVC & A2 COFC LICENSED OPERATOR</span>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div>
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider mb-4">Flight Navigation</h4>
            <ul className="space-y-2 text-xs font-mono">
              <li><a href="#services" className="hover:text-blue-400 transition-colors flex items-center gap-1.5"><i className="ri-radar-line text-blue-400"></i> What We Offer</a></li>
              <li><a href="#packages" className="hover:text-blue-400 transition-colors flex items-center gap-1.5"><i className="ri-price-tag-3-line text-blue-400"></i> Flight Packages</a></li>
              <li><a href="#photography" className="hover:text-blue-400 transition-colors flex items-center gap-1.5"><i className="ri-camera-3-line text-blue-400"></i> 50MP Photography</a></li>
              <li><a href="#videos" className="hover:text-blue-400 transition-colors flex items-center gap-1.5"><i className="ri-film-line text-blue-400"></i> Cinema Reels</a></li>
              <li><a href="#equipment" className="hover:text-blue-400 transition-colors flex items-center gap-1.5"><i className="ri-cpu-line text-blue-400"></i> Drone Tech Specs</a></li>
              <li><a href="#safety" className="hover:text-blue-400 transition-colors flex items-center gap-1.5"><i className="ri-shield-check-line text-blue-400"></i> CAA Compliance</a></li>
            </ul>
          </div>

          {/* Column 3: Contact & Base */}
          <div>
            <h4 className="font-display font-bold text-white text-sm uppercase tracking-wider mb-4">Flight Command Base</h4>
            <ul className="space-y-3 text-xs font-mono">
              <li className="flex items-center gap-2">
                <i className="ri-map-pin-2-fill text-cyan-400 text-base"></i>
                <span>Base: {contactData.location}</span>
              </li>
              <li className="flex items-center gap-2">
                <i className="ri-whatsapp-line text-emerald-400 text-base"></i>
                <a href={`https://wa.me/${contactData.cleanNumber}`} target="_blank" rel="noreferrer" className="hover:underline">
                  WhatsApp: {contactData.whatsapp}
                </a>
              </li>
              <li className="text-[11px] text-blue-300 bg-blue-500/10 p-3 rounded-xl border border-blue-500/30">
                ⚠️ Flight missions require min. 1 week advance booking for CAA risk checks.
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <div>
            © {new Date().getFullYear()} AeroView UK. All rights reserved. CAA Registered Operator.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1.5 text-slate-300 hover:text-blue-400 transition-colors font-bold"
            >
              <i className="ri-lock-line text-blue-400 text-sm"></i>
              <span>Pilot Admin Portal</span>
            </button>

            <button
              onClick={scrollToTop}
              className="w-9 h-9 rounded-xl bg-obsidian-900 border border-white/15 text-slate-300 hover:text-white hover:border-blue-400 flex items-center justify-center transition-all shadow-lg"
              aria-label="Back to Top"
            >
              <i className="ri-arrow-up-line text-lg text-blue-400"></i>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}


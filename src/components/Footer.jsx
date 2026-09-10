import React from 'react';

export default function Footer({ onOpenAdmin, contactData }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#080A0D] border-t border-white/[0.08] text-zinc-400 py-12 sm:py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-12 pb-10 sm:pb-14 border-b border-white/[0.08]">
          
          {/* Column 1: Brand */}
          <div className="md:col-span-5 space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20 p-0.5 bg-black/40 shadow-sm">
                <img 
                  src="/logo.jpeg" 
                  alt="AirVibe UK" 
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    if (e.target.parentElement) {
                      e.target.parentElement.innerHTML = '<div class="w-full h-full bg-zinc-900 flex items-center justify-center text-white font-bold text-[10px] tracking-wider">AV</div>';
                    }
                  }}
                />
              </div>
              <span className="font-display font-bold text-lg sm:text-xl text-white tracking-tight">
                AIRVIBE<span className="text-zinc-500 font-light">.UK</span>
              </span>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm font-normal">
              Professional CAA registered drone cinematography and high-resolution event photography. Based in Newcastle upon Tyne (NE3), serving Sunderland, Durham, and across North East England.
            </p>

            <div className="text-[11px] font-mono text-zinc-400">
              UK Civil Aviation Authority Registered Operator
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="md:col-span-3">
            <h4 className="font-display font-medium text-white text-xs uppercase tracking-widest mb-3 sm:mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#packages" className="hover:text-white transition-colors">Packages & Rates</a></li>
              <li><a href="#videos" className="hover:text-white transition-colors">Featured Reels</a></li>
              <li><a href="#photography" className="hover:text-white transition-colors">Photo Gallery</a></li>
              <li><a href="#equipment" className="hover:text-white transition-colors">Fleet & Gear</a></li>
              <li><a href="#safety" className="hover:text-white transition-colors">CAA Regulatory</a></li>
            </ul>
          </div>

          {/* Column 3: Regional Base & Direct Contact */}
          <div className="md:col-span-4">
            <h4 className="font-display font-medium text-white text-xs uppercase tracking-widest mb-3 sm:mb-4">
              Flight Operations Base
            </h4>
            <ul className="space-y-2.5 text-xs font-mono">
              <li className="text-zinc-300">
                Regional Base: {contactData?.location || 'Newcastle NE3'}
              </li>
              <li className="text-zinc-400">
                Coverage: Newcastle • Sunderland • Durham • North East England
              </li>
              <li>
                <a 
                  href={`https://wa.me/${contactData?.cleanNumber || '447432266867'}`} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="text-zinc-300 hover:text-white inline-flex items-center gap-1.5 transition-colors"
                >
                  <i className="ri-whatsapp-line text-emerald-400"></i>
                  <span>WhatsApp: {contactData?.whatsapp || '+44 7432266867'}</span>
                </a>
              </li>
              <li className="text-[11px] text-zinc-500 pt-1">
                Notice: Minimum 1 week advance notice required for pre-flight airspace authorization.
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          <div>
            © {new Date().getFullYear()} AirVibe UK. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdmin}
              className="btn-liquid px-3.5 py-1 text-[11px] text-zinc-400 hover:text-white"
            >
              Pilot Portal
            </button>

            <button
              onClick={scrollToTop}
              className="btn-liquid w-8 h-8 rounded-full p-0 flex items-center justify-center text-zinc-400 hover:text-white"
              aria-label="Back to Top"
            >
              <i className="ri-arrow-up-line text-sm"></i>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}

import React from 'react';

export default function BookingNotice({ contactData, onOpenBooking }) {
  return (
    <section className="py-20 bg-obsidian-950 border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="glass-card-blue p-8 md:p-12 rounded-3xl relative overflow-hidden border border-blue-500/50 shadow-[0_0_50px_rgba(37,99,235,0.25)]">
          
          {/* Glowing Background Radial Spotlights */}
          <div className="absolute -top-16 -right-16 w-80 h-80 bg-blue-600/15 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative z-10">
            
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/40 flex items-center gap-1.5 shadow-md">
                  <i className="ri-alarm-warning-line text-blue-400"></i>
                  MANDATORY FLIGHT PLANNING POLICY
                </span>
                <span className="text-slate-300 text-xs font-mono">CAA UK COMPLIANT</span>
              </div>

              <h3 className="font-display font-black text-2xl md:text-4xl text-white tracking-tight">
                Reserve Your Flight Session <span className="text-white text-glow-blue">At Least 1 Week In Advance</span>
              </h3>

              <p className="mt-3 text-slate-200 text-sm leading-relaxed max-w-2xl">
                {contactData.bookingNotice}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-mono font-semibold text-slate-200">
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-obsidian-950/80 border border-white/15">
                  <i className="ri-map-pin-2-fill text-blue-400"></i>
                  <span>Flight Base: {contactData.location}</span>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-obsidian-950/80 border border-white/15">
                  <i className="ri-shield-check-fill text-emerald-400"></i>
                  <span>UK CAA GVC Certified Operator</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <button
                onClick={onOpenBooking}
                className="btn-shimmer w-full py-4 px-6 rounded-2xl font-mono font-bold text-xs bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-[0_0_25px_rgba(37,99,235,0.45)] hover:shadow-[0_0_35px_rgba(37,99,235,0.65)] transition-all flex items-center justify-center gap-2 border border-blue-400/30"
              >
                <i className="ri-calendar-event-line text-base"></i>
                <span>Reserve Flight Mission</span>
                <i className="ri-arrow-right-line text-base"></i>
              </button>

              <a
                href={`https://wa.me/${contactData.cleanNumber}?text=Hi!%20I'd%20like%20to%20check%20availability%20for%20a%20drone%20booking%20in%20${encodeURIComponent(contactData.location)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-2xl font-mono font-bold text-xs bg-obsidian-900 hover:bg-obsidian-850 text-slate-100 border border-white/15 hover:border-emerald-400 transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <i className="ri-whatsapp-line text-base text-emerald-400"></i>
                <span>WhatsApp: {contactData.whatsapp}</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}


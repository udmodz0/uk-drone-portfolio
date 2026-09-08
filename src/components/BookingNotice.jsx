import React from 'react';

export default function BookingNotice({ contactData, onOpenBooking }) {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-white border-t border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="glass-card-blue p-8 md:p-12 rounded-3xl relative overflow-hidden border border-blue-200 shadow-md bg-gradient-to-r from-blue-50/90 to-sky-50/90">
          
          {/* Glowing Background Radial Spotlights */}
          <div className="absolute -top-16 -right-16 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative z-10">
            
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider bg-blue-600 text-white border border-blue-500 flex items-center gap-1.5 shadow-sm">
                  <i className="ri-alarm-warning-line text-white"></i>
                  MANDATORY FLIGHT PLANNING POLICY
                </span>
                <span className="text-slate-600 text-xs font-mono font-semibold">CAA UK COMPLIANT</span>
              </div>

              <h3 className="font-display font-black text-2xl md:text-4xl text-slate-950 tracking-tight">
                Reserve Your Flight Session <span className="text-blue-700">At Least 1 Week In Advance</span>
              </h3>

              <p className="mt-3 text-slate-700 text-sm leading-relaxed max-w-2xl font-medium">
                {contactData.bookingNotice}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-mono font-semibold text-slate-800">
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 shadow-sm">
                  <i className="ri-map-pin-2-fill text-blue-600"></i>
                  <span>Flight Base: {contactData.location}</span>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 shadow-sm">
                  <i className="ri-shield-check-fill text-emerald-600"></i>
                  <span>UK CAA GVC Certified Operator</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <button
                onClick={onOpenBooking}
                className="btn-shimmer w-full py-4 px-6 rounded-2xl font-mono font-bold text-xs bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 border border-blue-500/30"
              >
                <i className="ri-calendar-event-line text-base"></i>
                <span>Reserve Flight Mission</span>
                <i className="ri-arrow-right-line text-base"></i>
              </button>

              <a
                href={`https://wa.me/${contactData.cleanNumber}?text=Hi!%20I'd%20like%20to%20check%20availability%20for%20a%20drone%20booking%20in%20${encodeURIComponent(contactData.location)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-2xl font-mono font-bold text-xs bg-white hover:bg-slate-50 text-slate-900 border border-slate-200 hover:border-emerald-500 transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <i className="ri-whatsapp-line text-base text-emerald-600"></i>
                <span>WhatsApp: {contactData.whatsapp}</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}


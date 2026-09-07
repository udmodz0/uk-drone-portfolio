import React from 'react';
import { Calendar, MapPin, AlertCircle, Phone, Send, ShieldCheck, ArrowRight } from 'lucide-react';

export default function BookingNotice({ contactData, onOpenBooking }) {
  return (
    <section className="py-16 bg-obsidian-950 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="glass-card-gold p-8 md:p-12 rounded-3xl relative overflow-hidden border border-gold-500/40">
          
          {/* Glowing Background Effect */}
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative z-10">
            
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  Mandatory Booking Policy
                </span>
                <span className="text-slate-400 text-xs font-semibold">UK CAA Safety Compliance</span>
              </div>

              <h3 className="font-display font-black text-2xl md:text-3xl text-white">
                Book Your Session <span className="text-gold-400">At Least 1 Week In Advance</span>
              </h3>

              <p className="mt-3 text-slate-200 text-sm leading-relaxed max-w-2xl">
                {contactData.bookingNotice}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-300">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-obsidian-900/80 border border-slate-800">
                  <MapPin className="w-4 h-4 text-skyline-400" />
                  <span>Base: {contactData.location}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-obsidian-900/80 border border-slate-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>CAA Registered Pilot</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <button
                onClick={onOpenBooking}
                className="w-full py-4 px-6 rounded-2xl font-bold text-xs bg-gold-gradient text-obsidian-950 shadow-xl shadow-gold-500/20 hover:opacity-95 transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Reserve Appointment Slot</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/${contactData.cleanNumber}?text=Hi!%20I'd%20like%20to%20check%20availability%20for%20a%20drone%20booking%20in%20${encodeURIComponent(contactData.location)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-2xl font-bold text-xs bg-obsidian-850 hover:bg-obsidian-800 text-slate-100 border border-slate-700 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp: {contactData.whatsapp}</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

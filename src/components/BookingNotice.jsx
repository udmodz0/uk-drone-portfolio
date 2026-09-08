import React from 'react';

export default function BookingNotice({ contactData, onOpenBooking }) {
  return (
    <section className="py-16 sm:py-24 md:py-36 bg-[#0E1117] border-t border-white/[0.08] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="studio-card bg-[#12151B] p-6 sm:p-12 md:p-16 rounded-3xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-8">
              <div className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-zinc-300 mb-3 sm:mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-aviation-500"></span>
                <span>Get In Touch</span>
              </div>

              <h2 className="font-display font-semibold text-2xl sm:text-4xl lg:text-6xl text-[#FAF9F6] tracking-tight leading-[1.12] sm:leading-[1.08]">
                Let's capture <br />
                your next event.
              </h2>

              <p className="mt-4 sm:mt-6 text-zinc-300 text-xs sm:text-base leading-relaxed font-normal max-w-2xl">
                From birthdays and private celebrations to outdoor events and special occasions, we'll capture the moments you'll want to remember.
              </p>

              {/* Policy & Base Indicator */}
              <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-white/[0.08] flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 sm:gap-4 text-xs font-mono text-zinc-400">
                <div className="flex items-center gap-2">
                  <i className="ri-time-line text-zinc-400"></i>
                  <span>1-Week Advance Notice Required for CAA Clearance</span>
                </div>
                <span className="text-zinc-600 hidden sm:inline">•</span>
                <div className="flex items-center gap-2">
                  <i className="ri-map-pin-line text-zinc-400"></i>
                  <span>Flight Base: {contactData?.location || 'Newcastle NE3'}</span>
                </div>
              </div>
            </div>

            {/* Exact Liquid Pill CTAs */}
            <div className="lg:col-span-4 flex flex-col gap-3.5 sm:gap-4">
              <button
                onClick={onOpenBooking}
                className="btn-liquid-primary w-full py-3.5 sm:py-4 px-6 text-xs sm:text-sm font-semibold tracking-wide flex items-center justify-center gap-2"
              >
                <span>Book Your Event</span>
                <i className="ri-arrow-right-line text-xs"></i>
              </button>

              <a
                href={`https://wa.me/${contactData?.cleanNumber || '447432266867'}?text=Hi!%20I'd%20like%20to%20check%20availability%20for%20a%20drone%20booking.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-liquid-emerald w-full py-3.5 px-6 text-xs sm:text-sm font-semibold tracking-wide flex items-center justify-center gap-2"
              >
                <i className="ri-whatsapp-line text-base text-emerald-300"></i>
                <span>WhatsApp Us</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

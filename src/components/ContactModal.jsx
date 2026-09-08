import React, { useState } from 'react';

export default function ContactModal({ isOpen, onClose, selectedPackage, contactData }) {
  const [eventType, setEventType] = useState('Birthday / Party');
  const [locationInput, setLocationInput] = useState('Newcastle NE3');
  const [preferredDate, setPreferredDate] = useState('');
  const [packageInput, setPackageInput] = useState(selectedPackage || 'Premium (£250)');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleWhatsAppSend = (e) => {
    e.preventDefault();
    const dateText = preferredDate ? `Preferred Date: ${preferredDate}` : 'Date: TBD (1+ week notice)';
    const text = `Hi! I'd like to book a Drone/Videography session.

Selected Package: ${packageInput}
Event Type: ${eventType}
${dateText}
Location: ${locationInput}
Additional Notes: ${notes || 'None'}

Please confirm flight availability!`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${contactData.cleanNumber}?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#0F1217] rounded-3xl overflow-hidden border border-white/15 shadow-2xl my-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#12151B]">
          <div>
            <div className="text-[10px] font-mono tracking-widest uppercase text-zinc-400">
              Direct Reservation
            </div>
            <h3 className="font-display font-semibold text-lg sm:text-xl text-[#FAF9F6] mt-0.5">
              Book Your Flight Session
            </h3>
          </div>

          <button
            onClick={onClose}
            className="btn-liquid w-8 h-8 rounded-full p-0 flex items-center justify-center text-zinc-300 hover:text-white"
          >
            <i className="ri-close-line text-lg"></i>
          </button>
        </div>

        {/* Modal Body Form */}
        <form onSubmit={handleWhatsAppSend} className="p-5 sm:p-8 space-y-4">
          
          {/* Policy Notice Box */}
          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-3 text-xs text-zinc-300">
            <i className="ri-time-line text-base text-zinc-300 flex-shrink-0 mt-0.5"></i>
            <div>
              <span className="font-semibold text-white">Notice:</span> 1 week advance notice is required for UK CAA pre-flight airspace clearance.
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-zinc-300 uppercase tracking-wider block mb-1.5 font-mono">
              Selected Package
            </label>
            <select
              value={packageInput}
              onChange={(e) => setPackageInput(e.target.value)}
              className="w-full px-3.5 py-3 rounded-xl bg-[#141820] border border-white/10 text-white text-xs sm:text-xs focus:border-white/30 focus:outline-none"
            >
              <option value="Essential (£100)">Essential Videography Package — £100 (2 Hours)</option>
              <option value="Premium (£250)">Premium Videography Package — £250 (4 Hours - Recommended)</option>
              <option value="Full Event (£400)">Full Event Videography Package — £400 (Up to 6 Hours)</option>
              <option value="Drone Photo (£30)">Drone Photography Stills — £30 (10 Photos)</option>
              <option value="iPhone Photo (£25)">iPhone 17 Pro Ground Stills — £25 (10 Photos)</option>
              <option value="Custom Bespoke Quote">Custom Bespoke Flight Mission</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-zinc-300 uppercase tracking-wider block mb-1.5 font-mono">
                Event Category
              </label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full px-3.5 py-3 rounded-xl bg-[#141820] border border-white/10 text-white text-xs sm:text-xs focus:border-white/30 focus:outline-none"
              >
                <option value="Birthday Celebration">Birthday Celebration</option>
                <option value="Outdoor Party / BBQ">Outdoor Party & Event</option>
                <option value="Special Occasion">Special Occasion / Gathering</option>
                <option value="Social Media Reels">Social Media Reels Production</option>
                <option value="Commercial / Property">Commercial / Property Aerial</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-zinc-300 uppercase tracking-wider block mb-1.5 font-mono">
                Preferred Flight Date
              </label>
              <input
                type="date"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full px-3.5 py-3 rounded-xl bg-[#141820] border border-white/10 text-white text-xs sm:text-xs focus:border-white/30 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-zinc-300 uppercase tracking-wider block mb-1.5 font-mono">
              Location / Postcode
            </label>
            <input
              type="text"
              placeholder="e.g. Newcastle NE3, Sunderland, Durham"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              className="w-full px-3.5 py-3 rounded-xl bg-[#141820] border border-white/10 text-white text-xs sm:text-xs focus:border-white/30 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-zinc-300 uppercase tracking-wider block mb-1.5 font-mono">
              Additional Notes
            </label>
            <textarea
              rows={2}
              placeholder="Any specific filming requirements or details..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3.5 py-3 rounded-xl bg-[#141820] border border-white/10 text-white text-xs sm:text-xs focus:border-white/30 focus:outline-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="btn-liquid-emerald w-full py-4 text-xs sm:text-sm font-semibold tracking-wide flex items-center justify-center gap-2"
            >
              <i className="ri-whatsapp-line text-base text-emerald-300"></i>
              <span>Send Inquiry via WhatsApp</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

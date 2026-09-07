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
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-xl glass-panel-cinematic rounded-3xl overflow-hidden border border-gold-500/50 shadow-[0_0_50px_rgba(245,158,11,0.3)] my-8 animate-in fade-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 bg-obsidian-950 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gold-500/10 border border-gold-500/40 flex items-center justify-center text-gold-400 font-bold text-xl shadow-[0_0_15px_rgba(245,158,11,0.2)]">
              <i className="ri-rocket-2-line"></i>
            </div>
            <div>
              <h3 className="font-display font-black text-xl text-white">Book Flight Mission / Inquiry</h3>
              <p className="text-xs font-mono text-slate-400">Direct WhatsApp instant flight booking</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full text-slate-400 hover:text-white bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        {/* Modal Body Form */}
        <form onSubmit={handleWhatsAppSend} className="p-6 space-y-4">
          
          {/* Policy Notice Box */}
          <div className="p-4 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-start gap-3 text-xs font-mono text-gold-300">
            <i className="ri-time-line text-lg text-gold-400 flex-shrink-0 mt-0.5"></i>
            <div>
              <span className="font-bold text-gold-300">Minimum 1 Week Notice:</span> Please select dates at least 7 days in advance for CAA flight risk assessments & airspace clearance.
            </div>
          </div>

          <div>
            <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">Selected Package</label>
            <select
              value={packageInput}
              onChange={(e) => setPackageInput(e.target.value)}
              className="w-full mt-1.5 px-4 py-3 rounded-xl bg-obsidian-900 border border-white/15 text-white text-xs font-mono font-bold focus:border-gold-400 focus:outline-none"
            >
              <option value="Essential (£100)">Essential Videography Package — £100 (2 Hours)</option>
              <option value="Premium (£250)">Premium Videography Package — £250 (4 Hours - Popular)</option>
              <option value="Full Event (£400)">Full Event Videography Package — £400 (6 Hours VIP)</option>
              <option value="Drone Photo (£30)">Drone Photography — £30 (10 Photos)</option>
              <option value="iPhone Photo (£25)">iPhone 17 Pro Photography — £25 (10 Photos)</option>
              <option value="Custom Package">Custom Bespoke Flight Mission</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">Event Category</label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full mt-1.5 px-4 py-3 rounded-xl bg-obsidian-900 border border-white/15 text-white text-xs font-mono focus:border-gold-400 focus:outline-none"
              >
                <option value="Birthday Celebration">🎂 Birthday Party</option>
                <option value="Outdoor Party / BBQ">🎉 Outdoor Party & Event</option>
                <option value="Private Event">💍 Special Occasion / Celebration</option>
                <option value="Short-Form Social Reels">📱 Social Media Reels</option>
                <option value="Commercial / Property">📍 Property / Commercial</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">Preferred Flight Date</label>
              <input
                type="date"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full mt-1.5 px-4 py-3 rounded-xl bg-obsidian-900 border border-white/15 text-white text-xs font-mono focus:border-gold-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">Location / Postcode</label>
            <input
              type="text"
              placeholder="e.g. Newcastle NE3, Sunderland, Durham"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              className="w-full mt-1.5 px-4 py-3 rounded-xl bg-obsidian-900 border border-white/15 text-white text-xs font-mono focus:border-gold-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">Additional Flight Notes</label>
            <textarea
              rows={2}
              placeholder="Any specific requests or filming preferences..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full mt-1.5 px-4 py-3 rounded-xl bg-obsidian-900 border border-white/15 text-white text-xs font-mono focus:border-gold-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="btn-shimmer w-full py-4 rounded-2xl font-mono font-bold text-xs bg-gold-gradient text-obsidian-950 shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:shadow-[0_0_35px_rgba(245,158,11,0.6)] transition-all flex items-center justify-center gap-2"
          >
            <i className="ri-whatsapp-line text-lg"></i>
            <span>Send Booking Inquiry via WhatsApp ({contactData.whatsapp})</span>
          </button>
        </form>

      </div>
    </div>
  );
}

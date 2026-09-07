import React, { useState } from 'react';
import { Calendar, MapPin, Send, X, ShieldCheck, CheckCircle2, Clock } from 'lucide-react';

export default function ContactModal({ isOpen, onClose, selectedPackage, contactData }) {
  const [eventType, setEventType] = useState('Birthday / Party');
  const [locationInput, setLocationInput] = useState('Newcastle NE3');
  const [preferredDate, setPreferredDate] = useState('');
  const [packageInput, setPackageInput] = useState(selectedPackage || 'Premium (£250)');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleWhatsAppSend = (e) => {
    e.preventDefault();
    const dateText = preferredDate ? `Preferred Date: ${preferredDate}` : 'Date: TBD (Booking 1+ week in advance)';
    const text = `Hi! I'd like to book a Drone/Videography session.

Event Type: ${eventType}
Package Selected: ${packageInput}
${dateText}
Location: ${locationInput}
Additional Notes: ${notes || 'None'}

Please confirm availability!`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${contactData.cleanNumber}?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-xl glass-panel rounded-3xl overflow-hidden border border-gold-500/40 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 bg-obsidian-950 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 font-bold">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-white">Book Appointment / Inquiry</h3>
              <p className="text-xs text-slate-400">Direct WhatsApp instant quote & booking</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-white bg-slate-800/80"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Form */}
        <form onSubmit={handleWhatsAppSend} className="p-6 space-y-4">
          
          {/* Policy Notice Box */}
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-300">
            <Clock className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-amber-300">Minimum 1 Week Notice:</span> Please request dates at least 7 days ahead for airspace checks and CAA safety compliance.
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300">Selected Package</label>
            <select
              value={packageInput}
              onChange={(e) => setPackageInput(e.target.value)}
              className="w-full mt-1 px-4 py-3 rounded-xl bg-obsidian-950 border border-slate-700 text-white text-xs font-bold"
            >
              <option value="Essential (£100)">Essential Videography Package — £100 (2 Hours)</option>
              <option value="Premium (£250)">Premium Videography Package — £250 (4 Hours - Popular)</option>
              <option value="Full Event (£400)">Full Event Videography Package — £400 (6 Hours VIP)</option>
              <option value="Drone Photo (£30)">Drone Photography — £30 (10 Photos)</option>
              <option value="iPhone Photo (£25)">iPhone 17 Pro Photography — £25 (10 Photos)</option>
              <option value="Custom Package">Custom Bespoke Quote</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-300">Event Type</label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full mt-1 px-4 py-3 rounded-xl bg-obsidian-950 border border-slate-700 text-white text-xs"
              >
                <option value="Birthday Celebration">🎂 Birthday Party</option>
                <option value="Outdoor Party / BBQ">🎉 Outdoor Party & Event</option>
                <option value="Private Event">💍 Special Occasion / Wedding</option>
                <option value="Short-Form Social Reels">📱 Social Media Content</option>
                <option value="Commercial / Property">📍 Property / Commercial</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300">Preferred Event Date</label>
              <input
                type="date"
                value={preferredDate}
                onChange={(e) => setPreferredDate(e.target.value)}
                className="w-full mt-1 px-4 py-3 rounded-xl bg-obsidian-950 border border-slate-700 text-white text-xs"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300">Location (Postcode / Area)</label>
            <input
              type="text"
              placeholder="e.g. Newcastle NE3, Sunderland, Durham"
              value={locationInput}
              onChange={(e) => setLocationInput(e.target.value)}
              className="w-full mt-1 px-4 py-3 rounded-xl bg-obsidian-950 border border-slate-700 text-white text-xs"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300">Additional Details or Questions</label>
            <textarea
              rows={2}
              placeholder="Any specific requests or filming preferences..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full mt-1 px-4 py-3 rounded-xl bg-obsidian-950 border border-slate-700 text-white text-xs"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-2xl font-bold text-xs bg-gold-gradient text-obsidian-950 shadow-xl shadow-gold-500/20 hover:opacity-95 transition-all flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Send Booking Inquiry via WhatsApp ({contactData.whatsapp})</span>
          </button>
        </form>

      </div>
    </div>
  );
}

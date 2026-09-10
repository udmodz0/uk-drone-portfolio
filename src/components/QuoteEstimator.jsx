import React, { useState } from 'react';

export default function QuoteEstimator({ onOpenBooking, whatsappNumber = '447432266867' }) {
  const [eventType, setEventType] = useState('wedding');
  const [hours, setHours] = useState(4);
  const [location, setLocation] = useState('newcastle');
  const [addons, setAddons] = useState({
    groundCamera: true,
    socialReels: true,
    expressDelivery: false,
    rawFootage: false,
  });

  const eventTypes = [
    {
      id: 'wedding',
      name: 'Weddings & Receptions',
      basePrice: 250,
      icon: 'ri-heart-2-line',
      desc: 'Cinematic aerial arrival, couple portraits, venue panorama, and high-energy guest highlights.',
    },
    {
      id: 'party',
      name: 'Private Parties & Birthdays',
      basePrice: 180,
      icon: 'ri-cake-2-line',
      desc: 'Outdoor celebrations, anniversary galas, garden parties, and celebratory family gatherings.',
    },
    {
      id: 'realestate',
      name: 'Real Estate & Properties',
      basePrice: 150,
      icon: 'ri-building-line',
      desc: 'Architectural 50MP stills, sweeping boundary overviews, and smooth cinematic buyer walkthroughs.',
    },
    {
      id: 'commercial',
      name: 'Commercial & Brand Promos',
      basePrice: 320,
      icon: 'ri-film-line',
      desc: 'Commercial-grade 10-bit D-Log M cinematography, corporate outdoor shoots, and advertising reels.',
    },
    {
      id: 'inspection',
      name: 'Roof & Site Inspections',
      basePrice: 120,
      icon: 'ri-shield-check-line',
      desc: 'Safe close-proximity zoom inspection of chimneys, gutters, commercial roofs, and solar arrays.',
    },
  ];

  const hoursOptions = [
    { hrs: 2, label: '2 Hours (Standard)', priceMultiplier: 0 },
    { hrs: 4, label: '4 Hours (Recommended)', priceMultiplier: 80 },
    { hrs: 8, label: 'Full Day / 8 Hours', priceMultiplier: 200 },
  ];

  const locations = [
    { id: 'newcastle', label: 'Newcastle upon Tyne (NE3 Base)', fee: 0, tag: 'FREE DISPATCH' },
    { id: 'sunderland', label: 'Sunderland & Coastline', fee: 0, tag: 'FREE DISPATCH' },
    { id: 'durham', label: 'Durham City & Venues', fee: 0, tag: 'FREE DISPATCH' },
    { id: 'northumberland', label: 'Wider Northumberland', fee: 25, tag: '+£25 TRAVEL' },
  ];

  const addonOptions = [
    {
      id: 'groundCamera',
      label: 'Ground iPhone 17 Pro Stills',
      desc: 'Candid guest portraits & ground-level close-ups',
      price: 50,
      icon: 'ri-smartphone-line',
    },
    {
      id: 'socialReels',
      label: '3x Social Media 9:16 Reels',
      desc: 'Formatted with trending pacing & music',
      price: 40,
      icon: 'ri-instagram-line',
    },
    {
      id: 'expressDelivery',
      label: '24-Hour Express Turnaround',
      desc: 'Priority color grading & same-day preview',
      price: 35,
      icon: 'ri-flashlight-line',
    },
    {
      id: 'rawFootage',
      label: 'All Uncut Raw 4K D-Log Files',
      desc: 'Delivered via high-speed cloud drive',
      price: 30,
      icon: 'ri-hard-drive-2-line',
    },
  ];

  const selectedEvent = eventTypes.find((e) => e.id === eventType) || eventTypes[0];
  const selectedHours = hoursOptions.find((h) => h.hrs === hours) || hoursOptions[1];
  const selectedLocation = locations.find((l) => l.id === location) || locations[0];

  // Calculate live quote
  const calculateTotal = () => {
    let total = selectedEvent.basePrice + selectedHours.priceMultiplier + selectedLocation.fee;
    if (addons.groundCamera) total += 50;
    if (addons.socialReels) total += 40;
    if (addons.expressDelivery) total += 35;
    if (addons.rawFootage) total += 30;
    return total;
  };

  const currentTotal = calculateTotal();

  const toggleAddon = (key) => {
    setAddons((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Build WhatsApp pre-filled message
  const generateWhatsAppLink = () => {
    const activeAddonNames = addonOptions
      .filter((a) => addons[a.id])
      .map((a) => a.label)
      .join(', ');

    const msg = `Hi AirVibe UK! I've generated an online quote on your website:
• Event: ${selectedEvent.name}
• Duration: ${selectedHours.label}
• Location: ${selectedLocation.label}
• Add-ons: ${activeAddonNames || 'None'}
• Estimated Total: £${currentTotal}

Could you check if my date is available for booking?`;

    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <section id="quote-calculator" className="py-20 sm:py-28 relative bg-[#090B0E] border-t border-white/[0.08] overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-40 w-96 h-96 bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-emerald-500/30 bg-emerald-950/40 text-emerald-300 text-[11px] font-mono tracking-widest uppercase mb-4 backdrop-blur-md">
            <i className="ri-calculator-line text-xs"></i>
            <span>Instant Price Transparency</span>
          </div>
          <h2 className="font-display font-semibold text-3xl sm:text-5xl text-[#FAF9F6] tracking-tight">
            Estimate Your Flight Investment
          </h2>
          <p className="mt-3.5 text-zinc-400 text-sm sm:text-base leading-relaxed">
            Select your event requirements below to generate an instant estimate with zero hidden fees. Pre-flight airspace safety checks included.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left / Main Column: Interactive Selectors */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* 1. Event Type Selector */}
            <div className="rounded-2xl bg-[#11151E]/70 border border-white/10 p-5 sm:p-6 backdrop-blur-xl shadow-xl">
              <label className="text-xs font-mono tracking-wider uppercase text-zinc-300 flex items-center justify-between mb-4">
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-400/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold">1</span>
                  Select Mission / Event Type
                </span>
                <span className="text-[11px] text-zinc-400 font-normal">Step 1 of 4</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {eventTypes.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setEventType(item.id)}
                    className={`p-4 rounded-xl border text-left transition-all relative group ${
                      eventType === item.id
                        ? 'bg-white/[0.12] border-emerald-400/60 shadow-lg shadow-emerald-950/40'
                        : 'bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.06]'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white mb-2.5">
                        <i className={`${item.icon} text-base ${eventType === item.id ? 'text-emerald-400' : 'text-zinc-300'}`}></i>
                      </div>
                      <span className="text-xs font-mono font-semibold text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/20">
                        From £{item.basePrice}
                      </span>
                    </div>
                    <div className="font-display font-semibold text-sm text-[#FAF9F6]">
                      {item.name}
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-relaxed mt-1">
                      {item.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Flight Duration Selector */}
            <div className="rounded-2xl bg-[#11151E]/70 border border-white/10 p-5 sm:p-6 backdrop-blur-xl shadow-xl">
              <label className="text-xs font-mono tracking-wider uppercase text-zinc-300 flex items-center justify-between mb-4">
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-400/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold">2</span>
                  Flight & Filming Duration
                </span>
                <span className="text-[11px] text-zinc-400 font-normal">Battery-Optimized</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {hoursOptions.map((opt) => (
                  <button
                    key={opt.hrs}
                    onClick={() => setHours(opt.hrs)}
                    className={`p-3.5 rounded-xl border text-center transition-all ${
                      hours === opt.hrs
                        ? 'bg-white/[0.12] border-sky-400/60 shadow-lg text-white font-semibold'
                        : 'bg-white/[0.03] border-white/10 hover:border-white/20 text-zinc-300'
                    }`}
                  >
                    <div className="text-sm font-semibold">{opt.label}</div>
                    <div className="text-[10px] font-mono text-zinc-400 mt-1">
                      {opt.priceMultiplier === 0 ? 'Included' : `+£${opt.priceMultiplier}`}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Location & Travel Zone */}
            <div className="rounded-2xl bg-[#11151E]/70 border border-white/10 p-5 sm:p-6 backdrop-blur-xl shadow-xl">
              <label className="text-xs font-mono tracking-wider uppercase text-zinc-300 flex items-center justify-between mb-4">
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-400/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold">3</span>
                  Flight Location & Operations Area
                </span>
                <span className="text-[11px] text-zinc-400 font-normal">NE3 Base Dispatch</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {locations.map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => setLocation(loc.id)}
                    className={`p-3 rounded-xl border flex items-center justify-between text-left transition-all ${
                      location === loc.id
                        ? 'bg-white/[0.12] border-emerald-400/60 text-white font-semibold'
                        : 'bg-white/[0.03] border-white/10 hover:border-white/20 text-zinc-300'
                    }`}
                  >
                    <div className="text-xs font-medium">{loc.label}</div>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/10 text-emerald-300">
                      {loc.tag}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Production Add-ons */}
            <div className="rounded-2xl bg-[#11151E]/70 border border-white/10 p-5 sm:p-6 backdrop-blur-xl shadow-xl">
              <label className="text-xs font-mono tracking-wider uppercase text-zinc-300 flex items-center justify-between mb-4">
                <span className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-emerald-400/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold">4</span>
                  Optional Production Upgrades
                </span>
                <span className="text-[11px] text-zinc-400 font-normal">Enhance Deliverables</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {addonOptions.map((addon) => (
                  <button
                    key={addon.id}
                    onClick={() => toggleAddon(addon.id)}
                    className={`p-3.5 rounded-xl border text-left flex items-start justify-between transition-all ${
                      addons[addon.id]
                        ? 'bg-emerald-950/30 border-emerald-500/50 text-white'
                        : 'bg-white/[0.03] border-white/10 text-zinc-400 hover:border-white/20'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-semibold text-[#FAF9F6] flex items-center gap-1.5">
                        <i className={`${addon.icon} text-emerald-400`}></i>
                        <span>{addon.label}</span>
                      </div>
                      <p className="text-[10px] text-zinc-400 mt-0.5">
                        {addon.desc}
                      </p>
                    </div>
                    <div className="text-xs font-mono font-bold text-emerald-300 pl-3">
                      {addons[addon.id] ? `+£${addon.price}` : `£${addon.price}`}
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Quote Summary Card */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="rounded-2xl bg-[#11151E]/95 border border-white/20 p-6 shadow-2xl backdrop-blur-2xl">
              
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400">
                  ESTIMATED INVESTMENT
                </span>
                <span className="px-2 py-0.5 rounded-full text-[9px] font-mono uppercase bg-emerald-950 border border-emerald-500/40 text-emerald-400">
                  CAA COMPLIANT
                </span>
              </div>

              {/* Price Display */}
              <div className="py-5 text-center">
                <div className="text-[11px] font-mono text-zinc-400 uppercase">Estimated Total Quote</div>
                <div className="font-display font-extrabold text-5xl text-[#FAF9F6] tracking-tight mt-1">
                  £{currentTotal}
                </div>
                <div className="text-[11px] text-emerald-400 font-mono mt-1">
                  Inclusive of Pre-Flight Airspace Authorization
                </div>
              </div>

              {/* Breakdown List */}
              <div className="space-y-2 py-4 border-t border-b border-white/10 text-xs">
                <div className="flex items-center justify-between text-zinc-300">
                  <span>{selectedEvent.name}</span>
                  <span className="font-mono font-semibold text-white">£{selectedEvent.basePrice}</span>
                </div>
                <div className="flex items-center justify-between text-zinc-300">
                  <span>{selectedHours.label}</span>
                  <span className="font-mono font-semibold text-white">
                    {selectedHours.priceMultiplier === 0 ? 'Included' : `+£${selectedHours.priceMultiplier}`}
                  </span>
                </div>
                <div className="flex items-center justify-between text-zinc-300">
                  <span>{selectedLocation.label.split('(')[0]}</span>
                  <span className="font-mono font-semibold text-white">
                    {selectedLocation.fee === 0 ? '£0 Free' : `+£${selectedLocation.fee}`}
                  </span>
                </div>

                {addonOptions
                  .filter((a) => addons[a.id])
                  .map((a) => (
                    <div key={a.id} className="flex items-center justify-between text-emerald-300/90 text-[11px]">
                      <span>+ {a.label}</span>
                      <span className="font-mono font-semibold">£{a.price}</span>
                    </div>
                  ))}
              </div>

              {/* Guaranteed Assurances */}
              <div className="py-4 space-y-1.5 text-[11px] text-zinc-400 font-mono">
                <div className="flex items-center gap-1.5 text-zinc-300">
                  <i className="ri-checkbox-circle-fill text-emerald-400"></i>
                  <span>DJI Air 3S 50MP Dual Optics</span>
                </div>
                <div className="flex items-center gap-1.5 text-zinc-300">
                  <i className="ri-checkbox-circle-fill text-emerald-400"></i>
                  <span>UK CAA Certified Commercial Operator</span>
                </div>
                <div className="flex items-center gap-1.5 text-zinc-300">
                  <i className="ri-checkbox-circle-fill text-emerald-400"></i>
                  <span>Full Public Liability Insurance</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <a
                  href={generateWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-liquid-primary w-full py-3.5 px-4 text-xs font-semibold flex items-center justify-center gap-2 group"
                >
                  <i className="ri-whatsapp-line text-base text-emerald-400 group-hover:scale-110 transition-transform"></i>
                  <span>Lock In Quote via WhatsApp</span>
                </a>

                <button
                  onClick={onOpenBooking}
                  className="btn-liquid w-full py-3 px-4 text-xs font-medium text-zinc-300 hover:text-white flex items-center justify-center gap-2"
                >
                  <span>Submit Custom Booking Request</span>
                  <i className="ri-arrow-right-line text-xs"></i>
                </button>
              </div>

              <div className="text-[10px] text-zinc-500 text-center font-mono mt-3">
                *Subject to pre-flight meteorological & airspace clearance checks.
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

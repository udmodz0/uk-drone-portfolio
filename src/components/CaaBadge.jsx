import React from 'react';

export default function CaaBadge() {
  const credentials = [
    { title: 'CAA Registered Operator', desc: 'Official UK Civil Aviation Authority registered drone pilot', icon: 'ri-verified-badge-line' },
    { title: 'Valid Flyer ID & Operator ID', desc: 'Full CAA pilot competency testing & registered fleet tags', icon: 'ri-id-card-line' },
    { title: 'GVC & A2 CoFC Certified', desc: 'Advanced commercial drone operational authorizations', icon: 'ri-award-line' },
    { title: 'Pre-Flight Airspace Clearance', desc: 'NOTAMs, NFZ flight restriction zone & weather checks', icon: 'ri-radar-line' },
    { title: '$5M Commercial Indemnity', desc: 'Full public liability insurance coverage for all missions', icon: 'ri-shield-keyhole-line' },
    { title: 'Sub-250g & Heavy Payload', desc: 'Compliant flight operations from urban to open country', icon: 'ri-flight-takeoff-line' }
  ];

  return (
    <section id="safety" className="py-20 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-y border-slate-200 relative overflow-hidden">
      {/* Background Accent Grid */}
      <div className="absolute inset-0 radar-grid opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="glass-panel-cinematic p-8 md:p-12 rounded-3xl border border-slate-200 relative shadow-md bg-white/80">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-200">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 flex-shrink-0 shadow-sm">
                <i className="ri-shield-check-fill text-3xl"></i>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-0.5 rounded-md text-[11px] font-mono font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                    UK CAA CERTIFIED OPERATOR
                  </span>
                  <span className="text-slate-500 font-mono text-xs">100% COMPLIANT</span>
                </div>
                <h2 className="font-display font-black text-2xl md:text-4xl text-slate-950 mt-1">
                  Airspace Security & CAA Regulatory Compliance
                </h2>
                <p className="text-slate-600 text-sm mt-1 max-w-2xl leading-relaxed">
                  Your mission is executed safely and legally. Operating under strict UK Civil Aviation Authority guidelines with mandatory pre-flight risk assessment protocols.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-emerald-200 shadow-sm">
              <div className="text-right font-mono">
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">CAA AIRSPACE STATUS</div>
                <div className="text-emerald-700 font-bold text-sm flex items-center gap-1.5 justify-end">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping"></span>
                  VERIFIED & LICENSED
                </div>
              </div>
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xl border border-emerald-200">
                🇬🇧
              </div>
            </div>
          </div>

          {/* Credentials Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {credentials.map((item, idx) => (
              <div 
                key={idx} 
                className="flex items-start gap-3.5 p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-400 hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 flex-shrink-0 group-hover:scale-110 transition-transform">
                  <i className={`${item.icon} text-xl`}></i>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 font-display">{item.title}</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Regulatory Note */}
          <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-600 gap-4">
            <div className="flex items-center gap-2 text-blue-600">
              <i className="ri-compass-3-line text-lg"></i>
              <span>Pre-flight hazard evaluation & weather window checks on every mission.</span>
            </div>
            <div className="font-bold text-blue-800 bg-blue-50 px-3 py-1 rounded-lg border border-blue-200">
              NEWCASTLE (NE3) • SUNDERLAND • DURHAM & NORTH EAST
            </div>
          </div>


        </div>

      </div>
    </section>
  );
}

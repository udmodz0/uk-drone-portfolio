import React from 'react';

export default function CaaBadge() {
  const credentials = [
    { 
      title: 'UK CAA Registered Operator', 
      desc: 'Official UK Civil Aviation Authority registered flight operations with active Flyer ID and Operator ID tags.', 
      icon: 'ri-verified-badge-line' 
    },
    { 
      title: 'GVC & A2 CoFC Competence', 
      desc: 'Certified pilot operational authorizations ensuring strict compliance with UK air safety regulations.', 
      icon: 'ri-award-line' 
    },
    { 
      title: 'Airspace Clearance & NOTAMs', 
      desc: 'Systematic pre-flight airspace authorization, flight restriction zone checks, and weather window analysis.', 
      icon: 'ri-flight-takeoff-line' 
    },
    { 
      title: '£5M Commercial Liability', 
      desc: 'Comprehensive public liability indemnity covering every flight mission across private estates and public venues.', 
      icon: 'ri-shield-check-line' 
    },
    { 
      title: 'Sub-250g & Heavy Payload Fleet', 
      desc: 'Versatile operational envelope allowing compliant flights in built-up areas and expansive countryside.', 
      icon: 'ri-compass-3-line' 
    },
    { 
      title: 'North East Regional Coverage', 
      desc: 'Base of operations in Newcastle upon Tyne (NE3), serving Sunderland, Durham, and across North East England.', 
      icon: 'ri-map-pin-2-line' 
    }
  ];

  return (
    <section id="safety" className="py-16 sm:py-24 md:py-32 bg-[#0B0D11] border-y border-white/[0.08] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-zinc-300 mb-2 sm:mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-aviation-500"></span>
            <span>Safety & Regulatory Assurance</span>
          </div>
          <h2 className="font-display font-semibold text-2xl sm:text-4xl lg:text-5xl text-[#FAF9F6] tracking-tight">
            UK CAA Regulatory Compliance
          </h2>
          <p className="mt-3 sm:mt-4 text-zinc-300 text-xs sm:text-base leading-relaxed font-normal max-w-2xl">
            Every mission is executed safely, legally, and professionally under strict Civil Aviation Authority guidelines.
          </p>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {credentials.map((item, idx) => (
            <div 
              key={idx} 
              className="studio-card bg-[#12151B] p-6 sm:p-8 rounded-2xl flex flex-col justify-between"
            >
              <div>
                <div className="btn-liquid w-11 h-11 rounded-full p-0 flex items-center justify-center text-zinc-200 mb-5">
                  <i className={`${item.icon} text-lg`}></i>
                </div>
                <h3 className="font-display font-medium text-base sm:text-lg text-[#FAF9F6]">
                  {item.title}
                </h3>
                <p className="text-zinc-400 text-xs sm:text-sm mt-2 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>

              <div className="mt-5 sm:mt-6 pt-4 border-t border-white/[0.06] text-[10px] uppercase font-mono tracking-wider text-zinc-400">
                Verified Standard
              </div>
            </div>
          ))}
        </div>

        {/* Advisory Banner */}
        <div className="mt-10 sm:mt-12 p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 text-xs font-mono text-zinc-400">
          <div className="flex items-center gap-2.5">
            <i className="ri-information-line text-base text-zinc-400"></i>
            <span>All flights require on-site risk assessment and formal pre-flight authorization.</span>
          </div>
          <span className="text-zinc-300 font-medium">Newcastle NE3 • Sunderland • Durham</span>
        </div>

      </div>
    </section>
  );
}

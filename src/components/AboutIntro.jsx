import React from 'react';

export default function AboutIntro({ onOpenBooking }) {
  return (
    <section className="py-16 sm:py-24 md:py-32 bg-[#0E1117] border-b border-white/[0.08] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Eyebrow */}
        <div className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-zinc-300 mb-6 sm:mb-8 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-aviation-500"></span>
          <span>Aviation Excellence & Visual Storytelling</span>
        </div>

        {/* Editorial Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          
          {/* Left: Large Editorial Heading */}
          <div className="lg:col-span-6">
            <h2 className="font-display font-semibold text-2xl sm:text-4xl lg:text-5xl text-[#FAF9F6] tracking-tight leading-[1.2] sm:leading-[1.15]">
              Capture your moments from a whole new perspective.
            </h2>
          </div>

          {/* Right: Readable Paragraph Content */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6 text-zinc-300 text-sm sm:text-base lg:text-lg leading-relaxed font-normal">
            <p>
              Based in Newcastle upon Tyne (NE3) and serving Sunderland, Durham, and across North East England, AirVibe delivers high-calibre aerial cinematography and ground photography for private celebrations, outdoor events, and bespoke productions.
            </p>
            <p className="text-zinc-400 text-xs sm:text-sm sm:leading-relaxed">
              Operating under strict UK Civil Aviation Authority (CAA) standards, every flight is meticulously planned with full risk assessments, airspace clearances, and commercial public liability assurance. We pair the flagship DJI Air 3S 50MP dual-camera system with professional color grading to deliver timeless, cinema-grade reels.
            </p>
            
            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="btn-liquid px-6 py-3 text-xs tracking-wider uppercase font-semibold inline-flex items-center gap-2 group"
              >
                <span>Inquire About Availability</span>
                <i className="ri-arrow-right-line text-sm group-hover:translate-x-1 transition-transform"></i>
              </button>
            </div>
          </div>

        </div>

        {/* Below: Understated Credentials Metric Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 pt-10 sm:pt-16 mt-10 sm:mt-16 border-t border-white/[0.08]">
          <div>
            <div className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-[#FAF9F6]">CAA Certified</div>
            <p className="text-[10px] sm:text-xs text-zinc-400 mt-1 uppercase tracking-wider font-mono">GVC & A2 CoFC Competency</p>
          </div>
          <div>
            <div className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-[#FAF9F6]">50MP RAW</div>
            <p className="text-[10px] sm:text-xs text-zinc-400 mt-1 uppercase tracking-wider font-mono">Dual-Camera Imagery</p>
          </div>
          <div>
            <div className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-[#FAF9F6]">4K 60FPS</div>
            <p className="text-[10px] sm:text-xs text-zinc-400 mt-1 uppercase tracking-wider font-mono">10-Bit D-Log Profiles</p>
          </div>
          <div>
            <div className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-[#FAF9F6]">North East UK</div>
            <p className="text-[10px] sm:text-xs text-zinc-400 mt-1 uppercase tracking-wider font-mono">Newcastle • Sunderland • Durham</p>
          </div>
        </div>

      </div>
    </section>
  );
}

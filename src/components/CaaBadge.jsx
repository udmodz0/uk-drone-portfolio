import React from 'react';
import { ShieldCheck, CheckCircle, FileText, Lock, AlertTriangle, Compass } from 'lucide-react';

export default function CaaBadge() {
  const credentials = [
    { title: 'CAA Registered Drone Operator', desc: 'Official UK Civil Aviation Authority registered operator' },
    { title: 'Valid Flyer ID', desc: 'Completed required CAA pilot competency test' },
    { title: 'Valid Operator ID', desc: 'UK registered and compliant equipment marking' },
    { title: 'Safety-Focused Operations', desc: 'Strict adherence to UK drone regulations & safety distance rules' },
    { title: 'Pre-Flight Airspace Checks', desc: 'Flight restriction zone & weather checks prior to every event' },
    { title: 'Legal & Safe Execution', desc: 'Operating safely across Newcastle, Sunderland, Durham & NE3' }
  ];

  return (
    <section id="safety" className="py-16 bg-obsidian-900 border-y border-slate-800/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="glass-panel p-8 md:p-12 rounded-3xl border border-slate-800 relative">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-800">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    UK CAA Certified
                  </span>
                  <span className="text-slate-400 text-xs font-semibold">100% Legal & Safe</span>
                </div>
                <h2 className="font-display font-bold text-2xl md:text-3xl text-white mt-1">
                  Professional & CAA Registered Drone Pilot
                </h2>
                <p className="text-slate-400 text-sm mt-1 max-w-2xl">
                  Your event is in safe and professional hands. We operate strictly under UK Civil Aviation Authority guidelines with full compliance and pre-flight risk checks.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-obsidian-950 p-4 rounded-2xl border border-slate-800/80">
              <div className="text-right">
                <div className="text-xs text-slate-400 font-semibold">UK Drone Status</div>
                <div className="text-emerald-400 font-bold text-sm flex items-center gap-1.5 justify-end">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  Active & Verified
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-lg">
                🇬🇧
              </div>
            </div>
          </div>

          {/* Credentials Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {credentials.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-obsidian-950/60 border border-slate-800/60 hover:border-emerald-500/30 transition-colors">
                <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-100">{item.title}</h4>
                  <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Regulatory Note */}
          <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-gold-400" />
              <span>We check airspace restrictions & flight authorization before every single booking.</span>
            </div>
            <div className="font-semibold text-slate-300">
              Newcastle (NE3) • Sunderland • Durham & Surrounding Areas
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

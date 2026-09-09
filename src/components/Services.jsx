import React from 'react';

export default function Services() {
  const servicesList = [
    {
      title: 'Drone Photography',
      desc: 'High-resolution 50MP aerial stills capturing fine architectural detail, landscapes, and private venues with balanced dynamic range.',
      image: 'https://i.ibb.co/hRWZ8R6Y/IMG-0025.jpg',
      tag: '50MP Aerial RAW',
    },
    {
      title: 'Drone Videography',
      desc: 'High-speed 4K 60fps aerial sequences captured using the dual-camera DJI Air 3S with 10-bit D-Log color profiles.',
      image: 'https://i.ibb.co/v4cxrywr/IMG-0019.jpg',
      tag: '4K 60FPS D-Log',
    },
    {
      title: 'Ground Photography',
      desc: 'Professional ground-level portraits, candid moments, and event atmosphere captured with iPhone 17 Pro 48MP ProRAW.',
      image: 'https://i.ibb.co/Kc42r24L/IMG-0021.jpg',
      tag: '48MP ProRAW',
    },
    {
      title: 'Event Videography',
      desc: 'Comprehensive multi-angle event coverage from arrival to departure for birthdays, celebrations, and outdoor gatherings.',
      image: 'https://i.ibb.co/LX8Kdssf/IMG-0018.jpg',
      tag: 'Milestone Events',
    },
    {
      title: 'Professional Editing',
      desc: 'Complete post-production including cinematic color grading, licensed audio mastering, and high-bitrate digital delivery.',
      image: 'https://i.ibb.co/XkMJ9y5x/IMG-0020.jpg',
      tag: 'Master Color Grade',
    },
    {
      title: 'Social Media Content',
      desc: 'Custom 9:16 vertical sequences tailored specifically for high-engagement Instagram Reels, TikTok, and YouTube Shorts.',
      image: 'https://i.ibb.co/99TVY9DZ/IMG-0025.jpg',
      tag: 'Vertical 9:16',
    }
  ];

  return (
    <section id="services" className="py-24 md:py-32 bg-[#0B0D11] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="text-[11px] font-mono tracking-widest uppercase text-zinc-300 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-aviation-500"></span>
              <span>Capabilities</span>
            </div>
            <h2 className="font-display font-semibold text-3xl sm:text-4xl lg:text-5xl text-[#FAF9F6] tracking-tight">
              What We Offer
            </h2>
          </div>
          <p className="text-zinc-300 text-sm sm:text-base max-w-md leading-relaxed font-normal">
            Bespoke aerial cinematography, ultra-high-resolution stills, and refined post-production tailored to your occasion.
          </p>
        </div>

        {/* Services Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {servicesList.map((srv, idx) => (
            <div 
              key={idx} 
              className="group studio-card rounded-xl overflow-hidden flex flex-col justify-between"
            >
              {/* Image Container with Subtle 1.035x Hover Zoom */}
              <div className="relative aspect-[16/10] image-zoom-container bg-studio-800">
                <img
                  src={srv.image}
                  alt={srv.title}
                  loading="lazy"
                  className="w-full h-full object-cover image-zoom-target opacity-80 group-hover:opacity-95 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12151B] via-transparent to-transparent opacity-90" />
                
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded bg-black/60 backdrop-blur-md text-[10px] font-mono tracking-widest uppercase text-zinc-200 border border-white/10">
                  {srv.tag}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-display font-semibold text-xl text-[#FAF9F6] group-hover:text-white transition-colors">
                    {srv.title}
                  </h3>
                  <p className="mt-2.5 text-zinc-300 text-xs sm:text-sm leading-relaxed font-normal">
                    {srv.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-medium text-zinc-300 group-hover:text-[#FAF9F6] transition-colors">
                  <span>Explore Service</span>
                  <i className="ri-arrow-right-line text-sm text-zinc-300 group-hover:text-white group-hover:translate-x-1 transition-all"></i>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}


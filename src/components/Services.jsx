import React, { useState } from 'react';

export default function Services() {
  const [activeModal, setActiveModal] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const servicesList = [
    {
      title: 'Drone Photography',
      desc: 'High-resolution 50MP aerial stills capturing fine architectural detail, landscapes, and private venues with balanced dynamic range.',
      thumbnail: '/img/thumb-IMG-0025.jpg',
      fullImage: '/img/IMG-0025.jpg',
      tag: '50MP Aerial RAW',
      location: 'Newcastle Sports Ground',
    },
    {
      title: 'Drone Videography',
      desc: 'High-speed 4K 60fps aerial sequences captured using the dual-camera DJI Air 3S with 10-bit D-Log color profiles.',
      thumbnail: '/img/thumb-IMG-0018.jpg',
      fullImage: '/img/IMG-0018.jpg',
      tag: '4K 60FPS D-Log',
      location: 'Durham Event Grounds',
    },
    {
      title: 'Ground Photography',
      desc: 'Professional ground-level portraits, candid moments, and event atmosphere captured with iPhone 17 Pro 48MP ProRAW.',
      thumbnail: '/img/thumb-IMG-0021.jpg',
      fullImage: '/img/IMG-0021.jpg',
      tag: '48MP ProRAW',
      location: 'Newcastle Sports Complex',
    },
    {
      title: 'Event Videography',
      desc: 'Comprehensive multi-angle event coverage from arrival to departure for birthdays, celebrations, and outdoor gatherings.',
      thumbnail: '/img/thumb-IMG-0019.jpg',
      fullImage: '/img/IMG-0019.jpg',
      tag: 'Milestone Events',
      location: 'Sunderland Sports Field',
    },
    {
      title: 'Professional Editing',
      desc: 'Complete post-production including cinematic color grading, licensed audio mastering, and high-bitrate digital delivery.',
      thumbnail: '/img/thumb-IMG-0020.jpg',
      fullImage: '/img/IMG-0020.jpg',
      tag: 'Master Color Grade',
      location: 'Newcastle Event Pavilion',
    },
    {
      title: 'Social Media Content',
      desc: 'Custom 9:16 vertical sequences tailored specifically for high-engagement Instagram Reels, TikTok, and YouTube Shorts.',
      thumbnail: '/img/thumb-IMG-0025.jpg',
      fullImage: '/img/IMG-0025.jpg',
      tag: 'Vertical 9:16',
      location: 'Newcastle NE3 Base',
    }
  ];

  const handleOpenModal = (srv) => {
    setIsImageLoading(true);
    setActiveModal(srv);
  };

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
              {/* Image Container with Subtle 1.035x Hover Zoom & Click to View */}
              <div 
                onClick={() => handleOpenModal(srv)}
                className="relative aspect-[16/10] image-zoom-container bg-studio-800 cursor-pointer"
              >
                <img
                  src={srv.thumbnail}
                  alt={srv.title}
                  loading="lazy"
                  className="w-full h-full object-cover image-zoom-target opacity-85 group-hover:opacity-100 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12151B] via-transparent to-transparent opacity-90" />
                
                {/* Click to view badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono tracking-wider text-zinc-200 border border-white/10 flex items-center gap-1.5 group-hover:bg-emerald-500/20 group-hover:text-emerald-300 group-hover:border-emerald-500/30 transition-all z-10">
                  <i className="ri-expand-diagonal-line text-xs"></i>
                  <span>Click to view</span>
                </div>

                <span className="absolute top-3 right-3 px-2.5 py-1 rounded bg-black/60 backdrop-blur-md text-[10px] font-mono tracking-widest uppercase text-zinc-200 border border-white/10 z-10">
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

                <div 
                  onClick={() => handleOpenModal(srv)}
                  className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-medium text-zinc-300 group-hover:text-[#FAF9F6] transition-colors cursor-pointer"
                >
                  <span>Explore Service & Image</span>
                  <i className="ri-arrow-right-line text-sm text-zinc-300 group-hover:text-white group-hover:translate-x-1 transition-all"></i>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal with Loading Spinner */}
      {activeModal && (
        <div 
          onClick={() => setActiveModal(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 cursor-zoom-out animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full bg-[#0F1217] rounded-2xl overflow-hidden border border-white/15 shadow-2xl cursor-default"
          >
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/10 bg-[#12151B]">
              <div>
                <h3 className="font-display font-medium text-white text-sm sm:text-base">
                  {activeModal.title}
                </h3>
                <p className="text-[11px] sm:text-xs font-mono text-zinc-400">{activeModal.tag} • {activeModal.location}</p>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={activeModal.fullImage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-liquid px-3.5 py-1.5 text-xs font-mono text-zinc-300 hover:text-white flex items-center gap-1.5"
                >
                  <i className="ri-external-link-line"></i>
                  <span>Full HD</span>
                </a>
                <button
                  onClick={() => setActiveModal(null)}
                  className="btn-liquid w-9 h-9 p-0 flex items-center justify-center text-zinc-300 hover:text-white"
                >
                  <i className="ri-close-line text-lg"></i>
                </button>
              </div>
            </div>
            
            <div className="relative min-h-[320px] max-h-[75vh] bg-black/60 flex items-center justify-center p-2 sm:p-4">
              {isImageLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 gap-3 z-10">
                  <div className="w-10 h-10 border-2 border-white/10 border-t-emerald-400 rounded-full animate-spin"></div>
                  <span className="text-xs font-mono tracking-wider text-zinc-400">Loading High-Res Image...</span>
                </div>
              )}
              <img 
                src={activeModal.fullImage} 
                alt={activeModal.title} 
                onLoad={() => setIsImageLoading(false)}
                className={`max-h-[65vh] sm:max-h-[70vh] w-auto object-contain rounded-xl shadow-2xl transition-opacity duration-300 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`} 
              />
            </div>
          </div>
        </div>
      )}

    </section>
  );
}



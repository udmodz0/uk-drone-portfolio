import React, { useState } from 'react';

export default function PhotoGallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeImage, setActiveImage] = useState(null);

  const photos = [
    {
      id: 1,
      title: 'Newcastle Quayside Vista',
      category: 'aerial',
      location: 'Tyne Bridges, Newcastle',
      camera: 'DJI Air 3S • 50MP Dual Camera',
      aspect: 'md:col-span-2 aspect-[16/10]',
      url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1400&auto=format&fit=crop'
    },
    {
      id: 2,
      title: 'Durham Cathedral at Sunset',
      category: 'landscape',
      location: 'Durham Heritage Coast',
      camera: 'DJI Air 3S • 70mm Telephoto',
      aspect: 'aspect-[4/5]',
      url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1000&auto=format&fit=crop'
    },
    {
      id: 3,
      title: 'Garden Celebration Highlights',
      category: 'celebrations',
      location: 'Private Estate, Northumberland',
      camera: 'DJI Air 3S + Ground Filming',
      aspect: 'aspect-[4/5]',
      url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=1000&auto=format&fit=crop'
    },
    {
      id: 4,
      title: 'Sunderland Marine Horizon',
      category: 'aerial',
      location: 'Sunderland Coastline',
      camera: 'DJI Air 3S • 24mm Wide Angle',
      aspect: 'md:col-span-2 aspect-[16/10]',
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1400&auto=format&fit=crop'
    },
    {
      id: 5,
      title: 'Event Atmosphere Portrait',
      category: 'portraits',
      location: 'Newcastle Event Space',
      camera: 'iPhone 17 Pro • 48MP ProRAW',
      aspect: 'aspect-[4/5]',
      url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop'
    },
    {
      id: 6,
      title: 'Dusk Gathering Aerial',
      category: 'events',
      location: 'Durham Countryside Estate',
      camera: 'DJI Air 3S • Low-Light Nightscape',
      aspect: 'aspect-[4/5]',
      url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1000&auto=format&fit=crop'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Works' },
    { id: 'aerial', label: 'Aerial' },
    { id: 'events', label: 'Events' },
    { id: 'portraits', label: 'Portraits' },
    { id: 'celebrations', label: 'Celebrations' },
    { id: 'landscape', label: 'Landscape' },
  ];

  const filteredPhotos = activeFilter === 'all' 
    ? photos 
    : photos.filter(p => p.category === activeFilter);

  return (
    <section id="photography" className="py-16 sm:py-24 md:py-32 bg-[#0B0D11] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div>
            <div className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-zinc-300 mb-2 sm:mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-aviation-500"></span>
              <span>Visual Portfolio</span>
            </div>
            <h2 className="font-display font-semibold text-2xl sm:text-4xl lg:text-5xl text-[#FAF9F6] tracking-tight">
              Selected Works
            </h2>
          </div>

          {/* Liquid Capsule Filter Tabs (Horizontally scrollable with smooth finger touch on mobile) */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`flex-shrink-0 px-4 py-2 text-xs font-semibold tracking-wide transition-all whitespace-nowrap ${
                  activeFilter === cat.id
                    ? 'btn-liquid-primary shadow-sm'
                    : 'btn-liquid text-zinc-300 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetrical Editorial Masonry Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 items-start">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setActiveImage(photo)}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer studio-card border-white/10 ${photo.aspect}`}
            >
              <img
                src={photo.url}
                alt={photo.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 opacity-85 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Minimal Editorial Card Meta */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-300">
                    {photo.category} • {photo.location}
                  </span>
                  <h3 className="font-display font-medium text-sm sm:text-base text-[#FAF9F6] group-hover:text-white mt-0.5">
                    {photo.title}
                  </h3>
                </div>

                <div className="btn-liquid w-8 h-8 rounded-full flex items-center justify-center text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all">
                  <i className="ri-arrow-right-up-line text-sm"></i>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div 
          onClick={() => setActiveImage(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 cursor-zoom-out animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full bg-[#0F1217] rounded-2xl overflow-hidden border border-white/15 shadow-2xl cursor-default"
          >
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/10 bg-[#12151B]">
              <div>
                <h3 className="font-display font-medium text-white text-sm sm:text-base">
                  {activeImage.title}
                </h3>
                <p className="text-[11px] sm:text-xs font-mono text-zinc-400">{activeImage.location} • {activeImage.camera}</p>
              </div>
              <button
                onClick={() => setActiveImage(null)}
                className="btn-liquid w-9 h-9 p-0 flex items-center justify-center text-zinc-300 hover:text-white"
              >
                <i className="ri-close-line text-lg"></i>
              </button>
            </div>
            
            <div className="max-h-[75vh] bg-black/60 flex items-center justify-center p-2 sm:p-4">
              <img 
                src={activeImage.url} 
                alt={activeImage.title} 
                className="max-h-[65vh] sm:max-h-[70vh] w-auto object-contain rounded-xl" 
              />
            </div>
          </div>
        </div>
      )}

    </section>
  );
}

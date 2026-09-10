import React, { useState } from 'react';

export default function PhotoGallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeImage, setActiveImage] = useState(null);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const photos = [
    {
      id: 1,
      title: 'Community Award Presentation',
      category: 'celebrations',
      location: 'Newcastle Sports Field',
      camera: 'DJI Air 3S • 50MP Aerial',
      aspect: 'md:col-span-2 aspect-[16/10]',
      url: 'https://i.ibb.co/hRWZ8R6Y/IMG-0025.jpg',
      fullUrl: '/img/IMG-0025.jpg',
      fallbackUrl: 'https://i.ibb.co/99TVY9DZ/IMG-0025.jpg'
    },
    {
      id: 2,
      title: 'Outdoor Youth Event & Setup',
      category: 'events',
      location: 'Durham Event Park',
      camera: 'DJI Air 3S • Ground & Aerial',
      aspect: 'aspect-[4/5]',
      url: 'https://i.ibb.co/LX8Kdssf/IMG-0018.jpg',
      fullUrl: '/img/IMG-0018.jpg',
      fallbackUrl: 'https://i.ibb.co/8L0kgQQV/IMG-0018.jpg'
    },
    {
      id: 3,
      title: 'Tournament Winners Team Photo',
      category: 'portraits',
      location: 'Newcastle Sports Complex',
      camera: 'iPhone 17 Pro • ProRAW',
      aspect: 'aspect-[4/5]',
      url: 'https://i.ibb.co/Kc42r24L/IMG-0021.jpg',
      fullUrl: '/img/IMG-0021.jpg',
      fallbackUrl: 'https://i.ibb.co/hxQBmBQZ/IMG-0021.jpg'
    },
    {
      id: 4,
      title: 'Live Match Action & Field Focus',
      category: 'landscape',
      location: 'Sunderland Sports Ground',
      camera: 'DJI Air 3S • 70mm Telephoto',
      aspect: 'aspect-[4/5]',
      url: 'https://i.ibb.co/v4cxrywr/IMG-0019.jpg',
      fullUrl: '/img/IMG-0019.jpg',
      fallbackUrl: 'https://i.ibb.co/B2fV7Wz7/IMG-0019.jpg'
    },
    {
      id: 5,
      title: 'Official Trophy Handover Ceremony',
      category: 'celebrations',
      location: 'Newcastle Event Pavilion',
      camera: 'iPhone 17 Pro • 48MP',
      aspect: 'md:col-span-2 aspect-[16/10]',
      url: 'https://i.ibb.co/XkMJ9y5x/IMG-0020.jpg',
      fullUrl: '/img/IMG-0020.jpg',
      fallbackUrl: 'https://i.ibb.co/TqdhZK0M/IMG-0020.jpg'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Works' },
    { id: 'events', label: 'Events' },
    { id: 'portraits', label: 'Portraits' },
    { id: 'celebrations', label: 'Celebrations' },
    { id: 'landscape', label: 'Sports & Landscape' },
  ];

  const filteredPhotos = activeFilter === 'all' 
    ? photos 
    : photos.filter(p => p.category === activeFilter);

  const handleOpenPhoto = (photo) => {
    setIsImageLoading(true);
    setActiveImage(photo);
  };

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
              onClick={() => handleOpenPhoto(photo)}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer studio-card border-white/10 ${photo.aspect}`}
            >
              <img
                src={photo.url}
                alt={photo.title}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = photo.localFallback || photo.fullUrl;
                }}
                className="w-full h-full object-cover blur-[5px] scale-105 group-hover:blur-[2px] group-hover:scale-110 transition-all duration-700 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Center Blurred View Indicator Badge */}
              <div className="absolute inset-0 flex items-center justify-center p-4 z-10 pointer-events-none">
                <div className="px-3.5 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-[11px] font-medium tracking-wide flex items-center gap-2 shadow-2xl group-hover:border-emerald-400/60 group-hover:bg-black/90 group-hover:text-emerald-300 transition-all">
                  <i className="ri-eye-line text-emerald-400 text-xs animate-pulse"></i>
                  <span>Click to view full photo</span>
                </div>
              </div>

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

      {/* Lightbox Modal with Animated Loading Spinner */}
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

              <div className="flex items-center gap-3">
                <a
                  href={activeImage.fullUrl || activeImage.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-liquid px-3.5 py-1.5 text-xs font-mono text-zinc-300 hover:text-white flex items-center gap-1.5"
                >
                  <i className="ri-external-link-line"></i>
                  <span>Full HD</span>
                </a>
                <button
                  onClick={() => setActiveImage(null)}
                  className="btn-liquid w-9 h-9 p-0 flex items-center justify-center text-zinc-300 hover:text-white"
                >
                  <i className="ri-close-line text-lg"></i>
                </button>
              </div>
            </div>
            
            <div className="relative min-h-[380px] max-h-[82vh] bg-black/80 flex items-center justify-center p-2 sm:p-4">
              {isImageLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 gap-3 z-10">
                  <div className="w-10 h-10 border-2 border-white/10 border-t-emerald-400 rounded-full animate-spin"></div>
                  <span className="text-xs font-mono tracking-wider text-zinc-400">Loading High-Res Image...</span>
                </div>
              )}
              <img 
                src={activeImage.fullUrl || activeImage.url} 
                alt={activeImage.title} 
                onError={(e) => {
                  if (activeImage.fallbackUrl && e.currentTarget.src !== activeImage.fallbackUrl) {
                    e.currentTarget.src = activeImage.fallbackUrl;
                  }
                }}
                onLoad={() => setIsImageLoading(false)}
                className={`max-h-[75vh] sm:max-h-[80vh] w-full max-w-full object-contain rounded-xl shadow-2xl transition-opacity duration-300 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`} 
              />
            </div>
          </div>
        </div>
      )}

    </section>
  );
}


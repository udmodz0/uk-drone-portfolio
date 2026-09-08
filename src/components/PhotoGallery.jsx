import React, { useState } from 'react';

export default function PhotoGallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeImage, setActiveImage] = useState(null);

  const photos = [
    {
      id: 1,
      title: 'Newcastle Quayside Aerial Vista',
      category: 'aerial',
      camera: 'DJI Air 3S • 50MP Dual Camera',
      resolution: '8192 x 6144 RAW',
      location: 'Newcastle Upon Tyne',
      focal: '24mm f/1.7 ISO 100',
      url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 2,
      title: 'Durham Cathedral Golden Hour Sunset',
      category: 'aerial',
      camera: 'DJI Air 3S • 50MP Dual Camera',
      resolution: '8192 x 6144 RAW',
      location: 'Durham Heritage Coast',
      focal: '70mm Telephoto f/2.8',
      url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 3,
      title: 'Outdoor Birthday Celebration Highlight',
      category: 'events',
      camera: 'DJI Air 3S + Ground Filming',
      resolution: '4K High Res Edit',
      location: 'Private Event, Newcastle',
      focal: 'Aerial Group Portrait',
      url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 4,
      title: 'Sunderland Coastline & Marine Horizon',
      category: 'aerial',
      camera: 'DJI Air 3S • 50MP Dual Lens',
      resolution: '8192 x 6144 RAW',
      location: 'Sunderland Seafront',
      focal: '24mm Wide Angle f/1.7',
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 5,
      title: 'Event Atmosphere Ground Portrait',
      category: 'iphone',
      camera: 'iPhone 17 Pro Max',
      resolution: '48MP ProRAW',
      location: 'Newcastle Event Venue',
      focal: '48mm Portrait Lens',
      url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 6,
      title: 'Sunset Garden Party Aerial Dusk',
      category: 'events',
      camera: 'DJI Air 3S • Nightscape Sensor',
      resolution: '8192 x 6144 RAW',
      location: 'Durham Outdoor Estate',
      focal: '24mm Low-Light HDR',
      url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200&auto=format&fit=crop'
    }
  ];

  const filteredPhotos = activeFilter === 'all' 
    ? photos 
    : photos.filter(p => p.category === activeFilter);

  return (
    <section id="photography" className="py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-t border-slate-200 relative overflow-hidden">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 radar-grid opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-blue-200 text-blue-700 bg-white/90 text-xs font-mono font-bold uppercase tracking-widest mb-4 shadow-sm">
            <i className="ri-camera-3-line text-sm text-blue-600"></i>
            50MP HIGH-RES GALLERY
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-slate-950 tracking-tight">
            50MP Aerial & <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600 bg-clip-text text-transparent">Ground Photography</span>
          </h2>
          <p className="mt-4 text-slate-600 text-base leading-relaxed">
            Every photo package includes full RAW color grading, high dynamic range processing, and full print rights digital delivery.
          </p>

          {/* Filter Pills */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {[
              { id: 'all', label: 'All Photos', icon: 'ri-grid-fill' },
              { id: 'aerial', label: '50MP Drone Aerials', icon: 'ri-flight-takeoff-line' },
              { id: 'events', label: 'Events & Parties', icon: 'ri-goblet-line' },
              { id: 'iphone', label: 'iPhone 17 Pro Shots', icon: 'ri-smartphone-line' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all duration-300 ${
                  activeFilter === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md border border-blue-500/30'
                    : 'bg-white text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-blue-400'
                }`}
              >
                <i className={`${tab.icon} text-sm`}></i>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setActiveImage(photo)}
              className="group glass-panel-cinematic rounded-3xl overflow-hidden border border-slate-200 hover:border-blue-400 cursor-pointer transition-all duration-500 shadow-sm bg-white/80"
            >
              <div className="relative aspect-[4/3] bg-slate-950 overflow-hidden">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-90 group-hover:opacity-60 transition-opacity"></div>
                
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-blue-600 border border-blue-200 shadow-md">
                    <i className="ri-eye-line text-lg"></i>
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block px-3 py-0.5 rounded-md text-[10px] font-mono font-bold bg-white/90 text-blue-700 border border-blue-200 mb-1.5 backdrop-blur-md">
                    {photo.camera}
                  </span>
                  <h4 className="font-display font-bold text-white text-base truncate">{photo.title}</h4>
                  <p className="text-xs font-mono text-slate-300 flex items-center gap-1.5 mt-0.5">
                    <i className="ri-map-pin-2-fill text-sky-400"></i>
                    {photo.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Telemetry Modal */}
      {activeImage && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="relative max-w-5xl w-full glass-panel-cinematic rounded-3xl overflow-hidden border border-slate-200 shadow-2xl bg-white animate-in fade-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between p-5 bg-white border-b border-slate-200">
              <div>
                <h4 className="font-display font-bold text-slate-900 text-lg flex items-center gap-2">
                  <i className="ri-image-line text-blue-600"></i>
                  {activeImage.title}
                </h4>
                <p className="text-xs font-mono text-slate-600 mt-0.5">
                  {activeImage.location} • {activeImage.camera} ({activeImage.resolution}) • {activeImage.focal}
                </p>
              </div>
              <button
                onClick={() => setActiveImage(null)}
                className="w-10 h-10 rounded-full text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-all"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>
            <div className="max-h-[75vh] bg-black flex items-center justify-center p-3">
              <img src={activeImage.url} alt={activeImage.title} className="max-h-[70vh] w-auto object-contain rounded-2xl border border-white/10 shadow-2xl" />
            </div>
          </div>
        </div>
      )}

    </section>
  );
}


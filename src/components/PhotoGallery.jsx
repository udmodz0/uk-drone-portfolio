import React, { useState } from 'react';
import { Camera, Eye, Sparkles, Filter, X, Smartphone, MapPin, Download } from 'lucide-react';

export default function PhotoGallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeImage, setActiveImage] = useState(null);

  const photos = [
    {
      id: 1,
      title: 'Newcastle Bridges & Quayside Aerial',
      category: 'aerial',
      camera: 'DJI Air 3S • 50MP',
      resolution: '8192 x 6144',
      location: 'Newcastle upon Tyne',
      url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 2,
      title: 'Durham Cathedral Sunset Vista',
      category: 'aerial',
      camera: 'DJI Air 3S • 50MP',
      resolution: '8192 x 6144',
      location: 'Durham Heritage Coast',
      url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 3,
      title: 'Outdoor Birthday Celebration Group',
      category: 'events',
      camera: 'DJI Air 3S + iPhone 17 Pro',
      resolution: '4K High Res',
      location: 'Private Event, Newcastle',
      url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 4,
      title: 'Sunderland Coast & Marine Aerial',
      category: 'aerial',
      camera: 'DJI Air 3S • 50MP Dual Lens',
      resolution: '8192 x 6144',
      location: 'Sunderland Seafront',
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 5,
      title: 'Event Ground Portrait & Atmosphere',
      category: 'iphone',
      camera: 'iPhone 17 Pro',
      resolution: '48MP ProRAW',
      location: 'Newcastle Party Event',
      url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 6,
      title: 'Sunset Garden Party Aerial View',
      category: 'events',
      camera: 'DJI Air 3S • Nightscape',
      resolution: '8192 x 6144',
      location: 'Durham Outdoor Party',
      url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200&auto=format&fit=crop'
    }
  ];

  const filteredPhotos = activeFilter === 'all' 
    ? photos 
    : photos.filter(p => p.category === activeFilter);

  return (
    <section className="py-24 bg-obsidian-900 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Camera className="w-3.5 h-3.5" />
            Edited Photography Portfolio
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            50MP Aerial & <span className="text-gold-400">Ground Photography</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base">
            Every photo package includes full professional editing, color enhancement, and digital delivery ready to print or post.
          </p>

          {/* Filter Pills */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {[
              { id: 'all', label: 'All Photos' },
              { id: 'aerial', label: '🚁 50MP Drone Aerials' },
              { id: 'events', label: '🎉 Events & Celebrations' },
              { id: 'iphone', label: '📱 iPhone 17 Pro Shots' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeFilter === tab.id
                    ? 'bg-gold-gradient text-obsidian-950 shadow-md'
                    : 'bg-obsidian-850 text-slate-300 hover:text-white border border-slate-800'
                }`}
              >
                {tab.label}
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
              className="group glass-panel rounded-3xl overflow-hidden border border-slate-800 hover:border-gold-500/40 cursor-pointer transition-all duration-300"
            >
              <div className="relative aspect-[4/3] bg-obsidian-950 overflow-hidden">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="w-9 h-9 rounded-full bg-obsidian-950/80 backdrop-blur-md flex items-center justify-center text-gold-400 border border-gold-500/30">
                    <Eye className="w-4 h-4" />
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-gold-500/20 text-gold-400 border border-gold-500/40 mb-1 backdrop-blur-md">
                    {photo.camera}
                  </span>
                  <h4 className="font-display font-bold text-white text-base truncate">{photo.title}</h4>
                  <p className="text-xs text-slate-300 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-skyline-400" />
                    {photo.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full glass-panel rounded-3xl overflow-hidden border border-slate-800">
            <div className="flex items-center justify-between p-4 bg-obsidian-950 border-b border-slate-800">
              <div>
                <h4 className="font-display font-bold text-white text-base">{activeImage.title}</h4>
                <p className="text-xs text-slate-400">{activeImage.location} • {activeImage.camera} ({activeImage.resolution})</p>
              </div>
              <button
                onClick={() => setActiveImage(null)}
                className="p-2 rounded-full text-slate-400 hover:text-white bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="max-h-[75vh] bg-black flex items-center justify-center p-2">
              <img src={activeImage.url} alt={activeImage.title} className="max-h-[70vh] w-auto object-contain rounded-xl" />
            </div>
          </div>
        </div>
      )}

    </section>
  );
}

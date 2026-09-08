import React, { useState } from 'react';

export default function VideoShowcase() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const featuredReel = {
    id: 1,
    title: 'North East England Aerial Showcase',
    subtitle: 'Newcastle, Tyne River & North East Coastline',
    duration: '01:45',
    quality: '4K 60FPS 10-Bit D-Log',
    camera: 'DJI Air 3S Dual-Camera Payload',
    thumbnail: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=85&w=1600&auto=format&fit=crop',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-drone-view-of-a-coastal-city-and-ocean-41584-large.mp4',
  };

  const additionalReels = [
    {
      id: 2,
      title: 'Durham Heritage & Countryside Stills',
      subtitle: 'Durham Cathedral & Historic Riverbanks',
      duration: '02:15',
      quality: '4K HDR',
      thumbnail: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=800&auto=format&fit=crop',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-and-buildings-41582-large.mp4',
      isPlaceholder: false,
    },
    {
      id: 3,
      title: 'Bespoke Client Reel Slot #1',
      subtitle: 'Newcastle NE3 / Private Event Venue',
      duration: 'Ready to Upload',
      quality: '4K Ready',
      thumbnail: '',
      videoUrl: '',
      isPlaceholder: true,
    },
    {
      id: 4,
      title: 'Bespoke Client Reel Slot #2',
      subtitle: 'Sunderland Coastal Horizon',
      duration: 'Ready to Upload',
      quality: '4K Ready',
      thumbnail: '',
      videoUrl: '',
      isPlaceholder: true,
    }
  ];

  return (
    <section id="videos" className="py-16 sm:py-24 md:py-32 bg-[#0B0D11] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Header */}
        <div className="max-w-3xl mb-10 sm:mb-14">
          <div className="text-[10px] sm:text-[11px] font-mono tracking-widest uppercase text-zinc-300 mb-2 sm:mb-3 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-aviation-500"></span>
            <span>Watch The Reel</span>
          </div>
          <h2 className="font-display font-semibold text-2xl sm:text-4xl lg:text-6xl text-[#FAF9F6] tracking-tight leading-[1.15] sm:leading-[1.08]">
            Aerial stories. <br />
            Events. Moments.
          </h2>
          <p className="mt-3 sm:mt-4 text-zinc-300 text-xs sm:text-base leading-relaxed font-normal max-w-xl">
            Experience sample 4K cinema highlight reels filmed with our dual-camera DJI Air 3S platform across Newcastle, Sunderland, and Durham.
          </p>
        </div>

        {/* Large Cinematic Hero Video Card */}
        <div 
          onClick={() => setSelectedVideo(featuredReel)}
          className="relative aspect-[16/9] sm:aspect-[21/9] min-h-[260px] sm:min-h-[360px] rounded-2xl overflow-hidden cursor-pointer group studio-card border-white/10 mb-6 sm:mb-8"
        >
          <img
            src={featuredReel.thumbnail}
            alt={featuredReel.title}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 opacity-80 group-hover:opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20" />

          {/* Liquid Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="btn-liquid w-14 h-14 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-white group-hover:scale-105 transition-all duration-300 shadow-2xl">
              <i className="ri-play-fill text-xl sm:text-3xl ml-0.5 sm:ml-1 text-white"></i>
            </div>
          </div>

          {/* Metadata Overlay */}
          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4">
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-300">
                Featured Showreel • {featuredReel.duration}
              </span>
              <h3 className="font-display font-semibold text-lg sm:text-2xl text-white mt-0.5 sm:mt-1">
                {featuredReel.title}
              </h3>
              <p className="text-[11px] sm:text-xs text-zinc-300 font-mono mt-0.5">
                {featuredReel.subtitle}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="btn-liquid px-3 py-1 rounded-full text-[10px] font-mono text-zinc-200">
                {featuredReel.quality}
              </span>
            </div>
          </div>
        </div>

        {/* Secondary Reel Slots Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
          {additionalReels.map((reel) => (
            <div
              key={reel.id}
              className={`rounded-2xl overflow-hidden studio-card border-white/10 flex flex-col justify-between ${
                reel.isPlaceholder ? 'border-dashed border-white/15 bg-[#0E1117]/60' : 'cursor-pointer group'
              }`}
              onClick={() => {
                if (!reel.isPlaceholder) setSelectedVideo(reel);
              }}
            >
              {reel.isPlaceholder ? (
                /* Upload Slot */
                <div className="p-6 sm:p-8 flex flex-col items-center justify-center text-center min-h-[180px] sm:min-h-[200px]">
                  <div className="btn-liquid w-10 h-10 rounded-full flex items-center justify-center text-zinc-200 mb-3">
                    <i className="ri-upload-2-line text-base"></i>
                  </div>
                  <h4 className="font-display font-medium text-xs sm:text-sm text-[#FAF9F6]">{reel.title}</h4>
                  <p className="text-[10px] sm:text-[11px] text-zinc-400 mt-1 max-w-xs font-mono">
                    Drop MP4 into <span className="text-zinc-200">/public/videos/</span>
                  </p>
                </div>
              ) : (
                /* Video Thumbnail Card */
                <div className="flex flex-col h-full">
                  <div className="relative aspect-video bg-studio-800 overflow-hidden">
                    <img
                      src={reel.thumbnail}
                      alt={reel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-75 group-hover:opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    
                    {/* Small Liquid Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="btn-liquid w-10 h-10 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                        <i className="ri-play-fill text-sm ml-0.5"></i>
                      </div>
                    </div>

                    <span className="absolute bottom-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono text-zinc-300">
                      {reel.duration}
                    </span>
                  </div>

                  <div className="p-4 sm:p-5">
                    <h4 className="font-display font-medium text-sm sm:text-base text-[#FAF9F6] group-hover:text-white transition-colors">
                      {reel.title}
                    </h4>
                    <p className="text-xs text-zinc-400 font-mono mt-0.5">
                      {reel.subtitle}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>

      {/* Cinematic Modal Video Lightbox */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6">
          <div className="relative w-full max-w-5xl bg-[#0F1217] rounded-2xl overflow-hidden border border-white/10 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#12151B]">
              <div>
                <h4 className="font-display font-medium text-white text-sm sm:text-base">
                  {selectedVideo.title}
                </h4>
                <p className="text-[11px] sm:text-xs font-mono text-zinc-400">{selectedVideo.subtitle || selectedVideo.quality}</p>
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                className="btn-liquid w-9 h-9 p-0 flex items-center justify-center text-zinc-300 hover:text-white"
              >
                <i className="ri-close-line text-lg"></i>
              </button>
            </div>

            <div className="aspect-video bg-black flex items-center justify-center">
              <video
                src={selectedVideo.videoUrl}
                controls
                autoPlay
                className="w-full h-full object-contain"
              ></video>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}

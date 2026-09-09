import React, { useState } from 'react';

export default function VideoShowcase() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isMuted, setIsMuted] = useState(true);

  const featuredReel = {
    id: 1,
    title: 'Newcastle & North East Aerial Showcase',
    subtitle: 'Newcastle Event Grounds & Tyne River Aerial Reel (IMG 2432)',
    duration: '01:26',
    quality: '4K 60FPS 10-Bit D-Log',
    camera: 'DJI Air 3S Dual-Camera Payload',
    thumbnail: 'https://i.ibb.co/99TVY9DZ/IMG-0025.jpg',
    youtubeId: 'PIja76NisHs',
  };

  const additionalReels = [
    {
      id: 2,
      title: 'Newcastle Event & Aerial Highlight',
      subtitle: 'Newcastle Event Grounds (IMG 2432)',
      duration: '01:26',
      quality: '4K Reel',
      thumbnail: 'https://i.ibb.co/99TVY9DZ/IMG-0025.jpg',
      youtubeId: 'PIja76NisHs',
      isPlaceholder: false,
    },
    {
      id: 3,
      title: 'Durham Festival & Youth Setup',
      subtitle: 'Durham Sports Park (IMG 8292)',
      duration: '00:25',
      quality: '4K Reel',
      thumbnail: 'https://i.ibb.co/8L0kgQQV/IMG-0018.jpg',
      youtubeId: 'TSlTqqy4SO8',
      isPlaceholder: false,
    },
    {
      id: 4,
      title: 'Live Match Action & Field Focus',
      subtitle: 'Sunderland Sports Ground Coverage',
      duration: '01:30',
      quality: '4K Cinema',
      thumbnail: 'https://i.ibb.co/B2fV7Wz7/IMG-0019.jpg',
      youtubeId: 'PIja76NisHs',
      isPlaceholder: false,
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

        {/* Large Cinematic Hero Video Card with Auto-playing Background */}
        <div 
          onClick={() => {
            setIsMuted(true);
            setSelectedVideo(featuredReel);
          }}
          className="relative aspect-[16/9] sm:aspect-[21/9] min-h-[260px] sm:min-h-[360px] rounded-2xl overflow-hidden cursor-pointer group studio-card border-white/10 mb-6 sm:mb-8 select-none"
          onContextMenu={(e) => e.preventDefault()}
        >
          {/* Autoplay Muted Embed Background */}
          <div className="absolute inset-0 pointer-events-none scale-110">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${featuredReel.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${featuredReel.youtubeId}&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&playsinline=1`}
              title="Featured Reel Background"
              className="w-full h-full object-cover opacity-75 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700 pointer-events-none"
              allow="autoplay; encrypted-media"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20" />

          {/* Liquid Play Button */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <div className="btn-liquid w-14 h-14 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-white group-hover:scale-105 transition-all duration-300 shadow-2xl">
              <i className="ri-play-fill text-xl sm:text-3xl ml-0.5 sm:ml-1 text-white"></i>
            </div>
          </div>

          {/* Metadata Overlay */}
          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 z-10 pointer-events-none">
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Featured Showreel • {featuredReel.duration}</span>
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

        {/* Secondary Reel Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
          {additionalReels.map((reel) => (
            <div
              key={reel.id}
              className="rounded-2xl overflow-hidden studio-card border-white/10 flex flex-col justify-between cursor-pointer group select-none"
              onClick={() => {
                setIsMuted(true);
                setSelectedVideo(reel);
              }}
              onContextMenu={(e) => e.preventDefault()}
            >
              {/* Video Thumbnail Card */}
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
            </div>
          ))}
        </div>

      </div>

      {/* Custom Protected Video Lightbox Player Modal */}
      {selectedVideo && (
        <div 
          onClick={() => setSelectedVideo(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl bg-[#0F1217] rounded-2xl overflow-hidden border border-white/10 shadow-2xl animate-in zoom-in-95 duration-200"
          >
            
            {/* Modal Header */}
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

            {/* Custom Embedded Protected Player Frame */}
            <div 
              className="relative aspect-video bg-black flex items-center justify-center overflow-hidden select-none"
              onContextMenu={(e) => e.preventDefault()}
            >
              {selectedVideo.youtubeId ? (
                <>
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${selectedVideo.youtubeId}?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=${selectedVideo.youtubeId}&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&playsinline=1`}
                    title={selectedVideo.title}
                    className="w-[115%] h-[115%] object-cover pointer-events-none scale-105"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />

                  {/* Header Shield */}
                  <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-black/80 to-transparent pointer-events-auto z-10 px-4 py-3 flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span className="text-[10px] font-mono tracking-widest text-zinc-300 uppercase">STUDIO VIDEO PLAYER</span>
                    </div>
                  </div>

                  {/* Custom Audio Control Toggle Button */}
                  <div className="absolute bottom-4 right-4 z-20 flex items-center gap-3 pointer-events-auto">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsMuted(!isMuted);
                      }}
                      className="btn-liquid px-4 py-2.5 rounded-full text-xs font-mono text-white flex items-center gap-2 backdrop-blur-xl bg-black/70 border border-white/20 hover:bg-white/20 transition-all shadow-xl"
                    >
                      <i className={`ri-volume-${isMuted ? 'mute-line text-rose-400' : 'up-line text-emerald-400'} text-sm`}></i>
                      <span>{isMuted ? 'TAP TO UNMUTE' : 'MUTED'}</span>
                    </button>
                  </div>
                </>
              ) : (
                <video
                  src={selectedVideo.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                ></video>
              )}
            </div>

          </div>
        </div>
      )}

    </section>
  );
}


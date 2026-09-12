import React, { useState, useEffect, useRef } from 'react';
import CustomVideoPlayer, { fetchDirectVideoUrl, prefetchVideoUrls, getVideoUrlFromCache } from './CustomVideoPlayer';

// ─── All video IDs in one place ───────────────────────────────────────────────
// Keep this list in sync whenever you add new reels. Site-load prefetch reads it.
const ALL_YOUTUBE_IDS = ['PIja76NisHs', 'TSlTqqy4SO8'];


// Subcomponent for Video Card with Autoplay on Hover
// prefetchedUrl: synchronously read from cache (already resolved at site load)
function HoverableVideoCard({ reel, isHero = false, onClick, prefetchedUrl = null }) {
  const [isHovered, setIsHovered] = useState(false);
  // Start with the prefetched URL if it is already available
  const [videoStreamUrl, setVideoStreamUrl] = useState(prefetchedUrl);
  const [isLoadingStream, setIsLoadingStream] = useState(false);
  const videoRef = useRef(null);

  // Fetch direct video stream when hovered.
  // If the URL was already prefetched at site load, cache hit is synchronous and
  // this effect becomes a no-op (isLoadingStream stays false, no spinner shown).
  useEffect(() => {
    let active = true;
    if (isHovered && !videoStreamUrl && !isLoadingStream && reel.youtubeId) {
      // Try cache first (zero-cost synchronous read)
      const cached = getVideoUrlFromCache(reel.youtubeId);
      if (cached) {
        setVideoStreamUrl(cached);
        return;
      }
      // Fallback: fetch live if prefetch hadn't completed yet
      setIsLoadingStream(true);
      fetchDirectVideoUrl(reel.youtubeId).then((url) => {
        if (active) {
          if (url) setVideoStreamUrl(url);
          setIsLoadingStream(false);
        }
      });
    }
    return () => { active = false; };
  }, [isHovered, videoStreamUrl, isLoadingStream, reel.youtubeId]);

  const playPromiseRef = useRef(null);

  // Handle Play/Pause on hover safely to prevent AbortError
  useEffect(() => {
    if (videoRef.current && videoStreamUrl) {
      if (isHovered) {
        try {
          const promise = videoRef.current.play();
          if (promise !== undefined) {
            playPromiseRef.current = promise;
            promise
              .then(() => {
                playPromiseRef.current = null;
              })
              .catch(() => {
                playPromiseRef.current = null;
              });
          }
        } catch (e) {}
      } else {
        if (playPromiseRef.current) {
          playPromiseRef.current
            .then(() => {
              if (videoRef.current) videoRef.current.pause();
            })
            .catch(() => {
              if (videoRef.current) videoRef.current.pause();
            });
        } else {
          try {
            videoRef.current.pause();
          } catch (e) {}
        }
      }
    }
  }, [isHovered, videoStreamUrl]);

  if (isHero) {
    return (
      <div 
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative aspect-[16/9] sm:aspect-[21/9] min-h-[260px] sm:min-h-[360px] rounded-2xl overflow-hidden cursor-pointer group studio-card border-white/10 mb-6 sm:mb-8 select-none"
      >
        {/* Background Thumbnail */}
        <img
          src={reel.thumbnail}
          alt={reel.title}
          onError={(e) => {
            if (e.currentTarget.src !== reel.fallbackThumbnail) {
              e.currentTarget.src = reel.fallbackThumbnail;
            } else if (reel.localFallback) {
              e.currentTarget.src = reel.localFallback;
            }
          }}
          className={`w-full h-full object-cover blur-[4px] scale-105 transition-all duration-700 opacity-80 group-hover:opacity-95 ${
            isHovered && videoStreamUrl ? 'opacity-0' : 'opacity-80'
          }`}
        />

        {/* Hover Auto-play Direct HTML5 Video Stream */}
        {videoStreamUrl && (
          <video
            ref={videoRef}
            src={videoStreamUrl}
            muted
            loop
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/20 pointer-events-none" />

        {/* Loading Spinner on hover if stream resolving */}
        {isHovered && isLoadingStream && (
          <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-[10px] font-mono text-zinc-300 flex items-center gap-2 border border-white/10">
            <div className="w-3 h-3 border border-white/20 border-t-emerald-400 rounded-full animate-spin"></div>
            <span>Loading stream...</span>
          </div>
        )}

        {/* Live Hover Playing Indicator */}
        {isHovered && videoStreamUrl && (
          <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-emerald-950/80 backdrop-blur-md text-[10px] font-mono text-emerald-300 flex items-center gap-1.5 border border-emerald-500/40 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span>AUTOPLAY PREVIEW</span>
          </div>
        )}

        {/* Center Liquid Play Button */}
        <div className={`absolute inset-0 flex items-center justify-center pointer-events-none z-10 transition-opacity duration-300 ${isHovered && videoStreamUrl ? 'opacity-40 group-hover:opacity-90' : 'opacity-100'}`}>
          <div className="btn-liquid w-14 h-14 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-all duration-300 shadow-2xl">
            <i className="ri-play-fill text-xl sm:text-3xl ml-0.5 sm:ml-1 text-white"></i>
          </div>
        </div>

        {/* Metadata Overlay */}
        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 z-10 pointer-events-none">
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Featured Showreel • {reel.duration}</span>
            </span>
            <h3 className="font-display font-semibold text-lg sm:text-2xl text-white mt-0.5 sm:mt-1">
              {reel.title}
            </h3>
            <p className="text-[11px] sm:text-xs text-zinc-300 font-mono mt-0.5">
              {reel.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="btn-liquid px-3 py-1 rounded-full text-[10px] font-mono text-zinc-200">
              {reel.quality}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Secondary Card Grid Item
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="rounded-2xl overflow-hidden studio-card border-white/10 flex flex-col justify-between cursor-pointer group select-none"
    >
      <div className="flex flex-col h-full">
        <div className="relative aspect-video bg-studio-800 overflow-hidden">
          <img
            src={reel.thumbnail}
            alt={reel.title}
            onError={(e) => {
              if (e.currentTarget.src !== reel.fallbackThumbnail) {
                e.currentTarget.src = reel.fallbackThumbnail;
              } else if (reel.localFallback) {
                e.currentTarget.src = reel.localFallback;
              }
            }}
            className={`w-full h-full object-cover blur-[4px] transition-all duration-500 opacity-80 ${
              isHovered && videoStreamUrl ? 'opacity-0' : 'opacity-80'
            }`}
          />

          {/* Hover Auto-play Direct Stream */}
          {videoStreamUrl && (
            <video
              ref={videoRef}
              src={videoStreamUrl}
              muted
              loop
              playsInline
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
          
          {/* Small Liquid Play Button */}
          <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${isHovered && videoStreamUrl ? 'opacity-40 group-hover:opacity-90' : 'opacity-100'}`}>
            <div className="btn-liquid w-10 h-10 rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform">
              <i className="ri-play-fill text-sm ml-0.5"></i>
            </div>
          </div>

          {/* Hovering Live Stream Tag */}
          {isHovered && videoStreamUrl && (
            <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-emerald-950/80 backdrop-blur-md text-[9px] font-mono text-emerald-300 border border-emerald-500/30 flex items-center gap-1 animate-pulse z-10">
              <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping"></span>
              <span>PLAYING</span>
            </span>
          )}

          <span className="absolute bottom-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono text-zinc-300 z-10">
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
  );
}

export default function VideoShowcase() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  // Tracks whether prefetch has completed so child components can sync
  const [prefetchDone, setPrefetchDone] = useState(false);

  const handleCloseModal = () => {
    setSelectedVideo(null);
  };

  // ─── Prefetch all video URLs on site load ──────────────────────────────────
  // Uses requestIdleCallback so it only runs after the browser has finished
  // critical rendering work, keeping first-paint fast.
  useEffect(() => {
    let handle;
    function run() {
      prefetchVideoUrls(ALL_YOUTUBE_IDS).then(() => setPrefetchDone(true));
    }
    if (typeof requestIdleCallback !== 'undefined') {
      handle = requestIdleCallback(run, { timeout: 3000 });
    } else {
      // Safari fallback
      handle = setTimeout(run, 500);
    }
    return () => {
      if (typeof cancelIdleCallback !== 'undefined') cancelIdleCallback(handle);
      else clearTimeout(handle);
    };
  }, []);

  // Keyboard Escape & Body Scroll Lock
  useEffect(() => {
    if (!selectedVideo) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [selectedVideo]);

  const featuredReel = {
    id: 1,
    title: 'Newcastle & North East Aerial Showcase',
    subtitle: 'Newcastle Event Grounds & Tyne River Reel (IMG 2432)',
    duration: '01:26',
    quality: '4K 60FPS 10-Bit D-Log',
    camera: 'DJI Air 3S Dual-Camera Payload',
    thumbnail: 'https://i.ibb.co/hRWZ8R6Y/IMG-0025.jpg',
    fallbackThumbnail: 'https://i.ibb.co/99TVY9DZ/IMG-0025.jpg',
    youtubeId: 'PIja76NisHs',
  };

  const additionalReels = [
    {
      id: 2,
      title: 'Newcastle Event & Aerial Highlight',
      subtitle: 'Newcastle Event Grounds (IMG 2432)',
      duration: '01:26',
      quality: '4K Reel',
      thumbnail: 'https://i.ibb.co/hRWZ8R6Y/IMG-0025.jpg',
      fallbackThumbnail: 'https://i.ibb.co/99TVY9DZ/IMG-0025.jpg',
      youtubeId: 'PIja76NisHs',
    },
    {
      id: 3,
      title: 'Newcastle Sixer Cricket Match Setup',
      subtitle: 'Newcastle Sixer Cricket Match Park (IMG 8292)',
      duration: '00:25',
      quality: '4K Reel',
      thumbnail: 'https://i.ibb.co/LX8Kdssf/IMG-0018.jpg',
      fallbackThumbnail: 'https://i.ibb.co/8L0kgQQV/IMG-0018.jpg',
      youtubeId: 'TSlTqqy4SO8',
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
            Experience sample 4K cinema highlight reels filmed with our dual-camera DJI Air 3S platform across Newcastle, Sunderland, and Newcastle Sixer Cricket Match. Hover over any reel to preview automatically.
          </p>
        </div>

        {/* Large Cinematic Hero Video Card with Hover Autoplay */}
        <HoverableVideoCard 
          reel={featuredReel} 
          isHero={true} 
          prefetchedUrl={prefetchDone ? getVideoUrlFromCache(featuredReel.youtubeId) : null}
          onClick={() => setSelectedVideo(featuredReel)} 
        />

        {/* Secondary Reel Grid with Hover Autoplay */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
          {additionalReels.map((reel) => (
            <HoverableVideoCard
              key={reel.id}
              reel={reel}
              prefetchedUrl={prefetchDone ? getVideoUrlFromCache(reel.youtubeId) : null}
              onClick={() => setSelectedVideo(reel)}
            />
          ))}
        </div>

      </div>

      {/* Video Custom Lightbox Player Modal */}
      {selectedVideo && (
        <div 
          onClick={handleCloseModal}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200 cursor-pointer"
        >
          {/* Prominent Always-Visible Floating Close Button at top-right */}
          <button 
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleCloseModal();
            }}
            className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[120] flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#11141B]/90 hover:bg-white/20 text-zinc-200 hover:text-white border border-white/20 backdrop-blur-xl transition-all shadow-2xl cursor-pointer group active:scale-95"
            aria-label="Close video player (ESC)"
          >
            <i className="ri-close-line text-lg group-hover:rotate-90 transition-transform"></i>
            <span className="text-xs font-mono uppercase tracking-wider hidden sm:inline-block font-medium">Close (ESC)</span>
          </button>

          {/* Player Container */}
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative z-[110] flex items-center justify-center cursor-default max-w-full"
          >
            <CustomVideoPlayer 
              youtubeId={selectedVideo.youtubeId}
              initialVideoUrl={selectedVideo.videoUrl || getVideoUrlFromCache(selectedVideo.youtubeId)}
              title={selectedVideo.title}
              subtitle={selectedVideo.subtitle}
              isAutoPlay={true}
              onClose={handleCloseModal}
            />
          </div>
        </div>
      )}

    </section>
  );
}

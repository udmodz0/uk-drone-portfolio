import React, { useState, useEffect, useRef } from 'react';

// Cache for resolved API video stream URLs so we don't refetch identical videos repeatedly
const videoUrlCache = {};

export async function fetchDirectVideoUrl(youtubeId) {
  if (!youtubeId) return null;
  if (videoUrlCache[youtubeId]) return videoUrlCache[youtubeId];

  try {
    const ytUrl = `https://www.youtube.com/watch?v=${youtubeId}`;
    const apiEndpoint = `https://ytdl.udmodzz.workers.dev/?url=${encodeURIComponent(ytUrl)}&type=vid`;
    const res = await fetch(apiEndpoint);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    
    if (data && data.links) {
      const streamUrl = data.links['HD Video'] || Object.values(data.links)[0];
      if (streamUrl) {
        videoUrlCache[youtubeId] = streamUrl;
        return streamUrl;
      }
    }
  } catch (err) {
    console.warn('API video fetch error:', err);
  }
  return null;
}

export default function CustomVideoPlayer({ youtubeId, initialVideoUrl, title, subtitle, isAutoPlay = true, onClose }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  
  const [streamUrl, setStreamUrl] = useState(initialVideoUrl || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const controlsTimeoutRef = useRef(null);

  // Fetch direct video stream from API if not already supplied
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(false);

    async function loadStream() {
      if (initialVideoUrl) {
        setStreamUrl(initialVideoUrl);
        setLoading(false);
        return;
      }

      if (youtubeId) {
        const url = await fetchDirectVideoUrl(youtubeId);
        if (isMounted) {
          if (url) {
            setStreamUrl(url);
          } else {
            setError(true);
          }
          setLoading(false);
        }
      } else {
        setLoading(false);
        setError(true);
      }
    }

    loadStream();
    return () => { isMounted = false; };
  }, [youtubeId, initialVideoUrl]);

  // Handle Autoplay on mount once video stream is ready
  useEffect(() => {
    if (streamUrl && videoRef.current && isAutoPlay) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((err) => {
            console.log('Autoplay muted attempt:', err);
            if (videoRef.current) {
              videoRef.current.muted = true;
              setIsMuted(true);
              videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
            }
          });
      }
    }
  }, [streamUrl, isAutoPlay]);

  // Video Event Handlers
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || 0);
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const newMuteState = !isMuted;
    videoRef.current.muted = newMuteState;
    setIsMuted(newMuteState);
  };

  const handleVolumeChange = (e) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    if (videoRef.current) {
      videoRef.current.volume = newVol;
      videoRef.current.muted = newVol === 0;
      setIsMuted(newVol === 0);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-[9/16] max-h-[82vh] bg-black rounded-2xl overflow-hidden border border-white/20 shadow-2xl flex flex-col justify-between select-none group"
    >
      {/* Video Loading State */}
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 z-20 gap-3">
          <div className="w-10 h-10 border-2 border-white/10 border-t-emerald-400 rounded-full animate-spin"></div>
          <span className="text-xs font-mono tracking-wider text-zinc-400">Fetching direct video stream...</span>
        </div>
      )}

      {/* Video Error State */}
      {error && !loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 p-6 text-center z-20 gap-3">
          <i className="ri-error-warning-line text-3xl text-amber-400"></i>
          <p className="text-xs font-mono text-zinc-300">Unable to load direct stream. Please try again.</p>
        </div>
      )}

      {/* Direct HTML5 Video Element */}
      {streamUrl && (
        <video
          ref={videoRef}
          src={streamUrl}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
          onClick={togglePlay}
          playsInline
          className="w-full h-full object-cover cursor-pointer"
        />
      )}

      {/* Top Header Bar Overlay */}
      <div className={`absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent flex items-center justify-between z-10 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        <div>
          <h4 className="font-display font-medium text-white text-sm line-clamp-1">{title}</h4>
          {subtitle && <p className="text-[10px] font-mono text-zinc-300">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-full text-[9px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            DIRECT HD
          </span>
          {onClose && (
            <button 
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
            >
              <i className="ri-close-line text-base"></i>
            </button>
          )}
        </div>
      </div>

      {/* Big Center Play / Pause Icon Button Overlay */}
      {!loading && !error && (
        <div 
          onClick={togglePlay}
          className={`absolute inset-0 flex items-center justify-center pointer-events-auto cursor-pointer z-10 transition-opacity duration-300 ${!isPlaying || showControls ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="btn-liquid w-16 h-16 rounded-full flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-all duration-300">
            <i className={`ri-${isPlaying ? 'pause-fill' : 'play-fill'} text-2xl ${!isPlaying ? 'ml-1' : ''}`}></i>
          </div>
        </div>
      )}

      {/* Bottom Custom Controls Bar */}
      <div className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col gap-2 z-10 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        
        {/* Custom Progress / Scrub Bar */}
        <div className="relative w-full flex items-center group/scrubber">
          <input
            type="range"
            min="0"
            max={duration || 100}
            step="0.1"
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-emerald-400 focus:outline-none"
          />
        </div>

        {/* Control Buttons & Time */}
        <div className="flex items-center justify-between text-xs font-mono text-zinc-300 pt-1">
          <div className="flex items-center gap-3">
            <button 
              onClick={togglePlay}
              className="hover:text-white transition-colors"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              <i className={`ri-${isPlaying ? 'pause-fill' : 'play-fill'} text-lg`}></i>
            </button>

            <button 
              onClick={toggleMute}
              className="hover:text-white transition-colors flex items-center gap-1"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              <i className={`ri-${isMuted || volume === 0 ? 'volume-mute-fill text-amber-400' : 'volume-up-fill'} text-base`}></i>
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-16 h-1 bg-white/20 rounded appearance-none cursor-pointer accent-emerald-400 hidden sm:inline-block"
            />

            <span>
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleFullscreen}
              className="hover:text-white transition-colors"
              aria-label="Fullscreen"
            >
              <i className={`ri-${isFullscreen ? 'fullscreen-exit-line' : 'fullscreen-line'} text-base`}></i>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

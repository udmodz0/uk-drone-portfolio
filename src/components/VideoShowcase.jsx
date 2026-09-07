import React, { useState } from 'react';

export default function VideoShowcase() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const videos = [
    {
      id: 1,
      title: 'Cinematic Aerial Event Reel',
      location: 'Newcastle & Tyne River Aerials',
      duration: '01:45',
      quality: '4K HDR D-LOG',
      camera: 'DJI Air 3S Dual Camera',
      thumbnail: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=1200&auto=format&fit=crop',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-drone-view-of-a-coastal-city-and-ocean-41584-large.mp4',
      isPlaceholder: false,
      tag: 'FEATURED REEL'
    },
    {
      id: 2,
      title: 'Outdoor Celebration & Party Highlights',
      location: 'Durham & Surrounding Countryside',
      duration: '02:15',
      quality: '4K 60FPS',
      camera: 'DJI Air 3S + Ground Filming',
      thumbnail: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=1200&auto=format&fit=crop',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-and-buildings-41582-large.mp4',
      isPlaceholder: false,
      tag: 'EVENT SHOWCASE'
    },
    {
      id: 3,
      title: 'Your Video Slot #1 (Ready for Upload)',
      location: 'Newcastle NE3 / Custom Location',
      duration: 'Ready',
      quality: '4K Ready',
      camera: 'Upload your MP4 video file',
      thumbnail: '',
      videoUrl: '',
      isPlaceholder: true,
      tag: 'UPLOAD SLOT #1'
    },
    {
      id: 4,
      title: 'Your Video Slot #2 (Ready for Upload)',
      location: 'Sunderland & North East',
      duration: 'Ready',
      quality: '4K Ready',
      camera: 'Upload your MP4 video file',
      thumbnail: '',
      videoUrl: '',
      isPlaceholder: true,
      tag: 'UPLOAD SLOT #2'
    }
  ];

  return (
    <section id="videos" className="py-24 bg-gradient-to-b from-obsidian-950 via-obsidian-900 to-obsidian-950 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-10 w-[500px] h-[500px] bg-cyber-500/5 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-cyber-500/30 text-cyber-400 text-xs font-mono font-bold uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
            <i className="ri-film-line text-sm text-cyber-400"></i>
            CINEMATIC SHOWCASE REELS
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            Featured Aerial & <span className="bg-gradient-to-r from-cyber-400 via-sky-300 to-cyan-400 bg-clip-text text-transparent text-glow-cyan">Event Videography</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base leading-relaxed">
            Experience sample 4K cinema highlight reels filmed with our DJI Air 3S dual camera drone system across Newcastle, Sunderland, and Durham.
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videos.map((vid) => (
            <div
              key={vid.id}
              className={`glass-panel-cinematic rounded-3xl overflow-hidden border border-white/10 transition-all duration-500 shadow-2xl ${
                vid.isPlaceholder ? 'border-dashed border-white/20 bg-obsidian-900/40' : 'hover:border-gold-400/50'
              }`}
            >
              {vid.isPlaceholder ? (
                /* Upload Slot */
                <div className="p-10 flex flex-col items-center justify-center text-center min-h-[300px]">
                  <div className="w-16 h-16 rounded-2xl bg-obsidian-850 border border-white/15 flex items-center justify-center text-gold-400 mb-4 animate-bounce">
                    <i className="ri-upload-cloud-2-line text-3xl text-gold-400"></i>
                  </div>
                  <span className="px-3 py-1 rounded-md text-[10px] font-mono font-bold bg-gold-500/10 text-gold-400 border border-gold-500/30 mb-2">
                    {vid.tag}
                  </span>
                  <h3 className="font-display font-bold text-xl text-white">{vid.title}</h3>
                  <p className="text-slate-400 text-xs mt-2 max-w-sm leading-relaxed">
                    Place your video file into <code className="text-gold-400 font-mono">/public/videos/video-{vid.id}.mp4</code> to render your latest clip.
                  </p>
                  <div className="mt-4 text-[10px] text-slate-400 font-mono bg-obsidian-950 px-3 py-1.5 rounded-lg border border-white/10">
                    Supports 4K MP4 / MOV (16:9 Cinema or 9:16 Vertical)
                  </div>
                </div>
              ) : (
                /* Video Card */
                <div>
                  <div className="relative group aspect-video bg-obsidian-900 overflow-hidden cursor-pointer" onClick={() => setSelectedVideo(vid)}>
                    <img 
                      src={vid.thumbnail} 
                      alt={vid.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/40 to-transparent"></div>
                    
                    {/* Play Ring Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-gold-gradient p-0.5 shadow-[0_0_30px_rgba(245,158,11,0.5)] group-hover:scale-110 transition-transform duration-300">
                        <div className="w-full h-full rounded-full bg-obsidian-950/80 backdrop-blur-md flex items-center justify-center text-gold-400">
                          <i className="ri-play-fill text-2xl text-gold-400 ml-1"></i>
                        </div>
                      </div>
                    </div>

                    {/* Quality Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-3 py-1 rounded-md text-[10px] font-mono font-bold bg-obsidian-950/80 text-gold-400 border border-gold-500/40 backdrop-blur-md">
                        {vid.tag}
                      </span>
                      <span className="px-3 py-1 rounded-md text-[10px] font-mono font-bold bg-obsidian-950/80 text-cyber-300 border border-cyber-500/40 backdrop-blur-md">
                        {vid.quality}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-300 font-mono">
                      <span className="flex items-center gap-1.5 text-slate-200">
                        <i className="ri-map-pin-2-fill text-gold-400"></i>
                        {vid.location}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-obsidian-950/90 text-gold-300 border border-white/10">{vid.duration}</span>
                    </div>
                  </div>

                  <div className="p-6 flex items-center justify-between">
                    <div>
                      <h3 className="font-display font-bold text-lg text-white">{vid.title}</h3>
                      <p className="text-slate-400 text-xs mt-1 flex items-center gap-1.5 font-mono">
                        <i className="ri-shield-check-fill text-emerald-400"></i>
                        {vid.camera}
                      </p>
                    </div>

                    <button
                      onClick={() => setSelectedVideo(vid)}
                      className="btn-shimmer px-4 py-2.5 rounded-xl bg-obsidian-850 hover:bg-obsidian-800 border border-white/15 hover:border-gold-400 text-xs font-mono font-bold text-slate-200 flex items-center gap-2 transition-all shadow-lg"
                    >
                      <i className="ri-fullscreen-line text-gold-400"></i>
                      <span>Watch Cinema</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>

      {/* Video Modal Cinema Lightbox */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4">
          <div className="relative w-full max-w-5xl glass-panel-cinematic rounded-3xl overflow-hidden border border-white/15 shadow-[0_0_60px_rgba(0,0,0,0.9)] animate-in fade-in zoom-in-95 duration-300">
            
            <div className="flex items-center justify-between p-5 border-b border-white/10 bg-obsidian-950">
              <div>
                <h4 className="font-display font-bold text-white text-lg flex items-center gap-2">
                  <i className="ri-movie-2-line text-gold-400"></i>
                  {selectedVideo.title}
                </h4>
                <p className="text-slate-400 text-xs font-mono">{selectedVideo.location} • {selectedVideo.camera}</p>
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                className="w-10 h-10 rounded-full text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
              >
                <i className="ri-close-line text-2xl"></i>
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

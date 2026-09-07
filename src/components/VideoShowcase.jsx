import React, { useState } from 'react';
import { Play, Film, Upload, Sparkles, Video, X, Maximize2, ShieldCheck, MapPin } from 'lucide-react';

export default function VideoShowcase() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const videos = [
    {
      id: 1,
      title: 'Cinematic Aerial Event Reel',
      location: 'Newcastle & Tyne River Aerials',
      duration: '01:45',
      quality: '4K HDR',
      camera: 'DJI Air 3S Dual Camera',
      thumbnail: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=1200&auto=format&fit=crop',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-drone-view-of-a-coastal-city-and-ocean-41584-large.mp4',
      isPlaceholder: false,
      tag: 'Example Video #1'
    },
    {
      id: 2,
      title: 'Outdoor Celebration & Party Highlights',
      location: 'Durham & Surrounding Countryside',
      duration: '02:15',
      quality: '4K 60fps',
      camera: 'DJI Air 3S + Ground Filming',
      thumbnail: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?q=80&w=1200&auto=format&fit=crop',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-traffic-and-buildings-41582-large.mp4',
      isPlaceholder: false,
      tag: 'Example Video #2'
    },
    {
      id: 3,
      title: 'Your Video Slot #1 (Ready for Upload)',
      location: 'Newcastle NE3 / Custom Location',
      duration: 'Empty Slot',
      quality: 'Ready for Video',
      camera: 'Upload your MP4 video here',
      thumbnail: '',
      videoUrl: '',
      isPlaceholder: true,
      tag: 'Slot for Upload #1'
    },
    {
      id: 4,
      title: 'Your Video Slot #2 (Ready for Upload)',
      location: 'Sunderland & North East',
      duration: 'Empty Slot',
      quality: 'Ready for Video',
      camera: 'Upload your MP4 video here',
      thumbnail: '',
      videoUrl: '',
      isPlaceholder: true,
      tag: 'Slot for Upload #2'
    }
  ];

  return (
    <section id="videos" className="py-24 bg-obsidian-950 relative overflow-hidden">
      
      {/* Background Decorative Blur */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-skyline-500/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-skyline-500/10 border border-skyline-500/30 text-skyline-400 text-xs font-bold uppercase tracking-wider mb-4">
            <Film className="w-3.5 h-3.5" />
            Featured Showcases
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight">
            Cinematic Aerial & <span className="text-gold-400">Event Videography</span>
          </h2>
          <p className="mt-4 text-slate-300 text-base">
            Watch sample highlight edits captured with our 4K DJI Air 3S drone. Pre-configured slots are ready below for adding your latest video clips.
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videos.map((vid) => (
            <div
              key={vid.id}
              className={`glass-panel rounded-3xl overflow-hidden border border-slate-800 transition-all ${
                vid.isPlaceholder ? 'border-dashed border-slate-700 bg-obsidian-900/40' : 'hover:border-gold-500/40'
              }`}
            >
              {vid.isPlaceholder ? (
                /* Empty Upload Slot Styling */
                <div className="p-10 flex flex-col items-center justify-center text-center min-h-[300px]">
                  <div className="w-16 h-16 rounded-2xl bg-obsidian-850 border border-slate-700/80 flex items-center justify-center text-gold-400 mb-4 animate-bounce">
                    <Upload className="w-8 h-8" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30 mb-2">
                    {vid.tag}
                  </span>
                  <h3 className="font-display font-bold text-xl text-white">{vid.title}</h3>
                  <p className="text-slate-400 text-xs mt-2 max-w-sm">
                    Drop your video file into the project directory (e.g. <code className="text-gold-400">/public/videos/video-{vid.id}.mp4</code>) to display your latest clip here.
                  </p>
                  <div className="mt-4 text-[11px] text-slate-500 font-mono bg-obsidian-950 px-3 py-1.5 rounded-lg border border-slate-800">
                    Format: 4K MP4 / MOV (Horizontal or Vertical)
                  </div>
                </div>
              ) : (
                /* Video Card with Thumbnail & Controls */
                <div>
                  <div className="relative group aspect-video bg-obsidian-900 overflow-hidden cursor-pointer" onClick={() => setSelectedVideo(vid)}>
                    <img 
                      src={vid.thumbnail} 
                      alt={vid.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/40 to-transparent"></div>
                    
                    {/* Play Button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-gold-gradient p-0.5 shadow-2xl shadow-gold-500/30 group-hover:scale-110 transition-transform">
                        <div className="w-full h-full rounded-full bg-obsidian-950/80 backdrop-blur-sm flex items-center justify-center text-gold-400">
                          <Play className="w-7 h-7 fill-gold-400 ml-1" />
                        </div>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-obsidian-950/80 text-gold-400 border border-gold-500/40 backdrop-blur-md">
                        {vid.tag}
                      </span>
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-obsidian-950/80 text-skyline-400 border border-skyline-500/40 backdrop-blur-md">
                        {vid.quality}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-300 font-medium">
                      <span className="flex items-center gap-1.5 text-slate-200">
                        <MapPin className="w-3.5 h-3.5 text-gold-400" />
                        {vid.location}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-black/60 font-mono text-[11px]">{vid.duration}</span>
                    </div>
                  </div>

                  <div className="p-6 flex items-center justify-between">
                    <div>
                      <h3 className="font-display font-bold text-lg text-white">{vid.title}</h3>
                      <p className="text-slate-400 text-xs mt-1 flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        {vid.camera}
                      </p>
                    </div>

                    <button
                      onClick={() => setSelectedVideo(vid)}
                      className="px-4 py-2 rounded-xl bg-obsidian-850 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 flex items-center gap-1.5 transition-colors"
                    >
                      <Maximize2 className="w-3.5 h-3.5 text-gold-400" />
                      Watch Full
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>

      {/* Video Modal Lightbox */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl glass-panel rounded-3xl overflow-hidden border border-slate-800">
            
            <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-obsidian-950">
              <div>
                <h4 className="font-display font-bold text-white text-base">{selectedVideo.title}</h4>
                <p className="text-slate-400 text-xs">{selectedVideo.location} • {selectedVideo.camera}</p>
              </div>
              <button
                onClick={() => setSelectedVideo(null)}
                className="p-2 rounded-full text-slate-400 hover:text-white bg-slate-800/80"
              >
                <X className="w-5 h-5" />
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

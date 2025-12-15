import { useState, useEffect, useRef } from "react";
// 1. FIXED IMPORT LINE BELOW (Removed 'XY')
import { X, Volume2, Play, Pause, VolumeX } from "lucide-react";

const WelcomeVideoModal = () => {
  const [hasEntered, setHasEntered] = useState(false);
  const [isClosed, setIsClosed] = useState(false);
  
  // Player State
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const playerRef = useRef(null);
  const intervalRef = useRef(null);

  // 1. Load YouTube API
  useEffect(() => {
    if (isClosed || !hasEntered) return;

    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    window.onYouTubeIframeAPIReady = initializePlayer;

    if (window.YT && window.YT.Player) {
      initializePlayer();
    }

    return () => {
      clearInterval(intervalRef.current);
      window.onYouTubeIframeAPIReady = null; 
    };
  }, [hasEntered, isClosed]);

  const initializePlayer = () => {
    playerRef.current = new window.YT.Player('youtube-player', {
      videoId: 'xjO_jztqsOY',
      playerVars: {
        autoplay: 1,
        modestbranding: 1,
        controls: 0, 
        rel: 0,
        showinfo: 0,
        fs: 0, 
      },
      events: {
        onReady: (event) => {
          event.target.unMute();
          event.target.setVolume(100);
          setDuration(event.target.getDuration());
          startProgressTimer();
        },
        onStateChange: (event) => {
          setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
        }
      }
    });
  };

  const startProgressTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (playerRef.current && playerRef.current.getCurrentTime) {
        const time = playerRef.current.getCurrentTime();
        setCurrentTime(time);
        
        const dur = playerRef.current.getDuration();
        if (dur > 0) setDuration(dur);
      }
    }, 500); 
  };

  const togglePlay = () => {
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (isMuted) {
      playerRef.current.unMute();
    } else {
      playerRef.current.mute();
    }
    setIsMuted(!isMuted);
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime); 
    playerRef.current.seekTo(newTime, true); 
  };

  const formatTime = (seconds) => {
    if (!seconds) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (isClosed) return null;

  return (
    <div className="fixed inset-0 z-[9999] w-full h-full bg-black/95 flex flex-col items-center justify-center">
      
      {!hasEntered ? (
        /* --- SCREEN 1: ENTRY (Required for Sound) --- */
        <div className="text-center px-4 animate-in fade-in zoom-in duration-500 flex flex-col items-center">
          
          {/* LOGO */}
          <img 
            src="/whitecedrf.png" 
            alt="CEDRF Logo" 
            className="w-24 h-24 md:w-32 md:h-32  shadow-[0_0_30px_rgba(255,109,0,0.3)]"
          />

          <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Welcome to <span className="text-orange-custom">CEDRF</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Experience our vision for comprehensive educational development.
          </p>
          
          <button 
            onClick={() => setHasEntered(true)}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-orange-custom text-white text-xl font-bold rounded-full transition-all hover:bg-orange-600 hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,109,0,0.6)]"
          >
            <Volume2 className="w-6 h-6 animate-pulse" />
            <span>Enter Site</span>
          </button>
        </div>
      ) : (
        /* --- SCREEN 2: VIDEO WITH CUSTOM CONTROLS --- */
        <div className="relative w-full h-full flex items-center justify-center bg-black animate-in fade-in duration-1000">
          
          {/* Close Button */}
          <button 
            onClick={() => setIsClosed(true)}
            className="absolute top-6 right-6 z-50 flex items-center gap-2 bg-black/50 hover:bg-orange-custom text-white px-4 py-2 rounded-full backdrop-blur-md border border-white/20 transition-all duration-300 group"
          >
            <span className="font-medium hidden md:inline">Skip Video</span>
            <X size={20} className="group-hover:rotate-90 transition-transform" />
          </button>

          {/* Video Container */}
          <div className="relative w-full max-w-6xl aspect-video shadow-2xl overflow-hidden md:rounded-xl bg-black border border-white/10">
             <div id="youtube-player" className="w-full h-full"></div>

             {/* --- Custom Control Bar --- */}
             <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 md:p-6 flex flex-col gap-2 transition-opacity duration-300 hover:opacity-100 opacity-100">
                
                {/* 1. Seek Bar (Scrubber) */}
                <div className="group relative w-full h-1.5 md:h-2 bg-white/20 rounded-full cursor-pointer hover:h-2.5 transition-all duration-200">
                  <input
                    type="range"
                    min="0"
                    max={duration}
                    value={currentTime}
                    onChange={handleSeek}
                    className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer"
                  />
                  <div 
                    className="absolute top-0 left-0 h-full bg-orange-custom rounded-full transition-all duration-100 ease-linear"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  ></div>
                  <div 
                    className="absolute top-1/2 -mt-2 h-4 w-4 bg-white rounded-full shadow-lg transform -translate-x-1/2 transition-transform duration-100"
                    style={{ left: `${(currentTime / duration) * 100}%` }}
                  ></div>
                </div>

                {/* 2. Controls Row */}
                <div className="flex items-center justify-between text-white mt-2">
                  <div className="flex items-center gap-4 md:gap-6">
                    <button onClick={togglePlay} className="hover:text-orange-custom transition-colors transform active:scale-95">
                      {isPlaying ? <Pause size={24} className="md:w-8 md:h-8" fill="currentColor" /> : <Play size={24} className="md:w-8 md:h-8" fill="currentColor" />}
                    </button>
                    
                    <div className="flex items-center gap-2 group/volume">
                      <button onClick={toggleMute} className="hover:text-orange-custom transition-colors">
                        {isMuted ? <VolumeX size={20} className="md:w-6 md:h-6" /> : <Volume2 size={20} className="md:w-6 md:h-6" />}
                      </button>
                    </div>

                    <span className="text-xs md:text-sm font-medium font-mono text-gray-300 select-none">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                     <div className="hidden md:block text-[10px] md:text-xs text-orange-custom font-bold tracking-[0.2em] border border-orange-custom/30 px-2 py-1 rounded">
                      CEDRF MEDIA
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WelcomeVideoModal;
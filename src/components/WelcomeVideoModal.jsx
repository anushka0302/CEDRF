import { useState } from "react";
import { X, Volume2 } from "lucide-react"; // Using lucide-react which is already in your package.json

const WelcomeVideoModal = () => {
  // State to track if the user has clicked "Enter"
  const [hasEntered, setHasEntered] = useState(false);
  // State to close the modal completely
  const [isClosed, setIsClosed] = useState(false);

  // If the user has closed the modal, render nothing
  if (isClosed) return null;

  return (
    <div className="fixed inset-0 z-[9999] w-full h-full bg-black flex flex-col items-center justify-center">
      
      {!hasEntered ? (
        /* SCREEN 1: "CLICK TO ENTER" (Required to unlock Audio) */
        <div className="text-center px-4 animate-in fade-in zoom-in duration-500">
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
            <span>Enter Site with Sound</span>
          </button>
        </div>
      ) : (
        /* SCREEN 2: THE VIDEO (Plays immediately with sound) */
        <div className="relative w-full h-full bg-black animate-in fade-in duration-1000">
          {/* Skip Button */}
          <button 
            onClick={() => setIsClosed(true)}
            className="absolute top-6 right-6 z-50 flex items-center gap-2 bg-black/50 hover:bg-orange-custom text-white px-4 py-2 rounded-full backdrop-blur-md border border-white/20 transition-all duration-300 group"
          >
            <span className="font-medium">Skip Video</span>
            <X size={20} className="group-hover:rotate-90 transition-transform" />
          </button>

          {/* YouTube Parameters Explained:
            autoplay=1      -> Starts video immediately
            rel=0           -> Shows related videos from YOUR channel only
            modestbranding=1-> Hides YouTube logo
            controls=0      -> Hides bottom player bar (cleaner look)
          */}
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/xjO_jztqsOY?autoplay=1&modestbranding=1&rel=0&controls=0"
            title="CEDRF Welcome Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default WelcomeVideoModal;

import React, { useRef, useEffect } from 'react';
import { Camera, RefreshCcw } from 'lucide-react';

interface Props {
  onCapture: (video: HTMLVideoElement) => void;
  isCapturing: boolean;
}

const RetroCamera: React.FC<Props> = ({ onCapture, isCapturing }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { width: 640, height: 640, facingMode: 'user' } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Camera access denied", err);
      }
    }
    setupCamera();
  }, []);

  return (
    <div className="relative w-80 h-72 z-50 group">
      {/* Camera Body */}
      <div className="absolute inset-0 bg-stone-800 rounded-3xl shadow-2xl border-4 border-stone-700 overflow-hidden">
        {/* Top Accent Strip */}
        <div className="h-10 bg-red-800 flex items-center px-4 justify-between border-b-4 border-stone-700">
            <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-green-500 shadow-sm" />
                <div className="w-2 h-2 rounded-full bg-red-500 shadow-sm" />
                <div className="w-2 h-2 rounded-full bg-yellow-500 shadow-sm" />
            </div>
            <span className="text-[10px] text-stone-400 font-bold uppercase tracking-tighter">Festive-Matic 3000</span>
        </div>

        {/* Viewfinder Lens */}
        <div className="mt-8 flex justify-center">
            <div className="relative w-40 h-40 rounded-full bg-stone-900 border-8 border-stone-700 shadow-inner flex items-center justify-center overflow-hidden">
                <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    muted 
                    className="w-full h-full object-cover"
                />
                {/* Lens Flare Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />
                <div className="absolute inset-0 rounded-full border-[10px] border-black/20 pointer-events-none" />
            </div>
        </div>

        {/* Shutter Button Container */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-12">
             {/* Flash Indicator */}
             <div className="w-8 h-8 rounded-lg bg-stone-700 flex items-center justify-center">
                <div className={`w-3 h-3 rounded-full ${isCapturing ? 'bg-yellow-400 shadow-[0_0_10px_#facc15]' : 'bg-stone-600'}`} />
             </div>

             {/* Capture Button */}
             <button
                onClick={() => videoRef.current && onCapture(videoRef.current)}
                disabled={isCapturing}
                className={`
                    w-16 h-16 rounded-full border-4 border-stone-600 shadow-xl flex items-center justify-center
                    transition-all active:scale-95 disabled:opacity-50
                    ${isCapturing ? 'bg-red-700' : 'bg-red-600 hover:bg-red-500'}
                `}
             >
                <div className="w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center">
                    <Camera className="text-white w-6 h-6" />
                </div>
             </button>

             {/* Settings Indicator */}
             <div className="w-8 h-8 rounded-lg bg-stone-700 flex items-center justify-center">
                <RefreshCcw className="text-stone-500 w-4 h-4 animate-spin-slow" />
             </div>
        </div>
      </div>

      {/* Camera Slot (Behind the body) */}
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-48 h-6 bg-stone-900 rounded-t-lg z-[-1] border-x-4 border-t-4 border-stone-700 shadow-inner" />
      
      {/* Christmas Decorations on Camera */}
      <div className="absolute -left-4 top-10 rotate-[-20deg] pointer-events-none">
        <span className="text-4xl">🎄</span>
      </div>
      <div className="absolute -right-4 top-4 rotate-[15deg] pointer-events-none">
        <span className="text-4xl">🎀</span>
      </div>
      
      <style>{`
        @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
            animation: spin-slow 10s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default RetroCamera;

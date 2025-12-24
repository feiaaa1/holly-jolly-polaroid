
import React, { useState, useCallback, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Snowfall from './components/Snowfall';
import RetroCamera from './components/RetroCamera';
import PolaroidPhoto from './components/PolaroidPhoto';
import { PolaroidPhoto as IPhoto } from './types';
import { Music, TreeDeciduous, Star, Bell } from 'lucide-react';

// 本地随机标题生成函数
const getRandomCaption = (): string => {
  const captions = [
    "Jolly Times",
    "Winter Magic",
    "Season's Greetings",
    "Warm & Cozy",
    "Pure Joy",
    "Merry & Bright",
    "Cozy Cocoa Vibes",
    "Under the Mistletoe",
    "Holly Jolly",
    "Festive Cheer",
    "Snow Day Fun",
    "Christmas Spirit"
  ];
  return captions[Math.floor(Math.random() * captions.length)];
};

const App: React.FC = () => {
  const [photos, setPhotos] = useState<IPhoto[]>([]);
  const [isCapturing, setIsCapturing] = useState(false);
  const wallRef = useRef<HTMLDivElement>(null);

  const handleCapture = useCallback(async (video: HTMLVideoElement) => {
    if (isCapturing) return;
    setIsCapturing(true);

    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 640;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Capture the current frame
    ctx.drawImage(video, 0, 0, 640, 640);
    const imageData = canvas.toDataURL('image/jpeg', 0.8);

    // Get a festive caption (local random selection)
    const caption = getRandomCaption();

    const newPhoto: IPhoto = {
      id: uuidv4(),
      imageData,
      caption,
      timestamp: Date.now(),
      rotation: (Math.random() - 0.5) * 20, // Random tilt
      x: 100, // Initial position above camera
      y: window.innerHeight - 550, // Initial height relative to camera slot
      isDeveloping: true,
    };

    setPhotos(prev => [...prev, newPhoto]);
    
    // Reset capture state after ejection starts
    setTimeout(() => setIsCapturing(false), 1000);
  }, [isCapturing]);

  const handleDragEnd = (id: string, x: number, y: number) => {
    setPhotos(prev => prev.map(p => p.id === id ? { ...p, x, y } : p));
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden flex flex-col items-center justify-center">
      <Snowfall />

      {/* Background Decorations */}
      <div className="absolute top-0 left-0 right-0 h-32 flex justify-between px-12 pointer-events-none opacity-40">
        <TreeDeciduous className="text-green-800 w-32 h-32 -translate-y-4" />
        <Star className="text-yellow-600 w-16 h-16 animate-pulse" />
        <TreeDeciduous className="text-green-800 w-32 h-32 -translate-y-4" />
      </div>

      <div className="absolute top-12 text-center z-10 pointer-events-none">
        <h1 className="festive-title text-6xl text-red-600 drop-shadow-[0_2px_10px_rgba(255,255,255,0.8)]">
          Holly Jolly Moments
        </h1>
        <p className="handwriting text-2xl text-white mt-2 opacity-80">
          Capture the magic of Christmas
        </p>
      </div>

      {/* Photo Wall / Work Area */}
      <div ref={wallRef} className="absolute inset-0 z-10">
        {photos.map(photo => (
          <PolaroidPhoto 
            key={photo.id} 
            photo={photo} 
            onDragEnd={handleDragEnd} 
          />
        ))}
      </div>

      {/* Decorative Garlands */}
      <div className="fixed top-0 w-full flex justify-around pointer-events-none z-0">
          {[...Array(8)].map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                  <div className="h-4 w-1 bg-green-900" />
                  <Bell className={`w-8 h-8 ${i % 2 === 0 ? 'text-red-700' : 'text-gold-500'} -mt-1`} style={{color: i % 2 === 0 ? '#b91c1c' : '#fbbf24'}} />
              </div>
          ))}
      </div>

      {/* Retro Camera UI */}
      <div className="fixed bottom-8 left-8 z-50">
        <RetroCamera onCapture={handleCapture} isCapturing={isCapturing} />
      </div>

      {/* Floating Instructions */}
      <div className="fixed bottom-8 right-8 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-white z-50">
        <h3 className="font-bold mb-2 flex items-center gap-2">
            <Music className="w-4 h-4" /> Photographer's Tip
        </h3>
        <ul className="text-xs space-y-1 opacity-80 list-disc list-inside">
            <li>Smile for the Festive-Matic lens!</li>
            <li>Click the red button to shoot.</li>
            <li>Photos develop slowly, just like real film.</li>
            <li>Drag photos to build your holiday wall.</li>
        </ul>
      </div>

      <style>{`
        @keyframes snow {
            from { transform: translateY(-10px); }
            to { transform: translateY(110vh); }
        }
      `}</style>
    </div>
  );
};

export default App;


import React, { useEffect, useState } from 'react';

const Snowfall: React.FC = () => {
  const [flakes, setFlakes] = useState<{ id: number; left: string; delay: string; duration: string; size: string }[]>([]);

  useEffect(() => {
    const newFlakes = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${5 + Math.random() * 10}s`,
      size: `${2 + Math.random() * 4}px`,
    }));
    setFlakes(newFlakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {flakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute bg-white rounded-full opacity-60 animate-snow"
          style={{
            left: flake.left,
            top: '-10px',
            width: flake.size,
            height: flake.size,
            animation: `snowfall ${flake.duration} linear ${flake.delay} infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes snowfall {
          0% { transform: translateY(-10px) rotate(0deg); }
          100% { transform: translateY(100vh) rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Snowfall;

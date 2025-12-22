
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PolaroidPhoto as IPhoto } from '../types';

interface Props {
  photo: IPhoto;
  onDragEnd: (id: string, x: number, y: number) => void;
}

const PolaroidPhoto: React.FC<Props> = ({ photo, onDragEnd }) => {
  const [isDeveloped, setIsDeveloped] = useState(!photo.isDeveloping);

  useEffect(() => {
    if (photo.isDeveloping) {
      const timer = setTimeout(() => setIsDeveloped(true), 4000);
      return () => clearTimeout(timer);
    }
  }, [photo.isDeveloping]);

  return (
    <motion.div
      drag
      dragMomentum={false}
      initial={{ 
        y: photo.y + 100, 
        x: photo.x, 
        scale: 0.8, 
        opacity: 0,
        rotate: 0 
      }}
      animate={{ 
        y: photo.y, 
        x: photo.x, 
        scale: 1, 
        opacity: 1,
        rotate: photo.rotation 
      }}
      onDragEnd={(_, info) => onDragEnd(photo.id, photo.x + info.offset.x, photo.y + info.offset.y)}
      className="absolute p-4 pb-12 bg-white shadow-2xl cursor-grab active:cursor-grabbing border border-gray-100 z-10"
      style={{ width: '240px' }}
    >
      <div className="relative overflow-hidden bg-gray-200 aspect-square">
        <motion.img
          src={photo.imageData}
          alt="Captured moment"
          className="w-full h-full object-cover"
          initial={photo.isDeveloping ? { filter: 'blur(12px) brightness(1.8) grayscale(0.8) sepia(0.3)' } : {}}
          animate={isDeveloped ? { filter: 'blur(0px) brightness(1) grayscale(0) sepia(0)' } : {}}
          transition={{ duration: 4 }}
        />
        {!isDeveloped && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-gray-400 font-bold text-xs uppercase tracking-widest animate-pulse">Developing...</span>
          </div>
        )}
      </div>
      <div className="mt-4 text-center">
        <p className="handwriting text-2xl text-gray-700 select-none">
          {photo.caption || "Merry Christmas"}
        </p>
        <p className="text-[10px] text-gray-400 mt-2 font-mono">
          {new Date(photo.timestamp).toLocaleDateString()}
        </p>
      </div>
      
      {/* Tape piece decoration */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-red-400/30 rotate-2 backdrop-blur-sm border border-red-200/50" />
    </motion.div>
  );
};

export default PolaroidPhoto;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GREEK_GOD_HERO, GREEK_GOD_POSE } from '../assets/greekGodImages';

export function GreekGodHeroVisual() {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="relative w-full max-w-lg aspect-square flex items-center justify-center"
    >
      {/* Outer Golden Halo Ring Glow Effect */}
      <div className="absolute inset-4 rounded-full border-4 border-black shadow-[8px_8px_0_#000] pointer-events-none" />

      {!imgError ? (
        <div className="relative w-full h-full rounded-2xl overflow-hidden border-4 border-black shadow-[8px_8px_0_#000] bg-zinc-950 flex items-center justify-center group">
          <img
            src={GREEK_GOD_HERO}
            alt="Ironise Hero Visual"
            onError={() => setImgError(true)}
            className="w-full h-full object-contain p-2 relative z-10 transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 z-15 pointer-events-none" />
        </div>
      ) : (
        /* Vector Fallback */
        <svg
          viewBox="0 0 500 500"
          className="w-full h-full relative z-10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="250" cy="250" r="195" stroke="#000" strokeWidth="4" fill="#FFD600" />
        </svg>
      )}

      {/* Bottom Tag */}
      <div className="absolute bottom-4 z-20 px-4 py-1.5 bg-[#FFD600] border-2 border-black text-[11px] font-mono font-black tracking-widest text-black uppercase shadow-[3px_3px_0_#000] flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-black animate-ping" />
        ATHLETE ARCHETYPE • OLYMPUS ENGINE
      </div>
    </motion.div>
  );
}

export function GreekGodPoseVisual() {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.03, rotate: 0.5 }}
      transition={{ type: 'spring', stiffness: 220, damping: 18 }}
      className="relative w-full max-w-md aspect-square rounded-2xl overflow-hidden border-4 border-black shadow-[8px_8px_0_#000] bg-white group cursor-pointer"
    >
      {!imgError ? (
        <img
          src={GREEK_GOD_POSE}
          alt="Dragon Ball Z AI Pose Estimation Visual"
          onError={() => setImgError(true)}
          className="w-full h-full object-cover object-[12%_10%] scale-105 transition-transform duration-500 group-hover:scale-110 relative z-10"
        />
      ) : (
        /* Vector Fallback */
        <svg viewBox="0 0 400 400" className="w-full h-full bg-white" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="200" cy="200" r="140" stroke="#000" strokeWidth="2" strokeDasharray="4 4" />
          <circle cx="200" cy="100" r="8" fill="#FFD600" stroke="#000" strokeWidth="2" />
          <text x="140" y="80" fill="#000" fontSize="12" fontFamily="monospace" fontWeight="bold">JOINT ANGLE: 115°</text>
        </svg>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-75 pointer-events-none z-15" />
      <div className="absolute bottom-4 left-4 right-4 z-20 p-3 bg-white border-2 border-black flex items-center justify-between text-xs font-mono text-black font-black shadow-[3px_3px_0_#000]">
        <span>AI MODEL: BLAZEPOSE v3.1</span>
        <span className="px-2 py-0.5 bg-[#FFD600] text-black font-extrabold text-[10px] border border-black">
          100% OFFLINE POSE
        </span>
      </div>
    </motion.div>
  );
}

export default GreekGodHeroVisual;

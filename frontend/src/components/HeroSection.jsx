import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Activity, ShieldCheck, Star, Flame, Play, CheckCircle2, Lock, Award, Target } from 'lucide-react';

/* ---------- Video Clips & Pose Tracking Math ---------- */
const PERIOD = 2800; // ms per rep cycle

function buildPushUpPose(d) {
  const floor = 420;
  const feet = { x: 110, y: floor - 20 };
  const knee = { x: 175, y: floor - 47 + d * 18 };
  const hip = { x: 240, y: floor - 75 + d * 35 };
  const shoulder = { x: 370, y: floor - 85 + d * 65 };
  const head = { x: shoulder.x + 40, y: shoulder.y - 12 };
  const wrist = { x: shoulder.x + 10, y: floor };
  const elbowX = shoulder.x - 28 + d * 22;
  const elbowY = shoulder.y + 36;
  const elbow = { x: elbowX, y: elbowY };
  const elbowAngle = Math.max(90, Math.round(172 - d * 82));
  return {
    bones: [
      ['head', 'shoulder'], ['shoulder', 'hip'], ['hip', 'knee'], ['knee', 'feet'], ['shoulder', 'elbow'], ['elbow', 'wrist']
    ],
    points: { head, shoulder, hip, knee, feet, elbow, wrist },
    angle: elbowAngle,
    angleLabel: 'ELBOW ANGLE',
    targetY: floor - 20,
    targetLabel: 'CHEST DEPTH TARGET',
    deep: d > 0.82,
    coachingText: d > 0.82 ? '✓ CHEST TO FLOOR • REP COUNTED' : d > 0.15 ? 'DESCENDING... HOLD FORM' : 'PUSH UP TO EXTENSION'
  };
}

function buildBicepCurlPose(d) {
  const head = { x: 250, y: 110 };
  const shoulderR = { x: 285, y: 180 };
  const shoulderL = { x: 215, y: 180 };
  const hipR = { x: 275, y: 310 };
  const hipL = { x: 225, y: 310 };
  const kneeR = { x: 275, y: 420 };
  const kneeL = { x: 225, y: 420 };
  const feetR = { x: 275, y: 510 };
  const feetL = { x: 225, y: 510 };

  const elbowL = { x: 205, y: 260 };
  const wristL = { x: 200, y: 340 };

  const elbowR = { x: 295, y: 265 };
  const wristR = {
    x: 295 - d * 35,
    y: 350 - d * 155
  };

  const curlAngle = Math.max(38, Math.round(170 - d * 132));

  return {
    bones: [
      ['head', 'shoulderR'], ['head', 'shoulderL'],
      ['shoulderR', 'shoulderL'],
      ['shoulderR', 'hipR'], ['shoulderL', 'hipL'], ['hipR', 'hipL'],
      ['hipR', 'kneeR'], ['hipL', 'kneeL'],
      ['kneeR', 'feetR'], ['kneeL', 'feetL'],
      ['shoulderL', 'elbowL'], ['elbowL', 'wristL'],
      ['shoulderR', 'elbowR'], ['elbowR', 'wristR']
    ],
    points: {
      head, shoulderR, shoulderL, hipR, hipL, kneeR, kneeL, feetR, feetL, elbowL, wristL, elbowR, wristR
    },
    angle: curlAngle,
    angleLabel: 'BICEP ANGLE',
    targetY: 190,
    targetLabel: 'PEAK CONTRACTION TARGET',
    deep: d > 0.85,
    coachingText: d > 0.85 ? '✓ PEAK BICEP SQUEEZE • REP COUNTED' : d > 0.15 ? 'CURLING DUMBBELL UP...' : 'EXTEND ARM FULLY DOWN'
  };
}

function buildSkippingPose(d) {
  const jumpY = -Math.abs(Math.sin(d * Math.PI * 2)) * 36;
  const ropePhase = Math.sin(d * Math.PI * 4);
  
  const head = { x: 250, y: 110 + jumpY };
  const shoulderR = { x: 285, y: 175 + jumpY };
  const shoulderL = { x: 215, y: 175 + jumpY };
  const hipR = { x: 270, y: 295 + jumpY };
  const hipL = { x: 230, y: 295 + jumpY };
  const kneeR = { x: 272, y: 395 + jumpY * 0.7 };
  const kneeL = { x: 228, y: 395 + jumpY * 0.7 };
  const feetR = { x: 268, y: 485 + jumpY };
  const feetL = { x: 232, y: 485 + jumpY };

  const elbowR = { x: 310, y: 245 + jumpY };
  const elbowL = { x: 190, y: 245 + jumpY };
  const wristR = { x: 325, y: 280 + ropePhase * 10 + jumpY };
  const wristL = { x: 175, y: 280 + ropePhase * 10 + jumpY };

  return {
    bones: [
      ['head', 'shoulderR'], ['head', 'shoulderL'],
      ['shoulderR', 'shoulderL'],
      ['shoulderR', 'hipR'], ['shoulderL', 'hipL'], ['hipR', 'hipL'],
      ['hipR', 'kneeR'], ['hipL', 'kneeL'],
      ['kneeR', 'feetR'], ['kneeL', 'feetL'],
      ['shoulderL', 'elbowL'], ['elbowL', 'wristL'],
      ['shoulderR', 'elbowR'], ['elbowR', 'wristR']
    ],
    points: {
      head, shoulderR, shoulderL, hipR, hipL, kneeR, kneeL, feetR, feetL, elbowL, wristL, elbowR, wristR
    },
    angle: Math.round(95 + Math.abs(jumpY)),
    angleLabel: 'BOUNCE HEIGHT',
    targetY: 460,
    targetLabel: 'GROUND CLEARANCE',
    deep: Math.abs(jumpY) > 20,
    coachingText: Math.abs(jumpY) > 20 ? '✓ HIGH JUMP CLEARANCE • REP COUNTED' : 'RHYTHMIC BOUNCE • KEEP CADENCE',
    isSkipping: true,
    ropeY: 510 + ropePhase * 25
  };
}

const EXERCISES = [
  { id: 'pushups', name: 'PUSH-UPS', clip: '/clips/push-ups.mp4', builder: buildPushUpPose },
  { id: 'bicep', name: 'BICEP CURL', clip: '/clips/db_arm.mp4', builder: buildBicepCurlPose },
  { id: 'skipping', name: 'JUMP ROPE', clip: '/clips/skipping.mp4', builder: buildSkippingPose }
];

/* ---------- Interactive Video Pose-Tracking Component ---------- */
function VideoPoseTrackingCard() {
  const [exerciseIdx, setExerciseIdx] = useState(0);
  const [d, setD] = useState(0);
  const [rep, setRep] = useState(14);
  const [xpKey, setXpKey] = useState(0);
  const videoRef = useRef(null);
  const lastCycle = useRef(0);

  const activeExercise = EXERCISES[exerciseIdx];

  useEffect(() => {
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = now - start;
      const depth = (1 - Math.cos((2 * Math.PI * t) / PERIOD)) / 2;
      setD(depth);

      const cycle = Math.floor(t / PERIOD);
      if (cycle !== lastCycle.current) {
        lastCycle.current = cycle;
        setRep((r) => (r >= 30 ? 1 : r + 1));
        setXpKey((k) => k + 1);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const pose = activeExercise.builder(d);
  const form = Math.round(96 + 3 * Math.sin(d * Math.PI));

  return (
    <div className="relative w-full h-full bg-black rounded-3xl overflow-hidden">
      
      {/* HTML5 Video element loading real exercise clip from public/clips/ */}
      <video
        ref={videoRef}
        key={activeExercise.clip}
        src={activeExercise.clip}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-85 pointer-events-none"
      />

      {/* Dark overlay for pose neon contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/60 pointer-events-none" />

      {/* Laser Scan Grid Texture */}
      <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#00FF66 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      {/* Exercise Video Switcher Tabs Header */}
      <div className="absolute top-4 left-4 z-30 flex items-center gap-1.5 p-1 bg-black/80 backdrop-blur-md border border-zinc-700 rounded-full">
        {EXERCISES.map((ex, idx) => (
          <button
            key={ex.id}
            onClick={() => setExerciseIdx(idx)}
            className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold transition-all cursor-pointer ${
              exerciseIdx === idx
                ? 'bg-[#00FF66] text-black shadow-[2px_2px_0_#000]'
                : 'text-zinc-300 hover:text-white'
            }`}
          >
            {ex.name}
          </button>
        ))}
      </div>

      {/* SVG Pose Tracking Skeleton Overlaid Directly on Video Body Motion */}
      <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none" viewBox="0 0 500 625">
        {/* Frame Brackets */}
        <path d="M 50,45 L 50,25 L 75,25 M 425,25 L 450,25 L 450,45 M 50,580 L 50,600 L 75,600 M 425,600 L 450,600 L 450,580" fill="none" stroke="#00FF66" strokeWidth="3" />

        {/* Target Threshold Line */}
        <line x1="60" y1={pose.targetY} x2="440" y2={pose.targetY} stroke={pose.deep ? '#00FF66' : '#FFD600'} strokeOpacity="0.6" strokeWidth="1.5" strokeDasharray="3 5" />
        <text x="430" y={pose.targetY - 8} textAnchor="end" fontSize="11" fontFamily="monospace" fill={pose.deep ? '#00FF66' : '#FFD600'}>
          {pose.targetLabel}
        </text>

        {/* Skipping rope curve animation if skipping */}
        {pose.isSkipping && (
          <path
            d={`M 175,280 Q 250,${pose.ropeY} 325,280`}
            fill="none"
            stroke="#FFD600"
            strokeWidth="3"
            strokeDasharray="4 2"
          />
        )}

        {/* Skeleton Stick Lines Aligned to Athlete Body */}
        {pose.bones.map(([a, b]) => (
          <line
            key={a + b}
            x1={pose.points[a].x}
            y1={pose.points[a].y}
            x2={pose.points[b].x}
            y2={pose.points[b].y}
            stroke={pose.deep ? '#00FF66' : '#00E05A'}
            strokeWidth={5}
            strokeLinecap="round"
          />
        ))}

        {/* Joint Angle Tag */}
        {pose.points.elbowR || pose.points.elbow ? (
          <g transform={`translate(${(pose.points.elbowR || pose.points.elbow).x - 38} ${(pose.points.elbowR || pose.points.elbow).y - 28})`}>
            <rect x="0" y="0" width="56" height="22" rx="6" fill="#000" stroke={pose.deep ? '#00FF66' : '#FFD600'} strokeWidth="2" />
            <text x="28" y="15" textAnchor="middle" fontSize="13" fontWeight="800" fontFamily="monospace" fill={pose.deep ? '#00FF66' : '#FFD600'}>
              {pose.angle}°
            </text>
          </g>
        ) : null}

        {/* Joint Keypoint Circles Aligned to Athlete Body */}
        {Object.keys(pose.points).map((j) => (
          <circle
            key={j}
            cx={pose.points[j].x}
            cy={pose.points[j].y}
            r={j.startsWith('head') ? 9 : 7}
            fill={pose.deep ? '#00FF66' : '#FFD600'}
            stroke="#000"
            strokeWidth="2"
          />
        ))}

        {/* Depth trigger pulse ring */}
        {pose.deep && (pose.points.elbowR || pose.points.elbow) && (
          <circle cx={(pose.points.elbowR || pose.points.elbow).x} cy={(pose.points.elbowR || pose.points.elbow).y} r="16" fill="none" stroke="#00FF66" strokeWidth="2" opacity="0.8" />
        )}
      </svg>

      {/* Top Right Stats HUD */}
      <div className="absolute top-16 right-4 z-20 bg-black/85 backdrop-blur-md border-2 border-black p-3 rounded-2xl shadow-[4px_4px_0_#000] text-left space-y-2 min-w-[125px]">
        <div>
          <div className="text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-widest">REP COUNT</div>
          <div className="text-2xl font-[Anton] text-white">
            {rep} <span className="text-xs font-mono text-zinc-500 font-normal">REPS</span>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-[9px] font-mono font-bold text-zinc-400 uppercase">
            <span>FORM</span>
            <span className="text-[#00FF66]">{form}%</span>
          </div>
          <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-1 overflow-hidden">
            <div className="bg-[#00FF66] h-full transition-[width] duration-150" style={{ width: `${form}%` }} />
          </div>
        </div>

        {/* +XP Notification */}
        <AnimatePresence>
          {xpKey > 0 && (
            <motion.div
              key={xpKey}
              initial={{ opacity: 0, y: 6, scale: 0.8 }}
              animate={{ opacity: [0, 1, 1, 0], y: [6, -4, -12, -22], scale: [0.8, 1.1, 1, 1] }}
              transition={{ duration: 1.4 }}
              className="flex items-center gap-1.5 text-xs font-mono font-black text-[#FFD600]"
            >
              <Star className="w-3.5 h-3.5 fill-[#FFD600]" /> +25 XP <Flame className="w-3.5 h-3.5 text-orange-500 ml-1" /> x7
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Live Form Coaching Pill */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[60px] z-20 w-[90%] text-center">
        <div className={`px-4 py-1.5 rounded-full border-2 border-black text-[10px] font-mono font-black uppercase tracking-wider shadow-[3px_3px_0_#000] transition-colors duration-150 ${pose.deep ? 'bg-[#00FF66] text-black' : 'bg-[#FFD600] text-black'}`}>
          {pose.coachingText}
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between px-3.5 py-1.5 bg-black/90 border border-zinc-700 rounded-xl text-[11px] font-mono font-bold text-white">
        <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-[#FFD600]" /> {activeExercise.clip.replace('/clips/', '').toUpperCase()}</span>
        <span className="text-[10px] text-[#00FF66]">100% ON-DEVICE PRIVACY</span>
      </div>
    </div>
  );
}

const cardMotion = {
  initial: { opacity: 0, x: 50, scale: 0.92 },
  animate: { opacity: 1, x: 0, scale: 1 },
  exit: { opacity: 0, x: -50, scale: 0.92 },
  transition: { duration: 0.5, type: 'spring', stiffness: 220, damping: 22 },
};

export function HeroSection() {
  const [activeCard, setActiveCard] = useState(1);

  // Auto-advance cards
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveCard((prev) => (prev >= 3 ? 1 : prev + 1));
    }, activeCard === 1 ? 12000 : 4500);
    return () => clearTimeout(timer);
  }, [activeCard]);

  return (
    <section className="relative w-full bg-gradient-to-br from-[#0B549E] via-[#0A62C4] to-[#084583] text-white pt-10 pb-20 overflow-hidden">
      {/* Background Curved Wave */}
      <svg className="absolute bottom-0 left-0 w-full h-[220px] pointer-events-none opacity-20" viewBox="0 0 1440 220" fill="none">
        <path d="M0,130 Q720,10 1440,150 L1440,220 L0,220 Z" fill="#FFFFFF" />
      </svg>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[640px]">
          {/* Left Column */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/30 rounded-full text-xs font-mono font-bold tracking-widest uppercase text-white"
            >
              <Sparkles className="w-4 h-4 text-[#FFD600]" />
              <span>ON-DEVICE AI FITNESS ENGINE</span>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="space-y-1">
              <h1 className="text-5xl sm:text-7xl xl:text-8xl font-[Anton] italic uppercase tracking-normal leading-[0.95] text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
                NO LIMITS.
              </h1>
              <h1 className="text-5xl sm:text-7xl xl:text-8xl font-[Anton] italic uppercase tracking-normal leading-[0.95] text-[#FFD600] drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
                MORE MOTION.
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white/90 text-base sm:text-xl font-medium max-w-lg leading-relaxed pt-1"
            >
              Engineered for every set & rep. Real-time pose estimation and workout gamification — 100% private in your browser.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/register"
                className="btn-neo inline-flex items-center gap-3 px-8 py-4 bg-[#FFD600] text-black font-extrabold text-sm uppercase tracking-widest rounded-full shadow-[4px_4px_0_#000] hover:bg-[#FFE500]"
              >
                <span>START TRAINING</span>
                <ArrowRight className="w-5 h-5 text-black" />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 px-6 py-4 bg-white/10 hover:bg-white/20 border border-white/40 text-white font-bold text-sm uppercase tracking-widest rounded-full transition-all backdrop-blur-sm"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>HOW IT WORKS</span>
              </a>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex items-center gap-2 text-xs font-mono text-white/80 pt-1">
              <CheckCircle2 className="w-4 h-4 text-[#00FF66]" />
              <span>Over 10,000+ workouts tracked locally • 0ms Cloud Latency • 100% Free</span>
            </motion.div>

            <div className="pt-6 flex flex-wrap items-center gap-8 text-xs font-mono font-bold text-white/90 border-t border-white/20">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-pulse" />
                <span>0ms Server Latency</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#FFD600]" />
                <span>100% On-Device AI</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-[#FFD600]" />
                <span>Gamified XP & Levels</span>
              </div>
            </div>
          </div>

          {/* Right Column: Card Stack with Aligned Video Pose Tracking */}
          <div className="lg:col-span-6 relative flex justify-center items-center min-h-[520px]">
            {/* Floating chips */}
            <div className="hidden lg:flex absolute left-0 top-[58%] z-30 items-center gap-2 px-3.5 py-2 bg-white text-black font-mono text-xs font-extrabold uppercase rounded-xl border-2 border-black shadow-[4px_4px_0_#000]">
              <Activity className="w-4 h-4 text-orange-600" />
              <span>REALTIME POSE TRACKING</span>
            </div>
            <div className="hidden lg:flex absolute -right-2 bottom-2 z-30 items-center gap-2 px-3.5 py-2 bg-black text-[#FFD600] font-mono text-xs font-extrabold uppercase rounded-xl border-2 border-white/20 shadow-[4px_4px_0_#000]">
              <Lock className="w-4 h-4 text-[#FFD600]" />
              <span>100% OFFLINE PRIVACY</span>
            </div>

            <AnimatePresence mode="wait">
              {/* CARD 01: REAL VIDEO POSE TRACKING */}
              {activeCard === 1 && (
                <motion.div
                  key="card1"
                  {...cardMotion}
                  className="relative w-full max-w-[460px] aspect-[4/5] rounded-3xl overflow-hidden border-4 border-black bg-gradient-to-b from-zinc-900 via-zinc-950 to-black shadow-[16px_16px_0_rgba(0,0,0,0.5)]"
                >
                  <VideoPoseTrackingCard />
                </motion.div>
              )}

              {/* CARD 02: FORM & MOTION ANALYSIS */}
              {activeCard === 2 && (
                <motion.div
                  key="card2"
                  {...cardMotion}
                  className="relative w-full max-w-[460px] aspect-[4/5] rounded-3xl overflow-hidden border-4 border-black bg-gradient-to-b from-zinc-900 via-zinc-950 to-black shadow-[16px_16px_0_rgba(0,0,0,0.5)] p-6 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                    <div className="flex items-center gap-2 px-3 py-1 bg-[#FFD600]/10 border border-[#FFD600] rounded-full text-xs font-mono font-bold text-[#FFD600]">
                      <Target className="w-3.5 h-3.5 text-[#FFD600]" />
                      <span>02 • FORM ANALYSIS</span>
                    </div>
                    <span className="text-xs font-mono text-[#00FF66] font-bold">ACCURACY 99.4%</span>
                  </div>

                  <div className="space-y-4 my-auto font-mono text-left">
                    <div className="p-4 bg-zinc-900 border-2 border-zinc-700 rounded-2xl space-y-3">
                      <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider">LIVE POSTURE DIAGNOSTICS</div>
                      <ul className="space-y-3 text-sm text-white font-bold">
                        {[
                          ['Back Alignment', '180° PERFECT', 'text-[#00FF66]'],
                          ['Elbow Extension', '90° DEPTH', 'text-[#00FF66]'],
                          ['Range of Motion', 'CHEST TO FLOOR', 'text-[#FFD600]'],
                        ].map(([label, value, color], i) => (
                          <motion.li
                            key={label}
                            initial={{ opacity: 0, x: -16 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.15 + i * 0.2 }}
                            className="flex items-center justify-between bg-zinc-950 p-2.5 rounded-lg border border-zinc-800"
                          >
                            <span>{label}</span>
                            <span className={`${color} flex items-center gap-1`}><CheckCircle2 className="w-4 h-4" /> {value}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex items-center justify-between px-4 py-2 bg-black/90 border border-zinc-700 rounded-xl text-xs font-mono font-bold text-white">
                    <span className="flex items-center gap-1.5"><Activity className="w-4 h-4 text-[#00FF66]" /> 02 MOTION DIAGNOSTICS</span>
                    <span className="text-[10px] text-[#FFD600]">AUTO FORM SCORE</span>
                  </div>
                </motion.div>
              )}

              {/* CARD 03: XP PROGRESSION */}
              {activeCard === 3 && (
                <motion.div
                  key="card3"
                  {...cardMotion}
                  className="relative w-full max-w-[460px] aspect-[4/5] rounded-3xl overflow-hidden border-4 border-black bg-gradient-to-br from-[#FFD600]/20 via-zinc-950 to-black shadow-[16px_16px_0_rgba(0,0,0,0.5)] p-6 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                    <div className="flex items-center gap-2 px-3 py-1 bg-orange-500/10 border border-orange-500 rounded-full text-xs font-mono font-bold text-orange-400">
                      <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
                      <span>03 • XP & REWARDS</span>
                    </div>
                    <span className="text-xs font-mono text-[#FFD600] font-bold">LEVEL UP!</span>
                  </div>

                  <div className="my-auto space-y-4 text-center">
                    <div className="w-20 h-20 mx-auto rounded-2xl bg-[#FFD600] border-4 border-black flex items-center justify-center text-black shadow-[6px_6px_0_#000] rotate-3">
                      <Award className="w-10 h-10" />
                    </div>

                    <div className="space-y-1">
                      <div className="text-3xl font-[Anton] text-white tracking-wide uppercase">+100 XP EARNED</div>
                      <div className="text-xs font-mono text-zinc-400">7-DAY STREAK MULTIPLIER ACTIVE</div>
                    </div>

                    <div className="bg-zinc-900 border-2 border-zinc-700 p-4 rounded-xl space-y-2 text-left font-mono">
                      <div className="flex justify-between text-xs font-bold text-zinc-300">
                        <span>LEVEL 12 PROGRESS</span>
                        <span className="text-[#FFD600]">820 / 1000 XP</span>
                      </div>
                      <div className="w-full bg-zinc-800 h-2.5 rounded-full overflow-hidden">
                        <motion.div className="bg-[#FFD600] h-full" initial={{ width: '62%' }} animate={{ width: '82%' }} transition={{ duration: 1.2, delay: 0.4 }} />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between px-4 py-2 bg-black/90 border border-zinc-700 rounded-xl text-xs font-mono font-bold text-white">
                    <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-[#FFD600]" /> 03 XP & LEVEL BADGES</span>
                    <span className="text-[10px] text-orange-400">🔥 7 DAY STREAK</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Vertical index switcher */}
      <div className="hidden xl:flex flex-col items-center gap-4 absolute right-6 top-1/2 -translate-y-1/2 z-30 font-mono text-xs font-bold text-white/80">
        {[1, 2, 3].map((num) => (
          <button
            key={num}
            onClick={() => setActiveCard(num)}
            className={`transition-all duration-300 cursor-pointer ${
              activeCard === num ? 'text-[#FFD600] border-b-2 border-[#FFD600] pb-1 scale-110 font-black' : 'text-white/60 hover:text-white'
            }`}
          >
            0{num} {activeCard === num ? '—' : ''}
          </button>
        ))}
      </div>
    </section>
  );
}

export default HeroSection;

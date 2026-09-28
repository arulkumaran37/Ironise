import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Activity, CheckCircle2, Zap, ArrowRight, ShieldCheck, Flame, Star, Play } from 'lucide-react';

/* ---------- AI Section Video Clips & Pose Tracking Math (viewBox 0 0 800 450) ---------- */
const PERIOD = 2600;

function buildPushUpPose800(d) {
  const floor = 340;
  const feet = { x: 180, y: floor - 10 };
  const knee = { x: 275, y: floor - 35 + d * 15 };
  const hip = { x: 370, y: floor - 70 + d * 35 };
  const shoulder = { x: 540, y: floor - 80 + d * 62 };
  const head = { x: shoulder.x + 55, y: shoulder.y - 15 };
  const wrist = { x: shoulder.x + 10, y: floor };
  const elbowX = shoulder.x - 35 + d * 25;
  const elbowY = shoulder.y + 40;
  const elbow = { x: elbowX, y: elbowY };
  const elbowAngle = Math.max(90, Math.round(175 - d * 85));

  return {
    bones: [
      ['head', 'shoulder'], ['shoulder', 'hip'], ['hip', 'knee'], ['knee', 'feet'], ['shoulder', 'elbow'], ['elbow', 'wrist']
    ],
    points: { head, shoulder, hip, knee, feet, elbow, wrist },
    angle: elbowAngle,
    targetY: floor - 15,
    targetLabel: 'CHEST DEPTH TARGET',
    deep: d > 0.82,
    coachingText: d > 0.82 ? '✓ CHEST TO FLOOR • REP COUNTED' : d > 0.15 ? 'DESCENDING... HOLD FORM' : 'PUSH UP TO EXTENSION'
  };
}

function buildBicepCurlPose800(d) {
  const head = { x: 400, y: 75 };
  const shoulderR = { x: 445, y: 135 };
  const shoulderL = { x: 355, y: 135 };
  const hipR = { x: 435, y: 245 };
  const hipL = { x: 365, y: 245 };
  const kneeR = { x: 435, y: 330 };
  const kneeL = { x: 365, y: 330 };
  const feetR = { x: 435, y: 405 };
  const feetL = { x: 365, y: 405 };

  const elbowL = { x: 340, y: 205 };
  const wristL = { x: 335, y: 275 };

  const elbowR = { x: 460, y: 210 };
  const wristR = {
    x: 460 - d * 35,
    y: 280 - d * 130
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
    targetY: 150,
    targetLabel: 'PEAK BICEP TARGET',
    deep: d > 0.85,
    coachingText: d > 0.85 ? '✓ PEAK BICEP SQUEEZE • REP COUNTED' : d > 0.15 ? 'CURLING DUMBBELL UP...' : 'EXTEND ARM FULLY DOWN'
  };
}

function buildSkippingPose800(d) {
  const jumpY = -Math.abs(Math.sin(d * Math.PI * 2)) * 30;
  const ropePhase = Math.sin(d * Math.PI * 4);
  
  const head = { x: 400, y: 75 + jumpY };
  const shoulderR = { x: 445, y: 130 + jumpY };
  const shoulderL = { x: 355, y: 130 + jumpY };
  const hipR = { x: 430, y: 235 + jumpY };
  const hipL = { x: 370, y: 235 + jumpY };
  const kneeR = { x: 432, y: 320 + jumpY * 0.7 };
  const kneeL = { x: 368, y: 320 + jumpY * 0.7 };
  const feetR = { x: 428, y: 395 + jumpY };
  const feetL = { x: 372, y: 395 + jumpY };

  const elbowR = { x: 475, y: 190 + jumpY };
  const elbowL = { x: 325, y: 190 + jumpY };
  const wristR = { x: 490, y: 220 + ropePhase * 10 + jumpY };
  const wristL = { x: 310, y: 220 + ropePhase * 10 + jumpY };

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
    targetY: 380,
    targetLabel: 'GROUND CLEARANCE',
    deep: Math.abs(jumpY) > 18,
    coachingText: Math.abs(jumpY) > 18 ? '✓ HIGH JUMP CLEARANCE • REP COUNTED' : 'RHYTHMIC BOUNCE • KEEP CADENCE',
    isSkipping: true,
    ropeY: 420 + ropePhase * 20
  };
}

const AI_EXERCISES = [
  { id: 'pushups', name: 'PUSH-UPS', clip: '/clips/push-ups.mp4', builder: buildPushUpPose800 },
  { id: 'bicep', name: 'BICEP CURL', clip: '/clips/db_arm.mp4', builder: buildBicepCurlPose800 },
  { id: 'skipping', name: 'JUMP ROPE', clip: '/clips/skipping.mp4', builder: buildSkippingPose800 }
];

/* ---------- Animated Pose Tracking Camera Viewfinder Component ---------- */
function AnimatedPushUpVisual({ repCount, setRepCount, setFormScore }) {
  const [exIdx, setExIdx] = useState(0);
  const [d, setD] = useState(0);
  const [xpKey, setXpKey] = useState(0);
  const lastCycle = useRef(0);

  const activeExercise = AI_EXERCISES[exIdx];

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
        setRepCount((r) => (r >= 30 ? 1 : r + 1));
        setFormScore(Math.floor(96 + Math.random() * 4));
        setXpKey((k) => k + 1);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [setRepCount, setFormScore]);

  const pose = activeExercise.builder(d);

  return (
    <div className="relative rounded-2xl border-4 border-black bg-gradient-to-br from-zinc-900 via-zinc-950 to-black overflow-hidden shadow-[10px_10px_0_#000] p-4">
      <div className="relative aspect-[16/9] w-full flex items-center justify-center rounded-xl overflow-hidden bg-black">
        
        {/* Background Exercise Video loading real video clip */}
        <video
          key={activeExercise.clip}
          src={activeExercise.clip}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-80 pointer-events-none"
        />

        {/* Dynamic Camera Grid Texture */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#00FF66 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />

        {/* Video Mode Selector Buttons */}
        <div className="absolute top-4 right-4 z-30 flex items-center gap-1.5 p-1 bg-black/80 backdrop-blur-md border border-zinc-700 rounded-full">
          {AI_EXERCISES.map((ex, idx) => (
            <button
              key={ex.id}
              onClick={() => setExIdx(idx)}
              className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold transition-all cursor-pointer ${
                exIdx === idx
                  ? 'bg-[#00FF66] text-black shadow-[2px_2px_0_#000]'
                  : 'text-zinc-300 hover:text-white'
              }`}
            >
              {ex.name}
            </button>
          ))}
        </div>

        {/* SVG Skeleton Animation Overlaid directly on Exercise Video */}
        <svg className="w-full h-full max-h-[350px] relative z-10 pointer-events-none" viewBox="0 0 800 450">
          {/* Green Bounding Box Brackets */}
          <path d="M 80,50 L 80,30 L 120,30" fill="none" stroke="#00FF66" strokeWidth="3" />
          <path d="M 720,30 L 760,30 L 760,50" fill="none" stroke="#00FF66" strokeWidth="3" />
          <path d="M 80,400 L 80,420 L 120,420" fill="none" stroke="#00FF66" strokeWidth="3" />
          <path d="M 720,420 L 760,420 L 760,400" fill="none" stroke="#00FF66" strokeWidth="3" />

          {/* Target Threshold Line */}
          <line x1="100" y1={pose.targetY} x2="700" y2={pose.targetY} stroke={pose.deep ? '#00FF66' : '#FFD600'} strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="3 5" />
          <text x="690" y={pose.targetY - 8} textAnchor="end" fontSize="11" fontFamily="monospace" fill={pose.deep ? '#00FF66' : '#FFD600'}>
            {pose.targetLabel}
          </text>

          {/* Skipping rope curve animation if skipping */}
          {pose.isSkipping && (
            <path
              d={`M 310,220 Q 400,${pose.ropeY} 490,220`}
              fill="none"
              stroke="#FFD600"
              strokeWidth="3"
              strokeDasharray="4 2"
            />
          )}

          {/* Body Skeleton Lines aligned with athlete body */}
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

          {/* Angle Indicator Tag */}
          {pose.points.elbowR || pose.points.elbow ? (
            <g transform={`translate(${(pose.points.elbowR || pose.points.elbow).x - 30} ${(pose.points.elbowR || pose.points.elbow).y - 25})`}>
              <rect x="0" y="0" width="56" height="22" rx="6" fill="#000" stroke={pose.deep ? '#00FF66' : '#FFD600'} strokeWidth="2" />
              <text x="28" y="15" textAnchor="middle" fontSize="13" fontWeight="800" fontFamily="monospace" fill={pose.deep ? '#00FF66' : '#FFD600'}>
                {pose.angle}°
              </text>
            </g>
          ) : null}

          {/* Joint Keypoint Circles */}
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
        </svg>

        {/* Top Overlay Badge */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 bg-black/80 backdrop-blur-md border border-[#00FF66]/50 rounded-full">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00FF66] animate-ping" />
          <span className="text-[11px] font-mono font-bold text-white uppercase tracking-wider">
            {activeExercise.name} • REAL-TIME AI POSE TRACKING
          </span>
        </div>

        {/* Real-time coaching pill */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20">
          <div className={`px-4 py-1.5 rounded-full border-2 border-black text-[11px] font-mono font-black uppercase tracking-wider shadow-[3px_3px_0_#000] transition-colors duration-150 ${pose.deep ? 'bg-[#00FF66] text-black' : 'bg-[#FFD600] text-black'}`}>
            {pose.coachingText}
          </div>
        </div>

      </div>
    </div>
  );
}

export function AISection() {
  const [repCount, setRepCount] = useState(8);
  const [formScore, setFormScore] = useState(98);

  const pipeline = [
    { label: 'Camera', icon: Camera },
    { label: 'Pose Detection', icon: Activity },
    { label: 'Rep Counting', icon: Zap },
    { label: 'Form Analysis', icon: CheckCircle2 },
    { label: 'XP', icon: null, isBadge: true }
  ];

  return (
    <section id="ai" className="py-20 bg-[#09090B] text-white border-b-4 border-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 text-left">
        
        {/* Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FFD600]/10 border-2 border-[#FFD600] text-[#FFD600] font-mono font-bold text-xs uppercase rounded-full">
            <Zap className="w-3.5 h-3.5 text-[#FFD600]" />
            <span>ON-DEVICE AI</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-[Anton] text-white uppercase tracking-normal">
            YOUR CAMERA BECOMES YOUR COACH.
          </h2>

          <p className="text-zinc-300 text-base sm:text-lg font-medium max-w-2xl">
            Advanced pose detection, rep counting and form analysis — all running locally in your browser.
          </p>
        </div>

        {/* Pipeline Steps Flow */}
        <div className="flex flex-wrap items-center gap-3 pt-2 font-mono text-xs">
          {pipeline.map((item, idx) => (
            <React.Fragment key={item.label}>
              <div className="flex items-center gap-2 px-3.5 py-2 bg-zinc-900 border-2 border-zinc-700 rounded-lg text-zinc-200">
                {item.icon && <item.icon className="w-4 h-4 text-[#00FF66]" />}
                {item.isBadge ? (
                  <span className="bg-[#FFD600] text-black font-extrabold px-2 py-0.5 rounded text-[11px]">
                    +XP
                  </span>
                ) : (
                  <span className="font-bold">{item.label}</span>
                )}
              </div>
              {idx < pipeline.length - 1 && (
                <ArrowRight className="w-4 h-4 text-zinc-600 shrink-0" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Main Grid: Push-Up Viewfinder + Live Form Analysis Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
          
          {/* Main Visual: Animated Push-Up Camera Viewfinder */}
          <div className="lg:col-span-8 relative">
            <AnimatedPushUpVisual repCount={repCount} setRepCount={setRepCount} setFormScore={setFormScore} />
          </div>

          {/* Right Column Analysis Panels */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Form Analysis Card */}
            <div className="bg-zinc-900 border-2 border-zinc-700 p-6 rounded-xl text-left space-y-4 shadow-[4px_4px_0_#000]">
              <div className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest flex items-center justify-between">
                <span>FORM ANALYSIS</span>
                <span className="text-[#00FF66]">{formScore}% SCORE</span>
              </div>
              <ul className="space-y-3 font-mono text-sm text-white">
                <li className="flex items-center justify-between">
                  <span>Back straight</span>
                  <CheckCircle2 className="w-5 h-5 text-[#00FF66]" />
                </li>
                <li className="flex items-center justify-between">
                  <span>Elbows flexed 90°</span>
                  <CheckCircle2 className="w-5 h-5 text-[#00FF66]" />
                </li>
                <li className="flex items-center justify-between">
                  <span>Chest to floor depth</span>
                  <CheckCircle2 className="w-5 h-5 text-[#00FF66]" />
                </li>
              </ul>
            </div>

            {/* Rep Count Card */}
            <div className="bg-zinc-900 border-2 border-zinc-700 p-6 rounded-xl text-left space-y-3 shadow-[4px_4px_0_#000]">
              <div className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-widest flex items-center justify-between">
                <span>PUSH-UP REP COUNT</span>
                <span className="text-[#FFD600] font-bold">+25 XP / REP</span>
              </div>
              <div className="text-4xl font-[Anton] text-white">
                {repCount} <span className="text-base font-mono text-zinc-500 font-normal">/ 20 REPS</span>
              </div>
              <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-[#00FF66] h-full transition-[width] duration-300"
                  style={{ width: `${(repCount / 20) * 100}%` }}
                />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default AISection;

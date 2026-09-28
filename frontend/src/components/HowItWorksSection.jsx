import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Activity, Award, Camera, CheckCircle2, User, Zap } from 'lucide-react';

export function HowItWorksSection() {
  const steps = [
    {
      num: '01',
      title: 'MOVE',
      desc: 'Perform your workout in front of any laptop or smartphone camera.',
      badge: 'Step 1 • Camera',
      renderGraphic: () => (
        <div className="relative w-full h-full bg-gradient-to-br from-zinc-900 to-black flex flex-col items-center justify-center p-4 overflow-hidden">
          {/* Viewfinder Corners */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#FFD600]" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#FFD600]" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#FFD600]" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#FFD600]" />

          <div className="w-16 h-16 rounded-2xl bg-[#FFD600] border-2 border-black flex items-center justify-center shadow-[4px_4px_0_#000] rotate-3 mb-2">
            <Camera className="w-8 h-8 text-black" />
          </div>

          <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
            STEP 1: RECORD REPS
          </span>
        </div>
      )
    },
    {
      num: '02',
      title: 'DETECT',
      desc: 'Ironise analyzes joint positions and rep cadence 100% locally.',
      badge: 'Step 2 • AI Engine',
      renderGraphic: () => (
        <div className="relative w-full h-full bg-zinc-950 flex flex-col items-center justify-center p-4">
          <svg className="w-full h-full max-h-[120px]" viewBox="0 0 200 120">
            {/* Skeleton Overlay */}
            <circle cx="100" cy="25" r="10" fill="#FFD600" stroke="#000" strokeWidth="2" />
            <line x1="100" y1="35" x2="100" y2="75" stroke="#00FF66" strokeWidth="4" />
            <line x1="100" y1="45" x2="70" y2="65" stroke="#00FF66" strokeWidth="4" />
            <line x1="100" y1="45" x2="130" y2="65" stroke="#00FF66" strokeWidth="4" />
            <line x1="100" y1="75" x2="75" y2="105" stroke="#00FF66" strokeWidth="4" />
            <line x1="100" y1="75" x2="125" y2="105" stroke="#00FF66" strokeWidth="4" />
            <circle cx="70" cy="65" r="4" fill="#FFD600" />
            <circle cx="130" cy="65" r="4" fill="#FFD600" />
            <circle cx="75" cy="105" r="4" fill="#FFD600" />
            <circle cx="125" cy="105" r="4" fill="#FFD600" />
          </svg>
          <div className="absolute top-2 left-2 flex items-center gap-1 text-[9px] font-mono text-[#00FF66] bg-black/80 px-2 py-0.5 border border-[#00FF66]/40 rounded">
            <Activity className="w-3 h-3" /> TRACKING ACTIVE
          </div>
        </div>
      )
    },
    {
      num: '03',
      title: 'LEVEL UP',
      desc: 'Earn XP for every set, maintain your streak, and unlock trophies.',
      badge: 'Step 3 • Rewards',
      renderGraphic: () => (
        <div className="relative w-full h-full bg-gradient-to-br from-[#FFD600]/20 via-orange-500/10 to-black flex flex-col items-center justify-center p-4 text-center">
          <div className="w-16 h-16 bg-[#FFD600] border-2 border-black flex items-center justify-center shadow-[4px_4px_0_#000] -rotate-3 mb-2">
            <Award className="w-9 h-9 text-black" />
          </div>
          <span className="font-[Anton] text-2xl text-white tracking-wide uppercase drop-shadow-[2px_2px_0_#000]">
            +100 XP EARNED!
          </span>
        </div>
      )
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-[#F9F8F5] text-zinc-900 border-b-4 border-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-12">
        
        {/* Header */}
        <div className="space-y-4">
          <div className="inline-block px-3.5 py-1 bg-[#FFD600] border-2 border-black font-mono font-black text-xs text-black uppercase shadow-[2px_2px_0_#000]">
            HOW IT WORKS
          </div>

          <h2 className="text-4xl sm:text-5xl font-[Anton] text-black uppercase tracking-normal">
            SIMPLE STEPS. REAL RESULTS.
          </h2>

          <p className="text-zinc-700 text-base font-medium max-w-xl">
            Get started in minutes and turn your workouts into progress.
          </p>
        </div>

        {/* 3 Horizontal Flow Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {steps.map((step, idx) => (
            <div key={step.num} className="relative flex flex-col">
              
              <div className="flex-1 bg-white border-4 border-black p-6 shadow-[6px_6px_0_#000] flex flex-col justify-between space-y-6">
                
                {/* Top Number & Badge */}
                <div className="flex items-center justify-between">
                  <span className="font-[Anton] text-5xl text-[#FFD600] drop-shadow-[2px_2px_0_#000]">
                    {step.num}
                  </span>
                  <span className="px-2.5 py-1 bg-zinc-100 border border-black font-mono text-[10px] font-bold uppercase text-zinc-800">
                    {step.badge}
                  </span>
                </div>

                {/* Card Graphic */}
                <div className="h-44 w-full bg-zinc-900 border-2 border-black rounded-lg overflow-hidden relative flex items-center justify-center">
                  {step.renderGraphic()}
                </div>

                {/* Title & Description */}
                <div className="space-y-2">
                  <h3 className="text-2xl font-[Anton] text-black tracking-normal uppercase">
                    {step.title}
                  </h3>
                  <p className="text-xs font-medium text-zinc-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

              </div>

              {/* Arrow Connector for Desktop */}
              {idx < steps.length - 1 && (
                <div className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-[#FFD600] border-2 border-black items-center justify-center shadow-[2px_2px_0_#000]">
                  <ArrowRight className="w-4 h-4 text-black" />
                </div>
              )}

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default HowItWorksSection;

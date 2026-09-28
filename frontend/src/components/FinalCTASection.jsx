import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Camera, Monitor, Lock, Cpu } from 'lucide-react';

export function FinalCTASection() {
  return (
    <div className="bg-[#09090B] text-white">
      
      {/* Privacy First Section */}
      <section className="py-20 border-b-4 border-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left space-y-12 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFD600]/10 border-2 border-[#FFD600] text-[#FFD600] font-mono font-bold text-xs uppercase rounded-full">
                <Lock className="w-3.5 h-3.5 text-[#FFD600]" />
                <span>PRIVACY FIRST</span>
              </div>

              <h2 className="text-4xl sm:text-6xl font-[Anton] text-white uppercase tracking-normal">
                YOUR WORKOUT STAYS YOURS.
              </h2>

              <p className="text-zinc-300 text-base sm:text-lg font-medium max-w-xl">
                No cloud. No data leaks. Your camera, your browser, your progress.
              </p>

              {/* Architecture Flow */}
              <div className="flex flex-wrap items-center gap-4 pt-4 font-mono text-xs text-zinc-300">
                <div className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900 border-2 border-zinc-700 rounded-xl">
                  <Camera className="w-4 h-4 text-[#FFD600]" />
                  <span>Your Camera</span>
                </div>
                <span>→</span>
                <div className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900 border-2 border-zinc-700 rounded-xl">
                  <Monitor className="w-4 h-4 text-[#FFD600]" />
                  <span>Your Browser</span>
                </div>
                <span>→</span>
                <div className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900 border-2 border-zinc-700 rounded-xl">
                  <Cpu className="w-4 h-4 text-[#00FF66]" />
                  <span>AI (No cloud upload)</span>
                </div>
              </div>

            </div>

            {/* Right Glowing Shield Graphic */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full border-4 border-zinc-800 bg-zinc-950 flex items-center justify-center shadow-[0_0_50px_rgba(255,214,0,0.15)]">
                <div className="absolute inset-4 rounded-full border-2 border-dashed border-[#FFD600]/30 animate-spin" style={{ animationDuration: '20s' }} />
                <Lock className="w-24 h-24 text-[#FFD600]" />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Final Call to Action Banner */}
      <section className="py-20 bg-[#F9F8F5] text-zinc-900 border-b-4 border-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="p-10 sm:p-16 bg-[#FFD600] border-4 border-black shadow-[10px_10px_0_#000] space-y-6">
            
            <div className="text-xs font-mono font-black tracking-[0.25em] text-black uppercase">
              BEGIN YOUR JOURNEY
            </div>

            <h2 className="text-4xl sm:text-6xl font-[Anton] text-black uppercase tracking-normal">
              READY TO FORGE YOUR NEXT LEVEL?
            </h2>

            <p className="text-black text-sm sm:text-base font-bold max-w-xl mx-auto">
              Join thousands of lifters turning daily training into measurable XP, levels, and long-term habits.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                to="/register"
                className="btn-neo w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-black text-[#FFD600] font-extrabold text-xs uppercase tracking-widest shadow-[4px_4px_0_#000]"
              >
                <span>Create Account</span>
                <ArrowUpRight className="w-4 h-4 text-[#FFD600]" />
              </Link>

              <Link
                to="/login"
                className="btn-neo w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-black font-extrabold text-xs uppercase tracking-widest shadow-[4px_4px_0_#000]"
              >
                Log In
              </Link>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}

export default FinalCTASection;

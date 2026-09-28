import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Dumbbell, Flame, ShieldCheck, Zap, Activity } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#0B549E] via-[#0A62C4] to-[#084583] text-white border-t-4 border-black pt-16 pb-12 text-xs relative z-10 shadow-[0_-6px_0_rgba(0,0,0,0.15)] overflow-hidden">
      {/* Background Curved Wave Accent */}
      <svg className="absolute top-0 left-0 w-full h-[100px] pointer-events-none opacity-10 rotate-180" viewBox="0 0 1440 100" fill="none">
        <path d="M0,50 Q720,0 1440,60 L1440,100 L0,100 Z" fill="#FFFFFF" />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 text-left">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-[#FFD600] border-2 border-black flex items-center justify-center shadow-[3px_3px_0_#000] rounded-xl">
                <Dumbbell className="w-5 h-5 text-black" />
              </div>
              <div className="flex flex-col">
                <span className="font-[Anton] text-2xl tracking-widest text-white uppercase leading-none group-hover:text-[#FFD600] transition-colors">
                  IRONISE
                </span>
                <span className="text-[10px] text-[#FFD600] font-mono font-black tracking-widest flex items-center gap-1 uppercase -mt-0.5">
                  FITFORGE PLATFORM <Flame className="w-3.5 h-3.5 fill-[#FFD600] animate-pulse" />
                </span>
              </div>
            </Link>

            <p className="text-white/80 text-xs font-medium max-w-sm leading-relaxed">
              The zero-cloud, privacy-first workout progression system designed for dedicated lifters. Turn daily reps into XP, levels, and long-term habits.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 border border-white/20 text-white text-[10px] font-mono font-bold rounded-full backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-[#00FF66] animate-pulse" />
                Engine v2.4 Active
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/10 border border-white/20 text-white text-[10px] font-mono font-bold rounded-full backdrop-blur-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-[#00FF66]" />
                Zero Cloud Tracking
              </span>
            </div>
          </div>

          {/* Col 2: Platform */}
          <div className="space-y-3 font-mono">
            <h4 className="text-xs font-black uppercase text-[#FFD600] tracking-widest">Platform</h4>
            <ul className="space-y-2 text-white/80 text-xs font-bold">
              <li><a href="#features" className="hover:text-[#FFD600] transition-colors">Workout Tracking</a></li>
              <li><a href="#gamification" className="hover:text-[#FFD600] transition-colors">XP & Progression</a></li>
              <li><a href="#how-it-works" className="hover:text-[#FFD600] transition-colors">Streak Engine</a></li>
              <li><a href="#ai" className="hover:text-[#FFD600] transition-colors">Pose Estimator</a></li>
            </ul>
          </div>

          {/* Col 3: Architecture */}
          <div className="space-y-3 font-mono">
            <h4 className="text-xs font-black uppercase text-[#FFD600] tracking-widest">Architecture</h4>
            <ul className="space-y-2 text-white/90 text-xs font-bold">
              <li><span>100% In-Browser</span></li>
              <li><span>MediaPipe & BlazePose</span></li>
              <li><span>Spring Motion UI</span></li>
              <li><span>Offline LocalStorage</span></li>
            </ul>
          </div>

          {/* Col 4: Community & Account */}
          <div className="space-y-3 font-mono">
            <h4 className="text-xs font-black uppercase text-[#FFD600] tracking-widest">Get Started</h4>
            <div className="space-y-3">
              <Link
                to="/register"
                className="btn-neo block w-full text-center py-2.5 px-4 bg-[#FFD600] text-black font-extrabold text-xs uppercase tracking-wider rounded-full shadow-[3px_3px_0_#000]"
              >
                Create Account
              </Link>
              <Link
                to="/login"
                className="block w-full text-center py-2 px-4 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold text-xs uppercase tracking-wider rounded-full transition-colors backdrop-blur-sm"
              >
                Sign In
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Divider */}
        <div className="pt-8 border-t border-white/20 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] font-bold text-white/70">
          <div>
            © {new Date().getFullYear()} IRONISE FITFORGE. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-white cursor-pointer transition-colors">Documentation</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Shield, Flame, Star, CheckCircle2 } from 'lucide-react';

export function GamificationSection() {
  return (
    <section id="gamification" className="py-24 bg-white/80 backdrop-blur-xs relative border-b-2 border-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 180, damping: 20 }}
            className="lg:col-span-5 space-y-6 text-left"
          >
            <div className="text-xs font-mono font-black tracking-[0.25em] text-orange-600 uppercase">
              GAMIFICATION BLUEPRINT
            </div>

            <h2 className="text-3xl sm:text-5xl font-[Anton] text-black uppercase tracking-tight leading-tight">
              TURN EVERY REP INTO <span className="text-orange-600">XP & TROPHIES</span>
            </h2>

            <p className="text-zinc-700 text-sm sm:text-base font-medium leading-relaxed">
              Fitness is a lifelong RPG. Unlock levels, achieve streaks, collect rare badges, and rank up your athlete status as you build habits that last.
            </p>

            <ul className="space-y-3 text-zinc-800 text-xs sm:text-sm font-semibold">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-orange-600 shrink-0" />
                <span>Level up from Level 1 Initiate to Level 100 Iron Titan</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-orange-600 shrink-0" />
                <span>Earn streak multipliers for consistent weekly logs</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-orange-600 shrink-0" />
                <span>Showcase unlocked badges on your public athlete card</span>
              </li>
            </ul>
          </motion.div>

          {/* Right Gamification Dashboard Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, type: 'spring', stiffness: 180, damping: 20 }}
            className="lg:col-span-7"
          >
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white border-4 border-black p-8 space-y-8 shadow-[8px_8px_0_#000] hover:shadow-[14px_14px_0_#000] transition-all"
            >

              {/* Profile Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b-2 border-black">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-[#FFD600] border-2 border-black flex items-center justify-center font-[Anton] text-2xl text-black shadow-[3px_3px_0_#000]">
                    L7
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-[Anton] text-2xl text-black uppercase tracking-wide">Level 7 Athlete</h3>
                      <span className="text-[10px] font-mono font-black uppercase px-2.5 py-0.5 bg-[#FFD600] text-black border-2 border-black shadow-[2px_2px_0_#000]">
                        Iron Veteran
                      </span>
                    </div>
                    <p className="text-xs text-zinc-700 font-extrabold font-mono mt-0.5">Current Experience: 1,840 XP</p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-mono font-bold uppercase text-zinc-600 block">Next Milestone</span>
                  <span className="text-xs font-black text-black uppercase">Level 8 (2,500 XP)</span>
                </div>
              </div>

              {/* Progress Bar Widget */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-zinc-800 font-extrabold uppercase tracking-wider">Level 7 Progression</span>
                  <span className="text-orange-600 font-black">1,840 / 2,500 XP (73.6%)</span>
                </div>
                <div className="w-full h-4 bg-zinc-100 border-2 border-black p-0.5 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-[#FF6B00] to-[#FFD600] w-[73.6%]" />
                </div>
              </div>

              {/* Highlight Card: Next Achievement */}
              <div className="p-4 bg-amber-50 border-2 border-black flex items-center justify-between gap-4 shadow-[4px_4px_0_#000]">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#FFD600] border-2 border-black flex items-center justify-center text-black shrink-0 shadow-[2px_2px_0_#000]">
                    <Flame className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <div className="text-[10px] text-orange-600 font-mono font-black uppercase tracking-wider">Next Achievement</div>
                    <h4 className="text-sm font-black text-black uppercase tracking-wide">10 Workout Streak</h4>
                    <p className="text-[11px] text-zinc-700 font-medium">Complete 10 workouts within 14 days</p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="inline-block px-3 py-1 bg-white border-2 border-black text-black text-xs font-mono font-black shadow-[2px_2px_0_#000]">
                    +250 XP
                  </span>
                  <div className="text-[10px] font-mono font-bold text-zinc-600 mt-1">Progress: 8 / 10</div>
                </div>
              </div>

              {/* Recent Badges Row */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-mono font-black uppercase tracking-widest text-zinc-600">Recent Badges Unlocked</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <motion.div whileHover={{ scale: 1.05 }} className="p-3 bg-white border-2 border-black flex items-center gap-3 shadow-[3px_3px_0_#000] cursor-pointer">
                    <Trophy className="w-5 h-5 text-orange-600 shrink-0" />
                    <div>
                      <div className="text-xs font-black text-black">Early Bird</div>
                      <div className="text-[10px] text-zinc-600 font-bold font-mono">5am Workout</div>
                    </div>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} className="p-3 bg-white border-2 border-black flex items-center gap-3 shadow-[3px_3px_0_#000] cursor-pointer">
                    <Shield className="w-5 h-5 text-orange-600 shrink-0" />
                    <div>
                      <div className="text-xs font-black text-black">Squat Master</div>
                      <div className="text-[10px] text-zinc-600 font-bold font-mono">100kg PR</div>
                    </div>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} className="p-3 bg-white border-2 border-black flex items-center gap-3 shadow-[3px_3px_0_#000] cursor-pointer">
                    <Star className="w-5 h-5 text-amber-500 shrink-0" />
                    <div>
                      <div className="text-xs font-black text-black">Iron Titan</div>
                      <div className="text-[10px] text-zinc-600 font-bold font-mono">10k Total Vol</div>
                    </div>
                  </motion.div>
                </div>
              </div>

            </motion.div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

export default GamificationSection;

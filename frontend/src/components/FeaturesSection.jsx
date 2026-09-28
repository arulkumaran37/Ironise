import React from 'react';
import { motion } from 'framer-motion';
import { Activity, Zap, Award, Target, Users, Cpu } from 'lucide-react';

export function FeaturesSection() {
  const features = [
    {
      icon: Activity,
      title: "Workout Tracking",
      description: "Log sets, reps, weight volume, and exercise routines with seamless precision and clean historical analytics.",
      badge: "Core Feature",
    },
    {
      icon: Zap,
      title: "XP & Levels",
      description: "Earn experience points for every set completed. Level up your profile from Initiate to Iron Titan.",
      badge: "Gamification",
    },
    {
      icon: Award,
      title: "Achievements & Badges",
      description: "Unlock milestone trophies, streak badges, and personal record rewards as you smash fitness goals.",
      badge: "Rewards",
    },
    {
      icon: Target,
      title: "Fitness Challenges",
      description: "Participate in daily, weekly, and seasonal community challenges to test your limits and stay consistent.",
      badge: "Community",
    },
    {
      icon: Users,
      title: "Social Progress",
      description: "Connect with training partners, share workout accomplishments, send kudos, and compare leaderboards.",
      badge: "Social",
    },
    {
      icon: Cpu,
      title: "AI-Assisted Exercise Tracking",
      description: "Optional browser-based, on-device pose estimation to assist form & rep count. The core platform functions 100% offline without any AI dependency.",
      badge: "Optional Enhancement",
      highlight: true
    },
  ];

  return (
    <section id="features" className="py-24 bg-white/70 backdrop-blur-xs relative border-b-2 border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-left max-w-2xl mb-16 space-y-3"
        >
          <div className="text-xs font-mono font-black tracking-[0.25em] text-orange-600 uppercase">
            THE ARCHITECTURE
          </div>
          <h2 className="text-3xl sm:text-5xl font-[Anton] text-black uppercase tracking-tight">
            CORE PLATFORM FEATURES
          </h2>
          <p className="text-zinc-700 text-sm sm:text-base font-medium">
            Everything engineered to track workouts, gain levels, stay motivated, and build long-term athletic consistency.
          </p>
        </motion.div>

        {/* Features Grid with Framer Motion Stagger */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08, type: 'spring', stiffness: 200, damping: 20 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`relative bg-white border-4 border-black p-8 shadow-[6px_6px_0_#000] ${feature.highlight ? 'bg-amber-50/90' : ''
                  } transition-all duration-300 group hover:shadow-[12px_12px_0_#000]`}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-[#FFD600] border-2 border-black flex items-center justify-center text-black group-hover:scale-110 transition-transform shadow-[2px_2px_0_#000]">
                    <Icon className="w-6 h-6 text-black" />
                  </div>
                  <span className="text-[10px] font-mono font-black uppercase tracking-wider px-3 py-1 bg-white text-black border-2 border-black shadow-[2px_2px_0_#000]">
                    {feature.badge}
                  </span>
                </div>

                <h3 className="text-xl font-[Anton] text-black uppercase tracking-wide mb-3 group-hover:text-orange-600 transition-colors">
                  {feature.title}
                </h3>

                <p className="text-zinc-700 text-xs sm:text-sm font-medium leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default FeaturesSection;

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Dumbbell, ArrowLeft, ShieldAlert } from 'lucide-react';
import { BackgroundCanvas } from '../components/BackgroundCanvas';

export function RegisterPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('User registration will be implemented in Phase 1.');
  };

  return (
    <div className="min-h-screen bg-[#F9F8F5] text-zinc-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Video Layer */}
      <BackgroundCanvas />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 200, damping: 20 }}
        className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 space-y-6 text-center"
      >
        <Link to="/" className="inline-flex items-center gap-2 text-xs font-mono font-black uppercase tracking-wider text-black hover:text-orange-600 transition-colors mb-2">
          <ArrowLeft className="w-4 h-4 text-black" />
          Back to Home
        </Link>

        <div className="flex items-center justify-center gap-3">
          <motion.div
            whileHover={{ rotate: 12, scale: 1.1 }}
            className="w-10 h-10 bg-[#FFD600] border-2 border-black flex items-center justify-center shadow-[3px_3px_0_#000]"
          >
            <Dumbbell className="w-5 h-5 text-black" />
          </motion.div>
          <span className="font-[Anton] text-3xl text-black tracking-widest uppercase">IRONISE</span>
        </div>

        <div className="space-y-1">
          <h2 className="text-3xl font-[Anton] text-black uppercase tracking-tight">
            Forge Your Account
          </h2>
          <p className="text-xs font-mono font-bold text-zinc-700">
            Start logging workouts, earning XP, and unlocking achievements
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, type: 'spring', stiffness: 180, damping: 20 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10"
      >
        <div className="bg-white border-4 border-black py-8 px-4 shadow-[8px_8px_0_#000] sm:px-10 space-y-6">
          
          <div className="p-3 bg-amber-50 border-2 border-black flex items-center gap-3 text-xs text-black font-mono font-bold shadow-[2px_2px_0_#000]">
            <ShieldAlert className="w-4 h-4 shrink-0 text-orange-600" />
            <span>Phase 0 Preview — Account registration enabled in Phase 1.</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-black text-black uppercase tracking-wider mb-2">
                Full Name
              </label>
              <input
                type="text"
                required
                placeholder="Alex Morgan"
                className="w-full px-4 py-3 bg-zinc-50 border-2 border-black text-black placeholder-zinc-400 focus:outline-none focus:bg-white text-sm transition-colors font-medium shadow-[2px_2px_0_#000]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-black text-black uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="alex@example.com"
                className="w-full px-4 py-3 bg-zinc-50 border-2 border-black text-black placeholder-zinc-400 focus:outline-none focus:bg-white text-sm transition-colors font-medium shadow-[2px_2px_0_#000]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-black text-black uppercase tracking-wider mb-2">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••••••"
                className="w-full px-4 py-3 bg-zinc-50 border-2 border-black text-black placeholder-zinc-400 focus:outline-none focus:bg-white text-sm transition-colors font-medium shadow-[2px_2px_0_#000]"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3.5 px-4 bg-[#FFD600] border-2 border-black text-black font-extrabold text-xs uppercase tracking-widest shadow-[4px_4px_0_#000] hover:bg-[#FFE500] transition-all cursor-pointer"
            >
              Create Account
            </motion.button>
          </form>

          <div className="text-center pt-2 border-t-2 border-black">
            <p className="text-xs text-zinc-700 font-medium">
              Already registered?{' '}
              <Link to="/login" className="font-extrabold text-orange-600 hover:underline">
                Sign In
              </Link>
            </p>
          </div>

        </div>
      </motion.div>
    </div>
  );
}

export default RegisterPage;

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, UserCheck } from 'lucide-react';
import { BackgroundCanvas } from '../components/BackgroundCanvas';

export function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#F9F8F5] text-zinc-900 p-4 sm:p-8 flex flex-col items-center justify-center relative overflow-hidden">
      {/* 3D R3F Low-Poly Energy Core & Manga Canvas */}
      <BackgroundCanvas />
      
      <div className="max-w-2xl w-full space-y-6 relative z-10 text-center">
        
        <Link to="/" className="inline-flex items-center gap-2 text-xs font-mono font-black uppercase tracking-wider text-black hover:text-orange-600 transition-colors mb-4">
          <ArrowLeft className="w-4 h-4 text-black" />
          Back to Home
        </Link>

        <div className="p-8 sm:p-12 bg-white border-4 border-black shadow-[10px_10px_0_#000] space-y-6">
          
          <div className="w-20 h-20 bg-[#FFD600] border-2 border-black flex items-center justify-center text-black shadow-[4px_4px_0_#000] mx-auto">
            <UserCheck className="w-10 h-10 text-black" />
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#FFD600] border-2 border-black text-black text-xs font-mono font-black uppercase tracking-wider shadow-[2px_2px_0_#000]">
            <Clock className="w-3.5 h-3.5" />
            Phase 1 Milestone
          </div>

          <h1 className="text-3xl sm:text-4xl font-[Anton] text-black uppercase tracking-tight">
            Profile — Coming in Phase 1
          </h1>

          <p className="text-zinc-700 text-sm font-medium max-w-lg mx-auto leading-relaxed">
            User accounts, personal workout histories, custom athlete avatars, and XP progression sync will be fully connected to the Spring Boot backend in Phase 1.
          </p>

          <div className="pt-4 border-t-2 border-black flex justify-center">
            <Link
              to="/"
              className="px-6 py-3 bg-[#FFD600] border-2 border-black text-black font-extrabold text-xs uppercase tracking-widest shadow-[4px_4px_0_#000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none hover:bg-[#FFE500] transition-all"
            >
              Return to Landing Page
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}

export default ProfilePage;

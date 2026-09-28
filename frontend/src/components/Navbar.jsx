import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Dumbbell, Menu, X, ArrowRight, Flame } from 'lucide-react';
import { HealthStatusBadge } from './HealthStatusBadge';

export function Navbar({ isConnected, isChecking, statusMessage, onRefreshHealth }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isDevMode = import.meta.env.DEV;

  return (
    <header className="sticky top-0 z-50 w-full bg-[#084583]/95 backdrop-blur-md border-b-2 border-white/20 text-white transition-all">
      <div className="max-w-[1500px] mx-auto px-6 sm:px-10 lg:px-16 py-3.5">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Logo with FitForge sub-branding */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-[#FFD600] border-2 border-black flex items-center justify-center shadow-[3px_3px_0_#000]">
              <Dumbbell className="w-5 h-5 text-black" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-[Anton] text-2xl sm:text-3xl tracking-widest text-white uppercase leading-none group-hover:text-[#FFD600] transition-colors">
                IRONISE
              </span>
              <span className="text-[10px] font-mono font-black tracking-widest text-[#FFD600] flex items-center gap-1 uppercase -mt-0.5">
                FITFORGE <Flame className="w-3 h-3 text-[#FFD600] fill-[#FFD600] animate-pulse" />
              </span>
            </div>
          </Link>

          {/* Nav Links: 4 Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {[
              { label: 'Features', href: '#features' },
              { label: 'How It Works', href: '#how-it-works' },
              { label: 'Gamification', href: '#gamification' },
              { label: 'On-Device AI', href: '#ai' },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-xs font-mono font-bold uppercase text-white/90 hover:text-[#FFD600] transition-colors tracking-wider"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right Actions: Dev-only Health Badge & Get Started CTA */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            {isDevMode && (
              <HealthStatusBadge
                isConnected={isConnected}
                isChecking={isChecking}
                statusMessage={statusMessage}
                onRefresh={onRefreshHealth}
              />
            )}

            <Link
              to="/login"
              className="text-xs font-mono font-extrabold uppercase text-white hover:text-[#FFD600] transition-colors px-2 py-1 tracking-wider"
            >
              Log In
            </Link>

            <Link
              to="/register"
              className="btn-neo inline-flex items-center gap-2 text-xs font-mono font-extrabold uppercase tracking-widest text-black px-5 py-2.5 bg-[#FFD600] rounded-full shadow-[3px_3px_0_#000]"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            {isDevMode && (
              <HealthStatusBadge
                isConnected={isConnected}
                isChecking={isChecking}
                statusMessage={statusMessage}
                onRefresh={onRefreshHealth}
              />
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-white/10 border border-white/30 text-white focus:outline-none cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/20 px-6 py-5 space-y-3 bg-[#084583]">
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-mono font-bold uppercase text-white"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-mono font-bold uppercase text-white"
          >
            How It Works
          </a>
          <a
            href="#gamification"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-mono font-bold uppercase text-white"
          >
            Gamification
          </a>
          <a
            href="#ai"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-mono font-bold uppercase text-white"
          >
            On-Device AI
          </a>
          <div className="pt-3 border-t border-white/20 flex flex-col gap-2">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 border border-white/40 text-white text-xs font-mono font-bold uppercase rounded-lg"
            >
              Log In
            </Link>
            <Link
              to="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 bg-[#FFD600] text-black text-xs font-mono font-extrabold uppercase rounded-full"
            >
              Get Started
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;

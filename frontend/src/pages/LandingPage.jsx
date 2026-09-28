import React from 'react';
import { useHealthCheck } from '../hooks/useHealthCheck';
import { BackgroundCanvas } from '../components/BackgroundCanvas';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { FeaturesSection } from '../components/FeaturesSection';
import { HowItWorksSection } from '../components/HowItWorksSection';
import { GamificationSection } from '../components/GamificationSection';
import { AISection } from '../components/AISection';
import { FinalCTASection } from '../components/FinalCTASection';
import { Footer } from '../components/Footer';

export function LandingPage() {
  const { isConnected, isChecking, statusMessage, checkHealth } = useHealthCheck();

  return (
    <div className="min-h-screen bg-[#F9F8F5] text-zinc-900 flex flex-col font-sans relative selection:bg-[#FFD600] selection:text-black overflow-x-hidden">
      <BackgroundCanvas />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar
          isConnected={isConnected}
          isChecking={isChecking}
          statusMessage={statusMessage}
          onRefreshHealth={checkHealth}
        />

        <main className="flex-1">
          <HeroSection />
          <HowItWorksSection />
          <AISection />
          <GamificationSection />
          <FeaturesSection />
          <FinalCTASection />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default LandingPage;

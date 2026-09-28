import React, { useRef, useEffect } from 'react';
import bgVideo from '../../clips/background.mp4';

export function BackgroundCanvas() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {
        // Fallback catch for browser autoplay policies
      });
    }
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none z-0 bg-[#F9F8F5] overflow-hidden">
      {/* Background Video from clips/background.mp4 */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-65 pointer-events-none filter contrast-105 saturate-110"
      >
        <source src={bgVideo} type="video/mp4" />
      </video>

      {/* Light paper overlay tint for crisp text readability */}
      <div className="absolute inset-0 bg-[#F9F8F5]/35 pointer-events-none" />

      {/* Manga paper vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F9F8F5]/30 via-transparent to-[#F3F1EA]/80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#E7E4DC_100%)] opacity-45" />
    </div>
  );
}

export default BackgroundCanvas;

import { useEffect, useRef, useState } from 'react';

/**
 * Tracks normalized mouse position (-1 to 1 on each axis) relative to viewport center.
 * Use `strength` to scale the returned offset for parallax/tilt effects.
 */
export function useMouseParallax(strength = 20) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const frame = useRef(null);

  useEffect(() => {
    function handleMove(e) {
      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2 * strength;
        const y = (e.clientY / window.innerHeight - 0.5) * 2 * strength;
        setOffset({ x, y });
      });
    }

    window.addEventListener('mousemove', handleMove);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [strength]);

  return offset;
}

export default useMouseParallax;

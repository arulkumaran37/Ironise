import React, { useEffect, useRef } from 'react';

export function ChromaKeyImage({ src, alt, className }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = src;

    img.onload = () => {
      if (!isMounted) return;
      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Green screen detection logic (green dominant over red and blue)
        if (g > 110 && g > r * 1.12 && g > b * 1.12) {
          const maxRB = Math.max(r, b);
          const greenness = g - maxRB;

          if (greenness > 35) {
            data[i + 3] = 0; // Completely transparent
          } else if (greenness > 10) {
            // Anti-aliased smooth edge fade
            data[i + 3] = Math.floor(255 * (1 - (greenness - 10) / 25));
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);
    };

    return () => {
      isMounted = false;
    };
  }, [src]);

  return <canvas ref={canvasRef} className={className} aria-label={alt} />;
}

export default ChromaKeyImage;

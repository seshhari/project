import { useEffect, useRef } from 'react';

// Animated background blobs / orbs
export function AmbientOrbs() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Top left orb */}
      <div
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, #3B82F6 0%, transparent 70%)',
          animation: 'float 8s ease-in-out infinite',
          filter: 'blur(40px)',
        }}
      />
      {/* Top right orb */}
      <div
        className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-8"
        style={{
          background: 'radial-gradient(circle, #00E5FF 0%, transparent 70%)',
          animation: 'float 10s ease-in-out 2s infinite',
          filter: 'blur(50px)',
        }}
      />
      {/* Bottom center orb */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-40 opacity-5"
        style={{
          background: 'radial-gradient(ellipse, #3B82F6 0%, transparent 70%)',
          filter: 'blur(30px)',
        }}
      />
    </div>
  );
}

// Horizontal scan line that sweeps the page
export function ScanLine() {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let pos = -10;
    const animate = () => {
      pos += 0.3;
      if (pos > 110) pos = -10;
      if (lineRef.current) {
        lineRef.current.style.top = `${pos}%`;
      }
      requestAnimationFrame(animate);
    };
    const raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={lineRef}
      className="fixed left-0 right-0 pointer-events-none z-0"
      style={{
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.06), transparent)',
        top: '0%',
      }}
    />
  );
}

// Matrix-like data rain on right side
export function DataRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 80;
    canvas.height = window.innerHeight;

    const chars = '01UVSS⚡🔧⚙️'.split('');
    const columns = 4;
    const drops: number[] = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(5,5,5,0.06)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(0,229,255,0.15)';
      ctx.font = '10px Orbitron, monospace';

      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * 20, y * 12);
        if (y * 12 > canvas.height && Math.random() > 0.97) {
          drops[i] = 0;
        }
        drops[i]++;
      });
    };

    const interval = setInterval(draw, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed right-0 top-0 pointer-events-none opacity-30"
      style={{ zIndex: 0, width: '80px' }}
    />
  );
}

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onComplete: () => void;
}

const GearSVG = ({ size = 60, speed = 8, reverse = false, color = '#3B82F6' }: { size?: number; speed?: number; reverse?: boolean; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={{ animation: `${reverse ? 'gear-rotate-reverse' : 'gear-rotate'} ${speed}s linear infinite` }}>
    <path
      d="M43.2,6.5L40,0h20l-3.2,6.5c3.3,0.9,6.4,2.3,9.2,4.1l5.5-4L83,17.5l-4,5.5c1.8,2.8,3.2,5.9,4.1,9.2L89.5,35v20l-6.5,3.2c-0.9,3.3-2.3,6.4-4.1,9.2l4,5.5L71.5,83l-5.5-4c-2.8,1.8-5.9,3.2-9.2,4.1L53.5,89.5h-7L43.2,83c-3.3-0.9-6.4-2.3-9.2-4.1l-5.5,4L17,71.5l4-5.5c-1.8-2.8-3.2-5.9-4.1-9.2L10.5,53.5v-7l6.5-3.2c0.9-3.3,2.3-6.4,4.1-9.2l-4-5.5L28.5,17l5.5,4C36.8,9.4,39.9,7.4,43.2,6.5z"
      fill="none"
      stroke={color}
      strokeWidth="3"
      opacity="0.8"
    />
    <circle cx="50" cy="50" r="15" fill="none" stroke={color} strokeWidth="3" opacity="0.8" />
    <circle cx="50" cy="50" r="5" fill={color} opacity="0.9" />
  </svg>
);

export default function LoadingScreen({ onComplete }: Props) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'gears' | 'blueprint' | 'scan' | 'logo' | 'ignition' | 'done'>('gears');
  const [scanY, setScanY] = useState(0);
  const [logoParticles, setLogoParticles] = useState<{ x: number; y: number; delay: number }[]>([]);
  const [visible, setVisible] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const particles = Array.from({ length: 30 }, (_, i) => ({
      x: Math.random() * 200 - 100,
      y: Math.random() * 80 - 40,
      delay: i * 0.05,
    }));
    setLogoParticles(particles);
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setProgress(prev => {
        const next = prev + (prev < 30 ? 0.8 : prev < 60 ? 0.5 : prev < 90 ? 0.3 : 0.15);
        if (next >= 100) {
          clearInterval(intervalRef.current!);
          return 100;
        }
        return next;
      });
    }, 30);

    return () => clearInterval(intervalRef.current!);
  }, []);

  useEffect(() => {
    if (progress >= 20) setPhase('blueprint');
    if (progress >= 45) setPhase('scan');
    if (progress >= 65) setPhase('logo');
    if (progress >= 85) setPhase('ignition');
    if (progress >= 100) {
      setTimeout(() => {
        setPhase('done');
        setTimeout(() => {
          setVisible(false);
          setTimeout(onComplete, 500);
        }, 600);
      }, 400);
    }
  }, [progress]);

  useEffect(() => {
    if (phase === 'scan') {
      let scanPos = 0;
      const scanInterval = setInterval(() => {
        scanPos = (scanPos + 2) % 100;
        setScanY(scanPos);
      }, 16);
      return () => clearInterval(scanInterval);
    }
  }, [phase]);

  const phases = {
    gears: 'Initializing Systems...',
    blueprint: 'Loading Vehicle Blueprint...',
    scan: 'Running Diagnostics...',
    logo: 'Assembling UVSS Core...',
    ignition: 'Engine Ignition...',
    done: 'Welcome to UVSS',
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Background grid */}
          <div className="absolute inset-0 grid-bg opacity-30" />

          {/* Ambient glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)' }} />
          </div>

          {/* Main content */}
          <div className="relative flex flex-col items-center gap-8">

            {/* Gears arrangement */}
            <div className="relative w-40 h-40">
              {/* Center large gear */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <GearSVG size={80} speed={6} color="#3B82F6" />
              </div>
              {/* Top left small gear */}
              <div className="absolute top-2 left-2">
                <GearSVG size={45} speed={4} reverse color="#00E5FF" />
              </div>
              {/* Bottom right small gear */}
              <div className="absolute bottom-2 right-2">
                <GearSVG size={45} speed={4} reverse color="#00E5FF" />
              </div>
              {/* Top right tiny gear */}
              <div className="absolute top-0 right-4">
                <GearSVG size={30} speed={3} color="#E5E7EB" />
              </div>

              {/* Scanning effect overlay */}
              {phase === 'scan' && (
                <div
                  className="absolute left-0 w-full h-0.5 pointer-events-none"
                  style={{
                    top: `${scanY}%`,
                    background: 'linear-gradient(90deg, transparent, #00E5FF, transparent)',
                    boxShadow: '0 0 10px #00E5FF',
                    transition: 'top 0.016s linear',
                  }}
                />
              )}
            </div>

            {/* Vehicle blueprint SVG */}
            <AnimatePresence>
              {(phase === 'blueprint' || phase === 'scan' || phase === 'logo' || phase === 'ignition') && (
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <svg width="260" height="90" viewBox="0 0 260 90" fill="none">
                    {/* Car silhouette blueprint */}
                    <motion.path
                      d="M20,65 L35,45 L60,38 L80,35 L130,35 L160,40 L185,45 L210,65 L220,65 L220,72 L200,72 L190,72 Q188,82 178,82 Q168,82 166,72 L94,72 Q92,82 82,82 Q72,82 70,72 L20,72 Z"
                      stroke="#3B82F6"
                      strokeWidth="1.5"
                      fill="rgba(59,130,246,0.05)"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, ease: 'easeInOut' }}
                    />
                    {/* Windows */}
                    <motion.path
                      d="M75,38 L85,42 L130,42 L145,38 Z"
                      stroke="#00E5FF"
                      strokeWidth="1"
                      fill="rgba(0,229,255,0.05)"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                    {/* Wheels */}
                    <motion.circle cx="82" cy="72" r="12" stroke="#00E5FF" strokeWidth="1" fill="none"
                      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.8 }} />
                    <motion.circle cx="178" cy="72" r="12" stroke="#00E5FF" strokeWidth="1" fill="none"
                      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.8 }} />
                    {/* Grid lines */}
                    {[45, 55, 65, 75, 85, 95, 105, 115, 125, 135, 145, 155, 165, 175, 185, 195, 205].map(x => (
                      <line key={x} x1={x} y1="35" x2={x} y2="72" stroke="rgba(59,130,246,0.1)" strokeWidth="0.5" />
                    ))}
                    {/* Measurement lines */}
                    <line x1="20" y1="20" x2="220" y2="20" stroke="rgba(0,229,255,0.3)" strokeWidth="0.5" strokeDasharray="5,5" />
                    <line x1="20" y1="20" x2="20" y2="25" stroke="rgba(0,229,255,0.5)" strokeWidth="1" />
                    <line x1="220" y1="20" x2="220" y2="25" stroke="rgba(0,229,255,0.5)" strokeWidth="1" />
                    <text x="120" y="18" fill="rgba(0,229,255,0.6)" fontSize="6" textAnchor="middle">4820mm</text>
                    {/* Crosshair */}
                    <line x1="130" y1="10" x2="130" y2="85" stroke="rgba(0,229,255,0.15)" strokeWidth="0.5" />
                    <line x1="15" y1="55" x2="245" y2="55" stroke="rgba(0,229,255,0.15)" strokeWidth="0.5" />
                  </svg>
                  {/* Corner brackets */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-cyan-400 opacity-60" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-cyan-400 opacity-60" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-cyan-400 opacity-60" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-cyan-400 opacity-60" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Logo assembly */}
            <AnimatePresence>
              {(phase === 'logo' || phase === 'ignition' || phase === 'done') && (
                <motion.div
                  className="text-center relative"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Particle burst */}
                  {logoParticles.map((p, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 rounded-full"
                      style={{
                        background: i % 2 === 0 ? '#3B82F6' : '#00E5FF',
                        top: '50%',
                        left: '50%',
                      }}
                      initial={{ x: 0, y: 0, opacity: 1 }}
                      animate={{ x: p.x, y: p.y, opacity: 0, scale: [1, 0] }}
                      transition={{ duration: 0.8, delay: p.delay }}
                    />
                  ))}
                  <motion.h1
                    className="text-5xl font-black tracking-widest"
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, type: 'spring' }}
                  >
                    <span className="gradient-text">UVSS</span>
                  </motion.h1>
                  <motion.p
                    className="text-xs tracking-[6px] text-gray-400 mt-1 uppercase"
                    style={{ fontFamily: 'Rajdhani, sans-serif' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    Universal Vehicle Service System
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Ignition animation */}
            {phase === 'ignition' && (
              <motion.div
                className="flex gap-1 items-end"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {[1, 2, 3, 4, 5].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1 rounded-full"
                    style={{ background: `hsl(${200 + i * 10}, 100%, 60%)` }}
                    animate={{ height: [4, 20 + i * 6, 4] }}
                    transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.1 }}
                  />
                ))}
                <span className="text-cyan-400 text-xs ml-3 tracking-widest" style={{ fontFamily: 'Orbitron' }}>ENGINE ON</span>
                {[1, 2, 3, 4, 5].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1 rounded-full"
                    style={{ background: `hsl(${200 + i * 10}, 100%, 60%)` }}
                    animate={{ height: [4, 20 + i * 6, 4] }}
                    transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.1 + 0.2 }}
                  />
                ))}
              </motion.div>
            )}

            {/* Progress section */}
            <div className="w-72 space-y-3">
              {/* Phase label */}
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500 tracking-widest uppercase" style={{ fontFamily: 'Rajdhani' }}>
                  {phases[phase]}
                </span>
                <span className="text-xs font-mono" style={{ color: '#00E5FF' }}>
                  {Math.floor(progress)}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-0.5 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #3B82F6, #00E5FF)',
                    boxShadow: '0 0 10px #00E5FF',
                    width: `${progress}%`,
                  }}
                  transition={{ ease: 'easeOut' }}
                />
              </div>

              {/* Segment indicators */}
              <div className="flex gap-1">
                {['Systems', 'Blueprint', 'Scan', 'Core', 'Ignition'].map((label, i) => (
                  <div
                    key={label}
                    className="flex-1 h-0.5 rounded-full transition-all duration-500"
                    style={{
                      background: progress > i * 20 ? '#00E5FF' : 'rgba(59,130,246,0.2)',
                      boxShadow: progress > i * 20 ? '0 0 6px #00E5FF' : 'none',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Bottom tech text */}
            <div className="flex gap-4 text-gray-600 text-xs" style={{ fontFamily: 'Orbitron' }}>
              <span>v2.0.25</span>
              <span className="text-cyan-400">|</span>
              <span>UVSS ENGINE</span>
              <span className="text-cyan-400">|</span>
              <span>INITIALIZED</span>
            </div>
          </div>

          {/* Corner decorations */}
          {['top-4 left-4', 'top-4 right-4', 'bottom-4 left-4', 'bottom-4 right-4'].map((pos, i) => (
            <div key={i} className={`absolute ${pos} w-8 h-8 opacity-30`}>
              <svg viewBox="0 0 32 32" fill="none">
                <path
                  d={i === 0 ? 'M0 16 L0 0 L16 0' : i === 1 ? 'M32 16 L32 0 L16 0' : i === 2 ? 'M0 16 L0 32 L16 32' : 'M32 16 L32 32 L16 32'}
                  stroke="#00E5FF"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

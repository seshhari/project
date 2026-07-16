import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const cityNodes = [
  { id: 'depot', x: 15, y: 70, label: 'UVSS Depot', type: 'depot' },
  { id: 'junction1', x: 25, y: 55, label: '', type: 'junction' },
  { id: 'junction2', x: 40, y: 45, label: '', type: 'junction' },
  { id: 'junction3', x: 35, y: 60, label: '', type: 'junction' },
  { id: 'junction4', x: 55, y: 35, label: '', type: 'junction' },
  { id: 'junction5', x: 60, y: 55, label: '', type: 'junction' },
  { id: 'destination', x: 75, y: 28, label: 'Your Location', type: 'destination' },
];

const routePath = cityNodes.map(n => ({ x: n.x, y: n.y }));

const buildings = [
  { x: 5, y: 20, w: 8, h: 25, color: 'rgba(59,130,246,0.12)' },
  { x: 18, y: 15, w: 6, h: 30, color: 'rgba(0,229,255,0.08)' },
  { x: 30, y: 10, w: 9, h: 35, color: 'rgba(59,130,246,0.1)' },
  { x: 45, y: 5, w: 7, h: 40, color: 'rgba(0,229,255,0.1)' },
  { x: 60, y: 8, w: 8, h: 38, color: 'rgba(59,130,246,0.12)' },
  { x: 75, y: 12, w: 6, h: 30, color: 'rgba(0,229,255,0.08)' },
  { x: 85, y: 18, w: 7, h: 25, color: 'rgba(59,130,246,0.1)' },
  { x: 8, y: 48, w: 10, h: 20, color: 'rgba(59,130,246,0.08)' },
  { x: 70, y: 50, w: 8, h: 22, color: 'rgba(0,229,255,0.1)' },
  { x: 82, y: 42, w: 6, h: 30, color: 'rgba(59,130,246,0.12)' },
];

const roads = [
  { x1: 0, y1: 65, x2: 100, y2: 65 },
  { x1: 0, y1: 45, x2: 100, y2: 45 },
  { x1: 0, y1: 80, x2: 100, y2: 80 },
  { x1: 20, y1: 0, x2: 20, y2: 100 },
  { x1: 45, y1: 0, x2: 45, y2: 100 },
  { x1: 70, y1: 0, x2: 70, y2: 100 },
];

export default function DispatchSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [mechanicPos, setMechanicPos] = useState({ x: 15, y: 70 });
  const [eta, setEta] = useState(14);
  const [phase, setPhase] = useState<'idle' | 'dispatching' | 'enroute' | 'arrived'>('idle');
  const [routeProgress, setRouteProgress] = useState(0);
  const [showRoute, setShowRoute] = useState(false);
  const animRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startDispatch = () => {
    setPhase('dispatching');
    setShowRoute(false);
    setRouteProgress(0);
    setEta(14);
    setMechanicPos({ x: 15, y: 70 });

    setTimeout(() => {
      setShowRoute(true);
      setPhase('enroute');

      let step = 0;
      const totalSteps = 100;
      const etaStart = 14;

      animRef.current = setInterval(() => {
        step++;
        const progress = step / totalSteps;
        setRouteProgress(progress);

        // Interpolate mechanic position along route
        const totalNodes = routePath.length - 1;
        const nodeProgress = progress * totalNodes;
        const nodeIndex = Math.min(Math.floor(nodeProgress), totalNodes - 1);
        const nodeT = nodeProgress - nodeIndex;
        const from = routePath[nodeIndex];
        const to = routePath[Math.min(nodeIndex + 1, totalNodes)];
        setMechanicPos({
          x: from.x + (to.x - from.x) * nodeT,
          y: from.y + (to.y - from.y) * nodeT,
        });

        setEta(Math.max(0, Math.round(etaStart * (1 - progress))));

        if (step >= totalSteps) {
          clearInterval(animRef.current!);
          setPhase('arrived');
        }
      }, 80);
    }, 1500);
  };

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(startDispatch, 800);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  useEffect(() => () => { if (animRef.current) clearInterval(animRef.current); }, []);

  const pathD = routePath.reduce((d, p, i) => {
    const px = (p.x / 100) * 100;
    const py = (p.y / 100) * 100;
    return i === 0 ? `M ${px} ${py}` : `${d} L ${px} ${py}`;
  }, '');

  const getLightColor = (_progress: number, road: typeof roads[0]) => {
    const midX = (road.x1 + road.x2) / 2;
    const midY = (road.y1 + road.y2) / 2;
    const closeness = 1 - Math.min(
      Math.sqrt(
        Math.pow(midX - mechanicPos.x, 2) + Math.pow(midY - mechanicPos.y, 2)
      ) / 30,
      1
    );
    return closeness;
  };

  return (
    <section id="dispatch" ref={sectionRef} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(59,130,246,0.06) 0%, transparent 70%)' }} />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-tag mb-4 block">Real-Time Dispatch</span>
          <div className="neon-line w-24 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ fontFamily: 'Orbitron' }}>
            <span className="gradient-text">Mechanic</span> <span className="metallic-text">En Route</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto" style={{ fontFamily: 'Rajdhani' }}>
            Watch our futuristic dispatch system track your mechanic in real-time.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* City Map */}
          <motion.div
            className="lg:col-span-2 relative rounded-2xl overflow-hidden glass-card"
            style={{ height: '480px' }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8 }}
          >
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="none"
            >
              {/* Background */}
              <rect width="100" height="100" fill="#050505" />

              {/* Grid */}
              {Array.from({ length: 10 }, (_, i) => (
                <g key={i}>
                  <line x1={i * 10} y1="0" x2={i * 10} y2="100" stroke="rgba(59,130,246,0.06)" strokeWidth="0.3" />
                  <line x1="0" y1={i * 10} x2="100" y2={i * 10} stroke="rgba(59,130,246,0.06)" strokeWidth="0.3" />
                </g>
              ))}

              {/* Buildings */}
              {buildings.map((b, i) => (
                <g key={i}>
                  <rect x={b.x} y={b.y} width={b.w} height={b.h} fill={b.color} stroke="rgba(59,130,246,0.2)" strokeWidth="0.2" />
                  {/* Building windows */}
                  {Array.from({ length: 3 }, (_, wi) => (
                    Array.from({ length: Math.ceil(b.h / 8), }, (_, hi) => (
                      <rect
                        key={`${wi}-${hi}`}
                        x={b.x + 1 + wi * 2.5}
                        y={b.y + 2 + hi * 6}
                        width="1.2"
                        height="1.5"
                        fill={Math.random() > 0.3 ? 'rgba(0,229,255,0.3)' : 'rgba(59,130,246,0.2)'}
                      />
                    ))
                  ))}
                </g>
              ))}

              {/* Roads */}
              {roads.map((road, i) => {
                const light = getLightColor(routeProgress, road);
                return (
                  <g key={i}>
                    <line
                      x1={road.x1}
                      y1={road.y1}
                      x2={road.x2}
                      y2={road.y2}
                      stroke={light > 0.3 ? `rgba(0,229,255,${0.2 + light * 0.4})` : 'rgba(59,130,246,0.15)'}
                      strokeWidth={light > 0.3 ? '1.5' : '1'}
                    />
                    {/* Road dashes */}
                    <line
                      x1={road.x1}
                      y1={road.y1}
                      x2={road.x2}
                      y2={road.y2}
                      stroke="rgba(255,255,255,0.05)"
                      strokeWidth="0.3"
                      strokeDasharray="2,4"
                    />
                  </g>
                );
              })}

              {/* Route path */}
              {showRoute && (
                <>
                  {/* Background route */}
                  <path d={pathD} fill="none" stroke="rgba(59,130,246,0.2)" strokeWidth="1.5" strokeLinecap="round" />
                  {/* Animated route progress */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke="#00E5FF"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeDasharray="200"
                    strokeDashoffset={200 - routeProgress * 200}
                    style={{ filter: 'drop-shadow(0 0 3px #00E5FF)' }}
                  />
                  {/* Moving dots along route */}
                  {[0.2, 0.4, 0.6, 0.8].map((offset, i) => {
                    const dotProgress = (routeProgress - offset + 1) % 1;
                    if (dotProgress < 0 || dotProgress > routeProgress) return null;
                    const totalNodes = routePath.length - 1;
                    const nodeProgress = dotProgress * totalNodes;
                    const nodeIndex = Math.min(Math.floor(nodeProgress), totalNodes - 1);
                    const nodeT = nodeProgress - nodeIndex;
                    const from = routePath[nodeIndex];
                    const to = routePath[Math.min(nodeIndex + 1, totalNodes)];
                    const dx = from.x + (to.x - from.x) * nodeT;
                    const dy = from.y + (to.y - from.y) * nodeT;
                    return (
                      <circle key={i} cx={dx} cy={dy} r="0.5" fill="rgba(0,229,255,0.5)" />
                    );
                  })}
                </>
              )}

              {/* Route junction nodes */}
              {showRoute && cityNodes.slice(1, -1).map((node) => (
                <circle key={node.id} cx={node.x} cy={node.y} r="1" fill="#3B82F6" opacity="0.6" />
              ))}

              {/* Depot */}
              <g>
                <circle cx="15" cy="70" r="3" fill="rgba(59,130,246,0.3)" stroke="#3B82F6" strokeWidth="0.5" />
                <text x="15" y="76" textAnchor="middle" fill="#3B82F6" fontSize="2.5" fontFamily="Orbitron">DEPOT</text>
              </g>

              {/* Destination pin */}
              <g>
                <circle cx="75" cy="28" r="2" fill="rgba(239,68,68,0.3)" />
                <circle cx="75" cy="28" r="1.2" fill="#EF4444" />
                <circle cx="75" cy="28" r="4" fill="none" stroke="#EF4444" strokeWidth="0.5" strokeDasharray="1,2">
                  <animate attributeName="r" values="2;6;2" dur="2s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite" />
                </circle>
                <text x="75" y="22" textAnchor="middle" fill="#EF4444" fontSize="2.5" fontFamily="Rajdhani">YOUR LOCATION</text>
              </g>

              {/* Mechanic icon */}
              {(phase === 'enroute' || phase === 'arrived') && (
                <g transform={`translate(${mechanicPos.x}, ${mechanicPos.y})`}>
                  {/* Glow */}
                  <circle r="4" fill="rgba(0,229,255,0.1)" />
                  {/* Icon */}
                  <circle r="2.5" fill="#00E5FF" />
                  <circle r="1.2" fill="#050505" />
                  {/* Direction arrow */}
                  <path d="M 0 -4 L 1.5 -1 L 0 -2 L -1.5 -1 Z" fill="#00E5FF" opacity="0.8" />
                </g>
              )}

              {/* Light beams at intersections */}
              {roads.slice(0, 3).map((road, i) =>
                roads.slice(3).map((road2, j) => {
                  const ix = road2.x1;
                  const iy = road.y1;
                  const closeness = 1 - Math.min(
                    Math.sqrt(Math.pow(ix - mechanicPos.x, 2) + Math.pow(iy - mechanicPos.y, 2)) / 20,
                    1
                  );
                  if (closeness < 0.3) return null;
                  return (
                    <circle
                      key={`${i}-${j}`}
                      cx={ix}
                      cy={iy}
                      r={1.5 * closeness}
                      fill={`rgba(0,229,255,${closeness * 0.6})`}
                    />
                  );
                })
              )}
            </svg>

            {/* Overlay HUD */}
            <div className="absolute top-4 left-4">
              <div className="glass px-4 py-2 rounded-lg">
                <div className="text-xs text-cyan-400 tracking-widest" style={{ fontFamily: 'Orbitron' }}>LIVE TRACKING</div>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 pulse-glow" />
                  <span className="text-xs text-gray-300">{phase === 'arrived' ? 'Arrived' : phase === 'enroute' ? 'Mechanic En Route' : phase === 'dispatching' ? 'Dispatching...' : 'Ready'}</span>
                </div>
              </div>
            </div>

            {/* Corner brackets */}
            {['top-2 left-2', 'top-2 right-2', 'bottom-2 left-2', 'bottom-2 right-2'].map((pos, i) => (
              <div key={i} className={`absolute ${pos} w-5 h-5`} style={{
                borderTop: i < 2 ? '1px solid rgba(0,229,255,0.4)' : 'none',
                borderBottom: i >= 2 ? '1px solid rgba(0,229,255,0.4)' : 'none',
                borderLeft: i % 2 === 0 ? '1px solid rgba(0,229,255,0.4)' : 'none',
                borderRight: i % 2 === 1 ? '1px solid rgba(0,229,255,0.4)' : 'none',
              }} />
            ))}
          </motion.div>

          {/* Dispatch status panel */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {/* ETA Card */}
            <div className="glass-card rounded-2xl p-6 text-center">
              <div className="text-xs text-gray-500 tracking-widest mb-2" style={{ fontFamily: 'Rajdhani' }}>ESTIMATED ARRIVAL</div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={phase === 'arrived' ? 'arrived' : eta}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {phase === 'arrived' ? (
                    <div>
                      <div className="text-4xl font-black text-cyan-400 mb-1" style={{ fontFamily: 'Orbitron' }}>✓</div>
                      <div className="text-lg font-bold text-cyan-400" style={{ fontFamily: 'Orbitron' }}>ARRIVED!</div>
                    </div>
                  ) : (
                    <>
                      <div className={`text-5xl font-black gradient-text countdown-tick`} style={{ fontFamily: 'Orbitron' }}>
                        {eta}
                      </div>
                      <div className="text-gray-400 text-sm mt-1" style={{ fontFamily: 'Rajdhani' }}>minutes away</div>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Progress bar */}
              <div className="mt-4 w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: 'linear-gradient(90deg, #3B82F6, #00E5FF)', width: `${routeProgress * 100}%` }}
                />
              </div>
            </div>

            {/* Mechanic info */}
            <div className="glass-card rounded-2xl p-5 space-y-4">
              <div className="text-xs text-gray-500 tracking-widest" style={{ fontFamily: 'Rajdhani' }}>YOUR MECHANIC</div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl" style={{ background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)' }}>
                  👨‍🔧
                </div>
                <div>
                  <div className="font-bold text-white" style={{ fontFamily: 'Rajdhani', letterSpacing: '1px' }}>Rahul Sharma</div>
                  <div className="text-xs text-cyan-400">⭐ 4.9 · 847 services</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="glass rounded-lg p-2.5 text-center">
                  <div className="text-xs text-gray-500 mb-1">Cert.</div>
                  <div className="text-xs text-cyan-400 font-bold">ASE Level 3</div>
                </div>
                <div className="glass rounded-lg p-2.5 text-center">
                  <div className="text-xs text-gray-500 mb-1">Vehicle</div>
                  <div className="text-xs text-blue-400 font-bold">KA01 XX 0042</div>
                </div>
              </div>
            </div>

            {/* Live status steps */}
            <div className="glass-card rounded-2xl p-5 space-y-4">
              <div className="text-xs text-gray-500 tracking-widest mb-2" style={{ fontFamily: 'Rajdhani' }}>STATUS</div>
              {[
                { label: 'Request Received', done: true },
                { label: 'Mechanic Assigned', done: phase !== 'idle' },
                { label: 'En Route', done: phase === 'enroute' || phase === 'arrived' },
                { label: 'Arrived', done: phase === 'arrived' },
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500 ${step.done ? 'bg-cyan-400' : 'bg-gray-700 border border-gray-600'}`}>
                    {step.done ? (
                      <svg width="10" height="10" viewBox="0 0 10 10">
                        <path d="M2 5 L4 7 L8 3" stroke="#050505" strokeWidth="1.5" fill="none" />
                      </svg>
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-gray-600" />
                    )}
                  </div>
                  <span className={`text-sm transition-colors duration-500 ${step.done ? 'text-white' : 'text-gray-600'}`} style={{ fontFamily: 'Rajdhani' }}>
                    {step.label}
                  </span>
                  {i === 2 && phase === 'enroute' && (
                    <div className="ml-auto">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 pulse-glow" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Replay button */}
            {phase === 'arrived' && (
              <motion.button
                onClick={startDispatch}
                className="btn-outline w-full text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Replay Animation
              </motion.button>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

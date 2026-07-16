import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import * as THREE from 'three';

const services = [
  { id: 'engine', icon: '⚙️', title: 'Engine Repair', desc: 'Full engine diagnostics, tune-ups, overhauls and precision rebuilds by certified specialists.', time: '2-4 hrs', price: '₹2,000+', color: '#3B82F6' },
  { id: 'oil', icon: '🛢️', title: 'Oil Change', desc: 'Complete oil service with genuine filters, synthetic oils, and multi-point inspection.', time: '30 min', price: '₹500+', color: '#F59E0B' },
  { id: 'brake', icon: '🔴', title: 'Brake Service', desc: 'Comprehensive brake pad, rotor, caliper inspection, adjustment and replacement.', time: '1-2 hrs', price: '₹1,500+', color: '#EF4444' },
  { id: 'battery', icon: '⚡', title: 'Battery Replacement', desc: 'Battery testing, replacement with OEM-spec batteries and alternator checks.', time: '30 min', price: '₹3,000+', color: '#00E5FF' },
  { id: 'tyre', icon: '⭕', title: 'Tyre Assistance', desc: 'Flat tyre change, rotation, balancing, nitrogen filling and tread inspection.', time: '45 min', price: '₹800+', color: '#8B5CF6' },
  { id: 'emergency', icon: '🚨', title: 'Emergency Breakdown', desc: 'Priority 24×7 dispatch for stranded vehicles with on-site repairs or towing.', time: '15 min', price: '₹1,200+', color: '#F97316' },
  { id: 'electrical', icon: '🔌', title: 'Electrical Repairs', desc: 'ECU diagnostics, wiring, sensors, lighting and advanced electronics repair.', time: '1-3 hrs', price: '₹1,800+', color: '#06B6D4' },
  { id: 'maintenance', icon: '🔧', title: 'General Maintenance', desc: 'Scheduled servicing, filter changes, fluid top-ups and full vehicle health check.', time: '1-2 hrs', price: '₹1,200+', color: '#10B981' },
  { id: 'ac', icon: '❄️', title: 'AC Service', desc: 'AC regas, compressor repair, leak detection, and complete climate system service.', time: '2-3 hrs', price: '₹2,500+', color: '#3B82F6' },
  { id: 'inspection', icon: '🔍', title: 'Vehicle Inspection', desc: '360° vehicle health report with 100+ checkpoints for safety and roadworthiness.', time: '1 hr', price: '₹999+', color: '#84CC16' },
];

function ServiceOrb({ color, active }: { color: string; active: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const time = useRef(0);

  useFrame((_, delta) => {
    time.current += delta;
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
      meshRef.current.rotation.x += delta * 0.2;
      const scale = active ? 1.2 + Math.sin(time.current * 2) * 0.05 : 1;
      meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, scale, 0.1));
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[0.8, 2]} />
        <meshStandardMaterial
          color={color}
          metalness={0.9}
          roughness={0.1}
          wireframe={!active}
          emissive={color}
          emissiveIntensity={active ? 0.5 : 0.1}
        />
      </mesh>
      {active && (
        <>
          <mesh>
            <sphereGeometry args={[1.2, 32, 32]} />
            <meshStandardMaterial
              color={color}
              transparent
              opacity={0.05}
              side={THREE.BackSide}
            />
          </mesh>
          <pointLight color={color} intensity={3} distance={4} />
        </>
      )}
    </group>
  );
}

function addRipple(e: React.MouseEvent<HTMLButtonElement>) {
  const btn = e.currentTarget;
  const rect = btn.getBoundingClientRect();
  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  ripple.style.width = ripple.style.height = '20px';
  ripple.style.left = `${e.clientX - rect.left - 10}px`;
  ripple.style.top = `${e.clientY - rect.top - 10}px`;
  btn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 800);
}

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [activeService, setActiveService] = useState(services[0]);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="services" ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 80% 50%, rgba(59,130,246,0.06) 0%, transparent 60%)' }} />
      <div className="absolute inset-0 grid-bg opacity-10" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-tag mb-4 block">Our Services</span>
          <div className="neon-line w-24 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6" style={{ fontFamily: 'Orbitron' }}>
            <span className="gradient-text">Precision Services</span>
            <br />
            <span className="metallic-text text-3xl md:text-4xl">At Your Location</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto" style={{ fontFamily: 'Rajdhani', fontSize: '16px' }}>
            10 specialized automotive services, delivered by certified experts directly to your doorstep.
          </p>
        </motion.div>

        {/* Main content */}
        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Services grid */}
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {services.map((service, i) => (
              <motion.button
                key={service.id}
                onClick={(e) => { addRipple(e); setActiveService(service); }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`relative text-left p-4 rounded-xl transition-all duration-300 overflow-hidden ${
                  activeService.id === service.id ? 'glass-card' : 'glass'
                }`}
                style={{
                  border: activeService.id === service.id
                    ? `1px solid ${service.color}50`
                    : '1px solid rgba(255,255,255,0.05)',
                  boxShadow: activeService.id === service.id
                    ? `0 0 30px ${service.color}20, inset 0 0 20px ${service.color}05`
                    : 'none',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                whileHover={{ y: -4 }}
              >
                {/* Active indicator */}
                {activeService.id === service.id && (
                  <motion.div
                    className="absolute top-0 left-0 w-full h-0.5"
                    style={{ background: `linear-gradient(90deg, transparent, ${service.color}, transparent)` }}
                    layoutId="activeServiceLine"
                  />
                )}

                <div className="text-2xl mb-3">{service.icon}</div>
                <h3 className="text-sm font-bold text-white mb-1 leading-tight" style={{ fontFamily: 'Rajdhani', letterSpacing: '0.5px' }}>
                  {service.title}
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-gray-500" style={{ fontFamily: 'mono' }}>⏱ {service.time}</span>
                </div>

                {/* Hover glow */}
                {hoveredIndex === i && (
                  <motion.div
                    className="absolute inset-0 rounded-xl pointer-events-none"
                    style={{ background: `radial-gradient(circle at center, ${service.color}15 0%, transparent 70%)` }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Active service detail */}
          <div className="lg:col-span-2 space-y-6 sticky top-32">
            {/* 3D Orb */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                className="relative h-64 rounded-2xl overflow-hidden glass-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <Canvas camera={{ position: [0, 0, 3], fov: 50 }} dpr={[1, 1.5]}>
                  <ambientLight intensity={0.3} />
                  <Environment preset="city" />
                  <ServiceOrb color={activeService.color} active />
                </Canvas>

                {/* Scan lines */}
                <div className="absolute inset-0 pointer-events-none" style={{
                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,229,255,0.02) 2px, rgba(0,229,255,0.02) 4px)',
                }} />

                {/* Corner brackets */}
                {['top-2 left-2', 'top-2 right-2', 'bottom-2 left-2', 'bottom-2 right-2'].map((pos, i) => (
                  <div key={i} className={`absolute ${pos} w-4 h-4`} style={{
                    borderTop: i < 2 ? `1px solid ${activeService.color}60` : 'none',
                    borderBottom: i >= 2 ? `1px solid ${activeService.color}60` : 'none',
                    borderLeft: i % 2 === 0 ? `1px solid ${activeService.color}60` : 'none',
                    borderRight: i % 2 === 1 ? `1px solid ${activeService.color}60` : 'none',
                  }} />
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Service info card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id + 'info'}
                className="glass-card rounded-2xl p-6 space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                style={{ borderColor: `${activeService.color}30` }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl">{activeService.icon}</span>
                      <h3 className="text-xl font-black" style={{ fontFamily: 'Orbitron', color: activeService.color }}>
                        {activeService.title}
                      </h3>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed mt-2" style={{ fontFamily: 'Inter' }}>
                      {activeService.desc}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="glass rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1 tracking-widest" style={{ fontFamily: 'Rajdhani' }}>EST. TIME</div>
                    <div className="text-sm font-bold" style={{ color: activeService.color }}>{activeService.time}</div>
                  </div>
                  <div className="glass rounded-lg p-3">
                    <div className="text-xs text-gray-500 mb-1 tracking-widest" style={{ fontFamily: 'Rajdhani' }}>STARTING AT</div>
                    <div className="text-sm font-bold" style={{ color: activeService.color }}>{activeService.price}</div>
                  </div>
                </div>

                <button
                  onClick={(e) => { addRipple(e); document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="relative overflow-hidden w-full py-3 rounded-lg font-bold text-sm tracking-widest uppercase transition-all duration-300"
                  style={{
                    fontFamily: 'Rajdhani',
                    background: `linear-gradient(135deg, ${activeService.color}30, ${activeService.color}15)`,
                    border: `1px solid ${activeService.color}50`,
                    color: activeService.color,
                  }}
                >
                  Book This Service
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

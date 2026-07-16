import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

// 3D Engine components
function EnginePart({
  position,
  rotation,
  color,
  explodeOffset,
  exploded,
  shape,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  color: string;
  explodeOffset: [number, number, number];
  exploded: boolean;
  shape: 'box' | 'cylinder' | 'sphere' | 'torus';
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(Math.random() * 10);

  useFrame((_, delta) => {
    timeRef.current += delta;
    if (!meshRef.current) return;
    const targetX = exploded ? position[0] + explodeOffset[0] : position[0];
    const targetY = exploded ? position[1] + explodeOffset[1] : position[1];
    const targetZ = exploded ? position[2] + explodeOffset[2] : position[2];
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.04);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.04);
    meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, 0.04);
    meshRef.current.rotation.y += delta * 0.3;
  });

  const material = new THREE.MeshStandardMaterial({
    color: new THREE.Color(color),
    metalness: 0.9,
    roughness: 0.2,
    envMapIntensity: 2,
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} material={material} castShadow>
      {shape === 'box' && <boxGeometry args={[0.3, 0.3, 0.3]} />}
      {shape === 'cylinder' && <cylinderGeometry args={[0.1, 0.12, 0.4, 16]} />}
      {shape === 'sphere' && <sphereGeometry args={[0.12, 16, 16]} />}
      {shape === 'torus' && <torusGeometry args={[0.15, 0.04, 8, 24]} />}
    </mesh>
  );
}

function EngineCore({ exploded }: { exploded: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

  useFrame((_, delta) => {
    timeRef.current += delta;
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  const parts = [
    { position: [0, 0, 0] as [number, number, number], rotation: [0, 0, 0] as [number, number, number], color: '#4B5563', explodeOffset: [0, 0, 0] as [number, number, number], shape: 'box' as const },
    { position: [0, 0.4, 0] as [number, number, number], rotation: [0, 0, 0] as [number, number, number], color: '#6B7280', explodeOffset: [0, 0.8, 0] as [number, number, number], shape: 'cylinder' as const },
    { position: [0.3, 0.2, 0] as [number, number, number], rotation: [0, 0, 0] as [number, number, number], color: '#3B82F6', explodeOffset: [1, 0.5, 0] as [number, number, number], shape: 'cylinder' as const },
    { position: [-0.3, 0.2, 0] as [number, number, number], rotation: [0, 0, 0] as [number, number, number], color: '#3B82F6', explodeOffset: [-1, 0.5, 0] as [number, number, number], shape: 'cylinder' as const },
    { position: [0.3, -0.2, 0] as [number, number, number], rotation: [0, 0, 0] as [number, number, number], color: '#3B82F6', explodeOffset: [1, -0.5, 0] as [number, number, number], shape: 'cylinder' as const },
    { position: [-0.3, -0.2, 0] as [number, number, number], rotation: [0, 0, 0] as [number, number, number], color: '#3B82F6', explodeOffset: [-1, -0.5, 0] as [number, number, number], shape: 'cylinder' as const },
    { position: [0, -0.4, 0] as [number, number, number], rotation: [0, 0, 0] as [number, number, number], color: '#9CA3AF', explodeOffset: [0, -1, 0] as [number, number, number], shape: 'cylinder' as const },
    { position: [0, 0, 0.4] as [number, number, number], rotation: [Math.PI / 2, 0, 0] as [number, number, number], color: '#00E5FF', explodeOffset: [0, 0, 1.2] as [number, number, number], shape: 'torus' as const },
    { position: [0, 0, -0.4] as [number, number, number], rotation: [Math.PI / 2, 0, 0] as [number, number, number], color: '#00E5FF', explodeOffset: [0, 0, -1.2] as [number, number, number], shape: 'torus' as const },
    { position: [0.5, 0, 0.2] as [number, number, number], rotation: [0, 0, 0] as [number, number, number], color: '#E5E7EB', explodeOffset: [1.5, 0.3, 0.5] as [number, number, number], shape: 'sphere' as const },
    { position: [-0.5, 0, 0.2] as [number, number, number], rotation: [0, 0, 0] as [number, number, number], color: '#E5E7EB', explodeOffset: [-1.5, 0.3, 0.5] as [number, number, number], shape: 'sphere' as const },
    { position: [0, 0.1, 0.5] as [number, number, number], rotation: [0, 0, 0] as [number, number, number], color: '#374151', explodeOffset: [0.3, 0.5, 1.5] as [number, number, number], shape: 'box' as const },
  ];

  return (
    <group ref={groupRef}>
      {parts.map((part, i) => (
        <EnginePart key={i} {...part} exploded={exploded} />
      ))}
      {/* Center glow */}
      <pointLight position={[0, 0, 0]} color="#3B82F6" intensity={exploded ? 0.5 : 2} distance={3} />
    </group>
  );
}

const features = [
  {
    icon: '🏠',
    title: 'Doorstep Servicing',
    desc: 'Our certified mechanics come to your location — home, office, or anywhere.',
  },
  {
    icon: '🔧',
    title: 'Certified Mechanics',
    desc: 'All mechanics are background-checked, certified, and trained on modern vehicles.',
  },
  {
    icon: '⚡',
    title: 'Quick Response',
    desc: 'Average dispatch time under 15 minutes with real-time tracking.',
  },
  {
    icon: '🛡️',
    title: 'Reliable Maintenance',
    desc: 'Genuine parts, transparent pricing, and documented service history.',
  },
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const controls = useAnimation();
  const [exploded, setExploded] = useState(false);

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
      const timer = setTimeout(() => setExploded(true), 1000);
      const timer2 = setTimeout(() => setExploded(false), 3500);
      const timer3 = setTimeout(() => setExploded(true), 5500);
      const timer4 = setTimeout(() => setExploded(false), 8000);
      return () => { clearTimeout(timer); clearTimeout(timer2); clearTimeout(timer3); clearTimeout(timer4); };
    }
  }, [isInView]);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  return (
    <section id="about" ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.05) 0%, transparent 70%)' }} />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-tag mb-4 block">About UVSS</span>
          <div className="neon-line w-24 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6" style={{ fontFamily: 'Orbitron' }}>
            <span className="metallic-text">Engineering</span>{' '}
            <span className="gradient-text">Excellence</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base leading-relaxed" style={{ fontFamily: 'Rajdhani' }}>
            We combine cutting-edge technology with certified expertise to redefine automobile servicing. Every component, every system — engineered for your peace of mind.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* 3D Engine Canvas */}
          <motion.div
            className="relative h-[450px] rounded-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="absolute inset-0 glass-card rounded-2xl" />
            <Canvas camera={{ position: [0, 0, 3], fov: 50 }} dpr={[1, 1.5]}>
              <ambientLight intensity={0.3} />
              <directionalLight position={[5, 5, 5]} intensity={2} />
              <Environment preset="city" />
              <Float speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
                <EngineCore exploded={exploded} />
              </Float>
            </Canvas>

            {/* Overlay labels */}
            {exploded && (
              <>
                <motion.div
                  className="absolute top-6 left-6 glass px-3 py-2 rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="text-xs text-cyan-400 font-mono">CYLINDER BLOCK</div>
                  <div className="text-xs text-gray-500 mt-0.5">6.2L V8 Configuration</div>
                </motion.div>
                <motion.div
                  className="absolute top-6 right-6 glass px-3 py-2 rounded-lg"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="text-xs text-blue-400 font-mono">TURBOCHARGER</div>
                  <div className="text-xs text-gray-500 mt-0.5">Twin-scroll system</div>
                </motion.div>
                <motion.div
                  className="absolute bottom-6 left-6 glass px-3 py-2 rounded-lg"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <div className="text-xs text-cyan-400 font-mono">CRANKSHAFT</div>
                  <div className="text-xs text-gray-500 mt-0.5">Forged steel alloy</div>
                </motion.div>
                <motion.div
                  className="absolute bottom-6 right-6 glass px-3 py-2 rounded-lg"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 }}
                >
                  <div className="text-xs text-blue-400 font-mono">EXHAUST MANIFOLD</div>
                  <div className="text-xs text-gray-500 mt-0.5">Heat-resistant ceramic</div>
                </motion.div>
              </>
            )}

            {/* Status indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${exploded ? 'bg-cyan-400 pulse-glow' : 'bg-blue-500'} transition-colors`} />
              <span className="text-xs text-gray-500 tracking-widest" style={{ fontFamily: 'Orbitron' }}>
                {exploded ? 'EXPLODED VIEW' : 'ASSEMBLED'}
              </span>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate={controls}
          >
            {features.map((feature, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="glass-card rounded-xl p-6 group card-hover"
              >
                <div className="flex gap-4 items-start">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)' }}
                  >
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2 text-white group-hover:text-cyan-400 transition-colors" style={{ fontFamily: 'Rajdhani', letterSpacing: '1px' }}>
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed" style={{ fontFamily: 'Inter' }}>
                      {feature.desc}
                    </p>
                  </div>
                </div>
                {/* Progress line */}
                <div className="mt-4 h-px bg-gray-800 relative overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0"
                    style={{ background: 'linear-gradient(90deg, #3B82F6, #00E5FF)' }}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${75 + i * 5}%` } : {}}
                    transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

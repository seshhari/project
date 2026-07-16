import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Float, Stars, MeshReflectorMaterial } from '@react-three/drei';
import * as THREE from 'three';

// 3D Car component
function LuxuryCar({ mouse }: { mouse: { x: number; y: number } }) {
  const groupRef = useRef<THREE.Group>(null);
  const wheelsRef = useRef<THREE.Group[]>([]);
  const headlightsRef = useRef<THREE.Mesh[]>([]);
  const carBodyRef = useRef<THREE.Group>(null);
  const timeRef = useRef(0);

  useFrame((_state, delta) => {
    timeRef.current += delta;
    if (!groupRef.current) return;

    // Camera/group subtle rotation based on mouse
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      mouse.x * 0.3 + Math.sin(timeRef.current * 0.2) * 0.1,
      0.05
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      mouse.y * 0.1,
      0.05
    );

    // Wheel rotation
    wheelsRef.current.forEach(wheel => {
      if (wheel) wheel.rotation.x += delta * 0.5;
    });

    // Headlights pulse
    headlightsRef.current.forEach(light => {
      if (light && light.material) {
        const mat = light.material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity = 2 + Math.sin(timeRef.current * 2) * 0.3;
      }
    });
  });

  const setWheelRef = useCallback((el: THREE.Group | null, i: number) => {
    if (el) wheelsRef.current[i] = el;
  }, []);

  const setHeadlightRef = useCallback((el: THREE.Mesh | null, i: number) => {
    if (el) headlightsRef.current[i] = el;
  }, []);

  // Car body color - metallic dark blue
  const bodyMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#0f1729'),
    metalness: 0.95,
    roughness: 0.1,
    envMapIntensity: 2,
  });

  const chromeMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#E5E7EB'),
    metalness: 1,
    roughness: 0.05,
    envMapIntensity: 3,
  });

  const glassMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#1a2a4a'),
    metalness: 0.1,
    roughness: 0,
    opacity: 0.4,
    transparent: true,
    envMapIntensity: 2,
  });

  const tireMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#111'),
    metalness: 0,
    roughness: 0.9,
  });

  const rimMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#888'),
    metalness: 1,
    roughness: 0.2,
  });

  const headlightMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#ffffff'),
    emissive: new THREE.Color('#00E5FF'),
    emissiveIntensity: 3,
    metalness: 0.1,
    roughness: 0.1,
  });

  const taillightMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#ff0000'),
    emissive: new THREE.Color('#ff0000'),
    emissiveIntensity: 2,
    transparent: true,
    opacity: 0.9,
  });

  // Wheel component
  const Wheel = ({ position, index }: { position: [number, number, number]; index: number }) => (
    <group ref={(el) => setWheelRef(el, index)} position={position}>
      {/* Tire */}
      <mesh material={tireMaterial}>
        <torusGeometry args={[0.32, 0.14, 16, 32]} />
      </mesh>
      {/* Rim */}
      <mesh material={rimMaterial}>
        <cylinderGeometry args={[0.22, 0.22, 0.15, 8]} />
      </mesh>
      {/* Spokes */}
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <mesh
          key={angle}
          material={chromeMaterial}
          rotation={[0, 0, (angle * Math.PI) / 180]}
        >
          <boxGeometry args={[0.4, 0.04, 0.04]} />
        </mesh>
      ))}
      {/* Center cap */}
      <mesh material={chromeMaterial} position={[0, 0, 0.08]}>
        <cylinderGeometry args={[0.06, 0.06, 0.02, 16]} />
      </mesh>
    </group>
  );

  return (
    <group ref={groupRef}>
      {/* Main car body */}
      <group ref={carBodyRef}>
        {/* Lower body */}
        <mesh material={bodyMaterial} position={[0, 0.1, 0]}>
          <boxGeometry args={[2.4, 0.45, 1.1]} />
        </mesh>

        {/* Upper cabin */}
        <mesh material={bodyMaterial} position={[0, 0.5, 0]}>
          <boxGeometry args={[1.6, 0.35, 0.95]} />
        </mesh>

        {/* Hood */}
        <mesh material={bodyMaterial} position={[0.85, 0.2, 0]} rotation={[0, 0, -0.1]}>
          <boxGeometry args={[0.7, 0.12, 1.05]} />
        </mesh>

        {/* Trunk */}
        <mesh material={bodyMaterial} position={[-0.85, 0.2, 0]} rotation={[0, 0, 0.08]}>
          <boxGeometry args={[0.7, 0.1, 1.05]} />
        </mesh>

        {/* Front bumper */}
        <mesh material={bodyMaterial} position={[1.2, 0.0, 0]}>
          <boxGeometry args={[0.1, 0.3, 1.05]} />
        </mesh>

        {/* Rear bumper */}
        <mesh material={bodyMaterial} position={[-1.2, 0.0, 0]}>
          <boxGeometry args={[0.1, 0.3, 1.05]} />
        </mesh>

        {/* Windshield */}
        <mesh material={glassMaterial} position={[0.5, 0.47, 0]} rotation={[0, 0, -0.4]}>
          <boxGeometry args={[0.5, 0.3, 0.9]} />
        </mesh>

        {/* Rear window */}
        <mesh material={glassMaterial} position={[-0.5, 0.47, 0]} rotation={[0, 0, 0.4]}>
          <boxGeometry args={[0.5, 0.3, 0.9]} />
        </mesh>

        {/* Side windows */}
        <mesh material={glassMaterial} position={[0, 0.5, 0.48]}>
          <boxGeometry args={[1.4, 0.28, 0.02]} />
        </mesh>
        <mesh material={glassMaterial} position={[0, 0.5, -0.48]}>
          <boxGeometry args={[1.4, 0.28, 0.02]} />
        </mesh>

        {/* Chrome trim */}
        <mesh material={chromeMaterial} position={[0, 0.33, 0.55]}>
          <boxGeometry args={[2.3, 0.02, 0.01]} />
        </mesh>
        <mesh material={chromeMaterial} position={[0, 0.33, -0.55]}>
          <boxGeometry args={[2.3, 0.02, 0.01]} />
        </mesh>

        {/* Headlights */}
        <mesh
          ref={(el) => setHeadlightRef(el, 0)}
          material={headlightMaterial}
          position={[1.21, 0.15, 0.35]}
        >
          <boxGeometry args={[0.02, 0.1, 0.2]} />
        </mesh>
        <mesh
          ref={(el) => setHeadlightRef(el, 1)}
          material={headlightMaterial}
          position={[1.21, 0.15, -0.35]}
        >
          <boxGeometry args={[0.02, 0.1, 0.2]} />
        </mesh>

        {/* Taillights */}
        <mesh material={taillightMaterial} position={[-1.21, 0.15, 0.35]}>
          <boxGeometry args={[0.02, 0.1, 0.25]} />
        </mesh>
        <mesh material={taillightMaterial} position={[-1.21, 0.15, -0.35]}>
          <boxGeometry args={[0.02, 0.1, 0.25]} />
        </mesh>

        {/* Grille */}
        {[-0.12, 0, 0.12].map((z) => (
          <mesh key={z} material={chromeMaterial} position={[1.22, 0.05, z]}>
            <boxGeometry args={[0.02, 0.15, 0.04]} />
          </mesh>
        ))}

        {/* Roof antenna */}
        <mesh material={chromeMaterial} position={[-0.3, 0.68, 0]}>
          <cylinderGeometry args={[0.005, 0.005, 0.15, 8]} />
        </mesh>

        {/* Side mirrors */}
        <mesh material={bodyMaterial} position={[0.55, 0.42, 0.56]}>
          <boxGeometry args={[0.15, 0.06, 0.04]} />
        </mesh>
        <mesh material={bodyMaterial} position={[0.55, 0.42, -0.56]}>
          <boxGeometry args={[0.15, 0.06, 0.04]} />
        </mesh>

        {/* Door handles */}
        <mesh material={chromeMaterial} position={[0.1, 0.28, 0.56]}>
          <boxGeometry args={[0.15, 0.03, 0.02]} />
        </mesh>
        <mesh material={chromeMaterial} position={[-0.3, 0.28, 0.56]}>
          <boxGeometry args={[0.15, 0.03, 0.02]} />
        </mesh>
        <mesh material={chromeMaterial} position={[0.1, 0.28, -0.56]}>
          <boxGeometry args={[0.15, 0.03, 0.02]} />
        </mesh>
        <mesh material={chromeMaterial} position={[-0.3, 0.28, -0.56]}>
          <boxGeometry args={[0.15, 0.03, 0.02]} />
        </mesh>

        {/* Exhaust */}
        <mesh material={chromeMaterial} position={[-1.22, -0.08, 0.3]}>
          <cylinderGeometry args={[0.04, 0.045, 0.06, 16]} />
        </mesh>
        <mesh material={chromeMaterial} position={[-1.22, -0.08, -0.3]}>
          <cylinderGeometry args={[0.04, 0.045, 0.06, 16]} />
        </mesh>
      </group>

      {/* Wheels */}
      <Wheel position={[0.85, -0.25, 0.58]} index={0} />
      <Wheel position={[0.85, -0.25, -0.58]} index={1} />
      <Wheel position={[-0.85, -0.25, 0.58]} index={2} />
      <Wheel position={[-0.85, -0.25, -0.58]} index={3} />

      {/* Lights */}
      <pointLight position={[1.5, 0.5, 0.5]} color="#00E5FF" intensity={3} distance={3} />
      <pointLight position={[1.5, 0.5, -0.5]} color="#00E5FF" intensity={3} distance={3} />
      <pointLight position={[-1.5, 0.3, 0]} color="#ff2200" intensity={2} distance={2} />
      <pointLight position={[0, 2, 0]} color="#3B82F6" intensity={1} distance={4} />
    </group>
  );
}

// Floor reflection
function ReflectiveFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.57, 0]}>
      <planeGeometry args={[20, 20]} />
      <MeshReflectorMaterial
        blur={[300, 100]}
        resolution={512}
        mixBlur={0.8}
        mixStrength={40}
        roughness={0.5}
        depthScale={1.2}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#050505"
        metalness={0.8}
        mirror={0.5}
      />
    </mesh>
  );
}

// Smoke particles around tires
function TireSmoke({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Points>(null);
  const timeRef = useRef(0);

  const particles = 20;
  const positions = new Float32Array(particles * 3);
  for (let i = 0; i < particles; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 0.2;
    positions[i * 3 + 1] = Math.random() * 0.2;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 0.2;
  }

  useFrame((_, delta) => {
    timeRef.current += delta;
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(timeRef.current * 0.5) * 0.02;
      const mat = meshRef.current.material as THREE.PointsMaterial;
      mat.opacity = 0.15 + Math.sin(timeRef.current * 0.8) * 0.05;
    }
  });

  return (
    <points ref={meshRef} position={position}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.06} color="#888888" opacity={0.15} transparent sizeAttenuation />
    </points>
  );
}

// Holographic panels
function HoloPanel({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const timeRef = useRef(Math.random() * 10);

  useFrame((_, delta) => {
    timeRef.current += delta;
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(timeRef.current * 0.5) * 0.05;
      const mat = meshRef.current.material as THREE.MeshStandardMaterial;
      mat.opacity = 0.3 + Math.sin(timeRef.current * 1.5) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <planeGeometry args={[0.8, 0.5]} />
      <meshStandardMaterial
        color="#3B82F6"
        emissive="#00E5FF"
        emissiveIntensity={0.5}
        opacity={0.3}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Light beam
function LightBeam({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  const time = useRef(Math.random() * 10);

  useFrame((_, delta) => {
    time.current += delta * 0.3;
    if (ref.current) {
      ref.current.rotation.y = time.current;
      const mat = ref.current.material as THREE.MeshStandardMaterial;
      mat.opacity = 0.03 + Math.sin(time.current) * 0.01;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <coneGeometry args={[0.5, 8, 16, 1, true]} />
      <meshStandardMaterial
        color="#3B82F6"
        emissive="#00E5FF"
        emissiveIntensity={1}
        opacity={0.04}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function SceneContent({ mouse }: { mouse: { x: number; y: number } }) {
  const { camera } = useThree();
  const time = useRef(0);

  useFrame((_, delta) => {
    time.current += delta;
    // Camera cinematic movement
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.x * 0.5 + Math.sin(time.current * 0.2) * 0.3, 0.03);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouse.y * 0.3 + 1.2 + Math.sin(time.current * 0.15) * 0.1, 0.03);
    camera.lookAt(0, 0.1, 0);
  });

  return (
    <>
      <Stars radius={100} depth={50} count={2000} factor={3} saturation={0} fade speed={1} />
      <Environment preset="city" />
      <ambientLight intensity={0.2} />
      <directionalLight position={[5, 8, 3]} intensity={2} color="#ffffff" castShadow />
      <pointLight position={[0, 5, 0]} intensity={1} color="#3B82F6" />
      <pointLight position={[-5, 2, -3]} intensity={0.5} color="#00E5FF" />
      <spotLight position={[0, 10, 0]} intensity={3} angle={0.3} penumbra={0.8} color="#ffffff" castShadow />

      {/* Floor grid lines */}
      <gridHelper args={[20, 20, '#3B82F6', '#111827']} position={[0, -0.57, 0]} />

      <ReflectiveFloor />
      <LuxuryCar mouse={mouse} />

      {/* Tire smoke */}
      <TireSmoke position={[0.85, -0.55, 0.58]} />
      <TireSmoke position={[0.85, -0.55, -0.58]} />
      <TireSmoke position={[-0.85, -0.55, 0.58]} />
      <TireSmoke position={[-0.85, -0.55, -0.58]} />

      {/* Holographic panels */}
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
        <HoloPanel position={[-3, 1.2, -1]} rotation={[0, 0.4, 0]} />
      </Float>
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.4}>
        <HoloPanel position={[3, 0.8, -1]} rotation={[0, -0.4, 0]} />
      </Float>
      <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.2}>
        <HoloPanel position={[-3.5, 0.5, 0.5]} rotation={[0, 0.6, 0]} />
      </Float>

      {/* Light beams */}
      <LightBeam position={[-4, 4, -3]} />
      <LightBeam position={[4, 4, -3]} />
      <LightBeam position={[0, 6, -5]} />
    </>
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

export default function HeroSection() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [typeText, setTypeText] = useState('');
  const fullText = 'Professional Mechanics. Delivered to Your Doorstep.';
  const typeRef = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -((e.clientY / window.innerHeight) * 2 - 1),
      });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (typeRef.current < fullText.length) {
      const timeout = setTimeout(() => {
        setTypeText(fullText.slice(0, typeRef.current + 1));
        typeRef.current++;
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [typeText]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative w-full h-screen overflow-hidden">
      {/* 3D Canvas */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 1.2, 4.5], fov: 50 }}
          gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
          dpr={[1, 1.5]}
          shadows
        >
          <SceneContent mouse={mouse} />
        </Canvas>
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(5,5,5,0.3) 0%, transparent 30%, transparent 60%, rgba(5,5,5,0.9) 100%)' }} />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(5,5,5,0.7) 0%, transparent 40%, transparent 60%, rgba(5,5,5,0.7) 100%)' }} />
      </div>

      {/* Ambient light beams */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute top-0 w-32 h-full opacity-5"
            style={{
              left: `${15 + i * 25}%`,
              background: 'linear-gradient(180deg, #00E5FF, transparent)',
              animation: `beam-sweep ${8 + i * 2}s ease-in-out ${i * 2}s infinite`,
              transform: 'skewX(-15deg)',
            }}
          />
        ))}
      </div>

      {/* Hero content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-24 px-8 md:px-16 max-w-7xl mx-auto">
        {/* Badge */}
        <motion.div
          className="flex items-center gap-3 mb-6"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="w-2 h-2 rounded-full bg-cyan-400 pulse-glow" />
          <span className="text-xs tracking-[4px] text-cyan-400 uppercase" style={{ fontFamily: 'Rajdhani', fontWeight: 600 }}>
            Now Available 24×7
          </span>
          <div className="flex-1 h-px max-w-xs" style={{ background: 'linear-gradient(90deg, rgba(0,229,255,0.5), transparent)' }} />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-6 max-w-4xl"
          style={{ fontFamily: 'Orbitron' }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <span className="metallic-text">
            {typeText}
          </span>
          {typeText.length < fullText.length && <span className="typewriter-cursor" />}
        </motion.h1>

        {/* Subheading */}
        <motion.p
          className="text-base md:text-lg text-gray-400 max-w-xl mb-10 leading-relaxed"
          style={{ fontFamily: 'Rajdhani', fontWeight: 400, letterSpacing: '0.5px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          Fast, trusted, and reliable vehicle servicing wherever you are. Certified mechanics at your doorstep in minutes.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <button
            className="btn-primary relative overflow-hidden"
            onClick={(e) => { addRipple(e); setTimeout(() => scrollTo('booking'), 100); }}
          >
            Book a Service
          </button>
          <button
            className="btn-outline relative overflow-hidden"
            onClick={(e) => { addRipple(e); setTimeout(() => scrollTo('services'), 100); }}
          >
            Explore Services
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="flex flex-wrap gap-6 mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          {[
            { value: '500+', label: 'Mechanics', color: '#3B82F6' },
            { value: '15min', label: 'Avg Response', color: '#00E5FF' },
            { value: '50+', label: 'Cities', color: '#3B82F6' },
            { value: '99%', label: 'Satisfaction', color: '#00E5FF' },
          ].map((stat, i) => (
            <div key={stat.label} className="text-center relative group">
              <div
                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `${stat.color}10`, boxShadow: `0 0 20px ${stat.color}20` }}
              />
              <div className="relative px-4 py-2">
                <div className="text-xl md:text-2xl font-black" style={{ fontFamily: 'Orbitron', color: i % 2 === 0 ? '#3B82F6' : '#00E5FF' }}>{stat.value}</div>
                <div className="text-xs text-gray-500 tracking-widest uppercase mt-0.5" style={{ fontFamily: 'Rajdhani' }}>{stat.label}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
      >
        <span className="text-xs tracking-[3px] text-gray-600 uppercase" style={{ fontFamily: 'Rajdhani' }}>Scroll</span>
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-transparent via-cyan-400 to-transparent"
          animate={{ scaleY: [0, 1, 0], opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      {/* HUD decorations - top right */}
      <div className="absolute top-24 right-8 opacity-30 pointer-events-none hidden lg:block">
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          <circle cx="60" cy="60" r="50" stroke="#3B82F6" strokeWidth="0.5" strokeDasharray="5,5">
            <animateTransform attributeName="transform" type="rotate" from="0 60 60" to="360 60 60" dur="20s" repeatCount="indefinite" />
          </circle>
          <circle cx="60" cy="60" r="35" stroke="#00E5FF" strokeWidth="0.5" strokeDasharray="3,8">
            <animateTransform attributeName="transform" type="rotate" from="360 60 60" to="0 60 60" dur="15s" repeatCount="indefinite" />
          </circle>
          <circle cx="60" cy="60" r="4" fill="#00E5FF" />
          <line x1="60" y1="10" x2="60" y2="30" stroke="#00E5FF" strokeWidth="0.5" />
          <line x1="110" y1="60" x2="90" y2="60" stroke="#00E5FF" strokeWidth="0.5" />
          <text x="60" y="100" textAnchor="middle" fill="#3B82F6" fontSize="6" fontFamily="Orbitron">UVSS HUD</text>
        </svg>
      </div>

      {/* Left panel HUD */}
      <motion.div
        className="absolute left-6 top-1/2 -translate-y-1/2 pointer-events-none hidden xl:block"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.5 }}
      >
        <div className="glass px-3 py-4 rounded-lg space-y-4" style={{ border: '1px solid rgba(0,229,255,0.1)' }}>
          {[
            { label: 'ENGINE', value: 'V8 TURBO', active: true },
            { label: 'DRIVE', value: 'ALL-WHEEL', active: false },
            { label: 'MODE', value: 'SPORT+', active: true },
            { label: 'STATUS', value: 'READY', active: true },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div className="text-xs text-gray-600 tracking-widest" style={{ fontFamily: 'Orbitron', fontSize: '7px' }}>{item.label}</div>
              <div className="text-xs font-bold mt-0.5" style={{ fontFamily: 'Orbitron', fontSize: '8px', color: item.active ? '#00E5FF' : '#3B82F6' }}>{item.value}</div>
            </div>
          ))}
          <div className="w-px h-6 bg-gradient-to-b from-cyan-400 to-transparent mx-auto" />
        </div>
      </motion.div>
    </section>
  );
}

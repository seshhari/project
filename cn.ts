@import "tailwindcss";

:root {
  --bg-primary: #050505;
  --bg-secondary: #111827;
  --accent-blue: #3B82F6;
  --accent-cyan: #00E5FF;
  --accent-silver: #E5E7EB;
  --white: #FFFFFF;
  --font-display: 'Orbitron', sans-serif;
  --font-body: 'Inter', sans-serif;
  --font-accent: 'Rajdhani', sans-serif;
}

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  overflow-x: hidden;
}

body {
  background-color: #050505;
  color: #FFFFFF;
  font-family: 'Inter', sans-serif;
  overflow-x: hidden;
  cursor: none;
}

/* Selection style */
::selection {
  background: rgba(0, 229, 255, 0.2);
  color: #00E5FF;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 4px;
}
::-webkit-scrollbar-track {
  background: #050505;
}
::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #3B82F6, #00E5FF);
  border-radius: 2px;
}
::-webkit-scrollbar-thumb:hover {
  background: #00E5FF;
}

/* Custom cursor */
.cursor-dot {
  position: fixed;
  width: 8px;
  height: 8px;
  background: #00E5FF;
  border-radius: 50%;
  pointer-events: none;
  z-index: 99999;
  transform: translate(-50%, -50%);
  transition: width 0.2s, height 0.2s, background 0.2s;
  mix-blend-mode: screen;
  box-shadow: 0 0 10px #00E5FF, 0 0 20px #00E5FF;
}

.cursor-ring {
  position: fixed;
  width: 36px;
  height: 36px;
  border: 1.5px solid rgba(0, 229, 255, 0.6);
  border-radius: 50%;
  pointer-events: none;
  z-index: 99998;
  transform: translate(-50%, -50%);
  transition: width 0.3s ease, height 0.3s ease, border-color 0.3s ease, transform 0.1s ease;
}

.cursor-ring.hovering {
  width: 60px;
  height: 60px;
  border-color: #3B82F6;
  background: rgba(59, 130, 246, 0.05);
}

/* Glass morphism */
.glass {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.glass-card {
  background: rgba(17, 24, 39, 0.6);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border: 1px solid rgba(59, 130, 246, 0.2);
  box-shadow: 0 0 40px rgba(59, 130, 246, 0.05), inset 0 0 40px rgba(0, 0, 0, 0.3);
}

/* Metallic text */
.metallic-text {
  background: linear-gradient(135deg, #E5E7EB 0%, #FFFFFF 30%, #9CA3AF 50%, #FFFFFF 70%, #E5E7EB 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.gradient-text {
  background: linear-gradient(135deg, #3B82F6 0%, #00E5FF 50%, #3B82F6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% auto;
  animation: gradient-shift 3s linear infinite;
}

@keyframes gradient-shift {
  0% { background-position: 0% center; }
  100% { background-position: 200% center; }
}

/* Glow effects */
.glow-blue {
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.4), 0 0 60px rgba(59, 130, 246, 0.2);
}

.glow-cyan {
  box-shadow: 0 0 20px rgba(0, 229, 255, 0.4), 0 0 60px rgba(0, 229, 255, 0.2);
}

.text-glow-blue {
  text-shadow: 0 0 20px rgba(59, 130, 246, 0.8), 0 0 40px rgba(59, 130, 246, 0.4);
}

.text-glow-cyan {
  text-shadow: 0 0 20px rgba(0, 229, 255, 0.8), 0 0 40px rgba(0, 229, 255, 0.4);
}

/* Scan line effect */
.scan-line {
  position: relative;
  overflow: hidden;
}

.scan-line::after {
  content: '';
  position: absolute;
  top: -100%;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #00E5FF, transparent);
  animation: scan 3s linear infinite;
}

@keyframes scan {
  0% { top: -2px; }
  100% { top: 100%; }
}

/* Holographic border */
.holo-border {
  position: relative;
  border: 1px solid transparent;
  background: linear-gradient(#111827, #111827) padding-box,
              linear-gradient(135deg, #3B82F6, #00E5FF, #3B82F6) border-box;
}

/* Particle canvas */
#particle-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

/* Noise texture overlay */
.noise-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 2;
  opacity: 0.4;
}

/* Magnetic button */
.magnetic-btn {
  transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  will-change: transform;
}

/* Loading screen */
.loading-screen {
  position: fixed;
  inset: 0;
  z-index: 99999;
  background: #050505;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

/* Ripple effect */
@keyframes ripple-out {
  0% { transform: scale(0); opacity: 1; }
  100% { transform: scale(4); opacity: 0; }
}

.ripple {
  position: absolute;
  border-radius: 50%;
  background: rgba(0, 229, 255, 0.3);
  animation: ripple-out 0.8s ease-out forwards;
  pointer-events: none;
}

/* Float animation */
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-15px) rotate(1deg); }
  66% { transform: translateY(-8px) rotate(-1deg); }
}

.float-anim {
  animation: float 6s ease-in-out infinite;
}

/* Pulse glow */
@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(0, 229, 255, 0.3); }
  50% { box-shadow: 0 0 40px rgba(0, 229, 255, 0.7), 0 0 80px rgba(0, 229, 255, 0.3); }
}

.pulse-glow {
  animation: pulse-glow 2s ease-in-out infinite;
}

/* Gear rotation */
@keyframes gear-rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes gear-rotate-reverse {
  from { transform: rotate(0deg); }
  to { transform: rotate(-360deg); }
}

.gear-anim {
  animation: gear-rotate 8s linear infinite;
}

.gear-anim-reverse {
  animation: gear-rotate-reverse 6s linear infinite;
}

/* Grid lines */
.grid-bg {
  background-image: 
    linear-gradient(rgba(59, 130, 246, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px);
  background-size: 60px 60px;
}

/* Section reveals */
.reveal-up {
  opacity: 0;
  transform: translateY(60px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}

.reveal-up.revealed {
  opacity: 1;
  transform: translateY(0);
}

/* Hologram flicker */
@keyframes holo-flicker {
  0%, 100% { opacity: 1; }
  92% { opacity: 1; }
  93% { opacity: 0.6; }
  94% { opacity: 1; }
  96% { opacity: 0.8; }
  97% { opacity: 1; }
}

.holo-flicker {
  animation: holo-flicker 4s ease-in-out infinite;
}

/* Typewriter cursor */
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.typewriter-cursor {
  display: inline-block;
  width: 3px;
  height: 1em;
  background: #00E5FF;
  margin-left: 4px;
  animation: blink 1s step-end infinite;
  vertical-align: text-bottom;
}

/* Spotlight effect */
.spotlight {
  position: fixed;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.06) 0%, transparent 70%);
  pointer-events: none;
  transform: translate(-50%, -50%);
  z-index: 3;
  transition: opacity 0.3s ease;
}

/* Nav glassmorphism */
.nav-glass {
  background: rgba(5, 5, 5, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(59, 130, 246, 0.1);
}

/* Section headers */
.section-tag {
  font-family: 'Orbitron', sans-serif;
  font-size: 11px;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: #00E5FF;
  display: inline-block;
}

/* Card hover effect */
.card-hover {
  transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.4s ease;
}

.card-hover:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 60px rgba(59, 130, 246, 0.2), 0 0 40px rgba(0, 229, 255, 0.1);
}

/* Animated gradient border */
@keyframes border-rotate {
  0% { --angle: 0deg; }
  100% { --angle: 360deg; }
}

/* Lines decoration */
.line-decoration {
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, #3B82F6, #00E5FF);
  display: inline-block;
}

/* Hero text animation */
@keyframes text-reveal {
  from {
    clip-path: inset(0 100% 0 0);
    opacity: 0;
  }
  to {
    clip-path: inset(0 0% 0 0);
    opacity: 1;
  }
}

/* Ambient light beams */
@keyframes beam-sweep {
  0% { transform: translateX(-100%) skewX(-15deg); opacity: 0; }
  10% { opacity: 0.3; }
  90% { opacity: 0.3; }
  100% { transform: translateX(200%) skewX(-15deg); opacity: 0; }
}

.light-beam {
  animation: beam-sweep 8s ease-in-out infinite;
}

/* Progress bar */
.progress-bar {
  height: 2px;
  background: linear-gradient(90deg, #3B82F6, #00E5FF);
  box-shadow: 0 0 10px #00E5FF;
  transform-origin: left;
}

/* 3D perspective container */
.perspective-container {
  perspective: 1000px;
  perspective-origin: center center;
}

/* Vehicle selector */
.vehicle-tab {
  font-family: 'Rajdhani', sans-serif;
  font-size: 13px;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 8px 20px;
  border: 1px solid rgba(59, 130, 246, 0.3);
  border-radius: 4px;
  transition: all 0.3s ease;
  cursor: none;
}

.vehicle-tab.active {
  background: rgba(59, 130, 246, 0.2);
  border-color: #00E5FF;
  color: #00E5FF;
  box-shadow: 0 0 20px rgba(0, 229, 255, 0.2);
}

/* Input styling */
.premium-input {
  background: rgba(17, 24, 39, 0.8);
  border: 1px solid rgba(59, 130, 246, 0.2);
  color: #fff;
  font-family: 'Inter', sans-serif;
  transition: border-color 0.3s, box-shadow 0.3s;
  width: 100%;
  padding: 14px 16px;
  border-radius: 8px;
  outline: none;
  font-size: 14px;
}

.premium-input:focus {
  border-color: #00E5FF;
  box-shadow: 0 0 0 3px rgba(0, 229, 255, 0.1), 0 0 20px rgba(0, 229, 255, 0.1);
}

.premium-input::placeholder {
  color: rgba(229, 231, 235, 0.3);
}

/* FAQ accordion */
.faq-item {
  border-bottom: 1px solid rgba(59, 130, 246, 0.1);
  overflow: hidden;
}

/* Map pulse */
@keyframes map-pulse {
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(3); opacity: 0; }
}

.map-pulse {
  animation: map-pulse 2s ease-out infinite;
}

/* Orbit animation */
@keyframes orbit {
  from { transform: rotate(0deg) translateX(120px) rotate(0deg); }
  to { transform: rotate(360deg) translateX(120px) rotate(-360deg); }
}

/* Neon line */
.neon-line {
  height: 1px;
  background: linear-gradient(90deg, transparent, #00E5FF, #3B82F6, transparent);
  box-shadow: 0 0 10px #00E5FF;
}

/* Footer gear bg */
.footer-bg {
  background: radial-gradient(ellipse at 50% 100%, rgba(59, 130, 246, 0.08) 0%, transparent 70%);
}

/* Emergency toggle */
.toggle-switch {
  position: relative;
  width: 56px;
  height: 28px;
}

.toggle-switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.toggle-slider {
  position: absolute;
  cursor: none;
  inset: 0;
  background: rgba(59, 130, 246, 0.2);
  border: 1px solid rgba(59, 130, 246, 0.4);
  border-radius: 28px;
  transition: 0.4s;
}

.toggle-slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 3px;
  bottom: 3px;
  background: #3B82F6;
  border-radius: 50%;
  transition: 0.4s;
  box-shadow: 0 0 8px rgba(59, 130, 246, 0.6);
}

input:checked + .toggle-slider {
  background: rgba(0, 229, 255, 0.2);
  border-color: #00E5FF;
}

input:checked + .toggle-slider:before {
  transform: translateX(28px);
  background: #00E5FF;
  box-shadow: 0 0 12px rgba(0, 229, 255, 0.8);
}

/* Animate in classes */
@keyframes slideInLeft {
  from { opacity: 0; transform: translateX(-50px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes slideInRight {
  from { opacity: 0; transform: translateX(50px); }
  to { opacity: 1; transform: translateX(0); }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes zoomIn {
  from { opacity: 0; transform: scale(0.8); }
  to { opacity: 1; transform: scale(1); }
}

.anim-slide-left { animation: slideInLeft 0.8s ease forwards; }
.anim-slide-right { animation: slideInRight 0.8s ease forwards; }
.anim-fade-up { animation: fadeInUp 0.8s ease forwards; }
.anim-zoom-in { animation: zoomIn 0.6s ease forwards; }

/* Speed lines */
@keyframes speed-line {
  from { transform: translateX(-100%) scaleX(0); opacity: 0; }
  50% { opacity: 1; }
  to { transform: translateX(200%) scaleX(1); opacity: 0; }
}

.speed-line {
  animation: speed-line 2s ease-in-out infinite;
}

/* City road animation */
@keyframes road-dash {
  from { stroke-dashoffset: 1000; }
  to { stroke-dashoffset: 0; }
}

/* Mechanic icon float */
@keyframes mechanic-move {
  0% { transform: translateX(0) translateY(0); }
  25% { transform: translateX(30%) translateY(-10%); }
  50% { transform: translateX(60%) translateY(5%); }
  75% { transform: translateX(40%) translateY(-5%); }
  100% { transform: translateX(70%) translateY(0); }
}

/* ETA countdown */
@keyframes countdown-tick {
  from { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.countdown-tick {
  animation: countdown-tick 1s ease-in-out infinite;
}

/* Section separator */
.section-separator {
  position: relative;
  height: 1px;
  overflow: visible;
}

.section-separator::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 8px;
  height: 8px;
  background: #00E5FF;
  border-radius: 50%;
  box-shadow: 0 0 12px #00E5FF;
}

/* Shimmer overlay for cards */
.shimmer-overlay {
  position: relative;
  overflow: hidden;
}

.shimmer-overlay::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent);
  animation: shimmer-move 4s ease-in-out infinite;
}

@keyframes shimmer-move {
  0% { left: -100%; }
  100% { left: 200%; }
}

/* Gradient border animation */
.gradient-border {
  position: relative;
  border-radius: 16px;
}

.gradient-border::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: 17px;
  background: linear-gradient(135deg, #3B82F6, #00E5FF, #3B82F6);
  background-size: 200% 200%;
  animation: gradient-rotate 4s linear infinite;
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.gradient-border:hover::before {
  opacity: 1;
}

@keyframes gradient-rotate {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Tech text style */
.tech-text {
  font-family: 'Orbitron', monospace;
  letter-spacing: 3px;
  text-transform: uppercase;
}

/* Holographic card */
.holo-card {
  background: linear-gradient(135deg, rgba(17,24,39,0.9) 0%, rgba(5,5,5,0.9) 100%);
  border: 1px solid rgba(59,130,246,0.2);
  backdrop-filter: blur(20px);
  position: relative;
  overflow: hidden;
}

.holo-card::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: conic-gradient(from 0deg at 50% 50%, transparent 0deg, rgba(0,229,255,0.03) 60deg, transparent 120deg, rgba(59,130,246,0.03) 180deg, transparent 240deg, rgba(0,229,255,0.03) 300deg, transparent 360deg);
  animation: holo-rotate 10s linear infinite;
}

@keyframes holo-rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Vehicle badge */
.vehicle-badge {
  font-family: 'Orbitron', sans-serif;
  font-size: 9px;
  letter-spacing: 3px;
  text-transform: uppercase;
  padding: 4px 10px;
  border-radius: 20px;
  background: rgba(0,229,255,0.1);
  border: 1px solid rgba(0,229,255,0.3);
  color: #00E5FF;
}

/* Cyber line separator */
.cyber-line {
  display: flex;
  align-items: center;
  gap: 16px;
}

.cyber-line::before,
.cyber-line::after {
  content: '';
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(59,130,246,0.5));
}

.cyber-line::after {
  background: linear-gradient(90deg, rgba(59,130,246,0.5), transparent);
}

/* Neon text */
.neon-text-blue {
  color: #3B82F6;
  text-shadow: 0 0 7px #3B82F6, 0 0 10px #3B82F6, 0 0 21px #3B82F6;
}

.neon-text-cyan {
  color: #00E5FF;
  text-shadow: 0 0 7px #00E5FF, 0 0 10px #00E5FF, 0 0 21px #00E5FF;
}

/* Mechanical arm animation */
@keyframes arm-move {
  0% { transform: rotate(0deg); }
  30% { transform: rotate(30deg); }
  60% { transform: rotate(-10deg); }
  100% { transform: rotate(0deg); }
}

/* Data stream */
@keyframes data-stream {
  0% { transform: translateY(-100%); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(100%); opacity: 0; }
}

.data-stream span {
  display: block;
  animation: data-stream 3s linear infinite;
}

/* Custom button styles */
.btn-primary {
  position: relative;
  overflow: hidden;
  font-family: 'Rajdhani', sans-serif;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-size: 13px;
  padding: 16px 36px;
  border-radius: 6px;
  background: linear-gradient(135deg, #3B82F6, #00E5FF);
  color: #050505;
  border: none;
  cursor: none;
  transition: transform 0.3s, box-shadow 0.3s;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 40px rgba(0, 229, 255, 0.4);
}

.btn-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.btn-primary:hover::before {
  left: 100%;
}

.btn-outline {
  position: relative;
  overflow: hidden;
  font-family: 'Rajdhani', sans-serif;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-size: 13px;
  padding: 15px 36px;
  border-radius: 6px;
  background: transparent;
  color: #E5E7EB;
  border: 1px solid rgba(229, 231, 235, 0.3);
  cursor: none;
  transition: all 0.3s ease;
}

.btn-outline:hover {
  border-color: #00E5FF;
  color: #00E5FF;
  background: rgba(0, 229, 255, 0.05);
  box-shadow: 0 0 20px rgba(0, 229, 255, 0.2);
}

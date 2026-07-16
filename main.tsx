import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const features = [
  {
    icon: '🏠',
    title: 'Doorstep Service',
    desc: 'We come to you — home, office, highway. No towing required.',
    color: '#3B82F6',
    stat: '500+',
    statLabel: 'Daily visits',
  },
  {
    icon: '🏆',
    title: 'Certified Mechanics',
    desc: 'All technicians are ASE-certified with background verification.',
    color: '#00E5FF',
    stat: '100%',
    statLabel: 'Verified',
  },
  {
    icon: '⚡',
    title: 'Quick Dispatch',
    desc: 'Our fastest dispatch time is 8 minutes. Average is 15 minutes.',
    color: '#F59E0B',
    stat: '15min',
    statLabel: 'Avg. arrival',
  },
  {
    icon: '💎',
    title: 'Transparent Pricing',
    desc: 'No hidden charges. Get a full quote before work begins.',
    color: '#8B5CF6',
    stat: '0',
    statLabel: 'Hidden fees',
  },
  {
    icon: '🌙',
    title: '24×7 Assistance',
    desc: 'Round-the-clock support for emergencies, any day, any time.',
    color: '#06B6D4',
    stat: '24/7',
    statLabel: 'Available',
  },
  {
    icon: '🔩',
    title: 'Genuine Spare Parts',
    desc: 'OEM and OES certified parts with 6-month warranty.',
    color: '#10B981',
    stat: '6mo',
    statLabel: 'Parts warranty',
  },
  {
    icon: '🛠️',
    title: 'Modern Equipment',
    desc: 'Latest diagnostic tools and precision instruments.',
    color: '#EF4444',
    stat: '200+',
    statLabel: 'Tools carried',
  },
  {
    icon: '🚨',
    title: 'Emergency Support',
    desc: 'Priority emergency response with dedicated dispatch team.',
    color: '#F97316',
    stat: '<10min',
    statLabel: 'Emergency ETA',
  },
];

function FeatureCard({ feature, index }: { feature: typeof features[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)';
  };

  return (
    <motion.div
      ref={cardRef}
      className="glass-card rounded-2xl p-6 group relative overflow-hidden"
      style={{ transition: 'transform 0.1s ease', border: `1px solid ${feature.color}20` }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.08, duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{ background: `radial-gradient(circle at 50% 50%, ${feature.color}08 0%, transparent 70%)` }}
      />

      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${feature.color}, transparent)` }}
      />

      {/* Icon */}
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl mb-5"
        style={{
          background: `${feature.color}15`,
          border: `1px solid ${feature.color}30`,
          boxShadow: `0 0 20px ${feature.color}10`,
        }}
      >
        {feature.icon}
      </div>

      {/* Stat */}
      <div className="text-2xl font-black mb-1" style={{ fontFamily: 'Orbitron', color: feature.color }}>
        {feature.stat}
      </div>
      <div className="text-xs text-gray-500 mb-3 tracking-widest" style={{ fontFamily: 'Rajdhani' }}>
        {feature.statLabel}
      </div>

      {/* Title */}
      <h3 className="text-base font-bold text-white mb-2 group-hover:text-white transition-colors" style={{ fontFamily: 'Rajdhani', letterSpacing: '1px' }}>
        {feature.title}
      </h3>

      {/* Description */}
      <p className="text-gray-500 text-sm leading-relaxed" style={{ fontFamily: 'Inter' }}>
        {feature.desc}
      </p>

      {/* Corner decoration */}
      <div
        className="absolute bottom-3 right-3 w-6 h-6 opacity-20 group-hover:opacity-60 transition-opacity"
        style={{
          border: `1.5px solid ${feature.color}`,
          borderLeft: 'none',
          borderTop: 'none',
        }}
      />
    </motion.div>
  );
}

export default function WhyUsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="why" ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(59,130,246,0.05) 0%, transparent 60%)' }} />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-tag mb-4 block">Why UVSS</span>
          <div className="neon-line w-24 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6" style={{ fontFamily: 'Orbitron' }}>
            <span className="metallic-text">The UVSS</span>{' '}
            <span className="gradient-text">Advantage</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-base" style={{ fontFamily: 'Rajdhani' }}>
            Eight reasons why thousands of vehicle owners trust UVSS for their automotive needs.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>

          {/* Bottom CTA */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="glass-card inline-block rounded-2xl px-12 py-8 text-center" style={{ border: '1px solid rgba(0,229,255,0.15)' }}>
            <div className="text-sm text-gray-500 mb-2" style={{ fontFamily: 'Rajdhani', letterSpacing: '3px' }}>READY FOR PREMIUM SERVICE?</div>
            <div className="text-2xl font-black metallic-text mb-6" style={{ fontFamily: 'Orbitron' }}>Your Vehicle Deserves The Best</div>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary"
              >
                Book Now
              </button>
              <button
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-outline"
              >
                View Services
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

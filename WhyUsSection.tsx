import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { value: 500, suffix: '+', label: 'Certified Mechanics', icon: '👨‍🔧', color: '#3B82F6' },
  { value: 50, suffix: '+', label: 'Cities Covered', icon: '🌆', color: '#00E5FF' },
  { value: 15, suffix: 'min', label: 'Avg. Response Time', icon: '⚡', color: '#F59E0B' },
  { value: 98, suffix: '%', label: 'Customer Satisfaction', icon: '⭐', color: '#10B981' },
  { value: 24, suffix: '/7', label: 'Support Available', icon: '🌙', color: '#8B5CF6' },
  { value: 50000, suffix: '+', label: 'Services Completed', icon: '🔧', color: '#EF4444' },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const hasAnimated = useRef(false);

  if (isInView && !hasAnimated.current && ref.current) {
    hasAnimated.current = true;
    let start = 0;
    const duration = 1500;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start = Math.min(start + step, target);
      if (ref.current) {
        ref.current.textContent = Math.floor(start).toLocaleString() + suffix;
      }
      if (start >= target) clearInterval(timer);
    }, 16);
  }

  return <span ref={ref}>0{suffix}</span>;
}

export default function StatsBar() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });

  return (
    <section ref={sectionRef} className="relative py-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: 'rgba(17,24,39,0.4)' }} />
      <div className="absolute inset-0 grid-bg opacity-10" />

      {/* Top/bottom borders */}
      <div className="absolute top-0 left-0 right-0 neon-line" />
      <div className="absolute bottom-0 left-0 right-0 neon-line" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="text-center group"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}
            >
              {/* Icon */}
              <div
                className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center text-xl mb-3 transition-all duration-300 group-hover:scale-110"
                style={{
                  background: `${stat.color}15`,
                  border: `1px solid ${stat.color}30`,
                }}
              >
                {stat.icon}
              </div>

              {/* Value */}
              <div
                className="text-2xl font-black mb-1"
                style={{ fontFamily: 'Orbitron', color: stat.color }}
              >
                {isInView ? <CountUp target={stat.value} suffix={stat.suffix} /> : `0${stat.suffix}`}
              </div>

              {/* Label */}
              <div className="text-xs text-gray-500 tracking-wider" style={{ fontFamily: 'Rajdhani' }}>
                {stat.label}
              </div>

              {/* Underline */}
              <motion.div
                className="w-0 h-px mx-auto mt-2 group-hover:w-full transition-all duration-500"
                style={{ background: stat.color }}
                whileInView={{ width: '60%' }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 + 0.5, duration: 0.6 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

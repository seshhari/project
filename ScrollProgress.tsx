import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Garage', href: '#configurator' },
  { label: 'Dispatch', href: '#dispatch' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ['hero', 'about', 'services', 'configurator', 'dispatch', 'booking', 'why', 'faq', 'contact'];
      const current = sections.find(id => {
        const el = document.getElementById(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileOpen(false);
  };

  return (
    <>
      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 h-[2px] z-[100]"
        style={{
          width: progressWidth,
          background: 'linear-gradient(90deg, #3B82F6, #00E5FF)',
          boxShadow: '0 0 8px #00E5FF',
        }}
      />

      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
        style={{
          background: scrolled ? 'rgba(5,5,5,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(59,130,246,0.12)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => scrollTo('#hero')} className="flex items-center gap-3 group">
            <div className="relative w-10 h-10">
              <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
                <polygon points="20,2 38,12 38,28 20,38 2,28 2,12" fill="none" stroke="#00E5FF" strokeWidth="1.5" />
                <polygon points="20,8 32,15 32,25 20,32 8,25 8,15" fill="rgba(59,130,246,0.1)" stroke="#3B82F6" strokeWidth="1" />
                <text x="20" y="24" textAnchor="middle" fill="#00E5FF" fontSize="10" fontFamily="Orbitron" fontWeight="700">U</text>
              </svg>
              <div className="absolute inset-0 rounded-full pulse-glow opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div>
              <div className="text-lg font-black tracking-widest gradient-text" style={{ fontFamily: 'Orbitron' }}>UVSS</div>
              <div className="text-[8px] text-gray-500 tracking-[3px] uppercase -mt-1" style={{ fontFamily: 'Rajdhani' }}>Vehicle Service</div>
            </div>
          </button>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="relative text-xs tracking-[2px] uppercase transition-all duration-300 group"
                style={{
                  fontFamily: 'Rajdhani',
                  fontWeight: 500,
                  color: activeSection === link.href.replace('#', '') ? '#00E5FF' : 'rgba(229,231,235,0.6)',
                }}
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                  style={{ background: '#00E5FF', boxShadow: '0 0 6px #00E5FF' }}
                />
                {activeSection === link.href.replace('#', '') && (
                  <span className="absolute -bottom-1 left-0 w-full h-px" style={{ background: '#00E5FF', boxShadow: '0 0 6px #00E5FF' }} />
                )}
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => scrollTo('#booking')}
              className="btn-primary text-xs"
            >
              Book Service
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                className="w-6 h-px bg-gray-300"
                animate={{
                  rotate: mobileOpen ? (i === 0 ? 45 : i === 2 ? -45 : 0) : 0,
                  translateY: mobileOpen ? (i === 0 ? 8 : i === 2 ? -8 : 0) : 0,
                  opacity: mobileOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>

        {/* Mobile menu */}
        <motion.div
          className="lg:hidden overflow-hidden"
          initial={{ height: 0 }}
          animate={{ height: mobileOpen ? 'auto' : 0 }}
          style={{ background: 'rgba(5,5,5,0.98)', borderTop: '1px solid rgba(59,130,246,0.1)' }}
        >
          <div className="px-6 py-6 flex flex-col gap-6">
            {navLinks.map((link, i) => (
              <motion.button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="text-left text-sm tracking-widest uppercase text-gray-300 hover:text-cyan-400 transition-colors"
                style={{ fontFamily: 'Rajdhani', fontWeight: 600 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: mobileOpen ? 1 : 0, x: mobileOpen ? 0 : -20 }}
                transition={{ delay: i * 0.05 }}
              >
                {link.label}
              </motion.button>
            ))}
            <button onClick={() => scrollTo('#booking')} className="btn-primary w-full text-center mt-2">
              Book Service
            </button>
          </div>
        </motion.div>
      </motion.nav>
    </>
  );
}

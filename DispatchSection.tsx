import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiPhone, FiMail, FiMapPin, FiInstagram, FiTwitter, FiLinkedin, FiYoutube } from 'react-icons/fi';

const contactInfo = [
  { icon: FiPhone, label: 'Phone', value: '+91 98765 43210', sub: '24×7 Support Hotline' },
  { icon: FiMail, label: 'Email', value: 'hello@uvss.in', sub: 'Response within 1 hour' },
  { icon: FiMapPin, label: 'HQ', value: 'Bengaluru, KA', sub: 'Serving 50+ cities' },
];

const socialLinks = [
  { icon: FiInstagram, label: 'Instagram', href: '#' },
  { icon: FiTwitter, label: 'Twitter', href: '#' },
  { icon: FiLinkedin, label: 'LinkedIn', href: '#' },
  { icon: FiYoutube, label: 'YouTube', href: '#' },
];

function AnimatedMap() {
  const cityPoints = [
    { x: 20, y: 30, size: 4, pulse: true },
    { x: 50, y: 45, size: 6, pulse: true },
    { x: 75, y: 25, size: 3, pulse: false },
    { x: 35, y: 65, size: 3, pulse: false },
    { x: 65, y: 70, size: 5, pulse: true },
    { x: 85, y: 50, size: 2, pulse: false },
    { x: 10, y: 55, size: 2, pulse: false },
    { x: 45, y: 20, size: 3, pulse: true },
  ];

  const connections = [
    [0, 1], [1, 2], [1, 4], [1, 3], [4, 5], [0, 6], [1, 7],
  ];

  return (
    <div className="absolute inset-0">
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
        {/* Grid */}
        {Array.from({ length: 8 }, (_, i) => (
          <g key={i}>
            <line x1={i * 14} y1="0" x2={i * 14} y2="100" stroke="rgba(59,130,246,0.04)" strokeWidth="0.5" />
            <line x1="0" y1={i * 14} x2="100" y2={i * 14} stroke="rgba(59,130,246,0.04)" strokeWidth="0.5" />
          </g>
        ))}

        {/* Connection lines */}
        {connections.map(([a, b], i) => (
          <line
            key={i}
            x1={cityPoints[a].x}
            y1={cityPoints[a].y}
            x2={cityPoints[b].x}
            y2={cityPoints[b].y}
            stroke="rgba(0,229,255,0.15)"
            strokeWidth="0.4"
            strokeDasharray="2,3"
          >
            <animate attributeName="stroke-dashoffset" values="0;-10" dur={`${2 + i * 0.5}s`} repeatCount="indefinite" />
          </line>
        ))}

        {/* City nodes */}
        {cityPoints.map((p, i) => (
          <g key={i}>
            {p.pulse && (
              <>
                <circle cx={p.x} cy={p.y} r={p.size * 2} fill="rgba(0,229,255,0.05)">
                  <animate attributeName="r" values={`${p.size};${p.size * 3};${p.size}`} dur="3s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.5;0;0.5" dur="3s" repeatCount="indefinite" />
                </circle>
              </>
            )}
            <circle cx={p.x} cy={p.y} r={p.size * 0.6} fill={p.pulse ? '#00E5FF' : '#3B82F6'} opacity={p.pulse ? '0.9' : '0.4'} />
          </g>
        ))}

        {/* Animated packet */}
        {connections.slice(0, 3).map(([a, b], i) => (
          <circle key={i} r="0.8" fill="#00E5FF" opacity="0.8">
            <animateMotion
              dur={`${2 + i}s`}
              repeatCount="indefinite"
              path={`M ${cityPoints[a].x} ${cityPoints[a].y} L ${cityPoints[b].x} ${cityPoints[b].y}`}
            />
          </circle>
        ))}
      </svg>
    </div>
  );
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setTimeout(() => {
        setSent(false);
        setFormData({ name: '', email: '', message: '' });
      }, 3000);
    }, 1500);
  };

  return (
    <section id="contact" ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Animated map background */}
      <div className="absolute inset-0 opacity-30">
        <AnimatedMap />
      </div>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(5,5,5,0.7) 0%, rgba(5,5,5,0.3) 100%)' }} />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-tag mb-4 block">Get In Touch</span>
          <div className="neon-line w-24 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ fontFamily: 'Orbitron' }}>
            <span className="metallic-text">Contact</span> <span className="gradient-text">UVSS</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto" style={{ fontFamily: 'Rajdhani' }}>
            Have a question? We're always here to help. Reach out via any channel.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact info */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {contactInfo.map((info, i) => (
              <div key={i} className="glass-card rounded-2xl p-5 flex items-center gap-5 group card-hover">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)' }}
                >
                  <info.icon size={22} color="#00E5FF" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 tracking-widest uppercase mb-1" style={{ fontFamily: 'Rajdhani' }}>{info.label}</div>
                  <div className="font-bold text-white" style={{ fontFamily: 'Rajdhani', letterSpacing: '0.5px' }}>{info.value}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{info.sub}</div>
                </div>
                <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8 H13 M9 4 L13 8 L9 12" stroke="#00E5FF" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            ))}

            {/* Social links */}
            <div className="glass-card rounded-2xl p-5">
              <div className="text-xs text-gray-500 tracking-widest mb-4 uppercase" style={{ fontFamily: 'Rajdhani' }}>Follow Us</div>
              <div className="flex gap-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 group"
                    style={{
                      background: 'rgba(59,130,246,0.1)',
                      border: '1px solid rgba(59,130,246,0.2)',
                    }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#00E5FF'; (e.currentTarget as HTMLElement).style.background = 'rgba(0,229,255,0.1)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(59,130,246,0.2)'; (e.currentTarget as HTMLElement).style.background = 'rgba(59,130,246,0.1)'; }}
                  >
                    <s.icon size={18} color="#E5E7EB" />
                  </a>
                ))}
              </div>
            </div>

            {/* Operating hours */}
            <div className="glass-card rounded-2xl p-5">
              <div className="text-xs text-gray-500 tracking-widest mb-4 uppercase" style={{ fontFamily: 'Rajdhani' }}>Operating Hours</div>
              <div className="space-y-2">
                {[
                  { day: 'Bookings', time: '24 × 7 × 365' },
                  { day: 'Support Chat', time: '24 × 7 × 365' },
                  { day: 'Office Hours', time: '9:00 AM – 9:00 PM' },
                ].map(item => (
                  <div key={item.day} className="flex justify-between items-center">
                    <span className="text-sm text-gray-400" style={{ fontFamily: 'Rajdhani' }}>{item.day}</span>
                    <span className="text-sm text-cyan-400 font-bold" style={{ fontFamily: 'Orbitron', fontSize: '11px' }}>{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            className="glass-card rounded-3xl p-8"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            {sent ? (
              <motion.div
                className="h-full flex flex-col items-center justify-center text-center py-12"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <motion.div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                  style={{ background: 'rgba(0,229,255,0.1)', border: '2px solid #00E5FF' }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring' }}
                >
                  <span className="text-2xl">✓</span>
                </motion.div>
                <h3 className="text-xl font-black gradient-text mb-2" style={{ fontFamily: 'Orbitron' }}>Message Sent!</h3>
                <p className="text-gray-500 text-sm">We'll get back to you within 1 hour.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSend} className="space-y-5">
                <h3 className="text-xl font-black text-white mb-6" style={{ fontFamily: 'Orbitron' }}>Send a Message</h3>

                <div className="space-y-1.5">
                  <label className="text-xs tracking-widest text-gray-400 uppercase" style={{ fontFamily: 'Rajdhani' }}>Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    className="premium-input"
                    value={formData.name}
                    onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs tracking-widest text-gray-400 uppercase" style={{ fontFamily: 'Rajdhani' }}>Email</label>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    className="premium-input"
                    value={formData.email}
                    onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs tracking-widest text-gray-400 uppercase" style={{ fontFamily: 'Rajdhani' }}>Message</label>
                  <textarea
                    required
                    placeholder="How can we help you?"
                    className="premium-input"
                    rows={5}
                    value={formData.message}
                    onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                    style={{ resize: 'none' }}
                  />
                </div>

                <motion.button
                  type="submit"
                  className="w-full py-4 rounded-xl font-bold tracking-widest text-sm relative overflow-hidden"
                  style={{
                    fontFamily: 'Rajdhani',
                    background: 'linear-gradient(135deg, #3B82F6, #00E5FF)',
                    color: '#050505',
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={sending}
                >
                  {sending ? (
                    <span className="flex items-center justify-center gap-3">
                      <motion.div
                        className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      />
                      Sending...
                    </span>
                  ) : 'SEND MESSAGE'}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }}
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  />
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

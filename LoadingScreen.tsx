import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiMapPin } from 'react-icons/fi';

const quickLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Garage', href: '#configurator' },
  { label: 'Dispatch', href: '#dispatch' },
  { label: 'Booking', href: '#booking' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

const services = [
  'Engine Repair',
  'Oil Change',
  'Brake Service',
  'Battery Replacement',
  'Tyre Assistance',
  'Emergency Breakdown',
  'AC Service',
  'Vehicle Inspection',
];

function BackgroundGears() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
      {/* Large gear */}
      <svg
        className="absolute -bottom-20 -right-20 gear-anim"
        width="300"
        height="300"
        viewBox="0 0 100 100"
        fill="none"
      >
        <path
          d="M43.2,6.5L40,0h20l-3.2,6.5c3.3,0.9,6.4,2.3,9.2,4.1l5.5-4L83,17.5l-4,5.5c1.8,2.8,3.2,5.9,4.1,9.2L89.5,35v20l-6.5,3.2c-0.9,3.3-2.3,6.4-4.1,9.2l4,5.5L71.5,83l-5.5-4c-2.8,1.8-5.9,3.2-9.2,4.1L53.5,89.5h-7L43.2,83c-3.3-0.9-6.4-2.3-9.2-4.1l-5.5,4L17,71.5l4-5.5c-1.8-2.8-3.2-5.9-4.1-9.2L10.5,53.5v-7l6.5-3.2c0.9-3.3,2.3-6.4,4.1-9.2l-4-5.5L28.5,17l5.5,4C36.8,9.4,39.9,7.4,43.2,6.5z"
          fill="#3B82F6"
        />
        <circle cx="50" cy="50" r="15" fill="#3B82F6" />
      </svg>

      {/* Medium gear */}
      <svg
        className="absolute -bottom-10 right-32 gear-anim-reverse"
        width="160"
        height="160"
        viewBox="0 0 100 100"
        fill="none"
      >
        <path
          d="M43.2,6.5L40,0h20l-3.2,6.5c3.3,0.9,6.4,2.3,9.2,4.1l5.5-4L83,17.5l-4,5.5c1.8,2.8,3.2,5.9,4.1,9.2L89.5,35v20l-6.5,3.2c-0.9,3.3-2.3,6.4-4.1,9.2l4,5.5L71.5,83l-5.5-4c-2.8,1.8-5.9,3.2-9.2,4.1L53.5,89.5h-7L43.2,83c-3.3-0.9-6.4-2.3-9.2-4.1l-5.5,4L17,71.5l4-5.5c-1.8-2.8-3.2-5.9-4.1-9.2L10.5,53.5v-7l6.5-3.2c0.9-3.3,2.3-6.4,4.1-9.2l-4-5.5L28.5,17l5.5,4C36.8,9.4,39.9,7.4,43.2,6.5z"
          fill="#00E5FF"
        />
        <circle cx="50" cy="50" r="15" fill="#00E5FF" />
      </svg>

      {/* Small gear */}
      <svg
        className="absolute -bottom-5 -left-10 gear-anim"
        width="200"
        height="200"
        viewBox="0 0 100 100"
        fill="none"
      >
        <path
          d="M43.2,6.5L40,0h20l-3.2,6.5c3.3,0.9,6.4,2.3,9.2,4.1l5.5-4L83,17.5l-4,5.5c1.8,2.8,3.2,5.9,4.1,9.2L89.5,35v20l-6.5,3.2c-0.9,3.3-2.3,6.4-4.1,9.2l4,5.5L71.5,83l-5.5-4c-2.8,1.8-5.9,3.2-9.2,4.1L53.5,89.5h-7L43.2,83c-3.3-0.9-6.4-2.3-9.2-4.1l-5.5,4L17,71.5l4-5.5c-1.8-2.8-3.2-5.9-4.1-9.2L10.5,53.5v-7l6.5-3.2c0.9-3.3,2.3-6.4,4.1-9.2l-4-5.5L28.5,17l5.5,4C36.8,9.4,39.9,7.4,43.2,6.5z"
          fill="#3B82F6"
        />
        <circle cx="50" cy="50" r="15" fill="#3B82F6" />
      </svg>
    </div>
  );
}

export default function Footer() {
  const scrollTo = (href: string) => {
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative overflow-hidden footer-bg" style={{ borderTop: '1px solid rgba(59,130,246,0.15)' }}>
      <BackgroundGears />

      {/* Top neon line */}
      <div className="neon-line w-full" style={{ height: '1px' }} />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10">
                <svg viewBox="0 0 40 40" fill="none" className="w-full h-full">
                  <polygon points="20,2 38,12 38,28 20,38 2,28 2,12" fill="none" stroke="#00E5FF" strokeWidth="1.5" />
                  <polygon points="20,8 32,15 32,25 20,32 8,25 8,15" fill="rgba(59,130,246,0.1)" stroke="#3B82F6" strokeWidth="1" />
                  <text x="20" y="24" textAnchor="middle" fill="#00E5FF" fontSize="10" fontFamily="Orbitron" fontWeight="700">U</text>
                </svg>
              </div>
              <div>
                <div className="text-xl font-black tracking-widest gradient-text" style={{ fontFamily: 'Orbitron' }}>UVSS</div>
                <div className="text-xs text-gray-600 tracking-[2px]" style={{ fontFamily: 'Rajdhani' }}>Vehicle Service</div>
              </div>
            </div>

            <p className="text-gray-500 text-sm leading-relaxed mb-6" style={{ fontFamily: 'Inter' }}>
              Professional automobile mechanics delivered to your doorstep. Fast, trusted, and reliable.
            </p>

            {/* Contact mini */}
            <div className="space-y-2">
              {[
                { icon: FiPhone, text: '+91 98765 43210' },
                { icon: FiMail, text: 'hello@uvss.in' },
                { icon: FiMapPin, text: 'Bengaluru, Karnataka' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 text-xs text-gray-500">
                  <item.icon size={12} className="text-cyan-400 flex-shrink-0" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs tracking-[3px] text-gray-400 uppercase mb-6" style={{ fontFamily: 'Rajdhani' }}>Navigation</h4>
            <ul className="space-y-3">
              {quickLinks.slice(0, 5).map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-sm text-gray-500 hover:text-cyan-400 transition-colors duration-200 flex items-center gap-2 group"
                    style={{ fontFamily: 'Rajdhani' }}
                  >
                    <span className="w-3 h-px bg-gray-700 group-hover:bg-cyan-400 group-hover:w-4 transition-all duration-200" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs tracking-[3px] text-gray-400 uppercase mb-6" style={{ fontFamily: 'Rajdhani' }}>Services</h4>
            <ul className="space-y-3">
              {services.slice(0, 6).map((service) => (
                <li key={service}>
                  <button
                    onClick={() => scrollTo('#services')}
                    className="text-sm text-gray-500 hover:text-cyan-400 transition-colors duration-200 flex items-center gap-2 group"
                    style={{ fontFamily: 'Rajdhani' }}
                  >
                    <span className="w-3 h-px bg-gray-700 group-hover:bg-cyan-400 group-hover:w-4 transition-all duration-200" />
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* App download / CTA */}
          <div>
            <h4 className="text-xs tracking-[3px] text-gray-400 uppercase mb-6" style={{ fontFamily: 'Rajdhani' }}>Get Service</h4>
            <div className="space-y-4">
              <button
                onClick={() => scrollTo('#booking')}
                className="btn-primary w-full text-center text-xs"
              >
                Book Now
              </button>

              <div className="glass rounded-xl p-4 text-center">
                <div className="text-xs text-gray-500 mb-1" style={{ fontFamily: 'Rajdhani' }}>EMERGENCY LINE</div>
                <div className="text-lg font-black text-red-400" style={{ fontFamily: 'Orbitron' }}>108-UVSS</div>
                <div className="text-xs text-gray-600 mt-1">24×7 Priority Support</div>
              </div>

              <div className="glass rounded-xl p-4">
                <div className="text-xs text-gray-500 mb-2" style={{ fontFamily: 'Rajdhani' }}>CITIES SERVED</div>
                <div className="flex flex-wrap gap-1">
                  {['BLR', 'MUM', 'DEL', 'HYD', 'CHN'].map(city => (
                    <span key={city} className="text-xs px-2 py-0.5 rounded" style={{ background: 'rgba(59,130,246,0.1)', color: '#3B82F6', fontFamily: 'mono' }}>{city}</span>
                  ))}
                  <span className="text-xs px-2 py-0.5 rounded" style={{ background: 'rgba(0,229,255,0.1)', color: '#00E5FF', fontFamily: 'mono' }}>+45</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="neon-line w-full mb-8" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-600" style={{ fontFamily: 'Inter' }}>
            © {new Date().getFullYear()} Universal Vehicle Service System (UVSS). All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <button className="text-xs text-gray-600 hover:text-gray-400 transition-colors" style={{ fontFamily: 'Inter' }}>Privacy Policy</button>
            <button className="text-xs text-gray-600 hover:text-gray-400 transition-colors" style={{ fontFamily: 'Inter' }}>Terms of Service</button>
            <button className="text-xs text-gray-600 hover:text-gray-400 transition-colors" style={{ fontFamily: 'Inter' }}>Cookie Policy</button>
          </div>

          {/* Back to top */}
          <motion.button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs text-gray-500 hover:text-cyan-400 transition-colors group"
            style={{ fontFamily: 'Rajdhani', letterSpacing: '2px' }}
            whileHover={{ y: -2 }}
          >
            <span>BACK TO TOP</span>
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:border-cyan-400"
              style={{ border: '1px solid rgba(59,130,246,0.3)' }}
            >
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M5 8 L5 2 M2 5 L5 2 L8 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          </motion.button>
        </div>
      </div>
    </footer>
  );
}

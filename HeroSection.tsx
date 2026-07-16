import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    q: 'How does booking work?',
    a: 'Simply fill out our booking form with your name, vehicle details, problem description, and location. Once submitted, our system instantly assigns the nearest certified mechanic to your case. You\'ll receive a confirmation and real-time tracking link within minutes.',
  },
  {
    q: 'How quickly will a mechanic arrive?',
    a: 'Our average response time is 15 minutes in metro areas. For emergency service, we guarantee dispatch in under 10 minutes. Time may vary based on your location, traffic conditions, and demand. You can track your mechanic in real-time after dispatch.',
  },
  {
    q: 'What vehicles are supported?',
    a: 'We service all types of vehicles including sedans, SUVs, hatchbacks, sports cars, electric vehicles, motorcycles, trucks, and commercial vans. We support all major brands — Indian and international. Contact us for specialized or exotic vehicles.',
  },
  {
    q: 'Do you offer emergency service?',
    a: 'Yes! UVSS operates 24×7 including weekends and holidays. Toggle the "Emergency Service" option during booking for priority dispatch. Our emergency mechanics carry essential tools and parts for common breakdown scenarios — flat tyres, battery failure, and more.',
  },
  {
    q: 'How are mechanics verified?',
    a: 'Every UVSS mechanic undergoes a rigorous vetting process: government ID verification, criminal background check, ASE or equivalent certification validation, skills assessment test, and a probationary period with senior supervision. Only the top 8% of applicants are onboarded.',
  },
];

export default function FAQSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" ref={sectionRef} className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-10" />

      <div className="relative max-w-3xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-tag mb-4 block">FAQ</span>
          <div className="neon-line w-24 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ fontFamily: 'Orbitron' }}>
            <span className="metallic-text">Frequently</span> <span className="gradient-text">Asked</span>
          </h2>
        </motion.div>

        {/* FAQ items */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              className="glass-card rounded-2xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              style={{
                border: openIndex === i ? '1px solid rgba(0,229,255,0.3)' : '1px solid rgba(59,130,246,0.1)',
              }}
            >
              {/* Question */}
              <button
                className="w-full flex items-center justify-between p-6 text-left group"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300"
                    style={{
                      background: openIndex === i ? 'rgba(0,229,255,0.15)' : 'rgba(59,130,246,0.1)',
                      border: openIndex === i ? '1px solid rgba(0,229,255,0.3)' : '1px solid rgba(59,130,246,0.2)',
                    }}
                  >
                    <span
                      className="text-xs font-black transition-colors duration-300"
                      style={{
                        fontFamily: 'Orbitron',
                        color: openIndex === i ? '#00E5FF' : '#3B82F6',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <span
                    className="font-bold text-base transition-colors duration-300"
                    style={{
                      fontFamily: 'Rajdhani',
                      letterSpacing: '0.5px',
                      color: openIndex === i ? '#ffffff' : '#E5E7EB',
                    }}
                  >
                    {faq.q}
                  </span>
                </div>

                {/* Icon */}
                <motion.div
                  className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ml-4"
                  style={{
                    background: 'rgba(59,130,246,0.1)',
                    border: '1px solid rgba(59,130,246,0.2)',
                  }}
                  animate={{ rotate: openIndex === i ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <line x1="6" y1="0" x2="6" y2="12" stroke={openIndex === i ? '#00E5FF' : '#3B82F6'} strokeWidth="1.5" />
                    <line x1="0" y1="6" x2="12" y2="6" stroke={openIndex === i ? '#00E5FF' : '#3B82F6'} strokeWidth="1.5" />
                  </svg>
                </motion.div>
              </button>

              {/* Answer */}
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                  >
                    <div className="px-6 pb-6">
                      <div className="h-px w-full mb-4" style={{ background: 'linear-gradient(90deg, rgba(0,229,255,0.2), transparent)' }} />
                      <p className="text-gray-400 leading-relaxed text-sm" style={{ fontFamily: 'Inter' }}>
                        {faq.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Still have questions */}
        <motion.div
          className="mt-12 text-center glass-card rounded-2xl p-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="text-xl font-bold mb-2 text-white" style={{ fontFamily: 'Orbitron' }}>Still Have Questions?</div>
          <p className="text-gray-500 text-sm mb-6" style={{ fontFamily: 'Inter' }}>
            Our support team is available 24×7 to help you.
          </p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-outline text-sm"
          >
            Contact Us
          </button>
        </motion.div>
      </div>
    </section>
  );
}

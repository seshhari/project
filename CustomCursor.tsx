import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const vehicleTypes = ['Sedan', 'SUV', 'Sports Car', 'Hatchback', 'Motorcycle', 'Electric Vehicle', 'Truck', 'Van'];
const vehicleBrands = ['Maruti Suzuki', 'Hyundai', 'Tata', 'Mahindra', 'Honda', 'Toyota', 'Ford', 'BMW', 'Mercedes', 'Audi', 'Kia', 'MG', 'Other'];
const serviceTypes = ['Engine Repair', 'Oil Change', 'Brake Service', 'Battery Replacement', 'Tyre Assistance', 'Emergency Breakdown', 'Electrical Repairs', 'General Maintenance', 'AC Service', 'Vehicle Inspection'];

interface FormData {
  name: string;
  phone: string;
  vehicleType: string;
  vehicleBrand: string;
  problem: string;
  date: string;
  location: string;
  serviceType: string;
  emergency: boolean;
}

export default function BookingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    vehicleType: '',
    vehicleBrand: '',
    problem: '',
    date: '',
    location: '',
    serviceType: '',
    emergency: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call (no backend)
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 2000);
  };

  const resetForm = () => {
    setSubmitted(false);
    setFormData({ name: '', phone: '', vehicleType: '', vehicleBrand: '', problem: '', date: '', location: '', serviceType: '', emergency: false });
  };

  return (
    <section id="booking" ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(0,229,255,0.04) 0%, transparent 70%)' }} />
      <div className="absolute inset-0 grid-bg opacity-10" />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-tag mb-4 block">Service Booking</span>
          <div className="neon-line w-24 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-black mb-4" style={{ fontFamily: 'Orbitron' }}>
            <span className="metallic-text">Book Your</span> <span className="gradient-text">Service</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto" style={{ fontFamily: 'Rajdhani' }}>
            Fill in the details below and a certified mechanic will be at your doorstep.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              className="glass-card rounded-3xl p-8 md:p-10 relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              style={{ border: formData.emergency ? '1px solid rgba(239,68,68,0.3)' : '1px solid rgba(59,130,246,0.2)' }}
            >
              {/* Animated shimmer */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                <motion.div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.03), transparent)' }}
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                />
              </div>
              {/* Emergency banner */}
              <AnimatePresence>
                {formData.emergency && (
                  <motion.div
                    className="mb-6 py-3 px-4 rounded-xl text-center"
                    style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)' }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <span className="text-red-400 text-sm font-bold tracking-widest" style={{ fontFamily: 'Rajdhani' }}>
                      🚨 EMERGENCY MODE ACTIVE — Priority dispatch in &lt; 10 minutes
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Row 1 */}
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs tracking-widest text-gray-400 uppercase" style={{ fontFamily: 'Rajdhani' }}>Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter your full name"
                      className="premium-input"
                      value={formData.name}
                      onChange={e => handleChange('name', e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs tracking-widest text-gray-400 uppercase" style={{ fontFamily: 'Rajdhani' }}>Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 00000 00000"
                      className="premium-input"
                      value={formData.phone}
                      onChange={e => handleChange('phone', e.target.value)}
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs tracking-widest text-gray-400 uppercase" style={{ fontFamily: 'Rajdhani' }}>Vehicle Type *</label>
                    <select
                      required
                      className="premium-input"
                      value={formData.vehicleType}
                      onChange={e => handleChange('vehicleType', e.target.value)}
                      style={{ appearance: 'none', background: 'rgba(17,24,39,0.8)' }}
                    >
                      <option value="" disabled>Select vehicle type</option>
                      {vehicleTypes.map(v => <option key={v} value={v}>{v}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs tracking-widest text-gray-400 uppercase" style={{ fontFamily: 'Rajdhani' }}>Vehicle Brand *</label>
                    <select
                      required
                      className="premium-input"
                      value={formData.vehicleBrand}
                      onChange={e => handleChange('vehicleBrand', e.target.value)}
                      style={{ appearance: 'none', background: 'rgba(17,24,39,0.8)' }}
                    >
                      <option value="" disabled>Select brand</option>
                      {vehicleBrands.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                </div>

                {/* Row 3 */}
                <div className="grid md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs tracking-widest text-gray-400 uppercase" style={{ fontFamily: 'Rajdhani' }}>Service Type *</label>
                    <select
                      required
                      className="premium-input"
                      value={formData.serviceType}
                      onChange={e => handleChange('serviceType', e.target.value)}
                      style={{ appearance: 'none', background: 'rgba(17,24,39,0.8)' }}
                    >
                      <option value="" disabled>Select service</option>
                      {serviceTypes.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs tracking-widest text-gray-400 uppercase" style={{ fontFamily: 'Rajdhani' }}>Preferred Date *</label>
                    <input
                      type="date"
                      required
                      className="premium-input"
                      value={formData.date}
                      onChange={e => handleChange('date', e.target.value)}
                    />
                  </div>
                </div>

                {/* Problem description */}
                <div className="space-y-1.5">
                  <label className="text-xs tracking-widest text-gray-400 uppercase" style={{ fontFamily: 'Rajdhani' }}>Problem Description *</label>
                  <textarea
                    required
                    placeholder="Describe the issue with your vehicle..."
                    className="premium-input"
                    rows={4}
                    value={formData.problem}
                    onChange={e => handleChange('problem', e.target.value)}
                    style={{ resize: 'none' }}
                  />
                </div>

                {/* Location */}
                <div className="space-y-1.5">
                  <label className="text-xs tracking-widest text-gray-400 uppercase" style={{ fontFamily: 'Rajdhani' }}>Your Location *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your address or drop pin"
                    className="premium-input"
                    value={formData.location}
                    onChange={e => handleChange('location', e.target.value)}
                  />
                </div>

                {/* Emergency toggle */}
                <div className="glass rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-white" style={{ fontFamily: 'Rajdhani', letterSpacing: '1px' }}>
                      Emergency Service
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">Priority dispatch — mechanic arrives in &lt;10 min</div>
                  </div>
                  <label className="toggle-switch">
                    <input
                      type="checkbox"
                      checked={formData.emergency}
                      onChange={e => handleChange('emergency', e.target.checked)}
                    />
                    <span className="toggle-slider" />
                  </label>
                </div>

                {/* Submit button */}
                <motion.button
                  type="submit"
                  className="w-full py-4 rounded-xl font-black tracking-widest text-sm relative overflow-hidden"
                  style={{
                    fontFamily: 'Rajdhani',
                    background: formData.emergency
                      ? 'linear-gradient(135deg, #EF4444, #F97316)'
                      : 'linear-gradient(135deg, #3B82F6, #00E5FF)',
                    color: '#050505',
                    boxShadow: formData.emergency
                      ? '0 10px 40px rgba(239,68,68,0.3)'
                      : '0 10px 40px rgba(0,229,255,0.3)',
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-3">
                      <motion.div
                        className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      />
                      Processing...
                    </span>
                  ) : (
                    <span>
                      {formData.emergency ? '🚨 ' : ''}
                      {formData.emergency ? 'DISPATCH EMERGENCY SERVICE' : 'BOOK SERVICE NOW'}
                    </span>
                  )}
                  {/* Shimmer */}
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }}
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  />
                </motion.button>

                <p className="text-center text-xs text-gray-600" style={{ fontFamily: 'Inter' }}>
                  By booking, you agree to our service terms. A confirmation will be sent to your phone.
                </p>
              </form>
            </motion.div>
          ) : (
            /* Success state */
            <motion.div
              key="success"
              className="glass-card rounded-3xl p-12 text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, type: 'spring' }}
              style={{ border: '1px solid rgba(0,229,255,0.3)' }}
            >
              {/* Success animation */}
              <motion.div
                className="w-24 h-24 mx-auto mb-8 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(0,229,255,0.1)', border: '2px solid #00E5FF' }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
              >
                <motion.svg
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                >
                  <motion.path
                    d="M8 20 L16 28 L32 12"
                    stroke="#00E5FF"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  />
                </motion.svg>
              </motion.div>

              {/* Particle burst */}
              {Array.from({ length: 12 }, (_, i) => {
                const angle = (i / 12) * Math.PI * 2;
                return (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full"
                    style={{ background: i % 2 === 0 ? '#00E5FF' : '#3B82F6', top: '30%', left: '50%' }}
                    initial={{ x: 0, y: 0, opacity: 1 }}
                    animate={{ x: Math.cos(angle) * 100, y: Math.sin(angle) * 80, opacity: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                  />
                );
              })}

              <h3 className="text-3xl font-black mb-3 gradient-text" style={{ fontFamily: 'Orbitron' }}>
                Service Booked!
              </h3>
              <p className="text-gray-400 mb-2" style={{ fontFamily: 'Rajdhani', fontSize: '16px' }}>
                Your request has been received, <span className="text-white font-bold">{formData.name || 'Customer'}</span>.
              </p>
              <p className="text-gray-500 text-sm mb-6" style={{ fontFamily: 'Inter' }}>
                A certified mechanic will be dispatched to your location. You'll receive a confirmation call shortly.
              </p>

              {/* Booking details */}
              <div className="glass rounded-xl p-4 mb-8 text-left space-y-2">
                {[
                  { label: 'Service', value: formData.serviceType || 'General Service' },
                  { label: 'Vehicle', value: `${formData.vehicleBrand || '-'} ${formData.vehicleType || ''}` },
                  { label: 'Date', value: formData.date || 'ASAP' },
                  { label: 'Location', value: formData.location || 'Provided location' },
                ].map(item => (
                  <div key={item.label} className="flex justify-between">
                    <span className="text-xs text-gray-500" style={{ fontFamily: 'Rajdhani' }}>{item.label}</span>
                    <span className="text-xs text-white" style={{ fontFamily: 'Inter' }}>{item.value}</span>
                  </div>
                ))}
              </div>

              {/* Booking ID */}
              <div className="mb-8">
                <div className="text-xs text-gray-500 mb-1" style={{ fontFamily: 'Rajdhani' }}>BOOKING ID</div>
                <div className="text-lg font-mono text-cyan-400 tracking-widest">
                  UVSS-{Math.random().toString(36).substring(2, 8).toUpperCase()}
                </div>
              </div>

              <button onClick={resetForm} className="btn-outline">
                Book Another Service
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

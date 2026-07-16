import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import CustomCursor from './components/CustomCursor';
import ParticleField from './components/ParticleField';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import VehicleConfigurator from './components/VehicleConfigurator';
import DispatchSection from './components/DispatchSection';
import BookingSection from './components/BookingSection';
import WhyUsSection from './components/WhyUsSection';
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import StatsBar from './components/StatsBar';
import { AmbientOrbs, ScanLine, DataRain } from './components/AmbientEffects';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
  }, []);

  return (
    <div className="relative" style={{ background: '#050505', minHeight: '100vh' }}>
      {/* Custom cursor (desktop only) */}
      {!isMobile && <CustomCursor />}

      {/* Scroll progress */}
      {!loading && <ScrollProgress />}

      {/* Ambient effects */}
      {!loading && <AmbientOrbs />}
      {!loading && <ScanLine />}
      {!loading && <DataRain />}

      {/* Particle field */}
      {!loading && <ParticleField />}

      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Loading screen */}
      <AnimatePresence>
        {loading && (
          <LoadingScreen onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {/* Main content */}
      {!loading && (
        <>
          <Navbar />
          <main>
            <HeroSection />

            {/* Stats bar */}
            <StatsBar />

            <div className="neon-line opacity-20" />

            <AboutSection />

            <div className="neon-line opacity-20" />

            <ServicesSection />

            <div className="neon-line opacity-20" />

            <VehicleConfigurator />

            <div className="neon-line opacity-20" />

            <DispatchSection />

            <div className="neon-line opacity-20" />

            <BookingSection />

            <div className="neon-line opacity-20" />

            <WhyUsSection />

            <div className="neon-line opacity-20" />

            <FAQSection />

            <div className="neon-line opacity-20" />

            <ContactSection />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

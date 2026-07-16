
import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed left-0 top-0 right-0 h-[2px] z-[200] origin-left"
      style={{
        scaleX,
        background: 'linear-gradient(90deg, #3B82F6, #00E5FF, #3B82F6)',
        boxShadow: '0 0 8px #00E5FF',
      }}
    />
  );
}

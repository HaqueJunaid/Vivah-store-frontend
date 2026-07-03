import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const PageLoader: React.FC = () => {
  const [progress, setProgress] = useState<number>(0);
  const [stage, setStage] = useState<'loading' | 'fading' | 'sliding' | 'complete'>('loading');

  useEffect(() => {
    // Real-time progress simulation & asset tracking
    let animationFrameId: number;
    let startTime: number | null = null;
    const duration = 1800; // Smooth 1.8s loading progress

    const updateProgress = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const rawProgress = Math.min(Math.floor((elapsed / duration) * 100), 100);

      setProgress(rawProgress);

      if (rawProgress < 100) {
        animationFrameId = requestAnimationFrame(updateProgress);
      } else {
        // As page fully loaded -> wait brief moment then fade out progress bar
        setTimeout(() => {
          setStage('fading');
        }, 300);
      }
    };

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // When stage becomes fading, trigger sliding door animation after opacity transition completes
  useEffect(() => {
    if (stage === 'fading') {
      const timer = setTimeout(() => {
        setStage('sliding');
      }, 400); // 400ms matching exit transition duration
      return () => clearTimeout(timer);
    }
  }, [stage]);

  const handleSlidingComplete = () => {
    setStage('complete');
  };

  if (stage === 'complete') {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[99999] overflow-hidden select-none pointer-events-auto">
      {/* Left Door Panel containing the Logo (z-20 so logo sits on top of right door) */}
      <motion.div
        className="absolute top-0 left-0 w-1/2 h-full bg-white flex items-center justify-end z-20"
        initial={{ x: 0 }}
        animate={{ x: stage === 'sliding' ? '-100vw' : 0 }}
        transition={{
          duration: 1.1,
          ease: [0.77, 0, 0.175, 1],
        }}
        onAnimationComplete={() => {
          if (stage === 'sliding') {
            handleSlidingComplete();
          }
        }}
      >
        {/* Logo container positioned centrally across the seam */}
        <div className="absolute right-0 translate-x-1/2 flex flex-col items-center justify-center w-max z-30">
          <img
            src="/Assets/Logo.svg"
            alt="Vivah Store Logo"
            className="h-20 sm:h-24 md:h-28 lg:h-32 object-contain filter drop-shadow-sm"
          />
        </div>
      </motion.div>

      {/* Right Door Panel */}
      <motion.div
        className="absolute top-0 right-0 w-1/2 h-full bg-white flex items-center justify-start z-10"
        initial={{ x: 0 }}
        animate={{ x: stage === 'sliding' ? '100vw' : 0 }}
        transition={{
          duration: 1.1,
          ease: [0.77, 0, 0.175, 1],
        }}
      />

      {/* Central Progress Bar & Label Container */}
      <AnimatePresence>
        {stage !== 'fading' && stage !== 'sliding' && (
          <motion.div
            className="absolute top-[65%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center z-30 w-64 sm:w-80 md:w-96 px-4"
            initial={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            {/* Progress Bar Container matching the wireframe */}
            <div className="w-full h-3 sm:h-3.5 bg-rose-50 border border-stone-800 rounded-full p-0.5 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-rose-300 via-pink-400 to-rose-400 rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>

            {/* Percentage Label */}
            <span className="mt-2 text-xs sm:text-sm font-medium tracking-wider text-stone-800 font-mono">
              {progress}%
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PageLoader;

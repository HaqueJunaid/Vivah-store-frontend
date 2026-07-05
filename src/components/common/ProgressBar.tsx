import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ProgressBar: React.FC = () => {
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Start progress
    setVisible(true);
    setProgress(15);

    // Simulate progress ticks
    const timer1 = setTimeout(() => setProgress(45), 150);
    const timer2 = setTimeout(() => setProgress(75), 300);
    const timer3 = setTimeout(() => setProgress(90), 500);
    
    // Complete progress
    const timerComplete = setTimeout(() => {
      setProgress(100);
    }, 700);

    // Hide progress bar after completion animation completes
    const timerHide = setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 1000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timerComplete);
      clearTimeout(timerHide);
    };
  }, [location.pathname, location.search]);

  if (!visible) return null;

  return (
    <div
      className="fixed top-0 left-0 h-1 bg-[#E41F66] z-[99999] transition-all duration-300 ease-out"
      style={{
        width: `${progress}%`,
        // boxShadow: '0 0 10px #E41F66',
        opacity: progress === 100 ? 0 : 1,
        transition: progress === 100 ? 'width 300ms ease-out, opacity 300ms ease-in-out' : 'width 300ms ease-out',
      }}
    />
  );
};

export default ProgressBar;

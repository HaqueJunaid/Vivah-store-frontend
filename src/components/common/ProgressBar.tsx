import React from 'react';
import { useLocation } from 'react-router-dom';

const ProgressBar: React.FC = () => {
  const location = useLocation();

  return (
    <div
      key={`${location.pathname}${location.search}`}
      className="route-progress fixed top-0 left-0 h-1 bg-[#E41F66] z-[99999]"
    />
  );
};

export default ProgressBar;

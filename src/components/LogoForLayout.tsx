import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const LogoForLayout = () => {
  const [isDarkMode, setIsDarkMode] = useState(
  document.documentElement.classList.contains('dark')
);

  useEffect(() => {
  const observer = new MutationObserver(() => {
    setIsDarkMode(document.documentElement.classList.contains('dark'));
  });
  observer.observe(
    document.documentElement, 
    { 
        attributes: true, 
        attributeFilter: ['class'] 
    });
  return () => observer.disconnect();
}, []);

  return (
    <Link to="/">
      <img 
        src={isDarkMode 
          ? "/flibreria-horizontal-logo-dark.svg" 
          : "/flibreria-horizontal-logo-light.svg"
        } 
        width="200" 
        alt="Flibreria Logo" 
      />
    </Link>
  );
};

export default LogoForLayout;
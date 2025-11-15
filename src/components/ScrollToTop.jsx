import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top when route changes
    // Use requestAnimationFrame for better performance and to ensure DOM is ready
    try {
      if (typeof window !== 'undefined') {
        requestAnimationFrame(() => {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth' // Smooth scroll for better UX
          });
        });
      }
    } catch (error) {
      console.error('Error scrolling to top:', error);
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;


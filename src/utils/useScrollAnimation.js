import { useEffect, useRef, useState } from 'react';

// Enhanced scroll animation hook with intersection observer
export const useScrollAnimation = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false); // Start false, but content visible via CSS
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check if element is already in viewport on mount
    const checkVisibility = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      // Element is in viewport if any part of it is visible
      const isInViewport = rect.top < windowHeight && rect.bottom > 0;
      
      if (isInViewport && !hasAnimated) {
        // Element is already visible, add revealed class immediately
        element.classList.add('revealed');
        setIsVisible(true);
        setHasAnimated(true);
      }
    };

    // Check on mount after DOM is ready
    const mountTimeout = setTimeout(() => {
      checkVisibility();
    }, 200);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          // Element is now in viewport - add revealed class for animation
          entry.target.classList.add('revealed');
          setIsVisible(true);
          setHasAnimated(true);
        } else if (!entry.isIntersecting && hasAnimated && options.repeat) {
          // If repeat is enabled, remove revealed class when out of view
          entry.target.classList.remove('revealed');
          setIsVisible(false);
          setHasAnimated(false);
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px 0px -80px 0px',
      }
    );

    observer.observe(element);

    return () => {
      clearTimeout(mountTimeout);
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [hasAnimated, options.threshold, options.rootMargin]);

  return { ref, isVisible, hasAnimated };
};

// Stagger animation hook for multiple children
export const useStaggerAnimation = (itemCount, delay = 100) => {
  const [visibleItems, setVisibleItems] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Animate items one by one
          for (let i = 0; i < itemCount; i++) {
            setTimeout(() => {
              setVisibleItems(prev => {
                if (!prev.includes(i)) {
                  return [...prev, i];
                }
                return prev;
              });
            }, i * delay);
          }
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [itemCount, delay]);

  return { containerRef, visibleItems };
};

export default useScrollAnimation;


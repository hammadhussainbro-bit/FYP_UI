import { useEffect, useRef } from 'react';

// Hook to add reveal-on-scroll animation using IntersectionObserver
export default function useRevealOnScroll(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const opts = { threshold: 0.2, rootMargin: '0px 0px -10% 0px', ...options };

    const onIntersect = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-in');
          entry.target.classList.remove('reveal-init');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(onIntersect, opts);
    node.classList.add('reveal-init');
    observer.observe(node);

    return () => observer.disconnect();
  }, [options]);

  return ref;
}

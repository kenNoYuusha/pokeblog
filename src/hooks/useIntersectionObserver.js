import { useEffect } from 'react';

export function useIntersectionObserver({ targetRef, onIntersect, enabled = true }) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting) {
          onIntersect();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = targetRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [targetRef, onIntersect, enabled]);
}

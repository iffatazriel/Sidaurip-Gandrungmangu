'use client';

import { useEffect, useRef, useState } from 'react';

type AnimateOnScrollProps = {
  children: React.ReactNode;
  animation?: 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale';
  delay?: number;
  className?: string;
};

export default function AnimateOnScroll({
  children,
  animation = 'fade-up',
  delay = 0,
  className = '',
}: AnimateOnScrollProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const animations = {
    'fade-up': isVisible
      ? 'translate-y-0 opacity-100'
      : 'translate-y-8 opacity-0',
    'fade-in': isVisible ? 'opacity-100' : 'opacity-0',
    'slide-left': isVisible
      ? 'translate-x-0 opacity-100'
      : 'translate-x-8 opacity-0',
    'slide-right': isVisible
      ? 'translate-x-0 opacity-100'
      : '-translate-x-8 opacity-0',
    scale: isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0',
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${animations[animation]} ${className}`}
    >
      {children}
    </div>
  );
}

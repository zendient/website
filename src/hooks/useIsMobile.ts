import { useState, useEffect } from 'react';

/**
 * Hook to detect if the device is mobile based on window width
 * Uses the same breakpoint as Tailwind's md breakpoint (768px)
 * @returns true if viewport width is less than 768px, false otherwise
 */
export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    // Check initial window size (fallback to true for SSR)
    if (typeof window === 'undefined') return true;
    return window.innerWidth < 768;
  });

  useEffect(() => {
    // Handler for window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isMobile;
}

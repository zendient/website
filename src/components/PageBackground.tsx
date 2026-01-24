import type { ReactNode } from "react";

interface PageBackgroundProps {
  bgClass?: string;
  overlayOpacity?: string;
  children: ReactNode;
}

export function PageBackground({
  bgClass = "bg-paper",
  overlayOpacity = "opacity-[0.03]",
  children,
}: PageBackgroundProps) {
  return (
    <div className={`min-h-screen relative overflow-hidden ${bgClass}`}>
      <div
        className={`absolute inset-0 pointer-events-none ${overlayOpacity}`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E")`,
        }}
      />
      {children}
    </div>
  );
}

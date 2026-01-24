import { ElementalTheme } from '../types/elemental';
import waterSvg from '../assets/elements/water.svg?raw';
import airSvg from '../assets/elements/air.svg?raw';
import earthSvg from '../assets/elements/earth.svg?raw';
import fireSvg from '../assets/elements/fire.svg?raw';

interface ElementalIconProps {
  theme: ElementalTheme;
  size?: number | string;
  className?: string;
}

const svgMap: Record<ElementalTheme, string> = {
  [ElementalTheme.Water]: waterSvg,
  [ElementalTheme.Air]: airSvg,
  [ElementalTheme.Earth]: earthSvg,
  [ElementalTheme.Fire]: fireSvg,
};

export function ElementalIcon({ theme, size = 24, className = '' }: ElementalIconProps) {
  const svgContent = svgMap[theme];

  return (
    <div
      className={`elemental-icon inline-flex items-center justify-center ${className}`}
      style={{
        width: typeof size === 'number' ? `${size}px` : size,
        height: typeof size === 'number' ? `${size}px` : size,
        color: 'var(--color-paper-embossed)',
        filter: `
          drop-shadow(0 1px 1px rgba(255, 255, 255, 0.6))
          drop-shadow(0 -1px 1px rgba(0, 0, 0, 0.15))
          drop-shadow(1px 0 0.5px rgba(255, 255, 255, 0.4))
          drop-shadow(-1px 0 0.5px rgba(0, 0, 0, 0.1))
        `,
      }}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
}

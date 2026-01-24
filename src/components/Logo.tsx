import logoImage from "../assets/zen-logo-brush-512.png";

interface LogoProps {
  src?: string;
  alt?: string;
}

export function Logo({ src = logoImage, alt = "Zendient Labs" }: LogoProps) {
  return (
    <a
      href="https://github.com/zendient"
      target="_blank"
      rel="noopener noreferrer"
      className="mb-8 relative block"
    >
      <div
        className="relative w-80 h-48 flex items-center justify-center"
        style={{
          maskImage: "radial-gradient(ellipse 60% 70% at center, black 50%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 70% at center, black 50%, transparent 85%)",
        }}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-contain opacity-95"
        />
      </div>
    </a>
  );
}

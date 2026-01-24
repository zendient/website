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
        className="relative w-48 h-48 flex items-center justify-center"
        style={{
          maskImage: `
            linear-gradient(to bottom, transparent 0%, black  5%, black 96%, transparent 100%),
            linear-gradient(to right,  transparent 0%, black 10%, black 90%, transparent 100%)
          `,
          WebkitMaskImage: `
            linear-gradient(to bottom, transparent 0%, black  5%, black 96%, transparent 100%),
            linear-gradient(to right,  transparent 0%, black 10%, black 90%, transparent 100%)
          `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-contain"
        />
      </div>
    </a>
  );
}

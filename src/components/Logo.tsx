// import logoImage from "../assets/zen-logo-brush-512-orig.png";
import logoImage from "../assets/zen-logo-brush-512-retint.png";

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
      className="mb-6 md:mb-8 relative block"
    >
      <div
        className="relative w-32 h-32 md:w-48 md:h-48 flex items-center justify-center"
        style={{
          maskImage: `
            linear-gradient(to bottom, transparent 0%, black  8%, black 95%, transparent 100%),
            linear-gradient(to right,  transparent 0%, black 10%, black 90%, transparent 100%)
          `,
          WebkitMaskImage: `
            linear-gradient(to bottom, transparent 0%, black  8%, black 95%, transparent 100%),
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

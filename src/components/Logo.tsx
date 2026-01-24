import logoImage from "../assets/zen-logo-512.png";

export function Logo() {
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
          src={logoImage}
          alt="Zendient Labs"
          className="w-full h-full object-contain opacity-95"
        />
      </div>
    </a>
  );
}

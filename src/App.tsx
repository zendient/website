import logoImage from "figma:asset/e504b674755357ba1619d8ff469ea8ff7e6a9df2.png";

export default function App() {
  return (
    <div className="min-h-screen bg-[#f5f4f0] relative overflow-hidden">
      {/* Paper texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
        {/* Logo */}
        <div className="mb-8 relative">
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
        </div>

        {/* Company Name */}
        <h1 className="text-5xl md:text-6xl text-[#1a2838] mb-12 tracking-tight">
          Zendient Labs
        </h1>

        {/* Tagline */}
        <p className="text-lg md:text-xl text-[#3a4856] mb-16 max-w-md text-center leading-relaxed">
          Product · Development
          <br />
          Intelligently Guided
        </p>

        {/* Date - embossed effect */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <p
            className="text-sm tracking-[0.3em] text-[#e8e8e6]"
            style={{
              textShadow:
                "1px 1px 2px rgba(255, 255, 255, 0.8), -1px -1px 1px rgba(0, 0, 0, 0.05)",
            }}
          >
            MMXXVI
          </p>
        </div>
      </div>

      {/* Subtle decorative element - single brush stroke accent */}
      <div className="absolute bottom-12 right-12 opacity-10">
        <svg
          width="120"
          height="3"
          viewBox="0 0 120 3"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 1.5C40 0.5 80 2 120 1.5"
            stroke="#1a2838"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
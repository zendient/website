import { createRoot } from "react-dom/client";
import logoImage from "./assets/zen-logo-512.png";
import { yearToRomanNumeral } from "./utils/romanNumeral";
import "./styles/globals.css";

function App() {
  return (
    <div className="min-h-screen bg-paper relative overflow-hidden">
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

        <div>
            {/* Company Name */}
            <h1 className="text-5xl md:text-6xl text-ink-dark mb-12 text-center tracking-tight">
              Zendient Labs
            </h1>

            {/* Tagline */}
            <p className="text-lg md:text-xl text-ink-medium mb-16 max-w-md text-center leading-relaxed">
              Product · Development
              <br />
              Intelligently Guided
            </p>
        </div>

        {/* Copyright Date */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <p
            className="text-md font-bold tracking-[0.3em] text-paper-embossed"
            style={{
              textShadow:
                "1px 1px 2px rgba(255, 255, 255, 0.8), -2px -2px 2px rgba(0, 0, 0, 0.05)",
            }}
          >
            {yearToRomanNumeral(2026)}
          </p>
        </div>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<App />);

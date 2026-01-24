import { createRoot } from "react-dom/client";
import { Logo } from "./components/Logo";
import { SocialLink, SocialPlatform } from "./components/SocialLink";
import { CopyrightYear } from "./components/CopyrightYear";
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
        <Logo />

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

        {/* Copyright Date and Social Links */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6">

          <div className="flex flex-row gap-4 mb-2">
            <SocialLink platform={SocialPlatform.GitHub} href="https://github.com/divv/" />
            <SocialLink platform={SocialPlatform.LinkedIn} href="https://www.linkedin.com/in/david-tout-a459b234/" />
          </div>

          <CopyrightYear year={2026} />
        </div>

      </div>

    </div>
  );
}

createRoot(document.getElementById("root")!).render(<App />);

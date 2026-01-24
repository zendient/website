import { Logo } from "./Logo";
import { SocialLink, SocialPlatform } from "./SocialLink";
import { CopyrightYear } from "./CopyrightYear";

interface PageLayoutProps {
  logoSrc?: string;
  logoAlt?: string;
}

export function PageLayout({ logoSrc, logoAlt }: PageLayoutProps) {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
      <Logo src={logoSrc} alt={logoAlt} />

      <div>
        <h1 className="text-5xl md:text-6xl text-ink-dark mb-12 text-center tracking-tight">
          Zendient Labs
        </h1>

        <p className="text-lg md:text-xl text-ink-medium mb-16 max-w-md text-center leading-relaxed">
          Product · Development
          <br />
          Intelligently Guided
        </p>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6">
        <div className="flex flex-row gap-4 mb-2">
          <SocialLink platform={SocialPlatform.GitHub} href="https://github.com/divv/" />
          <SocialLink
            platform={SocialPlatform.LinkedIn}
            href="https://www.linkedin.com/in/david-tout-a459b234/"
          />
        </div>

        <CopyrightYear year={2026} />
      </div>
    </div>
  );
}

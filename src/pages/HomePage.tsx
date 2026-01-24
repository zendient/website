import { Logo } from "../components/Logo";
import { SocialLink, SocialPlatform } from "../components/SocialLink";
import { CopyrightYear } from "../components/CopyrightYear";
import { PageBackground } from "../components/PageBackground";

export function HomePage() {
  return (
    <PageBackground bgClass="bg-paper-alt" overlayOpacity="opacity-[0.04]">
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-12">
        <Logo />

        <div>
          <h1 className="text-5xl md:text-6xl text-ink-dark mb-12 text-center tracking-tight">
            Zendient Labs
          </h1>

          <p className="text-lg md:text-xl text-ink-medium mb-16 max-w-md text-center leading-relaxed">
            Product · Development
            <br />
            Intelligent Guidance
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
    </PageBackground>
  );
}

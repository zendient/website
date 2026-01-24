import { Logo } from "../components/Logo";
import { SocialLink, SocialPlatform } from "../components/SocialLink";
import { CopyrightYear } from "../components/CopyrightYear";
import { PageBackground } from "../components/PageBackground";
import { Fade, Fades } from "../components/animate-ui/primitives/effects/fade";
import { SequencedTypingText } from "../components/SequencedTypingText";

export function HomePage() {
  return (
    <PageBackground>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-dvh px-4 pb-16 md:pb-24 md:px-6">

        <Logo />

        <div>
          <Fade
            delay={0}
            initialOpacity={0}
            opacity={1}
            inView={true}
            transition={{ type: "tween", duration: 1.5, ease: "easeInOut" }}
          >
            <h1 className="text-3xl md:text-6xl text-ink-dark mb-6 md:mb-12 text-center tracking-tight">
              Zendient Labs
            </h1>
          </Fade>

          <p className="text-base md:text-xl text-ink-medium mb-8 md:mb-16 max-w-md text-center leading-relaxed">
            <SequencedTypingText
              texts={[
                "Product · Development",
                "Intelligent Guidance",
              ]}
              keystrokeDuration={24}
              delayOffset={1000}
              textGap={2000}
              cursor={{
                showImmediately: false,
                persistenceDuration: 3000,
              }}
              reserveSpace={true}
            />
          </p>
        </div>

        <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 md:gap-6">
          <Fades
            delay={2000}
            initialOpacity={0}
            opacity={1}
            inView={true}
            transition={{ type: "tween", duration: 1.2, ease: "easeInOut" }}
          >
            <div className="flex flex-row gap-4 mb-2">
              <SocialLink platform={SocialPlatform.GitHub} href="https://github.com/divv/" />
              <SocialLink
                platform={SocialPlatform.LinkedIn}
                href="https://www.linkedin.com/in/david-tout-a459b234/"
              />
            </div>

            <CopyrightYear year={2026} />
          </Fades>
        </div>

      </div>
    </PageBackground>
  );
}

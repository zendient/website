import { Link } from "react-router-dom";
import { Logo } from "../components/Logo";
import { SocialLink, SocialPlatform } from "../components/SocialLink";
import { CopyrightYear } from "../components/CopyrightYear";
import { PageBackground } from "../components/PageBackground";
import { Fade, Fades } from "../components/animate-ui/primitives/effects/fade";
import { Haiku } from "../components/Haiku";
import { ElementalIcon } from "../components/ElementalIcon";
import { useHaiku } from "../utils/haiku";
import { useElementalTheme } from "../hooks/useElementalTheme";

export function HomePage() {
  const haiku = useHaiku();
  const theme = useElementalTheme();

  return (
    <PageBackground>
      <div className="relative z-10 flex flex-col items-center justify-center min-h-dvh px-4 pb-8 md:pb-20 md:px-6">

        <div className="flex flex-col items-center">
          <Fades
              delay={0}
              initialOpacity={0}
              opacity={1}
              inView={true}
              transition={{ type: "tween", duration: 2.5, ease: "easeInOut" }}
          >

            <Logo />

            <h1 className="text-5xl md:text-6xl text-ink-dark mb-6 text-center tracking-tight">
              Zendient Labs
            </h1>

            <span className="description-text mb-8 max-w-md block">
              Product · Design · Development
            </span>
          </Fades>

          <div className="flex flex-col items-center gap-6">
            <Fade
              delay={haiku.renderTime * 0.15}
              initialOpacity={0}
              opacity={1}
              inView={true}
              transition={{ type: "tween", duration: (haiku.renderTime * 0.85) / 1000, ease: "easeInOut" }}
            >
              <ElementalIcon theme={theme} size={72} className="text-ink-dark" />
            </Fade>

            <Haiku />
          </div>

        </div>

        <Fades
          delay={haiku.renderTime + 1500}
          initialOpacity={0}
          opacity={1}
          inView={true}
          transition={{ type: "tween", duration: 1.2, ease: "easeInOut" }}
        >
          <div className="absolute bottom-4 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 md:gap-6">
            <div className="flex flex-row gap-4 mb-2">
              <SocialLink platform={SocialPlatform.GitHub} href="https://github.com/divv/" />
              <SocialLink
                platform={SocialPlatform.LinkedIn}
                href="https://www.linkedin.com/in/david-tout-a459b234/"
              />
            </div>

            <CopyrightYear year={2026} />

            <p className="text-xs text-paper-embossed/60 hover:text-paper-embossed/90 transition-colors">
              Zendient Labs · <Link to="/privacy-policy" className="underline">Privacy Policy</Link>
            </p>
          </div>
        </Fades>
      </div>
    </PageBackground>
  );
}

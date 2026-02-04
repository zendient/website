import { Logo } from "../components/Logo";
import { Footer } from "../components/Footer";
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
      <div className="relative z-10 flex flex-col items-center h-dvh overflow-hidden px-4 md:px-6">

        <div className="flex-1 flex flex-col items-center justify-center">
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

        <Footer />

      </div>
    </PageBackground>
  );
}

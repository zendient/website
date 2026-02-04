import { Link, useLocation } from "react-router-dom";
import { SocialLink, SocialPlatform } from "./SocialLink";
import { HomeLink } from "./HomeLink";
import { CopyrightYear } from "./CopyrightYear";

export const Footer = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <footer className="mt-auto pt-4 pb-3 md:pb-6 flex flex-col items-center gap-2 md:gap-3">
      <div className="flex flex-row gap-4 mb-1">
        {!isHomePage && <HomeLink />}
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
    </footer>
  );
};

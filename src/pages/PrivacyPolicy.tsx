import { Logo } from "../components/Logo";
import { Footer } from "../components/Footer";
import { PageBackground } from "../components/PageBackground";

export function PrivacyPolicy() {
  return (
    <PageBackground>
      <div className="relative z-10 flex flex-col items-center min-h-dvh px-4 md:px-6">

        {/* Header Section */}
        <div className="flex flex-col items-center mb-12 md:mb-16 mt-8 md:mt-12">
          <Logo />
          <h1 className="text-4xl md:text-5xl text-ink-dark mb-2 text-center tracking-tight">
            Zendient Labs
          </h1>
          <h2 className="text-2xl md:text-3xl text-ink-medium text-center tracking-tight">
            Privacy Policy
          </h2>
        </div>

        {/* Policy Content */}
        <div className="max-w-3xl w-full space-y-8">

          {/* Introduction */}
          <section>
            <p className="text-base md:text-lg text-ink-medium leading-relaxed text-center">
              Your privacy is important to us. This policy explains what information we collect and how we use it across our website and browser extensions.
            </p>
          </section>

          {/* Website Section */}
          <section className="border-t border-ink-light/20 pt-8">
            <h3 className="text-2xl md:text-3xl text-ink-dark mb-6 font-semibold text-center">Website</h3>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg md:text-xl text-ink-dark mb-2 font-semibold">Information We Collect</h4>
                <p className="text-base md:text-lg text-ink-medium leading-relaxed mb-3">
                  We use Google Analytics to understand how visitors interact with our website. This service collects:
                </p>
                <ul className="list-disc list-inside text-base md:text-lg text-ink-medium leading-relaxed ml-4 space-y-2">
                  <li>Pages you visit and time spent on each page</li>
                  <li>Browser type and device information</li>
                  <li>General location (country/city level)</li>
                  <li>Referring website</li>
                </ul>
                <p className="text-base md:text-lg text-ink-medium leading-relaxed mt-3">
                  We do not collect personally identifiable information unless you voluntarily provide it.
                </p>
              </div>

              <div>
                <h4 className="text-lg md:text-xl text-ink-dark mb-2 font-semibold">How We Use Information</h4>
                <p className="text-base md:text-lg text-ink-medium leading-relaxed">
                  Analytics data helps us improve the website experience by understanding which content is most valuable to visitors. We use this information solely to enhance our services.
                </p>
              </div>

              <div>
                <h4 className="text-lg md:text-xl text-ink-dark mb-2 font-semibold">Third-Party Services</h4>
                <p className="text-base md:text-lg text-ink-medium leading-relaxed">
                  We use Google Analytics 4, which is governed by{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink-dark underline hover:opacity-70 transition-opacity"
                  >
                    Google's Privacy Policy
                  </a>
                  . Google may use the collected data to contextualize and personalize ads in their own advertising network.
                </p>
              </div>

              <div>
                <h4 className="text-lg md:text-xl text-ink-dark mb-2 font-semibold">Your Rights</h4>
                <p className="text-base md:text-lg text-ink-medium leading-relaxed">
                  You can control cookies through your browser settings. Most browsers allow you to block or delete cookies. You can also opt out of Google Analytics by installing the{" "}
                  <a
                    href="https://tools.google.com/dlpage/gaoptout"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink-dark underline hover:opacity-70 transition-opacity"
                  >
                    Google Analytics Opt-out Browser Add-on
                  </a>
                  .
                </p>
              </div>
            </div>
          </section>

          {/* Gemini Subtract Extension Section */}
          <section className="border-t border-ink-light/20 pt-8">
            <h3 className="text-2xl md:text-3xl text-ink-dark mb-6 font-semibold text-center">Gemini Subtract Browser Extension</h3>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg md:text-xl text-ink-dark mb-2 font-semibold">Data Collection</h4>
                <p className="text-base md:text-lg text-ink-medium leading-relaxed">
                  Gemini Subtract does not collect, transmit, or share any user data. All information is stored locally on your device using Chrome's storage API.
                </p>
              </div>

              <div>
                <h4 className="text-lg md:text-xl text-ink-dark mb-2 font-semibold">Permissions</h4>
                <ul className="list-disc list-inside text-base md:text-lg text-ink-medium leading-relaxed ml-4 space-y-2">
                  <li>Storage: Used exclusively to save your archived conversation preferences locally on your device.</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg md:text-xl text-ink-dark mb-2 font-semibold">Third-Party Services</h4>
                <p className="text-base md:text-lg text-ink-medium leading-relaxed">
                  This extension does not communicate with any external servers or third-party services.
                </p>
              </div>
            </div>
          </section>

          {/* Changes to Policy */}
          <section>
            <h3 className="text-xl md:text-2xl text-ink-dark mb-3 font-semibold">Changes to This Policy</h3>
            <p className="text-base md:text-lg text-ink-medium leading-relaxed">
              We may update this privacy policy from time to time. Changes will be posted on this page with an updated revision date.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h3 className="text-xl md:text-2xl text-ink-dark mb-3 font-semibold">Contact</h3>
            <p className="text-base md:text-lg text-ink-medium leading-relaxed">
              If you have questions about this privacy policy, please contact us at{" "}
              <a
                href="mailto:admin@zendient.com"
                className="text-ink-dark underline hover:opacity-70 transition-opacity"
              >
                admin@zendient.com
              </a>
              {" "}or reach out through our{" "}
              <a
                href="https://github.com/zendient"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-dark underline hover:opacity-70 transition-opacity"
              >
                GitHub
              </a>
              {" "}or{" "}
              <a
                href="https://www.linkedin.com/in/david-tout-a459b234/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-dark underline hover:opacity-70 transition-opacity"
              >
                LinkedIn
              </a>
              .
            </p>
          </section>

          {/* Last Updated */}
          <section className="text-center">
            <p className="text-sm md:text-base text-ink-light italic">
              Last updated: February 3, 2026
            </p>
          </section>

        </div>

        <Footer />

      </div>
    </PageBackground>
  );
}

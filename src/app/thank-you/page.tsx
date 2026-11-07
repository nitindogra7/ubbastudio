import type { Metadata } from "next";
import Link from "next/link";
import { StudioDialogs } from "@/components/interactions";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Icon } from "@/components/ui";

export const metadata: Metadata = {
  title: "Thank you - ubbastudio",
  description:
    "Thanks for reaching out. The UBBA Studio team will be in touch to talk about your project.",
  robots: { index: false, follow: true },
};

export default function ThankYouPage() {
  return (
    <StudioDialogs>
      <SiteHeader homePath="/" />
      <main id="main" className="thankyou-page">
        <section className="wrap thankyou-content" aria-labelledby="thank-you-heading">
          <div className="thankyou-symbol" aria-hidden="true">
            <Icon name="check" />
          </div>
          <span className="section-kicker thankyou-kicker">
            Message received. Thank you.
          </span>
          <h1 id="thank-you-heading">
            Good things<br />
            <span className="orange-text">start here.</span>
          </h1>
          <p className="thankyou-description">
            Your idea is in good hands. Our team will review your message<br className="thankyou-break" />
            {" "}and get in touch by email to talk about what&apos;s next.
          </p>
          <div className="thankyou-actions">
            <Link href="/" className="btn primary">
              Back to home
              <span className="arrow"><Icon name="arrow-right" /></span>
            </Link>
            <Link href="/#work" className="text-link">
              Explore our work <Icon name="arrow-up-right" />
            </Link>
          </div>
          <div className="thankyou-note">
            <span className="live-dot" aria-hidden="true" />
            <p>A good conversation is the next step. Keep an eye on your inbox.</p>
          </div>
        </section>
      </main>
      <div className="thankyou-footer">
        <div className="wrap"><SiteFooter homePath="/" /></div>
      </div>
    </StudioDialogs>
  );
}

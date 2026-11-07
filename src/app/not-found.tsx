import type { Metadata } from "next";
import Link from "next/link";
import { StudioDialogs } from "@/components/interactions";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Icon } from "@/components/ui";

export const metadata: Metadata = {
  title: "404 - Page not found | ubbastudio",
  description: "This page could not be found. Find your way back to UBBA Studio.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <StudioDialogs>
      <SiteHeader homePath="/" />
      <main id="main" className="notfound-page">
        <section className="wrap notfound-content" aria-labelledby="notfound-heading">
          <div className="notfound-top">
            <span className="section-kicker">A small detour</span>
            <span className="section-kicker">Error / 404</span>
          </div>
          <div className="notfound-number" aria-hidden="true">
            4<span>0</span>4
            <span className="notfound-compass"><Icon name="compass" /></span>
          </div>
          <div className="notfound-bottom">
            <div className="notfound-copy">
              <span className="section-kicker">Page not found</span>
              <h1 id="notfound-heading">A little off track.</h1>
              <p>
                This page may have moved, or the address might have a typo.
                Let&apos;s get you somewhere useful.
              </p>
            </div>
            <div className="notfound-actions">
              <Link href="/" className="btn primary">
                Back to home
                <span className="arrow"><Icon name="arrow-up-right" /></span>
              </Link>
              <div className="notfound-links">
                <Link href="/#work" className="text-link">
                  Explore our work <Icon name="arrow-right" />
                </Link>
                <Link href="/#contact" className="text-link">
                  Get in touch <Icon name="arrow-up-right" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <div className="notfound-footer">
        <div className="wrap"><SiteFooter homePath="/" /></div>
      </div>
    </StudioDialogs>
  );
}

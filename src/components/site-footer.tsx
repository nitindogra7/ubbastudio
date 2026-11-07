import { PrivacyButton } from "./interactions";
import { Icon } from "./ui";

export function SiteFooter({ homePath = "" }: { homePath?: string }) {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <a
            href={`${homePath}#home`}
            className="brand"
            aria-label="ubbastudio home"
          >
            <span className="brand-icon" />
            ubbastudio
          </a>
          <p>
            Independent minds.
            <br />
            Thoughtful digital experiences.
          </p>
        </div>
        <div>
          <h3>Explore</h3>
          <div className="footer-links">
            <a href={`${homePath}#work`}>Selected work</a>
            <a href={`${homePath}#services`}>Services</a>
            <a href={`${homePath}#about`}>The studio</a>
          </div>
        </div>
        <div>
          <h3>A little more</h3>
          <div className="footer-links">
            <a href={`${homePath}#process`}>Our process</a>
            <a href={`${homePath}#faq`}>Questions</a>
            <a href={`${homePath}#journal`}>Journal</a>
          </div>
        </div>
        <div className="footer-signoff">
          <span>
            From Delhi,
            <br />
            with intention.
          </span>
          <Icon name="arrow-up-right" />
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          © <span id="year">2026</span> ubbastudio
        </span>
        <PrivacyButton />
        <a href={`${homePath}#home`}>
          Back to top <Icon name="arrow-up" />
        </a>
      </div>
    </footer>
  );
}

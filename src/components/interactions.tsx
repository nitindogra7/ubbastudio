"use client";
import Image from "next/image";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { articles, imageUrl, services } from "@/app/data";

import { Icon } from "./ui";

type DialogContent = { category: string; title: string; body: string };
const DialogContext = createContext<(content: DialogContent) => void>(() => {});

const privacy: DialogContent = {
  category: "Privacy",
  title: "A small note on this website.",
  body: "<p>This website does not use analytics or store your project details on a server. The project form generates a text file on your device.</p><p>Photographs load from Unsplash. Your browser makes requests to that provider to display the images. Fonts are served with this website. Animation and icon libraries are bundled with this website.</p>",
};

export function StudioDialogs({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<DialogContent | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  const open = useCallback((next: DialogContent) => {
    previousFocus.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    setContent(next);
  }, []);

  useEffect(() => {
    const element = dialog.current;
    if (!content || !element) return;
    element.showModal();
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      if (element.open) element.close();
      document.documentElement.style.overflow = previousOverflow;
    };
  }, [content]);

  function close() {
    setContent(null);
    previousFocus.current?.focus({ preventScroll: true });
  }

  return (
    <DialogContext.Provider value={open}>
      {children}
      <dialog
        ref={dialog}
        className="modal"
        id="article-modal"
        aria-labelledby="modal-heading"
        onClose={close}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const rect = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
          )
            event.currentTarget.close();
        }}
      >
        <button
          className="modal-close"
          aria-label={
            content?.category === "Privacy"
              ? "Close privacy notice"
              : "Close article"
          }
          onClick={() => dialog.current?.close()}
        >
          <Icon name="x" />
        </button>
        <div className="modal-inner" id="article-content">
          {content && (
            <>
              <span className="eyebrow">
                {content.category}
                {content.category === "Privacy" ? "" : " / Studio note"}
              </span>
              <h2 id="modal-heading">{content.title}</h2>
              {/* These article bodies are trusted static copy from the supplied reference. */}
              <div dangerouslySetInnerHTML={{ __html: content.body }} />
            </>
          )}
        </div>
      </dialog>
    </DialogContext.Provider>
  );
}

export function PrivacyButton() {
  const open = useContext(DialogContext);
  return (
    <button id="privacy-button" onClick={() => open(privacy)}>
      Privacy &amp; this website
    </button>
  );
}

export function ServiceTabs() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const panel = useRef<HTMLDivElement>(null);
  const previousActive = useRef(active);
  const service = services[active];

  useLayoutEffect(() => {
    if (previousActive.current === active) return;
    previousActive.current = active;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const animation = panel.current?.animate(
      [
        { opacity: 0.4, transform: "translateY(10px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 430, easing: "ease-out" },
    );
    return () => animation?.cancel();
  }, [active]);

  function select(index: number, focus = false) {
    setActive(index);
    if (focus) refs.current[index]?.focus();
  }
  function onKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next;
    if (event.key === "ArrowRight") next = (index + 1) % services.length;
    if (event.key === "ArrowLeft")
      next = (index + services.length - 1) % services.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = services.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      select(next, true);
    }
  }

  return (
    <section className="wrap services" id="services">
      <div className="services-panel">
        <div className="section-head reveal">
          <div>
            <span className="section-kicker">
              <Icon name="shapes" />
              02 / What we do
            </span>
            <h2 className="section-title">
              From what if.
              <br />
              To what&apos;s next.
            </h2>
            <p>
              Five ways to move your business forward.
              <br />
              One team, from the first conversation to the next release.
            </p>
          </div>
          <a href="#contact" className="btn primary">
            Start a project{" "}
            <span className="arrow">
              <Icon name="arrow-right" />
            </span>
          </a>
        </div>
        <div className="tabs" role="tablist" aria-label="Our services">
          {services.map((item, index) => (
            <button
              className="tab"
              id={`tab-${index}`}
              key={item.label}
              role="tab"
              aria-selected={active === index}
              aria-controls="service-panel"
              tabIndex={active === index ? 0 : -1}
              data-service={index}
              ref={(node) => {
                refs.current[index] = node;
              }}
              onClick={() => select(index)}
              onKeyDown={(event) => onKey(event, index)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div
          ref={panel}
          className="service-content"
          id="service-panel"
          role="tabpanel"
          aria-labelledby={`tab-${active}`}
          tabIndex={0}
        >
          <div className="service-copy">
            <h3 id="service-title">{service.title}</h3>
            <ul id="service-list">
              {service.list.map((line) => (
                <li key={line}>
                  <Icon name="check" />
                  {line}
                </li>
              ))}
            </ul>
            <p className="service-foot" id="service-foot">
              {service.foot}
            </p>
          </div>
          <div className="service-image">
            <Image
              sizes="(max-width: 540px) 90vw, 40vw"
              id="service-img"
              loading="lazy"
              src={imageUrl(service.photo, 900, 80)}
              alt={service.alt}
              width={900}
              height={740}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function Journal() {
  const open = useContext(DialogContext);
  const viewport = useRef<HTMLDivElement>(null);
  const current = useRef(0);
  const [active, setActive] = useState(0);

  function goTo(index: number, immediate = false) {
    const element = viewport.current;
    if (!element || !window.matchMedia("(max-width: 800px)").matches) return;
    const next = (index + articles.length) % articles.length;
    const card = element.querySelectorAll<HTMLElement>(".journal-card")[next];
    if (!card) return;
    element.scrollTo({
      left: card.offsetLeft,
      behavior:
        immediate || window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
    });
  }

  useEffect(() => {
    const element = viewport.current;
    if (!element) return;
    const resize = new ResizeObserver(() => {
      const mobile = window.matchMedia("(max-width: 800px)").matches;
      const card = element.querySelectorAll<HTMLElement>(".journal-card")[current.current];
      element.scrollTo({ left: mobile && card ? card.offsetLeft : 0, behavior: "instant" });
    });
    resize.observe(element);
    return () => resize.disconnect();
  }, []);

  function update() {
    const element = viewport.current;
    if (!element || !window.matchMedia("(max-width: 800px)").matches) return;
    const cards = Array.from(element.querySelectorAll<HTMLElement>(".journal-card"));
    const nearest = cards.reduce(
      (best, card, index) =>
        Math.abs(card.offsetLeft - element.scrollLeft) <
        Math.abs(cards[best].offsetLeft - element.scrollLeft) ? index : best,
      0,
    );
    current.current = nearest;
    setActive(nearest);
  }

  function onKey(event: KeyboardEvent<HTMLDivElement>) {
    if (!window.matchMedia("(max-width: 800px)").matches) return;
    let next: number | undefined;
    if (event.key === "ArrowRight") next = current.current + 1;
    if (event.key === "ArrowLeft") next = current.current - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = articles.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    goTo(next);
  }

  return (
    <section className="section wrap journal" id="journal">
      <div className="section-head reveal">
        <div>
          <span className="section-kicker">
            <span className="index">07 /</span> Field notes
          </span>
          <h2 className="section-title">
            A little thinking.
            <br />
            <span className="muted">Out in the open.</span>
          </h2>
        </div>
        <p className="muted">
          A few notes on process, products and the craft of building better
          software.
        </p>
      </div>
      <div
        ref={viewport}
        id="journal-viewport"
        className="journal-viewport"
        role="region"
        aria-label="Journal articles"
        tabIndex={0}
        onScroll={update}
        onKeyDown={onKey}
        onFocusCapture={(event) => {
          const card = (event.target as HTMLElement).closest<HTMLElement>(".journal-card");
          if (card) goTo(Number(card.dataset.article), true);
        }}
      >
        <div className="journal-grid">
          {articles.map((article, index) => (
            <button
              type="button"
              className="journal-card reveal"
              key={article.title}
              data-article={index}
              onClick={() => open(article)}
            >
              <div className="journal-image" data-image-reveal>
                <Image
                  sizes="(max-width: 800px) 90vw, 30vw"
                  loading="lazy"
                  src={imageUrl(article.image, 800, 80)}
                  alt={article.alt}
                  width={800}
                  height={570}
                />
              </div>
              <div className="journal-meta">
                <span>{article.category}</span>
                <span>Studio note ? 2 min read</span>
              </div>
              <h3>
                {article.title}{" "}
                <Icon name="arrow-up-right" className="journal-arrow" />
              </h3>
            </button>
          ))}
        </div>
      </div>
      <div className="journal-controls">
        <div className="journal-pagination" aria-label="Choose a journal article">
          {articles.map((article, index) => (
            <button
              type="button"
              key={article.title}
              aria-label={"Show article: " + article.title}
              aria-current={active === index ? "true" : undefined}
              aria-controls="journal-viewport"
              onClick={() => goTo(index)}
            >
              <span />
            </button>
          ))}
        </div>
        <div className="carousel-navigation">
          <span className="carousel-count" aria-hidden="true">
            0{active + 1}<span> / 0{articles.length}</span>
          </span>
          <button type="button" aria-label="Previous journal article" aria-controls="journal-viewport" onClick={() => goTo(current.current - 1)}>
            <Icon name="arrow-right" />
          </button>
          <button type="button" aria-label="Next journal article" aria-controls="journal-viewport" onClick={() => goTo(current.current + 1)}>
            <Icon name="arrow-right" />
          </button>
        </div>
        <p className="sr-only" aria-live="polite" aria-atomic="true">
          Article {active + 1} of {articles.length}: {articles[active].title}
        </p>
      </div>
    </section>
  );
}

export function ProjectForm() {
  const [status, setStatus] = useState("");
  const urls = useRef(new Set<string>());
  useEffect(() => {
    const pendingUrls = urls.current;
    return () => {
      pendingUrls.forEach((url) => URL.revokeObjectURL(url));
      pendingUrls.clear();
    };
  }, []);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = Object.fromEntries(new FormData(form));
    const brief = `UBBASTUDIO — PROJECT BRIEF\n\nName: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company || "—"}\nBudget: ${data.budget}\n\nABOUT THE PROJECT\n${data.project}\n`;
    const url = URL.createObjectURL(
      new Blob([brief], { type: "text/plain;charset=utf-8" }),
    );
    urls.current.add(url);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ubbastudio-project-brief.txt";
    link.click();
    window.setTimeout(() => {
      URL.revokeObjectURL(url);
      urls.current.delete(url);
    }, 2000);
    setStatus(
      "Your brief has been prepared for download. No enquiry has been sent.",
    );
  }

  return (
    <form className="form" id="project-form" onSubmit={submit}>
      <div className="form-row">
        <div className="field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            placeholder="Your name"
            autoComplete="name"
            required
            maxLength={120}
          />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@company.com"
            autoComplete="email"
            required
            maxLength={200}
          />
        </div>
      </div>
      <div className="field">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          placeholder="Optional"
          autoComplete="organization"
          maxLength={200}
        />
      </div>
      <fieldset>
        <legend>Budget</legend>
        <div className="budget-options">
          {[
            ["Under ₹1 lakh", "Under ₹1L"],
            ["₹1–3 lakh", "₹1L–3L"],
            ["₹3–5 lakh", "₹3L–5L"],
            ["₹5 lakh+", "₹5L+"],
            ["Let’s discuss", "Let’s discuss"],
          ].map(([value, label], index) => (
            <label key={value}>
              <input
                type="radio"
                name="budget"
                value={value}
                defaultChecked={index === 4}
              />{" "}
              {label}
            </label>
          ))}
        </div>
      </fieldset>
      <div className="field">
        <label htmlFor="project">About your project</label>
        <textarea
          id="project"
          name="project"
          placeholder="What are you building, and when do you need it?"
          required
          maxLength={5000}
        />
      </div>
      <button className="btn primary" type="submit">
        <span id="submit-label">Download project brief</span>{" "}
        <span className="arrow" aria-hidden="true">
          <Icon name="arrow-down-to-line" />
        </span>
      </button>
      <p className="form-note" id="form-note">
        Your brief downloads as a text file. Nothing is sent or stored on a
        server.
      </p>
      <p className="form-status" id="form-status" role="status">
        {status}
      </p>
    </form>
  );
}

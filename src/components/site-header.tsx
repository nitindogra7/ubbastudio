"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Icon } from "./ui";

const navigation = [
  ["Work", "work"],
  ["Services", "services"],
  ["Studio", "about"],
  ["Process", "process"],
  ["Journal", "journal"],
];
export function SiteHeader({ homePath = "" }: { homePath?: string }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const header = useRef<HTMLElement>(null);
  const nav = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const closeMenu = useRef<() => void>(() => {});
  useEffect(() => {
    let frame = 0;
    const update = () => {
      header.current?.classList.toggle("scrolled", window.scrollY > 30);
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -55% 0px" },
    );
    [
      "home",
      "work",
      "services",
      "about",
      "process",
      "journal",
      "contact",
    ].forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 800px)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const element = nav.current;
    if (!element) return;
    let closing: gsap.core.Tween | undefined;
    let entrance: gsap.core.Tween | undefined;
    let focusFrame = 0;
    const previousOverflow = document.documentElement.style.overflow;
    const restoreFocus = () => toggle.current?.focus({ preventScroll: true });
    if (open && mobile.matches) {
      document.documentElement.style.overflow = "hidden";
      if (!reduced.matches)
        entrance = gsap.fromTo(
          element.querySelectorAll("a"),
          { y: 15, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.035,
            duration: 0.25,
            clearProps: "all",
          },
        );
      focusFrame = requestAnimationFrame(() =>
        element.querySelector("a")?.focus({ preventScroll: true }),
      );
    }
    const close = () => {
      if (!open) return;
      if (reduced.matches) {
        setOpen(false);
        restoreFocus();
        return;
      }
      closing = gsap.to(element, {
        opacity: 0,
        y: -8,
        duration: 0.14,
        onComplete: () => {
          gsap.set(element, { clearProps: "all" });
          setOpen(false);
          restoreFocus();
        },
      });
    };
    closeMenu.current = close;
    const onKey = (event: KeyboardEvent) => {
      if (!open || !mobile.matches) return;
      if (event.key === "Escape") {
        event.preventDefault();
        close();
      }
      if (event.key !== "Tab") return;
      const first = element.querySelector<HTMLAnchorElement>("a");
      const last = element.querySelector<HTMLAnchorElement>(".mobile-contact");
      // The persistent header CTA is visually hidden while the menu is open.
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        toggle.current?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        toggle.current?.focus();
      } else if (document.activeElement === toggle.current) {
        event.preventDefault();
        (event.shiftKey ? last : first)?.focus();
      }
    };
    const resize = () => {
      if (!mobile.matches) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    mobile.addEventListener("change", resize);
    return () => {
      cancelAnimationFrame(focusFrame);
      closing?.kill();
      entrance?.revert();
      gsap.set(element, { clearProps: "all" });
      document.documentElement.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      mobile.removeEventListener("change", resize);
    };
  }, [open]);
  function navigate(id: string) {
    setOpen(false);
    const target = document.getElementById(id);
    target?.setAttribute("tabindex", "-1");
    target?.focus({ preventScroll: true });
  }
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header ref={header} className={"nav" + (open ? " menu-is-open" : "")}>
        <div className="wrap nav-inner">
          <a
            href={`${homePath}#home`}
            className="brand"
            aria-label="ubbastudio home"
            onClick={() => navigate("home")}
          >
            <span className="brand-icon" />
            ubbastudio
          </a>
          <nav
            ref={nav}
            className={"nav-links" + (open ? " open" : "")}
            id="navigation"
            aria-label="Main navigation"
          >
            {navigation.map(([label, id]) => (
              <a
                key={id}
                href={`${homePath}#${id}`}
                aria-current={active === id ? "location" : undefined}
                onClick={() => navigate(id)}
              >
                {label}
                <span className="mobile-nav-arrow">
                  <Icon name="arrow-up-right" />
                </span>
              </a>
            ))}
            <a
              href={`${homePath}#contact`}
              className="mobile-contact"
              onClick={() => navigate("contact")}
            >
              Start a project <Icon name="arrow-up-right" />
            </a>
          </nav>
          <a
            className="nav-cta"
            href={`${homePath}#contact`}
            onClick={() => navigate("contact")}
          >
            Start a project <Icon name="arrow-up-right" />
          </a>
          <button
            ref={toggle}
            type="button"
            className="menu-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="navigation"
            onClick={() => (open ? closeMenu.current() : setOpen(true))}
          >
            <Icon name={open ? "x" : "menu"} />
          </button>
        </div>
      </header>
    </>
  );
}

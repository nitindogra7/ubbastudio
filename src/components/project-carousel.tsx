"use client";

import {
  Children,
  useCallback,
  useRef,
  useState,
  type ReactNode,
  type PointerEvent,
  type KeyboardEvent,
} from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Icon } from "./ui";
import { motion } from "./motion";
gsap.registerPlugin(useGSAP);

export function ProjectCarousel({
  children,
  labels,
}: {
  children: ReactNode;
  labels: string[];
}) {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const index = useRef(0);
  const tween = useRef<gsap.core.Tween | null>(null);
  const frame = useRef(0);
  const reduced = useRef(false);
  const drag = useRef<{ x: number; scroll: number; moved: boolean } | null>(
    null,
  );
  const suppressClick = useRef(false);
  const slides = Children.toArray(children);

  const nearest = useCallback(() => {
    const element = viewport.current;
    if (!element) return 0;
    const cards = Array.from(
      element.querySelectorAll<HTMLElement>(".carousel-slide"),
    );
    return cards.reduce(
      (best, card, current) =>
        Math.abs(card.offsetLeft - element.scrollLeft) <
        Math.abs(cards[best].offsetLeft - element.scrollLeft)
          ? current
          : best,
      0,
    );
  }, []);

  const goTo = useCallback(
    (next: number, immediate = false) => {
      const element = viewport.current;
      const card =
        element?.querySelectorAll<HTMLElement>(".carousel-slide")[
          (next + labels.length) % labels.length
        ];
      if (!element || !card) return;
      tween.current?.kill();
      if (reduced.current || immediate) {
        element.style.removeProperty("scroll-snap-type");
        element.scrollLeft = card.offsetLeft;
      } else {
        // Disable snapping during the tween, then let the browser own touch scrolling.
        element.style.scrollSnapType = "none";
        tween.current = gsap.to(element, {
          scrollLeft: card.offsetLeft,
          duration: 0.65,
          ease: motion.ease,
          onComplete: () => {
            element.style.removeProperty("scroll-snap-type");
          },
        });
      }
    },
    [labels.length],
  );

  useGSAP(
    () => {
      const element = viewport.current;
      if (!element) return;
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: reduce)", () => {
        reduced.current = true;
        tween.current?.progress(1);
        return () => {
          reduced.current = false;
        };
      });
      const resize = new ResizeObserver(() => goTo(index.current, true));
      resize.observe(element);
      const hash = () => {
        const card = document
          .getElementById(window.location.hash.slice(1))
          ?.closest<HTMLElement>(".carousel-slide");
        if (card && element.contains(card))
          goTo(Number(card.dataset.index), true);
      };
      hash();
      window.addEventListener("hashchange", hash);
      return () => {
        media.revert();
        tween.current?.kill();
        resize.disconnect();
        cancelAnimationFrame(frame.current);
        window.removeEventListener("hashchange", hash);
      };
    },
    { scope: root, dependencies: [goTo] },
  );

  function update() {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      index.current = nearest();
      setActive(index.current);
    });
  }
  function onKey(event: KeyboardEvent<HTMLDivElement>) {
    let next: number | undefined;
    if (event.key === "ArrowRight") next = index.current + 1;
    if (event.key === "ArrowLeft") next = index.current - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = labels.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      goTo(next);
    }
  }
  function pointerDown(event: PointerEvent<HTMLDivElement>) {
    tween.current?.kill();
    event.currentTarget.style.removeProperty("scroll-snap-type");
    suppressClick.current = false;
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    tween.current?.kill();
    suppressClick.current = false;
    drag.current = {
      x: event.clientX,
      scroll: event.currentTarget.scrollLeft,
      moved: false,
    };
  }
  function pointerMove(event: PointerEvent<HTMLDivElement>) {
    const start = drag.current;
    if (!start || event.buttons !== 1) return;
    const distance = event.clientX - start.x;
    if (Math.abs(distance) < 6 && !start.moved) return;
    start.moved = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.style.scrollSnapType = "none";
    event.currentTarget.classList.add("is-dragging");
    event.currentTarget.scrollLeft = start.scroll - distance;
    event.preventDefault();
  }
  function pointerUp(event: PointerEvent<HTMLDivElement>) {
    const moved = drag.current?.moved;
    drag.current = null;
    event.currentTarget.classList.remove("is-dragging");
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
    if (moved) {
      suppressClick.current = true;
      goTo(nearest());
    } else event.currentTarget.style.removeProperty("scroll-snap-type");
  }

  return (
    <div
      ref={root}
      className="project-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Selected concept projects"
    >
      <div
        ref={viewport}
        className="work-viewport"
        tabIndex={0}
        aria-label="Swipe or use left and right arrow keys to browse projects"
        onScroll={update}
        onKeyDown={onKey}
        onPointerDown={pointerDown}
        onPointerMove={pointerMove}
        onPointerUp={pointerUp}
        onPointerCancel={pointerUp}
        onDragStart={(event) => event.preventDefault()}
        onClickCapture={(event) => {
          if (suppressClick.current) {
            event.preventDefault();
            event.stopPropagation();
            suppressClick.current = false;
          }
        }}
        onFocusCapture={(event) => {
          const card = (event.target as HTMLElement).closest<HTMLElement>(
            ".carousel-slide",
          );
          if (card && Number(card.dataset.index) !== index.current)
            goTo(Number(card.dataset.index), true);
        }}
      >
        <div className="work-track">
          {slides.map((slide, slideIndex) => (
            <div
              key={labels[slideIndex]}
              className="carousel-slide"
              data-index={slideIndex}
              data-active={slideIndex === active}
              role="group"
              aria-roledescription="slide"
              aria-label={
                slideIndex +
                1 +
                " of " +
                labels.length +
                ": " +
                labels[slideIndex]
              }
            >
              {slide}
            </div>
          ))}
        </div>
      </div>
      <div className="carousel-footer">
        <div className="carousel-tabs" aria-label="Choose a project">
          {labels.map((label, slideIndex) => (
            <button
              key={label}
              type="button"
              aria-label={"Show " + label}
              aria-current={slideIndex === active ? "true" : undefined}
              onClick={() => goTo(slideIndex)}
            >
              <span>0{slideIndex + 1}</span>
              <span className="carousel-tab-name">{label}</span>
              <i aria-hidden="true" />
            </button>
          ))}
        </div>
        <div className="carousel-navigation">
          <span className="carousel-count" aria-hidden="true">
            0{active + 1}
            <span> / 0{labels.length}</span>
          </span>
          <button
            type="button"
            aria-label="Previous project"
            onClick={() => goTo(index.current - 1)}
          >
            <Icon name="arrow-right" />
          </button>
          <button
            type="button"
            aria-label="Next project"
            onClick={() => goTo(index.current + 1)}
          >
            <Icon name="arrow-right" />
          </button>
        </div>
      </div>
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        Project {active + 1} of {labels.length}: {labels[active]}
      </p>
    </div>
  );
}

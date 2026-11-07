"use client";
import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "./motion";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function PageMotion({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      const year = root.querySelector("#year");
      if (year) year.textContent = String(new Date().getFullYear());
      const media = gsap.matchMedia();
      const cleanups: (() => void)[] = [];
      let disposed = false;
      let refreshFrame = 0;
      const refresh = () => {
        cancelAnimationFrame(refreshFrame);
        refreshFrame = requestAnimationFrame(() => {
          if (!disposed) ScrollTrigger.refresh();
        });
      };
      media.add("(prefers-reduced-motion: no-preference)", () => {
        // Server HTML stays readable. Only enhance content still below the fold,
        // so restored scroll positions and direct section links stay visible.
        const belowFold = (element: Element) =>
          element.getClientRects().length > 0 &&
          element.getBoundingClientRect().top >= window.innerHeight * 0.9;
        const hero = root.querySelector<HTMLElement>(".hero");
        if (
          hero &&
          hero.getBoundingClientRect().bottom > 0 &&
          window.scrollY < 100
        ) {
          gsap
            .timeline({ defaults: { ease: motion.ease } })
            .from(".hero-word", {
              yPercent: 115,
              rotate: 2,
              duration: motion.entrance,
              stagger: 0.075,
              clearProps: "transform",
            })
            .from(
              ".hero-enter",
              {
                y: 18,
                opacity: 0,
                duration: motion.reveal,
                stagger: 0.07,
                clearProps: "transform,opacity",
              },
              0.22,
            )
            .from(
              ".hero-art",
              {
                opacity: 0,
                duration: motion.reveal,
                clearProps: "opacity",
              },
              0.18,
            )
            .fromTo(
              ".art-stroke",
              { strokeDasharray: 1, strokeDashoffset: 1 },
              {
                strokeDashoffset: 0,
                duration: 1.25,
                ease: "power2.inOut",
                clearProps: "strokeDasharray,strokeDashoffset",
              },
              0.28,
            )
            .from(
              ".art-dot",
              {
                scale: 0,
                transformOrigin: "50% 50%",
                duration: 0.45,
                ease: "back.out(1.6)",
                clearProps: "transform,transformOrigin",
              },
              1.05,
            );
        }
        root.querySelectorAll<HTMLElement>(".reveal").forEach((element) => {
          if (!belowFold(element)) return;
          gsap.from(element, {
            y: 24,
            opacity: 0,
            duration: motion.reveal,
            ease: motion.ease,
            clearProps: "transform,opacity",
            scrollTrigger: { trigger: element, start: "top 92%", once: true },
          });
        });
        root.querySelectorAll<HTMLElement>(".process-step").forEach((row) => {
          if (!belowFold(row)) return;
          gsap.from(row.children, {
            y: 16,
            opacity: 0,
            stagger: 0.055,
            duration: motion.reveal,
            ease: motion.ease,
            clearProps: "transform,opacity",
            scrollTrigger: { trigger: row, start: "top 92%", once: true },
          });
        });
        root.querySelectorAll<HTMLElement>("[data-image-reveal]").forEach((image) => {
          if (!belowFold(image)) return;
          gsap.fromTo(
            image,
            { clipPath: "inset(0% 0% 100% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.05,
              ease: "power3.inOut",
              clearProps: "clipPath",
              scrollTrigger: { trigger: image, start: "top 90%", once: true },
            },
          );
        });
        const closing = root.querySelector<HTMLElement>(".contact-heading-row");
        if (closing && belowFold(closing)) {
          gsap
            .timeline({
              scrollTrigger: { trigger: closing, start: "top 85%", once: true },
              defaults: { ease: motion.ease, clearProps: "transform,opacity" },
            })
            .from(".closing-line", {
              yPercent: 105,
              stagger: 0.12,
              duration: motion.entrance,
            })
            .from(
              ".closing-arrow",
              { scale: 0.75, rotate: -35, opacity: 0, duration: motion.entrance },
              0.15,
            );
        }
      });
      media.add(
        "(min-width: 1000px) and (prefers-reduced-motion: no-preference)",
        () => {
          root.querySelectorAll<HTMLElement>("[data-parallax]").forEach((image) => {
            gsap.fromTo(
              image,
              { yPercent: -5, scale: 1.045 },
              {
                yPercent: -1,
                scale: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: image.parentElement,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.6,
                },
              },
            );
          });
        },
      );
      media.add(
        "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          const listeners: (() => void)[] = [];
          const resets: (() => void)[] = [];
          root.querySelectorAll<HTMLElement>(".btn.primary, .nav-cta").forEach((button) => {
            // Keep the link's hit area fixed while its arrow follows the pointer.
            const arrow = button.querySelector<HTMLElement | SVGElement>(".arrow, svg");
            if (!arrow) return;
            const x = gsap.quickTo(arrow, "x", { duration: motion.short, ease: motion.ease });
            const y = gsap.quickTo(arrow, "y", { duration: motion.short, ease: motion.ease });
            const move = (event: PointerEvent) => {
              if (event.pointerType !== "mouse") return;
              const bounds = button.getBoundingClientRect();
              x(gsap.utils.clamp(-6, 6, (event.clientX - bounds.left - bounds.width / 2) * 0.07));
              y(gsap.utils.clamp(-4, 4, (event.clientY - bounds.top - bounds.height / 2) * 0.12));
            };
            const reset = () => {
              x(0);
              y(0);
            };
            resets.push(reset);
            button.addEventListener("pointermove", move);
            button.addEventListener("pointerleave", reset);
            button.addEventListener("pointercancel", reset);
            button.addEventListener("blur", reset);
            listeners.push(() => {
              button.removeEventListener("pointermove", move);
              button.removeEventListener("pointerleave", reset);
              button.removeEventListener("pointercancel", reset);
              button.removeEventListener("blur", reset);
            });
          });
          const resetAll = () => resets.forEach((reset) => reset());
          window.addEventListener("blur", resetAll);
          return () => {
            window.removeEventListener("blur", resetAll);
            listeners.forEach((cleanup) => cleanup());
          };
        },
      );
      root.querySelectorAll<HTMLImageElement>("img").forEach((image) => {
        image.addEventListener("load", refresh);
        image.addEventListener("error", refresh);
        cleanups.push(() => {
          image.removeEventListener("load", refresh);
          image.removeEventListener("error", refresh);
        });
      });
      let faqRefresh = 0;
      const onFaqToggle = () => {
        window.clearTimeout(faqRefresh);
        faqRefresh = window.setTimeout(refresh, 350);
      };
      root.querySelectorAll(".accordion details").forEach((item) => {
        item.addEventListener("toggle", onFaqToggle);
        cleanups.push(() => item.removeEventListener("toggle", onFaqToggle));
      });
      cleanups.push(() => window.clearTimeout(faqRefresh));
      document.fonts.ready.then(() => {
        if (!disposed) refresh();
      });
      refresh();
      return () => {
        disposed = true;
        cancelAnimationFrame(refreshFrame);
        cleanups.forEach((cleanup) => cleanup());
        media.revert();
      };
    },
    { scope },
  );
  return <div ref={scope}>{children}</div>;
}

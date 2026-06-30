"use client";

import { FaGithub } from "react-icons/fa6";
import { useReducedMotion } from "motion/react";

export default function HeroSection() {
  const shouldReduceMotion = useReducedMotion() ?? false;

  const anim = (name: string) =>
    shouldReduceMotion ? "none" : name;

  return (
    <section
      className="sticky! top-0 relative w-svw min-h-svh grid place-items-center overflow-hidden isolate"
      aria-labelledby="hero-title"
      style={{
        background:
          "radial-gradient(circle at 72% 22%, color-mix(in srgb, var(--color-support-saffron) 22%, transparent), transparent 28rem),radial-gradient(circle at 48% 58%, color-mix(in srgb, var(--color-support-copper) 10%, transparent), transparent 34rem),radial-gradient(circle at 18% 72%, color-mix(in srgb, var(--color-support-blue) 74%, transparent), transparent 32rem),linear-gradient(180deg, var(--color-bg-deep), var(--color-bg) 58%, var(--color-bg-deep))",
      }}
    >
      {/* hero-stage::before — cloud drift */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          zIndex: -3,
          background:
            "linear-gradient(18deg, transparent 0 17%, color-mix(in srgb, var(--color-text) 34%, transparent) 18% 25%, transparent 33% 100%),linear-gradient(172deg, transparent 0 56%, color-mix(in srgb, var(--color-text) 22%, transparent) 58% 65%, transparent 74% 100%),linear-gradient(0deg, color-mix(in srgb, var(--color-bg-deep) 72%, transparent), transparent 34%, transparent 66%, color-mix(in srgb, var(--color-text) 10%, transparent))",
          filter: "blur(24px)",
          transform: "scale(1.08)",
          animation: anim("hero-cloud-drift 14s ease-in-out infinite alternate"),
        }}
      />

      {/* hero-clouds */}
      <div
        className="absolute inset-[-8%] pointer-events-none"
        aria-hidden="true"
        style={{
          zIndex: -2,
          background:
            "radial-gradient(ellipse 62% 17% at 17% 41%, color-mix(in srgb, var(--color-text) 26%, transparent), transparent 68%),radial-gradient(ellipse 55% 14% at 78% 28%, color-mix(in srgb, var(--color-text) 18%, transparent), transparent 70%),radial-gradient(ellipse 66% 18% at 73% 78%, color-mix(in srgb, var(--color-support-saffron) 16%, transparent), transparent 72%),radial-gradient(ellipse 42% 12% at 31% 77%, color-mix(in srgb, var(--color-support-blue) 42%, transparent), transparent 74%)",
          filter: "blur(14px)",
        }}
      />

      {/* hero-stage::after — light sweep */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          zIndex: -1,
          background:
            "linear-gradient(90deg, color-mix(in srgb, var(--color-support-saffron) 18%, transparent), transparent 22%, transparent 78%, color-mix(in srgb, var(--color-support-copper) 12%, transparent)),linear-gradient(115deg, transparent 0 43%, color-mix(in srgb, var(--color-support-blue) 42%, transparent) 45% 49%, transparent 51% 100%)",
          mixBlendMode: "soft-light",
          animation: anim("hero-light-sweep 7s ease-in-out infinite alternate"),
        }}
      />

      {/* hero-frame */}
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          zIndex: 1,
          inset: "clamp(14px, 2vw, 32px)",
          border: "1px solid var(--color-border-strong)",
          borderRadius: "clamp(18px, 2.4vw, 34px)",
          boxShadow:
            "inset 0 1px 0 var(--color-border-strong), inset 0 -1px 0 color-mix(in srgb, var(--color-bg-deep) 58%, transparent)",
        }}
      />

      {/* hero-grain */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          zIndex: 3,
          opacity: 0.24,
          backgroundImage:
            "radial-gradient(color-mix(in srgb, var(--color-bg-deep) 70%, transparent) 0.75px, transparent 0.75px),linear-gradient(color-mix(in srgb, var(--color-text) 10%, transparent) 50%, transparent 50%)",
          backgroundSize: "6px 6px, 100% 4px",
        }}
      />

      {/* hero-content */}
      <div
        className="hero-content-responsive relative z-2 grid justify-items-center text-center"
        style={{
          width: "min(1220px, calc(100% - clamp(32px, 8vw, 132px)))",
          gap: "clamp(18px, 4svh, 42px)",
          paddingBlock: "clamp(56px, 12svh, 132px)",
        }}
      >
        {/* hero-content::before — decorative block */}
        <div
          className="content-before row-start-1 col-start-1"
          aria-hidden="true"
          style={{
            width: "min(560px, 62vw)",
            height: "clamp(34px, 5vw, 60px)",
            background: "var(--color-surface-elevated)",
            border: "1px solid var(--color-border)",
            boxShadow: "0 18px 54px var(--color-shadow)",
            animation: anim("hero-rise 700ms ease both 120ms"),
          }}
        />

        {/* hero-subtitle */}
        <p
          className="z-1 row-start-1 col-start-1 self-center m-0 max-w-[min(700px,88vw)] font-pixel text-copy"
          style={{
            fontSize: "clamp(12px, 1.35vw, 19px)",
            lineHeight: 1.4,
            fontWeight: 400,
            animation: anim("hero-rise 780ms ease both 560ms"),
          }}
        >
          UNIFBV WYDEN - Matheus Maranhao
        </p>

        {/* hero-title */}
        <h1
          id="hero-title"
          className="m-0 grid justify-items-center text-copy"
          style={{
            gap: "clamp(4px, 1.8vw, 18px)",
            textShadow:
              "0 18px 56px color-mix(in srgb, var(--color-bg-deep) 68%, transparent)",
          }}
        >
          <span
            className="hero-title-row-responsive flex items-baseline justify-center gap-[0.06em] whitespace-nowrap"
            style={{
              fontSize: "clamp(40px, 9.6vw, 142px)",
              lineHeight: 0.88,
              animation: anim(
                "hero-title-rise 880ms cubic-bezier(0.2, 0.8, 0.2, 1) both 260ms",
              ),
            }}
          >
            <span className="inline-block font-display text-[1em] font-normal">
              Seguranca
            </span>
            <span className="inline-block font-pixel text-[0.76em] font-normal">
              Digital
            </span>
          </span>
          <span
            className="hero-title-row-responsive flex items-baseline justify-center gap-[0.06em] whitespace-nowrap"
            style={{
              fontSize: "clamp(38px, 9vw, 132px)",
              lineHeight: 0.88,
              animation: anim(
                "hero-title-rise 880ms cubic-bezier(0.2, 0.8, 0.2, 1) both 380ms",
              ),
            }}
          >
            <span className="inline-block font-display text-[1em] font-normal">
              para
            </span>
            <span className="inline-block font-pixel text-[0.76em] font-normal">
              Estudantes
            </span>
          </span>
        </h1>

        {/* description */}
        <span className="text-center text-xs font-bold">
          Aprenda pr&aacute;ticas simples para proteger suas contas, seus
          trabalhos acad&ecirc;micos e sua conviv&ecirc;ncia nos ambientes
          digitais.
        </span>

        {/* hero-github */}
        <a
          className="grid place-items-center text-accent outline-offset-4 transition-colors hover:text-copy focus-visible:outline-3 focus-visible:outline-accent"
          href="https://github.com/Theuzu/seguranca-digital-estudantes"
          target="_blank"
          rel="noreferrer"
          aria-label="Abrir repositório do projeto no GitHub"
          style={{
            width: "clamp(34px, 3.6vw, 48px)",
            aspectRatio: 1,
            fontSize: "clamp(30px, 3.2vw, 44px)",
            animation: anim("hero-rise 780ms ease both 680ms"),
          }}
        >
          <FaGithub aria-hidden="true" />
        </a>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .hero-content-responsive {
            width: min(100% - 28px, 620px) !important;
            gap: clamp(16px, 3.6svh, 30px) !important;
          }
          .hero-content-responsive .content-before {
            width: min(310px, 74vw) !important;
            height: 38px !important;
          }
          .hero-title-row-responsive {
            font-size: clamp(38px, 10.8vw, 54px) !important;
          }
          .hero-title-row-responsive:nth-child(2) {
            font-size: clamp(36px, 10.2vw, 51px) !important;
          }
        }
      `}</style>
    </section>
  );
}

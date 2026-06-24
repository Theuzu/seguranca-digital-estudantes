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
          "linear-gradient(180deg, rgba(9,17,42,0.28), rgba(245,246,250,0.12) 45%, rgba(9,17,42,0.22)),linear-gradient(135deg, #8f9bb7 0%, #c9cbd8 36%, #eef2fb 50%, #a4aec7 72%, #6f7f9d 100%)",
      }}
    >
      {/* hero-stage::before — cloud drift */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          zIndex: -3,
          background:
            "linear-gradient(18deg, transparent 0 17%, rgba(245,246,250,0.8) 18% 25%, transparent 33% 100%),linear-gradient(172deg, transparent 0 56%, rgba(245,246,250,0.52) 58% 65%, transparent 74% 100%),linear-gradient(0deg, rgba(9,17,42,0.24), transparent 34%, transparent 66%, rgba(245,246,250,0.18))",
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
            "radial-gradient(ellipse 62% 17% at 17% 41%, rgba(245,246,250,0.86), transparent 68%),radial-gradient(ellipse 55% 14% at 78% 28%, rgba(245,246,250,0.72), transparent 70%),radial-gradient(ellipse 66% 18% at 73% 78%, rgba(245,246,250,0.58), transparent 72%),radial-gradient(ellipse 42% 12% at 31% 77%, rgba(79,124,255,0.16), transparent 74%)",
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
            "linear-gradient(90deg, rgba(255,184,77,0.22), transparent 22%, transparent 78%, rgba(126,219,138,0.2)),linear-gradient(115deg, transparent 0 43%, rgba(79,124,255,0.14) 45% 49%, transparent 51% 100%)",
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
          border: "1px solid rgba(245,246,250,0.28)",
          borderRadius: "clamp(18px, 2.4vw, 34px)",
          boxShadow:
            "inset 0 1px 0 rgba(245,246,250,0.35), inset 0 -1px 0 rgba(9,17,42,0.2)",
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
            "radial-gradient(rgba(9,17,42,0.38) 0.75px, transparent 0.75px),linear-gradient(rgba(245,246,250,0.1) 50%, transparent 50%)",
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
            background: "#09112a",
            border: "1px solid rgba(245,246,250,0.24)",
            boxShadow: "0 18px 54px rgba(9,17,42,0.22)",
            animation: anim("hero-rise 700ms ease both 120ms"),
          }}
        />

        {/* hero-subtitle */}
        <p
          className="z-1 row-start-1 col-start-1 self-center m-0 font-(family-name:--font-silkscreen) text-[#eef3ff] max-w-[min(700px,88vw)]"
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
          className="grid justify-items-center m-0 text-[#eef3ff]"
          style={{
            gap: "clamp(4px, 1.8vw, 18px)",
            textShadow: "0 18px 56px rgba(9,17,42,0.34)",
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
            <span className="inline-block font-(family-name:--font-space-grotesk) text-[1em] font-normal">
              Seguranca
            </span>
            <span className="inline-block font-(family-name:--font-silkscreen) text-[0.76em] font-normal">
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
            <span className="inline-block font-(family-name:--font-space-grotesk) text-[1em] font-normal">
              para
            </span>
            <span className="inline-block font-(family-name:--font-silkscreen) text-[0.76em] font-normal">
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
        <span
          className="grid place-items-center"
          role="img"
          aria-label="GitHub"
          style={{
            width: "clamp(34px, 3.6vw, 48px)",
            aspectRatio: 1,
            color: "#09112a",
            fontSize: "clamp(30px, 3.2vw, 44px)",
            animation: anim("hero-rise 780ms ease both 680ms"),
          }}
        >
          <FaGithub aria-hidden="true" />
        </span>
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

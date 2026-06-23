"use client";

import { type ReactNode, useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

import type { ContentIntro } from "@/data/content";

type ScrollExpandingSectionProps = {
  content: ContentIntro;
  children: ReactNode;
};

export default function ScrollExpandingSection({
  content,
  children,
}: ScrollExpandingSectionProps) {
  const transitionRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({
    target: transitionRef,
    offset: ["start start", "end end"],
  });

  const cardHeight = useTransform(
    scrollYProgress,
    [0, 1],
    ["10svh", "100svh"],
  );
  const cardMargin = useTransform(
    scrollYProgress,
    [0, 1],
    ["8vw", "0vw"],
  );
  const cardTopRadius = useTransform(
    scrollYProgress,
    [0, 1],
    ["28px", "0px"],
  );


  const textOpacity = useTransform(
    scrollYProgress,
    shouldReduceMotion ? [0, 0] : [0.7, 1],
    [0, 1]
  );

  return (
    <section
      aria-label="Introdução à segurança digital no ambiente acadêmico"
      className="relative z-10"
    >
      <div
        ref={transitionRef}
        className={
          shouldReduceMotion
            ? "relative h-svh"
            : "pointer-events-none relative mt-[-100svh] h-[200svh]"
        }
      >
        <div
          className={
            shouldReduceMotion
              ? "flex h-svh items-end justify-center overflow-hidden"
              : "sticky top-0 flex h-svh items-end justify-center overflow-hidden"
          }
        >
          <motion.div
            className="pointer-events-auto relative flex w-full min-w-0 flex-col items-center justify-center overflow-hidden rounded-b-none bg-[#F5F6FA] px-6 py-12 text-[#141826] shadow-[0_-24px_80px_rgba(9,17,42,0.16)] sm:px-12 lg:px-20"
            style={{
              height: shouldReduceMotion ? "100svh" : cardHeight,
              marginInline: shouldReduceMotion ? "0px" : cardMargin,
              borderTopLeftRadius: shouldReduceMotion ? "0px" : cardTopRadius,
              borderTopRightRadius: shouldReduceMotion ? "0px" : cardTopRadius,
            }}
          >
            <motion.div
              style={{ opacity: textOpacity }}
              className="flex w-full flex-col items-center justify-center gap-6"
            >
              <p className="font-(family-name:--font-space-grotesk) text-[clamp(1.4rem,3.2vw,3.25rem)] leading-[1.08] font-normal">
                {content.paragraphs[0]}
              </p>
              <p className="max-w-3xl font-(family-name:--font-inter) text-[clamp(1rem,1.65vw,1.4rem)] leading-relaxed text-[#4E5568]">
                {content.paragraphs[1]}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
      {children}
    </section>
  );
}

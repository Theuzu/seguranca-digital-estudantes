"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";

import Image from "next/image";

import type { TopicDetailContent, TopicGuidanceEntry } from "@/data/content";

type TopicDetailSectionProps = {
  topics: readonly TopicDetailContent[];
};

type GuidanceSequenceProps = {
  headingId: string;
  heading: string;
  entries: readonly TopicGuidanceEntry[];
};

type GuidanceCardProps = {
  entry: TopicGuidanceEntry;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
};

function StaticGuidanceList({
  headingId,
  heading,
  entries,
}: GuidanceSequenceProps) {
  return (
    <section
      aria-labelledby={headingId}
      className="mx-auto grid w-full max-w-[1344px] gap-8 px-6 py-20 sm:px-12 lg:grid-cols-[minmax(14rem,0.6fr)_minmax(0,1.4fr)] lg:px-20"
    >
      <div>
        <p className="mb-3 font-(family-name:--font-silkscreen) text-xs text-[#7EDB8A] uppercase">
          etapa
        </p>
        <h3
          id={headingId}
          className="font-(family-name:--font-space-grotesk) text-[clamp(2.2rem,5vw,4.75rem)] leading-[0.92] font-medium text-[#F5F6FA]"
        >
          {heading}
        </h3>
      </div>

      <ol className="grid gap-4">
        {entries.map((entry) => (
          <li
            key={entry.id}
            className="grid gap-4 border-t border-[#F5F6FA]/20 py-6 sm:grid-cols-[4rem_minmax(0,1fr)]"
          >
            <span className="font-(family-name:--font-silkscreen) text-sm text-[#7EDB8A]">
              {entry.label}
            </span>
            <span className="grid gap-3">
              <strong className="font-(family-name:--font-space-grotesk) text-2xl leading-tight font-medium text-[#F5F6FA] sm:text-3xl">
                {entry.title}
              </strong>
              <span className="max-w-3xl text-base leading-7 text-[#C9CBD8] sm:text-lg">
                {entry.body}
              </span>
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}

function GuidanceCard({ entry, index, total, progress }: GuidanceCardProps) {
  const segment = 1 / total;
  const start = index * segment;
  const end = (index + 1) * segment;
  const enterStart = Math.max(0, start - segment * 0.55);
  const exitStart = Math.min(1, end - segment * 0.35);
  const clipInput =
    index === 0
      ? [0, exitStart, end]
      : index === total - 1
        ? [enterStart, start, 1]
        : [enterStart, start, exitStart, end];
  const clipOutput =
    index === 0
      ? ["inset(0% 0 0% 0)", "inset(0% 0 0% 0)", "inset(0% 0 100% 0)"]
      : index === total - 1
        ? ["inset(100% 0 0% 0)", "inset(0% 0 0% 0)", "inset(0% 0 0% 0)"]
        : [
            "inset(100% 0 0% 0)",
            "inset(0% 0 0% 0)",
            "inset(0% 0 0% 0)",
            "inset(0% 0 100% 0)",
          ];
  const opacityInput =
    index === 0
      ? [0, exitStart, end]
      : index === total - 1
        ? [enterStart, start, 1]
        : [enterStart, start, exitStart, end];
  const opacityOutput =
    index === 0
      ? [1, 1, 0]
      : index === total - 1
        ? [0, 1, 1]
        : [0, 1, 1, 0];
  const yInput =
    index === 0 ? [0, end] : [enterStart, start, end];
  const yOutput =
    index === 0 ? ["0px", "-24px"] : ["28px", "0px", "-24px"];

  const clipPath = useTransform(progress, clipInput, clipOutput);
  const opacity = useTransform(progress, opacityInput, opacityOutput);
  const y = useTransform(progress, yInput, yOutput);

  return (
    <motion.div
      className="absolute inset-0 grid content-center gap-8 bg-[#09112A] py-12"
      style={{ clipPath, opacity, y }}
    >
      <div className="grid gap-6 border-t border-[#F5F6FA]/20 pt-8 lg:grid-cols-[8rem_minmax(0,1fr)]">
        <span className="font-(family-name:--font-silkscreen) text-sm text-[#7EDB8A]">
          {entry.label}
        </span>
        <div className="grid max-w-4xl gap-5">
          <h4 className="font-(family-name:--font-space-grotesk) text-[clamp(2.1rem,5vw,5.5rem)] leading-[0.93] font-medium text-[#F5F6FA]">
            {entry.title}
          </h4>
          <p className="max-w-3xl text-[clamp(1rem,1.8vw,1.35rem)] leading-8 text-[#C9CBD8]">
            {entry.body}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function AnimatedGuidanceSequence({
  headingId,
  heading,
  entries,
}: GuidanceSequenceProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  return (
    <section aria-labelledby={headingId} className="relative">
      <div className="sr-only">
        <h3 id={headingId}>{heading}</h3>
        <ol>
          {entries.map((entry) => (
            <li key={entry.id}>
              <strong>
                {entry.label}. {entry.title}
              </strong>{" "}
              {entry.body}
            </li>
          ))}
        </ol>
      </div>

      <div
        ref={trackRef}
        aria-hidden="true"
        className="relative"
        style={{ height: `${Math.max(entries.length, 2) * 105}svh` }}
      >
        <div className="sticky top-0 mx-auto flex min-h-svh w-full max-w-[1344px] items-center overflow-hidden px-6 sm:px-12 lg:px-20">
          <div className="grid w-full gap-10 lg:grid-cols-[minmax(14rem,0.55fr)_minmax(0,1.45fr)]">
            <div className="self-center">
              <p className="mb-3 font-(family-name:--font-silkscreen) text-xs text-[#7EDB8A] uppercase">
                etapa
              </p>
              <h3
                id={`${headingId}-visual`}
                className="font-(family-name:--font-space-grotesk) text-[clamp(2.2rem,5vw,4.75rem)] leading-[0.92] font-medium text-[#F5F6FA]"
              >
                {heading}
              </h3>
            </div>

            <div className="relative min-h-[58svh] overflow-hidden">
              {entries.map((entry, index) => (
                <GuidanceCard
                  key={entry.id}
                  entry={entry}
                  index={index}
                  total={entries.length}
                  progress={scrollYProgress}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GuidanceSequence(props: GuidanceSequenceProps) {
  const shouldReduceMotion = useReducedMotion() ?? false;

  if (shouldReduceMotion || props.entries.length === 1) {
    return <StaticGuidanceList {...props} />;
  }

  return <AnimatedGuidanceSequence {...props} />;
}

export default function TopicDetailSection({ topics }: TopicDetailSectionProps) {
  if (topics.length === 0) return null;

  return (
    <section
      aria-label="Orientações por tema"
      className="relative overflow-x-clip bg-[#09112A] text-[#F5F6FA]"
    >
      {topics.map((topic) => {
        const articleHeadingId = `${topic.id}-heading`;
        const problemHeadingId = `${topic.id}-problem-heading`;
        const guidanceHeadingId = `${topic.id}-guidance-heading`;
        const checklistHeadingId = `${topic.id}-checklist-heading`;

        return (
          <article
            key={topic.id}
            id={topic.id}
            tabIndex={-1}
            aria-labelledby={articleHeadingId}
            className="scroll-mt-8 focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#7EDB8A]"
          >
            <section
              aria-labelledby={problemHeadingId}
              className="grid w-full lg:min-h-svh lg:grid-cols-2"
            >
              <div className="order-2 flex min-w-0 flex-col px-6 py-12 sm:px-12 sm:py-16 lg:order-1 lg:min-h-svh lg:justify-between lg:px-20 lg:py-16 xl:px-24 xl:py-20">
                <div className="min-w-0">
                  <p className="mb-4 font-(family-name:--font-silkscreen) text-xs text-[#7EDB8A] uppercase">
                    {topic.eyebrow}
                  </p>
                  <h2
                    id={articleHeadingId}
                    className="max-w-full break-words hyphens-auto font-(family-name:--font-space-grotesk) text-[clamp(2.35rem,11vw,4rem)] leading-[0.9] font-medium text-[#F5F6FA] sm:text-[clamp(3rem,8vw,5rem)] lg:text-[clamp(3.25rem,5vw,6rem)]"
                  >
                    {topic.title}
                  </h2>
                </div>

                <div className="mt-16 grid min-w-0 gap-6 border-t border-[#F5F6FA]/20 pt-8 lg:mt-12 lg:max-w-[40rem]">
                  <h3
                    id={problemHeadingId}
                    className="font-(family-name:--font-space-grotesk) text-[clamp(1.8rem,3.5vw,3.5rem)] leading-tight font-medium text-[#F5F6FA]"
                  >
                    {topic.problem.heading}
                  </h3>
                  <div className="grid gap-5 text-[clamp(1rem,1.6vw,1.25rem)] leading-8 text-[#C9CBD8]">
                    {topic.problem.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>

              <div
                aria-hidden="true"
                className="order-1 h-[50svh] w-full overflow-hidden bg-[#0D1425] lg:order-2 lg:h-auto lg:min-h-svh"
              >
                <Image
                  src={topic.image.src}
                  alt={topic.image.alt}
                  loading="eager"
                  width={3000}
                  height={2001}
                  className="h-full w-full object-cover"
                />
              </div>
            </section>

            <GuidanceSequence
              headingId={guidanceHeadingId}
              heading={topic.guidanceHeading}
              entries={topic.guidance}
            />

            <section
              aria-labelledby={checklistHeadingId}
              className="mx-auto grid w-full max-w-[1344px] gap-10 px-6 py-24 sm:px-12 lg:grid-cols-[minmax(14rem,0.55fr)_minmax(0,1.45fr)] lg:px-20 lg:py-32"
            >
              <div>
                <p className="mb-3 font-(family-name:--font-silkscreen) text-xs text-[#7EDB8A] uppercase">
                  pronto?
                </p>
                <h3
                  id={checklistHeadingId}
                  className="font-(family-name:--font-space-grotesk) text-[clamp(2.2rem,5vw,4.75rem)] leading-[0.92] font-medium text-[#F5F6FA]"
                >
                  {topic.checklistHeading}
                </h3>
              </div>

              <ol className="grid border-y border-[#F5F6FA]/20">
                {topic.checklist.map((item, index) => (
                  <li
                    key={item.id}
                    className="grid grid-cols-[2.5rem_minmax(0,1fr)] items-start gap-4 border-t border-[#F5F6FA]/20 py-5 first:border-t-0 sm:grid-cols-[4rem_minmax(0,1fr)] sm:py-7"
                  >
                    <span className="grid size-7 place-items-center rounded-full border border-[#7EDB8A] font-(family-name:--font-silkscreen) text-[0.65rem] text-[#7EDB8A]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-(family-name:--font-space-grotesk) text-[clamp(1.25rem,3vw,2.7rem)] leading-[1.05] font-medium text-[#F5F6FA]">
                      {item.text}
                    </span>
                  </li>
                ))}
              </ol>
            </section>
          </article>
        );
      })}
    </section>
  );
}

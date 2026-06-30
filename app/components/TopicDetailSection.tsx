"use client";

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
};

function GuidanceCard({ entry, index }: GuidanceCardProps) {
  return (
    <li
      className="sticky top-6 min-h-[68svh] border-t border-line-strong bg-page py-8 sm:top-8 sm:min-h-[70svh] sm:py-10 lg:top-12 lg:min-h-[72svh] lg:py-12"
      style={{ zIndex: index + 1 }}
    >
      <div className="mx-auto grid w-full max-w-[960px] min-w-0 gap-6 sm:grid-cols-[4rem_minmax(0,1fr)] sm:gap-8 lg:grid-cols-[7rem_minmax(0,1fr)] lg:gap-12">
        <span className="font-pixel text-sm text-accent">
          {entry.label}
        </span>

        <div className="grid min-w-0 content-start gap-7 pb-14 sm:gap-8 sm:pb-16 lg:gap-10 lg:pb-20">
          <h4 className="max-w-[14ch] break-words font-display text-[clamp(2rem,8vw,3.25rem)] leading-[0.95] font-medium text-copy sm:text-[clamp(2.5rem,6vw,4rem)] lg:text-[clamp(3rem,5vw,5rem)]">
            {entry.title}
          </h4>

          <p className="max-w-3xl text-[clamp(1rem,1.8vw,1.35rem)] leading-8 text-muted">
            {entry.body}
          </p>
        </div>
      </div>
    </li>
  );
}

function GuidanceSequence({
  headingId,
  heading,
  entries,
}: GuidanceSequenceProps) {
  return (
    <section
      aria-labelledby={headingId}
      className="relative border-y border-line"
    >
      <header className="mx-auto w-full max-w-[960px] px-6 py-20 sm:px-12 sm:py-24 lg:px-0 lg:py-28">
        <p className="mb-3 font-pixel text-xs text-support-copper uppercase">
          etapa
        </p>
        <h3
          id={headingId}
          className="max-w-[14ch] font-display text-[clamp(2.5rem,10vw,4.25rem)] leading-[0.92] font-medium text-copy sm:text-[clamp(3.25rem,7vw,5rem)] lg:text-[clamp(3.5rem,5.5vw,5.75rem)]"
        >
          {heading}
        </h3>
      </header>

      <ol className="relative mx-auto w-full max-w-[1080px] px-6 pb-[28svh] sm:px-12 lg:px-0 lg:pb-[34svh]">
        {entries.map((entry, index) => (
          <GuidanceCard key={entry.id} entry={entry} index={index} />
        ))}
      </ol>
    </section>
  );
}

export default function TopicDetailSection({ topics }: TopicDetailSectionProps) {
  if (topics.length === 0) return null;

  return (
    <section
      aria-label="Orientações por tema"
      className="relative overflow-x-clip bg-page text-copy"
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
            data-anchor-target
            className="scroll-mt-[var(--header-anchor-offset)] focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            <section
              aria-labelledby={problemHeadingId}
              className="grid w-full lg:min-h-svh lg:grid-cols-2"
            >
              <div className="order-2 flex min-w-0 flex-col px-6 py-12 sm:px-12 sm:py-16 lg:order-1 lg:min-h-svh lg:justify-between lg:px-20 lg:py-16 xl:px-24 xl:py-20">
                <div className="min-w-0">
                  <p className="mb-4 font-pixel text-xs text-accent uppercase">
                    {topic.eyebrow}
                  </p>
                  <h2
                    id={articleHeadingId}
                    className="max-w-full break-words hyphens-auto font-display text-[clamp(2.35rem,11vw,4rem)] leading-[0.9] font-medium text-copy sm:text-[clamp(3rem,8vw,5rem)] lg:text-[clamp(3.25rem,5vw,6rem)]"
                  >
                    {topic.title}
                  </h2>
                </div>

                <div className="mt-16 grid min-w-0 gap-6 border-t border-line pt-8 lg:mt-12 lg:max-w-[40rem]">
                  <h3
                    id={problemHeadingId}
                    className="font-display text-[clamp(1.8rem,3.5vw,3.5rem)] leading-tight font-medium text-copy"
                  >
                    {topic.problem.heading}
                  </h3>
                  <div className="grid gap-5 text-[clamp(1rem,1.6vw,1.25rem)] leading-8 text-muted">
                    {topic.problem.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              </div>

              <div
                aria-hidden="true"
                className="order-1 h-[50svh] w-full overflow-hidden bg-surface lg:order-2 lg:h-auto lg:min-h-svh"
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
              className="mx-auto grid w-full max-w-content gap-10 px-6 py-24 sm:px-12 lg:grid-cols-[minmax(14rem,0.55fr)_minmax(0,1.45fr)] lg:px-20 lg:py-32"
            >
              <div>
                <p className="mb-3 font-pixel text-xs text-accent uppercase">
                  pronto?
                </p>
                <h3
                  id={checklistHeadingId}
                  className="font-display text-[clamp(2.2rem,5vw,4.75rem)] leading-[0.92] font-medium text-copy"
                >
                  {topic.checklistHeading}
                </h3>
              </div>

              <ol className="grid border-y border-line">
                {topic.checklist.map((item, index) => (
                  <li
                    key={item.id}
                    className="grid grid-cols-[2.5rem_minmax(0,1fr)] items-start gap-4 border-t border-line py-5 first:border-t-0 sm:grid-cols-[4rem_minmax(0,1fr)] sm:py-7"
                  >
                    <span className="grid size-7 place-items-center rounded-full border border-support-copper font-pixel text-[0.65rem] text-support-copper">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-[clamp(1.25rem,3vw,2.7rem)] leading-[1.05] font-medium text-copy">
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

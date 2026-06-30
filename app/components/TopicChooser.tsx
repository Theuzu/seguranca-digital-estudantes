"use client";

import {
  type CSSProperties,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import type { IconType } from "react-icons";
import {
  FaCloud,
  FaComments,
  FaComputer,
  FaKey,
  FaLink,
} from "react-icons/fa6";
import { useReducedMotion } from "motion/react";

import type { TopicChooserContent, TopicIconKey } from "@/data/content";

type TopicChooserProps = {
  content: TopicChooserContent;
};

type GestureState = {
  pointerId: number | null;
  startX: number;
  startY: number;
  startScrollLeft: number;
  isDragging: boolean;
};

type AlignmentMode = "mobile-center" | "edge-start";

const DRAG_THRESHOLD = 8;
const SETTLE_DURATION = 280;
const DESKTOP_ALIGNMENT_WIDTH = 640;

const sectionBackground: CSSProperties = {
  background:
    "linear-gradient(color-mix(in srgb, var(--color-support-blue) 18%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--color-support-saffron) 9%, transparent) 1px, transparent 1px), var(--color-bg)",
  backgroundSize: "72px 72px",
};

const topicIcons: Record<TopicIconKey, IconType> = {
  key: FaKey,
  comments: FaComments,
  computer: FaComputer,
  cloud: FaCloud,
  link: FaLink,
};

function easeOutCubic(progress: number) {
  return 1 - Math.pow(1 - progress, 3);
}

function getAlignmentMode(rail: HTMLDivElement): AlignmentMode {
  return rail.clientWidth < DESKTOP_ALIGNMENT_WIDTH
    ? "mobile-center"
    : "edge-start";
}

function getInlineStartInset(rail: HTMLDivElement) {
  const computedStyle = window.getComputedStyle(rail);
  return Number.parseFloat(computedStyle.paddingInlineStart) || 0;
}

export default function TopicChooser({ content }: TopicChooserProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const gestureRef = useRef<GestureState>({
    pointerId: null,
    startX: 0,
    startY: 0,
    startScrollLeft: 0,
    isDragging: false,
  });
  const settleFrameRef = useRef<number | null>(null);
  const scrollFrameRef = useRef<number | null>(null);
  const clickResetTimerRef = useRef<number | null>(null);
  const suppressNextClickRef = useRef(false);
  const currentIndexRef = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const shouldReduceMotion = useReducedMotion() ?? false;

  const cancelSettle = useCallback(() => {
    if (settleFrameRef.current !== null) {
      cancelAnimationFrame(settleFrameRef.current);
      settleFrameRef.current = null;
    }
  }, []);

  const getNearestIndex = useCallback(() => {
    const rail = railRef.current;
    if (!rail || cardRefs.current.length === 0) return 0;

    const mode = getAlignmentMode(rail);
    const inlineStartInset = getInlineStartInset(rail);
    const targetPosition =
      mode === "mobile-center"
        ? rail.scrollLeft + rail.clientWidth / 2
        : rail.scrollLeft + inlineStartInset;
    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    for (let index = 0; index < cardRefs.current.length; index += 1) {
      const card = cardRefs.current[index];
      if (!card) continue;

      const cardPosition =
        mode === "mobile-center"
          ? card.offsetLeft + card.offsetWidth / 2
          : card.offsetLeft;
      const distance = Math.abs(cardPosition - targetPosition);

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    }

    return nearestIndex;
  }, []);

  const getTargetScrollLeft = useCallback((index: number) => {
    const rail = railRef.current;
    const card = cardRefs.current[index];
    if (!rail || !card) return 0;

    const mode = getAlignmentMode(rail);
    const inlineStartInset = getInlineStartInset(rail);
    const targetOffset =
      mode === "mobile-center"
        ? card.offsetLeft - (rail.clientWidth - card.offsetWidth) / 2
        : card.offsetLeft - inlineStartInset;
    const maxOffset = Math.max(0, rail.scrollWidth - rail.clientWidth);

    return Math.min(Math.max(targetOffset, 0), maxOffset);
  }, []);

  const settleToIndex = useCallback(
    (index: number, immediate = shouldReduceMotion) => {
      const rail = railRef.current;
      if (!rail) return;

      cancelSettle();

      const safeIndex = Math.min(
        Math.max(index, 0),
        content.topics.length - 1,
      );
      const startOffset = rail.scrollLeft;
      const targetOffset = getTargetScrollLeft(safeIndex);
      const distance = targetOffset - startOffset;

      if (immediate || Math.abs(distance) < 0.5) {
        rail.scrollLeft = targetOffset;
        currentIndexRef.current = safeIndex;
        setCurrentIndex(safeIndex);
        return;
      }

      const startedAt = performance.now();

      const step = (timestamp: number) => {
        const progress = Math.min(
          (timestamp - startedAt) / SETTLE_DURATION,
          1,
        );
        rail.scrollLeft = startOffset + distance * easeOutCubic(progress);

        if (progress < 1) {
          settleFrameRef.current = requestAnimationFrame(step);
          return;
        }

        settleFrameRef.current = null;
        currentIndexRef.current = safeIndex;
        setCurrentIndex(safeIndex);
      };

      settleFrameRef.current = requestAnimationFrame(step);
    },
    [
      cancelSettle,
      content.topics.length,
      getTargetScrollLeft,
      shouldReduceMotion,
    ],
  );

  const scheduleCurrentIndexUpdate = useCallback(() => {
    if (scrollFrameRef.current !== null) return;

    scrollFrameRef.current = requestAnimationFrame(() => {
      scrollFrameRef.current = null;
      const nextIndex = getNearestIndex();
      currentIndexRef.current = nextIndex;
      setCurrentIndex((previousIndex) =>
        previousIndex === nextIndex ? previousIndex : nextIndex,
      );
    });
  }, [getNearestIndex]);

  useEffect(() => {
    const rail = railRef.current;
    if (!rail || typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(() => {
      if (!gestureRef.current.isDragging) {
        settleToIndex(currentIndexRef.current, true);
      }
    });

    observer.observe(rail);
    return () => observer.disconnect();
  }, [settleToIndex]);

  useEffect(
    () => () => {
      cancelSettle();

      if (scrollFrameRef.current !== null) {
        cancelAnimationFrame(scrollFrameRef.current);
      }

      if (clickResetTimerRef.current !== null) {
        clearTimeout(clickResetTimerRef.current);
      }
    },
    [cancelSettle],
  );

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;

    const rail = railRef.current;
    if (!rail) return;

    cancelSettle();
    gestureRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      startScrollLeft: rail.scrollLeft,
      isDragging: false,
    };
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rail = railRef.current;
    const gesture = gestureRef.current;
    if (!rail || gesture.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - gesture.startX;
    const deltaY = event.clientY - gesture.startY;

    if (!gesture.isDragging) {
      if (
        Math.abs(deltaX) < DRAG_THRESHOLD &&
        Math.abs(deltaY) < DRAG_THRESHOLD
      ) {
        return;
      }

      if (Math.abs(deltaY) >= Math.abs(deltaX)) {
        gesture.pointerId = null;
        return;
      }

      gesture.isDragging = true;
      rail.setPointerCapture(event.pointerId);
      setIsDragging(true);
    }

    event.preventDefault();
    rail.scrollLeft = gesture.startScrollLeft - deltaX;
  };

  const finishGesture = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rail = railRef.current;
    const gesture = gestureRef.current;
    if (!rail || gesture.pointerId !== event.pointerId) return;

    const wasDragging = gesture.isDragging;

    if (rail.hasPointerCapture(event.pointerId)) {
      rail.releasePointerCapture(event.pointerId);
    }

    gesture.pointerId = null;
    gesture.isDragging = false;
    setIsDragging(false);

    if (!wasDragging) return;

    suppressNextClickRef.current = true;
    settleToIndex(getNearestIndex());

    if (clickResetTimerRef.current !== null) {
      clearTimeout(clickResetTimerRef.current);
    }

    clickResetTimerRef.current = window.setTimeout(() => {
      suppressNextClickRef.current = false;
      clickResetTimerRef.current = null;
    }, 0);
  };

  const handleCardClick = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    if (!suppressNextClickRef.current) return;

    event.preventDefault();
    suppressNextClickRef.current = false;
  };

  return (
    <div
      id={content.id}
      aria-labelledby={`${content.id}-heading`}
      className="relative isolate overflow-hidden bg-page py-[clamp(4rem,8vw,7rem)] pb-0 text-copy"
      style={sectionBackground}
    >
      <div
        className="pointer-events-none absolute -top-36 -right-48 -z-10 h-[30rem] w-[30rem] rounded-full bg-support-copper/15 blur-[90px]"
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-page px-6 sm:px-10 lg:px-12">
        <h2
          id={`${content.id}-heading`}
          className="max-w-[8ch] font-display text-[clamp(2.9rem,15vw,4.9rem)] leading-[0.9] font-medium text-copy sm:text-[clamp(4.2rem,9vw,6rem)] lg:text-[clamp(4.6rem,7.4vw,7rem)]"
        >
          <span className="block">{content.title.lineOne}</span>
          <span className="flex items-baseline gap-3">
            <span>{content.title.lineTwo}</span>
            <span className="font-pixel text-[0.45em] leading-none text-accent">
              {content.title.accent}
            </span>
          </span>
        </h2>
      </div>

      <div
        ref={railRef}
        className={[
          "mt-[clamp(2.75rem,7vw,5.25rem)] flex w-full gap-[0.9rem] overflow-x-auto overscroll-x-contain",
          "px-[max(0.75rem,calc((100%_-_min(78vw,19rem))/2))] pb-6 sm:gap-4 sm:px-[clamp(1rem,2.5vw,2.5rem)] lg:gap-[1.1rem]",
          "snap-x snap-mandatory scroll-px-[max(0.75rem,calc((100%_-_min(78vw,19rem))/2))] sm:scroll-px-[clamp(1rem,2.5vw,2.5rem)]",
          "touch-pan-y [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          isDragging
            ? "cursor-grabbing snap-none select-none"
            : "cursor-grab",
        ].join(" ")}
        aria-label="Temas de segurança digital"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishGesture}
        onPointerCancel={finishGesture}
        onScroll={scheduleCurrentIndexUpdate}
      >
        {content.topics.map((topic, index) => {
          const Icon = topicIcons[topic.icon];

          return (
            <a
              key={topic.id}
              ref={(element) => {
                cardRefs.current[index] = element;
              }}
              href={`#${topic.id}`}
              draggable={false}
              className="group flex min-h-[22.5rem] flex-[0_0_min(78vw,19rem)] snap-center snap-always flex-col justify-between overflow-hidden rounded-[1.35rem] border border-line bg-surface-elevated p-6 text-copy no-underline shadow-sticky-card transition-colors duration-[250ms] ease-out [-webkit-user-drag:none] hover:border-accent hover:bg-accent hover:text-page focus-visible:border-accent focus-visible:bg-accent focus-visible:text-page focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-copy sm:min-h-96 sm:flex-[0_0_clamp(15.5rem,34vw,18rem)] sm:snap-start sm:p-7 lg:min-h-[24.5rem] lg:flex-[0_0_clamp(13.75rem,15.5vw,15rem)] lg:rounded-[1.15rem]"
              onClick={handleCardClick}
              onFocus={() => {
                if (gestureRef.current.pointerId === null) {
                  settleToIndex(index);
                }
              }}
            >
              <span
                className="grid min-h-16 w-full place-items-center text-[clamp(3.25rem,15vw,5.25rem)] text-accent transition-colors duration-[250ms] group-hover:text-page group-focus-visible:text-page sm:text-[4.5rem] lg:text-[4rem]"
                aria-hidden="true"
              >
                <Icon />
              </span>

              <span className="grid gap-3">
                <span className="max-w-[12ch] font-display text-[clamp(1.45rem,6vw,1.9rem)] leading-[1.02] font-bold text-current sm:text-[1.65rem] lg:text-[1.55rem]">
                  {topic.title}
                </span>
                <span className="max-w-[24ch] font-sans text-[0.95rem] leading-[1.45] text-muted transition-colors duration-[250ms] group-hover:text-page group-focus-visible:text-page lg:text-[0.92rem]">
                  {topic.description}
                </span>
              </span>
            </a>
          );
        })}
      </div>

      <div
        className="mx-auto mt-3 flex min-h-10 w-fit items-center gap-2 rounded-full border border-line-strong bg-page/80 px-3 py-2 sm:hidden"
        role="status"
        aria-live="polite"
        aria-label={`Tema ${currentIndex + 1} de ${content.topics.length}`}
      >
        {content.topics.map((topic, index) => (
          <span
            key={topic.id}
            aria-hidden="true"
            className={[
              "h-2 rounded-full transition-[width,background-color] duration-[250ms]",
              index === currentIndex
                ? "w-8 bg-accent"
                : "w-2 bg-support-blue",
            ].join(" ")}
          />
        ))}
      </div>
    </div>
  );
}

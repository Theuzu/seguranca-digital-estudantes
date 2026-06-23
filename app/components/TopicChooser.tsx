"use client";

import {
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

import styles from "./TopicChooser.module.css";
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

const DRAG_THRESHOLD = 8;
const SETTLE_DURATION = 280;

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

    const viewportCenter = rail.scrollLeft + rail.clientWidth / 2;
    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    for (let index = 0; index < cardRefs.current.length; index += 1) {
      const card = cardRefs.current[index];
      if (!card) continue;

      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(cardCenter - viewportCenter);

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

    const centeredOffset =
      card.offsetLeft - (rail.clientWidth - card.offsetWidth) / 2;
    const maxOffset = Math.max(0, rail.scrollWidth - rail.clientWidth);

    return Math.min(Math.max(centeredOffset, 0), maxOffset);
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
      className={styles.section}
    >
      <div className={styles.headingWrap}>
        <span className={styles.retroMark} aria-hidden="true">
          &gt;&gt;&gt;
        </span>
        <h2 id={`${content.id}-heading`} className={styles.heading}>
          {content.heading}
        </h2>
      </div>

      <div
        ref={railRef}
        className={`${styles.rail} ${isDragging ? styles.dragging : ""}`}
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
              className={styles.card}
              onClick={handleCardClick}
              onFocus={() => {
                if (gestureRef.current.pointerId === null) {
                  settleToIndex(index);
                }
              }}
            >
              <span className={styles.iconFrame} aria-hidden="true">
                <Icon />
              </span>

              <span className={styles.cardCopy}>
                <span className={styles.cardTitle}>{topic.title}</span>
                <span className={styles.cardDescription}>
                  {topic.description}
                </span>
              </span>
            </a>
          );
        })}
      </div>

      <div
        className={styles.pagination}
        role="status"
        aria-live="polite"
        aria-label={`Tema ${currentIndex + 1} de ${content.topics.length}`}
      >
        {content.topics.map((topic, index) => (
          <span
            key={topic.id}
            aria-hidden="true"
            className={`${styles.marker} ${
              index === currentIndex ? styles.currentMarker : ""
            }`}
          />
        ))}
      </div>

      <div className={styles.destinations}>
        {content.topics.map((topic) => (
          <div
            key={topic.id}
            id={topic.id}
            tabIndex={-1}
            aria-labelledby={`${topic.id}-heading`}
            className={styles.destination}
          >
            <h3 id={`${topic.id}-heading`} className={styles.destinationTitle}>
              {topic.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}

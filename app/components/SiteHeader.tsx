"use client";

import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import { motion, useReducedMotion } from "motion/react";

import { topicChooser, topicDetails, type TopicId } from "@/data/content";
import { conclusionContent } from "@/data/conclusion";

type HeaderNavItem = {
  id: string;
  href: `#${string}`;
  label: string;
  shortLabel?: string;
  kind: "page" | "topic" | "action";
};

function getTopicNumber(index: number) {
  return String(index + 1).padStart(2, "0");
}

function getHeaderTopics(): HeaderNavItem[] {
  return topicChooser.topics.map((topic, index) => ({
    id: topic.id,
    href: `#${topic.id}`,
    label: topic.title,
    shortLabel: `${getTopicNumber(index)} / ${topicChooser.topics.length}`,
    kind: "topic",
  }));
}

function getPageItems(): HeaderNavItem[] {
  return [
    {
      id: "content-intro",
      href: "#content-intro",
      label: "Início",
      kind: "page",
    },
    {
      id: conclusionContent.id,
      href: `#${conclusionContent.id}-avaliacao`,
      label: "Avaliação",
      kind: "action",
    },
  ];
}

function getObservedIds(topics: readonly HeaderNavItem[]) {
  return [
    "content-intro",
    topicChooser.id,
    ...topics.map((topic) => topic.id),
    conclusionContent.id,
    `${conclusionContent.id}-avaliacao`,
  ];
}

function isTopicId(value: string): value is TopicId {
  return topicDetails.some((topic) => topic.id === value);
}

export default function SiteHeader() {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const topics = useMemo(() => getHeaderTopics(), []);
  const pageItems = useMemo(() => getPageItems(), []);
  const observedIds = useMemo(() => getObservedIds(topics), [topics]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const topicsButtonRef = useRef<HTMLButtonElement>(null);
  const activeIdRef = useRef<string | null>(null);
  const scrolledRef = useRef(false);

  useEffect(() => {
    const updateScrolled = () => {
      const nextScrolled = window.scrollY > 24;
      if (scrolledRef.current !== nextScrolled) {
        scrolledRef.current = nextScrolled;
        setIsScrolled(nextScrolled);
      }
    };

    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });

    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  useEffect(() => {
    const elements = observedIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;

        const nextId = visible.target.id;
        if (activeIdRef.current !== nextId) {
          activeIdRef.current = nextId;
          setActiveId(nextId);
        }
      },
      {
        rootMargin: "-28% 0px -55% 0px",
        threshold: [0.08, 0.35, 0.65],
      },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [observedIds]);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setIsOpen(false);
      topicsButtonRef.current?.focus();
    };

    document.addEventListener("keydown", closeOnEscape);

    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  function closePanel() {
    setIsOpen(false);
  }

  function handleNavClick(href: `#${string}`) {
    return (event: MouseEvent<HTMLAnchorElement>) => {
      closePanel();

      if (shouldReduceMotion || event.detail === 0) return;

      const target = document.querySelector<HTMLElement>(href);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", href);
      window.setTimeout(() => target.focus({ preventScroll: true }), 320);
    };
  }

  const activeTopic = isTopicId(activeId ?? "")
    ? topics.find((topic) => topic.id === activeId)
    : null;
  const navLinkClass =
    "group relative flex min-h-11 items-center px-1.5 py-3 font-sans text-[0.78rem] leading-none text-copy/82 outline-offset-4 transition-colors duration-200 after:absolute after:bottom-2 after:left-1.5 after:h-px after:w-[calc(100%-0.75rem)] after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-200 hover:text-copy hover:after:scale-x-100 focus-visible:outline-3 focus-visible:outline-accent focus-visible:after:scale-x-100";

  return (
    <motion.header
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.18 }}
      className={`fixed inset-x-0 top-0 z-50 h-[var(--header-height)] border-b px-[var(--gutter)] transition-colors duration-200 ${
        isScrolled || isOpen
          ? "border-line bg-page/95"
          : "border-transparent bg-page/40"
      }`}
    >
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:min-h-11 focus:rounded-full focus:bg-accent focus:px-4 focus:py-3 focus:font-pixel focus:text-xs focus:text-page"
      >
        Pular para o conteúdo
      </a>

      <nav
        aria-label="Navegação principal"
        className="mx-auto flex h-full max-w-page items-center justify-between gap-4"
      >
        <a
          href="#conteudo"
          onClick={handleNavClick("#conteudo")}
          className="min-h-11 min-w-0 py-3 pr-3 font-pixel text-[clamp(0.82rem,1.6vw,1.08rem)] leading-none text-copy outline-offset-4 transition-colors hover:text-accent focus-visible:outline-3 focus-visible:outline-accent"
        >
          SEGURANCA DIGITAL
        </a>

        <div className="flex min-w-0 items-center justify-end gap-4 md:gap-6">
          <a
            href={pageItems[0].href}
            onClick={handleNavClick(pageItems[0].href)}
            aria-current={activeId === pageItems[0].id ? "location" : undefined}
            className={`${navLinkClass} ${
              activeId === pageItems[0].id ? "after:scale-x-100" : ""
            }`}
          >
            {pageItems[0].label}
          </a>

          <div className="relative">
            <button
              ref={topicsButtonRef}
              type="button"
              aria-expanded={isOpen}
              aria-controls="site-header-topics"
              onClick={() => setIsOpen((open) => !open)}
              className={`${navLinkClass} ${
                isOpen || activeTopic || activeId === topicChooser.id
                  ? "after:scale-x-100"
                  : ""
              }`}
            >
              <span>Temas</span>
              <span
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-y-0.5"
              >
                {isOpen ? "-" : "+"}
              </span>
            </button>

            {isOpen ? (
              <motion.div
                id="site-header-topics"
                initial={shouldReduceMotion ? false : { opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.18 }}
                className="absolute right-0 top-[calc(100%+0.65rem)] w-[min(84vw,26rem)] border border-line bg-page/85 text-copy shadow-[0_18px_52px_var(--color-shadow)]"
              >
                <div className="border-b border-line px-4 py-3 font-sans text-[0.72rem] text-muted">
                  Escolha um tema
                </div>
                <ol>
                  {topics.map((topic, index) => {
                    const isActive = activeId === topic.id;

                    return (
                      <li key={topic.id} className="border-b border-line last:border-b-0">
                        <a
                          href={topic.href}
                          onClick={handleNavClick(topic.href)}
                          aria-current={isActive ? "location" : undefined}
                          className={`grid min-h-16 grid-cols-[2.75rem_minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 font-sans outline-offset-[-3px] transition-colors hover:bg-surface/70 focus-visible:outline-3 focus-visible:outline-accent ${
                            isActive ? "bg-surface/70" : ""
                          }`}
                        >
                          <span className="font-pixel text-[0.68rem] text-accent">
                            {getTopicNumber(index)}
                          </span>
                          <span className="min-w-0 text-[0.78rem] leading-snug text-copy/86">
                            {topic.label}
                          </span>
                          <span aria-hidden="true" className={isActive ? "text-support-copper" : "text-muted"}>
                            {"-->"}
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ol>
              </motion.div>
            ) : null}
          </div>

          <a
            href={pageItems[1].href}
            onClick={handleNavClick(pageItems[1].href)}
            aria-current={
              activeId === pageItems[1].id ||
              activeId === `${conclusionContent.id}-avaliacao`
                ? "location"
                : undefined
            }
            className={`${navLinkClass} hidden sm:flex ${
              activeId === pageItems[1].id ||
              activeId === `${conclusionContent.id}-avaliacao`
                ? "after:scale-x-100"
                : ""
            }`}
          >
            {pageItems[1].label}
          </a>
        </div>
      </nav>
    </motion.header>
  );
}

"use client";

import { motion, useReducedMotion } from "motion/react";

import styles from "./ConclusionSection.module.css";
import {
  type ConclusionContent,
  isValidGoogleFormsUrl,
} from "@/data/conclusion";

type ConclusionSectionProps = {
  content: ConclusionContent;
};

const revealViewport = {
  once: true,
  amount: 0.28,
} as const;

const revealEase = [0.22, 1, 0.36, 1] as const;

export default function ConclusionSection({ content }: ConclusionSectionProps) {
  const shouldReduceMotion = useReducedMotion() ?? false;
  const validFormUrl = isValidGoogleFormsUrl(content.evaluation.formUrl)
    ? content.evaluation.formUrl
    : null;

  const revealProps = shouldReduceMotion
    ? {
        initial: false as const,
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0 },
        viewport: revealViewport,
      }
    : {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.3, ease: revealEase },
        viewport: revealViewport,
      };

  return (
    <section
      id={content.id}
      className={styles.section}
      aria-labelledby={`${content.id}-title`}
    >
      <div className={styles.container}>
        <motion.div {...revealProps} className={styles.closing}>
          <div className={styles.titleBlock}>
            <span className={styles.label}>{content.label}</span>
            <h2 id={`${content.id}-title`} className={styles.title}>
              {content.title}
            </h2>
          </div>

          <div className={styles.closingCopy}>
            {content.closingParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </motion.div>

        <motion.aside
          id={`${content.id}-avaliacao`}
          {...revealProps}
          className={styles.evaluation}
          tabIndex={-1}
          aria-labelledby={`${content.id}-evaluation-title`}
        >
          <div className={styles.evaluationCopy}>
            <span className={styles.retroMark} aria-hidden="true">
              ( )
            </span>
            <h3
              id={`${content.id}-evaluation-title`}
              className={styles.evaluationTitle}
            >
              {content.evaluation.title}
            </h3>
            {content.evaluation.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className={styles.actionWrap}>
            {validFormUrl ? (
              <a className={styles.action} href={validFormUrl}>
                <span>{content.evaluation.actionLabel}</span>
                <span aria-hidden="true">→</span>
              </a>
            ) : (
              <span className={styles.actionDisabled} aria-disabled="true">
                <span>{content.evaluation.actionLabel}</span>
                <span aria-hidden="true">→</span>
              </span>
            )}
          </div>
        </motion.aside>

        <motion.article
          {...revealProps}
          className={styles.thanks}
          aria-labelledby={`${content.id}-thanks-title`}
        >
          <span className={styles.thanksMark} aria-hidden="true">
            +
          </span>
          <div>
            <h3 id={`${content.id}-thanks-title`} className={styles.thanksTitle}>
              {content.thanks.title}
            </h3>
            {content.thanks.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </motion.article>
      </div>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <span className={styles.footerMark} aria-hidden="true">
            [fim]
          </span>
          <p>{content.academicNote}</p>
        </div>
      </footer>
    </section>
  );
}

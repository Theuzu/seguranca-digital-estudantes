import { FaGithub } from "react-icons/fa6";

import ConclusionSection from "@/app/components/ConclusionSection";
import ScrollExpandingSection from "@/app/components/ScrollExpandingSection";
import TopicChooser from "@/app/components/TopicChooser";
import { conclusionContent } from "@/data/conclusion";
import { contentIntro, topicChooser } from "@/data/content";

export default function Home() {
  return (
    <main className="relative overflow-x-clip">
      <section className="hero-stage sticky! top-0" aria-labelledby="hero-title">
        <div className="hero-grain" aria-hidden="true" />
        <div className="hero-clouds" aria-hidden="true" />
        <div className="hero-frame" aria-hidden="true" />

        <div className="hero-content">
          <p className="hero-subtitle">UNIFBV WYDEN - Matheus Maranhao</p>

          <h1 id="hero-title" className="hero-title">
            <span className="hero-title-row">
              <span className="hero-title-smooth">Seguranca</span>
              <span className="hero-title-pixel">Digital</span>
            </span>
            <span className="hero-title-row">
              <span className="hero-title-smooth">para</span>
              <span className="hero-title-pixel">Estudantes</span>
            </span>
          </h1>
          <span className="text-center text-xs font-bold">
            Aprenda práticas simples para proteger suas contas, seus trabalhos
            acadêmicos e sua convivência nos ambientes digitais.
          </span>

          <span className="hero-github" role="img" aria-label="GitHub">
            <FaGithub aria-hidden="true" />
          </span>
        </div>
      </section>

      <ScrollExpandingSection content={contentIntro}>
        <TopicChooser content={topicChooser} />
      </ScrollExpandingSection>

      <ConclusionSection content={conclusionContent} />
    </main>
  );
}

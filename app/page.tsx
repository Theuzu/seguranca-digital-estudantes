// kept per FR-015
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FaGithub } from "react-icons/fa6";

import SiteHeader from "@/app/components/SiteHeader";
import HeroSection from "@/app/components/HeroSection";
import ContentSection from "@/app/components/ContentSection";
import ConclusionSection from "@/app/components/ConclusionSection";
import { conclusionContent } from "@/data/conclusion";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main
        id="conteudo"
        tabIndex={-1}
        className="relative overflow-x-clip focus-visible:outline-3 focus-visible:outline-offset-[-3px] focus-visible:outline-accent"
      >
        <HeroSection />
        <ContentSection />
        <ConclusionSection content={conclusionContent} />
      </main>
    </>
  );
}

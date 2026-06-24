// kept per FR-015
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FaGithub } from "react-icons/fa6";

import HeroSection from "@/app/components/HeroSection";
import ContentSection from "@/app/components/ContentSection";
import ConclusionSection from "@/app/components/ConclusionSection";
import { conclusionContent } from "@/data/conclusion";

export default function Home() {
  return (
    <main className="relative overflow-x-clip">
      <HeroSection />
      <ContentSection />
      <ConclusionSection content={conclusionContent} />
    </main>
  );
}

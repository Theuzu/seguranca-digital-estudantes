import ScrollExpandingSection from "@/app/components/ScrollExpandingSection";
import TopicChooser from "@/app/components/TopicChooser";
import TopicDetailSection from "@/app/components/TopicDetailSection";
import { contentIntro, topicChooser, topicDetails } from "@/data/content";

export default function ContentSection() {
  return (
    <ScrollExpandingSection content={contentIntro}>
      <TopicChooser content={topicChooser} />
      <TopicDetailSection topics={topicDetails} />
    </ScrollExpandingSection>
  );
}

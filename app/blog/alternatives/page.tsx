import TopicHub, { createTopicHubMetadata } from '@/components/blog/topic-hub';

export const metadata = createTopicHubMetadata('alternatives');

export default function AlternativesTopicPage() {
  return <TopicHub topicSlug='alternatives' />;
}

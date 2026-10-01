import TopicHub, { createTopicHubMetadata } from '@/components/blog/topic-hub';

export const metadata = createTopicHubMetadata('open-source-engineering');

export default function OpenSourceEngineeringTopicPage() {
  return <TopicHub topicSlug='open-source-engineering' />;
}

import TopicHub, { createTopicHubMetadata } from '@/components/blog/topic-hub';

export const metadata = createTopicHubMetadata('private-ai');

export default function PrivateAiTopicPage() {
  return <TopicHub topicSlug='private-ai' />;
}

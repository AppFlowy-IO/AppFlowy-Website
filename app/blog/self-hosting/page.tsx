import TopicHub, { createTopicHubMetadata } from '@/components/blog/topic-hub';

export const metadata = createTopicHubMetadata('self-hosting');

export default function SelfHostingTopicPage() {
  return <TopicHub topicSlug='self-hosting' />;
}

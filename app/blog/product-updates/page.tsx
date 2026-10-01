import TopicHub, { createTopicHubMetadata } from '@/components/blog/topic-hub';

export const metadata = createTopicHubMetadata('product-updates');

export default function ProductUpdatesTopicPage() {
  return <TopicHub topicSlug='product-updates' />;
}

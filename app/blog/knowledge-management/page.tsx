import TopicHub, { createTopicHubMetadata } from '@/components/blog/topic-hub';

export const metadata = createTopicHubMetadata('knowledge-management');

export default function KnowledgeManagementTopicPage() {
  return <TopicHub topicSlug='knowledge-management' />;
}

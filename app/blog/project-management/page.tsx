import TopicHub, { createTopicHubMetadata } from '@/components/blog/topic-hub';

export const metadata = createTopicHubMetadata('project-management');

export default function ProjectManagementTopicPage() {
  return <TopicHub topicSlug='project-management' />;
}

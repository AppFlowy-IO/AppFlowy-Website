import { normalizeBlogCategories, normalizeBlogTags } from '@/lib/blog-taxonomy';

export type BlogTopicSlug =
  | 'project-management'
  | 'self-hosting'
  | 'knowledge-management'
  | 'private-ai'
  | 'alternatives'
  | 'product-updates'
  | 'open-source-engineering';

export interface TopicLink {
  href: string;
  label: string;
  description: string;
}

export interface BlogTopic {
  slug: BlogTopicSlug;
  name: string;
  title: string;
  description: string;
  intro: string;
  categoryNames: readonly string[];
  matchTerms: readonly string[];
  templateLinks: readonly TopicLink[];
  resourceLinks: readonly TopicLink[];
}

export interface TopicPost {
  slug: string;
  title: string;
  description?: string;
  categories: string[];
  tags: string[];
  topics?: BlogTopicSlug[];
}

export const BLOG_TOPICS: readonly BlogTopic[] = [
  {
    slug: 'project-management',
    name: 'Project management',
    title: 'Project management guides and templates',
    description:
      'Plan projects with flexible databases, timelines, boards, calendars, documents, connected records, and reusable AppFlowy templates for modern teams.',
    intro:
      'Explore practical ways to plan, track, and document work without forcing every team into the same task structure. These guides connect project strategy with ready-to-use AppFlowy systems.',
    categoryNames: ['Project management'],
    matchTerms: [
      'project management',
      'project tracker',
      'project roadmap',
      'task management',
      'kanban',
      'clickup',
      'content calendar',
      'workflow template',
      'delegating tasks',
    ],
    templateLinks: [
      {
        href: '/templates/project-management',
        label: 'Project management templates',
        description: 'Start with project trackers, plans, roadmaps, and sprint workflows.',
      },
      {
        href: '/templates/kanban',
        label: 'Kanban templates',
        description: 'Organize work visually across customizable stages.',
      },
      {
        href: '/templates/database',
        label: 'Database templates',
        description: 'Connect project records and reuse the same source data across views.',
      },
    ],
    resourceLinks: [
      {
        href: '/blog/best-clickup-alternatives',
        label: 'Compare the best ClickUp alternatives',
        description: 'Choose between structured project tools and flexible connected workspaces.',
      },
      {
        href: '/blog/best-self-hosted-clickup-alternatives',
        label: 'Compare self-hosted ClickUp alternatives',
        description: 'Evaluate project workflows alongside deployment, data ownership, and future adaptability.',
      },
    ],
  },
  {
    slug: 'self-hosting',
    name: 'Self-hosting',
    title: 'Self-hosting guides for secure team workspaces',
    description:
      'Evaluate, deploy, and operate a self-hosted workspace with practical guidance on data ownership, migration, security, and private infrastructure.',
    intro:
      'Self-hosting is more than installing software. These resources cover deployment choices, data control, migration, governance, and the tradeoffs teams should test before moving critical work.',
    categoryNames: ['Self-hosting'],
    matchTerms: [
      'self hosted',
      'self-hosted',
      'self hosting',
      'self-hosting',
      'data sovereignty',
      'data ownership',
      'vendor lock',
      'private cloud',
      'server setup',
    ],
    templateLinks: [
      {
        href: '/templates/wiki',
        label: 'Wiki templates',
        description: 'Build a governed knowledge base on infrastructure you control.',
      },
      {
        href: '/templates/project-management',
        label: 'Project management templates',
        description: 'Run operational workflows in a self-hosted AppFlowy workspace.',
      },
    ],
    resourceLinks: [
      {
        href: 'https://appflowy.com/docs',
        label: 'Review the AppFlowy deployment documentation',
        description: 'See current installation and administration guidance for AppFlowy.',
      },
      {
        href: '/blog/best-self-hosted-notion-alternatives',
        label: 'Compare self-hosted Notion alternatives',
        description: 'Evaluate deployment, databases, collaboration, and enterprise controls.',
      },
      {
        href: '/blog/best-self-hosted-confluence-alternatives',
        label: 'Plan a self-hosted Confluence migration',
        description: 'Compare migration paths, knowledge features, deployment options, and operational tradeoffs.',
      },
    ],
  },
  {
    slug: 'knowledge-management',
    name: 'Knowledge management',
    title: 'Knowledge management and internal wiki guides',
    description:
      'Build a useful team knowledge base with connected documents, wikis, databases, templates, search, clear ownership, and practical AppFlowy guidance.',
    intro:
      'A knowledge base works when people can find, trust, and maintain what it contains. Use these guides and templates to connect documentation with the projects and decisions it supports.',
    categoryNames: ['Knowledge management'],
    matchTerms: [
      'knowledge management',
      'knowledge base',
      'knowledge hub',
      'internal documentation',
      'project documentation',
      'process documentation',
      'company wiki',
      'wiki for business',
      'note taking',
      'second brain',
      'team knowledge',
      'meeting notes',
      'collaborative writing',
      'confluence',
      'docmost',
      'appflowy vs outline',
      'one pager',
    ],
    templateLinks: [
      {
        href: '/templates/wiki',
        label: 'Wiki templates',
        description: 'Create an organized starting point for durable team knowledge.',
      },
      {
        href: '/templates/docs',
        label: 'Document templates',
        description: 'Standardize plans, decisions, processes, and reference pages.',
      },
      {
        href: '/templates/team-meetings',
        label: 'Meeting templates',
        description: 'Turn recurring discussions into searchable decisions and follow-up work.',
      },
    ],
    resourceLinks: [
      {
        href: '/compare/appflowy-vs-confluence',
        label: 'Compare AppFlowy and Confluence',
        description: 'Review knowledge management, data control, databases, AI, and migration.',
      },
      {
        href: '/compare/appflowy-vs-outline',
        label: 'Compare AppFlowy and Outline',
        description: 'Choose between a documentation-first wiki and a broader connected workspace.',
      },
      {
        href: '/compare/appflowy-vs-docmost',
        label: 'Compare AppFlowy and Docmost',
        description: 'Evaluate self-hosted documentation, databases, apps, and AI capabilities.',
      },
    ],
  },
  {
    slug: 'private-ai',
    name: 'Private AI',
    title: 'Private and local AI workspace guides',
    description:
      'Use AI with greater control through local models, Ollama, private deployments, reusable prompts, and connected workspace knowledge.',
    intro:
      'Private AI workflows should make the model, data boundary, and operational tradeoffs clear. These guides cover local models, secure deployment, prompts, search, and practical AppFlowy use cases.',
    categoryNames: ['Private AI'],
    matchTerms: [
      'private ai',
      'local ai',
      'local llm',
      'on prem ai',
      'on-prem ai',
      'ollama',
      'deepseek',
      'gpt oss',
      'open weight ai',
      'ai workspace search',
    ],
    templateLinks: [
      {
        href: '/templates/ai-powered',
        label: 'AI-powered templates',
        description: 'Put AI prompts and repeatable workflows directly into your workspace.',
      },
      {
        href: '/templates/docs',
        label: 'Document templates',
        description: 'Give AI a consistent structure for notes, summaries, and decisions.',
      },
    ],
    resourceLinks: [
      {
        href: '/blog/appflowy_local_ai_ollama',
        label: 'Set up AppFlowy Local AI with Ollama',
        description: 'Run AppFlowy AI features with a model installed on your own device.',
      },
    ],
  },
  {
    slug: 'alternatives',
    name: 'Alternatives',
    title: 'Workspace and project management alternatives',
    description:
      'Compare AppFlowy with popular workspace, project management, wiki, and note-taking tools using practical criteria and verified product capabilities.',
    intro:
      'The right alternative depends on the job you need to accomplish, the structure your team can maintain, and the level of control you need over data and deployment. Start with the decision guides below.',
    categoryNames: ['Comparisons'],
    matchTerms: [
      'alternatives',
      'alternative to',
      'appflowy vs',
      'notion vs',
      'proprietary vs open source',
      'migration guide',
      'migrate from',
      'switching from',
      'import from',
    ],
    templateLinks: [
      {
        href: '/templates/project-management',
        label: 'Test a project management workflow',
        description: 'Evaluate AppFlowy with a real project instead of comparing feature lists alone.',
      },
      {
        href: '/templates/wiki',
        label: 'Test a knowledge base workflow',
        description: 'See how documents, databases, and team knowledge work together.',
      },
      {
        href: '/templates/database',
        label: 'Test a database workflow',
        description: 'Try connected records and multiple views of the same source data.',
      },
    ],
    resourceLinks: [
      {
        href: '/blog/best-clickup-alternatives',
        label: 'Compare ClickUp alternatives for project work',
        description: 'Assess structured task tools, flexible workspaces, self-hosting, and data control.',
      },
      {
        href: '/blog/best-self-hosted-confluence-alternatives',
        label: 'Compare self-hosted Confluence alternatives',
        description: 'Review migration support, knowledge management, databases, and deployment options.',
      },
      {
        href: '/compare/notion-vs-appflowy',
        label: 'Compare Notion and AppFlowy',
        description: 'Review self-hosting, data ownership, databases, and private AI.',
      },
      {
        href: '/compare/appflowy-vs-affine',
        label: 'Compare AppFlowy and AFFiNE',
        description: 'Evaluate enterprise controls, structured workflows, AI, and self-hosting.',
      },
      {
        href: '/compare/appflowy-vs-confluence',
        label: 'Compare AppFlowy and Confluence',
        description: 'Compare knowledge management, project context, deployment, and migration.',
      },
      {
        href: '/compare/appflowy-vs-outline',
        label: 'Compare AppFlowy and Outline',
        description: 'Assess documentation-first and connected-workspace approaches.',
      },
      {
        href: '/compare/appflowy-vs-docmost',
        label: 'Compare AppFlowy and Docmost',
        description: 'Review self-hosted collaboration, databases, native apps, and AI.',
      },
    ],
  },
  {
    slug: 'product-updates',
    name: 'Product updates',
    title: 'AppFlowy product updates and release notes',
    description:
      'Follow AppFlowy releases, new workspace capabilities, database improvements, collaboration features, integrations, and product milestones.',
    intro:
      'See what is new in AppFlowy and understand how each release changes the way teams plan, document, collaborate, and manage information.',
    categoryNames: ['Announcement', 'Product'],
    matchTerms: ['appflowy updates', 'release', 'announcing appflowy', 'anniversary', 'now on zapier', 'browser'],
    templateLinks: [
      {
        href: '/templates/project-management',
        label: 'Try project management templates',
        description: 'Put new database, view, and collaboration features to work in a real project.',
      },
      {
        href: '/templates/database',
        label: 'Explore database templates',
        description: 'Start with structured records that can be reused across multiple views.',
      },
    ],
    resourceLinks: [
      {
        href: '/blog/appflowy-updates-database-forms-external-sharing-response-insights-and-more',
        label: 'Explore database forms and external sharing',
        description: 'See how AppFlowy forms collect responses directly into a connected database.',
      },
      {
        href: '/blog/appflowy-updates-space-permissions-member-groups-database-rollups-and-more',
        label: 'Review Space permissions and database rollups',
        description: 'Learn about group permissions, custom Spaces, and visual rollup values.',
      },
      {
        href: '/blog/appflowy-updates-web-real-time-editing-mentions-gpt-5-and-more',
        label: 'See AppFlowy Web and real-time editing',
        description: 'Explore browser access, mentions, collaboration, and AI updates.',
      },
    ],
  },
  {
    slug: 'open-source-engineering',
    name: 'Open source & engineering',
    title: 'Open-source engineering and AppFlowy development',
    description:
      'Explore AppFlowy engineering decisions, Flutter and Rust architecture, editor development, open-source contribution guides, and community work.',
    intro:
      'Go behind the product to see how AppFlowy is built, how technical tradeoffs are evaluated, and how developers can contribute to the open-source project.',
    categoryNames: ['Developers', 'Open source'],
    matchTerms: [
      'flutter',
      'rust',
      'codebase',
      'developer',
      'open source community',
      'contribute to appflowy',
      'hacktoberfest',
    ],
    templateLinks: [
      {
        href: '/templates/engineering',
        label: 'Engineering templates',
        description: 'Organize technical plans, implementation work, and team documentation.',
      },
      {
        href: '/templates/docs',
        label: 'Technical documentation templates',
        description: 'Create reusable specifications, decisions, and engineering notes.',
      },
    ],
    resourceLinks: [
      {
        href: '/blog/tech-design-flutter-rust',
        label: 'How AppFlowy uses Flutter and Rust',
        description: "Review the architectural choices behind AppFlowy's cross-platform client.",
      },
      {
        href: '/blog/how-we-built-a-highly-customizable-rich-text-editor-for-flutter',
        label: 'How AppFlowy built its Flutter editor',
        description: 'Explore the design of a customizable, block-based rich-text editor.',
      },
      {
        href: '/blog/how-to-contribute-to-appflowy',
        label: 'Contribute to AppFlowy',
        description: 'Find practical guidance for joining the AppFlowy open-source community.',
      },
    ],
  },
] as const;

const primaryTopicOrder: BlogTopicSlug[] = [
  'alternatives',
  'self-hosting',
  'knowledge-management',
  'private-ai',
  'project-management',
  'product-updates',
  'open-source-engineering',
];

const templateCategoryTopics: Record<string, BlogTopicSlug[]> = {
  'ai-powered': ['private-ai'],
  database: ['project-management'],
  docs: ['knowledge-management'],
  education: ['knowledge-management'],
  engineering: ['project-management'],
  'human-resources': ['knowledge-management', 'project-management'],
  kanban: ['project-management'],
  management: ['project-management'],
  marketing: ['project-management'],
  'product-design': ['project-management'],
  'project-management': ['project-management'],
  'sales-crm': ['project-management'],
  startups: ['project-management'],
  'team-meetings': ['knowledge-management'],
  wiki: ['knowledge-management'],
};

function normalizeSearchText(value: string) {
  return value
    .toLowerCase()
    .replace(/[_/–—-]+/g, ' ')
    .replace(/[^a-z0-9+#. ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function getBlogTopic(slug: BlogTopicSlug | string): BlogTopic | undefined {
  return BLOG_TOPICS.find((topic) => topic.slug === slug);
}

export function postMatchesTopic(post: TopicPost, topic: BlogTopic): boolean {
  if (post.topics?.length) return post.topics.includes(topic.slug);

  const categories = normalizeBlogCategories(post.categories);

  if (topic.categoryNames.some((category) => categories.includes(category))) return true;

  const searchText = normalizeSearchText(
    [post.slug, post.title, post.description ?? '', ...normalizeBlogTags(post.tags)].join(' ')
  );

  return topic.matchTerms.some((term) => searchText.includes(normalizeSearchText(term)));
}

export function getTopicsForPost(post: TopicPost): BlogTopic[] {
  if (post.topics?.length) {
    return post.topics.flatMap((topicSlug) => {
      const topic = getBlogTopic(topicSlug);

      return topic ? [topic] : [];
    });
  }

  return BLOG_TOPICS.filter((topic) => postMatchesTopic(post, topic));
}

export function getPrimaryTopicForPost(post: TopicPost): BlogTopic | undefined {
  const topics = getTopicsForPost(post);

  if (post.topics?.length) return topics[0];

  return primaryTopicOrder.map(getBlogTopic).find((topic) => topic && topics.some((item) => item.slug === topic.slug));
}

export function getTopicForCategory(category: string): BlogTopic | undefined {
  const [normalizedCategory] = normalizeBlogCategories([category]);

  return BLOG_TOPICS.find((topic) => topic.categoryNames.includes(normalizedCategory));
}

export function getTopicsForTemplateCategory(categorySlug: string): BlogTopic[] {
  const topicSlugs = templateCategoryTopics[categorySlug] ?? [];

  return topicSlugs.flatMap((topicSlug) => {
    const topic = getBlogTopic(topicSlug);

    return topic ? [topic] : [];
  });
}

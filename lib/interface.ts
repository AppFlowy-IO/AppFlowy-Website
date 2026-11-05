export interface Contributor {
  id: number;
  login: string;
  name: string;
  avatarUrl: string;
  contributionCount: number;
}

export interface Version {
  id?: string;
  version: string;
  headline: string;
  changeLog: string;
  publishedAt: string;
  url: string;
}

export interface TemplateCategory {
  id: string;
  name: string;
  icon: TemplateIcon;
  bg_color: string;
  description: string;
  category_type: TemplateCategoryType;
  rank: number;
}

export enum TemplateCategoryType {
  ByUseCase,
  ByFeature,
}

export enum TemplateIcon {
  project = 'project',
  engineering = 'engineering',
  startups = 'startups',
  schools = 'schools',
  marketing = 'marketing',
  management = 'management',
  humanResources = 'human-resources',
  sales = 'sales',
  teamMeetings = 'team-meetings',
  ai = 'ai',
  docs = 'docs',
  wiki = 'wiki',
  database = 'database',
  kanban = 'kanban',
}

export interface GroupByCategoryTemplateList {
  featured_templates: TemplateSummary[];
  new_templates: TemplateSummary[];
  template_groups: {
    category: TemplateCategory;
    templates: TemplateSummary[];
  }[];
}

export interface TemplateCreator {
  id: string;
  name: string;
  avatar_url: string;
  number_of_templates?: number;
  account_links?: {
    link_type: string;
    url: string;
  }[];
}

export interface PublishInfo {
  namespace: string;
  publish_name: string;
  view_id: string;
  publisher_email: string;
  publish_timestamp: string;
  /** Set when a template has been withdrawn. The API keeps serving it; we do not. */
  unpublished_timestamp?: string | null;
}

export interface TemplateSummary {
  view_id: string;
  /** Immutable, so slug assignment orders by it to keep slugs stable across deploys. */
  created_at: string;
  name: string;
  description: string;
  view_url: string;
  categories: TemplateCategory[];
  primary_category_id?: string | null;
  creator: TemplateCreator;
  is_new_template: boolean;
  featured: boolean;
  publish_info: PublishInfo;
}

export interface Template extends TemplateSummary {
  about: string;
  related_templates: TemplateSummary[];
}

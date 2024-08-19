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
  upload_template_count?: number;
  account_links?: {
    link_type: string;
    url: string;
  }[];
}

export interface TemplateSummary {
  view_id: string;
  name: string;
  description: string;
  view_url: string;
  categories: TemplateCategory[];
  creator: TemplateCreator;
  is_new_template: boolean;
  featured: boolean;
}

export interface Template extends TemplateSummary {
  about: string;
  related_templates: TemplateSummary[];
}

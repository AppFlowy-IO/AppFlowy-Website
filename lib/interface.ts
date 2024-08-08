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
  desc: string;
  type: TemplateCategoryType;
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

export type GroupByCategoryTemplateList = {
  category: TemplateCategory;
  templateList: Template[];
}[];

export interface Template {
  id: string;
  name: string;
  desc: string;
  about: string;
  view_url: string;
  categories: TemplateCategory[];
  creator: TemplateCreator;
  is_new_template: boolean;
  featured: boolean;
  related_template_ids: string[];
  related_templates?: Template[];
}

export interface TemplateCreator {
  id: string;
  name: string;
  avatar: string;
  account_links: {
    type: string;
    url: string;
  }[];
  upload_template_count?: number;
}

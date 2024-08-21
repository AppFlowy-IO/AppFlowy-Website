import { GroupByCategoryTemplateList, Template, TemplateCategory, TemplateSummary } from '@/lib/interface';
import axios from 'axios';

const isProd = process.env.NODE_ENV === 'production';
const environment = process.env.ENVIRONMENT || 'development';
let AF_API_BASE_URL = 'https://test.appflowy.cloud';

if (isProd) {
  if (environment === 'production') {
    AF_API_BASE_URL = 'https://beta.appflowy.cloud';
  } else if (environment === 'test') {
    AF_API_BASE_URL = 'https://test.appflowy.cloud';
  }
}

export const templateAPI = axios.create({
  // rewrite in next.config.js, because of CORS
  baseURL: `${AF_API_BASE_URL}/api/template-center`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function getTemplateHomeList(): Promise<GroupByCategoryTemplateList> {
  const res = await templateAPI.get<{
    code: number;
    data: GroupByCategoryTemplateList;
  }>('/homepage?per_count=4');

  return res.data.data;
}

export async function getSearchResults({
  name_contains,
  category_id,
}: {
  name_contains?: string;
  category_id?: string;
}): Promise<TemplateSummary[]> {
  const res = await templateAPI.get<{
    code: number;
    data: {
      templates: Template[];
    };
  }>(`/template`, {
    params: {
      name_contains,
      category_id,
    },
  });

  return res.data.data.templates;
}

export async function getCategoryTemplateList(categoryId: string): Promise<TemplateSummary[]> {
  const res = await templateAPI.get<{
    code: number;
    data: {
      templates: Template[];
    };
  }>(`/template?category_id=${categoryId}`);

  return res.data.data.templates;
}

export async function getTemplateById(id: string): Promise<Template> {
  const res = await templateAPI.get<{
    code: number;
    data: Template;
  }>(`/template/${id}`);

  return res.data.data;
}

export async function getCategories(): Promise<TemplateCategory[]> {
  const res = await templateAPI.get<{
    code: number;
    data: {
      categories: TemplateCategory[];
    };
  }>('/category');

  return res.data.data.categories;
}

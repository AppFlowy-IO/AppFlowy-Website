import { GroupByCategoryTemplateList, Template, TemplateCategory, TemplateSummary } from '@/lib/interface';
import axios from 'axios';

export const templateAPI = axios.create({
  // rewrite in next.config.js, because of CORS
  baseURL: `http://localhost:3000/api/template-center`,
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

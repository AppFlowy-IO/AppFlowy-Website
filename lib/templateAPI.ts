import { GroupByCategoryTemplateList, Template, TemplateCategory, TemplateIcon } from '@/lib/interface';
import axios from 'axios';

export const templateAPI = axios.create({
  // rewrite in next.config.js, because of CORS
  baseURL: '',
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function getTemplateHomeList(): Promise<GroupByCategoryTemplateList> {
  // const res = await templateAPI.get('/api/templates');
  //
  // return res.data;

  return [
    {
      category: {
        id: '1',
        name: 'Project Management',
        bg_color: '#FFD6A5',
        icon: TemplateIcon.project,
        desc: 'Project management templates for your team',
        type: 0,
      },
      templateList: [
        {
          id: '1',
          name: 'Project Kickoff',
          desc: 'A template for project kickoff meetings',
          about:
            'This template is designed to help you run a project kickoff meeting. It includes a detailed agenda and a list of questions to ask your team.',
          view_url:
            'https://appflowy.com/585ccd62-4188-409e-bd6b-138173f477c2/Getting-started-83869cb8-4c3e-47aa-b731-080edfb58920',
          categories: [
            {
              id: '1',
              name: 'Project Management',
              bg_color: '#FFD6A5',
              icon: TemplateIcon.project,
              desc: 'Project management templates for your team',
              type: 0,
            },
          ],
          creator: {
            id: '1',
            name: 'John Doe',
            avatar: 'https://i.pravatar.cc/150?img=3',
            account_links: [
              {
                type: 'twitter',
                url: 'https://twitter.com',
              },
              {
                type: 'tiktok',
                url: 'https://tiktok.com',
              },
              {
                type: 'youtube',
                url: 'https://youtube.com',
              },
              {
                type: 'facebook',
                url: 'https://facebook.com',
              },
              {
                type: 'instagram',
                url: 'https://instagram.com',
              },
            ],
          },
          is_new_template: true,
          featured: true,
          related_template_ids: ['2', '3'],
        },
        {
          id: '2',
          name: 'Project Plan',
          desc: 'A template for project planning',
          about:
            'This template is designed to help you plan your project. It includes a detailed timeline, budget, and resource allocation.',
          view_url:
            'https://appflowy.com/854ea6c6-84cc-4710-9779-e704d058f92a/Databases-4443c9c8-1488-45b8-b48a-9ebb459672a2',
          categories: [
            {
              id: '1',
              name: 'Project Management',
              bg_color: '#FFD6A5',
              icon: TemplateIcon.project,
              desc: 'Project management templates for your team',
              type: 0,
            },
          ],
          creator: {
            id: '1',
            name: 'John Doe',
            avatar: 'https://i.pravatar.cc/150?img=3',
            account_links: [
              {
                type: 'twitter',
                url: 'https://twitter.com',
              },
              {
                type: 'tiktok',
                url: 'https://tiktok.com',
              },
              {
                type: 'youtube',
                url: 'https://youtube.com',
              },
              {
                type: 'facebook',
                url: 'https://facebook.com',
              },
              {
                type: 'instagram',
                url: 'https://instagram.com',
              },
            ],
          },
          is_new_template: true,
          featured: true,
          related_template_ids: ['1', '3'],
        },
        {
          id: '3',
          name: 'Project Status Report',
          desc: 'A template for project status reports',
          about:
            'This template is designed to help you create a project status report. It includes a detailed summary of the project status, key milestones, and risks.',
          view_url:
            'https://appflowy.com/a1b45051-39f5-469b-88da-d008ef40bc5a/chi--839898fa-7caa-4a72-83c2-dd8b9a4bf8d8',
          categories: [
            {
              id: '1',
              name: 'Project Management',
              bg_color: '#FFD6A5',
              icon: TemplateIcon.project,
              desc: 'Project management templates for your team',
              type: 0,
            },
          ],
          creator: {
            id: '1',
            name: 'John Doe',
            avatar: 'https://i.pravatar.cc/150?img=3',
            account_links: [
              {
                type: 'twitter',
                url: 'https://twitter.com',
              },
              {
                type: 'tiktok',
                url: 'https://tiktok.com',
              },
              {
                type: 'youtube',
                url: 'https://youtube.com',
              },
              {
                type: 'facebook',
                url: 'https://facebook.com',
              },
              {
                type: 'instagram',
                url: 'https://instagram.com',
              },
            ],
          },
          is_new_template: true,
          featured: true,
          related_template_ids: ['1', '2'],
        },
      ],
    },
    {
      category: {
        id: '2',
        name: 'Engineering',
        bg_color: '#FFADAD',
        icon: TemplateIcon.engineering,
        desc: 'Engineering templates for your team',
        type: 0,
      },
      templateList: [
        {
          id: '4',
          name: 'Code Review',
          desc: 'A template for code reviews',
          about:
            'This template is designed to help you run a code review. It includes a detailed checklist of things to look for and questions to ask.',
          view_url:
            'https://appflowy.com/585ccd62-4188-409e-bd6b-138173f477c2/Getting-started-83869cb8-4c3e-47aa-b731-080edfb58920',
          categories: [
            {
              id: '2',
              name: 'Engineering',
              bg_color: '#FFADAD',
              icon: TemplateIcon.engineering,
              desc: 'Engineering templates for your team',
              type: 0,
            },
          ],
          creator: {
            id: '1',
            name: 'John Doe',
            avatar: 'https://i.pravatar.cc/150?img=3',
            account_links: [
              {
                type: 'twitter',
                url: 'https://twitter.com',
              },
              {
                type: 'tiktok',
                url: 'https://tiktok.com',
              },
              {
                type: 'youtube',
                url: 'https://youtube.com',
              },
              {
                type: 'facebook',
                url: 'https://facebook.com',
              },
              {
                type: 'instagram',
                url: 'https://instagram.com',
              },
            ],
          },
          is_new_template: true,
          featured: true,
          related_template_ids: ['5', '6'],
        },
        {
          id: '5',
          name: 'Architecture Diagram',
          desc: 'A template for architecture diagrams',
          about:
            'This template is designed to help you create an architecture diagram. It includes a detailed overview of the system architecture and components.',
          view_url:
            'https://appflowy.com/854ea6c6-84cc-4710-9779-e704d058f92a/Databases-4443c9c8-1488-45b8-b48a-9ebb459672a2',
          categories: [
            {
              id: '2',
              name: 'Engineering',
              bg_color: '#FFADAD',
              icon: TemplateIcon.engineering,
              desc: 'Engineering templates for your team',
              type: 0,
            },
          ],
          creator: {
            id: '1',
            name: 'John Doe',
            avatar: 'https://i.pravatar.cc/150?img=3',
            account_links: [
              {
                type: 'twitter',
                url: 'https://twitter.com',
              },
              {
                type: 'linkedin',
                url: 'https://linkedin.com',
              },
            ],
          },
          is_new_template: true,
          featured: true,
          related_template_ids: ['4', '6'],
        },
      ],
    },
  ];
}

export async function getSearchResults(searchText: string): Promise<Template[]> {
  // const res = await templateAPI.get(`/api/templates?search=${searchText}`);
  //
  // return res.data;
  return [
    {
      id: '1',
      name: 'Project Kickoff',
      desc: 'A template for project kickoff meetings',
      about:
        'This template is designed to help you run a project kickoff meeting. It includes a detailed agenda and a list of questions to ask your team.',
      view_url:
        'https://appflowy.com/585ccd62-4188-409e-bd6b-138173f477c2/Getting-started-83869cb8-4c3e-47aa-b731-080edfb58920',
      categories: [
        {
          id: '1',
          name: 'Project Management',
          bg_color: '#FFD6A5',
          icon: TemplateIcon.project,
          desc: 'Project management templates for your team',
          type: 0,
        },
      ],
      creator: {
        id: '1',
        name: 'John Doe',
        avatar: 'https://i.pravatar.cc/150?img=3',
        account_links: [
          {
            type: 'twitter',
            url: 'https://twitter.com',
          },
          {
            type: 'linkedin',
            url: 'https://linkedin.com',
          },
        ],
      },
      is_new_template: true,
      featured: true,
      related_template_ids: ['2', '3'],
    },
    {
      id: '2',
      name: 'Project Plan',
      desc: 'A template for project planning',
      about:
        'This template is designed to help you plan your project. It includes a detailed timeline, budget, and resource allocation.',
      view_url:
        'https://appflowy.com/854ea6c6-84cc-4710-9779-e704d058f92a/Databases-4443c9c8-1488-45b8-b48a-9ebb459672a2',
      categories: [
        {
          id: '1',
          name: 'Project Management',
          bg_color: '#FFD6A5',
          icon: TemplateIcon.project,
          desc: 'Project management templates for your team',
          type: 0,
        },
      ],
      creator: {
        id: '1',
        name: 'John Doe',
        avatar: 'https://i.pravatar.cc/150?img=3',
        account_links: [
          {
            type: 'twitter',
            url: 'https://twitter.com',
          },
          {
            type: 'linkedin',
            url: 'https://linkedin.com',
          },
        ],
      },
      is_new_template: true,
      featured: true,
      related_template_ids: ['1', '3'],
    },
    {
      id: '3',
      name: 'Project Status Report',
      desc: 'A template for project status reports',
      about:
        'This template is designed to help you create a project status report. It includes a detailed summary of the project status, key milestones, and risks.',
      view_url: 'https://appflowy.com/a1b45051-39f5-469b-88da-d008ef40bc5a/chi--839898fa-7caa-4a72-83c2-dd8b9a4bf8d8',
      categories: [
        {
          id: '1',
          name: 'Project Management',
          bg_color: '#FFD6A5',
          icon: TemplateIcon.project,
          desc: 'Project management templates for your team',
          type: 0,
        },
      ],
      creator: {
        id: '1',
        name: 'John Doe',
        avatar: 'https://i.pravatar.cc/150?img=3',
        account_links: [
          {
            type: 'twitter',
            url: 'https://twitter.com',
          },
          {
            type: 'tiktok',
            url: 'https://tiktok.com',
          },
          {
            type: 'youtube',
            url: 'https://youtube.com',
          },
          {
            type: 'facebook',
            url: 'https://facebook.com',
          },
          {
            type: 'instagram',
            url: 'https://instagram.com',
          },
        ],
      },
      is_new_template: true,
      featured: true,
      related_template_ids: ['1', '2'],
    },
  ];
}

export async function getCategoryTemplateList(categoryId: string): Promise<Template[]> {
  // const res = await templateAPI.get(`/api/templates?category=${categoryId}`);
  //
  // return res.data;
  return [
    {
      id: '1',
      name: 'Project Kickoff',
      desc: 'A template for project kickoff meetings',
      about:
        'This template is designed to help you run a project kickoff meeting. It includes a detailed agenda and a list of questions to ask your team.',
      view_url:
        'https://appflowy.com/585ccd62-4188-409e-bd6b-138173f477c2/Getting-started-83869cb8-4c3e-47aa-b731-080edfb58920',
      categories: [
        {
          id: '1',
          name: 'Project Management',
          bg_color: '#FFD6A5',
          icon: TemplateIcon.project,
          desc: 'Project management templates for your team',
          type: 0,
        },
      ],
      creator: {
        id: '1',
        name: 'John Doe',
        avatar: 'https://i.pravatar.cc/150?img=3',
        account_links: [
          {
            type: 'twitter',
            url: 'https://twitter.com',
          },
          {
            type: 'linkedin',
            url: 'https://linkedin.com',
          },
        ],
      },
      is_new_template: true,
      featured: true,
      related_template_ids: ['2', '3'],
    },
  ];
}

export async function getTemplateById(id: string): Promise<Template> {
  // const res = await templateAPI.get(`/api/templates/${id}`);
  //
  // return res.data;
  return {
    id: '1',
    name: 'Project Kickoff',
    desc: 'A template for project kickoff meetings',
    about:
      'This template is designed to help you run a project kickoff meeting. It includes a detailed agenda and a list of questions to ask your team.',
    view_url:
      'https://appflowy.com/585ccd62-4188-409e-bd6b-138173f477c2/Getting-started-83869cb8-4c3e-47aa-b731-080edfb58920',
    categories: [
      {
        id: '1',
        name: 'Project Management',
        bg_color: '#FFD6A5',
        icon: TemplateIcon.project,
        desc: 'Project management templates for your team',
        type: 0,
      },
    ],
    creator: {
      id: '1',
      name: 'John Doe',
      avatar: 'https://i.pravatar.cc/150?img=3',
      account_links: [
        {
          type: 'twitter',
          url: 'https://twitter.com',
        },
        {
          type: 'tiktok',
          url: 'https://tiktok.com',
        },
        {
          type: 'youtube',
          url: 'https://youtube.com',
        },
        {
          type: 'facebook',
          url: 'https://facebook.com',
        },
        {
          type: 'instagram',
          url: 'https://instagram.com',
        },
        {
          type: 'linkedin',
          url: 'https://linkedin.com',
        },
        {
          type: 'website',
          url: 'https://example.com',
        },
      ],
    },
    is_new_template: true,
    featured: true,
    related_template_ids: ['2', '3'],
    related_templates: [
      {
        id: '2',
        name: 'Project Plan',
        desc: 'A template for project planning',
        about:
          'This template is designed to help you plan your project. It includes a detailed timeline, budget, and resource allocation.',
        view_url:
          'https://appflowy.com/854ea6c6-84cc-4710-9779-e704d058f92a/Databases-4443c9c8-1488-45b8-b48a-9ebb459672a2',
        categories: [
          {
            id: '1',
            name: 'Project Management',
            bg_color: '#FFD6A5',
            icon: TemplateIcon.project,
            desc: 'Project management templates for your team',
            type: 0,
          },
        ],
        creator: {
          id: '1',
          name: 'John Doe',
          avatar: 'https://i.pravatar.cc/150?img=3',
          account_links: [
            {
              type: 'twitter',
              url: 'https://twitter.com',
            },
            {
              type: 'linkedin',
              url: 'https://linkedin.com',
            },
          ],
        },
        is_new_template: true,
        featured: true,
        related_template_ids: ['1', '3'],
      },
      {
        id: '3',
        name: 'Project Status Report',
        desc: 'A template for project status reports',
        about:
          'This template is designed to help you create a project status report. It includes a detailed summary of the project status, key milestones, and risks.',
        view_url: 'https://appflowy.com/a1b45051-39f5-469b-88da-d008ef40bc5a/chi--839898fa-7caa-4a72-83c2-dd8b9a4bf8d8',
        categories: [
          {
            id: '1',
            name: 'Project Management',
            bg_color: '#FFD6A5',
            icon: TemplateIcon.project,
            desc: 'Project management templates for your team',
            type: 0,
          },
        ],
        creator: {
          id: '1',
          name: 'John Doe',
          avatar: 'https://i.pravatar.cc/150?img=3',
          account_links: [
            {
              type: 'twitter',
              url: 'https://twitter.com',
            },
            {
              type: 'linkedin',
              url: 'https://linkedin.com',
            },
          ],
        },
        is_new_template: true,
        featured: true,
        related_template_ids: ['1', '2'],
      },
    ],
  };
}

export async function getCategories(): Promise<TemplateCategory[]> {
  // const res = await templateAPI.get('/api/categories');
  //
  // return res.data;
  return [
    {
      id: '1',
      name: 'Project Management',
      icon: TemplateIcon.project,
      desc: 'Project management templates for your team',
      type: 0,
      bg_color: '#FFD6A5',
    },
    {
      id: '2',
      name: 'Engineering',
      icon: TemplateIcon.engineering,
      desc: 'Engineering templates for your team',
      type: 0,
      bg_color: '#FFADAD',
    },
    {
      id: '3',
      name: 'Startups',
      icon: TemplateIcon.startups,
      desc: 'Startup templates for your team',
      type: 0,
      bg_color: '#BCFFB9',
    },
    {
      id: '4',
      name: 'Schools',
      icon: TemplateIcon.schools,
      desc: 'School templates for your team',
      type: 0,
      bg_color: '#FFC0CB',
    },
    {
      id: '5',
      name: 'Marketing',
      icon: TemplateIcon.marketing,
      desc: 'Marketing templates for your team',
      type: 0,
      bg_color: '#FFD700',
    },
    {
      id: '6',
      name: 'Management',
      icon: TemplateIcon.management,
      desc: 'Management templates for your team',
      type: 0,
      bg_color: '#FFA07A',
    },
    {
      id: '7',
      name: 'Human Resources',
      icon: TemplateIcon.humanResources,
      desc: 'Human resources templates for your team',
      type: 0,
      bg_color: '#FF6347',
    },
    {
      id: '8',
      name: 'Sales',
      icon: TemplateIcon.sales,
      desc: 'Sales templates for your team',
      type: 0,
      bg_color: '#FF4500',
    },
    {
      id: '9',
      name: 'Team Meetings',
      icon: TemplateIcon.teamMeetings,
      desc: 'Team meeting templates for your team',
      type: 0,
      bg_color: '#FF1493',
    },
    {
      id: '10',
      name: 'AI',
      icon: TemplateIcon.ai,
      desc: 'AI templates for your team',
      type: 1,
      bg_color: '#FF69B4',
    },
    {
      id: '11',
      name: 'Docs',
      icon: TemplateIcon.docs,
      desc: 'Docs templates for your team',
      type: 1,
      bg_color: '#FFC0CB',
    },
    {
      id: '12',
      name: 'Wiki',
      icon: TemplateIcon.wiki,
      desc: 'Wiki templates for your team',
      type: 1,
      bg_color: '#FFD700',
    },
    {
      id: '13',
      name: 'Database',
      icon: TemplateIcon.database,
      desc: 'Database templates for your team',
      type: 1,
      bg_color: '#FFA07A',
    },
    {
      id: '14',
      name: 'Kanban',
      icon: TemplateIcon.kanban,
      desc: 'Kanban templates for your team',
      type: 1,
      bg_color: '#FF6347',
    },
  ];
}

'use client';

import Link from 'next/link';
import GetStart from '@/components/product/get-start';
import { useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { TemplateSummary, TemplateCategory, TemplateCategoryType } from '@/lib/interface';
import { useTemplatesContext } from './templates-context';
import TemplateItem from './template-item';
import TemplateHomeSearch from './template-home-search';
import { slugify } from './utils';

const iconNames = new Set(['project', 'engineering', 'startups', 'schools', 'marketing', 'management', 'human-resources', 'sales', 'team-meetings', 'docs', 'wiki', 'database', 'kanban']);

function Icon({ name, sidebar = false }: { name: string; sidebar?: boolean }) {
  if (name === 'arrow') return <span className='template-home__view-all-arrow' aria-hidden='true' />;
  const folder = sidebar ? 'sidebar/' : name === 'featured' || name === 'all' ? '' : 'headings/';

  return <img className='template-home__icon' src={`/images/templates/list/${folder}${name}.svg`} alt='' width={24} height={24} />;
}

function Cards({ posts, category }: { posts: TemplateSummary[]; category?: TemplateCategory }) {
  return <div className='template-home__grid'>{posts.map(post => (
    <div className='template-item' key={post.view_id}>
      <TemplateItem template={post} category={category ?? post.categories[0]} />
    </div>
  ))}</div>;
}

export default function TemplateHome() {
  const { categories, homepageTemplates, categoryTemplates = [], selectedCategoryId, searchText, searchResults, loading, setSearchText } = useTemplatesContext();
  const selectedCategory = categories.find(category => category.id === selectedCategoryId);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [categoryMenuOpen, setCategoryMenuOpen] = useState(false);
  const specialGroups = [
    { key: 'featured', title: 'Featured', posts: homepageTemplates?.featured_templates ?? [] },
    { key: 'new', title: 'New templates', posts: homepageTemplates?.new_templates ?? [] },
  ];
  const categoryIcon = (name: string, icon: string) => name === 'Product & Design' ? 'product-design' : icon === 'ai' ? 'ai' : iconNames.has(icon) ? icon : 'all';

  return (
    <>
      <header className='template-home__hero'>
        <h1>{selectedCategory ? `${selectedCategory.name} templates` : <>Ready to use templates<br />{' '}for your teams</>}</h1>
        <p>{selectedCategory?.description ?? 'Project and task management, company handbooks, content calendars, and more.'}</p>
      </header>
      <div className='template-home__layout'>
        <aside className='template-home__sidebar' aria-label='Template navigation'>
          <TemplateHomeSearch />
          <div className='template-home__mobile-navigation'>
            <Popover.Root open={categoryMenuOpen} onOpenChange={setCategoryMenuOpen}>
              <Popover.Trigger className='template-home__select' aria-label='Select template category'>
                <span>{selectedCategory?.name ?? 'All templates'}</span>
                <img src='/images/templates/list/select-arrow.svg' alt='' width={24} height={24} />
              </Popover.Trigger>
              <Popover.Content className='template-home__category-dropdown' align='start' sideOffset={8} collisionPadding={16} aria-label='Template categories'>
                <nav aria-label='Mobile template navigation' onClick={() => setCategoryMenuOpen(false)}>
                  <Link className='template-home__menu' href='/templates' onClick={() => setSearchText('')}><Icon name='all' sidebar />All Templates</Link>
                  {categories.map(category => (
                    <Link className='template-home__menu' aria-current={category.id === selectedCategoryId ? 'page' : undefined} key={category.id} href={`/templates/${slugify(category.name)}`}>
                      <Icon name={categoryIcon(category.name, category.icon)} sidebar />{category.name}
                    </Link>
                  ))}
                </nav>
              </Popover.Content>
            </Popover.Root>
          </div>
          <Link className='template-home__menu' href='/templates' onClick={() => setSearchText('')}><Icon name='all' sidebar />All Templates</Link>
          {[TemplateCategoryType.ByUseCase, TemplateCategoryType.ByFeature].map(type => (
            <nav key={type} aria-label={type === TemplateCategoryType.ByUseCase ? 'By Use Case' : 'By Feature'}>
              <h2>{type === TemplateCategoryType.ByUseCase ? 'By Use Case' : 'By Feature'}</h2>
              <div className='template-home__category-links'>{categories.filter(category => category.category_type === type).map(category => (
                <Link className='template-home__menu' aria-current={category.id === selectedCategoryId ? 'page' : undefined} key={category.id} href={`/templates/${slugify(category.name)}`}>
                  <Icon name={categoryIcon(category.name, category.icon)} sidebar />{category.name}
                </Link>
              ))}</div>
            </nav>
          ))}
        </aside>
        <div className='template-home__list'>
          {searchText ? (
            <section aria-live='polite' aria-busy={loading}>
              <div className='template-home__section-heading'><h2>Search results</h2><span>{loading ? 'Searching…' : `${searchResults.length} templates`}</span></div>
              {!loading && searchResults.length === 0 ? <p>No templates found. Try another search.</p> : <Cards posts={searchResults} category={selectedCategory} />}
            </section>
          ) : selectedCategory ? (
            <section aria-label={`${selectedCategory.name} templates`}>
              {categoryTemplates.length ? <Cards posts={categoryTemplates} category={selectedCategory} /> : <p>No templates available in this category yet.</p>}
            </section>
          ) : <>
            {specialGroups.filter(group => group.posts.length > 0).map(group => (
              <section key={group.key}>
                <div className='template-home__section-heading'>
                  <h2><Icon name='featured' />{group.title}</h2>
                  {group.posts.length > (group.key === 'featured' ? 4 : 2) && <button type='button' onClick={() => setExpanded(prev => ({ ...prev, [group.key]: !prev[group.key] }))} aria-expanded={!!expanded[group.key]}>{expanded[group.key] ? 'Show less' : 'View all'}<Icon name='arrow' /></button>}
                </div>
                <Cards posts={expanded[group.key] ? group.posts : group.posts.slice(0, group.key === 'featured' ? 4 : 2)} />
              </section>
            ))}
            {categories.map(category => {
              const posts = homepageTemplates?.template_groups.find(group => group.category.id === category.id)?.templates ?? [];

              if (!posts.length) return null;
              return <section key={category.id}>
                <div className='template-home__section-heading'>
                  <h2><Icon name={categoryIcon(category.name, category.icon)} />{category.name}</h2>
                  <Link href={`/templates/${slugify(category.name)}`}>View all<Icon name='arrow' /></Link>
                </div>
                {category.description && <p className='template-home__category-description'>{category.description}</p>}
                <Cards posts={posts.slice(0, 2)} />
              </section>;
            })}
          </>}
        </div>
      </div>
      <div className='template-home__get-start'><GetStart /></div>
    </>
  );
}

'use client';

import { GroupByCategoryTemplateList, TemplateCategory, TemplateSummary } from '@/lib/interface';
import { getSearchResults } from '@/lib/templateAPI';
import { hasTemplateSlug, useTemplateSlugs } from './template-slug-context';
import debounce from 'lodash-es/debounce';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export interface TemplatesContextType {
  searchText: string;
  setSearchText: (searchText: string) => void;
  loading: boolean;
  categories: TemplateCategory[];
  homepageTemplates?: GroupByCategoryTemplateList;
  categoryTemplates?: TemplateSummary[];
  selectedCategoryId?: string;
  searchResults: TemplateSummary[];
}

export const TemplatesContext = createContext<TemplatesContextType | null>(null);

export const TemplatesProvider = ({
  children,
  categories,
  homepageTemplates,
  categoryTemplates,
  selectedCategoryId,
}: {
  children: React.ReactNode;
  categories: TemplateCategory[];
  homepageTemplates?: GroupByCategoryTemplateList;
  categoryTemplates?: TemplateSummary[];
  selectedCategoryId?: string;
}) => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState<TemplateSummary[]>([]);
  const [loading, setLoading] = useState(false);
  const slugs = useTemplateSlugs();

  // Drop templates the router would not resolve (currently: unpublished ones, which the
  // API still returns) here, once, so counts, empty states and grids all see the same list.
  const visible = useMemo(() => {
    const isLive = hasTemplateSlug(slugs);

    return {
      homepageTemplates: homepageTemplates && {
        featured_templates: homepageTemplates.featured_templates.filter(isLive),
        new_templates: homepageTemplates.new_templates.filter(isLive),
        template_groups: homepageTemplates.template_groups.map((group) => ({
          ...group,
          templates: group.templates.filter(isLive),
        })),
      },
      categoryTemplates: categoryTemplates?.filter(isLive),
      searchResults: searchResults.filter(isLive),
    };
  }, [slugs, homepageTemplates, categoryTemplates, searchResults]);

  const handleSearch = useCallback(
    async (searchText: string) => {
      try {
        const data = await getSearchResults({
          name_contains: searchText,
          category_id: selectedCategoryId,
        });

        setSearchResults(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    },
    [selectedCategoryId]
  );

  const debounceSearch = useMemo(() => {
    return debounce(handleSearch, 300);
  }, [handleSearch]);

  useEffect(() => {
    if (searchText) {
      setLoading(true);
      void debounceSearch(searchText);
    } else {
      setSearchResults([]);
    }
  }, [searchText, debounceSearch]);

  return (
    <TemplatesContext.Provider
      value={{
        loading,
        searchText,
        setSearchText,
        categories,
        homepageTemplates: visible.homepageTemplates,
        searchResults: visible.searchResults,
        categoryTemplates: visible.categoryTemplates,
        selectedCategoryId,
      }}
    >
      {children}
    </TemplatesContext.Provider>
  );
};

export function useTemplatesContext() {
  const context = useContext(TemplatesContext);

  if (!context) {
    throw new Error('useTemplateContext must be used within a TemplateProvider');
  }

  return context;
}

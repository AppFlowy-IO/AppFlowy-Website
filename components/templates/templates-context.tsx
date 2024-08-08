'use client';

import { GroupByCategoryTemplateList, Template, TemplateCategory } from '@/lib/interface';
import { getSearchResults } from '@/lib/templateAPI';
import debounce from 'lodash-es/debounce';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export interface TemplatesContextType {
  searchText: string;
  setSearchText: (searchText: string) => void;
  loading: boolean;
  categories: TemplateCategory[];
  templateList?: GroupByCategoryTemplateList;
  categoryTemplates?: Template[];
  selectedCategoryId?: string;
  searchResults: Template[];
}

export const TemplatesContext = createContext<TemplatesContextType | null>(null);

export const TemplatesProvider = ({
  children,
  categories,
  templateList,
  categoryTemplates,
  selectedCategoryId,
}: {
  children: React.ReactNode;
  categories: TemplateCategory[];
  templateList?: GroupByCategoryTemplateList;
  categoryTemplates?: Template[];
  selectedCategoryId?: string;
}) => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState<Template[]>([]);
  const [loading, setLoading] = useState(false);
  const handleSearch = useCallback(async (searchText: string) => {
    try {
      setLoading(true);
      const data = await getSearchResults(searchText);
      setSearchResults(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  const debounceSearch = useMemo(() => {
    return debounce(handleSearch, 300);
  }, [handleSearch]);

  useEffect(() => {
    if (searchText) {
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
        templateList,
        searchResults,
        categoryTemplates,
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

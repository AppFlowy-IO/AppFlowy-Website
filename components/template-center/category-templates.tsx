import Templates from '@/components/template-center/templates';
import { useTemplatesContext } from '@/components/template-center/templates-context';
import React, { useMemo } from 'react';

function CategoryTemplates() {
  const { categoryTemplates = [], selectedCategoryId, categories } = useTemplatesContext();

  const category = useMemo(() => {
    return categories.find((item) => item.id === selectedCategoryId);
  }, [categories, selectedCategoryId]);

  if (!category) return null;
  return (
    <div className={'category-template-list'}>
      <div className={'template-category'}>
        <Templates templateList={categoryTemplates} category={category} />
      </div>
    </div>
  );
}

export default CategoryTemplates;

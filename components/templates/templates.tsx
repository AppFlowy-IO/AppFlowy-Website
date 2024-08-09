import TemplateItem from '@/components/templates/template-item';
import { Template, TemplateCategory } from '@/lib/interface';
import { Grid } from '@mui/material';
import React, { useMemo } from 'react';

function Templates({ templateList, category }: { templateList: Template[]; category?: TemplateCategory }) {
  const renderTemplates = useMemo(() => {
    return templateList.map((template) => {
      const currentCategory = category ? category : template.categories[0];

      return (
        <Grid key={template.id} item sm={12} md={6}>
          <div className={'template-item'}>
            <TemplateItem template={template} category={currentCategory} />
          </div>
        </Grid>
      );
    });
  }, [category, templateList]);

  return (
    <Grid
      container
      className={'templates'}
      rowSpacing={{
        xs: 2,
        sm: 4,
      }}
      columns={{ xs: 4, sm: 8, md: 12 }}
      columnSpacing={{ sm: 2, md: 3 }}
    >
      {renderTemplates}
    </Grid>
  );
}

export default Templates;

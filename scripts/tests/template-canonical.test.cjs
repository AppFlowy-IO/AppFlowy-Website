const test = require('node:test');
const assert = require('node:assert/strict');
const { canonicalTemplateCategory, canonicalTemplatePath } = require('../../lib/template-canonical');
const { getTemplateRoutes } = require('../generate-sitemap');

const categories = [
  { id: 'docs', name: 'Docs' },
  { id: 'engineering', name: 'Engineering' },
  { id: 'design', name: 'Product & Design' },
];

test('saved primary category wins regardless of category ordering', () => {
  for (const values of [categories, [...categories].reverse()]) {
    assert.equal(canonicalTemplatePath(values, 'template-id', 'design'), '/templates/product-design/template-id');
    assert.equal(canonicalTemplateCategory(values, 'design').name, 'Product & Design');
  }
});

test('legacy and invalid assignments retain the old deterministic fallback', () => {
  for (const primary of [undefined, null, 'removed-category']) {
    assert.equal(canonicalTemplatePath(categories, 'template-id', primary), '/templates/docs/template-id');
  }
  assert.equal(canonicalTemplatePath([], 'template-id', 'design'), null);
});

test('sitemap and page helper choose the same primary URL with no duplicate template entries', async () => {
  const originalFetch = global.fetch;
  const template = { view_id: 'template-id', categories, primary_category_id: 'design' };
  global.fetch = async (url) => ({
    ok: true,
    json: async () => ({
      data: url.endsWith('/category')
        ? { categories }
        : url.endsWith('/template/template-id')
        ? template
        : { templates: [template] },
    }),
  });
  try {
    const routes = await getTemplateRoutes();
    const templateRoutes = routes.filter(({ path }) => path.endsWith('/template-id'));
    assert.deepEqual(
      templateRoutes.map(({ path }) => `/${path}`),
      [canonicalTemplatePath(categories, template.view_id, template.primary_category_id)]
    );
  } finally {
    global.fetch = originalFetch;
  }
});

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Keep this list aligned with CANONICAL_BLOG_CATEGORIES in
// lib/blog-taxonomy.ts. The build check protects crawlable topic hubs from
// casing and singular/plural variants in newly published frontmatter.
const canonicalCategories = new Set([
  'Announcement',
  'Company',
  'Comparisons',
  'Developers',
  'Enterprise',
  'Knowledge management',
  'Open source',
  'Private AI',
  'Product',
  'Productivity',
  'Project management',
  'Self-hosting',
  'Using AppFlowy',
]);

const postsDirectory = path.join(process.cwd(), '_blog');
const errors = [];
const seenSlugs = new Map();
const seenSeoTitles = new Map();
const seenSeoDescriptions = new Map();
const reservedTopicSlugs = new Set([
  'alternatives',
  'knowledge-management',
  'open-source-engineering',
  'private-ai',
  'product-updates',
  'project-management',
  'self-hosting',
]);
const canonicalTopics = new Set(reservedTopicSlugs);

const normalizeTag = (value) => value.trim().replace(/_/g, ' ').replace(/\s+/g, ' ').toLowerCase();

fs.readdirSync(postsDirectory)
  .filter((fileName) => fileName.endsWith('.mdx'))
  .forEach((fileName) => {
    const { data } = matter(fs.readFileSync(path.join(postsDirectory, fileName), 'utf8'));
    const [, , , ...slugParts] = fileName.replace(/\.mdx$/, '').split('-');
    const slug = slugParts.join('-');
    const categories = Array.isArray(data.categories) ? data.categories : [];
    const tags = Array.isArray(data.tags) ? data.tags : [];
    const topics = Array.isArray(data.topics) ? data.topics : [];
    const isPublished = !data.unpublished && !data.archived;
    const titleLength = typeof data.title === 'string' ? data.title.trim().length : 0;
    const descriptionLength = typeof data.description === 'string' ? data.description.trim().length : 0;

    if (seenSlugs.has(slug)) {
      errors.push(`${fileName}: duplicate slug "${slug}" also used by ${seenSlugs.get(slug)}`);
    } else {
      seenSlugs.set(slug, fileName);
    }

    if (reservedTopicSlugs.has(slug)) {
      errors.push(`${fileName}: slug "${slug}" is reserved for a blog topic hub`);
    }

    if (typeof data.title !== 'string' || !data.title.trim()) {
      errors.push(`${fileName}: title must be a non-empty string`);
    }

    if (typeof data.description !== 'string' || !data.description.trim()) {
      errors.push(`${fileName}: description must be a non-empty string`);
    }

    if (!data.date || Number.isNaN(new Date(data.date).getTime())) {
      errors.push(`${fileName}: date must be a valid publication date`);
    }

    if (data.last_modified && Number.isNaN(new Date(data.last_modified).getTime())) {
      errors.push(`${fileName}: last_modified must be a valid date when provided`);
    }

    if (!Array.isArray(data.categories) || !data.categories.length) {
      errors.push(`${fileName}: categories must be a non-empty array`);
    }

    if (!Array.isArray(data.tags) || !data.tags.length) {
      errors.push(`${fileName}: tags must be a non-empty array`);
    }

    categories.forEach((category) => {
      if (typeof category !== 'string' || !canonicalCategories.has(category)) {
        errors.push(`${fileName}: unknown or non-canonical category "${String(category)}"`);
      }
    });

    const normalizedTags = tags
      .filter((tag) => typeof tag === 'string')
      .map(normalizeTag)
      .filter(Boolean);

    if (normalizedTags.length !== tags.length) {
      errors.push(`${fileName}: tags must be non-empty strings`);
    }

    const duplicates = normalizedTags.filter((tag, index) => normalizedTags.indexOf(tag) !== index);
    [...new Set(duplicates)].forEach((tag) => {
      errors.push(`${fileName}: duplicate tag after normalization "${tag}"`);
    });

    if (isPublished && (topics.length < 1 || topics.length > 2)) {
      errors.push(`${fileName}: published articles must declare one or two topics`);
    }

    topics.forEach((topic) => {
      if (typeof topic !== 'string' || !canonicalTopics.has(topic)) {
        errors.push(`${fileName}: unknown blog topic "${String(topic)}"`);
      }
    });

    const duplicateTopics = topics.filter((topic, index) => topics.indexOf(topic) !== index);
    [...new Set(duplicateTopics)].forEach((topic) => {
      errors.push(`${fileName}: duplicate topic "${topic}"`);
    });

    if (data.seo_title && (typeof data.seo_title !== 'string' || data.seo_title.trim().length > 60)) {
      errors.push(`${fileName}: seo_title must be a string of 60 characters or fewer`);
    }

    if (isPublished && titleLength > 60 && !data.seo_title) {
      errors.push(`${fileName}: titles over 60 characters require a concise seo_title`);
    }

    if (
      data.seo_description &&
      (typeof data.seo_description !== 'string' ||
        data.seo_description.trim().length < 120 ||
        data.seo_description.trim().length > 160)
    ) {
      errors.push(`${fileName}: seo_description must contain 120 to 160 characters`);
    }

    if (isPublished && (descriptionLength < 120 || descriptionLength > 160) && !data.seo_description) {
      errors.push(`${fileName}: descriptions outside 120 to 160 characters require seo_description`);
    }

    if (isPublished) {
      const seoTitle = String(data.seo_title || data.title || '')
        .trim()
        .toLowerCase();
      const seoDescription = String(data.seo_description || data.description || '')
        .trim()
        .toLowerCase();

      if (seenSeoTitles.has(seoTitle)) {
        errors.push(`${fileName}: duplicate SEO title also used by ${seenSeoTitles.get(seoTitle)}`);
      } else {
        seenSeoTitles.set(seoTitle, fileName);
      }

      if (seenSeoDescriptions.has(seoDescription)) {
        errors.push(`${fileName}: duplicate SEO description also used by ${seenSeoDescriptions.get(seoDescription)}`);
      } else {
        seenSeoDescriptions.set(seoDescription, fileName);
      }
    }
  });

if (errors.length) {
  console.error(`Blog taxonomy validation failed with ${errors.length} issue(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exitCode = 1;
} else {
  console.log('Blog taxonomy validation passed.');
}

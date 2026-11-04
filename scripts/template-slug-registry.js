const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { buildTemplateSlugMap, canonicalTemplateCategory, isUnpublished, slugify } = require('../lib/template-canonical');

/**
 * lib/template-slug-registry.json pins every template URL the site has ever served.
 *
 * Slugs are derived from template names, and names change. Without a record, a rename
 * would silently move a template to a new URL and 404 the old one — and nothing built
 * from current data could notice, because the old slug simply stops existing. The
 * registry is that record. It is add-only: entries and slugs are never removed, so every
 * URL it has ever listed keeps resolving (see buildTemplateSlugMap()).
 */
const REGISTRY_FILE = 'lib/template-slug-registry.json';
const REGISTRY_PATH = path.join(__dirname, '..', REGISTRY_FILE);
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const VIEW_ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

const README =
  'Every slug a template has ever been served at, keyed by view id. Add-only: never delete an entry or a slug. ' +
  'New templates are added by `npm run generate-sitemap`. To give a renamed template a new URL, move its `slug` ' +
  'into `aliases` and set the new `slug`; the old URL then 308s to the new one. `fallbackCategory` is only where a ' +
  "withdrawn template's URL redirects; which categories list a template still comes from the API.";

const readRegistry = (file = REGISTRY_PATH) => JSON.parse(fs.readFileSync(file, 'utf8')).templates;

const writeRegistry = (registry, file = REGISTRY_PATH) => {
  // Sorted by slug so the file reads like a URL list and diffs stay small.
  const templates = Object.fromEntries(Object.entries(registry).sort(([, a], [, b]) => a.slug.localeCompare(b.slug)));

  fs.writeFileSync(file, `${JSON.stringify({ $comment: README, templates }, null, 2)}\n`);
};

/**
 * Records every live template's current slug, keeping everything already registered.
 *
 * A template whose registered slug moved (a new category claimed it) keeps the old one as
 * an alias, which keeps the registry add-only. Withdrawn templates are left untouched.
 * Returns the new registry plus notes worth printing.
 */
const syncRegistry = (registry, templates, categories) => {
  const { viewIdToSlug, shadowed } = buildTemplateSlugMap(templates, categories, registry);
  const next = JSON.parse(JSON.stringify(registry));
  const notes = shadowed.map(
    ({ viewId, slug }) => `/templates/${slug} now belongs to a category; template ${viewId} no longer answers there.`
  );

  templates
    .filter((template) => !isUnpublished(template))
    .forEach((template) => {
      const slug = viewIdToSlug.get(template.view_id);
      const category = canonicalTemplateCategory(template.categories || [], template.primary_category_id);
      const entry = next[template.view_id];

      if (!entry) {
        next[template.view_id] = {
          slug,
          name: template.name,
          ...(category ? { fallbackCategory: slugify(category.name) } : {}),
        };
        notes.push(`registered "${template.name}" at /templates/${slug}`);
        return;
      }

      if (entry.name && entry.name !== template.name) {
        notes.push(`"${entry.name}" was renamed to "${template.name}"; its URL stays /templates/${entry.slug}.`);
      }

      if (entry.slug !== slug) {
        entry.aliases = [...new Set([...(entry.aliases || []), entry.slug])].filter((alias) => alias !== slug);
        entry.slug = slug;
        notes.push(`"${template.name}" moved to /templates/${slug}`);
      }

      entry.name = template.name;
      if (category) entry.fallbackCategory = slugify(category.name);
    });

  return { registry: next, notes };
};

const entrySlugs = (entry) => [entry.slug, ...(entry.aliases || [])];

/** Structural problems with the registry, plus anything removed relative to `base`. */
const validateRegistry = (registry, base) => {
  const errors = [];
  const owners = new Map();

  Object.entries(registry).forEach(([viewId, entry]) => {
    if (!VIEW_ID_PATTERN.test(viewId)) errors.push(`${REGISTRY_FILE}: key is not a view id: ${viewId}`);

    if (!entry || typeof entry.slug !== 'string') {
      errors.push(`${REGISTRY_FILE}: ${viewId} has no slug`);
      return;
    }

    if (entry.aliases !== undefined && !Array.isArray(entry.aliases)) {
      errors.push(`${REGISTRY_FILE}: ${viewId} aliases must be an array`);
      return;
    }

    entrySlugs(entry).forEach((slug) => {
      if (!SLUG_PATTERN.test(slug)) errors.push(`${REGISTRY_FILE}: ${viewId} has a malformed slug: ${slug}`);

      if (owners.has(slug)) {
        errors.push(`${REGISTRY_FILE}: /templates/${slug} is claimed by both ${owners.get(slug)} and ${viewId}`);
      } else {
        owners.set(slug, viewId);
      }
    });
  });

  Object.entries(base || {}).forEach(([viewId, baseEntry]) => {
    const entry = registry[viewId];

    if (!entry) {
      errors.push(`${REGISTRY_FILE}: entry ${viewId} (/templates/${baseEntry.slug}) was removed; entries are add-only`);
      return;
    }

    const kept = new Set(entrySlugs(entry));

    entrySlugs(baseEntry)
      .filter((slug) => !kept.has(slug))
      .forEach((slug) =>
        errors.push(`${REGISTRY_FILE}: /templates/${slug} was dropped from ${viewId}; keep it as an alias instead`)
      );
  });

  return errors;
};

/**
 * The registry as committed on `ref`, or null when there is no such ref or file — a
 * shallow CI checkout, a Docker build without .git, or the commit that introduces it.
 */
const readRegistryAtRef = (ref) => {
  try {
    const source = execFileSync('git', ['show', `${ref}:${REGISTRY_FILE}`], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    });

    return JSON.parse(source).templates;
  } catch {
    return null;
  }
};

module.exports = {
  REGISTRY_FILE,
  REGISTRY_PATH,
  readRegistry,
  writeRegistry,
  syncRegistry,
  validateRegistry,
  readRegistryAtRef,
};

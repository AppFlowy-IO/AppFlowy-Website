import { templateSlugForViewId } from '@/lib/template-slugs';
import { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';

interface Props {
  params: { id: string; slug: string };
}

/**
 * Legacy `/templates/<category>/<view_id>` URLs.
 *
 * Every template used to be reachable under each of its categories, so one template had
 * as many URLs as it had categories. They all collapse onto the single flat slug, which
 * is what consolidates the link equity that the canonical tag could only hint at.
 *
 * Resolving the redirect here rather than in next.config.js keeps it data-driven: a
 * static redirect list would need a build-time fetch and a redeploy per new template.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

async function Page({ params }: Props) {
  if (process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE === 'phase-production-build') {
    return null;
  }

  let slug: string | null = null;

  try {
    slug = await templateSlugForViewId(params.id);
  } catch (error) {
    console.error(error);
  }

  // An unresolvable id is a template that was unpublished or deleted. Blog posts still
  // link to a few of those, so fall back to the category it used to live under rather
  // than dead-ending the visitor on a 404.
  permanentRedirect(slug ? `/templates/${slug}` : `/templates/${params.slug}`);
}

export const revalidate = 10;

export default Page;

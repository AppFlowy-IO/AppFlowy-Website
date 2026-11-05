import { resolveLegacyTemplateUrl } from '@/lib/template-slugs';
import { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';

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

  // A failed lookup is allowed to throw. A 308 is cached indefinitely by browsers and read
  // as a move by search engines, so it must only ever reflect a successful lookup — falling
  // back to the category on a transient API error would permanently misroute a live template.
  const destination = await resolveLegacyTemplateUrl(params.slug, params.id);

  // Unregistered ids (templates withdrawn before the registry existed) fall back to the
  // category in the URL, since blog posts still link to a few. With no such category
  // there is nothing honest to redirect to.
  if (!destination) notFound();

  permanentRedirect(destination);
}

export const revalidate = 10;

export default Page;

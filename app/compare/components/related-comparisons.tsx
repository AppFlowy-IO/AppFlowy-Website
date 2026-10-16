import Image from 'next/image';
import Link from 'next/link';
import AppFlowyImage from '@/assets/images/vs-notion/appflowy.svg';
import NotionImage from '@/assets/images/vs-notion/notion.svg';
import ConfluenceImage from '@/assets/images/vs-notion/confluence.svg';
import AFFiNEImage from '@/assets/images/vs-notion/affine.svg';
import DocmostImage from '@/assets/images/vs-notion/docmost.svg';
import OutlineImage from '@/assets/images/vs-notion/outline.svg';

// Add new comparison pages here to include them in recommendations.
const comparisons = [
  {
    slug: 'notion-vs-appflowy',
    name: 'Notion',
    coverVariant: 1,
    image: NotionImage,
    description: 'Compare databases, AI, and self-hosting options for your workspace.',
  },
  {
    slug: 'appflowy-vs-confluence',
    name: 'Confluence',
    coverVariant: 2,
    image: ConfluenceImage,
    description: 'Explore two approaches to team wikis, documentation, and collaboration.',
  },
  {
    slug: 'appflowy-vs-affine',
    name: 'AFFiNE',
    coverVariant: 0,
    image: AFFiNEImage,
    description: 'Compare notes, databases, and AI across two open-source workspaces.',
  },
  {
    slug: 'appflowy-vs-docmost',
    name: 'Docmost',
    coverVariant: 0,
    image: DocmostImage,
    description: 'Compare self-hosted workspaces for team wikis and collaborative projects.',
  },
  {
    slug: 'appflowy-vs-outline',
    name: 'Outline',
    coverVariant: 1,
    image: OutlineImage,
    description: 'Explore the differences in documentation, databases, and AI capabilities',
  },
];

// Inverse Figma image-fill transforms, in normalized cover coordinates.
const coverTransforms = [
  'matrix(1.114 0 0 3.03935 -0.0587 -1.01991)',
  'matrix(-1.40617 0 0 -3.8282 1.0565 2.01944)',
  'matrix(0 -4.6293 1.69674 0 -0.5264 2.01944)',
];

export function RelatedComparisons({ currentSlug }: { currentSlug: string }) {
  // Select on the server so the initial HTML contains the links and hydration stays consistent.
  const candidates = comparisons.filter(({ slug }) => slug !== currentSlug);

  for (let i = candidates.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
  }

  return (
    <section
      aria-labelledby='related-comparisons-heading'
      className='relative w-full px-[100px] py-16 max-xl:px-[4vw] max-md:bg-white sm:py-20 lg:py-24'
    >
      <div aria-hidden='true' className='pointer-events-none absolute inset-0 -z-10 max-md:hidden'>
        <img
          src='/images/compare/glow-purple.svg'
          alt=''
          width={1800}
          height={1800}
          className='absolute left-[-900px] top-[-574px] max-w-none'
        />
        <img
          src='/images/compare/glow-blue.svg'
          alt=''
          width={1200}
          height={1200}
          className='absolute left-1/2 top-[-274px] max-w-none -translate-x-1/2'
        />
        <img
          src='/images/compare/glow-purple.svg'
          alt=''
          width={1800}
          height={1800}
          className='absolute right-[-900px] top-[-574px] max-w-none'
        />
      </div>
      <div className='mx-auto w-full max-w-[1100px]'>
        <h2
          id='related-comparisons-heading'
          className='text-center text-[32px] font-bold leading-10 text-[#140F28] sm:text-[40px] sm:leading-[48px] lg:text-[56px] lg:leading-[68px]'
        >
          Explore more comparisons
        </h2>
        <p className='mt-3 text-center text-base font-normal leading-6 text-[#5A5A5A] sm:text-xl sm:leading-7'>
          See how AppFlowy compares with other tools for your team.
        </p>
        <div className='mt-10 grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3'>
          {candidates.slice(0, 3).map((comparison) => (
            <article key={comparison.slug} className='min-w-0'>
              <Link
                href={`/compare/${comparison.slug}`}
                className='group flex h-full flex-col gap-4 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#854CFF] focus-visible:ring-offset-4'
              >
                <div className='relative isolate flex h-[200px] shrink-0 items-center justify-center gap-4 overflow-hidden rounded-xl px-5'>
                  <svg
                    aria-hidden='true'
                    viewBox='0 0 1 1'
                    preserveAspectRatio='none'
                    className='pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-60'
                  >
                    <image
                      href='/images/compare/card-gradient.png'
                      width='1'
                      height='1'
                      preserveAspectRatio='none'
                      transform={coverTransforms[comparison.coverVariant]}
                    />
                  </svg>
                  <div className='flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-white shadow-[0_0_6px_rgba(181,129,205,0.2)]'>
                    <Image
                      src={AppFlowyImage}
                      alt='AppFlowy'
                      width={36}
                      height={36}
                      className='h-9 w-9 object-contain'
                    />
                  </div>
                  <span className='text-xl font-medium leading-7 text-[#140F28]'>vs</span>
                  <div
                    className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-white ${
                      comparison.name === 'AFFiNE' ? '' : 'shadow-[0_0_6px_rgba(181,129,205,0.2)]'
                    }`}
                  >
                    <Image
                      src={comparison.image}
                      alt={comparison.name}
                      width={36}
                      height={36}
                      className='h-9 w-9 object-contain'
                    />
                  </div>
                </div>
                <div className='flex flex-col gap-2'>
                  <h3 className='text-[20px] font-bold leading-7 text-[#140F28] transition-colors group-hover:text-[#854CFF]'>
                    AppFlowy vs {comparison.name}
                  </h3>
                  <p className='text-base font-normal leading-6 text-[#5A5A5A]'>{comparison.description}</p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export type TopicSectionIconKind = 'resources' | 'templates' | 'articles' | 'topics';

const iconColorStyles: Record<TopicSectionIconKind, string> = {
  resources: 'text-[#F4B400]',
  templates: 'text-[#9327FF]',
  articles: 'text-[#4D72E8]',
  topics: 'text-[#FB006D]',
};

function ResourceIcon() {
  return (
    <svg aria-hidden='true' className='h-8 w-8' fill='none' viewBox='0 0 32 32'>
      <path
        d='M16 3.75L19.65 11.14L27.8 12.33L21.9 18.08L23.29 26.2L16 22.36L8.71 26.2L10.1 18.08L4.2 12.33L12.35 11.14L16 3.75Z'
        stroke='currentColor'
        strokeLinejoin='round'
        strokeWidth='1.7'
      />
    </svg>
  );
}

function TemplateIcon() {
  return (
    <svg aria-hidden='true' className='h-8 w-8' fill='none' viewBox='0 0 32 32'>
      <rect x='4.5' y='5' width='23' height='22' rx='3' stroke='currentColor' strokeWidth='1.7' />
      <path d='M4.5 12.5H27.5M13 12.5V27' stroke='currentColor' strokeWidth='1.7' />
    </svg>
  );
}

function ArticleIcon() {
  return (
    <svg aria-hidden='true' className='h-8 w-8' fill='none' viewBox='0 0 32 32'>
      <rect x='4.5' y='11' width='16' height='17' rx='3' stroke='currentColor' strokeWidth='1.7' />
      <path
        d='M9.5 7.5H21.5C23.16 7.5 24.5 8.84 24.5 10.5V23'
        stroke='currentColor'
        strokeLinecap='round'
        strokeWidth='1.7'
      />
      <path d='M14 4H23.5C25.71 4 27.5 5.79 27.5 8V19' stroke='currentColor' strokeLinecap='round' strokeWidth='1.7' />
    </svg>
  );
}

function TopicsIcon() {
  return (
    <svg aria-hidden='true' className='h-8 w-8' fill='none' viewBox='0 0 32 32'>
      <rect x='4.5' y='4.5' width='9' height='9' rx='2.25' stroke='currentColor' strokeWidth='1.7' />
      <rect x='18.5' y='4.5' width='9' height='9' rx='2.25' stroke='currentColor' strokeWidth='1.7' />
      <rect x='4.5' y='18.5' width='9' height='9' rx='2.25' stroke='currentColor' strokeWidth='1.7' />
      <rect x='18.5' y='18.5' width='9' height='9' rx='2.25' stroke='currentColor' strokeWidth='1.7' />
    </svg>
  );
}

export default function TopicSectionIcon({ kind }: { kind: TopicSectionIconKind }) {
  return (
    <span aria-hidden='true' className={`flex h-8 w-8 shrink-0 items-center justify-center ${iconColorStyles[kind]}`}>
      {kind === 'resources' ? <ResourceIcon /> : null}
      {kind === 'templates' ? <TemplateIcon /> : null}
      {kind === 'articles' ? <ArticleIcon /> : null}
      {kind === 'topics' ? <TopicsIcon /> : null}
    </span>
  );
}

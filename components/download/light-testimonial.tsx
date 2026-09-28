import React from 'react';
import StarFill from '@/components/icons/star-yellow';

type LightTestimonial = {
  quote: string;
  name: string;
  subtitle: string;
};

const testimonials: LightTestimonial[] = [
  {
    quote:
      'Best option for self hosting for projects and organization\n\nBefore we started this we didn’t have a good system for collaboration on projects. Now appflowy solved this. We use it for our international business and project management',
    name: 'casual retired',
    subtitle: 'Reviewed on App Store',
  },
  {
    quote:
      'Wonderful. Allowed us to get rid of both Notion & Trello. The developers are super responsive and the community is great.',
    name: 'Julian Engel',
    subtitle: 'Reviewed on Product Hunt',
  },
  {
    quote:
      'I moved from Notion to AppFlowy, because Notion was very heavy and slow, and appflowy is faster, also appflowy is open source, and the sync between device in realtime.',
    name: 'Rinto Proboresky',
    subtitle: 'Reviewed on Google Play',
  },
];

function LightTestimonialCard({ quote, name, subtitle }: LightTestimonial) {
  return (
    <div className={'light-testimonial-card'}>
      <p className={'light-testimonial-quote'}>{quote}</p>
      <div className={'light-testimonial-meta'}>
        <div className={'light-testimonial-stars'}>
          {Array.from({ length: 5 }).map((_, index) => (
            <StarFill key={index} />
          ))}
        </div>
        <div className={'light-testimonial-author'}>
          <span className={'light-testimonial-name'}>{name}</span>
          <span className={'light-testimonial-divider'} aria-hidden={'true'} />
          <span className={'light-testimonial-source'}>{subtitle}</span>
        </div>
      </div>
    </div>
  );
}

function LightTestimonial() {
  return (
    <div className={'light-testimonial'}>
      <div className={'light-testimonial-stage'}>
        <div className={'light-testimonial-track'}>
          {testimonials.map((testimonial) => (
            <LightTestimonialCard key={testimonial.name} {...testimonial} />
          ))}
        </div>
        <div className={'light-testimonial-fade light-testimonial-fade-left'} />
        <div className={'light-testimonial-fade light-testimonial-fade-right'} />
      </div>
    </div>
  );
}

export default LightTestimonial;

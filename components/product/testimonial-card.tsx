import React from 'react';

const chicagoLogoSrc = '/images/chicago.svg';

export type TestimonialCardProps = {
  quote: string;
  name: string;
  title: string;
  className?: string;
};

export function TestimonialCard({ quote, name, title, className }: TestimonialCardProps) {
  return (
    <div className={className ? `testimonial-card ${className}` : 'testimonial-card'}>
      <div className="testimonial-card__content">
        <div className="testimonial-card__brand">
          <img
            alt="Chicago"
            className="testimonial-card__brand-image"
            src={chicagoLogoSrc}
          />
        </div>
        <p className="testimonial-card__quote">{quote}</p>
      </div>

      <div className="testimonial-card__author">
        <div className="testimonial-card__author-text">
          <p className="testimonial-card__name">{name}</p>
          <p className="testimonial-card__title">{title}</p>
        </div>
      </div>
    </div>
  );
}

export default TestimonialCard;

const sectionTestimonials: TestimonialCardProps[] = [
  {
    quote: "The AI's context-awareness regarding our specific codebase is eerie. It's like having a senior dev sitting right next to me 24/7.",
    name: 'Amara Okafor',
    title: 'Full Stack Developer',
  },
  {
    quote: 'The self-hosted setup was surprisingly painless. It’s rare to find a tool that balances high security with such a smooth developer experience.',
    name: 'Hiroshi Tanaka',
    title: 'Senior DevOps Engineer',
  },
  {
    quote: 'Our product velocity increased by 40% in the first quarter. The team spends less time on boilerplate and more time on core features.',
    name: 'Sarah Jenkins',
    title: 'VP of Product',
  },
  {
    quote: 'Owning our data while leveraging cutting-edge AI is a non-negotiable for us. This platform is the only one that truly delivered on that promise.',
    name: 'David Chen',
    title: 'Chief Information Officer',
  },
  {
    quote: 'Finally, an AI tool that respects our VPC boundaries. We get the power of LLMs without ever compromising our data sovereignty.',
    name: 'Elena Vance',
    title: 'Lead Data Scientist',
  },
  {
    quote: 'It has completely transformed our internal knowledge base. Finding answers in our legacy documentation now takes seconds instead of hours.',
    name: 'Sophie Müller',
    title: 'Head of Innovation',
  },
  {
    quote: 'Passing our latest security audit was much easier because this tool stays within our infrastructure. Total control, no external leaks.',
    name: 'Julian Ricci',
    title: 'Security Architect',
  },
  {
    quote: 'Finally, an AI tool that respects our VPC boundaries. We get the power of LLMs without ever compromising our data sovereignty.',
    name: 'Elena Vance',
    title: 'Lead Data Scientist',
  },
  {
    quote: 'Integrating this workspace changed how we handle PR reviews. What used to be a bottleneck is now a seamless, automated flow.',
    name: 'Marcus Thorne',
    title: 'Engineering Manager',
  },
];

export function TestimonialSection() {
  const topRowTestimonials = sectionTestimonials.slice(0, 4);
  const bottomRowTestimonials = sectionTestimonials.slice(4);

  return (
    <div className="testimonial-section">
      <div className="testimonial-section__inner">
        <h2 className="testimonial-section__title">Teams that ship smarter choose AppFlowy</h2>
        <div className="testimonial-section__stage">
          <div className="testimonial-section__track testimonial-section__track--top">
            {topRowTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={`${testimonial.name}-${index}`}
                {...testimonial}
              />
            ))}
          </div>

          <div className="testimonial-section__track testimonial-section__track--bottom">
            {bottomRowTestimonials.map((testimonial, index) => (
              <TestimonialCard
                key={`${testimonial.name}-${index}`}
                {...testimonial}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

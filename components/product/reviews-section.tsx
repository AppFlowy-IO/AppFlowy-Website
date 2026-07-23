import React from 'react';

const imgDivider = 'https://www.figma.com/api/mcp/asset/5459b393-8189-491b-8e54-c074913b09ea';

const stats = [
  { value: '5m+', label: 'Downloads' },
  { value: '1m+', label: 'Docker Pulls' },
  { value: '70K+', label: 'Github Stars' },
  { value: '10K+', label: 'Community Members' },
];

export default function ReviewsSection() {
  return (
    <section className="reviews-section">
      <div className="reviews-section__inner">
        <h2 className="reviews-section__title">Empowering millions worldwide</h2>

        <div className="reviews-section__metrics">
          <div className="reviews-section__grid">
            {stats.map((item) => (
              <div
                key={item.label}
                className="reviews-section__metric"
              >
                <p className="reviews-section__value">{item.value}</p>
                <p className="reviews-section__label">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="reviews-section__divider">
            <img
              alt=""
              className="reviews-section__divider-image"
              src={imgDivider}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

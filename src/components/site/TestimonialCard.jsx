export default function TestimonialCard({ quote, name, role, rating = 5 }) {
  return (
    <article className="surface-card testimonial-card scroll-reveal">
      <div className="rating-row" aria-label={`${rating} out of 5 stars`}>
        {Array.from({ length: rating }).map((_, index) => (
          <span key={index}>★</span>
        ))}
      </div>
      <p className="testimonial-quote">“{quote}”</p>
      <div className="testimonial-meta">
        <strong>{name}</strong>
        <span>{role}</span>
      </div>
    </article>
  );
}

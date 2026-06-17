export default function FeatureCard({
  icon,
  title,
  description,
  kicker,
  footer,
  className = '',
}) {
  return (
    <article className={`surface-card feature-card scroll-reveal ${className}`.trim()}>
      {kicker ? <span className="card-kicker">{kicker}</span> : null}
      {icon ? <div className="feature-icon">{icon}</div> : null}
      <h3 className="card-title">{title}</h3>
      <p className="card-copy">{description}</p>
      {footer ? <div className="card-footer">{footer}</div> : null}
    </article>
  );
}

export default function PageHero({
  eyebrow,
  title,
  description,
  actions,
  aside,
  centered = false,
}) {
  if (centered && !aside) {
    return (
      <section className="page-hero page-hero-centered">
        <div className="container hero-stack">
          {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
          <h1 className="hero-title">{title}</h1>
          <p className="hero-copy hero-copy-centered">{description}</p>
          {actions ? <div className="hero-actions">{actions}</div> : null}
        </div>
      </section>
    );
  }

  return (
    <section className="page-hero">
      <div className="container hero-layout">
        <div className="hero-stack">
          {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
          <h1 className="hero-title">{title}</h1>
          <p className="hero-copy">{description}</p>
          {actions ? <div className="hero-actions">{actions}</div> : null}
        </div>
        {aside ? <div className="hero-aside">{aside}</div> : null}
      </div>
    </section>
  );
}

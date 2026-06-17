export default function CTASection({ eyebrow, title, description, actions }) {
  return (
    <section className="section section-tight">
      <div className="container">
        <div className="cta-panel scroll-reveal">
          <div className="cta-copy">
            {eyebrow ? <span className="eyebrow eyebrow-on-dark">{eyebrow}</span> : null}
            <h2 className="cta-title">{title}</h2>
            <p className="cta-description">{description}</p>
          </div>
          {actions ? <div className="cta-actions">{actions}</div> : null}
        </div>
      </div>
    </section>
  );
}

export default function CaseStudyCard({
  category,
  title,
  summary,
  metrics,
  stack = [],
  accent,
}) {
  return (
    <article className="surface-card case-study-card scroll-reveal">
      <div className="case-study-header">
        <span className="card-kicker">{category}</span>
        {accent ? <div className="case-study-accent">{accent}</div> : null}
      </div>
      <h3 className="card-title">{title}</h3>
      <p className="card-copy">{summary}</p>
      <div className="metrics-inline">
        {metrics.map((metric) => (
          <span key={metric} className="inline-pill">
            {metric}
          </span>
        ))}
      </div>
      {stack.length ? (
        <div className="stack-row">
          {stack.map((item) => (
            <span key={item} className="stack-pill">
              {item}
            </span>
          ))}
        </div>
      ) : null}
    </article>
  );
}

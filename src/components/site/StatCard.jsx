export default function StatCard({ value, label, detail, target }) {
  return (
    <article className="surface-card stat-card scroll-reveal">
      <span className="stat-value metric-number" {...(target ? { 'data-target': target } : {})}>
        {value}
      </span>
      <span className="stat-label">{label}</span>
      {detail ? <p className="stat-detail">{detail}</p> : null}
    </article>
  );
}

import PageHero from './PageHero';

export default function LegalPage({ eyebrow, title, description, updatedLabel, sections }) {
  return (
    <main>
      <PageHero eyebrow={eyebrow} title={title} description={description} centered />
      <section className="section section-first">
        <div className="container container-narrow">
          <div className="legal-shell scroll-reveal">
            <div className="legal-meta">{updatedLabel}</div>
            <div className="legal-content">
              {sections.map((section) => (
                <section key={section.title} className="legal-section">
                  <h2>{section.title}</h2>
                  <div>{section.body}</div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

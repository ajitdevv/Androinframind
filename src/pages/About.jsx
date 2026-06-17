import { Calendar, Cpu, HeartHandshake, Layers, ShieldAlert } from 'lucide-react';
import CTASection from '@/components/site/CTASection';
import FeatureCard from '@/components/site/FeatureCard';
import PageHero from '@/components/site/PageHero';
import SectionHeading from '@/components/site/SectionHeading';
import { useScrollReveal } from '@/hooks/useGsap';

export default function About() {
  useScrollReveal();

  return (
    <main>
      <PageHero
        eyebrow="Corporate history & values"
        title={<>About AndroInfraMind</>}
        description="We design software systems, cloud foundations, and digital experiences intended to feel reliable, scalable, and professionally delivered."
        centered
      />

      <section className="section section-muted section-first">
        <div className="container container-narrow">
          <SectionHeading
            eyebrow="Our journey"
            title="Our evolution as a technology partner"
            description="Our path is defined by a commitment to technical excellence, senior engineering discipline, and long-term delivery trust."
            align="center"
          />
          <div className="timeline-grid">
            {[
              ['2018', 'Foundation & Core Build', 'Founded in Jaipur with a focus on custom microservices development and high-throughput cloud infrastructure integrations.'],
              ['2021', 'AI & Data Expansion', 'Expanded into predictive analytics, domain-specific AI systems, and secure data-processing workflows.'],
              ['2026', 'Global Enterprise Scaling', 'Serving a broader set of enterprise and growth-stage teams with delivery systems, support, and structure.'],
            ].map(([year, title, description]) => (
              <div key={year} className="timeline-card scroll-reveal">
                <div className="timeline-year">{year}</div>
                <div>
                  <h3 className="card-title">{title}</h3>
                  <p className="card-copy" style={{ marginTop: 10 }}>{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Operational DNA"
            title="The principles behind how we work"
            description="Every line of code we write and every architecture decision we make is guided by three core operational principles."
            align="center"
          />
          <div className="grid-three">
            <FeatureCard icon={<Cpu className="w-6 h-6" />} title="Technical precision" description="Clear engineering standards, disciplined implementation, and a strong focus on stability and maintainability." />
            <FeatureCard icon={<ShieldAlert className="w-6 h-6" />} title="Enterprise security" description="Compliance-aware thinking, secure architecture choices, and delivery processes that respect sensitive environments." />
            <FeatureCard icon={<HeartHandshake className="w-6 h-6" />} title="Long-term commitment" description="Support, refinement, and delivery ownership that extends beyond the initial build milestone." />
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <div className="dual-panel">
            <div className="surface-panel scroll-reveal">
              <SectionHeading
                eyebrow="Our model"
                title="Agile handovers and full IP transfer"
                description="We work in a way that helps clients stay informed and in control of the final product, systems, and assets."
              />
              <p className="card-copy">Upon project completion, source code, design assets, documentation, and infrastructure knowledge can be transferred directly to your organization.</p>
            </div>
            <div className="grid-two">
              <FeatureCard icon={<Layers className="w-6 h-6" />} title="DevOps led" description="Infrastructure, deployment, and environment thinking stay connected to the product itself instead of treated as an afterthought." />
              <FeatureCard icon={<Calendar className="w-6 h-6" />} title="Transparent progress" description="A clearer delivery process with dashboards, sprint visibility, and regular updates that keep stakeholders aligned." />
            </div>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Work with us"
        title="If the fit feels right, let’s talk about the next milestone"
        description="We support greenfield products, systems modernization, and structured digital platform engineering."
      />
    </main>
  );
}

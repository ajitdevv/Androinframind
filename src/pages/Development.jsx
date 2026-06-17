import { ArrowRight, Code, Cpu, Database, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import CTASection from '@/components/site/CTASection';
import FeatureCard from '@/components/site/FeatureCard';
import PageHero from '@/components/site/PageHero';
import SectionHeading from '@/components/site/SectionHeading';
import { useScrollReveal } from '@/hooks/useGsap';

export default function Development() {
  useScrollReveal();

  return (
    <main>
      <PageHero
        eyebrow="Primary focus"
        title={<>Web and app development built for scale</>}
        description="We help teams launch secure, high-performance applications with a clearer foundation for product delivery, architecture, and growth."
        actions={<Link to="/contact" className="site-button site-button-primary">Start development planning</Link>}
        centered
      />

      <section className="section section-muted section-first">
        <div className="container">
          <SectionHeading
            eyebrow="Capabilities"
            title="What we build most often"
            description="We design and deploy modern application frameworks, robust backends, and responsive user experiences."
            align="center"
          />
          <div className="grid-two">
            <FeatureCard icon={<Code className="w-6 h-6" />} title="Full-stack web applications" description="Responsive product experiences with modern front-end systems, scalable backends, and strong Core Web Vitals foundations." />
            <FeatureCard icon={<Database className="w-6 h-6" />} title="Multi-tenant SaaS platforms" description="Subscription products, admin systems, and structured product foundations designed for secure scale." />
            <FeatureCard icon={<ShieldAlert className="w-6 h-6" />} title="Enterprise systems" description="Internal portals, workflow products, and platform modernization work that needs stability and operational clarity." />
            <FeatureCard icon={<Cpu className="w-6 h-6" />} title="Mobile applications" description="Cross-platform and native experiences with an emphasis on speed, usability, and maintainable delivery." />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container container-narrow">
          <SectionHeading
            eyebrow="Methodology"
            title="A development lifecycle that is easy to trust"
            description="Our structured engineering lifecycle is designed to keep development transparent, milestones predictable, and code quality high."
            align="center"
          />
          <div className="timeline-grid">
            {[
              ['01', 'Discovery & architecture', 'We map application dependencies, delivery constraints, and system direction before implementation begins.'],
              ['02', 'Sprints & handovers', 'Work moves in structured iterations with regular visibility, review points, and aligned stakeholders.'],
              ['03', 'QA & compliance', 'Testing, quality control, and reliability checks help ensure launch confidence.'],
              ['04', 'Deployment & support', 'Launch planning, post-release support, and operational stability are included in the delivery mindset.'],
            ].map(([number, title, description]) => (
              <div key={number} className="timeline-card scroll-reveal">
                <div className="timeline-year">{number}</div>
                <div>
                  <h3 className="card-title">{title}</h3>
                  <p className="card-copy" style={{ marginTop: 10 }}>{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <SectionHeading
            eyebrow="Engagement models"
            title="Ways to work together"
            description="Flexible partnership models designed to suit your project scope, team layout, and product development timeline."
            align="center"
          />
          <div className="dual-panel">
            <div className="surface-panel scroll-reveal">
              <span className="eyebrow">Model A</span>
              <h3 className="card-title" style={{ marginTop: 16 }}>Fixed-scope project delivery</h3>
              <p className="card-copy" style={{ marginTop: 12 }}>Ideal for clearly defined MVPs and product milestones where scope, timeline, and deliverables are known upfront.</p>
              <Link to="/contact" className="site-button site-button-secondary" style={{ marginTop: 20 }}>Start discovery <ArrowRight className="w-4 h-4" /></Link>
            </div>
            <div className="surface-panel scroll-reveal stagger-2">
              <span className="eyebrow">Model B</span>
              <h3 className="card-title" style={{ marginTop: 16 }}>Dedicated product team</h3>
              <p className="card-copy" style={{ marginTop: 12 }}>A closer long-term collaboration model for teams that need aligned execution capacity across product, engineering, QA, and support.</p>
              <Link to="/contact" className="site-button site-button-secondary" style={{ marginTop: 20 }}>Integrate team <ArrowRight className="w-4 h-4" /></Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Build with confidence"
        title="If your roadmap is moving, we can help turn it into a stronger product experience"
        description="Talk through your next release, product build, or modernization initiative with the AndroInfraMind team."
      />
    </main>
  );
}

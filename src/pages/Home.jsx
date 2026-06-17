import { useEffect } from 'react';
import gsap from 'gsap';
import { ArrowRight, CheckCircle2, MessageSquare, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import CTASection from '@/components/site/CTASection';
import CaseStudyCard from '@/components/site/CaseStudyCard';
import FeatureCard from '@/components/site/FeatureCard';
import LeadForm from '@/components/site/LeadForm';
import PageHero from '@/components/site/PageHero';
import SectionHeading from '@/components/site/SectionHeading';
import StatCard from '@/components/site/StatCard';
import TestimonialCard from '@/components/site/TestimonialCard';
import { useMetricCounters, useScrollReveal } from '@/hooks/useGsap';

const TESTIMONIALS = [
  { name: 'Rajesh Sharma', role: 'CTO, FinPay Technologies', text: 'AndroInfraMind transformed our legacy systems into a modern, scalable platform. Their team\'s technical depth and communication were exceptional throughout.' },
  { name: 'Sarah Mitchell', role: 'VP Engineering, MediTrack Health', text: 'We needed an AI solution that actually worked in production. AndroInfraMind delivered a predictive analytics engine that reduced our operational costs by 30%.' },
  { name: 'Emily Chen', role: 'Head of Digital, SwiftCart', text: 'Their engineering depth doubled our platform capability while supporting a faster, cleaner customer journey.' },
  { name: 'David Hall', role: 'Director of Product, LearnHub', text: 'AndroInfraMind delivered an exceptional learning platform under budget. Live classes and interactive learning tools scaled flawlessly to thousands of concurrent users.' },
  { name: 'Marcus Vance', role: 'Managing Partner, Apex Digital Agency', text: 'We partnered with AndroInfraMind for white-label development support. Their staff augmentation model integrated seamlessly into our workflows, delivering high-performance projects on time and under budget.' },
  { name: 'Elena Rostova', role: 'CTO, CoreSaaS Analytics', text: 'Their expertise in microservices and database clustering helped us launch our platform with zero downtime. Exceptional engineering partners.' },
];

export default function Home() {
  useScrollReveal();
  useMetricCounters();

  useEffect(() => {
    gsap.fromTo('.chart-line', 
      { width: '0%' }, 
      { 
        width: (index) => index === 0 ? '100%' : index === 1 ? '78%' : '64%', 
        duration: 1.2, 
        stagger: 0.15, 
        ease: 'power2.out',
        delay: 0.5 
      }
    );

    gsap.fromTo('.hero-title span',
      { 
        scale: 0.75,
        rotate: -3,
        backgroundPosition: '0% center',
      },
      {
        scale: 1,
        rotate: 0,
        backgroundPosition: '100% center',
        duration: 1.5,
        delay: 0.35,
        ease: 'elastic.out(1, 0.6)',
      }
    );
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Enterprise software partner"
        title={<>Build Smarter. <br />
        Scale <span>Faster.</span></>}
        description="Your strategic technology partner for custom software, AI/ML solutions, cloud infrastructure, and digital transformation. We turn complex challenges into elegant, scalable systems."
        actions={
          <>
            <Link to="/contact" className="site-button site-button-primary">
              Start your project <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/services" className="site-button site-button-secondary">
              Explore services
            </Link>
          </>
        }
        aside={
          <div className="hero-visual scroll-reveal stagger-2">
            <div className="dashboard-frame">
              <div className="dashboard-topbar">
                <div>
                  <span className="dashboard-label">Delivery snapshot</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                    <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', backgroundColor: '#10b981', boxShadow: '0 0 8px #10b981', animation: 'pulse 2s infinite' }} />
                    <strong>Operational Growth Dashboard</strong>
                  </div>
                </div>
                <span className="dashboard-pill">24% Faster</span>
              </div>
              <div className="dashboard-grid">
                <div className="dashboard-metric">
                  <span>Projects delivered</span>
                  <strong>125+</strong>
                </div>
                <div className="dashboard-metric">
                  <span>Retention rate</span>
                  <strong>98%</strong>
                </div>
              </div>
              <div className="dashboard-chart">
                <span className="dashboard-label">Performance trend</span>
                <div className="chart-lines">
                  <div className="chart-line" />
                  <div className="chart-line line-two" />
                  <div className="chart-line line-three" />
                </div>
              </div>
            </div>
          </div>
        }
      />

      <section className="section section-first">
        <div className="container">
          <div className="hero-proof scroll-reveal">
            <span className="proof-pill">On-time delivery</span>
            <span className="proof-pill">Flexible engagement</span>
            <span className="proof-pill">NDA protected</span>
            <span className="proof-pill">24/7 support</span>
          </div>
        </div>
      </section>

      <div className="marquee-container">
        <div className="marquee-track">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="marquee-group">
              {['AI & Machine Learning', 'Cloud Infrastructure', 'Web Applications', 'Mobile Development', 'Digital Strategy', 'Enterprise Systems'].map((item) => (
                <div key={item} className="marquee-item">
                  <span className="marquee-separator">◆</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Core capabilities"
            title="A clean, senior-led team for product, platform, and scale work"
            description="We build modern applications and connected systems that feel dependable to your users and maintainable for your team."
            align="center"
          />
          <div className="grid-three">
            <FeatureCard
              icon={<CheckCircle2 className="w-6 h-6" />}
              title="Custom software engineering"
              description="Robust product architecture, web applications, multi-tenant SaaS systems, and secure backend foundations built for long-term scale."
              footer={<Link to="/services" className="site-button site-button-secondary site-button-sm">Learn more</Link>}
            />
            <FeatureCard
              icon={<ShieldCheck className="w-6 h-6" />}
              title="AI, cloud, and data systems"
              description="Production-focused AI pipelines, cloud infrastructure, and analytics layers designed to integrate cleanly into real business workflows."
              footer={<Link to="/services" className="site-button site-button-secondary site-button-sm">View stacks</Link>}
            />
            <FeatureCard
              icon={<MessageSquare className="w-6 h-6" />}
              title="Strategic delivery partnership"
              description="Senior communication, structured delivery, and implementation discipline that helps founders and enterprise teams move faster with less noise."
              footer={<Link to="/about" className="site-button site-button-secondary site-button-sm">Why AndroInfraMind</Link>}
            />
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <SectionHeading
            eyebrow="Selected outcomes"
            title="Proven track record of digital delivery"
            description="Our achievements speak for themselves. We deliver projects on time, on budget, and built to withstand high demands."
            align="center"
          />
          <div className="stats-grid">
            <StatCard value="0+" target={125} label="Projects delivered" detail="Across software, AI, and digital platform engagements." />
            <StatCard value="0%" target={98} label="Client retention" detail="Built on strong delivery discipline and clear communication." />
            <StatCard value="0+" target={75} label="Expert engineers" detail="Senior practitioners across architecture, design, and delivery." />
            <StatCard value="0+" target={18} label="Industries served" detail="Including fintech, healthcare, education, retail, and logistics." />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Case studies"
            title="Real-world results and engineering execution"
            description="Explore some of our recently delivered software solutions, showcasing technical execution, robust architecture, and real business outcomes."
            align="center"
          />
          <div className="grid-two">
            <CaseStudyCard
              category="Fintech"
              title="FinPay — Digital Banking Platform"
              summary="Built a full-stack digital banking platform with real-time payments, KYC automation, and fraud detection — processing 100K+ transactions monthly."
              metrics={['3x faster onboarding', '99.99% uptime', '40% fraud reduction']}
              stack={['React', 'Node.js', 'AWS', 'ML']}
              accent="💳"
            />
            <CaseStudyCard
              category="Healthcare"
              title="MediTrack — Healthcare Analytics"
              summary="Developed an AI-powered patient analytics platform for a hospital network, enabling predictive health monitoring and automated reporting."
              metrics={['60% faster diagnostics', 'HIPAA compliant', '200K patients served']}
              stack={['Python', 'TensorFlow', 'React', 'GCP']}
              accent="🏥"
            />
          </div>
          <div className="scroll-reveal" style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
            <Link to="/projects" className="site-button site-button-secondary">
              View all case studies <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
      <section className="section section-muted">
        <div className="container">
          <SectionHeading
            eyebrow="Methodology"
            title="A Proven Process for Delivering Results"
            description="Our battle-tested methodology ensures every project moves from concept to production with clarity, speed, and quality."
            align="center"
          />
          <div className="grid-three">
            {[
              {
                step: '01',
                title: 'Discovery & Strategy',
                text: 'We start by understanding your business, users, and objectives. Through workshops and research, we define the right technology strategy and project roadmap.',
              },
              {
                step: '02',
                title: 'Architecture & Design',
                text: 'Our architects design scalable system blueprints while our UX team crafts intuitive interfaces — ensuring technical excellence meets exceptional usability.',
              },
              {
                step: '03',
                title: 'Agile Development',
                text: 'We build in iterative sprints with continuous integration, transparent progress tracking, and regular demos — so you see results early and often.',
              },
              {
                step: '04',
                title: 'Testing & QA',
                text: 'Rigorous automated and manual testing across devices, browsers, and edge cases ensures your product is rock-solid before it reaches users.',
              },
              {
                step: '05',
                title: 'Deployment & Launch',
                text: 'We handle production deployment with zero-downtime strategies, performance optimization, and infrastructure hardening for a smooth launch.',
              },
              {
                step: '06',
                title: 'Support & Evolution',
                text: 'Post-launch, we provide proactive monitoring, maintenance, and iterative enhancements to keep your product ahead of the curve.',
              },
            ].map(({ step, title, text }) => (
              <div key={step} className="surface-card process-card scroll-reveal">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent-strong)' }}>
                    Step {step}
                  </span>
                  <span style={{ fontSize: '2.5rem', fontWeight: 300, fontFamily: 'Georgia, serif', color: 'var(--text-muted)', opacity: 0.15, lineHeight: 1 }}>
                    {step}
                  </span>
                </div>
                <h3 className="card-title" style={{ marginTop: 0 }}>{title}</h3>
                <p className="card-copy" style={{ marginTop: 8, fontSize: '0.94rem', lineHeight: 1.6 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Client perspective"
            title="What our partners say about us"
            description="Hear from tech founders, engineering VPs, and product leaders who have integrated AndroInfraMind into their development workflows."
            align="center"
          />
          <div className="testimonial-grid">
            {TESTIMONIALS.map((testimonial) => (
              <TestimonialCard key={testimonial.name} quote={testimonial.text} name={testimonial.name} role={testimonial.role} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Ready to talk?"
        title="Bring structure, polish, and confidence to your next build"
        description="Whether you are modernizing a platform, launching a new product, or tightening an existing digital experience, we can help map the next step."
        actions={
          <>
            <Link to="/contact" className="site-button site-button-secondary">
              Contact us
            </Link>
            <a href="https://wa.me/919783223676" target="_blank" rel="noreferrer" className="site-button site-button-ghost">
              Chat on WhatsApp
            </a>
          </>
        }
      />

      <section className="section section-muted" id="contact-cta">
        <div className="container contact-layout">
          <div className="contact-side">
            <SectionHeading
              eyebrow="Get in touch"
              title="Start with a focused project conversation"
              description="Share the scope, goals, and context. We’ll follow up with a structured response and next-step recommendation."
            />
            <div className="contact-points">
              <div className="contact-point scroll-reveal">
                <div className="contact-icon">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <strong>Fast response</strong>
                  <p className="contact-side-note">We aim to respond within 24 hours for qualified inbound inquiries.</p>
                </div>
              </div>
              <div className="contact-point scroll-reveal">
                <div className="contact-icon">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <strong>Confidential by default</strong>
                  <p className="contact-side-note">We can provide a mutual NDA before reviewing sensitive technical details.</p>
                </div>
              </div>
            </div>
          </div>
          <LeadForm />
        </div>
      </section>
    </>
  );
}

import { CheckCircle2, Megaphone, PenTool, Search, Share2, Target, Video } from 'lucide-react';
import { Link } from 'react-router-dom';
import CTASection from '@/components/site/CTASection';
import FeatureCard from '@/components/site/FeatureCard';
import PageHero from '@/components/site/PageHero';
import SectionHeading from '@/components/site/SectionHeading';
import { useScrollReveal } from '@/hooks/useGsap';

const MARKETING_SERVICES = [
  {
    icon: <Megaphone className="w-6 h-6" />,
    title: 'Brand Strategy & Positioning',
    desc: 'Define your brand voice, market positioning, target personas, and execution roadmaps designed to stand out in crowded markets.',
  },
  {
    icon: <PenTool className="w-6 h-6" />,
    title: 'High-Impact Content Creation',
    desc: 'Engaging B2B/B2C copy, technical whitepapers, blog articles, scripts, and infographics crafted to engage your audience and build authority.',
  },
  {
    icon: <Video className="w-6 h-6" />,
    title: 'Video Production & Creative Assets',
    desc: 'From short-form social reels to professional brand videos and motion graphics that communicate complex products with simplicity.',
  },
  {
    icon: <Search className="w-6 h-6" />,
    title: 'Search Engine Optimization (SEO)',
    desc: 'In-depth keyword research, technical SEO optimization, and authority-building content campaigns that rank organically on search engines.',
  },
  {
    icon: <Share2 className="w-6 h-6" />,
    title: 'Social Media Management',
    desc: 'Structured social execution across LinkedIn, X/Twitter, Instagram, and YouTube. We handle scheduling, copywriting, and engagement.',
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: 'Performance Marketing',
    desc: 'Result-oriented paid ad campaigns (Google Ads, Meta Ads, LinkedIn Ads) with custom landing pages and attribution tracking.',
  },
];

const MARKETING_FAQS = [
  {
    q: 'Can you write complex technical content for tech/B2B products?',
    a: 'Yes. Our writing team has strong technical backgrounds. We specialize in explaining SaaS platforms, cloud infrastructures, fintech solutions, and developer tools in clear, compelling ways.',
  },
  {
    q: 'How do you measure marketing campaign success?',
    a: 'We align on key performance indicators (KPIs) before launching, focusing on metrics that drive business growth—such as organic search traffic, cost per lead, email signups, and customer acquisition cost (CAC).',
  },
  {
    q: 'Do you manage campaigns or just create the content?',
    a: 'We offer full-service support. We define the strategy, write and design the assets, distribute them across platforms, run the paid channels, and provide monthly analytics reports.',
  },
  {
    q: 'How long does it take to see results from SEO?',
    a: 'SEO is a compounding growth engine. While technical errors can be resolved quickly for minor immediate lifts, ranking for competitive terms typically takes 3 to 6 months of consistent, high-quality content production and optimization.',
  },
];

export default function Marketing() {
  useScrollReveal();

  return (
    <main>
      <PageHero
        eyebrow="Creative & growth partnership"
        title={<>Strategic content & marketing designed to scale your brand</>}
        description="We combine deep technical understanding with creative design to produce high-performing content, organic SEO strategies, social media presence, and growth marketing campaigns."
        centered
      />

      <section className="section section-muted section-first">
        <div className="container">
          <SectionHeading
            eyebrow="Growth lines"
            title="Comprehensive marketing & content capabilities"
            description="From brand narratives to technical SEO and production-grade creatives, we build custom marketing programs that drive real business results."
            align="center"
          />
          <div className="grid-three">
            {MARKETING_SERVICES.map((service) => (
              <FeatureCard key={service.title} icon={service.icon} title={service.title} description={service.desc} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Execution"
            title="A structured approach to content and campaigns"
            description="Our marketing and creative pipelines leverage strict research, high quality standards, and consistent schedules to deliver predictable output."
            align="center"
          />
          <div className="dual-panel">
            <div className="surface-panel scroll-reveal">
              <h3 className="card-title">What we focus on producing</h3>
              <div className="info-list" style={{ marginTop: 18 }}>
                {[
                  'SEO-driven pillar pages and technical blog content.',
                  'Polished social media scripts, threads, and high-engagement visuals.',
                  'Professional video mockups, product walk-throughs, and tutorials.',
                  'Conversion-optimized landing pages and search/social ad copy.',
                ].map((item) => (
                  <div key={item} className="contact-point">
                    <div className="contact-icon"><CheckCircle2 className="w-5 h-5" /></div>
                    <p className="card-copy">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="surface-panel scroll-reveal stagger-2">
              <h3 className="card-title">How we optimize the results</h3>
              <div className="info-list" style={{ marginTop: 18 }}>
                {[
                  'Deep-dive competitor audits and technical SEO structural tuning.',
                  'Continuous landing page UX adjustments and A/B test setups.',
                  'Ad budget attribution checks and ROI mapping analytics.',
                  'Weekly and monthly reports containing actionable optimization advice.',
                ].map((item) => (
                  <div key={item} className="contact-point">
                    <div className="contact-icon"><CheckCircle2 className="w-5 h-5" /></div>
                    <p className="card-copy">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container container-narrow">
          <SectionHeading eyebrow="FAQ" title="Common questions" description="Understanding our engagement models for content and growth campaigns." align="center" />
          <div className="timeline-grid">
            {MARKETING_FAQS.map((faq) => (
              <div key={faq.q} className="surface-card scroll-reveal">
                <h3 className="card-title">{faq.q}</h3>
                <p className="card-copy" style={{ marginTop: 12 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Start your campaign"
        title="Ready to elevate your brand voice and drive pipeline?"
        description="Contact our team to get a detailed marketing audit or request a custom content production outline for your business."
        actions={<Link to="/contact" className="site-button site-button-secondary">Start a conversation</Link>}
      />
    </main>
  );
}

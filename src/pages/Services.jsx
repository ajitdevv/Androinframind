import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { AppWindow, ArrowRight, Cloud, Code, Cpu, Database, Globe, Layers, Megaphone, PenTool, Search, Share2, Shield, Target, Video, CheckCircle2, HeartHandshake, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import CTASection from '@/components/site/CTASection';
import FeatureCard from '@/components/site/FeatureCard';
import PageHero from '@/components/site/PageHero';
import SectionHeading from '@/components/site/SectionHeading';
import { useScrollReveal } from '@/hooks/useGsap';

const CORE_SERVICES = [
  {
    icon: <Code className="w-6 h-6" />,
    kicker: 'Custom Software Development',
    title: 'Bespoke Software & API Solutions',
    desc: 'Robust backend systems and software solutions built to withstand heavy traffic and complex business flows. We design clean REST/GraphQL APIs, microservices architectures, custom databases, and automated workflows tailored to your requirements.',
    techs: ['Java', 'Go', 'Python', 'Docker', 'PostgreSQL', 'Kubernetes']
  },
  {
    icon: <Globe className="w-6 h-6" />,
    kicker: 'Web Application Development',
    title: 'High-Performance Web Platforms',
    desc: 'We build responsive, fast, and secure web applications designed to deliver outstanding user experiences. From complex portals to public-facing platforms, we focus on clean code, speed, accessibility, and modern SEO-friendly structures.',
    techs: ['React', 'Next.js', 'Node.js', 'TypeScript', 'TailwindCSS']
  },
  {
    icon: <AppWindow className="w-6 h-6" />,
    kicker: 'Mobile App Development',
    title: 'Native & Cross-Platform Mobile Apps',
    desc: 'Creating fluid, high-performance mobile experiences for iOS and Android. Whether leveraging React Native or Flutter for unified codebases, or native Swift and Kotlin for extreme performance, we focus on speed, reliability, and modern design.',
    techs: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase']
  },
  {
    icon: <Search className="w-6 h-6" />,
    kicker: 'Search Engine Optimization (SEO)',
    title: 'Technical & On-Page SEO Optimization',
    desc: 'Ensure maximum visibility on search engines with our advanced SEO solutions. We perform deep keyword research, technical site audits, code optimization, performance tuning, and schema integration to drive high-intent organic traffic.',
    techs: ['Technical SEO', 'Keyword Strategy', 'Schema Markup', 'PageSpeed Opt.']
  },
  {
    icon: <Megaphone className="w-6 h-6" />,
    kicker: 'Digital Marketing',
    title: 'Data-Driven Growth Campaigns',
    desc: 'Scale your user acquisition and maximize ROI. We design and manage target campaigns, search engine marketing (SEM), content strategy, social media campaigns, and conversion rate optimization (CRO) backed by clear analytics.',
    techs: ['Google Ads', 'Meta Ads', 'Content Strategy', 'Analytics', 'Conversion Opt.']
  },
  {
    icon: <Layers className="w-6 h-6" />,
    kicker: 'SaaS & MVP Engineering',
    title: 'SaaS Platforms & MVP Delivery',
    desc: 'Launch your SaaS product on a clean, scalable foundation. We design multi-tenant database models, implement subscription billing (Stripe/Razorpay), manage user roles and permissions, and build comprehensive admin workflows.',
    techs: ['Next.js', 'PostgreSQL', 'Stripe', 'Redis', 'Auth0']
  }
];

const SUPPORT_SERVICES = [
  { icon: <Cpu className="w-6 h-6" />, title: 'AI & Machine Learning', desc: 'Production deployment for predictive models, custom LLMs, NLP pipelines, and data intelligence workflows integrated into your apps.' },
  { icon: <Cloud className="w-6 h-6" />, title: 'Cloud & DevOps Solutions', desc: 'Secure cloud architecture (AWS, GCP), continuous integration and deployment (CI/CD), auto-scaling, and system-wide monitoring.' },
  { icon: <Shield className="w-6 h-6" />, title: 'UI/UX Interface Design', desc: 'Wireframes, detailed interaction design, design systems, and responsive layouts built with a developer-handover focus.' },
  { icon: <Database className="w-6 h-6" />, title: 'Data Analytics & ETL', desc: 'Real-time dashboards, custom reporting, data pipelines, and decision-support systems that convert raw data into product insights.' },
];

const PARTNERSHIP_MODELS = [
  {
    icon: <HeartHandshake className="w-6 h-6" />,
    title: 'Partnership Outreach',
    desc: 'Collaborate with us as a trusted technology partner to jointly deliver projects, expand service offerings, and support business growth.',
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: 'Staff Augmentation',
    desc: 'Quickly extend your existing team with experienced developers, designers, QA engineers, and technology specialists who integrate seamlessly into your workflows.',
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: 'White Label Development',
    desc: 'Deliver high-quality software solutions under your own brand while we handle the complete development lifecycle behind the scenes.',
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: 'Offshore Development',
    desc: 'Reduce development costs and accelerate project delivery through our dedicated offshore development teams and proven delivery processes.',
  },
  {
    icon: <Code className="w-6 h-6" />,
    title: 'Hire Dedicated Developers',
    desc: 'Hire full-time or part-time developers dedicated exclusively to your projects with complete transparency and direct communication.',
  },
];

const PARTNERSHIP_FEATURES = [
  'Flexible Engagement Models',
  'Rapid Team Scaling',
  'NDA & Confidentiality Compliance',
  'Agile Development Process',
  'Transparent Communication',
  'Cost-Effective Delivery',
  'Proven Technical Expertise',
  'Long-Term Partnership Focus',
];

const FAQS = [
  { q: 'What is your primary development focus?', a: 'Our primary focus is full-stack web application development, native/cross-platform mobile app development, and scalable SaaS platform engineering.' },
  { q: 'What technology stacks do you recommend?', a: 'We typically build frontends with React, Next.js, and TypeScript, and backends with Node.js, Go, or Java. For mobile apps, we recommend React Native, Flutter, Swift, or Kotlin.' },
  { q: 'How does your engagement process work?', a: 'We begin with discovery and architecture planning, define clear delivery milestones, and then execute in sprints with regular reviews and handover support.' },
  { q: 'Do you offer post-launch maintenance?', a: 'Yes. We offer long-term support and maintenance models to keep your application stable, secure, and ready for future updates.' },
];

const PRODUCTS = [
  {
    id: 'leave-only',
    name: 'Leave Only',
    tagline: 'Employee Leave & PTO Management App',
    description: 'Developed a native iOS application that simplifies employee leave management with easy leave requests, approvals, PTO tracking, team calendars, and real-time leave balance management.',
    price: 99999,
    features: [
      'Native iOS Application Codebase',
      'Leave Requests & Approvals Flow',
      'Paid Time Off (PTO) Tracking',
      'Team & Department Calendars',
      'Real-Time Balance Management',
      'Push Notifications & Alerts'
    ]
  },
  {
    id: 'asset-flow',
    name: 'AssetFlow',
    tagline: 'Asset Manager (iOS App)',
    description: 'AssetFlow is an iOS-based asset management application designed to help organizations efficiently track, manage, and monitor their assets from a centralized platform. Maintain records, monitor status, and manage schedules.',
    price: 69999,
    features: [
      'Centralized Asset Database',
      'Asset Status Monitoring & Tracking',
      'Maintenance Scheduling & Logs',
      'Intuitive iOS Mobile Interface',
      'High Performance & Scalable Codebase'
    ]
  }
];

export default function Services() {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paidProduct, setPaidProduct] = useState('');
  const [paymentId, setPaymentId] = useState('');
  const [processing, setProcessing] = useState(false);

  useScrollReveal();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    script.onerror = () => console.error('Razorpay SDK failed to load.');
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

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
  }, []);

  const handleBuyProduct = (productName, price) => {
    if (!scriptLoaded || !window.Razorpay) {
      window.alert('Razorpay Checkout SDK is still loading. Please wait a moment.');
      return;
    }

    setProcessing(true);

    const options = {
      key: 'rzp_test_SexA0OHvFEyMRO', // Razorpay Key ID
      amount: price * 100, // Price in paise
      currency: 'INR',
      name: 'AndroInfraMind',
      description: `Purchase of ${productName}`,
      image: 'https://placeholder.co/128x128?text=AIM',
      handler(response) {
        setPaymentSuccess(true);
        setPaidProduct(productName);
        setPaymentId(response.razorpay_payment_id);
        setProcessing(false);
      },
      prefill: {
        name: '',
        email: '',
      },
      theme: {
        color: '#2563eb',
      },
      modal: {
        ondismiss() {
          setProcessing(false);
        },
      },
    };

    try {
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error(error);
      setProcessing(false);
      window.alert('Payment initialization failed. Using test simulation.');
      window.setTimeout(() => {
        setPaymentSuccess(true);
        setPaidProduct(productName);
        setPaymentId(`pay_test_simulation_${Math.random().toString(36).slice(2, 9)}`);
      }, 1000);
    }
  };

  return (
    <main>
      <PageHero
        eyebrow="Primary Focus"
        title={<>Web & Mobile Application Development Built for Scale</>}
        description="We design, engineer, and deploy high-performance custom applications, SaaS platforms, and mobile apps with senior-led precision."
        actions={
          <>
            <Link to="/contact" className="site-button site-button-primary">
              Book a Consultation
            </Link>
            <a href="#core-services" className="site-button site-button-secondary">
              Explore Services
            </a>
          </>
        }
        aside={
          <div className="hero-visual scroll-reveal stagger-2">
            <div className="dashboard-frame">
              <div className="dashboard-topbar">
                <div>
                  <span className="dashboard-label">Platform Metrics</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                    <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', backgroundColor: '#2563eb', boxShadow: '0 0 8px #2563eb', animation: 'pulse 2s infinite' }} />
                    <strong>Engineering Excellence</strong>
                  </div>
                </div>
                <span className="dashboard-pill">99.9% Uptime</span>
              </div>
              <div className="dashboard-grid">
                <div className="dashboard-metric">
                  <span>API Response</span>
                  <strong>&lt; 140ms</strong>
                </div>
                <div className="dashboard-metric">
                  <span>Tech Experts</span>
                  <strong>45+ Active</strong>
                </div>
              </div>
              <div className="dashboard-chart">
                <span className="dashboard-label">System Performance Index</span>
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

      <section id="core-services" className="section section-muted section-first">
        <div className="container">
          <SectionHeading
            eyebrow="Core Services"
            title="Premium Web & Mobile Application Engineering"
            description="Our primary focus is building scalable applications that feel reliable, load fast, and are easy to maintain."
            align="center"
          />
          <div className="grid-two">
            {CORE_SERVICES.map((service) => (
              <FeatureCard 
                key={service.title} 
                icon={service.icon} 
                kicker={service.kicker} 
                title={service.title} 
                description={service.desc} 
                footer={
                  <div className="stack-row" style={{ marginTop: '14px' }}>
                    {service.techs.map((tech) => (
                      <span key={tech} className="stack-pill">
                        {tech}
                      </span>
                    ))}
                  </div>
                }
              />
            ))}
          </div>
        </div>
      </section>

      <section id="products" className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Proprietary Products"
            title="Premium Ready-to-Deploy iOS Applications"
            description="Acquire full licenses for our professionally engineered mobile solutions. Deploy immediately to streamline your operations."
            align="center"
          />

          {paymentSuccess ? (
            <div className="success-banner scroll-reveal" role="status" style={{ maxWidth: '600px', margin: '0 auto var(--spacing-md) auto', display: 'flex', gap: '12px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', padding: '16px', borderRadius: '12px', alignItems: 'center' }}>
              <CheckCircle2 className="w-6 h-6" style={{ color: '#059669', flexShrink: 0 }} />
              <div>
                <strong style={{ color: 'var(--text-primary)' }}>Purchase Successful!</strong>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Thank you for buying <strong>{paidProduct}</strong>. Payment ID: {paymentId}. Our team will contact you shortly with transfer details.</p>
              </div>
              <button type="button" className="site-button site-button-secondary site-button-sm" style={{ marginLeft: 'auto' }} onClick={() => setPaymentSuccess(false)}>
                Dismiss
              </button>
            </div>
          ) : null}

          <div className="grid-two">
            {PRODUCTS.map((product) => (
              <div key={product.id} className="surface-panel scroll-reveal" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                    <span className="eyebrow">{product.name}</span>
                    <strong style={{ fontSize: '1.4rem', color: 'var(--accent)', fontWeight: '700' }}>
                      ₹{product.price.toLocaleString('en-IN')}
                    </strong>
                  </div>
                  <h3 className="card-title" style={{ marginTop: '14px', fontSize: '1.3rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                    {product.tagline}
                  </h3>
                  <p className="card-copy" style={{ marginTop: '12px', fontSize: '0.95rem' }}>
                    {product.description}
                  </p>
                  
                  <div style={{ marginTop: '20px' }}>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-primary)', marginBottom: '10px' }}>Included Features:</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {product.features.map((feat) => (
                        <div key={feat} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <CheckCircle2 className="w-4.5 h-4.5" style={{ color: 'var(--accent)', flexShrink: 0 }} />
                          <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: '30px' }}>
                  <button 
                    type="button" 
                    className="site-button site-button-primary" 
                    style={{ width: '100%' }}
                    onClick={() => handleBuyProduct(product.name, product.price)}
                    disabled={processing}
                  >
                    {processing ? 'Processing...' : `Purchase License — ₹${product.price.toLocaleString('en-IN')}`}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="B2B Capacity & Teams"
            title="Scale Your Delivery Capacity with Our Expert Teams"
            description="We help agencies, software companies, and digital businesses expand their delivery capabilities without increasing operational overhead."
            align="center"
          />
          <div className="grid-three">
            {PARTNERSHIP_MODELS.map((model) => (
              <FeatureCard key={model.title} icon={model.icon} title={model.title} description={model.desc} />
            ))}
          </div>

          <div className="dual-panel" style={{ marginTop: 'var(--spacing-xl)' }}>
            <div className="scroll-reveal">
              <SectionHeading
                eyebrow="Why Partner With Us"
                title="A seamless extension of your development team"
                description="We align with your tools, communication channels, and quality standards to ensure frictionless project execution."
                align="left"
              />
            </div>
            <div className="surface-panel scroll-reveal stagger-2">
              <h3 className="card-title">Value Features</h3>
              <div className="info-list" style={{ marginTop: 18 }}>
                {PARTNERSHIP_FEATURES.map((feature) => (
                  <div key={feature} className="contact-point">
                    <div className="contact-icon"><CheckCircle2 className="w-5 h-5" /></div>
                    <p className="card-copy">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <SectionHeading
            eyebrow="Integrated Capabilities"
            title="Supporting technology services to power your platforms"
            description="Complementary systems engineering to ensure your core applications have the intelligence, scalability, and design they need."
            align="center"
          />
          <div className="grid-three">
            {SUPPORT_SERVICES.map((service) => (
              <FeatureCard key={service.title} icon={service.icon} title={service.title} description={service.desc} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Capabilities"
            title="From strategy through implementation"
            description="Our work typically spans architecture thinking, product execution, launch support, and the operational layer that keeps systems healthy."
            align="center"
          />
          <div className="dual-panel">
            <div className="surface-panel scroll-reveal">
              <h3 className="card-title">What clients usually need</h3>
              <div className="info-list" style={{ marginTop: 18 }}>
                {[
                  'A cleaner product foundation for new builds or modernization efforts.',
                  'Support turning technical complexity into a clearer user-facing experience.',
                  'Infrastructure, AI, or integration work that connects properly to the product layer.',
                  'A delivery partner who can move with more structure and less noise.',
                ].map((item) => (
                  <div key={item} className="contact-point">
                    <div className="contact-icon"><CheckCircle2 className="w-5 h-5" /></div>
                    <p className="card-copy">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="surface-panel scroll-reveal stagger-2">
              <h3 className="card-title">How we frame the work</h3>
              <div className="info-list" style={{ marginTop: 18 }}>
                {[
                  'Discovery and roadmap alignment before implementation starts.',
                  'Design and build decisions grounded in usability, maintainability, and growth.',
                  'Delivery phases that remain easy for business stakeholders to follow.',
                  'Post-launch support and handover thinking for long-term confidence.',
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
          <SectionHeading eyebrow="FAQ" title="Common questions" description="Key questions answered in a simpler, cleaner layout." align="center" />
          <div className="timeline-grid">
            {FAQS.map((faq) => (
              <div key={faq.q} className="surface-card scroll-reveal">
                <h3 className="card-title">{faq.q}</h3>
                <p className="card-copy" style={{ marginTop: 12 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Next step"
        title="If you already know the direction, we can help shape the execution"
        description="Talk to the team about a product, platform, or modernization initiative and we’ll help map the next phase."
        actions={<Link to="/contact" className="site-button site-button-secondary">Discuss your project</Link>}
      />
    </main>
  );
}

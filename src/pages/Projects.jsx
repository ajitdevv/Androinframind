import { useState, useEffect } from 'react';
import { CheckSquare, HardDriveUpload, Lock, ShieldCheck, CalendarRange, Database, Sparkles, Gamepad2, CheckCircle2 } from 'lucide-react';
import { fetchProjects } from '@/lib/supabaseClient';
import CTASection from '@/components/site/CTASection';
import CaseStudyCard from '@/components/site/CaseStudyCard';
import FeatureCard from '@/components/site/FeatureCard';
import PageHero from '@/components/site/PageHero';
import SectionHeading from '@/components/site/SectionHeading';
import TestimonialCard from '@/components/site/TestimonialCard';
import { useScrollReveal } from '@/hooks/useGsap';

const STORE_PROJECTS = [
  {
    id: 'leave-only',
    name: 'Leave Only',
    tagline: 'Employee Leave & PTO Management App',
    desc: 'Developed a native iOS application that simplifies employee leave management with easy leave requests, approvals, PTO tracking, team calendars, and real-time leave balance management.',
    icon: <CalendarRange className="w-5 h-5" />,
    iconPath: '/leave only.png',
    badge: 'iOS App',
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
    desc: 'AssetFlow is an iOS-based asset management application designed to help organizations efficiently track, manage, and monitor their assets from a centralized platform. Maintain records, monitor status, and manage schedules.',
    icon: <Database className="w-5 h-5" />,
    iconPath: '/AssetFlow.png',
    badge: 'iOS App',
    features: [
      'Centralized Asset Database',
      'Asset Status Monitoring & Tracking',
      'Maintenance Scheduling & Logs',
      'Intuitive iOS Mobile Interface',
      'High Performance & Scalable Codebase'
    ]
  },
  {
    id: 'ai-visual-editor',
    name: 'AI Visual Editor',
    tagline: 'AI-Powered Visual Content Creation Platform',
    desc: "Developed an intelligent visual editing application that enables users to generate, edit, enhance, and customize graphics using AI-powered tools. The platform streamlines content creation workflows and helps teams produce professional-quality visuals faster. Inspired by Microsoft's AI visual creation capabilities.",
    icon: <Sparkles className="w-5 h-5" />,
    badge: 'Microsoft apps',
    features: [
      'AI Image Generation',
      'Smart Visual Editing Tools',
      'Background Removal & Replacement',
      'Content Enhancement & Optimization',
      'Brand-Aware Design Support',
      'Modern User-Friendly Interface'
    ]
  },
  {
    id: 'xo-arena',
    name: 'XO Arena',
    tagline: 'Multiplayer Strategy Game (iOS App)',
    desc: 'Built an engaging iOS gaming experience that transforms the classic Tic-Tac-Toe concept into a competitive multiplayer arena with advanced gameplay mechanics, intelligent AI opponents, leaderboards, and progression systems.',
    icon: <Gamepad2 className="w-5 h-5" />,
    badge: 'Microsoft games',
    features: [
      'Smart Adaptive AI Opponents',
      'Online & Offline Gameplay',
      'Multiplayer Matchmaking',
      'Achievements & Rankings',
      'Game Statistics & Analytics',
      'Cross-Device Progress Sync',
      'Modern 3D User Experience'
    ]
  }
];

const CASE_STUDIES = [
  {
    category: 'Fintech',
    title: 'FinPay — Digital Banking Platform',
    summary: 'Built a full-stack digital banking platform with real-time payments, KYC automation, and fraud detection — processing 100K+ transactions monthly.',
    metrics: ['3x faster onboarding', '99.99% uptime', '40% fraud reduction'],
    stack: ['React', 'Node.js', 'AWS', 'ML'],
    accent: '💳',
    quote: 'AndroInfraMind transformed our legacy systems into a modern, scalable platform. Their team’s technical depth and communication were exceptional throughout.',
    author: 'Rajesh Sharma, CTO, FinPay Technologies',
  },
  {
    category: 'Healthcare',
    title: 'MediTrack — Healthcare Analytics',
    summary: 'Developed an AI-powered patient analytics platform for a hospital network, enabling predictive health monitoring and automated reporting.',
    metrics: ['60% faster diagnostics', 'HIPAA compliant', '200K patients served'],
    stack: ['Python', 'TensorFlow', 'React', 'GCP'],
    accent: '🏥',
    quote: 'We needed an AI solution that actually worked in production. AndroInfraMind delivered a predictive analytics engine that reduced our operational costs by 30%.',
    author: 'Sarah Mitchell, VP Engineering, MediTrack Health',
  },
  {
    category: 'Retail',
    title: 'SwiftCart — E-Commerce Ecosystem',
    summary: 'Created a scalable multi-vendor marketplace with AI-driven product recommendations, real-time inventory sync, and integrated logistics.',
    metrics: ['35% higher conversion', '2M+ products listed', 'Sub-2s load time'],
    stack: ['Next.js', 'PostgreSQL', 'Redis', 'Stripe'],
    accent: '🛒',
    quote: 'Their digital marketing team doubled our traffic in four months while the engineering team rebuilt our storefront. True end-to-end capability.',
    author: 'Emily Chen, Head of Digital, SwiftCart',
  },
  {
    category: 'Education',
    title: 'LearnHub — EdTech Platform',
    summary: 'Designed and shipped a learning management system with live classes, AI-driven assessments, and personalized learning paths for 50K+ students.',
    metrics: ['50K+ active learners', '4.8★ app rating', '85% completion rate'],
    stack: ['Flutter', 'Firebase', 'Python', 'WebRTC'],
    accent: '🎓',
    quote: 'AndroInfraMind delivered an exceptional learning platform under budget. Live classes and interactive learning tools scaled flawlessly to thousands of concurrent users.',
    author: 'David Hall, Director of Product, LearnHub',
  },
];

const TESTIMONIALS = [
  { name: 'Rajesh Sharma', role: 'CTO, FinPay Technologies', text: 'AndroInfraMind transformed our legacy systems into a modern, scalable platform. Their team\'s technical depth and communication were exceptional throughout.' },
  { name: 'Sarah Mitchell', role: 'VP Engineering, MediTrack Health', text: 'We needed an AI solution that actually worked in production. AndroInfraMind delivered a predictive analytics engine that reduced our operational costs by 30%.' },
  { name: 'Emily Chen', role: 'Head of Digital, SwiftCart', text: 'Their engineering depth doubled our platform capability while supporting a faster, cleaner customer journey.' },
  { name: 'David Hall', role: 'Director of Product, LearnHub', text: 'AndroInfraMind delivered an exceptional learning platform under budget. Live classes and interactive learning tools scaled flawlessly to thousands of concurrent users.' },
  { name: 'Marcus Vance', role: 'Managing Partner, Apex Digital Agency', text: 'We partnered with AndroInfraMind for white-label development support. Their staff augmentation model integrated seamlessly into our workflows, delivering high-performance projects on time and under budget.' },
  { name: 'Elena Rostova', role: 'CTO, CoreSaaS Analytics', text: 'Their expertise in microservices and database clustering helped us launch our platform with zero downtime. Exceptional engineering partners.' },
];

const getProjectIcon = (slug) => {
  const cn = "w-5 h-5";
  if (slug === 'leave-only') return <CalendarRange className={cn} />;
  if (slug === 'asset-flow') return <Database className={cn} />;
  if (slug === 'ai-visual-editor') return <Sparkles className={cn} />;
  if (slug === 'xo-arena') return <Gamepad2 className={cn} />;
  return <Sparkles className={cn} />;
};

export default function Projects() {
  const [expandedCards, setExpandedCards] = useState({});
  const [projectsList, setProjectsList] = useState([]);
  useScrollReveal(projectsList.length);

  useEffect(() => {
    async function loadProjects() {
      const res = await fetchProjects();
      if (res.success && res.data && res.data.length > 0) {
        const mapped = res.data.map(p => ({
          id: p.project_slug,
          name: p.name,
          tagline: p.tagline,
          desc: p.desc_text,
          icon: getProjectIcon(p.project_slug),
          badge: p.badge,
          features: p.features || []
        }));
        setProjectsList(mapped);
      } else {
        setProjectsList(STORE_PROJECTS);
      }
    }
    loadProjects();
  }, []);

  const toggleExpandCard = (id) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <main>
      <PageHero
        eyebrow="Case studies & trust"
        title={<>Selected projects and client safeguards</>}
        description="Explore our portfolio of successfully delivered enterprise software, custom applications, and cloud systems."
        centered
      />

      <section className="section section-first">
        <div className="container">
          <SectionHeading
            eyebrow="Corporate safeguards"
            title="Trust signals presented with more clarity"
            description="We implement rigorous security standards and flexible handover terms to ensure your assets are protected and fully owned by you."
            align="center"
          />
          <div className="grid-four">
            <FeatureCard icon={<ShieldCheck className="w-5 h-5" />} title="ISO 27001 security" description="Secure engineering practices, architecture reviews, and delivery discipline designed for sensitive systems." />
            <FeatureCard icon={<Lock className="w-5 h-5" />} title="GDPR & HIPAA aligned" description="Compliance-conscious workflows, access controls, and safer data handling patterns." />
            <FeatureCard icon={<HardDriveUpload className="w-5 h-5" />} title="Full IP transfer" description="Source code, deployment assets, and project deliverables can be handed over cleanly to your organization." />
            <FeatureCard icon={<CheckSquare className="w-5 h-5" />} title="NDA protected" description="Confidentiality-first collaboration for sensitive business, product, and technical initiatives." />
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <SectionHeading
            eyebrow="iOS App Store Applications"
            title="iOS App Store Applications"
            description="Showcasing native iOS applications developed for workforce management, enterprise asset tracking, AI-powered productivity, and strategy gaming."
            align="center"
          />
          <div className="grid-four" style={{ alignItems: 'start' }}>
            {projectsList.map((project) => {
              const isExpanded = !!expandedCards[project.id];
              return (
                <div 
                  key={project.id} 
                  className="surface-panel scroll-reveal" 
                  style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    justifyContent: 'space-between', 
                    height: 'auto',
                    padding: '20px',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                      {project.iconPath ? (
                        <img src={project.iconPath} alt={project.name} style={{ width: '36px', height: '36px', borderRadius: '6px', objectFit: 'contain', background: '#f1f5f9', border: '1px solid var(--border-soft)', padding: '3px' }} />
                      ) : (
                        <div className="icon-button" style={{ width: '36px', height: '36px', background: 'var(--accent-soft)', border: 'none', color: 'var(--accent)', cursor: 'default' }}>
                          {project.icon}
                        </div>
                      )}
                      <span className="eyebrow" style={{ fontSize: '10px', padding: '3px 8px', background: 'rgba(0, 0, 0, 0.05)', color: 'var(--text-secondary)' }}>
                        {project.badge}
                      </span>
                    </div>
                    
                    <span className="eyebrow" style={{ background: 'transparent', padding: 0, color: 'var(--accent)', fontSize: '11px' }}>
                      {project.name}
                    </span>
                    
                    <h3 className="card-title" style={{ marginTop: '4px', fontSize: '1.05rem', fontWeight: '600', color: 'var(--text-primary)', lineHeight: '1.25' }}>
                      {project.tagline}
                    </h3>
                    
                    {isExpanded && (
                      <div style={{ marginTop: '16px', animation: 'fadeIn 0.3s ease' }}>
                        <p className="card-copy" style={{ marginBottom: '16px', fontSize: '0.9rem', lineHeight: '1.6' }}>
                          {project.desc}
                        </p>
                        <h4 style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-primary)', marginBottom: '8px' }}>Included Features:</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          {project.features.map((feat) => (
                            <div key={feat} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <CheckCircle2 className="w-4 h-4" style={{ color: 'var(--accent)', flexShrink: 0 }} />
                              <span style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div style={{ marginTop: '16px' }}>
                    <button 
                      type="button" 
                      onClick={() => toggleExpandCard(project.id)}
                      className="site-button site-button-secondary site-button-sm"
                      style={{ width: '100%', justifyContent: 'center' }}
                    >
                      {isExpanded ? 'Show Less' : 'View Details'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Representative work"
            title="Project stories, simplified"
            description="A showcase of enterprise products, SaaS platforms, and digital systems we have designed, built, and launched for scaling businesses."
            align="center"
          />
          <div className="grid-three">
            {CASE_STUDIES.map((study) => (
              <CaseStudyCard
                key={study.title}
                category={study.category}
                title={study.title}
                summary={study.summary}
                metrics={study.metrics}
                stack={study.stack}
                accent={study.accent}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-muted">
        <div className="container">
          <SectionHeading
            eyebrow="Client voice"
            title="Contextual proof from project stakeholders"
            description="Hear directly from the technology leaders and business founders who partner with us for their development roadmaps."
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
        eyebrow="Need similar results?"
        title="Use the case studies as a starting point, not the finish line"
        description="If your platform, product, or digital experience needs stronger structure, performance, or trust, we can help define the next phase."
      />
    </main>
  );
}

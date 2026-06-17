import { Calendar, Clock, Search, User } from 'lucide-react';
import { useState } from 'react';
import CTASection from '@/components/site/CTASection';
import PageHero from '@/components/site/PageHero';
import SectionHeading from '@/components/site/SectionHeading';
import { useScrollReveal } from '@/hooks/useGsap';

const BLOG_POSTS = [
  {
    category: 'tech-strategy',
    tag: 'Tech Strategy',
    title: 'Scale Offshore Delivery: Why Software Development Should Be Cost-Effective',
    excerpt: 'An execution guide on setting up a seamless communication process and measuring progress using regular GitHub activity to build a highly cost-effective delivery model.',
    author: 'Amit Sharma',
    date: 'June 12, 2026',
    readTime: '7 min read',
  },
  {
    category: 'custom-software',
    tag: 'Custom Software',
    title: 'Migrating Monoliths to Microservices: A Step-by-Step Blueprint',
    excerpt: 'Explore the architectural challenges, database separations, and deployment playbooks for moving enterprise software to microservices with zero uptime disruption.',
    author: 'Amit Sharma',
    date: 'June 08, 2026',
    readTime: '8 min read',
  },
  {
    category: 'ai-ml',
    tag: 'AI & ML',
    title: 'HIPAA-Compliant AI: Production deployment pipelines guidelines',
    excerpt: 'How to deploy predictive neural networks and computer vision systems inside restricted hospital databases while complying with strict GDPR and HIPAA SLAs.',
    author: 'Dr. Sarah Mitchell',
    date: 'May 24, 2026',
    readTime: '12 min read',
  },
  {
    category: 'cloud-devops',
    tag: 'Cloud & DevOps',
    title: 'Optimizing Cloud Costs: Terraform & Kubernetes Orchestration',
    excerpt: 'Proven tactics to reduce AWS and GCP container billing up to 45% using autoscaling groups, spot instance scheduling, and database connection pooling.',
    author: 'Vikram Singh',
    date: 'April 15, 2026',
    readTime: '6 min read',
  },
  {
    category: 'tech-strategy',
    tag: 'Tech Strategy',
    title: 'The B2B Founders Roadmap to MVP Launch in 2026',
    excerpt: 'CTO guidelines on tech stack selection, supabase databases integrations, stripe multi-tenant billing, and security checklists before going to market.',
    author: 'Rajesh Sharma',
    date: 'March 30, 2026',
    readTime: '10 min read',
  },
];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  useScrollReveal(activeCategory + '_' + searchQuery);

  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main>
      <PageHero
        eyebrow="Engineering resources"
        title={<>A cleaner home for product and engineering insights</>}
        description="Insights, engineering guidelines, and industry perspectives on software architecture, cloud platforms, and product delivery."
        centered
      />

      <section className="section section-muted section-first">
        <div className="container">
          <SectionHeading
            eyebrow="Latest articles"
            title="Featured articles & technical insights"
            description="Explore articles covering system modernization, compliance, cloud scalability, and growth frameworks for B2B founders."
          />

          <div className="dual-panel" style={{ marginBottom: 32 }}>
            <div className="pill-row">
              {[
                { id: 'all', label: 'All articles' },
                { id: 'custom-software', label: 'Software' },
                { id: 'ai-ml', label: 'AI & ML' },
                { id: 'cloud-devops', label: 'DevOps' },
                { id: 'tech-strategy', label: 'Strategy' },
              ].map((tab) => (
                <button key={tab.id} type="button" className={`pill-button ${activeCategory === tab.id ? 'active' : ''}`} onClick={() => setActiveCategory(tab.id)}>
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="surface-panel scroll-reveal" style={{ padding: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Search className="w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  className="site-input"
                  style={{ border: 'none', padding: 0, boxShadow: 'none', background: 'transparent' }}
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="grid-two">
            {filteredPosts.map((post) => (
              <article key={post.title} className="surface-card scroll-reveal">
                <span className="card-kicker">{post.tag}</span>
                <h3 className="card-title" style={{ marginTop: 16 }}>{post.title}</h3>
                <p className="card-copy" style={{ marginTop: 12 }}>{post.excerpt}</p>
                <div className="metrics-inline" style={{ marginTop: 20 }}>
                  <span className="inline-pill"><User className="w-3.5 h-3.5" /> {post.author}</span>
                  <span className="inline-pill"><Calendar className="w-3.5 h-3.5" /> {post.date}</span>
                  <span className="inline-pill"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
                </div>
              </article>
            ))}
          </div>

          {!filteredPosts.length ? (
            <div className="surface-panel scroll-reveal" style={{ marginTop: 24, textAlign: 'center' }}>
              <p className="card-copy">No articles found matching your criteria.</p>
            </div>
          ) : null}
        </div>
      </section>

      <CTASection
        eyebrow="Need applied guidance?"
        title="Let's discuss your product roadmap"
        description="Whether you have questions about architecture scaling or setting up robust dev pipelines, we're here to help."
      />
    </main>
  );
}

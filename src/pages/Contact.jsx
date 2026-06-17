import { Mail, MapPin, MessageSquare, Phone, ShieldCheck } from 'lucide-react';
import CTASection from '@/components/site/CTASection';
import LeadForm from '@/components/site/LeadForm';
import PageHero from '@/components/site/PageHero';
import SectionHeading from '@/components/site/SectionHeading';
import { useScrollReveal } from '@/hooks/useGsap';

const FAQS = [
  { q: 'What types of businesses do you work with?', a: 'We work with startups, SMEs, and enterprise teams across fintech, healthcare, e-commerce, logistics, and more.' },
  { q: 'How does your engagement process work?', a: 'We begin with discovery, align on goals, then move into a structured roadmap and delivery sequence.' },
  { q: 'Do you offer dedicated development teams?', a: 'Yes. We can support focused collaboration models for teams that need ongoing product and engineering capacity.' },
  { q: 'How do you ensure code quality?', a: 'We rely on reviews, QA discipline, testing, and structured engineering practices throughout delivery.' },
];

export default function Contact() {
  useScrollReveal();

  return (
    <main>
      <PageHero
        eyebrow="Enterprise inquiry"
        title={<>Let’s discuss your next project</>}
        description="Share your goals, scope, and context, and our team will follow up with a tailored technical response."
        centered
      />

      <section className="section section-muted">
        <div className="container contact-layout">
          <div className="contact-side">
            <SectionHeading
              eyebrow="Direct channels"
              title="Reach the team through the channel that suits you"
              description="The content remains the same, but the layout now gives each contact path more clarity and breathing room."
            />
            <div className="contact-points">
              <div className="contact-point scroll-reveal">
                <div className="contact-icon"><Mail className="w-5 h-5" /></div>
                <div>
                  <strong>Email us</strong>
                  <p className="contact-side-note">info@androinframind.com</p>
                </div>
              </div>
              <div className="contact-point scroll-reveal">
                <div className="contact-icon"><Phone className="w-5 h-5" /></div>
                <div>
                  <strong>Call us</strong>
                  <p className="contact-side-note">+91 9783223676</p>
                </div>
              </div>
              <div className="contact-point scroll-reveal">
                <div className="contact-icon"><MapPin className="w-5 h-5" /></div>
                <div>
                  <strong>Visit the office</strong>
                  <p className="contact-side-note">410, Transcorp Tower, MD Road, Jaipur, Rajasthan — 302004</p>
                </div>
              </div>
              <div className="contact-point scroll-reveal">
                <div className="contact-icon"><ShieldCheck className="w-5 h-5" /></div>
                <div>
                  <strong>Mutual NDA available</strong>
                  <p className="contact-side-note">Mention confidentiality needs in your message and we can align before deeper review.</p>
                </div>
              </div>
            </div>
          </div>
          <LeadForm
            title="Start project discovery"
            description="Tell us what you are building, improving, or migrating and we’ll help define the right next step."
            submitLabel="Send your inquiry"
            successTitle="Inquiry sent"
            successMessage="Thank you for reaching out. The AndroInfraMind team will contact you within the next 24 hours."
          />
        </div>
      </section>

      <section className="section">
        <div className="container container-narrow">
          <SectionHeading eyebrow="FAQ" title="Common questions before the first conversation" description="Clear answers to the most common intake questions." align="center" />
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

      <section className="section">
        <CTASection
          eyebrow="Prefer a faster path?"
          title="You can also start with a direct conversation"
          description="If you already know the project context, feel free to reach out directly and we’ll route the inquiry appropriately."
          actions={<a href="https://wa.me/919783223676" target="_blank" rel="noreferrer" className="site-button site-button-secondary"><MessageSquare className="w-4 h-4" /> Chat on WhatsApp</a>}
        />
      </section>
    </main>
  );
}

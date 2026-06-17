import { useState } from 'react';
import { AlertCircle, CheckCircle, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import BrandMark from '@/components/site/BrandMark';
import { saveSubscription } from '@/lib/supabaseClient';

const FOOTER_GROUPS = [
  {
    title: 'Services',
    links: [
      { to: '/services', label: 'Custom Software' },
      { to: '/services', label: 'AI & ML Solutions' },
      { to: '/services', label: 'Cloud & DevOps' },
    ],
  },
  {
    title: 'Company',
    links: [
      { to: '/about', label: 'About Us' },
      { to: '/projects', label: 'Our Work' },
      { to: '/blog', label: 'Blog' },
      { to: '/contact', label: 'Contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { to: '/privacy', label: 'Privacy Policy' },
      { to: '/terms', label: 'Terms of Service' },
      { to: '/payments', label: 'Payments' },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = async (event) => {
    event.preventDefault();

    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setSubmitting(true);
    setError('');
    setSuccess(false);

    try {
      const response = await saveSubscription({ email });
      if (response.success) {
        setSuccess(true);
        setEmail('');
      } else {
        setError('Subscription failed. Please try again.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="site-footer apple-footer-shell">
      <div className="container footer-intro-row">
        <p className="footer-intro-text">
          Explore AndroInfraMind for software engineering, product design systems, cloud delivery, AI enablement, and structured digital growth support.
        </p>
      </div>

      <div className="container footer-grid apple-footer-grid">
        <div className="footer-brand-block apple-footer-brand-block">
          <BrandMark className="footer-brand apple-footer-brand" />
          <p className="footer-copy apple-footer-copy">
            Engineering intelligent, scalable, and conversion-ready digital products for ambitious businesses.
          </p>
          <div className="footer-contact-list apple-footer-contact-list" aria-label="Contact details">
            <a href="mailto:info@androinframind.com"><Mail className="w-3.5 h-3.5" /> info@androinframind.com</a>
            <a href="tel:+919783223676"><Phone className="w-3.5 h-3.5" /> +91 9783223676</a>
            <span><MapPin className="w-3.5 h-3.5" /> Jaipur, Rajasthan, India</span>
          </div>
        </div>

        <div className="footer-links-columns apple-footer-links-columns">
          {FOOTER_GROUPS.map((group) => (
            <div key={group.title} className="footer-link-column apple-footer-link-column">
              <h4>{group.title}</h4>
              <ul>
                {group.links.map((link) => (
                  <li key={`${group.title}-${link.label}`}>
                    <Link to={link.to}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-newsletter-block apple-footer-newsletter-block">
          <h4>Updates</h4>
          <p>Get occasional product, engineering, and growth insights from the AndroInfraMind team.</p>
          <form onSubmit={handleSubscribe} className="footer-newsletter-form apple-footer-newsletter-form">
            <input
              type="email"
              placeholder="Your work email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={submitting}
              aria-label="Work email"
            />
            <button type="submit" className="site-button site-button-secondary site-button-sm apple-footer-button" disabled={submitting}>
              {submitting ? 'Sending…' : 'Subscribe'}
            </button>
          </form>
          {success ? (
            <p className="footer-feedback success"><CheckCircle className="w-3.5 h-3.5" /> Subscribed successfully.</p>
          ) : null}
          {error ? (
            <p className="footer-feedback error"><AlertCircle className="w-3.5 h-3.5" /> {error}</p>
          ) : null}
        </div>
      </div>

      <div className="container footer-bottom-bar apple-footer-bottom-bar">
        <p>© 2026 AndroInfraMind. All rights reserved.</p>
        <div className="footer-bottom-links">
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/payments">Payments</Link>
        </div>
        <p>Built with precision. Designed for growth.</p>
      </div>
    </footer>
  );
}

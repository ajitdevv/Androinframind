import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Menu, Search, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import BrandMark from '@/components/site/BrandMark';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Our Work' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

const SEARCH_DATA = [
  { type: 'page', icon: '🏠', title: 'Home', desc: 'AndroInfraMind — intelligent software and AI solutions', url: '/', keywords: 'home main landing' },
  { type: 'page', icon: '🛠️', title: 'Services', desc: 'Full list of technology services we offer', url: '/services', keywords: 'services technology solutions' },
  { type: 'page', icon: '📁', title: 'Projects & Case Studies', desc: 'Portfolio of completed enterprise projects', url: '/projects', keywords: 'projects portfolio case studies' },
  { type: 'page', icon: '👥', title: 'About Us', desc: 'Our mission, team, and engineering philosophy', url: '/about', keywords: 'about team mission company' },
  { type: 'page', icon: '✉️', title: 'Contact', desc: 'Start your project and get a quote in 24 hours', url: '/contact', keywords: 'contact quote inquiry get in touch' },
  { type: 'page', icon: '💳', title: 'Payments', desc: 'Secure B2B invoice payment and consultation booking', url: '/payments', keywords: 'payment invoice checkout razorpay' },
  { type: 'service', icon: '💻', title: 'Custom Software Engineering', desc: 'Tailored microservices, databases, and data pipelines', url: '/services', keywords: 'java go postgresql custom software microservices' },
  { type: 'service', icon: '🤖', title: 'AI & Machine Learning', desc: 'Intelligent ML pipelines, NLP, and predictive analytics', url: '/services', keywords: 'ai ml machine learning nlp python tensorflow analytics' },
  { type: 'service', icon: '☁️', title: 'Cloud & DevOps', desc: 'AWS, GCP, Azure infrastructure with CI/CD pipelines', url: '/services', keywords: 'cloud devops aws gcp azure docker kubernetes terraform' },
  { type: 'project', icon: '💳', title: 'FinPay — Digital Banking Platform', desc: 'Fintech · KYC automation, fraud detection, AWS, ML', url: '/projects', keywords: 'fintech banking finpay aws react node ml kyc fraud' },
  { type: 'project', icon: '🏥', title: 'MediTrack — Healthcare Analytics', desc: 'Healthcare · HIPAA-compliant predictive patient analytics', url: '/projects', keywords: 'healthcare meditrack analytics python tensorflow gcp hipaa' },
  { type: 'project', icon: '🛒', title: 'SwiftCart — E-Commerce Ecosystem', desc: 'Retail · Multi-vendor marketplace, recommendations, Stripe', url: '/projects', keywords: 'retail ecommerce marketplace swiftcart next.js redis stripe postgresql' },
  { type: 'project', icon: '🎓', title: 'LearnHub — EdTech Platform', desc: 'Education · LMS, live classes, personalized learning paths', url: '/projects', keywords: 'education edtech learnhub lms webrtc firebase python' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const location = useLocation();
  const navigate = useNavigate();
  const searchInputRef = useRef(null);

  const closeMenu = () => setMenuOpen(false);
  const closeSearch = () => {
    setSearchOpen(false);
    setSearchQuery('');
    setFocusedIndex(-1);
  };
  const handleNavigate = () => {
    closeMenu();
    closeSearch();
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = searchOpen ? 'hidden' : '';
    if (searchOpen) {
      window.setTimeout(() => searchInputRef.current?.focus(), 40);
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [searchOpen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeSearch();
        closeMenu();
      }
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        if (searchOpen) {
          closeSearch();
        } else {
          setSearchOpen(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen]);

  const filteredResults = searchQuery.trim()
    ? SEARCH_DATA.filter((item) => `${item.title} ${item.desc} ${item.keywords}`.toLowerCase().includes(searchQuery.toLowerCase()))
    : SEARCH_DATA.filter((item) => item.type !== 'page').slice(0, 6);

  const handleSearchKeyDown = (event) => {
    if (!filteredResults.length) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setFocusedIndex((prev) => Math.min(prev + 1, filteredResults.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setFocusedIndex((prev) => Math.max(prev - 1, 0));
    } else if (event.key === 'Enter' && focusedIndex >= 0) {
      event.preventDefault();
      navigate(filteredResults[focusedIndex].url);
      handleNavigate();
    }
  };

  const highlightText = (text, query) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));

    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <mark key={`${part}-${index}`} className="search-highlight">
              {part}
            </mark>
          ) : (
            part
          ),
        )}
      </>
    );
  };

  const isLinkActive = (path) => {
    if (path === '/') return location.pathname === '/' || location.pathname === '/index.html';
    return location.pathname === path;
  };

  return (
    <>
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="container site-header-wrap">
          <div className="site-header-inner">
            <BrandMark className="site-header-brand" />

            <nav className="site-nav" aria-label="Primary">
              {NAV_LINKS.map((link) => (
                <Link key={link.to} to={link.to} className={`site-nav-link ${isLinkActive(link.to) ? 'active' : ''}`} onClick={handleNavigate}>
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="site-header-actions">
              <button type="button" className="icon-button nav-icon-button" onClick={() => setSearchOpen(true)} aria-label="Open search">
                <Search className="w-4 h-4" />
              </button>
              <button type="button" className="icon-button mobile-nav-toggle" onClick={() => setMenuOpen((prev) => !prev)} aria-label="Toggle navigation">
                {menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className={`mobile-nav-panel ${menuOpen ? 'open' : ''}`}>
        <div className="container mobile-nav-shell">
          <div className="mobile-nav-links">
            {NAV_LINKS.map((link) => (
              <Link key={link.to} to={link.to} className="mobile-nav-link" onClick={handleNavigate}>
                {link.label}
              </Link>
            ))}
            <Link to="/payments" className="mobile-nav-link" onClick={handleNavigate}>
              Payments
            </Link>
          </div>
          <Link to="/contact" className="site-button site-button-secondary mobile-nav-cta" onClick={handleNavigate}>
            Contact
          </Link>
        </div>
      </div>

      {searchOpen ? (
        <div className="search-overlay open" role="dialog" aria-modal="true" aria-label="Search site" onClick={(event) => event.target === event.currentTarget && closeSearch()}>
          <button type="button" className="search-close-btn" onClick={closeSearch} aria-label="Close search">
            ×
          </button>
          <div className="search-panel">
            <div className="search-input-wrapper">
              <Search className="w-5 h-5" />
              <input
                ref={searchInputRef}
                type="text"
                className="search-input-field"
                placeholder="Search services, projects, and resources..."
                value={searchQuery}
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                  setFocusedIndex(-1);
                }}
                onKeyDown={handleSearchKeyDown}
                autoComplete="off"
                spellCheck="false"
              />
              <div className="search-kbd-hint">
                <kbd>ESC</kbd>
              </div>
            </div>

            <div className="search-results-container">
              <div className="search-results-label">
                {searchQuery.trim() ? `${filteredResults.length} result${filteredResults.length === 1 ? '' : 's'}` : 'Popular searches'}
              </div>

              {filteredResults.length ? (
                <div className="search-results-grid">
                  {filteredResults.map((item, index) => (
                    <Link
                      key={`${item.url}-${item.title}`}
                      to={item.url}
                      onClick={handleNavigate}
                      className={`search-result-card ${focusedIndex === index ? 'focused' : ''}`}
                    >
                      <div className="search-result-icon">{item.icon}</div>
                      <div className="search-result-body">
                        <div className="search-result-title">{highlightText(item.title, searchQuery)}</div>
                        <div className="search-result-desc">{highlightText(item.desc, searchQuery)}</div>
                      </div>
                      <span className="search-result-badge">{item.type}</span>
                      <ArrowRight className="search-result-arrow w-4 h-4" />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="search-no-results">
                  <div className="no-results-icon">🔍</div>
                  <p>No results found for “{searchQuery}”.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

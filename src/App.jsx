import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ChatbotWidget from './components/site/ChatbotWidget';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import Payments from './pages/Payments';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import { useFloatingBlobs, useMagneticButtons, useCardTilt, useCustomCursor, useTextReveal, usePageTransition, useSmoothScroll } from './hooks/useGsap';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Prevent browser from trying to restore previous scroll position
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }

      // Force instant scroll to top on layout and window level
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.body.scrollTo({ top: 0, left: 0, behavior: 'instant' });

      // Secondary backup deferred scroll to top in case of rendering lags
      const timeoutId = setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      }, 0);

      return () => clearTimeout(timeoutId);
    }
  }, [pathname]);

  return null;
}

function MainAppLayout() {
  const { pathname } = useLocation();
  useFloatingBlobs();
  useMagneticButtons(pathname);
  useCardTilt(pathname);
  useCustomCursor();
  useTextReveal(pathname);
  usePageTransition(pathname);
  useSmoothScroll(pathname);

  return (
    <div className="app-shell">
      <div className="ambient-orb orb-one" aria-hidden="true" />
      <div className="ambient-orb orb-two" aria-hidden="true" />
      <Header />
      <div className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
      <ChatbotWidget />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <MainAppLayout />
    </Router>
  );
}

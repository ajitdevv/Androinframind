import { useState, useEffect, useRef } from 'react';
import { Bot, Sparkles, MessageSquare, X, Send, User, Building2, Mail, FileText, CheckCircle2, ChevronRight } from 'lucide-react';

const SYSTEM_PROMPTS = {
  welcome: "Hi there! 👋 I'm Andro, your AI assistant. How can I help you today? You can ask about our services, pricing, development processes, or hire dedicated developers.",
  fallback: "I'm not sure I understand. Feel free to ask about our services, pricing, development process, or click 'Submit Requirements' to get in touch with our team!",
};

const KNOWLEDGE_BASE = [
  {
    keywords: ['hi', 'hello', 'hey', 'greetings', 'yo', 'hola', 'start', 'help', 'hej', 'hy', 'hlo', 'hlw', 'helo', 'helow', 'hye', 'sup', 'wassup'],
    answer: "Hello! 👋 How can I help you today? Feel free to ask about our services, custom software, mobile apps, pricing, or how to hire dedicated developers."
  },
  {
    keywords: ['about', 'aim', 'androinframind', 'company', 'profile', 'who are you', 'team', 'founder', 'founders', 'owners', 'owner', 'who built this'],
    answer: "AndroInfraMind (AIM) is a premium software engineering and technology solutions firm. We design, build, and deploy high-performance web systems, custom mobile apps, and scalable AI solutions with senior-led engineering precision."
  },
  {
    keywords: ['service', 'services', 'what do you do', 'offer', 'capability', 'capabilities', 'work', 'develop', 'development', 'software', 'developement', 'app', 'apps', 'web', 'website', 'seo', 'marketing'],
    answer: "We offer end-to-end software solutions:\n\n1. Custom Software Development (Bespoke APIs, microservices, databases)\n2. Web Application Development (React, Next.js, high-performance platforms)\n3. Mobile App Development (iOS & Android, React Native, Flutter, Swift)\n4. SEO & Digital Marketing (Technical optimization, growth campaigns)\n5. SaaS & MVP Engineering (Stripe billing, user management, rapid delivery)."
  },
  {
    keywords: ['price', 'pricing', 'cost', 'how much', 'rate', 'rates', 'ruppy', 'rupee', 'inr', 'pay', 'payment', 'money', 'charges', 'charge', 'priceing', 'costing', 'bill', 'billing', 'invoice', 'fees', 'fee'],
    answer: "We offer both custom project-based pricing and pre-built solutions:\n\n- Dedicated Developers: Custom rates based on seniority.\n- Leave Only App (Employee Leave & PTO Management): ₹99,999 full license.\n- AssetFlow App (iOS Asset Manager): ₹69,999 full license.\n\nUse our 'Payments' page to make secure transactions via Razorpay."
  },
  {
    keywords: ['portfolio', 'project', 'projects', 'work', 'works', 'case', 'studies', 'study', 'past', 'experience', 'client', 'clients', 'showcase'],
    answer: "We have successfully delivered enterprise systems, AI healthcare pipelines (MediTrack), digital banking solutions (FinPay), and multi-vendor marketplaces (SwiftCart). Explore our full portfolio on the 'Our Work' page!"
  },
  {
    keywords: ['process', 'development', 'timeline', 'sprint', 'agile', 'how long', 'duration', 'time', 'week', 'weeks', 'month', 'months', 'developement'],
    answer: "Our standard development lifecycle follows Agile methodology:\n\n1. Discovery & Architecture (1-2 weeks)\n2. Sprint Development (Bi-weekly deliverables & reviews)\n3. Quality Assurance & Audits\n4. Deployment & Handover.\n\nMost custom MVPs are completed in 6 to 12 weeks."
  },
  {
    keywords: ['staff', 'augment', 'augmentation', 'hire', 'developer', 'developers', 'dedicated', 'team', 'resource', 'resources', 'programmers', 'programmer'],
    answer: "With our Staff Augmentation model, you can quickly extend your delivery capacity. We offer experienced developers (React, Node, Go, Java, Swift) who integrate directly into your Slack, Jira, and daily workflows."
  },
  {
    keywords: ['white', 'label', 'whitelabel'],
    answer: "We offer complete White Label Development. You handle the client relationship and branding; we handle the design, engineering, QA, and deployment behind the scenes with strict NDA compliance."
  },
  {
    keywords: ['offshore', 'outsource', 'outsourcing', 'india', 'remote'],
    answer: "Accelerate your delivery and reduce costs up to 60% with our offshore development teams based in India. We operate under rigorous security audits, strict NDAs, and clear communication pipelines."
  },
  {
    keywords: ['nda', 'legal', 'privacy', 'terms', 'security', 'secure', 'gdpr', 'hipaa', 'ip', 'safeguard', 'safeguards', 'agreement'],
    answer: "We implement rigorous security standards including NDA-protected collaboration, GDPR & HIPAA conscious workflows, and a full IP transfer guarantee so you cleanly own all source code and deliverables."
  },
  {
    keywords: ['contact', 'contect', 'email', 'phone', 'address', 'location', 'jaipur', 'talk', 'human', 'call', 'number', 'mob', 'mobile', 'whatsapp', 'no', 'num', 'mail', 'support'],
    answer: "You can reach us directly:\n\n📧 Email: info@androinframind.com\n📞 Phone: +91 9783223676\n📍 Location: Jaipur, Rajasthan, India\n\nOr click the 'Submit Requirements' button below to submit a project inquiry!"
  }
];

const QUICK_ACTIONS = [
  { label: 'Explore Services', value: 'services' },
  { label: 'View Pricing', value: 'pricing' },
  { label: 'Staff Augmentation', value: 'staff augmentation' },
  { label: 'Contact Details', value: 'contact' },
  { label: 'Submit Requirements', value: 'lead_form' },
];

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isIntro, setIsIntro] = useState(true);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const [leadData, setLeadData] = useState({
    name: '',
    email: '',
    company: '',
    requirements: '',
    contactMethod: 'Email',
  });
  const [formErrors, setFormErrors] = useState({});

  const feedRef = useRef(null);

  useEffect(() => {
    // Initialize welcome message
    setMessages([
      { sender: 'bot', text: SYSTEM_PROMPTS.welcome, timestamp: new Date() }
    ]);

    // End intro state after 1.3s
    const timer = setTimeout(() => {
      setIsIntro(false);
    }, 1300);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (feedRef.current) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
    }
  }, [messages, isTyping, showLeadForm, leadSubmitted]);

  const handleToggle = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsOpen((prev) => !prev);
  };

  const simulateBotReply = (userQuery) => {
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      
      const queryClean = userQuery.toLowerCase().trim();
      const words = queryClean.split(/[\s,.?!/()]+/).filter(Boolean);
      let matchedAnswer = null;

      for (const item of KNOWLEDGE_BASE) {
        const hasMatch = item.keywords.some(kw => {
          if (kw.includes(' ')) {
            return queryClean.includes(kw);
          }
          return words.some(w => w === kw || (w.startsWith(kw) && kw.length > 3));
        });
        
        if (hasMatch) {
          matchedAnswer = item.answer;
          break;
        }
      }

      if (matchedAnswer) {
        setMessages(prev => [
          ...prev,
          { sender: 'bot', text: matchedAnswer, timestamp: new Date() }
        ]);
      } else {
        setMessages(prev => [
          ...prev,
          { sender: 'bot', text: SYSTEM_PROMPTS.fallback, timestamp: new Date() }
        ]);
      }
    }, 800);
  };

  const handleSend = (textToSend) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;

    setMessages(prev => [
      ...prev,
      { sender: 'user', text: text, timestamp: new Date() }
    ]);
    
    if (!textToSend) {
      setInputText('');
    }

    simulateBotReply(text);
  };

  const handleQuickAction = (action) => {
    if (action.value === 'lead_form') {
      setShowLeadForm(true);
      setMessages(prev => [
        ...prev,
        { sender: 'user', text: 'I want to submit project requirements', timestamp: new Date() },
        { sender: 'bot', text: 'Great! Please fill out this form so our team can get in touch.', timestamp: new Date() }
      ]);
    } else {
      handleSend(action.label);
    }
  };

  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setLeadData(prev => ({ ...prev, [id]: value }));
    if (formErrors[id]) {
      setFormErrors(prev => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!leadData.name.trim()) errors.name = 'Name is required';
    if (!leadData.email.trim() || !leadData.email.includes('@')) errors.email = 'Valid email is required';
    if (!leadData.requirements.trim()) errors.requirements = 'Please describe your requirements';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Simulate form submission success
    setLeadSubmitted(true);
    setTimeout(() => {
      setShowLeadForm(false);
      setLeadSubmitted(false);
      setMessages(prev => [
        ...prev,
        { 
          sender: 'bot', 
          text: `Thank you, ${leadData.name}! Your request has been logged. Our technology executive will reach out via ${leadData.contactMethod} within 24 hours.`, 
          timestamp: new Date() 
        }
      ]);
      setLeadData({
        name: '',
        email: '',
        company: '',
        requirements: '',
        contactMethod: 'Email',
      });
    }, 1200);
  };

  return (
    <>
      {isIntro && (
        <>
          <div className="vfx-glow-ring" />
          <div className="chatbot-intro-vfx">
            {[...Array(20)].map((_, i) => (
              <div key={i} className={`vfx-star star-${i + 1}`} />
            ))}
          </div>
        </>
      )}

      <div className={`chatbot-wrapper ${isIntro ? 'at-center' : 'at-bottom-right'}`} style={{ zIndex: 999 }}>
      {/* Floating Toggle Button */}
      <button 
        type="button" 
        onClick={isIntro ? null : handleToggle} 
        className={`chatbot-toggle-btn ${isOpen ? 'active' : ''} ${isIntro ? 'is-intro' : ''}`}
        aria-label="Toggle Chatbot"
        style={{ cursor: isIntro ? 'default' : 'pointer' }}
      >
        {isIntro ? (
          <>
            <div className="chatbot-spinner" />
            <span style={{ fontSize: '0.8rem', fontWeight: '600', color: 'rgba(255, 255, 255, 0.95)', whiteSpace: 'nowrap' }}>Andro AI Initializing...</span>
          </>
        ) : isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <div style={{ position: 'relative' }}>
            <Bot className="w-6 h-6" />
            <Sparkles className="w-3.5 h-3.5" style={{ position: 'absolute', top: -5, right: -5, color: '#facc15', fill: '#facc15' }} />
          </div>
        )}
      </button>

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="chatbot-panel" onClick={(e) => e.stopPropagation()} data-lenis-prevent>
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar-active">
                <span className="chatbot-pulse" />
              </div>
              <div>
                <h3>Andro Assistant</h3>
                <span>AI Agent · Online</span>
              </div>
            </div>
            <button type="button" onClick={handleToggle} className="chatbot-close-btn" aria-label="Close chat">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Feed */}
          <div ref={feedRef} className="chatbot-feed" data-lenis-prevent>
            {messages.map((msg, index) => (
              <div key={index} className={`chatbot-msg-row ${msg.sender === 'user' ? 'msg-user' : 'msg-bot'}`}>
                <div className="chatbot-msg-bubble">
                  {msg.text.split('\n').map((line, lIdx) => (
                    <p key={lIdx} style={{ margin: 0, minHeight: line === '' ? '12px' : 'auto' }}>
                      {line}
                    </p>
                  ))}
                </div>
                <span className="chatbot-msg-time">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="chatbot-msg-row msg-bot">
                <div className="chatbot-msg-bubble chatbot-typing">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}

            {/* Lead Generation Form Mode */}
            {showLeadForm && (
              <div className="chatbot-form-container">
                {leadSubmitted ? (
                  <div className="chatbot-success-state">
                    <CheckCircle2 className="w-8 h-8 text-success" />
                    <p>Submitting your request...</p>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="chatbot-lead-form">
                    <h4>Submit Project Inquiry</h4>
                    
                    <div className="chatbot-form-field">
                      <label htmlFor="name"><User className="w-3.5 h-3.5" /> Full Name *</label>
                      <input id="name" type="text" placeholder="John Doe" value={leadData.name} onChange={handleFormChange} className={formErrors.name ? 'input-error' : ''} />
                    </div>

                    <div className="chatbot-form-field">
                      <label htmlFor="email"><Mail className="w-3.5 h-3.5" /> Work Email *</label>
                      <input id="email" type="email" placeholder="john@company.com" value={leadData.email} onChange={handleFormChange} className={formErrors.email ? 'input-error' : ''} />
                    </div>

                    <div className="chatbot-form-field">
                      <label htmlFor="company"><Building2 className="w-3.5 h-3.5" /> Company Name</label>
                      <input id="company" type="text" placeholder="Acme Corp" value={leadData.company} onChange={handleFormChange} />
                    </div>

                    <div className="chatbot-form-field">
                      <label htmlFor="requirements"><FileText className="w-3.5 h-3.5" /> Project Requirements *</label>
                      <textarea id="requirements" placeholder="Tell us about your project or resource needs..." rows={2} value={leadData.requirements} onChange={handleFormChange} className={formErrors.requirements ? 'input-error' : ''} />
                    </div>

                    <div className="chatbot-form-field">
                      <label htmlFor="contactMethod">Preferred Contact</label>
                      <select id="contactMethod" value={leadData.contactMethod} onChange={handleFormChange}>
                        <option>Email</option>
                        <option>Phone Call</option>
                        <option>WhatsApp</option>
                      </select>
                    </div>

                    <div className="chatbot-form-actions">
                      <button type="submit" className="chatbot-submit-btn">Submit Inquiry</button>
                      <button type="button" className="chatbot-cancel-btn" onClick={() => setShowLeadForm(false)}>Cancel</button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>

          {/* Quick Actions Panel */}
          {!showLeadForm && (
            <div className="chatbot-quick-actions">
              {QUICK_ACTIONS.map((action, idx) => (
                <button key={idx} type="button" onClick={() => handleQuickAction(action)} className="chatbot-quick-btn">
                  {action.label} <ChevronRight className="w-3 h-3" />
                </button>
              ))}
            </div>
          )}

          {/* Input Footer */}
          {!showLeadForm && (
            <div className="chatbot-input-area">
              <input
                type="text"
                placeholder="Ask something..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button type="button" onClick={() => handleSend()} aria-label="Send message">
                <Send className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
    </>
  );
}

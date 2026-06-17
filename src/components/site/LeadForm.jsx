import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { saveLead } from '@/lib/supabaseClient';

const BUDGET_LABELS = {
  '5-15k': '$5,000 - $15,000',
  '15-50k': '$15,000 - $50,000',
  '50-100k': '$50,000 - $100,000',
  '100k+': '$100,000+',
  unsure: 'Not sure yet',
};

export default function LeadForm({
  title = 'Start your project discovery',
  description = 'Share your goals and our team will follow up with a tailored technical roadmap.',
  submitLabel = 'Send inquiry',
  successTitle = 'Inquiry received',
  successMessage = 'Our team will review your requirements and get back to you within 24 hours.',
}) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    budget: '5-15k',
    details: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.fullName.trim()) nextErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      nextErrors.email = 'Work email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = 'Please enter a valid email address';
    }
    if (!formData.service) nextErrors.service = 'Please select a service';
    if (!formData.details.trim()) nextErrors.details = 'Project details are required';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const { success: leadSaved } = await saveLead({
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        service: formData.service,
        budget: BUDGET_LABELS[formData.budget] || formData.budget,
        project_description: formData.details,
      });

      if (leadSaved) {
        setSuccess(true);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          budget: '5-15k',
          details: '',
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="surface-panel lead-form-panel scroll-reveal">
      <div className="lead-form-header">
        <h3 className="lead-form-title">{title}</h3>
        <p className="lead-form-copy">{description}</p>
      </div>

      <form onSubmit={handleSubmit} className="lead-form-grid" noValidate>
        <div className="form-split">
          <div className="form-field">
            <label htmlFor="fullName">Full name *</label>
            <input
              id="fullName"
              type="text"
              className={`site-input ${errors.fullName ? 'is-invalid' : ''}`}
              placeholder="Jane Smith"
              value={formData.fullName}
              onChange={handleInputChange}
            />
            {errors.fullName ? <span className="form-error">{errors.fullName}</span> : null}
          </div>

          <div className="form-field">
            <label htmlFor="email">Work email *</label>
            <input
              id="email"
              type="email"
              className={`site-input ${errors.email ? 'is-invalid' : ''}`}
              placeholder="jane@company.com"
              value={formData.email}
              onChange={handleInputChange}
            />
            {errors.email ? <span className="form-error">{errors.email}</span> : null}
          </div>
        </div>

        <div className="form-split">
          <div className="form-field">
            <label htmlFor="phone">Phone number</label>
            <input
              id="phone"
              type="text"
              className="site-input"
              placeholder="+91 00000 00000"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="company">Company</label>
            <input
              id="company"
              type="text"
              className="site-input"
              placeholder="Your company"
              value={formData.company}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="service">Service *</label>
          <select
            id="service"
            className={`site-select ${errors.service ? 'is-invalid' : ''}`}
            value={formData.service}
            onChange={handleInputChange}
          >
            <option value="">Select a service</option>
            <option value="custom-software">Custom Software Engineering</option>
            <option value="web-app">Web Application Development</option>
            <option value="mobile-app">Mobile App Development</option>
            <option value="ai-ml">AI & Machine Learning</option>
            <option value="cloud-infra">Cloud & DevOps</option>
            <option value="digital-marketing">Digital Marketing & SEO</option>
          </select>
          {errors.service ? <span className="form-error">{errors.service}</span> : null}
        </div>

        <div className="form-field">
          <label>Estimated budget</label>
          <div className="pill-row">
            {Object.entries(BUDGET_LABELS).map(([value, label]) => (
              <button
                key={value}
                type="button"
                className={`pill-button ${formData.budget === value ? 'active' : ''}`}
                onClick={() => setFormData((prev) => ({ ...prev, budget: value }))}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="details">Project details *</label>
          <textarea
            id="details"
            rows={5}
            className={`site-textarea ${errors.details ? 'is-invalid' : ''}`}
            placeholder="Tell us about your scope, goals, timelines, or current platform constraints."
            value={formData.details}
            onChange={handleInputChange}
          />
          {errors.details ? <span className="form-error">{errors.details}</span> : null}
        </div>

        <button type="submit" className="site-button site-button-primary" disabled={submitting}>
          {submitting ? 'Submitting…' : submitLabel}
        </button>

        <p className="form-note">We can share a mutual NDA before reviewing any sensitive project material.</p>
      </form>

      {success ? (
        <div className="success-banner" role="status">
          <CheckCircle2 className="w-5 h-5" />
          <div>
            <strong>{successTitle}</strong>
            <p>{successMessage}</p>
          </div>
          <button type="button" className="site-button site-button-secondary site-button-sm" onClick={() => setSuccess(false)}>
            Close
          </button>
        </div>
      ) : null}
    </div>
  );
}

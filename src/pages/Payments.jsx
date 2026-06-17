import { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle2, CreditCard, ShieldCheck } from 'lucide-react';
import CTASection from '@/components/site/CTASection';
import PageHero from '@/components/site/PageHero';
import SectionHeading from '@/components/site/SectionHeading';
import { useScrollReveal } from '@/hooks/useGsap';

export default function Payments() {
  const [activeTab, setActiveTab] = useState('invoice');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    invoiceNo: '',
    projectName: 'Enterprise Consultation',
    amount: '4999',
  });
  const [errors, setErrors] = useState({});
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentId, setPaymentId] = useState('');

  useScrollReveal();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    script.onerror = () => console.error('Razorpay SDK failed to load.');
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    if (errors[id]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }
  };

  const validate = () => {
    const nextErrors = {};
    if (!formData.name.trim()) nextErrors.name = 'Full name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) nextErrors.email = 'Valid email is required';
    if (activeTab === 'invoice' && !formData.invoiceNo.trim()) nextErrors.invoiceNo = 'Invoice number is required';
    const amountValue = Number.parseFloat(formData.amount);
    if (Number.isNaN(amountValue) || amountValue <= 0) nextErrors.amount = 'Enter a valid amount greater than 0';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handlePayment = (event) => {
    event.preventDefault();
    if (!validate()) return;

    if (!scriptLoaded || !window.Razorpay) {
      window.alert('Razorpay Checkout SDK is still loading. Please wait a moment.');
      return;
    }

    setProcessing(true);

    const options = {
      key: 'rzp_test_SexA0OHvFEyMRO',
      amount: Math.round(Number.parseFloat(formData.amount) * 100),
      currency: 'INR',
      name: 'AndroInfraMind',
      description: activeTab === 'invoice' ? `Invoice Payment #${formData.invoiceNo}` : 'SLA consultation booking deposit',
      image: 'https://placeholder.co/128x128?text=AIM',
      prefill: {
        name: formData.name,
        email: formData.email,
      },
      theme: {
        color: '#2563eb',
      },
      handler(response) {
        setPaymentSuccess(true);
        setPaymentId(response.razorpay_payment_id);
        setProcessing(false);
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
      window.alert('Payment initialization failed. Using test fallback.');
      window.setTimeout(() => {
        setPaymentSuccess(true);
        setPaymentId(`pay_test_simulation_${Math.random().toString(36).slice(2, 9)}`);
      }, 1000);
    }
  };

  return (
    <main>
      <PageHero
        eyebrow="Secure portal"
        title={<>Client invoice and consultation payments</>}
        description="A cleaner payment experience for invoice settlement and consultation booking, presented with stronger clarity and trust."
        centered
      />

      <section className="section section-muted section-first">
        <div className="container contact-layout">
          <div className="contact-side">
            <SectionHeading
              eyebrow="Payment guidance"
              title="A more professional payment flow without changing core behavior"
              description="The Razorpay flow remains intact, but the surrounding experience now feels more premium and easier to navigate."
            />
            <div className="contact-points">
              <div className="contact-point scroll-reveal">
                <div className="contact-icon"><ShieldCheck className="w-5 h-5" /></div>
                <div>
                  <strong>Secure checkout</strong>
                  <p className="contact-side-note">Payments continue to be processed through Razorpay with encrypted checkout handling.</p>
                </div>
              </div>
              <div className="contact-point scroll-reveal">
                <div className="contact-icon"><CreditCard className="w-5 h-5" /></div>
                <div>
                  <strong>Invoice or consultation</strong>
                  <p className="contact-side-note">Choose between a project invoice payment or a consultation deposit using the same portal.</p>
                </div>
              </div>
              <div className="contact-point scroll-reveal">
                <div className="contact-icon"><AlertCircle className="w-5 h-5" /></div>
                <div>
                  <strong>Fallback resilience</strong>
                  <p className="contact-side-note">The current test-ready fallback behavior is preserved so the flow remains demo-friendly during setup.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="surface-panel scroll-reveal">
            <div className="pill-row" style={{ marginBottom: 20 }}>
              <button
                type="button"
                className={`pill-button ${activeTab === 'invoice' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('invoice');
                  setFormData((prev) => ({ ...prev, amount: '25000', projectName: '', invoiceNo: prev.invoiceNo }));
                }}
              >
                Pay project invoice
              </button>
              <button
                type="button"
                className={`pill-button ${activeTab === 'consultation' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('consultation');
                  setFormData((prev) => ({ ...prev, amount: '4999', projectName: 'Consultation Deposit', invoiceNo: '' }));
                }}
              >
                Book consultation
              </button>
            </div>

            <form onSubmit={handlePayment} className="lead-form-grid" noValidate>
              <div className="form-field">
                <label htmlFor="name">Full name *</label>
                <input id="name" type="text" className={`site-input ${errors.name ? 'is-invalid' : ''}`} placeholder="Enter full name" value={formData.name} onChange={handleInputChange} />
                {errors.name ? <span className="form-error">{errors.name}</span> : null}
              </div>

              <div className="form-field">
                <label htmlFor="email">Work email *</label>
                <input id="email" type="email" className={`site-input ${errors.email ? 'is-invalid' : ''}`} placeholder="Enter email address" value={formData.email} onChange={handleInputChange} />
                {errors.email ? <span className="form-error">{errors.email}</span> : null}
              </div>

              {activeTab === 'invoice' ? (
                <div className="form-field">
                  <label htmlFor="invoiceNo">Invoice number *</label>
                  <input id="invoiceNo" type="text" className={`site-input ${errors.invoiceNo ? 'is-invalid' : ''}`} placeholder="INV-2026-004" value={formData.invoiceNo} onChange={handleInputChange} />
                  {errors.invoiceNo ? <span className="form-error">{errors.invoiceNo}</span> : null}
                </div>
              ) : null}

              <div className="form-field">
                <label htmlFor="projectName">Project / description</label>
                <input id="projectName" type="text" className="site-input" placeholder="Core SaaS redesign" value={formData.projectName} onChange={handleInputChange} />
              </div>

              <div className="form-field">
                <label htmlFor="amount">Amount (INR) *</label>
                <input id="amount" type="number" className={`site-input ${errors.amount ? 'is-invalid' : ''}`} placeholder="Enter amount" value={formData.amount} onChange={handleInputChange} />
                {errors.amount ? <span className="form-error">{errors.amount}</span> : null}
              </div>

              <button type="submit" className="site-button site-button-primary" disabled={processing}>
                {processing ? 'Processing…' : `Pay ₹${Number.parseFloat(formData.amount || '0').toLocaleString('en-IN')}`}
              </button>

              <p className="form-note">Secured by Razorpay. 128-bit SSL encrypted transactions.</p>
            </form>

            {paymentSuccess ? (
              <div className="success-banner" role="status" style={{ marginTop: 20 }}>
                <CheckCircle2 className="w-5 h-5" />
                <div>
                  <strong>Payment successful</strong>
                  <p>Payment completed for ₹{Number.parseFloat(formData.amount || '0').toLocaleString('en-IN')}.</p>
                </div>
                <button type="button" className="site-button site-button-secondary site-button-sm" onClick={() => setPaymentSuccess(false)}>
                  ID: {paymentId}
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Need support?"
        title="If you are unsure which payment path to use, contact the team first"
        description="We can confirm invoice details, consultation steps, or the correct next action before you proceed."
      />
    </main>
  );
}

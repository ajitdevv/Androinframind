import LegalPage from '@/components/site/LegalPage';

export default function Terms() {
  return (
    <LegalPage
      eyebrow="Terms"
      title={<>Terms of Service</>}
      description="Core terms that apply when using the site, engaging the team, or making payments through the portal."
      updatedLabel="Last updated: June 12, 2026"
      sections={[
        {
          title: 'Overview',
          body: (
            <p>
              Welcome to AndroInfraMind. By accessing or using our website, services, or secure invoice portals, you agree to comply with and be bound by the following terms of service.
            </p>
          ),
        },
        {
          title: '1. Scope of service',
          body: (
            <p>
              AndroInfraMind provides software design, development blueprints, custom AI deployment pipelines, and operational platform support. Specific project terms are governed by signed commercial agreements where applicable.
            </p>
          ),
        },
        {
          title: '2. Payments and invoices',
          body: (
            <p>
              Client payments processed through the website are handled via Razorpay Checkout. Consultation deposit payments are non-refundable unless otherwise specified in writing.
            </p>
          ),
        },
      ]}
    />
  );
}

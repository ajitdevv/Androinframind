import LegalPage from '@/components/site/LegalPage';

export default function Privacy() {
  return (
    <LegalPage
      eyebrow="Privacy"
      title={<>Privacy Policy</>}
      description="How AndroInfraMind collects, uses, and protects information shared through the website and inquiry flows."
      updatedLabel="Last updated: June 12, 2026"
      sections={[
        {
          title: 'Overview',
          body: (
            <p>
              At AndroInfraMind, we value and respect your privacy. This policy outlines the types of personal information collected through our website and how that information may be used.
            </p>
          ),
        },
        {
          title: '1. Information we collect',
          body: (
            <p>
              When you contact us using project inquiry forms, we may request details including your full name, work email address, phone number, company name, service interest, budget range, and project requirements.
            </p>
          ),
        },
        {
          title: '2. NDA and data safeguards',
          body: (
            <p>
              We implement appropriate physical, technical, and administrative safeguards to protect personal data and project details. We do not sell or share inquiry information with unverified third parties.
            </p>
          ),
        },
      ]}
    />
  );
}

import { NavShell } from '@/components/NavShell';
import { Footer } from '@/components/Footer';
import { Display, Body } from '@/components/ui';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Privacy Policy' };

const SECTIONS = [
  {
    title: 'Overview',
    paragraphs: [
      'This Privacy Policy describes how tietheknot.florist ("we", "us", or "our") collects, uses, and shares personal information when you visit our website or make a purchase.',
      'This is placeholder content for demonstration purposes only and does not constitute legal advice. A final policy should be reviewed by qualified counsel before publication.',
    ],
  },
  {
    title: 'Information we collect',
    paragraphs: [
      'We may collect information you provide directly, such as your name, email address, shipping address, and order details when you place an order or contact us.',
      'We may also collect technical information automatically, including your IP address, browser type, and pages visited, to help us improve our website and services.',
    ],
  },
  {
    title: 'How we use your information',
    paragraphs: [
      'We use personal information to process orders, communicate with you about your purchase, respond to enquiries, and improve our products and website.',
      'With your consent where required, we may send you updates about new collections or studio news. You may opt out of marketing communications at any time.',
    ],
  },
  {
    title: 'Sharing your information',
    paragraphs: [
      'We share information with service providers who help us operate our store, such as payment processors and shipping carriers, only as needed to fulfil your order.',
      'We do not sell your personal information to third parties.',
    ],
  },
  {
    title: 'Your rights',
    paragraphs: [
      'Depending on your location, you may have the right to access, correct, or delete your personal information, or to object to certain processing.',
      'To exercise these rights, please contact us using the details on our website.',
    ],
  },
  {
    title: 'Contact',
    paragraphs: [
      'If you have questions about this Privacy Policy, please reach out via WhatsApp or Instagram linked in our footer.',
      'Last updated: May 2026.',
    ],
  },
] as const;

export default function PrivacyPage() {
  return (
    <div className="bg-bg font-sans text-ink">
      <NavShell />

      <section className="ttk-section">
        <div className="max-w-[720px] mx-auto">
          <Display size={40} italic as="h1" className="mb-4">
            Privacy Policy
          </Display>
          <Body size={13} className="text-muted mb-12" style={{ lineHeight: 1.78 }}>
            Placeholder policy — replace with your final legal text.
          </Body>

          <div className="flex flex-col gap-12">
            {SECTIONS.map(({ title, paragraphs }) => (
              <div key={title}>
                <Display size={22} as="h2" className="mb-4">
                  {title}
                </Display>
                <div className="flex flex-col gap-4">
                  {paragraphs.map((text) => (
                    <Body key={text} size={14} style={{ lineHeight: 1.78 }}>
                      {text}
                    </Body>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

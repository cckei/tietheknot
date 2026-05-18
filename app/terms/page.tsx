import { NavShell } from '@/components/NavShell';
import { Footer } from '@/components/Footer';
import { Display, Body } from '@/components/ui';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Terms of Service' };

const SECTIONS = [
  {
    title: 'Agreement',
    paragraphs: [
      'By accessing or using tietheknot.florist, you agree to these Terms of Service. If you do not agree, please do not use our website.',
      'This is placeholder content for demonstration purposes only and does not constitute legal advice. A final terms document should be reviewed by qualified counsel before publication.',
    ],
  },
  {
    title: 'Products & orders',
    paragraphs: [
      'We sell handmade dried and preserved floral pieces. Colours and textures may vary slightly from photographs due to the natural materials used in each piece.',
      'We reserve the right to refuse or cancel any order. If your order is cancelled after payment, we will issue a full refund.',
    ],
  },
  {
    title: 'Pricing & payment',
    paragraphs: [
      'All prices are shown in the currency displayed at checkout. We aim to keep pricing accurate but reserve the right to correct errors before an order is confirmed.',
      'Payment is processed securely through our checkout provider. We do not store your full card details on our servers.',
    ],
  },
  {
    title: 'Shipping & delivery',
    paragraphs: [
      'Delivery times and shipping costs depend on your location and are shown at checkout. Risk of loss passes to you upon delivery to the carrier.',
      'Please refer to our FAQ for full details on shipping, customs, and returns.',
    ],
  },
  {
    title: 'Returns',
    paragraphs: [
      'Returns are subject to the conditions outlined in our FAQ. Items must be returned in their original condition within the stated timeframe.',
      'We are not responsible for return shipping costs unless the item arrived damaged or faulty.',
    ],
  },
  {
    title: 'Limitation of liability',
    paragraphs: [
      'To the fullest extent permitted by law, tietheknot.florist shall not be liable for any indirect, incidental, or consequential damages arising from your use of our website or products.',
      'Our total liability for any claim shall not exceed the amount you paid for the relevant order.',
    ],
  },
  {
    title: 'Changes',
    paragraphs: [
      'We may update these Terms of Service from time to time. Continued use of the website after changes are posted constitutes acceptance of the revised terms.',
      'Last updated: May 2026.',
    ],
  },
] as const;

export default function TermsPage() {
  return (
    <div className="bg-bg font-sans text-ink">
      <NavShell />

      <section className="ttk-section">
        <div className="max-w-[720px] mx-auto">
          <Display size={40} italic as="h1" className="mb-4">
            Terms of Service
          </Display>
          <Body size={13} className="text-muted mb-12" style={{ lineHeight: 1.78 }}>
            Placeholder terms — replace with your final legal text.
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

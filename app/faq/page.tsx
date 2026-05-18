import { NavShell } from '@/components/NavShell';
import { Footer } from '@/components/Footer';
import { Display, Body } from '@/components/ui';
import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = { title: 'FAQ' };

type FaqItem = { question: string; answer: ReactNode };

type FaqSection = { title: string; items: FaqItem[] };

function Answer({ children }: { children: ReactNode }) {
  return <div className="flex flex-col gap-4">{children}</div>;
}

function P({ children }: { children: ReactNode }) {
  return <Body size={14} style={{ lineHeight: 1.78 }}>{children}</Body>;
}

function BulletList({ items }: { items: Array<string | { label: string; sub: string[] }> }) {
  return (
    <ul className="flex flex-col gap-3 list-none p-0 m-0">
      {items.map((item) => {
        if (typeof item === 'string') {
          return (
            <li key={item} className="flex gap-3">
              <span className="text-muted shrink-0" aria-hidden>—</span>
              <Body size={14} style={{ lineHeight: 1.78 }}>{item}</Body>
            </li>
          );
        }
        return (
          <li key={item.label}>
            <div className="flex gap-3">
              <span className="text-muted shrink-0" aria-hidden>—</span>
              <Body size={14} style={{ lineHeight: 1.78 }}>{item.label}</Body>
            </div>
            <ul className="flex flex-col gap-3 list-none p-0 m-0 ml-6 mt-3">
              {item.sub.map((sub) => (
                <li key={sub} className="flex gap-3">
                  <span className="text-muted shrink-0" aria-hidden>—</span>
                  <Body size={14} style={{ lineHeight: 1.78 }}>{sub}</Body>
                </li>
              ))}
            </ul>
          </li>
        );
      })}
    </ul>
  );
}

const SECTIONS: FaqSection[] = [
  {
    title: 'Delivery',
    items: [
      {
        question: 'Do you offer free shipping?',
        answer: (
          <Answer>
            <P>Yes, free shipping is available when your order meets the following spending. All orders are shipped from the United Kingdom.</P>
            <BulletList
              items={[
                'United Kingdom: Free shipping on orders over £20 GBP',
                'Europe: Free shipping on orders over €45 EUR',
                {
                  label: 'Rest of the world:',
                  sub: [
                    'Free shipping on orders over $55 USD',
                    '50% off shipping on orders over $27.5 USD',
                  ],
                },
              ]}
            />
            <P>Free shipping will be applied automatically at checkout when the minimum order value is reached.</P>
          </Answer>
        ),
      },
      {
        question: 'Do you offer international shipping?',
        answer: (
          <Answer>
            <P>Yes, we offer international shipping to most countries. All orders are shipped from the United Kingdom.</P>
            <P>At the moment, we&apos;re unable to ship to certain EU countries due to import regulations. Available shipping destinations will be shown at checkout once you enter your delivery information.</P>
            <P>Shipping costs vary depending on your location and will be calculated at checkout.</P>
            <P>Once your order has been dispatched, you&apos;ll receive a confirmation email with a tracking number so you can follow your delivery.</P>
          </Answer>
        ),
      },
      {
        question: 'When will my order be dispatched?',
        answer: (
          <Answer>
            <P>Orders are usually dispatched within 2–3 business days. Once your order has been shipped, you&apos;ll receive a confirmation email with a tracking number so you can follow your delivery.</P>
            <P>Delivery times may vary depending on your shipping location. Please refer to your tracking number for the most up-to-date delivery status.</P>
          </Answer>
        ),
      },
      {
        question: 'Do I need to pay customs and duties charges?',
        answer: (
          <Answer>
            <Body size={14} className="font-medium text-ink" style={{ lineHeight: 1.78 }}>
              For countries with Postal Delivered Duties Paid (PDDP)
            </Body>
            <P>
              For the following destinations, the United States, Austria, Cyprus, Malta, Netherlands, Norway, Ireland and Switzerland, we ship orders as Postal Delivered Duties Paid (PDDP) via Royal Mail. When PDDP applies, duties will appear as a separate line at checkout for full transparency.
            </P>
            <Body size={14} className="font-medium text-ink" style={{ lineHeight: 1.78 }}>
              For all other countries
            </Body>
            <P>Customs charges are determined by your local customs office and are outside of tietheknot.florist&apos;s control. Depending on local regulations, international orders may be subject to import taxes, duties, or handling fees.</P>
            <P>As these charges vary by destination, they cannot be calculated or collected in advance. tietheknot.florist is unable to cover or refund any customs or import fees that may be applied to your shipment.</P>
            <P>We recommend checking with your local customs office before placing an order. If any customs or import charges are incurred, payment of these fees is the responsibility of the recipient.</P>
          </Answer>
        ),
      },
    ],
  },
  {
    title: 'Returns & Refunds',
    items: [
      {
        question: 'How do I return an item?',
        answer: (
          <Answer>
            <P>
              Purchased items may be returned for a refund and must be reported within 14 days of delivery. Please contact us in advance with your order number and name to confirm that your request falls within this timeframe. The time taken for the item to be returned to us will not count against the 14-day period.
            </P>
            <P>To be eligible for a return, items must be in the same condition as received, unused, unworn, and in their original packaging.</P>
            <P>Please note that original shipping charges are non-refundable. All return or exchange shipping fees are non-refundable and must be covered by the customer.</P>
          </Answer>
        ),
      },
      {
        question: 'Will my original postage costs be refunded?',
        answer: (
          <Answer>
            <P>Postage is only refundable if your whole order arrives damaged or faulty. Otherwise, postage isn&apos;t included in refunds.</P>
          </Answer>
        ),
      },
      {
        question: 'Where is my refund?',
        answer: (
          <Answer>
            <P>
              Returns can take up to 14 working days to reach us. Once your returned item has been received and processed by our team, your refund should appear in your original payment account within 5 business days.
            </P>
            <P>If you haven&apos;t received your refund after this time, please feel free to contact us with your order details.</P>
          </Answer>
        ),
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <div className="bg-bg font-sans text-ink">
      <NavShell />

      <section className="ttk-section">
        <div className="max-w-[720px] mx-auto">
          <Display size={40} italic as="h1" className="mb-12">
            FAQ
          </Display>

          <div className="flex flex-col gap-16">
            {SECTIONS.map(({ title, items }) => (
              <div key={title}>
                <Display size={28} italic as="h2" className="mb-10">
                  {title}
                </Display>
                <div className="flex flex-col gap-10">
                  {items.map(({ question, answer }) => (
                    <div key={question} className="border-t border-rule pt-8">
                      <Display size={22} as="h3" className="mb-5">
                        {question}
                      </Display>
                      {answer}
                    </div>
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

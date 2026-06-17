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

type DeliveryOption = {
  name: string;
  price: string;
  description: string;
  icon: ReactNode;
  featured?: boolean;
  badge?: string;
};

function DeliveryOptionGrid({ options }: { options: DeliveryOption[] }) {
  return (
    <div className="grid gap-3 grid-cols-1 sm:grid-cols-3">
      {options.map((opt) => (
        <div
          key={opt.name}
          className={`rounded-lg border border-rule p-5 flex flex-col ${
            opt.featured ? 'bg-surface border-ink-soft/30' : 'bg-paper'
          }`}
        >
          {opt.badge ? (
            <span className="inline-block self-start text-[11px] tracking-[0.06em] bg-bg text-ink-soft rounded-full px-[10px] py-[3px] mb-2">
              {opt.badge}
            </span>
          ) : null}
          <div className="text-ink-soft mb-[10px]" aria-hidden>
            {opt.icon}
          </div>
          <p className="font-sans text-[13px] tracking-[0.08em] uppercase text-ink-soft mb-1">
            {opt.name}
          </p>
          <p className="font-serif font-light text-[26px] leading-none text-ink mb-[6px]">
            {opt.price}
          </p>
          <p className="font-sans text-[13px] leading-[1.6] text-ink-soft">{opt.description}</p>
        </div>
      ))}
    </div>
  );
}

type InfoRow = { label: string; value: ReactNode };

function InfoRows({ rows }: { rows: InfoRow[] }) {
  return (
    <div className="flex flex-col">
      {rows.map((row, i) => (
        <div
          key={row.label}
          className={`flex justify-between items-start gap-4 py-[14px] ${
            i < rows.length - 1 ? 'border-b border-rule' : ''
          }`}
        >
          <span className="font-sans text-[13px] text-ink-soft min-w-[140px] shrink-0">
            {row.label}
          </span>
          <span className="font-sans text-[13px] leading-[1.6] text-ink text-right">
            {row.value}
          </span>
        </div>
      ))}
    </div>
  );
}

const IconPackage = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
    <line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

const IconTruck = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <rect x="1" y="3" width="15" height="13" />
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

const IconGift = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <polyline points="20 12 20 22 4 22 4 12" />
    <rect x="2" y="7" width="20" height="5" />
    <line x1="12" y1="22" x2="12" y2="7" />
    <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
    <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
  </svg>
);

const IconInfoCircle = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const IconShieldCheck = (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

function PolicyBlock({
  tone,
  label,
  icon,
  title,
  children,
}: {
  tone: 'danger' | 'success';
  label: string;
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  const labelColor = tone === 'danger' ? '#a04646' : 'var(--color-sage-dark)';
  return (
    <div className="bg-paper border border-rule rounded-lg p-6">
      <p
        className="font-sans text-[11px] tracking-[0.1em] uppercase mb-[6px] inline-flex items-center gap-[6px]"
        style={{ color: labelColor }}
      >
        <span aria-hidden>{icon}</span>
        {label}
      </p>
      <p className="font-sans text-[15px] text-ink mb-[10px]">{title}</p>
      <div className="font-sans text-[13px] leading-[1.7] text-ink-soft">{children}</div>
    </div>
  );
}

function NoteBox({ children }: { children: ReactNode }) {
  return (
    <div className="bg-surface border-l-2 border-ink-soft/40 rounded-r-md px-5 py-4 font-sans text-[13px] leading-[1.7] text-ink-soft">
      {children}
    </div>
  );
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
        question: 'What are your delivery options?',
        answer: (
          <Answer>
            <P>All pieces are handcrafted in small batches and dispatched with care. Because dried florals are delicate, we pack each order by hand to ensure it arrives exactly as it left the studio.</P>
            <DeliveryOptionGrid
              options={[
                {
                  name: 'Standard',
                  price: '£4.95',
                  description: 'Royal Mail Tracked 48 — typically 3–5 working days after dispatch.',
                  icon: IconPackage,
                },
                {
                  name: 'Tracked 24',
                  price: '£6.95',
                  description: 'Royal Mail Tracked 24 — 1–2 days after dispatch in most cases.',
                  icon: IconTruck,
                  featured: true,
                  badge: 'Most popular',
                },
                {
                  name: 'Free shipping',
                  price: 'Free',
                  description: 'Complimentary standard shipping on all orders over £80.',
                  icon: IconGift,
                },
              ]}
            />
            <P>Please note: dispatch times are 5–10 working days from the date of your order. Delivery timescales begin after dispatch — not at the point of purchase.</P>
          </Answer>
        ),
      },
      {
        question: 'When will my order be dispatched?',
        answer: (
          <Answer>
            <P>Orders are dispatched 5–10 working days from the date of your order, Monday to Friday. Orders placed after 12pm may dispatch the following working day.</P>
            <P>Once your order has been shipped, you&apos;ll receive a confirmation email with a tracking number so you can follow your delivery.</P>
          </Answer>
        ),
      },
      {
        question: 'Which areas do you deliver to?',
        answer: (
          <Answer>
            <InfoRows
              rows={[
                {
                  label: 'Dispatch days',
                  value: (
                    <>
                      Monday – Friday
                      <br />
                      <span className="text-ink-soft text-[12px]">
                        Orders placed after 12pm may dispatch the following working day
                      </span>
                    </>
                  ),
                },
                { label: 'UK mainland', value: 'All postcodes covered' },
                {
                  label: 'Scottish Highlands & Islands',
                  value: 'Available — please allow 1–2 extra days',
                },
                { label: 'Northern Ireland', value: 'Available via Royal Mail' },
                {
                  label: 'International',
                  value: (
                    <>
                      Currently UK only
                      <br />
                      <span className="text-ink-soft text-[12px]">
                        Please contact us for Hong Kong enquiries
                      </span>
                    </>
                  ),
                },
              ]}
            />
          </Answer>
        ),
      },
    ],
  },
  {
    title: 'Returns & Refunds',
    items: [
      {
        question: 'Do you accept returns or refunds?',
        answer: (
          <Answer>
            <PolicyBlock
              tone="danger"
              label="No returns or refunds"
              icon={IconInfoCircle}
              title="All sales are final on dried floral pieces"
            >
              All of our works are made from natural dried and preserved botanicals. As living plant matter, dried florals are fragile by nature — minor shedding, slight variations in colour, and small loose petals or stems are a normal and expected characteristic of the material, not a fault. For this reason, we are unable to accept returns or offer refunds on the basis of natural deterioration or change of mind. We encourage you to read the product descriptions carefully and refer to our{' '}
              <a
                href="/flower-care"
                className="text-ink underline"
                style={{ textUnderlineOffset: 3 }}
              >
                Flower Care Guide
              </a>{' '}
              before purchasing.
            </PolicyBlock>
          </Answer>
        ),
      },
      {
        question: 'What if my order arrives damaged?',
        answer: (
          <Answer>
            <PolicyBlock
              tone="success"
              label="Exception — damaged on arrival"
              icon={IconShieldCheck}
              title="Significant transit damage"
            >
              If your order arrives with significant damage caused during transit — such as a broken frame, crushed structure, or severely damaged piece — please photograph both the packaging and the item and contact us within 48 hours of delivery. We will review each case individually and arrange a replacement or refund where appropriate.
            </PolicyBlock>
            <NoteBox>
              Minor natural shedding of petals, pollen, or small stem fragments during transit is not considered damage and is not eligible for a refund or replacement.
            </NoteBox>
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

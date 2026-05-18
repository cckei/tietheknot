import { NavShell } from '@/components/NavShell';
import { Footer } from '@/components/Footer';
import { Display, Body } from '@/components/ui';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Flower Care Guide' };

const SECTIONS = [
  {
    title: 'Display',
    items: [
      'Keep away from direct sunlight — UV light causes colours to fade over time.',
      'Avoid humid areas such as bathrooms and kitchens — moisture causes petals to soften and mould.',
      'Choose a spot away from air conditioning vents and open windows — strong airflow can cause petals to drop.',
      'Indoor use only.',
    ],
  },
  {
    title: 'Handling',
    items: [
      'Handle gently — dried flowers are more fragile than fresh ones and petals can break if handled roughly.',
      'Hold from the stem or base when moving — avoid gripping the flower heads directly.',
      'Never add water — dried and preserved flowers should always be kept dry.',
    ],
  },
  {
    title: 'Cleaning',
    items: [
      'Remove dust gently with a soft brush, a low-powered hair dryer on cool setting, or a can of compressed air.',
      'Do not wipe with a damp cloth or use any cleaning products.',
    ],
  },
  {
    title: 'Longevity',
    items: [
      'With proper care, dried flowers can last 1–3 years or longer.',
      'Some natural fading and colour shift over time is normal — it\'s part of how dried flowers age, and many find the muted tones just as beautiful.',
      'Preserved botanicals (such as hydrangea and eucalyptus) tend to last longer than standard dried flowers when kept in the right conditions.',
    ],
  },
] as const;

export default function FlowerCarePage() {
  return (
    <div className="bg-bg font-sans text-ink">
      <NavShell page="flower-care" />

      <section className="ttk-section">
        <div className="max-w-[720px] mx-auto">
          <Display size={40} italic as="h1" className="mb-12">
            Dried Flower Care Guide
          </Display>

          <div className="flex flex-col gap-12">
            {SECTIONS.map(({ title, items }) => (
              <div key={title}>
                <Display size={28} italic as="h2" className="mb-5">
                  {title}
                </Display>
                <ul className="flex flex-col gap-4 list-none p-0 m-0">
                  {items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="text-muted shrink-0" aria-hidden>—</span>
                      <Body size={14} style={{ lineHeight: 1.78 }}>{item}</Body>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <Body size={14} className="mt-12" style={{ lineHeight: 1.78 }}>
            Because we use real natural materials, every piece is unique — slight variations in colour and texture are part of what makes it yours.
          </Body>
        </div>
      </section>

      <Footer />
    </div>
  );
}

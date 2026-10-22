/**
 * Sponsorship packages and vendor stalls for Worship Night 2026.
 * Source: the sponsorship flyer and the vendor fees sheet. Stall fees are PROPOSED and
 * still to be confirmed by the committee; update them here once they are.
 */

export interface SponsorTier {
  id: string;
  name: string;
  price: number;
  /** What the tier builds on, e.g. "Everything in Silver, plus". */
  lead: string;
  benefits: string[];
}

// Listed from lowest to highest; each tier includes the one before it.
export const SPONSOR_TIERS: SponsorTier[] = [
  {
    id: 'bronze',
    name: 'Bronze',
    price: 15000,
    lead: 'Your package includes',
    benefits: [
      'Logo on the shared sponsors’ banner',
      'Thank-you post on our social media pages',
      'Public thank-you from the stage',
      '2 reserved seats at the event',
    ],
  },
  {
    id: 'silver',
    name: 'Silver',
    price: 25000,
    lead: 'Everything in Bronze, plus',
    benefits: [
      'Logo on the livestream sponsor slide',
      'Dedicated thank-you feature on social media',
      'Branded display table in the foyer',
    ],
  },
  {
    id: 'gold',
    name: 'Gold',
    price: 35000,
    lead: 'Everything in Silver, plus',
    benefits: [
      'Logo on the main stage backdrop',
      'Logo on posters and promotional flyers',
      'Larger activation space with your own branding',
      'Brand video played before the programme',
    ],
  },
  {
    id: 'platinum',
    name: 'Platinum',
    price: 50000,
    lead: 'Everything in Gold, plus',
    benefits: [
      'Billed as “Strategic Sponsor” in all promotion',
      'Up to 5 minutes on stage for an address or video',
      'Prime entrance activation space and 10 VIP seats',
      'First right to renew as sponsor in 2027',
    ],
  },
];

export const SPONSORSHIP_NOTE =
  'Sponsorship can be given as cash, products or in-kind services such as sound, transport, printing, catering or hospitality, valued at the package amount.';

export interface VendorCategory {
  id: string;
  name: string;
  examples: string;
  space: string;
  fee: number;
  stalls: number;
  /** Cooked food and drinks vendors are asked about a food handler certificate. */
  needsFoodCertificate: boolean;
}

export const VENDOR_CATEGORIES: VendorCategory[] = [
  {
    id: 'cooked-food',
    name: 'Cooked food',
    examples: 'Pilau, chapati, smocha, grills',
    space: '3m × 3m',
    fee: 6000,
    stalls: 6,
    needsFoodCertificate: true,
  },
  {
    id: 'snacks-drinks',
    name: 'Snacks and drinks',
    examples: 'Mandazi, popcorn, juice, water, tea',
    space: '2m × 2m',
    fee: 3000,
    stalls: 6,
    needsFoodCertificate: true,
  },
  {
    id: 'merchandise-retail',
    name: 'Merchandise and retail',
    examples: 'Clothing, books, music, gifts, Christian merchandise',
    space: '3m × 3m',
    fee: 4000,
    stalls: 5,
    needsFoodCertificate: false,
  },
  {
    id: 'exhibitors-services',
    name: 'Exhibitors and services',
    examples: 'SACCOs, schools, clinics, insurers, training providers',
    space: '3m × 3m',
    fee: 8000,
    stalls: 3,
    needsFoodCertificate: false,
  },
];

export const VENDOR_EQUIPMENT = ['Tent or canopy', 'Table', 'Chairs', 'Display stands or banners', 'Cooking equipment'];

export const MAX_STALLS_PER_APPLICATION = 3;

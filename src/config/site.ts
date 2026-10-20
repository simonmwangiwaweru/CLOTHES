export const SITE_CONFIG = {
  brand: {
    name: 'UNDIGNIFIED',
    tagline: 'Every piece you wear helps fund the night.',
    location: 'RGC Ruiru',
  },

  // Details come from the Worship Night 2026 posters.
  event: {
    title: 'Worship Night 2026',
    host: 'Redeemed Gospel Church Ruiru',
    dateLabel: '4th December 2026',
    startsAtIso: '2026-12-04T18:00:00+03:00',
    timeLabel: 'From 6:00 PM',
    entry: 'Free entry',
    venue: 'RGC Ruiru, opposite Carrefour, next to the stadium',
    verse: {
      text: 'I will become even more undignified than this.',
      reference: '2 Samuel 6:22',
    },
  },

  // Where gifts and order payments go.
  payment: {
    bank: 'Family Bank',
    paybill: '222111',
    accountNumber: '898089',
    accountTitle: 'RGC RUIRU PRAISE TEAM',
  },

  // WhatsApp: reads VITE_WHATSAPP_NUMBER, falling back to the store number below.
  whatsapp: {
    // Number format: digits only, international format, no '+' or spaces (e.g., '254704514466')
    number: (import.meta.env.VITE_WHATSAPP_NUMBER || '254704514466').replace(/[^0-9]/g, ''),
    defaultInquiryMessage: 'Hello, I have a question about Undignified Worship Night 2026.',
  },
};

export const SITE_CONFIG = {
  brand: {
    name: 'UNDIGNIFIED',
    tagline: 'Wear it loud. Wear it real.',
    slogan: 'Premium, comfortable, unapologetic streetwear.',
    tone: 'Oversized fits, natural fabrics, bold attitude, quiet confidence.',
    established: '2024',
    location: 'Nairobi, Kenya',
    email: 'orders@undignified.co.ke',
    phoneDisplay: '+254 704 514 466',
    businessHours: 'Mon–Sat, 9:00 AM–7:00 PM EAT',
    discountNotice: 'Get 30% discount on your first order',
    firstOrderPromoCode: 'FIRST30',
  },
  
  // WhatsApp: reads VITE_WHATSAPP_NUMBER, falling back to the store number below.
  whatsapp: {
    // Number format: digits only, international format, no '+' or spaces (e.g., '254704514466')
    number: (import.meta.env.VITE_WHATSAPP_NUMBER || '254704514466').replace(/[^0-9]/g, ''),
    defaultInquiryMessage: 'Hello UNDIGNIFIED, I have an inquiry about your collection.',
  },

  socials: {
    instagram: 'https://instagram.com/undignified.ke',
    tiktok: 'https://tiktok.com/@undignified.ke',
    twitter: 'https://x.com/undignified_ke',
  },

  deliveryCards: [
    {
      title: 'Nairobi delivery',
      timeframe: 'Same day or next day',
      cost: 'KES 350 · free above KES 6,000',
      description: 'To your door or office anywhere in Nairobi County. We message you on WhatsApp when your order is dispatched.',
    },
    {
      title: 'Countrywide delivery',
      timeframe: '24–48 hours',
      cost: 'KES 500 flat rate',
      description: 'By Fargo Courier, G4S or Easy Coach to Mombasa, Kisumu, Nakuru and the other 47 counties.',
    },
    {
      title: 'Pay on confirmation',
      timeframe: 'M-Pesa or cash on delivery',
      cost: 'Nothing upfront',
      description: 'We confirm your order details on WhatsApp first. Pay to our M-Pesa Buy Goods till only after you agree to them.',
    },
  ],
};

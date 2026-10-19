export interface HeroSlide {
  id: string;
  headline: string;
  tagline: string;
  badge: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  alt: string;
}

export interface DeliveryMethodOption {
  id: string;
  title: string;
  priceText: string;
  timeline: string;
  description: string;
}

export const SITE_CONFIG = {
  brand: {
    name: 'UNDIGNIFIED',
    tagline: 'Wear it loud. Wear it real.',
    slogan: 'Premium, comfortable, unapologetic streetwear.',
    tone: 'Oversized fits, natural fabrics, bold attitude, quiet confidence.',
    established: '2024',
    location: 'Nairobi, Kenya',
    email: 'orders@undignified.co.ke',
    phoneDisplay: '+254 712 345 678',
    businessHours: 'Mon - Sat: 9:00 AM - 7:00 PM EAT',
    discountNotice: 'Get 30% discount on your first order',
    firstOrderPromoCode: 'FIRST30',
  },
  
  // WhatsApp Configuration - reads from Vite env variable, fallback to demo number
  whatsapp: {
    // Number format: digits only, international format, no '+' or spaces (e.g., '254712345678')
    number: (import.meta.env.VITE_WHATSAPP_NUMBER || '254712345678').replace(/[^0-9]/g, ''),
    defaultInquiryMessage: 'Hello UNDIGNIFIED, I have an inquiry about your collection.',
  },

  socials: {
    instagram: 'https://instagram.com/undignified.ke',
    tiktok: 'https://tiktok.com/@undignified.ke',
    twitter: 'https://x.com/undignified_ke',
  },

  deliveryCards: [
    {
      title: 'Nairobi Metro Delivery',
      timeframe: 'Same-day or next-day delivery',
      cost: 'KES 350 (Free for orders above KES 6,000)',
      description: 'Delivered directly to your doorstep or office within Nairobi County with real-time dispatch updates.',
    },
    {
      title: 'Countrywide Delivery',
      timeframe: '24 - 48 Hours',
      cost: 'KES 500 flat rate',
      description: 'Reliable parcel transit via Fargo Courier, G4S, or Easy Coach to Mombasa, Kisumu, Nakuru, and all 47 counties.',
    },
    {
      title: 'Payment on Confirmation',
      timeframe: 'M-Pesa or Cash on Delivery',
      cost: '100% Secure',
      description: 'No prepayment risk. Review and confirm order specs with our team via WhatsApp before sending payment to our official M-Pesa Buy Goods till.',
    },
  ],

  heroSlides: [
    {
      id: 'slide-1',
      headline: 'NEW COLLECTION',
      tagline: 'Heavyweight hoodies, crewneck sweats, and authentic jute carry bags.',
      badge: 'Get 30% discount on your first order',
      ctaText: 'Shop the collection',
      ctaLink: '#collections',
      image: '/public/assets/aistudio/WhatsApp_Image_2026-10-19_at_21.50.47_5c9a19fe.jpeg',
      alt: 'UNDIGNIFIED models wearing collection with printed jute bags',
    },
    {
      id: 'slide-2',
      headline: 'HEAVY COTTON',
      tagline: '500 GSM custom-knit unbrushed fleece engineered for daily wear.',
      badge: 'Drop 04 // In Stock Now',
      ctaText: 'View Hoodies & Sweats',
      ctaLink: '#collections',
      image: '/src/assets/images/hoodie_editorial_detail_1792442238613.jpg',
      alt: 'Model in heavy charcoal oversized hoodie',
    },
    {
      id: 'slide-3',
      headline: 'STREET ATTITUDE',
      tagline: 'Unapologetic proportions. Raw selvedge and washed utility bottoms.',
      badge: 'Limited Archive Batch',
      ctaText: 'Explore Bottoms',
      ctaLink: '#collections',
      image: '/src/assets/images/product_raw_black_denim_1792442287140.jpg',
      alt: 'Relaxed raw black streetwear denim',
    },
  ],
};

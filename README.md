# UNDIGNIFIED | Streetwear Storefront

> "Wear it loud. Wear it real."

A high-contrast, editorial e-commerce storefront for streetwear brand **UNDIGNIFIED**. Engineered with an exclusive WhatsApp checkout flow that directly formats customer carts into structured WhatsApp messages without third-party payment gateways.

---

## Features

- **Editorial Visual Direction**: Warm neutral canvas (`#F2EEE9`), high-contrast Bebas Neue display typography, 1px outlines (`rgba(26,26,26,0.7)`), 16–20px radius cards, and layered depth hero layout.
- **WhatsApp Checkout Engine**: Customers add pieces with size & color selections, fill in their delivery info, and generate a pre-formatted WhatsApp order dispatch link (`https://wa.me/...`).
- **Product Catalog (KES)**:
  1. Heavyweight Loopback Hoodie — KES 2,500
  2. Washed Loopback Sweatshirt — KES 2,000
  3. Heavy Knit Streetwear Polo — KES 1,200
  4. Heavy Round Neck T-Shirt — KES 1,000
  5. Unstructured 6-Panel Cap — KES 1,200
  6. Eco Jute Tote Bag A4 — KES 800
  7. Heavy Eco Jute Shopper Bag A3 — KES 1,000
  8. Debossed UNDIGNIFIED Wrist Band — KES 100
- **Asymmetrical About Us**: Multi-angle editorial showcase with offset text and micro-animated arrow.
- **Popular Goods Slider**: Horizontally scrollable row with scroll-snap and quick-add actions.
- **Interactive Product Modal**: Size selection, color swatches, quantity steppers, and single-item instant WhatsApp ordering.
- **Cart Drawer**: Client-side state with `localStorage` persistence, order note, and address validation.
- **Responsive & Accessible**: Strict 15% mobile sticky cap, keyboard navigation with Esc handling, and zero broken image fallbacks.

---

## Quickstart

### Prerequisites
- Node.js 18+
- npm or bun

### 1. Install dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Set your store's WhatsApp number in `.env.local`:
```env
# Digits only in international format without '+' or spaces.
# Example for Kenya (+254 712 345 678):
VITE_WHATSAPP_NUMBER="254712345678"
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Customization Guide

### How to Change the WhatsApp Number
1. Open `.env.local` (or configure Environment Variables in your hosting dashboard).
2. Set `VITE_WHATSAPP_NUMBER` to your phone number:
   ```env
   VITE_WHATSAPP_NUMBER="2547XXXXXXXX"
   ```
3. Alternatively, you can edit the fallback number in `src/config/site.ts`:
   ```typescript
   export const SITE_CONFIG = {
     whatsapp: {
       number: (import.meta.env.VITE_WHATSAPP_NUMBER || '254712345678').replace(/[^0-9]/g, ''),
     },
     // ...
   };
   ```

### How to Edit or Add Products
All products are configured in a single typed file: `src/data/products.ts`.
To change pricing, add new products, or update sizes:
```typescript
{
  id: 'und-hoodie-01',
  slug: 'undignified-heavyweight-hoodie',
  name: 'Heavyweight Loopback Hoodie',
  category: 'Hoodies',
  price: 2500, // Price in KES
  compareAtPrice: 3200,
  images: ['/src/assets/images/...'],
  sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  colors: [
    { name: 'Bone Off-White', hex: '#F2EEE9' },
    { name: 'Washed Charcoal', hex: '#2A2927' },
  ],
  description: '...',
  details: ['100% natural combed cotton', '480 GSM heavy loopback fleece'],
  tags: ['Hoodie', 'Heavyweight'],
  isNew: true,
  isPopular: true,
  inStock: true,
}
```

### How to Edit Site Copy & Delivery Details
Edit `src/config/site.ts`:
- Brand slogan, tagline, and location
- Hero slide headlines and banners
- Nairobi metro, countrywide courier, and M-Pesa payment cards

---

## Deploying to Vercel

The project includes `vercel.json` pre-configured with a Single Page Application rewrite rule:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Deploy via Vercel CLI
```bash
npm run build
npx vercel
```

### Deploy via GitHub
1. Push repository to GitHub.
2. Import the repository in [vercel.com](https://vercel.com).
3. Framework Preset: **Vite**.
4. In **Environment Variables**, add:
   - `VITE_WHATSAPP_NUMBER`: your WhatsApp recipient number (e.g. `254712345678`).
5. Click **Deploy**.

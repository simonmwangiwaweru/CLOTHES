# UNDIGNIFIED MERCH | Worship Night 2026

> "I will become even more undignified than this." 2 Samuel 6:22

The fundraising storefront for **Undignified Worship Night 2026**, hosted by Redeemed Gospel Church Ruiru on 4th December 2026 (from 6:00 PM, free entry). Supporters buy UNDIGNIFIED clothing to fund the night, or give directly by Paybill. Orders are sent to WhatsApp, with no payment gateway.

---

## Features

- **Event hero**: gold-metal headline, event facts, and a muted looping video (pause button; reduced-motion visitors get a still photo).
- **Partner with us**: the event poster plus Family Bank Paybill details with copy buttons.
- **About us**: why the clothing line exists, in five short points.
- **Shop**: Hoodie, Sweatshirts, Polo Shirts, Round Neck T-Shirts, Caps, Jute Bags A4 and A3, Wrist Bands (KES), with filters, sorting, search, and animated transitions between categories.
- **WhatsApp checkout**: shoppers fill their bag, enter name and phone, and send a pre-formatted order. We confirm availability and collection on WhatsApp, then they pay by Paybill. There is no delivery.
- **How to pay**: three steps plus the payment details.
- **Design system**: black and gold tokens in `src/index.css`; Bebas Neue and Archivo are self-hosted.
- **Accessible**: keyboard-operable cards, dialogs that trap focus, labelled form fields, visible focus rings, reduced-motion support.

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
  images: [IMAGES.hoodieBrown], // add photos in src/data/images.ts; leave [] to show a placeholder
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

### How to Add or Change Photos
Drop the file in `src/assets/images/`, import it in `src/data/images.ts`, then reference it from `src/data/products.ts`. Products with `images: []` show a "Photo coming soon" tile. Currently missing photos: Polo Shirts, Round Neck T-Shirts, Wrist Bands.

### How to Edit Event Details and Payment Info
Everything about the event (date, time, venue, verse) and the payment details (bank, Paybill, account number and title) lives in `src/config/site.ts`. Change it there and every section updates.

### How to Change the Hero Video
Replace `src/assets/video/hero-loop.mp4` (portrait, muted, a few MB) and its still frame `src/assets/video/hero-poster.jpg`.

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

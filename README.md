# UNDIGNIFIED | Streetwear Storefront

> "Wear it loud. Wear it real."

A high-contrast, editorial e-commerce storefront for streetwear brand **UNDIGNIFIED**. Engineered with an exclusive WhatsApp checkout flow that directly formats customer carts into structured WhatsApp messages without third-party payment gateways.

---

## Features

- **Editorial visual direction**: warm bone canvas, Bebas Neue display type over Archivo body text, 1px outlined cards, and a hero headline that sits behind the photo. Every colour, radius and font is a token in `src/index.css`.
- **WhatsApp checkout**: shoppers fill their bag, enter delivery details, and send a pre-formatted order message to your WhatsApp number (`https://wa.me/...`). No payment gateway.
- **Catalog**: Hoodie, Sweatshirts, Polo Shirts, Round Neck T-Shirts, Caps, Jute Bags A4 and A3, Wrist Bands, priced in KES in `src/data/products.ts`.
- **Product modal**: photo gallery, colour, size and quantity, plus a one-tap "Order on WhatsApp".
- **Bag drawer**: saved in `localStorage`, validated delivery form, and prices re-read from the catalog on every visit.
- **Accessible**: keyboard-operable cards, dialogs that trap focus and return it on close, labelled form fields, visible focus rings, and reduced-motion support.

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

### How to Edit Site Copy & Delivery Details
Edit `src/config/site.ts`:
- Brand slogan, tagline, and location
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

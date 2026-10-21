import { Product } from '../types';
import { IMAGES } from './images';

/**
 * The catalog. Every colour is its own product (for example "Navy T-Shirt"), and every
 * product has a price and a photo. Descriptions say only what the photos show.
 */

const APPAREL_SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

const tee = (colour: string, hex: string, image: string, isNew = true): Product => ({
  id: `tee-${colour.toLowerCase()}`,
  slug: `${colour.toLowerCase()}-t-shirt`,
  name: `${colour} T-Shirt`,
  category: 'T-Shirts',
  price: 1000,
  images: [image],
  sizes: APPAREL_SIZES,
  colors: [{ name: colour, hex }],
  description: `${colour} round-neck tee. The UNDIGNIFIED Worship Night print and 2 Samuel 6:22 run down the chest.`,
  details: ['Round neck', 'Short sleeves', 'UNDIGNIFIED · Worship Night chest print', '2 Samuel 6:22'],
  tags: ['T-Shirt', 'Round Neck', colour],
  isNew,
  isPopular: colour === 'White',
  inStock: true,
});

const cap = (colour: string, hex: string, image: string): Product => ({
  id: `cap-${colour.toLowerCase()}`,
  slug: `${colour.toLowerCase()}-cap`,
  name: `${colour} Cap`,
  category: 'Caps',
  price: 1200,
  images: [image],
  sizes: ['One size'],
  colors: [{ name: colour, hex }],
  description: `${colour} curved-brim cap with the UNDIGNIFIED wordmark embroidered on the front.`,
  details: ['Curved brim', 'Embroidered UNDIGNIFIED wordmark'],
  tags: ['Cap', 'Headwear', colour],
  isNew: true,
  isPopular: true,
  inStock: true,
});

export const PRODUCTS: Product[] = [
  {
    id: 'hoodie-brown',
    slug: 'brown-hoodie',
    name: 'Brown Hoodie',
    category: 'Hoodies',
    price: 2500,
    images: [IMAGES.hoodieBrown],
    sizes: APPAREL_SIZES,
    colors: [{ name: 'Brown', hex: '#4A2F27' }],
    description:
      'Brown pullover hoodie with a drawcord hood and kangaroo pocket. The UNDIGNIFIED Worship Night print and 2 Samuel 6:22 run down the chest.',
    details: ['Pullover', 'Drawcord hood', 'Kangaroo pocket', 'UNDIGNIFIED · Worship Night chest print'],
    tags: ['Hoodie', 'Brown'],
    isNew: true,
    isPopular: true,
    inStock: true,
  },
  {
    id: 'hoodie-navy-zip',
    slug: 'navy-zip-hoodie',
    name: 'Navy Zip Hoodie',
    category: 'Hoodies',
    price: 2500,
    images: [IMAGES.zipHoodieTree],
    sizes: APPAREL_SIZES,
    colors: [{ name: 'Navy', hex: '#1B2A41' }],
    description:
      'Navy zip-up hoodie with a drawcord hood and front pockets. The UNDIGNIFIED Worship Night print sits on the chest.',
    details: ['Full zip', 'Drawcord hood', 'Front pockets', 'UNDIGNIFIED · Worship Night chest print'],
    tags: ['Hoodie', 'Zip', 'Navy'],
    isNew: true,
    inStock: true,
  },
  {
    id: 'sweatshirt-black',
    slug: 'black-sweatshirt',
    name: 'Black Sweatshirt',
    category: 'Sweatshirts',
    price: 2000,
    images: [IMAGES.sweatshirtBlack],
    sizes: APPAREL_SIZES,
    colors: [{ name: 'Black', hex: '#1B1A19' }],
    description:
      'Black crew-neck sweatshirt with ribbed collar, cuffs and hem. The UNDIGNIFIED Worship Night print and 2 Samuel 6:22 run down the chest.',
    details: ['Crew neck', 'Ribbed collar, cuffs and hem', 'UNDIGNIFIED · Worship Night chest print', '2 Samuel 6:22'],
    tags: ['Sweatshirt', 'Black'],
    isNew: true,
    isPopular: true,
    inStock: true,
  },
  {
    id: 'polo-white',
    slug: 'white-polo-shirt',
    name: 'White Polo Shirt',
    category: 'Polo Shirts',
    price: 1200,
    images: [IMAGES.poloWhite],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [{ name: 'White', hex: '#F4F4F2' }],
    description:
      'White short-sleeve polo with a button placket and ribbed collar and cuffs. The UNDIGNIFIED Worship Night print sits on the chest.',
    details: ['Button placket', 'Ribbed collar and sleeve cuffs', 'UNDIGNIFIED · Worship Night chest print'],
    tags: ['Polo', 'White'],
    isNew: false,
    inStock: true,
  },
  tee('White', '#F4F4F2', IMAGES.teeWhite),
  tee('Navy', '#1C2A55', IMAGES.teeNavy),
  tee('Olive', '#4A4E3A', IMAGES.teeOlive),
  tee('Grey', '#A9AEB0', IMAGES.teeGrey),
  tee('Maroon', '#7A1F3A', IMAGES.teeMaroon),
  cap('Black', '#1B1A19', IMAGES.capBlack),
  cap('White', '#F4F4F2', IMAGES.capWhite),
  {
    id: 'jute-bag-a4',
    slug: 'jute-bag-a4',
    name: 'Jute Bag A4',
    category: 'Bags',
    price: 800,
    images: [IMAGES.toteOrange],
    sizes: ['A4'],
    colors: [{ name: 'Natural jute', hex: '#D0A878' }],
    description:
      'Natural jute tote with a black printed UNDIGNIFIED panel on the front, black handles and a button closure.',
    details: ['Natural jute', 'Printed UNDIGNIFIED front panel', 'Black handles', 'Button closure'],
    tags: ['Jute Bag', 'A4'],
    isNew: false,
    inStock: true,
  },
  {
    id: 'jute-bag-a3',
    slug: 'jute-bag-a3',
    name: 'Jute Bag A3',
    category: 'Bags',
    price: 1000,
    images: [IMAGES.zipHoodieSteps],
    sizes: ['A3'],
    colors: [{ name: 'Natural jute', hex: '#D0A878' }],
    description:
      'The larger natural jute tote, with a black printed UNDIGNIFIED panel on the front and black handles.',
    details: ['Natural jute', 'Printed UNDIGNIFIED front panel', 'Black handles', 'Larger A3 size'],
    tags: ['Jute Bag', 'A3'],
    isNew: true,
    inStock: true,
  },
];

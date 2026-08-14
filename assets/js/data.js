/* ==========================================================================
   Catalogue
   Single source of truth for navigation, collections and products.
   Collection handles mirror the live Shopify store so links stay portable.
   ========================================================================== */

export const shop = {
  name: 'Multiple Hustles LDN',
  tagline: 'Started with nothing.',
  currency: '£',
  email: 'multiplehustlesldn@yahoo.com',
  phone: '07932 089 884',
  phoneHref: '07932089884',
  location: 'London, UK',
  instagram: 'https://www.instagram.com/multiplehustlesldn/',
  instagramHandle: '@multiplehustlesldn',
  freeShippingThreshold: 100,
  announcements: [
    'Free UK shipping over £100',
    'Limited drops — once it’s gone, it’s gone',
    'Dispatched within 24–48 hours',
    'Worldwide delivery',
  ],
};

export const collections = [
  {
    handle: 'men-wears',
    title: 'Men Wears',
    excerpt: 'Cut clean, built heavy. The uniform for the daily grind.',
    image: 'mh-london-tee-model.jpg',
  },
  {
    handle: 'women-wears',
    title: 'Women Wears',
    excerpt: 'Sharp silhouettes with a relaxed London attitude.',
    image: 'campaign-studio.jpg',
  },
  {
    handle: 'unisex-wears',
    title: 'Unisex Wears',
    excerpt: 'Gender-neutral pieces designed to be worn by anyone.',
    image: 'goat-tee-model.jpg',
  },
  {
    handle: 'mh-ldn-hoodies',
    title: 'MH LDN Hoodies',
    excerpt: 'Heavyweight fleece built to hold its shape.',
    image: 'mh-london-hoodie-model.jpg',
  },
  {
    handle: 'winter-wear',
    title: 'Summer Wears',
    excerpt: 'Lightweight cotton and fleece shorts for the warm months.',
    image: 'property-tee-trio.jpg',
  },
];

/* Curated edit — a hand-picked front-page selection, not a category. */
export const curated = {
  handle: 'you-deserves-more-1',
  title: 'You Deserves More',
  excerpt: 'A hand-picked edit of the pieces that move fastest.',
  image: 'shorts-pink-front.jpg',
  products: [
    'greatest-of-all-time-tee',
    'multiple-hustles-london-tee',
    'multiple-hustles-shorts',
    'property-of-mhl-tee',
  ],
};

const sizesApparel = ['S', 'M', 'L', 'XL', 'XXL'];
const sizesBottoms = ['S', 'M', 'L', 'XL'];

export const products = [
  {
    handle: 'greatest-of-all-time-tee',
    title: 'Greatest Of All Time Tee',
    price: 50,
    badge: 'New arrival',
    collections: ['men-wears', 'unisex-wears', 'winter-wear'],
    images: ['goat-tee-front.jpg', 'goat-tee-back.jpg', 'goat-tee-model.jpg'],
    colors: [{ name: 'Black', hex: '#111111' }],
    sizes: sizesApparel,
    excerpt: 'Three crowned lambs, printed large. Members only.',
    description:
      'The GOAT tee. Three lambs — one thorned, one crowned, one laurelled — rendered in cold blue across the full front of a heavyweight black body, over the Greatest Of All Time lockup and the Multiple Hustles script. Members only, established 2023. Boxy through the body with a dropped shoulder so it sits square.',
    details: [
      '240gsm heavyweight cotton jersey',
      'Boxy fit with a dropped shoulder',
      'Full-front multi-colour print',
      'Limited drop — no restock guaranteed',
    ],
  },
  {
    handle: 'multiple-hustles-london-tee',
    title: 'Multiple Hustles London Tee',
    price: 45,
    badge: 'Best seller',
    collections: ['men-wears', 'unisex-wears'],
    images: ['mh-london-tee-black.jpg', 'mh-london-tee-model.jpg'],
    colors: [{ name: 'Black', hex: '#111111' }],
    sizes: sizesApparel,
    excerpt: 'The stacked collegiate lockup in silver and sky blue.',
    description:
      'MULTIPLE over HUSTLES over LONDON, stacked and locked up in chrome-effect silver with the centre bar picked out in sky blue. Printed large across the chest of a heavyweight black tee and finished with the woven MHL neck label. The one people stop you about.',
    details: [
      '240gsm combed ringspun cotton',
      'Relaxed streetwear fit — true to size',
      'Ribbed collar with taped shoulder seams',
      'Screen printed in the UK',
    ],
  },
  {
    handle: 'property-of-mhl-tee',
    title: 'Property Of MHL Tee',
    price: 42,
    collections: ['men-wears', 'unisex-wears', 'winter-wear'],
    images: ['property-tee-black.jpg', 'property-tee-trio.jpg'],
    colors: [
      { name: 'Black', hex: '#111111' },
      { name: 'Grey Marl', hex: '#9d9d9d' },
      { name: 'White', hex: '#f4f4f4' },
    ],
    sizes: sizesApparel,
    excerpt: 'Small arc chest hit. Three colourways, everyday weight.',
    description:
      'The quiet one. PROPERTY OF MULTIPLE HUSTLES LDN curved small over the left chest — no back print, nothing shouted. Cut a touch longer in the body so it layers cleanly, and offered in the three colourways that go with everything. Ships with the MHL hangtag set.',
    details: [
      '230gsm ringspun cotton',
      'Available in black, grey marl and white',
      'Left-chest print only',
      'Machine wash cold, inside out',
    ],
  },
  {
    handle: 'multiple-hustles-shorts',
    title: 'Multiple Hustles Shorts',
    price: 55,
    collections: ['unisex-wears', 'women-wears', 'winter-wear'],
    images: [
      'shorts-pink-front.jpg',
      'shorts-pink-back.jpg',
      'shorts-grey-front.jpg',
      'shorts-grey-back.jpg',
      'campaign-studio.jpg',
    ],
    colors: [
      { name: 'Pink', hex: '#f0629f' },
      { name: 'Grey Marl', hex: '#d4d4d4' },
    ],
    sizes: sizesBottoms,
    excerpt: 'Long-line fleece shorts with the script down the leg.',
    description:
      'Long-line sweat shorts cut past the knee, with the looped Multiple Hustles script running down the right leg — white on pink, pink on grey. Brushed-back fleece with a covered elastic waist and deep side pockets. The half of the set you will end up wearing most.',
    details: [
      'Brushed-back cotton-rich fleece',
      'Long-line cut, finishing below the knee',
      'Elasticated waist with deep side pockets',
      'Available in pink and grey marl',
    ],
  },
  {
    handle: 'mh-london-hoodie',
    title: 'MH London Hoodie',
    price: 80,
    collections: ['women-wears', 'mh-ldn-hoodies', 'unisex-wears'],
    images: ['mh-london-hoodie-model.jpg'],
    colors: [{ name: 'Black', hex: '#111111' }],
    sizes: sizesApparel,
    excerpt: 'The stacked London lockup on heavyweight fleece.',
    description:
      'The house hoodie carrying the stacked MULTIPLE HUSTLES LONDON lockup in silver and sky blue. Heavyweight brushed-back fleece, double-lined hood, ribbed cuffs and hem that keep their tension. Cut roomy so it layers over a tee without losing its line.',
    details: [
      '380gsm brushed-back cotton fleece',
      'Double-lined hood with flat drawcords',
      'Ribbed cuffs and hem',
      'Wash inside out on a cold cycle',
    ],
  },
  {
    handle: 'hustle-baby-crop-tee',
    title: 'Hustle Baby Crop Tee',
    price: 40,
    collections: ['women-wears', 'winter-wear'],
    images: ['campaign-studio.jpg'],
    colors: [
      { name: 'Black', hex: '#111111' },
      { name: 'White', hex: '#f4f4f4' },
    ],
    sizes: sizesApparel,
    excerpt: 'Airbrushed graphic on a cropped body. Pairs with the shorts.',
    description:
      'A cropped short sleeve carrying the airbrushed Hustle Baby character in pink and chrome — cap, milkshake, hearts and all. Cut short through the body to sit at the waist, and built to pair with the Multiple Hustles shorts in either colourway.',
    details: [
      '220gsm soft-touch cotton',
      'Cropped body with a standard sleeve',
      'Available in black and white',
      'Pairs with the Multiple Hustles shorts',
    ],
  },
];

/* ---------------------------------------------------------------- helpers */

export const money = (amount) =>
  `${shop.currency}${Number(amount).toLocaleString('en-GB', {
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;

export const getProduct = (handle) => products.find((p) => p.handle === handle);

export const getCollection = (handle) =>
  handle === curated.handle ? curated : collections.find((c) => c.handle === handle);

export const productsIn = (handle) => {
  if (handle === 'all' || !handle) return products;
  if (handle === curated.handle) return curated.products.map(getProduct).filter(Boolean);
  return products.filter((p) => p.collections.includes(handle));
};

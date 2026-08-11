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
    image: 'tee-mhldn-black.jpg',
  },
  {
    handle: 'women-wears',
    title: 'Women Wears',
    excerpt: 'Sharp silhouettes with a relaxed London attitude.',
    image: 'tee-arc-white-model.jpg',
  },
  {
    handle: 'unisex-wears',
    title: 'Unisex Wears',
    excerpt: 'Gender-neutral pieces designed to be worn by anyone.',
    image: 'tracksuit-lifestyle.jpg',
  },
  {
    handle: 'mh-ldn-hoodies',
    title: 'MH LDN Hoodies',
    excerpt: 'Heavyweight fleece and puff print that holds its shape.',
    image: 'crewneck-puff-pair.jpg',
  },
  {
    handle: 'winter-wear',
    title: 'Summer Wears',
    excerpt: 'Lightweight cotton in the full colour run.',
    image: 'tees-flatlay.jpg',
  },
  {
    handle: 'you-deserves-more',
    title: 'Cross Bag',
    excerpt: 'Carry light. Move quiet.',
    image: 'cross-bag-black.jpg',
  },
];

/* Curated edit — a hand-picked front-page selection, not a category. */
export const curated = {
  handle: 'you-deserves-more-1',
  title: 'You Deserves More',
  excerpt: 'A hand-picked edit of the pieces that move fastest.',
  products: [
    'mh-ldn-short-sleeve-og-tshirt',
    'puff-print-tracksuit',
    'short-sleeve-multiple-hustles-ldn-tee',
    'black-multiple-hustles-cross-bag',
  ],
};

const sizesApparel = ['S', 'M', 'L', 'XL', 'XXL'];
const sizesBottoms = ['S', 'M', 'L', 'XL'];

export const products = [
  {
    handle: 'mh-ldn-short-sleeve-og-tshirt',
    title: 'MH LDN Short Sleeve OG T-Shirt',
    price: 45,
    badge: 'New arrival',
    collections: ['men-wears', 'unisex-wears', 'winter-wear'],
    images: ['tee-mhldn-black.jpg', 'new-arrival-drop.jpg'],
    colors: [
      { name: 'Black', hex: '#111111' },
      { name: 'White', hex: '#f4f4f4' },
    ],
    sizes: sizesApparel,
    excerpt: 'The original. Gothic MHLDN arc across the chest on heavyweight cotton.',
    description:
      'The piece that started it. A boxy, heavyweight short sleeve carrying the gothic MHLDN arc and the STARTED WITH NOTHING mark, printed with a soft-hand finish that sits in the fabric rather than on top of it. Pre-shrunk, garment-washed and cut with a relaxed body so it holds its shape wash after wash.',
    details: [
      '240gsm combed ringspun cotton',
      'Relaxed streetwear fit — true to size',
      'Ribbed collar with taped shoulder seams',
      'Screen printed in the UK',
    ],
  },
  {
    handle: 'mhldn-angel-long-sleeve-tee',
    title: 'MHLDN Angel Long Sleeve Tee',
    price: 55,
    collections: ['men-wears', 'unisex-wears'],
    images: ['tee-angel-longsleeve.jpg', 'packaging-detail.jpg'],
    colors: [{ name: 'Black', hex: '#111111' }],
    sizes: sizesApparel,
    excerpt: 'Dreamers only. Full-front angel graphic in oxblood and bone.',
    description:
      'A long sleeve built around a single full-front statement: the renaissance angel, marked and stripped back, framed by the gothic MHLDN wordmark in oxblood. Dreamers only — printed on a heavyweight black body with a longer sleeve and a straight hem.',
    details: [
      '260gsm heavyweight cotton jersey',
      'Oversized body with dropped shoulder',
      'Multi-layer discharge print',
      'Limited drop — no restock guaranteed',
    ],
  },
  {
    handle: 'multiple-hustles-ldn-arc-tee',
    title: 'Multiple Hustles LDN Arc Tee',
    price: 42,
    collections: ['men-wears', 'unisex-wears', 'winter-wear'],
    images: ['tees-flatlay.jpg', 'tee-arc-white-model.jpg'],
    colors: [
      { name: 'Lilac', hex: '#8f8ec4' },
      { name: 'Red', hex: '#d8291c' },
      { name: 'Ice Blue', hex: '#b9e6ea' },
      { name: 'Royal Blue', hex: '#1f43a8' },
      { name: 'Yellow', hex: '#f5c518' },
    ],
    sizes: sizesApparel,
    excerpt: 'The full colour run. Arc logo in high-opacity white.',
    description:
      'The arc tee in the full seasonal colour run. A clean collegiate curve reading MULTIPLE HUSTLES LDN across the chest, printed in high-opacity white on soft cotton. Wear it loud or layer it under the tracksuit.',
    details: [
      '220gsm soft-touch cotton',
      'Available in five colourways',
      'Regular fit with a slightly dropped shoulder',
      'Woven neck label and hem tag',
    ],
  },
  {
    handle: 'short-sleeve-multiple-hustles-ldn-tee',
    title: 'Short Sleeve Multiple Hustles LDN Tee',
    price: 45,
    collections: ['women-wears', 'unisex-wears'],
    images: ['tee-arc-white-model.jpg', 'tees-flatlay.jpg'],
    colors: [
      { name: 'White', hex: '#f4f4f4' },
      { name: 'Black', hex: '#111111' },
    ],
    sizes: sizesApparel,
    excerpt: 'Bold block logo, clean white body, everyday weight.',
    description:
      'A stripped-back short sleeve with the block MULTIPLE HUSTLES lockup printed large across the chest. Cut a touch longer in the body so it sits well over denim or cargos, in a weight you can wear from morning meetings to the evening move.',
    details: [
      '230gsm ringspun cotton',
      'True to size with a relaxed drape',
      'Reinforced double-stitched hem',
      'Machine wash cold, inside out',
    ],
  },
  {
    handle: 'pre-order-purple-white-arc-summer-tee',
    title: 'Pre-Order Purple White Arc Summer Tee',
    price: 45,
    badge: 'Pre-order',
    collections: ['women-wears', 'winter-wear'],
    images: ['campaign-drop.jpg', 'tees-flatlay.jpg'],
    colors: [
      { name: 'Lilac', hex: '#c9a6dd' },
      { name: 'White', hex: '#f4f4f4' },
    ],
    sizes: sizesApparel,
    excerpt: 'The summer drop. Pre-order now, dispatched on release.',
    description:
      'The summer arc in lilac and white. Pre-order secures your size ahead of the public drop — orders are dispatched the day the collection releases, in order of purchase. Once the run is allocated, pre-orders close.',
    details: [
      '220gsm soft-touch cotton',
      'Pre-order — dispatched on release day',
      'Allocated in order of purchase',
      'Limited run',
    ],
  },
  {
    handle: 'puff-print-crewneck-sweatshirt',
    title: 'Puff Print Crewneck Sweatshirt',
    price: 75,
    collections: ['mh-ldn-hoodies', 'unisex-wears'],
    images: ['crewneck-puff-pair.jpg', 'tracksuit-lifestyle.jpg'],
    colors: [
      { name: 'Ice Blue', hex: '#cfe3ee' },
      { name: 'Black', hex: '#111111' },
    ],
    sizes: sizesApparel,
    excerpt: 'Raised puff MULTIPLE lockup on brushed-back fleece.',
    description:
      'Heavyweight brushed-back fleece carrying the MULTIPLE arc in raised puff print. Substantial without being stiff, with ribbed cuffs and hem that keep their tension. The kind of piece you reach for first and it still looks right two winters in.',
    details: [
      '380gsm brushed-back cotton fleece',
      'Raised puff print — do not iron directly',
      'Ribbed cuffs, hem and neckline',
      'Wash inside out on a cold cycle',
    ],
  },
  {
    handle: 'puff-print-tracksuit',
    title: 'Puff Print Tracksuit',
    price: 120,
    badge: 'Best seller',
    collections: ['mh-ldn-hoodies', 'unisex-wears'],
    images: ['tracksuit-turquoise.jpg', 'tracksuit-lifestyle.jpg'],
    colors: [
      { name: 'Turquoise', hex: '#2fb6a8' },
      { name: 'Grey Marl', hex: '#9d9d9d' },
    ],
    sizes: sizesApparel,
    excerpt: 'Hoodie and jogger set. Heavy — in a good way.',
    description:
      'The full set: hooded top and matching jogger in heavyweight brushed fleece, finished with the circular puff-print emblem on the chest and thigh. Cut generously through the body and leg for a relaxed line that still reads sharp. Sold as a two-piece.',
    details: [
      'Two-piece set — hoodie and jogger',
      '380gsm brushed-back cotton fleece',
      'Elasticated waist with drawcord',
      'Does not lose shape after washing',
    ],
  },
  {
    handle: 'straight-leg-set',
    title: 'Straight Leg Set',
    price: 110,
    collections: ['unisex-wears', 'mh-ldn-hoodies'],
    images: ['straight-leg-grey.jpg', 'tracksuit-lifestyle.jpg'],
    colors: [
      { name: 'Grey Marl', hex: '#9d9d9d' },
      { name: 'Turquoise', hex: '#2fb6a8' },
    ],
    sizes: sizesBottoms,
    excerpt: 'A true unisex cut. Comfortable for the grind, sharp for the meet.',
    description:
      'Our straight leg set drops the taper for a clean, uninterrupted line from hip to hem. Genuinely unisex — sized to sit correctly on any frame, comfortable enough for the grind and sharp enough for the meet.',
    details: [
      'Straight leg, no taper',
      'Brushed-back cotton-rich fleece',
      'Unisex sizing — stick to your usual size',
      'Matching top sold within the set',
    ],
  },
  {
    handle: 'mh-ldn-cropped-hoodie',
    title: 'MH LDN Cropped Hoodie',
    price: 70,
    collections: ['women-wears', 'mh-ldn-hoodies', 'unisex-wears'],
    images: ['cropped-hoodie-turquoise.jpg', 'tracksuit-lifestyle.jpg'],
    colors: [
      { name: 'Turquoise', hex: '#2fb6a8' },
      { name: 'Grey Marl', hex: '#9d9d9d' },
    ],
    sizes: sizesBottoms,
    excerpt: 'Cropped body, full hood, same heavyweight fleece.',
    description:
      'The cropped cut of the house hoodie — shortened through the body, unchanged everywhere else. Same 380gsm fleece, same puff emblem, same double-lined hood. Built to pair with the matching jogger or to sit over the straight leg set.',
    details: [
      'Cropped body with a full double-lined hood',
      '380gsm brushed-back cotton fleece',
      'Raised puff-print emblem',
      'Pairs with the matching jogger',
    ],
  },
  {
    handle: 'mh-ldn-essential-jogger',
    title: 'MH LDN Essential Jogger',
    price: 65,
    collections: ['unisex-wears', 'mh-ldn-hoodies'],
    images: ['jogger-grey.jpg', 'tracksuit-lifestyle.jpg'],
    colors: [
      { name: 'Grey Marl', hex: '#9d9d9d' },
      { name: 'Turquoise', hex: '#2fb6a8' },
      { name: 'Black', hex: '#111111' },
    ],
    sizes: sizesBottoms,
    excerpt: 'The base layer of the whole wardrobe.',
    description:
      'The jogger that anchors everything else. Heavyweight fleece, deep side pockets, a drawcord waist that actually holds, and the puff emblem on the thigh. Wear it with the matching hoodie or break the set with a tee.',
    details: [
      '380gsm brushed-back cotton fleece',
      'Deep side pockets with a secure back pocket',
      'Elasticated cuff and drawcord waist',
      'Sold separately from the hoodie',
    ],
  },
  {
    handle: 'black-multiple-hustles-cross-bag',
    title: 'Black Multiple Hustles Cross Bag',
    price: 35,
    collections: ['you-deserves-more', 'unisex-wears'],
    images: ['cross-bag-black.jpg', 'packaging-detail.jpg'],
    colors: [{ name: 'Black', hex: '#111111' }],
    sizes: ['One size'],
    excerpt: 'Twin-pouch crossbody with a metal quick-release buckle.',
    description:
      'A twin-pouch crossbody in matte black technical twill: one main compartment, one chest pouch, both zipped. Webbing strap with a metal quick-release buckle, adjustable to sit high on the chest or low across the hip. Carry light, move quiet.',
    details: [
      'Water-resistant technical twill',
      'Two zipped compartments',
      'Metal quick-release buckle',
      'Fully adjustable webbing strap',
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

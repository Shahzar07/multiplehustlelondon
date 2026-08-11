# Multiple Hustles LDN

A full redesign of [multiplehustlesldn.online](https://multiplehustlesldn.online/) as a premium,
editorial storefront. The brand content — copy, policies, products, contact details — is carried
over from the existing site; the design language is rebuilt from the ground up.

Static HTML, CSS and ES modules. No build step, no framework, no runtime dependencies.

## Running it

Any static file server will do. ES modules need HTTP (opening `index.html` over `file://`
will not work):

```sh
python3 -m http.server 4321
# → http://localhost:4321
```

Deploying is a straight upload of the repository root to Netlify, Vercel, Cloudflare Pages,
GitHub Pages or any static host.

## Layout

```
index.html              Home — hero slideshow, categories, featured rails, editorial, testimonials
collections.html        All collections
collection.html?c=…     Collection listing with filters and sorting
product.html?p=…        Product detail with variant picker
about.html              Story and brand vision
faqs.html               FAQs
shipping-returns.html   Shipping and returns policy
terms.html              Terms and conditions
privacy.html            Privacy policy
contact.html            Contact form and details
404.html                Not found

assets/css/theme.css    The whole design system — tokens, components, layout
assets/js/data.js       Catalogue: shop details, collections, products
assets/js/site.js       Shell: header, footer, drawers, cart, search, motion
assets/js/home.js       Home page rails
assets/js/collection.js Collection listing
assets/js/product.js    Product detail
assets/js/contact.js    Contact form
assets/fonts/           Self-hosted Crimson Pro + Barlow (woff2, latin subsets)
assets/img/             Product and campaign photography
tools/build-pages.py    Regenerates the pages that share a document shell
```

Header and footer are injected by `site.js` from a single definition so the navigation only
lives in one place. Page content itself is real HTML in each file.

## Design system

Everything is driven by custom properties at the top of `assets/css/theme.css`.

| | |
|---|---|
| Display type | Crimson Pro 700 |
| Body type | Barlow 500, small sizes, wide tracking on labels |
| Ground | `#FFFDFA` warm paper |
| Ink | `#000` / `#1A1A1A` |
| Accent | `#F0C417` gold |
| Cards | `#F8F8F8` |
| Radii | `1.5rem` blocks, `3.75rem` pill buttons |
| Shadow | `0 18px 50px rgb(0 0 0 / 0.1)` |
| Container | `1700px`, `1450px` narrow, `780px` reading |

To restyle the site, change the tokens — not the components.

## Editing the catalogue

Products and collections live in `assets/js/data.js`. A product looks like this:

```js
{
  handle: 'mh-ldn-short-sleeve-og-tshirt',   // used in product.html?p=<handle>
  title: 'MH LDN Short Sleeve OG T-Shirt',
  price: 45,
  badge: 'New arrival',                       // optional
  collections: ['men-wears', 'unisex-wears'], // collection handles
  images: ['tee-mhldn-black.png', '…'],       // first is the card image, second the hover
  colors: [{ name: 'Black', hex: '#111111' }],
  sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  excerpt: '…',      // one line, used in search and meta description
  description: '…',  // product page body
  details: ['…'],    // bullet list in the Details accordion
}
```

Collection handles match the handles on the live Shopify store, so links stay portable if the
catalogue is later served from Shopify.

## Regenerating pages

`collections`, `collection`, `product`, `about`, `faqs`, `shipping-returns`, `terms`, `privacy`,
`contact` and `404` share one document shell. Edit the page body in `tools/build-pages.py`, then:

```sh
python3 tools/build-pages.py
```

`index.html` is authored by hand and is never touched by the script.

## Not wired up yet

These need a backend or a third-party service before launch:

- **Checkout.** The cart is real — it persists to `localStorage`, updates quantities and totals,
  and tracks the free-shipping threshold — but the Checkout button links to the contact page.
  Point it at Shopify checkout or a payment provider.
- **Newsletter.** The form validates and confirms, but posts nowhere.
- **Contact form.** Falls back to opening the visitor's mail client via `mailto:`.
- **Prices.** Carried over as GBP figures consistent with the site's stated policies
  (free shipping over £100). Confirm against real pricing before launch.

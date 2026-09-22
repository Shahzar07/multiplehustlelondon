# Multiple Hustles LDN — Shopify theme

An Online Store 2.0 theme carrying the Multiple Hustles LDN design language:
warm paper ground, serif display type, tight sans utility type, pill actions,
and a white product grid built to the client's dreamisfree reference.

## Installing from GitHub

Shopify reads a theme from the **root of a branch**, so this branch contains the
theme and nothing else. The static marketing site lives on
`claude/add-product-images-references-9psgcl`.

1. Shopify admin → **Online Store → Themes**
2. **Add theme → Connect from GitHub**
3. Pick this repository and the **`claude/shopify-theme`** branch
4. Shopify validates the structure, adds it as an unpublished theme, and keeps
   syncing on every push to that branch

## Structure

```
layout/theme.liquid        Document shell, @font-face, header/footer/drawers
templates/*.json           OS 2.0 templates — sections are editable in the customizer
sections/main-*.liquid     Template bodies (product, collection, cart, search…)
sections/*.liquid          Homepage sections, all with presets
snippets/product-card.*    The white-tile card used by every product grid
assets/theme.css           The whole design system
assets/theme.js            Drawers, hero, reveals, variant picker, AJAX cart
config/settings_schema.*   Theme settings (brand, colours, shipping threshold)
locales/en.default.json    All UI copy
```

`assets/` is flat — Shopify does not allow nested asset folders, so the fonts and
images sit alongside the CSS and JS and are referenced through `asset_url`.

## After you connect it

The theme renders **your Shopify catalogue** — a theme cannot carry products in
code. Once connected:

1. **Create the products** in Products → Add product. Give each a `Colour` and a
   `Size` option so the variant pickers appear; the swatch fills from the colour
   name, so use plain names (`Black`, `Pink`, `Grey Marl`).
2. **Upload the photography** to each product. The card shows the first image and
   swaps to the second on hover, so set the packshot first and the back or
   lifestyle shot second. The image files are in `assets/` on this branch and in
   `assets/img/` on the site branch.
3. **Create the collections** and assign products. Handles used by the old site:
   `men-wears`, `women-wears`, `unisex-wears`, `mh-ldn-hoodies`, `winter-wear`.
4. **Point the sections at them** in the theme customizer — the homepage hero,
   collection list, featured collection and editorial banner all take images and
   collections as settings rather than hardcoding them.
5. **Set the menus** — Navigation → `main-menu` and `footer`. The header, drawer
   and footer columns all read from those.

## Product → image map

| Product | Images, in order |
| --- | --- |
| Greatest Of All Time Tee | `goat-tee-front`, `goat-tee-back`, `goat-tee-model` |
| Multiple Hustles London Tee | `mh-london-tee-black`, `mh-london-tee-model` |
| Property Of MHL Tee | `property-tee-black`, `property-tee-trio` |
| Multiple Hustles Shorts | `shorts-pink-front`, `shorts-pink-back`, `shorts-grey-front`, `shorts-grey-back`, `campaign-studio` |
| MH London Hoodie | `mh-london-hoodie-model` |
| Hustle Baby Crop Tee | `campaign-studio` |

Suggested hero images: slide 1 `goat-tee-model`, slide 2 `mh-london-tee-model`.
Editorial banner: `mh-london-hoodie-model` at focal point 50% / 18%.

## Validation

`@shopify/theme-check-node` reports **0 offenses** across the theme.

```bash
npm install --no-save @shopify/theme-check-node
node -e "import('@shopify/theme-check-node').then(async m => {
  const { offenses } = await m.themeCheckRun(process.cwd());
  console.log('offenses:', offenses.length);
})"
```

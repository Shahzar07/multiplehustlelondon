# Client references

Screenshots supplied by the client alongside the product photography. These are
direction, not site assets — nothing in here is served from the storefront.

| File | What the client said | How it was applied |
| --- | --- | --- |
| `01-open-page-goat.jpeg` | “This is one for the open page” — with the GOAT tee street shot | `goat-tee-model.jpg` is the first hero slide on `index.html` |
| `02-also-this-mh-london.jpeg` | “Also this” — the Multiple Hustles London tee worn on the street | `mh-london-tee-model.jpg` is the second hero slide |
| `03-tshirts-coming-soon.jpeg` | “And the T-shirts come / Coming soon” — shows a **white** Multiple Hustles London tee | Not yet live: only a low-res screenshot exists, no usable photo. See Outstanding below. |
| `04-goat-and-property-tees.jpeg` | GOAT tee and Property Of MHL tee packshots | Both are live products with their own pages |
| `05-keep-page-simple.jpeg` | “This as well **I don’t want the page to be busy just simply**” | Hero cut from three slides to two; the catalogue is six real products rather than a padded grid |
| `06-white-product-grid-note.jpeg` | “I want the it like the white where the product it” | Product cards now sit on white — see below |
| `07-dreamisfree-reference.jpeg` | dreamisfree.com product grid, used as the visual reference | Card treatment modelled on it: white tile, product centred, name + price beneath |

## The white product grid

`.product-card__media` is white with a hairline inset border. Every packshot was
padded out to the same 3:4 frame **using its own studio backdrop colour**, so the
photo meets the card edge with no letterbox and no crop into the garment.

One caveat: the tees were shot on white (`#ffffff`), the shorts on a mid grey
(`#d5d5d5`–`#e7e7e7`). Removing the grey backdrop programmatically was attempted
and rejected — the grey marl garment is *brighter* (up to luminance 245) than its
own background (213–231), so both a luminance threshold and an edge flood-fill ate
into the garment. The shorts therefore keep their grey studio backdrop. It reads as
a studio shot rather than a bug, but if perfectly uniform white tiles are wanted,
the shorts need re-shooting or masking on white.

## Outstanding

- **White Multiple Hustles London tee** — client says “coming soon”. Only exists as
  a 379×476 WhatsApp screenshot, too small for a product image. Needs a real photo,
  then add `White` to the `multiple-hustles-london-tee` colours.
- **Hustle Baby Crop Tee** — currently uses the studio campaign frame
  (`campaign-studio.jpg`), which shows both colourways worn but is not a dedicated
  packshot. A flat front/back shot would bring it in line with the other products.
- **MH London Hoodie** — only the street shot exists; no packshot.

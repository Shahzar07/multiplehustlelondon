/* Collection page — resolves ?c=<handle>, then renders the grid with sorting. */

import { collections, curated, getCollection, productsIn } from './data.js';
import { productCard, observeReveals } from './site.js';

const params = new URLSearchParams(window.location.search);
const handle = params.get('c') || 'all';

const allCollection = {
  handle: 'all',
  title: 'Shop All',
  excerpt: 'Every piece in the current range — tees, fleece, sets and accessories.',
};

const collection = handle === 'all' ? allCollection : getCollection(handle);

const sorters = {
  featured: null,
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  'title-asc': (a, b) => a.title.localeCompare(b.title),
};

function render(sort = 'featured') {
  const grid = document.querySelector('[data-product-grid]');
  if (!grid) return;

  // An unknown handle must not quietly fall back to the whole catalogue.
  let items = collection ? productsIn(collection.handle) : [];
  const sorter = sorters[sort];
  if (sorter) items = [...items].sort(sorter);

  grid.innerHTML = items.length
    ? items.map((p, i) => productCard(p, { eager: i < 4 })).join('')
    : `<div class="empty-state" style="grid-column:1/-1">
         <p class="lede">${collection ? 'Nothing in this collection yet.' : 'That collection has moved or no longer exists.'}</p>
         <a class="btn btn--outline" href="collection.html?c=all" style="margin-top:var(--space-5)">Shop all</a>
       </div>`;

  const count = document.querySelector('[data-product-count]');
  if (count) count.textContent = `${items.length} ${items.length === 1 ? 'piece' : 'pieces'}`;

  observeReveals(grid);
}

document.addEventListener('DOMContentLoaded', () => {
  const title = collection ? collection.title : 'Collection not found';
  const excerpt = collection ? collection.excerpt : 'That collection has moved or no longer exists.';

  document.title = `${title} — Multiple Hustles LDN`;
  const heading = document.querySelector('[data-collection-title]');
  if (heading) heading.textContent = title;
  const intro = document.querySelector('[data-collection-excerpt]');
  if (intro) intro.textContent = excerpt;
  const crumb = document.querySelector('[data-collection-crumb]');
  if (crumb) crumb.textContent = title;

  // Sibling collections double as filters, so the whole range stays one click away.
  const pills = document.querySelector('[data-filter-pills]');
  if (pills) {
    const entries = [allCollection, ...collections, curated];
    pills.innerHTML = entries
      .map(
        (c) =>
          `<a class="filter-pill" href="collection.html?c=${c.handle}"${
            c.handle === handle ? ' aria-pressed="true"' : ''
          }>${c.title}</a>`
      )
      .join('');
  }

  const sortSelect = document.querySelector('[data-sort]');
  sortSelect?.addEventListener('change', (event) => render(event.target.value));

  render();
});

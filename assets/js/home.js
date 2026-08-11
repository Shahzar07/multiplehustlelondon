/* Homepage — renders the collection lists and the two featured product rails. */

import { collections, curated, productsIn } from './data.js';
import { productCard, observeReveals, icon } from './site.js';

const mount = (selector, html) => {
  const el = document.querySelector(selector);
  if (el) el.innerHTML = html;
};

const collectionCard = (collection, { wide = false, eager = false } = {}) => `
  <a class="collection-card${wide ? ' collection-card--wide' : ''}" href="collection.html?c=${collection.handle}" data-reveal>
    <span class="collection-card__media">
      <img src="assets/img/${collection.image}" alt="" loading="${eager ? 'eager' : 'lazy'}" width="900" height="1200">
    </span>
    <span class="collection-card__body">
      <span class="collection-card__title">${collection.title}</span>
      <span class="collection-card__cta">View Collection ${icon.arrow}</span>
    </span>
  </a>`;

document.addEventListener('DOMContentLoaded', () => {
  mount(
    '[data-collection-list]',
    collections.map((c, i) => collectionCard(c, { eager: i < 3 })).join('')
  );

  mount(
    '[data-featured-new]',
    productsIn('all').slice(0, 4).map((p, i) => productCard(p, { eager: i < 2 })).join('')
  );

  mount(
    '[data-featured-curated]',
    curated.products.map((h) => productsIn('all').find((p) => p.handle === h)).filter(Boolean).map((p) => productCard(p)).join('')
  );

  observeReveals();
});

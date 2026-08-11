/* Collections index — every category plus the curated edit, as wide cards. */

import { collections, curated, productsIn } from './data.js';
import { observeReveals, icon } from './site.js';

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('[data-all-collections]');
  if (!grid) return;

  const entries = [...collections, { ...curated, image: 'packaging-detail.jpg' }];

  grid.innerHTML = entries
    .map((c, i) => {
      const count = productsIn(c.handle).length;
      return `
      <a class="collection-card collection-card--wide" href="collection.html?c=${c.handle}" data-reveal>
        <span class="collection-card__media">
          <img src="assets/img/${c.image}" alt="" loading="${i < 2 ? 'eager' : 'lazy'}" width="1200" height="900">
        </span>
        <span class="collection-card__body">
          <span class="collection-card__title">${c.title}</span>
          <span class="collection-card__cta">${count} ${count === 1 ? 'piece' : 'pieces'} ${icon.arrow}</span>
        </span>
      </a>`;
    })
    .join('');

  observeReveals(grid);
});

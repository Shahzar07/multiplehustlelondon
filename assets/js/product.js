/* Product page — resolves ?p=<handle> and wires the variant picker. */

import { getProduct, products, money, shop } from './data.js';
import { productCard, observeReveals, addToCart, openDrawer } from './site.js';

const params = new URLSearchParams(window.location.search);
const product = getProduct(params.get('p'));

const selection = { color: null, size: null };

const esc = (str) =>
  String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function renderNotFound() {
  const main = document.querySelector('[data-product-root]');
  if (!main) return;
  main.innerHTML = `
    <div class="container">
      <div class="empty-state">
        <p class="eyebrow">404</p>
        <h1 class="display-md" style="margin-block:var(--space-4)">Piece not found</h1>
        <p class="lede">That product has moved or sold out of the drop.</p>
        <a class="btn" href="collection.html?c=all" style="margin-top:var(--space-6)">Continue shopping</a>
      </div>
    </div>`;
}

function renderProduct() {
  document.title = `${product.title} — Multiple Hustles LDN`;
  document.querySelector('meta[name="description"]')?.setAttribute('content', product.excerpt);

  selection.color = product.colors[0].name;
  selection.size = product.sizes[0];

  const crumb = document.querySelector('[data-product-crumb]');
  if (crumb) crumb.textContent = product.title;

  const gallery = document.querySelector('[data-product-gallery]');
  if (gallery) {
    gallery.innerHTML = product.images
      .map(
        (file, i) =>
          `<figure class="product__figure">
             <img src="assets/img/${file}" alt="${esc(product.title)}${i ? ' — detail' : ''}"
                  width="1200" height="1500" ${i ? 'loading="lazy"' : 'fetchpriority="high"'}>
           </figure>`
      )
      .join('');
  }

  const info = document.querySelector('[data-product-info]');
  if (!info) return;

  const colorOptions = product.colors
    .map(
      (c, i) =>
        `<button class="option-btn option-swatch" type="button" data-option="color" data-value="${esc(c.name)}"
                 style="--swatch:${c.hex};background:${c.hex}"
                 aria-pressed="${i === 0}" aria-label="${esc(c.name)}" title="${esc(c.name)}"></button>`
    )
    .join('');

  const sizeOptions = product.sizes
    .map(
      (s, i) =>
        `<button class="option-btn" type="button" data-option="size" data-value="${esc(s)}"
                 aria-pressed="${i === 0}">${esc(s)}</button>`
    )
    .join('');

  info.innerHTML = `
    <p class="eyebrow">${product.badge ? esc(product.badge) : 'Multiple Hustles LDN'}</p>
    <h1 class="product__title">${esc(product.title)}</h1>
    <p class="product__price">${money(product.price)}</p>
    <p class="product__desc">${esc(product.description)}</p>

    <div class="option-group">
      <div class="option-group__label">
        <span>Colour</span>
        <span class="option-group__value" data-value-for="color">${esc(selection.color)}</span>
      </div>
      <div class="option-list">${colorOptions}</div>
    </div>

    <div class="option-group">
      <div class="option-group__label">
        <span>Size</span>
        <span class="option-group__value" data-value-for="size">${esc(selection.size)}</span>
      </div>
      <div class="option-list">${sizeOptions}</div>
    </div>

    <div class="product__actions">
      <button class="btn btn--full" type="button" data-add-to-cart>Add to bag &mdash; ${money(product.price)}</button>
      <a class="btn btn--outline btn--full" href="collection.html?c=all">Continue shopping</a>
    </div>

    <div class="accordion" data-accordion>
      <div class="accordion__item">
        <button class="accordion__trigger" type="button" aria-expanded="true">
          Details <span class="accordion__icon" aria-hidden="true"></span>
        </button>
        <div class="accordion__panel"><div>
          <div class="rte"><ul>${product.details
            .map((d) => `<li>${esc(d)}</li>`)
            .join('')}</ul></div>
        </div></div>
      </div>
      <div class="accordion__item">
        <button class="accordion__trigger" type="button" aria-expanded="false">
          Shipping &amp; Returns <span class="accordion__icon" aria-hidden="true"></span>
        </button>
        <div class="accordion__panel"><div>
          <div class="rte">
            <p>Dispatched within 24&ndash;48 hours. UK delivery 2&ndash;5 working days, international 5&ndash;10 working days. Free UK shipping on orders over ${money(
              shop.freeShippingThreshold
            )}.</p>
            <p>14-day returns on unworn items with tags and packaging intact. <a href="shipping-returns.html">Full policy</a>.</p>
          </div>
        </div></div>
      </div>
      <div class="accordion__item">
        <button class="accordion__trigger" type="button" aria-expanded="false">
          Care <span class="accordion__icon" aria-hidden="true"></span>
        </button>
        <div class="accordion__panel"><div>
          <div class="rte">
            <p>Wash inside out on a cold cycle and air dry. Do not iron directly over the puff print or logos &mdash; it preserves the raised finish.</p>
          </div>
        </div></div>
      </div>
    </div>`;

  // Related — same category first, falling back to the wider range.
  const related = products
    .filter((p) => p.handle !== product.handle && p.collections.some((c) => product.collections.includes(c)))
    .concat(products.filter((p) => p.handle !== product.handle))
    .filter((p, i, arr) => arr.findIndex((x) => x.handle === p.handle) === i)
    .slice(0, 4);

  const relatedGrid = document.querySelector('[data-related]');
  if (relatedGrid) relatedGrid.innerHTML = related.map((p) => productCard(p)).join('');
}

function bind() {
  document.addEventListener('click', (event) => {
    const option = event.target.closest('[data-option]');
    if (option) {
      const { option: kind, value } = option.dataset;
      selection[kind] = value;
      document
        .querySelectorAll(`[data-option="${kind}"]`)
        .forEach((btn) => btn.setAttribute('aria-pressed', String(btn === option)));
      const label = document.querySelector(`[data-value-for="${kind}"]`);
      if (label) label.textContent = value;
      return;
    }

    if (event.target.closest('[data-add-to-cart]')) {
      addToCart({ handle: product.handle, color: selection.color, size: selection.size });
      openDrawer('cart');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (!product) {
    renderNotFound();
    return;
  }
  renderProduct();
  bind();
  observeReveals();
});

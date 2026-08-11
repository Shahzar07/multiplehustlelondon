/* ==========================================================================
   Site shell — header, footer, drawers, cart, search and motion.
   Imported by every page.
   ========================================================================== */

import { shop, collections, curated, products, money, getProduct } from './data.js';

/* ------------------------------------------------------------------ icons */

export const icon = {
  search:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  bag:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6 7h12l1 13H5L6 7Z"/><path d="M9 7V5.5a3 3 0 0 1 6 0V7"/></svg>',
  menu:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  close:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  chevron:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>',
  arrow:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  star:
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="m12 2 2.9 6.2 6.6.9-4.8 4.7 1.2 6.7L12 17.3 6.1 20.5l1.2-6.7L2.5 9.1l6.6-.9L12 2Z"/></svg>',
  instagram:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
  mail:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
  truck:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="1.8"/><circle cx="17.5" cy="18" r="1.8"/></svg>',
  shield:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M12 3l7 3v6c0 4.2-2.9 7.6-7 9-4.1-1.4-7-4.8-7-9V6l7-3Z"/><path d="m9 12 2 2 4-4"/></svg>',
  refresh:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M20 12a8 8 0 1 1-2.6-5.9"/><path d="M20 4v4h-4"/></svg>',
  globe:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3Z"/></svg>',
};

/* --------------------------------------------------------------- helpers */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const img = (file) => `assets/img/${file}`;
const esc = (str) =>
  String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

/* -------------------------------------------------------- product markup */

export function productCard(product, { eager = false } = {}) {
  const [front, back = front] = product.images;
  const loading = eager ? 'eager' : 'lazy';
  const badge = product.badge
    ? `<span class="product-card__badge${product.badge === 'Pre-order' ? ' product-card__badge--gold' : ''}">${esc(product.badge)}</span>`
    : '';
  const swatches = product.colors.length > 1
    ? `<div class="product-card__swatches" aria-hidden="true">${product.colors
        .map((c) => `<span class="product-card__swatch" style="background:${c.hex}"></span>`)
        .join('')}</div>`
    : '';

  return `
    <article class="product-card" data-reveal>
      <div class="product-card__media">
        ${badge}
        <img src="${img(front)}" alt="${esc(product.title)}" loading="${loading}" width="900" height="1200">
        <img src="${img(back)}" alt="" aria-hidden="true" loading="lazy" width="900" height="1200">
        <div class="product-card__quick">
          <button class="btn btn--light btn--sm btn--full" type="button"
                  data-quick-add="${product.handle}">Quick add</button>
        </div>
      </div>
      <h3 class="product-card__title">
        <a href="product.html?p=${product.handle}">${esc(product.title)}</a>
      </h3>
      <div class="product-card__meta">
        <span class="product-card__price">${money(product.price)}</span>
      </div>
      ${swatches}
    </article>`;
}

/* --------------------------------------------------------------- header */

const navGroups = [
  {
    label: 'Shop',
    href: 'collections.html',
    children: [
      { label: 'Shop All', href: 'collection.html?c=all' },
      ...collections.map((c) => ({ label: c.title, href: `collection.html?c=${c.handle}` })),
      { label: curated.title, href: `collection.html?c=${curated.handle}` },
    ],
  },
  { label: 'Men', href: 'collection.html?c=men-wears' },
  { label: 'Women', href: 'collection.html?c=women-wears' },
  { label: 'Unisex', href: 'collection.html?c=unisex-wears' },
  { label: 'Hoodies', href: 'collection.html?c=mh-ldn-hoodies' },
  { label: 'Accessories', href: 'collection.html?c=you-deserves-more' },
  {
    label: 'Info',
    href: 'about.html',
    children: [
      { label: 'About Us', href: 'about.html' },
      { label: 'FAQs', href: 'faqs.html' },
      { label: 'Shipping & Returns', href: 'shipping-returns.html' },
      { label: 'Contact', href: 'contact.html' },
    ],
  },
];

function headerMarkup() {
  const desktopNav = navGroups
    .map((group) => {
      const panel = group.children
        ? `<div class="nav__panel">${group.children
            .map((c) => `<a href="${c.href}">${esc(c.label)}</a>`)
            .join('')}</div>`
        : '';
      const chev = group.children ? `<span class="nav__chev" aria-hidden="true">${icon.chevron}</span>` : '';
      return `<li class="nav__item"><a class="nav__link" href="${group.href}">${esc(group.label)}${chev}</a>${panel}</li>`;
    })
    .join('');

  return `
  <div class="announcement">
    <div class="marquee" aria-label="Store announcements">
      ${[0, 1]
        .map(
          (g) =>
            `<div class="marquee__group"${g ? ' aria-hidden="true"' : ''}>${shop.announcements
              .concat(shop.announcements)
              .map((a) => `<span class="marquee__item">${esc(a)}</span>`)
              .join('')}</div>`
        )
        .join('')}
    </div>
  </div>

  <header class="header" data-header>
    <div class="container">
      <div class="header__inner">
        <nav class="header__nav" aria-label="Primary">
          <ul class="nav__list">${desktopNav}</ul>
        </nav>

        <button class="icon-btn header__burger" type="button" data-open="menu"
                aria-label="Open menu">${icon.menu}</button>

        <a class="header__logo" href="index.html">
          Multiple Hustles
          <span>London</span>
        </a>

        <div class="header__actions">
          <button class="icon-btn" type="button" data-open="search" aria-label="Search">${icon.search}</button>
          <button class="icon-btn" type="button" data-open="cart" aria-label="Open cart">
            ${icon.bag}<span class="cart-count" data-cart-count hidden>0</span>
          </button>
        </div>
      </div>
    </div>
  </header>

  <div class="overlay" data-overlay></div>

  <aside class="drawer drawer--start" id="menu-drawer" data-drawer="menu" aria-hidden="true" aria-label="Menu">
    <div class="drawer__head">
      <p class="drawer__title">Menu</p>
      <button class="icon-btn" type="button" data-close aria-label="Close menu">${icon.close}</button>
    </div>
    <div class="drawer__body">
      <ul class="menu-list">
        ${navGroups
          .map((group) => {
            if (!group.children) {
              return `<li><a class="menu-list__link" href="${group.href}">${esc(group.label)}</a></li>`;
            }
            return `<li>
              <button class="menu-list__link" type="button" aria-expanded="false" data-submenu>
                ${esc(group.label)}
                <span class="menu-list__chev" aria-hidden="true">${icon.chevron}</span>
              </button>
              <div class="menu-list__sub"><div>
                ${group.children.map((c) => `<a href="${c.href}">${esc(c.label)}</a>`).join('')}
              </div></div>
            </li>`;
          })
          .join('')}
      </ul>
    </div>
    <div class="drawer__foot">
      <a class="link" href="${shop.instagram}" target="_blank" rel="noopener">${esc(shop.instagramHandle)}</a>
    </div>
  </aside>

  <aside class="drawer drawer--end" id="search-drawer" data-drawer="search" aria-hidden="true" aria-label="Search">
    <div class="drawer__head">
      <p class="drawer__title">Search</p>
      <button class="icon-btn" type="button" data-close aria-label="Close search">${icon.close}</button>
    </div>
    <div class="drawer__body">
      <div class="search-form">
        ${icon.search}
        <label class="visually-hidden" for="search-input">Search products</label>
        <input id="search-input" type="search" placeholder="What are you looking for?" autocomplete="off" data-search-input>
      </div>
      <div class="search-results" data-search-results></div>
    </div>
  </aside>

  <aside class="drawer drawer--end" id="cart-drawer" data-drawer="cart" aria-hidden="true" aria-label="Cart">
    <div class="drawer__head">
      <p class="drawer__title">Your bag</p>
      <button class="icon-btn" type="button" data-close aria-label="Close cart">${icon.close}</button>
    </div>
    <div class="drawer__body" data-cart-body></div>
    <div class="drawer__foot" data-cart-foot hidden>
      <dl class="cart-total">
        <dt>Subtotal</dt>
        <dd data-cart-total>${money(0)}</dd>
      </dl>
      <p class="form-note" data-cart-shipping></p>
      <a class="btn btn--full" href="contact.html?enquiry=order" style="margin-top:var(--space-4)">Checkout</a>
    </div>
  </aside>`;
}

/* --------------------------------------------------------------- footer */

function footerMarkup() {
  const shopLinks = [
    { label: 'Shop All', href: 'collection.html?c=all' },
    ...collections.map((c) => ({ label: c.title, href: `collection.html?c=${c.handle}` })),
  ];

  const infoLinks = [
    { label: 'About Us', href: 'about.html' },
    { label: 'FAQs', href: 'faqs.html' },
    { label: 'Privacy Policy', href: 'privacy.html' },
    { label: 'Shipping & Returns', href: 'shipping-returns.html' },
    { label: 'Terms & Condition', href: 'terms.html' },
  ];

  return `
  <footer class="footer">
    <div class="container">
      <div class="footer__grid">
        <div class="footer__brand">
          <p class="footer__brand-title">Multiple Hustles LDN</p>
          <p class="footer__tagline">Built on ambition, discipline, and the quiet deals made behind closed doors. Started with nothing.</p>
          <div class="footer__social">
            <a href="${shop.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${icon.instagram}</a>
            <a href="mailto:${shop.email}" aria-label="Email us">${icon.mail}</a>
          </div>
        </div>

        <div class="footer__col">
          <h2 class="footer__heading">Shop</h2>
          <ul class="footer__list">
            ${shopLinks.map((l) => `<li><a href="${l.href}">${esc(l.label)}</a></li>`).join('')}
          </ul>
        </div>

        <div class="footer__col">
          <h2 class="footer__heading">Quick Links</h2>
          <ul class="footer__list">
            ${infoLinks.map((l) => `<li><a href="${l.href}">${esc(l.label)}</a></li>`).join('')}
          </ul>
        </div>

        <div class="footer__col">
          <h2 class="footer__heading">Contact Info</h2>
          <div class="footer__contact">
            <a href="mailto:${shop.email}">${esc(shop.email)}</a>
            <a href="tel:${shop.phoneHref}">${esc(shop.phone)}</a>
            <span>${esc(shop.location)}</span>
            <a href="${shop.instagram}" target="_blank" rel="noopener">${esc(shop.instagramHandle)}</a>
          </div>
        </div>
      </div>

      <div class="footer__bar">
        <p>&copy; ${new Date().getFullYear()} Multiple Hustles LDN. All Rights Reserved.</p>
        <div class="payment-marks" aria-label="Accepted payment methods">
          <span>Visa</span><span>Mastercard</span><span>Amex</span><span>PayPal</span><span>Apple Pay</span>
        </div>
      </div>
    </div>
  </footer>`;
}

/* ----------------------------------------------------------------- cart */

const CART_KEY = 'mhldn:cart';

const readCart = () => {
  try {
    const parsed = JSON.parse(localStorage.getItem(CART_KEY));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const writeCart = (lines) => {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(lines));
  } catch {
    /* storage unavailable — cart stays in memory for this page */
  }
};

let cart = readCart();

const lineKey = (line) => `${line.handle}|${line.color}|${line.size}`;

export function addToCart({ handle, color, size, qty = 1 }) {
  const product = getProduct(handle);
  if (!product) return;
  const line = { handle, color: color || product.colors[0].name, size: size || product.sizes[0], qty };
  const existing = cart.find((l) => lineKey(l) === lineKey(line));
  if (existing) existing.qty += qty;
  else cart.push(line);
  writeCart(cart);
  renderCart();
  toast(`${product.title} added`);
}

function updateQty(key, delta) {
  const line = cart.find((l) => lineKey(l) === key);
  if (!line) return;
  line.qty += delta;
  if (line.qty < 1) cart = cart.filter((l) => lineKey(l) !== key);
  writeCart(cart);
  renderCart();
}

function renderCart() {
  const body = $('[data-cart-body]');
  const foot = $('[data-cart-foot]');
  const count = $('[data-cart-count]');
  if (!body) return;

  const totalQty = cart.reduce((sum, l) => sum + l.qty, 0);
  if (count) {
    count.textContent = totalQty;
    count.hidden = totalQty === 0;
  }

  if (!cart.length) {
    body.innerHTML = `
      <div class="cart-empty">
        <p class="lede">Your bag is empty.</p>
        <a class="btn btn--outline" href="collection.html?c=all" style="margin-top:var(--space-5)">Continue shopping</a>
      </div>`;
    if (foot) foot.hidden = true;
    return;
  }

  body.innerHTML = cart
    .map((line) => {
      const product = getProduct(line.handle);
      if (!product) return '';
      return `
      <div class="cart-line">
        <a class="cart-line__media" href="product.html?p=${product.handle}">
          <img src="${img(product.images[0])}" alt="${esc(product.title)}" loading="lazy">
        </a>
        <div>
          <p class="cart-line__title"><a href="product.html?p=${product.handle}">${esc(product.title)}</a></p>
          <p class="cart-line__variant">${esc(line.color)} · ${esc(line.size)}</p>
          <div class="cart-line__foot">
            <div class="qty">
              <button type="button" data-qty="-1" data-key="${esc(lineKey(line))}" aria-label="Decrease quantity">&minus;</button>
              <output>${line.qty}</output>
              <button type="button" data-qty="1" data-key="${esc(lineKey(line))}" aria-label="Increase quantity">+</button>
            </div>
            <span class="product-card__price">${money(product.price * line.qty)}</span>
          </div>
        </div>
      </div>`;
    })
    .join('');

  const subtotal = cart.reduce((sum, l) => sum + (getProduct(l.handle)?.price || 0) * l.qty, 0);
  if (foot) {
    foot.hidden = false;
    $('[data-cart-total]', foot).textContent = money(subtotal);
    const remaining = shop.freeShippingThreshold - subtotal;
    $('[data-cart-shipping]', foot).textContent =
      remaining > 0
        ? `Spend ${money(remaining)} more for free UK shipping.`
        : 'Free UK shipping unlocked.';
  }
}

/* --------------------------------------------------------------- drawers */

let lastFocused = null;

export function openDrawer(name) {
  const drawer = $(`[data-drawer="${name}"]`);
  if (!drawer) return;
  lastFocused = document.activeElement;
  $$('.drawer').forEach((d) => {
    d.classList.remove('is-open');
    d.setAttribute('aria-hidden', 'true');
  });
  drawer.classList.add('is-open');
  drawer.setAttribute('aria-hidden', 'false');
  $('[data-overlay]')?.classList.add('is-open');
  document.body.classList.add('is-locked');
  const focusable = drawer.querySelector('input, button, a');
  window.setTimeout(() => focusable?.focus(), 320);
}

function closeDrawers() {
  $$('.drawer').forEach((d) => {
    d.classList.remove('is-open');
    d.setAttribute('aria-hidden', 'true');
  });
  $('[data-overlay]')?.classList.remove('is-open');
  document.body.classList.remove('is-locked');
  lastFocused?.focus();
}

/* ---------------------------------------------------------------- search */

function runSearch(term) {
  const results = $('[data-search-results]');
  if (!results) return;
  const q = term.trim().toLowerCase();

  if (!q) {
    results.innerHTML = `<p class="eyebrow">Popular right now</p>${products
      .slice(0, 4)
      .map(searchRow)
      .join('')}`;
    return;
  }

  const matches = products.filter((p) =>
    [p.title, p.excerpt, ...p.collections, ...p.colors.map((c) => c.name)]
      .join(' ')
      .toLowerCase()
      .includes(q)
  );

  results.innerHTML = matches.length
    ? matches.map(searchRow).join('')
    : `<p class="text-muted">No pieces match “${esc(term)}”.</p>`;
}

const searchRow = (product) => `
  <a class="search-result" href="product.html?p=${product.handle}">
    <span class="search-result__media"><img src="${img(product.images[0])}" alt="" loading="lazy"></span>
    <span>
      <span class="cart-line__title" style="display:block">${esc(product.title)}</span>
      <span class="cart-line__variant">${money(product.price)}</span>
    </span>
  </a>`;

/* ----------------------------------------------------------------- toast */

let toastTimer;
export function toast(message) {
  let el = $('.toast');
  if (!el) {
    el = document.createElement('div');
    el.className = 'toast';
    el.setAttribute('role', 'status');
    document.body.append(el);
  }
  el.textContent = message;
  requestAnimationFrame(() => el.classList.add('is-visible'));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('is-visible'), 2600);
}

/* ---------------------------------------------------------------- motion */

/* Elements awaiting reveal. An IntersectionObserver can miss a target entirely
   when the page is flicked or jumped past it, which would leave that section
   permanently invisible — so this sweeps positions directly instead. The set
   drains as items reveal, so the per-frame cost falls to nothing. */
const pendingReveals = new Set();
let revealScheduled = false;

function sweepReveals() {
  revealScheduled = false;
  const limit = window.innerHeight * 0.92;

  pendingReveals.forEach((el) => {
    if (el.getBoundingClientRect().top >= limit) return;
    el.classList.add('is-visible');
    pendingReveals.delete(el);
  });

  if (!pendingReveals.size) {
    window.removeEventListener('scroll', scheduleReveals);
    window.removeEventListener('resize', scheduleReveals);
  }
}

function scheduleReveals() {
  if (revealScheduled) return;
  revealScheduled = true;
  requestAnimationFrame(sweepReveals);
}

export function observeReveals(root = document) {
  const items = $$('[data-reveal]:not(.is-visible)', root);
  if (!items.length) return;

  // Stagger siblings so grids cascade rather than snapping in together.
  items.forEach((el) => {
    const siblings = [...(el.parentElement?.children || [])].filter((c) => c.hasAttribute('data-reveal'));
    const index = siblings.indexOf(el);
    if (index > 0) el.style.setProperty('--reveal-delay', `${Math.min(index, 6) * 70}ms`);
    pendingReveals.add(el);
  });

  window.addEventListener('scroll', scheduleReveals, { passive: true });
  window.addEventListener('resize', scheduleReveals, { passive: true });
  scheduleReveals();
}

function initHero() {
  const hero = $('[data-hero]');
  if (!hero) return;
  const slides = $$('.hero__slide', hero);
  const dots = $$('.hero__dot', hero);
  if (slides.length < 2) return;

  let index = 0;
  let timer;

  const show = (next) => {
    index = (next + slides.length) % slides.length;
    slides.forEach((s, i) => s.classList.toggle('is-active', i === index));
    dots.forEach((d, i) => {
      d.classList.toggle('is-active', i === index);
      d.setAttribute('aria-current', i === index ? 'true' : 'false');
    });
  };

  const start = () => {
    clearInterval(timer);
    timer = setInterval(() => show(index + 1), 6500);
  };

  dots.forEach((dot, i) =>
    dot.addEventListener('click', () => {
      show(i);
      start();
    })
  );

  hero.addEventListener('mouseenter', () => clearInterval(timer));
  hero.addEventListener('mouseleave', start);
  show(0);
  start();
}

function initNewsletters(root = document) {
  $$('[data-newsletter]', root).forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const note = $('.form-note', form) || form.parentElement.querySelector('.form-note');
      if (note) {
        note.textContent = 'You’re on the list. Watch your inbox for the next drop.';
        note.dataset.state = 'success';
      }
      form.reset();
    });
  });
}

function initStickyHeader() {
  const header = $('[data-header]');
  if (!header) return;
  const onScroll = () => header.classList.toggle('is-stuck', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

function markCurrentNav() {
  const here = window.location.pathname.split('/').pop() || 'index.html';
  const search = window.location.search;
  $$('.nav__link, .menu-list__link').forEach((link) => {
    const href = link.getAttribute('href');
    if (!href) return;
    const [path, query = ''] = href.split('?');
    if (path !== here) return;
    if (query && `?${query}` !== search) return;
    link.setAttribute('aria-current', 'page');
  });
}

/* ------------------------------------------------------------- delegation */

function bindGlobalEvents() {
  document.addEventListener('click', (event) => {
    const opener = event.target.closest('[data-open]');
    if (opener) {
      openDrawer(opener.dataset.open);
      if (opener.dataset.open === 'search') runSearch('');
      return;
    }

    if (event.target.closest('[data-close]') || event.target.closest('[data-overlay]')) {
      closeDrawers();
      return;
    }

    const submenu = event.target.closest('[data-submenu]');
    if (submenu) {
      submenu.setAttribute('aria-expanded', String(submenu.getAttribute('aria-expanded') !== 'true'));
      return;
    }

    const accordion = event.target.closest('.accordion__trigger');
    if (accordion) {
      accordion.setAttribute('aria-expanded', String(accordion.getAttribute('aria-expanded') !== 'true'));
      return;
    }

    const qty = event.target.closest('[data-qty]');
    if (qty) {
      updateQty(qty.dataset.key, Number(qty.dataset.qty));
      return;
    }

    const quickAdd = event.target.closest('[data-quick-add]');
    if (quickAdd) {
      event.preventDefault();
      addToCart({ handle: quickAdd.dataset.quickAdd });
      openDrawer('cart');
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeDrawers();
  });

  document.addEventListener('input', (event) => {
    if (event.target.matches('[data-search-input]')) runSearch(event.target.value);
  });
}

/* ------------------------------------------------------------------ boot */

export function initSite() {
  document.documentElement.classList.remove('no-js');

  const headerMount = $('[data-site-header]');
  const footerMount = $('[data-site-footer]');
  if (headerMount) headerMount.innerHTML = headerMarkup();
  if (footerMount) footerMount.innerHTML = footerMarkup();

  bindGlobalEvents();
  initStickyHeader();
  initHero();
  initNewsletters();
  markCurrentNav();
  renderCart();
  observeReveals();
}

document.addEventListener('DOMContentLoaded', initSite);

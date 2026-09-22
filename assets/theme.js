/* ==========================================================================
   Multiple Hustles LDN — theme behaviour
   Drawers, sticky header, hero rotation, scroll reveals, variant picking and
   an AJAX cart that talks to Shopify's /cart routes.
   ========================================================================== */
(function () {
  'use strict';

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  /* ------------------------------------------------------------- drawers */

  var lastFocused = null;

  function openDrawer(name) {
    var drawer = $('[data-drawer="' + name + '"]');
    if (!drawer) return;
    lastFocused = document.activeElement;
    $$('.drawer').forEach(function (d) {
      d.classList.remove('is-open');
      d.setAttribute('aria-hidden', 'true');
    });
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    var overlay = $('[data-overlay]');
    if (overlay) overlay.classList.add('is-open');
    document.body.classList.add('is-locked');
    var focusable = drawer.querySelector('input, button, a');
    window.setTimeout(function () { if (focusable) focusable.focus(); }, 320);
  }

  function closeDrawers() {
    $$('.drawer').forEach(function (d) {
      d.classList.remove('is-open');
      d.setAttribute('aria-hidden', 'true');
    });
    var overlay = $('[data-overlay]');
    if (overlay) overlay.classList.remove('is-open');
    document.body.classList.remove('is-locked');
    if (lastFocused) lastFocused.focus();
  }

  /* ---------------------------------------------------------------- cart */

  function refreshCart() {
    // Re-render the drawer through Shopify's Section Rendering API so Liquid
    // keeps ownership of money formatting and line markup, not this file.
    var root = (window.Shopify && window.Shopify.routes && window.Shopify.routes.root) || '/';
    return fetch(root + '?section_id=cart-drawer')
      .then(function (r) { return r.ok ? r.text() : null; })
      .then(function (html) {
        if (!html) { window.location.reload(); return; }
        var parsed = new DOMParser().parseFromString(html, 'text/html');
        var current = $('[data-drawer="cart"]');
        var fresh = parsed.querySelector('[data-drawer="cart"]');
        if (current && fresh) {
          var wasOpen = current.classList.contains('is-open');
          current.innerHTML = fresh.innerHTML;
          if (wasOpen) {
            current.classList.add('is-open');
            current.setAttribute('aria-hidden', 'false');
          }
        }
        return fetch('/cart.js').then(function (r) { return r.json(); });
      })
      .then(function (cart) {
        if (!cart) return;
        var count = $('[data-cart-count]');
        if (count) {
          count.textContent = cart.item_count;
          count.hidden = cart.item_count === 0;
        }
      })
      .catch(function () { window.location.reload(); });
  }

  function addToCart(form) {
    var data = new FormData(form);
    return fetch('/cart/add.js', { method: 'POST', body: data })
      .then(function (r) { return r.json().then(function (body) { return { ok: r.ok, body: body }; }); })
      .then(function (res) {
        if (!res.ok) {
          toast(res.body.description || res.body.message || 'Could not add to bag');
          return;
        }
        toast((res.body.product_title || res.body.title || 'Item') + ' added');
        return refreshCart().then(function () { openDrawer('cart'); });
      })
      .catch(function () { form.submit(); });
  }

  function changeLine(line, quantity) {
    return fetch('/cart/change.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ line: Number(line), quantity: Number(quantity) })
    })
      .then(function () { return refreshCart(); })
      .catch(function () { window.location.reload(); });
  }

  /* --------------------------------------------------------------- toast */

  var toastTimer;
  function toast(message) {
    var el = $('.toast');
    if (!el) {
      el = document.createElement('div');
      el.className = 'toast';
      el.setAttribute('role', 'status');
      document.body.appendChild(el);
    }
    el.textContent = message;
    requestAnimationFrame(function () { el.classList.add('is-visible'); });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('is-visible'); }, 2600);
  }

  /* -------------------------------------------------------------- motion */

  /* Elements awaiting reveal. An IntersectionObserver can miss a target when
     the page is flicked past it, which would leave that section permanently
     invisible — so this sweeps positions directly. The set drains as items
     reveal, so the per-frame cost falls to nothing. */
  var pending = [];
  var scheduled = false;

  function sweep() {
    scheduled = false;
    var limit = window.innerHeight * 0.92;
    pending = pending.filter(function (el) {
      if (el.getBoundingClientRect().top >= limit) return true;
      el.classList.add('is-visible');
      return false;
    });
    if (!pending.length) {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    }
  }

  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(sweep);
  }

  function observeReveals(root) {
    var items = $$('[data-reveal]:not(.is-visible)', root);
    if (!items.length) return;
    items.forEach(function (el) {
      var siblings = Array.prototype.filter.call(el.parentElement ? el.parentElement.children : [], function (c) {
        return c.hasAttribute('data-reveal');
      });
      var index = siblings.indexOf(el);
      if (index > 0) el.style.setProperty('--reveal-delay', Math.min(index, 6) * 70 + 'ms');
      pending.push(el);
    });
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    schedule();
  }

  /* ----------------------------------------------------------------- hero */

  function initHero() {
    var hero = $('[data-hero]');
    if (!hero) return;
    var slides = $$('.hero__slide', hero);
    var dots = $$('.hero__dot', hero);
    if (slides.length < 2) return;

    var index = 0;
    var timer;

    function show(next) {
      index = (next + slides.length) % slides.length;
      slides.forEach(function (s, i) { s.classList.toggle('is-active', i === index); });
      dots.forEach(function (d, i) {
        d.classList.toggle('is-active', i === index);
        d.setAttribute('aria-current', i === index ? 'true' : 'false');
      });
    }

    function start() {
      clearInterval(timer);
      timer = setInterval(function () { show(index + 1); }, 6500);
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () { show(i); start(); });
    });
    hero.addEventListener('mouseenter', function () { clearInterval(timer); });
    hero.addEventListener('mouseleave', start);
    show(0);
    start();
  }

  /* -------------------------------------------------------------- variants */

  /* Which photograph belongs to which colourway: { mediaId: [colour, …] }.

     Per media, in order:
       1. The variants it is attached to in admin — authoritative when set.
       2. Its filename, when that names one or more of the product's colours
          ("shorts-grey-back.jpg" -> Grey Marl).
       3. Its alt text, same rule, consulted only when the filename is silent.
       4. Position — photographs naming no colour anywhere are dealt out, in
          upload order, to the colours still without a photograph.
     A photograph naming several colours (a group shot) belongs to each of
     them. Anything still unresolved belongs to no colour and stays visible. */
  var COLOR_SKIP_WORDS = ['off', 'light', 'dark', 'deep', 'pale', 'bright', 'neon', 'baby', 'hot', 'heather'];

  function colorsNamedIn(text, colors) {
    var hay = ' ' + String(text || '').toLowerCase().replace(/\.[a-z0-9]+$/, '').replace(/[^a-z0-9]+/g, ' ') + ' ';
    var hits = [];
    // Longest names first, and each match consumes the words it used, so
    // "ice blue" is never also counted as "blue".
    colors.slice().sort(function (a, b) { return b.length - a.length; }).forEach(function (color) {
      var needle = ' ' + color.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim() + ' ';
      if (needle.trim() && hay.indexOf(needle) !== -1) {
        hits.push(color);
        hay = hay.split(needle).join('  ');
      }
    });
    // Then the distinctive word of a multi-word name: "grey" for "Grey Marl".
    colors.forEach(function (color) {
      if (hits.indexOf(color) !== -1) return;
      var words = color.toLowerCase().split(/[^a-z0-9]+/);
      if (words.length < 2) return;
      words.some(function (word) {
        if (word.length < 4 || COLOR_SKIP_WORDS.indexOf(word) !== -1) return false;
        if (hay.indexOf(' ' + word + ' ') === -1) return false;
        hits.push(color);
        hay = hay.split(' ' + word + ' ').join('  ');
        return true;
      });
    });
    return hits;
  }

  function resolveMediaColors(figures, variants, optionPos) {
    var colors = [];
    variants.forEach(function (v) {
      var c = v.options[optionPos];
      if (c && colors.indexOf(c) === -1) colors.push(c);
    });
    var map = {};
    if (colors.length < 2) return map;

    function own(id, color) {
      map[id] = map[id] || [];
      if (map[id].indexOf(color) === -1) map[id].push(color);
    }

    var ids = figures.map(function (fig) { return fig.dataset.mediaId; });

    variants.forEach(function (v) {
      if (v.media_id && ids.indexOf(String(v.media_id)) !== -1) own(String(v.media_id), v.options[optionPos]);
    });

    var silent = [];
    figures.forEach(function (fig) {
      var id = fig.dataset.mediaId;
      if (map[id]) return;
      var hits = colorsNamedIn(fig.dataset.mediaFile, colors);
      if (!hits.length) hits = colorsNamedIn(fig.dataset.mediaAlt, colors);
      if (hits.length) hits.forEach(function (c) { own(id, c); });
      else silent.push(id);
    });

    var owned = {};
    Object.keys(map).forEach(function (id) { map[id].forEach(function (c) { owned[c] = true; }); });
    var needy = colors.filter(function (c) { return !owned[c]; });
    if (needy.length && silent.length) {
      var per = Math.max(1, Math.floor(silent.length / needy.length));
      var cursor = 0;
      needy.forEach(function (c) {
        for (var i = 0; i < per && cursor < silent.length; i++) own(silent[cursor++], c);
      });
    }
    return map;
  }

  function initProductForm() {
    var form = $('[data-product-form]');
    var dataEl = $('[data-variant-data]');
    if (!form || !dataEl) return;

    var variants;
    try { variants = JSON.parse(dataEl.textContent); } catch (e) { return; }
    if (!variants || !variants.length) return;

    var gallery = $('[data-product-gallery]');
    var figures = gallery ? $$('.product__figure[data-media-id]', gallery) : [];
    var colorIndexEl = $('[data-color-option-index]');
    var colorIndex = colorIndexEl ? Number(colorIndexEl.textContent.trim()) : 0;

    // { mediaId: [colour, …] } — media absent from the map belong to no
    // colourway (a size chart, a packaging detail) and stay on show whatever
    // is selected.
    var mediaColors = colorIndex > 0 ? resolveMediaColors(figures, variants, colorIndex - 1) : {};

    /* Show only the chosen colourway's photographs.

       Shots of other colourways are hidden; shots belonging to no colour stay
       visible after the chosen colour's own. If the chosen colour has no shot
       of its own there is nothing trustworthy to switch to, so the whole
       gallery is shown rather than an empty or misleading one. */
    function showMediaFor(chosen) {
      if (!gallery || colorIndex < 1 || figures.length < 2) return;

      var color = chosen[colorIndex - 1];
      if (!color) return;

      var mine = [];
      var shared = [];
      var others = [];

      figures.forEach(function (fig) {
        var owners = mediaColors[fig.dataset.mediaId];
        if (!owners) shared.push(fig);
        else if (owners.indexOf(color) !== -1) mine.push(fig);
        else others.push(fig);
      });

      if (!mine.length) {
        mine = figures.slice();
        shared = [];
        others = [];
      } else {
        // Shots of this colour alone lead; group shots naming it follow.
        mine = mine.filter(function (fig) { return mediaColors[fig.dataset.mediaId].length === 1; })
          .concat(mine.filter(function (fig) { return mediaColors[fig.dataset.mediaId].length > 1; }));
      }

      var visible = mine.concat(shared);
      var current = $$('.product__figure:not([hidden])', gallery);
      var changed = current.length !== visible.length ||
        visible.some(function (fig, i) { return current[i] !== fig; });

      visible.forEach(function (fig) { fig.hidden = false; gallery.appendChild(fig); });
      others.forEach(function (fig) { fig.hidden = true; gallery.appendChild(fig); });
      gallery.setAttribute('data-visible', String(visible.length));

      if (!changed) return;

      // Re-trigger the fade so the swap reads as a change, not a flicker.
      gallery.classList.remove('is-swapping');
      void gallery.offsetWidth;
      gallery.classList.add('is-swapping');
    }

    function selectedOptions() {
      var chosen = [];
      $$('[data-option-index][aria-pressed="true"]', form).forEach(function (btn) {
        chosen[Number(btn.dataset.optionIndex) - 1] = btn.dataset.optionValue;
      });
      return chosen;
    }

    function update() {
      var chosen = selectedOptions();
      var match = variants.find(function (v) {
        return v.options.every(function (opt, i) {
          return chosen[i] === undefined || opt === chosen[i];
        });
      });

      // Mirror the chosen value into each option's label.
      $$('[data-option-index][aria-pressed="true"]', form).forEach(function (btn) {
        var label = document.querySelector('[data-option-label="' + btn.dataset.optionIndex + '"]');
        if (label) label.textContent = btn.dataset.optionValue;
      });

      showMediaFor(chosen);

      if (!match) return;

      var idField = $('[data-variant-id]', form);
      if (idField) idField.value = match.id;

      // Keep ?variant= in the address bar so a shared or reloaded link opens
      // on the same colour and size.
      if (window.history && window.history.replaceState && !(window.Shopify && window.Shopify.designMode)) {
        var url = new URL(window.location.href);
        if (url.searchParams.get('variant') !== String(match.id)) {
          url.searchParams.set('variant', match.id);
          window.history.replaceState(window.history.state, '', url.toString());
        }
      }

      var price = $('[data-price]');
      if (price) price.textContent = match.price_formatted;

      var button = $('[data-add-to-cart]', form);
      if (!button) return;
      button.disabled = !match.available;
      if (match.available) {
        button.innerHTML = button.dataset.labelAdd + ' &mdash; <span data-button-price>' + match.price_formatted + '</span>';
      } else {
        button.textContent = button.dataset.labelSoldOut;
      }
    }

    form.addEventListener('click', function (event) {
      var btn = event.target.closest('[data-option-index]');
      if (!btn || !form.contains(btn)) return;
      event.preventDefault();
      // One pressed button per option row.
      $$('[data-option-index="' + btn.dataset.optionIndex + '"]', form).forEach(function (sibling) {
        sibling.setAttribute('aria-pressed', String(sibling === btn));
      });
      update();
    });

    update();
  }

  /* ----------------------------------------------------------- card swatches */

  /* A colour swatch on a grid card swaps that card's photograph and points its
     Quick add form at the matching variant, so the grid behaves the way the
     product page does. Delegated, so cards rendered later are covered too. */
  function initCardSwatches() {
    document.addEventListener('click', function (event) {
      var swatch = event.target.closest('[data-card-swatch]');
      if (!swatch) return;
      event.preventDefault();

      var card = swatch.closest('.product-card');
      if (!card) return;

      var name = swatch.getAttribute('data-card-swatch');
      var front = $('[data-card-front]', card);
      if (front && swatch.dataset.front) {
        front.src = swatch.dataset.front;
        front.removeAttribute('srcset');
        front.alt = (front.dataset.title || '') + ' \u2014 ' + name;
      }

      var idField = $('[data-quick-add-id]', card);
      if (idField && swatch.dataset.variantId) idField.value = swatch.dataset.variantId;

      $$('[data-card-swatch]', card).forEach(function (btn) {
        btn.setAttribute('aria-pressed', String(btn === swatch));
      });
    });
  }

  /* ---------------------------------------------------------------- header */

  function initStickyHeader() {
    var header = $('[data-header]');
    if (!header) return;
    function onScroll() { header.classList.toggle('is-stuck', window.scrollY > 8); }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ------------------------------------------------------------ delegation */

  function bindGlobalEvents() {
    document.addEventListener('click', function (event) {
      var opener = event.target.closest('[data-open]');
      if (opener) { openDrawer(opener.dataset.open); return; }

      if (event.target.closest('[data-close]') || event.target.closest('[data-overlay]')) {
        closeDrawers();
        return;
      }

      var submenu = event.target.closest('[data-submenu]');
      if (submenu) {
        submenu.setAttribute('aria-expanded', String(submenu.getAttribute('aria-expanded') !== 'true'));
        return;
      }

      var accordion = event.target.closest('.accordion__trigger');
      if (accordion) {
        accordion.setAttribute('aria-expanded', String(accordion.getAttribute('aria-expanded') !== 'true'));
        return;
      }

      var qty = event.target.closest('[data-qty-change]');
      if (qty) {
        event.preventDefault();
        changeLine(qty.dataset.line, qty.dataset.qtyChange);
      }
    });

    document.addEventListener('submit', function (event) {
      var quick = event.target.closest('[data-quick-add]');
      if (quick) { event.preventDefault(); addToCart(quick); return; }

      var productForm = event.target.closest('[data-product-form]');
      if (productForm) { event.preventDefault(); addToCart(productForm); }
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeDrawers();
    });
  }

  /* ------------------------------------------------------------------ boot */

  function init() {
    bindGlobalEvents();
    initStickyHeader();
    initHero();
    initProductForm();
    initCardSwatches();
    observeReveals();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Re-run when the theme editor swaps a section in.
  document.addEventListener('shopify:section:load', function (event) {
    initHero();
    initProductForm();
    observeReveals(event.target);
  });
})();

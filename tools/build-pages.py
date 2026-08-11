#!/usr/bin/env python3
"""Generate the static pages that share one document shell.

Every page is plain HTML on disk — this script exists so the <head>, skip link
and header/footer mounts stay identical across them. Re-run it after editing a
page body below; index.html is authored by hand and is not touched here.
"""

import pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent

SHELL = """<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{description}">
<link rel="preload" href="assets/fonts/crimson-pro-700-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="assets/fonts/barlow-500-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="assets/css/theme.css">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='7' fill='%231a1a1a'/><text x='16' y='22' font-family='Georgia,serif' font-size='15' font-weight='700' fill='%23fffdfa' text-anchor='middle'>M</text></svg>">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{description}">
<meta property="og:type" content="website">
<script type="module" src="assets/js/site.js"></script>{scripts}
</head>
<body>

<a class="skip-link" href="#main">Skip to content</a>
<div data-site-header></div>

<main id="main">
{body}
</main>

<div data-site-footer></div>
</body>
</html>
"""


NEWSLETTER = """
  <section class="section">
    <div class="container">
      <div class="newsletter" data-reveal>
        <p class="eyebrow">Sign up and save</p>
        <h2 class="newsletter__title">Be first through the door</h2>
        <p class="lede">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
        <form class="field-inline" data-newsletter novalidate>
          <label class="visually-hidden" for="newsletter-email">Email address</label>
          <input id="newsletter-email" type="email" name="email" placeholder="Enter your email" required autocomplete="email">
          <button class="btn" type="submit">Subscribe</button>
        </form>
        <p class="form-note">No spam. Drop announcements and early access only.</p>
      </div>
    </div>
  </section>
"""

PAGES = {}

# --------------------------------------------------------------- collections
PAGES["collections.html"] = dict(
    title="Collections — Multiple Hustles LDN",
    description="Browse every Multiple Hustles LDN collection — men, women, unisex, hoodies, summer wears and accessories.",
    scripts='\n<script type="module" src="assets/js/collections-index.js"></script>',
    body="""
  <section class="page-head">
    <div class="container">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="index.html">Home</a>
        <span aria-hidden="true">/</span>
        <span>Collections</span>
      </nav>
      <div style="margin-top:var(--space-6)">
        <p class="eyebrow">Shop</p>
        <h1 class="page-head__title">Collections</h1>
        <p class="lede page-head__text">Six categories, one wardrobe. Everything is cut from the same brief: heavyweight, understated, built to last.</p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="collection-grid collection-grid--wide" data-all-collections></div>
    </div>
  </section>
"""
    + NEWSLETTER,
)

# ---------------------------------------------------------------- collection
PAGES["collection.html"] = dict(
    title="Shop All — Multiple Hustles LDN",
    description="Shop the full Multiple Hustles LDN range. Limited-drop London streetwear.",
    scripts='\n<script type="module" src="assets/js/collection.js"></script>',
    body="""
  <section class="page-head">
    <div class="container">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="index.html">Home</a>
        <span aria-hidden="true">/</span>
        <a href="collections.html">Collections</a>
        <span aria-hidden="true">/</span>
        <span data-collection-crumb>Shop All</span>
      </nav>
      <div style="margin-top:var(--space-6)">
        <p class="eyebrow">Collection</p>
        <h1 class="page-head__title" data-collection-title>Shop All</h1>
        <p class="lede page-head__text" data-collection-excerpt></p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="toolbar">
        <div class="filter-pills" data-filter-pills></div>
        <div style="display:flex;align-items:center;gap:var(--space-4)">
          <span class="eyebrow" data-product-count></span>
          <span class="select-wrap">
            <label class="visually-hidden" for="sort">Sort by</label>
            <select id="sort" data-sort>
              <option value="featured">Featured</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="title-asc">A &ndash; Z</option>
            </select>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>
          </span>
        </div>
      </div>

      <div class="product-grid" data-product-grid></div>
    </div>
  </section>
"""
    + NEWSLETTER,
)

# ------------------------------------------------------------------- product
PAGES["product.html"] = dict(
    title="Product — Multiple Hustles LDN",
    description="Multiple Hustles LDN — limited-drop London streetwear.",
    scripts='\n<script type="module" src="assets/js/product.js"></script>',
    body="""
  <div data-product-root>
    <section class="page-head" style="padding-block-end:var(--space-6);border-bottom:0">
      <div class="container">
        <nav class="breadcrumb" aria-label="Breadcrumb">
          <a href="index.html">Home</a>
          <span aria-hidden="true">/</span>
          <a href="collection.html?c=all">Shop All</a>
          <span aria-hidden="true">/</span>
          <span data-product-crumb></span>
        </nav>
      </div>
    </section>

    <section class="section" style="padding-block-start:0">
      <div class="container">
        <div class="product">
          <div class="product__gallery" data-product-gallery></div>
          <div class="product__info" data-product-info></div>
        </div>
      </div>
    </section>

    <section class="section section--flush-top" aria-labelledby="related-heading">
      <div class="container">
        <div class="section-head">
          <div class="section-head__meta">
            <p class="eyebrow">Complete the look</p>
            <h2 class="section-head__title" id="related-heading">You may also like</h2>
          </div>
          <a class="link" href="collection.html?c=all">View all</a>
        </div>
        <div class="product-grid" data-related></div>
      </div>
    </section>
  </div>
""",
)

# --------------------------------------------------------------------- about
PAGES["about.html"] = dict(
    title="About Us — Multiple Hustles LDN",
    description="Born in London. Inspired by movement. The story and brand vision behind Multiple Hustles LDN.",
    scripts="",
    body="""
  <section class="page-head">
    <div class="container">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="index.html">Home</a>
        <span aria-hidden="true">/</span>
        <span>About Us</span>
      </nav>
      <div style="margin-top:var(--space-6)">
        <p class="eyebrow">About Us &amp; Brand Vision</p>
        <h1 class="page-head__title">Born in London.<br>Inspired by Movement.</h1>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="split">
        <div class="split__media" data-reveal>
          <img src="assets/img/tracksuit-lifestyle.jpg" alt="Four people in Multiple Hustles LDN tracksuits walking through a London arcade at night" width="1284" height="1403" loading="lazy">
        </div>
        <div class="rte" data-reveal>
          <p class="eyebrow">Our Story</p>
          <h2 class="split__title">We don&rsquo;t rely on one lane.</h2>
          <p>Multiple Hustles LDN wasn&rsquo;t created in a boardroom; it was built on ambition, discipline, and the quiet deals made behind closed doors. We represent the individuals who don&rsquo;t rely on one lane to get to where they&rsquo;re going.</p>
          <p>Our collection is designed for the modern hustler&mdash;versatile, high-quality, and understated. Whether you are building a business, chasing a creative passion, or grinding 9-to-5 to fund your 5-to-9, our clothing is the uniform for your journey.</p>
          <p><strong>We don&rsquo;t just sell clothes; we sell the mindset that you deserve more.</strong></p>
        </div>
      </div>
    </div>
  </section>

  <section class="section section--flush-top">
    <div class="container">
      <article class="editorial" data-reveal>
        <div class="editorial__media">
          <img src="assets/img/packaging-detail.jpg" alt="Matte black Multiple Hustles LDN packaging with the lilac MHLDN wordmark" width="3000" height="3000" loading="lazy">
        </div>
        <div class="container">
          <div class="editorial__body">
            <p class="eyebrow" style="color:rgba(255,255,255,.72)">Brand Vision</p>
            <h2 class="editorial__title">Build in the Shadows. Win in Plain Sight.</h2>
            <p class="editorial__text">Multiple Hustles LDN represents a lifestyle where secrets are exchanged, deals are made, and ambition moves silently.</p>
            <a class="btn btn--light" href="collection.html?c=all">Shop the range</a>
          </div>
        </div>
      </article>
    </div>
  </section>

  <section class="section">
    <div class="container container--reading">
      <div class="prose" data-reveal>
        <p class="pull-quote">&ldquo;True success doesn&rsquo;t need to shout. It shows up in the details &mdash; the quality of the fabric, the cut of the silhouette, and the confidence of the person wearing it.&rdquo;</p>
        <p>Our vision is to build a global community of disciplined movers who understand that the hustle isn&rsquo;t just about working hard; it&rsquo;s about working smart and looking clean while you do it.</p>
      </div>
    </div>
  </section>

  <section class="section section--flush-top">
    <div class="container">
      <div class="manifesto" data-reveal>
        <p class="eyebrow">Started With Nothing</p>
        <h2 class="manifesto__title">Every drop is limited. Once it&rsquo;s gone, it&rsquo;s gone.</h2>
        <p class="manifesto__text">We operate on a limited-drop model to maintain exclusivity &mdash; small runs, made properly, released when they&rsquo;re right.</p>
        <a class="btn btn--gold" href="collection.html?c=all" style="margin-top:var(--space-7)">Shop Now</a>
      </div>
    </div>
  </section>
"""
    + NEWSLETTER,
)

# ---------------------------------------------------------------------- FAQs
FAQS = [
    ("Where do you ship?", "We ship globally. UK &amp; International shipping is available on all orders."),
    ("How long does delivery take?", "UK: 2&ndash;5 working days | International: 5&ndash;10 working days. Please allow 24&ndash;48 hours for dispatch."),
    ("Are drops limited?", "Yes. We operate on a limited-drop model to maintain exclusivity. Once it&rsquo;s gone, it&rsquo;s gone."),
    ("How do the items fit?", "Our sizing is generally true to size with a relaxed, streetwear fit. For the &ldquo;Straight Leg Sets&rdquo; and Tracksuits, we recommend sticking to your usual size for a comfortable fit, or sizing up if you prefer an oversized look."),
    ("Can I wash the puff print items?", "Yes, but handle with care. We recommend washing inside out on a cold cycle and air drying. Do not iron directly over the puff print or logos to preserve the quality."),
    ("How do I track my order?", "Once your order is dispatched, you will receive an email with a tracking number. You can use this link to monitor your package&rsquo;s journey to your doorstep."),
    ("What payment methods do you accept?", "We accept all major credit and debit cards (Visa, Mastercard, Amex), as well as PayPal and Apple Pay."),
    ("Can I change my order after placing it?", "We process orders quickly to get them to you fast. If you need to make a change, please email us immediately. If the order has already been dispatched, we cannot make changes."),
]

faq_items = "\n".join(
    f"""        <div class="accordion__item">
          <button class="accordion__trigger" type="button" aria-expanded="{'true' if i == 0 else 'false'}">
            {q} <span class="accordion__icon" aria-hidden="true"></span>
          </button>
          <div class="accordion__panel"><div>
            <div class="rte"><p>{a}</p></div>
          </div></div>
        </div>"""
    for i, (q, a) in enumerate(FAQS)
)

PAGES["faqs.html"] = dict(
    title="FAQs — Multiple Hustles LDN",
    description="Shipping, sizing, limited drops, care and payment — the answers to the questions we get asked most.",
    scripts="",
    body=f"""
  <section class="page-head">
    <div class="container container--reading">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="index.html">Home</a>
        <span aria-hidden="true">/</span>
        <span>FAQs</span>
      </nav>
      <div style="margin-top:var(--space-6)">
        <p class="eyebrow">Help</p>
        <h1 class="page-head__title">FAQs</h1>
        <p class="lede page-head__text">Shipping, sizing, drops and care. If it isn&rsquo;t answered here, email us and we&rsquo;ll come back to you.</p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container container--reading">
      <div class="accordion" data-accordion data-reveal>
{faq_items}
      </div>

      <div class="info-card" style="margin-top:var(--space-9)" data-reveal>
        <h3>Still need a hand?</h3>
        <p class="text-muted" style="margin-block:var(--space-3) var(--space-5)">Email the team and we&rsquo;ll get back to you within one working day.</p>
        <a class="btn" href="contact.html">Contact us</a>
      </div>
    </div>
  </section>
""",
)

# -------------------------------------------------------- shipping & returns
PAGES["shipping-returns.html"] = dict(
    title="Shipping & Returns — Multiple Hustles LDN",
    description="Dispatch times, UK and international delivery, customs, and our 14-day return policy.",
    scripts="",
    body="""
  <section class="page-head">
    <div class="container container--reading">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="index.html">Home</a>
        <span aria-hidden="true">/</span>
        <span>Shipping &amp; Returns</span>
      </nav>
      <div style="margin-top:var(--space-6)">
        <p class="eyebrow">Policy</p>
        <h1 class="page-head__title">Shipping &amp; Returns</h1>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container container--reading">
      <div class="prose" data-reveal>
        <h2>Shipping Policy</h2>

        <h3>Dispatch Time</h3>
        <p>Ambition doesn&rsquo;t wait, and neither do we. All orders are carefully packaged and dispatched within <strong>24&ndash;48 hours</strong> of purchase (excluding weekends and bank holidays).</p>

        <h3>Delivery Timelines</h3>
        <ul>
          <li><strong>United Kingdom:</strong> 2&ndash;5 Working Days</li>
          <li><strong>International:</strong> 5&ndash;10 Working Days</li>
          <li><strong>Free Shipping:</strong> Available on orders over &pound;100 (subject to change during promotional periods).</li>
        </ul>

        <h3>Customs &amp; Duties</h3>
        <p>For international orders, please note that customers are responsible for any customs or import duties charged by their local government.</p>

        <h2>Returns &amp; Exchanges</h2>

        <h3>14-Day Return Policy</h3>
        <p>We stand by the quality of our product. If you are not completely satisfied, we accept returns within <strong>14 days</strong> of delivery.</p>

        <h3>Conditions for Return</h3>
        <ul>
          <li>Items must be unworn, unwashed, and in their original condition.</li>
          <li>All tags and packaging must be intact.</li>
          <li>Proof of purchase is required.</li>
        </ul>

        <h3>How to Return</h3>
        <p>Please email our support team with your order number to initiate a return. Customers are responsible for return shipping costs unless the item is faulty.</p>
        <p class="text-muted">Note: Limited drops mean limited restocks. We cannot guarantee exchanges for specific sizes if stock is sold out.</p>

        <p style="margin-top:var(--space-8)"><a class="btn" href="contact.html">Start a return</a></p>
      </div>
    </div>
  </section>
""",
)

# ---------------------------------------------------------------------- T&Cs
PAGES["terms.html"] = dict(
    title="Terms & Conditions — Multiple Hustles LDN",
    description="The terms and conditions that apply to browsing and purchasing from Multiple Hustles LDN.",
    scripts="",
    body="""
  <section class="page-head">
    <div class="container container--reading">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="index.html">Home</a>
        <span aria-hidden="true">/</span>
        <span>Terms &amp; Condition</span>
      </nav>
      <div style="margin-top:var(--space-6)">
        <p class="eyebrow">Legal</p>
        <h1 class="page-head__title">Terms &amp; Conditions</h1>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container container--reading">
      <div class="prose" data-reveal>
        <h2>Overview</h2>
        <p>Welcome to Multiple Hustles LDN. By accessing this website and purchasing our products, you agree to be bound by the following terms and conditions. These terms apply to all users of the site, including browsers, vendors, customers, and contributors of content.</p>

        <h2>1. Products &amp; Availability</h2>
        <p>Our collections often release in limited drops. We reserve the right to limit the quantities of any products or services that we offer. All descriptions of products and pricing are subject to change at any time without notice. We have made every effort to display the colors and images of our products accurately; however, we cannot guarantee that your device&rsquo;s display will perfectly reflect the actual garment.</p>

        <h2>2. Pricing &amp; Payment</h2>
        <p>All prices are listed in GBP (&pound;). We reserve the right to modify prices at any time. Payment must be received in full before an order is dispatched. We accept major credit/debit cards and secure online payment methods.</p>

        <h2>3. Intellectual Property</h2>
        <p>All content included on this site&mdash;such as text, graphics, logos, images, and software&mdash;is the property of Multiple Hustles LDN. You may not use, reproduce, or distribute our content without express written permission.</p>

        <h2>4. User Conduct</h2>
        <p>You agree not to use our products for any illegal or unauthorized purpose, nor may you violate any laws in your jurisdiction while using our service.</p>
      </div>
    </div>
  </section>
""",
)

# ------------------------------------------------------------------- privacy
PAGES["privacy.html"] = dict(
    title="Privacy Policy — Multiple Hustles LDN",
    description="How Multiple Hustles LDN collects, uses and safeguards your personal data.",
    scripts="",
    body="""
  <section class="page-head">
    <div class="container container--reading">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="index.html">Home</a>
        <span aria-hidden="true">/</span>
        <span>Privacy Policy</span>
      </nav>
      <div style="margin-top:var(--space-6)">
        <p class="eyebrow">Legal</p>
        <h1 class="page-head__title">Privacy Policy</h1>
        <p class="lede page-head__text">Your privacy matters. At Multiple Hustles LDN, we respect your privacy and are committed to protecting your personal data.</p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container container--reading">
      <div class="prose" data-reveal>
        <p>This policy outlines how we collect, use, and safeguard your information.</p>

        <h2>1. Information We Collect</h2>
        <p>When you make a purchase, we collect personal information such as your name, address, and email address to fulfill your order. When you browse our store, we also automatically receive your computer&rsquo;s internet protocol (IP) address to help us learn about your browser and operating system.</p>

        <h2>2. How We Use Your Data</h2>
        <ul>
          <li><strong>Order Fulfillment:</strong> To process payments, arrange shipping, and provide you with invoices and order confirmations.</li>
          <li><strong>Communication:</strong> To send you updates about your order or, with your permission, emails about new store drops and other updates.</li>
          <li><strong>Improvement:</strong> To analyze site usage and improve our website functionality.</li>
        </ul>

        <h2>3. Third-Party Services</h2>
        <p>We may share your data with trusted third parties solely for the purpose of operating our business (e.g., payment processors and shipping couriers). We never sell your personal data to other companies for marketing purposes.</p>

        <h2>4. Security</h2>
        <p>To protect your personal information, we take reasonable precautions and follow industry best practices to make sure it is not inappropriately lost, misused, accessed, disclosed, altered, or destroyed.</p>
      </div>
    </div>
  </section>
""",
)

# ------------------------------------------------------------------- contact
PAGES["contact.html"] = dict(
    title="Contact — Multiple Hustles LDN",
    description="Get in touch with Multiple Hustles LDN. Email, phone and Instagram — London, UK.",
    scripts='\n<script type="module" src="assets/js/contact.js"></script>',
    body="""
  <section class="page-head">
    <div class="container">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="index.html">Home</a>
        <span aria-hidden="true">/</span>
        <span>Contact</span>
      </nav>
      <div style="margin-top:var(--space-6)">
        <p class="eyebrow">Get in touch</p>
        <h1 class="page-head__title">Contact Us</h1>
        <p class="lede page-head__text">Orders, returns, sizing or wholesale &mdash; send it over and we&rsquo;ll come back to you within one working day.</p>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="contact-grid">
        <div data-reveal>
          <form data-contact novalidate>
            <div class="field">
              <label for="contact-name">Name</label>
              <input id="contact-name" name="name" type="text" autocomplete="name" required>
            </div>
            <div class="field">
              <label for="contact-email">Email</label>
              <input id="contact-email" name="email" type="email" autocomplete="email" required>
            </div>
            <div class="field">
              <label for="contact-subject">Subject</label>
              <select id="contact-subject" name="subject">
                <option value="order">An order</option>
                <option value="return">A return or exchange</option>
                <option value="sizing">Sizing advice</option>
                <option value="wholesale">Wholesale &amp; collaborations</option>
                <option value="other">Something else</option>
              </select>
            </div>
            <div class="field">
              <label for="contact-message">Message</label>
              <textarea id="contact-message" name="message" required></textarea>
            </div>
            <button class="btn btn--full" type="submit">Send message</button>
            <p class="form-note" data-contact-note>We reply to every message within one working day.</p>
          </form>
        </div>

        <div data-reveal>
          <div class="info-card">
            <h3>Contact Info</h3>
            <div class="footer__contact" style="margin-top:var(--space-4)">
              <a href="mailto:multiplehustlesldn@yahoo.com">multiplehustlesldn@yahoo.com</a>
              <a href="tel:07932089884">07932 089 884</a>
              <span>London, UK</span>
              <a href="https://www.instagram.com/multiplehustlesldn/" target="_blank" rel="noopener">@multiplehustlesldn</a>
            </div>
          </div>

          <div class="info-card" style="margin-top:var(--space-5)">
            <h3>Opening Hours</h3>
            <p class="text-muted" style="margin-top:var(--space-3)">Monday to Friday, 9am &ndash; 6pm GMT. Orders placed at the weekend are dispatched on the next working day.</p>
          </div>

          <div class="info-card" style="margin-top:var(--space-5)">
            <h3>Before you write</h3>
            <p class="text-muted" style="margin-block:var(--space-3) var(--space-5)">Most questions about delivery, sizing and returns are already answered.</p>
            <a class="btn btn--outline" href="faqs.html">Read the FAQs</a>
          </div>
        </div>
      </div>
    </div>
  </section>
""",
)

# ----------------------------------------------------------------------- 404
PAGES["404.html"] = dict(
    title="Page not found — Multiple Hustles LDN",
    description="The page you were looking for does not exist.",
    scripts="",
    body="""
  <section class="section">
    <div class="container">
      <div class="empty-state">
        <p class="eyebrow">404</p>
        <h1 class="display-md" style="margin-block:var(--space-4)">Page Not Found</h1>
        <p class="lede">The page you were looking for does not exist.</p>
        <a class="btn" href="collection.html?c=all" style="margin-top:var(--space-6)">Continue shopping</a>
      </div>
    </div>
  </section>
""",
)


def main():
    for name, page in PAGES.items():
        (ROOT / name).write_text(SHELL.format(**page), encoding="utf-8")
        print("wrote", name)


if __name__ == "__main__":
    main()

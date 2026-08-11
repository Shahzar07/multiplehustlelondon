/* Contact form — client-side only until a form endpoint is connected. */

import { shop } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('[data-contact]');
  if (!form) return;

  // Deep links such as contact.html?enquiry=order preselect the subject.
  const enquiry = new URLSearchParams(window.location.search).get('enquiry');
  const subject = form.querySelector('#contact-subject');
  if (enquiry && subject && [...subject.options].some((o) => o.value === enquiry)) {
    subject.value = enquiry;
  }

  const note = form.querySelector('[data-contact-note]');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // No backend is wired up yet, so hand the message to the customer's mail
    // client rather than silently dropping it.
    const data = new FormData(form);
    const body = `Name: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`;
    window.location.href =
      `mailto:${shop.email}` +
      `?subject=${encodeURIComponent(`[${data.get('subject')}] Website enquiry`)}` +
      `&body=${encodeURIComponent(body)}`;

    if (note) {
      note.textContent = 'Opening your email app — if nothing happens, write to us directly.';
      note.dataset.state = 'success';
    }
  });
});

// ===== Neli's Scones - main script =====

// ---- Contact number: edit these two lines to change it everywhere ----
// whatsapp: country code + number, no plus or spaces (e.g. 27821234567)
// display: how the number is shown on the pages
const CONFIG = {
  whatsapp: '27603916883',
  display: '060 391 6883',
};

// Fill every phone / WhatsApp link and number on the page from CONFIG
document.querySelectorAll('[data-wa]').forEach((el) => {
  el.href = 'https://wa.me/' + CONFIG.whatsapp;
});
document.querySelectorAll('[data-tel]').forEach((el) => {
  el.href = 'tel:+' + CONFIG.whatsapp;
});
document.querySelectorAll('[data-phone-text]').forEach((el) => {
  el.textContent = CONFIG.display;
});

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Mobile menu
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });
}

// Order form: opens WhatsApp with the order details filled in
const form = document.getElementById('order-form');

if (form) {
  const message = document.getElementById('form-message');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.elements['name'].value.trim();
    const order = form.elements['order'].value;
    const date = form.elements['date'].value;
    const notes = form.elements['notes'].value.trim();

    if (!name || !order) {
      message.className = 'form-message error';
      message.textContent = 'Please enter your name and choose what you would like to order.';
      return;
    }

    if (CONFIG.whatsapp === '27000000000') {
      message.className = 'form-message error';
      message.textContent = 'WhatsApp ordering is not set up yet. Add the number in js/script.js.';
      return;
    }

    const text =
      "Hi Neli's Scones, I would like to order.\n" +
      'Name: ' + name + '\n' +
      'Order: ' + order + '\n' +
      'Needed by: ' + (date || 'Not sure yet') + '\n' +
      'Notes: ' + (notes || '-');

    message.className = 'form-message success';
    message.textContent = 'Thanks ' + name + '. Opening WhatsApp to send your order...';

    window.open('https://wa.me/' + CONFIG.whatsapp + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
    form.reset();
  });
}

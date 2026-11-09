/* AGR Medical Center: header state, mobile menu, appointment request. */

// WhatsApp number for appointment requests, digits only with country code.
// Replace with the clinic's real number before launch.
var CLINIC_WHATSAPP = '918000000000';

(function() {
  'use strict';

  /* Header shadow once the page scrolls */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function() {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* Mobile menu */
  var toggle = document.querySelector('.menu-toggle');
  var menu = document.getElementById('mobile-menu');
  if (toggle && menu) {
    var setOpen = function(open) {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? 'Close' : 'Menu';
      menu.hidden = !open;
      document.body.classList.toggle('menu-open', open);
      if (open) {
        var first = menu.querySelector('a');
        if (first) first.focus();
      }
    };
    toggle.addEventListener('click', function() {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });
    menu.addEventListener('click', function(e) {
      if (e.target.closest('a')) setOpen(false);
    });
    window.matchMedia('(min-width: 961px)').addEventListener('change', function(mq) {
      if (mq.matches) setOpen(false);
    });
  }

  /* Footer year */
  var year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();

  /* Appointment request: builds a WhatsApp message from the form */
  var form = document.getElementById('booking-form');
  if (!form) return;

  var params = new URLSearchParams(window.location.search);
  var preset = params.get('see');
  if (preset) {
    var match = form.querySelector('input[name="see"][value="' + preset + '"]');
    if (match) match.checked = true;
  }

  var dateInput = form.querySelector('input[name="date"]');
  if (dateInput) {
    var now = new Date();
    var pad = function(n) {
      return String(n).padStart(2, '0');
    };
    dateInput.min = now.getFullYear() + '-' + pad(now.getMonth() + 1) + '-' + pad(now.getDate());
  }

  var labels = {
    gangi: 'Dr. Gangi Reddy TK (medicine, lungs, sleep)',
    archana: 'Dr. Archana M (eyes)',
    tests: 'A test or health check',
    unsure: 'Not sure yet',
  };

  var showError = function(name, message) {
    var field = form.querySelector('[data-field="' + name + '"]');
    if (!field) return;
    var out = field.querySelector('.field__error');
    if (message) {
      field.setAttribute('data-invalid', '');
      out.textContent = message;
    } else {
      field.removeAttribute('data-invalid');
      out.textContent = '';
    }
  };

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var data = new FormData(form);
    var name = (data.get('name') || '').trim();
    var phone = (data.get('phone') || '').trim();
    var digits = phone.replace(/\D/g, '');

    var firstInvalid = null;
    if (!name) {
      showError('name', 'Add your name so the front desk knows who to expect.');
      firstInvalid = firstInvalid || form.elements.name;
    } else {
      showError('name', '');
    }
    if (digits.length < 10) {
      showError('phone', 'Add a phone number with at least 10 digits so we can call you back.');
      firstInvalid = firstInvalid || form.elements.phone;
    } else {
      showError('phone', '');
    }
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    var lines = ['Appointment request', '', 'Name: ' + name, 'Phone: ' + phone];
    var see = data.get('see');
    if (see && labels[see]) lines.push('To see: ' + labels[see]);
    var date = data.get('date');
    if (date) {
      var d = new Date(date + 'T00:00:00');
      lines.push(
        'Preferred day: ' +
          d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })
      );
    }
    var time = data.get('time');
    if (time) lines.push('Preferred time: ' + time);
    var note = (data.get('note') || '').trim();
    if (note) lines.push('', note);

    var url = 'https://wa.me/' + CLINIC_WHATSAPP + '?text=' + encodeURIComponent(lines.join('\n'));
    window.open(url, '_blank', 'noopener');
  });
})();

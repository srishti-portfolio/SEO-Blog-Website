/* ===== DARK MODE (runs immediately to prevent flash) ===== */
(function () {
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
  }
})();

window.addEventListener('DOMContentLoaded', function () {

  /* ===== AOS ===== */
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 600, once: true, offset: 60 });
  }

  /* ===== TYPED.JS ===== */
  var typedEl = document.getElementById('typed-text');
  if (typedEl && typeof Typed !== 'undefined') {
    new Typed('#typed-text', {
      strings: ['SEO', 'Digital Marketing', 'Keyword Research', 'Web Development'],
      typeSpeed: 70,
      backSpeed: 40,
      backDelay: 1800,
      loop: true
    });
  }

  /* ===== SIDEBAR ===== */
  var menuBtn  = document.getElementById('menu-btn');
  var sidebar  = document.getElementById('sidebar');
  var overlay  = document.getElementById('sidebar-overlay');

  function openSidebar() {
    if (!sidebar) return;
    sidebar.classList.add('show');
    overlay && overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    if (!sidebar) return;
    sidebar.classList.remove('show');
    overlay && overlay.classList.remove('show');
    document.body.style.overflow = '';
  }

  if (menuBtn) {
    menuBtn.addEventListener('click', function () {
      sidebar.classList.contains('show') ? closeSidebar() : openSidebar();
    });
  }

  if (overlay) {
    overlay.addEventListener('click', closeSidebar);
  }

  /* Close sidebar when a nav link is clicked */
  document.querySelectorAll('.side-nav a').forEach(function (link) {
    link.addEventListener('click', closeSidebar);
  });

  /* ===== ACTIVE NAV LINK (uses full path so blog/index.html != index.html) ===== */
  var fullPath = window.location.pathname;

  document.querySelectorAll('.side-nav a').forEach(function (link) {
    try {
      var resolvedPath = new URL(link.getAttribute('href'), window.location.href).pathname;
      /* Treat /index.html and / as the same */
      var normFull     = fullPath.replace(/\/index\.html$/, '/');
      var normResolved = resolvedPath.replace(/\/index\.html$/, '/');
      if (normFull === normResolved) link.classList.add('active');
    } catch (e) {
      if (fullPath.endsWith(link.getAttribute('href'))) link.classList.add('active');
    }
  });

  /* ===== DARK MODE TOGGLE ===== */
  var darkToggle = document.getElementById('dark-toggle');
  if (darkToggle) {
    darkToggle.addEventListener('click', function () {
      document.body.classList.toggle('dark-mode');
      localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });
  }

  /* ===== CONTACT FORM ===== */
  var form = document.getElementById('contactForm');
  if (form) {

    /* Helper: show or clear error message under a field */
    function setError(fieldId, message) {
      var field = document.getElementById(fieldId);
      var errorEl = document.getElementById(fieldId + '-error');
      if (!field || !errorEl) return;
      if (message) {
        errorEl.textContent = message;
        errorEl.style.display = 'block';
        field.classList.add('input-error');
      } else {
        errorEl.textContent = '';
        errorEl.style.display = 'none';
        field.classList.remove('input-error');
      }
    }

    /* Clear error on typing */
    ['contact-name', 'contact-email', 'contact-message'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', function () { setError(id, ''); });
      }
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name    = document.getElementById('contact-name').value.trim();
      var email   = document.getElementById('contact-email').value.trim();
      var message = document.getElementById('contact-message').value.trim();
      var valid   = true;

      if (!name) {
        setError('contact-name', 'Please enter your name.');
        valid = false;
      } else {
        setError('contact-name', '');
      }

      if (!email) {
        setError('contact-email', 'Please enter your email address.');
        valid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError('contact-email', 'Please enter a valid email address.');
        valid = false;
      } else {
        setError('contact-email', '');
      }

      if (!message) {
        setError('contact-message', 'Please enter your message.');
        valid = false;
      } else {
        setError('contact-message', '');
      }

      if (!valid) return;

      var successMsg = document.getElementById('form-success');
      if (successMsg) {
        successMsg.style.display = 'block';
        form.reset();
        setTimeout(function () { successMsg.style.display = 'none'; }, 5000);
      }
    });
  }

});
/* ===== EPC 2026 Volontari — Main JS ===== */

(function () {
  'use strict';

  /* ---------- Scroll-reveal animations ---------- */
  function initScrollReveal() {
    var targets = document.querySelectorAll(
      '.section__intro, .info-card, .benefit, .timeline__step, .apply__box, .apply__info, .card, .card--accent'
    );

    if (!('IntersectionObserver' in window)) {
      targets.forEach(function (el) {
        el.classList.add('visible');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry, idx) {
          if (entry.isIntersecting) {
            // Stagger animations for sibling cards
            var el = entry.target;
            var siblings = el.parentElement ? Array.from(el.parentElement.children) : [];
            var index = siblings.indexOf(el);
            var delay = index * 80;

            setTimeout(function () {
              el.classList.add('visible');
            }, delay);

            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    targets.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---------- Smooth scroll for anchor links ---------- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* ---------- Navbar scroll effect ---------- */
  function initNavScroll() {
    var nav = document.querySelector('.nav');
    if (!nav) return;

    var scrolled = false;
    window.addEventListener('scroll', function () {
      if (window.scrollY > 60 && !scrolled) {
        scrolled = true;
        nav.style.background = 'rgba(11,15,26,.85)';
        nav.style.backdropFilter = 'blur(16px)';
        nav.style.borderBottom = '1px solid rgba(255,255,255,.06)';
      } else if (window.scrollY <= 60 && scrolled) {
        scrolled = false;
        nav.style.background = '';
        nav.style.backdropFilter = '';
        nav.style.borderBottom = '';
      }
    });
  }

  /* ---------- QR Code generation (simple SVG-based) ---------- */
  function initQRCode() {
    var qrContainer = document.querySelector('.qr');
    if (!qrContainer) return;

    var url = qrContainer.getAttribute('data-qr-url') || '';
    var imgEl = document.getElementById('qr-code');
    var linkEl = document.getElementById('qr-link');

    if (linkEl) {
      linkEl.textContent = url;
    }

    if (imgEl && url) {
      // Use a public QR code API for simplicity
      var qrApiUrl =
        'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=' +
        encodeURIComponent(url) +
        '&bgcolor=ffffff&color=6366f1&format=svg';
      imgEl.src = qrApiUrl;
      imgEl.alt = 'QR code per ' + url;
    }
  }

  /* ---------- Form chip highlight ---------- */
  function initFormChips() {
    document.querySelectorAll('.chips input[type="checkbox"]').forEach(function (cb) {
      cb.addEventListener('change', function () {
        var label = this.closest('label');
        if (!label) return;
        if (this.checked) {
          label.style.background = 'rgba(99,102,241,.15)';
          label.style.borderColor = '#6366f1';
          label.style.color = '#818cf8';
        } else {
          label.style.background = '';
          label.style.borderColor = '';
          label.style.color = '';
        }
      });
    });
  }

  /* ---------- Form submit feedback ---------- */
  function initFormFeedback() {
    var form = document.querySelector('.form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      var btn = form.querySelector('button[type="submit"]');
      if (btn) {
        btn.textContent = 'Invio in corso…';
        btn.style.opacity = '0.7';
        btn.style.pointerEvents = 'none';
      }
    });
  }

  /* ---------- Parallax subtle effect on hero ---------- */
  function initHeroParallax() {
    var hero = document.querySelector('.hero');
    if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    window.addEventListener('scroll', function () {
      var y = window.scrollY;
      if (y < window.innerHeight) {
        hero.style.backgroundPositionY = y * 0.3 + 'px';
      }
    });
  }

  /* ---------- Counter animation for timeline numbers ---------- */
  function initTimelineAnimation() {
    var steps = document.querySelectorAll('.timeline__step > span');
    steps.forEach(function (span) {
      span.style.transform = 'scale(0)';
      span.style.transition = 'transform .5s cubic-bezier(.34,1.56,.64,1)';
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var span = entry.target.querySelector('span');
            if (span) {
              setTimeout(function () {
                span.style.transform = 'scale(1)';
              }, 100);
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll('.timeline__step').forEach(function (step) {
      observer.observe(step);
    });
  }

  /* ---------- Init everything on DOM ready ---------- */
  document.addEventListener('DOMContentLoaded', function () {
    initScrollReveal();
    initSmoothScroll();
    initNavScroll();
    initQRCode();
    initFormChips();
    initFormFeedback();
    initHeroParallax();
    initTimelineAnimation();
  });
})();

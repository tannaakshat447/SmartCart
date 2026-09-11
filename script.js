/* ═══════════════════════════════════════════════════════
   SmartCart — Scroll Reveal, Nav Behavior, Mobile Menu
   ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  // ── Scroll Reveal (Intersection Observer) ────────────
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // ── Nav Scroll State ─────────────────────────────────
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  const onScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > 40) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
    lastScroll = scrollY;
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // init

  // ── Mobile Menu Toggle ───────────────────────────────
  const toggle = document.getElementById('navToggle');
  const links = document.querySelector('.nav__links');

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('nav__toggle--active');
    links.classList.toggle('nav__links--open');
  });

  // Close mobile menu when a link is clicked
  links.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      toggle.classList.remove('nav__toggle--active');
      links.classList.remove('nav__links--open');
    });
  });

  // ── Smooth Scroll for Anchor Links ───────────────────
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = nav.offsetHeight + 8;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ── Animate Stat Numbers on Reveal ───────────────────
  const statNumbers = document.querySelectorAll('.stat-card__number');
  const clusterCounts = document.querySelectorAll('.cluster-card__count');

  const animateNumber = (el, target, duration = 1200) => {
    const start = performance.now();
    const format = (n) => n.toLocaleString();

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      // Ease-out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(ease * target);
      el.textContent = format(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  const numberObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const raw = el.textContent.replace(/,/g, '');
          const target = parseInt(raw, 10);
          if (!isNaN(target)) {
            animateNumber(el, target);
          }
          numberObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach((el) => numberObserver.observe(el));
  clusterCounts.forEach((el) => numberObserver.observe(el));
});

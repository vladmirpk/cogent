/**
 * Cogent Technology Associates - Main JavaScript
 * Sticky nav, scroll reveal, counter animation
 */

document.addEventListener('DOMContentLoaded', function() {
  // Mobile nav toggle
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  const navOverlay = document.getElementById('nav-overlay');
  const body = document.body;

  function openNav() {
    if (navToggle) navToggle.setAttribute('aria-expanded', 'true');
    if (navToggle) navToggle.setAttribute('aria-label', 'Close menu');
    if (navLinks) navLinks.classList.add('nav-open');
    if (navOverlay) navOverlay.setAttribute('aria-hidden', 'false');
    if (body) body.classList.add('nav-open');
  }

  function closeNav() {
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
    if (navToggle) navToggle.setAttribute('aria-label', 'Open menu');
    if (navLinks) navLinks.classList.remove('nav-open');
    if (navOverlay) navOverlay.setAttribute('aria-hidden', 'true');
    if (body) body.classList.remove('nav-open');
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      if (navLinks.classList.contains('nav-open')) closeNav();
      else openNav();
    });
  }
  if (navOverlay) {
    navOverlay.addEventListener('click', closeNav);
  }
  window.addEventListener('resize', function() {
    if (window.innerWidth > 900) closeNav();
  });

  // Mobile: expand/collapse dropdowns on tap; close menu when navigating
  function initMobileNav() {
    if (!navLinks || window.innerWidth > 900) return;
    navLinks.querySelectorAll('.nav-has-dropdown > a').forEach(function(link) {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        var parent = link.closest('.nav-has-dropdown');
        var wasOpen = parent.classList.contains('nav-expanded');
        navLinks.querySelectorAll('.nav-has-dropdown').forEach(function(p) { p.classList.remove('nav-expanded'); });
        if (!wasOpen) parent.classList.add('nav-expanded');
      });
    });
    navLinks.querySelectorAll('a[href]').forEach(function(link) {
      link.addEventListener('click', function() {
        if (link.parentElement && link.parentElement.classList.contains('nav-has-dropdown') && link.nextElementSibling) {
          return;
        }
        closeNav();
      });
    });
  }
  initMobileNav();
  window.addEventListener('resize', function() {
    if (window.innerWidth > 900) {
      if (navLinks) navLinks.querySelectorAll('.nav-has-dropdown').forEach(function(p) { p.classList.remove('nav-expanded'); });
    }
  });

  // Sticky nav with background on scroll
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      navbar.classList.toggle('scrolled', window.scrollY > 60);
    });
  }

  // Section-to-section fade-up transition
  const sections = document.querySelectorAll('.section-fade-up');
  const sectionObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        e.target.classList.add('section-visible');
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });
  sections.forEach(function(el) { sectionObserver.observe(el); });

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(function(el) { revealObserver.observe(el); });

  // Counter animation for stats
  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10) || 0;
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(eased * target);
      el.textContent = value + suffix;
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    requestAnimationFrame(update);
  }

  const statsSection = document.getElementById('stats');
  if (statsSection) {
    const statsObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          const numbers = e.target.querySelectorAll('.stat-number[data-target]');
          numbers.forEach(animateCounter);
          statsObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    statsObserver.observe(statsSection);
  }

  // Mobile "View more" expand for solutions, products, industries
  document.querySelectorAll('.mobile-expand-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var wrap = btn.closest('.mobile-collapse');
      if (wrap) {
        wrap.classList.add('mobile-expanded');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // Products page: third card is collapsed on small screens; expand if URL targets it
  if (window.location.hash === '#actionable-intelligence') {
    var productsWrap = document.querySelector('.products-mobile-wrap.mobile-collapse');
    if (productsWrap) {
      productsWrap.classList.add('mobile-expanded');
      var expandBtn = productsWrap.querySelector('.mobile-expand-btn');
      if (expandBtn) expandBtn.setAttribute('aria-expanded', 'true');
    }
  }
});

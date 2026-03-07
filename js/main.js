/**
 * Main JavaScript — Navigation & Scroll Spy
 */

(function () {
  'use strict';

  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section[id]');

  // --- Hamburger toggle ---
  navToggle.addEventListener('click', function () {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  // --- Close mobile menu on link click ---
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // --- Scroll: add .scrolled class to navbar ---
  function handleScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  // --- Scroll spy: highlight active nav link ---
  function updateActiveLink() {
    var scrollPos = window.scrollY + 120; // offset for fixed nav + buffer
    var currentId = '';

    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;

      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + currentId) {
        link.classList.add('active');
      }
    });
  }

  // --- Attach scroll listeners ---
  window.addEventListener('scroll', function () {
    handleScroll();
    updateActiveLink();
  }, { passive: true });

  // Run once on load
  handleScroll();
  updateActiveLink();
})();

/**
 * Scroll Animations — Intersection Observer
 */
(function () {
  'use strict';

  var animatedElements = document.querySelectorAll('.animate-on-scroll');

  if (!animatedElements.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  animatedElements.forEach(function (el) {
    observer.observe(el);
  });
})();

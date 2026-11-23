(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Year */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  /* Sticky nav shadow */
  var nav = document.getElementById('nav');
  var onScroll = function () { nav.classList.toggle('is-scrolled', window.scrollY > 10); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile menu */
  var toggle = document.getElementById('menuToggle');
  var menu = document.getElementById('menu');
  function setMenu(open) {
    menu.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  }
  toggle.addEventListener('click', function () { setMenu(!menu.classList.contains('is-open')); });
  menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  /* Active link while scrolling */
  var links = Array.prototype.slice.call(menu.querySelectorAll('a[href^="#"]'));
  if ('IntersectionObserver' in window) {
    var secObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (l) { l.classList.toggle('is-current', l.getAttribute('href') === '#' + en.target.id); });
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    links.forEach(function (l) { var s = document.querySelector(l.getAttribute('href')); if (s) secObs.observe(s); });
  }

  /* Hero slider */
  var slides = document.querySelectorAll('.hero__slide');
  var dots = document.querySelectorAll('.hero__dots button');
  var current = 0, timer = null;
  function show(i) {
    slides[current].classList.remove('is-active'); dots[current].classList.remove('is-active');
    current = (i + slides.length) % slides.length;
    slides[current].classList.add('is-active'); dots[current].classList.add('is-active');
  }
  function start() { if (!reduce) { stop(); timer = setInterval(function () { show(current + 1); }, 5500); } }
  function stop() { if (timer) clearInterval(timer); }
  dots.forEach(function (d, i) { d.addEventListener('click', function () { show(i); start(); }); });
  document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });
  start();

  /* Misión / Visión tabs */
  var mvTabs = document.querySelectorAll('#nosotros .tab');
  mvTabs.forEach(function (t) {
    t.addEventListener('click', function () {
      mvTabs.forEach(function (o) {
        var on = o === t;
        o.classList.toggle('is-active', on);
        o.setAttribute('aria-selected', on ? 'true' : 'false');
        var p = document.getElementById(o.getAttribute('aria-controls'));
        p.hidden = !on; p.classList.toggle('is-active', on);
      });
    });
  });

  /* Polvorines viewer */
  var data = {
    exp: [
      { code: 'E-01 al E-05', text: 'Vista de los 5 polvorines de explosivos', img: 'img/polvorines-explosivos.jpg' },
      { code: 'E-01', text: 'Dinamita · ANFO', img: 'img/e01.jpg' },
      { code: 'E-02', text: 'Dinamita · ANFO', img: 'img/e02.jpg' },
      { code: 'E-03', text: 'Emulsión · ANFO', img: 'img/e03.jpg' },
      { code: 'E-04', text: 'Emulsión · ANFO', img: 'img/e04.jpg' },
      { code: 'E-05', text: 'Cordón · Booster', img: 'img/e05.jpg' }
    ],
    acc: [
      { code: 'A-06 y A-07', text: 'Vista de los 2 polvorines de accesorios', img: 'img/polvorines-accesorios.jpg' },
      { code: 'A-06', text: 'Detonadores', img: 'img/a06.jpg' },
      { code: 'A-07', text: 'Fulminantes', img: 'img/a07.jpg' },
      { code: 'Interior', text: 'Interior acondicionado', img: 'img/interior.jpg' }
    ]
  };
  var thumbs = document.getElementById('thumbs');
  var vImg = document.getElementById('viewerImg');
  var vCode = document.getElementById('viewerCode');
  var vText = document.getElementById('viewerText');
  function select(item, btn) {
    thumbs.querySelectorAll('.thumb').forEach(function (b) { b.classList.remove('is-active'); b.setAttribute('aria-pressed', 'false'); });
    btn.classList.add('is-active'); btn.setAttribute('aria-pressed', 'true');
    vImg.classList.add('is-fading');
    setTimeout(function () {
      vImg.src = item.img; vImg.alt = item.text;
      vCode.textContent = item.code; vText.textContent = item.text;
      vImg.onload = function () { vImg.classList.remove('is-fading'); };
      if (vImg.complete) vImg.classList.remove('is-fading');
    }, reduce ? 0 : 250);
  }
  function renderGroup(key) {
    thumbs.innerHTML = '';
    data[key].forEach(function (item, i) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'thumb'; b.setAttribute('aria-pressed', 'false');
      b.style.animationDelay = (i * 60) + 'ms';
      b.innerHTML = '<img src="' + item.img + '" alt="" loading="lazy"><span><b>' + item.code + '</b><small>' + item.text + '</small></span>';
      b.addEventListener('click', function () { select(item, b); });
      thumbs.appendChild(b);
      if (i === 0) select(item, b);
    });
  }
  var gTabs = document.querySelectorAll('#polvorines .tab');
  gTabs.forEach(function (t) {
    t.addEventListener('click', function () {
      gTabs.forEach(function (o) { var on = o === t; o.classList.toggle('is-active', on); o.setAttribute('aria-selected', on ? 'true' : 'false'); });
      renderGroup(t.getAttribute('data-group'));
    });
  });
  renderGroup('exp');

  /* Reveal on scroll + counters */
  function count(el) {
    var target = parseInt(el.getAttribute('data-count'), 10), t0 = null;
    if (reduce) { el.textContent = target; return; }
    function step(ts) {
      if (!t0) t0 = ts;
      var p = Math.min(1, (ts - t0) / 1400);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('is-visible');
        var n = en.target.querySelector('[data-count]');
        if (n) count(n);
        obs.unobserve(en.target);
      });
    }, { threshold: 0.15 });
    reveals.forEach(function (r, i) { r.style.transitionDelay = ((i % 3) * 90) + 'ms'; obs.observe(r); });
  } else {
    reveals.forEach(function (r) { r.classList.add('is-visible'); });
    document.querySelectorAll('[data-count]').forEach(function (n) { n.textContent = n.getAttribute('data-count'); });
  }

  /* Lightbox */
  var lb = document.getElementById('lightbox');
  var lbImg = document.getElementById('lightboxImg');
  var lbClose = document.getElementById('lightboxClose');
  var lastFocus = null;
  function openLb(src, alt) { lastFocus = document.activeElement; lbImg.src = src; lbImg.alt = alt; lb.hidden = false; lbClose.focus(); document.body.style.overflow = 'hidden'; }
  function closeLb() { lb.hidden = true; document.body.style.overflow = ''; if (lastFocus) lastFocus.focus(); }
  document.querySelectorAll('.gallery__item').forEach(function (g) {
    g.addEventListener('click', function () { openLb(g.getAttribute('data-full'), g.querySelector('img').alt); });
  });
  lbClose.addEventListener('click', closeLb);
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !lb.hidden) closeLb(); });
})();

(function () {
  var S = window.SITE || { links: {}, meetings: {}, photos: [] };

  // Mobile menu
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.textContent = open ? 'Close' : 'Menu';
    });
  }

  // Fill social links from config.js
  document.querySelectorAll('[data-link]').forEach(function (a) {
    var key = a.getAttribute('data-link');
    var url = S.links && S.links[key];
    if (!url) { a.hidden = true; return; }
    a.href = key === 'email' ? 'mailto:' + url : url;
    if (key !== 'email') { a.target = '_blank'; a.rel = 'noopener'; }
  });

  // Meeting details
  var m = S.meetings || {};
  setText('[data-meet="time"]', m.time || 'Announced on Telegram');
  setText('[data-meet="place"]', m.place || 'Aalto campus — room on Telegram');

  // Footer year
  setText('[data-year]', String(new Date().getFullYear()));

  function setText(sel, txt) {
    document.querySelectorAll(sel).forEach(function (el) { el.textContent = txt; });
  }

  // Gallery
  var gallery = document.getElementById('gallery');
  if (gallery) {
    var photos = S.photos || [];
    if (!photos.length) {
      var shapes = ['', 'tall', '', '', 'tall', ''];
      shapes.forEach(function (shape) {
        var f = document.createElement('figure');
        f.className = 'is-placeholder';
        f.innerHTML = '<div class="placeholder ' + shape + '"><span>Photo coming soon</span></div>';
        gallery.appendChild(f);
      });
      var note = document.getElementById('gallery-empty');
      if (note) note.hidden = false;
    } else {
      photos.forEach(function (p, i) {
        var f = document.createElement('figure');
        var b = document.createElement('button');
        b.type = 'button';
        b.setAttribute('aria-label', 'Open photo: ' + (p.caption || p.alt || 'photo ' + (i + 1)));
        var img = document.createElement('img');
        img.src = p.src; img.alt = p.alt || p.caption || ''; img.loading = 'lazy'; img.decoding = 'async';
        b.appendChild(img);
        b.addEventListener('click', function () { openLb(i); });
        f.appendChild(b);
        if (p.caption) {
          var c = document.createElement('figcaption'); c.textContent = p.caption; f.appendChild(c);
        }
        gallery.appendChild(f);
      });
    }

    var lb = document.getElementById('lightbox');
    var lbImg = lb.querySelector('img');
    var lbCap = lb.querySelector('figcaption');
    var cur = 0, lastFocus = null;

    function show(i) {
      cur = (i + photos.length) % photos.length;
      var p = photos[cur];
      lbImg.src = p.src; lbImg.alt = p.alt || p.caption || '';
      lbCap.textContent = p.caption || '';
    }
    function openLb(i) {
      lastFocus = document.activeElement;
      show(i); lb.classList.add('open'); document.body.style.overflow = 'hidden';
      lb.querySelector('.lb-close').focus();
    }
    function closeLb() {
      lb.classList.remove('open'); document.body.style.overflow = '';
      if (lastFocus) lastFocus.focus();
    }
    lb.querySelector('.lb-close').addEventListener('click', closeLb);
    lb.querySelector('.lb-prev').addEventListener('click', function () { show(cur - 1); });
    lb.querySelector('.lb-next').addEventListener('click', function () { show(cur + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowLeft') show(cur - 1);
      if (e.key === 'ArrowRight') show(cur + 1);
    });
  }
})();

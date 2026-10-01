/* =====================================================================
   MITOS Y LEYENDAS — comportamiento de la sección
   1 Lightbox de imágenes · 2 Lightbox de video · 3 Cierre con Escape
   4 Luces flotantes (ánimas) · 5 Aparición al hacer scroll
   ===================================================================== */
(function () {
  'use strict';

  // ---------- 1. Lightbox de imágenes ----------
  var imgBox = document.getElementById('mit-imgLightbox');
  var imgBoxImg = document.getElementById('mit-imgLightboxImg');

  function abrirImagen(src, alt) {
    imgBoxImg.src = src;
    imgBoxImg.alt = alt || '';
    imgBox.classList.add('is-open');
    imgBox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function cerrarImagen() {
    imgBox.classList.remove('is-open');
    imgBox.setAttribute('aria-hidden', 'true');
    imgBoxImg.src = '';
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-lightbox]').forEach(function (el) {
    var src = el.getAttribute('data-lightbox');
    var img = el.querySelector('img');
    var alt = img ? img.alt : '';
    el.addEventListener('click', function () { abrirImagen(src, alt); });
    el.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        abrirImagen(src, alt);
      }
    });
  });

  document.getElementById('mit-imgLightboxClose').addEventListener('click', cerrarImagen);
  imgBox.addEventListener('click', function (e) { if (e.target === imgBox) cerrarImagen(); });

  // ---------- 2. Lightbox de video (pantalla completa) ----------
  var videoBox = document.getElementById('mit-videoLightbox');
  var videoPlayer = document.getElementById('mit-videoLightboxPlayer');

  function abrirVideo(src) {
    videoPlayer.src = src;
    videoBox.classList.add('is-open');
    videoBox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    videoPlayer.play().catch(function () {});
  }

  function cerrarVideo() {
    videoPlayer.pause();
    videoPlayer.removeAttribute('src');
    videoPlayer.load();
    videoBox.classList.remove('is-open');
    videoBox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-video-expand]').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var marco = btn.closest('.mit-video-frame');
      var enLinea = marco ? marco.querySelector('video') : null;
      if (enLinea) enLinea.pause();
      abrirVideo(btn.getAttribute('data-video-expand'));
    });
  });

  document.getElementById('mit-videoLightboxClose').addEventListener('click', cerrarVideo);
  videoBox.addEventListener('click', function (e) { if (e.target === videoBox) cerrarVideo(); });

  // ---------- 3. Cerrar con Escape ----------
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (imgBox.classList.contains('is-open')) cerrarImagen();
    if (videoBox.classList.contains('is-open')) cerrarVideo();
  });

  // ---------- 4. Ánimas: luces misteriosas flotantes ----------
  var contenedor = document.getElementById('mit-animas');
  var CANTIDAD = 14;

  for (var i = 0; i < CANTIDAD; i++) {
    var luz = document.createElement('div');
    luz.className = 'mit-anima';
    luz.style.left = (Math.random() * 100) + '%';
    luz.style.top = (10 + Math.random() * 85) + '%';
    luz.style.setProperty('--dx', (Math.random() * 60 - 30) + 'px');
    luz.style.setProperty('--dy', (30 + Math.random() * 60) + 'px');
    luz.style.animationDuration = (14 + Math.random() * 16) + 's';
    luz.style.animationDelay = (Math.random() * 18) + 's';
    contenedor.appendChild(luz);
  }

  // ---------- 5. Aparición progresiva al hacer scroll ----------
  var elementos = document.querySelectorAll('.mit-reveal');

  if ('IntersectionObserver' in window) {
    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('is-visible');
          observador.unobserve(entrada.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    elementos.forEach(function (el) { observador.observe(el); });
  } else {
    elementos.forEach(function (el) { el.classList.add('is-visible'); });
  }
})();

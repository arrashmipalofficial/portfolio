/* ============================================================
   RASHMI PAL — PORTFOLIO SCRIPTS
   ============================================================ */

(function () {
  'use strict';

  /* ---------- Navbar ---------- */
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
    updateActiveNav();
  }, { passive: true });

  hamburger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open);
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
    });
  });

  /* ---------- Active nav link ---------- */
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
      const link = navLinks.querySelector(`a[href="#${section.id}"]`);
      if (!link) return;
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;
      link.classList.toggle('active', scrollY >= top && scrollY < bottom);
    });
  }

  updateActiveNav();

  /* ---------- Scroll fade-up animations ---------- */
  const animTargets = [
    '.section-label',
    '.section-title',
    '.about-photo-wrap',
    '.about-text',
    '.skills-col',
    '.project-card',
    '.contact-form',
    '.contact-social',
    '.timeline-item',
  ];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  animTargets.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('fade-up');
      el.style.transitionDelay = `${i * 60}ms`;
      observer.observe(el);
    });
  });

  /* ---------- Lightbox ---------- */
  const lightbox = document.getElementById('lightbox');
  const lbBackdrop = document.getElementById('lbBackdrop');
  const lbImg = document.getElementById('lbImg');
  const lbClose = document.getElementById('lbClose');
  const lbPrev = document.getElementById('lbPrev');
  const lbNext = document.getElementById('lbNext');
  const lbCounter = document.getElementById('lbCounter');

  let currentImages = [];
  let currentIndex = 0;

  function openLightbox(images, index) {
    currentImages = images;
    currentIndex = index;
    showImage();
    lightbox.classList.add('active');
    lbBackdrop.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    lbBackdrop.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lbImg.src = '';
  }

  function showImage() {
    lbImg.src = currentImages[currentIndex];
    lbCounter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
    lbPrev.style.display = currentImages.length <= 1 ? 'none' : '';
    lbNext.style.display = currentImages.length <= 1 ? 'none' : '';
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % currentImages.length;
    showImage();
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    showImage();
  }

  // Attach click events to project cards
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const gallery = card.querySelector('.project-img-gallery');
      if (!gallery) return;

      let images = [];
      try {
        images = JSON.parse(gallery.dataset.images || '[]');
      } catch (e) {
        images = [];
      }

      // If no real images configured, show placeholder message
      if (images.length === 0) return;

      // Filter to only valid (potentially existing) images
      // We just try to open the first; browser handles 404 gracefully
      openLightbox(images, 0);
    });
  });

  lbClose.addEventListener('click', closeLightbox);
  lbBackdrop.addEventListener('click', closeLightbox);
  lbNext.addEventListener('click', (e) => { e.stopPropagation(); nextImage(); });
  lbPrev.addEventListener('click', (e) => { e.stopPropagation(); prevImage(); });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  });

  // Touch swipe support
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });

  lightbox.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) {
      dx < 0 ? nextImage() : prevImage();
    }
  }, { passive: true });

  /* ---------- Contact Form ---------- */
  const contactForm = document.getElementById('contactForm');
  const submitBtn = contactForm.querySelector('button[type="submit"]');

  // Fill these in after CallMeBot registration
  const WA_PHONE   = 'YOUR_PHONE_WITH_COUNTRY_CODE'; // e.g. 917015396272
  const WA_APIKEY  = 'YOUR_CALLMEBOT_APIKEY';

  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name    = contactForm.querySelector('[name="name"]').value.trim();
    const email   = contactForm.querySelector('[name="email"]').value.trim();
    const message = contactForm.querySelector('[name="message"]').value.trim();

    if (!name || !email || !message) {
      alert('Please fill in all fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;

    try {
      const text = encodeURIComponent(
        `New Portfolio Message\n\nFrom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      );
      const url = `https://api.callmebot.com/whatsapp.php?phone=${WA_PHONE}&text=${text}&apikey=${WA_APIKEY}`;

      const res = await fetch(url);

      if (res.ok) {
        submitBtn.textContent = 'Message Sent!';
        contactForm.reset();
        setTimeout(() => {
          submitBtn.textContent = 'Send Message';
          submitBtn.disabled = false;
        }, 4000);
      } else {
        throw new Error('Failed');
      }
    } catch {
      alert('Something went wrong. Please try again.');
      submitBtn.textContent = 'Send Message';
      submitBtn.disabled = false;
    }
  });


})();


   //INFORMATICS MENTOR LTD — Main JavaScript


document.addEventListener('DOMContentLoaded', () => {


  // SCROLL REVEAL (Intersection Observer)
  

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 60);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.stat, .service-card, .project-card, .reveal').forEach((el) => {
    revealObserver.observe(el);
  });



  // ANIMATED COUNTERS


  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const card = entry.target.closest('[data-target]');
        if (!card) return;

        const target = parseInt(card.dataset.target, 10);
        const el = entry.target;
        let start = null;

        function step(ts) {
          if (!start) start = ts;
          const progress = Math.min((ts - start) / 1400, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.floor(ease * target);
          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            el.textContent = target;
          }
        }

        requestAnimationFrame(step);
        counterObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll('.count').forEach((el) => counterObserver.observe(el));


  // SMOOTH SCROLL FOR ANCHOR LINKS


  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetEl = document.querySelector(anchor.getAttribute('href'));
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // NAV SCROLL EFFECT

  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    nav.style.background = window.scrollY > 100
      ? 'rgba(7,10,13,0.95)'
      : 'rgba(7,10,13,0.8)';
  });

  // MOBILE NAV

  const mobileNav = document.getElementById('mobileNav');
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileClose = document.querySelector('.mobile-nav-close');

  if (hamburger) {
    hamburger.addEventListener('click', () => mobileNav.classList.add('open'));
  }
  if (mobileClose) {
    mobileClose.addEventListener('click', () => mobileNav.classList.remove('open'));
  }

  // Close mobile nav when a link is clicked
  if (mobileNav) {
    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => mobileNav.classList.remove('open'));
    });
  }


  // SERVICE CARD EXPAND / COLLAPSE


  document.querySelectorAll('.service-expand-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.service-card');
      card.classList.toggle('expanded');
    });
  });



  // CONTACT FORM — mailto handler


  const submitBtn = document.getElementById('submitBtn');
  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      const firstName = (document.getElementById('firstName').value || '').trim();
      const lastName  = (document.getElementById('lastName').value || '').trim();
      const email     = (document.getElementById('email').value || '').trim();
      const service   = (document.getElementById('service').value || '').trim();
      const message   = (document.getElementById('message').value || '').trim();

      const subject = encodeURIComponent('Website Enquiry — ' + (service || 'General'));
      const body = encodeURIComponent(
        'Name: ' + firstName + ' ' + lastName + '\n' +
        'Email: ' + email + '\n' +
        'Service: ' + service + '\n\n' +
        message
      );
      window.location.href = 'mailto:info@informaticsmentor.com?subject=' + subject + '&body=' + body;
    });
  }

});

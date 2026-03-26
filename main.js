/* ═══════════════════════════════════════════════════════
   Bharathiar University Distance MBA 2026 — JavaScript
   ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─────────────────────────────────────────
     1. INTERSECTION OBSERVER — Fade-in sections
     ───────────────────────────────────────── */
  const fadeEls = document.querySelectorAll('.fade-in');

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target); // animate once only
      }
    });
  }, { threshold: 0.12 });

  fadeEls.forEach(el => fadeObserver.observe(el));


  /* ─────────────────────────────────────────
     2. INTERSECTION OBSERVER — Staggered steps
     ───────────────────────────────────────── */
  const steps = document.querySelectorAll('.step');

  const stepObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // stagger each step by 120ms
        const idx = Array.from(steps).indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, idx * 120);
        stepObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  steps.forEach(step => stepObserver.observe(step));


  /* ─────────────────────────────────────────
     3. BACK-TO-TOP BUTTON
     ───────────────────────────────────────── */
  const btn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  /* ─────────────────────────────────────────
     4. ACTIVE NAV HIGHLIGHT (if nav added)
     ───────────────────────────────────────── */
  const sections = document.querySelectorAll('section.section');
  const navLinks = document.querySelectorAll('.toc-link');

  if (navLinks.length > 0) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => link.classList.remove('active'));
          const id = entry.target.getAttribute('id');
          const active = document.querySelector(`.toc-link[href="#${id}"]`);
          if (active) active.classList.add('active');
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(sec => {
      if (sec.id) navObserver.observe(sec);
    });
  }


  /* ─────────────────────────────────────────
     5. SPEC PILL HOVER ANIMATION
     ───────────────────────────────────────── */
  const pills = document.querySelectorAll('.spec-pill');

  pills.forEach(pill => {
    pill.addEventListener('mouseenter', () => {
      pill.style.background = 'var(--accent)';
      pill.style.transition = 'background 0.2s ease';
    });
    pill.addEventListener('mouseleave', () => {
      pill.style.background = 'var(--ink)';
    });
  });


  /* ─────────────────────────────────────────
     6. RANK CARD COUNT-UP ANIMATION
     ───────────────────────────────────────── */
  function animateCountUp(el) {
    const raw = el.textContent.trim();
    const num = parseInt(raw.replace(/\D/g, ''), 10);
    if (isNaN(num)) return;

    const suffix = raw.replace(/[\d]/g, '');
    let start = 0;
    const duration = 900;
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(ease * num) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
  }

  const rankVals = document.querySelectorAll('.rank-val');
  const rankObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCountUp(entry.target);
        rankObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  rankVals.forEach(el => rankObserver.observe(el));

});

// Nav background swap on scroll
const nav = document.querySelector('.nav');
function updateNav() {
  if (!nav) return;
  nav.classList.toggle('scrolled', window.scrollY > 12);
}
document.addEventListener('scroll', updateNav, {passive: true});
updateNav();

// Reveal-on-scroll for feature/step blocks
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealEls = document.querySelectorAll('.reveal');
if (!reduceMotion && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {threshold: 0.15},
  );
  revealEls.forEach(el => observer.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('is-visible'));
}

// Parallax for hero blobs + phone mockup — moves slower/faster than scroll for depth.
const parallaxEls = document.querySelectorAll('[data-parallax]');
if (!reduceMotion && parallaxEls.length) {
  let ticking = false;
  function applyParallax() {
    const scrollY = window.scrollY;
    parallaxEls.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.2;
      el.style.transform = `translateY(${scrollY * speed}px)`;
    });
    ticking = false;
  }
  document.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        window.requestAnimationFrame(applyParallax);
        ticking = true;
      }
    },
    {passive: true},
  );
  applyParallax();
}

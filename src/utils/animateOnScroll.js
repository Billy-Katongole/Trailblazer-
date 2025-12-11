// Lightweight IntersectionObserver helper that adds .reveal-visible to elements with [data-animate]
export default function initAnimateOnScroll(options = {}){
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

  const rootMargin = options.rootMargin || '0px 0px -10% 0px';
  const threshold = options.threshold === undefined ? 0.05 : options.threshold;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      const el = entry.target;
      if (entry.isIntersecting) {
        el.classList.add('reveal-visible');
        el.classList.remove('reveal-hidden');
        // If element should only reveal once
        if (el.dataset.animateOnce !== undefined) {
          obs.unobserve(el);
        }
      } else {
        // If the element should re-hide when out of view, only if explicit attribute provided
        if (el.dataset.animateReset !== undefined) {
          el.classList.remove('reveal-visible');
          el.classList.add('reveal-hidden');
        }
      }
    });
  }, { rootMargin, threshold });

  const els = Array.from(document.querySelectorAll('[data-animate]'));
  els.forEach((el, i) => {
    // add initial hidden class if not present
    if (!el.classList.contains('reveal-hidden') && !el.classList.contains('reveal-visible')){
      el.classList.add('reveal-hidden');
    }
    // optional delay
    const delay = el.dataset.animateDelay;
    if (delay) el.classList.add(`reveal-delay-${delay}`);

    // left/right variants
    const dir = el.dataset.animateDir;
    if (dir === 'left') el.classList.add('reveal-left');
    if (dir === 'right') el.classList.add('reveal-right');

    observer.observe(el);
  });

  return observer;
}

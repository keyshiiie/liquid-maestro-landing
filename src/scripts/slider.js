export function initSlider(root) {
  const track = root.querySelector('[data-slider-track]');
  const prevBtn = root.querySelector('[data-prev]');
  const nextBtn = root.querySelector('[data-next]');
  const dotsContainer = root.querySelector('[data-dots]');
  if (!track || !dotsContainer) return;

  const cards = track.querySelectorAll('.menu-card');
  if (cards.length === 0) return;

  let currentIndex = 0;
  const controller = new AbortController();
  const { signal } = controller;

  // Точки
  dotsContainer.innerHTML = '';
  const dots = Array.from(cards).map((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'slider-dot';
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.addEventListener('click', () => goTo(i), { signal });
    dotsContainer.appendChild(dot);
    return dot;
  });

  function goTo(index) {
    if (index < 0) index = 0;
    if (index >= cards.length) index = cards.length - 1;
    currentIndex = index;

    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));

    if (prevBtn) prevBtn.disabled = currentIndex === 0;
    if (nextBtn) nextBtn.disabled = currentIndex === cards.length - 1;
  }

  const next = () => goTo(currentIndex + 1);
  const prev = () => goTo(currentIndex - 1);

  if (nextBtn) nextBtn.addEventListener('click', next, { signal });
  if (prevBtn) prevBtn.addEventListener('click', prev, { signal });

  // Свайп
  const container = root.querySelector('.slider-container');
  let startX = 0;
  if (container) {
    container.addEventListener(
      'touchstart',
      (e) => {
        startX = e.changedTouches[0].screenX;
      },
      { signal, passive: true }
    );
    container.addEventListener(
      'touchend',
      (e) => {
        const diff = startX - e.changedTouches[0].screenX;
        if (Math.abs(diff) > 50) {
          diff > 0 ? next() : prev();
        }
      },
      { signal, passive: true }
    );
  }

  goTo(0);
}
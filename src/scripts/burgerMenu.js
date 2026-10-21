export function initBurgerMenu() {
  const burger = document.querySelector('.burger-menu');
  const overlay = document.getElementById('burgerOverlay');
  if (!burger || !overlay) return;

  const links = overlay.querySelectorAll('.burger-nav__link');
  const controller = new AbortController();
  const { signal } = controller;

  const open = () => {
    overlay.classList.add('active');
    burger.classList.add('active');
    burger.setAttribute('aria-expanded', 'true');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
  };

  const close = () => {
    overlay.classList.remove('active');
    burger.classList.remove('active');
    burger.setAttribute('aria-expanded', 'false');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
  };

  const toggle = () => (overlay.classList.contains('active') ? close() : open());

  burger.addEventListener('click', toggle, { signal });

  links.forEach((link) =>
    link.addEventListener('click', () => close(), { signal })
  );

  overlay.addEventListener(
    'click',
    (e) => {
      if (e.target === overlay) close();
    },
    { signal }
  );

  document.addEventListener(
    'keydown',
    (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('active')) close();
    },
    { signal }
  );

  // Плавный скролл по внутренним якорям
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener(
      'click',
      (e) => {
        const href = anchor.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      },
      { signal }
    );
  });
}
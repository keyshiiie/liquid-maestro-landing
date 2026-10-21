export function initCustomSelect() {
  const wrapper = document.querySelector('.custom-select-wrapper');
  if (!wrapper) return;

  const display = wrapper.querySelector('.custom-select-input');
  const hidden = wrapper.querySelector('[data-select-value]');
  const dropdown = wrapper.querySelector('.custom-select-dropdown');
  const options = wrapper.querySelectorAll('.select-option');
  const controller = new AbortController();
  const { signal } = controller;

  const open = () => {
    dropdown.hidden = false;
    display.setAttribute('aria-expanded', 'true');
    display.classList.add('active');
  };

  const close = () => {
    dropdown.hidden = true;
    display.setAttribute('aria-expanded', 'false');
    display.classList.remove('active');
  };

  display.addEventListener(
    'click',
    (e) => {
      e.stopPropagation();
      dropdown.hidden ? open() : close();
    },
    { signal }
  );

  options.forEach((opt) => {
    const choose = () => {
      options.forEach((o) => o.classList.remove('selected'));
      opt.classList.add('selected');
      display.value = opt.textContent.trim();
      display.classList.add('valid');
      hidden.value = opt.dataset.value;
      close();
    };

    opt.addEventListener('click', choose, { signal });
    opt.addEventListener(
      'keydown',
      (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          choose();
        }
      },
      { signal }
    );
  });

  document.addEventListener(
    'click',
    (e) => {
      if (!wrapper.contains(e.target)) close();
    },
    { signal }
  );

  document.addEventListener(
    'keydown',
    (e) => {
      if (e.key === 'Escape') close();
    },
    { signal }
  );
}
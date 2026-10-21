const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];
const MONTHS_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

export function initPickers() {
  initDatePicker();
  initTimePicker();
}

function initDatePicker() {
  const wrapper = document.querySelector('.custom-date-wrapper');
  if (!wrapper) return;

  const input = wrapper.querySelector('.booking__input');
  const hidden = wrapper.querySelector('[data-date-value]');
  const picker = wrapper.querySelector('.custom-date-picker');
  const daysEl = picker.querySelector('.picker-days');
  const monthYearEl = picker.querySelector('.picker-month-year');

  const controller = new AbortController();
  const { signal } = controller;

  const today = new Date();
  let viewDate = new Date(today.getFullYear(), today.getMonth(), 1);
  let selected = null;

  const render = () => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    monthYearEl.textContent = `${MONTHS[month]} ${year}`;

    const firstDay = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startWeekday = firstDay.getDay() || 7; // пн=1, вс=7

    let html = '';
    for (let i = 1; i < startWeekday; i++) html += '<div class="picker-day other-month"></div>';
    for (let d = 1; d <= daysInMonth; d++) {
      const isSelected =
        selected &&
        selected.getDate() === d &&
        selected.getMonth() === month &&
        selected.getFullYear() === year;
      html += `<div class="picker-day${isSelected ? ' selected' : ''}" data-day="${d}">${d}</div>`;
    }
    daysEl.innerHTML = html;
  };

  const open = () => {
    picker.hidden = false;
    render();
  };
  const close = () => {
    picker.hidden = true;
  };

  input.addEventListener('click', (e) => {
    e.stopPropagation();
    picker.hidden ? open() : close();
  }, { signal });

  picker.querySelector('[data-action="prev-month"]').addEventListener('click', () => {
    viewDate.setMonth(viewDate.getMonth() - 1);
    render();
  }, { signal });

  picker.querySelector('[data-action="next-month"]').addEventListener('click', () => {
    viewDate.setMonth(viewDate.getMonth() + 1);
    render();
  }, { signal });

  daysEl.addEventListener('click', (e) => {
    const day = e.target.closest('[data-day]');
    if (!day) return;
    const d = parseInt(day.dataset.day, 10);
    selected = new Date(viewDate.getFullYear(), viewDate.getMonth(), d);
    const iso = selected.toISOString().slice(0, 10);
    hidden.value = iso;
    input.value = `${MONTHS_SHORT[selected.getMonth()]} ${selected.getDate()}, ${selected.getFullYear()}`;
    input.classList.add('valid');
    close();
  }, { signal });

  document.addEventListener('click', (e) => {
    if (!wrapper.contains(e.target)) close();
  }, { signal });
}

function initTimePicker() {
  const wrapper = document.querySelector('.custom-time-wrapper');
  if (!wrapper) return;

  const input = wrapper.querySelector('.booking__input');
  const hidden = wrapper.querySelector('[data-time-value]');
  const picker = wrapper.querySelector('.custom-time-picker');
  const options = picker.querySelectorAll('.time-option');
  const controller = new AbortController();
  const { signal } = controller;

  const close = () => {
    picker.hidden = true;
  };

  input.addEventListener('click', (e) => {
    e.stopPropagation();
    picker.hidden = !picker.hidden;
  }, { signal });

  options.forEach((opt) => {
    opt.addEventListener('click', () => {
      options.forEach((o) => o.classList.remove('selected'));
      opt.classList.add('selected');
      input.value = opt.textContent.trim();
      hidden.value = opt.textContent.trim();
      input.classList.add('valid');
      close();
    }, { signal });
  });

  document.addEventListener('click', (e) => {
    if (!wrapper.contains(e.target)) close();
  }, { signal });
}
export function initBookingForm() {
  const form = document.getElementById('bookingForm');
  if (!form) return;

  const submitBtn = form.querySelector('.booking__submit');
  const message = form.querySelector('[data-form-message]');

  const showMessage = (text, type) => {
    message.textContent = text;
    message.dataset.type = type;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    showMessage('', '');

    const formData = new FormData(form);
    const data = Object.fromEntries(formData);

    // Клиентская валидация
    if (!data.name || data.name.trim().length < 2) {
      return showMessage('Please enter your name', 'error');
    }
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      return showMessage('Please enter a valid email', 'error');
    }
    if (!data.phone || data.phone.trim().length < 5) {
      return showMessage('Please enter a valid phone number', 'error');
    }
    if (!data.people) return showMessage('Please select number of people', 'error');
    if (!data.date || !data.time) return showMessage('Please select date and time', 'error');

    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Server error');
      }

      showMessage('Booking submitted! We will contact you shortly.', 'success');
      form.reset();
      form.querySelectorAll('.valid').forEach((el) => el.classList.remove('valid'));
      form.querySelectorAll('[data-select-value], [data-date-value], [data-time-value]').forEach(
        (el) => (el.value = '')
      );
    } catch (err) {
      console.error(err);
      showMessage('Something went wrong. Please try again or call us directly.', 'error');
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Регистрируем плагин
gsap.registerPlugin(ScrollTrigger);

export function initAnimations() {
  // 1. Появление заголовков секций
  gsap.utils.toArray('.section__title, .about-us__title').forEach((title) => {
    gsap.from(title, {
      scrollTrigger: {
        trigger: title,
        start: "top 85%", // Начинаем, когда верх элемента достигнет 85% высоты экрана
        toggleActions: "play none none reverse", // play при скролле вниз, reverse при скролле вверх
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  });

  // 2. Появление текста в блоке About
  gsap.from('.about-us__description', {
    scrollTrigger: {
      trigger: '.about-us__description',
      start: "top 85%",
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    delay: 0.2,
    ease: "power3.out",
  });

  // 3. Появление картинок галереи каскадом
  gsap.from('.gallery img', {
    scrollTrigger: {
      trigger: '.gallery',
      start: "top 85%",
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2, // Задержка между элементами (0.2 сек)
    ease: "power3.out",
  });

  // 4. Появление строк в расписании
  gsap.from('.hours__item', {
    scrollTrigger: {
      trigger: '.schedule__grid',
      start: "top 80%",
    },
    x: -30, // Выезжают слева
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: "power2.out",
  });

  // 5. Слайдер меню
  gsap.from('.slider-wrapper', {
    scrollTrigger: {
      trigger: '.slider-wrapper',
      start: "top 80%",
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });

  // 6. Форма бронирования
  gsap.from('.booking__form-wrapper', {
    scrollTrigger: {
      trigger: '.booking',
      start: "top 70%",
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
  });
  
  // Появление контактов рядом с формой (если нужно)
  gsap.from('.booking__contact', {
    scrollTrigger: {
      trigger: '.booking',
      start: "top 70%",
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    delay: 0.2,
    ease: "power3.out",
  });

  // 7. Декор - Параллакс эффект (опционально, для красоты)
  gsap.to('.decor-a', {
    yPercent: 20, // Двигаем картинку вниз на 20% при скролле
    ease: "none",
    scrollTrigger: {
      trigger: '.about-us',
      start: "top bottom",
      end: "bottom top",
      scrub: true, // Привязывает анимацию к скроллу (анимация идет вместе с прокруткой)
    },
  });
}
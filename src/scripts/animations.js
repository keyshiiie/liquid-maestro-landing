import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initAnimations() {
  // ==========================================
  // 1. HERO (Анимация при загрузке, без скролла)
  // ==========================================
  const heroTl = gsap.timeline();
  
  heroTl
    .fromTo('.hero__subtitle', 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', clearProps: 'all' }
    )
    .fromTo('.hero__title', 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', clearProps: 'all' }, 
      '-=0.6'
    )
    .fromTo('.hero__description', 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', clearProps: 'all' }, 
      '-=0.7'
    )
    .fromTo('.hero__button', 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', clearProps: 'all' }, 
      '-=0.6'
    );

  // ==========================================
  // 2. Универсальный класс .reveal (ScrollTrigger)
  // ==========================================
  gsap.utils.toArray('.reveal').forEach((el) => {
    gsap.from(el, {
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      clearProps: 'all',
    });
  });

  // ==========================================
  // 3. Конкретные анимации для секций (Stagger)
  // ==========================================
  
  // Заголовки секций
  gsap.utils.toArray('.section__title').forEach((title) => {
    gsap.from(title, {
      scrollTrigger: { trigger: title, start: 'top 85%' },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      clearProps: 'all',
    });
  });

  // Блок About
  gsap.from('.about-us__description', {
    scrollTrigger: { trigger: '.about-us__description', start: 'top 85%' },
    y: 30,
    opacity: 0,
    duration: 0.8,
    delay: 0.2,
    ease: 'power3.out',
    clearProps: 'all',
  });

  // Галерея (каскадом)
  gsap.from('.gallery img', {
    scrollTrigger: { trigger: '.gallery', start: 'top 85%' },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power3.out',
    clearProps: 'all',
  });

  // Расписание (строки выезжают слева)
  gsap.from('.schedule .hours__item', {
    scrollTrigger: { trigger: '.schedule__grid', start: 'top 80%' },
    x: -30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out',
    clearProps: 'all',
  });

  // Слайдер меню
  gsap.from('.slider-wrapper', {
    scrollTrigger: { trigger: '.slider-wrapper', start: 'top 80%' },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    clearProps: 'all',
  });

  // Форма бронирования
  gsap.from('.booking__form-wrapper', {
    scrollTrigger: { trigger: '.booking', start: 'top 70%' },
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    clearProps: 'all',
  });

  // ==========================================
  // 4. Параллакс для декора (по желанию)
  // ==========================================
  gsap.to('.decor-a', {
    yPercent: 20,
    ease: 'none',
    scrollTrigger: {
      trigger: '.about-us',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });
}
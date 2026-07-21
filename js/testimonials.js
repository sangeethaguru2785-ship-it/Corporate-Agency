/* ==========================================================================
   NEXUS CORPORATE - TESTIMONIALS CAROUSEL
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const testimonials = document.querySelectorAll('.testimonial-card');
  const dots = document.querySelectorAll('.slider-dot');
  let currentSlide = 0;

  function showSlide(index) {
    testimonials.forEach(t => t.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));

    currentSlide = (index + testimonials.length) % testimonials.length;
    if (testimonials[currentSlide]) testimonials[currentSlide].classList.add('active');
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => showSlide(idx));
  });

  setInterval(() => {
    if (testimonials.length > 0) {
      showSlide(currentSlide + 1);
    }
  }, 6000);
});

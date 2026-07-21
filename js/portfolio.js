/* ==========================================================================
   NEXUS CORPORATE - PORTFOLIO PAGE (Filter)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioCards = document.querySelectorAll('.portfolio-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      portfolioCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || filter === category) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.4s ease forward';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});

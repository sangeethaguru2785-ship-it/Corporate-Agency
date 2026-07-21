/* ==========================================================================
   NEXUS CORPORATE - PRICING PAGE (Monthly/Annual Toggle)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const priceToggle = document.querySelector('.toggle-switch');
  const priceStarter = document.getElementById('priceStarter');
  const priceCorporate = document.getElementById('priceCorporate');
  const priceEnterprise = document.getElementById('priceEnterprise');

  if (priceToggle) {
    priceToggle.addEventListener('click', () => {
      priceToggle.classList.toggle('active');
      const isAnnual = priceToggle.classList.contains('active');

      if (priceStarter && priceCorporate && priceEnterprise) {
        priceStarter.textContent = isAnnual ? '$1,990' : '$2,490';
        priceCorporate.textContent = isAnnual ? '$4,790' : '$5,990';
        priceEnterprise.textContent = isAnnual ? '$9,500' : '$11,900';
      }
    });
  }
});

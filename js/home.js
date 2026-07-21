/* ==========================================================================
   NEXUS CORPORATE - HOME PAGE (Video Modal + Calculator)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Video Lightbox Modal
  const modalTrigger = document.querySelector('.video-modal-trigger');
  const modalOverlay = document.querySelector('.modal-overlay');
  const modalClose = document.querySelector('.modal-close');
  const modalIframe = document.querySelector('.modal-iframe');

  if (modalTrigger && modalOverlay) {
    modalTrigger.addEventListener('click', () => {
      modalOverlay.classList.add('active');
      if (modalIframe) {
        modalIframe.src = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';
      }
    });

    const closeModal = () => {
      modalOverlay.classList.remove('active');
      if (modalIframe) {
        modalIframe.src = '';
      }
    };

    if (modalClose) modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // ROI Calculator
  const projectScopeSlider = document.getElementById('calcScope');
  const projectTimelineSlider = document.getElementById('calcTimeline');
  const valScope = document.getElementById('valScope');
  const valTimeline = document.getElementById('valTimeline');
  const calcOutput = document.getElementById('calcOutput');

  function updateCalculator() {
    if (!projectScopeSlider || !projectTimelineSlider) return;
    const scope = parseInt(projectScopeSlider.value);
    const months = parseInt(projectTimelineSlider.value);

    valScope.textContent = scope >= 10 ? 'Enterprise Suite' : (scope >= 5 ? 'Growth Agency' : 'Core Startup');
    valTimeline.textContent = `${months} Month${months > 1 ? 's' : ''}`;

    const estimatedCost = (scope * 4500) + (months * 3200);
    calcOutput.textContent = `$${estimatedCost.toLocaleString()}`;
  }

  if (projectScopeSlider && projectTimelineSlider) {
    projectScopeSlider.addEventListener('input', updateCalculator);
    projectTimelineSlider.addEventListener('input', updateCalculator);
    updateCalculator();
  }
});

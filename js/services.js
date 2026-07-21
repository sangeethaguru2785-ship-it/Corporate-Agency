/* ==========================================================================
   NEXUS CORPORATE - SERVICES PAGE (ROI Calculator + FAQs)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
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

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const inner = item.querySelector('.faq-answer-inner');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-answer').style.maxHeight = '0';
        }
      });

      // Toggle current item
      if (isActive) {
        item.classList.remove('active');
        answer.style.maxHeight = '0';
      } else {
        item.classList.add('active');
        answer.style.maxHeight = inner.scrollHeight + 'px';
      }
    });
  });
});

/* ==========================================================================
   NEXUS CORPORATE - CONTACT PAGE (Form + Toast + FAQs + Map)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Contact Form
  const contactForm = document.getElementById('inquiryForm');
  const toastNotification = document.getElementById('toast');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      if (toastNotification) {
        toastNotification.classList.add('active');
        setTimeout(() => {
          toastNotification.classList.remove('active');
        }, 4000);
      }
      contactForm.reset();
    });
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.contact-faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.contact-faq-question');
    const answer = item.querySelector('.contact-faq-answer');
    const inner = item.querySelector('.contact-faq-answer-inner') || item.querySelector('.faq-answer-inner');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.contact-faq-answer').style.maxHeight = '0';
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

  // Map Tabs
  const mapTabs = document.querySelectorAll('.map-tab');
  const googleMap = document.getElementById('googleMap');
  const mapOverlayTitle = document.getElementById('mapOverlayTitle');
  const mapOverlayAddress = document.getElementById('mapOverlayAddress');

  const officeNames = {
    'New York': 'New York Headquarters',
    'London': 'London EMEA Hub',
    'Dubai': 'Dubai Middle East Office',
    'Singapore': 'Singapore Asia Pacific Office',
    'San Francisco': 'San Francisco West Coast Office',
    'Sydney': 'Sydney Australia Office'
  };

  mapTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active from all tabs
      mapTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Update map src
      const newMapUrl = tab.getAttribute('data-map');
      const newAddress = tab.getAttribute('data-address');
      const tabText = tab.textContent.trim();

      if (googleMap && newMapUrl) {
        googleMap.src = newMapUrl;
      }

      // Update overlay info
      if (mapOverlayTitle) {
        mapOverlayTitle.textContent = officeNames[tabText] || tabText + ' Office';
      }
      if (mapOverlayAddress) {
        mapOverlayAddress.textContent = newAddress;
      }
    });
  });
});

/* ==========================================================================
   STACKLY DASHBOARD - SHARED JavaScript
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  const sidebar = document.querySelector('.dash-sidebar');
  const sidebarToggle = document.querySelector('.dash-sidebar-toggle');
  const mainContent = document.querySelector('.dash-main');
  const overlay = document.querySelector('.dash-overlay');
  const mobileToggle = document.querySelector('.dash-mobile-toggle');
  const navItems = document.querySelectorAll('.dash-nav-item[href^="#"]');
  const sections = document.querySelectorAll('.dash-section');

  /* ======================== SIDEBAR TOGGLE ======================== */
  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        sidebar.classList.toggle('mobile-open');
        overlay.classList.toggle('active');
      } else {
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('sidebar-collapsed');
      }
    });
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      sidebar.classList.toggle('mobile-open');
      overlay.classList.toggle('active');
    });
  }

  if (overlay) {
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('mobile-open');
      overlay.classList.remove('active');
    });
  }

  /* ======================== SECTION NAVIGATION ======================== */
  const sectionAliases = {
    'sec-tickets': 'sec-services',
    'sec-saved': 'sec-quote',
    'sec-invoices': 'sec-payments',
    'sec-account': 'sec-notifications'
  };

  function resolveSection(id) {
    return sectionAliases[id] || id;
  }

  function showSection(targetId) {
    const resolved = resolveSection(targetId);
    let found = false;
    sections.forEach(sec => {
      if (sec.id === resolved) {
        sec.style.display = '';
        found = true;
      } else {
        sec.style.display = 'none';
      }
    });
    if (!found && sections.length) {
      sections[0].style.display = '';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function setActiveNav(item) {
    navItems.forEach(n => n.classList.remove('active'));
    if (item) item.classList.add('active');
  }

  function activateTab(sectionId, tabName) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    const tabs = section.querySelectorAll('.dash-tab');
    const contents = section.querySelectorAll('.dash-tab-content');
    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));
    const targetTab = section.querySelector(`.dash-tab[data-tab="${tabName}"]`);
    const targetContent = section.querySelector(`[data-tab-content="${tabName}"]`);
    if (targetTab) targetTab.classList.add('active');
    if (targetContent) targetContent.classList.add('active');
  }

  const sectionTabMap = {
    'sec-clients': 'clients',
    'sec-projects': 'projects',
    'sec-services': 'services'
  };

  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const href = item.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const targetId = href.substring(1);

      showSection(targetId);
      setActiveNav(item);
      localStorage.setItem('dash_active_section', targetId);

      const resolved = resolveSection(targetId);
      if (sectionTabMap[resolved]) {
        activateTab('sec-clients', sectionTabMap[resolved]);
      }

      if (window.innerWidth <= 768) {
        sidebar.classList.remove('mobile-open');
        overlay.classList.remove('active');
      }
    });
  });

  /* ======================== INITIAL STATE ======================== */
  const hash = window.location.hash.substring(1);
  const saved = localStorage.getItem('dash_active_section');
  const initialSection = hash || saved || 'sec-overview';
  const resolvedInitial = resolveSection(initialSection);

  if (hash || saved) {
    showSection(initialSection);
    navItems.forEach(item => {
      const href = item.getAttribute('href');
      if (href === '#' + initialSection || href === '#' + resolvedInitial) {
        setActiveNav(item);
      }
    });
    if (sectionTabMap[resolvedInitial]) {
      activateTab('sec-clients', sectionTabMap[resolvedInitial]);
    }
  }

  /* ======================== DASHBOARD NAV SPECIAL ======================== */
  const dashboardLink = document.querySelector('.dash-nav-item[href="#sec-overview"]');
  if (dashboardLink) {
    dashboardLink.addEventListener('click', (e) => {
      localStorage.removeItem('dash_active_section');
    });
  }

  /* ======================== TAB CLICKS (inline) ======================== */
  document.querySelectorAll('.dash-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      const tabGroup = tab.closest('.dash-tabs');
      const card = tabGroup.closest('.dash-card') || tabGroup.parentElement;

      tabGroup.querySelectorAll('.dash-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const contents = card.querySelectorAll('.dash-tab-content');
      contents.forEach(tc => tc.classList.remove('active'));
      const targetContent = card.querySelector(`[data-tab-content="${target}"]`);
      if (targetContent) targetContent.classList.add('active');
    });
  });

  /* ======================== DROPDOWNS ======================== */
  document.querySelectorAll('.dash-dropdown').forEach(dropdown => {
    const trigger = dropdown.querySelector('.dash-dropdown-trigger');
    const menu = dropdown.querySelector('.dash-dropdown-menu');

    if (trigger && menu) {
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        document.querySelectorAll('.dash-dropdown-menu.active').forEach(m => {
          if (m !== menu) m.classList.remove('active');
        });
        menu.classList.toggle('active');
      });
    }
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dash-dropdown')) {
      document.querySelectorAll('.dash-dropdown-menu.active').forEach(m => m.classList.remove('active'));
    }
  });

  /* ======================== SEARCH ======================== */
  const searchInput = document.querySelector('.dash-search input');
  if (searchInput) {
    searchInput.addEventListener('focus', () => {
      searchInput.parentElement.style.width = '300px';
    });
    searchInput.addEventListener('blur', () => {
      searchInput.parentElement.style.width = '';
    });
  }

  /* ======================== BACK TO TOP ======================== */
  const backToTop = document.querySelector('.dash-back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ======================== NOTIFICATION DOT ======================== */
  document.querySelectorAll('.notification-dot').forEach(dot => {
    setInterval(() => {
      dot.style.transform = dot.style.transform === 'scale(1.2)' ? 'scale(1)' : 'scale(1.2)';
    }, 1500);
  });

  /* ======================== TABLE ROW SELECTION ======================== */
  document.querySelectorAll('.dash-table tbody tr').forEach(row => {
    row.addEventListener('click', () => {
      row.classList.toggle('selected');
    });
  });

  /* ======================== SELECT ALL CHECKBOX ======================== */
  const selectAllCheckbox = document.querySelector('.dash-select-all');
  if (selectAllCheckbox) {
    selectAllCheckbox.addEventListener('change', () => {
      document.querySelectorAll('.dash-table .row-checkbox').forEach(cb => {
        cb.checked = selectAllCheckbox.checked;
      });
    });
  }

  /* ======================== ANIMATE STATS ======================== */
  const statValues = document.querySelectorAll('.dash-stat-value');
  statValues.forEach(el => {
    const target = parseInt(el.dataset.value || el.textContent.replace(/[^0-9]/g, ''));
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    let current = 0;
    const increment = target / 40;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
    }, 30);
  });

  /* ======================== ANIMATE PROGRESS BARS ======================== */
  document.querySelectorAll('.dash-progress-bar').forEach(bar => {
    const width = bar.dataset.progress || '0';
    setTimeout(() => {
      bar.style.width = width + '%';
    }, 300);
  });

  /* ======================== RESPONSIVE ======================== */
  const checkResponsive = () => {
    if (window.innerWidth <= 768 && sidebar) {
      sidebar.classList.remove('collapsed');
      mainContent.classList.remove('sidebar-collapsed');
    }
  };
  window.addEventListener('resize', checkResponsive);
  checkResponsive();
});

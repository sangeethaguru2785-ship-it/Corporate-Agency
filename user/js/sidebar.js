function renderUserSidebar(activePage) {
  const currentUser = JSON.parse(localStorage.getItem('stackly_current_user') || '{}');
  const userName = currentUser.name || 'User';
  const userEmail = currentUser.email || 'user@stackly.com';
  const userInitial = userName.charAt(0).toUpperCase();

  const pages = {
    'dashboard': { title: 'Dashboard', icon: 'ri-dashboard-3-line', breadcrumb: 'Dashboard' },
    'profile': { title: 'My Profile', icon: 'ri-user-settings-line', breadcrumb: 'My Profile' },
    'applications': { title: 'My Applications', icon: 'ri-folder-line', breadcrumb: 'My Applications', badge: '12' },
    'appointments': { title: 'My Appointments', icon: 'ri-calendar-check-line', breadcrumb: 'My Appointments', badge: '3' },
    'documents': { title: 'Documents', icon: 'ri-download-2-line', breadcrumb: 'Documents' },
    'notifications': { title: 'Notifications', icon: 'ri-notification-3-line', breadcrumb: 'Notifications' },
    'help': { title: 'Help & Support', icon: 'ri-question-line', breadcrumb: 'Help & Support' },
    'settings': { title: 'Settings', icon: 'ri-settings-3-line', breadcrumb: 'Settings' }
  };

  const currentPage = pages[activePage] || pages['dashboard'];

  const sidebarHTML = `
    <aside class="dash-sidebar">
      <div class="dash-sidebar-header">
        <a href="../index.html" class="dash-sidebar-logo">
          <img src="../images/logo.webp" alt="Stackly Logo">
        </a>
        <button class="dash-sidebar-toggle"><i class="ri-arrow-left-double-line"></i></button>
      </div>
      <nav class="dash-sidebar-nav">
        <div class="dash-nav-section">
          <div class="dash-nav-section-title">Main</div>
          <a class="dash-nav-item ${activePage === 'dashboard' ? 'active' : ''}" href="index.html"><i class="ri-dashboard-3-line"></i><span>Dashboard</span></a>
        </div>
        <div class="dash-nav-section">
          <div class="dash-nav-section-title">My Account</div>
          <a class="dash-nav-item ${activePage === 'profile' ? 'active' : ''}" href="profile.html"><i class="ri-user-settings-line"></i><span>My Profile</span></a>
          <a class="dash-nav-item ${activePage === 'applications' ? 'active' : ''}" href="applications.html"><i class="ri-folder-line"></i><span>My Applications</span><span class="badge-count">12</span></a>
          <a class="dash-nav-item ${activePage === 'appointments' ? 'active' : ''}" href="appointments.html"><i class="ri-calendar-check-line"></i><span>My Appointments</span><span class="badge-count">3</span></a>
        </div>
        <div class="dash-nav-section">
          <div class="dash-nav-section-title">Resources</div>
          <a class="dash-nav-item ${activePage === 'documents' ? 'active' : ''}" href="documents.html"><i class="ri-download-2-line"></i><span>Documents</span></a>
        </div>
        <div class="dash-nav-section">
          <div class="dash-nav-section-title">Communication</div>
          <a class="dash-nav-item ${activePage === 'notifications' ? 'active' : ''}" href="notifications.html"><i class="ri-notification-3-line"></i><span>Notifications</span></a>
        </div>
        <div class="dash-nav-section">
          <div class="dash-nav-section-title">Support</div>
          <a class="dash-nav-item ${activePage === 'help' ? 'active' : ''}" href="help.html"><i class="ri-question-line"></i><span>Help & Support</span></a>
          <a class="dash-nav-item ${activePage === 'settings' ? 'active' : ''}" href="settings.html"><i class="ri-settings-3-line"></i><span>Settings</span></a>
          <a class="dash-nav-item" href="../login.html"><i class="ri-logout-box-r-line"></i><span>Logout</span></a>
          <a href="../index.html" class="dash-home-btn"><i class="ri-home-5-line"></i><span>Go to Home</span></a>
        </div>
      </nav>
    </aside>`;

  const topbarHTML = `
    <header class="dash-topbar">
      <div class="dash-topbar-left">
        <button class="dash-mobile-toggle"><i class="ri-menu-line"></i></button>
        <div class="dash-breadcrumb">
          <a href="../index.html">Home</a>
          <span class="separator">/</span>
          <a href="index.html">Dashboard</a>
          <span class="separator">/</span>
          <span class="current">${currentPage.breadcrumb}</span>
        </div>
      </div>
      <div class="dash-topbar-right">
        <div class="dash-profile-dropdown">
          <button class="dash-profile-trigger">
            <span class="dash-avatar-letter">${userInitial}</span>
            <div class="dash-profile-info">
              <div class="dash-profile-name">${userName}</div>
              <div class="dash-profile-email">${userEmail}</div>
            </div>
            <i class="ri-arrow-down-s-line"></i>
          </button>
          <div class="dash-dropdown-menu">
            <a class="dash-profile-menu-item" href="profile.html"><i class="ri-user-settings-line"></i> My Profile</a>
            <a class="dash-profile-menu-item" href="settings.html"><i class="ri-settings-3-line"></i> Account Settings</a>
            <a class="dash-profile-menu-item" href="help.html"><i class="ri-question-line"></i> Help & Support</a>
            <div class="dash-profile-menu-divider"></div>
            <a class="dash-profile-menu-item danger" href="../login.html"><i class="ri-logout-box-r-line"></i> Logout</a>
          </div>
        </div>
      </div>
    </header>`;

  const dashboard = document.querySelector('.dashboard');
  if (dashboard) {
    dashboard.insertAdjacentHTML('afterbegin', sidebarHTML);
    const mainEl = dashboard.querySelector('.dash-main');
    if (mainEl) {
      mainEl.insertAdjacentHTML('afterbegin', topbarHTML);
    }
  }
}

function initUserDashboard() {
  const currentUser = JSON.parse(localStorage.getItem('stackly_current_user') || '{}');
  const firstName = currentUser.name ? currentUser.name.split(' ')[0] : 'User';

  const welcomeName = document.getElementById('dash-welcome-name');
  if (welcomeName) welcomeName.textContent = firstName;

  const profileName = document.getElementById('dash-profile-name');
  const profileEmail = document.getElementById('dash-profile-email');
  const profileAvatar = document.getElementById('dash-profile-avatar');
  const profileDisplayName = document.getElementById('dash-profile-display-name');
  const profileRole = document.getElementById('dash-profile-role');
  if (profileName && currentUser.name) profileName.value = currentUser.name;
  if (profileEmail && currentUser.email) profileEmail.value = currentUser.email;
  if (profileAvatar && currentUser.name) profileAvatar.textContent = currentUser.name.charAt(0).toUpperCase();
  if (profileDisplayName && currentUser.name) profileDisplayName.textContent = currentUser.name;
  if (profileRole && currentUser.role) profileRole.textContent = currentUser.role === 'admin' ? 'Super Admin' : 'Enterprise Client';

  const sidebar = document.querySelector('.dash-sidebar');
  const sidebarToggle = document.querySelector('.dash-sidebar-toggle');
  const mainContent = document.querySelector('.dash-main');
  const overlay = document.querySelector('.dash-overlay');
  const mobileToggle = document.querySelector('.dash-mobile-toggle');

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

  document.querySelectorAll('.dash-dropdown').forEach(dropdown => {
    const trigger = dropdown.querySelector('.dash-dropdown-trigger, .dash-dropdown > button:not(.dash-topbar-btn)');
    const menu = dropdown.querySelector('.dash-dropdown-menu');
    if (trigger && menu) {
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        document.querySelectorAll('.dash-dropdown-menu.active').forEach(m => {
          if (m !== menu) m.classList.remove('active');
        });
        menu.classList.toggle('active');
        dropdown.classList.toggle('open');
      });
    }
  });

  const profileDropdown = document.querySelector('.dash-profile-dropdown');
  if (profileDropdown) {
    const trigger = profileDropdown.querySelector('.dash-profile-trigger');
    const menu = profileDropdown.querySelector('.dash-dropdown-menu');
    if (trigger && menu) {
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        document.querySelectorAll('.dash-dropdown-menu.active').forEach(m => {
          if (m !== menu) m.classList.remove('active');
        });
        document.querySelectorAll('.dash-profile-dropdown.open').forEach(d => {
          if (d !== profileDropdown) d.classList.remove('open');
        });
        menu.classList.toggle('active');
        profileDropdown.classList.toggle('open');
      });
    }
  }

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dash-dropdown')) {
      document.querySelectorAll('.dash-dropdown-menu.active').forEach(m => m.classList.remove('active'));
    }
  });

  const searchInput = document.querySelector('.dash-search input');
  if (searchInput) {
    searchInput.addEventListener('focus', () => { searchInput.parentElement.style.width = '300px'; });
    searchInput.addEventListener('blur', () => { searchInput.parentElement.style.width = ''; });
  }

  const backToTop = document.querySelector('.dash-back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 300);
    });
    backToTop.addEventListener('click', () => { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }

  document.querySelectorAll('.dash-stat-value').forEach(el => {
    const target = parseInt(el.dataset.value || el.textContent.replace(/[^0-9]/g, ''));
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    let current = 0;
    const increment = target / 40;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
    }, 30);
  });

  document.querySelectorAll('.dash-progress-bar').forEach(bar => {
    const width = bar.dataset.progress || '0';
    setTimeout(() => { bar.style.width = width + '%'; }, 300);
  });

  const checkResponsive = () => {
    if (window.innerWidth <= 768 && sidebar) {
      sidebar.classList.remove('collapsed');
      mainContent.classList.remove('sidebar-collapsed');
    }
  };
  window.addEventListener('resize', checkResponsive);
  checkResponsive();

  document.addEventListener('click', function(e) {
    const target = e.target.closest('a, button');
    if (!target) return;
    if (target.closest('.dash-sidebar-nav')) return;
    if (target.closest('.dash-sidebar-logo')) return;
    if (target.closest('.dash-sidebar-toggle')) return;
    if (target.closest('.dash-mobile-toggle')) return;
    e.preventDefault();
    e.stopPropagation();
    window.location.href = '../404.html';
  });
}

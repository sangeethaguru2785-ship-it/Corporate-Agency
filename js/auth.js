document.addEventListener('DOMContentLoaded', () => {
  initPasswordToggles();
  initPasswordStrength();
  initFormValidation();
  initRoleTabs();
  initRememberMe();
});

/* ======================== TOGGLE PASSWORD VISIBILITY ======================== */
function initPasswordToggles() {
  document.querySelectorAll('.auth-toggle-password').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.closest('.auth-input-wrapper').querySelector('input');
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      btn.innerHTML = isPassword
        ? '<i class="ri-eye-off-line"></i>'
        : '<i class="ri-eye-line"></i>';
    });
  });
}

/* ======================== PASSWORD STRENGTH ======================== */
function initPasswordStrength() {
  const pwInput = document.getElementById('auth-password');
  if (!pwInput) return;

  const bars = document.querySelectorAll('.auth-strength-bar');
  const text = document.querySelector('.auth-strength-text');
  const reqs = document.querySelectorAll('.auth-password-reqs .auth-req');

  pwInput.addEventListener('input', () => {
    const val = pwInput.value;
    let score = 0;
    if (val.length >= 8) score++;
    if (val.length >= 12) score++;
    if (/[A-Z]/.test(val) && /[a-z]/.test(val)) score++;
    if (/\d/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;

    const level = score <= 1 ? 'weak' : score <= 3 ? 'medium' : 'strong';
    const labels = { weak: 'Weak', medium: 'Fair', strong: 'Strong' };
    const counts = { weak: 1, medium: 3, strong: 5 };

    bars.forEach((bar, i) => {
      bar.className = 'auth-strength-bar';
      if (i < counts[level]) bar.classList.add(level);
    });
    if (text) {
      text.textContent = val ? `Password strength: ${labels[level]}` : '';
      text.className = 'auth-strength-text' + (val ? ` ${level}` : '');
    }

    if (reqs.length) {
      const checks = [
        val.length >= 8,
        /[A-Z]/.test(val),
        /[a-z]/.test(val),
        /\d/.test(val),
        /[^A-Za-z0-9]/.test(val)
      ];
      reqs.forEach((req, i) => {
        req.classList.toggle('met', checks[i]);
      });
    }
  });
}

/* ======================== ROLE TABS ======================== */
function initRoleTabs() {
  document.querySelectorAll('.auth-role-option input').forEach(input => {
    input.addEventListener('change', () => {
      document.querySelectorAll('.auth-role-option input').forEach(i => {
        i.closest('.auth-role-option').classList.toggle('active', i.checked);
      });
    });
  });
}

/* ======================== REMEMBER ME ======================== */
function initRememberMe() {
  const emailField = document.getElementById('auth-email');
  const rememberCheck = document.getElementById('remember-me');
  if (!emailField || !rememberCheck) return;

  const saved = localStorage.getItem('stackly_remembered_email');
  if (saved) {
    emailField.value = saved;
    rememberCheck.checked = true;
  }
}

/* ======================== VALIDATION ======================== */
function initFormValidation() {
  const loginForm = document.getElementById('auth-login-form');
  const signupForm = document.getElementById('auth-signup-form');

  if (loginForm) setupLoginValidation(loginForm);
  if (signupForm) setupSignupValidation(signupForm);
}

function setFieldError(field, message) {
  field.classList.add('error');
  field.classList.remove('success');
  const errorEl = field.closest('.auth-form-group').querySelector('.auth-error');
  if (errorEl) {
    errorEl.innerHTML = `<i class="ri-error-warning-line"></i> ${message}`;
    errorEl.classList.add('visible');
  }
}

function clearFieldError(field) {
  field.classList.remove('error');
  const errorEl = field.closest('.auth-form-group').querySelector('.auth-error');
  if (errorEl) errorEl.classList.remove('visible');
}

function setFieldSuccess(field) {
  clearFieldError(field);
  field.classList.add('success');
}

/* ======================== LOGIN ======================== */
function setupLoginValidation(form) {
  const email = form.querySelector('#auth-email');
  const password = form.querySelector('#auth-password');

  [email, password].forEach(f => {
    f.addEventListener('input', () => clearFieldError(f));
    f.addEventListener('blur', () => {
      if (f.value.trim()) validateLoginField(f);
    });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    if (!validateLoginField(email)) valid = false;
    if (!validateLoginField(password)) valid = false;

    const selectedRole = form.querySelector('input[name="role"]:checked');
    if (!selectedRole) {
      showToast('Please select a role', 'error');
      valid = false;
    }

    const rememberCheck = document.getElementById('remember-me');
    if (rememberCheck && !rememberCheck.checked) {
      showToast('Please check "Remember Me" before signing in', 'error');
      valid = false;
    }

    if (!valid) return;

    const submitBtn = form.querySelector('.auth-submit');
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;

      const roleValue = selectedRole.value;
      const emailVal = email.value.trim().toLowerCase();
      const rememberMe = document.getElementById('remember-me');

      if (rememberMe && rememberMe.checked) {
        localStorage.setItem('stackly_remembered_email', email.value.trim());
      } else {
        localStorage.removeItem('stackly_remembered_email');
      }

      const accounts = JSON.parse(localStorage.getItem('stackly_accounts') || '[]');
      const account = accounts.find(a => a.email.toLowerCase() === emailVal && a.role === roleValue);

      const userName = account ? account.name : emailVal.split('@')[0];
      const userEmail = account ? account.email : email.value.trim();
      const userAvatar = account && account.avatar ? account.avatar : '../images/photo-1507003211169-0a1dd7228f2d.webp';

      localStorage.setItem('stackly_current_user', JSON.stringify({
        name: userName,
        email: userEmail,
        role: roleValue,
        avatar: userAvatar
      }));

      showToast(`Welcome back! Redirecting to ${roleValue} dashboard...`, 'success');

      setTimeout(() => {
        window.location.href = roleValue === 'admin' ? 'admin.html' : 'user.html';
      }, 800);
    }, 1500);
  });
}

function validateLoginField(field) {
  const val = field.value.trim();
  const id = field.id;

  if (id === 'auth-email') {
    if (!val) { setFieldError(field, 'Email or username is required'); return false; }
    if (val.includes('@') && !isValidEmail(val)) { setFieldError(field, 'Please enter a valid email'); return false; }
  }

  if (id === 'auth-password') {
    if (!val) { setFieldError(field, 'Password is required'); return false; }
    if (val.length < 8) { setFieldError(field, 'Password must be at least 8 characters'); return false; }
    if (!/[A-Z]/.test(val)) { setFieldError(field, 'Password must contain at least one uppercase letter'); return false; }
    if (!/[a-z]/.test(val)) { setFieldError(field, 'Password must contain at least one lowercase letter'); return false; }
    if (!/\d/.test(val)) { setFieldError(field, 'Password must contain at least one number'); return false; }
    if (!/[^A-Za-z0-9]/.test(val)) { setFieldError(field, 'Password must contain at least one special character'); return false; }
  }

  setFieldSuccess(field);
  return true;
}

/* ======================== SIGNUP ======================== */
function setupSignupValidation(form) {
  const name = form.querySelector('#auth-name');
  const email = form.querySelector('#auth-email');
  const phone = form.querySelector('#auth-phone');
  const password = form.querySelector('#auth-password');
  const confirmPassword = form.querySelector('#auth-confirm-password');
  const terms = form.querySelector('#terms-checkbox');

  [name, email, phone, password, confirmPassword].forEach(f => {
    f.addEventListener('input', () => {
      clearFieldError(f);
      if (f === confirmPassword && f.value) {
        if (f.value !== password.value) {
          setFieldError(f, 'Passwords do not match');
        } else {
          setFieldSuccess(f);
        }
      }
    });
    f.addEventListener('blur', () => {
      if (f.value.trim()) validateSignupField(f);
    });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    if (!validateSignupField(name)) valid = false;
    if (!validateSignupField(email)) valid = false;
    if (phone.value.trim() && !validateSignupField(phone)) valid = false;
    if (!validateSignupField(password)) valid = false;
    if (!validateSignupField(confirmPassword)) valid = false;

    const selectedRole = form.querySelector('input[name="role"]:checked');
    if (!selectedRole) {
      showToast('Please select a role', 'error');
      valid = false;
    }

    if (!terms.checked) {
      showToast('You must agree to the Terms & Conditions', 'error');
      valid = false;
    }

    if (!valid) return;

    const submitBtn = form.querySelector('.auth-submit');
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;

      const roleValue = selectedRole.value;
      const nameVal = name.value.trim();
      const emailVal = email.value.trim();
      const phoneVal = phone.value.trim();

      const accounts = JSON.parse(localStorage.getItem('stackly_accounts') || '[]');
      accounts.push({
        name: nameVal,
        email: emailVal,
        phone: phoneVal,
        role: roleValue,
        avatar: '../images/photo-1507003211169-0a1dd7228f2d.webp'
      });
      localStorage.setItem('stackly_accounts', JSON.stringify(accounts));

      showToast('Account created successfully! Redirecting to login...', 'success');

      setTimeout(() => {
        window.location.href = 'login.html';
      }, 1500);
    }, 2000);
  });
}

function validateSignupField(field) {
  const val = field.value.trim();
  const id = field.id;

  if (id === 'auth-name') {
    if (!val) { setFieldError(field, 'Full name is required'); return false; }
    if (val.length < 2) { setFieldError(field, 'Name must be at least 2 characters'); return false; }
    if (!/^[a-zA-Z\s'-]+$/.test(val)) { setFieldError(field, 'Name can only contain letters'); return false; }
  }

  if (id === 'auth-email') {
    if (!val) { setFieldError(field, 'Email address is required'); return false; }
    if (!isValidEmail(val)) { setFieldError(field, 'Please enter a valid email address'); return false; }
  }

  if (id === 'auth-phone') {
    if (val && !/^[\d\s+\-().]{7,20}$/.test(val)) { setFieldError(field, 'Please enter a valid phone number'); return false; }
  }

  if (id === 'auth-password') {
    if (!val) { setFieldError(field, 'Password is required'); return false; }
    if (val.length < 8) { setFieldError(field, 'Password must be at least 8 characters'); return false; }
    if (!/[A-Z]/.test(val)) { setFieldError(field, 'Password must contain at least one uppercase letter'); return false; }
    if (!/[a-z]/.test(val)) { setFieldError(field, 'Password must contain at least one lowercase letter'); return false; }
    if (!/\d/.test(val)) { setFieldError(field, 'Password must contain at least one number'); return false; }
    if (!/[^A-Za-z0-9]/.test(val)) { setFieldError(field, 'Password must contain at least one special character'); return false; }
  }

  if (id === 'auth-confirm-password') {
    const password = document.getElementById('auth-password');
    if (!val) { setFieldError(field, 'Please confirm your password'); return false; }
    if (val !== password.value) { setFieldError(field, 'Passwords do not match'); return false; }
  }

  setFieldSuccess(field);
  return true;
}

/* ======================== UTILITIES ======================== */
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ======================== TOAST ======================== */
function showToast(message, type = 'info') {
  const existing = document.querySelector('.auth-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `auth-toast auth-toast-${type}`;
  toast.innerHTML = `
    <i class="ri-${type === 'success' ? 'check-line' : type === 'error' ? 'error-warning-line' : 'information-line'}"></i>
    <span>${message}</span>
  `;
  document.body.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add('visible'));

  setTimeout(() => {
    toast.classList.remove('visible');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

const toastStyles = document.createElement('style');
toastStyles.textContent = `
  .auth-toast {
    position: fixed;
    top: 1.5rem;
    right: 1.5rem;
    padding: 0.85rem 1.25rem;
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    font-weight: 500;
    z-index: 9999;
    transform: translateX(120%);
    transition: transform 0.3s ease;
    box-shadow: 0 8px 30px rgba(0,0,0,0.3);
  }
  .auth-toast.visible { transform: translateX(0); }
  .auth-toast-success {
    background: #059669;
    color: #fff;
  }
  .auth-toast-error {
    background: #dc2626;
    color: #fff;
  }
  .auth-toast-info {
    background: var(--primary-orange);
    color: #fff;
  }
  @media (max-width: 480px) {
    .auth-toast {
      left: 1rem;
      right: 1rem;
      top: auto;
      bottom: 1.5rem;
    }
  }
`;
document.head.appendChild(toastStyles);

/* ==========================================================================
   EMAIL VALIDATOR - Stackly
   Validates email inputs: only A-Z, a-z, 0-9, @, .
   ========================================================================== */
(function () {
  const EMAIL_REGEX = /^[A-Za-z0-9@.]+$/;
  const EMAIL_FORMAT = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const ERROR_MSG = 'Please enter a valid email address (letters, numbers, @ and . only).';

  function getErrorEl(input) {
    let next = input.nextElementSibling;
    if (next && next.classList.contains('email-error-msg')) return next;
    const wrapper = input.closest('.auth-input-wrapper') || input.parentElement;
    next = wrapper.querySelector('.email-error-msg');
    if (next) return next;
    const el = document.createElement('div');
    el.className = 'email-error-msg';
    el.innerHTML = '<i class="ri-error-warning-line"></i> ' + ERROR_MSG;
    wrapper.appendChild(el);
    return el;
  }

  function validate(input) {
    const val = input.value.trim();
    const errorEl = getErrorEl(input);
    const wrapper = input.closest('.auth-input-wrapper') || input.parentElement;

    if (val === '') {
      input.classList.remove('email-invalid');
      if (wrapper) wrapper.classList.remove('email-field-invalid');
      errorEl.classList.remove('visible');
      return true;
    }

    const charsValid = EMAIL_REGEX.test(val);
    const formatValid = EMAIL_FORMAT.test(val);
    const valid = charsValid && formatValid;

    if (valid) {
      input.classList.remove('email-invalid');
      if (wrapper) wrapper.classList.remove('email-field-invalid');
      errorEl.classList.remove('visible');
    } else {
      input.classList.add('email-invalid');
      if (wrapper) wrapper.classList.add('email-field-invalid');
      errorEl.classList.add('visible');
    }
    return valid;
  }

  function blockInvalidChars(input, e) {
    const allowed = /^[A-Za-z0-9@.\-]$/;
    if (e.key && e.key.length === 1 && !allowed.test(e.key)) {
      e.preventDefault();
      return false;
    }
    return true;
  }

  function init() {
    const emailInputs = document.querySelectorAll('input[type="email"], input#auth-email');
    emailInputs.forEach(function (input) {
      input.setAttribute('pattern', '[A-Za-z0-9@.]+');
      input.setAttribute('autocomplete', 'email');

      input.addEventListener('input', function () {
        validate(input);
      });
      input.addEventListener('blur', function () {
        validate(input);
      });
      input.addEventListener('keypress', function (e) {
        blockInvalidChars(input, e);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

// ============================================
// EMPROIUMVIPANI - components.js
// Reusable UI utilities for the frontend
// ============================================

// 1) Toast / Notification Manager
const Toast = (() => {
  const CONTAINER_ID = 'toast-container';

  function ensureContainer() {
    let container = document.getElementById(CONTAINER_ID);
    if (!container) {
      container = document.createElement('div');
      container.id = CONTAINER_ID;
      container.style.position = 'fixed';
      container.style.top = '20px';
      container.style.right = '20px';
      container.style.zIndex = '9999';
      container.style.display = 'flex';
      container.style.flexDirection = 'column';
      container.style.gap = '12px';
      container.style.pointerEvents = 'none';
      document.body.appendChild(container);
    }
    return container;
  }

  function createToastElement(message, type) {
    const el = document.createElement('div');
    el.dataset.toast = Date.now().toString();
    el.style.minWidth = '240px';
    el.style.maxWidth = '320px';
    el.style.padding = '12px 16px';
    el.style.borderRadius = '999px';
    el.style.display = 'flex';
    el.style.alignItems = 'center';
    el.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
    el.style.pointerEvents = 'auto';
    el.style.transition = 'transform 0.2s ease, opacity 0.2s ease';
    el.style.transform = 'translateX(0)';
    el.style.opacity = '1';
    el.style.fontFamily = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
    el.style.fontSize = '14px';

    let bg = '#111827';
    let color = '#f9fafb';
    let icon = 'ℹ️';

    if (type === 'success') {
      bg = '#047857';
      color = '#ecfdf5';
      icon = '✅';
    } else if (type === 'error') {
      bg = '#b91c1c';
      color = '#fee2e2';
      icon = '⚠️';
    } else if (type === 'warning') {
      bg = '#92400e';
      color = '#fffbeb';
      icon = '⚠️';
    }

    el.style.background = bg;
    el.style.color = color;

    const iconSpan = document.createElement('span');
    iconSpan.textContent = icon;
    iconSpan.style.marginRight = '8px';

    const msgSpan = document.createElement('span');
    msgSpan.textContent = message;
    msgSpan.style.flex = '1';

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '×';
    closeBtn.style.marginLeft = '8px';
    closeBtn.style.border = 'none';
    closeBtn.style.background = 'transparent';
    closeBtn.style.color = color;
    closeBtn.style.cursor = 'pointer';
    closeBtn.style.fontSize = '16px';
    closeBtn.style.lineHeight = '1';

    closeBtn.addEventListener('click', () => hideToast(el));

    el.appendChild(iconSpan);
    el.appendChild(msgSpan);
    el.appendChild(closeBtn);

    return el;
  }

  function show(message, type = 'info', duration = 4000) {
    const container = ensureContainer();
    const toastEl = createToastElement(message, type);
    container.appendChild(toastEl);

    const timer = setTimeout(() => hideToast(toastEl), duration);
    toastEl.dataset.timer = timer;
  }

  function hideToast(el) {
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateX(20px)';
    const timer = el.dataset.timer;
    if (timer) clearTimeout(Number(timer));
    setTimeout(() => {
      if (el && el.parentNode) el.parentNode.removeChild(el);
    }, 200);
  }

  return { show };
})();

// 2) Loading Overlay
const LoadingOverlay = (() => {
  const ID = 'global-loading-overlay';

  function show(message = 'Processing your request...') {
    if (document.getElementById(ID)) return;
    const overlay = document.createElement('div');
    overlay.id = ID;
    overlay.style.position = 'fixed';
    overlay.style.inset = '0';
    overlay.style.background = 'rgba(15,23,42,0.65)';
    overlay.style.display = 'flex';
    overlay.style.flexDirection = 'column';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = '9998';
    overlay.style.backdropFilter = 'blur(4px)';

    const box = document.createElement('div');
    box.style.background = '#0b1120';
    box.style.borderRadius = '24px';
    box.style.padding = '24px 28px';
    box.style.boxShadow = '0 25px 50px rgba(0,0,0,0.4)';
    box.style.display = 'flex';
    box.style.flexDirection = 'column';
    box.style.alignItems = 'center';
    box.style.color = '#e5e7eb';
    box.style.minWidth = '260px';

    const spinner = document.createElement('div');
    spinner.style.width = '36px';
    spinner.style.height = '36px';
    spinner.style.borderRadius = '999px';
    spinner.style.border = '3px solid rgba(16,185,129,0.2)';
    spinner.style.borderTopColor = '#10b981';
    spinner.style.animation = 'spin 0.75s linear infinite';

    const label = document.createElement('div');
    label.textContent = message;
    label.style.marginTop = '12px';
    label.style.fontSize = '14px';
    label.style.fontFamily = "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

    const style = document.createElement('style');
    style.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);

    box.appendChild(spinner);
    box.appendChild(label);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
  }

  function hide() {
    const overlay = document.getElementById(ID);
    if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
  }

  return { show, hide };
})();

// 3) Simple Modal Helper (for non-Alpine modals if needed)
const ModalHelper = (() => {
  function openById(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.display = 'flex';
  }

  function closeById(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.display = 'none';
  }

  function bindCloseOnBackdrop(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('click', (e) => {
      if (e.target === el) closeById(id);
    });
  }

  return { openById, closeById, bindCloseOnBackdrop };
})();

// 4) Basic Form Validation Helpers
const FormValidator = (() => {
  function isEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).toLowerCase());
  }

  function isPhone(value) {
    return /^[0-9+\-\s]{7,15}$/.test(String(value));
  }

  function isNotEmpty(value) {
    return String(value || '').trim().length > 0;
  }

  function validateOrderForm(formData) {
    const errors = {};

    if (!isNotEmpty(formData.name)) {
      errors.name = 'Name is required';
    }
    if (!isEmail(formData.email)) {
      errors.email = 'Valid email is required';
    }
    if (!isPhone(formData.phone)) {
      errors.phone = 'Valid phone number is required';
    }
    if (!isNotEmpty(formData.address)) {
      errors.address = 'Delivery address is required';
    }

    return errors;
  }

  return { isEmail, isPhone, isNotEmpty, validateOrderForm };
})();

// 5) Global Helpers for Use in app.js / HTML
window.UIComponents = {
  Toast,
  LoadingOverlay,
  ModalHelper,
  FormValidator
};

console.log('✅ components.js loaded (Toast, LoadingOverlay, ModalHelper, FormValidator available as window.UIComponents)');

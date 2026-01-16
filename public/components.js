// ============================================
// EmproiumVipani – components.js
// Reusable UI components, helpers, and utilities
// ============================================

/**
 * Toast Notification System
 * Usage: Toast.show('success', 'Order placed!', 3000)
 */
const Toast = {
  container: null,

  init() {
    // Create toast container if it doesn't exist
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.id = 'toast-container';
      this.container.className = 'fixed bottom-4 right-4 z-[9999] space-y-2 pointer-events-none';
      document.body.appendChild(this.container);
    }
  },

  show(type = 'info', message = '', duration = 3000) {
    this.init();

    const toastId = `toast-${Date.now()}`;
    const toast = document.createElement('div');
    toast.id = toastId;
    toast.className = `toast toast-${type} lux-fade-in pointer-events-auto`;

    // Icons for each toast type
    const icons = {
      success: '✓',
      error: '✕',
      warning: '⚠',
      info: 'ℹ'
    };

    const icon = icons[type] || icons.info;

    toast.innerHTML = `
      <div class="flex items-center gap-2">
        <span class="font-bold text-sm">${icon}</span>
        <span class="text-xs sm:text-sm">${message}</span>
      </div>
    `;

    this.container.appendChild(toast);

    // Auto-dismiss
    if (duration > 0) {
      setTimeout(() => {
        toast.style.animation = 'fade-in 150ms ease reverse';
        setTimeout(() => toast.remove(), 150);
      }, duration);
    }

    return toastId;
  },

  success(message, duration = 3000) {
    return this.show('success', message, duration);
  },

  error(message, duration = 4000) {
    return this.show('error', message, duration);
  },

  warning(message, duration = 3500) {
    return this.show('warning', message, duration);
  },

  info(message, duration = 3000) {
    return this.show('info', message, duration);
  },

  dismiss(toastId) {
    const toast = document.getElementById(toastId);
    if (toast) {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 150);
    }
  },

  dismissAll() {
    if (this.container) {
      this.container.querySelectorAll('.toast').forEach(toast => {
        toast.remove();
      });
    }
  }
};

/**
 * Modal Helper
 * Manage modals with backdrop, animations, and accessibility
 */
const Modal = {
  activeModals: [],

  create(options = {}) {
    const {
      id = `modal-${Date.now()}`,
      title = '',
      content = '',
      onClose = null,
      closeButton = true,
      backdrop = true,
      size = 'md' // sm, md, lg, xl
    } = options;

    const sizeClasses = {
      sm: 'max-w-sm',
      md: 'max-w-md',
      lg: 'max-w-lg',
      xl: 'max-w-xl'
    };

    const overlay = document.createElement('div');
    overlay.id = `${id}-overlay`;
    overlay.className = 'overlay-dark fixed inset-0 z-40';
    overlay.style.display = backdrop ? 'block' : 'none';

    const modal = document.createElement('div');
    modal.id = id;
    modal.className = `modal-panel w-full ${sizeClasses[size]} lux-fade-in`;
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-labelledby', `${id}-title`);
    modal.setAttribute('aria-modal', 'true');

    modal.innerHTML = `
      <div class="px-4 py-3 border-b border-[#111827] flex items-center justify-between">
        <div id="${id}-title" class="font-semibold text-sm">${title}</div>
        ${closeButton ? `<button class="text-slate-400 hover:text-slate-100 text-lg font-light" data-close-modal="${id}">&times;</button>` : ''}
      </div>
      <div class="p-4 max-h-[70vh] overflow-y-auto">
        ${content}
      </div>
    `;

    const wrapper = document.createElement('div');
    wrapper.className = 'fixed inset-0 z-50 flex items-center justify-center px-4';
    wrapper.appendChild(modal);

    if (backdrop) {
      document.body.appendChild(overlay);
      overlay.addEventListener('click', () => this.close(id));
    }

    document.body.appendChild(wrapper);

    // Close button handler
    modal.querySelector(`[data-close-modal="${id}"]`)?.addEventListener('click', () => {
      this.close(id, onClose);
    });

    // Escape key handler
    const escapeHandler = (e) => {
      if (e.key === 'Escape') {
        this.close(id, onClose);
      }
    };
    document.addEventListener('keydown', escapeHandler);

    this.activeModals.push({ id, onClose, escapeHandler, wrapper, overlay });

    return id;
  },

  close(modalId, callback = null) {
    const modalIndex = this.activeModals.findIndex(m => m.id === modalId);

    if (modalIndex !== -1) {
      const modal = this.activeModals[modalIndex];

      // Remove event listeners
      document.removeEventListener('keydown', modal.escapeHandler);

      // Fade out
      modal.wrapper.style.opacity = '0';
      modal.wrapper.style.transition = 'opacity 150ms ease';

      setTimeout(() => {
        modal.wrapper.remove();
        modal.overlay?.remove();
        this.activeModals.splice(modalIndex, 1);

        if (callback) callback();
      }, 150);
    }
  },

  closeAll() {
    [...this.activeModals].forEach(m => this.close(m.id));
  }
};

/**
 * Form Helper
 * Validation, error handling, field state management
 */
const Form = {
  validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  },

  validatePhone(phone) {
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 10 && cleaned.length <= 15;
  },

  validateName(name) {
    return name && name.trim().length >= 3;
  },

  validateAddress(address) {
    return address && address.trim().length >= 10;
  },

  validateUrl(url) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  },

  setFieldError(fieldId, errorMessage) {
    const field = document.getElementById(fieldId);
    if (!field) return;

    field.classList.add('field-error');
    field.classList.add('field-error-shake');

    // Remove shake after animation
    setTimeout(() => {
      field.classList.remove('field-error-shake');
    }, 160);

    // Add error message below field
    let errorDiv = field.parentElement.querySelector('.field-error-text');
    if (!errorDiv) {
      errorDiv = document.createElement('div');
      errorDiv.className = 'field-error-text';
      field.parentElement.appendChild(errorDiv);
    }
    errorDiv.textContent = errorMessage;
  },

  clearFieldError(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field) return;

    field.classList.remove('field-error', 'field-error-shake');

    const errorDiv = field.parentElement.querySelector('.field-error-text');
    if (errorDiv) {
      errorDiv.textContent = '';
    }
  },

  clearAllErrors(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.querySelectorAll('input, textarea, select').forEach(field => {
      this.clearFieldError(field.id);
    });
  },

  showValidationError(fieldId, message) {
    this.setFieldError(fieldId, message);
    Toast.error(message);
  },

  showValidationSuccess(fieldId) {
    this.clearFieldError(fieldId);
  }
};

/**
 * Loading State Manager
 * Handle spinners, skeletons, and loading UI
 */
const Loading = {
  show(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div class="flex flex-col items-center justify-center py-12 gap-3">
        <div class="spinner"></div>
        <span class="text-xs text-slate-400">Loading...</span>
      </div>
    `;
  },

  createSkeleton(count = 3) {
    return Array(count)
      .fill(0)
      .map(
        () => `
      <div class="card-compact p-4 gap-3 flex flex-col">
        <div class="skeleton h-40 w-full rounded-lg"></div>
        <div class="skeleton h-4 w-3/4 rounded"></div>
        <div class="skeleton h-4 w-1/2 rounded"></div>
        <div class="skeleton h-8 w-full rounded-full"></div>
      </div>
    `
      )
      .join('');
  },

  showSkeleton(containerId, count = 3) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        ${this.createSkeleton(count)}
      </div>
    `;
  },

  hide(containerId) {
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = '';
    }
  }
};

/**
 * Pagination Helper
 * Usage: Paginator.paginate(items, 10, 1)
 */
const Paginator = {
  paginate(items, itemsPerPage, currentPage = 1) {
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    return {
      data: items.slice(start, end),
      currentPage,
      totalPages,
      totalItems: items.length,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1
    };
  },

  renderPaginationControls(currentPage, totalPages, onPageChange) {
    if (totalPages <= 1) return '';

    let html = `<div class="flex items-center justify-center gap-2 mt-6">`;

    if (currentPage > 1) {
      html += `<button class="btn btn-outline text-xs" onclick="onPageChange(${currentPage - 1})">← Previous</button>`;
    }

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
      if (i === currentPage) {
        html += `<button class="btn btn-primary text-xs" disabled>${i}</button>`;
      } else {
        html += `<button class="btn btn-outline text-xs" onclick="onPageChange(${i})">${i}</button>`;
      }
    }

    if (currentPage < totalPages) {
      html += `<button class="btn btn-outline text-xs" onclick="onPageChange(${currentPage + 1})">Next →</button>`;
    }

    html += `</div>`;
    return html;
  }
};

/**
 * Search & Filter Helper
 * Debounced search for performance
 */
const SearchFilter = {
  debounceTimer: null,

  debounce(callback, delay = 300) {
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(callback, delay);
  },

  highlightSearchTerm(text, term) {
    if (!term) return text;
    const regex = new RegExp(`(${term})`, 'gi');
    return text.replace(regex, '<mark class="bg-goldSoft/30 text-goldSoft">$1</mark>');
  },

  filterByMultipleFields(items, searchTerm, fields) {
    if (!searchTerm) return items;

    const term = searchTerm.toLowerCase();
    return items.filter(item =>
      fields.some(field => {
        const value = item[field];
        return value && value.toString().toLowerCase().includes(term);
      })
    );
  }
};

/**
 * Notification Center
 * Persistent notifications with actions
 */
const NotificationCenter = {
  notifications: [],

  add(options = {}) {
    const {
      id = `notif-${Date.now()}`,
      title = 'Notification',
      message = '',
      type = 'info', // info, success, warning, error
      duration = 5000,
      actions = [] // [{label: 'Undo', onClick: fn}]
    } = options;

    const notification = {
      id,
      title,
      message,
      type,
      duration,
      actions,
      createdAt: new Date()
    };

    this.notifications.push(notification);

    if (duration > 0) {
      setTimeout(() => this.remove(id), duration);
    }

    return id;
  },

  remove(id) {
    this.notifications = this.notifications.filter(n => n.id !== id);
  },

  getAll() {
    return this.notifications;
  },

  clear() {
    this.notifications = [];
  },

  renderHTML() {
    return this.notifications
      .map(
        n => `
      <div class="notification notification-${n.type} p-3 rounded-lg border border-[#111827] bg-black/70 text-xs">
        <div class="font-semibold text-sm mb-1">${n.title}</div>
        <p class="text-slate-300 mb-2">${n.message}</p>
        <div class="flex gap-2">
          ${n.actions.map(a => `<button class="btn btn-outline btn-sm text-xs">${a.label}</button>`).join('')}
        </div>
      </div>
    `
      )
      .join('');
  }
};

/**
 * Image Gallery / Carousel
 * Simple carousel for product images
 */
const Carousel = {
  create(imageUrls, options = {}) {
    const { containerId = 'carousel', autoPlay = false, interval = 5000 } = options;

    const container = document.getElementById(containerId);
    if (!container) return;

    let currentIndex = 0;

    const carousel = document.createElement('div');
    carousel.className = 'relative rounded-xl overflow-hidden bg-black';

    // Images
    const imagesHTML = imageUrls
      .map(
        (url, idx) => `
      <img
        src="${url}"
        alt="Slide ${idx + 1}"
        class="carousel-image absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
        style="opacity: ${idx === 0 ? '1' : '0'}"
        data-index="${idx}"
      />
    `
      )
      .join('');

    carousel.innerHTML = imagesHTML;

    // Controls
    if (imageUrls.length > 1) {
      const prevBtn = document.createElement('button');
      prevBtn.className = 'absolute left-2 top-1/2 -translate-y-1/2 z-10 btn btn-primary text-xs';
      prevBtn.textContent = '←';
      prevBtn.onclick = () => this.prev(carousel);

      const nextBtn = document.createElement('button');
      nextBtn.className = 'absolute right-2 top-1/2 -translate-y-1/2 z-10 btn btn-primary text-xs';
      nextBtn.textContent = '→';
      nextBtn.onclick = () => this.next(carousel);

      carousel.appendChild(prevBtn);
      carousel.appendChild(nextBtn);

      // Dots
      const dotsContainer = document.createElement('div');
      dotsContainer.className = 'absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10';
      dotsContainer.innerHTML = imageUrls
        .map(
          (_, idx) => `
        <button
          class="h-2 w-2 rounded-full transition-colors ${idx === 0 ? 'bg-goldSoft' : 'bg-slate-600'}"
          onclick="carousel.goToSlide(this.parentElement.parentElement, ${idx})"
        ></button>
      `
        )
        .join('');
      carousel.appendChild(dotsContainer);
    }

    container.appendChild(carousel);

    // Auto-play
    if (autoPlay && imageUrls.length > 1) {
      setInterval(() => this.next(carousel), interval);
    }

    return carousel;
  },

  next(carousel) {
    const images = carousel.querySelectorAll('.carousel-image');
    const currentImage = carousel.querySelector('[style*="opacity: 1"]');
    const currentIndex = Array.from(images).indexOf(currentImage);
    const nextIndex = (currentIndex + 1) % images.length;

    this.goToSlide(carousel, nextIndex);
  },

  prev(carousel) {
    const images = carousel.querySelectorAll('.carousel-image');
    const currentImage = carousel.querySelector('[style*="opacity: 1"]');
    const currentIndex = Array.from(images).indexOf(currentImage);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;

    this.goToSlide(carousel, prevIndex);
  },

  goToSlide(carousel, index) {
    const images = carousel.querySelectorAll('.carousel-image');
    images.forEach((img, idx) => {
      img.style.opacity = idx === index ? '1' : '0';
    });

    // Update dots
    const dots = carousel.querySelectorAll('button[onclick*="goToSlide"]');
    dots.forEach((dot, idx) => {
      dot.className = `h-2 w-2 rounded-full transition-colors ${idx === index ? 'bg-goldSoft' : 'bg-slate-600'}`;
    });
  }
};

/**
 * Data Table / Grid Helper
 * Sortable, filterable data tables
 */
const DataTable = {
  create(data, columns, options = {}) {
    const { containerId = 'table', sortable = true, filterable = true } = options;

    const container = document.getElementById(containerId);
    if (!container) return;

    let sortColumn = null;
    let sortDirection = 'asc';

    const renderTable = (items) => {
      let html = `
        <div class="overflow-x-auto rounded-lg border border-[#111827]">
          <table class="w-full text-xs">
            <thead class="bg-black/70 border-b border-[#111827]">
              <tr>
                ${columns
                  .map(
                    col => `
                  <th class="px-3 py-2 text-left font-semibold text-slate-200">
                    ${sortable ? `<button onclick="sortTable('${col.key}')" class="hover:text-goldSoft">${col.label}</button>` : col.label}
                  </th>
                `
                  )
                  .join('')}
              </tr>
            </thead>
            <tbody>
              ${items
                .map(
                  item => `
                <tr class="border-b border-[#111827] hover:bg-black/50">
                  ${columns
                    .map(col => `<td class="px-3 py-2">${item[col.key] || '—'}</td>`)
                    .join('')}
                </tr>
              `
                )
                .join('')}
            </tbody>
          </table>
        </div>
      `;

      container.innerHTML = html;
    };

    renderTable(data);

    // Global sort function
    window.sortTable = (columnKey) => {
      if (sortColumn === columnKey) {
        sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
      } else {
        sortColumn = columnKey;
        sortDirection = 'asc';
      }

      const sorted = [...data].sort((a, b) => {
        const aVal = a[columnKey];
        const bVal = b[columnKey];

        if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });

      renderTable(sorted);
    };
  }
};

/**
 * LocalStorage Manager
 * Simple key-value store with expiration
 */
const StorageManager = {
  set(key, value, expiresInMinutes = null) {
    const data = {
      value,
      timestamp: Date.now(),
      expiresAt: expiresInMinutes ? Date.now() + expiresInMinutes * 60 * 1000 : null
    };
    localStorage.setItem(`app_${key}`, JSON.stringify(data));
  },

  get(key) {
    const data = JSON.parse(localStorage.getItem(`app_${key}`));
    if (!data) return null;

    // Check expiration
    if (data.expiresAt && Date.now() > data.expiresAt) {
      this.remove(key);
      return null;
    }

    return data.value;
  },

  remove(key) {
    localStorage.removeItem(`app_${key}`);
  },

  clear() {
    Object.keys(localStorage)
      .filter(k => k.startsWith('app_'))
      .forEach(k => localStorage.removeItem(k));
  },

  getAll() {
    const items = {};
    Object.keys(localStorage)
      .filter(k => k.startsWith('app_'))
      .forEach(k => {
        const key = k.replace('app_', '');
        items[key] = this.get(key);
      });
    return items;
  }
};

/**
 * Event Bus
 * Simple pub/sub for component communication
 */
const EventBus = {
  events: {},

  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  },

  off(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    }
  },

  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  },

  clear(event) {
    if (event) {
      delete this.events[event];
    } else {
      this.events = {};
    }
  }
};

/**
 * Analytics Tracker
 * Track user interactions and events
 */
const Analytics = {
  events: [],

  track(eventName, eventData = {}) {
    const event = {
      name: eventName,
      data: eventData,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent
    };

    this.events.push(event);
    console.log('📊 Event tracked:', event);

    // Send to backend if needed
    if (window.ANALYTICS_ENDPOINT) {
      fetch(window.ANALYTICS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event)
      }).catch(err => console.warn('Analytics send failed:', err));
    }
  },

  trackPageView(pageName) {
    this.track('pageview', { page: pageName });
  },

  trackAddToCart(productId, productName) {
    this.track('add_to_cart', { productId, productName });
  },

  trackCheckout(total) {
    this.track('checkout', { total });
  },

  trackPurchase(orderId, total) {
    this.track('purchase', { orderId, total });
  },

  getEvents() {
    return this.events;
  },

  clear() {
    this.events = [];
  }
};

/**
 * Accessibility Utilities
 * WCAG 2.1 compliance helpers
 */
const A11y = {
  announceToScreenReader(message, priority = 'polite') {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;

    document.body.appendChild(announcement);

    setTimeout(() => announcement.remove(), 1000);
  },

  setAriaLabel(elementId, label) {
    const element = document.getElementById(elementId);
    if (element) {
      element.setAttribute('aria-label', label);
    }
  },

  setAriaDescribedBy(elementId, descriptionId) {
    const element = document.getElementById(elementId);
    if (element) {
      element.setAttribute('aria-describedby', descriptionId);
    }
  },

  enableFocusTrap(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const focusableElements = container.querySelectorAll(
      'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    container.addEventListener('keydown', e => {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    });
  }
};

/**
 * Initialization
 * Attach helpers to window for easy access
 */
window.Toast = Toast;
window.Modal = Modal;
window.Form = Form;
window.Loading = Loading;
window.Paginator = Paginator;
window.SearchFilter = SearchFilter;
window.NotificationCenter = NotificationCenter;
window.Carousel = Carousel;
window.DataTable = DataTable;
window.StorageManager = StorageManager;
window.EventBus = EventBus;
window.Analytics = Analytics;
window.A11y = A11y;

console.log('✨ EmproiumVipani components initialized');

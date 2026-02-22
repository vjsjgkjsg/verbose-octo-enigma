// === УТИЛИТЫ ===
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => [...document.querySelectorAll(sel)];

// === ПРЕЛОАДЕР ===
window.addEventListener('load', () => {
  const preloader = $('#preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('hidden');
      setTimeout(() => preloader.remove(), 500);
    }, 800);
  }
});

// === МОБИЛЬНОЕ МЕНЮ ===
const mobileMenuBtn = $('#mobileMenuBtn');
const mainNav = $('#mainNav');

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    mainNav.classList.toggle('active');
  });
  
  // Закрытие при клике на ссылку
  $$('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuBtn.classList.remove('active');
      mainNav.classList.remove('active');
    });
  });
  
  // Закрытие при клике вне меню
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.header-content')) {
      mobileMenuBtn.classList.remove('active');
      mainNav.classList.remove('active');
    }
  });
}

// === АКТИВНАЯ ССЫЛКА В НАВИГАЦИИ ===
function markActiveNav() {
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  $$('.nav-link').forEach(link => {
    const href = link.getAttribute('href').split('/').pop();
    link.classList.toggle('active', href === currentPage);
  });
}

// === ЯЗЫК ===
let currentLang = localStorage.getItem('lang') || 'ru';

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;
  
  $$('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  
  // Можно добавить перевод текста если нужно
  // $$('[data-lang-ru]').forEach(el => { ... });
}

$$('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => setLang(btn.dataset.lang));
});

// === АНИМАЦИЯ СЧЁТЧИКОВ ===
function animateCounters() {
  $$('.stat-num').forEach(el => {
    const target = parseInt(el.dataset.count || el.textContent);
    const duration = 2000;
    const step = Math.ceil(target / (duration / 16));
    let current = 0;
    
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current;
      if (current >= target) {
        clearInterval(timer);
        el.textContent = target;
      }
    }, 16);
  });
}

// Запуск счётчика при появлении в видимости
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const stats = $('.stats');
if (stats) statsObserver.observe(stats);

// === АНИМАЦИЯ ПОЯВЛЕНИЯ КАРТОЧЕК ===
const cardsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('fade-up');
      }, index * 100);
      cardsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

$$('.card, .feature, .about-card').forEach(el => cardsObserver.observe(el));

// === ПАРАЛЛАКС-ЭФФЕКТ ===
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const heroContent = $('.hero-content');
  if (heroContent && scrolled < 600) {
    heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    heroContent.style.opacity = 1 - scrolled / 600;
  }
});

// === КНОПКА "НАВЕРХ" ===
const scrollTopBtn = $('#scrollTop');

if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });
  
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// === HEADER ПРИ ПРОКРУТКЕ ===
const header = $('#header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  
  if (currentScroll > 100) {
    header.style.boxShadow = '0 4px 20px rgba(0,0,0,.15)';
  } else {
    header.style.boxShadow = '';
  }
  
  lastScroll = currentScroll;
});

// === ПЛАВНАЯ ПРОКРУТКА К ЯКОРЯМ ===
$$('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href === '#') return;
    
    const target = $(href);
    if (target) {
      e.preventDefault();
      const headerHeight = header?.offsetHeight || 0;
      const targetPos = target.offsetTop - headerHeight - 20;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }
  });
});

// === КАСТОМНЫЙ КУРСОР (для desktop) ===
if (window.innerWidth > 768) {
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  cursor.style.cssText = 'position:fixed;width:20px;height:20px;border:2px solid var(--primary);border-radius:50%;pointer-events:none;z-index:9999;transition:transform .1s;display:none';
  document.body.appendChild(cursor);
  
  document.addEventListener('mousemove', (e) => {
    cursor.style.display = 'block';
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
  });
  
  $$('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.style.transform = 'scale(1.5)');
    el.addEventListener('mouseleave', () => cursor.style.transform = 'scale(1)');
  });
}

// === EASTER EGG (Konami Code) ===
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
document.addEventListener('keydown', (e) => {
  konamiCode.push(e.key);
  konamiCode = konamiCode.slice(-10);
  if (konamiCode.join(',') === konamiSequence.join(',')) {
    document.body.style.animation = 'rainbow 2s infinite';
    showToast('🎉 Секретный код активирован!', 'success');
    const style = document.createElement('style');
    style.textContent = '@keyframes rainbow{0%{filter:hue-rotate(0deg)}100%{filter:hue-rotate(360deg)}}';
    document.head.appendChild(style);
    setTimeout(() => {
      document.body.style.animation = '';
    }, 5000);
  }
});

// === ЗАГРУЗОЧНАЯ АНИМАЦИЯ ===
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  requestAnimationFrame(() => {
    document.body.style.transition = 'opacity 0.5s';
    document.body.style.opacity = '1';
  });
});

// === ИНИЦИАЛИЗАЦИЯ ===
document.addEventListener('DOMContentLoaded', () => {
  markActiveNav();
  setLang(currentLang);
  
  // Предзагрузка изображений для hero (если есть)
  const heroImages = $$('.hero-bg img');
  heroImages.forEach(img => {
    const tempImg = new Image();
    tempImg.src = img.src;
  });
});

// === ОТЛАДКА (удалить в продакшене) ===
if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
  console.log('🎓 Образовательный проект — Университет Козыбаева');
  console.log('✅ Скрипты загружены');
  console.log('🌐 Язык:', currentLang);
}

// === ЭКСПОРТ ДЛЯ ДРУГИХ СКРИПТОВ ===
window.showToast = function(msg, type = 'success') {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed;
    top: 100px;
    right: 24px;
    background: ${type === 'success' ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #ef4444, #dc2626)'};
    color: white;
    padding: 16px 24px;
    border-radius: 12px;
    font-weight: 700;
    box-shadow: 0 10px 30px rgba(0,0,0,.2);
    z-index: 10000;
    animation: slideIn 0.3s ease;
  `;
  toast.textContent = msg;
  
  if (!$('#toast-anim')) {
    const style = document.createElement('style');
    style.id = 'toast-anim';
    style.textContent = `
      @keyframes slideIn { from { transform: translateX(400px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
      @keyframes slideOut { from { transform: translateX(0); opacity: 1; } to { transform: translateX(400px); opacity: 0; } }
    `;
    document.head.appendChild(style);
  }
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
};

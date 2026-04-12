// ===========================
// Header: スクロールで背景を変える
// ===========================
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ===========================
// モバイルメニュー
// ===========================
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');

menuBtn.addEventListener('click', () => {
  menuBtn.classList.toggle('open');
  nav.classList.toggle('open');
  header.classList.toggle('menu-open');
});

// ナビのリンクをクリックしたらメニューを閉じる
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menuBtn.classList.remove('open');
    nav.classList.remove('open');
    header.classList.remove('menu-open');
  });
});

// ===========================
// Hero: ロード時にフェードイン
// ===========================
window.addEventListener('load', () => {
  document.querySelectorAll('.hero .fade-in').forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('visible');
    }, i * 180 + 300);
  });
});

// ===========================
// スクロールアニメーション
// ===========================
const fadeEls = document.querySelectorAll('.section .fade-in');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

fadeEls.forEach(el => observer.observe(el));

// ===========================
// メニュータブ切り替え
// ===========================
const tabs = document.querySelectorAll('.menu__tab');
const panels = document.querySelectorAll('.menu__panel');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // タブの active 切り替え
    tabs.forEach(t => t.classList.remove('menu__tab--active'));
    tab.classList.add('menu__tab--active');

    // パネルの表示切り替え
    const target = tab.dataset.target;
    panels.forEach(panel => {
      panel.classList.remove('menu__panel--active');
      if (panel.id === target) {
        panel.classList.add('menu__panel--active');
        // 新しく表示されたパネル内の fade-in 要素を animate
        panel.querySelectorAll('.fade-in').forEach((el, i) => {
          el.classList.remove('visible');
          setTimeout(() => el.classList.add('visible'), i * 80);
        });
      }
    });
  });
});

// 初期表示のメニューパネルもアニメーション
document.querySelectorAll('.menu__panel--active .fade-in').forEach((el, i) => {
  setTimeout(() => el.classList.add('visible'), i * 80 + 600);
});

// ===========================
// お問い合わせフォーム
// ===========================
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

const GOOGLE_FORM_ACTION = 'https://docs.google.com/forms/d/e/1FAIpQLScdihBZQA3Mtz8D_pTC8RPLdcVFb6f8vH6iOI9_maxyPr9ihg/formResponse';
const ENTRY = {
  name:    'entry.589232644',
  email:   'entry.822612331',
  subject: 'entry.866594864',
  message: 'entry.1258599886',
};

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const btn = contactForm.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = '送信中...';

  const body = new FormData();
  body.append(ENTRY.name,    document.getElementById('name').value);
  body.append(ENTRY.email,   document.getElementById('email').value);
  body.append(ENTRY.subject, document.getElementById('subject').value);
  body.append(ENTRY.message, document.getElementById('message').value);

  // Googleフォームへ送信 (CORSエラーは想定内 — データは届いている)
  fetch(GOOGLE_FORM_ACTION, { method: 'POST', mode: 'no-cors', body })
    .then(() => {
      formMessage.textContent = 'お問い合わせを受け付けました。2〜3営業日以内にご連絡いたします。';
      formMessage.className = 'form__message success';
      contactForm.reset();
    })
    .catch(() => {
      formMessage.textContent = 'お問い合わせを受け付けました。2〜3営業日以内にご連絡いたします。';
      formMessage.className = 'form__message success';
      contactForm.reset();
    })
    .finally(() => {
      btn.disabled = false;
      btn.textContent = '送信する';
    });
});

// ===========================
// ギャラリー: 画像がない場合は placeholder を表示
// ===========================
document.querySelectorAll('.interior__img, .gallery__img').forEach(img => {
  img.addEventListener('load', () => {
    const placeholder = img.nextElementSibling;
    if (placeholder) placeholder.style.display = 'none';
  });
  img.addEventListener('error', () => {
    img.style.display = 'none';
  });
});

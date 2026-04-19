// Detect base path: if URL ends in /ar or /ar/, images need ../
const BASE_PATH = window.location.pathname.includes('/ar') ? '../' : '';

// ================================================================
// MAIN SCRIPT
// ================================================================

function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;
  
  grid.innerHTML = PROJECTS.map(p => {
    const title = LANG === 'ar' ? p.titleAr : p.titleEn;
    const cat = LANG === 'ar' ? p.categoryAr : p.categoryEn;
    
    return `
      <div class="project-card" data-category="${p.category}" data-id="${p.id}">
        <span class="project-tag">${cat}</span>
        <span class="project-year">${p.year}</span>
        <img src="images/projects/${p.image}" alt="${title}" loading="lazy">
        <div class="project-overlay">
          <div class="category">${cat} · ${p.year}</div>
          <h3>${title}</h3>
          <div class="view-more">${LANG === 'ar' ? 'عرض التفاصيل ←' : 'View Project →'}</div>
        </div>
      </div>
    `;
  }).join('');
  
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-id');
      openModal(id);
    });
  });
}

function openModal(id) {
  const p = PROJECTS.find(x => x.id === id);
  if (!p) return;
  
  const title = LANG === 'ar' ? p.titleAr : p.titleEn;
  const cat = LANG === 'ar' ? p.categoryAr : p.categoryEn;
  const desc = LANG === 'ar' ? (p.descAr || '') : (p.descEn || '');
  
  document.getElementById('modal-image').src = `${BASE_PATH}images/projects/${p.image}`;
  document.getElementById('modal-image').alt = title;
  document.getElementById('modal-category').textContent = cat;
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-description').textContent = desc;
  document.getElementById('modal-year').textContent = p.year;
  document.getElementById('modal-category-label').textContent = cat;
  
  document.getElementById('modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modal').classList.remove('open');
  document.body.style.overflow = '';
}

function handleFormSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const message = document.getElementById('message').value;
  
  const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
  const body = encodeURIComponent(`From: ${name} (${email})\n\n${message}`);
  window.location.href = `mailto:h.fakhry87@gmail.com?subject=${subject}&body=${body}`;
}

function initPage() {
  document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
    
    // Navigation scroll
    const nav = document.getElementById('nav');
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    });
    
    // Mobile nav toggle
    const navToggle = document.getElementById('nav-toggle');
    if (navToggle) {
      navToggle.addEventListener('click', () => {
        document.getElementById('nav-menu').classList.toggle('open');
      });
    }
    document.querySelectorAll('.nav-menu a').forEach(a => {
      a.addEventListener('click', () => {
        document.getElementById('nav-menu').classList.remove('open');
      });
    });
    
    // Modal close handlers
    const modalClose = document.getElementById('modal-close');
    if (modalClose) modalClose.addEventListener('click', closeModal);
    const modal = document.getElementById('modal');
    if (modal) modal.addEventListener('click', (e) => {
      if (e.target.id === 'modal') closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
    
    // Project filtering
    document.addEventListener('click', (e) => {
      if (!e.target.classList.contains('filter-btn')) return;
      
      const btn = e.target;
      const filter = btn.getAttribute('data-filter');
      
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      document.querySelectorAll('.project-card').forEach((card, i) => {
        const cat = card.getAttribute('data-category');
        const show = filter === 'all' || cat === filter;
        
        if (show) {
          card.classList.remove('hidden');
          card.style.animation = 'none';
          setTimeout(() => {
            card.style.animation = `modalIn 0.5s ease ${i * 0.04}s forwards`;
          }, 10);
        } else {
          card.classList.add('hidden');
        }
      });
    });
    
    // Scroll reveal
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });
    
    setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    }, 100);
  });
}

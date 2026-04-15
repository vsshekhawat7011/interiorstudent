/* =============================================
   NIDHI RATHORE — Portfolio JavaScript
   Animations, Interactions, Modal Logic
============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ---- LOADER ----
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 1800);
  });


  // ---- CUSTOM CURSOR ----
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  if (window.innerWidth > 768) {
    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
    });

    function animateFollower() {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      follower.style.left = followerX + 'px';
      follower.style.top = followerY + 'px';
      requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Hover effect on interactive elements
    document.querySelectorAll('a, button, .project-card, .skill-card, .exp-item').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }


  // ---- NAVBAR SCROLL ----
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });


  // ---- HAMBURGER / MOBILE MENU ----
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  document.querySelectorAll('.mob-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });


  // ---- THEME TOGGLE ----
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;

  // Load saved preference
  const savedTheme = localStorage.getItem('theme') || 'light';
  html.setAttribute('data-theme', savedTheme);

  themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });


  // ---- SCROLL REVEAL ----
  const revealEls = document.querySelectorAll('.reveal-up');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Small stagger by index within same parent
        const siblings = entry.target.parentElement.querySelectorAll('.reveal-up');
        const index = Array.from(siblings).indexOf(entry.target);
        entry.target.style.transitionDelay = (index * 0.1) + 's';
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(el => revealObserver.observe(el));

  // Trigger hero reveals immediately after loader
  setTimeout(() => {
    document.querySelectorAll('#hero .reveal-up').forEach((el, i) => {
      el.style.transitionDelay = (i * 0.18 + 0.2) + 's';
      el.classList.add('visible');
    });
  }, 1900);


  // ---- PROJECT MODAL DATA ----
  const projects = {
    1: {
      tag: 'Residential',
      title: 'Living Space Redesign',
      desc: 'A thoughtful reimagining of a family living area focused on openness, natural light, and emotional warmth. The project explores how furniture placement and material choices can transform the feeling of a home, creating a space that breathes and invites.',
      year: '2024',
      type: 'Residential Interior',
      gradient: 'linear-gradient(135deg, #c9a98a 0%, #a67c5b 100%)'
    },
    2: {
      tag: 'Commercial',
      title: 'Cafe Interiors — Natural Materiality',
      desc: 'Earthy tones, exposed textures, and biophilic elements converge in this café concept. Every corner is designed to invite lingering — warm wood surfaces, terracotta accents, and soft diffused light creating an unhurried atmosphere of belonging.',
      year: '2024',
      type: 'Commercial / F&B',
      gradient: 'linear-gradient(135deg, #8c3f2b 0%, #c47a60 100%)'
    },
    3: {
      tag: 'Concept',
      title: 'Wellness Retreat Concept',
      desc: 'A concept-driven design for a wellness sanctuary that integrates sustainable materials, sensory pathways, and restorative spatial sequences. The brief was to create spaces that heal as much as they shelter — drawing from vernacular traditions and modern spatial theory.',
      year: '2023',
      type: 'Concept Design',
      gradient: 'linear-gradient(135deg, #5c7a6e 0%, #8aaf9f 100%)'
    },
    4: {
      tag: 'Academic',
      title: 'Studio Apartment — Urban Living',
      desc: 'A study in compact, efficient design for modern urban dwellers. The project challenges the assumption that small spaces must feel restrictive — layered zones, multifunctional furniture, and a considered palette create a home that feels both spacious and personal.',
      year: '2023',
      type: 'Academic Project',
      gradient: 'linear-gradient(135deg, #6b5e4e 0%, #a0897a 100%)'
    },
    5: {
      tag: 'Sustainable',
      title: 'Adobe & Cob Structure',
      desc: 'Inspired by the Auroville Sustainable Building Workshop, this project documents and explores natural building techniques — adobe brick, cob walls, and lime plaster. A return to materiality as narrative; a reminder that building with earth is building with memory.',
      year: '2023',
      type: 'Sustainable / Natural Build',
      gradient: 'linear-gradient(135deg, #b09060 0%, #d4b88c 100%)'
    },
    6: {
      tag: 'Exhibition',
      title: 'Exhibition Space Curation',
      desc: 'A narrative-driven spatial experience designed for a visual arts exhibition. The floor plan choreographs movement through thematic zones, using light, threshold, and material contrast to guide visitors through a deliberate emotional arc — from discovery to contemplation.',
      year: '2025',
      type: 'Exhibition / Curation',
      gradient: 'linear-gradient(135deg, #4a5568 0%, #718096 100%)'
    }
  };

  // ---- MODAL LOGIC ----
  const modal = document.getElementById('project-modal');
  const modalClose = modal.querySelector('.modal-close');
  const modalBackdrop = modal.querySelector('.modal-backdrop');

  function openModal(id) {
    const data = projects[id];
    if (!data) return;

    modal.querySelector('.modal-tag').textContent = data.tag;
    modal.querySelector('.modal-title').textContent = data.title;
    modal.querySelector('.modal-desc').textContent = data.desc;
    modal.querySelector('.modal-year').textContent = data.year;
    modal.querySelector('.modal-type').textContent = data.type;
    modal.querySelector('.modal-placeholder').style.background = data.gradient;

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-project');
      openModal(id);
    });
  });

  modalClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });


  // ---- SMOOTH SCROLL ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });


  // ---- ACTIVE NAV LINK ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  function updateActiveLink() {
    const scroll = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scroll >= top && scroll < top + height) {
        navLinks.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);

  // Parallax on hero bg text
  const heroBgText = document.querySelector('.hero-bg-text');
  if (heroBgText && window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      heroBgText.style.transform = `translateY(calc(-50% + ${scrolled * 0.15}px))`;
    });
  }

  // ---- SUBTLE ENTRY ANIMATION FOR EXP ITEMS ----
  document.querySelectorAll('.exp-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
      item.style.transition = 'padding-left 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
    });
  });

});
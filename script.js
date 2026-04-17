/* =============================================
   NIDHI RATHORE — Portfolio JavaScript
   Gallery Modal + Lightbox System
============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ---- LOADER ----
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => setTimeout(() => loader.classList.add('hidden'), 1800));


  // ---- CUSTOM CURSOR ----
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

  if (window.innerWidth > 768) {
    document.addEventListener('mousemove', e => {
      mouseX = e.clientX; mouseY = e.clientY;
      cursor.style.left = mouseX + 'px'; cursor.style.top = mouseY + 'px';
    });
    (function tick() {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      follower.style.left = followerX + 'px'; follower.style.top = followerY + 'px';
      requestAnimationFrame(tick);
    })();
    document.querySelectorAll('a, button, .project-card, .skill-card, .exp-item, .gallery-thumb').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }


  // ---- NAVBAR ----
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 60), { passive: true });


  // ---- HAMBURGER ----
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });
  document.querySelectorAll('.mob-link').forEach(l => l.addEventListener('click', () => {
    hamburger.classList.remove('open'); mobileMenu.classList.remove('open'); document.body.style.overflow = '';
  }));


  // ---- THEME ----
  const themeToggle = document.getElementById('theme-toggle');
  document.documentElement.setAttribute('data-theme', localStorage.getItem('theme') || 'light');
  themeToggle.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });


  // ---- SCROLL REVEAL ----
  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const idx = Array.from(entry.target.parentElement.querySelectorAll('.reveal-up')).indexOf(entry.target);
      entry.target.style.transitionDelay = (idx * 0.1) + 's';
      entry.target.classList.add('visible');
      revealObs.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal-up').forEach(el => revealObs.observe(el));
  setTimeout(() => {
    document.querySelectorAll('#hero .reveal-up').forEach((el, i) => {
      el.style.transitionDelay = (i * 0.18 + 0.2) + 's'; el.classList.add('visible');
    });
  }, 1900);


  // ---- SMOOTH SCROLL ----
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const t = document.querySelector(this.getAttribute('href'));
      if (t) { e.preventDefault(); window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' }); }
    });
  });


  // ---- PARALLAX ----
  const bgText = document.querySelector('.hero-bg-text');
  if (bgText && window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
      bgText.style.transform = `translateY(calc(-50% + ${window.scrollY * 0.15}px))`;
    }, { passive: true });
  }


  /* ================================================
     PROJECT DATA — 10 Projects

     HOW TO ADD YOUR IMAGES:
     ─────────────────────────────────────────────
     Three places images appear:
       1. Outer page card  → controlled by CSS classes p1–p10 (see project-images.css)
       2. Modal hero banner → coverImage field below
       3. Modal gallery thumbnails + lightbox → gallery[].image fields below

     Folder structure expected:
       images/
         project1/  cover.jpg  01.jpg  02.jpg  03.jpg  04.jpg  05.jpg
         project2/  cover.jpg  01.jpg  02.jpg  03.jpg  04.jpg  05.jpg  06.jpg
         ...

     Your actual filenames may be different (e.g. WhatsApp photo names).
     Just update the paths here to match. Gradients stay as silent fallbacks.
  ================================================ */
  const projects = {
    1: {
      tag: 'Commercial', title: 'Taalमेल Café',
      desc: '“Taalमेल Café” is a space where music and food come together to create a nostalgic yet contemporary experience. Inspired by the golden era of music, it bridges generations through shared melodies and memories. The design encourages interaction with listening corners and social seating, allowing visitors to reconnect with the past while staying present. A cozy modern vibe blended with subtle retro elements, warm materials, and ambient lighting creates a welcoming and timeless atmosphere.',
      year: '2024', type: 'Cafe Interior', tools: 'SketchUp · Enscape · AutoCAD',
      coverImage: 'images/project1/WhatsApp Image 2026-04-16 at 10.10.33 PM.jpeg',                          // ← modal hero image
      coverGradient: 'linear-gradient(145deg,#d4b896,#9a6b47,#7a5030)', // ← fallback if image missing
      gallery: [
        { label: 'Entrance', image: 'images/project1/WhatsApp Image 2026-04-16 at 10.13.27 PM.jpeg', gradient: 'linear-gradient(135deg,#c8b090,#907058)', wide: true },
        { label: 'Plan', image: 'images/project1/WhatsApp Image 2026-04-16 at 10.10.34 PM.jpeg', gradient: 'linear-gradient(135deg,#b89060,#8a6040)' },
        { label: 'Mood Board', image: 'images/project1/WhatsApp Image 2026-04-16 at 10.10.35 PM (1).jpeg', gradient: 'linear-gradient(135deg,#c8b090,#907058)' },
        { label: 'Section aa', image: 'images/project1/WhatsApp Image 2026-04-16 at 10.10.34 PM (1).jpeg', gradient: 'linear-gradient(135deg,#c4a07a,#7a5030)' },
        { label: 'Retail Store', image: 'images/project1/WhatsApp Image 2026-04-16 at 10.13.38 PM.jpeg', gradient: 'linear-gradient(135deg,#c8b090,#907058)' },
        { label: 'Karoke elevation', image: 'images/project1/karoke.jpeg', gradient: 'linear-gradient(135deg,#e0c8a8,#a07848)' },
        { label: 'Karaoke', image: 'images/project1/WhatsApp Image 2026-04-16 at 10.14.02 PM.jpeg', gradient: 'linear-gradient(135deg,#c8b090,#907058)' },
        { label: 'Bar Elevation', image: 'images/project1/bar.jpeg', gradient: 'linear-gradient(135deg,#c4a07a,#7a5030)' },
        { label: 'Dining', image: 'images/project1/WhatsApp Image 2026-04-16 at 10.16.13 PM (1).jpeg', gradient: 'linear-gradient(135deg,#c8b090,#907058)' },
        { label: 'Dining', image: 'images/project1/WhatsApp Image 2026-04-16 at 10.16.13 PM (2).jpeg', gradient: 'linear-gradient(135deg,#c8b090,#907058)' },
        { label: 'Bar', image: 'images/project1/WhatsApp Image 2026-04-16 at 10.16.13 PM.jpeg', gradient: 'linear-gradient(135deg,#c8b090,#907058)' },


      ]


    },
    2: {
      tag: 'Commercial', title: 'The 36 Karkhanas',
      desc: 'The 36 Karkhanas were more than workshops; they formed the operational heart of the royal palace, sustaining its daily life and cultural identity. Each karkhana was led by skilled artisans who combined tradition, precision, and creativity to produce textiles, weaponry, architecture, and decorative arts. This museum reinterprets these spaces as immersive narratives, allowing visitors to experience the processes, tools, and human stories behind each craft. It aims to evoke respect for craftsmanship and pride in heritage while highlighting their relevance today. By bridging past and present, the museum encourages preservation, understanding, and reimagining of these timeless knowledge systems for future generations.',
      year: '2024', type: 'Commercial / F&B', tools: 'SketchUp · Twinmotion · Photoshop',
      coverImage: 'images/project2/WhatsApp Image 2026-04-16 at 10.20.52 PM.jpeg',
      coverGradient: 'linear-gradient(145deg,#8c3f2b,#c47a60,#e8a882)',
      gallery: [
        { label: 'mood board', image: 'images/project2/WhatsApp Image 2026-04-16 at 10.24.05 PM.jpeg', gradient: 'linear-gradient(135deg,#d07858,#f0a880)', wide: true },
        { label: 'plan', image: 'images/project2/WhatsApp Image 2026-04-16 at 10.22.56 PM.jpeg', gradient: 'linear-gradient(135deg,#904030,#b86050)' },
        { label: 'Elevation', image: 'images/project2/Elevation.jpeg', gradient: 'linear-gradient(135deg,#c06848,#e09870)' },
        { label: 'photoshop render', image: 'images/project2/WhatsApp Image 2026-04-16 at 10.22.56 PM (1).jpeg', gradient: 'linear-gradient(135deg,#a05040,#d08060)' },
        { label: 'Elevation', image: 'images/project2/WhatsApp Image 2026-04-16 at 10.30.38 PM (1).jpeg', gradient: 'linear-gradient(135deg,#784030,#a86858)' },
        { label: 'Photoshop Render', image: 'images/project2/WhatsApp Image 2026-04-16 at 10.30.38 PM (2).jpeg', gradient: 'linear-gradient(135deg,#784030,#a86858)' },
        { label: 'Renders', image: 'images/project2/WhatsApp Image 2026-04-16 at 10.42.45 PM (1).jpeg', gradient: 'linear-gradient(135deg,#784030,#a86858)' },
        { label: 'Renders', image: 'images/project2/WhatsApp Image 2026-04-16 at 10.42.45 PM (2).jpeg', gradient: 'linear-gradient(135deg,#784030,#a86858)' },
        { label: 'Renders', image: 'images/project2/WhatsApp Image 2026-04-16 at 10.42.45 PM (3).jpeg', gradient: 'linear-gradient(135deg,#784030,#a86858)' },
        { label: 'Renders', image: 'images/project2/WhatsApp Image 2026-04-16 at 10.42.45 PM.jpeg', gradient: 'linear-gradient(135deg,#784030,#a86858)' },
      ]
    },
    3: {
      tag: 'Concept', title: 'Ferris Stay (speculative based)',
      desc: 'As land scarcity intensifies, Ferris Stay proposes a shift from ground-based hospitality to vertical, air-based living. Inspired by a ferris wheel, the structure transforms cabins into compact stay pods suspended in motion. Services remain at the base, minimizing land use, while living spaces rise above, offering dynamic views and a constantly changing spatial experience. Slow rotation becomes both function and experience, reconnecting users with their surroundings. Powered by wind and solar energy, the system promotes sustainability through minimal footprint and modular design. Ferris Stay redefines hospitality as kinetic, elevated, and adaptive—questioning how future living might exist beyond land.',
      year: '2023', type: 'Concept Design', tools: 'Illustrator · SketchUp · InDesign',
      coverImage: 'images/project3/title.jpeg',
      coverGradient: 'linear-gradient(145deg,#4a7568,#7aaa98,#a8cec4)',
      gallery: [
        { label: 'Concept Render', image: 'images/project3/title.jpeg', gradient: 'linear-gradient(145deg,#4a7568,#7aaa98)', wide: true },
        { label: 'Ai generation', image: 'images/project3/WhatsApp Image 2026-04-16 at 10.46.51 PM (1).jpeg', gradient: 'linear-gradient(135deg,#507a6e,#88b8a8)' },
        { label: '  ', image: 'images/project3/WhatsApp Image 2026-04-16 at 10.46.51 PM (2).jpeg', gradient: 'linear-gradient(135deg,#3a6058,#70a090)' },
        { label: ' ', image: 'images/project3/WhatsApp Image 2026-04-16 at 10.46.51 PM (3).jpeg', gradient: 'linear-gradient(135deg,#608878,#90bab0)' },
        { label: ' ', image: 'images/project3/WhatsApp Image 2026-04-16 at 10.46.51 PM (4).jpeg', gradient: 'linear-gradient(135deg,#608878,#90bab0)' },
        { label: ' ', image: 'images/project3/WhatsApp Image 2026-04-16 at 10.46.51 PM (5).jpeg', gradient: 'linear-gradient(135deg,#608878,#90bab0)' },
        { label: ' ', image: 'images/project3/WhatsApp Image 2026-04-16 at 10.46.51 PM (6).jpeg', gradient: 'linear-gradient(135deg,#608878,#90bab0)' },
        { label: ' ', image: 'images/project3/WhatsApp Image 2026-04-16 at 10.46.51 PM (7).jpeg', gradient: 'linear-gradient(135deg,#608878,#90bab0)' },
        { label: ' ', image: 'images/project3/WhatsApp Image 2026-04-16 at 10.46.51 PM (8).jpeg', gradient: 'linear-gradient(135deg,#608878,#90bab0)' },
        { label: ' ', image: 'images/project3/WhatsApp Image 2026-04-16 at 10.46.51 PM (9).jpeg', gradient: 'linear-gradient(135deg,#608878,#90bab0)' },
        { label: ' ', image: 'images/project3/WhatsApp Image 2026-04-16 at 10.46.51 PM (10).jpeg', gradient: 'linear-gradient(135deg,#608878,#90bab0)' },
        { label: '', image: 'images/project3/WhatsApp Image 2026-04-16 at 10.46.51 PM (10).jpeg', gradient: 'linear-gradient(135deg,#608878,#90bab0)' },
        { label: 'Ideation', image: 'images/project3/WhatsApp Image 2026-04-16 at 10.46.51 PM.jpeg', gradient: 'linear-gradient(135deg,#608878,#90bab0)' },
      ]
    },
    4: {
      tag: 'Furniture Design',
      desc: 'Table that grows with you This table is conceived as a lifelong companion rather than a temporary object. It challenges the culture of disposable furniture by introducing a system that adapts to the user’s growth, changing needs, and evolving ergonomics. Rooted in simplicity, the design allows transformation without losing its identity, making it relevant across different stages of life.  Designed for durability and continuity, it encourages emotional attachment and responsible consumption, allowing the furniture to be repaired, extended, and passed on, becoming a generational legacy',
      year: '2026', type: 'Academic Project', tools: 'AutoCAD · SketchUp · Photoshop',
      coverImage: 'images/project4/WhatsApp Image 2026-04-16 at 11.08.22 PM.jpeg',
      coverGradient: 'linear-gradient(145deg,#5e5044,#96806e,#c4a890)',
      gallery: [
        { label: 'Full View', image: 'images/project4/WhatsApp Image 2026-04-16 at 11.08.22 PM.jpeg', gradient: 'linear-gradient(145deg,#5e5044,#96806e)', wide: true },
        { label: 'Pool Cue inspired', image: 'images/project4/WhatsApp Image 2026-04-16 at 11.08.23 PM (1).jpeg', gradient: 'linear-gradient(135deg,#6e6050,#a09080)' },
        { label: 'Curves', image: 'images/project4/WhatsApp Image 2026-04-16 at 11.08.23 PM.jpeg', gradient: 'linear-gradient(135deg,#504540,#887870)' },
        { label: 'Designer', image: 'images/project4/WhatsApp Image 2026-04-16 at 11.08.24 PM (1).jpeg', gradient: 'linear-gradient(135deg,#806858,#b09888)' },
        { label: 'Joinery', image: 'images/project4/WhatsApp Image 2026-04-16 at 11.08.24 PM.jpeg', gradient: 'linear-gradient(135deg,#c0a888,#907868)' },
        { label: '30" height table', image: 'images/project4/WhatsApp Image 2026-04-16 at 11.08.25 PM (1).jpeg', gradient: 'linear-gradient(135deg,#c0a888,#907868)' },
        { label: 'Craftman', image: 'images/project4/WhatsApp Image 2026-04-16 at 11.08.25 PM.jpeg', gradient: 'linear-gradient(135deg,#c0a888,#907868)' },

      ]
    },
    5: {
      tag: 'Modern', title: ' Modern Lines',
      desc: 'my role in the project - •Technical drawing•3D drawing•Design development',
      year: '2025', type: 'Modern lines', tools: 'Sketchup and d5',
      coverImage: 'images/project5/WhatsApp Image 2026-04-17 at 2.07.19 AM.jpeg',
      coverGradient: 'linear-gradient(145deg,#a08040,#c8a868,#e0c898)',
      gallery: [
        { label: 'Workshop Site', image: 'images/project5/WhatsApp Image 2026-04-17 at 2.07.19 AM.jpeg', gradient: 'linear-gradient(145deg,#a08040,#c8a868)', wide: true },
        { label: 'Adobe Bricks', image: 'images/project5/WhatsApp Image 2026-04-17 at 2.07.18 AM.jpeg', gradient: 'linear-gradient(135deg,#906030,#b88848)' },
        { label: 'Cob Wall Detail', image: 'images/project5/WhatsApp Image 2026-04-17 at 2.07.19 AM.jpeg', gradient: 'linear-gradient(135deg,#c0a050,#d8c070)' },
        { label: 'Lime Plaster', image: 'images/project5/WhatsApp Image 2026-04-17 at 2.07.20 AM (1).jpeg', gradient: 'linear-gradient(135deg,#b09858,#d0b878)' },
        { label: 'Documentation', image: 'images/project5/WhatsApp Image 2026-04-17 at 2.07.20 AM (2).jpeg', gradient: 'linear-gradient(135deg,#806030,#a08040)' },
        { label: 'Structure Frame', image: 'images/project5/WhatsApp Image 2026-04-17 at 2.07.20 AM.jpeg', gradient: 'linear-gradient(135deg,#d0b868,#e8d090)' },
        { label: 'Final Facade', image: 'images/project5/WhatsApp Image 2026-04-17 at 2.07.21 AM (1).jpeg', gradient: 'linear-gradient(135deg,#988048,#b89860)' },
        { label: 'Final Facade', image: 'images/project5/WhatsApp Image 2026-04-17 at 2.07.21 AM (2).jpeg', gradient: 'linear-gradient(135deg,#988048,#b89860)' },
        { label: 'Final Facade', image: 'images/project5/WhatsApp Image 2026-04-17 at 2.07.21 AM.jpeg', gradient: 'linear-gradient(135deg,#988048,#b89860)' },
        { label: 'Final Facade', image: 'images/project5/WhatsApp Image 2026-04-17 at 2.07.22 AM (2).jpeg', gradient: 'linear-gradient(135deg,#988048,#b89860)' },
        { label: 'Final Facade', image: 'images/project5/WhatsApp Image 2026-04-17 at 2.07.23 AM.jpeg', gradient: 'linear-gradient(135deg,#988048,#b89860)' },
        { label: 'Final Facade', image: 'images/project5/Screenshot 2026-04-17 020906.png', gradient: 'linear-gradient(135deg,#988048,#b89860)' },
        { label: 'Final Facade', image: 'images/project5/WhatsApp Image 2026-04-17 at 2.07.24 AM.jpeg', gradient: 'linear-gradient(135deg,#988048,#b89860)' },
      ]
    },
    6: {
      tag: 'Office Design', title: 'THE CURATED FORM OFFICE',
      desc: 'MY ROLE•MOOD BOARD•FURNITURE LAYOUT•DESIGN DEVELOPMENT•TECHNICAL DRAWING ',
      year: '2025', type: 'Office ', tools: 'AutoCAD · Illustrator · InDesign',
      coverImage: 'images/project6/WhatsApp Image 2026-04-17 at 12.04.35 AM.jpeg',
      coverGradient: 'linear-gradient(145deg,#3c4858,#607080,#8898a8)',
      gallery: [
        { label: 'Main Gallery', image: 'images/project6/2.png', gradient: 'linear-gradient(145deg,#3c4858,#607080)', wide: true },
        { label: 'Entry Zone', image: 'images/project6/3.png', gradient: 'linear-gradient(135deg,#484e60,#687888)' },
        { label: 'Focal Wall', image: 'images/project6/4.png', gradient: 'linear-gradient(135deg,#304050,#586878)' },
        { label: 'Lighting Mood', image: 'images/project6/5.png', gradient: 'linear-gradient(135deg,#708090,#98a8b8)' },
        { label: 'Entry Zone', image: 'images/project6/6.png', gradient: 'linear-gradient(135deg,#484e60,#687888)' },
        { label: 'Focal Wall', image: 'images/project6/7.png', gradient: 'linear-gradient(135deg,#304050,#586878)' },
        { label: 'Lighting Mood', image: 'images/project6/8.png', gradient: 'linear-gradient(135deg,#708090,#98a8b8)' },
        { label: 'Entry Zone', image: 'images/project6/9.png', gradient: 'linear-gradient(135deg,#484e60,#687888)' },
        { label: 'Focal Wall', image: 'images/project6/10.png', gradient: 'linear-gradient(135deg,#304050,#586878)' },
        { label: 'Lighting Mood', image: 'images/project6/11.png', gradient: 'linear-gradient(135deg,#708090,#98a8b8)' },
        { label: 'Entry Zone', image: 'images/project6/12.png', gradient: 'linear-gradient(135deg,#484e60,#687888)' },
        { label: 'Focal Wall', image: 'images/project6/13.png', gradient: 'linear-gradient(135deg,#304050,#586878)' },
        { label: 'Lighting Mood', image: 'images/project6/14.png', gradient: 'linear-gradient(135deg,#708090,#98a8b8)' },
        { label: 'Entry Zone', image: 'images/project6/15.png', gradient: 'linear-gradient(135deg,#484e60,#687888)' },
        { label: 'Focal Wall', image: 'images/project6/16.png', gradient: 'linear-gradient(135deg,#304050,#586878)' },
        { label: 'Lighting Mood', image: 'images/project6/17.png', gradient: 'linear-gradient(135deg,#708090,#98a8b8)' },
        { label: 'Entry Zone', image: 'images/project6/18.png', gradient: 'linear-gradient(135deg,#484e60,#687888)' },
        { label: 'Focal Wall', image: 'images/project6/19.png', gradient: 'linear-gradient(135deg,#304050,#586878)' },
        { label: 'Lighting Mood', image: 'images/project6/20.png', gradient: 'linear-gradient(135deg,#708090,#98a8b8)' },
      ]
    },
    7: {
      tag: 'Residence project', title: 'INDIAN SOUL',
      desc: 'residence project•site observation, analysis, and metric mapping•autocad drawing and furniture layout•3D and design development',
      year: '2025', type: 'Residential', tools: 'SketchUp · Enscape · Photoshop',
      coverImage: 'images/project7/WhatsApp Image 2026-04-17 at 12.21.03 AM (2).jpeg',
      coverGradient: 'linear-gradient(145deg,#7a4840,#b07060,#d09888)',
      gallery: [
        { label: 'Lobby Overview', image: 'images/project7/WhatsApp Image 2026-04-17 at 12.21.03 AM (2).jpeg', gradient: 'linear-gradient(145deg,#7a4840,#b07060)', wide: true },
        { label: 'Reception Desk', image: 'images/project7/WhatsApp Image 2026-04-17 at 12.21.03 AM (1).jpeg', gradient: 'linear-gradient(135deg,#8a5848,#c08068)' },
        { label: 'Lounge Seating', image: 'images/project7/WhatsApp Image 2026-04-17 at 12.21.03 AM.jpeg', gradient: 'linear-gradient(135deg,#604038,#985858)' },
        { label: 'Ceiling Detail', image: 'images/project7/WhatsApp Image 2026-04-17 at 12.22.11 AM (1).jpeg', gradient: 'linear-gradient(135deg,#d09078,#e8b098)' },
        { label: 'Material Board', image: 'images/project7/WhatsApp Image 2026-04-17 at 12.22.11 AM (2).jpeg', gradient: 'linear-gradient(135deg,#a06858,#c88878)' },
        { label: 'Reception Desk', image: 'images/project7/WhatsApp Image 2026-04-17 at 12.22.11 AM (3).jpeg', gradient: 'linear-gradient(135deg,#8a5848,#c08068)' },
        { label: 'Lounge Seating', image: 'images/project7/WhatsApp Image 2026-04-17 at 12.22.11 AM (4).jpeg', gradient: 'linear-gradient(135deg,#604038,#985858)' },
        { label: 'Ceiling Detail', image: 'images/project7/WhatsApp Image 2026-04-17 at 12.22.11 AM (5).jpeg', gradient: 'linear-gradient(135deg,#d09078,#e8b098)' },
        { label: 'Material Board', image: 'images/project7/WhatsApp Image 2026-04-17 at 12.22.11 AM (6).jpeg', gradient: 'linear-gradient(135deg,#a06858,#c88878)' },
        { label: 'Material Board', image: 'images/project7/WhatsApp Image 2026-04-17 at 12.22.11 AM (7).jpeg', gradient: 'linear-gradient(135deg,#a06858,#c88878)' },
        { label: 'Material Board', image: 'images/project7/WhatsApp Image 2026-04-17 at 12.22.11 AM (8).jpeg', gradient: 'linear-gradient(135deg,#a06858,#c88878)' },
        { label: 'Material Board', image: 'images/project7/WhatsApp Image 2026-04-17 at 12.22.11 AM.jpeg', gradient: 'linear-gradient(135deg,#a06858,#c88878)' },
      ]
    },

  };


  /* ---- RENDER HELPERS ---- */
  // Prefers .image — gradient is the silent fallback if file missing
  function bgStyle(item) {
    if (item.image) return `background-image:url('${item.image}');background-size:cover;background-position:center;`;
    if (item.gradient) return `background:${item.gradient};`;
    return '';
  }


  /* ---- MODAL ---- */
  const modal = document.getElementById('project-modal');
  const modalClose = modal.querySelector('.modal-close');
  const modalBdrop = modal.querySelector('.modal-backdrop');
  const galleryGrid = document.getElementById('modal-gallery-grid');

  function openModal(id) {
    const p = projects[id];
    if (!p) return;

    modal.querySelector('.modal-tag').textContent = p.tag;
    modal.querySelector('.modal-title').textContent = p.title;
    modal.querySelector('.modal-desc').textContent = p.desc;
    modal.querySelector('.modal-year').textContent = p.year;
    modal.querySelector('.modal-type').textContent = p.type;
    modal.querySelector('.modal-tools').textContent = p.tools;

    // Modal hero — uses coverImage if available, falls back to coverGradient
    const heroPh = modal.querySelector('.modal-hero-placeholder');
    heroPh.style.cssText = `width:100%;height:360px;${bgStyle({ image: p.coverImage, gradient: p.coverGradient })}`;

    // Build gallery thumbnails
    galleryGrid.innerHTML = '';
    p.gallery.forEach((item, i) => {
      const thumb = document.createElement('div');
      thumb.className = 'gallery-thumb' + (item.wide ? ' featured' : '');
      thumb.innerHTML = `
        <div class="gallery-thumb-inner" style="${bgStyle(item)}"></div>
        <div class="gallery-thumb-overlay"><span>⊕</span></div>
      `;
      thumb.addEventListener('click', () => openLightbox(p, i));
      galleryGrid.appendChild(thumb);
    });

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    modal.querySelector('.modal-content').scrollTop = 0;
  }

  function closeModal() { modal.classList.remove('open'); document.body.style.overflow = ''; }

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => openModal(card.dataset.project));
  });
  modalClose.addEventListener('click', closeModal);
  modalBdrop.addEventListener('click', closeModal);


  /* ---- LIGHTBOX ---- */
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightbox-img');
  const lbCounter = document.getElementById('lightbox-counter');
  const lbClose = lightbox.querySelector('.lightbox-close');
  const lbPrev = lightbox.querySelector('.lightbox-prev');
  const lbNext = lightbox.querySelector('.lightbox-next');
  let lbProject = null, lbIdx = 0;

  function openLightbox(project, idx) {
    lbProject = project; lbIdx = idx;
    renderLightbox();
    lightbox.classList.add('open');
  }

  function renderLightbox() {
    const item = lbProject.gallery[lbIdx];
    lbImg.style.cssText = `width:100%;height:60vh;`
      + `min-height:260px;`
      + `background-size:contain;`
      + `background-repeat:no-repeat;`
      + `background-position:center;`
      + `background-color:#0a0604;`
      + (item.image ? `background-image:url('${item.image}');` : `background:${item.gradient};`);
    lbCounter.textContent = `${lbIdx + 1} / ${lbProject.gallery.length}  —  ${item.label}`;
  }

  function closeLightbox() { lightbox.classList.remove('open'); }
  function prevImg() { lbIdx = (lbIdx - 1 + lbProject.gallery.length) % lbProject.gallery.length; renderLightbox(); }
  function nextImg() { lbIdx = (lbIdx + 1) % lbProject.gallery.length; renderLightbox(); }

  lbClose.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click', prevImg);
  lbNext.addEventListener('click', nextImg);

  // Keyboard
  document.addEventListener('keydown', e => {
    if (lightbox.classList.contains('open')) {
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowLeft') prevImg();
      else if (e.key === 'ArrowRight') nextImg();
      return;
    }
    if (modal.classList.contains('open') && e.key === 'Escape') closeModal();
  });

  // Touch swipe
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
  lightbox.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(dx) > 50) dx < 0 ? nextImg() : prevImg();
  });

});
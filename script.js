document.addEventListener('DOMContentLoaded', () => {
  /* ─── NAVBAR SCROLL EFFECT ────────────────────────────── */
  const navbar = document.getElementById('navbar');
  
  const updateScrollState = () => {
    if (window.scrollY > 15) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  updateScrollState();
  window.addEventListener('scroll', updateScrollState, { passive: true });

  /* ─── MOBILE MENU ──────────────────────────────────────── */
  const navLinks = document.getElementById('navLinks');
  const menuToggle = document.getElementById('menuToggle');

  const toggleMenu = (forceClose = false) => {
    if (!navLinks || !menuToggle) return;
    const isOpen = navLinks.classList.contains('open');

    if (isOpen || forceClose) {
      navLinks.classList.remove('open');
      menuToggle.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    } else {
      navLinks.classList.add('open');
      menuToggle.classList.add('open');
      menuToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  };

  if (menuToggle) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });
  }

  // Close menu when a link is clicked
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks && navLinks.classList.contains('open')) toggleMenu(true);
    });
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks && navLinks.classList.contains('open')) {
      toggleMenu(true);
    }
  });

  // Close mobile menu if clicked outside
  document.addEventListener('click', (e) => {
    if (navLinks && navLinks.classList.contains('open') && !navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
      toggleMenu(true);
    }
  });

  /* ─── ACTIVE NAV LINK HIGHLIGHTING & SCROLL SPY ─────────── */
  const anchors = document.querySelectorAll('.nav-links a[href^="#"]');
  const sections = document.querySelectorAll('main section[id]');

  const handleScrollSpy = () => {
    const scrollPosition = window.scrollY + 120;

    let currentSectionId = '';

    if (window.scrollY < 80) {
      currentSectionId = 'home';
    } else {
      sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          currentSectionId = section.getAttribute('id');
        }
      });
    }

    if (currentSectionId) {
      anchors.forEach(a => {
        const href = a.getAttribute('href');
        const isMatch = href === '#' + currentSectionId;
        a.classList.toggle('active', isMatch);
      });
    }
  };

  window.addEventListener('scroll', handleScrollSpy, { passive: true });
  handleScrollSpy();

  /* ─── CONTACT FORM SUBMISSION ──────────────────────────── */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = e.currentTarget.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      
      btn.innerHTML = 'Sending...';
      btn.disabled = true;
      btn.style.opacity = '0.7';
      
      setTimeout(() => {
        btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Sent Successfully!';
        btn.style.background = '#1E9E5A';
        btn.style.color = '#FFF';
        btn.style.opacity = '1';
        
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.disabled = false;
          btn.style.background = '';
          btn.style.color = '';
          contactForm.reset();
        }, 3000);
      }, 1500);
    });
  }
});

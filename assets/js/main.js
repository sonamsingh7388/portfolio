/* ============================================================
   SONAM SINGH PORTFOLIO — MAIN JAVASCRIPT
   ============================================================ */

'use strict';

/* ============================================================
   1. NAVBAR: scroll effect + mobile toggle + active links
   ============================================================ */
(function initNavbar() {
  const navbar   = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  const allNavLinks = document.querySelectorAll('.nav-link');
  const sections  = document.querySelectorAll('section[id]');

  // Scroll → add "scrolled" class + update active nav link
  function onScroll() {
    const y = window.scrollY;

    // Navbar appearance
    navbar.classList.toggle('scrolled', y > 40);

    // Back-to-top button
    const btn = document.getElementById('backToTop');
    if (btn) btn.classList.toggle('visible', y > 500);

    // Active link based on scroll position
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (y >= sectionTop) current = section.getAttribute('id');
    });
    allNavLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on load

  // Hamburger toggle
  hamburger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
  });

  // Close mobile menu when a link is clicked
  allNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
})();


/* ============================================================
   2. TYPED TEXT ANIMATION
   ============================================================ */
(function initTyped() {
  const el = document.getElementById('typedText');
  if (!el) return;

  const phrases = [
    'Aspiring Software Developer',
    'Data Science Student',
    'Web Development Enthusiast',
    'AI Project Builder',
    'B.Tech CSE (Data Science)',
  ];

  let phraseIdx = 0;
  let charIdx   = 0;
  let isDeleting = false;
  let delay      = 120;

  function type() {
    const current = phrases[phraseIdx];

    if (!isDeleting) {
      el.textContent = current.slice(0, ++charIdx);
      if (charIdx === current.length) {
        isDeleting = true;
        delay = 2000; // pause before deleting
      } else {
        delay = 90;
      }
    } else {
      el.textContent = current.slice(0, --charIdx);
      if (charIdx === 0) {
        isDeleting = false;
        phraseIdx  = (phraseIdx + 1) % phrases.length;
        delay = 400;
      } else {
        delay = 50;
      }
    }
    setTimeout(type, delay);
  }

  setTimeout(type, 800);
})();


/* ============================================================
   3. PARTICLE CANVAS BACKGROUND
   ============================================================ */
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let particles = [];
  let W, H;

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.r  = Math.random() * 1.8 + 0.4;
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = (Math.random() - 0.5) * 0.35;
      this.alpha = Math.random() * 0.5 + 0.1;
      this.color = Math.random() > 0.5 ? '#a855f7' : '#3b82f6';
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = this.alpha;
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  function initParticlesList() {
    particles = Array.from({ length: 90 }, () => new Particle());
  }

  function connectNearby() {
    const maxDist = 140;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(168,85,247,${0.12 * (1 - dist / maxDist)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    connectNearby();
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }

  resize();
  initParticlesList();
  animate();

  window.addEventListener('resize', () => { resize(); initParticlesList(); }, { passive: true });
})();


/* ============================================================
   4. SCROLL REVEAL ANIMATION
   ============================================================ */
(function initScrollReveal() {
  // Add reveal class to target elements
  const selectors = [
    '.section-header',
    '.glass-card',
    '.timeline-item',
    '.skill-card',
    '.project-card',
    '.github-repo-card',
    '.training-card',
    '.contact-info-block',
    '.contact-form-block',
  ];

  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${(i % 4) * 0.1}s`;
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // only animate once
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
    .forEach(el => observer.observe(el));
})();


/* ============================================================
   5. BACK TO TOP BUTTON
   ============================================================ */
(function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();


/* ============================================================
   6. CONTACT FORM — CLIENT SIDE VALIDATION & DEMO FEEDBACK
   ============================================================ */
(function initContactForm() {
  const form     = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');
  if (!form) return;

  function getField(id)   { return document.getElementById(id); }
  function getError(id)   { return document.getElementById(id); }
  function setError(id, msg) { const el = getError(id); if (el) el.textContent = msg; }
  function clearErrors()  { ['nameError','emailError','messageError'].forEach(id => setError(id, '')); }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    clearErrors();
    feedback.textContent = '';
    feedback.className = 'form-feedback';

    const name    = getField('formName').value.trim();
    const email   = getField('formEmail').value.trim();
    const message = getField('formMessage').value.trim();
    let valid     = true;

    if (!name) { setError('nameError', 'Please enter your name.'); valid = false; }
    if (!email) { setError('emailError', 'Please enter your email.'); valid = false; }
    else if (!validateEmail(email)) { setError('emailError', 'Please enter a valid email address.'); valid = false; }
    if (!message || message.length < 10) { setError('messageError', 'Please write a message (at least 10 characters).'); valid = false; }

    if (!valid) return;

    // DEMO ONLY — no actual email sending
    // To send real emails, integrate Formspree (formspree.io) or EmailJS.
    const btn = document.getElementById('formSubmitBtn');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
      feedback.textContent = '✅ Message received (demo mode)! Connect Formspree or EmailJS to enable real sending.';
      feedback.className = 'form-feedback success';
      form.reset();
    }, 1500);
  });
})();


/* ============================================================
   7. FOOTER YEAR
   ============================================================ */
(function setFooterYear() {
  const el = document.getElementById('footerYear');
  if (el) el.textContent = new Date().getFullYear();
})();


/* ============================================================
   8. SMOOTH SCROLL for anchor links
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});


/* ============================================================
   9. RESUME BUTTON — gracefully handle missing file
   ============================================================ */
(function initResumeBtn() {
  const btn = document.getElementById('resumeBtn');
  if (!btn) return;

  btn.addEventListener('click', function(e) {
    // Check if the resume file exists by attempting a fetch (HEAD request)
    // If it fails, show an alert with instructions
    fetch('assets/resume/resume.pdf', { method: 'HEAD' })
      .then(res => {
        if (!res.ok) {
          e.preventDefault();
          alert(
            '📄 Resume not found yet!\n\n' +
            'To add your resume:\n' +
            '1. Create the folder: assets/resume/\n' +
            '2. Place your resume PDF named "resume.pdf" in that folder.\n\n' +
            'After that, the download button will work automatically.'
          );
        }
        // If res.ok, the default download behaviour continues
      })
      .catch(() => {
        // fetch might fail in file:// protocol — in that case just let it try
        // No need to block the user
      });
  });
})();


/* ============================================================
   10. SKILL CARDS — subtle tilt effect on hover (desktop only)
   ============================================================ */
(function initTilt() {
  if (window.matchMedia('(hover: none)').matches) return;

  document.querySelectorAll('.skill-card, .project-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', function() {
      card.style.transform = '';
    });
  });
})();


/* ============================================================
   11. PORTFOLIO CHAT ASSISTANT
   ============================================================ */
(function initChatAssistant() {
  const widget = document.getElementById('chatWidget');
  const panel = document.getElementById('chatPanel');
  const launcher = document.getElementById('chatLauncher');
  const closeButton = document.getElementById('chatClose');
  const form = document.getElementById('chatForm');
  const input = document.getElementById('chatInput');
  const messages = document.getElementById('chatMessages');
  if (!widget || !panel || !launcher || !closeButton || !form || !input || !messages) return;

  function setOpen(open) {
    panel.classList.toggle('open', open);
    panel.setAttribute('aria-hidden', String(!open));
    launcher.setAttribute('aria-expanded', String(open));
    launcher.setAttribute('aria-label', open ? 'Close chat' : 'Open chat');
    if (open) input.focus();
    else launcher.focus();
  }

  function addMessage(text, sender) {
    const message = document.createElement('div');
    message.className = `chat-message ${sender}-message`;
    message.textContent = text;
    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
    return message;
  }

  function getReply(rawText) {
    const text = rawText.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, ' ').replace(/\s+/g, ' ').trim();
    const has = (...words) => words.some(word => text.includes(word));

    if (!text) return 'Please type a message and I’ll do my best to help.';
    if (has('how are you', 'how r u', 'kaisi ho', 'kaise ho', 'kya haal')) return 'I’m doing well, thank you for asking! 😊 What would you like to know about Sonam’s portfolio?';
    if (/\b(hello|hi|hey)\b/.test(text) || has('namaste', 'namaskar')) return 'Hi there! 👋 You can ask me about Sonam’s projects, skills, studies, or contact details.';
    if (has('project', 'projects', 'work', 'portfolio')) return 'Sonam’s portfolio highlights an AI-based income and tax analysis system, a Resume Analyzer, and her web development work. Scroll to the Projects section to explore them.';
    if (has('skill', 'skills', 'technology', 'tech stack', 'programming')) return 'Sonam works with HTML, CSS, JavaScript, Python, Java, SQL, Streamlit, Git, and GitHub. She is currently learning Power BI and machine learning basics.';
    if (has('education', 'study', 'college', 'degree', 'university')) return 'Sonam is pursuing B.Tech in Computer Science and Engineering (Data Science) at Goel Institute of Technology & Management in Lucknow, expected to graduate in 2028. You can find more in the Education section.';
    if (has('contact', 'email', 'linkedin', 'reach', 'hire', 'internship')) return 'Sonam is open to internship opportunities. Visit the Contact section near the bottom of this page to find her contact links and send a message.';
    if (has('resume', 'cv')) return 'You can use the Download Resume button near the top of the page. The resume PDF needs to be added to the portfolio before the download will work.';
    if (has('where', 'location', 'city', 'live')) return 'Sonam is based in Lucknow, India, and is open to remote or hybrid internship opportunities.';
    if (has('thank', 'thanks', 'shukriya', 'dhanyavaad')) return 'You’re welcome! 😊 Is there anything else you’d like to know?';
    if (has('who are you', 'your name', 'about you')) return 'I’m the portfolio chat assistant. I can answer questions about Sonam’s background, projects, skills, and ways to get in touch.';
    return 'I can help with questions about Sonam’s projects, skills, education, location, resume, or contact details. What would you like to know?';
  }

  function sendMessage(text) {
    const trimmed = text.trim();
    if (!trimmed) return;
    addMessage(trimmed, 'user');
    input.value = '';
    const typing = addMessage('Typing…', 'bot');
    typing.setAttribute('aria-label', 'Assistant is typing');
    window.setTimeout(() => {
      typing.remove();
      addMessage(getReply(trimmed), 'bot');
    }, 450);
  }

  launcher.addEventListener('click', () => setOpen(!panel.classList.contains('open')));
  closeButton.addEventListener('click', () => setOpen(false));
  form.addEventListener('submit', event => {
    event.preventDefault();
    sendMessage(input.value);
    input.focus();
  });
  widget.querySelectorAll('.chat-suggestion').forEach(button => {
    button.addEventListener('click', () => sendMessage(button.textContent));
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && panel.classList.contains('open')) setOpen(false);
  });
})();

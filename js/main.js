// ═══════════════════════════════════════════════════════════
//  REHBAR MIYAN — 3D Portfolio  |  Main JavaScript
// ═══════════════════════════════════════════════════════════

// ─── NAV SCROLL ────────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ─── MOBILE MENU ───────────────────────────────────────────
const menuBtn = document.getElementById('mobile-menu-btn');
const mobileNav = document.getElementById('mobile-nav');

if (menuBtn && mobileNav) {
  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuBtn.classList.remove('active');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// ─── SCROLL REVEAL ─────────────────────────────────────────
const reveals = document.querySelectorAll('.reveal');

function revealElements() {
  reveals.forEach((el, idx) => {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    if (rect.top < windowHeight - 60) {
      setTimeout(() => el.classList.add('visible'), idx * 60);
    }
  });
}

// Use IntersectionObserver as primary method
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });
reveals.forEach(el => observer.observe(el));

// Fallback: also check on scroll and initial load
window.addEventListener('scroll', revealElements, { passive: true });
// Run once on load after a small delay to trigger any in-view elements
setTimeout(revealElements, 100);

// ─── ACTIVE NAV HIGHLIGHT ──────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function highlightNav() {
  let scrollPos = window.scrollY + 200;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach(l => {
        l.style.color = '';
        if (l.getAttribute('href') === '#' + id) {
          l.style.color = 'var(--accent)';
        }
      });
    }
  });
}
window.addEventListener('scroll', highlightNav);

// ─── SMOOTH SCROLL for anchor links ───────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ─── FLOATING MESSAGE BUTTON + MODAL ──────────────────────
const msgFab = document.getElementById('msg-fab');
const msgOverlay = document.getElementById('msg-modal-overlay');
const msgClose = document.getElementById('msg-modal-close');
const msgForm = document.getElementById('msg-form');
const msgStatus = document.getElementById('msg-status');
const msgSubmit = document.getElementById('msg-submit');

function openMsgModal() {
  msgOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMsgModal() {
  msgOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

msgFab.addEventListener('click', openMsgModal);
msgClose.addEventListener('click', closeMsgModal);
msgOverlay.addEventListener('click', (e) => {
  if (e.target === msgOverlay) closeMsgModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && msgOverlay.classList.contains('open')) closeMsgModal();
});

// EmailJS form submission (same credentials as previous portfolio)
msgForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const submitBtn = msgSubmit;
  const submitText = submitBtn.querySelector('span');
  submitBtn.disabled = true;
  submitText.textContent = 'Sending...';

  // EmailJS credentials from the previous React portfolio
  const SERVICE_ID = 'service_sylarzg';
  const TEMPLATE_ID = 'template_re2hgng';
  const PUBLIC_KEY = 'aNB5uiPw7ScQycJqP';

  emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, msgForm, PUBLIC_KEY)
    .then(() => {
      msgStatus.textContent = 'Message sent successfully! I\'ll get back to you soon.';
      msgStatus.className = 'msg-status success';
      msgForm.reset();
      setTimeout(() => {
        msgStatus.className = 'msg-status';
        msgStatus.textContent = '';
      }, 5000);
    })
    .catch((err) => {
      console.error('EmailJS Error:', err);
      msgStatus.textContent = 'Failed to send. Please try again or email me directly.';
      msgStatus.className = 'msg-status error';
      setTimeout(() => {
        msgStatus.className = 'msg-status';
        msgStatus.textContent = '';
      }, 5000);
    })
    .finally(() => {
      submitBtn.disabled = false;
      submitText.textContent = 'Send Message';
    });
});

// ─── BG PARTICLE CANVAS ───────────────────────────────────
(function () {
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.size = Math.random() * 1.2 + 0.3;
      this.speed = Math.random() * 0.3 + 0.1;
      this.opacity = Math.random() * 0.4 + 0.05;
      this.vx = (Math.random() - 0.5) * 0.2;
      this.vy = -this.speed;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.y < -5) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,255,200,${this.opacity})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 120; i++) particles.push(new Particle());

  // Grid lines
  function drawGrid() {
    ctx.strokeStyle = 'rgba(255,255,255,0.02)';
    ctx.lineWidth = 1;
    for (let x = 0; x < W; x += 80) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
    }
    for (let y = 0; y < H; y += 80) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);
    drawGrid();
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }
  loop();
})();

// ─── HERO 3D CANVAS (Three.js toroidal knot) ──────────────
(function () {
  try {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas || typeof THREE === 'undefined') return;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(600, 600);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 4.5;

    // Main toroidal knot
    const knotGeo = new THREE.TorusKnotGeometry(1, 0.35, 200, 20, 2, 3);
    const knotMat = new THREE.MeshStandardMaterial({
      color: 0x00ffc8,
      metalness: 0.7,
      roughness: 0.2,
      wireframe: false,
    });
    const knot = new THREE.Mesh(knotGeo, knotMat);
    scene.add(knot);

    // Wireframe overlay
    const knotWire = new THREE.Mesh(knotGeo, new THREE.MeshBasicMaterial({
      color: 0x00ffc8, wireframe: true, transparent: true, opacity: 0.08
    }));
    scene.add(knotWire);

    // Outer ring
    const ringGeo = new THREE.TorusGeometry(2.2, 0.01, 4, 200);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x00ffc8, transparent: true, opacity: 0.15 });
    const heroRing = new THREE.Mesh(ringGeo, ringMat);
    heroRing.rotation.x = Math.PI / 3;
    scene.add(heroRing);

    // Floating orbs
    const orbGeo = new THREE.SphereGeometry(0.06, 12, 12);
    const orbMat = new THREE.MeshBasicMaterial({ color: 0xff3cac });
    for (let i = 0; i < 12; i++) {
      const orb = new THREE.Mesh(orbGeo, orbMat);
      const angle = (i / 12) * Math.PI * 2;
      orb.position.set(Math.cos(angle) * 2, Math.sin(angle) * 2 * 0.6, 0);
      orb.userData.angle = angle;
      scene.add(orb);
    }

    // Lights
    const ambLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambLight);
    const pointLight = new THREE.PointLight(0x00ffc8, 3, 10);
    pointLight.position.set(3, 3, 3);
    scene.add(pointLight);
    const pointLight2 = new THREE.PointLight(0xff3cac, 2, 10);
    pointLight2.position.set(-3, -2, 2);
    scene.add(pointLight2);

    let t = 0;
    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', e => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    function animate() {
      requestAnimationFrame(animate);
      t += 0.008;
      knot.rotation.x = t * 0.4 + mouseY * 0.3;
      knot.rotation.y = t * 0.6 + mouseX * 0.3;
      knotWire.rotation.copy(knot.rotation);
      heroRing.rotation.z = t * 0.2;

      // Animate orbs
      scene.children.forEach(child => {
        if (child.userData.angle !== undefined) {
          child.userData.angle += 0.01;
          child.position.x = Math.cos(child.userData.angle) * 2;
          child.position.y = Math.sin(child.userData.angle) * 1.2;
          child.position.z = Math.sin(child.userData.angle * 1.5) * 0.5;
        }
      });

      renderer.render(scene, camera);
    }
    animate();
  } catch (e) { console.error("Three.js Hero Canvas failed:", e); }
})();

// ─── ABOUT 3D CANVAS (Icosahedron with orbiting rings) ────
(function () {
  try {
    const canvas = document.getElementById('about-canvas');
    if (!canvas || typeof THREE === 'undefined') return;
    const W = canvas.offsetWidth || 500;
    const H = 480;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
    camera.position.z = 5;

    // Icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(1.4, 1);
    const icoMat = new THREE.MeshStandardMaterial({
      color: 0x040408,
      metalness: 0.9,
      roughness: 0.1,
      emissive: 0x001a12,
    });
    const ico = new THREE.Mesh(icoGeo, icoMat);
    scene.add(ico);

    const icoWire = new THREE.Mesh(icoGeo, new THREE.MeshBasicMaterial({
      color: 0x00ffc8, wireframe: true, transparent: true, opacity: 0.25
    }));
    scene.add(icoWire);

    // Orbiting ring
    const orbRingGeo = new THREE.TorusGeometry(2.2, 0.015, 4, 100);
    const orbRing = new THREE.Mesh(orbRingGeo, new THREE.MeshBasicMaterial({ color: 0xff3cac, transparent: true, opacity: 0.4 }));
    orbRing.rotation.x = Math.PI / 4;
    scene.add(orbRing);

    const orbRing2 = new THREE.Mesh(
      new THREE.TorusGeometry(1.9, 0.01, 4, 100),
      new THREE.MeshBasicMaterial({ color: 0x00ffc8, transparent: true, opacity: 0.25 })
    );
    orbRing2.rotation.x = -Math.PI / 3;
    orbRing2.rotation.y = Math.PI / 5;
    scene.add(orbRing2);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const pl = new THREE.PointLight(0x00ffc8, 4, 12);
    pl.position.set(3, 2, 3);
    scene.add(pl);
    const pl2 = new THREE.PointLight(0xff3cac, 3, 12);
    pl2.position.set(-3, -2, 1);
    scene.add(pl2);

    let t = 0;
    function animate() {
      requestAnimationFrame(animate);
      t += 0.008;
      ico.rotation.x = t * 0.3;
      ico.rotation.y = t * 0.5;
      icoWire.rotation.copy(ico.rotation);
      orbRing.rotation.z = t * 0.4;
      orbRing2.rotation.z = -t * 0.3;
      pl.position.x = Math.sin(t) * 4;
      pl.position.y = Math.cos(t) * 3;
      renderer.render(scene, camera);
    }
    animate();
  } catch (e) { console.error("Three.js About canvas failed", e); }
})();

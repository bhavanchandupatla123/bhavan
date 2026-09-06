const menuButton = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuButton?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', open ? 'true' : 'false');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

document.getElementById('year').textContent = new Date().getFullYear();

const contactLinks = document.querySelector('.contact-links');
if (contactLinks) {
  const linkedIn = document.createElement('a');
  linkedIn.className = 'contact-pill magnetic';
  linkedIn.href = 'https://linkedin.com/in/bhavan-chandupatla-718b75419';
  linkedIn.target = '_blank';
  linkedIn.rel = 'noreferrer';
  linkedIn.innerHTML = '<span>IN</span> LinkedIn ↗';

  const email = document.createElement('a');
  email.className = 'contact-pill magnetic';
  email.href = 'mailto:bhavanchandupatla112@gmail.com';
  email.innerHTML = '<span>MAIL</span> bhavanchandupatla112@gmail.com ↗';

  contactLinks.append(linkedIn, email);
}

const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', e => {
  if (!glow) return;
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
});

const roleEl = document.getElementById('rotating-role');
const roles = ['business intelligence','SQL analysis','Power BI dashboards','data quality','Python & machine learning'];
let roleIndex = 0;
setInterval(() => {
  if (!roleEl) return;
  roleEl.animate([{ opacity: 1, transform: 'translateY(0)' },{ opacity: 0, transform: 'translateY(-8px)' }], { duration: 220, fill: 'forwards' }).onfinish = () => {
    roleIndex = (roleIndex + 1) % roles.length;
    roleEl.textContent = roles[roleIndex];
    roleEl.animate([{ opacity: 0, transform: 'translateY(8px)' },{ opacity: 1, transform: 'translateY(0)' }], { duration: 280, fill: 'forwards' });
  };
}, 2400);

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      entry.target.querySelectorAll('.skill-card').forEach((card, i) => setTimeout(() => card.classList.add('visible'), i * 120));
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

let countersStarted = false;
const counters = document.querySelectorAll('.counter');
const counterArea = document.querySelector('.hero-stats');
if (counterArea) {
  const counterObserver = new IntersectionObserver(entries => {
    if (countersStarted || !entries[0].isIntersecting) return;
    countersStarted = true;
    counters.forEach(counter => {
      const target = Number(counter.dataset.target || 0);
      const suffix = counter.dataset.suffix || '';
      const duration = 1100;
      const start = performance.now();
      const tick = now => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        counter.textContent = `${Math.round(target * eased)}${suffix}`;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: .5 });
  counterObserver.observe(counterArea);
}

const finePointer = window.matchMedia('(pointer:fine)').matches;
if (finePointer && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - .5;
      const y = (e.clientY - rect.top) / rect.height - .5;
      card.style.transform = `perspective(900px) rotateX(${(-y * 4).toFixed(2)}deg) rotateY(${(x * 5).toFixed(2)}deg) translateY(-2px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
  document.querySelectorAll('.magnetic').forEach(button => {
    button.addEventListener('mousemove', e => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      button.style.transform = `translate(${x * .08}px, ${y * .10}px)`;
    });
    button.addEventListener('mouseleave', () => { button.style.transform = ''; });
  });
}

const sectionLinks = [...document.querySelectorAll('.nav-links a')];
const sectionMap = sectionLinks.map(link => ({ link, section: document.querySelector(link.getAttribute('href')) })).filter(item => item.section);
const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    sectionLinks.forEach(link => link.classList.remove('active'));
    const match = sectionMap.find(item => item.section === entry.target);
    match?.link.classList.add('active');
  });
}, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
sectionMap.forEach(item => navObserver.observe(item.section));



// Sélectionne les éléments du curseur personnalisé dans le DOM
const cursor = document.querySelector('.cursor');
const dot = document.querySelector('.cursor-dot');

if (cursor && dot) {
  // Met à jour la position du curseur personnalisé à chaque mouvement de la souris.
  // e.clientX et e.clientY donnent la position horizontale et verticale de la souris.
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
    dot.style.left = `${e.clientX}px`;
    dot.style.top = `${e.clientY}px`;
  });

  // Sur certains éléments interactifs, on agrandit le curseur et on active l'effet hover.
  document.querySelectorAll('a, button, .skill-card, .project-visual').forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
}

// Sélectionne la barre de navigation pour lui appliquer un style après défilement.
const nav = document.querySelector('.nav');
if (nav) {
  window.addEventListener('scroll', () => {

    nav.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// Calcule la position de la souris à l'intérieur de certains éléments.
// Ces coordonnées sont utilisées par le CSS pour créer des effets d'éclairage ou de survol.
document.querySelectorAll('.skill-card, .btn, .project-visual').forEach((el) => {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    // e.clientX - rect.left donne la position de la souris depuis le bord gauche de l'élément.
    // e.clientY - rect.top donne la position de la souris depuis le bord supérieur.
    el.style.setProperty('--x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--y', `${e.clientY - rect.top}px`);
  });
});

const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');

if (toggle && links) {
  // Ouvre ou ferme le menu mobile lorsque l'utilisateur clique sur le bouton burger.
  toggle.addEventListener('click', () => links.classList.toggle('open'));
}

// Gestion du CV Modal
const cvBtn = document.querySelector('#cvBtn');
const cvModal = document.querySelector('#cvModal');
const cvClose = document.querySelector('#cvClose');

if (cvBtn && cvModal && cvClose) {
  // Ouvrir la modale CV
  cvBtn.addEventListener('click', () => {
    cvModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });

  // Fermer la modale CV au clic sur le bouton close
  cvClose.addEventListener('click', () => {
    cvModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  });

  // Fermer la modale CV au clic en dehors du contenu
  cvModal.addEventListener('click', (e) => {
    if (e.target === cvModal) {
      cvModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });

  // Fermer avec la touche Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cvModal.classList.contains('active')) {
      cvModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });

  // Lorsque l'utilisateur clique sur une ancre dans le menu mobile,
  // on ferme automatiquement le menu pour revenir à la page.
  document.querySelectorAll('.nav-links a').forEach((a) => {
    a.addEventListener('click', () => links.classList.remove('open'));
  });
}

// Animation du texte rotateur dans la section hero.
// Change le mot actif toutes les 2.5 secondes pour créer un effet de présentation dynamique.
const words = document.querySelectorAll('.rotator-word');
if (words.length) {
  let currentWord = 0;
  setInterval(() => {
    words[currentWord].classList.remove('active');
    currentWord = (currentWord + 1) % words.length;
    words[currentWord].classList.add('active');
  }, 2500);
}

// Utilise l'API IntersectionObserver pour détecter quand un élément
// entre dans la zone visible de l'écran.
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    // Lorsque l'élément devient visible, on ajoute la classe 'visible'.
    // Le CSS peut alors animer cet élément (fade in, translation, etc.).
    entry.target.classList.add('visible');

    // Si l'élément contient une barre de compétence, on lit son niveau
    // depuis l'attribut data-level et on anime la largeur de la barre.
    const bar = entry.target.querySelector('.skill-bar div');
    if (bar) {
      const level = bar.dataset.level;
      setTimeout(() => {
        bar.style.width = `${level}%`;
      }, 200);
    }
  });
}, { threshold: 0.15 });

// Observe tous les éléments marqués avec la classe 'reveal'.
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

if (form && status) {
  // Formulaire de contact simulé.
  // La page ne se recharge pas grâce à e.preventDefault().
  // Le message de confirmation s'affiche puis disparaît après 5 secondes.
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    status.textContent = '✓ Message envoyé ! Je vous réponds très vite.';
    form.reset();
    setTimeout(() => {
      status.textContent = '';
    }, 5000);
  });
}

// Met à jour automatiquement l'année du pied de page.
const year = document.getElementById('year');
if (year) {
  year.textContent = new Date().getFullYear();
}

// Animation parallax simple des orbes de la section hero lors du défilement.
// Les orbes bougent légèrement à des vitesses différentes pour enrichir l'effet visuel.
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  document.querySelectorAll('.hero-orb').forEach((orb, i) => {
    orb.style.transform = `translateY(${scrolled * (0.2 + i * 0.1)}px)`
  });
});


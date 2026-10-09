(() => {
  const nav = document.querySelector('.nav');
  const burger = document.querySelector('.burger');
  const menu = document.getElementById('menu');

  const setMenu = (open) => {
    menu.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  };

  burger.addEventListener('click', () => {
    setMenu(!menu.classList.contains('open'));
  });

  menu.addEventListener('click', (e) => {
    if (e.target.closest('a')) {
      setMenu(false);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      setMenu(false);
    }
  });

  // Fond de la navbar après un léger défilement
  const onScroll = () => {
    nav.classList.toggle('solid', window.scrollY > 10);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Apparition progressive au scroll
  const items = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    items.forEach((el) => {
      io.observe(el);
    });
  } else {
    items.forEach((el) => {
      el.classList.add('in');
    });
  }

  // Lien actif dans la navigation selon la section visible
  const links = [
    ...menu.querySelectorAll('a[href^="#"]:not(.btn)')
  ];

  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          links.forEach((a) => {
            a.classList.toggle(
              'on',
              a.getAttribute('href') === '#' + entry.target.id
            );
          });
        });
      },
      {
        rootMargin: '-45% 0px -50% 0px'
      }
    );

    links.forEach((a) => {
      const section = document.querySelector(a.getAttribute('href'));

      if (section) {
        spy.observe(section);
      }
    });
  }
})();
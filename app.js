(() => {
  const menuToggle = document.querySelector('.menu-toggle');
  const siteNav = document.querySelector('#site-nav');

  if (menuToggle && siteNav) {
    const closeMenu = () => {
      siteNav.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    };

    menuToggle.addEventListener('click', () => {
      const nextOpen = !siteNav.classList.contains('is-open');
      siteNav.classList.toggle('is-open', nextOpen);
      menuToggle.setAttribute('aria-expanded', String(nextOpen));
    });

    siteNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    window.addEventListener('resize', () => {
      if (window.innerWidth > 760) closeMenu();
    });
  }

  const stackChoices = [...document.querySelectorAll('.stack-choice')];
  const stackCount = document.querySelector('#selected-stack-count');

  const updateStackCount = () => {
    if (!stackCount) return;
    stackCount.textContent = String(stackChoices.filter((choice) => choice.classList.contains('is-selected')).length);
  };

  stackChoices.forEach((choice) => {
    choice.addEventListener('click', () => {
      const selected = !choice.classList.contains('is-selected');
      choice.classList.toggle('is-selected', selected);
      choice.setAttribute('aria-pressed', String(selected));
      updateStackCount();
    });
  });
  updateStackCount();

  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
    revealElements.forEach((element) => revealObserver.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add('is-visible'));
  }

  const details = [...document.querySelectorAll('.faq-list details')];
  details.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (!item.open) return;
      details.forEach((other) => {
        if (other !== item) other.open = false;
      });
    });
  });

  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());
})();

(() => {
  const menuToggle = document.querySelector('.menu-toggle');
  const siteNav = document.querySelector('#site-nav');
  const progressBar = document.querySelector('#scroll-progress-bar');

  const closeMenu = () => {
    if (!menuToggle || !siteNav) return;
    siteNav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  };

  if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', () => {
      const nextOpen = !siteNav.classList.contains('is-open');
      siteNav.classList.toggle('is-open', nextOpen);
      menuToggle.setAttribute('aria-expanded', String(nextOpen));
    });

    siteNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    window.addEventListener('resize', () => {
      if (window.innerWidth > 760) closeMenu();
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
  }

  const updateProgress = () => {
    if (!progressBar) return;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0;
    progressBar.style.width = `${progress * 100}%`;
  };
  updateProgress();
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);

  const stackChoices = [...document.querySelectorAll('.stack-choice')];
  const stackCount = document.querySelector('#selected-stack-count');
  const stackNames = document.querySelector('#selected-stack-names');
  const storageKey = 'stack-safety-demo-stack';

  const selectedStacks = () => stackChoices
    .filter((choice) => choice.classList.contains('is-selected'))
    .map((choice) => choice.dataset.stack || choice.textContent.trim());

  const updateStackUI = () => {
    const selected = selectedStacks();
    if (stackCount) stackCount.textContent = String(selected.length);
    if (stackNames) stackNames.textContent = selected.length ? selected.join(', ') : 'Nothing selected yet';
    try {
      localStorage.setItem(storageKey, JSON.stringify(selected));
    } catch (_) {
      // Local persistence is a convenience only; the demo still works without it.
    }
  };

  if (stackChoices.length) {
    try {
      const stored = JSON.parse(localStorage.getItem(storageKey) || 'null');
      if (Array.isArray(stored)) {
        stackChoices.forEach((choice) => {
          const selected = stored.includes(choice.dataset.stack);
          choice.classList.toggle('is-selected', selected);
          choice.setAttribute('aria-pressed', String(selected));
        });
      }
    } catch (_) {
      // Ignore malformed or unavailable localStorage and use the HTML defaults.
    }

    stackChoices.forEach((choice) => {
      choice.addEventListener('click', () => {
        const selected = !choice.classList.contains('is-selected');
        choice.classList.toggle('is-selected', selected);
        choice.setAttribute('aria-pressed', String(selected));
        updateStackUI();
      });
    });
    updateStackUI();
  }

  const revealElements = document.querySelectorAll('.reveal');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reduceMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -32px' });
    revealElements.forEach((element) => revealObserver.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add('is-visible'));
  }

  const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
  const navSections = navLinks
    .map((link) => ({ link, section: document.querySelector(link.getAttribute('href')) }))
    .filter((item) => item.section);

  if ('IntersectionObserver' in window && navSections.length) {
    const navObserver = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      navSections.forEach(({ link, section }) => {
        if (section === visible.target) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    }, { rootMargin: '-28% 0px -58% 0px', threshold: [0.01, 0.2, 0.5] });
    navSections.forEach(({ section }) => navObserver.observe(section));
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

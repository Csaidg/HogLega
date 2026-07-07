(function () {
  const houseInfo = {
    Gryffindor: { text: 'Coraje, audacia y un impulso constante por la aventura.', theme: 'gryffindor' },
    Slytherin: { text: 'Ambicion, astucia y una mente estrategica.', theme: 'slytherin' },
    Ravenclaw: { text: 'Sabiduria, creatividad y curiosidad por encima de todo.', theme: 'ravenclaw' },
    Hufflepuff: { text: 'Lealtad, paciencia y esfuerzo en cada paso.', theme: 'hufflepuff' }
  };

  const houseDescriptions = {
    Gryffindor: 'Tu casa actual es Gryffindor: coraje, energia y un corazon valiente.',
    Slytherin: 'Tu casa actual es Slytherin: ambicion, astucia y mucha determinacion.',
    Ravenclaw: 'Tu casa actual es Ravenclaw: inteligencia, creatividad y curiosidad.',
    Hufflepuff: 'Tu casa actual es Hufflepuff: lealtad, paciencia y esfuerzo.'
  };

  const houseIcons = { Gryffindor: '🦁', Slytherin: '🐍', Ravenclaw: '🦅', Hufflepuff: '🦡' };
  const themeKey = 'hogwarts-theme';

  function initPopovers() {
    if (!window.bootstrap) return;
    document.querySelectorAll('[data-bs-toggle="popover"]').forEach((el) => {
      new bootstrap.Popover(el, { container: 'body' });
    });
  }

  function initCollapseScroll() {
    ['hechizos', 'criaturas', 'mapa'].forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('shown.bs.collapse', () => {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  function updateHeroHouse(name) {
    const heroHouseName = document.getElementById('heroHouseName');
    const heroHouseIcon = document.getElementById('heroHouseIcon');
    const heroHouseText = document.getElementById('heroHouseText');
    const houseReminder = document.querySelector('.house-reminder');
    const info = houseInfo[name];

    if (!heroHouseName || !heroHouseIcon || !heroHouseText || !houseReminder) return;

    heroHouseName.textContent = info ? `${houseIcons[name]} ${name}` : 'Aun no has elegido una casa';
    heroHouseIcon.textContent = '';
    heroHouseText.textContent = info ? info.text : 'Escoge una casa en la pagina de Casas.';
    houseReminder.className = 'house-reminder mt-3 d-inline-block panel p-3';
    if (info) houseReminder.classList.add(info.theme, 'house-reminder--active');
  }

  function initHeroHouse() {
    const storedHouse = localStorage.getItem('hogwarts-house');
    if (storedHouse && houseInfo[storedHouse]) updateHeroHouse(storedHouse);

    window.addEventListener('storage', (event) => {
      if (event.key === 'hogwarts-house') {
        updateHeroHouse(event.newValue);
      }
    });
  }

  function initHouseSelection() {
    const selectedHouseTitle = document.getElementById('selectedHouseTitle');
    const selectedHouseText = document.getElementById('selectedHouseText');
    const houseButtons = document.querySelectorAll('.house-select');
    if (!selectedHouseTitle || !selectedHouseText || !houseButtons.length) return;

    function setHouse(name) {
      localStorage.setItem('hogwarts-house', name);
      selectedHouseTitle.textContent = name;
      selectedHouseText.textContent = houseDescriptions[name];
      houseButtons.forEach((btn) => btn.classList.toggle('is-selected', btn.dataset.house === name));
      updateHeroHouse(name);
    }

    houseButtons.forEach((btn) => btn.addEventListener('click', () => setHouse(btn.dataset.house)));

    const storedHouse = localStorage.getItem('hogwarts-house');
    if (storedHouse && houseDescriptions[storedHouse]) setHouse(storedHouse);
  }

  function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle ? themeToggle.querySelector('.theme-fab-icon') : null;
    if (!themeToggle) return;

    function applyTheme(theme) {
      document.body.dataset.theme = theme;
      localStorage.setItem(themeKey, theme);
      const isDark = theme === 'dark';
      if (themeIcon) themeIcon.textContent = isDark ? '☾' : '☀';
      themeToggle.setAttribute('aria-label', isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
      themeToggle.setAttribute('aria-pressed', String(!isDark));
    }

    const storedTheme = localStorage.getItem(themeKey) || 'dark';
    applyTheme(storedTheme === 'light' ? 'light' : 'dark');

    themeToggle.addEventListener('click', () => {
      const nextTheme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
    });
  }

  function initCastleAlert() {
    const alertButton = document.getElementById('castleAlertBtn');
    if (!alertButton) return;

    alertButton.addEventListener('click', () => {
      window.alert('El castillo despierta: Hogwarts, las casas y la magia antigua siguen cambiando tu camino.');
    });
  }

  initPopovers();
  initCollapseScroll();
  initHeroHouse();
  initHouseSelection();
  initThemeToggle();
  initCastleAlert();
})();

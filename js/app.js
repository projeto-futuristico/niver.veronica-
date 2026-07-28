(() => {
  const slides = [...document.querySelectorAll('.slide')];
  const dots = [...document.querySelectorAll('.dot')];
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');
  const soundButton = document.querySelector('.sound');
  const startLayer = document.querySelector('.start');
  const startButton = document.querySelector('.start-button');
  const music = document.getElementById('music');
  const viewer = document.querySelector('.viewer');

  let current = 0;
  let touchStartX = 0;
  let touchStartY = 0;

  function showSlide(index) {
    current = (index + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      const active = i === current;
      slide.classList.toggle('active', active);
      slide.setAttribute('aria-hidden', String(!active));
      dots[i].classList.toggle('active', active);
    });

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }

  const next = () => showSlide(current + 1);
  const prev = () => showSlide(current - 1);

  nextButton.addEventListener('click', next);
  prevButton.addEventListener('click', prev);

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') next();
    if (event.key === 'ArrowLeft') prev();
  });

  viewer.addEventListener('touchstart', (event) => {
    const touch = event.changedTouches[0];
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
  }, { passive: true });

  viewer.addEventListener('touchend', (event) => {
    const touch = event.changedTouches[0];
    const distanceX = touch.clientX - touchStartX;
    const distanceY = touch.clientY - touchStartY;

    if (Math.abs(distanceX) < 50 || Math.abs(distanceX) <= Math.abs(distanceY)) {
      return;
    }

    distanceX < 0 ? next() : prev();
  }, { passive: true });

  startButton.addEventListener('click', async () => {
    startLayer.classList.add('hidden');

    try {
      await music.play();
      soundButton.textContent = '🔊';
    } catch {
      soundButton.textContent = '🔇';
    }
  });

  soundButton.addEventListener('click', async () => {
    if (music.paused) {
      try {
        await music.play();
        soundButton.textContent = '🔊';
      } catch {
        soundButton.textContent = '🔇';
      }
    } else {
      music.pause();
      soundButton.textContent = '🔇';
    }
  });

  showSlide(0);
})();

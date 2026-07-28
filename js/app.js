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
  let touchEndX = 0;

  function showSlide(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      const active = i === current;
      slide.classList.toggle('active', active);
      slide.setAttribute('aria-hidden', String(!active));
      dots[i].classList.toggle('active', active);
    });
  }

  function next() { showSlide(current + 1); }
  function prev() { showSlide(current - 1); }

  nextButton.addEventListener('click', next);
  prevButton.addEventListener('click', prev);
  dots.forEach((dot, index) => dot.addEventListener('click', () => showSlide(index)));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') next();
    if (event.key === 'ArrowLeft') prev();
  });

  viewer.addEventListener('touchstart', (event) => {
    touchStartX = event.changedTouches[0].clientX;
  }, { passive: true });

  viewer.addEventListener('touchend', (event) => {
    touchEndX = event.changedTouches[0].clientX;
    const distance = touchEndX - touchStartX;
    if (Math.abs(distance) < 50) return;
    distance < 0 ? next() : prev();
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

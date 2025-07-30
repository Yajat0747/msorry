document.addEventListener('DOMContentLoaded', function () {
  const timelineLink = document.getElementById('timeline-link');
  const apologyLink = document.getElementById('apology-link');
  const letterLink = document.getElementById('letter-link');
  const videoContainer = document.getElementById("video-container");
  const video = document.getElementById("myVideo");
  const playPauseBtn = document.getElementById("playPauseBtn");

  // Hide all sections on page load
  hideAllSections();

  timelineLink.addEventListener('click', showTimeline);
  apologyLink.addEventListener('click', showApology);
  letterLink.addEventListener('click', showLetter);

  function hideAllSections() {
    const sections = document.querySelectorAll('.section');
    sections.forEach(function (section) {
      section.style.display = 'none';
    });

    // Also hide video container
    videoContainer.style.display = 'none';
  }

  function showTimeline() {
    hideAllSections();
    document.getElementById('timeline-section').style.display = 'block';
  }

  function showApology() {
    hideAllSections();
    document.getElementById('apology-section').style.display = 'block';
  }

  function showLetter() {
    hideAllSections();
    document.getElementById('letter-section').style.display = 'block';
    setTimeout(createFallingHearts, 100);
  }

  function showVideo() {
    hideAllSections();
    videoContainer.style.display = "block";
    video.scrollIntoView({ behavior: "smooth" });
  }

  window.showVideo = showVideo; // Allow global access for inline onclick

  function togglePlayPause() {
    if (video.paused) {
      video.play();
      playPauseBtn.innerHTML = "Pause";
    } else {
      video.pause();
      playPauseBtn.innerHTML = "Play";
    }
  }

  window.togglePlayPause = togglePlayPause; // Make accessible from HTML

  // Accept button logic
  const acceptButton = document.getElementById('acceptButton');
  if (acceptButton) {
    acceptButton.addEventListener('click', fixHeart);
  }

  function fixHeart() {
    document.getElementById('broken-heart').style.display = 'none';
    document.getElementById('fixed-heart').style.display = 'block';
    createSmallHearts();
    acceptButton.disabled = true;
  }

  function createSmallHearts() {
    const container = document.getElementById('small-hearts-container');
    for (let i = 0; i < 20; i++) {
      const heart = document.createElement('div');
      heart.className = 'small-heart';
      container.appendChild(heart);
      animateSmallHeart(heart);
    }
  }

  function animateSmallHeart(heart) {
    const duration = Math.random() * 2 + 4;
    heart.style.animation = `rise ${duration}s linear`;
    heart.style.left = `${Math.random() * 100}vw`;
    setTimeout(() => heart.remove(), duration * 1000);
  }

  function createFallingHearts() {
    const heartContainer = document.getElementById('letter-section');
    heartContainer.style.position = 'relative';

    for (let i = 0; i < 20; i++) {
      const heart = document.createElement('div');
      heart.className = 'falling-heart';
      heart.style.left = Math.random() * window.innerWidth + 'px';
      heart.style.top = '0';
      heart.style.animationDuration = Math.random() * 2 + 3 + 's';
      heart.style.position = 'absolute';
      heartContainer.appendChild(heart);

      heart.addEventListener('animationend', function () {
        this.remove();
      });
    }
  }

  // Music toggle
  window.toggleAudio = function () {
    const backgroundMusic = document.getElementById('backgroundMusic');
    if (backgroundMusic.paused) {
      backgroundMusic.play();
    } else {
      backgroundMusic.pause();
    }
  }
});

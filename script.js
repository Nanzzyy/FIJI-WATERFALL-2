document.addEventListener("DOMContentLoaded", function() {
  // Animasi pop-up untuk .home-desc, .wrapper h2, #gallery-title
  const targets = document.querySelectorAll('.home-desc, .wrapper h2, #gallery-title, .wrapper');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('pop-up-animate');
      }
      window.addEventListener('scroll', () => {
  const nav = document.querySelector('.container-nav');
  const hero = document.querySelector('.hero');
  const heroBottom = hero.offsetTop + hero.offsetHeight;

  if (window.scrollY > heroBottom - 100) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

    });
  }, { threshold: 0.3 });

  targets.forEach(target => {
    observer.observe(target);
  });

  // Tab Foto/Video Gallery
  const fotoBtn = document.getElementById("foto-btn");
  const videoBtn = document.getElementById("video-btn");
  const fotoContent = document.getElementById("foto-content");
  const videoContent = document.getElementById("video-content");
  const showMoreBtn = document.getElementById("show-more-btn");
  const fotoItems = document.querySelectorAll("#gallery-foto .card");
  const videoItems = document.querySelectorAll("#gallery-video .card");
  const showCount = 4;

  let activeTab = "foto";
  let fotoShowingAll = false;
  let videoShowingAll = false;

  function showInitialFoto() {
  fotoItems.forEach((card, idx) => {
    card.classList.toggle("hidden-card", idx >= showCount);
  });
  document.getElementById("gallery-foto").classList.add("gallery-initial");
  document.getElementById("gallery-foto").classList.remove("show-all");
  fotoShowingAll = false;
  showMoreBtn.textContent = "Lihat Selengkapnya";
}


function showAllFoto() {
  fotoItems.forEach((card) => card.classList.remove("hidden-card"));
  document.getElementById("gallery-foto").classList.remove("gallery-initial");
  document.getElementById("gallery-foto").classList.add("show-all");
  fotoShowingAll = true;
  showMoreBtn.textContent = "Tutup";
}

function showInitialVideo() {
  videoItems.forEach((card, idx) => {
    card.classList.toggle("hidden-card", idx >= showCount);
  });
  document.getElementById("gallery-video").classList.add("gallery-initial");
  document.getElementById("gallery-video").classList.remove("show-all");
  videoShowingAll = false;
  showMoreBtn.textContent = "Lihat Selengkapnya";
}

function showAllVideo() {
  videoItems.forEach((card) => card.classList.remove("hidden-card"));
  document.getElementById("gallery-video").classList.remove("gallery-initial");
  document.getElementById("gallery-video").classList.add("show-all");
  videoShowingAll = true;
  showMoreBtn.textContent = "Tutup";
}

  fotoBtn.addEventListener("click", function () {
    fotoBtn.classList.add("active");
    videoBtn.classList.remove("active");
    fotoContent.style.display = "block";
    videoContent.style.display = "none";
    activeTab = "foto";
    fotoShowingAll ? showAllFoto() : showInitialFoto();
  });

  videoBtn.addEventListener("click", function () {
    videoBtn.classList.add("active");
    fotoBtn.classList.remove("active");
    fotoContent.style.display = "none";
    videoContent.style.display = "block";
    activeTab = "video";
    videoShowingAll ? showAllVideo() : showInitialVideo();
  });

  showMoreBtn.addEventListener("click", function () {
    if (activeTab === "foto") {
      fotoShowingAll ? showInitialFoto() : showAllFoto();
    } else {
      videoShowingAll ? showInitialVideo() : showAllVideo();
    }
  });
  // ...existing code...

// Autoplay video saat hover, pause saat mouse keluar
document.querySelectorAll('#gallery-video video').forEach(function(video) {
  video.addEventListener('mouseenter', function() {
    video.play();
  });
  video.addEventListener('mouseleave', function() {
    video.pause();
    video.currentTime = 0;
  });
});

  showInitialFoto();
  showInitialVideo();
  fotoContent.style.display = "block";
  videoContent.style.display = "none";
});
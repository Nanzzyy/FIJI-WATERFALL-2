document.addEventListener("DOMContentLoaded", function() {
  // Animasi pop-up untuk .home-desc, .wrapper h2, #gallery-title
  const targets = document.querySelectorAll('.home-desc, .wrapper h2, #gallery-title, .wrapper, .wrappper2');
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

  let activeTab = "foto";
  let fotoShowingAll = false;
  let videoShowingAll = false;

  // Fungsi untuk menentukan jumlah card awal
  function getShowCount() {
    if (window.innerWidth <= 449) { // Very small devices
      return 2;
    } else if (window.innerWidth <= 767) { // Small tablets and large phones
      return 3;
    } else if (window.innerWidth <= 1080) { // Tablets and small laptops
      return 4;
    } else { // Desktop
      return 3;
    }
  }

  function showInitialFoto() {
    const count = getShowCount();
    fotoItems.forEach((card, idx) => {
      card.classList.toggle("hidden-card", idx >= count);
    });

    // Atur grid layout berdasarkan ukuran layar
    const gallery = document.getElementById("gallery-foto");
    gallery.classList.add("gallery-initial");
    gallery.classList.remove("show-all");

    if (window.innerWidth <= 449) {
      gallery.style.gridTemplateColumns = "1fr";
    } else if (window.innerWidth <= 767) {
      gallery.style.gridTemplateColumns = "repeat(2, 1fr)";
    } else if (window.innerWidth <= 1080) {
      gallery.style.gridTemplateColumns = "repeat(2, 1fr)";
    } else {
      gallery.style.gridTemplateColumns = "repeat(auto-fill, minmax(300px, 1fr))";
    }

    fotoShowingAll = false;
    showMoreBtn.textContent = "Lihat Selengkapnya";
  }

  function showAllFoto() {
    fotoItems.forEach((card) => card.classList.remove("hidden-card"));
    const gallery = document.getElementById("gallery-foto");
    gallery.classList.remove("gallery-initial");
    gallery.classList.add("show-all");
    gallery.style.gridTemplateColumns = ""; // reset ke CSS default
    fotoShowingAll = true;
    showMoreBtn.textContent = "Tutup";
  }

  function showInitialVideo() {
    const count = getShowCount();
    videoItems.forEach((card, idx) => {
      card.classList.toggle("hidden-card", idx >= count);
    });

    // Atur grid layout berdasarkan ukuran layar
    const gallery = document.getElementById("gallery-video");
    gallery.classList.add("gallery-initial");
    gallery.classList.remove("show-all");

    if (window.innerWidth <= 449) {
      gallery.style.gridTemplateColumns = "1fr";
    } else if (window.innerWidth <= 767) {
      gallery.style.gridTemplateColumns = "repeat(2, 1fr)";
    } else if (window.innerWidth <= 1080) {
      gallery.style.gridTemplateColumns = "repeat(2, 1fr)";
    } else {
      gallery.style.gridTemplateColumns = "repeat(auto-fill, minmax(300px, 1fr))";
    }

    videoShowingAll = false;
    showMoreBtn.textContent = "Lihat Selengkapnya";
  }

  function showAllVideo() {
    videoItems.forEach((card) => card.classList.remove("hidden-card"));
    const gallery = document.getElementById("gallery-video");
    gallery.classList.remove("gallery-initial");
    gallery.classList.add("show-all");
    gallery.style.gridTemplateColumns = ""; // reset ke CSS default
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

  // Event listener untuk resize agar jumlah card awal dan grid layout menyesuaikan layar
  window.addEventListener('resize', function() {
    if (activeTab === "foto") {
      showInitialFoto();
    } else {
      showInitialVideo();
    }
  });

  // Inisialisasi tampilan awal
  showInitialFoto();
  showInitialVideo();
  fotoContent.style.display = "block";
  videoContent.style.display = "none";
});
document.addEventListener("DOMContentLoaded", function() {
  // Animasi pop-up untuk .home-desc, .wrapper h2, #gallery-title
  const targets = document.querySelectorAll('.home-desc, .wrapper h2, #gallery-title, .wrapper, .wrappper2');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('pop-up-animate');
      }
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
    if (window.innerWidth <= 449) {
      return 3;
    } else if (window.innerWidth <= 767) {
      return 3;
    } else if (window.innerWidth <= 1080) {
      return 4;
    } else {
      return 3;
    }
  }

  function showInitialFoto() {
    const count = getShowCount();
    fotoItems.forEach((card, idx) => {
      card.classList.toggle("hidden-card", idx >= count);
    });

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
    if (showMoreBtn) showMoreBtn.textContent = "Lihat Selengkapnya";
  }

  function showAllFoto() {
    fotoItems.forEach((card) => card.classList.remove("hidden-card"));
    const gallery = document.getElementById("gallery-foto");
    gallery.classList.remove("gallery-initial");
    gallery.classList.add("show-all");
    gallery.style.gridTemplateColumns = "";
    fotoShowingAll = true;
    if (showMoreBtn) showMoreBtn.textContent = "Tutup";
  }

  function showInitialVideo() {
    const count = getShowCount();
    videoItems.forEach((card, idx) => {
      card.classList.toggle("hidden-card", idx >= count);
    });

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
    if (showMoreBtn) showMoreBtn.textContent = "Lihat Selengkapnya";
  }

  function showAllVideo() {
    videoItems.forEach((card) => card.classList.remove("hidden-card"));
    const gallery = document.getElementById("gallery-video");
    gallery.classList.remove("gallery-initial");
    gallery.classList.add("show-all");
    gallery.style.gridTemplateColumns = "";
    videoShowingAll = true;
    if (showMoreBtn) showMoreBtn.textContent = "Tutup";
  }

  if (fotoBtn && videoBtn && fotoContent && videoContent) {
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
  }

  if (showMoreBtn) {
  showMoreBtn.addEventListener("click", function (e) {
    // Pastikan yang diklik benar-benar tombol, bukan bubbling dari card/foto/video
    if (e.target !== showMoreBtn) return;
    if (activeTab === "foto") {
      fotoShowingAll ? showInitialFoto() : showAllFoto();
    } else {
      videoShowingAll ? showInitialVideo() : showAllVideo();
    }
  });
}

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
  if (fotoContent) fotoContent.style.display = "block";
  if (videoContent) videoContent.style.display = "none";

  // Slideshow untuk .home-desc di mobile
  function startHomeDescSlideshow() {
    if (window.innerWidth > 768) {
      document.querySelectorAll('.home-desc .slideshow-img').forEach(img => {
        img.classList.add('active');
      });
      return;
    }
    const slides = document.querySelectorAll('.home-desc .slideshow-img');
    if (slides.length <= 1) return;
    let idx = 0;
    slides.forEach((img, i) => img.classList.toggle('active', i === idx));
    if (window.homeDescInterval) clearInterval(window.homeDescInterval);
    window.homeDescInterval = setInterval(() => {
      slides[idx].classList.remove('active');
      idx = (idx + 1) % slides.length;
      slides[idx].classList.add('active');
    }, 2500);
  }
  startHomeDescSlideshow();
  window.addEventListener('resize', startHomeDescSlideshow);

  // Scroll Spy: Highlight nav menu sesuai section yang sedang tampil
  function setActiveNav() {
    const sections = [
      { id: "home", nav: "Home" },
      { id: "about", nav: "About" },
      { id: "gallery-title", nav: "Gallery" },
      { id: "contact", nav: "Information & Contact" }
    ];
    let scrollPos = window.scrollY + 120; // offset nav height
    let active = "Home";
    for (let i = 0; i < sections.length; i++) {
      const el = document.getElementById(sections[i].id);
      if (el && el.offsetTop <= scrollPos) {
        active = sections[i].nav;
      }
    }
    document.querySelectorAll('.container-nav a').forEach(a => {
      if (a.textContent.trim() === active) {
        a.classList.add('active');
      } else {
        a.classList.remove('active');
      }
    });
  }
  window.addEventListener('scroll', setActiveNav);
  window.addEventListener('DOMContentLoaded', setActiveNav);

  // Smooth scroll untuk nav
  document.querySelectorAll('.container-nav a').forEach(a => {
    a.addEventListener('click', function(e) {
      const text = a.textContent.trim();
      let targetId = "";
      if (text === "Home") targetId = "home";
      else if (text === "About") targetId = "about";
      else if (text === "Gallery") targetId = "gallery-title";
      else if (text === "Information & Contact") targetId = "contact";
      if (targetId && document.getElementById(targetId)) {
        e.preventDefault();
        const target = document.getElementById(targetId);
        const offset = 120;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });
      }
    });
  });

  // Hamburger menu logic
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function() {
      navLinks.classList.toggle('show');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navLinks.classList.remove('show');
        }
      });
    });
  }

  // Smooth scroll untuk tombol input type button
  const jelajahBtn = document.querySelector('input[type="button"][value="Jelajahi Sekarang"]');
  if (jelajahBtn) {
    jelajahBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.getElementById('about');
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }
});
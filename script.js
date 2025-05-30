document.addEventListener("DOMContentLoaded", function () {
  // Animasi pop-up untuk .home-desc, .wrapper h2, #gallery-title
  const targets = document.querySelectorAll(
    ".home-desc, .wrapper h2, #gallery-title, .wrapper, .wrappper2 gallery"
  );
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("pop-up-animate");
        }
      });
    },
    { threshold: 0.3 }
  );

  targets.forEach((target) => {
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
      gallery.style.gridTemplateColumns =
        "repeat(auto-fill, minmax(300px, 1fr))";
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

    // Tambahkan event listener untuk card
    fotoItems.forEach((card) => {
      card.addEventListener("click", function (e) {
        e.stopPropagation(); // Mencegah event bubbling
      });
    });
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
      gallery.style.gridTemplateColumns =
        "repeat(auto-fill, minmax(300px, 1fr))";
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

    // Tambahkan event listener untuk card
    videoItems.forEach((card) => {
      card.addEventListener("click", function (e) {
        e.stopPropagation(); // Mencegah event bubbling
      });
    });
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

  // FIX: Tombol show more/tutup hanya aktif jika klik langsung pada tombol
  // Ganti bagian kode yang menangani showMoreBtn dengan ini:
  if (showMoreBtn) {
    showMoreBtn.addEventListener("click", function (e) {
      // Hanya respon jika tombol itu sendiri yang diklik
      if (e.target !== this) return;

      if (activeTab === "foto") {
        fotoShowingAll = !fotoShowingAll;
        if (fotoShowingAll) {
          showAllFoto();
        } else {
          showInitialFoto();
        }
      } else {
        videoShowingAll = !videoShowingAll;
        if (videoShowingAll) {
          showAllVideo();
        } else {
          showInitialVideo();
        }
      }
    });

    // Tambahkan event listener untuk mencegah closing saat scroll
    let isScrolling;
    window.addEventListener(
      "scroll",
      function () {
        // Clear timeout saat scroll terjadi
        clearTimeout(isScrolling);

        // Set timeout untuk menunggu scroll selesai
        isScrolling = setTimeout(function () {
          // Cek posisi scroll untuk memastikan tidak menutup galeri
          if (activeTab === "foto" && fotoShowingAll) {
            // Tetap buka galeri foto
          } else if (activeTab === "video" && videoShowingAll) {
            // Tetap buka galeri video
          }
        }, 100);
      },
      false
    );
  }

  // Autoplay video saat hover, pause saat mouse keluar
  document.querySelectorAll("#gallery-video video").forEach(function (video) {
    video.addEventListener("mouseenter", function () {
      video.play();
    });
    video.addEventListener("mouseleave", function () {
      video.pause();
      video.currentTime = 0;
    });
  });

  // Event listener untuk resize agar jumlah card awal dan grid layout menyesuaikan layar
  window.addEventListener("resize", function () {
    if (activeTab === "foto") {
      if (!fotoShowingAll) showInitialFoto();
    } else {
      if (!videoShowingAll) showInitialVideo();
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
      document.querySelectorAll(".home-desc .slideshow-img").forEach((img) => {
        img.classList.add("active");
      });
      return;
    }
    const slides = document.querySelectorAll(".home-desc .slideshow-img");
    if (slides.length <= 1) return;
    let idx = 0;
    slides.forEach((img, i) => img.classList.toggle("active", i === idx));
    if (window.homeDescInterval) clearInterval(window.homeDescInterval);
    window.homeDescInterval = setInterval(() => {
      slides[idx].classList.remove("active");
      idx = (idx + 1) % slides.length;
      slides[idx].classList.add("active");
    }, 2500);
  }
  startHomeDescSlideshow();
  window.addEventListener("resize", startHomeDescSlideshow);

  // Scroll Spy: Highlight nav menu sesuai section yang sedang tampil
  function setActiveNav() {
    const sections = [
      { id: "home", nav: "Home" },
      { id: "about", nav: "About" },
      { id: "gallery", nav: "Gallery" }, // Pastikan ID sesuai dengan HTML
      { id: "contact", nav: "Information & Contact" },
    ];

    let scrollPos = window.scrollY + 100; // offset navbar
    let active = "Home";

    for (let i = 0; i < sections.length; i++) {
      const el = document.getElementById(sections[i].id);
      if (!el) continue;

      const elTop = el.offsetTop;
      const elHeight = el.offsetHeight;
      const elBottom = elTop + elHeight;

      // Perhitungan yang lebih akurat dengan threshold
      if (scrollPos >= elTop - 150 && scrollPos <= elBottom - 100) {
        active = sections[i].nav;
        break;
      }
    }

    document.querySelectorAll(".container-nav a").forEach((a) => {
      a.classList.toggle("active", a.textContent.trim() === active);
    });
  }
  window.addEventListener("scroll", setActiveNav);
  window.addEventListener("DOMContentLoaded", setActiveNav);

  // Smooth scroll untuk nav
  document.querySelectorAll(".container-nav a").forEach((a) => {
    a.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href").substring(1);
      if (targetId && document.getElementById(targetId)) {
        e.preventDefault();
        const target = document.getElementById(targetId);
        const offset = 100; // Sesuaikan dengan tinggi navbar
        const targetPosition =
          target.getBoundingClientRect().top + window.pageYOffset - offset;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Hamburger menu logic
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      navLinks.classList.toggle("show");
    });
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 768) {
          navLinks.classList.remove("show");
        }
      });
    });
  }

  // Smooth scroll untuk tombol input type button
  const jelajahBtn = document.querySelector(
    'input[type="button"][value="Jelajahi Sekarang"]'
  );
  if (jelajahBtn) {
    jelajahBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.getElementById("about");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }
});

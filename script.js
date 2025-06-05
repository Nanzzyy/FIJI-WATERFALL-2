document.addEventListener("DOMContentLoaded", function () {
  // Mobile Navigation - Perbaikan dengan overlay
  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  const navItems = document.querySelectorAll(".nav-link");
  // Overlay untuk mobile menu
  let menuOverlay = document.querySelector(".menu-overlay");
  if (!menuOverlay) {
    menuOverlay = document.createElement("div");
    menuOverlay.classList.add("menu-overlay");
    document.body.appendChild(menuOverlay);
  }

  navToggle.addEventListener("click", function () {
    this.classList.toggle("active");
    navLinks.classList.toggle("active");
    menuOverlay.classList.toggle("active");
    document.body.style.overflow = navLinks.classList.contains("active")
      ? "hidden"
      : "auto";
  });

  menuOverlay.addEventListener("click", function () {
    navToggle.classList.remove("active");
    navLinks.classList.remove("active");
    this.classList.remove("active");
    document.body.style.overflow = "auto";
  });

  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      navToggle.classList.remove("active");
      navLinks.classList.remove("active");
      menuOverlay.classList.remove("active");
      document.body.style.overflow = "auto";
    });
  });

  // Sticky Header
  const header = document.querySelector(".header");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Smooth Scrolling for Navigation
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Navbar Active State on Scroll
  const sections = document.querySelectorAll("section");
  function updateActiveNav() {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 120) {
        current = section.getAttribute("id");
      }
    });
    navItems.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }
  window.addEventListener("load", updateActiveNav);
  window.addEventListener("scroll", updateActiveNav);

  // About Image Slider
  const aboutImages = document.querySelectorAll(".image-slider img");
  let currentImageIndex = 0;
  function showNextImage() {
    aboutImages[currentImageIndex].classList.remove("active");
    currentImageIndex = (currentImageIndex + 1) % aboutImages.length;
    aboutImages[currentImageIndex].classList.add("active");
  }
  if (aboutImages.length > 1) {
    setInterval(showNextImage, 3000);
  }

  // Gallery Tabs
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");
  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const tabId = this.getAttribute("data-tab");
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));
      this.classList.add("active");
      document.getElementById(tabId).classList.add("active");
    });
  });

  // Image Gallery Modal
  const galleryItems = document.querySelectorAll(
    ".gallery-item:not(.video-item)"
  );
  const imageModal = document.getElementById("image-modal");
  const modalImage = document.getElementById("modal-image");
  galleryItems.forEach((item) => {
    item.addEventListener("click", function () {
      const imgSrc = this.querySelector("img").getAttribute("src");
      modalImage.setAttribute("src", imgSrc);
      imageModal.style.display = "block";
      document.body.style.overflow = "hidden";
    });
  });

  // Video Gallery Modal
  const videoItems = document.querySelectorAll(".video-item");
  const videoModal = document.getElementById("video-modal");
  const modalVideo = document.getElementById("modal-video");
  videoItems.forEach((item) => {
    item.addEventListener("click", function () {
      // Cari source video
      let videoSrc = "";
      const videoTag = this.querySelector("video");
      if (videoTag) {
        const sourceTag = videoTag.querySelector("source");
        if (sourceTag) {
          videoSrc = sourceTag.getAttribute("src");
        } else {
          videoSrc = videoTag.getAttribute("src");
        }
      }
      modalVideo.setAttribute("src", videoSrc);
      videoModal.style.display = "block";
      modalVideo.play();
      document.body.style.overflow = "hidden";
    });
  });

  // Close Modals
  const closeButtons = document.querySelectorAll(".close-modal");
  closeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const modal = this.closest(".modal");
      modal.style.display = "none";
      document.body.style.overflow = "auto";
      if (modal === videoModal) {
        modalVideo.pause();
        modalVideo.currentTime = 0;
      }
    });
  });

  // Close modal when clicking outside content
  window.addEventListener("click", function (e) {
    if (e.target === imageModal) {
      imageModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
    if (e.target === videoModal) {
      videoModal.style.display = "none";
      modalVideo.pause();
      modalVideo.currentTime = 0;
      document.body.style.overflow = "auto";
    }
  });

  // Testimonial Slider
  const testimonialCards = document.querySelectorAll(".testimonial-card");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  let currentTestimonial = 0;
  function showTestimonial(index) {
    testimonialCards.forEach((card) => card.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));
    testimonialCards[index].classList.add("active");
    dots[index].classList.add("active");
    currentTestimonial = index;
  }
  function nextTestimonial() {
    let nextIndex = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(nextIndex);
  }
  function prevTestimonial() {
    let prevIndex =
      (currentTestimonial - 1 + testimonialCards.length) %
      testimonialCards.length;
    showTestimonial(prevIndex);
  }
  nextBtn.addEventListener("click", nextTestimonial);
  prevBtn.addEventListener("click", prevTestimonial);
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => showTestimonial(index));
  });
  if (testimonialCards.length > 1) {
    setInterval(nextTestimonial, 5000);
  }

  // Load More Button for Gallery - Perbaikan untuk menangani foto dan video
const loadMoreBtn = document.getElementById("load-more");
const galleryTabs = document.querySelectorAll(".tab-btn");
let currentTab = "foto"; // Default tab

// Update current tab ketika tab diubah
galleryTabs.forEach(tab => {
    tab.addEventListener("click", function() {
        currentTab = this.getAttribute("data-tab");
    });
});

// Fungsi untuk memuat lebih banyak item
function loadMoreItems() {
    const currentTabContent = document.querySelector(`.tab-content.active`);
    const hiddenItems = currentTabContent.querySelectorAll(".gallery-item[style='display: none;']");
    
    // Tampilkan item berikutnya (maksimal itemsPerLoad)
    let itemsToShow = Math.min(3, hiddenItems.length);
    for (let i = 0; i < itemsToShow; i++) {
        hiddenItems[i].style.display = "block";
        hiddenItems[i].style.opacity = "0";
        hiddenItems[i].style.transform = "translateY(20px)";
        
        setTimeout(() => {
            hiddenItems[i].style.opacity = "1";
            hiddenItems[i].style.transform = "translateY(0)";
            hiddenItems[i].style.transition = "opacity 0.3s ease, transform 0.3s ease";
        }, 50);
    }
    
    // Sembunyikan tombol jika tidak ada item tersembunyi lagi
    const remainingHidden = currentTabContent.querySelectorAll(".gallery-item[style='display: none;']");
    if (remainingHidden.length === 0) {
        loadMoreBtn.style.display = "none";
    }
}

// Fungsi untuk menyembunyikan item ekstra
function hideExtraItems() {
    const tabContents = document.querySelectorAll(".tab-content");
    
    tabContents.forEach(tab => {
        const allItems = tab.querySelectorAll(".gallery-item");
        const initialVisible = 6; // Item yang terlihat awal
        
        allItems.forEach((item, index) => {
            if (index >= initialVisible) {
                item.style.display = "none";
            } else {
                item.style.display = "block";
            }
        });
    });
    
    // Periksa apakah perlu menampilkan tombol load more
    const activeTab = document.querySelector(".tab-content.active");
    const hiddenItems = activeTab.querySelectorAll(".gallery-item[style='display: none;']");
    
    if (hiddenItems.length > 0) {
        loadMoreBtn.style.display = "block";
    } else {
        loadMoreBtn.style.display = "none";
    }
}

if (loadMoreBtn) {
    hideExtraItems();
    loadMoreBtn.addEventListener("click", loadMoreItems);
}

// Auto-play videos on hover - Perbaikan
const videoItemsAll = document.querySelectorAll(".video-item video");
videoItemsAll.forEach((video) => {
    // Set atribut boolean dengan cara yang benar
    video.muted = true;
    video.playsInline = true;
    video.loop = true;
    // Pastikan tidak ada controls
    video.removeAttribute("controls");

    // Hover event pada parent .video-item
    const videoItem = video.closest(".video-item");
    videoItem.addEventListener("mouseenter", function() {
        video.play().catch(() => {});
    });
    videoItem.addEventListener("mouseleave", function() {
        video.pause();
        video.currentTime = 0;
    });
});
});

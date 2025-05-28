document.addEventListener("DOMContentLoaded", function() {
  // Animasi pop-up untuk .home-desc
  const targets = document.querySelectorAll('.home-desc');
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

  // Gallery show more/less logic
  const cards = document.querySelectorAll('.gallery .card');
  const showCount = 3; // Ganti sesuai kebutuhan (misal 6)
  const showMoreBtn = document.getElementById('show-more-btn');
  const gallery = document.querySelector('.gallery');
  const galleryTitle = document.getElementById('gallery-title');

  function showInitialCards() {
    cards.forEach((card, idx) => {
      if (idx >= showCount) {
        card.classList.add('hidden-card');
      } else {
        card.classList.remove('hidden-card');
      }
    });
    showMoreBtn.textContent = "Lihat Selengkapnya";
    gallery.classList.remove('show-all');
    gallery.classList.add('gallery-initial');
    // Hapus scroll di sini
  }

  function showAllCards() {
    cards.forEach(card => card.classList.remove('hidden-card'));
    showMoreBtn.textContent = "Tutup";
    gallery.classList.add('show-all');
    gallery.classList.remove('gallery-initial');
    // Hapus scroll di sini
  }

  // Inisialisasi tampilan awal
  showInitialCards();

  // Toggle show/hide all cards
  let showingAll = false;
  let scrollYBeforeExpand = 0;

showMoreBtn.addEventListener('click', function () {
  if (!showingAll) {
    // Simpan posisi scroll sekarang
    scrollYBeforeExpand = window.scrollY;

    showAllCards();

    // Scroll langsung ke posisi sebelumnya TANPA animasi
    window.scrollTo(0, scrollYBeforeExpand);
  } else {
    showInitialCards();

    // Scroll ke atas galeri dengan animasi (opsional)
    galleryTitle.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  showingAll = !showingAll;
});



});

document.querySelector('.close-button').addEventListener('click', () => {
  document.querySelector('.gallery').scrollIntoView({ behavior: 'smooth' });
});

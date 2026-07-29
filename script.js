// ==========================
// DATA VIDEO
// ==========================



// ==========================
// SIDEBAR
// ==========================

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

if (menuBtn && sidebar && overlay) {
  menuBtn.onclick = () => {
    sidebar.classList.add("active");
    overlay.classList.add("active");
  };

  overlay.onclick = () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  };
}

// ==========================
// PENGATURAN
// ==========================

const page = document.body.dataset.page || "home";
const videoContainer = document.getElementById("videoContainer");
const searchInput = document.getElementById("searchInput");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("pageInfo");

const perPage = 8;
let currentPage = 1;

let currentVideos = videos[page] || [];

// ==========================
// RENDER VIDEO
// ==========================

function renderVideos() {

  if (!videoContainer) return;

  videoContainer.innerHTML = "";

  const start = (currentPage - 1) * perPage;
  const end = start + perPage;

  const list = currentVideos.slice(start, end);

  list.forEach(video => {

    const card = document.createElement("div");

    card.className = "video-card";

    card.innerHTML = `
      <iframe
        src="${video.embed}"
        loading="lazy"
        allowfullscreen>
      </iframe>

      <div class="video-info">
        <div class="video-title">${video.title}</div>
      </div>
    `;

    videoContainer.appendChild(card);

  });

  const totalPage = Math.max(1, Math.ceil(currentVideos.length / perPage));

  if (pageInfo) {
    pageInfo.textContent = `Halaman ${currentPage} / ${totalPage}`;
  }

  if (prevBtn) prevBtn.disabled = currentPage === 1;
  if (nextBtn) nextBtn.disabled = currentPage === totalPage;
}

renderVideos();

// ==========================
// SEARCH
// ==========================

if (searchInput) {

  searchInput.addEventListener("input", function () {

    const keyword = this.value.toLowerCase();

    currentVideos = (videos[page] || []).filter(video =>
      video.title.toLowerCase().includes(keyword)
    );

    currentPage = 1;

    renderVideos();

  });

}

// ==========================
// PAGINATION
// ==========================

if (prevBtn) {

  prevBtn.onclick = () => {

    if (currentPage > 1) {

      currentPage--;

      renderVideos();

    }

  };

}

if (nextBtn) {

  nextBtn.onclick = () => {

    const totalPage = Math.ceil(currentVideos.length / perPage);

    if (currentPage < totalPage) {

      currentPage++;

      renderVideos();

    }

  };

}

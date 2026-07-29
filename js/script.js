// ===============================
// Sidebar Menu
// ===============================
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

if (menuBtn && sidebar && overlay) {
    menuBtn.addEventListener("click", () => {
        sidebar.classList.toggle("active");
        overlay.classList.toggle("active");
    });

    overlay.addEventListener("click", () => {
        sidebar.classList.remove("active");
        overlay.classList.remove("active");
    });
}

// ===============================
// Menampilkan Video Sesuai Halaman
// ===============================

// Pastikan data videos tersedia
if (typeof videos === "undefined") {
    console.error("Data videos tidak ditemukan! Pastikan videos.js dimuat lebih dulu.");
} else {

    // Ambil nama halaman
    const page = document.body.dataset.page || "home";

    console.log("Page:", page);

    // Ambil daftar video
    const videoList = videos[page] || [];

    console.log("Jumlah Video:", videoList.length);

    // Container video
    const container = document.getElementById("videoContainer");

    // Render Video
    function renderVideos(list) {

        if (!container) {
            console.error("Element #videoContainer tidak ditemukan.");
            return;
        }

        container.innerHTML = "";

        // Jika tidak ada video
        if (list.length === 0) {
            container.innerHTML = `
                <div style="text-align:center;padding:30px;color:#999;">
                    Tidak ada video pada halaman ini.
                </div>
            `;
            return;
        }

        // Tampilkan video
        list.forEach(video => {

            const card = document.createElement("div");
            card.className = "video-card";

            card.innerHTML = `
                <h3>${video.title}</h3>

                <iframe
                    src="${video.embed}"
                    width="100%"
                    height="220"
                    frameborder="0"
                    allowfullscreen
                    loading="lazy">
                </iframe>
            `;

            container.appendChild(card);

        });

    }

    // Tampilkan pertama kali
    renderVideos(videoList);

    // ===============================
    // Search
    // ===============================
    const searchInput = document.getElementById("searchInput");

    if (searchInput) {

        searchInput.addEventListener("input", function () {

            const keyword = this.value.trim().toLowerCase();

            if (keyword === "") {
                renderVideos(videoList);
                return;
            }

            const hasil = videoList.filter(video =>
                video.title.toLowerCase().includes(keyword)
            );

            renderVideos(hasil);

        });

    }

}

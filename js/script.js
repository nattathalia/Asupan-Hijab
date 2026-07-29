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
const page = document.body.dataset.page || "home";

alert(Object.keys(videos));
alert("Page = " + page);
alert("Data = " + JSON.stringify(videos[page]));

let videoList = videos[page] || [];

const container = document.getElementById("videoContainer");

alert(container);

function renderVideos(list) {

    if (!container) return;

    container.innerHTML = "";

    list.forEach(video => {

        const card = document.createElement("div");
        card.className = "video-card";

        card.innerHTML = `
    <h3>${video.title}</h3>

    <iframe
        src="${video.embed}"
        width="100%"
        height="220"
        style="border:3px solid red;"
        allowfullscreen>
    </iframe>

    <p>${video.embed}</p>
`;

        container.appendChild(card);

    });

}
renderVideos(videoList);

// ===============================
// Search
// ===============================
const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("input", function () {

        const keyword = this.value.toLowerCase();

        const hasil = videoList.filter(video =>
            video.title.toLowerCase().includes(keyword)
        );

        renderVideos(hasil);

    });

}


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
// Konfigurasi
// ===============================
const page = document.body.dataset.page || "home";
const allVideos = videos[page] || [];

let filteredVideos = [...allVideos];

const itemsPerPage = 10;
let currentPage = 1;

// ===============================
// Element
// ===============================
const container = document.getElementById("videoContainer");
const searchInput = document.getElementById("searchInput");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("pageInfo");

// ===============================
// Render Video
// ===============================
function renderVideos() {

    if (!container) return;

    container.innerHTML = "";

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    const currentVideos = filteredVideos.slice(start, end);

    if (currentVideos.length === 0) {

        container.innerHTML = `
            <p style="text-align:center;padding:40px;">
                Tidak ada video ditemukan.
            </p>
        `;

        renderPagination();

        return;
    }

    currentVideos.forEach(video => {

        const card = document.createElement("div");

        card.className = "video-card";

        card.innerHTML = `
            <div class="video-title">
                ${video.title}
            </div>

            <div class="video-frame">
                <iframe
                    src="${video.embed}"
                    loading="lazy"
                    allowfullscreen>
                </iframe>
            </div>
        `;

        container.appendChild(card);

    });

    renderPagination();

}

// ===============================
// Pagination
// ===============================
function renderPagination() {

    const totalPages =
        Math.max(1, Math.ceil(filteredVideos.length / itemsPerPage));

    pageInfo.innerHTML = "";

    const prev = document.createElement("button");

    prev.innerHTML = "«";

    prev.disabled = currentPage === 1;

    prev.onclick = () => {

        if (currentPage > 1) {

            currentPage--;

            renderVideos();

            window.scrollTo({
                top:0,
                behavior:"smooth"
            });

        }

    };

    pageInfo.appendChild(prev);

    for(let i=1;i<=totalPages;i++){

        const btn=document.createElement("button");

        btn.textContent=i;

        if(i===currentPage){

            btn.classList.add("active");

        }

        btn.onclick=()=>{

            currentPage=i;

            renderVideos();

            window.scrollTo({

                top:0,

                behavior:"smooth"

            });

        };

        pageInfo.appendChild(btn);

    }

    const next=document.createElement("button");

    next.innerHTML="»";

    next.disabled=currentPage===totalPages;

    next.onclick=()=>{

        if(currentPage<totalPages){

            currentPage++;

            renderVideos();

            window.scrollTo({

                top:0,

                behavior:"smooth"

            });

        }

    };

    pageInfo.appendChild(next);

}

// ===============================
// Tombol Prev & Next
// ===============================
if(prevBtn){

    prevBtn.addEventListener("click",()=>{

        if(currentPage>1){

            currentPage--;

            renderVideos();

        }

    });

}

if(nextBtn){

    nextBtn.addEventListener("click",()=>{

        const totalPages=
        Math.ceil(filteredVideos.length/itemsPerPage);

        if(currentPage<totalPages){

            currentPage++;

            renderVideos();

        }

    });

}

// ===============================
// Search
// ===============================
if(searchInput){

    searchInput.addEventListener("input",function(){

        const keyword=this.value.toLowerCase().trim();

        filteredVideos=allVideos.filter(video=>

            video.title.toLowerCase().includes(keyword)

        );

        currentPage=1;

        renderVideos();

    });

}

// ===============================
// Start
// ===============================
renderVideos();

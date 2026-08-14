/* =========================================================
   DOM READY
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function(){

        /* =================================================
           SIDEBAR
        ================================================= */

        const menuBtn =
            document.getElementById("menuBtn");

        const sidebar =
            document.getElementById("sidebar");

        const overlay =
            document.getElementById("overlay");


        if(
            menuBtn &&
            sidebar &&
            overlay
        ){

            menuBtn.addEventListener(
                "click",
                function(){

                    sidebar.classList.toggle(
                        "active"
                    );

                    overlay.classList.toggle(
                        "active"
                    );

                }
            );


            overlay.addEventListener(
                "click",
                function(){

                    sidebar.classList.remove(
                        "active"
                    );

                    overlay.classList.remove(
                        "active"
                    );

                }
            );

        }


        /* =================================================
           KONFIGURASI HALAMAN
        ================================================= */

        const page =
            document.body.dataset.page ||
            "home";


        /* =================================================
           AMBIL DATA VIDEO
        ================================================= */

        let allVideos = [];


        /*
           FORMAT:

           const videos = {
               home: [...],
               hijab: [...],
               muda: [...],
               sekolah: [...],
               publik: [...],
               pronstar: [...]
           };
        */

        if(
            typeof videos !== "undefined" &&
            videos &&
            !Array.isArray(videos)
        ){

            if(
                Array.isArray(
                    videos[page]
                )
            ){

                allVideos =
                    videos[page];

            }

        }


        /*
           Jika videos langsung berupa array
        */

        else if(
            typeof videos !== "undefined" &&
            Array.isArray(videos)
        ){

            allVideos =
                videos;

        }


        /*
           Dukungan videoData
        */

        else if(
            typeof videoData !== "undefined" &&
            Array.isArray(videoData)
        ){

            allVideos =
                videoData;

        }


        /* =================================================
           DATA FILTER
        ================================================= */

        let filteredVideos =
            [...allVideos];


        /* =================================================
           PAGINATION
        ================================================= */

        const itemsPerPage = 10;

        let currentPage = 1;


        /* =================================================
           ELEMENT HTML
        ================================================= */

        const container =
            document.getElementById(
                "videoContainer"
            );


        const searchInput =
            document.getElementById(
                "searchInput"
            );


        const pageNumbers =
            document.getElementById(
                "pageNumbers"
            );


        const prevBtn =
            document.getElementById(
                "prevBtn"
            );


        const nextBtn =
            document.getElementById(
                "nextBtn"
            );


        /* =================================================
           TOTAL HALAMAN
        ================================================= */

        function getTotalPages(){

            if(
                filteredVideos.length === 0
            ){

                return 1;

            }


            return Math.ceil(
                filteredVideos.length /
                itemsPerPage
            );

        }


        /* =================================================
           SCROLL KE ATAS
        ================================================= */

        function scrollToTop(){

            window.scrollTo({

                top:0,

                behavior:"smooth"

            });

        }


        /* =================================================
           RENDER VIDEO
        ================================================= */

        function renderVideos(){

            if(!container){

                return;

            }


            container.innerHTML = "";


            const start =
                (currentPage - 1) *
                itemsPerPage;


            const end =
                start +
                itemsPerPage;


            const currentVideos =
                filteredVideos.slice(
                    start,
                    end
                );


            /* =============================================
               TIDAK ADA VIDEO
            ============================================= */

            if(
                currentVideos.length === 0
            ){

                container.innerHTML = `

                    <div
                        style="
                        width:100%;
                        text-align:center;
                        padding:40px 20px;
                        color:#666;
                        "
                    >

                        Tidak ada video ditemukan.

                    </div>

                `;


                renderPagination();

                return;

            }


            /* =============================================
               TAMPILKAN VIDEO
            ============================================= */

            currentVideos.forEach(
                function(video){

                    const card =
                        document.createElement(
                            "div"
                        );


                    card.className =
                        "video-card";


                    const title =
                        String(
                            video.title ||
                            "Video"
                        );


                    const embed =
                        String(
                            video.embed ||
                            ""
                        );


                    card.innerHTML = `

                        <div class="video-title">

                            ${title}

                        </div>


                        <div class="video-frame">

                            <iframe

                                src="${embed}"

                                loading="lazy"

                                allowfullscreen

                                title="${title}"

                            ></iframe>

                        </div>

                    `;
                   
card.addEventListener(
    "click",
    function(){

        if(!video.id){

            console.error(
                "Video tidak memiliki ID:",
                video
            );

            return;

        }

        window.location.href =
            "nonton.html?id=" +
            encodeURIComponent(video.id);

    }
);

                    container.appendChild(
                        card
                    );

                }
            );


            /* =============================================
               PAGINATION
            ============================================= */

            renderPagination();

        }


        /* =================================================
           RENDER NOMOR HALAMAN
        ================================================= */

        function renderPagination(){

            if(!pageNumbers){

                return;

            }


            pageNumbers.innerHTML = "";


            const totalPages =
                getTotalPages();


            /* =============================================
               NOMOR HALAMAN
            ============================================= */

            for(
                let i = 1;
                i <= totalPages;
                i++
            ){

                const button =
                    document.createElement(
                        "button"
                    );


                button.type =
                    "button";


                button.className =
                    "page-number";


                button.textContent =
                    i;


                if(
                    i === currentPage
                ){

                    button.classList.add(
                        "active"
                    );

                }


                button.addEventListener(
                    "click",
                    function(){

                        if(
                            i === currentPage
                        ){

                            return;

                        }


                        currentPage =
                            i;


                        renderVideos();


                        scrollToTop();

                    }
                );


                pageNumbers.appendChild(
                    button
                );

            }


            updatePaginationButtons(
                totalPages
            );

        }


        /* =================================================
           UPDATE PREV / NEXT
        ================================================= */

        function updatePaginationButtons(
            totalPages
        ){

            if(prevBtn){

                prevBtn.disabled =
                    currentPage <= 1;

            }


            if(nextBtn){

                nextBtn.disabled =
                    currentPage >=
                    totalPages;

            }

        }


        /* =================================================
           PREVIOUS
        ================================================= */

        if(prevBtn){

            prevBtn.addEventListener(
                "click",
                function(){

                    if(
                        currentPage <= 1
                    ){

                        return;

                    }


                    currentPage--;


                    renderVideos();


                    scrollToTop();

                }
            );

        }


        /* =================================================
           NEXT
        ================================================= */

        if(nextBtn){

            nextBtn.addEventListener(
                "click",
                function(){

                    const totalPages =
                        getTotalPages();


                    if(
                        currentPage >=
                        totalPages
                    ){

                        return;

                    }


                    currentPage++;


                    renderVideos();


                    scrollToTop();

                }
            );

        }


        /* =================================================
           SEARCH
        ================================================= */

        if(searchInput){

            searchInput.addEventListener(
                "input",
                function(){

                    const keyword =
                        this.value
                        .toLowerCase()
                        .trim();


                    filteredVideos =
                        allVideos.filter(
                            function(video){

                                const title =
                                    String(
                                        video.title ||
                                        ""
                                    )
                                    .toLowerCase();


                                return title.includes(
                                    keyword
                                );

                            }
                        );


                    currentPage = 1;


                    renderVideos();

                }
            );

        }


        /* =================================================
           SWIPE NOMOR PAGINATION
        ================================================= */

        if(pageNumbers){

            let isDown = false;

            let startX = 0;

            let scrollLeft = 0;


            /* =============================================
               MOUSE DOWN
            ============================================= */

            pageNumbers.addEventListener(
                "mousedown",
                function(e){

                    isDown = true;


                    pageNumbers.classList.add(
                        "dragging"
                    );


                    startX =
                        e.pageX -
                        pageNumbers.offsetLeft;


                    scrollLeft =
                        pageNumbers.scrollLeft;

                }
            );


            /* =============================================
               MOUSE LEAVE
            ============================================= */

            pageNumbers.addEventListener(
                "mouseleave",
                function(){

                    isDown = false;


                    pageNumbers.classList.remove(
                        "dragging"
                    );

                }
            );


            /* =============================================
               MOUSE UP
            ============================================= */

            pageNumbers.addEventListener(
                "mouseup",
                function(){

                    isDown = false;


                    pageNumbers.classList.remove(
                        "dragging"
                    );

                }
            );


            /* =============================================
               MOUSE MOVE
            ============================================= */

            pageNumbers.addEventListener(
                "mousemove",
                function(e){

                    if(!isDown){

                        return;

                    }


                    e.preventDefault();


                    const x =
                        e.pageX -
                        pageNumbers.offsetLeft;


                    const walk =
                        (x - startX) * 1.5;


                    pageNumbers.scrollLeft =
                        scrollLeft - walk;

                }
            );


            /* =============================================
               TOUCH START
            ============================================= */

            let touchStartX = 0;

            let touchStartScroll = 0;


            pageNumbers.addEventListener(
                "touchstart",
                function(e){

                    touchStartX =
                        e.touches[0].pageX;


                    touchStartScroll =
                        pageNumbers.scrollLeft;

                },
                {
                    passive:true
                }
            );


            /* =============================================
               TOUCH MOVE
            ============================================= */

            pageNumbers.addEventListener(
                "touchmove",
                function(e){

                    const touchX =
                        e.touches[0].pageX;


                    const distance =
                        touchStartX -
                        touchX;


                    pageNumbers.scrollLeft =
                        touchStartScroll +
                        distance;

                },
                {
                    passive:true
                }
            );

        }


        /* =================================================
           RENDER AWAL
        ================================================= */

        renderVideos();


        /* =================================================
           FOOTER OTOMATIS
        ================================================= */

        loadFooter();

    }
);


/* =========================================================
   FOOTER OTOMATIS
   SATU FOOTER SAJA
========================================================= */

function loadFooter(){

    /* =====================================================
       HAPUS FOOTER LAMA
    ===================================================== */

    document
        .querySelectorAll(
            "body > footer"
        )
        .forEach(
            function(footer){

                footer.remove();

            }
        );


    /* =====================================================
       HTML FOOTER
    ===================================================== */

    const footerHTML = `

        <footer class="footer">

            <div class="footer-inner">


                <!-- =====================================
                     LOGO
                ====================================== -->

                <a
                    href="index.html"
                    class="footer-logo"
                    aria-label="Asupan Hijab"
                >

                    <img
                        src="Asupan Hijab.png.jpg"
                        alt="Asupan Hijab"
                    >

                </a>


                <!-- =====================================
                     MENU
                ====================================== -->

                <nav
                    class="footer-links"
                    aria-label="Menu Footer"
                >


                    <a href="tentang.html">

                        <i
                            class="fa-solid fa-circle-info"
                            aria-hidden="true"
                        ></i>

                        <span>
                            Tentang Kami
                        </span>

                    </a>


                    <a href="kontak.html">

                        <i
                            class="fa-solid fa-envelope"
                            aria-hidden="true"
                        ></i>

                        <span>
                            Kontak
                        </span>

                    </a>


                    <a href="privasi.html">

                        <i
                            class="fa-solid fa-shield-halved"
                            aria-hidden="true"
                        ></i>

                        <span>
                            Kebijakan Privasi
                        </span>

                    </a>


                    <a href="syarat.html">

                        <i
                            class="fa-solid fa-file-contract"
                            aria-hidden="true"
                        ></i>

                        <span>
                            Syarat & Ketentuan
                        </span>

                    </a>


                </nav>


                <!-- =====================================
                     GARIS
                ====================================== -->

                <div
                    class="footer-divider"
                ></div>


                <!-- =====================================
                     COPYRIGHT
                ====================================== -->

                <div class="footer-copy">

                    © 2026 Asupan Hijab.
                    All Rights Reserved.

                </div>


            </div>

        </footer>

    `;


    /* =====================================================
       MASUKKAN FOOTER
    ===================================================== */

    document.body.insertAdjacentHTML(
        "beforeend",
        footerHTML
    );

}

/* =========================================================
   ASUPAN HIJAB - SCRIPT.JS
   SIDEBAR + SEARCH + VIDEO + PAGINATION
========================================================= */

document.addEventListener("DOMContentLoaded", function(){

    /* =====================================================
       SIDEBAR
    ===================================================== */

    const menuBtn =
        document.getElementById("menuBtn");

    const sidebar =
        document.getElementById("sidebar");

    const overlay =
        document.getElementById("overlay");


    if(menuBtn && sidebar && overlay){

        menuBtn.addEventListener("click", function(){

            sidebar.classList.toggle("active");

            overlay.classList.toggle("active");

        });


        overlay.addEventListener("click", function(){

            sidebar.classList.remove("active");

            overlay.classList.remove("active");

        });

    }


    /* =====================================================
       KONFIGURASI HALAMAN
    ===================================================== */

    const page =
        document.body.dataset.page || "home";


    /*
       Mendukung struktur data:

       const videos = {
           home: [...],
           sekolah: [...],
           muda: [...]
       };
    */

    let allVideos = [];


    if(
        typeof videos !== "undefined" &&
        videos &&
        !Array.isArray(videos)
    ){

        allVideos =
            Array.isArray(videos[page])
                ? videos[page]
                : [];

    }


    /*
       Jika data.js ternyata langsung berupa array,
       script tetap bisa bekerja.
    */

    else if(
        typeof videos !== "undefined" &&
        Array.isArray(videos)
    ){

        allVideos = videos;

    }


    /*
       Dukungan tambahan jika data menggunakan
       nama videoData.
    */

    else if(
        typeof videoData !== "undefined" &&
        Array.isArray(videoData)
    ){

        allVideos = videoData;

    }


    /* =====================================================
       DATA FILTER
    ===================================================== */

    let filteredVideos =
        [...allVideos];


    /* =====================================================
       PAGINATION
    ===================================================== */

    const itemsPerPage = 10;

    let currentPage = 1;


    /* =====================================================
       ELEMENT HTML
    ===================================================== */

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


    /* =====================================================
       TOTAL HALAMAN
    ===================================================== */

    function getTotalPages(){

        if(filteredVideos.length === 0){

            return 1;

        }


        return Math.ceil(
            filteredVideos.length /
            itemsPerPage
        );

    }


    /* =====================================================
       SCROLL KE ATAS
    ===================================================== */

    function scrollToTop(){

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    }


    /* =====================================================
       RENDER VIDEO
    ===================================================== */

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


        /* =================================================
           JIKA TIDAK ADA VIDEO
        ================================================= */

        if(currentVideos.length === 0){

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


        /* =================================================
           TAMPILKAN VIDEO
        ================================================= */

        currentVideos.forEach(
            function(video){

                const card =
                    document.createElement(
                        "div"
                    );


                card.className =
                    "video-card";


                /*
                   Menghindari error jika
                   title/embed kosong.
                */

                const title =
                    video.title || "Video";


                const embed =
                    video.embed || "";


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


                container.appendChild(
                    card
                );

            }
        );


        /* =================================================
           UPDATE PAGINATION
        ================================================= */

        renderPagination();

    }


    /* =====================================================
       MEMBUAT NOMOR HALAMAN
    ===================================================== */

    function renderPagination(){

        if(!pageNumbers){

            return;

        }


        pageNumbers.innerHTML = "";


        const totalPages =
            getTotalPages();


        /* =================================================
           TOMBOL NOMOR HALAMAN
        ================================================= */

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


            /*
               Halaman aktif
            */

            if(i === currentPage){

                button.classList.add(
                    "active"
                );

            }


            /*
               Klik nomor halaman
            */

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


        /* =================================================
           UPDATE TOMBOL PREV / NEXT
        ================================================= */

        updatePaginationButtons(
            totalPages
        );

    }


    /* =====================================================
       UPDATE TOMBOL SEBELUMNYA / BERIKUTNYA
    ===================================================== */

    function updatePaginationButtons(
        totalPages
    ){

        if(prevBtn){

            prevBtn.disabled =
                currentPage <= 1;

        }


        if(nextBtn){

            nextBtn.disabled =
                currentPage >= totalPages;

        }

    }


    /* =====================================================
       TOMBOL SEBELUMNYA
    ===================================================== */

    if(prevBtn){

        prevBtn.addEventListener(
            "click",
            function(){

                if(currentPage <= 1){

                    return;

                }


                currentPage--;


                renderVideos();


                scrollToTop();

            }
        );

    }


    /* =====================================================
       TOMBOL BERIKUTNYA
    ===================================================== */

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


    /* =====================================================
       SEARCH VIDEO
    ===================================================== */

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
                                    video.title || ""
                                )
                                .toLowerCase();


                            return title.includes(
                                keyword
                            );

                        }
                    );


                /*
                   Setelah melakukan pencarian,
                   kembali ke halaman 1.
                */

                currentPage = 1;


                renderVideos();

            }
        );

    }


    /* =====================================================
       SWIPE / GESER NOMOR PAGINATION
       UNTUK HP
    ===================================================== */

    if(pageNumbers){

        let isDown = false;

        let startX = 0;

        let scrollLeft = 0;


        /*
           Mouse
        */

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


        pageNumbers.addEventListener(
            "mouseleave",
            function(){

                isDown = false;

                pageNumbers.classList.remove(
                    "dragging"
                );

            }
        );


        pageNumbers.addEventListener(
            "mouseup",
            function(){

                isDown = false;

                pageNumbers.classList.remove(
                    "dragging"
                );

            }
        );


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


        /*
           Touch / HP
        */

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


    /* =====================================================
       MULAI WEBSITE
    ===================================================== */

    renderVideos();


});

/* ======================================================
   FOOTER OTOMATIS SEMUA HALAMAN
   index.html
   muda.html
   hijab.html
   sekolah.html
   publik.html
   pronstar.html
====================================================== */

function loadFooter(){

    /* ==============================================
       CEGAH FOOTER GANDA
    ============================================== */

    const oldFooter =
        document.querySelector(".footer");

    if(oldFooter){
        oldFooter.remove();
    }


    /* ==============================================
       FOOTER HTML
    ============================================== */

    const footerHTML = `

        <footer class="footer">

            <div class="footer-inner">


                <!-- ==============================
                     LOGO
                ============================== -->

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


                <!-- ==============================
                     MENU FOOTER
                ============================== -->

                <nav class="footer-links">

                    <a href="tentang.html">

                        <i class="fa-solid fa-circle-info"></i>

                        <span>
                            Tentang Kami
                        </span>

                    </a>


                    <a href="kontak.html">

                        <i class="fa-solid fa-envelope"></i>

                        <span>
                            Kontak
                        </span>

                    </a>


                    <a href="privasi.html">

                        <i class="fa-solid fa-shield-halved"></i>

                        <span>
                            Kebijakan Privasi
                        </span>

                    </a>


                    <a href="syarat.html">

                        <i class="fa-solid fa-file-contract"></i>

                        <span>
                            Syarat & Ketentuan
                        </span>

                    </a>

                </nav>


                <!-- ==============================
                     GARIS
                ============================== -->

                <div class="footer-divider"></div>


                <!-- ==============================
                     COPYRIGHT
                ============================== -->

                <div class="footer-copy">

                    © 2026 Asupan Hijab.
                    All Rights Reserved.

                </div>

            </div>

        </footer>

    `;


    /* ==============================================
       MASUKKAN FOOTER KE PALING BAWAH BODY
    ============================================== */

    document.body.insertAdjacentHTML(
        "beforeend",
        footerHTML
    );

}


/* ======================================================
   JALANKAN FOOTER OTOMATIS
====================================================== */

if(
    document.readyState === "loading"
){

    document.addEventListener(
        "DOMContentLoaded",
        loadFooter
    );

}else{

    loadFooter();

}

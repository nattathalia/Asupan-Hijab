/* ======================================================
   DATA MODEL
====================================================== */

const models = [

    {
        id: 1,

        name: "Lil Black",

        photo:
            "https://asupanhijab.xyz/Luna-Okko.jpg",

        categories: [
            "asia"
        ],

        birth:
            "12 Januari 1998",

        country:
            "Indonesia",

        profession:
            "Model",

        active:
            "2018 - sekarang",

        description:
            "Model dengan pengalaman di bidang fashion dan fotografi."
    },


    {
        id: 2,

        name: "Model Asia 2",

        photo:
            "https://asupanhijab.xyz/model-2.jpg",

        categories: [
            "asia",
            "jepang"
        ],

        birth:
            "20 Maret 1997",

        country:
            "Jepang",

        profession:
            "Model",

        active:
            "2019 - sekarang",

        description:
            "Model yang aktif dalam bidang fashion dan pemotretan."
    },


    {
        id: 3,

        name: "Model Korea 1",

        photo:
            "https://asupanhijab.xyz/model-3.jpg",

        categories: [
            "asia",
            "korea"
        ],

        birth:
            "5 Mei 1999",

        country:
            "Korea Selatan",

        profession:
            "Model",

        active:
            "2020 - sekarang",

        description:
            "Model fashion dan kreator konten."
    },


    {
        id: 4,

        name: "Model Hijab 1",

        photo:
            "https://asupanhijab.xyz/may%20thai.jpg",

        categories: [
            "asia",
            "hijab"
        ],

        birth:
            "10 Oktober 1998",

        country:
            "Indonesia",

        profession:
            "Model Fashion",

        active:
            "2019 - sekarang",

        description:
            "Model yang aktif dalam dunia fashion dan modest wear."
    }

];

/* ======================================================
   KATEGORI
====================================================== */

const categories = [
    {
        id: "semua",
        name: "Semua"
    },

    {
        id: "asia",
        name: "Asia"
    },

    {
        id: "jepang",
        name: "Jepang"
    },

    {
        id: "korea",
        name: "Korea"
    },

    {
        id: "thailand",
        name: "Thailand"
    },

    {
        id: "vietnam",
        name: "Vietnam"
    },

    {
        id: "lebanon",
        name: "Lebanon"
    }

];

/* ======================================================
   KATEGORI AKTIF
====================================================== */

let activeCategory = "semua";


/* ======================================================
   ELEMENT HTML
====================================================== */

const container =
    document.getElementById(
        "modelContainer"
    );


const categoryContainer =
    document.getElementById(
        "categoryButtons"
    );


const searchInput =
    document.getElementById(
        "searchInput"
    );


const resultTitle =
    document.getElementById(
        "resultTitle"
    );


const emptyMessage =
    document.getElementById(
        "emptyMessage"
    );


/* ======================================================
   CEK ELEMENT
====================================================== */

function checkElements(){

    if(!container){

        console.warn(
            "Element #modelContainer tidak ditemukan."
        );

    }


    if(!categoryContainer){

        console.warn(
            "Element #categoryButtons tidak ditemukan."
        );

    }


    if(!searchInput){

        console.warn(
            "Element #searchInput tidak ditemukan."
        );

    }

}


/* ======================================================
   ESCAPE HTML
====================================================== */

function escapeHTML(value){

    if(
        value === null ||
        value === undefined
    ){

        return "";

    }


    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


/* ======================================================
   RENDER KATEGORI
====================================================== */

function renderCategories(){

    if(!categoryContainer){

        return;

    }


    categoryContainer.innerHTML = "";


    categories.forEach(
        function(category){

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.className =
                "region-btn";


            button.textContent =
                category.name;


            button.dataset.category =
                category.id;


            /* ------------------------------------------
               KATEGORI AKTIF
            ------------------------------------------ */

            if(
                category.id ===
                activeCategory
            ){

                button.classList.add(
                    "active"
                );

            }


            /* ------------------------------------------
               EVENT KLIK
            ------------------------------------------ */

            button.addEventListener(
                "click",
                function(){

                    activeCategory =
                        category.id;


                    renderCategories();

                    renderModels();

                }
            );


            categoryContainer.appendChild(
                button
            );

        }
    );

}


/* ======================================================
   BUAT CARD MODEL
====================================================== */

function createModelCard(
    model,
    number
){

    const card =
        document.createElement(
            "article"
        );


    card.className =
        "model-card";


    card.dataset.id =
        model.id;


    card.innerHTML = `

        <div class="model-title">

            #${number}
            ${escapeHTML(model.name)}

        </div>


        <div class="model-photo">

            <img
                src="${escapeHTML(model.photo)}"
                alt="${escapeHTML(model.name)}"
                loading="lazy"
                onerror="
                    this.style.display='none';
                "
            >

        </div>


        <div class="model-info">

            <h3>
                Profil dan Biodata
            </h3>


            <p>

                <b>Lahir:</b>

                ${escapeHTML(
                    model.birth
                )}

            </p>


            <p>

                <b>Kebangsaan:</b>

                ${escapeHTML(
                    model.country
                )}

            </p>


            <p>

                <b>Profesi:</b>

                ${escapeHTML(
                    model.profession
                )}

            </p>


            <p>

                <b>Tahun Aktif:</b>

                ${escapeHTML(
                    model.active
                )}

            </p>


            <p>

                <b>Deskripsi:</b>

                ${escapeHTML(
                    model.description
                )}

            </p>

        </div>

    `;


    return card;

}


/* ======================================================
   FILTER MODEL
====================================================== */

function getFilteredModels(){

    let keyword = "";


    if(searchInput){

        keyword =
            searchInput.value
                .trim()
                .toLowerCase();

    }


    return models.filter(
        function(model){

            /* ------------------------------------------
               FILTER KATEGORI
            ------------------------------------------ */

            const categoryMatch =

                activeCategory ===
                "semua"

                ||

                (
                    Array.isArray(
                        model.categories
                    )

                    &&

                    model.categories.includes(
                        activeCategory
                    )
                );


            /* ------------------------------------------
               DATA UNTUK SEARCH
            ------------------------------------------ */

            const searchText = [

                model.name,

                model.birth,

                model.country,

                model.profession,

                model.active,

                model.description,

                ...(Array.isArray(
                    model.categories
                )
                ?
                model.categories
                :
                [])

            ]
            .join(" ")
            .toLowerCase();


            /* ------------------------------------------
               FILTER SEARCH
            ------------------------------------------ */

            const searchMatch =
                searchText.includes(
                    keyword
                );


            return (
                categoryMatch &&
                searchMatch
            );

        }
    );

}


/* ======================================================
   RENDER MODEL
====================================================== */

function renderModels(){

    if(!container){

        return;

    }


    container.innerHTML = "";


    const filteredModels =
        getFilteredModels();


    /* ==================================================
       HASIL KOSONG
    ================================================== */

    if(
        filteredModels.length === 0
    ){

        if(emptyMessage){

            emptyMessage.style.display =
                "block";

        }


    }else{

        if(emptyMessage){

            emptyMessage.style.display =
                "none";

        }

    }


    /* ==================================================
       RENDER CARD
    ================================================== */

    filteredModels.forEach(
        function(model, index){

            const card =
                createModelCard(
                    model,
                    index + 1
                );


            container.appendChild(
                card
            );

        }
    );


    /* ==================================================
       JUDUL HASIL
    ================================================== */

    if(resultTitle){

        const category =
            categories.find(
                function(item){

                    return (
                        item.id ===
                        activeCategory
                    );

                }
            );


        if(category){

            resultTitle.textContent =

                category.name +

                " — " +

                filteredModels.length +

                " Model";

        }

    }

}


/* ======================================================
   SEARCH
====================================================== */

function initSearch(){

    if(!searchInput){

        return;

    }


    searchInput.addEventListener(
        "input",
        function(){

            renderModels();

        }
    );

}


/* ======================================================
   SIDEBAR ELEMENT
====================================================== */

const menuBtn =
    document.getElementById(
        "menuBtn"
    );


const sidebar =
    document.getElementById(
        "sidebar"
    );


const overlay =
    document.getElementById(
        "overlay"
    );


/* ======================================================
   BUKA SIDEBAR
====================================================== */

function openSidebar(){

    if(!sidebar || !overlay){

        return;

    }


    sidebar.classList.add(
        "active"
    );


    overlay.classList.add(
        "active"
    );


    document.body.style.overflow =
        "hidden";

}


/* ======================================================
   TUTUP SIDEBAR
====================================================== */

function closeSidebar(){

    if(!sidebar || !overlay){

        return;

    }


    sidebar.classList.remove(
        "active"
    );


    overlay.classList.remove(
        "active"
    );


    document.body.style.overflow =
        "";

}


/* ======================================================
   INIT SIDEBAR
====================================================== */

function initSidebar(){

    if(
        !menuBtn ||
        !sidebar ||
        !overlay
    ){

        return;

    }


    /* ------------------------------------------
       TOMBOL MENU
    ------------------------------------------ */

    menuBtn.addEventListener(
        "click",
        function(){

            if(
                sidebar.classList.contains(
                    "active"
                )
            ){

                closeSidebar();

            }else{

                openSidebar();

            }

        }
    );


    /* ------------------------------------------
       OVERLAY
    ------------------------------------------ */

    overlay.addEventListener(
        "click",
        function(){

            closeSidebar();

        }
    );


    /* ------------------------------------------
       MENU SIDEBAR
    ------------------------------------------ */

    const menuItems =
        document.querySelectorAll(
            ".menu-item"
        );


    menuItems.forEach(
        function(item){

            item.addEventListener(
                "click",
                function(){

                    closeSidebar();

                }
            );

        }
    );

}


/* ======================================================
   MENU AKTIF SESUAI HALAMAN
====================================================== */

function initActiveMenu(){

    const currentPage =

        window.location.pathname

            .split("/")

            .pop()

            .toLowerCase();


    const menuLinks =
        document.querySelectorAll(
            ".menu-item"
        );


    menuLinks.forEach(
        function(link){

            const href =
                link.getAttribute(
                    "href"
                );


            if(!href){

                return;

            }


            const linkPage =

                href

                    .split("/")

                    .pop()

                    .toLowerCase();


            if(
                linkPage ===
                currentPage
            ){

                link.classList.add(
                    "active"
                );

            }else{

                link.classList.remove(
                    "active"
                );

            }

        }
    );

}


/* ======================================================
   HEADER SHADOW
====================================================== */

function initHeaderShadow(){

    const header =
        document.querySelector(
            "header"
        );


    if(!header){

        return;

    }


    window.addEventListener(
        "scroll",
        function(){

            if(
                window.scrollY > 50
            ){

                header.style.boxShadow =

                    "0 6px 18px rgba(0,0,0,.25)";

            }else{

                header.style.boxShadow =

                    "0 2px 8px rgba(0,0,0,.15)";

            }

        }
    );

}


/* ======================================================
   SCROLL TO TOP
====================================================== */

function initScrollTop(){

    let topButton =
        document.getElementById(
            "topButton"
        );


    /* ------------------------------------------
       BUAT TOMBOL JIKA BELUM ADA
    ------------------------------------------ */

    if(!topButton){

        topButton =
            document.createElement(
                "button"
            );


        topButton.id =
            "topButton";


        topButton.innerHTML =
            '<i class="fa-solid fa-arrow-up"></i>';


        topButton.setAttribute(
            "aria-label",
            "Kembali ke atas"
        );


        document.body.appendChild(
            topButton
        );

    }


    /* ------------------------------------------
       TAMPIL / SEMBUNYI
    ------------------------------------------ */

    window.addEventListener(
        "scroll",
        function(){

            if(
                window.scrollY > 300
            ){

                topButton.style.display =
                    "flex";


                topButton.style.alignItems =
                    "center";


                topButton.style.justifyContent =
                    "center";

            }else{

                topButton.style.display =
                    "none";

            }

        }
    );


    /* ------------------------------------------
       KLIK
    ------------------------------------------ */

    topButton.addEventListener(
        "click",
        function(){

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}


/* ======================================================
   ESC UNTUK SIDEBAR
====================================================== */

function initEscape(){

    document.addEventListener(
        "keydown",
        function(event){

            if(
                event.key ===
                "Escape"
            ){

                closeSidebar();

            }

        }
    );

}


/* ======================================================
   INISIALISASI
====================================================== */

function initModelPage(){

    checkElements();


    /* ------------------------------------------
       KATEGORI
    ------------------------------------------ */

    renderCategories();


    /* ------------------------------------------
       MODEL
    ------------------------------------------ */

    renderModels();


    /* ------------------------------------------
       SEARCH
    ------------------------------------------ */

    initSearch();


    /* ------------------------------------------
       SIDEBAR
    ------------------------------------------ */

    initSidebar();


    /* ------------------------------------------
       MENU AKTIF
    ------------------------------------------ */

    initActiveMenu();


    /* ------------------------------------------
       HEADER
    ------------------------------------------ */

    initHeaderShadow();


    /* ------------------------------------------
       SCROLL TOP
    ------------------------------------------ */

    initScrollTop();


    /* ------------------------------------------
       ESC
    ------------------------------------------ */

    initEscape();

}


/* ======================================================
   JALANKAN SETELAH HTML SELESAI
====================================================== */

if(
    document.readyState ===
    "loading"
){

    document.addEventListener(
        "DOMContentLoaded",
        initModelPage
    );

}else{

    initModelPage();

}

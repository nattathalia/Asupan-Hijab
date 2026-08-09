/* ======================================================
   DATA MODEL
====================================================== */

const models = [

    {
        id: 1,

        name: "Model Asia 1",

        photo:
            "https://asupanhijab.xyz/model-1.jpg",

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
            "https://asupanhijab.xyz/model-4.jpg",

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
        id: "hijab",
        name: "Hijab"
    }

];


let activeCategory = "semua";


/* ======================================================
   ELEMENT
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
   RENDER KATEGORI
====================================================== */

function renderCategories(){

    categoryContainer.innerHTML = "";

    categories.forEach(function(category){

        const button =
            document.createElement("button");


        button.type =
            "button";


        button.className =
            "region-btn";


        button.textContent =
            category.name;


        button.dataset.category =
            category.id;


        if(
            category.id ===
            activeCategory
        ){

            button.classList.add("active");

        }


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

    });

}


/* ======================================================
   RENDER MODEL
====================================================== */

function renderModels(){

    const keyword =
        searchInput.value
        .trim()
        .toLowerCase();


    container.innerHTML = "";


    let visibleCount = 0;


    models.forEach(function(model){

        const categoryMatch =
            activeCategory === "semua" ||
            model.categories.includes(
                activeCategory
            );


        const searchText =
            (
                model.name +
                " " +
                model.country +
                " " +
                model.profession +
                " " +
                model.description
            )
            .toLowerCase();


        const searchMatch =
            searchText.includes(keyword);


        if(
            categoryMatch &&
            searchMatch
        ){

            visibleCount++;


            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "model-card";


            card.innerHTML = `

                <div class="model-title">

                    #${model.id}
                    ${model.name}

                </div>


                <div class="model-photo">

                    <img
                        src="${model.photo}"
                        alt="${model.name}"
                        loading="lazy">

                </div>


                <div class="model-info">

                    <h3>
                        Profil dan Biodata
                    </h3>


                    <p>
                        <b>Lahir:</b>
                        ${model.birth}
                    </p>


                    <p>
                        <b>Kebangsaan:</b>
                        ${model.country}
                    </p>


                    <p>
                        <b>Profesi:</b>
                        ${model.profession}
                    </p>


                    <p>
                        <b>Tahun Aktif:</b>
                        ${model.active}
                    </p>


                    <p>
                        <b>Deskripsi:</b>
                        ${model.description}
                    </p>

                </div>

            `;


            container.appendChild(card);

        }

    });


    /* ==================================================
       HASIL KOSONG
    ================================================== */

    if(visibleCount === 0){

        emptyMessage.style.display =
            "block";

    }else{

        emptyMessage.style.display =
            "none";

    }


    /* ==================================================
       JUDUL HASIL
    ================================================== */

    const activeCategoryObject =
        categories.find(function(category){

            return category.id ===
                activeCategory;

        });


    if(activeCategoryObject){

        resultTitle.textContent =
            activeCategoryObject.name +
            " — " +
            visibleCount +
            " Model";

    }

}


/* ======================================================
   SEARCH
====================================================== */

searchInput.addEventListener(
    "input",
    function(){

        renderModels();

    }
);


/* ======================================================
   SIDEBAR
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


function openSidebar(){

    sidebar.classList.add(
        "active"
    );

    overlay.classList.add(
        "active"
    );

    document.body.style.overflow =
        "hidden";

}


function closeSidebar(){

    sidebar.classList.remove(
        "active"
    );

    overlay.classList.remove(
        "active"
    );

    document.body.style.overflow =
        "";

}


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


overlay.addEventListener(
    "click",
    function(){

        closeSidebar();

    }
);


/* ======================================================
   MENU SIDEBAR
====================================================== */

const menuItems =
    document.querySelectorAll(
        ".menu-item"
    );


menuItems.forEach(function(item){

    item.addEventListener(
        "click",
        function(){

            closeSidebar();

        }
    );

});


/* ======================================================
   HEADER SHADOW
====================================================== */

window.addEventListener(
    "scroll",
    function(){

        const header =
            document.querySelector(
                "header"
            );


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


/* ======================================================
   SCROLL TOP
====================================================== */

const topButton =
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


window.addEventListener(
    "scroll",
    function(){

        if(
            window.scrollY > 300
        ){

            topButton.style.display =
                "flex";

        }else{

            topButton.style.display =
                "none";

        }

    }
);


topButton.addEventListener(
    "click",
    function(){

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    }
);


/* ======================================================
   ESC
====================================================== */

document.addEventListener(
    "keydown",
    function(event){

        if(
            event.key === "Escape"
        ){

            closeSidebar();

        }

    }
);


/* ======================================================
   JALANKAN
====================================================== */

renderCategories();

renderModels();

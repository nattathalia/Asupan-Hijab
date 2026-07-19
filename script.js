// =========================
// ASUPAN HIJAB
// script.js
// =========================

const videos = [

{
title:"Bokep SMP",
embeb:"https://luluvdo.com/6mtdn8yfookj"},
  
{
title:"Video 2",
description:"Deskripsi video 2",
embed:"https://www.youtube.com/embed/ysz5S6PUM-U"
},

{
title:"Video 3",
description:"Deskripsi video 3",
embed:"https://www.youtube.com/embed/ScMzIvxBSi4"
},

{
title:"Video 4",
description:"Deskripsi video 4",
embed:"https://www.youtube.com/embed/tgbNymZ7vqY"
},

{
title:"Video 5",
description:"Deskripsi video 5",
embed:"https://www.youtube.com/embed/kXYiU_JCYtU"
},

{
title:"Video 6",
description:"Deskripsi video 6",
embed:"https://www.youtube.com/embed/JGwWNGJdvx8"
},

{
title:"Video 7",
description:"Deskripsi video 7",
embed:"https://www.youtube.com/embed/fRh_vgS2dFE"
},

{
title:"Video 8",
description:"Deskripsi video 8",
embed:"https://www.youtube.com/embed/2Vv-BfVoq4g"
},

{
title:"Video 9",
description:"Deskripsi video 9",
embed:"https://www.youtube.com/embed/CevxZvSJLk8"
},

{
title:"Video 10",
description:"Deskripsi video 10",
embed:"https://www.youtube.com/embed/RgKAFK5djSk"
},

{
title:"Video 11",
description:"Deskripsi video 11",
embed:"https://www.youtube.com/embed/e-ORhEE9VVg"
},

{
title:"Video 12",
description:"Deskripsi video 12",
embed:"https://www.youtube.com/embed/60ItHLz5WEA"
}

];

// =====================

let currentPage = 1;

const perPage = 10;

let filteredVideos = videos;

// =====================

function renderVideos(){

const container=document.getElementById("videoContainer");

container.innerHTML="";

const start=(currentPage-1)*perPage;

const end=start+perPage;

const pageVideos=filteredVideos.slice(start,end);

pageVideos.forEach(video=>{

container.innerHTML+=`

<div class="video-card">

<iframe
src="${video.embed}"
allowfullscreen>
</iframe>

<div class="video-info">

<div class="video-title">
${video.title}
</div>

<div class="video-desc">
${video.description}
</div>

</div>

</div>

`;

});

document.getElementById("pageInfo").innerHTML=
"Halaman "+currentPage+" / "+
Math.max(1,Math.ceil(filteredVideos.length/perPage));

}

// =====================

document
.getElementById("nextBtn")
.addEventListener("click",()=>{

if(currentPage<
Math.ceil(filteredVideos.length/perPage)){

currentPage++;

renderVideos();

}

});

// =====================

document
.getElementById("prevBtn")
.addEventListener("click",()=>{

if(currentPage>1){

currentPage--;

renderVideos();

}

});

// =====================

document
.getElementById("searchInput")
.addEventListener("keyup",function(){

const keyword=this.value.toLowerCase();

filteredVideos=videos.filter(video=>

video.title.toLowerCase().includes(keyword) ||

video.description.toLowerCase().includes(keyword)

);

currentPage=1;

renderVideos();

});

// =====================

renderVideos();

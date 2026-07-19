const videos = [

{
title:"Video Contoh 1",
description:"Tes embed YouTube",
embed:"https://www.youtube.com/embed/M7lc1UVf-VE"
},

{
title:"Video Contoh 2",
description:"Video contoh kedua",
embed:"https://www.youtube.com/embed/dQw4w9WgXcQ"
}

];

const container = document.getElementById("videoContainer");

videos.forEach(video=>{

container.innerHTML += `
<div class="video-card">

<iframe
src="${video.embed}"
allowfullscreen>
</iframe>

<div class="video-info">
<div class="video-title">${video.title}</div>
<div class="video-desc">${video.description}</div>
</div>

</div>
`;

});

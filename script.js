const videos = [

{
title:"Video aneh",
iframe:
"iframe src="https://luluvdo.com/embeb/x7pgxi7ejra8" scrolling="no" frameborder="0" width="640" height="360" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe"
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

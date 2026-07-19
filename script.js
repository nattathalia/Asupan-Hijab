const videos = [

{
title:"Bu Guru Jilbab Syumilde Kena Doggy",
iframe:
"iframe src="https://luluvdo.com/embeb/x7pgxi7ejra8" scrolling="no" frameborder="0" width="640" height="360" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe"
},

{
title:"Enak Kalo Punya Pacar Tante Hijab Tiap Hari Dimanjain",
iframe:
"iframe src="https://luluvdo.com/embeb/lcghvu7n6v2e" scrolling="no" frameborder="0" width="640" height="360" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe"
},

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

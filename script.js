const videos = [

{
    title:"Bu Guru Jilbab Syumilde Kena Doggy",
    iframe:"https://luluvdo.com/embeb/x7pgxi7ejra8"
},

{
     title:"Enak Kalo Punya Pacar Tante Hijab Tiap Hari Dimanjain",
     iframe:"https://luluvdo.com/embeb/lcghvu7n6v2e"
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

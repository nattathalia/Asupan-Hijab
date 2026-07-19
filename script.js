const videos = [
  {
    title: "Video 1",
    iframe: "https://luluvdo.com/e/x7pgxi7ejra8",
    description: "Deskripsi 1"
  },
  {
    title: "Video 2",
    iframe: "https://luluvdo.com/e/lcghvu7n6v2e",
    description: "Deskripsi 2"
  },
  {
    title: "Video 1",
    iframe: "https://luluvdo.com/e/x7pgxi7ejra8",
    description: "Deskripsi 1"
  },
  {
    title: "Video 2",
    iframe: "https://luluvdo.com/e/lcghvu7n6v2e",
    description: "Deskripsi 2"
  },
  {
    title: "Video 1",
    iframe: "https://luluvdo.com/e/x7pgxi7ejra8",
    description: "Deskripsi 1"
  },
  {
    title: "Video 2",
    iframe: "https://luluvdo.com/e/lcghvu7n6v2e",
    description: "Deskripsi 2"
  },
  {
    title: "Video 1",
    iframe: "https://luluvdo.com/e/x7pgxi7ejra8",
    description: "Deskripsi 1"
  },
  {
    title: "Video 2",
    iframe: "https://luluvdo.com/e/lcghvu7n6v2e",
    description: "Deskripsi 2"
  },
  {
    title: "Video 1",
    iframe: "https://luluvdo.com/e/x7pgxi7ejra8",
    description: "Deskripsi 1"
  },
  {
    title: "Video 2",
    iframe: "https://luluvdo.com/e/lcghvu7n6v2e",
    description: "Deskripsi 2"
  },

];

const container = document.getElementById("videoContainer");

videos.forEach(video => {
  container.innerHTML += `
    <div class="video-card">
      <iframe
        src="${video.iframe}"
        frameborder="0"
        allowfullscreen>
      </iframe>

      <div class="video-info">
        <div class="video-title">${video.title}</div>
        <div class="video-desc">${video.description}</div>
      </div>
    </div>
  `;
});

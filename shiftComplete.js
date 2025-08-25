const section = document.querySelector('.section-gameWin')
const video = document.createElement('video');
video.src = './assets/video/gameWinned.mp4'
section.appendChild(video)

let night = JSON.parse(localStorage.getItem("night") || 0)
console.log("Night atual:", night)
video.play()

video.addEventListener("loadedmetadata", () => {
        console.log("Duração total:", video.duration, "segundos");
    });

function mudarTela() {
    window.location.href = "savage.html";
}

video.onended = mudarTela;
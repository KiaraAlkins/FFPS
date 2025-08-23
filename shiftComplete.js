const video = document.getElementById('gameWinned');
let night = JSON.parse(localStorage.getItem("night") || 0)
console.log("Night atual:", night)
video.play()

document.addEventListener('click', () => {
    window.location.href = "savage.html";
})
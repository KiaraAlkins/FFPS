document.addEventListener("DOMContentLoaded", () => {

    let numerodanoite = parseInt(localStorage.getItem("night")) || 1;

    console.log(numerodanoite)

    switch (numerodanoite) {
        case 1:
            const main = document.querySelector("main");
            const evidences1 = document.querySelector(".division_1-interludio");
            evidences1.classList.add("active");
        
            const evidences = document.querySelectorAll(".evidencias");
        
            evidences.forEach((evidence, index) => {
                setTimeout(() => {
                    evidence.classList.add("active");
            }, index * 1000);
        
            setTimeout(() => {
                main.style.display = "none";
                window.location.href = "tutorial.html";
            }, evidences.length * 1000 + 10000);
            
            });
            break;
    }

    const audioSlideShow = document.createElement('audio');
    audioSlideShow.src = './assets/openingSlide.mp3'
    document.body.appendChild(audioSlideShow)
    audioSlideShow.play();

});
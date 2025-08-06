document.addEventListener("DOMContentLoaded", () => {

    let numerodanoite = parseInt(localStorage.getItem("night")) || 1;
    localStorage.setItem("night", numerodanoite);

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
            }, 10000 + (index * 1000));
            
            });
            break;
    }
});
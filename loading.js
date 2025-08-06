        const barraCarregada = document.querySelectorAll(".barraCarregada");

        barraCarregada.forEach((barra, index) => {
            setTimeout(() => {
                barra.style.backgroundColor = "#00FF00";
                barra.style.transition = "background-color 500ms ease-in-out";
            }, index * 1000);
            setTimeout(() => {
                barra.style.backgroundColor = "#ffffff";
                barra.style.transition = "background-color 500ms ease-in-out";
            }, (index + 1) * 1000);
        });

        setTimeout(() => {
            window.location.href = "prenight.html";
        }, 10000);
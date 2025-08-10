        const barraCarregada = document.querySelectorAll(".barraCarregadareversa");

        barraCarregada.forEach((barra, index) => {
            setTimeout(() => {
                barra.style.backgroundColor = "#00FF00";
                barra.style.transition = "background-color 500ms ease-in-out";
            }, index * 500);
            setTimeout(() => {
                barra.style.backgroundColor = "#ffffff";
                barra.style.transition = "background-color 500ms ease-in-out";
            }, (index + 1) * 500);
        });

        setTimeout(() => {
            window.location.href = "index.html";
        }, 5000);
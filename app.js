document.addEventListener("DOMContentLoaded", () => {

    let numerodanoite = 1;

    localStorage.setItem("night", numerodanoite);

    const newgame = document.getElementById("menuButtons1");
    const continuenight = document.getElementById("menuButtons2");
    const extras = document.getElementById("menuButtons3");
    const customnight = document.getElementById("menuButtons4");

  function clickover(btn) {
        btn.addEventListener("mouseover", () => {
        
        btn.firstChild.classList.remove("quadrado");
        btn.firstChild.classList.add("triangulo");
  })

      btn.addEventListener("mouseout", () => {
        
        btn.firstChild.classList.remove("triangulo");
        btn.firstChild.classList.add("quadrado");
  })
  }

    clickover(newgame);
    clickover(continuenight);
    clickover(extras);
    clickover(customnight);

    newgame.addEventListener("click", () => {
        window.location.href = "loading.html";
    });
})
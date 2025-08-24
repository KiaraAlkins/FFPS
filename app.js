document.addEventListener("DOMContentLoaded", () => {

    let moneyBS = 100;

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
        localStorage.setItem("night", JSON.stringify(1)); 
        localStorage.setItem("money", JSON.stringify(100)); 
        localStorage.setItem("upgradeFunctions", JSON.stringify({ 
          xPrinter: false, 
          hispd: false, 
          handyman: false 
        })); 
      console.log(JSON.parse(localStorage.getItem("night")));
      window.location.href = "loading.html";
    });
    continuenight.addEventListener("click", () => {
        let nightNumber = parseInt(localStorage.getItem("night"))
        let moneyNumber = parseInt(localStorage.getItem("money"))
        let upgradeFunctions = JSON.parse(localStorage.getItem("upgradeFunctions"));
        console.log(nightNumber);
        
    })
})
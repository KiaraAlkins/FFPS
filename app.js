document.addEventListener("DOMContentLoaded", () => {

    let moneyBS = 100;

        let nightNumber = parseInt(localStorage.getItem("night"))
        let moneyNumber = parseInt(localStorage.getItem("money"))
        let upgradeFunctions = JSON.parse(localStorage.getItem("upgradeFunctions"));

    const newgame = document.getElementById("menuButtons1");
    const continuenight = document.getElementById("menuButtons2");
    const extras = document.getElementById("menuButtons3");
    const customnight = document.getElementById("menuButtons4");

    continuenight.innerHTML = `<div class="menuButtons_div quadrado"></div>Continue - ${nightNumber}`;

    const telaAviso = document.getElementById('telaAviso');
    const divWarning = document.querySelector('.divWarning');
    const textGlitch = document.querySelector('.textGlitch');
    textGlitch.style.display = 'none';
    const videoGlitch = document.createElement('video');
    videoGlitch.classList.add('videoGlitch');
    videoGlitch.src = "./assets/video/savagePrompt/tvglitch.mp4";
    videoGlitch.volume = 0.25
    const videoTVAnalog = document.createElement('video')
    videoTVAnalog.classList.add('videoTVAnalog');
    videoTVAnalog.src = "./assets/video/savagePrompt/tvStatic.mp4"
    const midnightMotorist = document.createElement('audio');
    midnightMotorist.src = "./assets/audio/midnightMotorist.mp3";
    midnightMotorist.loop = true;
    midnightMotorist.volume = 0.5;

    divWarning.style.animation = 'acenderOpacidade 5s forwards';
    setTimeout(() => {
        textGlitch.style.display = 'flex'
      }, 6000);
      setTimeout(() => {
        divWarning.appendChild(videoGlitch)
        videoGlitch.play()
      }, 7000)
        setTimeout(() => {
          while (divWarning.firstChild) {
            divWarning.removeChild(divWarning.firstChild)
          }
          divWarning.appendChild(videoTVAnalog)
          videoTVAnalog.play();
        }, 10000);
        setTimeout(() => {
          telaAviso.classList.remove('telaAviso');
          telaAviso.classList.add('telaAviso-glitch')
        }, 12000)
        setTimeout(() => {
          while (divWarning.firstChild) {
            divWarning.removeChild(divWarning.firstChild)
          }
          telaAviso.remove()
          midnightMotorist.play()
        }, 14000)
      
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
        nightNumber = parseInt(localStorage.getItem("night"))
        moneyNumber = parseInt(localStorage.getItem("money"))
        upgradeFunctions = JSON.parse(localStorage.getItem("upgradeFunctions"));
        console.log(nightNumber);
        window.location.href = "loading.html";
    })
})
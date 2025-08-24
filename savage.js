let money = JSON.parse(localStorage.getItem("money") || 0);

const centerPlayButton = document.getElementById("centerPlayButton");
const listButton = document.getElementById('list-button');
const divList = document.getElementById('savageListDiv');
const savageContainer = document.querySelector('.BSList_container');
const savageShock = document.getElementById('savageShock');
const videoSavage = document.getElementById('videoSavage');

console.log(money);

divList.style.display = 'none'

let divListaAberta = false
let videoPausado = true;
let tempoDeVideo = null;

let numeroMexido = 1

centerPlayButton.addEventListener('click', () => {
    centerPlayButton.style.display = 'none'
    videoPausado = false;
    tempoDeVideo = setTimeout(() => {
        animatronicoSeMexeu()
    }, 1000);
})

function animatronicoSeMexeu() {
    let riscoSavage = 0.4;
    if (Math.random() < riscoSavage) {
        numeroMexido++
    }
    if (numeroMexido == 1) {
        videoSavage.style.backgroundColor = 'red'
    } else if (numeroMexido == 2) {
        videoSavage.style.backgroundColor = 'blue'
    } else if (numeroMexido == 3) {
        videoSavage.style.backgroundColor = 'green'
    } else if (numeroMexido >= 4) {
        console.log('Game Over!');
    }
    console.log(dadoSavage)
}

let usedShock = 0;
savageShock.addEventListener('click', () => {
    usedShock++
    videoPausado = true;
    centerPlayButton.style.display = 'flex';
    clearInterval(tempoDeVideo)
    tempoDeVideo = null;
    numeroMexido = 1
    videoSavage.style.backgroundColor = 'red'
    if (divListaAberta) {
        savageContainer.style.display = 'none';
        divListaAberta = false;
        setTimeout(() => {
            divList.style.animation = 'fecharDiv 250ms forwards'
        }, 100);
        setTimeout(() => {
            divList.style.display = 'none';
        }, 350);
    }
})

listButton.addEventListener('click', () => {
    if (!divListaAberta) {
        if (!videoPausado) {
            divList.style.animation = 'abrirDiv 250ms forwards'
                divList.style.display = 'flex';
                divListaAberta = true
                setTimeout(() => {
                    savageContainer.style.display = 'flex';
                }, 350);
        }
        tempoDeVideo = setTimeout(() => {
        animatronicoSeMexeu()
        }, 500);
    } else {
        savageContainer.style.display = 'none';
        divListaAberta = false;
        setTimeout(() => {
            divList.style.animation = 'fecharDiv 250ms forwards'
        }, 100);
        setTimeout(() => {
            divList.style.display = 'none';
        }, 350);
    }
})

const BSlist = document.querySelectorAll('.BSList');

BSlist.forEach((botao) => {
    botao.addEventListener('click', () => {
        botao.classList.add('BSList-check')
    })
})
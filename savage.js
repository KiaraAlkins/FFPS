let money = JSON.parse(localStorage.getItem("money") || 0);

const centerPlayButton = document.getElementById("centerPlayButton");
const listButton = document.getElementById('list-button');
const divList = document.getElementById('savageListDiv');
const savageContainer = document.querySelector('.BSList_container');
const savageShock = document.getElementById('savageShock');

console.log(money)

divList.style.display = 'none'

let divListaAberta = false
let videoPausado = true;

centerPlayButton.addEventListener('click', () => {
    centerPlayButton.style.display = 'none'
    videoPausado = false;
})

savageShock.addEventListener('click', () => {
    videoPausado = true;
    centerPlayButton.style.display = 'flex';
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
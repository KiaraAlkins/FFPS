const progressContainer = document.getElementById('progress-container');
const progressBar = document.getElementById('progress-bar');

const minButton = document.getElementById('minButton');
const maxButton = document.getElementById('maxButton');
const closeButton = document.getElementById('closeButton');

function pressing(param) {
        param.addEventListener('mousedown', () => {
        if (param.classList.contains('notpressed')) {
            param.classList.remove('notpressed');
            param.classList.add('pressed');
        }
    });

        param.addEventListener('mouseup', () => {
        if (param.classList.contains('pressed')) {
            param.classList.remove('pressed');
            param.classList.add('notpressed');
        }
    })
}

pressing(minButton);
pressing(maxButton);
pressing(closeButton);

const buttonMenu1 = document.getElementById('buttonMenu1');
const buttonMenu2 = document.getElementById('buttonMenu2');
const buttonMenu3 = document.getElementById('buttonMenu3');
const buttonMenu4 = document.getElementById('buttonMenu4');
const buttonMenu5 = document.getElementById('buttonMenu5');
const buttonMenu6 = document.getElementById('buttonMenu6');

function pressingMenu(param) {
    param.addEventListener('mousedown', () => {
        param.classList.add('pressed2');
    });

    param.addEventListener('mouseup', () => {
        param.classList.remove('pressed2');
    });
}

pressingMenu(buttonMenu1);
pressingMenu(buttonMenu2);
pressingMenu(buttonMenu3);
pressingMenu(buttonMenu4);
pressingMenu(buttonMenu5);
pressingMenu(buttonMenu6);

const video = document.getElementById('video');
let durationOfVideo;
let update;


function start() {
    durationOfVideo = video.duration;
    alert(`Video duration: ${durationOfVideo} seconds`);
    update = setInterval((atualizarBarra) => {

    }, 500);
}

function atualizarBarra() {
    if(!video.paused) {

    }
}

closeButton.addEventListener('click', () => {
    durationOfVideo = video.duration;
    alert(`Video duration: ${durationOfVideo} seconds`);
});
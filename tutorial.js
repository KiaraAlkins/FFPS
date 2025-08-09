document.addEventListener("DOMContentLoaded", () => {

    const progressContainer = document.getElementById('progressContainer');
    const progressBar = document.getElementById('progressBar');
    const progressButton = document.getElementById('progressBarButton');

    let isDragging = false
    
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
            param.addEventListener('mouseout', () => {
                param.classList.remove('pressed');
                param.classList.add('notpressed');
        });
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
            param.addEventListener('mouseout', () => {
                param.classList.remove('pressed2');
            });
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
    
    video.addEventListener('loadedmetadata', () => {
        durationOfVideo = video.duration;
        const percent = (video.currentTime / video.duration) * 100;
        progressBar.style.width = percent + "%";
    })
    
    video.addEventListener('timeupdate', () => {
        const percent = (video.currentTime / video.duration) * 100;
        progressBar.style.width = percent + "%";
        progressButton.style.left = `calc(${percent}% - ${progressButton.offsetWidth / 2}px)`
    })
    
    progressContainer.addEventListener("click", (e) => {
        const clickX = e.offsetX;
        const width = progressContainer.clientWidth;
        const percent = clickX / width; 
        video.currentTime = percent * video.duration;

        progressBar.style.width = percent * 100 + "%";
        progressButton.style = `calc(${percent * 100}% - ${progressButton.offsetWidth / 2}px)`;
    });

    progressButton.addEventListener('mousedown', () => {
        isDragging = true;
        document.body.style.userSelect = 'none';
        progressButton.src = "./assets/buttonProgressBarPressed.svg"
    });

    document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const rect = progressContainer.getBoundingClientRect();
        let offsetX = e.clientX - rect.left;
        offsetX = Math.max(0, Math.min(offsetX, rect.width));
        const percent = offsetX / rect.width;
        progressBar.style.width = percent * 100 + "%";
        progressButton.style.left = `calc(${percent * 100}% - ${progressButton.offsetWidth / 2}px)`;
        }
    });

    document.addEventListener('mouseup', (e) => {
        if (isDragging) {
            const rect = progressContainer.getBoundingClientRect();
            let offsetX = e.clientX - rect.left;
            offsetX = Math.max(0, Math.min(offsetX, rect.width));
            const percent = offsetX / rect.width;
            video.currentTime = percent * video.duration;
            isDragging = false;

                    progressBar.style.width = percent * 100 + "%";
        progressButton.style = `calc(${percent * 100}% - ${progressButton.offsetWidth / 2}px)`;

            document.body.style.userSelect = '';
                    progressButton.src = "./assets/buttonProgressBarNotPressed.svg"
        }
    });
    
    const playButton = document.getElementById('playButton');
    const playImg = document.getElementById('playButton_img')
    const pauseButton = document.getElementById('pauseButton');
    const pauseImg = document.getElementById('pauseButton_img')
    const stopButton = document.getElementById('stopButton');
    const stopImg = document.getElementById('stopButton_img')
    const proButtonVolume = document.getElementById('progressButtonVolume');
    
    playButton.addEventListener('click', () => {
        playImg.src = "./assets/play_deactivated.svg"
        stopImg.src = "./assets/stop.svg"
        pauseImg.src = "./assets/pause.svg"
        video.play();
    })
    
    playButton.addEventListener('mousedown', () => {
        playButton.classList.add('pressed2')
    })
    playButton.addEventListener('mouseup', () => {
        playButton.classList.remove('pressed2')
    })
    
    pauseButton.addEventListener('click', () => {
        playImg.src = './assets/play.svg'
        stopImg.src = './assets/stop.svg'
        pauseImg.src = './assets/pause_deactivated.svg'
        video.pause()
    })
    
    pauseButton.addEventListener('mousedown', () => {
        pauseButton.classList.add('pressed2')
    })
    pauseButton.addEventListener('mouseup', () => {
        pauseButton.classList.remove('pressed2')
    })
    
    stopButton.addEventListener('click', () => {
        playImg.src = './assets/play.svg'
        stopImg.src = './assets/stop_deactivated.svg'
        pauseImg.src = './assets/pause_deactivated.svg'
        video.currentTime = 0;
        video.pause();
    })
    
    stopButton.addEventListener('mousedown', () => {
        stopButton.classList.add('pressed2')
    })
    stopButton.addEventListener('mouseup', () => {
        stopButton.classList.remove('pressed2')
    })
    
    proButtonVolume.addEventListener('mousedown', () => {
        proButtonVolume.classList.remove('notpressed')
        proButtonVolume.classList.add('pressed')
    })
    
    proButtonVolume.addEventListener('mousemove', () => {
        
    })

    proButtonVolume.addEventListener('mouseup', () => {
        proButtonVolume.classList.remove('pressed')
        proButtonVolume.classList.add('notpressed')
    })
    
    const jumpLeftButton = document.getElementById('jumpLeftButton');
    const jumpLeftButton_img = document.getElementById('jumpLeft_img');
    const advanceLeft = document.getElementById('advanceLeft');
    const advanceLeft_img = document.getElementById('advanceLeft_img');
    const advanceRight = document.getElementById('advanceRight');
    const advanceRight_img = document.getElementById('advanceRight_img');
    const jumpRightButton = document.getElementById('jumpRightButton');
    const jumpRightButton_img = document.getElementById('jumpRight_img');
    
    
    function atualizarBotaoRetroceder(params, params_img, caminho1, caminho2) {
        if (video.currentTime < 10) {
            params_img.src = caminho1;
            params.disabled = true;
        } else {
            params_img.src = caminho2
            params.disabled = false;
        }
    }
    
    function atualizarBotaoAvancar(params, params_img, caminho1, caminho2) {
        if (video.duration - video.currentTime < 10) {
            params_img.src = caminho1;
            params.disabled = true;
        } else {
            params_img.src = caminho2
            params.disabled = false;
        }
    }
    
    video.addEventListener("timeupdate", () => {
        atualizarBotaoRetroceder(advanceLeft, advanceLeft_img, './assets/avancarEsquerda_deactivated.svg', './assets/avancarEsquerda.svg');
        atualizarBotaoAvancar(advanceRight, advanceRight_img, './assets/avancarDireita_deactivated.svg', './assets/avancarDireita.svg')
    })
    
    advanceLeft.addEventListener('click', () => {
        if (video.currentTime > 10) {
            video.currentTime = Math.max(video.currentTime - 10, 0);
        }
    })
    
    advanceRight.addEventListener('click', () => {
        video.currentTime = Math.min(video.currentTime + 10, video.duration);
    })
})


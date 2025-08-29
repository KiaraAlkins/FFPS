let money = parseInt(localStorage.getItem("money") || 0);
let nightNumber = parseInt(localStorage.getItem("night"));

document.addEventListener('DOMContentLoaded', () => {
    const telaPreta = document.getElementById('tela-preta');
    requestAnimationFrame(() => {
        telaPreta.style.opacity = '0';
    })
    
    setTimeout(() => {
        telaPreta.remove();
    }, 5000);

    const toogleButton = document.getElementById("toogleButton");
    const savageList = document.getElementById("savageListDiv");
    const savageShock = document.getElementById("buttonShock");
    const ImgSavageShock = document.getElementById("buttonShock_img");
    const telaVideo = document.getElementById("telaVideo_sa");

    savageList.style.display = 'none';

    let estadoAtual = 1;
    let proximoEstado = null;
    let audioPrompt = 0;
    let listaAberta = false
    let numeroMexido = 1;
    let audioEmExecucao = false;
    let usedShock = 0

    const videoEstagio1 = document.createElement('video');
    const videoEstagio2 = document.createElement('video');
    const videoEstagio3 = document.createElement('video');
    [videoEstagio1, videoEstagio2, videoEstagio3].forEach(v => {
        v.loop = true;
        v.classList.add("videoAtual");
    });

    switch (nightNumber) {
        case 2:
            videoEstagio1.src = "./assets/video/savagePrompt/moltenFreddy-Stage-1.mp4"
            videoEstagio2.src = "./assets/video/savagePrompt/moltenFreddy-Stage-2.mp4"
            videoEstagio3.src = "./assets/video/savagePrompt/moltenFreddy-Stage-3.mp4"
            break;
        case 3:
            videoEstagio1.src = "./assets/video/savagePrompt/scrapBaby-stage-1.mp4";
            videoEstagio2.src = "./assets/video/savagePrompt/scrapBaby-stage-2.mp4";
            videoEstagio3.src = "./assets/video/savagePrompt/scrapBaby-stage-3.mp4";
            break;
        case 4:
            videoEstagio1.src = "./assets/video/savagePrompt/springTrap-stage-1.mp4";
            videoEstagio2.src = "./assets/video/savagePrompt/springTrap-stage-2.mp4";
            videoEstagio3.src = "./assets/video/savagePrompt/springTrap-stage-3.mp4";
            break;
        case 5:
            videoEstagio1.src = "./assets/video/savagePrompt/Lefty-Stage-1.mp4";
            videoEstagio2.src = "./assets/video/savagePrompt/Lefty-Stage-2.mp4";
            videoEstagio3.src = "./assets/video/savagePrompt/Lefty-Stage-3.mp4";
            break;
        default:
            break;
    }

    const videos = [
        videoEstagio1,
        videoEstagio2,
        videoEstagio3,
    ]
    
    const audios = [
        new Audio("./assets/audio/savageAudioPrompt/savage-prompt1.mp3"),
        new Audio("./assets/audio/savageAudioPrompt/savage-prompt2.mp3"),
        new Audio("./assets/audio/savageAudioPrompt/savage-prompt3.mp3"),
        new Audio("./assets/audio/savageAudioPrompt/savage-prompt4.mp3"),
        new Audio("./assets/audio/savageAudioPrompt/savage-prompt5.mp3"),
        new Audio("./assets/audio/savageAudioPrompt/savage-prompt6.mp3")
    ];

    const displayVideo = document.getElementById("displayDoVideo");
    let videoAtual = videoEstagio1;
    displayVideo.appendChild(videoAtual);
    
    function playNextAudio() {
        travarLista();
        audioEmExecucao = true

        const audio = audios[audioPrompt];
        audio.currentTime = 0;
        audio.play();

        audio.onended = () => {
            audioEmExecucao = false;
            destravarLista();

            if (audioPrompt === audios.length - 1) {
                document.body.appendChild(telaPreta)
                requestAnimationFrame(() => {
                    telaPreta.style.opacity = '1';
                    window.location.href = 'index.html'
                }, 1000);
            } else {
                audioPrompt++;
            }
        }
    }

    function pauseAudio() {
        if (audioEmExecucao) {
            const audio = audios[audioPrompt - 1];
            audio.pause();
        }
    }

    function atualizarTela(novoEstado) {
        
        if (novoEstado > videos.length) {
            gameOver();
            return
        }

        estadoAtual = novoEstado; // salva novo estado
        displayVideo.innerHTML = ""; // limpa vídeo anterior
        videoAtual = videos[estadoAtual - 1];
        displayVideo.appendChild(videoAtual);
        videoAtual.play();
        console.log(proximoEstado)
        proximoEstado = null; // zera depois de usar
    }

    const playButton = document.getElementById("PlayButton");

    function travarLista() {
        toogleButton.disabled = true;
        toogleButton.style.opacity = 0.5
        toogleButton.style.pointerEvents = 'none'
    }
    function destravarLista() {
        toogleButton.disabled = false;
        toogleButton.style.opacity = 1;
        toogleButton.style.pointerEvents = "auto";
    }

    travarLista();

    playButton.addEventListener('click', () => {
        playButton.style.display = 'none'
        videoAtual.play();

        if (audioEmExecucao) {
            const audio = audios[audioPrompt - 1];
            audio.play();
        } else if (audioPrompt < audios.length) {
            playNextAudio();
        }
    })

    const videoAnalogGlitch = document.createElement('video');
    videoAnalogGlitch.src = './assets/video/savagePrompt/tvStatic.mp4'
    videoAnalogGlitch.loop = true;

    savageShock.addEventListener('click', () => {
        usedShock++
        ImgSavageShock.src = "./assets/savage/buttonShockPressed.svg";
        savageShock.disabled = true;

        telaVideo.appendChild(videoAnalogGlitch);
        videoAnalogGlitch.classList.add("videoGlitch");
        videoAnalogGlitch.play()
        setTimeout(() => {
            ImgSavageShock.src = "./assets/savage/buttonShock.svg"
            savageShock.disabled = false
            videoAnalogGlitch.remove();
        }, 2000);
        pauseAudio();
        playButton.style.display = 'flex';
        numeroMexido = 1;
        proximoEstado = 1;
        atualizarTela(proximoEstado);
        if (listaAberta) {
            savageList.style.display = 'none';
            listaAberta = false;
        }
    })
    
    toogleButton.addEventListener('click', () => {
        if (!listaAberta) {
            savageList.style.display = 'flex';
            listaAberta = true
        } else {
            savageList.style.display = 'none';
            listaAberta = false;
            animatronicoSeMexeu();
            playNextAudio();
        }
    })

    const BSlist = document.querySelectorAll('.BSList');
    
    BSlist.forEach((botao) => {
        botao.addEventListener('click', () => {
            botao.classList.add('BSList-check')
        })
    })

    function animatronicoSeMexeu() {
        let riscoSavage = 0.9
        if (Math.random() < riscoSavage) {
            if (Math.random() < 0.3) {
                if (numeroMexido == 2) {
                    numeroMexido = 4;
                } else {
                    numeroMexido += 2
                }
            } else {
                numeroMexido++
            }
        }
        console.log(audioPrompt)
        proximoEstado = numeroMexido;
        atualizarTela(proximoEstado);
    }

    function gameOver() {
        const gameOverScreen = document.getElementById("gameOverScreen");
        gameOverScreen.classList.add("active");

        document.querySelectorAll('audio').forEach(audio => {
            audio.pause();
            audio.currentTime = 0;
            audio.muted = true;
        })
    }
})
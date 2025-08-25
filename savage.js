let money = JSON.parse(localStorage.getItem("money") || 0);

document.addEventListener('DOMContentLoaded', () => {
    
        const telaPreta = document.getElementById('tela-preta');
        requestAnimationFrame(() => {
            telaPreta.style.opacity = '0';
        })
        
        setTimeout(() => {
            telaPreta.remove();
        }, 5000)
    
    
    const centerPlayButton = document.getElementById("centerPlayButton");
    const listButton = document.getElementById('list-button');
    const divList = document.getElementById('savageListDiv');
    const savageContainer = document.querySelector('.BSList_container');
    const savageShock = document.getElementById('savageShock');
    const videoSavage = document.getElementById('videoSavage');
    const account = document.getElementById('account');
    const reward = document.getElementById('reward');
    
    const audioSavage1 = document.createElement('audio');
    audioSavage1.src = "./assets/audio/savageAudioPrompt/savage-prompt1.mp3";
    audioSavage1.addEventListener("loadedmetadata", () => {
        console.log("Duração total:", audioSavage1.duration, "segundos");
    });
    const audioSavage2 = document.createElement('audio');
    audioSavage2.src = "./assets/audio/savageAudioPrompt/savage-prompt2.mp3";
    audioSavage2.addEventListener("loadedmetadata", () => {
        console.log("Duração total:", audioSavage2.duration, "segundos");
    });
    const audioSavage3 = document.createElement('audio');
    audioSavage3.src = "./assets/audio/savageAudioPrompt/savage-prompt3.mp3";
    audioSavage3.addEventListener("loadedmetadata", () => {
        console.log("Duração total:", audioSavage3.duration, "segundos");
    });
    const audioSavage4 = document.createElement('audio');
    audioSavage4.src = "./assets/audio/savageAudioPrompt/savage-prompt4.mp3";
    audioSavage4.addEventListener("loadedmetadata", () => {
        console.log("Duração total:", audioSavage4.duration, "segundos");
    });
    
    
    account.innerHTML = `your account: <br> B$ ${money},00`;
    
    console.log(money);
    
    divList.style.display = 'none'
    
    let divListaAberta = false
    let videoPausado = true;
    let tempoDeVideo = null;
    
    let numeroMexido = 1
    let audioPrompt = 1;
    let proximoEstado = null;
    
    function travarLista() {
    listButton.disabled = true;
    listButton.style.opacity = 0.5
    listButton.style.pointerEvents = 'none';
    }
    
    function destravarLista() {
    listButton.disabled = false;
    listButton.style.opacity = 1;
    listButton.style.pointerEvents = "auto";
    }
    
    centerPlayButton.addEventListener('click', () => {
    tocarAudios()
    if (audioPrompt == 1) {
        centerPlayButton.style.display = 'none'
        videoPausado = false;
        tempoDeVideo = setTimeout(() => {
        }, audioSavage1.duration);
    } else if (audioPrompt => 2 && audioPrompt < 5) {
        centerPlayButton.style.display = 'none'
        videoPausado = false;
        tempoDeVideo = setTimeout(() => {
        }, audioSavage2.duration);
    }
    })
    
    function tocarAudios() {
    travarLista();
    
    switch (audioPrompt) {
        case 1:
            audioSavage1.currentTime = 0;
            audioSavage1.play();
            audioSavage1.onended = destravarLista;
            break;
        case 2: 
            audioSavage2.currentTime = 0;
            audioSavage2.play();
            audioSavage2.onended = destravarLista;
            break;
        case 3: 
            audioSavage2.currentTime = 0;
            audioSavage2.play()
            audioSavage2.onended = destravarLista;
            break;
        case 4: 
            audioSavage2.currentTime = 0;
            audioSavage2.play()
            audioSavage2.onended = destravarLista;
            break;
        case 5: 
            audioSavage3.currentTime = 0; 
            audioSavage3.play()
            audioSavage3.onended = destravarLista;
        default:
            destravarLista();
            break;
    }
    }
    
    function pausarAudios() {
    switch (audioPrompt) {
        case 1:
            audioSavage1.pause();
            break;
    
        case 2: 
            audioSavage2.pause();
            break;
        
        case 3: 
            audioSavage2.pause()
            break;
    
        case 4: 
            audioSavage2.pause()
            break;
        case 5: 
            audioSavage2.pause();
    
        default:
            break;
    }
    }
    
    function animatronicoSeMexeu() {
    let riscoSavage = 0.6;
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
    audioPrompt++
    console.log(audioPrompt)
    proximoEstado = numeroMexido;
    console.log(proximoEstado)
    }
    
    function mudarTela() {
    window.location.href = "index";
    }
    
    function atualizarTela() {
    if (proximoEstado === null) return;
    if (proximoEstado == 1) {
        videoSavage.style.backgroundColor = 'red'
    } else if (proximoEstado == 2) {
        videoSavage.style.backgroundColor = 'blue'
    } else if (proximoEstado == 3) {
        videoSavage.style.backgroundColor = 'green'
    } else if (proximoEstado >= 4) {
        console.log('Game Over!');
    }
    console.log(proximoEstado)
    proximoEstado = null;
    }
    
    let usedShock = 0;
    savageShock.addEventListener('click', () => {
    usedShock++
    pausarAudios();
    videoPausado = true;
    centerPlayButton.style.display = 'flex';
    clearInterval(tempoDeVideo)
    tempoDeVideo = null;
    numeroMexido = 1
    proximoEstado = 1;
    atualizarTela();
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
                    atualizarTela()
                }, 350);
        }
    } else {
        if (audioPrompt < 5) {
            savageContainer.style.display = 'none';
            divListaAberta = false;
            setTimeout(() => {
                divList.style.animation = 'fecharDiv 250ms forwards'
            }, 100);
            setTimeout(() => {
                divList.style.display = 'none';
                animatronicoSeMexeu()
                tocarAudios();
            }, 350);
        } else if (audioPrompt === 5) {
            savageContainer.style.display = 'none';
            divListaAberta = false;
            setTimeout(() => {
                divList.style.animation = 'fecharDiv 250ms forwards'
            }, 100);
            setTimeout(() => {
                divList.style.display = 'none';
                audioSavage4.currentTime = 0;
                audioSavage4.play();
                console.log('sugarCrash')
                audioSavage4.onended = mudarTela()
            }, 350);
        }
    }
    })
    
    const BSlist = document.querySelectorAll('.BSList');
    
    BSlist.forEach((botao) => {
    botao.addEventListener('click', () => {
        botao.classList.add('BSList-check')
    })
    })


})

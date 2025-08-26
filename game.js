let nightNumber = parseInt(localStorage.getItem("night"))
let moneyNumber = parseInt(localStorage.getItem("money"))
let upgrades = JSON.parse(localStorage.getItem("upgradeFunctions"));

document.addEventListener("DOMContentLoaded", () => {

    const telaPreta = document.getElementById('tela-preta');
    requestAnimationFrame(() => {
        telaPreta.style.opacity = '0';
    })

    setTimeout(() => {
        telaPreta.remove();
    }, 5000)

    const slider = document.querySelector('.game-night_slider');

    // aplica a posição inicial sem animação
    slider.style.transition = 'none';
    slider.style.transform = 'translateX(-100%)';
    
    // força reflow e então reativa a transição
    requestAnimationFrame(() => {
        slider.style.transition = 'transform 0.2s ease-in-out';
    });

    let posicaoAtual = 1;
    const botaoDireita = document.querySelectorAll('.buttonGameNight')[1];
    const botaoEsquerda = document.getElementById('setaButton-Left');
    const botaoEsquerda_leftScreen = document.getElementById('setaButton-Left-Lscreen');
    const botaoDireita_rightScreen = document.getElementById('setaButton-Right-Rscreen');
    const botaoHorizontal = document.getElementById('buttonGameNight-horizontal');

    const gmSection_left = document.getElementById('gm-section-left');
    const gmSection_center = document.getElementById('center-content')
    const gmSection_right = document.getElementById('gm-section-right');

    const moneyBS = JSON.parse(localStorage.getItem("money"));
    const containerMoney = document.getElementById('money');
    containerMoney.innerText = `B$ ${moneyBS},00`

    const audioPressingButton = document.createElement('audio');
    audioPressingButton.src = "./assets/audio/pressingButton.mp3"
    const audioPressingButtonTwo = document.createElement('audio');
    audioPressingButtonTwo.src = "./assets/audio/pressingButtonTwo.mp3"

    const audioHeater = document.createElement('audio');
    audioHeater.src = "./assets/audio/heater.mp3";
    audioHeater.loop = true
    audioHeater.volume = 0.50;
    const audioVent = document.createElement('audio')
    audioVent.src = "./assets/audio/ventilation.mp3";
    audioVent.loop = true
    audioVent.volume = 0.50;

    let ctx, source, buffer, gainNode;

    async function fazerLooping() {
        if (!ctx) {
            ctx = new (window.AudioContext || window.webkitAudioContext)();
            gainNode = ctx.createGain();
            gainNode.gain.value = 0.1;
            gainNode.connect(ctx.destination)
        } 
        if (!buffer) {
            const res = await fetch('./assets/audio/ambienceTheme.mp3');
            const arr = await res.arrayBuffer();
            buffer = await ctx.decodeAudioData(arr);
        }

        if (source) {
            source.stop();
        }

        source = ctx.createBufferSource();
        source.buffer = buffer;
        source.loop = true;

        source.connect(gainNode);
        source.start(0)
    }

    document.addEventListener('mouseenter', () => {
        if (ctx && ctx.state === 'suspended') ctx.resume();
        fazerLooping()
    }, { once: true });
    
    const upgradeFunctions = {
        xPrinter: false,
        hispd: false,
        handyman: false,
    }

    const dadosSalvos = localStorage.getItem("upgradeFunctions");
    const dadosRecuperado = JSON.parse(dadosSalvos);
    // para manipular, ex: console.log(dadosRecuperados.xPrinter)

    function atualizarPosicao() {
        slider.style.transform = `translateX(-${posicaoAtual * 100}%)`;
    }

    botaoDireita.addEventListener('click', () => {
        if (posicaoAtual < 2) {
            posicaoAtual++;
            atualizarPosicao();
        }
    });

    botaoEsquerda.addEventListener('click', () => {
        if (posicaoAtual > 0) {
            posicaoAtual--;
            atualizarPosicao();
        }
    });

    botaoEsquerda_leftScreen.addEventListener('click', () => {
        if (posicaoAtual < 1) {
            posicaoAtual++
            atualizarPosicao();
        }
    })

    botaoDireita_rightScreen.addEventListener('click', () => {
        if (posicaoAtual > 1) { 
            posicaoAtual--
            atualizarPosicao();
        }
    })

    const telaTablet = document.getElementById('tablet-camera')

    let telaTabletLigada = false;
    const audioCamStatic = document.createElement('audio');
    audioCamStatic.src = './assets/audio/cameraStatic.mp3'
    const audioTabletCamera = document.createElement('audio');
    audioTabletCamera.src = './assets/audio/monitorPulled.mp3';

    botaoHorizontal.addEventListener('click', () => {
        if (telaTabletLigada) {
            telaTabletLigada = false
            telaTablet.style.transition = 'top 0.25s ease';
            telaTablet.style.top = '150%'

            audioTabletCamera.pause();
            audioTabletCamera.currentTime = 0;
            audioCamStatic.pause();
            audioCamStatic.currentTime = 0;
            musicBox_audio.pause()

            setTimeout(() => {
                telaTablet.style.display = 'none'
                embaralharGrade();
            }, 500)
        } else {
            telaTabletLigada = true;
            telaTablet.style.transition = 'top 0.25 ease';
            telaTablet.style.display = 'flex'
            telaTablet.style.top = '150%'

            audioTabletCamera.play();
            audioCamStatic.play();
            musicBox_audio.play()

            setTimeout(() => {
                audioTabletCamera.remove();
            }, 3000);
            requestAnimationFrame(() => {
            telaTablet.style.top = '45%'; // posição final (visível)
        })}
    })

    // -------------------------- Sistemas em funcionamento 

    let sistemaTemperatura = true;
    const PbabyButtons_temp = document.getElementById('bbButtonsP1');
    const bbButtonsDiv_temp = document.getElementById('bbButtonsDiv1');
    let sistemaTarefas = true;
    const PbabyButtons_tasks = document.getElementById('bbButtonsP2');
    const bbButtonsDiv_tasks = document.getElementById('bbButtonsDiv2');
    let sistemaAudio = true;
    const PbabyButtons_audio = document.getElementById('bbButtonsP3');
    const bbButtonsDiv_audio = document.getElementById('bbButtonsDiv3');
    let sistemaMusicBox = true;
    const PbabyButtons_musicBox = document.getElementById('bbButtonsP4');
    const bbButtonsDiv_musicBox = document.getElementById('bbButtonsDiv4');

    function sistemaDesativado(system, pElement, systemName, divElement) {
        pElement.style.color = '#FF0000';
        divElement.style.border = '2px solid #FF0000';
        setTimeout(() => {
            pElement.style.color = '#FFFFFF';
            divElement.style.border = 'none';
        }, 500);
    }

    let oscilandoButtons = setInterval(() => {
        if (!sistemaTemperatura) {
            sistemaDesativado(sistemaTemperatura, PbabyButtons_temp, 'Temperatura', bbButtonsDiv_temp);
            cateButtons_heater.style.color = '#FF0000';
            setTimeout(() => {
                cateButtons_heater.style.color = '#FFFFFF';
            }, 500);
            cateButtons_ventilation.style.color = '#FF0000';
            setTimeout(() => {
                cateButtons_ventilation.style.color = '#FFFFFF';
            }, 500);
        }
        if (!sistemaTarefas) {
            sistemaDesativado(sistemaTarefas, PbabyButtons_tasks, 'Tarefas', bbButtonsDiv_tasks);
            cateButtons_tasks.style.color = '#FF0000';
            setTimeout(() => {
                cateButtons_tasks.style.color = '#FFFFFF';
            }, 500);
        }
        if (!sistemaAudio) {
            sistemaDesativado(sistemaAudio, PbabyButtons_audio, 'Audio Lures', bbButtonsDiv_audio);
            cateButtons_audio.style.color = '#FF0000';
            setTimeout(() => {
                cateButtons_audio.style.color = '#FFFFFF';
            }, 500);
            desativarAudioLures();
            salaDeAtracao = null;
        }
        if (!sistemaMusicBox) {
            sistemaDesativado(sistemaMusicBox, PbabyButtons_musicBox, 'Music Box', bbButtonsDiv_musicBox);
            const alertBox = document.querySelector('.imgAlert');
            if (alertBox) alertBox.style.display = 'block';
            setTimeout(() => {
                if (alertBox) alertBox.style.display = 'none';
            }, 500);
        }
    }, 1000);

    // Embaralhamento de figuras 

    const contadorDeFiguras = {
        "stargreat.svg": 0,
        "losangle.svg": 0,
        "starfour.svg": 0,
        "circle.svg": 0,
    };

    function dispararComando(figuras) {
        switch (figuras) {
            case "stargreat.svg":
                console.log("Comando disparado: stargreat");
                sistemaTemperatura = true;
                break;
            case "losangle.svg":
                console.log("Comando disparado: Polygon 4");
                sistemaTarefas = true;
                break;
            case "starfour.svg":
                console.log("Comando disparado: Polygon 6");
                sistemaAudio = true;
                break;
            case "circle.svg":
                console.log("Comando disparado: Circle");
                sistemaMusicBox = true;
                break;
        }
    }

    let selectFigure = null;
    
    function embaralharGrade() {
        const container = document.getElementById('div-BabyButtons-div');
        const botoes = Array.from(container.querySelectorAll('.minig-buttons'));

        for (let i = botoes.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [botoes[i], botoes[j]] = [botoes[j], botoes[i]];
        }

        botoes.forEach(botao => {
            botao.disabled = false;
            botao.classList.remove('clicado');

            botao.onclick = () => {
                const audioClick = document.createElement('audio');
                audioClick.src = './assets/audio/rebButton.mp3';
                audioClick.play();
                setTimeout(() => {
                    audioClick.remove();
                }, 3000);
                if (botao.classList.contains('clicado')) return;
                
                const figura = botao.querySelector('img')?.getAttribute('data-figure');
                if (!figura) return
                
                if (!selectFigure) {
                    selectFigure = figura;
                    
                    botoes.forEach(outroBotao => {
                        const outraFigura = outroBotao.querySelector('img')?.getAttribute('data-figure');
                        if (outraFigura !== selectFigure) {
                            outroBotao.disabled = true;
                        }
                    })
                }
                if (figura !== selectFigure) return;
                
                botao.classList.add('clicado');
                botao.disabled = true;

                contadorDeFiguras[figura]++;
            }
        });
        container.append(...botoes);
    }

    embaralharGrade();

    const resetButton = document.getElementById('reset-system');
    resetButton.addEventListener('click', () => {
        const audioReset = document.createElement('audio');
        audioReset.src = './assets/audio/reboot.mp3';
        audioReset.play();
        setTimeout(() => {
            audioReset.remove();
        }, 3000);
        selectFigure = null;
        for (const figura in contadorDeFiguras) {
            if (contadorDeFiguras[figura] === 4) {
                const botoesClicados = Array.from(document.querySelectorAll('.minig-buttons.clicado'))
                .filter(botao => {
                    const img = botao.querySelector('img');
                    return img && img.getAttribute('data-figure') === figura;
                });

                if (botoesClicados.length === 4) {
                    dispararComando(figura);
                }
            }
        }
        const botoes = document.querySelectorAll('.minig-buttons');
        botoes.forEach(botao => {
            botao.classList.remove('clicado');
            botao.disabled = false;
        });

        for (let figura in contadorDeFiguras) {
            contadorDeFiguras[figura] = 0;
        }
    
        embaralharGrade();
    });

    const telaPretaTwo = document.getElementById('telaPreta_two');

    let telaPiscando = setInterval(() => {
                const dadoLuz = (Math.floor(Math.random() * 10) + 1)
                if (dadoLuz < 4) {
                    telaPretaTwo.style.opacity = '75%'
                    setTimeout(() => {
                        telaPretaTwo.style.opacity = '0%';
                    }, 100);
                } else if (dadoLuz < 7) {
                    telaPretaTwo.style.opacity = '50%';
                    setTimeout(() => {
                        telaPretaTwo.style.opacity = '0%';
                    }, 100)
                    setTimeout(() => {
                        telaPretaTwo.style.opacity = '50%'
                    }, 500)
                    setTimeout(() => {
                        telaPretaTwo.style.opacity = '0%'
                    }, 600)
                }
    }, 1000)


    // Funções de tablet

    let numeroCamera = 0;
    let nivelDeBarulho = 0;

    const divTabletCamera = document.getElementById('tela-tablet-camera');
    const cam1 = document.getElementById('CAM-button1');
    const cam2 = document.getElementById('CAM-button2')

    const musicBox = document.getElementById('musicBox');
    const musicBoxIMG = document.getElementById('musicBoxIMG');

    const controledShock = document.getElementById('controledShock');
    const controledShockIMG = controledShock.querySelector('img');

    const divPuppetButtons = document.getElementById('div-PuppetButtons');
    const divBabyButtons = document.getElementById('div-BabyButtons');
    divTabletCamera.removeChild(divBabyButtons)
    divTabletCamera.appendChild(divPuppetButtons)

    // controled shock ---------------------------------------

    const audioControledShock = document.createElement('audio');
    audioControledShock.src = './assets/audio/eletricShock.mp3'

    controledShock.addEventListener('click', () => {
        audioControledShock.play()
        controledShockIMG.src = './assets/ButtonControledShock_pressed.png';
        controledShock.disabled = true;
        setTimeout(() => {
            controledShockIMG.src = './assets/ButtonControledShock.png'
            controledShock.disabled = false
        }, 500);
    })

    // audio music box ---------------------------------------

    const musicBox_audio = document.createElement('audio');
    musicBox_audio.src = './assets/audio/musicBoxtiny.mp3'
    musicBox_audio.loop = true;

    cam1.addEventListener('click', () => {
        if (numeroCamera != 0) {
            divTabletCamera.removeChild(divBabyButtons);
            divTabletCamera.appendChild(divPuppetButtons);
            numeroCamera = 0;
            console.log(numeroCamera);
            musicBox_audio.play();
        }
    })

    cam2.addEventListener('click', () => {
        if (numeroCamera != 1) {
            divTabletCamera.removeChild(divPuppetButtons);
            divTabletCamera.appendChild(divBabyButtons);
            numeroCamera = 1;
            console.log(numeroCamera);
            musicBox_audio.pause()
        }
    })

    let indexofMusicBox = 7;
    const totalImages = 25;

    let intervalID = null;
    let reverseInterval = null;
    
    reverseInterval = setInterval(() => {
        indexofMusicBox--;
        if (indexofMusicBox < 0) {
            indexofMusicBox = 0
        }
        musicBoxIMG.src = `./assets/musicBoxRound/MusicBox${indexofMusicBox}.svg`;
    }, 3000)

    function atualizarImagem() {
        indexofMusicBox++
    
        if (indexofMusicBox == totalImages) {
            clearInterval(reverseInterval)
        }
        if (indexofMusicBox > totalImages) {
            indexofMusicBox = 25;
        }
        musicBoxIMG.src = `./assets/musicBoxRound/MusicBox${indexofMusicBox}.svg`;
    }
    
    musicBox.addEventListener('mousedown', () => {
        if (sistemaMusicBox) {
            if (intervalID) return;
            atualizarImagem();
            intervalID = setInterval(atualizarImagem, 500);
        }
    });

    musicBox.addEventListener('mouseup', () => {
        if (sistemaMusicBox) {
            clearInterval(intervalID)
            intervalID = null;
        }
    })

    musicBox.addEventListener('mouseleave', () => {
        if (sistemaMusicBox) {
            clearInterval(intervalID)
            intervalID = null;
        }
    })

    musicBox.addEventListener('touchstargreatt', (e) => {
        if (sistemaMusicBox) {
            e.preventDefault();
            if (intervalID) return;
            atualizarImagem();
            intervalID = setInterval(atualizarImagem, 500);
        }
    })

    musicBox.addEventListener('touchend', () => {
        if (sistemaMusicBox) {
            clearInterval(intervalID);
            intervalID = null;
        }
    });


    //Botões de tarefas

    const tarefaBoolsDiv1 = {
        tarefa1a1: false,
        tarefa1a2: false,
        tarefa1a3: false,
        tarefa1a4: false,
        tarefa1a5: false
    }

    const tarefaBoolsDiv2 = {
        tarefa2a1: false,
        tarefa2a2: false,
        tarefa2a3: false,
    }

    const tarefaBoolsDiv3 = {
        tarefa3a1: false,
        tarefa3a2: false,
        tarefa3a3: false,
    }

    const nomeDosLotesDiv1 = {
        lote1a1: 'order cups',
        lote1a2: 'order plates',
        lote1a3: 'order napkins',
        lote1a4: 'order utensils',
        lote1a5: 'order pizza kits'
    }

    const nomeDosLotesDiv2 = {
        lote2a1: 'print flyers',
        lote2a2: 'print posters',
        lote2a3: 'print menus',
    }

    const nomeDosLotesDiv3 = {
        lote3a1: 'unclog toilets',
        lote3a2: 'clean ovens',
        lote3a3: 'replace bulbs',
    }
    
    let permissao = false;
    let tarefaAtual = null;
    let currentInterval = null;
    let audioAtual = null;
    const botoestargreatefaDiv1 = {};
    const botoestargreatefaDiv2 = {};
    const botoestargreatefaDiv3 = {};

    function criarBotaoTarefa_div1(tarefaId, nomeDosLotesID, finalizar, tarefaBoolsID, numeroPorcentagem, audioTasks, botoesRef) {
        const botao = document.createElement('button')
        botao.classList.add('buttons-tasks');

        let porcentagem = 0;
        let numberLoadingBar = 1;
        let loadingBar = null;
        let loadingBarInterval = null;

        if (tarefaBoolsID[tarefaId] === true) {
            porcentagem = numeroPorcentagem;
        } else {
            botao.innerText = nomeDosLotesID
        }

        const resolverTempo = () => {
            return (typeof numeroPorcentagem === 'function')
            ? numeroPorcentagem() : numeroPorcentagem;
        }

        botao.addEventListener('click', () => {
            if (!sistemaTarefas) {
                const audioError = document.createElement('audio');
                audioError.src = './assets/audio/buttonFail.mp3';
                audioError.volume = 0.25;
                audioError.play();
                setTimeout(() => audioError.remove(), 3000);
                return;
            } else {
                if (tarefaAtual && tarefaAtual !== botao) {
                        if (audioTasks && !audioTasks.paused) {
                            audioTasks.pause();
                            audioTasks.currentTime = 0;
                        }
                        clearInterval(currentInterval)
                        clearInterval(loadingBarInterval);

                        const loadingImg = tarefaAtual.querySelector('.loadingButtons');
                        if (loadingImg) loadingImg.remove();
                        porcentagem = 0;
                    }
                    
                    if (!tarefaBoolsID[tarefaId]) {
                        tarefaAtual = botao;
                        porcentagem = 0;
                        numberLoadingBar = 1;
                        tarefaBoolsID[tarefaId] = false;
                        
                        if (!loadingBar) {
                            loadingBar = document.createElement('img') 
                            loadingBar.classList.add('loadingButtons')
                        }

                        botao.innerText = nomeDosLotesID
                        botao.appendChild(loadingBar)
                        
                        if (audioAtual && !audioAtual.paused) {
                            audioAtual.pause();
                            audioAtual.currentTime = 0;
                        }

                        audioAtual = audioTasks;
                        audioTasks.currentTime = 0;
                        audioTasks.loop = true;
                        audioTasks.play();
    
                    loadingBarInterval = setInterval(() => {
                        numberLoadingBar++
                        if (numberLoadingBar > 4) numberLoadingBar = 1;
                        loadingBar.src = `./assets/loadingTasks/loading${numberLoadingBar}.png`
                    }, 250)
    
                    currentInterval = setInterval(() => {
                        porcentagem++
                        const limite = resolverTempo();
                        if (porcentagem >= limite) {
                            clearInterval(currentInterval);
                            clearInterval(loadingBarInterval);

                            if (audioAtual) {
                                audioTasks.pause();
                                audioTasks.currentTime = 0;
                            }

                            tarefaBoolsID[tarefaId] = true;
                            tarefaAtual = null
                            if (loadingBar) loadingBar.remove();
                            verificaPermissao();
                            mostrarBotaoFinalizar(finalizar);
    
                            botao.classList.remove('buttons-tasks')
                            botao.classList.add('buttons-tasks-complete')
                        }
                    }, 1000)
                }
            }
        });
        botoesRef[tarefaId] = botao;
        return botao;
    }

    function mostrarBotaoFinalizar(finalizar) {
        if (permissao) {
            finalizar.classList.remove('deactivated');
        }
    }

    function verificaPermissao(params) {
        const todasConcluidasDiv1 = Object.values(tarefaBoolsDiv1).every(Boolean);
        const todasConcluidasDiv2 = Object.values(tarefaBoolsDiv2).every(Boolean);
        const todasConcluidasDiv3 = Object.values(tarefaBoolsDiv3).every(Boolean);

        if (todasConcluidasDiv1 && todasConcluidasDiv2 && todasConcluidasDiv3) {
            permissao = true
        }
    }

    function resetarTarefa() {
        if (currentInterval) {
            clearInterval(currentInterval)
            currentInterval = null;
        }
        if (audioAtual && !audioAtual.paused) {
            audioAtual.pause();
            audioAtual.currentTime = 0;
            audioAtual = null;
        }

        tarefaAtual = null;

        function resetGrupoTasks(tarefaBools, botoesRef, nomeLotes) {
            for (let tarefaId in tarefaBools) {
                if (!tarefaBools[tarefaId]) {
                    const botao = botoesRef[tarefaId];
                    if (!botao) continue
                    const loadingImg = botao.querySelector('.loadingButtons');
                    if (loadingImg) loadingImg.remove()
                }
            }
        }
        resetGrupoTasks(tarefaBoolsDiv1, botoestargreatefaDiv1, nomeDosLotesDiv1);
        resetGrupoTasks(tarefaBoolsDiv2, botoestargreatefaDiv2, nomeDosLotesDiv2);
        resetGrupoTasks(tarefaBoolsDiv3, botoestargreatefaDiv3, nomeDosLotesDiv3);
    }

    function toggleUpgrade(name) {
        let upgrades = JSON.parse(localStorage.getItem("upgradeFunctions"));
        upgrades[name] = !upgrades[name];
        localStorage.setItem("upgradeFunctions", JSON.stringify(upgrades));
        console.log(upgrades);
        return upgrades;
    }

    const terminalTela = document.getElementById('terminal-tela');

    const cateButtons_tasks = document.getElementById('cateButton-tasks');
    const cateButtons_heater = document.getElementById('cateButton-heater');
    const cateButtons_ventilation = document.getElementById('cateButton-ventilation');
    const cateButtons_audio = document.getElementById('cateButton-audio');

    const buttonUpgrades1 = document.getElementById('buttonUpgrades1');
    if (upgrades.xPrinter) buttonUpgrades1.style.display = 'none';
    const buttonUpgrades2 = document.getElementById('buttonUpgrades2');
    if (upgrades.hispd) buttonUpgrades2.style.display = 'none';
    const buttonUpgrades3 = document.getElementById('buttonUpgrades3');
    if (upgrades.handyman) buttonUpgrades3.style.display = 'none';

    buttonUpgrades1.addEventListener('click', () => {
        toggleUpgrade("xPrinter");
        buttonUpgrades1.style.display = 'none';
    })
    buttonUpgrades2.addEventListener('click', () => {
        toggleUpgrade("hispd");
        buttonUpgrades2.style.display = 'none';
    })
    buttonUpgrades3.addEventListener('click', () => {
        toggleUpgrade("handyman");
        buttonUpgrades3.style.display = 'none';
    })

    const TEMPO_BASE = { t1: 9, t2: 16, t3: 13 };
    const tempoTarefa1 = () => {
        const up = JSON.parse(localStorage.getItem("upgradeFunctions"))
        return up.xPrinter ? 1 : TEMPO_BASE.t1;
    }
    const tempoTarefa2 = () => {
        const up = JSON.parse(localStorage.getItem("upgradeFunctions"))
        return up.hispd ? 1 : TEMPO_BASE.t2;
    }
    const tempoTarefa3 = () => {
        const up = JSON.parse(localStorage.getItem("upgradeFunctions"))
        return up.handyman ? 1 : TEMPO_BASE.t3;
    }

    const telaBaixa = document.getElementById('telaBaixa');
    const teladetarefas = document.getElementById('telaDeTarefas');
    const bottomButtonBack = document.getElementById('bottom-button-back');
    const telaUpgrades = document.getElementById('telaUpgrades');
    const backToTasksButton = document.getElementById('backtoTasks');
    const telaHeater = document.getElementById('telaHeater');
    const telaVentilation = document.getElementById('telaVentilation');
    const telaAudio = document.getElementById('telaAudio');

    let telaAtiva = null;
    let tarefasCriadas = false 

    const audioPrinting = document.createElement('audio');
    audioPrinting.src = './assets/audio/printing.mp3';
    const audioItemOrder = document.createElement('audio')
    audioItemOrder.src = './assets/audio/itemOrder.mp3';
    const audioPrintingTwo = document.createElement('audio');
    audioPrintingTwo.src = './assets/audio/printingtwo.mp3';
    const finalizar = document.getElementById('finalizar');

    function abrirTarefas() {
        while (telaBaixa.firstChild) {
            telaBaixa.removeChild(telaBaixa.firstChild);
        }
        telaBaixa.appendChild(teladetarefas);
        
        bottomButtonBack.addEventListener('click', () => {
            while (telaBaixa.firstChild) {
                telaBaixa.removeChild(telaBaixa.firstChild);
            }
            telaBaixa.appendChild(telaUpgrades);
            telaAtiva = 'telaUpgrades';
            resetarTarefa();
        })
        
        verificaPermissao();
        if (permissao) {
            mostrarBotaoFinalizar(finalizar);
        }

        if (!tarefasCriadas) {
            const div1 = document.getElementById('order-suplies');
            const div2 = document.getElementById('advertising');
            const div3 = document.getElementById('maintenance')
    
            div1.appendChild(criarBotaoTarefa_div1('tarefa1a1', nomeDosLotesDiv1.lote1a1, finalizar, tarefaBoolsDiv1, tempoTarefa2, audioItemOrder, botoestargreatefaDiv1));
            div1.appendChild(criarBotaoTarefa_div1('tarefa1a2', nomeDosLotesDiv1.lote1a2, finalizar, tarefaBoolsDiv1, tempoTarefa2, audioItemOrder, botoestargreatefaDiv1));
            div1.appendChild(criarBotaoTarefa_div1('tarefa1a3', nomeDosLotesDiv1.lote1a3, finalizar, tarefaBoolsDiv1, tempoTarefa2, audioItemOrder, botoestargreatefaDiv1));
            div1.appendChild(criarBotaoTarefa_div1('tarefa1a4', nomeDosLotesDiv1.lote1a4, finalizar, tarefaBoolsDiv1, tempoTarefa2, audioItemOrder, botoestargreatefaDiv1));
            div1.appendChild(criarBotaoTarefa_div1('tarefa1a5', nomeDosLotesDiv1.lote1a5, finalizar, tarefaBoolsDiv1, tempoTarefa2, audioItemOrder, botoestargreatefaDiv1));
    
            div2.appendChild(criarBotaoTarefa_div1('tarefa2a1', nomeDosLotesDiv2.lote2a1, finalizar, tarefaBoolsDiv2, tempoTarefa1, audioPrintingTwo, botoestargreatefaDiv2));
            div2.appendChild(criarBotaoTarefa_div1('tarefa2a2', nomeDosLotesDiv2.lote2a2, finalizar, tarefaBoolsDiv2, tempoTarefa1, audioPrintingTwo, botoestargreatefaDiv2));
            div2.appendChild(criarBotaoTarefa_div1('tarefa2a3', nomeDosLotesDiv2.lote2a3, finalizar, tarefaBoolsDiv2, tempoTarefa1, audioPrintingTwo, botoestargreatefaDiv2));
    
            div3.appendChild(criarBotaoTarefa_div1('tarefa3a1', nomeDosLotesDiv3.lote3a1, finalizar, tarefaBoolsDiv3, tempoTarefa3, audioPrinting, botoestargreatefaDiv3));
            div3.appendChild(criarBotaoTarefa_div1('tarefa3a2', nomeDosLotesDiv3.lote3a2, finalizar, tarefaBoolsDiv3, tempoTarefa3, audioPrinting, botoestargreatefaDiv3));
            div3.appendChild(criarBotaoTarefa_div1('tarefa3a3', nomeDosLotesDiv3.lote3a3, finalizar, tarefaBoolsDiv3, tempoTarefa3, audioPrinting, botoestargreatefaDiv3));

            tarefasCriadas = true;
        }
    }

    cateButtons_tasks.addEventListener('click', () => {
        if (telaAtiva != "telaDeTarefas") {
            abrirTarefas();
            telaAtiva = "telaDeTarefas";
        }
        audioPressingButton.play()
    })
    backToTasksButton.addEventListener('click', () => {
        if (telaAtiva != "telaDeTarefas") {
            abrirTarefas();
            telaAtiva = "telaDeTarefas";
        }
        audioPressingButton.play()
    })

    function abrirAquecedor() {
        while (telaBaixa.firstChild) {
            telaBaixa.removeChild(telaBaixa.firstChild);
        }
        telaBaixa.appendChild(telaHeater);
        resetarTarefa();
    }

    cateButtons_heater.addEventListener('click', () => {
        if (telaAtiva != "telaAquecedor") {
            abrirAquecedor()
            telaAtiva = "telaAquecedor";
        }
        audioPressingButton.play()
    })

    function abrirVentilacao() {
        while (telaBaixa.firstChild) {
            telaBaixa.removeChild(telaBaixa.firstChild);
        }
        telaBaixa.appendChild(telaVentilation);
        resetarTarefa();
    }
    
    let temperatureOfTheRoom = 15;
    const minTemp = 15;
    const maxTemp = 45;
    const textTemperature = document.getElementById('textTemperature-100');
    const textTemperature1 = document.getElementById('textTemperature-10');
    const textTemperature2 = document.getElementById('textTemperature-1');
    textTemperature.innerText = `${temperatureOfTheRoom} C°`
    textTemperature1.innerText = `${temperatureOfTheRoom} C°`
    textTemperature2.innerText = `${temperatureOfTheRoom} C°`
    let HeaterSystem = true;
    let VentSystem = false;
    const butHeaterOn = document.getElementById('buttonHeater-on');
    const butHeaterOff = document.getElementById('buttonHeater-off');
    const butVentilationOn = document.getElementById('buttonVentilation-on');
    const butVentilationOff = document.getElementById('buttonVentilation-off');

    let terminalLigado = true

    function atualizarBotoes() {

        audioHeater.pause();
        audioVent.pause();

        butHeaterOn.classList.add('onOffButton-black');
        butHeaterOn.classList.remove('onOffButton-white');
        butHeaterOff.classList.add('onOffButton-white');
        butHeaterOff.classList.remove('onOffButton-black');

        butVentilationOn.classList.add('onOffButton-black');
        butVentilationOn.classList.remove('onOffButton-white');
        butVentilationOff.classList.add('onOffButton-white');
        butVentilationOff.classList.remove('onOffButton-black') 

        if (HeaterSystem) {
            audioHeater.play()
            butHeaterOn.classList.add('onOffButton-white');
            butHeaterOn.classList.remove('onOffButton-black');
            butHeaterOff.classList.add('onOffButton-black');
            butHeaterOff.classList.remove('onOffButton-white');
        } else if (VentSystem) {
            audioVent.play();
            butVentilationOn.classList.add('onOffButton-white');
            butVentilationOn.classList.remove('onOffButton-black');
            butVentilationOff.classList.add('onOffButton-black');
            butVentilationOff.classList.remove('onOffButton-white');
        }
    }

    function atualizarTemp() {
        if (VentSystem) {
            temperatureOfTheRoom--;
            if (temperatureOfTheRoom < minTemp) {
                temperatureOfTheRoom = minTemp;
            }
        } else if (HeaterSystem) {
            temperatureOfTheRoom++;
            if (temperatureOfTheRoom > maxTemp) {
                temperatureOfTheRoom = maxTemp;
            }
        }
        textTemperature.innerText = `${temperatureOfTheRoom} C°`
        textTemperature1.innerText = `${temperatureOfTheRoom} C°`
        textTemperature2.innerText = `${temperatureOfTheRoom} C°`

        const dadoIntervaloTemp = parseInt(Math.random() * 10);
        if (dadoIntervaloTemp > 5) {
            intervaloTemp = false
        } else {
            intervaloTemp = true
        }
        return intervaloTemp
    }

    let intervaloTemp
    let temperaturaResidual = false;
    let loopTemperatura 

    function temperaturaAmbiente() {
        if (temperaturaResidual) {
            clearInterval(loopTemperatura)
            loopTemperatura = null
            loopTemperatura = setInterval(() => {
                temperatureOfTheRoom += 1;
                if (temperatureOfTheRoom > maxTemp) temperatureOfTheRoom = maxTemp;
                textTemperature.innerText  = `${temperatureOfTheRoom.toFixed(1)} C°`;
                textTemperature1.innerText = `${temperatureOfTheRoom.toFixed(1)} C°`;
                textTemperature2.innerText = `${temperatureOfTheRoom.toFixed(1)} C°`;
                console.log('poco')
            }, 5000)
        } else {
            if (HeaterSystem && terminalLigado) {
                audioHeater.play();    
            } else if (VentSystem && terminalLigado) {
                audioVent.play();
            }
            clearInterval(loopTemperatura)
            loopTemperatura = null
            loopTemperatura = setInterval(() => {
                atualizarTemp()
                console.log('ponto')
            }, intervaloTemp ? 2000 : 2500)
        }
    }
    temperaturaAmbiente();

    butHeaterOn.addEventListener('click', () => {
        if (sistemaTemperatura) {
            HeaterSystem = true; 
            VentSystem = false;
            atualizarBotoes();
            audioPressingButtonTwo.play()
        }
    })
    butHeaterOff.addEventListener('click', () => {
        if (sistemaTemperatura){
            HeaterSystem = false
            atualizarBotoes();
            audioPressingButtonTwo.play()
        }
    })
    butVentilationOn.addEventListener('click', () => {
        if (sistemaTemperatura) {
            VentSystem = true;
            HeaterSystem = false; 
            atualizarBotoes(); 
            audioPressingButtonTwo.play()
        }
    })
    butVentilationOff.addEventListener('click', () => {
        if (sistemaTemperatura) {
            VentSystem = false;
            atualizarBotoes();
            audioPressingButtonTwo.play()
        }
    })
    atualizarBotoes();

    cateButtons_ventilation.addEventListener('click', () => {
        if (telaAtiva != "telaVentilacao") {
            abrirVentilacao();
            telaAtiva = "telaVentilacao"
        }
        audioPressingButton.play()
    })

    function atualizarBarulho() {
        nivelDeBarulho = 0;

        if (terminalLigado) nivelDeBarulho += 1;
        if (HeaterSystem) nivelDeBarulho =+ 1;
        if (tarefaAtual) nivelDeBarulho += 3;
        if (VentSystem) nivelDeBarulho =+ 2;

        if (nivelDeBarulho > 7) nivelDeBarulho = 7;
    }

    function abrirAudio() {
        while (telaBaixa.firstChild) {
            telaBaixa.removeChild(telaBaixa.firstChild);
        }
        telaBaixa.appendChild(telaAudio);
        resetarTarefa();
    }

    cateButtons_audio.addEventListener('click', () => {
        if (telaAtiva != "telaAudio") {
            abrirAudio();
            telaAtiva = "telaAudio";
        }
        audioPressingButton.play()
    })

    const divGrid = document.getElementById('grid');
    let salaDeAtracao;

    const gridSizeX = 7;
    const gridSizeY = 3;

    const blockedCell = [
        { x: 3, y: 1 }
    ]

    const grid = [];

    for (let rowIndex = 0; rowIndex < gridSizeY; rowIndex++) {
        const row = [];
        for (let cellIndex = 0; cellIndex < gridSizeX; cellIndex++) {
            const isBlocked = blockedCell.some(cell => cell.x === cellIndex && cell.y === rowIndex);
            if (isBlocked) {
                row.push(null)
            } else {
                row.push(Math.floor(1));
            }
        }
        grid.push(row)
    }

    const cellElements = [];
    const salaDoPlayer = { x: 3, y: 2 };

    for (let rowIndex = 0; rowIndex < gridSizeY; rowIndex++) {
        for(let cellIndex = 0; cellIndex < gridSizeX; cellIndex++) {
            const isBlocked = blockedCell.some(cell => cell.x === cellIndex && cell.y === rowIndex);
            if (!isBlocked) {
                const cellElement = document.createElement('button');
                cellElement.classList.add('cell');
                cellElement.style.gridColumn = cellIndex + 1;
                cellElement.style.gridRow = rowIndex + 1;
                divGrid.appendChild(cellElement);
                cellElements.push({ element: cellElement, x: cellIndex, y: rowIndex })

                cellElement.addEventListener('click', () => {
                    if (cellElement.classList.contains('cell-attack')) return;
                    audioPressingButtonTwo.play()
                    if (sistemaAudio) {
                        if (salaDeAtracao) {
                            ClassesDeAudioLures(salaDeAtracao.x, salaDeAtracao.y, 'cell');
                        }
                        if ((cellIndex === salaDoPlayer.x && rowIndex === salaDoPlayer.y)) {
                            return
                        }
                        salaDeAtracao = { x: cellIndex, y: rowIndex };
                        ClassesDeAudioLures(cellIndex, rowIndex, 'cell-audio-lure');                        
                    }
                })
            } else if (isBlocked) {
                const blockedElement = document.createElement('div');
                blockedElement.classList.add('blockedCell');
                blockedElement.style.gridColumn = cellIndex + 1; 
                blockedElement.style.gridRow = rowIndex + 1;

                divGrid.appendChild(blockedElement)
            }
        }
    }

    function alterarClasseSala(x, y, novaClasse) {
        const targetCell = cellElements.find(cell => cell.x === x && cell.y === y);
        if (targetCell) {
            targetCell.element.classList.add(novaClasse);
        } else {
            console.warn("A célula especificada não foi encontrada!");
        }
    }
    alterarClasseSala(salaDoPlayer.x, salaDoPlayer.y, 'cell-player')
    alterarClasseSala(2, 0, 'cell-attack')
    alterarClasseSala(4, 0, 'cell-attack')
    alterarClasseSala(2, 1, 'displayNone');
    alterarClasseSala(4, 1, 'displayNone')
    alterarClasseSala(2, 2, 'cell-attack')
    alterarClasseSala(4, 2, 'cell-attack')

    lastCell = [];
    function ClassesDeAudioLures(x, y, newClass) {
        lastCell.forEach(cell => {
            cell.element.classList.remove(newClass);
            cell.element.classList.add('cell');
            cell.element.querySelectorAll('.svg-audio-lure, .attracted-indicator').forEach(el => el.remove());
        })
        lastCell = [];

        const targetCell = cellElements.find(cell => cell.x === x && cell.y === y);
        if (targetCell) {
            const svgAudioLure = document.createElement('img');
            svgAudioLure.classList.add('svg-audio-lure');
            svgAudioLure.src = `./assets/volumeLure.svg`;
            const existingSvg = targetCell.element.querySelector('img');
            if (existingSvg) existingSvg.remove();

            targetCell.element.appendChild(svgAudioLure);
            targetCell.element.classList.add(newClass);

            lastCell.push(targetCell);
        }
        const adjacentCells = [
            { dx: -1, dy: 0 }, // esquerda
            { dx: 1, dy: 0 }, // direita
            { dx: 0, dy: -1 }, // cima
            { dx: 0, dy: 1 }  // baixo
        ];

        adjacentCells.forEach(({ dx, dy }) => {
            let alcance = 1; 

            if (x === 3 && y === 0 && (dx === -1 || dx === 1)) {
                alcance = 2
            }

            
            for (let i = 1; i <= alcance; i++) {
                const adjX = x + dx * i;
                const adjY = y + dy * i;

                if (adjX >= 0 && adjX < gridSizeX && adjY >= 0 && adjY < gridSizeY) {
                    const adjCell = cellElements.find(cell => cell.x === adjX && cell.y === adjY);
                    if (adjCell && !adjCell.element.classList.contains('cell-attack')) {
                        const svgAttracted = document.createElement('div');
                        svgAttracted.classList.add('attracted-indicator');

                        if (dx === -1) svgAttracted.classList.add('move-right');
                        if (dx === 1) svgAttracted.classList.add('move-left');
                        if (dy === -1) svgAttracted.classList.add('move-down');
                        if (dy === 1) svgAttracted.classList.add('move-up');

                        adjCell.element.appendChild(svgAttracted);
                        lastCell.push(adjCell);
                    }}}})

        setTimeout(() => {
            desativarAudioLures();
        }, 6000);
    }

    function desativarAudioLures() {
        lastCell.forEach(cell => {
            cell.element.classList.remove('cell-audio-lure', 'cell');
            cell.element.classList.add('cell');
            cell.element.querySelectorAll('.svg-audio-lure, .attracted-indicator').forEach(el => el.remove());
        });
        lastCell = [];
        salaDeAtracao = null;
    }

    let MoltenFreddyPosition = { x: 0, y: 0 };
    const MoltenFreddy = document.createElement('div');
    MoltenFreddy.classList.add('player');
    let SpringTrapPosition = { x: 6, y: 0 }
    const SpringTrap = document.createElement('div');
    SpringTrap.classList.add('player1')

    //posições de animatrônicos

    const posicoesIniciais = {
        molten: { ...MoltenFreddyPosition },
        springtrap: { ...SpringTrapPosition }
    }

    function getBlockedCells() {
        const blocked = [...blockedCell];
        cellElements.forEach(cellObj => {
            const { x, y, element } = cellObj;

            if (element.classList.contains('displayNone')) {
                blocked.push({x, y})
            } else if (element.classList.contains('cell-attack')){
                const finais = [
                    { x: 2, y: 2 },
                    { x: 4, y: 2}
                ]

                const pulaveis = [
                    { x: 2, y: 0 },
                    { x: 4, y: 0 }
                ]

                const isFinal = finais.some(c => c.x === x && c.y === y);
                const isPulavel = pulaveis.some(c => c.x === x && c.y === y)

                if (!isFinal && !isPulavel) blocked.push({ x, y });
            }
        });
        return blocked;
    }

    function encontrarCaminho(start, end, gridSizeX, gridSizeY, blockedCell) {
        const fila = [[start]];
        const visitados = new Set([`${start.x},${start.y}`]);

            const pulaveis = [
                { x: 2, y: 0 },
                { x: 4, y: 0 }
            ];

        while (fila.length > 0) {
            const caminho = fila.shift();
            const { x, y } = caminho[caminho.length - 1];

            if (x === end.x && y === end.y) return caminho;

            const direcoes = [
                { x: x + 1, y },
                { x: x - 1, y },
                { x, y: y + 1 },
                { x, y: y - 1 }
            ]

            for (let dir of direcoes) {

                let stepX = dir.x
                let stepY = dir.y;

                if (pulaveis.some(c => c.x === stepX && c.y === stepY)) {
                    if (stepY === y) {
                        stepX = stepX + (stepX > x ? 1 : -1);
                    }
                }

                if (
                    stepX >= 0 && stepX < gridSizeX &&
                    stepY >= 0 && stepY < gridSizeY &&
                    !blockedCell.some(cell => cell.x === stepX && cell.y === stepY) &&
                    !visitados.has(`${stepX},${stepY}`)
                ) {
                    visitados.add(`${stepX},${stepY}`);
                    fila.push([...caminho, { x: stepX, y: stepY }]);
                }
            }
        }
        return null;
    }

    function createAnimatronics(animatronic, animatronicPosition, gridSizeX, gridSizeY, type) {
        const intervaloAnimatronic = setInterval(() => {
            let newX = animatronicPosition.x;
            let newY = animatronicPosition.y;
            const dadoMov = Math.floor(Math.random() * 20);

            const blocked = getBlockedCells();

            if (salaDeAtracao) {
                    const adjacente =
                         Math.abs(animatronicPosition.x - salaDeAtracao.x) + Math.abs(animatronicPosition.y - salaDeAtracao.y) === 1;
                    if (adjacente) {
                        let chanceAtracao = type === "springtrap" ? 18 : 12;
                        if (Math.random() < chanceAtracao && !blockedCell.some(cell => cell.x === salaDeAtracao.x && cell.y === salaDeAtracao.y)) {
                            newX = salaDeAtracao.x;
                            newY = salaDeAtracao.y;
                        }
                    }
            }
            
            const caminho = encontrarCaminho(animatronicPosition, salaDoPlayer, gridSizeX, gridSizeY, blocked);

            // Molten Freddy
        if (type === "molten" && caminho && caminho.length > 1) {
            if (HeaterSystem) {
                // afastar do player com chance baixa
                if (dadoMov < 10) {
                    const caminhoAfastar = encontrarCaminho(animatronicPosition, posicoesIniciais.molten, gridSizeX, gridSizeY, blocked);
                    if (caminhoAfastar && caminhoAfastar.length > 1) {
                        newX = caminhoAfastar[1].x;
                        newY = caminhoAfastar[1].y;
                    }
                }
            } else if (dadoMov < 10) {
                newX = caminho[1].x;
                newY = caminho[1].y;
                // aproximar do player normalmente
            }
        }

        // Springtrap
        if (type === "springtrap" && caminho && caminho.length > 1) {
            atualizarBarulho();
            const chanceDeAproximar = nivelDeBarulho * 2;
                // aproximar se estiver havendo tarefa
                if (dadoMov < chanceDeAproximar) {
                    newX = caminho[1].x;
                    newY = caminho[1].y;
                } else if (dadoMov < 2) {
                    // afastar ocasionalmente
                    const caminhoAfastar = encontrarCaminho(animatronicPosition, posicoesIniciais.springtrap, gridSizeX, gridSizeY, blocked);
                    if (caminhoAfastar && caminhoAfastar.length > 1) {
                        newX = caminhoAfastar[1].x;
                        newY = caminhoAfastar[1].y;
                    }
            } else {
                // afastar com chance muito baixa
                if (dadoMov < 2) {
                    const caminhoAfastar = encontrarCaminho(animatronicPosition, posicoesIniciais.springtrap, gridSizeX, gridSizeY, blocked);
                    if (caminhoAfastar && caminhoAfastar.length > 1) {
                        newX = caminhoAfastar[1].x;
                        newY = caminhoAfastar[1].y;
                    }
                }
            }
        }

            if (!blocked.some(cell => cell.x === newX && cell.y === newY)) {
                // Atualiza a posição do animatrônico se a nova posição for válida
                animatronicPosition.x = newX;
                animatronicPosition.y = newY;
            }
        
                updateanimatronicPosition();
        }, 1000);

        function updateanimatronicPosition() {
            const previousCell = cellElements.find(cell => cell.x === animatronicPosition.oldX && cell.y === animatronicPosition.oldY);
                if (previousCell) previousCell.element.removeChild(animatronic);

                const blocked = getBlockedCells();
            if (blocked.some(cell => cell.x === animatronicPosition.x && cell.y === animatronicPosition.y)) {
                console.error("O animatrônico não poderá se mover para esta posição bloqueada!");
                return;
            }

            const targetCell = cellElements.find(cell => cell.x === animatronicPosition.x && cell.y === animatronicPosition.y)
            if (targetCell) targetCell.element.appendChild(animatronic);

            animatronicPosition.oldX = animatronicPosition.x;
            animatronicPosition.oldY = animatronicPosition.y;

            console.log(`Posição do animatrônico: (${animatronicPosition.x}, ${animatronicPosition.y})`);
        }
        function moverAnimatronico(event) {
            let newX = animatronicPosition.x;
            let newY = animatronicPosition.y;
    
            switch (event.key) {
                case 'w': if (animatronicPosition.y > 0) newY--; break;
                case 's': if (animatronicPosition.y < gridSizeY - 1) newY++; break;
                case 'a': if (animatronicPosition.x > 0) newX--; break;
                case 'd': if (animatronicPosition.x < gridSizeX - 1) newX++; break;
            }

            const blocked = getBlockedCells();
            const pulaveis = [
                { x: 2, y: 0},
                { x: 4, y: 0}
            ];

            if (pulaveis.some(c => c.x === newX && c.y === newY)) {
                if (newY === animatronicPosition.y) newX = newX + (newX > animatronicPosition.x ? 1 : -1);
            }

            if (!blocked.some(cell => cell.x === newX && cell.y === newY)) {
                    animatronicPosition.x = newX;
                    animatronicPosition.y = newY;
                    updateanimatronicPosition();
            }
        }
        document.addEventListener('keydown', moverAnimatronico);
    }
    
    
    createAnimatronics(MoltenFreddy, MoltenFreddyPosition, gridSizeX, gridSizeY, "molten");
    createAnimatronics(SpringTrap, SpringTrapPosition, gridSizeX, gridSizeY, "springtrap");



    telaBaixa.removeChild(telaHeater);
    telaBaixa.removeChild(telaVentilation);
    telaBaixa.removeChild(telaAudio);
    telaBaixa.removeChild(telaBaixa.firstElementChild)

    // Botões para mudar o terminal de ligado para desligado

    const displayTurnButtonsAll = document.querySelectorAll('.displayTurnButton');
    const DTBimg = document.querySelectorAll('.DTB-img');
    const audioTurnOn = document.createElement('audio');
    audioTurnOn.src = './assets/audio/turnOnTerminal.mp3'
    const audioTurnOff = document.createElement('audio');
    audioTurnOff.src = './assets/audio/turnOffTerminal.mp3'
    
    document.addEventListener('keydown', (event) => {
        if (event.key.toLowerCase() === 'x') {
            if (terminalLigado) {
                terminalLigado = false
                audioHeater.pause()
                audioVent.pause()
                audioTurnOff.play()
                audioTurnOff.volume = 0.25
                DTBimg.forEach(img => img.src = './assets/turnOnTerminalButton.svg')
                terminalTela.style.animation = 'desligarTela 250ms forwards';
                temperaturaResidual = true
                resetarTarefa()
                temperaturaAmbiente();
            } else {
                terminalLigado = true
                audioTurnOn.play()
                audioTurnOn.volume = 0.25
                DTBimg.forEach(img => img.src = './assets/turnOffTerminalButton.svg');
                terminalTela.style.animation = 'ligarTela 250ms forwards'
                temperaturaResidual = false
                resetarTarefa()
                temperaturaAmbiente();
            }
        }
    })

    displayTurnButtonsAll.forEach((button) => {

        button.addEventListener('click', () => {
            if (terminalLigado) {
                terminalLigado = false
                audioHeater.pause()
                audioVent.pause()
                audioTurnOff.play()
                audioTurnOff.volume = 0.25
                DTBimg.forEach(img => img.src = './assets/turnOnTerminalButton.svg')
                terminalTela.style.animation = 'desligarTela 250ms forwards';
                temperaturaResidual = true
                resetarTarefa()
                temperaturaAmbiente();
            } else {
                terminalLigado = true
                audioTurnOn.play()
                audioTurnOn.volume = 0.25
                DTBimg.forEach(img => img.src = './assets/turnOffTerminalButton.svg');
                terminalTela.style.animation = 'ligarTela 250ms forwards'
                temperaturaResidual = false
                resetarTarefa()
                temperaturaAmbiente();
            }
        })
    })

    finalizar.addEventListener('click', () => {
        clearInterval(oscilandoButtons);
        clearInterval(telaPiscando);
        clearInterval(intervalID)
        clearInterval(reverseInterval)
        clearInterval(currentInterval);
        clearInterval(intervaloTemp)
        clearInterval(loopTemperatura)
        let night = JSON.parse(localStorage.getItem("night")) || 0;
        night++;
        localStorage.setItem("night", JSON.stringify(night));


        slider.style.animation = 'jogoGanho 2s forwards'
        document.querySelectorAll('audio').forEach(audio => {
            audio.pause();
            audio.currentTime = 0
            audio.muted = true;
        })
        if (source) {
            source.stop();
        }
        setTimeout(() => {
            slider.remove()
            window.location.href = "shiftcomplete.html";
        }, 2100)
    })

});

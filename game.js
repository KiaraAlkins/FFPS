localStorage.setItem("night", JSON.stringify(1));
localStorage.setItem("money", JSON.stringify(100));
localStorage.setItem("upgradeFunctions", JSON.stringify({ xPrinter: false, hispd: false, handyman: false }));

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
            saladeatracao = null;
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


    let telaPiscando = setInterval(() => {
        if (posicaoAtual == 0) {
                const dadoLuz = (Math.floor(Math.random() * 10) + 1)
                if (dadoLuz < 4) {
                    gmSection_left.style.opacity = '75%'
                    setTimeout(() => {
                        gmSection_left.style.opacity = '100%';
                    }, 100);
                } else if (dadoLuz < 7) {
                    gmSection_left.style.opacity = '50%';
                    setTimeout(() => {
                        gmSection_left.style.opacity = '100%';
                    }, 100)
                    setTimeout(() => {
                        gmSection_left.style.opacity = '50%'
                    }, 500)
                    setTimeout(() => {
                        gmSection_left.style.opacity = '100%'
                    }, 600)
                }
        } else if (posicaoAtual == 2) {
                const dadoLuz = (Math.floor(Math.random() * 10) + 1)
                if (dadoLuz < 4) {
                    gmSection_right.style.opacity = '75%'
                    setTimeout(() => {
                        gmSection_right.style.opacity = '100%';
                    }, 100);
                } else if (dadoLuz < 7) {
                    gmSection_right.style.opacity = '50%';
                    setTimeout(() => {
                        gmSection_right.style.opacity = '100%';
                    }, 100)
                    setTimeout(() => {
                        gmSection_right.style.opacity = '50%'
                    }, 500)
                    setTimeout(() => {
                        gmSection_right.style.opacity = '100%'
                    }, 600)
                }
        } else if (posicaoAtual == 1) {
                const dadoLuz = (Math.floor(Math.random() * 10) + 1)
                if (dadoLuz < 4) {
                    gmSection_center.style.opacity = '75%'
                    setTimeout(() => {
                        gmSection_center.style.opacity = '100%';
                    }, 100);
                } else if (dadoLuz < 7) {
                    gmSection_center.style.opacity = '50%';
                    setTimeout(() => {
                        gmSection_center.style.opacity = '100%';
                    }, 100)
                    setTimeout(() => {
                        gmSection_center.style.opacity = '50%'
                    }, 500)
                    setTimeout(() => {
                        gmSection_center.style.opacity = '100%'
                    }, 600)
                }
        }
    }, 1000)


    // Funções de tablet

    let numeroCamera = 0;

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
                        tarefaBoolsID[tarefaId] = false;
                        porcentagem = 0;
                        numberLoadingBar = 1;
                        
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
                        if (porcentagem >= numeroPorcentagem) {
                            clearInterval(currentInterval);
                            clearInterval(loadingBarInterval);

                            if (audioAtual) {
                                audioTasks.pause();
                                audioTasks.currentInterval = 0;
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

    const terminalTela = document.getElementById('terminal-tela');

    const cateButtons_tasks = document.getElementById('cateButton-tasks');
    const cateButtons_heater = document.getElementById('cateButton-heater');
    const cateButtons_ventilation = document.getElementById('cateButton-ventilation');
    const cateButtons_audio = document.getElementById('cateButton-audio');

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
    
            div1.appendChild(criarBotaoTarefa_div1('tarefa1a1', nomeDosLotesDiv1.lote1a1, finalizar, tarefaBoolsDiv1, 1, audioItemOrder, botoestargreatefaDiv1));
            div1.appendChild(criarBotaoTarefa_div1('tarefa1a2', nomeDosLotesDiv1.lote1a2, finalizar, tarefaBoolsDiv1, 1, audioItemOrder, botoestargreatefaDiv1));
            div1.appendChild(criarBotaoTarefa_div1('tarefa1a3', nomeDosLotesDiv1.lote1a3, finalizar, tarefaBoolsDiv1, 1, audioItemOrder, botoestargreatefaDiv1));
            div1.appendChild(criarBotaoTarefa_div1('tarefa1a4', nomeDosLotesDiv1.lote1a4, finalizar, tarefaBoolsDiv1, 1, audioItemOrder, botoestargreatefaDiv1));
            div1.appendChild(criarBotaoTarefa_div1('tarefa1a5', nomeDosLotesDiv1.lote1a5, finalizar, tarefaBoolsDiv1, 1, audioItemOrder, botoestargreatefaDiv1));
    
            div2.appendChild(criarBotaoTarefa_div1('tarefa2a1', nomeDosLotesDiv2.lote2a1, finalizar, tarefaBoolsDiv2, 1, audioPrintingTwo, botoestargreatefaDiv2));
            div2.appendChild(criarBotaoTarefa_div1('tarefa2a2', nomeDosLotesDiv2.lote2a2, finalizar, tarefaBoolsDiv2, 1, audioPrintingTwo, botoestargreatefaDiv2));
            div2.appendChild(criarBotaoTarefa_div1('tarefa2a3', nomeDosLotesDiv2.lote2a3, finalizar, tarefaBoolsDiv2, 1, audioPrintingTwo, botoestargreatefaDiv2));
    
            div3.appendChild(criarBotaoTarefa_div1('tarefa3a1', nomeDosLotesDiv3.lote3a1, finalizar, tarefaBoolsDiv3, 1, audioPrinting, botoestargreatefaDiv3));
            div3.appendChild(criarBotaoTarefa_div1('tarefa3a2', nomeDosLotesDiv3.lote3a2, finalizar, tarefaBoolsDiv3, 1, audioPrinting, botoestargreatefaDiv3));
            div3.appendChild(criarBotaoTarefa_div1('tarefa3a3', nomeDosLotesDiv3.lote3a3, finalizar, tarefaBoolsDiv3, 1, audioPrinting, botoestargreatefaDiv3));

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

    function atualizarBotoes() {
        if (HeaterSystem) {
            butHeaterOn.classList.add('onOffButton-white');
            butHeaterOn.classList.remove('onOffButton-black');
            butHeaterOff.classList.add('onOffButton-black');
            butHeaterOff.classList.remove('onOffButton-white');

            butVentilationOn.classList.add('onOffButton-black');
            butVentilationOn.classList.remove('onOffButton-white');
            butVentilationOff.classList.add('onOffButton-white');
            butVentilationOff.classList.remove('onOffButton-black')
        } else if (VentSystem) {
            butVentilationOn.classList.add('onOffButton-white');
            butVentilationOn.classList.remove('onOffButton-black');
            butVentilationOff.classList.add('onOffButton-black');
            butVentilationOff.classList.remove('onOffButton-white');

            butHeaterOn.classList.add('onOffButton-black');
            butHeaterOn.classList.remove('onOffButton-white');
            butHeaterOff.classList.add('onOffButton-white');
            butHeaterOff.classList.remove('onOffButton-black');
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
            VentSystem = true;
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
            HeaterSystem = true;
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
    let saladeatracao;

    const gridSizeX = 5;
    const gridSizeY = 3;

    const blockedCell = [
        { x: 2, y: 1 }
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

    const salaDoPlayer = { x: 2, y: 2 };

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
                    audioPressingButtonTwo.play()
                    if (sistemaAudio) {
                        if (saladeatracao) {
                            ClassesDeAudioLures(saladeatracao.x, saladeatracao.y, 'cell');
                        }
                        if ((cellIndex === salaDoPlayer.x && rowIndex === salaDoPlayer.y)) {
                            return
                        }
                        saladeatracao = { x: cellIndex, y: rowIndex };
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
    alterarClasseSala(2, 2, 'cell-player')

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
            const adjX = x + dx;
            const adjY = y + dy;

            if (adjX >= 0 && adjX < gridSizeX && adjY >= 0 && adjY < gridSizeY) {
                const adjCell = cellElements.find(cell => cell.x === adjX && cell.y === adjY);
                if (adjCell) {
                    const svgAttracted = document.createElement('div');
                    svgAttracted.classList.add('attracted-indicator');

                    if (dx === -1) svgAttracted.classList.add('move-right');
                    if (dx === 1) svgAttracted.classList.add('move-left');
                    if (dy === -1) svgAttracted.classList.add('move-down');
                    if (dy === 1) svgAttracted.classList.add('move-up');

                    adjCell.element.appendChild(svgAttracted);
                    lastCell.push(adjCell);
                }
            }
        })
    }

    function desativarAudioLures() {
        lastCell.forEach(cell => {
            cell.element.classList.remove('cell-audio-lure', 'cell');
            cell.element.classList.add('cell');

            cell.element.querySelectorAll('.svg-audio-lure, .attracted-indicator').forEach(el => el.remove());
        });
        lastCell = [];
        saladeatracao = null;
    }

    telaBaixa.removeChild(telaHeater);
    telaBaixa.removeChild(telaVentilation);
    telaBaixa.removeChild(telaAudio);
    telaBaixa.removeChild(telaBaixa.firstElementChild)

    // Botões para mudar o terminal de ligado para desligado

    let terminalLigado = true

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
                audioTurnOff.play()
                audioTurnOff.volume = 0.25
                DTBimg.forEach(img => img.src = './assets/turnOnTerminalButton.svg')
                terminalTela.style.animation = 'desligarTela 250ms forwards';
                resetarTarefa()
                temperaturaResidual = false
                temperaturaAmbiente();
            } else {
                terminalLigado = true
                audioTurnOn.play()
                audioTurnOn.volume = 0.25
                DTBimg.forEach(img => img.src = './assets/turnOffTerminalButton.svg');
                terminalTela.style.animation = 'ligarTela 250ms forwards'
                resetarTarefa()
                temperaturaResidual = true
                temperaturaAmbiente();
            }
        }
    })

    displayTurnButtonsAll.forEach((button) => {

        button.addEventListener('click', () => {
            if (terminalLigado) {
                terminalLigado = false
                audioTurnOff.play()
                audioTurnOff.volume = 0.25
                DTBimg.forEach(img => img.src = './assets/turnOnTerminalButton.svg')
                terminalTela.style.animation = 'desligarTela 250ms forwards';
                resetarTarefa()
            } else {
                terminalLigado = true
                audioTurnOn.play();
                audioTurnOn.volume = 0.25
                DTBimg.forEach(img => img.src = './assets/turnOffTerminalButton.svg');
                terminalTela.style.animation = 'ligarTela 250ms forwards'
                resetarTarefa()
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
        console.log('GameWin')
    })

});

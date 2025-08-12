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

    botaoHorizontal.addEventListener('click', () => {
        if (telaTabletLigada) {
            telaTabletLigada = false
            telaTablet.style.transition = 'top 0.25s ease';
            telaTablet.style.top = '150%'
            setTimeout(() => {
                telaTablet.style.display = 'none'
            }, 500)
        } else {
            telaTabletLigada = true;
            telaTablet.style.transition = 'top 0.25 ease';
            telaTablet.style.display = 'flex'
            telaTablet.style.top = '150%'
            const audioTabletCamera = document.createElement('audio');
            audioTabletCamera.src = './assets/audio/monitorPulled.mp3';
            audioTabletCamera.play();
            setTimeout(() => {
                audioTabletCamera.remove();
            }, 3000);
            requestAnimationFrame(() => {
            telaTablet.style.top = '45%'; // posição final (visível)
        })
        }
    })

    setInterval(() => {
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

    const divPuppetButtons = document.getElementById('div-PuppetButtons');
    const divBabyButtons = document.getElementById('div-BabyButtons');
    divTabletCamera.removeChild(divBabyButtons)
    divTabletCamera.appendChild(divPuppetButtons)

    cam1.addEventListener('click', () => {
        if (numeroCamera != 0) {
            divTabletCamera.removeChild(divBabyButtons);
            divTabletCamera.appendChild(divPuppetButtons);
            numeroCamera = 0;
            console.log(numeroCamera);
        }
    })

    cam2.addEventListener('click', () => {
        if (numeroCamera != 1) {
            divTabletCamera.removeChild(divPuppetButtons);
            divTabletCamera.appendChild(divBabyButtons);
            numeroCamera = 1;
            console.log(numeroCamera);
        }
    })

    let indexofMusicBox = 5;
    const totalImages = 24;

    let intervalID = null;

    function atualizarImagem() {
        indexofMusicBox++
    
        if (indexofMusicBox > totalImages) {
            indexofMusicBox = 1;
        }
        musicBoxIMG.src = `./assets/musicBoxRound/MusicBox${indexofMusicBox}.svg`;
    }
    
    musicBox.addEventListener('mousedown', () => {
        if (intervalID) return;
        atualizarImagem();
        intervalID = setInterval(atualizarImagem, 500);
    });

    musicBox.addEventListener('mouseup', () => {
        clearInterval(intervalID)
        intervalID = null;
    })

    musicBox.addEventListener('mouseleave', () => {
        clearInterval(intervalID)
        intervalID = null;
    })

    musicBox.addEventListener('touchstart', (e) => {
        e.preventDefault();
        if (intervalID) return;
        atualizarImagem();
        intervalID = setInterval(atualizarImagem, 500);
    })

    musicBox.addEventListener('touchend', () => {
        clearInterval(intervalID);
        intervalID = null;
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
    const botoesTarefaDiv1 = {};

    function criarBotaoTarefa_div1(tarefaId, nomeDosLotesID, finalizar, tarefaBoolsID) {
        const botao = document.createElement('button')
        botao.classList.add('buttons-tasks');

        let porcentagem = 0;
        let numberLoadingBar = 1;
        let loadingBar = null;

        if (tarefaBoolsID[tarefaId] === true) {
            porcentagem = 100;
            botao.display = 'none';
        } else {
            botao.innerText = nomeDosLotesID
        }

        botao.addEventListener('click', () => {
            if (tarefaAtual && tarefaAtual !== botao) {
                    clearInterval(currentInterval)
                    const loadingImg = tarefaAtual.querySelector('.loadingButtons');
                    if (loadingImg) loadingImg.remove();
                    porcentagem = 0
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

                currentInterval = setInterval(() => {
                    porcentagem++
                    numberLoadingBar++;
                    if (numberLoadingBar > 4) numberLoadingBar = 1;

                    loadingBar.src = `./assets/loadingTasks/loading${numberLoadingBar}.png`

                    if (porcentagem >= 100) {
                        clearInterval(currentInterval);
                        tarefaBoolsID[tarefaId] = true;
                        tarefaAtual = null
                        if (loadingBar) loadingBar.remove();
                        verificaPermissao();
                        mostrarBotaoFinalizar(finalizar);
                    }
                }, 100)
            }
        });
        botoesTarefaDiv1[tarefaId] = botao;
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

    const terminalTela = document.getElementById('terminal-tela');

    const cateButtons_tasks = document.getElementById('cateButton-tasks');
    const cateButtons_heater = document.getElementById('cateButton-heater');
    const cateButtons_ventilation = document.getElementById('cateButton-ventilation');
    const cateButtons_audio = document.getElementById('cateButton-audio');

    const telaBaixa = document.getElementById('telaBaixa');
    const teladetarefas = document.getElementById('telaDeTarefas');

    let telaAtiva = null;

    function abrirTarefas() {
        while (telaBaixa.firstChild) {
            telaBaixa.removeChild(telaBaixa.firstChild);
        }
        telaBaixa.appendChild(teladetarefas);
        
        const finalizar = document.getElementById('finalizar');
        verificaPermissao();

        const div1 = document.getElementById('order-suplies');
        const div2 = document.getElementById('advertising');
        const div3 = document.getElementById('maintenance')
        if (permissao) {
            mostrarBotaoFinalizar(finalizar);
        }

        div1.appendChild(criarBotaoTarefa_div1('tarefa1a1', nomeDosLotesDiv1.lote1a1, finalizar, tarefaBoolsDiv1));
        div1.appendChild(criarBotaoTarefa_div1('tarefa1a2', nomeDosLotesDiv1.lote1a2, finalizar, tarefaBoolsDiv1));
        div1.appendChild(criarBotaoTarefa_div1('tarefa1a3', nomeDosLotesDiv1.lote1a3, finalizar, tarefaBoolsDiv1));
        div1.appendChild(criarBotaoTarefa_div1('tarefa1a4', nomeDosLotesDiv1.lote1a4, finalizar, tarefaBoolsDiv1));
        div1.appendChild(criarBotaoTarefa_div1('tarefa1a5', nomeDosLotesDiv1.lote1a5, finalizar, tarefaBoolsDiv1));

        div2.appendChild(criarBotaoTarefa_div1('tarefa2a1', nomeDosLotesDiv2.lote2a1, finalizar, tarefaBoolsDiv2));
        div2.appendChild(criarBotaoTarefa_div1('tarefa2a2', nomeDosLotesDiv2.lote2a2, finalizar, tarefaBoolsDiv2));
        div2.appendChild(criarBotaoTarefa_div1('tarefa2a3', nomeDosLotesDiv2.lote2a3, finalizar, tarefaBoolsDiv2));

        div3.appendChild(criarBotaoTarefa_div1('tarefa3a1', nomeDosLotesDiv3.lote3a1, finalizar, tarefaBoolsDiv3));
        div3.appendChild(criarBotaoTarefa_div1('tarefa3a2', nomeDosLotesDiv3.lote3a2, finalizar, tarefaBoolsDiv3));
        div3.appendChild(criarBotaoTarefa_div1('tarefa3a3', nomeDosLotesDiv3.lote3a3, finalizar, tarefaBoolsDiv3));
    }

    cateButtons_tasks.addEventListener('click', () => {
        if (telaAtiva != "telaDeTarefas") {
            abrirTarefas();
            telaAtiva = "telaDeTarefas";
        }
    })

});

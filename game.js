document.addEventListener("DOMContentLoaded", () => {
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
            requestAnimationFrame(() => {
            telaTablet.style.top = '45%'; // posição final (visível)
        })
        }
    })

    setInterval(() => {
        if (posicaoAtual == 0) {
                const dadoLuz = (Math.floor(Math.random() * 10) + 1)
                console.log(dadoLuz);
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
                console.log(dadoLuz);
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
                console.log(dadoLuz);
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

    const musicBox = document.getElementById('musicBox');
    const musicBoxIMG = document.getElementById('musicBoxIMG');

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
});

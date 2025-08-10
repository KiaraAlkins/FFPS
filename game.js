document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector('.game-night_slider');

    // aplica a posição inicial sem animação
    slider.style.transition = 'none';
    slider.style.transform = 'translateX(-100%)';
    
    // força reflow e então reativa a transição
    requestAnimationFrame(() => {
        slider.style.transition = 'transform 0.3s ease-in-out';
    });

    let posicaoAtual = 1;
    const botaoDireita = document.querySelectorAll('.buttonGameNight')[1];
    const botaoEsquerda = document.querySelectorAll('.buttonGameNight')[0];

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
});

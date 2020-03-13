function iniciaJogo() {
    var url = window.location.search;
    var nivel_jogo = url.replace("?", "");
    var tempo_segundos; //Esta variável armazerará um a quantidade de segundos que o usuário terá para estourar os balões.
    //Para nível 1 120s
    //Para nível 2 60s
    //Para nível 3 30s
    if(nivel_jogo == 1) {
        tempo_segundos = 120;
    }
    if(nivel_jogo == 2) {
        tempo_segundos = 60;
    }
    if(nivel_jogo == 3) {
        tempo_segundos = 30;
    }

    //Inserindo segundos na imagem do cronometro(na tag span)
    document.getElementById('cronometro').innerHTML = tempo_segundos;

    //Definição da quantidade de balões
    var qtd_baloes = 20;
    cria_baloes(qtd_baloes);

    //Impressão da quantidade de balões inteiros e estourados
    document.getElementById('baloes_inteiros').innerHTML = qtd_baloes;
    document.getElementById('baloes_estourados').innerHTML = 0;
}

function cria_baloes(qtd_baloes) {
    for(var i = 1; i <= qtd_baloes; i++) {
        var balao = document.createElement("img");
        balao.src = 'imagens/balao_azul_pequeno.png';

        document.getElementById('cenario').appendChild(balao);
        balao.style.margin = '10px';
    }
}
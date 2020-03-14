var timerId = null; //variável q armazena a chamada da função setTimeout

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
    var qtd_baloes = 80;
    cria_baloes(qtd_baloes);

    //Impressão da quantidade de balões inteiros e estourados
    document.getElementById('baloes_inteiros').innerHTML = qtd_baloes;
    document.getElementById('baloes_estourados').innerHTML = 0;

    contagem_tempo(tempo_segundos + 1);
}

function cria_baloes(qtd_baloes) {
    for(var i = 1; i <= qtd_baloes; i++) {
        var balao = document.createElement("img");
        balao.style.margin = '10px';
        balao.src = 'imagens/balao_azul_pequeno.png';
        balao.onclick = function(){estourar(this);}//os eventos startam uma func anonima, aqui estamos usando-a para chamar a func estourar q passa como parametro o próprio elemento com o uso do this
        balao.id = 'b' + i;

        document.getElementById('cenario').appendChild(balao);
    }
}

function contagem_tempo(segundos) {
    segundos = segundos - 1;

    //Lógica para quando o cronometro chega a 0
    if(segundos == -1) {
        clearTimeout(timerId); //Interrompe a execução da func setTimeout
        gameOver();
        return false;
    }

    document.getElementById('cronometro').innerHTML = segundos;

    //A função setTime recebe dois parametros, uma função e uma variável, o tempo passado é interpretado como milisegundos e a cada milisegundos passados a função passada será chamada
    timerId = setTimeout("contagem_tempo("+segundos+")", 1000);    
}

function estourar(e) {
    var id_balao = e.id;

    document.getElementById(id_balao).setAttribute("onclick", "");
    document.getElementById(id_balao).src = 'imagens/balao_azul_pequeno_estourado.png';

    pontuacao(-1);
}

//Seta a quantidade de balões inteiros e de balões estourados
function pontuacao(acao){
    var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
    var baloes_estourados = document.getElementById('baloes_estourados').innerHTML;
    
    baloes_inteiros = parseInt(baloes_inteiros);
    baloes_estourados = parseInt(baloes_estourados);

    baloes_inteiros = baloes_inteiros + acao;
    baloes_estourados = baloes_estourados - acao;

    document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
    document.getElementById('baloes_estourados').innerHTML = baloes_estourados;

    situacao_jogo(baloes_inteiros);
}

function situacao_jogo(baloes_inteiros) {
    if(baloes_inteiros == 0) {
        alert('parabéns você conseguiu estourar todos os balões a tempo :D');
        parar_jogo();
    }
}

//Função necessária para encerrar a func setTimeout em caso de vitória
function parar_jogo() {
    clearTimeout(timerId);
    }

function gameOver() {
    alert('Fim de jogo, você não conseguiu estourar todos os balões a tempo');
    remove_eventos_baloes();
}

function remove_eventos_baloes() {
    var i = 1; //contador para recuperar balões por id
    
    //percorre o lementos de acordo com o id e só irá sair do laço quando não houver correspondência com elemento
    while(document.getElementById('b'+i)) {
        //retira o evento onclick do elemnto
        document.getElementById('b'+i).onclick = '';
        i++; //faz a iteração da variávei i
    }
}
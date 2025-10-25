let startTime;
let timerInterval;

function start() 
{
    $("#inicio").hide();
    
	$("#fundoGame").append("<div id='jogador' class='anima1'></div>");
	$("#fundoGame").append("<div id='inimigo1' class='anima2'></div>");
	$("#fundoGame").append("<div id='inimigo2'></div>");
    $("#fundoGame").append("<div id='moeda' class='anima3'></div>");
    $("#fundoGame").append("<div id='placar'></div>");
    $("#fundoGame").append("<div id='energia'></div>");
    $("#fundoGame").append("<div id='vida'></div>");
    
    var posicaoY = parseInt(Math.random() * 500) // inimigo 1
    var posicaoY1 = parseInt(Math.random() * 500) // moeda
    var posicaoY2 = parseInt(Math.random() * 334) // inimigo 2
    var posicaoY3 = parseInt(Math.random() * 500) // vida

    // Score
    var pontos = 0

    // Energia
    var energiaAtual = 3

    var jogo = {}
    var fimDeJogo = false

    // Helicóptero
    var velocidade = 5
    var velocidade2 = 5
    var podeAtirar = true
    
    // Som
    var somDisparo=document.getElementById("somDisparo");
    var somExplosao=document.getElementById("somExplosao");
    var musica=document.getElementById("musica");
    var somGameover=document.getElementById("somGameover");
    var somResgate=document.getElementById("somResgate");

    // Música de Fundo em Loop
    musica.addEventListener("ended", function(){ musica.currentTime = 0; musica.play(); }, false);
    musica.play();

    // Teclas
    var TECLA = 
    {
        W: 87,
        S: 83,
        D: 68
    }
    
    jogo.pressionou = [];

    // Verifica se o usuário pressionou alguma tecla.	
    $(document).keydown(function(e)
    {
        jogo.pressionou[e.which] = true;
    });
    
    $(document).keyup(function(e)
    {
        jogo.pressionou[e.which] = false;
    });
	
	// Game Loop
	jogo.timer = setInterval(loop, 30);

    function loop() 
    {
        moveFundo();
        moveJogador();
        moveInimigo1();
        moveInimigo2();
        moveMoeda();
        colisao();
        placar();
        energia();
        movevida();
	} // Fim da Função Loop

    // Função que movimenta o fundo do jogo
    function moveFundo() 
    {
	    let esquerda = parseInt($("#fundoGame").css("background-position")); // parseInt - Converte uma String em um Inteiro.
	    $("#fundoGame").css("background-position", esquerda - 1);
    } // Fim da Função moveFundo
    
    function moveJogador() 
    {
        if (jogo.pressionou[TECLA.W]) 
        {
            let topo = parseInt($("#jogador").css("top"));
            $("#jogador").css("top", topo - 13);
                if (topo<=10) 
                {
                    $("#jogador").css("top", topo + 13);
                }
        }
        
        if (jogo.pressionou[TECLA.S]) 
        {
            let topo = parseInt($("#jogador").css("top"));
            $("#jogador").css("top",topo + 13);
            
            if (topo >= 500) {	
                $("#jogador").css("top",topo-13);
            }
        }
        
        if (jogo.pressionou[TECLA.D]) 
        {    
            disparo()	
        }
    } // Fim da Função moveJogador

    function moveInimigo1() 
    {
        let posicaoX = parseInt($("#inimigo1").css("left"));
        
        $("#inimigo1").css("left", posicaoX - velocidade);
        $("#inimigo1").css("top", posicaoY);
        
        if (posicaoX<=0) 
        {
            posicaoY = parseInt(Math.random() * 500);
            $("#inimigo1").css("left", 900);
            $("#inimigo1").css("top", posicaoY);        
        }
    } // Fim da Função moveInimigo1

    function moveInimigo2() 
    {
        
        let posicaoX = parseInt($("#inimigo2").css("left"));
        
        $("#inimigo2").css("left", posicaoX - velocidade2);
        $("#inimigo2").css("top", posicaoY2);
                    
        if (posicaoX<=0) 
            {
                posicaoY2 = parseInt(Math.random() * 334);
                $("#inimigo2").css("left", 900);
                $("#inimigo2").css("top", posicaoY2);        
            }   
    } 
    // Fim da Função moveInimigo2

    function moveMoeda() 
    {
        
        let posicaoX = parseInt($("#moeda").css("left"));
        
        $("#moeda").css("left", posicaoX - 5);
        $("#moeda").css("top", posicaoY1);
                    
        if (posicaoX<=15) 
            {
                posicaoY1 = parseInt(Math.random() * 500);
                $("#moeda").css("left", 900);
                $("#moeda").css("top");        
            }   
    }

    function movevida() 
    {
        
        let posicaoX = parseInt($("#vida").css("left"));
        
        $("#vida").css("left", posicaoX - 5);
        $("#vida").css("top", posicaoY3);
                    
        if (posicaoX<=15) 
            {
                posicaoY3 = parseInt(Math.random() * 500);
                $("#vida").css("left", 900);
                $("#vida").css("top");        
            }   
    }

    function disparo() 
    {
	
        if (podeAtirar == true) 
        {
            somDisparo.play();
            podeAtirar = false;
        
            let topo = parseInt($("#jogador").css("top"))
            let posicaoX= parseInt($("#jogador").css("left"))
            let tiroX = posicaoX + 100;
            let topoTiro= topo + 25;
        
            $("#fundoGame").append("<div id='disparo'></div");
            $("#disparo").css("top", topoTiro);
            $("#disparo").css("left", tiroX);
            
            // Tempo para atirar
            var tempoDisparo = window.setInterval(executaDisparo, 5);
        } 
     
        function executaDisparo() {
            let posicaoX = parseInt($("#disparo").css("left"));
            
            $("#disparo").css("left", posicaoX + 8); // Velocidade que o disparo anda
            
            if (posicaoX > 900) 
            { 
                window.clearInterval(tempoDisparo);
                tempoDisparo = null;
                $("#disparo").remove();
                podeAtirar=true;
            }
        }
    }
    
    function colisao() 
    {
        var colisao1 = ($("#jogador").collision($("#inimigo1")));
        var colisao2 = ($("#jogador").collision($("#inimigo2")));
        var colisao3 = ($("#disparo").collision($("#inimigo1")));
        var colisao4 = ($("#disparo").collision($("#inimigo2")));
        var colisao5 = ($("#jogador").collision($("#moeda")));
        var colisao6 = ($("#jogador").collision($("#vida")));
        
        // Jogador com o inimigo 1
        if (colisao1.length > 0) 
        { 
            pontos -= 100
            energiaAtual--;   
            
            let inimigo1X = parseInt($("#inimigo1").css("left"));
            let inimigo1Y = parseInt($("#inimigo1").css("top"));
            
            explosao1(inimigo1X,inimigo1Y);
        
            posicaoY = parseInt(Math.random() * 500);
    
            $("#inimigo1").css("left", 694);
            $("#inimigo1").css("top", posicaoY);
        }

        // Jogador com o inimigo 2 
        if (colisao2.length>0) 
        {
            pontos -= 200
            energiaAtual--;

            let inimigo2X = parseInt($("#inimigo2").css("left"));
            let inimigo2Y = parseInt($("#inimigo2").css("top"));
        
            explosao2(inimigo2X, inimigo2Y);
                
            $("#inimigo2").remove();
            
            reposicionaInimigo2();
        }	

        // Disparo com o Inimigo 1
        if (colisao3.length>0) 
        {	
            pontos += 50;
            velocidade += +0.3; // stack de velocidade inimigo 1

            let inimigo1X = parseInt($("#inimigo1").css("left"));
            let inimigo1Y = parseInt($("#inimigo1").css("top"));
                
            explosao1(inimigo1X,inimigo1Y);
            $("#disparo").css("left", 950);
                
            posicaoY = parseInt(Math.random() * 500);
            $("#inimigo1").css("left", 694);
            $("#inimigo1").css("top", posicaoY);
        }

        // Disparo com o Inimigo 2	
        if (colisao4.length>0) 
        {
            pontos += 100;
            velocidade2 += +0.6 // stack de velocidade inimigo 2
            
            let inimigo2X = parseInt($("#inimigo2").css("left"));
            let inimigo2Y = parseInt($("#inimigo2").css("top"));
            $("#inimigo2").remove();
        
            explosao2(inimigo2X,inimigo2Y);
            $("#disparo").css("left",950);
            
            reposicionaInimigo2();
        }

        // Jogador com a Moeda
        if (colisao5.length > 0) 
        {
            pontos += 550;
            somResgate.play();

            reposicionaMoeda();
            $("#moeda").remove();
        }

        // Jogador com Vida
        if (colisao6.length > 0) 
        { 
            if (energiaAtual < 3){
            energiaAtual +=1;   }
            pontos += 400;
            somResgate.play();

            reposicionavida();
            $("#vida").remove();

        }

    } // Fim da Colisão.

    function explosao1(inimigo1X, inimigo1Y) 
    {
        
        somExplosao.play();

        $("#fundoGame").append("<div id='explosao1'></div");
        $("#explosao1").css("background-image", "url(img/explosao.png)");
        
        var div = $("#explosao1");
        
        div.css("top", inimigo1Y);
        div.css("left", inimigo1X);
        div.animate({width:200, opacity:0}, "slow");
        
        // Removendo a explosão.
        var tempoExplosao = window.setInterval(removeExplosao, 1000);
        
        function removeExplosao() 
        {
            div.remove();
            window.clearInterval(tempoExplosao);
            tempoExplosao = null;
        }
    } // Fim explosao1

    // Explosão2
    function explosao2(inimigo2X, inimigo2Y)
    {
        somExplosao.play();
        
        $("#fundoGame").append("<div id='explosao2'></div");
        $("#explosao2").css("background-image", "url(img/explosao.png)");
    
        var div2=$("#explosao2");
    
        div2.css("top", inimigo2Y);
        div2.css("left", inimigo2X);
        div2.animate({width:200, opacity:0}, "slow");
    
        var tempoExplosao2 = window.setInterval(removeExplosao2, 1000);
    
        function removeExplosao2() 
        {
            div2.remove();
            window.clearInterval(tempoExplosao2);
            tempoExplosao2 = null;
        }
    } // fim explosao2
    
    // Explosão3
    function explosao3(moedaX, moedaY) 
    {
        somPerdido.play();

        $("#fundoGame").append("<div id='explosao3' class='anima4'></div");
        $("#explosao3").css("top", moedaY);
        $("#explosao3").css("left", moedaX);
    
        var tempoExplosao3 = window.setInterval(resetaExplosao3, 1000);
        
        function resetaExplosao3() 
        {
            $("#explosao3").remove();
            window.clearInterval(tempoExplosao3);
            tempoExplosao3 = null;   
        }    
    } // Fim explosao3
        
    // Reposiciona Inimigo 2
    function reposicionaInimigo2() 
    {
        var tempoColisao4 = window.setInterval(reposiciona4, 2250); // tempo de respwam inimigo 2
            
        function reposiciona4() 
        {
            window.clearInterval(tempoColisao4);
            tempoColisao4 = null;
                
            if (fimDeJogo == false) 
            {
                $("#fundoGame").append("<div id=inimigo2></div");
            }      
        }	
    }	
    
    // Reposiciona Moeda
    function reposicionaMoeda() 
    {
        var tempoMoeda = window.setInterval(reposiciona6, 5000); // tempo de respwam moeda
        
        function reposiciona6() 
        {
            window.clearInterval(tempoMoeda);
            tempoMoeda = null;
        
            if (fimDeJogo == false) 
            {
                $("#fundoGame").append("<div id='moeda' class='anima3'></div>");
            }
        }
    }  // Fim da função reposicionaMoeda()

    function reposicionavida() 
    {
        var tempoVida = window.setInterval(reposiciona7, 30000); // tempo de respwam moeda
        
        function reposiciona7() 
        {
            window.clearInterval(tempoVida);
            tempoVida = null;
        
            if (fimDeJogo == false) 
            {
                $("#fundoGame").append("<div id='vida'></div>");
            }
        }
    }

    function placar() 
    {
        $("#placar").html("<h2> Pontos: " + pontos  + "</h2>");
    } // Fim da Função placar

    // Energia
    function energia() 
    {
        if (energiaAtual == 3) 
        {
            $("#energia").css("background-image", "url(img/Vidas-3.png)");
        }

        if (energiaAtual == 2) 
        {
            $("#energia").css("background-image", "url(img/Vidas-2.png)");
        }

        if (energiaAtual == 1) 
        {    
            $("#energia").css("background-image", "url(img/Vidas-1.png)");
        }

        if (energiaAtual == 0) 
        {    
            $("#energia").css("background-image", "url(img/Vidas-0.png)");   
            
            // Game Over
            gameOver()
        }
    } // Fim energia

    // Game Over
   function gameOver() {
    fimDeJogo = true;
    musica.pause();
    somGameover.play();

    window.clearInterval(jogo.timer);
    jogo.timer = null;

    // Pega o tempo final ANTES de montar o HTML
    const finalTime = (Date.now() - startTime) / 1000;
    const tempoFormatado = finalTime.toFixed(2); // Formata para 1 casa decimal

    $("#jogador").remove();
    $("#inimigo1").remove();
    $("#inimigo2").remove();
    $("#moeda").remove();
    $("#vida").remove();

    $("#fundoGame").append("<div id='fim'></div>");

    
    $("#fim").html("<h1> Game Over </h1>" +
                   "<p>Pontuação: " + pontos + "</p>" +
                   "<p>Tempo: " + tempoFormatado + " segundos</p>" + 
                   "<div id='reinicia' onClick=reiniciaJogo()><h3>Jogar Novamente</h3></div>"); 

    clearInterval(timerInterval);

}

    // Inicia o timer
    startTime = Date.now();
    timerInterval = setInterval(updateTimer, 100);
}

    // atualiza o tempo na tela
    function updateTimer() {
    const elapsed = (Date.now() - startTime) / 1000; // em segundos
    document.getElementById('timer').textContent = `Tempo: ${elapsed.toFixed(2)}s`;
}

// Fim start

// Reiniciar o Jogo
function reiniciaJogo() 
{
    somGameover.pause();
    $("#fim").remove();
    start();
} // Fim reiniciaJogo

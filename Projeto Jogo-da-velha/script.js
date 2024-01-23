const jogoTotal = document.querySelectorAll(".jogo");
const principal = document.querySelector(".principal");
const textoVitoria = document.querySelector(".vitoria");
const button = document.querySelector(".restart");
const campoMensagem= document.querySelector(".mensagem");
let circuloVez;


const combinacao = [  //todas as possiveis combinações do jogo 
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];


const iniciou = () => {
    circuloVez= false;
   

    for (const verificar of jogoTotal) {  //criando loop pra encontra elementos
        verificar.classList.remove("circulo"); 
        verificar.classList.remove("x");
        verificar.removeEventListener("click", jogoClick);
        verificar.addEventListener("click", jogoClick, {once:true});//fazendo esse codigo para funcionar uma vez o click


    }


    definirJogo();

    campoMensagem.classList.remove("mensagem");


}

const fimJogo = (jogoEmpate) => {
    if(jogoEmpate) {
        textoVitoria.innerHTML="!empate" //colocando o texto que vira logo após o jogo terminar
    } else {
        textoVitoria.innerHTML= circuloVez ? "O venceu !! " : "X Venceu !!"
    }

    campoMensagem.classList.add("mensagem"); //adicionando a clase quando o resultado final for concebido 
}


const jogoEmpate = () => {
    return resultado() && !resultadoVitoria("x") && !resultadoVitoria("circulo");
  };
  


const resultadoVitoria = (currentPlayer) => {
    return combinacao.some((combination) => { //verificando se tem alguma combionacao vitoriosa
      return combination.every((index) => {
        return jogoTotal[index].classList.contains(currentPlayer);
      });
    });
  };


const resultado = () => {
    return [...jogoTotal].every((verificar) => { //verificando todos os elenmentos 
        return verificar.classList.contains("x") || verificar.classList.contains("circulo");
      });
}


const marcaLugar = (verificar, classeTotal) => {  //marcando a joagada atual 
    verificar.classList.add(classeTotal);
}

const definirJogo = () => {
    campoMensagem.classList.remove("circulo");
    campoMensagem.classList.remove("x");
  
    if (circuloVez) {
      campoMensagem.classList.add("circulo");
    } else {
      campoMensagem.classList.add("x");
    }
  };

  
const trocarVez = () => {
  circuloVez = !circuloVez; //circuloVez comeca falso , mas nessa vez ai muda para true 
  
    definirJogo();
  };
  

  const jogoClick = (e) => {
    //Colocar a marca X ou circulo 

    const verificar = e.target;  //pegando cada alvo dos elementos do jogo
    const classeTotal = circuloVez ? "circulo" : "x";
    marcaLugar(verificar, classeTotal);
    const vitoria = resultadoVitoria(classeTotal) //chamando a fnção e colocando resultado nela 
    const empate = jogoEmpate() //chamando a fnção e colocando resultado nela 

    if (vitoria) {
        fimJogo(false);
      } else if (empate) {
        fimJogo(true);
      } else {
        // Mudar símbolo
        trocarVez();
      }


  }
  
  iniciou();

button.addEventListener("click", iniciou);
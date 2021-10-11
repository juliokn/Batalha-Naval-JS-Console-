//este é um jogo simples de batalha naval em javascript, para ser jogado no console
//originalmente criado no ambiente node.js no replit, inspirado em uma aula do curso de ads do senac
//feito rapidamente, precisa ser limpo e otimizado
//quero eventualmente adicionar um modo 2 jogadores

var tabuleiro = [[],[],[],[],[],[],[],[],[],[]];
var pontosJogador = 0, pontosComputador = 0, naviosJogador = 0, naviosComputador = 0, contadorComputador = 0, contadorJogador = 0;
criaTabuleiro();

console.clear();

console.log("==========================================================");
console.log("====================== BATALHA NAVAL =====================");
console.log("==========================================================\n");

console.log("Neste jogo você e o computador se enfrentarão em uma batalha naval. Primeiro vocês posicionarão seus navios. Depois, escolha seu navio e a célula para onde ele vai se movimentar. Se você atingir um navio inimigo, receberá um ponto. Em seguida o computador fará o mesmo. Vence quem fizer mais pontos primeiro. \n")

console.log("Tamanho do tabuleiro: 10x10\n")

var nome = prompt("Seu nome: ");

console.log("\nVamos sortear quem começa a jogar.");

aposta = pegarNumero("Escolha 0 ou 1: ", 0, 1);
testaSorte();
console.log("\nVocê apostou "+aposta+". O resultado do sorteio foi "+sorte+"\n");

if (aposta == sorte){
  console.log("Você ganhou o sorteio e posicionará os navios primeiro. Posicione seus navios indicando linha e coluna. ");
  posicionaNaviosJogador();
  posicionaNaviosAdversario();
}
else {
  console.log("Você perdeu o sorteio. O computador posicionará primeiro... Aguarde...  Posicionando... ");
  console.log("Agora é sua vez.\n")
  posicionaNaviosAdversario();
  posicionaNaviosJogador();
}

console.clear();
imprimirTabuleiro();
jogar();



//FUNÇÕES


//preenche o tabuleiro com água
function criaTabuleiro(){
  //enche o tabuleiro de água
  for (var linha = 0; linha < 10; linha++){
    for (var coluna = 0; coluna < 10; coluna++){
      tabuleiro[linha][coluna] = " ~~~~ ";
  }
  }
}

//imprime o tabuleiro com a pontuação atualizada
function imprimirTabuleiro(){
  console.log("==========================================================");
  console.log("===================TABULEIRO ATUALIZADO===================");
  console.log("==========================================================\n");
  console.log("Navio do inimigo: OOOO (restam "+contadorComputador+")")
  console.log("Navio de "+nome+": <^^> (restam "+contadorJogador+")\n");
  for (var index = 1; index < 11; index++){
    process.stdout.write("   "+index+"  ");
  }
  console.log();
var index = 1;
 for (var linha = 0; linha < 10; linha++){
  for (var coluna = 0; coluna < 10; coluna++){
    if ((coluna == 0)&& (index !=10)){
      process.stdout.write(String(index+" "));
      index++;
    }
    else if ((coluna == 0) && (index == 10)){
      process.stdout.write(String(index));
    }
    process.stdout.write(String(tabuleiro[linha][coluna]));
  }
  console.log();
} 
console.log("\nPONTUAÇÃO ATUALIZADA: ")
console.log("Computador: "+pontosComputador);
console.log(nome+": "+pontosJogador+"\n");
}


//posiciona os navios inimigos randomicamente
function posicionaNaviosAdversario(){
  for (var i = 0; i < 10; i++){
    linhaRandom = Math.floor(Math.random()*10);
    colunaRandom = Math.floor(Math.random()*10);
    if (tabuleiro[linhaRandom][colunaRandom] == ' ~~~~ '){
      tabuleiro[linhaRandom][colunaRandom] = " OOOO ";
      contadorComputador++;
    }
  }
  naviosComputador = contadorComputador;
}

//posiciona os navios do jogador
function posicionaNaviosJogador(){
  for (var i = 0; i < 10; i++){
    console.error("\nNavio n.º "+(i+1));
    linhaJogador = (pegarNumero("Linha: ", 1, 10)-1);
    colunaJogador = (pegarNumero("Coluna: ", 1, 10)-1);
    if (tabuleiro[linhaJogador][colunaJogador] == " ~~~~ "){
      tabuleiro[linhaJogador][colunaJogador] = " <^^> ";
      contadorJogador++;
    }
    else {
      console.log("Espaço já ocupado. Você perdeu um navio. ")
    }
  }
  naviosJogador = contadorJogador;
}

//pega numero inteiro entre min e max (inclusivos)
//serve para evitar que o usuario digite um numero errado e quebre o jogo
function pegarNumero(str, min, max){
  
  do {
    do {
      n = parseInt(prompt(str));
    }
    while (n < min || n > max);
  }
  while (!Number.isInteger(n));
  
  return n;
}

//retorna 0 ou 1 randomicamente para sorteio inicial de quem começa
function testaSorte(){
  sorte = Math.floor(Math.random()*2);
  return sorte;
}


//o jogo propriamente dito
function jogar(){
  //o jogo continuará até que alguém destrua completamente os navios do adversário
  //testa após cada jogada se o número de pontos foi atingido
  while (true){
      jogadorJoga();
      console.log("O computador tem "+naviosComputador);
      if (pontosJogador == naviosComputador){
        console.log(nome+" ganhou! Parabéns!");
        break;
      }
      else {
        computadorJoga();
        if (pontosComputador == naviosJogador){
          console.log("Computador ganhou! Tente novamente, "+nome);
          break;
        }
      };
  }
}

//jogada do jogador
function jogadorJoga(){
  // linha = 0, coluna = 0, linhaAlvo = 0, colunaAlvo = 0;
  console.log("ESCOLHA SUA PEÇA");
  //garante que o jogador escolherá uma peça sua existente
  while (true){
    linha = pegarNumero("Linha da peça: ", 1,10)-1;
    coluna = pegarNumero("Coluna da peça: ", 1,10)-1;
    if (tabuleiro[linha][coluna] != " <^^> ") {
      console.log("Não há navio seu nessa posição.");
    }
    else {
      break; 
    }
  }
  console.log("\nESCOLHA A CÉLULA ALVO: ");
  while (true){
    linhaAlvo = pegarNumero("Linha do alvo: ", 1,10)-1;
    colunaAlvo = pegarNumero("Coluna do alvo: ", 1,10)-1;
          if ((((linha-1 <= linhaAlvo) && (linhaAlvo <= linha+1)) && ((coluna-1 <= colunaAlvo) && (colunaAlvo <= coluna+1))) && (tabuleiro[linhaAlvo][colunaAlvo] != " <^^> ")){
    //movimento possível
    //testa se vai pontuar ou não
      if (tabuleiro[linhaAlvo][colunaAlvo] == " OOOO ") {
      //vai pontuar
        console.log("Navio inimigo destruído! \n");
        tabuleiro[linha][coluna] = " ~~~~ ";
        tabuleiro[linhaAlvo][colunaAlvo] = " <^^> ";
        pontosJogador++;
        contadorComputador--;
        imprimirTabuleiro();
        break;
      }
      else {
        //movimenta sem pontuar 
        tabuleiro[linha][coluna] = " ~~~~ ";
        tabuleiro[linhaAlvo][colunaAlvo] = " <^^> ";
        imprimirTabuleiro();
        break; 
      }
    }
    else {
      console.log("Movimento impossível.");
    }
    }
}

//jogada do computador
function computadorJoga(){
    linha = 0, coluna = 0, linhaAlvo = 0, colunaAlvo = 0;
    console.log("Vez do computador...");
    while (true){
      linha = Math.floor(Math.random()*10);
      coluna = Math.floor(Math.random()*10);
      if (tabuleiro[linha][coluna] == " OOOO ") {
        break;
      }
    }
    while (true){
      linhaAlvo = Math.floor(Math.random()*10);
      colunaAlvo = Math.floor(Math.random()*10);
      //testa se o movimento é possível
  


      if ((((linha-1 <= linhaAlvo) && (linhaAlvo <= linha+1)) && ((coluna-1 <= colunaAlvo) && (colunaAlvo <= coluna+1))) && (tabuleiro[linhaAlvo][colunaAlvo] != " OOOO ")){
        console.log("Computador escolheu célula ["+(linha+1)+"]["+(coluna+1)+"]");
        console.log("Ataque na posição ["+(linhaAlvo+1)+"]["+(colunaAlvo+1)+"]...");
        //testa se vai pontuar ou não
        if (tabuleiro[linhaAlvo][colunaAlvo] == " <^^> ") {
        //vai pontuar
          console.log("Navio de "+nome+" destruído! \n");
          tabuleiro[linha][coluna] = " ~~~~ ";
          tabuleiro[linhaAlvo][colunaAlvo] = " OOOO ";
          pontosComputador++;
          contadorJogador--;
          imprimirTabuleiro();
          break;
        }
        else {
          //movimenta sem pontuar 
          console.log("Computador não pontuou.")
          tabuleiro[linha][coluna] = " ~~~~ ";
          tabuleiro[linhaAlvo][colunaAlvo] = " OOOO ";
          imprimirTabuleiro();
          break; 
        }
      }
      }
}
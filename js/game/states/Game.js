Welpworld.Game = function() {
 
  this.playerMinAngle = -20;
  this.playerMaxAngle = 20;
  this.playerSpeed = 300;
  this.playerJump = -750;
  
  this.coinRate = 2000;
  this.coinTimer = 0;

  this.enemyRate = 3000;
  this.enemyTimer = 0;

  this.score = 0;
  this.previousCoinType = null;

 
  this.coinSpacingX = 10;
  this.coinSpacingY = 10;

  this.jump = false;
};

Welpworld.Game.prototype = {
  create: function() {

    this.fundo = jogo.utilizarSprite(0,0,jogo.larguraTela(),jogo.alturaTela(),'fundo');
    jogo.rotacaoImagem(this.fundo,-100,0);
   
    this.horizonte = jogo.utilizarSprite(0, 250, jogo.larguraTela(), 250+183.06, 'horizonte');
    jogo.rotacaoImagem(this.horizonte,-100,0);
    
    this.mar = jogo.utilizarSprite(0, jogo.alturaTela()-145, jogo.larguraTela(), jogo.alturaTela(), 'mar');
    jogo.rotacaoImagem(this.mar,-250,0);
    
    this.jogador = jogo.utilizarImagem(500, 300, 0.5 , 'jogador');
    jogo.definirEscalaObjecto(this.jogador,.7);
    
    //jogo.criarAnimacao('fly',[0,1,2,3,2,1], this.player);
    //jogo.iniciarAnimacao('fly',8,true,this.player);

    //create groups
    this.enemies =  this.game.add.group();   
    this.coins = jogo.novoGrupo();

    // create score text
    this.scoreText = jogo.adicionarTextoBitmap(10,10, 'minecraftia', 'Score: ' + this.score, 24);

    jogo.activarFisica();

    jogo.utilizarFisica(this.jogador);
    jogo.objectoCollideComLimites(this.jogador,jogo.verdade);
    jogo.definirGravidadeY(this.jogador,0);
       
},
  update: function() {
    
    jogo.espelharSprite(this.jogador,"direita");
    if(this.coinTimer < this.game.time.now) {
      this.createCoin();
      this.coinTimer = this.game.time.now + this.coinRate;
    } 
    jogo.sobreposicao(this.jogador, this.coins, this.coinHit, this);
    

  
    if(this.enemyTimer < this.game.time.now) {
      this.createEnemy();
      this.enemyTimer = this.game.time.now + this.enemyRate;
    }

   // jogo.sobreposicao(this.jogador, this.enemies, this.enemyHit, this);
   // jogo.colisao(this.player, this.mar);

    this.playerMovement();
  },
  shutdown: function() {
    this.coins.destroy();
   
    this.score = 0;
    this.coinTimer = 0;
  
    this.enemies.destroy();
    this.enemyTimer = 0;
  },
  playerMovement: function() {

     if(jogo.teclaPressionada("esquerda"))  {
       jogo.definirVelocidadeX(this.jogador, -this.playerSpeed);
       jogo.espelharSprite(this.jogador,"esquerda");
     }else if(jogo.teclaPressionada("direita"))  {
        jogo.espelharSprite(this.jogador,"direita");
        jogo.definirVelocidadeX(this.jogador, this.playerSpeed);
     }else{
        jogo.definirVelocidadeX(this.jogador, 0);
     }

    /* if(jogo.teclaPressionada("cima") && jogo.tocarNoChao(this.jogador))  {
       jogo.definirVelocidadeY(this.jogador, this.playerJump );
      }*/
      
  },
   createCoin: function() {
   
    var x = -10;
    var y =  jogo.numeroAleatorio(0, 400);
    var coin = jogo.devolvePrimeiroElemento(this.coins,false);
    if(!coin) {
      coin = new Coin(this.game, x, y, 'coin');
      this.coins.add(coin);
    }
    coin.reset(x, y);
    coin.revive();
    return coin;
  },
  createCoinGroup: function(columns, rows) {
    //create 4 coins in a group
    var coinSpawnX = jogo.larguraTela();
    var coinSpawnY =  jogo.numeroAleatorio(0, 400);
    var coinRowCounter = 0;
    var coinColumnCounter = 0;
    var coin;
    for(var i = 0; i < columns * rows; i++) {
      coin = this.createCoin(coinSpawnX , coinSpawnY);
      coin.x = coin.x + (coinColumnCounter * coin.width) + (coinColumnCounter * this.coinSpacingX);
      coin.y = coinSpawnY + (coinRowCounter * coin.height) + (coinRowCounter * this.coinSpacingY);
      coinColumnCounter++;
      if(i+1 >= columns && (i+1) % columns === 0) {
        coinRowCounter++;
        coinColumnCounter = 0;
      } 
    }
  },


  createEnemy: function() {
    var x = jogo.larguraTela();
    var y = jogo.numeroAleatorio(jogo.alturaTela()-180, jogo.alturaTela()-20  );

    var enemy = this.enemies.getFirstExists(false);
    if(!enemy) {
      enemy = new Enemy(this.game, 0, 0);
      this.enemies.add(enemy);
    }
    enemy.reset(x, y);
    enemy.revive();
  },
  coinHit: function(player, coin) {
   /* this.score++;
   // this.coinSound.play();
    coin.kill();

    var dummyCoin = new Coin(this.game, coin.x, coin.y);
    jogo.adicionarElementoExistente(dummyCoin);

    //jogo.iniciarAnimacao('spin', 40, true,dummyCoin);

    var scoreTween = this.game.add.tween(dummyCoin).to({x: 50, y: 50}, 300, Phaser.Easing.Linear.NONE, true);

    scoreTween.onComplete.add(function() {
      dummyCoin.destroy();
      this.scoreText.text = 'Score: ' + this.score;
    }, this);*/
     player.kill();
    coin.kill();

    this.enemies.setAll('body.velocity.x', 0);
   
    this.enemyTimer = Number.MAX_VALUE;

     this.shutdown();
     jogo.activarEstado('Game');

  },
  enemyHit: function(player, enemy) {
    player.kill();
    enemy.kill();

    this.enemies.setAll('body.velocity.x', 0);
   
    this.enemyTimer = Number.MAX_VALUE;

     this.shutdown();
     jogo.activarEstado('Game');

  }

}
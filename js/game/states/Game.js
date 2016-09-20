Welpworld.Game = function() {
 
  this.playerMinAngle = -20;
  this.playerMaxAngle = 20;
  this.playerSpeed = 300;
  this.playerJump = -750;
  
  this.coinRate = 1000;
  this.coinTimer = 0;

  this.enemyRate = 1000;
  this.enemyTimer = 0;

  this.score = 0;
  this.previousCoinType = null;

  this.coinSpawnX = jogo.larguraTela();
  this.coinSpacingX = 10;
  this.coinSpacingY = 10;

  this.jump = false;
};

Welpworld.Game.prototype = {
  create: function() {
    this.background = jogo.utilizarSprite(0, 0, this.game.width, this.game.height, 'background');

    this.ground = jogo.utilizarSprite(0, this.game.height - 73, this.game.width, 73, 'ground');
    
    this.player = jogo.utilizarImagem(200, this.game.height/2, 0.5 , 'player');
    this.player.scale.setTo(0.3);
    
    jogo.criarAnimacao('fly',[0,1,2,3,2,1], this.player);
    jogo.iniciarAnimacao('fly',8,true,this.player);

  // create groups
    this.enemies = this.game.add.group();
    this.coins = this.game.add.group();

    // create score text
    this.scoreText = this.game.add.bitmapText(10,10, 'minecraftia', 'Score: ' + this.score, 24);


    jogo.activarFisica();
   
    jogo.utilizarFisica(this.ground);
    jogo.objectoPermiteFisica(this.ground,jogo.falso);
    jogo.objectoNaoMovel(this.ground,jogo.verdade);

    jogo.utilizarFisica(this.player);
    jogo.objectoCollideComLimites(this.player,jogo.verdade);
    jogo.definirGravidadeY(this.player,1000);
       
},
  update: function() {
    
    if(this.coinTimer < this.game.time.now) {
      this.generateCoins();
      this.coinTimer = this.game.time.now + this.coinRate;
    } 
    this.game.physics.arcade.overlap(this.player, this.coins, this.coinHit, null, this);
    
  
    
    if(this.enemyTimer < this.game.time.now) {
      this.createEnemy();
      this.enemyTimer = this.game.time.now + this.enemyRate;
    }

    this.game.physics.arcade.overlap(this.player, this.enemies, this.enemyHit, null, this);
    this.game.physics.arcade.collide(this.player, this.ground);
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
       jogo.definirVelocidadeX(this.player, -this.playerSpeed);
     }else if(jogo.teclaPressionada("direita"))  {
        jogo.definirVelocidadeX(this.player, this.playerSpeed);
     }else{
        jogo.definirVelocidadeX(this.player, 0);
     }

     if(jogo.teclaPressionada("cima") && jogo.tocarNoChao(this.player))  {
       jogo.definirVelocidadeY(this.player, this.playerJump );
      }
      
  },
  generateCoins: function() {
    if(!this.previousCoinType || this.previousCoinType < 3) {
      var coinType = this.game.rnd.integer() % 5;
      switch(coinType) {
        case 0:
          //do nothing. No coins generated
          break;
        case 1:
        case 2:
          // if the cointype is 1 or 2, create a single coin
          //this.createCoin();
          this.createCoinGroup(1, 1);

          break;
        case 3:
          // create a small group of coins
          this.createCoinGroup(2, 2);
          break;
        case 4:
          //create a large coin group
          this.createCoinGroup(6, 2);
          break;
        default:
          // if somehow we error on the cointype, set the previouscointype to zero and do nothing
          this.previousCoinType = 0;
          break;
      }

      this.previousCoinType = coinType;
    } else {
      if(this.previousCoinType === 4) {
        // the previous coin generated was a large group, 
        // skip the next generation as well
        this.previousCoinType = 3;
      } else {
        this.previousCoinType = 0;  
      }
      
    }
  },
   createCoin: function(x, y) {
   
    // recycle our coins
    // 
    var coin = this.coins.getFirstExists(false);
    if(!coin) {
      coin = new Coin(this.game, 0, 0, 'coin');
      this.coins.add(coin);
    }
    coin.reset(x, y);
    coin.revive();
    return coin;
  },
  createCoinGroup: function(columns, rows) {
    //create 4 coins in a group
    var coinSpawnY = this.game.rnd.integerInRange(200, 550);
    var coinRowCounter = 0;
    var coinColumnCounter = 0;
    var coin;
    for(var i = 0; i < columns * rows; i++) {
      coin = this.createCoin(this.coinSpawnX+200, coinSpawnY);
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
    var y = this.game.rnd.integerInRange(200, jogo.alturaTela() - 100 );

    var enemy = this.enemies.getFirstExists(false);
    if(!enemy) {
      enemy = new Enemy(this.game, 0, 0);
      this.enemies.add(enemy);
    }
    enemy.reset(x, y);
    enemy.revive();
  },
  groundHit: function(player, ground) {
  //this.player.body.velocity.y=-100;
  
  
  },
  coinHit: function(player, coin) {
    this.score++;
   // this.coinSound.play();
    coin.kill();

    var dummyCoin = new Coin(this.game, coin.x, coin.y);
    this.game.add.existing(dummyCoin);

    dummyCoin.animations.play('spin', 40, true);

    var scoreTween = this.game.add.tween(dummyCoin).to({x: 50, y: 50}, 300, Phaser.Easing.Linear.NONE, true);

    scoreTween.onComplete.add(function() {
      dummyCoin.destroy();
      this.scoreText.text = 'Score: ' + this.score;
    }, this);

  },
  enemyHit: function(player, enemy) {
    player.kill();
    enemy.kill();

    this.enemies.setAll('body.velocity.x', 0);
   
    this.enemyTimer = Number.MAX_VALUE;

    this.shutdown();
     this.state.start('Game');

  }

}
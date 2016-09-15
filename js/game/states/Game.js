Welpworld.Game = function() {
 
  this.playerMinAngle = -20;
  this.playerMaxAngle = 20;
  this.playerSpeed = 300;
  this.playerJump = -750;
  
  this.coinRate = 1000;
  this.coinTimer = 0;

  this.enemyRate = 2000;
  this.enemyTimer = 0;

  this.score = 0;
  this.previousCoinType = null;

  this.coinSpawnX = null;
  this.coinSpacingX = 10;
  this.coinSpacingY = 10;

  this.jump = false;
};

Welpworld.Game.prototype = {
  create: function() {
    this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'background');

    this.ground = this.game.add.tileSprite(0, this.game.height - 73, this.game.width, 73, 'ground');
    
    this.player = this.add.sprite(200, this.game.height/2, 'player');
    this.player.anchor.setTo(0.5);
    this.player.scale.setTo(0.3);
    
    this.player.animations.add('fly', [0,1,2,3,2,1]);
    this.player.animations.play('fly', 8, true);

    this.enemies = this.game.add.group();

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
   
    this.game.physics.arcade.enableBody(this.ground);
    this.ground.body.allowGravity = false;
    this.ground.body.immovable = true;

    this.game.physics.arcade.enableBody(this.player);
    this.player.body.collideWorldBounds = true;
    this.player.body.gravity.y = 1000;
    
    this.cursor = this.input.keyboard.createCursorKeys();


   
},
  update: function() {
   /* 
    if(this.coinTimer < this.game.time.now) {
      this.generateCoins();
      this.coinTimer = this.game.time.now + this.coinRate;
    } 
    this.game.physics.arcade.overlap(this.player, this.coins, this.coinHit, null, this);
    */
  
    
    if(this.enemyTimer < this.game.time.now) {
      this.createEnemy();
      this.enemyTimer = this.game.time.now + this.enemyRate;
    }

    this.game.physics.arcade.overlap(this.player, this.enemies, this.enemyHit, null, this);
    this.game.physics.arcade.collide(this.player, this.ground);
    this.playerMovement();
  },
  shutdown: function() {
  /*  this.coins.destroy();
   
    this.score = 0;
    this.coinTimer = 0;
  */
     this.enemies.destroy();
     this.enemyTimer = 0;
  },
  playerMovement: function() {

     if(this.cursor.left.isDown)  {
       this.player.body.velocity.x = -this.playerSpeed;
     }else if(this.cursor.right.isDown)  {
       this.player.body.velocity.x = this.playerSpeed;
     }else{
       this.player.body.velocity.x = 0;
     }

     if(this.cursor.up.isDown && this.player.body.touching.down)  {
       this.player.body.velocity.y = this.playerJump;
       this.jump=false;
      }
      
  },
  generateCoins: function() {
   /* if(!this.previousCoinType || this.previousCoinType < 3) {
      var coinType = this.game.rnd.integer() % 5;
      switch(coinType) {
        case 0:
          //do nothing. No coins generated
          break;
        case 1:
        case 2:
          // if the cointype is 1 or 2, create a single coin
          //this.createCoin();
          this.createCoin();

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
      
    }*/
  },
  createCoinGroup: function(columns, rows) {
    //create 4 coins in a group
   /* var coinSpawnY = this.game.rnd.integerInRange(50, this.game.world.height - 192);
    var coinRowCounter = 0;
    var coinColumnCounter = 0;
    var coin;
    for(var i = 0; i < columns * rows; i++) {
      coin = this.createCoin(this.spawnX, coinSpawnY);
      coin.x = coin.x + (coinColumnCounter * coin.width) + (coinColumnCounter * this.coinSpacingX);
      coin.y = coinSpawnY + (coinRowCounter * coin.height) + (coinRowCounter * this.coinSpacingY);
      coinColumnCounter++;
      if(i+1 >= columns && (i+1) % columns === 0) {
        coinRowCounter++;
        coinColumnCounter = 0;
      } 
    }*/
  },


  createEnemy: function() {
    var x = this.game.width;
    var y = this.game.rnd.integerInRange(30, this.game.world.height - 192);

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
   /* this.score++;
    this.coinSound.play();
    coin.kill();

    var dummyCoin = new Coin(this.game, coin.x, coin.y);
    this.game.add.existing(dummyCoin);

    dummyCoin.animations.play('spin', 40, true);

    var scoreTween = this.game.add.tween(dummyCoin).to({x: 50, y: 50}, 300, Phaser.Easing.Linear.NONE, true);

    scoreTween.onComplete.add(function() {
      dummyCoin.destroy();
      this.scoreText.text = 'Score: ' + this.score;
    }, this);*/

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
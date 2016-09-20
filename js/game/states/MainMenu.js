Welpworld.MainMenu = function() {};

Welpworld.MainMenu.prototype = {
  create: function() {
   
    this.fundo = jogo.utilizarSprite(0,0,jogo.larguraTela(),jogo.alturaTela(),'background');
      
    this.foreground = jogo.utilizarSprite(0, 470, this.game.width, this.game.height - 533, 'foreground');

    this.ground = jogo.utilizarSprite(0, this.game.height - 73, this.game.width, 73, 'ground');
  
    //this.game.add.tween(this.player).to({y: this.player.y - 16}, 500, Phaser.Easing.Linear.NONE, true, 0, Infinity, true);


   
    this.textoInicio = jogo.adicionarTextoBitmap(0, 0, 'minecraftia',"Pressiona ENTER\n para comecar!!!");
    this.textoInicio.x = jogo.larguraTela() / 2 - jogo.largura(this.textoInicio) /2;
    this.textoInicio.y = jogo.alturaTela() / 2 - jogo.altura(this.textoInicio)  / 2;

  },
  update: function() {
   // if(this.game.input.keyboard.isDown(Phaser.KeyCode.ENTER))  {
    if(jogo.teclaPressionada("enter")){
      jogo.activarEstado('Game');
    }
  }
  
};
Welpworld.Preload = function() {
  this.pronto = jogo.falso;
  
};



Welpworld.Preload.prototype = {
  preload: function() {

    this.splash =jogo.utilizarImagem(jogo.centroX(), jogo.centroY(), 0.5, 'logo');
  
    this.barra = jogo.utilizarImagem(jogo.centroX(), jogo.centroY() + 150, 0.5, 'preloadbar');
    
    jogo.definirBarraCarregamento(this.barra);
 
    jogo.carregarImagem('background', 'assets/images/background.png');
     jogo.carregarImagem('foreground', 'assets/images/foreground.png');
    jogo.carregarImagem('ground', 'assets/images/ground.png');
    
    jogo.carregarSprite('player', 'assets/images/jetpack-ps.png', 229, 296, 4);
    jogo.carregarSprite('missile', 'assets/images/missiles-ps.png', 361, 218, 4);
    jogo.carregarAtlas('coin', 'assets/images/coin-spritesheet.png', 'assets/images/coin-spritesheet-definition.json');

     //this.load.atlas('coin', 'assets/images/coin-spritesheet.png', 'assets/images/coin-spritesheet-definition.json');

    jogo.carregarTextoBitmap('minecraftia', 'assets/fonts/minecraftia/minecraftia.png', 'assets/fonts/minecraftia/minecraftia.xml');

    jogo.carregarSom('gameMusic', ['assets/audio/Pamgaea.mp3', 'assets/audio/Pamgaea.ogg']);
  
    //This needs something to load or won't be called'
    jogo.carregamentoCompleto(this.carregamentoCompleto,this);
  },
  
 /* create: function() {
    //this.barra.cropEnabled = false;
  }, */
  
  update: function() {
   if(jogo.somDescodificado('gameMusic') && this.pronto === jogo.verdade ){
    jogo.activarEstado('MainMenu');
    }
  },
 
  carregamentoCompleto: function() {
    this.pronto = jogo.verdade;
  },

 
};
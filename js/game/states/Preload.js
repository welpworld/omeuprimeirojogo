Welpworld.Preload = function() {
  this.ready = false;
};

Welpworld.Preload.prototype = {
  preload: function() {

    jogo.utilizarImagem(jogo.centroX(), jogo.centroY(), 0.5, 'logo');
  
    this.barra = jogo.utilizarImagem(jogo.centroX(), jogo.centroY() + 150, 0.5, 'preloadbar');
    
   jogo.definirBarraCarregamento(this.barra);
 
    jogo.carregarImagem('background', 'assets/images/background.png');
    jogo.carregarImagem('ground', 'assets/images/ground.png');
    
    jogo.carregarSprite('player', 'assets/images/jetpack-ps.png', 229, 296, 4);
    jogo.carregarSprite('missile', 'assets/images/missiles-ps.png', 361, 218, 4);

    jogo.carregarSom('gameMusic', ['assets/audio/Pamgaea.mp3', 'assets/audio/Pamgaea.ogg']);
  
    //This needs something to load or won't be called'
    this.load.onLoadComplete.add(this.onLoadComplete, this);
  },
  
  create: function() {
    this.barra.cropEnabled = false;
  }, 
  
  update: function() {
   if(this.cache.isSoundDecoded('gameMusic') && this.ready === true) {
    this.state.start('MainMenu');
    }
  },
 
  onLoadComplete: function() {
    this.ready = true;
  }
};
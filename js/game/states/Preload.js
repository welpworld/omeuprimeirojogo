Welpworld.Preload = function() {
  this.pronto = jogo.falso;
  
};



Welpworld.Preload.prototype = {
  preload: function() {

    this.splash =jogo.utilizarImagem(jogo.centroX(), jogo.centroY(), 0.5, 'logo');
  
    this.barra = jogo.utilizarImagem(jogo.centroX(), jogo.centroY() + 150, 0.5, 'preloadbar');
    
    jogo.definirBarraCarregamento(this.barra);
 
    jogo.carregarImagem('fundo', 'assets/images/fundo.png');
     jogo.carregarImagem('horizonte', 'assets/images/mar_horizonte.svg');
    jogo.carregarImagem('mar', 'assets/images/mar.svg');
    
    jogo.carregarSprite('jogador', 'assets/images/barco bom.svg', 213.85, 175.13, 2);
    jogo.carregarSprite('inimigo', 'assets/images/barco mau.svg',224.8, 175.13,2);
    jogo.carregarImagem('bomba', 'assets/images/bomba.svg');

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

var Welpworld = function() {};

Welpworld.Boot = function() {};

Welpworld.Boot.prototype = {
  preload: function() {

    jogo.carregarImagem('logo', 'assets/images/logo.png');
    jogo.carregarImagem('preloadbar', 'assets/images/preloader-bar.png');

 jogo.jogo.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			jogo.jogo.scale.forceOrientation(true, false);

      jogo.jogo.scale.enterIncorrectOrientation.add(this.handleIncorrect);
      jogo.jogo.scale.leaveIncorrectOrientation.add(this.handleCorrect);
   

  
},
  create: function() {
    jogo.corFundo('#FFF');
    
    //  Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1
    jogo.numeroToques(1);

    if (jogo.paraDispositivoMovel()) {
      jogo.definirDimensoesMovel(800,446,1200,446,true);
    }

    jogo.activarEstado('Preloader');
  },
  	 handleIncorrect:function(){
   	if(!jogo.jogo.device.desktop){
     		document.getElementById("turn").style.display="block";
     	}
	},
	
	handleCorrect:function(){
		if(!jogo.jogo.device.desktop){
			document.getElementById("turn").style.display="none";
		}
	}
};
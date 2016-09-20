var jogo = new Motor();




jogo.tela('100','100','');

jogo.adicionarEstado('Boot', Welpworld.Boot);
jogo.adicionarEstado('Preloader', Welpworld.Preload);
jogo.adicionarEstado('MainMenu', Welpworld.MainMenu);
jogo.adicionarEstado('Game', Welpworld.Game);

jogo.activarEstado('Boot');
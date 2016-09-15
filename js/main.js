var game = new Phaser.Game(/*width = */ '100',/* height= */ '100', Phaser.AUTO, /* Patent = */ '');

game.state.add('Boot', Welpworld.Boot);
game.state.add('Preloader', Welpworld.Preload);
game.state.add('MainMenu', Welpworld.MainMenu);
game.state.add('Game', Welpworld.Game);

game.state.start('Boot');
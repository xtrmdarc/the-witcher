import 'phaser';
import MainScene from './scenes/mainScene';
import MainMenuScene from './scenes/mainMenuScene';
import GameOverScene from './scenes/gameOverScene';

var config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight - 5,
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 300 },
        debug: false,
    },
  },
  scene: [
    MainMenuScene,
    MainScene,
    GameOverScene,
  ],
};

var game = new Phaser.Game(config);

import 'phaser';
import MainScene from './scenes/mainScene';

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
    MainScene,
  ],
};

var game = new Phaser.Game(config);

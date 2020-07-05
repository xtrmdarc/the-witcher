import 'phaser';
import MainScene from './scenes/mainScene';
import MainMenuScene from './scenes/mainMenuScene';
import GameOverScene from './scenes/gameOverScene';
import LeaderboardScene from './scenes/leaderboardScene';

var config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight - 5,
  parent: 'divId',
  dom: {
    createContainer: true,
  },
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
    LeaderboardScene,
  ],
};

var game = new Phaser.Game(config);

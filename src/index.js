import Phaser from 'phaser';
import MainScene from './scenes/mainScene';
import MainMenuScene from './scenes/mainMenuScene';
import GameOverScene from './scenes/gameOverScene';
import LeaderboardScene from './scenes/leaderboardScene';
import InstructionsScene from './scenes/instructionsScene';

const config = {
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
    InstructionsScene,
    GameOverScene,
    LeaderboardScene,
  ],
};

const game = new Phaser.Game(config); // eslint-disable-line no-unused-vars

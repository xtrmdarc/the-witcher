import Phaser from 'phaser';
import MainMenuScene from '../src/scenes/mainMenuScene';
import MainScene from '../src/scenes/mainScene';
import GameOverScene from '../src/scenes/gameOverScene';
import LeaderboardScene from '../src/scenes/leaderboardScene';

const GameMock = (() => {
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
      GameOverScene,
      LeaderboardScene,
    ],
  };
  const game = new Phaser.Game(config);
  return { game };
});

export default GameMock;
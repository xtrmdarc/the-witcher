import Phaser from 'phaser';
import MainMenuScene from '../src/scenes/mainMenuScene';
import MainScene from '../src/scenes/mainScene';
import InstructionsScene from '../src/scenes/instructionsScene';

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
      MainScene,
      MainMenuScene,
      InstructionsScene,
    ],
  };
  document.body.innerHTML = '';

  const game = new Phaser.Game(config);
  return { game };
})();

export default GameMock;
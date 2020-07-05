import 'phaser';
import Helper from '../helper';
import gameOverImg from '../assets/img/game_over.png';
import GameMechanics from '../gameMechanics';

class GameOverScene extends Phaser.Scene {
  constructor(config){
    super({key: 'GameOverScene'});
  }

  preload() {
    this.load.image('gameOver', gameOverImg);
    this.background = Helper.getBaseBackground(this);
    this.background.loadBackgroundAssets();
  }

  create() {
    const height = this.game.scale.height;
    const width = this.game.scale.width;

    
    this.background.renderBackground();
    const gameOverTitle = this.add.image(width / 2, 100, 'gameOver');
    const finalScore = this.add.text(width / 2, 200, 'Final Score: ' + GameMechanics.getScore(), { fontSize: 50, fill: '#000'});
    finalScore.x -= finalScore.displayWidth / 2;

  }

  update() {
    this.background.updateBackground();
  }

}

export default GameOverScene;
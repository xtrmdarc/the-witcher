import Phaser from 'phaser';
import Helper from '../helper';
import gameOverImg from '../assets/img/game_over.png';
import GameMechanics from '../gameMechanics';
import inputHtml from '../assets/html/scoreInput.html';
import leaderboardImg from '../assets/img/leaderboard.png';
import submitImg from '../assets/img/submit_button.png';
import restartImg from '../assets/img/restart.png';
import storage from '../storage';

class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOverScene' });
  }

  preload() {
    this.load.image('gameOver', gameOverImg);
    this.load.image('leaderboard', leaderboardImg);
    this.load.image('submit', submitImg);
    this.load.image('restart', restartImg);

    this.background = Helper.getBaseBackground(this);
    this.background.loadBackgroundAssets();
  }

  create() {
    const { width } = this.game.scale;

    this.background.renderBackground();
    this.add.image(width / 2, 100, 'gameOver');

    const finalScore = this.add.text(width / 2, 200, `Final Score: ${GameMechanics.getScore()}`, { fontSize: 50, fill: '#000' });
    finalScore.x -= finalScore.displayWidth / 2;

    this.add.dom(width / 2, 300).createFromHTML(inputHtml);

    const submitBtn = Helper.createBtn(this, width / 2, 370, 'submit', () => {
      if (document.querySelector('#score-input').value.trim().length <= 0) return;
      const scene = this;
      storage.submitScore(document.querySelector('#score-input').value.trim(), GameMechanics.getScore()).then(json => { // eslint-disable-line no-unused-vars
        scene.scene.start('LeaderboardScene');
        scene.scene.stop();
      });
    });
    submitBtn.setScale(0.6);

    const leaderboardBtn = Helper.createBtn(this, width / 2, 520, 'leaderboard', () => {
      this.scene.start('LeaderboardScene');
      this.scene.stop();
    });
    leaderboardBtn.setScale(0.4);
    const restartBtn = Helper.createBtn(this, width / 2, 580, 'restart', () => {
      this.scene.start('MainScene');
      this.scene.stop();
    });
    restartBtn.setScale(0.4);
  }

  update() {
    this.background.updateBackground();
  }
}

export default GameOverScene;

import Phaser from 'phaser';
import playButton from '../assets/img/play_button.png';
import title from '../assets/img/the_witcher_text.png';
import Helper from '../helper';
import leaderboardImg from '../assets/img/leaderboard.png';
import instructionsImg from '../assets/img/instructions.png';


class MainMenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainMenuScene' });
  }

  preload() {
    this.load.image('playButton', playButton);
    this.load.image('title', title);
    this.load.image('leaderboard', leaderboardImg);
    this.load.image('instructions', instructionsImg);

    this.background = Helper.getBaseBackground(this);
    this.background.loadBackgroundAssets();
  }

  create() {
    const gameWidth = this.game.scale.width;
    const gameHeight = this.game.scale.height;
    this.background.renderBackground();
    const titleText = this.add.image(gameWidth / 2, 100, 'title');
    const playButton = Helper.createBtn(this, gameWidth / 2, gameHeight / 2, 'playButton', () => {
      this.scene.start('MainScene');
      this.scene.stop();
    });
    playButton.setScale(0.7);

    const leaderboardBtn = Helper.createBtn(this, gameWidth / 2, gameHeight / 2 + 150, 'leaderboard', () => {
      this.scene.start('LeaderboardScene');
      this.scene.stop();
    });
    const instructionsBtn = Helper.createBtn(this, gameWidth / 2, gameHeight / 2 + 200, 'instructions', () => {
      this.scene.start('InstructionsScene');
      this.scene.stop();
    });

    leaderboardBtn.setScale(0.4);
    instructionsBtn.setScale(0.4);

    titleText.setScale(0.8);
  }

  update() {
    this.background.updateBackground();
  }
}

export default MainMenuScene;
import 'phaser';
// import launchScreen from '../assets/img/main_menu.png';
import playButton from '../assets/img/play_button.png';
import title from '../assets/img/the_witcher_text.png'
import Helper from '../helper';

class MainMenuScene extends Phaser.Scene {
  constructor(config) {
    super({key: 'MainMenuScene'});
    this.launchScreenImg;
    this.background;
  }

  preload() {
    this.load.image('playButton', playButton);
    this.load.image('title', title);
    this.background = Helper.getBaseBackground(this);
    this.background.loadBackgroundAssets();
  }

  create() {
    const gameWidth = this.game.scale.width;
    const gameHeight = this.game.scale.height;
    this.background.renderBackground();
    const titleText = this.add.image(gameWidth / 2, 100, 'title');
    const playButton = this.add.image(gameWidth / 2, gameHeight / 2, 'playButton');
    playButton.setInteractive();
    playButton.on('pointerover', function() {
      playButton.alpha = 0.7;
    }, this);
    playButton.on('pointerout', function() {
      playButton.alpha = 1;
    }, this);
    playButton.on('pointerdown', function() {
      this.scene.start('MainScene');
      this.scene.stop();
    }, this);
    playButton.setScale(0.7);
    titleText.setScale(0.8);
  }

  update() {
    this.background.updateBackground();
  }
}

export default MainMenuScene;
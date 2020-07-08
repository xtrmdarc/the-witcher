import Phaser from 'phaser';
import Helper from '../helper';
import instructionsImg from '../assets/img/instructions_img.png';
import instructionsTitle from '../assets/img/instructions_title.png';
import menuBtn from '../assets/img/menu_btn.png';

class InstructionsScene extends Phaser.Scene {
  constructor() {
    super({ key: 'InstructionsScene' });
  }

  preload() {
    this.load.image('instructionsImg', instructionsImg);
    this.load.image('instructionsTitle', instructionsTitle);
    this.load.image('menu', menuBtn);
    this.background = Helper.getBaseBackground(this);
    this.background.loadBackgroundAssets(this);
  }

  create() {
    this.background.renderBackground();
    this.add.image(this.game.scale.width / 2, 70, 'instructionsTitle');
    const inst = this.add.image(this.game.scale.width / 2, 300, 'instructionsImg');
    inst.setScale(0.7);

    const menu = Helper.createBtn(this, this.game.scale.width / 2, 520, 'menu', () => {
      this.scene.start('MainMenuScene');
      this.scene.stop();
    });

    menu.setScale(0.7);
  }

  update() {
    this.background.updateBackground();
  }
}

export default InstructionsScene;
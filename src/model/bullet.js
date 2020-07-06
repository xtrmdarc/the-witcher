import Phaser from 'phaser';
import arrowImg from '../assets/img/hero/arrow.png';

class Bullet extends Phaser.Physics.Arcade.Image {
  constructor(ctx, x, y, shooter, imgId) {
    super(ctx, x, y, imgId);

    this.scene = ctx;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);
    this.setSize(120, 30);
    this.setScale(0.31);
    this.body.gravity.y = 0.003;
    this.flipX = !(shooter.flipX);
    this.damage = 10;
  }

  static loadAssets(scene) {
    scene.load.image('arrow', arrowImg);
  }

  fire(xForce, yForce) {
    this.setVelocityX(this.flipX ? -xForce : xForce);
    this.setVelocityY(yForce);
  }
}

export default Bullet;
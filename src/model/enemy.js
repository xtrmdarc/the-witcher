import 'phaser';

class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(ctx, x, y, spriteId, sizeX, sizeY) {
    super(ctx, x, y, spriteId);
    this.spriteId = spriteId;
    this.scene = ctx;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);
    this.setSize(sizeX, sizeY);
    this.setScale(0.4);
    this.createSpriteBehaviors();
    this.health;
    this.points;
  }

  createSpriteBehaviors() {
    this.scene.anims.create({
      key: this.spriteId+'-idle',
      frames: this.scene.anims.generateFrameNumbers(this.spriteId, { start: 0, end: 13}),
      frameRate: 10,
      repeat: -1
    });

    this.scene.anims.create({
      key: this.spriteId+'-walk',
      frames: this.scene.anims.generateFrameNumbers(this.spriteId+'-walk-ss' , { start: 0, end: 10 }),
      frameRate: 40,
      repeat: -1
    });

    // this.on('animationcomplete', this.handleAnimationComplete, this);
  }

  takeDamage(dmg) {
    this.health -= dmg;
    this.setVelocity(0, 0);
    return this.checkDeath();
  }

  checkDeath() {
    if(this.health <= 0) {
      this.destroy();
      return true;
    }
    return false;
  }

  idle() {
    this.anims.play(this.spriteId+'-idle', true);
  }

  move() {

  }

}

export default Enemy;
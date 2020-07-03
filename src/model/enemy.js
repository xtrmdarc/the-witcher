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
    this.damage;
    this.beingAttacked = false;
    this.attacking = false;
    this.setVelocityX(-10);
  }

  createSpriteBehaviors() {
    this.scene.anims.create({
      key: this.spriteId+'-idle',
      frames: this.scene.anims.generateFrameNumbers(this.spriteId, { start: 0, end: 13}),
      frameRate: 20,
      repeat: -1
    });

    this.scene.anims.create({
      key: this.spriteId+'-walk',
      frames: this.scene.anims.generateFrameNumbers(this.spriteId+'-walk-ss' , { start: 0, end: 10 }),
      frameRate: 40,
      repeat: -1
    });

    this.scene.anims.create({
      key: this.spriteId+'-damage',
      frames: this.scene.anims.generateFrameNumbers(this.spriteId+'-damage-ss' , { start: 0, end: 11 }),
      frameRate: 40,
      repeat: 0
    });

    this.scene.anims.create({
      key: this.spriteId+'-attack',
      frames: this.scene.anims.generateFrameNumbers(this.spriteId+'-attack-ss' , { start: 0, end: 15 }),
      frameRate: 40,
      repeat: 0
    });

    this.on('animationcomplete', this.handleAnimationComplete, this);
  }

  handleAnimationComplete(animation, frame) {
    switch(animation.key) {
      case this.spriteId+'-damage' : {
        this.beingAttacked = false;
        break;
      };
      case this.spriteId+'-attack' : {
        this.attacking = false;
        break;
      }
    }
  }

  takeDamage(dmg) {
    this.beingAttacked = true;
    this.health -= dmg;
    this.setVelocity(0, 0);
    this.anims.play(this.spriteId+'-damage', true);
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

  attack(player) {
    this.attacking = true;
    this.anims.play(this.spriteId+'-attack', true);
    player.takeDamage(this.damage);
    this.setVelocityX(0);
  }

  move() {

  }

  ia() {
    if(this.beingAttacked == true || this.attacking == true)
      return;
    this.idle();
  }

}

export default Enemy;
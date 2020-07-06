import Phaser from 'phaser';

class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(ctx, x, y, spriteId, sizeX, sizeY) {
    y -= sizeY / 2;
    super(ctx, x, y, spriteId);
    this.spriteId = spriteId;
    this.scene = ctx;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);
    this.setSize(sizeX, sizeY);
    this.setScale(0.4);
    this.createSpriteBehaviors();
    this.beingAttacked = false;
    this.attacking = false;
    this.dying = false;
    this.alive = true;
  }

  createSpriteBehaviors() {
    this.scene.anims.create({
      key: `${this.spriteId}-idle`,
      frames: this.scene.anims.generateFrameNumbers(this.spriteId, { start: 0, end: 13 }),
      frameRate: 20,
      repeat: -1,
    });

    this.scene.anims.create({
      key: `${this.spriteId}-walk`,
      frames: this.scene.anims.generateFrameNumbers(`${this.spriteId}-walk-ss`, { start: 0, end: 27 }),
      frameRate: 40,
      repeat: -1,
    });

    this.scene.anims.create({
      key: `${this.spriteId}-damage`,
      frames: this.scene.anims.generateFrameNumbers(`${this.spriteId}-damage-ss`, { start: 0, end: 11 }),
      frameRate: 40,
      repeat: 0,
    });

    this.scene.anims.create({
      key: `${this.spriteId}-attack`,
      frames: this.scene.anims.generateFrameNumbers(`${this.spriteId}-attack-ss`, { start: 0, end: 15 }),
      frameRate: 20,
      repeat: 0,
    });

    this.scene.anims.create({
      key: `${this.spriteId}-dead`,
      frames: this.scene.anims.generateFrameNumbers(`${this.spriteId}-dead-ss`, { start: 0, end: 0 }),
      frameRate: 1,
      repeat: 0,
    });

    this.on('animationcomplete', this.handleAnimationComplete, this);
  }

  handleAnimationComplete(animation) {
    switch (animation.key) {
      case `${this.spriteId}-damage`: {
        this.beingAttacked = false;
        break;
      }
      case `${this.spriteId}-attack`: {
        this.attacking = false;
        break;
      }
      case `${this.spriteId}-dead`: {
        this.destroy();
        break;
      }
      default: { break; }
    }
  }

  takeDamage(dmg) {
    if (this.dying) return false;

    this.beingAttacked = true;
    this.health -= dmg;
    this.setVelocity((-this.speed * 2) / 3, 0);
    this.anims.play(`${this.spriteId}-damage`, true);
    return this.checkDeath();
  }

  checkDeath() {
    if (this.health <= 0) {
      this.dying = true;
      this.anims.play(`${this.spriteId}-dead`);
      return true;
    }
    return false;
  }

  idle() {
    this.anims.play(`${this.spriteId}-idle`, true);
  }

  attack(player) {
    if (this.attacking || this.dying) return;
    this.attacking = true;
    this.anims.play(`${this.spriteId}-attack`, true);
    player.takeDamage(this.damage);
    this.setVelocityX(0);
  }

  move(dir) {
    switch (dir) {
      case 'right': {
        this.anims.play(`${this.spriteId}-walk`, true);
        this.flipX = true;
        this.setVelocityX(this.speed);
        break;
      }
      case 'left': {
        this.anims.play(`${this.spriteId}-walk`, true);
        this.flipX = false;
        this.setVelocityX(-this.speed);
        break;
      }
      default: { break; }
    }
  }

  ia() {
    if (this.beingAttacked || this.attacking || this.dying) return;

    this.move('left');
  }
}

export default Enemy;

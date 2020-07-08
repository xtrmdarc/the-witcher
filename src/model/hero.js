import Phaser from 'phaser';
import heroSS from '../assets/img/hero/c00a_01idle.png';
import heroWalkSS from '../assets/img/hero/c00a_02walk.png';
import shootSS from '../assets/img/hero/c00a_21shot.png';
import dmgSS from '../assets/img/hero/c00a_07damage.png';
import jumpSS from '../assets/img/hero/c00a_20jump.png';
import deadSS from '../assets/img/hero/c00a_18down.png';
import Bullet from './bullet';

class Hero extends Phaser.Physics.Arcade.Sprite {
  constructor(ctx, x, y, spriteId) {
    super(ctx, x, y, spriteId);
    this.scene = ctx;
    this.speed = 100;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);
    this.setSize(125, 250);
    this.setScale(0.3);
    this.setBounce(0.2);
    this.setData('isDead', false);
    this.spriteId = spriteId;
    this.health = 100;
    this.createSpriteBehaviors();
    this.shooting = false;
    this.bullets = this.scene.add.group();
    this.beingAttacked = false;
    this.jumping = false;
    this.alive = true;
  }

  static loadAssets(scene) {
    scene.load.spritesheet('hero', heroSS, { frameWidth: 480, frameHeight: 480 });
    scene.load.spritesheet('hero-walk-ss', heroWalkSS, { frameWidth: 480, frameHeight: 480 });
    scene.load.spritesheet('hero-shoot-ss', shootSS, { frameWidth: 480, frameHeight: 480 });
    scene.load.spritesheet('hero-damage-ss', dmgSS, { frameWidth: 480, frameHeight: 480 });
    scene.load.spritesheet('hero-jump-ss', jumpSS, { frameWidth: 480, frameHeight: 480 });
    scene.load.spritesheet('hero-dead-ss', deadSS, { frameWidth: 480, frameHeight: 480 });
    Bullet.loadAssets(scene);
  }

  createSpriteBehaviors() {
    this.scene.anims.create({
      key: 'idle',
      frames: this.scene.anims.generateFrameNumbers('hero', { start: 0, end: 13 }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.anims.create({
      key: 'hero-walk',
      frames: this.scene.anims.generateFrameNumbers('hero-walk-ss', { start: 0, end: 27 }),
      frameRate: 40,
      repeat: -1,
    });

    this.scene.anims.create({
      key: 'hero-shoot',
      frames: this.scene.anims.generateFrameNumbers('hero-shoot-ss', { start: 0, end: 14 }),
      frameRate: 40,
      repeat: 0,
    });

    this.scene.anims.create({
      key: 'hero-damage',
      frames: this.scene.anims.generateFrameNumbers('hero-damage-ss', { start: 0, end: 11 }),
      frameRate: 40,
      repeat: 0,
    });

    this.scene.anims.create({
      key: 'hero-jump',
      frames: this.scene.anims.generateFrameNumbers('hero-jump-ss', { start: 0, end: 24 }),
      frameRate: 30,
      repeat: 0,
    });

    this.scene.anims.create({
      key: 'hero-dead',
      frames: this.scene.anims.generateFrameNumbers('hero-dead-ss', { start: 0, end: 0 }),
      frameRate: 1,
      repeat: 0,
    });

    this.on('animationcomplete', this.handleAnimationComplete, this);
  }

  handleAnimationComplete(animation) {
    switch (animation.key) {
      case 'hero-shoot': {
        this.shooting = false;
        const newBullet = new Bullet(this.scene, this.x + (20 * ((this.flipX) ? 1 : -1)), this.y + this.body.halfHeight / 2 - 7, this, 'arrow');
        this.bullets.add(newBullet);
        newBullet.fire(900, -10);
        break;
      }
      case 'hero-damage': {
        this.beingAttacked = false;
        break;
      }
      case 'hero-jump': {
        this.jumping = false;
        break;
      }
      case 'hero-dead': {
        this.scene.scene.stop();
        this.scene.scene.start('GameOverScene');
        break;
      }
      default: { break; }
    }
  }

  takeDamage(dmg) {
    if (!this.alive) return;

    this.beingAttacked = true;
    this.health -= dmg;
    this.anims.play('hero-damage');
    this.checkIfDead();
  }

  checkIfDead() {
    if (this.health <= 0) {
      this.health = 0;
      this.alive = false;
      this.anims.play('hero-dead', true);
      return true;
    }
    return false;
  }

  idle() {
    if (this.body.blocked.down) this.jumping = false;

    if (this.shooting || this.beingAttacked || this.jumping || !this.alive) return;
    this.setVelocityX(0);
    this.anims.play('idle', true);
  }

  move(dir) {
    if (this.shooting || this.beingAttacked || !this.alive) return;

    switch (dir) {
      case 'right': {
        this.flipX = true;
        if (!this.jumping) this.anims.play('hero-walk', true);
        this.setVelocityX(this.speed);
        break;
      }
      case 'left': {
        this.flipX = false;
        if (!this.jumping) this.anims.play('hero-walk', true);
        this.setVelocityX(-this.speed);
        break;
      }
      default: { break; }
    }
  }

  jump() {
    if (this.shooting || !this.alive) return;

    this.jumping = true;
    this.anims.play('hero-jump', true);
    this.setVelocityY(-300);
  }

  shoot() {
    if (!this.alive) return;

    this.anims.play('hero-shoot', true);
    this.shooting = true;
  }
}

export default Hero;

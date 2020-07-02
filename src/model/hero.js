import heroSS from '../assets/img/hero/c00a_01idle.png';
import heroWalkSS from '../assets/img/hero/c00a_02walk.png';
import shootSS from '../assets/img/hero/c00a_21shot.png';
import Bullet from './bullet';

class Hero extends Phaser.Physics.Arcade.Sprite {
  constructor(ctx, x, y, spriteId) {
    super(ctx, x, y, spriteId);
    this.scene = ctx;
    this.speed = 100;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);
    this.setSize(125,250);
    this.setScale(0.3);
    this.setBounce(0.2);
    this.setData('isDead', false);
    this.spriteId = spriteId;
    this.health = 100;
    this.createSpriteBehaviors();
    this.shooting = false;
  }
  
  static loadAssets(scene){
    scene.load.spritesheet('hero', heroSS, {frameWidth: 480, frameHeight: 480});
    scene.load.spritesheet('hero-walk-ss', heroWalkSS, {frameWidth: 480, frameHeight: 480});
    scene.load.spritesheet('hero-shoot-ss', shootSS, {frameWidth: 480, frameHeight: 480});
    Bullet.loadAssets(scene);
  }

  createSpriteBehaviors() {
    this.scene.anims.create({
      key: 'idle',
      frames: this.scene.anims.generateFrameNumbers('hero', { start: 0, end: 13 }),
      frameRate: 10,
      repeat: -1
    });

    this.scene.anims.create({
      key: 'hero-walk',
      frames: this.scene.anims.generateFrameNumbers('hero-walk-ss', { start: 0, end: 27 }),
      frameRate: 40,
      repeat: -1
    });

    this.scene.anims.create({
      key: 'hero-shoot',
      frames: this.scene.anims.generateFrameNumbers('hero-shoot-ss', { start: 0, end: 14 }),
      frameRate: 40,
      repeat: 0
    });

    this.on('animationcomplete', this.handleAnimationComplete, this);
  }

  handleAnimationComplete(animation, frame) {
    switch(animation.key) {
      case 'hero-shoot' : {
        this.shooting = false;
        const newBullet = new Bullet(this.scene, this.x + (20 * ((this.flipX) ? 1 : -1)), this.y + this.body.halfHeight / 2 - 7, this, 'arrow');
        newBullet.fire(900, -10);
        break;
      }
    }
  }

  idle() {
    if(this.shooting)
      return;
    this.setVelocityX(0);
    this.anims.play('idle', true);
  }

  move(dir) {
    if(this.shooting)
      return;

    switch(dir) {
      case 'right': {
        this.flipX = true;
        this.anims.play('hero-walk', true);
        this.setVelocityX(this.speed);
        break;
      }
      case 'left': {
        this.flipX = false;
        this.anims.play('hero-walk', true);
        this.setVelocityX(-this.speed);
        break;
      }
    };
  }

  jump() {
    if(this.shooting)
      return;
    this.setVelocityY(-200);
  }

  shoot() {
    this.anims.play('hero-shoot', true);
    this.shooting = true;
    
  }
}

export default Hero;
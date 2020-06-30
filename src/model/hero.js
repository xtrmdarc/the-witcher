class Hero extends Phaser.Physics.Arcade.Sprite {
  constructor(ctx, x, y, spriteId) {
    super(ctx, x, y, spriteId);
    this.scene = ctx;
    this.speed = 100;
    this.scene.add.existing(this);
    this.scene.physics.world.enableBody(this, 0);
    this.setSize(400,250);
    this.setScale(0.3);
    this.setBounce(0.2);
    this.setData('isDead', false);
    this.spriteId = spriteId;
    this.health = 100;
    this.createSpriteBehaviors();
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
  }

  idle() {
    this.setVelocityX(0);
    this.anims.play('idle', true);
  }

  move(dir) {
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
    this.setVelocityY(-180);
  }
}

export default Hero;
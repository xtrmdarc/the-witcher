import Enemy from './enemy';

class Ogre extends Enemy {
  constructor(ctx, x, y) {
    super(ctx, x, y, 'enemy3', 250, 250);
    this.setScale(0.7);
    this.health = 200;
    this.points = 100;
    this.damage = 30;
    this.speed = 30;
    this.setOffset(this.body.offset.x - this.width / 10 + 10, this.body.offset.y);
  }
}

export default Ogre;
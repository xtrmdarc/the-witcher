import Enemy from './enemy';

class Droppy extends Enemy {
  constructor(ctx, x, y) {
    super(ctx, x, y, 'enemy1', 90, 90);
    this.health = 20;
    this.points = 40;
    this.damage = 5;
    this.speed = 20;
    this.setOffset(this.width / 2 - this.body.width / 2, this.height / 2 + this.body.height / 2);
  }
}

export default Droppy;
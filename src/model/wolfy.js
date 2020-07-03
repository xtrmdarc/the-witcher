import Enemy from "./enemy";

class Wolfy extends Enemy {
  constructor(ctx, x, y) {
    super(ctx, x, y, 'enemy2', 180, 150);
    this.health = 50;
    this.points = 90;
    this.damage = 10;
    this.setOffset(this.width / 2 - this.body.width / 6 * 3  , this.height / 2 - this.body.height / 5 + 15 );
  }
}

export default Wolfy;
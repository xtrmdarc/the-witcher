import Enemy from "./enemy";

class Ogre extends Enemy {
  constructor(ctx, x, y, spriteId) {
    super(ctx, x, y, 'enemy3', 320, 250);
    this.setScale(0.7);
    this.health = 200;
    this.points = 100;
    this.damage = 30;
    this.speed = 20;
    // this.setOffset(this.width / 2 - this.body.width / 6 * 3  , this.height / 2 - this.body.height / 5 + 15 );
  }
}

export default Ogre;
class GameMechanics {
  constructor(scene) {
    this.scene = scene;
  }

  applyMechanics() {

  }

  addEntitiesCollision() {
    this.scene.physics.add.collider(this.scene.player, this.scene.enemies);
    this.scene.physics.add.collider(this.scene.enemies, this.scene.mapCollisionLayer);
    this.scene.physics.add.collider(this.scene.player, this.scene.mapCollisionLayer);
    this.scene.physics.add.collider(this.scene.player.bullets, this.scene.enemies);
  }

}

export default GameMechanics;
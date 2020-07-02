const GameMechanics = (() =>  {
  let gameScore = 0;
  let scene;

  const setScene = (pscene) => {
    scene = pscene;
  }

  const applyMechanics = () => {

  }

  const addScore = (points) => {
    gameScore += points;
  }

  const addEntitiesCollision = () => {
    scene.physics.add.collider(scene.player, scene.enemies);
    scene.physics.add.collider(scene.enemies, scene.mapCollisionLayer);
    scene.physics.add.collider(scene.player, scene.mapCollisionLayer);

    const bulletHitEnemy = (bullet, enemy) => {
      if( enemy.takeDamage(bullet.damage) )
        addScore(enemy.points);
      
      bullet.destroy();
    };

    scene.physics.add.collider(scene.player.bullets, scene.enemies, bulletHitEnemy);
  }
  return { setScene, addEntitiesCollision };
})();

export default GameMechanics;
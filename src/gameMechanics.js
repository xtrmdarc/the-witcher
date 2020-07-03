import UI from "./gameUI";

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
    UI.displayScore(gameScore);
  }

  const addEntitiesCollision = () => {
    scene.physics.add.collider(scene.enemies, scene.mapMobCollisionLayer);
    scene.physics.add.collider(scene.player, scene.mapCollisionLayer);

    const bulletHitEnemy = (bullet, enemy) => {
      if( enemy.takeDamage(bullet.damage) )
        addScore(enemy.points);
      
      bullet.destroy();
    };

    const enemyHitPlayer = (player, enemy) => {
      enemy.attack(player);
      UI.displayHealth(player.health);
    };

    scene.physics.add.collider(scene.player, scene.enemies, enemyHitPlayer);
    scene.physics.add.collider(scene.player.bullets, scene.enemies, bulletHitEnemy);
  }
  return { setScene, addEntitiesCollision };
})();

export default GameMechanics;
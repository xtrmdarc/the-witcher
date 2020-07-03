import UI from "./gameUI";
import Droppy from "./model/droppy";

const GameMechanics = (() =>  {
  let gameScore = 0;
  let scene;
  let spawnPos;

  const setScene = (pscene) => {
    scene = pscene;
    spawnPos = {
      x: 1490,
      y: scene.game.scale.height / 2
    }
  }

  const applyMechanics = () => {

  };

  const addScore = (points) => {
    gameScore += points;
    UI.displayScore(gameScore);
  };

  const addEntitiesCollision = () => {
    scene.physics.add.collider(scene.enemies, scene.mapMobCollisionLayer);
    scene.physics.add.collider(scene.player, scene.mapCollisionLayer);

    const bulletHitEnemy = (bullet, enemy) => {
      if( enemy.takeDamage(bullet.damage) )
        addScore(enemy.points);
      
      UI.displayHitPoints(enemy, bullet.damage);
      bullet.destroy();
    };

    const enemyHitPlayer = (player, enemy) => {
      enemy.attack(player);
      UI.displayHealth(player.health);
    };

    scene.physics.add.collider(scene.player, scene.enemies, enemyHitPlayer);
    scene.physics.add.collider(scene.player.bullets, scene.enemies, bulletHitEnemy);
  };

  const mobSpawning = () => {
    const timeDroppySpawn = scene.time.addEvent({
      delay: 3000,
      callback: function()  
      {
        console.log('entro', spawnPos.x);
        const newMob = new Droppy(scene, spawnPos.x, spawnPos.y);
        scene.enemies.add(newMob);
      },
      callbackScope: this,
      loop: true,
    });
    // timeDroppySpawn.destroy();

  };

  return { setScene, addEntitiesCollision, mobSpawning};
})();

export default GameMechanics;
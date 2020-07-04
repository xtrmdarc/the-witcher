import UI from "./gameUI";
import Droppy from "./model/droppy";

const GameMechanics = (() =>  {
  let gameScore = 0;
  let scene;
  let spawnPos;
  let gameTimer;
  let gameTimeInSec  = 120;

  const setScene = (pscene) => {
    scene = pscene;
    spawnPos = {
      x: 1490,
      y: scene.game.scale.height / 2
    };
    UI.displayTime(gameTimeInSec);
    gameTimer = scene.time.addEvent({delay : 1000, loop: true, callbackScope: this, callback: updateGameTimer})
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
      if (enemy.takeDamage(bullet.damage)) {
        addScore(enemy.points);
        const bonusTime = enemy.points / 20;
        gameTimeInSec += bonusTime;
        UI.displayTime(gameTimeInSec);
        UI.applyBonusTime(bonusTime);
      }
      
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
      delay: Phaser.Math.Between(1000, 5000),
      callback: function()
      {
        const newMob = new Droppy(scene, spawnPos.x, spawnPos.y);
        scene.enemies.add(newMob);
      },
      callbackScope: this,
      loop: true,
    });
    // timeDroppySpawn.destroy();

  };

  const updateGameTimer = () => {
    gameTimeInSec -= 1;
    UI.displayTime(gameTimeInSec);
  };

  return { setScene, addEntitiesCollision, mobSpawning};
})();

export default GameMechanics;
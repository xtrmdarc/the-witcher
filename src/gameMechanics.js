import UI from "./gameUI";
import Droppy from "./model/droppy";
import Wolfy from "./model/wolfy";
import Ogre from "./model/ogre";

const GameMechanics = (() =>  {
  let gameScore = 0;
  let scene;
  let spawnPos;
  let gameTimer;
  let gameTimeInSec  = 120;
  let timeDroppySpawn;
  let timeWolfySpawn;
  let timeOgreSpawn;

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
    timeDroppySpawn = scene.time.addEvent({
      delay: 4000,
      callback: function()
      {
        const xpos = Phaser.Math.Between(80,1190);
        const newMob = new Droppy(scene, xpos, - 100);
        scene.enemies.add(newMob);
      },
      callbackScope: this,
      loop: true,
    });

    timeWolfySpawn = scene.time.addEvent({
      delay: Phaser.Math.Between(7000, 10000),
      callback: function()
      {
        const newMob = new Wolfy(scene, spawnPos.x, spawnPos.y);
        scene.enemies.add(newMob);
      },
      callbackScope: this,
      loop: true,
    });

    timeOgreSpawn = scene.time.addEvent({
      delay: Phaser.Math.Between(20000, 25000),
      callback: function()
      {
        const newMob = new Ogre(scene, spawnPos.x, spawnPos.y);
        scene.enemies.add(newMob);
      },
      callbackScope: this,
      loop: true,
    });

  };

  const updateGameTimer = () => {
    gameTimeInSec -= 1;
    UI.displayTime(gameTimeInSec);
  };

  const updateGameMechanics = () => {
    if(gameScore > 400)
      timeDroppySpawn.delay = 1000;
  };

  return { setScene, addEntitiesCollision, mobSpawning, updateGameMechanics};
})();

export default GameMechanics;
import Phaser from 'phaser';
import UI from './gameUI';
import Droppy from './model/droppy';
import Wolfy from './model/wolfy';
import Ogre from './model/ogre';

const GameMechanics = (() => {
  let gameScore = 0;
  let scene;
  let spawnPos;
  let gameTimeInSec = 120;
  let timeDroppySpawn;

  const updateGameTimer = () => {
    gameTimeInSec -= 1;

    if (gameTimeInSec <= 0) {
      scene.scene.start('GameOverScene');
      scene.scene.stop();
    }

    UI.displayTime(gameTimeInSec);
  };

  const setScene = (pscene) => {
    scene = pscene;
    spawnPos = {
      x: 1490,
      y: scene.game.scale.height / 2,
    };
    gameTimeInSec = 120;
    gameScore = 0;
    UI.displayTime(gameTimeInSec);
    scene.time.addEvent({
      delay: 1000,
      loop: true,
      callbackScope: this,
      callback: updateGameTimer,
    });
  };

  const addScore = (points) => {
    gameScore += points;
    UI.displayScore(gameScore);
  };

  const getScore = () => gameScore;

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
      if (!enemy.dying) {
        UI.displayHitPoints(enemy, bullet.damage);
      }
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
      callback: () => {
        const xpos = Phaser.Math.Between(80, 1190);
        const newMob = new Droppy(scene, xpos, -100);
        scene.enemies.add(newMob);
      },
      callbackScope: this,
      loop: true,
    });

    scene.time.addEvent({
      delay: Phaser.Math.Between(7000, 10000),
      callback: () => {
        const newMob = new Wolfy(scene, spawnPos.x, spawnPos.y);
        scene.enemies.add(newMob);
      },
      callbackScope: this,
      loop: true,
    });

    scene.time.addEvent({
      delay: Phaser.Math.Between(20000, 25000),
      callback: () => {
        const newMob = new Ogre(scene, spawnPos.x, spawnPos.y);
        scene.enemies.add(newMob);
      },
      callbackScope: this,
      loop: true,
    });
  };

  const checkForDeathOutOfBounds = () => {
    if (scene.player.y - scene.player.body.height / 2 > scene.game.scale.height) {
      scene.scene.start('GameOverScene');
      scene.scene.stop();
    }
  };

  const updateGameMechanics = () => {
    if (gameScore > 400) timeDroppySpawn.delay = 1000;
    checkForDeathOutOfBounds();
  };

  return {
    setScene, addEntitiesCollision, mobSpawning, updateGameMechanics, getScore,
  };
})();

export default GameMechanics;
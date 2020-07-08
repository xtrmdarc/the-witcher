import skyImg from './assets/img/world/sky.png';
import cloudsImg from './assets/img/world/clouds.png';
import seaImg from './assets/img/world/sea.png';
import en1Idle from './assets/img/enemy/enemy1/e001a_01idle.png';
import en1Walk from './assets/img/enemy/enemy1/e001a_02walk.png';
import en1Dmg from './assets/img/enemy/enemy1/e001a_07damage.png';
import en1Attack from './assets/img/enemy/enemy1/e001a_10swinging.png';
import en1Dead from './assets/img/enemy/enemy1/e001a_18down.png';
import en2Idle from './assets/img/enemy/enemy2/e002a_01idle.png';
import en2Walk from './assets/img/enemy/enemy2/e002a_02walk.png';
import en2Dmg from './assets/img/enemy/enemy2/e002a_07damage.png';
import en2Attack from './assets/img/enemy/enemy2/e002a_10swinging.png';
import en2Dead from './assets/img/enemy/enemy2/e002a_18down.png';
import en3Idle from './assets/img/enemy/enemy3/e003a_01idle.png';
import en3Walk from './assets/img/enemy/enemy3/e003a_02walk.png';
import en3Dmg from './assets/img/enemy/enemy3/e003a_07damage.png';
import en3Attack from './assets/img/enemy/enemy3/e003a_10swinging.png';
import en3Dead from './assets/img/enemy/enemy3/e003a_18down.png';
import testTileMap from './assets/maps/test_map.json';
import tileSet from './assets/img/world/tileset.png';

const helper = (() => {
  const getBaseBackground = (pscene) => {
    const scene = pscene;
    let clouds;

    const loadBackgroundAssets = () => {
      scene.load.image('sky', skyImg);
      scene.load.image('clouds', cloudsImg);
      scene.load.image('sea', seaImg);
    };

    const renderBackground = () => {
      for (let i = 0; i < scene.sys.canvas.width / 112; i += 1) {
        const sky = scene.add.image(112 / 2 + (i * 112), scene.sys.canvas.height / 2, 'sky');
        sky.displayHeight = scene.sys.canvas.height;
        sky.setScrollFactor(0);
      }

      const cloudY = (scene.sys.canvas.height / 5) * 2;
      clouds = [
        scene.physics.add.image(0, cloudY, 'clouds'),
        scene.physics.add.image(112, cloudY, 'clouds'),
        scene.physics.add.image(280, cloudY, 'clouds'),
        scene.physics.add.image(448, cloudY, 'clouds'),
        scene.physics.add.image(676, cloudY, 'clouds'),
        scene.physics.add.image(858, cloudY, 'clouds'),
        scene.physics.add.image(1008, cloudY, 'clouds'),
        scene.physics.add.image(1308, cloudY, 'clouds'),
      ];

      for (let i = 0; i < scene.sys.canvas.width / 112; i += 1) {
        const sea = scene.add.image(112 / 2 + (i * 112), (scene.sys.canvas.height / 4) * 3, 'sea');
        sea.displayHeight = scene.sys.canvas.height / 2;
        sea.setScrollFactor(0);
      }

      clouds.forEach(cloud => {
        scene.add.existing(cloud);
        scene.physics.world.enableBody(cloud, 0);
        cloud.body.setAllowGravity(false);
        cloud.setVelocityX(15);
        cloud.setScrollFactor(0);
      });
    };

    const updateBackground = () => {
      clouds.forEach(cloud => {
        if (cloud.x - cloud.width / 2 > scene.sys.canvas.width) {
          cloud.setX(-cloud.width / 2);
        }
      });
    };

    return {
      renderBackground,
      loadBackgroundAssets,
      updateBackground,
    };
  };

  const loadAllAssets = (scene) => {
    scene.load.spritesheet('enemy1', en1Idle, { frameWidth: 480, frameHeight: 480 });
    scene.load.spritesheet('enemy1-walk-ss', en1Walk, { frameWidth: 480, frameHeight: 480 });
    scene.load.spritesheet('enemy1-damage-ss', en1Dmg, { frameWidth: 480, frameHeight: 480 });
    scene.load.spritesheet('enemy1-attack-ss', en1Attack, { frameWidth: 480, frameHeight: 480 });
    scene.load.spritesheet('enemy1-dead-ss', en1Dead, { frameWidth: 480, frameHeight: 480 });
    scene.load.spritesheet('enemy2', en2Idle, { frameWidth: 480, frameHeight: 480 });
    scene.load.spritesheet('enemy2-walk-ss', en2Walk, { frameWidth: 480, frameHeight: 480 });
    scene.load.spritesheet('enemy2-damage-ss', en2Dmg, { frameWidth: 480, frameHeight: 480 });
    scene.load.spritesheet('enemy2-attack-ss', en2Attack, { frameWidth: 480, frameHeight: 480 });
    scene.load.spritesheet('enemy2-dead-ss', en2Dead, { frameWidth: 480, frameHeight: 480 });
    scene.load.spritesheet('enemy3', en3Idle, { frameWidth: 480, frameHeight: 480 });
    scene.load.spritesheet('enemy3-walk-ss', en3Walk, { frameWidth: 480, frameHeight: 480 });
    scene.load.spritesheet('enemy3-attack-ss', en3Attack, { frameWidth: 480, frameHeight: 480 });
    scene.load.spritesheet('enemy3-damage-ss', en3Dmg, { frameWidth: 480, frameHeight: 480 });
    scene.load.spritesheet('enemy3-dead-ss', en3Dead, { frameWidth: 480, frameHeight: 480 });
    scene.load.tilemapTiledJSON('map', testTileMap);
    scene.load.image('world-tileset', tileSet);
  };

  const createBtn = (scene, x, y, img, onClick) => {
    const newBtn = scene.add.image(x, y, img);
    newBtn.setInteractive();
    newBtn.on('pointerover', () => {
      newBtn.alpha = 0.7;
    }, scene);
    newBtn.on('pointerout', () => {
      newBtn.alpha = 1;
    }, scene);
    newBtn.on('pointerdown', onClick, scene);
    return newBtn;
  };

  return { getBaseBackground, loadAllAssets, createBtn };
})();

export default helper;
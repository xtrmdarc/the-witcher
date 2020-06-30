import 'phaser';
import skyImg from './assets/img/world/sky.png';
import tileSet from './assets/img/world/tileset.png';
import heroSS from './assets/img/hero/c00a_01idle.png';

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 300 },
        debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

var game = new Phaser.Game(config);

function preload() {
  this.load.image('sky', skyImg);
  this.load.image('world-tileset', tileSet);
  this.load.spritesheet('hero', heroSS, {frameWidth: 480, frameHeight: 480});
}

let platforms;

function create() {
  const height = game.scale.height;
  const width = game.scale.width;
  
  for (let i = 0; i < 800 / 112; i++) {
    const sky = this.add.image(112 / 2 + (i * 112 ), height / 2, 'sky');
    sky.displayHeight = height;
  }

  const level = [
                  [2, 61, 62, 63, 64, 65, 66, 9],
                  [118, 119, 120, 121, 122, 123, 124, 36],
                  [2, 177, 178, 179, 180, 181, 182, 183],
                  [2, 2, 236, 237, 238, 239, 240, 241, 242, 243, 180, 181, 182, 183],
                  [2, 293, 294, 295, 296],
                ];

  const map = this.make.tilemap({ data: level, tileWidth: 16, tileHeight: 16 });
  const tiles = map.addTilesetImage('world-tileset');
  const layer = map.createStaticLayer(0, tiles, width / 2 - 30, height / 2 - 30);

  const player = this.physics.add.sprite(width / 2, 0, 'hero');
  player.setBounce(0.2);
  player.setSize(400,250);
  player.setScale(0.3);

  layer.setCollisionBetween(100,400);
  this.physics.add.collider(player, layer);
  // player.setCollideWorldBounds(true);

  this.anims.create({
    key: 'idle',
    frames: this.anims.generateFrameNumbers('hero', { start: 0, end: 13 }),
    frameRate: 10,
    repeat: -1,
  });

  player.anims.play('idle', true);
  // platforms = this.physics.add.staticGroup();
  // platforms.create(0, height - 200 / 2, 'ground');
}

function update() {

}
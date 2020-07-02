import 'phaser';
import tileSet from './assets/img/world/tileset.png';
import Hero from './model/hero';
import Helper from './helper';
import testTileMap from './assets/maps/test_map.json';
import Enemy from './model/enemy';
import Droppy from './model/droppy';

var config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight - 5,
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 300 },
        debug: true,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

var game = new Phaser.Game(config);
let background;
function preload() {
  
  background = Helper.getBaseBackground(this);
  background.loadBackgroundAssets();
  this.load.tilemapTiledJSON('map', testTileMap);
  this.load.image('world-tileset', tileSet);
  Helper.loadAllAssets(this);
  Hero.loadAssets(this);
}

let platforms;
let player;
let bullet;
let enemy1;

function create() {
  const height = game.scale.height;
  const width = game.scale.width;
  
  background.renderBackground();

  const map = this.add.tilemap('map');
  const tiles = map.addTilesetImage('magic-cliffs', 'world-tileset');
  const layer = map.createStaticLayer('Map', [tiles], 0, 0);
  const collisionLayer = map.createStaticLayer('Collision', [tiles], 0, 0);
  
  // const player = this.physics.add.sprite(width / 2, 0, 'hero');
  // player.setBounce(0.2);
  // player.setSize(400,250);
  // player.setScale(0.3);
  this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  player = new Hero(this, width / 2, 0, 'hero');
  enemy1 = new Droppy(this, width / 2 + 100, 0);
  // bullet = new Bullet(this, 20, 20, 'weapons');
  // layer.setCollisionBetween(120,400);
  collisionLayer.setCollisionBetween(405,408);
  collisionLayer.alpha = 0;
  this.physics.add.collider(player, collisionLayer);
  this.physics.add.collider(enemy1, collisionLayer);
  this.physics.add.collider(enemy1, player);
  // collisionLayer.setCollisionByProperty({collides: true});
  // this.physics.add.existing(layer, true);

  // this.anims.create({
  //   key: 'idle',
  //   frames: this.anims.generateFrameNumbers('hero', { start: 0, end: 13 }),
  //   frameRate: 10,
  //   repeat: -1,
  // });

  // player.anims.play('idle', true);
  // platforms = this.physics.add.staticGroup();
  // platforms.create(0, height - 200 / 2, 'ground');
}

function update() {

  const cursors = this.input.keyboard.createCursorKeys();
  if (cursors.left.isDown)
  {
    player.move('left');
  }
  else if (cursors.right.isDown)
  {
    player.move('right');
  }
  else
  {
    player.idle();
  }
  if(cursors.space._justDown) {
    player.shoot();
  }
  if (cursors.up.isDown && player.body.blocked.down)
  {
    player.jump();
    enemy1.idle();
  }

  background.updateBackground();
}
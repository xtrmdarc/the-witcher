import 'phaser';
import tileSet from './assets/img/world/tileset.png';
import Hero from './model/hero';
import Helper from './helper';

var config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight - 5,
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
let background;
function preload() {
  
  background = Helper.getBaseBackground(this);
  background.loadBackgroundAssets();

  this.load.image('world-tileset', tileSet);
  
  Hero.loadAssets(this);
}

let platforms;
let player;
let bullet;

function create() {
  const height = game.scale.height;
  const width = game.scale.width;
  
  background.renderBackground();

  const level = [
                  [2, 61, 62, 63, 64, 65, 66, 2],
                  [118, 119, 120, 121, 122, 123, 124, 2],
                  [2, 177, 178, 179, 180, 181, 182, 183, 2],
                  [2, 2, 236, 237, 238, 239, 240, 241, 242, 2, 2, 2, 2, 2],
                  [2, 293, 294, 295, 296, 2, 2, 2, 2, 2],
                ];

  const map = this.make.tilemap({ data: level, tileWidth: 16, tileHeight: 16 });
  const tiles = map.addTilesetImage('world-tileset');
  const layer = map.createStaticLayer(0, tiles, width / 2 - 30, height / 2 - 30);

  // const player = this.physics.add.sprite(width / 2, 0, 'hero');
  // player.setBounce(0.2);
  // player.setSize(400,250);
  // player.setScale(0.3);
  
  player = new Hero(this, width / 2, 0, 'hero');
  // bullet = new Bullet(this, 20, 20, 'weapons');
  layer.setCollisionBetween(120,400);
  this.physics.add.collider(player, layer);
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
  }



  background.updateBackground();
}
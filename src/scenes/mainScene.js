import 'phaser';
import Helper from '../helper';
import Hero from '../model/hero';
import Enemy from '../model/enemy';
import Droppy from '../model/droppy';
import Wolfy from '../model/wolfy';
import GameMechanics from '../gameMechanics';

class MainScene extends Phaser.Scene {
  constructor() {
    super({ scene: 'MainScene' });
    this.background;
    this.platforms;
    this.bullet;
    this.enemies;
    this.player;
    this.mapCollisionLayer;
    this.gm = new GameMechanics(this);
  }

  preload() {
    this.background = Helper.getBaseBackground(this);
    this.background.loadBackgroundAssets();
    Helper.loadAllAssets(this);
    Hero.loadAssets(this);
  }

  create() {
    const height = this.game.scale.height;
    const width = this.game.scale.width;
    
    this.background.renderBackground();

    const map = this.add.tilemap('map');
    const tiles = map.addTilesetImage('magic-cliffs', 'world-tileset');
    const layer = map.createStaticLayer('Map', [tiles], 0, 0);
    this.mapCollisionLayer = map.createStaticLayer('Collision', [tiles], 0, 0);
    this.mapCollisionLayer.setCollisionBetween(405,408);
    this.mapCollisionLayer.alpha = 0;

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.enemy1 = new Droppy(this, width / 2 + 100, 0);
    this.enemy2 = new Wolfy(this,  width / 2 + 200, 0);
    this.player = new Hero(this, width / 2, 0, 'hero');

    this.enemies = this.add.group();
    this.enemies.add(this.enemy1);
    this.enemies.add(this.enemy2);
    
    this.gm.addEntitiesCollision();
  }

  update() {
    const cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown)
    {
      this.player.move('left');
    }
    else if (cursors.right.isDown)
    {
      this.player.move('right');
    }
    else
    {
      this.player.idle();
    }
    if(cursors.space._justDown) {
      this.player.shoot();
    }
    if (cursors.up.isDown && this.player.body.blocked.down)
    {
      this.player.jump();
      this.enemy1.idle();
    }

    this.background.updateBackground();
  }
}

export default MainScene;